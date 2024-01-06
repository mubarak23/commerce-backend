"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WareHouseController = void 0;
/* eslint-disable @typescript-eslint/no-parameter-properties */
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const underscore_1 = __importDefault(require("underscore"));
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const Order_1 = require("../entity/Order");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const WareHouse_1 = require("../entity/WareHouse");
const WareHouseProductOrderHistory_1 = require("../entity/WareHouseProductOrderHistory");
const WareHouseProductPurchase_1 = require("../entity/WareHouseProductPurchase");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const AcceptOrDeclineType_1 = require("../enums/AcceptOrDeclineType");
const SortOrder_1 = require("../enums/SortOrder");
const Statuses_1 = require("../enums/Statuses");
const CooperateService = __importStar(require("../services/cooperateService"));
const PaginationService = __importStar(require("../services/paginationService"));
const WareHouseService = __importStar(require("../services/warehouseService"));
const error_response_types_1 = require("../utils/error-response-types");
let WareHouseController = class WareHouseController {
    handleCreateNewWareHouse(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield WareHouseService.validateCreateWareHouseData(reqBody);
            if (currentUser.isCooperate) {
                yield CooperateService.isWareHouseAccount(currentUser);
                yield CooperateService.isCooperateAccount(currentUser);
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            // function that check if the user can create multiple warehouse 
            const canHaveMultipleWareHousePerState = yield WareHouseService.canHaveMultipleWareHousePerState(currentUser.id);
            if (!canHaveMultipleWareHousePerState) {
                const existingStateWareHouse = yield wareHouseRepo.findOne({
                    state: reqBody.state,
                    accountId: currentUser.accountId
                });
                if (existingStateWareHouse) {
                    throw new error_response_types_1.UnprocessableEntityError('You are not allowed to have more than one warehouse in a state');
                }
            }
            const savedNewWareHouse = yield WareHouseService.createWareHouse(currentUser, reqBody);
            if (!savedNewWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Unable to create a wareHouse at this time');
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleFetchMyWareHouses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            if (currentUser.isDeveloper) {
                const warehouses = yield wareHouseRepo.find({
                    accountId: currentUser.accountId,
                    isSoftDeleted: false
                });
                if (!warehouses) {
                    throw new error_response_types_1.UnprocessableEntityError('No Warehouse Found');
                }
                const resData = {
                    status: true,
                    data: warehouses.map((warehouse) => {
                        return {
                            uuid: warehouse.uuid,
                            name: warehouse.name,
                            state: warehouse.state,
                            country: warehouse.country,
                            contactFullName: warehouse.contactFullName,
                            contactPhoneNumber: warehouse.contactPhoneNumber,
                            isDefault: warehouse.isDefault,
                            createdByUserId: warehouse.createdByUserId
                        };
                    }),
                };
                return resData;
            }
            yield CooperateService.isCooperateAccount(currentUser);
            yield CooperateService.isWareHouseAccount(currentUser);
            const warehouses = yield wareHouseRepo.find({
                accountId: currentUser.accountId,
                isSoftDeleted: false
            });
            if (!warehouses) {
                throw new error_response_types_1.UnprocessableEntityError('No Warehouse Found');
            }
            const resData = {
                status: true,
                data: warehouses.map((warehouse) => {
                    return {
                        uuid: warehouse.uuid,
                        name: warehouse.name,
                        state: warehouse.state,
                        country: warehouse.country,
                        contactFullName: warehouse.contactFullName,
                        contactPhoneNumber: warehouse.contactPhoneNumber,
                        isDefault: warehouse.isDefault,
                        createdByUserId: warehouse.createdByUserId
                    };
                }),
            };
            return resData;
        });
    }
    handleGetSiteDeliveryRequests(req, sortOrder, pageNumber, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            let query = {};
            query = { userId: currentUser.id };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield wareHouseToSiteProductDeliveryRepo.count({
                where: query,
            });
            const pageResult = yield PaginationService.paginate(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder);
            // eslint-disable-next-line eqeqeq
            if (pageResult.dataset.length == 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Items Found');
            }
            const warehouseToSiteDeliveryRequestDataSet = pageResult.dataset;
            const siteDeliveryLocationIds = warehouseToSiteDeliveryRequestDataSet.map(item => item.deliveryLocationId);
            const deliveryLocationSites = yield DeliveryLocationRepo.find({
                where: { id: (0, typeorm_1.In)(siteDeliveryLocationIds) }
            });
            const WareHouseIds = warehouseToSiteDeliveryRequestDataSet.map(item => item.wareHouseId);
            const wareHouses = yield wareHouseRepo.find({
                where: { id: (0, typeorm_1.In)(WareHouseIds) }
            });
            const transformedWareHouseProductLists = warehouseToSiteDeliveryRequestDataSet.map(deliveryRequest => {
                const deliverySiteDetails = deliveryLocationSites.find(item => item.id === deliveryRequest.deliveryLocationId);
                const wareHouseDetails = wareHouses.find(item => item.id === deliveryRequest.wareHouseId);
                return {
                    uuid: deliveryRequest.uuid,
                    wareHouseDetails,
                    userId: deliveryRequest.userId,
                    deliveryItems: deliveryRequest.deliveryItems,
                    deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
                    status: deliveryRequest.deliveryFeeStatus,
                    totalAmountMajor: deliveryRequest.totalAmountMajor,
                    deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
                    deliverySiteDetails: underscore_1.default.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                    createdAt: deliveryRequest.createdAt
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedWareHouseProductLists, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleFetchDeliveryDetails(req, deliveryRequestUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const existingDeliveryRequest = yield wareHouseToSiteProductDeliveryRepo.findOne({
                uuid: deliveryRequestUuid,
                userId: currentUser.id
            });
            if (!existingDeliveryRequest) {
                throw new error_response_types_1.UnprocessableEntityError('WareHouse delivery request does not exist');
            }
            const wareHouseDetails = yield wareHouseRepo.findOne({
                id: existingDeliveryRequest.wareHouseId
            });
            const deliverySiteDetails = yield deliveryLocationRepo.findOne({
                id: existingDeliveryRequest.deliveryLocationId
            });
            const transformWareHouseDetails = {
                uuid: existingDeliveryRequest.uuid,
                wareHouseDetails,
                userId: existingDeliveryRequest.userId,
                deliveryItems: existingDeliveryRequest.deliveryItems,
                deliveryRequestHistory: existingDeliveryRequest.deliveryFeeStatusHistory,
                status: existingDeliveryRequest.deliveryFeeStatus,
                totalAmountMajor: existingDeliveryRequest.totalAmountMajor,
                deliveryFeeAmountMajor: existingDeliveryRequest.deliveryFeeAmountMajor,
                deliverySiteDetails: underscore_1.default.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                createdAt: existingDeliveryRequest.createdAt
            };
            const resData = {
                status: true,
                data: transformWareHouseDetails
            };
            return resData;
        });
    }
    handleFetchSingleDeliveryRquest(req, deliverySiteUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const deliverySiteDetails = yield deliveryLocationRepo.findOne({
                uuid: deliverySiteUuid
            });
            if (!deliverySiteDetails) {
                throw new error_response_types_1.UnprocessableEntityError('Site delivery location does not exist');
            }
            const existingDeliveryRequests = yield wareHouseToSiteProductDeliveryRepo.find({
                deliveryLocationId: deliverySiteDetails.id,
            });
            if (!existingDeliveryRequests) {
                throw new error_response_types_1.UnprocessableEntityError('WareHouse delivery request does not exist');
            }
            const WareHouseIds = existingDeliveryRequests.map(item => item.wareHouseId);
            const wareHouses = yield wareHouseRepo.find({
                where: { id: (0, typeorm_1.In)(WareHouseIds) }
            });
            const transformedDeliveryRequests = existingDeliveryRequests.map(deliveryRequest => {
                const wareHouseDetails = wareHouses.find(item => item.id === deliveryRequest.wareHouseId);
                return {
                    uuid: deliveryRequest.uuid,
                    wareHouseDetails,
                    userId: deliveryRequest.userId,
                    deliveryItems: deliveryRequest.deliveryItems,
                    deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
                    status: deliveryRequest.deliveryFeeStatus,
                    totalAmountMajor: deliveryRequest.totalAmountMajor,
                    deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
                    deliverySiteDetails: underscore_1.default.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                    createdAt: deliveryRequest.createdAt
                };
            });
            const resData = {
                status: true,
                data: transformedDeliveryRequests
            };
            return resData;
        });
    }
    handleFetchWareHouseDetails(req, wareHouseUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('WareHouse does not exist');
            }
            if (currentUser.isDeveloper) {
                const transformWareHouseDetails = {
                    uuid: existingWareHouse.uuid,
                    name: existingWareHouse.name,
                    state: existingWareHouse.state,
                    country: existingWareHouse.country,
                    contactFullName: existingWareHouse.contactFullName,
                    contactPhoneNumber: existingWareHouse.contactPhoneNumber,
                    isDefault: existingWareHouse.isDefault,
                    createdByUserId: existingWareHouse.createdByUserId
                };
                const resData = {
                    status: true,
                    data: transformWareHouseDetails
                };
                return resData;
            }
            yield CooperateService.isCooperateAccount(currentUser);
            yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            const transformWareHouseDetails = {
                uuid: existingWareHouse.uuid,
                name: existingWareHouse.name,
                state: existingWareHouse.state,
                country: existingWareHouse.country,
                contactFullName: existingWareHouse.contactFullName,
                contactPhoneNumber: existingWareHouse.contactPhoneNumber,
                isDefault: existingWareHouse.isDefault,
                createdByUserId: existingWareHouse.createdByUserId
            };
            const resData = {
                status: true,
                data: transformWareHouseDetails
            };
            return resData;
        });
    }
    handleDeleteWareHouse(req, wareHouseUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('You are not allowed to delete a warehouse you did not create');
            }
            const wareHouseHasProduct = yield wareHouseProductPurchaseRepo.find({
                wareHouseId: existingWareHouse.id
            });
            // eslint-disable-next-line eqeqeq
            if (wareHouseHasProduct.length != 0) {
                throw new error_response_types_1.UnprocessableEntityError('You are not allowed to delete a warehouse that has product in it');
            }
            if (currentUser.isDeveloper) {
                yield wareHouseRepo.createQueryBuilder()
                    .update(WareHouse_1.WareHouse)
                    .set({ isSoftDeleted: true })
                    .where({
                    uuid: wareHouseUuid,
                    accountId: currentUser.accountId
                })
                    .execute();
                const resData = {
                    status: true,
                };
                return resData;
            }
            yield CooperateService.isCooperateAccount(currentUser);
            yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            yield wareHouseRepo.createQueryBuilder()
                .update(WareHouse_1.WareHouse)
                .set({ isSoftDeleted: true })
                .where({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    updateNewWareHouse(req, wareHouseUuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            let query = {};
            if (reqBody.contactFullName) {
                query = { contactFullName: reqBody.contactFullName };
            }
            if (reqBody.contactPhoneNumber) {
                query = { contactPhoneNumber: reqBody.contactPhoneNumber };
            }
            if (reqBody.name) {
                query = { name: reqBody.name };
            }
            if (reqBody.isDefault) {
                query = { isDefault: reqBody.isDefault };
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('You are not allowed to edit a wareHouse that you did not create');
            }
            yield wareHouseRepo.createQueryBuilder()
                .update(WareHouse_1.WareHouse)
                .set(query)
                .where({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            })
                .execute();
            yield wareHouseRepo.createQueryBuilder()
                .update(WareHouse_1.WareHouse)
                .set({ isDefault: !reqBody.isDefault })
                .where({
                uuid: (0, typeorm_1.Not)(wareHouseUuid),
                accountId: currentUser.accountId
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleCreateNewWareHouseSite(req, wareHouseUuid, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { address } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            const getDeliveryLocation = yield DeliveryLocationRepo.findOne({
                userId: currentUser.id,
                address,
            });
            if (getDeliveryLocation) {
                throw new error_response_types_1.UnprocessableEntityError("Site delivery location has been added on your list");
            }
            const newWareHouseSite = yield WareHouseService.createSiteDeliveryLocation(currentUser, requestBody, existingWareHouse);
            if (!newWareHouseSite) {
                throw new error_response_types_1.UnprocessableEntityError("Unable to create site delivery location");
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleFetchWareHouseSites(req, wareHouseUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const WareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingWareHouse = yield WareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            const sites = yield deliveryLocationRepo.find({
                wareHouseId: existingWareHouse.id,
                isSoftDeleted: false,
            });
            const resData = {
                status: true,
                data: sites.map(aSite => underscore_1.default.omit(aSite, "id", "user", "createdAt", "updatedAt")),
            };
            return resData;
        });
    }
    getWareHouseProductPurchases(req, pageNumber, sortOrder, wareHouseUuid, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const productRepo = connection.getRepository(Product_1.Product);
            const userRepoT = connection.getRepository(User_1.User);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            //--
            let query = {};
            query = { wareHouseId: existingWareHouse.id };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const join = {
                alias: "WareHouseProductPurchase",
                leftJoinAndSelect: {
                    buyerUser: "WareHouseProductPurchase.user",
                    sellerUser: "WareHouseProductPurchase.product",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield wareHouseProductPurchaseRepo.count(query);
            const warehouseProductListsPages = yield PaginationService.paginate(WareHouseProductPurchase_1.WareHouseProductPurchase, query, pageSize, pageNumber, sortOrder, undefined, join);
            if (warehouseProductListsPages.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Items Found');
            }
            const warehouseProducts = warehouseProductListsPages.dataset;
            const wareHouseUserIds = warehouseProducts.map(user => user.userId);
            const productIds = warehouseProducts.map(product => product.productId);
            const warehouseIds = warehouseProducts.map(warehouse => warehouse.wareHouseId);
            const userPublicProfiles = yield userRepoT.find({ id: (0, typeorm_1.In)(wareHouseUserIds) });
            const wareHouseDetails = yield wareHouseRepo.find({ id: (0, typeorm_1.In)(warehouseIds) });
            const productDetails = yield productRepo.find({ id: (0, typeorm_1.In)(productIds) });
            // @ts-ignore
            const transformedWareHouseProductListsDataset = warehouseProducts.map(productPurchase => {
                const userPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.id === productPurchase.userId);
                const wareHouseDetail = wareHouseDetails.find(wareHouse => wareHouse.id === productPurchase.wareHouseId);
                const productDetail = productDetails.find(product => product.id === productPurchase.productId);
                return {
                    uuid: productPurchase.uuid,
                    warehouse: wareHouseDetail,
                    user: userPublicProfile,
                    product: productDetail,
                    inFlowQuantity: productPurchase.inFlowQuantity,
                    outFlowQuantity: productPurchase.outFlowQuantity,
                    availableQuantity: productPurchase.availableQuantity,
                    createdAt: productPurchase.createdAt,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedWareHouseProductListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    getWareHouseProductPurchaseByDate(req, wareHouseUuid, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const productRepo = connection.getRepository(Product_1.Product);
            const userRepoT = connection.getRepository(User_1.User);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            let query = {};
            query = { wareHouseId: existingWareHouse.id };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const productPurchases = yield wareHouseProductPurchaseRepo.find({
                where: query
            });
            if (productPurchases.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Items Found');
            }
            const wareHouseUserIds = productPurchases.map(user => user.userId);
            const productIds = productPurchases.map(product => product.productId);
            const warehouseIds = productPurchases.map(warehouse => warehouse.wareHouseId);
            const userPublicProfiles = yield userRepoT.find({ id: (0, typeorm_1.In)(wareHouseUserIds) });
            const wareHouseDetails = yield wareHouseRepo.find({ id: (0, typeorm_1.In)(warehouseIds) });
            const productDetails = yield productRepo.find({ id: (0, typeorm_1.In)(productIds) });
            const transformedWareHouseProductListsDataset = productPurchases.map(productPurchase => {
                const userPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.id === productPurchase.userId);
                const wareHouseDetail = wareHouseDetails.find(wareHouse => wareHouse.id === productPurchase.wareHouseId);
                const productDetail = productDetails.find(product => product.id === productPurchase.productId);
                return {
                    uuid: productPurchase.uuid,
                    warehouse: wareHouseDetail,
                    user: userPublicProfile,
                    product: productDetail,
                    inFlowQuantity: productPurchase.inFlowQuantity,
                    outFlowQuantity: productPurchase.outFlowQuantity,
                    availableQuantity: productPurchase.availableQuantity,
                    createdAt: productPurchase.createdAt,
                };
            });
            const resData = {
                status: true,
                data: transformedWareHouseProductListsDataset
            };
            return resData;
        });
    }
    getWareHouseProductOrderHistory(req, wareHouseUuid, productUuid, productPurchaseUuid, pageNumber, sortOrder, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseProductOrderHistoryRepo = connection.getRepository(WareHouseProductOrderHistory_1.WareHouseProductOrderHistory);
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const productRepo = connection.getRepository(Product_1.Product);
            const userRepo = connection.getRepository(User_1.User);
            const orderRepo = connection.getRepository(Order_1.Order);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            const existingProduct = yield productRepo.findOne({ uuid: productUuid });
            if (!existingProduct) {
                throw new error_response_types_1.UnprocessableEntityError('selected product does not does not exist');
            }
            const wareHouseProductPurchase = yield wareHouseProductPurchaseRepo.findOne({
                uuid: productPurchaseUuid,
                productId: existingProduct.id
            });
            if (!wareHouseProductPurchase) {
                throw new error_response_types_1.UnprocessableEntityError('selected product purchase history doest exist');
            }
            let query = {};
            query = { productPurchaseId: wareHouseProductPurchase.id, productId: existingProduct.id, };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const pageSize = 10;
            const totalCount = yield wareHouseProductOrderHistoryRepo.count(query);
            const warehouseProductPurchaseOrderHistoryListsPages = yield PaginationService.paginate(WareHouseProductOrderHistory_1.WareHouseProductOrderHistory, query, pageSize, pageNumber, sortOrder, undefined);
            if (warehouseProductPurchaseOrderHistoryListsPages.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No items Found');
            }
            const productOrderHistory = warehouseProductPurchaseOrderHistoryListsPages.dataset;
            const orderIds = productOrderHistory.map(order => order.orderId);
            const productOrders = yield orderRepo.find({
                where: { id: (0, typeorm_1.In)(orderIds) }
            });
            const transformedProductOrderedListsDataset = productOrderHistory.map(productPurchaseOrder => {
                const orderDetails = productOrders.find(order => order.id === productPurchaseOrder.orderId);
                const product = orderDetails.orderItems.find(item => item.productId === existingProduct.id);
                return {
                    uuid: productPurchaseOrder.uuid,
                    productName: product.productName,
                    quantity: product.quantity,
                    order: orderDetails,
                    orderReference: orderDetails.referenceNumber,
                    status: orderDetails.status,
                    calculatedTotalOrderAmountMajor: orderDetails.calculatedTotalCostMajor,
                    createdAt: productPurchaseOrder.createdAt,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProductOrderedListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetWareHouseToSiteDeliveryRequests(req, sortOrder, wareHouseUuid, pageNumber, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            let query = {};
            query = { wareHouseId: existingWareHouse.id, userId: currentUser.id };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield wareHouseToSiteProductDeliveryRepo.count({
                where: query,
            });
            const pageResult = yield PaginationService.paginate(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder);
            if (pageResult.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Items Found');
            }
            const warehouseToSiteDeliveryRequestDataSet = pageResult.dataset;
            const siteDeliveryLocationIds = warehouseToSiteDeliveryRequestDataSet.map(item => item.deliveryLocationId);
            const deliveryLocationSites = yield DeliveryLocationRepo.find({
                where: { id: (0, typeorm_1.In)(siteDeliveryLocationIds) }
            });
            const WareHouseIds = warehouseToSiteDeliveryRequestDataSet.map(item => item.wareHouseId);
            const wareHouses = yield wareHouseRepo.find({
                where: { id: (0, typeorm_1.In)(WareHouseIds) }
            });
            const transformedWareHouseProductLists = warehouseToSiteDeliveryRequestDataSet.map(deliveryRequest => {
                const deliverySiteDetails = deliveryLocationSites.find(item => item.id === deliveryRequest.deliveryLocationId);
                const wareHouseDetails = wareHouses.find(item => item.id === deliveryRequest.wareHouseId);
                return {
                    uuid: deliveryRequest.uuid,
                    wareHouseDetails,
                    userId: deliveryRequest.userId,
                    deliveryItems: deliveryRequest.deliveryItems,
                    deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
                    status: deliveryRequest.deliveryFeeStatus,
                    totalAmountMajor: deliveryRequest.totalAmountMajor,
                    deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
                    deliverySiteDetails: underscore_1.default.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                    createdAt: deliveryRequest.createdAt
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedWareHouseProductLists, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleDeliveryRequestToSite(req, wareHouseUuid, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deliveryLocationUuid, deliveryItems } = requestBody;
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const deliveryRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            yield WareHouseService.canDeliveryItemBeProceesed(currentUser, deliveryItems, existingWareHouse.id);
            const deliveryLocation = yield deliveryRepo.findOne({ uuid: deliveryLocationUuid, wareHouseId: existingWareHouse.id });
            if (!deliveryLocation) {
                throw new error_response_types_1.UnprocessableEntityError('Site delivery location does not exist');
            }
            yield WareHouseService.createDeliveryToSiteRequest(currentUser, deliveryItems, existingWareHouse, deliveryLocation);
            const resData = {
                status: true
            };
            return resData;
        });
    }
    acceptDeliveryRequestToSiteFee(req, wareHouseUuid, deliveryToSiteUuid, acceptOrDecline, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, paymentVariant } = requestBody;
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('Selected warehouse does not exist');
            }
            if (!currentUser.isDeveloper) {
                yield CooperateService.isCooperateAccount(currentUser);
                yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            }
            const existingWareHouseToSiteDelivery = yield wareHouseToSiteProductDeliveryRepo.findOne({
                uuid: deliveryToSiteUuid,
                wareHouseId: existingWareHouse.id
            });
            if (!existingWareHouseToSiteDelivery) {
                throw new error_response_types_1.UnprocessableEntityError('Selected delivery to site does not exist');
            }
            yield WareHouseService.hasDeliveryBeenProcessed(existingWareHouseToSiteDelivery);
            const acceptAsBoolean = acceptOrDecline === AcceptOrDeclineType_1.AcceptOrDeclineType.ACCEPT;
            let paymentResponse;
            if (acceptAsBoolean) {
                if (status !== Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED) {
                    throw new error_response_types_1.UnprocessableEntityError('Payment for Delivery fee must carry status of DELIVERY_FEE_ACCEPTED ');
                }
                paymentResponse = yield WareHouseService.processAcceptDeliveryFees(currentUser, existingWareHouseToSiteDelivery, existingWareHouse, paymentVariant);
            }
            else {
                yield WareHouseService.processDeclineDeliveryFees(status, existingWareHouseToSiteDelivery);
            }
            const resData = {
                status: true,
                data: paymentResponse
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleCreateNewWareHouse", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleFetchMyWareHouses", null);
__decorate([
    (0, tsoa_1.Get)('/delivery-to-site'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("startDate")),
    __param(4, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleGetSiteDeliveryRequests", null);
__decorate([
    (0, tsoa_1.Get)('/delivery-to-site/:deliveryRequestUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("deliveryRequestUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleFetchDeliveryDetails", null);
__decorate([
    (0, tsoa_1.Get)('/delivery-to-site/:deliverySiteUuid/site'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("deliverySiteUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleFetchSingleDeliveryRquest", null);
__decorate([
    (0, tsoa_1.Get)('/:wareHouseUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleFetchWareHouseDetails", null);
__decorate([
    (0, tsoa_1.Delete)('/:wareHouseUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleDeleteWareHouse", null);
__decorate([
    (0, tsoa_1.Patch)('/:wareHouseUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "updateNewWareHouse", null);
__decorate([
    (0, tsoa_1.Post)("/:wareHouseUuid/sites"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleCreateNewWareHouseSite", null);
__decorate([
    (0, tsoa_1.Get)('/:wareHouseUuid/sites'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleFetchWareHouseSites", null);
__decorate([
    (0, tsoa_1.Get)("/:wareHouseUuid/product_purchase"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(4, (0, tsoa_1.Query)("startDate")),
    __param(5, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "getWareHouseProductPurchases", null);
__decorate([
    (0, tsoa_1.Get)("/:wareHouseUuid/product_purchase/byDate"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Query)("startDate")),
    __param(3, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "getWareHouseProductPurchaseByDate", null);
__decorate([
    (0, tsoa_1.Get)("/:wareHouseUuid/"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Query)("productUuid")),
    __param(3, (0, tsoa_1.Query)("productPurchaseUuid")),
    __param(4, (0, tsoa_1.Query)("pageNumber")),
    __param(5, (0, tsoa_1.Query)("sortOrder")),
    __param(6, (0, tsoa_1.Query)("startDate")),
    __param(7, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "getWareHouseProductOrderHistory", null);
__decorate([
    (0, tsoa_1.Get)('/:wareHouseUuid/delivery-to-site'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(3, (0, tsoa_1.Query)("pageNumber")),
    __param(4, (0, tsoa_1.Query)("startDate")),
    __param(5, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleGetWareHouseToSiteDeliveryRequests", null);
__decorate([
    (0, tsoa_1.Post)("/:wareHouseUuid/delivery-to-site"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "handleDeliveryRequestToSite", null);
__decorate([
    (0, tsoa_1.Post)("/:wareHouseUuid/delivery-to-site/:deliveryRequestUuid/:acceptOrDecline"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __param(2, (0, tsoa_1.Path)("deliveryRequestUuid")),
    __param(3, (0, tsoa_1.Path)("acceptOrDecline")),
    __param(4, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], WareHouseController.prototype, "acceptDeliveryRequestToSiteFee", null);
WareHouseController = __decorate([
    (0, tsoa_1.Route)("api/warehouse"),
    (0, tsoa_1.Tags)('Warehouse'),
    (0, tsoa_1.Security)("jwt")
], WareHouseController);
exports.WareHouseController = WareHouseController;
//# sourceMappingURL=WareHouseController.js.map