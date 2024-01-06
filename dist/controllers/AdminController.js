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
exports.AdminController = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const moment_1 = __importDefault(require("moment"));
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const typeorm_1 = require("typeorm");
const Constant = __importStar(require("../constants"));
const db_1 = require("../db");
const Account_1 = require("../entity/Account");
const Brand_1 = require("../entity/Brand");
const Category_1 = require("../entity/Category");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Order_1 = require("../entity/Order");
const Product_1 = require("../entity/Product");
const ProductLease_1 = require("../entity/ProductLease");
const Promotion_1 = require("../entity/Promotion");
const RequestBankDetailsChange_1 = require("../entity/RequestBankDetailsChange");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const WalletToWalletTransfer_1 = require("../entity/WalletToWalletTransfer");
const AccountType_1 = require("../enums/AccountType");
const Currency_1 = require("../enums/Currency");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Roles_1 = require("../enums/Roles");
const SortOrder_1 = require("../enums/SortOrder");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const WalletType_1 = require("../enums/WalletType");
const AdminService = __importStar(require("../services/adminService"));
const auditLogService = __importStar(require("../services/auditLogService"));
const DeveloperService = __importStar(require("../services/developerService"));
const EmailService = __importStar(require("../services/emailService"));
const MortgageCardService = __importStar(require("../services/mortgageCardService"));
const NotificationService = __importStar(require("../services/notificationService"));
const OrderService = __importStar(require("../services/orderService"));
const PaginationService = __importStar(require("../services/paginationService"));
const PaymentService = __importStar(require("../services/paymentService"));
const PaystackService = __importStar(require("../services/paystackService"));
const PriceMatrixService = __importStar(require("../services/priceMatrixService"));
const ProductLeaseService = __importStar(require("../services/productLeaseService"));
const ProductService = __importStar(require("../services/productsService"));
const ProductsService = __importStar(require("../services/productsService"));
const ProfileService = __importStar(require("../services/profileService"));
const ProjectService = __importStar(require("../services/projectService"));
const PromotionService = __importStar(require("../services/promotionService"));
const QouteRequestService = __importStar(require("../services/quoteRequestService"));
const AccountStatService = __importStar(require("../services/sellerAccountStatService"));
const SmsService = __importStar(require("../services/smsSendingService"));
const WalletService = __importStar(require("../services/walletService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const AuditLogs_1 = require("../entity/AuditLogs");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const MortgageAccountVerification_1 = require("../entity/MortgageAccountVerification");
const PaystackDedicatedNuban_1 = require("../entity/PaystackDedicatedNuban");
const PickupLocation_1 = require("../entity/PickupLocation");
const PriceMatrix_1 = require("../entity/PriceMatrix");
const Procurement_1 = require("../entity/Procurement");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const Project_1 = require("../entity/Project");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const WareHouse_1 = require("../entity/WareHouse");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const FileUpload_1 = require("../enums/FileUpload");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const ProjectEnums_1 = require("../enums/ProjectEnums");
// DO NOT EXPORT DEFAULT
let AdminController = class AdminController extends tsoa_1.Controller {
    createCategories(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = requestBody;
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            const categoryExist = yield categoryRepository.findOne({
                name: categoryData.name,
            });
            if (categoryExist) {
                throw new error_response_types_1.ConflictError("Category has already been created");
            }
            // send request to store image - coming back
            // category_data.image = cloudenlyurl
            const category = new Category_1.Category().initialize(categoryData);
            yield categoryRepository.save(category);
            this.setStatus(201);
            const resData = {
                status: true,
                data: categoryExist,
            };
            return resData;
        });
    }
    updateCategory(req, requestBody, categoryUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            const category = yield categoryRepo.findOne({
                uuid: categoryUuid,
            });
            if (!category) {
                this.setStatus(404);
                const resData = {
                    status: false,
                    error: "Specified cagegory does not exist",
                    message: "Specified category does not exist",
                };
                return resData;
            }
            if (requestBody.brandUuids) {
                const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
                const brands = yield brandRepo.find({
                    uuid: (0, typeorm_1.In)(requestBody.brandUuids),
                });
                category.brands = brands.map((brand) => {
                    return { name: brand.name, uuid: brand.uuid };
                });
            }
            if (requestBody.name) {
                category.name = requestBody.name;
            }
            if (requestBody.description) {
                category.description = requestBody.description;
            }
            if (requestBody.unitOfMeasurement) {
                category.description = requestBody.unitOfMeasurement;
            }
            yield category.save();
            this.setStatus(200);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    createBrand(requestBody) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const brandExist = yield brandRepo.findOne({
                name: requestBody.name,
            });
            if (brandExist) {
                throw new error_response_types_1.ConflictError("Brand has already been created");
            }
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            let categories = [];
            if (requestBody.categoryUuids) {
                categories = yield categoryRepo.find({
                    uuid: (0, typeorm_1.In)(requestBody.categoryUuids),
                });
            }
            let newBrand = new Brand_1.Brand().initialize(requestBody.name, categories);
            newBrand = yield brandRepo.save(newBrand);
            for (const category of categories) {
                const categoryExistingBrand = (_a = category.brands) === null || _a === void 0 ? void 0 : _a.find(catBrand => catBrand.name === requestBody.name);
                if (!categoryExistingBrand) {
                    yield categoryRepo.createQueryBuilder()
                        .update(Category_1.Category)
                        .set({
                        brands: [...category.brands, {
                                uuid: newBrand.uuid,
                                name: newBrand.name
                            }]
                    })
                        .where({
                        id: category.id
                    })
                        .execute();
                }
            }
            this.setStatus(201);
            const resData = {
                status: true,
                data: {
                    uuid: newBrand.uuid,
                    name: newBrand.name,
                },
            };
            return resData;
        });
    }
    updateBrand(req, requestBody, brandUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const brand = yield brandRepo.findOne({
                uuid: brandUuid,
            });
            if (!brand) {
                this.setStatus(404);
                const resData = {
                    status: false,
                    error: "Specified brand does not exist",
                    message: "Specified brand does not exist",
                };
                return resData;
            }
            if (!requestBody.name) {
                this.setStatus(400);
                const resData = {
                    status: false,
                    error: "No brand name specified",
                    message: "Please specify the name of the brand",
                };
                return resData;
            }
            if (requestBody.categoryUuids) {
                const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
                const categories = yield categoryRepo.find({
                    uuid: (0, typeorm_1.In)(requestBody.categoryUuids),
                });
                brand.categories = categories.map((cat) => {
                    return { name: cat.name, uuid: cat.uuid };
                });
            }
            else {
                brand.categories = [];
            }
            brand.save();
            this.setStatus(200);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleUsersFetch(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError("user ids were not specified");
                }
                const idsAsJsonNumberArray = idsAsJsonArray.map((anId) => Number(anId));
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                };
                const users = yield userRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const userIds = users.map(user => user.id);
                const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
                const resData = {
                    status: true,
                    data: publicProfiles,
                };
                return resData;
            }
            const query = {
                msisdn: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            };
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.id = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === 'phoneNumber') {
                        if (filtersAsJson[filterKey].startsWith('0')) {
                            query[filterKey] = filtersAsJson[filterKey].substring(1);
                        }
                    }
                }
            }
            const pageSize = 10;
            pageNumber = pageNumber || 1;
            const offset = (pageNumber - 1) * pageSize;
            const totalAssignmentsNumber = yield userRepo.count({
                where: query,
            });
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of users`);
            }
            const pageResult = yield PaginationService.paginate(User_1.User, query, 10, pageNumber, sortOrder);
            if (!pageResult.dataset.length) {
                return {
                    status: true,
                    data: {
                        pageNumber,
                        total: totalAssignmentsNumber,
                        pageSize,
                        dataset: [],
                    },
                };
            }
            const usersInDataset = pageResult.dataset.map((dataRecord) => {
                const user = dataRecord;
                return user;
            });
            const userIds = usersInDataset.map((user) => user.id);
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
            const resData = {
                status: true,
                data: {
                    dataset: publicProfiles,
                    pageNumber,
                    total: totalAssignmentsNumber,
                    pageSize,
                },
            };
            return resData;
        });
    }
    handleUserDetailsFetch(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const user = yield userRepo.findOne({ uuid: id });
            if (!user) {
                throw new error_response_types_1.NotFoundError("User not found!");
            }
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin([user.id]);
            const resData = {
                status: true,
                data: publicProfiles[0],
            };
            return resData;
        });
    }
    handleDeliveryLocationFetch(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError("Delivery Location ids were not specified");
                }
                const idsAsJsonNumberArray = idsAsJsonArray.map((anId) => Number(anId));
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                };
                const deliveryLocations = yield deliveryLocationRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const formattedDeliveryAddresses = deliveryLocations.map(location => {
                    return {
                        id: location.id,
                        userId: location.userId,
                        contactFullName: location.contactFullName,
                        contactPhoneNumber: location.contactPhoneNumber,
                        address: location.address,
                        state: location.state,
                        country: location.country,
                        createdAt: location.createdAt
                    };
                });
                const resData = {
                    status: true,
                    data: formattedDeliveryAddresses,
                };
                return resData;
            }
            const query = {};
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.userId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            pageNumber = pageNumber || 1;
            const offset = (pageNumber - 1) * pageSize;
            const totalAssignmentsNumber = yield deliveryLocationRepo.count({
                where: query,
            });
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of Delivery Location`);
            }
            const pageResult = yield PaginationService.paginate(DeliveryLocation_1.DeliveryLocation, query, 10, pageNumber, sortOrder);
            if (!pageResult.dataset.length) {
                return {
                    status: true,
                    data: {
                        pageNumber,
                        total: totalAssignmentsNumber,
                        pageSize,
                        dataset: [],
                    },
                };
            }
            const deliveryLocationInDataset = pageResult.dataset.map((dataRecord) => {
                const location = dataRecord;
                return location;
            });
            const formattedDeliveryAddresses = deliveryLocationInDataset.map(location => {
                return {
                    id: location.id,
                    userId: location.userId,
                    contactFullName: location.contactFullName,
                    contactPhoneNumber: location.contactPhoneNumber,
                    address: location.address,
                    state: location.state,
                    country: location.country,
                    createdAt: location.createdAt
                };
            });
            const resData = {
                status: true,
                data: {
                    dataset: formattedDeliveryAddresses,
                    pageNumber,
                    total: totalAssignmentsNumber,
                    pageSize,
                },
            };
            return resData;
        });
    }
    handleAddDeliveryLocation(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { address, contactFullName, contactPhoneNumber, userId, state } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const userRepo = connection.getRepository(User_1.User);
            const user = yield userRepo.findOne({
                where: {
                    id: userId
                }
            });
            if (!user) {
                throw new error_response_types_1.NotFoundError('User Does Not Exist');
            }
            const getDeliveryLocation = yield DeliveryLocationRepo.findOne({
                userId: user.id,
                address,
            });
            if (getDeliveryLocation) {
                throw new error_response_types_1.UnprocessableEntityError("Delivery Location Has Been Added On Your List");
            }
            const deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(user.id, address, state, 'Nigeria', contactFullName, contactPhoneNumber);
            yield DeliveryLocationRepo.save(deliveryLocation);
            const resData = {
                status: true,
                data: { uuid: deliveryLocation.uuid }
            };
            return resData;
        });
    }
    // ----------Product Lease
    handleGetAllProductLeasesForAdmin(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = (0, db_1.getFreshConnection)();
            const productLeaseRepo = (yield connection).getRepository(ProductLease_1.ProductLease);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const productLeases = yield productLeaseRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const userIds = productLeases.map(productLease => {
                    return productLease.userId;
                });
                const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
                const publicProductLeases = productLeases.map(productLease => {
                    const publicProfile = publicProfiles.find(pP => pP.userId === productLease.userId);
                    return productLease.transformForPublic(publicProfile);
                });
                const resData = {
                    status: true,
                    data: publicProductLeases,
                };
                return resData;
            }
            const query = {};
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === 'userId') {
                        query[filterKey] = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield productLeaseRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of users`);
            }
            const pageResult = yield PaginationService.paginate(ProductLease_1.ProductLease, query, pageSize, pageNumber, sortOrder);
            const userIds = pageResult.dataset.map(dataRecord => {
                const productLease = dataRecord;
                return productLease.userId;
            });
            if (!userIds.length) {
                const resData = {
                    status: true,
                    data: Object.assign(Object.assign({}, pageResult), { dataset: [] })
                };
                return resData;
            }
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
            const formattedDataSet = pageResult.dataset.map(dataRecord => {
                const productLease = dataRecord;
                const publicProfile = publicProfiles.find(pP => pP.userId === productLease.userId);
                return productLease.transformForPublic(publicProfile);
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetOneProductLeasesForAdmin(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = (yield connection).getRepository(ProductLease_1.ProductLease);
            const productLease = yield productLeaseRepo.findOne({
                where: {
                    uuid: id,
                },
            });
            if (!productLease) {
                throw new error_response_types_1.NotFoundError('Product lease not found');
            }
            const publicProfile = yield ProfileService.getPublicProfileFromUserId(productLease.userId);
            const publicProductLeases = Object.assign(Object.assign({}, productLease), { id: productLease.uuid, principalAmountMajor: productLease.principalAmountMinor / 100, nextLeasePaymentDueDateUtc: productLease.nextLeasePaymentDueDate, createdAtUtc: productLease.createdAt, publicProfile: publicProfile });
            const resData = {
                status: true,
                data: publicProductLeases,
            };
            return resData;
        });
    }
    handleProductLeaseStatusToggleByAdmin(req, reqBody) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            let { customerUserId } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            let customerUser;
            if (!customerUserId) {
                throw new error_response_types_1.BadRequestError("Customer User Id was not sent");
            }
            else {
                customerUserId = Number(customerUserId);
            }
            if (customerUserId) {
                customerUser = yield userRepo.findOne({ id: customerUserId });
                if (!customerUser) {
                    throw new error_response_types_1.NotFoundError("Customer not found");
                }
            }
            if (!customerUser) {
                throw new error_response_types_1.NotFoundError("Customer not found");
            }
            const isOnProductLease = !!((_a = customerUser.settings) === null || _a === void 0 ? void 0 : _a.isOnProductLease);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                settings: Object.assign(Object.assign({}, customerUser === null || customerUser === void 0 ? void 0 : customerUser.settings), { isOnProductLease: !isOnProductLease }),
            })
                .where({ id: customerUserId })
                .execute();
            if (!isOnProductLease) {
                // EmailService.sendCustomerEnabledForPlp(customerUser)
            }
            // Send Both IN_APP and Email Notification
            const enablePlpMail = yield EmailService.sendCustomerEnabledForPlp(customerUser);
            console.log(enablePlpMail);
            const notificationTransports = {
                [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            };
            yield NotificationService.sendSingleNotificationToUserId(customerUser.id, customerUser.uuid, NotificationMessageTypes_1.default.ENABLE_PLP, 'PLP Enabled', 'This is to notify you that you have been enabled to begin the supply process for <b>PLP</b>You may now Proceed to Raise a Quote Request on the <b>CinderBuild</b> Website.<Br> We are always available to assist you.', notificationTransports);
            const resData = {
                status: true,
                data: !isOnProductLease,
            };
            return resData;
        });
    }
    // @Put("/productleases/delayed/toggle")
    // @Security("jwt")
    // public async handleProductLeaseDelayedToggleByAdmin(
    //   @Request() req: any,
    //   @Body() reqBody: INewProductLeaseStatusToggleDto
    // ): Promise<IServerResponse<boolean>> {
    //   const currentAdminUser: User = req.user;
    //   await AdminService.isValidAdmin(currentAdminUser);
    //   let { customerUserId } = reqBody;
    //   const connection = await getFreshConnection();
    //   const userRepo = connection.getRepository(User);
    //   let customerUser: User;
    //   if (!customerUserId) {
    //     throw new BadRequestError("Customer User Id was not sent");
    //   } else {
    //     customerUserId = Number(customerUserId!);
    //   }
    //   if (!customerUser) {
    //     customerUser = await userRepo.findOne({ id: customerUserId });
    //     if (!customerUser) {
    //       throw new NotFoundError("Customer not found");
    //     }
    //   }
    //   const isOnDelayedProductLease = !!customerUser.settings?.isOnDelayedProductLease;
    //   await userRepo
    //     .createQueryBuilder()
    //     .update(User)
    //     .set({
    //       settings: {
    //         ...customerUser.settings,
    //         isOnDelayedProductLease: !isOnDelayedProductLease,
    //       },
    //     })
    //     .where({ id: customerUserId! })
    //     .execute();
    //   const resData: IServerResponse<boolean> = {
    //     status: true,
    //     data: !isOnDelayedProductLease,
    //   };
    //   return resData;
    // }
    //--
    handleNewProductLeaseByAdmin(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { customerMsisdn, principalAmountMinor, interestRatePercentage } = reqBody;
            let { customerUserId } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            let customerUser;
            if (customerMsisdn) {
                customerUser = yield userRepo.findOne({ msisdn: customerMsisdn });
                if (!customerUser) {
                    throw new error_response_types_1.NotFoundError('Customer not found');
                }
                customerUserId = customerUser.id;
            }
            else if (customerUserId) {
                customerUser = yield userRepo.findOne({ id: customerUserId });
                if (!customerUser) {
                    throw new error_response_types_1.NotFoundError('Customer not found');
                }
            }
            else if (!customerUserId) {
                throw new error_response_types_1.BadRequestError('Customer User Id was not sent');
            }
            if (!customerUser) {
                throw new error_response_types_1.NotFoundError("Customer not found");
            }
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const currentSettings = customerUser.settings || {};
            yield userRepo.createQueryBuilder()
                .update(User_1.User)
                .set({ settings: Object.assign(Object.assign({}, currentSettings), { isOnProductLease: true }) })
                .where({ id: customerUserId })
                .execute();
            const activeProductLease = yield productLeaseRepo.findOne({
                userId: customerUserId,
                isActive: true,
                isSoftDeleted: false,
            });
            if (activeProductLease) {
                throw new error_response_types_1.ConflictError('An existing product lease exists');
            }
            const currency = Utils.countryToCurrency(customerUser.countryLongName);
            const newNextLeasePaymentDueDate = moment_1.default.utc().add(30, 'days').toDate();
            const productLease = new ProductLease_1.ProductLease().initialize(customerUser.id, principalAmountMinor, newNextLeasePaymentDueDate, interestRatePercentage, currency);
            const createdProductLease = yield productLeaseRepo.save(productLease);
            const publicProfile = yield ProfileService.getPublicProfileFromUserId(customerUserId);
            const resData = {
                status: true,
                data: {
                    id: createdProductLease.uuid,
                    uuid: createdProductLease.uuid,
                    publicProfile,
                    principalAmountMajor: createdProductLease.principalAmountMinor / 100,
                    interestRatePercentage: createdProductLease.interestRatePercentage,
                    nextLeasePaymentDueDateUtc: createdProductLease.nextLeasePaymentDueDate,
                    createdAtUtc: createdProductLease.createdAt,
                    currency: createdProductLease.currency,
                }
            };
            return resData;
        });
    }
    handleEditProductLease(req, id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { principalAmountMinor, interestRatePercentage, nextLeasePaymentDueDate, isActive } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const productLease = yield productLeaseRepo.findOne({ uuid: id });
            if (!productLease) {
                throw new error_response_types_1.ConflictError('Product lease does not exist');
            }
            if (isActive) {
                if (principalAmountMinor >= 0) {
                    productLease.principalAmountMinor = principalAmountMinor;
                    productLease.interestRatePercentage = interestRatePercentage;
                    if (nextLeasePaymentDueDate && nextLeasePaymentDueDate.length) {
                        const nextLeasePaymentDueDateMoment = moment_1.default.utc(nextLeasePaymentDueDate);
                        if (nextLeasePaymentDueDateMoment.isValid()) {
                            productLease.nextLeasePaymentDueDate = nextLeasePaymentDueDateMoment.toDate();
                        }
                        else {
                            throw new error_response_types_1.BadRequestError('Next lease payment due date is in valid');
                        }
                    }
                }
                else {
                    productLease.isActive = false;
                }
                productLease.isActive = true;
            }
            else {
                productLease.isActive = false;
            }
            // const newNextLeasePaymentDueDate = moment.utc().add(30, 'days').toDate()
            const updatedProductLease = yield productLeaseRepo.save(productLease);
            const publicProfile = yield ProfileService.getPublicProfileFromUserId(updatedProductLease.userId);
            const resData = {
                status: true,
                data: {
                    id: updatedProductLease.uuid,
                    uuid: updatedProductLease.uuid,
                    publicProfile,
                    principalAmountMajor: updatedProductLease.principalAmountMinor / 100,
                    interestRatePercentage: updatedProductLease.interestRatePercentage,
                    nextLeasePaymentDueDateUtc: updatedProductLease.nextLeasePaymentDueDate,
                    createdAtUtc: updatedProductLease.createdAt,
                    currency: updatedProductLease.currency,
                }
            };
            return resData;
        });
    }
    productLeaseStatus(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const foundUser = yield userRepo.findOne({ uuid: id });
            if (!foundUser) {
                throw new error_response_types_1.NotFoundError("The user was not found");
            }
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const activeProductLease = yield productLeaseRepo.findOne({
                userId: foundUser.id,
                isActive: true,
                isSoftDeleted: false,
            });
            if (!activeProductLease) {
                return {
                    status: true,
                };
            }
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            const accountMainWallet = yield walletRepo.findOne({
                where: { userId: foundUser.id, loanProvider: null },
                order: { createdAt: 'ASC' }
            });
            const amountDueMajor = Number((activeProductLease.principalAmountMinor / 100 * activeProductLease.interestRatePercentage / 100).toFixed(2));
            const resData = {
                status: true,
                data: {
                    uuid: activeProductLease.uuid,
                    principalAmountMajor: activeProductLease.principalAmountMinor / 100,
                    amountDueMajor,
                    interestRatePercentage: activeProductLease.interestRatePercentage,
                    nextLeasePaymentDueDateUtc: activeProductLease.nextLeasePaymentDueDate,
                    totalLoanAmountDue: Math.abs(accountMainWallet.walletBalanceMinor) / 100,
                    createdAtUtc: activeProductLease.createdAt,
                    currency: activeProductLease.currency,
                }
            };
            return resData;
        });
    }
    handleGetAllFinancialTransactionsForAdmin(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = (0, db_1.getFreshConnection)();
            const financialTransactionRepo = (yield connection).getRepository(FinancialTransaction_1.FinancialTransaction);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const financialTransactions = yield financialTransactionRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const userIds = financialTransactions.map(fTransaction => {
                    return fTransaction.userId;
                });
                const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
                const transformedTransactions = [];
                for (const fTransaction of financialTransactions) {
                    const publicProfile = publicProfiles.find(pP => pP.userId === fTransaction.userId);
                    if (publicProfile) {
                        transformedTransactions.push(Object.assign(Object.assign({}, fTransaction.toResponseDto()), { id: fTransaction.uuid, userId: fTransaction.userId, publicProfile: publicProfile }));
                    }
                }
                const resData = {
                    status: true,
                    data: transformedTransactions,
                };
                return resData;
            }
            const query = {};
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === 'userId') {
                        query[filterKey] = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield financialTransactionRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of users`);
            }
            const pageResult = yield PaginationService.paginate(FinancialTransaction_1.FinancialTransaction, query, pageSize, pageNumber, sortOrder);
            const userIds = pageResult.dataset.map(dataRecord => {
                const productLease = dataRecord;
                return productLease.userId;
            });
            if (!userIds.length) {
                const resData = {
                    status: true,
                    data: Object.assign(Object.assign({}, pageResult), { dataset: [] })
                };
                return resData;
            }
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
            const formattedDataSet = pageResult.dataset.map(dataRecord => {
                const fTransaction = dataRecord;
                const publicProfile = publicProfiles.find(pP => pP.userId === fTransaction.userId);
                return Object.assign(Object.assign({}, fTransaction.toResponseDto()), { id: fTransaction.uuid, userId: fTransaction.userId, publicProfile: publicProfile });
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleNewFinancialTransactionByAdmin(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { userId, amountMajor, description } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const amountMinor = amountMajor * 100;
            const customerUser = yield userRepo.findOne({ id: userId });
            if (!customerUser) {
                throw new error_response_types_1.NotFoundError('Customer not found');
            }
            const financialTransactionRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
            const sourceAccountWallet = yield WalletService.getCustomerWallet(customerUser.id);
            const walletBalanceMinorBefore = sourceAccountWallet.walletBalanceMinor;
            const metadata = {};
            let transaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceAccountWallet, PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET, Math.abs(amountMinor), walletBalanceMinorBefore, sourceAccountWallet.walletBalanceMinor + amountMinor, sourceAccountWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
            transaction.description = description || "";
            transaction = yield financialTransactionRepo.save(transaction);
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            yield walletRepo.createQueryBuilder()
                .update(Wallet_1.Wallet)
                .set({
                walletBalanceMinor: sourceAccountWallet.walletBalanceMinor + amountMinor,
            })
                .where({
                id: sourceAccountWallet.id
            })
                .execute();
            yield PaymentService.processAnyUnpaidOrders(sourceAccountWallet.userId);
            const currentSourceAccountWallet = yield WalletService.getCustomerWallet(customerUser.id);
            if (currentSourceAccountWallet.walletBalanceMinor > 0) {
                yield ProductLeaseService.updateProductLeaseState(customerUser.id, undefined, amountMinor, sourceAccountWallet.walletBalanceMinor);
            }
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin([userId]);
            const transformedTransaction = Object.assign(Object.assign({}, transaction.toResponseDto()), { id: transaction.uuid, userId: transaction.userId, publicProfile: publicProfiles[0] });
            const resData = {
                status: true,
                data: transformedTransaction
            };
            return resData;
        });
    }
    promotionalMail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const users = yield userRepo.find();
            for (const user of users) {
                // eslint-disable-next-line no-await-in-loop
                yield EmailService.sendPromotionalMail(user);
            }
            const resData = {
                status: true,
                data: true,
            };
            return resData;
        });
    }
    cancelOrderByAdmin(req, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const userRepo = connection.getRepository(User_1.User);
            const orderDetails = yield orderRepo.findOne({
                uuid: orderUuid,
                paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY
            });
            const buyer = yield userRepo.findOne({
                id: orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.buyerUserId
            });
            if (!orderDetails) {
                throw new error_response_types_1.ConflictError('Order Does not Exist');
            }
            if (orderDetails.status === Statuses_1.default.CONFIRMED) {
                throw new error_response_types_1.ConflictError('Order has already been Confirmed');
            }
            if (orderDetails.status === Statuses_1.default.CANCELLED_BY_ADMIN) {
                throw new error_response_types_1.ConflictError('Order has already been cancelled by the admin');
            }
            if (orderDetails.status === Statuses_1.default.CANCELLED_BY_BUYER) {
                throw new error_response_types_1.ConflictError('Order has already been cancelled by the buyer');
            }
            if (orderDetails.status === Statuses_1.default.CANCELLED_BY_SELLER) {
                throw new error_response_types_1.ConflictError('Order has already been cancelled by the seller');
            }
            orderDetails.statusHistory.push({
                status: Statuses_1.default.CANCELLED_BY_ADMIN,
                dateTimeInISO8601: Utils.utcNow().toISOString(),
            });
            const updateQuery = {
                status: Statuses_1.default.CANCELLED_BY_ADMIN,
                statusHistory: orderDetails.statusHistory
            };
            const walletBalanceDeductStatus = yield connection.transaction((transactionManager) => __awaiter(this, void 0, void 0, function* () {
                const orderRepoT = transactionManager.getRepository(Order_1.Order);
                if (orderDetails.paymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                    yield OrderService.revertDeductUpFrontPaymentForPOD(orderDetails, buyer, transactionManager);
                }
                yield orderRepoT
                    .createQueryBuilder()
                    .update(Order_1.Order)
                    .set(updateQuery)
                    .where({
                    id: orderDetails.id,
                })
                    .execute();
                return true;
            }));
            const resData = {
                status: true,
                data: true,
            };
            return resData;
        });
    }
    orderPaymentDefaultByAdmin(req, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const orderDetails = yield orderRepo.findOne({
                uuid: orderUuid,
                paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY
            });
            if (!orderDetails) {
                throw new error_response_types_1.ConflictError('Order Does not Exist');
            }
            if (orderDetails.status === Statuses_1.default.CANCELLED_BY_ADMIN) {
                throw new error_response_types_1.ConflictError('Order has already been cancel by admin');
            }
            if (orderDetails.status === Statuses_1.default.PAYMENT_DEFAULT) {
                throw new error_response_types_1.ConflictError('Order has already been flagged as in default by admin');
            }
            if (orderDetails.paymentStatus !== Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
                throw new error_response_types_1.ConflictError('Order should have a payment pending payment status in order to flag it as in default');
            }
            const isSuccessfult = yield AdminService.markPodOrderPaymentDefault(orderDetails);
            const resData = {
                status: true,
                data: isSuccessfult,
            };
            return resData;
        });
    }
    newPromotion(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { categoryUuid, percentage, name } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const promotionRepo = connection.getRepository(Promotion_1.Promotion);
            const categoryRepo = connection.getRepository(Category_1.Category);
            const category = yield categoryRepo.findOne({ uuid: categoryUuid });
            if (!category) {
                throw new error_response_types_1.NotFoundError('Category Does not Exist');
            }
            const newPromotion = new Promotion_1.Promotion().initialize(name, category.id, percentage);
            yield promotionRepo.save(newPromotion);
            const resData = {
                status: true,
                data: true,
            };
            return resData;
        });
    }
    handleGetPromotions(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const promotionRepo = connection.getRepository(Promotion_1.Promotion);
            const join = {
                alias: "promotion",
                leftJoinAndSelect: {
                    categoryPromotion: "promotion.categoryPromotion",
                },
            };
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const promotions = yield promotionRepo.find({
                    where: query,
                    join,
                    order: { createdAt: sortOrder },
                });
                const resData = {
                    status: true,
                    data: promotions,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            const totalAssignmentsNumber = yield promotionRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of promotions`);
            }
            const pageResult = yield PaginationService.paginate(Promotion_1.Promotion, query, pageSize, pageNumber, sortOrder, undefined, join);
            const promotionsDataSet = pageResult.dataset;
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: promotionsDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetCategories(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const categoryRepo = connection.getRepository(Category_1.Category);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const categories = yield categoryRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const resData = {
                    status: true,
                    data: categories,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            const totalAssignmentsNumber = yield categoryRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of categories`);
            }
            const pageResult = yield PaginationService.paginate(Category_1.Category, query, pageSize, pageNumber, sortOrder);
            const categoriesDataSet = pageResult.dataset;
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: categoriesDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetBrands(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const brandRepo = connection.getRepository(Brand_1.Brand);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('brands ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                    isSoftDeleted: false
                };
                const brands = yield brandRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const resData = {
                    status: true,
                    data: brands,
                };
                return resData;
            }
            const query = { isSoftDeleted: false };
            const pageSize = 10;
            const totalAssignmentsNumber = yield brandRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of Brands`);
            }
            const pageResult = yield PaginationService.paginate(Brand_1.Brand, query, pageSize, pageNumber, sortOrder);
            const brandsDataSet = pageResult.dataset;
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: brandsDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    newAffiliate(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { firstName, lastName, phoneNumber, emailAddress } = requestBody;
            const awesomePhoneNumber = new awesome_phonenumber_1.default(phoneNumber, "NG");
            if (!awesomePhoneNumber.isValid()) {
                throw new error_response_types_1.UnprocessableEntityError('Phone number is invalid');
            }
            const msisdn = awesomePhoneNumber.getNumber();
            const randomNumericPassword = Utils.generateOtp(6);
            const passwordHash = yield Utils.generatePasswordHash(randomNumericPassword);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const existingUser = yield userRepo.findOne({
                msisdn,
            });
            if (existingUser) {
                throw new error_response_types_1.ConflictError("Another user already exists with the same phone number");
            }
            const savedUser = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const userRepoT = transactionalEntityManager.getRepository(User_1.User);
                const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
                const accountRepoT = transactionalEntityManager.getRepository(Account_1.Account);
                let newUser = new User_1.User().initializeAffiliate(firstName, lastName, phoneNumber, msisdn, emailAddress !== null && emailAddress !== void 0 ? emailAddress : undefined, passwordHash);
                newUser = yield userRepoT.save(newUser);
                const account = new Account_1.Account().initialize(newUser.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
                const userAccount = yield accountRepoT.save(account);
                //--
                const currency = Currency_1.CountryToCurrency.NIGERIA;
                const wallet = new Wallet_1.Wallet().initialize(newUser.id, userAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, currency);
                yield walletRepoT.save(wallet);
                return newUser;
            }));
            if (savedUser) {
                if (savedUser.emailAddress) {
                    const userMailInfo = {
                        email: savedUser.emailAddress,
                        firstName: savedUser.firstName,
                        phoneNumber: savedUser.msisdn
                    };
                    yield EmailService.sendAffiliateWelcomeMail(userMailInfo, randomNumericPassword);
                }
                const smsMessage = `Your new affiliate CinderBuild account has been created. Your new password is: ${randomNumericPassword}`;
                const smsSentSuccessfully = yield SmsService.sendSms(msisdn, smsMessage);
            }
            const resData = {
                status: true,
                data: !!savedUser,
            };
            return resData;
        });
    }
    newsellerOma(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { firstName, lastName, phoneNumber, emailAddress, isOMA } = requestBody;
            const awesomePhoneNumber = new awesome_phonenumber_1.default(phoneNumber, "NG");
            if (isOMA === false) {
                if (!awesomePhoneNumber.isValid()) {
                    throw new error_response_types_1.UnprocessableEntityError('Phone number is invalid');
                }
            }
            const msisdn = awesomePhoneNumber.getNumber();
            const randomNumericPassword = Utils.generateOtp(6);
            const passwordHash = yield Utils.generatePasswordHash(randomNumericPassword);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const existingUser = yield userRepo.findOne({
                msisdn,
            });
            if (existingUser) {
                throw new error_response_types_1.ConflictError("Another user already exists with the same phone number");
            }
            const savedUser = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const userRepoT = transactionalEntityManager.getRepository(User_1.User);
                const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
                const accountRepoT = transactionalEntityManager.getRepository(Account_1.Account);
                let newUser = new User_1.User().initializeSellerOma(firstName, lastName, phoneNumber, msisdn, emailAddress !== null && emailAddress !== void 0 ? emailAddress : undefined, passwordHash);
                newUser = yield userRepoT.save(newUser);
                const account = new Account_1.Account().initialize(newUser.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
                const userAccount = yield accountRepoT.save(account);
                //--
                const currency = Currency_1.CountryToCurrency.NIGERIA;
                const wallet = new Wallet_1.Wallet().initialize(newUser.id, userAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, currency);
                yield walletRepoT.save(wallet);
                return newUser;
            }));
            if (savedUser) {
                if (savedUser.emailAddress && isOMA === false) {
                    const userMailInfo = {
                        email: savedUser.emailAddress,
                        firstName: savedUser.firstName,
                        phoneNumber: savedUser.msisdn
                    };
                    yield EmailService.sendsellerAdminWelcomeMail(userMailInfo, randomNumericPassword);
                }
                const smsMessage = `Your new CinderBuild account has been created. Your new password is: ${randomNumericPassword}`;
                yield SmsService.sendSms(msisdn, smsMessage);
                if (isOMA === true) {
                    // send mail to support / operation / Product about the new OMA User/
                    const omaMailInfo = {
                        email: Constant.SUPPORT_EMAIL,
                        firstName: savedUser.firstName,
                        phoneNumber: savedUser.msisdn
                    };
                    yield EmailService.sendsellerAdminWelcomeMail(omaMailInfo, randomNumericPassword);
                }
            }
            const resData = {
                status: true,
                data: !!savedUser,
            };
            return resData;
        });
    }
    handleGetAffiliates(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                    role: Roles_1.Roles.AFFILIATE,
                };
                const users = yield userRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const userIds = users.map(user => user.id);
                const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
                const resData = {
                    status: true,
                    data: publicProfiles,
                };
                return resData;
            }
            const query = {
                role: Roles_1.Roles.AFFILIATE
            };
            const pageSize = 10;
            const totalAssignmentsNumber = yield userRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of affiliate users`);
            }
            const pageResult = yield PaginationService.paginate(User_1.User, query, pageSize, pageNumber, sortOrder);
            const affiliateUsersDataSet = pageResult.dataset;
            const userIds = affiliateUsersDataSet.map((user) => user.id);
            const publicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: publicProfiles, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetOrders(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('user ids were not specified');
                }
                const query = {
                    id: (0, typeorm_1.In)(idsAsJsonArray),
                };
                const orders = yield orderRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const buyerUserIds = orders.map((user) => user.buyerUserId);
                const sellerUserIds = orders.map((user) => user.sellerUserId);
                const buyerPublicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(buyerUserIds);
                const sellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(sellerUserIds);
                const formattedOrdersDataset = [];
                for (const order of orders) {
                    const buyerPublicProfile = buyerPublicProfiles.find(bPp => bPp.userId === order.buyerUserId);
                    const sellerPublicProfile = sellerPublicProfiles.find(bPp => bPp.userId === order.sellerUserId);
                    formattedOrdersDataset.push(order.transformForAdmin(buyerPublicProfile, sellerPublicProfile));
                }
                const resData = {
                    status: true,
                    data: formattedOrdersDataset,
                };
                return resData;
            }
            const query = {};
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "buyerUserId") {
                        query.buyerUserId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "sellerUserId") {
                        query.sellerUserId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "referenceNumber") {
                        query.referenceNumber = filtersAsJson[filterKey];
                    }
                    if (filterKey === "affiliateUserId") {
                        query.receiverUserId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield orderRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of orders`);
            }
            const pageResult = yield PaginationService.paginate(Order_1.Order, query, pageSize, pageNumber, sortOrder);
            const ordersDataSet = pageResult.dataset;
            const buyerUserIds = ordersDataSet.map((user) => user.buyerUserId);
            const sellerUserIds = ordersDataSet.map((user) => user.sellerUserId);
            const buyerPublicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(buyerUserIds);
            const sellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIdsForAdmin(sellerUserIds);
            const formattedOrdersDataset = [];
            for (const order of ordersDataSet) {
                const buyerPublicProfile = buyerPublicProfiles.find(bPp => bPp.userId === order.buyerUserId);
                const sellerPublicProfile = sellerPublicProfiles.find(bPp => bPp.userId === order.sellerUserId);
                formattedOrdersDataset.push(order.transformForAdmin(buyerPublicProfile, sellerPublicProfile));
            }
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedOrdersDataset, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleOrderCreationFromPreparedCart(req, requestBody) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const userRepo = connection.getRepository(User_1.User);
            const buyerUser = yield userRepo.findOne({
                where: { id: requestBody.userId }
            });
            if (!buyerUser) {
                throw new error_response_types_1.NotFoundError('Buyer Does Not Exist');
            }
            if (buyerUser.role !== Roles_1.Roles.AFFILIATE) {
                const existingUnpaidOrders = yield orderRepo.find({
                    buyerUserId: buyerUser.id,
                    status: (0, typeorm_1.Not)((0, typeorm_1.In)([
                        Statuses_1.default.COMPLETED, Statuses_1.default.CONFIRMED, Statuses_1.default.ENDED_WITH_DISPUTES,
                        Statuses_1.default.CANCELLED_BY_BUYER, Statuses_1.default.CANCELLED_BY_SELLER, Statuses_1.default.CANCELLED_BY_ADMIN,
                    ])),
                    paymentStatus: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
                });
                if (existingUnpaidOrders.length) {
                    throw new error_response_types_1.UnprocessableEntityError('Please pay for your unpaid orders before creating a new one');
                }
            }
            let deliveryLocation;
            let pickupLocation;
            let wareHouse;
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (requestBody.deliveryAddressId) {
                    deliveryLocation = yield deliveryLocationRepo.findOne({
                        id: requestBody.deliveryAddressId,
                        userId: requestBody.userId
                    });
                    if (!deliveryLocation) {
                        throw new error_response_types_1.NotFoundError('Delivery Location Selected Does not Exist');
                    }
                }
            }
            else {
                pickupLocation = yield pickupLocationRepo.findOne({
                    id: requestBody.pickupLocationId
                });
            }
            const productRepo = connection.getRepository(Product_1.Product);
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                },
            };
            const product = yield productRepo.findOne({
                where: {
                    id: requestBody.productId,
                    isSoftDeleted: false,
                },
                join
            });
            if (!product) {
                throw new error_response_types_1.NotFoundError('The specified product could not be found');
            }
            // pus all the product int
            const unitPriceForBuyer = Utils.getPriceForBuyer(requestBody.unitPrice, product);
            const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
            const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
            const newOrderItem = [{
                    productId: product.id,
                    productUuid: product.uuid,
                    productName: product.name,
                    quantity: requestBody.quantity,
                    unitPrice: requestBody.unitPrice,
                    unitPriceForBuyer: unitPriceForBuyer,
                    unitPromoPriceForBuyer: unitPromoPriceForBuyer,
                    productCategorySettings: (_a = product.category) === null || _a === void 0 ? void 0 : _a.settings,
                    deliveryAddressState: deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.state,
                }];
            const createdOrders = yield OrderService.createOrders(buyerUser, newOrderItem, requestBody.orderReceiveType, requestBody.orderPaymentVariant, deliveryLocation, pickupLocation, wareHouse, requestBody.differentOrderReceiver);
            const orderPayResponse = yield OrderService.processOrdersPayment(createdOrders, requestBody.orderPaymentVariant, buyerUser);
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            return resData;
        });
    }
    handleGetWalletToWalletTransfers(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const walletToWalletTransferRepo = connection.getRepository(WalletToWalletTransfer_1.WalletToWalletTransfer);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const walletToWalletTransfers = yield walletToWalletTransferRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const resData = {
                    status: true,
                    data: walletToWalletTransfers,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            const totalAssignmentsNumber = yield walletToWalletTransferRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of wallet to wallet transfers`);
            }
            const pageResult = yield PaginationService.paginate(WalletToWalletTransfer_1.WalletToWalletTransfer, query, pageSize, pageNumber, sortOrder);
            const walletToWalletTransferDataSet = pageResult.dataset;
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: walletToWalletTransferDataSet, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleWalletToWalletTransferByAdmin(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { senderUserId, receiverUserId, amountMajor, description } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const totalTransferAmountMinor = amountMajor * 100;
            const senderUser = yield userRepo.findOne({ id: senderUserId });
            if (!senderUser) {
                throw new error_response_types_1.NotFoundError('Customer not found');
            }
            const receiverUser = yield userRepo.findOne({ id: receiverUserId });
            if (!receiverUser) {
                throw new error_response_types_1.NotFoundError('Customer not found');
            }
            const handlewalletFundTransfer = yield WalletService.walletToWalletTransfer(currentAdminUser.id, senderUserId, receiverUserId, totalTransferAmountMinor, description);
            if (handlewalletFundTransfer && receiverUser.role !== Roles_1.Roles.AFFILIATE) {
                // process any unpaid order
                yield PaymentService.processAnyUnpaidOrders(receiverUser.id);
                const resData = {
                    status: handlewalletFundTransfer,
                    data: handlewalletFundTransfer,
                };
                return resData;
            }
            const resData = {
                status: handlewalletFundTransfer,
                data: handlewalletFundTransfer,
            };
            return resData;
        });
    }
    handleOrderRecievedConfirmation(req, orderUuid, newOrderStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const userRepo = connection.getRepository(User_1.User);
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            const order = yield orderRepo.findOne({
                where: {
                    uuid: orderUuid
                },
                join,
            });
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            const currentUser = yield userRepo.findOne({ id: order.buyerUserId });
            if (!currentUser) {
                throw new error_response_types_1.NotFoundError("Order Buyer Does Not Exist");
            }
            yield OrderService.updateOrderStatus(order, newOrderStatus, currentUser);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetchangeOrder(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const order = yield orderRepo.findOne(id);
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            const orderDetails = yield OrderService.orderDetails(order);
            const resData = {
                status: true,
                data: orderDetails
            };
            return resData;
        });
    }
    handleOrderTotalChangeConfirmation(req, id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { newOrderAmountMajor, changeReason } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const order = yield orderRepo.findOne(id);
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            if (order.paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                throw new error_response_types_1.UnprocessableEntityError('You cannot change order total amount for non pay on delivery orders');
            }
            const orderSubTotalMajor = order.getSubTotal();
            console.log(orderSubTotalMajor);
            if (newOrderAmountMajor < orderSubTotalMajor) {
                throw new error_response_types_1.UnprocessableEntityError(`You cannot change the order total to less than the sub total: ${order.currency} ${orderSubTotalMajor}`);
            }
            if (order.calculatedTotalCostMajor === orderSubTotalMajor) {
                throw new error_response_types_1.UnprocessableEntityError(`No change was done on the system because the subtotal and order total are the same`);
            }
            if (order.status === Statuses_1.default.CANCELLED_BY_ADMIN) {
                throw new error_response_types_1.UnprocessableEntityError(`Cannot Change Order Amount that been Cancel By Admin`);
            }
            if (order.status === Statuses_1.default.CONFIRMED) {
                throw new error_response_types_1.UnprocessableEntityError(`Cannot Change Order that been confirm and closed`);
            }
            if (order.status === Statuses_1.default.RECEIVED) {
                throw new error_response_types_1.UnprocessableEntityError(`Cannot Change Order Amount that been Received`);
            }
            if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER) {
                throw new error_response_types_1.UnprocessableEntityError(`Cannot Change Order Amount that been Paid`);
            }
            yield OrderService.changeOrderTotalByAdmnin(order, newOrderAmountMajor, changeReason);
            const orderDetails = yield OrderService.orderDetails(order);
            const resData = {
                status: true,
                data: orderDetails
            };
            return resData;
        });
    }
    handleGetCategory(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const categoryRepo = connection.getRepository(Category_1.Category);
            const categoryDetails = yield categoryRepo.findOne(id);
            if (!categoryDetails) {
                throw new error_response_types_1.NotFoundError("Category was not found");
            }
            const resData = {
                status: true,
                data: categoryDetails
            };
            return resData;
        });
    }
    handleCategoryCinderbuildMergin(req, id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { newMarginAmountMajor, currency } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const categoryRepo = connection.getRepository(Category_1.Category);
            const category = yield categoryRepo.findOne(id);
            if (!category) {
                throw new error_response_types_1.NotFoundError('Category Does Not Exist');
            }
            yield AdminService.changeCinderbuildMargin(category.uuid, newMarginAmountMajor, currency);
            const resData = {
                status: true,
                data: category
            };
            return resData;
        });
    }
    handleGetWareHouseToSiteDeliveryRequests(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const warehouseTositeDeliveryRequests = yield wareHouseToSiteProductDeliveryRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const siteDeliveryLocationIds = warehouseTositeDeliveryRequests.map(item => item.deliveryLocationId);
                const deliveryLocationSites = yield DeliveryLocationRepo.find({
                    where: { id: (0, typeorm_1.In)(siteDeliveryLocationIds) }
                });
                const WareHouseIds = warehouseTositeDeliveryRequests.map(item => item.wareHouseId);
                const wareHouses = yield wareHouseRepo.find({
                    where: { id: (0, typeorm_1.In)(WareHouseIds) }
                });
                const transformedWareHouseProductLists = warehouseTositeDeliveryRequests.map(deliveryRequest => {
                    const deliverySiteDetails = deliveryLocationSites.find(item => item.id === deliveryRequest.deliveryLocationId);
                    const wareHouseDetails = wareHouses.find(item => item.id === deliveryRequest.wareHouseId);
                    return {
                        id: deliveryRequest.id,
                        uuid: deliveryRequest.uuid,
                        wareHouseDetails,
                        userId: deliveryRequest.userId,
                        deliveryItems: deliveryRequest.deliveryItems,
                        deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
                        status: deliveryRequest.deliveryFeeStatus,
                        totalAmountMajor: deliveryRequest.totalAmountMajor,
                        deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
                        deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                        createdAt: deliveryRequest.createdAt
                    };
                });
                const resData = {
                    status: true,
                    data: transformedWareHouseProductLists,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.userId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "wareHouseId") {
                        query.wareHouseId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const totalAssignmentsNumber = yield wareHouseToSiteProductDeliveryRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`);
            }
            const pageResult = yield PaginationService.paginate(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder);
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
                    id: deliveryRequest.id,
                    uuid: deliveryRequest.uuid,
                    wareHouseDetails,
                    userId: deliveryRequest.userId,
                    deliveryItems: deliveryRequest.deliveryItems,
                    deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
                    status: deliveryRequest.deliveryFeeStatus,
                    totalAmountMajor: deliveryRequest.totalAmountMajor,
                    deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
                    deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
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
    handleGetWarehouseToSiteDeliveryRequest(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const warehouseToSiteDeliveryRequest = yield wareHouseToSiteDeliveryRequestRepo.findOne(id);
            if (!warehouseToSiteDeliveryRequest) {
                throw new error_response_types_1.NotFoundError("Warehouse to Site Delivery Request was not found");
            }
            const wareHouseDetails = yield wareHouseRepo.findOne({ id: warehouseToSiteDeliveryRequest.wareHouseId });
            const deliverySiteDetails = yield deliveryLocationRepo.findOne({ id: warehouseToSiteDeliveryRequest.deliveryLocationId });
            const transformWareToSiteDelivery = {
                id: warehouseToSiteDeliveryRequest.id,
                uuid: warehouseToSiteDeliveryRequest.uuid,
                wareHouseDetails,
                userId: warehouseToSiteDeliveryRequest.userId,
                deliveryItems: warehouseToSiteDeliveryRequest.deliveryItems,
                deliveryRequestHistory: warehouseToSiteDeliveryRequest.deliveryFeeStatusHistory,
                status: warehouseToSiteDeliveryRequest.deliveryFeeStatus,
                totalAmountMajor: warehouseToSiteDeliveryRequest.totalAmountMajor,
                deliveryFeeAmountMajor: warehouseToSiteDeliveryRequest.deliveryFeeAmountMajor,
                deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
                createdAt: warehouseToSiteDeliveryRequest.createdAt
            };
            const resData = {
                status: true,
                data: transformWareToSiteDelivery
            };
            return resData;
        });
    }
    handleMarKDeliveryRequestAsShipped(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const wareHouseToSiteDeliveryRequest = yield wareHouseToSiteDeliveryRequestRepo.findOne(id);
            if (!wareHouseToSiteDeliveryRequest) {
                throw new error_response_types_1.NotFoundError("Delivery Request Does Not Exist");
            }
            if (wareHouseToSiteDeliveryRequest.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.REQUESTED) {
                throw new error_response_types_1.UnprocessableEntityError("Delivery Request Has Not Been Proccessed");
            }
            if (wareHouseToSiteDeliveryRequest.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET) {
                throw new error_response_types_1.UnprocessableEntityError("Delivery Request Has Not Been Proccessed");
            }
            if (wareHouseToSiteDeliveryRequest.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED) {
                throw new error_response_types_1.UnprocessableEntityError("Delivery Request Has Been Shipped to Site");
            }
            yield AdminService.markDeliveryRequestAsShipped(wareHouseToSiteDeliveryRequest);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetRequestBankAccountChange(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const requestBankDetailsChangeRepo = connection.getRepository(RequestBankDetailsChange_1.RequestBankDetailsChange);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                    isProcessed: false
                };
                const requestBankDetailsChanges = yield requestBankDetailsChangeRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const transformedRequestBankDetailsChanges = requestBankDetailsChanges.map(changeDetails => {
                    return {
                        id: changeDetails.id,
                        uuid: changeDetails.uuid,
                        userId: changeDetails.userId,
                        bankAccountName: changeDetails.bankAccountName,
                        accountNumber: changeDetails.accountNumber,
                        bankCode: changeDetails.bankCode,
                        bankName: changeDetails.bankName,
                        createdAt: changeDetails.createdAt
                    };
                });
                const resData = {
                    status: true,
                    data: transformedRequestBankDetailsChanges,
                };
                return resData;
            }
            const query = {
                isProcessed: false
            };
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.accountId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield requestBankDetailsChangeRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of change of bank details request`);
            }
            const pageResult = yield PaginationService.paginate(RequestBankDetailsChange_1.RequestBankDetailsChange, query, pageSize, pageNumber, sortOrder);
            const requestBankDetailsChanges = pageResult.dataset;
            const transformedRequestBankDetailsChanges = requestBankDetailsChanges.map(changeDetails => {
                return {
                    id: changeDetails.id,
                    uuid: changeDetails.uuid,
                    userId: changeDetails.userId,
                    bankAccountName: changeDetails.bankAccountName,
                    accountNumber: changeDetails.accountNumber,
                    bankCode: changeDetails.bankCode,
                    bankName: changeDetails.bankName,
                    createdAt: changeDetails.createdAt
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedRequestBankDetailsChanges, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    saveBankAccountInfo(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const requestBankDetailsChangeRepo = connection.getRepository(RequestBankDetailsChange_1.RequestBankDetailsChange);
            const requestBankDetailsChange = yield requestBankDetailsChangeRepo.findOne(id);
            if (!requestBankDetailsChange) {
                throw new error_response_types_1.NotFoundError('Request for change of bank details Does Not Exist');
            }
            const userPreviousBankDetail = yield userRepo.findOne({ id: requestBankDetailsChange.userId });
            if (!userPreviousBankDetail) {
                throw new error_response_types_1.NotFoundError('User Does Not Exist');
            }
            if (userPreviousBankDetail.bankInfo.bankAccountNumber === requestBankDetailsChange.accountNumber) {
                throw new error_response_types_1.UnprocessableEntityError('User Submited Bank Details that is the same with his previous bank details');
            }
            const accountResolveResult = yield PaystackService.accountNameEnquiry(requestBankDetailsChange.bankCode, requestBankDetailsChange.accountNumber);
            const bankAccountName = accountResolveResult.account_name;
            //--
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                bankInfo: {
                    bankCode: requestBankDetailsChange.bankCode,
                    bankName: requestBankDetailsChange.bankName,
                    bankAccountNumber: requestBankDetailsChange.accountNumber,
                    bankAccountName,
                },
            })
                .where({ id: requestBankDetailsChange.userId })
                .execute();
            yield requestBankDetailsChangeRepo
                .createQueryBuilder()
                .update(RequestBankDetailsChange_1.RequestBankDetailsChange)
                .set({ isProcessed: true })
                .where({ id: requestBankDetailsChange.id })
                .execute();
            yield PaystackService.saveTransferReceipt(requestBankDetailsChange.bankCode, requestBankDetailsChange.accountNumber, bankAccountName);
            // mail to user 
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate(req, id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { deliveryFeeAmountMajor } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
            const wareHouseToSiteRequest = yield wareHouseToSiteDeliveryRequestRepo.findOne(id);
            if (!wareHouseToSiteRequest) {
                throw new error_response_types_1.NotFoundError('Warehouse to site delivery request Does Not Exist');
            }
            if (wareHouseToSiteRequest.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED) {
                throw new error_response_types_1.NotFoundError('Delivery Fee Has Been Set and Accepted');
            }
            const updateResult = yield AdminService.submitDeliveryFeeForWareHouseToSiteDelivery(wareHouseToSiteRequest, deliveryFeeAmountMajor);
            const resData = {
                status: updateResult,
            };
            return resData;
        });
    }
    handleGetProcurmentList(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementRepo = connection.getRepository(Procurement_1.Procurements);
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                    isProcessed: false
                };
                const requestProcurement = yield procurementRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const transformedProcurement = requestProcurement.map(list => {
                    return {
                        id: list.id,
                        uuid: list.uuid,
                        accountId: list.accountId,
                        upload: list.upload,
                        invoice: null,
                        isProcessed: list.isProcessed,
                        createdAt: list.createdAt
                    };
                });
                const resData = {
                    status: true,
                    data: transformedProcurement,
                };
                return resData;
            }
            const query = {
                isSoftDeleted: false
            };
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "accountId") {
                        query.accountId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield procurementRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of procurement`);
            }
            const pageResult = yield PaginationService.paginate(Procurement_1.Procurements, query, pageSize, pageNumber, sortOrder);
            const requestProcurement = pageResult.dataset;
            const siteDeliveryLocationIds = requestProcurement.map(item => item.id);
            const procurementInvoices = yield procurementInvoiceRepo.find({
                where: { id: (0, typeorm_1.In)(siteDeliveryLocationIds) }
            });
            if (requestProcurement.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Procurement List Does Exist');
            }
            const transformedProcurementList = requestProcurement.map(list => {
                const procurementInvoice = procurementInvoices.find(item => item.id === list.id);
                let invoiceDetails;
                if (procurementInvoice) {
                    invoiceDetails = {
                        id: procurementInvoice.id,
                        uuid: procurementInvoice.uuid,
                        accountId: procurementInvoice.accountId,
                        referenceNumber: procurementInvoice.referenceNumber,
                        calculatedTotalCostMajor: procurementInvoice.calculatedTotalCostMajor,
                        invoiceItem: procurementInvoice.invoiceItem,
                        status: procurementInvoice.status,
                        statusHistory: procurementInvoice.statusHistory,
                        orderCreated: procurementInvoice.orderCreated,
                        orderCreatedAt: procurementInvoice.orderCreatedAt,
                        createdAt: procurementInvoice.createdAt
                    };
                }
                return {
                    id: list.id,
                    uuid: list.uuid,
                    accountId: list.accountId,
                    upload: list.upload,
                    invoice: invoiceDetails || null,
                    isProcessed: list.isProcessed,
                    createdAt: list.createdAt
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedProcurementList, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleProcurementDetails(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const procurmentRepo = connection.getRepository(Procurement_1.Procurements);
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const procurementDetails = yield procurmentRepo.findOne(id);
            if (!procurementDetails) {
                throw new error_response_types_1.NotFoundError('Procurement Does Not Exist');
            }
            const procurementInvoice = yield procurementInvoiceRepo.findOne({
                where: { procurementId: procurementDetails.id }
            });
            let invoiceDetails;
            if (procurementInvoice) {
                invoiceDetails = {
                    id: procurementInvoice.id,
                    uuid: procurementInvoice.uuid,
                    accountId: procurementInvoice.accountId,
                    referenceNumber: procurementInvoice.referenceNumber,
                    calculatedTotalCostMajor: procurementInvoice.calculatedTotalCostMajor,
                    invoiceItem: procurementInvoice.invoiceItem,
                    status: procurementInvoice.status,
                    statusHistory: procurementInvoice.statusHistory,
                    orderCreated: procurementInvoice.orderCreated,
                    orderCreatedAt: procurementInvoice.orderCreatedAt,
                    createdAt: procurementInvoice.createdAt
                };
            }
            const resultProcurement = {
                id: procurementDetails.id,
                uuid: procurementDetails.uuid,
                accountId: procurementDetails.accountId,
                upload: procurementDetails.upload,
                invoice: invoiceDetails || null,
                isProcessed: procurementDetails.isProcessed,
                createdAt: procurementDetails.createdAt
            };
            const resData = {
                status: true,
                data: resultProcurement
            };
            return resData;
        });
    }
    handleProcurementisProcessed(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const procurmentRepo = connection.getRepository(Procurement_1.Procurements);
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const userRepo = connection.getRepository(User_1.User);
            const procurementDetails = yield procurmentRepo.findOne(id);
            if (!procurementDetails) {
                throw new error_response_types_1.NotFoundError('Procurement Does Not Exist');
            }
            const doesInvoice = yield procurementInvoiceRepo.findOne({
                where: { procurementId: procurementDetails.id }
            });
            if (!doesInvoice) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot Confirm a Procurement whose invoice has is not ready');
            }
            const user = yield userRepo.findOne({
                where: { accountId: procurementDetails.accountId }
            });
            yield procurmentRepo
                .createQueryBuilder()
                .update(Procurement_1.Procurements)
                .set({ isProcessed: true, proccessedAt: Utils.utcNow() })
                .where({ id: procurementDetails.id })
                .execute();
            // send mail to cooperate account that send the precurment list.
            const smsMessage = `Hello ${user.firstName}, 
    Your procurement list has been attended to, Kindly log into your account to view invoice and proceed with order. `;
            const smsSentSuccessfully = yield SmsService.sendSms(user.msisdn, smsMessage);
            console.log(smsSentSuccessfully);
            yield EmailService.sendProcurmentInvoiceIsReady(user);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    addItemToInvoice(req, id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementRepo = connection.getRepository(Procurement_1.Procurements);
            const procurement = yield procurementRepo.findOne({ id });
            if (!procurement) {
                throw new error_response_types_1.UnprocessableEntityError('Procurement Does Not Exist');
            }
            const productRepo = connection.getRepository(Product_1.Product);
            const product = yield productRepo.findOne({ id: reqBody.invoiceItem.productId });
            if (!product) {
                throw new error_response_types_1.NotFoundError('The specified product does not exist');
            }
            reqBody.invoiceItem.productUuid = product.uuid;
            const invoiceItemAddedStatus = yield AdminService.prepareInvoiceItem(procurement, reqBody);
            if (!invoiceItemAddedStatus) {
                throw new error_response_types_1.UnprocessableEntityError('There was an error in adding your item to the procurement invoice. Please try again.');
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleAllProcurementInvoice(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const invoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray),
                    orderCreated: false
                };
                const invoiceProcessed = yield invoiceRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const transformedProccessedInvoice = invoiceProcessed.map(invoice => {
                    return {
                        id: invoice.id,
                        uuid: invoice.uuid,
                        accountId: invoice.accountId,
                        referenceNumber: invoice.referenceNumber,
                        calculatedTotalCostMajor: invoice.calculatedTotalCostMajor,
                        invoiceItem: invoice.invoiceItem,
                        status: invoice.status,
                        statusHistory: invoice.statusHistory,
                        orderCreated: invoice.orderCreated,
                        orderCreatedAt: invoice.orderCreatedAt,
                        createdAt: invoice.createdAt
                    };
                });
                const resData = {
                    status: true,
                    data: transformedProccessedInvoice,
                };
                return resData;
            }
            const query = {
                orderCreated: false,
                isSoftDeleted: false
            };
            const pageSize = 10;
            const totalAssignmentsNumber = yield invoiceRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds`);
            }
            const pageResult = yield PaginationService.paginate(Procurement_1.Procurements, query, pageSize, pageNumber, sortOrder);
            const requestProcurement = pageResult.dataset;
            const transformedInvoicetList = requestProcurement.map(invoice => {
                return Object.assign({ id: invoice.id }, invoice.toResponseDto());
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedInvoicetList, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetProcurementInvoiceDetails(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const invoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const invoice = yield invoiceRepo.findOne(id);
            if (!invoice) {
                throw new error_response_types_1.NotFoundError("Invoice Does Not Exist");
            }
            const transformInvoiceDetails = Object.assign({ id: invoice.id }, invoice.toResponseDto());
            const resData = {
                status: true,
                data: transformInvoiceDetails
            };
            return resData;
        });
    }
    handleAllProduct(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = connection.getRepository(Product_1.Product);
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                    brand: "product.brand",
                    pickupLocation: "product.pickupLocation",
                },
            };
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    id: (0, typeorm_1.In)(idsAsJsonArray),
                    isSoftDeleted: false
                };
                const availableProducts = yield productRepo.find({
                    where: query,
                    join,
                    order: { createdAt: sortOrder },
                });
                const transformProducts = [];
                const processProducts = yield ProductService.transformProducts(availableProducts);
                for (const tranformProduct of processProducts) {
                    const productId = availableProducts.find((product) => product.uuid === tranformProduct.productUuid);
                    const productWithId = Object.assign({ id: productId.id }, tranformProduct);
                    transformProducts.push(productWithId);
                }
                const resData = {
                    status: true,
                    data: transformProducts,
                };
                return resData;
            }
            const query = {
                isSoftDeleted: false
            };
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "sellerUserId") {
                        query.userId = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const pageSize = 10;
            const totalAssignmentsNumber = yield productRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds`);
            }
            const pageResult = yield PaginationService.paginate(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join);
            const allProducts = pageResult.dataset;
            const transformProducts = [];
            const processProducts = yield ProductService.transformProducts(allProducts);
            for (const tranformProduct of processProducts) {
                const productId = allProducts.find((product) => product.uuid === tranformProduct.productUuid);
                const productWithId = Object.assign({ id: productId.id }, tranformProduct);
                transformProducts.push(productWithId);
            }
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformProducts, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleCreateProduct(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { categoryId, brandId, name, description, userId, price, locationState, minQty, maxQty } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const brandRepo = connection.getRepository(Brand_1.Brand);
            const categoryRepo = connection.getRepository(Category_1.Category);
            const seller = yield userRepo.findOne({
                where: { id: userId, isSeller: true }
            });
            if (!seller) {
                throw new error_response_types_1.NotFoundError("Seller Does Not Exist");
            }
            const category = yield categoryRepo.findOne(categoryId);
            if (!category) {
                throw new error_response_types_1.NotFoundError("Category Does Not Exist");
            }
            const brand = yield brandRepo.findOne(brandId);
            if (!brand) {
                throw new error_response_types_1.NotFoundError("Product Does Not Exist");
            }
            // 
            const createProductDto = {
                name, description, categoryUuid: category.uuid, brandUuid: brand.uuid, price, locationState, minQty, maxQty,
            };
            const createdProduct = yield ProductsService.processProductSave(seller, createProductDto, false);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetProductDetails(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = connection.getRepository(Product_1.Product);
            const product = yield productRepo.findOne(id);
            if (!product) {
                throw new error_response_types_1.NotFoundError("Product Does Not Exist");
            }
            // createdProduct.user
            const transformProduct = yield ProductService.transformProduct(product);
            const transformProductDetails = Object.assign({ id: product.id }, transformProduct);
            const resData = {
                status: true,
                data: transformProductDetails
            };
            return resData;
        });
    }
    // NewProductRequestDtoByAdmin
    handleGetQouteRequests(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const quoteRequests = yield quoteRequestRepo.find({
                    where: query,
                    order: { createdAt: sortOrder },
                });
                const buyerUserIds = quoteRequests.map(quoteRequest => quoteRequest.userId);
                const sellerUserIds = quoteRequests.map(quoteRequest => quoteRequest.sellerUserId);
                const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]));
                const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
                const transformedQuoteRequestsDataset = quoteRequests.map(quoteRequest => {
                    var _a, _b;
                    const buyerUserUuid = quoteRequest.userUuid;
                    const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === buyerUserUuid);
                    const selllerUserUuid = quoteRequest.sellerUserUuid;
                    const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === selllerUserUuid);
                    return {
                        id: quoteRequest.id,
                        userId: quoteRequest.userId,
                        uuid: quoteRequest.uuid,
                        referenceNumber: quoteRequest.referenceNumber,
                        product: {
                            uuid: quoteRequest.product.uuid,
                            name: quoteRequest.product.name,
                            description: quoteRequest.product.description,
                            unitOfMeasurement: (_b = (_a = quoteRequest.product.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
                        },
                        quantity: quoteRequest.quantity,
                        buyerUserPublicProfile: buyerPublicProfile,
                        sellerUserPublicProfile: sellerPublicProfile,
                        notes: quoteRequest.notes,
                        orderReceiveType: quoteRequest.orderReceiveType,
                        deliveryAddress: quoteRequest.deliverAddress,
                        sellerResponse: quoteRequest.sellerResponse,
                        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
                        status: quoteRequest.status,
                        dateCreatedIso8601: quoteRequest.createdAt,
                    };
                });
                const resData = {
                    status: true,
                    data: transformedQuoteRequestsDataset,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.userId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "referenceNumber") {
                        query.referenceNumber = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const totalAssignmentsNumber = yield quoteRequestRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`);
            }
            const pageResult = yield PaginationService.paginate(QuoteRequest_1.QuoteRequest, query, pageSize, pageNumber, sortOrder);
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    product: "quoteRequest.product",
                },
            };
            const quoteRequestsPage = yield PaginationService.paginate(QuoteRequest_1.QuoteRequest, query, pageSize, pageNumber, sortOrder, undefined, join);
            const quoteRequests = quoteRequestsPage.dataset;
            const buyerUserIds = quoteRequests.map(quoteRequest => quoteRequest.userId);
            const sellerUserIds = quoteRequests.map(quoteRequest => quoteRequest.sellerUserId);
            const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]));
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
            const transformedQuoteRequestsDataset = quoteRequests.map(quoteRequest => {
                var _a, _b;
                const buyerUserUuid = quoteRequest.userUuid;
                const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === buyerUserUuid);
                const selllerUserUuid = quoteRequest.sellerUserUuid;
                const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === selllerUserUuid);
                return {
                    id: quoteRequest.id,
                    userId: quoteRequest.userId,
                    uuid: quoteRequest.uuid,
                    referenceNumber: quoteRequest.referenceNumber,
                    product: {
                        uuid: quoteRequest.product.uuid,
                        name: quoteRequest.product.name,
                        description: quoteRequest.product.description,
                        unitOfMeasurement: (_b = (_a = quoteRequest.product.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
                    },
                    quantity: quoteRequest.quantity,
                    buyerUserPublicProfile: buyerPublicProfile,
                    sellerUserPublicProfile: sellerPublicProfile,
                    notes: quoteRequest.notes,
                    orderReceiveType: quoteRequest.orderReceiveType,
                    deliveryAddress: quoteRequest.deliverAddress,
                    sellerResponse: quoteRequest.sellerResponse,
                    calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
                    status: quoteRequest.status,
                    dateCreatedIso8601: quoteRequest.createdAt,
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedQuoteRequestsDataset, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetQuoteRequestDetails(req, id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    product: "quoteRequest.product",
                    user: "quoteRequest.user",
                    sellerUser: "quoteRequest.sellerUser",
                },
            };
            const quoteRequest = yield quoteRequestRepo.findOne({
                where: {
                    id
                },
                join
            });
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError("The specified quote request could not be found");
            }
            const buyerUserPublicProfiles = yield ProfileService.getPublicProfile(quoteRequest.user);
            const sellerUserPublicProfiles = yield ProfileService.getPublicProfile(quoteRequest.sellerUser);
            let pickupLocation;
            if (quoteRequest.sellerPickupLocationUuid) {
                pickupLocation = yield pickupLocationRepo.findOne({
                    uuid: quoteRequest.sellerPickupLocationUuid,
                });
            }
            const resData = {
                status: true,
                data: {
                    id: quoteRequest.id,
                    userId: quoteRequest.userId,
                    uuid: quoteRequest.uuid,
                    referenceNumber: quoteRequest.referenceNumber,
                    product: {
                        uuid: quoteRequest.product.uuid,
                        name: quoteRequest.product.name,
                        description: quoteRequest.product.description,
                        unitOfMeasurement: (_b = (_a = quoteRequest.product.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
                    },
                    quantity: quoteRequest.quantity,
                    buyerUserPublicProfile: buyerUserPublicProfiles,
                    sellerUserPublicProfile: sellerUserPublicProfiles,
                    notes: quoteRequest.notes,
                    orderReceiveType: quoteRequest.orderReceiveType,
                    deliveryAddress: quoteRequest.deliverAddress,
                    deliverAddressUuid: quoteRequest.deliverAddressUuid,
                    sellerResponse: quoteRequest.sellerResponse,
                    calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
                    status: quoteRequest.status,
                    dateCreatedIso8601: quoteRequest.createdAt,
                    sellerPickupLocation: pickupLocation ? {
                        name: pickupLocation.name,
                        address: pickupLocation.address,
                        uuid: pickupLocation.uuid,
                    } : undefined
                },
            };
            return resData;
        });
    }
    handleQuoteRequestSellerResponse(req, id, reqBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            const userRepo = connection.getRepository(User_1.User);
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    user: "quoteRequest.user",
                    sellerUser: "quoteRequest.sellerUser",
                    product: "quoteRequest.product"
                },
            };
            const quoteRequest = yield quoteRequestRepo.findOne({
                where: {
                    id
                },
                join,
            });
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError('The specified quote request could not be found');
            }
            if (quoteRequest.status !== Statuses_1.QuoteRequestStatuses.PENDING) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot respond to the quote request');
            }
            const now = Utils.utcNow();
            quoteRequest.statusHistory.push({
                status: Statuses_1.QuoteRequestStatuses.PROCESSED,
                dateTimeInISO8601: now.toISOString()
            });
            const qouteRequestProduct = yield productRepo.findOne({ id: quoteRequest.productId });
            const unitPriceForBuyer = Utils.getPriceForBuyer(reqBody.unitPrice, qouteRequestProduct);
            const productCategoryPromo = yield PromotionService.activeCategoryPromotion(quoteRequest.product.categoryId);
            const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
            const referenceNumber = Utils.getOrderEntityReferenceNumber(quoteRequest);
            const subtotalMajor = (unitPriceForBuyer * quoteRequest.quantity);
            const calculatedTotalCostMajor = Utils.normalizeMoney(subtotalMajor + ((_a = reqBody.deliveryFee) !== null && _a !== void 0 ? _a : 0));
            yield quoteRequestRepo.createQueryBuilder()
                .update(QuoteRequest_1.QuoteRequest)
                .set({
                hasSellerResponse: true,
                referenceNumber,
                sellerResponse: {
                    unitPrice: reqBody.unitPrice,
                    unitPriceForBuyer,
                    unitPromoPriceForBuyer,
                    promotionId: productCategoryPromo === null || productCategoryPromo === void 0 ? void 0 : productCategoryPromo.id,
                    deliveryFee: (reqBody.deliveryFee || 0),
                },
                calculatedTotalCostMajor,
                sellerResponseSubmittedAt: now,
                status: Statuses_1.QuoteRequestStatuses.PROCESSED,
                statusHistory: quoteRequest.statusHistory,
            })
                .where({ id: quoteRequest.id })
                .execute();
            const sellerAccountStats = yield AccountStatService.getSellerAccountStats(quoteRequest.userId);
            const accountStatRepo = (0, typeorm_1.getRepository)(SellerAccountStat_1.SellerAccountStat);
            yield accountStatRepo.createQueryBuilder()
                .update(SellerAccountStat_1.SellerAccountStat)
                .set({
                totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount - 1,
            })
                .where({ id: sellerAccountStats.id })
                .execute();
            // TODO
            // notify buyer of seller response
            // via mail
            const sellerDetail = yield userRepo.findOne({ id: quoteRequest.userId });
            const productDetail = yield productRepo.findOne({ id: quoteRequest.productId });
            const sellerResponse = {
                unitPrice: reqBody.unitPrice,
                unitPriceForBuyer,
                deliveryFee: (reqBody.deliveryFee || 0),
            };
            quoteRequest.calculatedTotalCostMajor = calculatedTotalCostMajor;
            const sendQouteRequestResponseAdmin = yield EmailService.sellerQouteRequestResponseMail(sellerDetail, quoteRequest, quoteRequest.user, productDetail, sellerResponse);
            console.log('Did Qoute Request response mail to Admin works', sendQouteRequestResponseAdmin);
            const notificationMetadata = {
                quoteRequestUuid: quoteRequest.uuid,
            };
            const CurrencyEnum = Currency_1.CountryCodeToCurrency;
            const currency = CurrencyEnum[sellerDetail.countryIso2] || "NGN";
            const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has responded 
      to your Quote request: #${quoteRequest.referenceNumber}. 
      Total cost: ${currency}${quoteRequest.calculatedTotalCostMajor}`;
            const notificationTransports = {
                [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
                [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
                [NotificationTransport_1.NotificationTransportMode.SMS]: true
            };
            // send mail here 
            NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, (_b = quoteRequest.user) === null || _b === void 0 ? void 0 : _b.uuid, NotificationMessageTypes_1.default.QUOTE_REQUEST_SELLER_RESPONSE, 'Seller has responded to your Quote Request.  CinderBuild Team.', notificatiionMessage, notificationTransports, notificationMetadata);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleMoveProductToAnotherSeller(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { sellerUuid, newSellerUuid, categoryUuid } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const categoryRepo = connection.getRepository(Category_1.Category);
            const seller = yield userRepo.findOne({
                where: { uuid: sellerUuid, isSeller: true }
            });
            const omaSeller = yield userRepo.findOne({
                where: { uuid: newSellerUuid, isSeller: true }
            });
            if (!seller) {
                throw new error_response_types_1.NotFoundError("Seller Does Not Exist");
            }
            if (!omaSeller) {
                throw new error_response_types_1.NotFoundError("Seller Does Not Exist");
            }
            const category = yield categoryRepo.findOne({ uuid: categoryUuid });
            if (!category) {
                throw new error_response_types_1.NotFoundError("Category Does Not Exist");
            }
            const payload = {
                sellerId: seller.id,
                omaSellerId: omaSeller.id,
                categoryId: category.id
            };
            yield AdminService.moveSellerProductsToAnOmaAccount(payload);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetOldSellerProducts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const query = {
                oldSellerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            };
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    oldSeller: "product.oldSeller",
                    category: "product.category",
                    brand: "product.brand",
                    pickupLocation: "product.pickupLocation",
                },
            };
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const products = yield productRepo.find({
                where: query,
                join,
            });
            const transformProductDetails = yield ProductService.transformOldSellerProducts(products);
            const resData = {
                status: true,
                data: transformProductDetails
            };
            return resData;
        });
    }
    handleQuoteRequestDecline(req, quoteRequestUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    user: "quoteRequest.user",
                    sellerUser: "quoteRequest.sellerUser",
                },
            };
            const quoteRequest = yield quoteRequestRepo.findOne({
                where: {
                    uuid: quoteRequestUuid,
                },
                join,
            });
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError("Quote Request Does Not Exist");
            }
            if (quoteRequest.status !== Statuses_1.QuoteRequestStatuses.PENDING) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot decline the quote request');
            }
            yield AdminService.declineQuoteRequestByAdmin(quoteRequest);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleVirtualAccountCreationForUser(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const { userId } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const userExist = yield userRepo.findOne({ id: userId });
            if (!userExist) {
                throw new error_response_types_1.NotFoundError("User Does Not Exist");
            }
            const newUserVda = yield PaystackService.createDedicatedNuban(userExist);
            const resData = {
                status: true,
                data: {
                    userId: userExist.id,
                    bankId: newUserVda.bankId,
                    bankName: newUserVda.bankName,
                    bankAccountNumber: newUserVda.bankAccountNumber,
                    bankAccountName: newUserVda.bankAccountName
                }
            };
            return resData;
        });
    }
    handleGetUserVirtualAccounts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const virtualDedicatedAccountsRepo = (0, typeorm_1.getRepository)(PaystackDedicatedNuban_1.PaystackDedicatedNuban);
            const virtualAccounts = yield virtualDedicatedAccountsRepo.find();
            const transformProductDetails = yield AdminService.transformDedicatedAccount(virtualAccounts);
            const resData = {
                status: true,
                data: transformProductDetails
            };
            return resData;
        });
    }
    handleGetAuditLogs(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const auditLogRepo = (0, typeorm_1.getRepository)(AuditLogs_1.AuditLogs);
            const responseAuditLogs = yield auditLogRepo.find();
            const transformProductDetails = yield auditLogService.transformAuditLogs(responseAuditLogs);
            const resData = {
                status: true,
                data: transformProductDetails
            };
            return resData;
        });
    }
    handleGetPricesMatrices(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const join = {
                    alias: "price_matrices",
                    leftJoinAndSelect: {
                        product: "price_matrices.product",
                    },
                };
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const priceMatrices = yield priceMatrixRepo.find({
                    where: query,
                    join,
                    order: { createdAt: sortOrder },
                });
                const buyerUserIds = priceMatrices.map(pricematrix => pricematrix.buyerUserId);
                const sellerUserIds = priceMatrices.map(pricematrix => pricematrix.sellerUserId);
                const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]));
                const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
                const transformedPriceMatricesDataset = priceMatrices.map(pricematrix => {
                    var _a, _b;
                    const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.buyerUserId);
                    const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.sellerUserId);
                    return {
                        id: pricematrix.id,
                        buyerUserId: pricematrix.buyerUserId,
                        sellerUserId: pricematrix.sellerUserId,
                        uuid: pricematrix.uuid,
                        qouteRequestRef: pricematrix.qouteRequestRef,
                        qouteRequestId: pricematrix.qouteRequestId,
                        product: {
                            uuid: pricematrix.product.uuid,
                            name: pricematrix.product.name,
                            description: pricematrix.product.description,
                            unitOfMeasurement: (_b = (_a = pricematrix.product.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
                        },
                        quantity: pricematrix.quantity,
                        transactionType: pricematrix.transactionType,
                        buyerUserPublicProfile: buyerPublicProfile,
                        sellerUserPublicProfile: sellerPublicProfile,
                        deliveryDate: pricematrix.deliveryDate,
                        deliveryAddress: pricematrix.deliveryAddress,
                        productSellingPriceMajor: pricematrix.productSellingPriceMajor,
                        productCostPriceMajor: pricematrix.productCostPriceMajor,
                        totalProductSellingPriceMajor: pricematrix.totalProductSellingPriceMajor,
                        productMarginMajor: pricematrix.productMarginMajor,
                        totlaMarginMajor: pricematrix.totlaMarginMajor,
                        status: pricematrix.status,
                        statusHistory: pricematrix.statusHistory,
                        createdAt: pricematrix.createdAt,
                    };
                });
                const resData = {
                    status: true,
                    data: transformedPriceMatricesDataset,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "buyerUserId") {
                        query.buyerUserId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "qouteRequestRef") {
                        query.qouteRequestRef = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const totalAssignmentsNumber = yield priceMatrixRepo.count({
                where: query,
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of Price Matrics for Qoute request`);
            }
            const pageResult = yield PaginationService.paginate(PriceMatrix_1.PriceMatrix, query, pageSize, pageNumber, sortOrder);
            const join = {
                alias: "price_matrices",
                leftJoinAndSelect: {
                    product: "price_matrices.product",
                },
            };
            const priceMatricestsPage = yield PaginationService.paginate(PriceMatrix_1.PriceMatrix, query, pageSize, pageNumber, sortOrder, undefined, join);
            const priceMatrics = priceMatricestsPage.dataset;
            const buyerUserIds = priceMatrics.map(priceMatrix => priceMatrix.buyerUserId);
            const sellerUserIds = priceMatrics.map(priceMatrix => priceMatrix.sellerUserId);
            const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]));
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
            const transformedQuoteRequestsDataset = priceMatrics.map(pricematrix => {
                var _a, _b;
                const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.buyerUserId);
                const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.sellerUserId);
                return {
                    id: pricematrix.id,
                    buyerUserId: pricematrix.buyerUserId,
                    sellerUserId: pricematrix.sellerUserId,
                    uuid: pricematrix.uuid,
                    qouteRequestRef: pricematrix.qouteRequestRef,
                    qouteRequestId: pricematrix.qouteRequestId,
                    product: {
                        uuid: pricematrix.product.uuid,
                        name: pricematrix.product.name,
                        description: pricematrix.product.description,
                        unitOfMeasurement: (_b = (_a = pricematrix.product.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
                    },
                    quantity: pricematrix.quantity,
                    transactionType: pricematrix.transactionType,
                    buyerUserPublicProfile: buyerPublicProfile,
                    sellerUserPublicProfile: sellerPublicProfile,
                    deliveryDate: pricematrix.deliveryDate,
                    deliveryAddress: pricematrix.deliveryAddress,
                    productSellingPriceMajor: pricematrix.productSellingPriceMajor,
                    productCostPriceMajor: pricematrix.productCostPriceMajor,
                    totalProductSellingPriceMajor: pricematrix.totalProductSellingPriceMajor,
                    productMarginMajor: pricematrix.productMarginMajor,
                    totlaMarginMajor: pricematrix.totlaMarginMajor,
                    status: pricematrix.status,
                    statusHistory: pricematrix.statusHistory,
                    createdAt: pricematrix.createdAt,
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedQuoteRequestsDataset, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    handleGetPricesMatrixDetails(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
            const join = {
                alias: "price_matrices",
                leftJoinAndSelect: {
                    product: "price_matrices.product",
                    buyerUser: "price_matrices.buyerUser",
                    sellerUser: "price_matrices.sellerUser",
                },
            };
            const priceMatrix = yield priceMatrixRepo.findOne({
                where: { id },
                join,
            });
            if (!priceMatrix) {
                throw new error_response_types_1.NotFoundError('Intial Price Matrix Not Found');
            }
            const tranformPriceMatrix = yield PriceMatrixService.transformPriceMatrixDetails(priceMatrix);
            const resData = {
                status: true,
                data: tranformPriceMatrix
            };
            return resData;
        });
    }
    handleSubmitPriceMatrix(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield PriceMatrixService.submitPriceMatrix(requestBody);
            // sending mail to maangement for approval   
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleApprovePricesMatrix(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield PriceMatrixService.processPriceMatrixOrderDelivery(id);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    // processDeclinePriceMatrixByAdmin
    handleDeclinePricesMatrixByAdmin(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield PriceMatrixService.processDeclinePriceMatrixByAdmin(id);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    // activateCStoreUser
    handleCStoreForUserByAdmin(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const user = yield userRepo.findOne({
                where: { id }
            });
            if (!user) {
                throw new error_response_types_1.UnprocessableEntityError("User Does Not Exist");
            }
            yield ProfileService.activateCStoreUser(user);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleQuoteRequestCreation(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield QouteRequestService.createQouteRequestByAdmin(requestBody);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetMortgageAccountVerification(req, sortOrder, pageNumber, filter, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const join = {
                alias: "mortgage_account_verifications",
                leftJoinAndSelect: {
                    user: "mortgage_account_verifications.user",
                },
            };
            const connection = yield (0, db_1.getFreshConnection)();
            const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
            if (ids) {
                const idsAsJsonArray = JSON.parse(decodeURIComponent(ids));
                if (!idsAsJsonArray.length) {
                    throw new error_response_types_1.BadRequestError('ids were not specified');
                }
                const query = {
                    uuid: (0, typeorm_1.In)(idsAsJsonArray)
                };
                const mortgageAccountVerifications = yield mortgageAccountVerificationRepo.find({
                    where: query,
                    join,
                    order: { createdAt: sortOrder },
                });
                const developerUserIds = mortgageAccountVerifications.map(developer => developer.userId);
                const developerPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
                const transformedMortgageAccountVerificationsDataset = mortgageAccountVerifications.map(verification => {
                    const developerUserUuid = verification.user.uuid;
                    const developerProfile = developerPublicProfiles.find(publicProfile => publicProfile.userUuid === developerUserUuid);
                    return {
                        id: verification.id,
                        uuid: verification.uuid,
                        developerPublicProfile: developerProfile,
                        accountType: verification.accountType,
                        bankStatement: verification.bankStatement,
                        bankStatementApproved: verification.bankStatementApproved,
                        governmentApprovedId: verification.governmentApprovedId,
                        governmentApprovedIdApproved: verification.governmentApprovedIdApproved,
                        recentUtilityBill: verification.recentUtilityBill,
                        recentUtilityBillApproved: verification.recentUtilityBillApproved,
                        cacCertificate: verification.cacCertificate,
                        cacCertificateApproved: verification.cacCertificateApproved,
                        isApproved: verification.isApproved,
                        accountConfirmed: verification.accountConfirmed,
                    };
                });
                const resData = {
                    status: true,
                    data: transformedMortgageAccountVerificationsDataset,
                };
                return resData;
            }
            const query = {};
            const pageSize = 10;
            if (filter) {
                const filtersAsJson = JSON.parse(filter);
                for (const filterKey in filtersAsJson) {
                    if (filterKey === "userId") {
                        query.userId = Number(filtersAsJson[filterKey]);
                    }
                    if (filterKey === "referenceNumber") {
                        query.referenceNumber = Number(filtersAsJson[filterKey]);
                    }
                }
            }
            const totalAssignmentsNumber = yield mortgageAccountVerificationRepo.count({
                where: query,
                join
            });
            const offset = (pageNumber - 1) * pageSize;
            if (offset > totalAssignmentsNumber) {
                throw new error_response_types_1.UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`);
            }
            const pageResult = yield PaginationService.paginate(MortgageAccountVerification_1.MortgageAccountVerification, query, pageSize, pageNumber, sortOrder);
            const mortgageAccountVerificationsPage = yield PaginationService.paginate(MortgageAccountVerification_1.MortgageAccountVerification, query, pageSize, pageNumber, sortOrder, undefined, join);
            const mortgageAccountVerifications = mortgageAccountVerificationsPage.dataset;
            const developerUserIds = mortgageAccountVerifications.map(developer => developer.userId);
            const developerPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
            const transformedMortgageAccountVerificationsDataset = mortgageAccountVerifications.map(verification => {
                const developerUserUuid = verification.user.uuid;
                const developerProfile = developerPublicProfiles.find(publicProfile => publicProfile.userUuid === developerUserUuid);
                return {
                    id: verification.id,
                    uuid: verification.uuid,
                    developerPublicProfile: developerProfile,
                    accountType: verification.accountType,
                    bankStatement: verification.bankStatement,
                    bankStatementApproved: verification.bankStatementApproved,
                    governmentApprovedId: verification.governmentApprovedId,
                    governmentApprovedIdApproved: verification.governmentApprovedIdApproved,
                    recentUtilityBill: verification.recentUtilityBill,
                    recentUtilityBillApproved: verification.recentUtilityBillApproved,
                    cacCertificate: verification.cacCertificate,
                    cacCertificateApproved: verification.cacCertificateApproved,
                    isApproved: verification.isApproved,
                    accountConfirmed: verification.accountConfirmed,
                };
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: transformedMortgageAccountVerificationsDataset, total: totalAssignmentsNumber })
            };
            return resData;
        });
    }
    // approveDeveloperDocument
    handleApproveDeveloperDocument(req, fileCategory, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const developer = yield userRepo.findOne({
                where: { id: requestBody.userId, isDeveloper: true }
            });
            if (!developer) {
                throw new error_response_types_1.UnprocessableEntityError('Developer Account Does Not Exist');
            }
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield DeveloperService.approveDeveloperDocument(developer, requestBody, fileCategory);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleApproveDeveloperAccount(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const developer = yield userRepo.findOne({
                where: { id: requestBody.userId, isDeveloper: true }
            });
            if (!developer) {
                throw new error_response_types_1.UnprocessableEntityError('Developer Account Does Not Exist');
            }
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield DeveloperService.approveDeveloperAccount(developer);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleConfirmDeveloperAccount(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const developer = yield userRepo.findOne({
                where: { id: requestBody.userId, isDeveloper: true }
            });
            if (!developer) {
                throw new error_response_types_1.UnprocessableEntityError('Developer Account Does Not Exist');
            }
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield DeveloperService.confirmDeveloperAccount(developer);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleConfirmApproveDeveloperAccount(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const developer = yield userRepo.findOne({
                where: { id: requestBody.userId, isDeveloper: true }
            });
            if (!developer) {
                throw new error_response_types_1.UnprocessableEntityError('Developer Account Does Not Exist');
            }
            yield AdminService.adminCanEdit(req, currentAdminUser);
            yield DeveloperService.confirmAndApprovedDeveloperAccount(developer);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleApproveProject(req, projectuuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            const join = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            const project = yield projectRepo.findOne({
                where: { uuid: projectuuid, isSoftDeleted: false },
                join
            });
            if (!project) {
                throw new error_response_types_1.UnprocessableEntityError('Project Does not Exist');
            }
            yield ProjectService.updateProjectSatatus(project, ProjectEnums_1.ProjectStatuses.ACTIVE);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleFetchMortgageCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentAdminUser = req.user;
            yield AdminService.isValidAdmin(currentAdminUser);
            yield AdminService.adminCanEdit(req, currentAdminUser);
            const cardPan = yield MortgageCardService.fetchAllPan();
            const resData = {
                status: true,
                data: cardPan
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/category/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCategories", null);
__decorate([
    (0, tsoa_1.Patch)("category/:categoryUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("categoryUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCategory", null);
__decorate([
    (0, tsoa_1.Post)("/brand/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBrand", null);
__decorate([
    (0, tsoa_1.Patch)("brand/:brandUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("brandUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateBrand", null);
__decorate([
    (0, tsoa_1.Get)("/users"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("sortOrder")),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("filter")),
    __param(4, (0, tsoa_1.Query)("ids")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleUsersFetch", null);
__decorate([
    (0, tsoa_1.Get)("/users/:id"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleUserDetailsFetch", null);
__decorate([
    (0, tsoa_1.Get)("/deliverylocations"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("sortOrder")),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("filter")),
    __param(4, (0, tsoa_1.Query)("ids")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleDeliveryLocationFetch", null);
__decorate([
    (0, tsoa_1.Post)("/deliverylocations"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleAddDeliveryLocation", null);
__decorate([
    (0, tsoa_1.Get)('/productleases'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetAllProductLeasesForAdmin", null);
__decorate([
    (0, tsoa_1.Get)('/productleases/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetOneProductLeasesForAdmin", null);
__decorate([
    (0, tsoa_1.Put)("/productleases/toggle"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleProductLeaseStatusToggleByAdmin", null);
__decorate([
    (0, tsoa_1.Post)('/productleases'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleNewProductLeaseByAdmin", null);
__decorate([
    (0, tsoa_1.Put)('/productleases/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleEditProductLease", null);
__decorate([
    (0, tsoa_1.Get)('/productleases/user/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "productLeaseStatus", null);
__decorate([
    (0, tsoa_1.Get)('/financialtransactions'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetAllFinancialTransactionsForAdmin", null);
__decorate([
    (0, tsoa_1.Post)('/financialtransactions'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleNewFinancialTransactionByAdmin", null);
__decorate([
    (0, tsoa_1.Get)('/sendPromotionalMail'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "promotionalMail", null);
__decorate([
    (0, tsoa_1.Put)('/orders/pod/cancel/:orderUuid'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('orderUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "cancelOrderByAdmin", null);
__decorate([
    (0, tsoa_1.Put)('/orders/pod/paymentdefault/:orderUuid'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('orderUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "orderPaymentDefaultByAdmin", null);
__decorate([
    (0, tsoa_1.Post)('/promotions'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newPromotion", null);
__decorate([
    (0, tsoa_1.Get)('/promotions'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetPromotions", null);
__decorate([
    (0, tsoa_1.Get)('/categories'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetCategories", null);
__decorate([
    (0, tsoa_1.Get)('/brands'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetBrands", null);
__decorate([
    (0, tsoa_1.Post)('/affiliates'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newAffiliate", null);
__decorate([
    (0, tsoa_1.Post)('/users'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newsellerOma", null);
__decorate([
    (0, tsoa_1.Get)('/affiliates'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetAffiliates", null);
__decorate([
    (0, tsoa_1.Get)('/orders'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetOrders", null);
__decorate([
    (0, tsoa_1.Post)("/orders"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleOrderCreationFromPreparedCart", null);
__decorate([
    (0, tsoa_1.Get)('/wallettowallettransfer'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetWalletToWalletTransfers", null);
__decorate([
    (0, tsoa_1.Post)('/wallettowallettransfer'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleWalletToWalletTransferByAdmin", null);
__decorate([
    (0, tsoa_1.Put)("/orders/:orderUuid/statusupdate/:newOrderStatus"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("orderUuid")),
    __param(2, (0, tsoa_1.Path)("newOrderStatus")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleOrderRecievedConfirmation", null);
__decorate([
    (0, tsoa_1.Get)('/orders/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetchangeOrder", null);
__decorate([
    (0, tsoa_1.Put)("/orders/:id/changeOrderTotal"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleOrderTotalChangeConfirmation", null);
__decorate([
    (0, tsoa_1.Get)('/categories/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetCategory", null);
__decorate([
    (0, tsoa_1.Put)("/categories/:id/"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleCategoryCinderbuildMergin", null);
__decorate([
    (0, tsoa_1.Get)('/deliveryrequests'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetWareHouseToSiteDeliveryRequests", null);
__decorate([
    (0, tsoa_1.Get)('/deliveryrequests/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetWarehouseToSiteDeliveryRequest", null);
__decorate([
    (0, tsoa_1.Get)('/deliveryRequest/:id/shipped'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleMarKDeliveryRequestAsShipped", null);
__decorate([
    (0, tsoa_1.Get)('/changebankdetails'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetRequestBankAccountChange", null);
__decorate([
    (0, tsoa_1.Put)("/changebankdetails/:id"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "saveBankAccountInfo", null);
__decorate([
    (0, tsoa_1.Patch)("/deliveryrequests/:id"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate", null);
__decorate([
    (0, tsoa_1.Get)('/procurements'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetProcurmentList", null);
__decorate([
    (0, tsoa_1.Get)("/procurements/:id"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleProcurementDetails", null);
__decorate([
    (0, tsoa_1.Patch)("/procurements/:id"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleProcurementisProcessed", null);
__decorate([
    (0, tsoa_1.Post)("/procurements/:id/invoices"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addItemToInvoice", null);
__decorate([
    (0, tsoa_1.Get)('/procurements/invoices'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleAllProcurementInvoice", null);
__decorate([
    (0, tsoa_1.Get)('/procurements/invoices/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetProcurementInvoiceDetails", null);
__decorate([
    (0, tsoa_1.Get)('/products'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleAllProduct", null);
__decorate([
    (0, tsoa_1.Post)('/products'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleCreateProduct", null);
__decorate([
    (0, tsoa_1.Get)('/products/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetProductDetails", null);
__decorate([
    (0, tsoa_1.Get)('/quoterequest'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetQouteRequests", null);
__decorate([
    (0, tsoa_1.Get)("/quoterequest/:id"),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetQuoteRequestDetails", null);
__decorate([
    (0, tsoa_1.Post)("/quoterequest/:id/adminresponse"),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleQuoteRequestSellerResponse", null);
__decorate([
    (0, tsoa_1.Post)('/moveproducts'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleMoveProductToAnotherSeller", null);
__decorate([
    (0, tsoa_1.Get)("/oldseller/products"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetOldSellerProducts", null);
__decorate([
    (0, tsoa_1.Put)('/quoterequest/decline/:quoteRequestUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('quoteRequestUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleQuoteRequestDecline", null);
__decorate([
    (0, tsoa_1.Post)('/create-dedicated-account'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleVirtualAccountCreationForUser", null);
__decorate([
    (0, tsoa_1.Get)("/virtual-account"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetUserVirtualAccounts", null);
__decorate([
    (0, tsoa_1.Get)("/audit-logs"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetAuditLogs", null);
__decorate([
    (0, tsoa_1.Get)('/pricematrices'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetPricesMatrices", null);
__decorate([
    (0, tsoa_1.Get)('/pricematrices/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetPricesMatrixDetails", null);
__decorate([
    (0, tsoa_1.Post)('/pricematrices'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleSubmitPriceMatrix", null);
__decorate([
    (0, tsoa_1.Patch)('pricematrices/delivered/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleApprovePricesMatrix", null);
__decorate([
    (0, tsoa_1.Patch)('pricematrices/declined/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleDeclinePricesMatrixByAdmin", null);
__decorate([
    (0, tsoa_1.Patch)('cstore/activateuser/:id'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleCStoreForUserByAdmin", null);
__decorate([
    (0, tsoa_1.Post)('/quoterequest/create-admin'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleQuoteRequestCreation", null);
__decorate([
    (0, tsoa_1.Get)('/mortgageaccountverification'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('sortOrder')),
    __param(2, (0, tsoa_1.Query)('pageNumber')),
    __param(3, (0, tsoa_1.Query)('filter')),
    __param(4, (0, tsoa_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleGetMortgageAccountVerification", null);
__decorate([
    (0, tsoa_1.Post)('/mortgageaccountverification/approve-document'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("fileCategory")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleApproveDeveloperDocument", null);
__decorate([
    (0, tsoa_1.Post)('/mortgageaccountverification/approve-account'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleApproveDeveloperAccount", null);
__decorate([
    (0, tsoa_1.Post)('/mortgageaccountverification/confirm-account'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleConfirmDeveloperAccount", null);
__decorate([
    (0, tsoa_1.Post)('/mortgageaccountverification/confirm-approved-account'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleConfirmApproveDeveloperAccount", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Patch)("/approveproject/:projectuuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("projectuuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleApproveProject", null);
__decorate([
    (0, tsoa_1.Get)('/mortgagecards'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "handleFetchMortgageCard", null);
AdminController = __decorate([
    (0, tsoa_1.Route)("api/admin"),
    (0, tsoa_1.Tags)("Admin"),
    (0, tsoa_1.Security)("jwt")
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map