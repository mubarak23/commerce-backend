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
exports.QuoteRequestController = void 0;
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const ProfileService = __importStar(require("../services/profileService"));
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const PickupLocation_1 = require("../entity/PickupLocation");
const Product_1 = require("../entity/Product");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const WareHouse_1 = require("../entity/WareHouse");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const SortOrder_1 = require("../enums/SortOrder");
const Statuses_1 = require("../enums/Statuses");
const Persona_1 = require("../interfaces/Persona");
const NotificationService = __importStar(require("../services/notificationService"));
const PaginationService = __importStar(require("../services/paginationService"));
const QouteRequestService = __importStar(require("../services/quoteRequestService"));
const AccountStatService = __importStar(require("../services/sellerAccountStatService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let QuoteRequestController = class QuoteRequestController extends tsoa_1.Controller {
    handleGetQuoteRequestDetails(req, quoteRequestUuid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
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
                    uuid: quoteRequestUuid,
                },
                join
            });
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError("The specified quote request could not be found");
            }
            if (quoteRequest.sellerUserId !== currentUser.id && quoteRequest.userId !== currentUser.id) {
                throw new error_response_types_1.UnauthorizedRequestError("You are not allowed to view the selected quote request");
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
                    uuid: quoteRequest.uuid,
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
    handleNewRequestQuote(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            const wareHouseRepo = (0, typeorm_1.getRepository)(WareHouse_1.WareHouse);
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                },
            };
            const product = yield productRepo.findOne({
                where: {
                    uuid: reqBody.productUuid,
                    isSoftDeleted: false,
                },
                join
            });
            if (!product) {
                throw new error_response_types_1.NotFoundError('The specified product could not be found');
            }
            if (product.user.id === currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError('You cannot create a quote request for your own product');
            }
            let deliveryLocation;
            let deliverAddress = '';
            if (reqBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (!reqBody.deliverAddressUuid) {
                    throw new error_response_types_1.BadRequestError('Delivery address Must Be Selected');
                }
                if (reqBody.deliverAddressUuid) {
                    deliveryLocation = yield deliveryLocationRepo.findOne({
                        uuid: reqBody.deliverAddressUuid,
                    });
                }
                if (!deliveryLocation) {
                    throw new error_response_types_1.BadRequestError("The selected delivery address is not valid");
                }
                deliverAddress = deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.address;
            }
            let sellerPickupLocation;
            if (reqBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
                if (reqBody.sellerPickupLocationUuid) {
                    sellerPickupLocation = yield pickupLocationRepo.findOne({
                        uuid: reqBody.sellerPickupLocationUuid,
                        userId: product.userId,
                    });
                }
                if (!sellerPickupLocation) {
                    throw new error_response_types_1.BadRequestError("Product Seller Pickup Location Must Be Selected");
                }
                deliverAddress = sellerPickupLocation.address;
            }
            let wareHouseLocation;
            if (reqBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE) {
                if (!reqBody.wareHouseUuid) {
                    throw new error_response_types_1.BadRequestError('WareHouse Must Be Selected');
                }
                if (reqBody.wareHouseUuid) {
                    wareHouseLocation = yield wareHouseRepo.findOne({
                        uuid: reqBody.wareHouseUuid,
                        accountId: currentUser.accountId
                    });
                }
                if (!wareHouseLocation) {
                    throw new error_response_types_1.BadRequestError("The selected warehouse location is not valid");
                }
            }
            const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
            const existingQuoteRequest = yield quoteRequestRepo.findOne({
                userId: currentUser.id,
                productId: product.id,
                status: Statuses_1.QuoteRequestStatuses.PROCESSED,
            });
            if (existingQuoteRequest) {
                const quantityMatches = existingQuoteRequest.sellerResponse.minimumQuantity <= reqBody.quantity
                    && existingQuoteRequest.sellerResponse.maximumQuantity >= reqBody.quantity;
                if (quantityMatches) {
                    const resData = {
                        status: true,
                        data: _.omit(existingQuoteRequest, 'id', 'userId', 'sellerUserId', 'sellerUser', 'productId', 'product')
                    };
                    return resData;
                }
                yield quoteRequestRepo.createQueryBuilder()
                    .update(QuoteRequest_1.QuoteRequest)
                    .set({
                    status: Statuses_1.QuoteRequestStatuses.ENDED_BY_BUYER,
                })
                    .where({ id: existingQuoteRequest.id })
                    .execute();
            }
            const quoteRequestCreated = yield QouteRequestService.createQuoteRequest(reqBody, currentUser, product, deliverAddress);
            const resData = {
                status: true,
                data: _.omit(quoteRequestCreated, 'id', 'userId', 'sellerUserId', 'sellerUser', 'productId', 'product')
            };
            return resData;
        });
    }
    handleQuoteRequestSellerResponse(req, quoteRequestUuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
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
                    uuid: quoteRequestUuid,
                },
                join,
            });
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError('The specified quote request could not be found');
            }
            if (quoteRequest.sellerUserId !== currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError("You are NOT allowed to respond to the specified quote request");
            }
            if (quoteRequest.status !== Statuses_1.QuoteRequestStatuses.PENDING) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot respond to the quote request');
            }
            const successResponseToQuoteRequest = yield QouteRequestService.respondToQuoteRequest(currentUser, quoteRequest, reqBody);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleQuoteRequestSellerDecline(req, quoteRequestUuid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
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
                throw new error_response_types_1.NotFoundError('The specified quote request could not be found');
            }
            if (quoteRequest.sellerUserId !== currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError("You are NOT allowed to respond to the specified quote request");
            }
            if (quoteRequest.status !== Statuses_1.QuoteRequestStatuses.PENDING) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot decline the quote request');
            }
            const now = Utils.utcNow();
            quoteRequest.statusHistory.push({
                status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_SELLER,
                dateTimeInISO8601: now.toISOString()
            });
            yield quoteRequestRepo.createQueryBuilder()
                .update(QuoteRequest_1.QuoteRequest)
                .set({
                status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_SELLER,
                statusHistory: quoteRequest.statusHistory,
            })
                .where({ id: quoteRequest.id })
                .execute();
            const sellerAccountStats = yield AccountStatService.getSellerAccountStats(currentUser.id);
            const accountStatRepo = (0, typeorm_1.getRepository)(SellerAccountStat_1.SellerAccountStat);
            yield accountStatRepo.createQueryBuilder()
                .update(SellerAccountStat_1.SellerAccountStat)
                .set({
                totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount - 1,
            })
                .where({ id: sellerAccountStats.id })
                .execute();
            // TODO
            // notify buyer of seller decline
            const notificationMetadata = {
                quoteRequestUuid: quoteRequest.uuid,
            };
            const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has declined 
      your Quote request: #${quoteRequest.referenceNumber}.`;
            const notificationTransports = {
                [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            };
            NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, (_a = quoteRequest.user) === null || _a === void 0 ? void 0 : _a.uuid, NotificationMessageTypes_1.default.QUOTE_REQUEST_SELLER_DECLINE, 'Seller has declined your Quote Request', notificatiionMessage, notificationTransports, notificationMetadata);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetMyQuoteRequests(req, pageNumber, sortOrder, persona, pendingResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
            let query = {};
            if (persona === Persona_1.Persona.BUYER) {
                query = { userId: currentUser.id };
            }
            else if (persona === Persona_1.Persona.SELLER) {
                query = { sellerUserId: currentUser.id };
            }
            if (pendingResponse) {
                if (pendingResponse === 'true') {
                    query.sellerResponse = (0, typeorm_1.IsNull)();
                }
                else if (pendingResponse === 'false') {
                    query.sellerResponse = (0, typeorm_1.Not)((0, typeorm_1.IsNull)());
                }
            }
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    product: "quoteRequest.product",
                },
            };
            const pageSize = 10;
            const quoteRequestsPage = yield PaginationService.paginate(QuoteRequest_1.QuoteRequest, query, pageSize, pageNumber, sortOrder, undefined, join);
            const quoteRequests = quoteRequestsPage.dataset;
            const totalCount = yield quoteRequestRepo.count(query);
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
                    uuid: quoteRequest.uuid,
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
                data: { pageNumber, pageSize, dataset: transformedQuoteRequestsDataset, total: totalCount }
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/:quoteRequestUuid"),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('quoteRequestUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "handleGetQuoteRequestDetails", null);
__decorate([
    (0, tsoa_1.Post)(""),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "handleNewRequestQuote", null);
__decorate([
    (0, tsoa_1.Post)("/:quoteRequestUuid/seller_response"),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('quoteRequestUuid')),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "handleQuoteRequestSellerResponse", null);
__decorate([
    (0, tsoa_1.Put)("/:quoteRequestUuid/seller_response/decline"),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('quoteRequestUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "handleQuoteRequestSellerDecline", null);
__decorate([
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('pageNumber')),
    __param(2, (0, tsoa_1.Query)('sortOrder')),
    __param(3, (0, tsoa_1.Query)('persona')),
    __param(4, (0, tsoa_1.Query)('pendingResponse')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], QuoteRequestController.prototype, "handleGetMyQuoteRequests", null);
QuoteRequestController = __decorate([
    (0, tsoa_1.Route)("api/quoterequests"),
    (0, tsoa_1.Tags)('Quote Request'),
    (0, tsoa_1.Security)('jwt')
], QuoteRequestController);
exports.QuoteRequestController = QuoteRequestController;
//# sourceMappingURL=QuoteRequestController.js.map