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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
/* eslint-disable no-await-in-loop */
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Cart_1 = require("../entity/Cart");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const Order_1 = require("../entity/Order");
const PickupLocation_1 = require("../entity/PickupLocation");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const WareHouse_1 = require("../entity/WareHouse");
const Currency_1 = require("../enums/Currency");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const Roles_1 = require("../enums/Roles");
const SortOrder_1 = require("../enums/SortOrder");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const Persona_1 = require("../interfaces/Persona");
const CooperateService = __importStar(require("../services/cooperateService"));
const NotificationService = __importStar(require("../services/notificationService"));
const OrderService = __importStar(require("../services/orderService"));
const PaginationService = __importStar(require("../services/paginationService"));
const PriceMatrixService = __importStar(require("../services/priceMatrixService"));
const ProfileService = __importStar(require("../services/profileService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let OrdersController = class OrdersController extends tsoa_1.Controller {
    ensureWareHouseExistsForWareHouseOrder(currentUser, wareHouseUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!wareHouseUuid) {
                throw new error_response_types_1.UnprocessableEntityError('A warehouse order was placed but a warehouse was not selected');
            }
            const wareHouseRepo = (0, typeorm_1.getRepository)(WareHouse_1.WareHouse);
            const wareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId,
            });
            if (!wareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('An invalid warehouse was specified');
            }
            return wareHouse;
        });
    }
    handleLastOrderItems(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const recentOrderItems = yield OrderService.userLastOrderItems(currentUser);
            const resData = {
                status: true,
                data: recentOrderItems
            };
            return resData;
        });
    }
    orderDetails(req, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentuser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const order = yield orderRepo.findOne({ uuid: orderUuid });
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            if (order.buyerUserId !== currentuser.id && order.sellerUserId !== currentuser.id) {
                throw new error_response_types_1.UnprocessableEntityError("You are not allowed to view the order's details");
            }
            const fullOrderDetails = yield OrderService.orderDetails(order);
            const resData = {
                status: true,
                data: fullOrderDetails,
            };
            return resData;
        });
    }
    handleOrderCreationFromCart(req, orderPaymentVariant, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (!requestBody.newDeliveryAddress && !requestBody.deliveryAddressUuid) {
                    throw new error_response_types_1.BadRequestError('A delivery order requires delivery information');
                }
            }
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
                if (!requestBody.locationUuid) {
                    throw new error_response_types_1.BadRequestError('A Pickup order requires Pickup location information');
                }
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const cartRepo = connection.getRepository(Cart_1.Cart);
            const cart = yield cartRepo.findOne({ userId: currentUser.id });
            if (!cart) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            const { cartItems } = cart;
            if (!cartItems || !cartItems.length) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            let deliveryLocation;
            let pickupLocation;
            let wareHouse;
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (requestBody.newDeliveryAddress) {
                    deliveryLocation = yield OrderService.ensureDeliveryAddress(currentUser, requestBody.newDeliveryAddress);
                }
                else if (requestBody.deliveryAddressUuid) {
                    deliveryLocation = yield deliveryLocationRepo.findOne({
                        uuid: requestBody.deliveryAddressUuid
                    });
                }
            }
            else {
                pickupLocation = yield pickupLocationRepo.findOne({
                    uuid: requestBody.locationUuid
                });
            }
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE) {
                if (!requestBody.wareHouseUuid) {
                    throw new error_response_types_1.BadRequestError('A WareHouse order requires warehouse information');
                }
                wareHouse = yield this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid);
            }
            const createdOrders = yield OrderService.createOrders(currentUser, cart.cartItems, requestBody.orderReceiveType, orderPaymentVariant, deliveryLocation, pickupLocation, wareHouse, requestBody.differentOrderReceiver);
            const orderPayResponse = yield OrderService.processOrdersPayment(createdOrders, orderPaymentVariant, currentUser);
            yield cartRepo.createQueryBuilder()
                .update(Cart_1.Cart)
                .set({ cartItems: [] })
                .where({ id: cart.id })
                .execute();
            yield NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, []);
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            return resData;
        });
    }
    handleOrderPreparationFromCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const cartRepo = connection.getRepository(Cart_1.Cart);
            const cart = yield cartRepo.findOne({ userId: currentUser.id });
            if (!cart) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            const { cartItems } = cart;
            if (!cartItems || !cartItems.length) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            const preparedOrders = yield OrderService.prepareOrders(cart.cartItems);
            const resData = {
                status: true,
                data: preparedOrders,
            };
            return resData;
        });
    }
    handleOrderCreationFromPreparedCart(req, orderPaymentVariant, requestBody) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            if (currentUser.role !== Roles_1.Roles.AFFILIATE) {
                const existingUnpaidOrders = yield orderRepo.find({
                    buyerUserId: currentUser.id,
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
            const isWareHouseOrder = requestBody.sellers.find(aSeller => aSeller.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE);
            if (isWareHouseOrder) {
                yield this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid);
            }
            if (isWareHouseOrder && orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                throw new error_response_types_1.UnprocessableEntityError('Warehouse orders require immediate payment to proceed');
            }
            const createdOrders = yield OrderService.processOrderCreationFromPrepared(currentUser, requestBody, orderPaymentVariant);
            const orderPayResponse = yield OrderService.processOrdersPayment(createdOrders, orderPaymentVariant, currentUser);
            if ((_a = orderPayResponse.orderUuids) === null || _a === void 0 ? void 0 : _a.length) {
                const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
                const cart = yield cartRepo.findOne({ userId: currentUser.id });
                yield cartRepo
                    .createQueryBuilder()
                    .update(Cart_1.Cart)
                    .set({ cartItems: [] })
                    .where({ id: cart.id })
                    .execute();
                yield NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, []);
            }
            if (isWareHouseOrder) {
                const wareHouse = yield this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid);
                yield CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouse);
            }
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            return resData;
        });
    }
    //----------
    // Makes it possible to "Buy Now" when the user is looking at the seller's quote response
    handleOrderCreationFromQuoteRequest(req, quoteRequestUuid, orderPaymentVariant, requestBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (!requestBody.newDeliveryAddress && !requestBody.deliveryAddressUuid) {
                    throw new error_response_types_1.BadRequestError('A delivery order requires delivery information');
                }
            }
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
                if (!requestBody.locationUuid) {
                    throw new error_response_types_1.BadRequestError('A Pickup order requires pickup information');
                }
            }
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE) {
                if (!requestBody.wareHouseUuid) {
                    throw new error_response_types_1.BadRequestError('A WareHouse order requires warehouse information');
                }
            }
            // if (currentUser.settings.isOnCStore !== true){
            if (currentUser.role !== Roles_1.Roles.AFFILIATE) {
                const existingUnpaidOrders = yield OrderService.buyerUnpaidOrders(currentUser.id, []);
                if (existingUnpaidOrders.length) {
                    throw new error_response_types_1.UnprocessableEntityError('Please pay for your unpaid orders before creating a new Order from Quote Request');
                }
            }
            // }
            // let cStoreUserLastPreviousOrder;
            // if(currentUser.settings.isOnCStore === true){
            //   await WalletService.cstoreUserWalletbalance(currentUser.id)
            //   cStoreUserLastPreviousOrder = await OrderService.cStoreLastPreviousOrder(currentUser.id)
            // }
            const isWareHouseOrder = requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE;
            const connection = yield (0, db_1.getFreshConnection)();
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    product: "quoteRequest.product",
                },
            };
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            const quoteRequest = yield quoteRequestRepo.findOne({
                where: {
                    uuid: quoteRequestUuid,
                    userId: currentUser.id
                },
                join,
            });
            if (quoteRequest.status === Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
                throw new error_response_types_1.UnprocessableEntityError('The Qoute Request has Already Been Used to Create an Order, Please Place Another Qoute Request');
            }
            if (!quoteRequest) {
                throw new error_response_types_1.NotFoundError("The specified quote request could not be found");
            }
            if (!quoteRequest.sellerResponse) {
                // probably send a reminder to the seller to respond
                throw new error_response_types_1.UnprocessableEntityError("The seller has not responsed to the quote request yet.");
            }
            let deliveryLocation;
            let wareHouse;
            let pickupLocation;
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                if (requestBody.newDeliveryAddress) {
                    deliveryLocation = yield OrderService.ensureDeliveryAddress(currentUser, requestBody.newDeliveryAddress);
                }
                else if (requestBody.deliveryAddressUuid) {
                    deliveryLocation = yield deliveryLocationRepo.findOne({
                        uuid: requestBody.deliveryAddressUuid
                    });
                    if (!deliveryLocation) {
                        throw new error_response_types_1.UnprocessableEntityError("Delivery Address Selected does not exist");
                    }
                }
            }
            else if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
                pickupLocation = yield pickupLocationRepo.findOne({
                    uuid: requestBody.locationUuid
                });
                if (!pickupLocation) {
                    throw new error_response_types_1.UnprocessableEntityError("Pickup location Selected does not exist");
                }
            }
            else if (requestBody.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE) {
                wareHouse = yield this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid);
            }
            const orderItem = {
                productId: quoteRequest.product.id,
                productUuid: quoteRequest.product.uuid,
                productName: quoteRequest.product.name,
                quantity: quoteRequest.quantity,
                unitPrice: quoteRequest.sellerResponse.unitPrice,
                unitPriceForBuyer: quoteRequest.sellerResponse.unitPriceForBuyer,
                quoteRequest: {
                    uuid: quoteRequest.uuid,
                    unitPrice: quoteRequest.sellerResponse.unitPrice,
                    unitPriceForBuyer: quoteRequest.sellerResponse.unitPriceForBuyer,
                    deliveryFee: (_b = (_a = quoteRequest.sellerResponse) === null || _a === void 0 ? void 0 : _a.deliveryFee) !== null && _b !== void 0 ? _b : 0,
                    calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
                },
            };
            const createdOrders = yield OrderService.createOrders(currentUser, [orderItem], requestBody.orderReceiveType, orderPaymentVariant, deliveryLocation, pickupLocation, wareHouse, requestBody.differentOrderReceiver);
            yield OrderService.closeQuoteRequest(quoteRequest);
            const orderPayResponse = yield OrderService.processOrdersPayment(createdOrders, orderPaymentVariant, currentUser);
            // createdOrders[0].referenceNumber
            if (isWareHouseOrder) {
                yield CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouse);
            }
            // update price matrix when an order is place.
            yield PriceMatrixService.updatePriceMatrixWithOrderDetails(createdOrders[0].id, createdOrders[0].referenceNumber, quoteRequest.referenceNumber);
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            // if(currentUser.settings.isOnCStore === true){
            //   if(cStoreUserLastPreviousOrder !== false){
            //     await OrderService.closeCstoreUserPreviousOrder(cStoreUserLastPreviousOrder);
            //   }
            // }
            return resData;
        });
    }
    handleOrderConfirmation(req, orderUuid, newOrderStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
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
            if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
                if (order.paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                    throw new error_response_types_1.UnprocessableEntityError('Order has not been paid yet');
                }
            }
            if (Statuses_1.EndedOrderStatuses.includes(order.status)) {
                throw new error_response_types_1.UnprocessableEntityError("The order has ended");
            }
            const currentOrderDetails = yield OrderService.updateOrderStatus(order, newOrderStatus, currentUser);
            const resData = {
                status: true,
                data: currentOrderDetails,
            };
            return resData;
        });
    }
    handleOrderCancellation(req, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
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
            yield OrderService.vaidateOrderCancellation(currentUser, order);
            const cancelResult = yield OrderService.processOrderCancellation(currentUser, order);
            const resData = {
                status: cancelResult,
            };
            return resData;
        });
    }
    reviewOrder(req, reqBody, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { reviewNote, rating } = reqBody;
            if (_.isUndefined(reviewNote)) {
                throw new error_response_types_1.BadRequestError(`Please type in a review.`);
            }
            //--
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const order = yield orderRepo.findOne({ uuid: orderUuid });
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            //--
            if (![order.buyerUserId, order.sellerUserId].includes(currentUser.id)) {
                throw new error_response_types_1.UnauthorizedRequestError("You cannot rate this order");
            }
            const ratingUpdateGood = yield OrderService.submitOrderRating(currentUser, order, rating);
            if (![order.buyerUserId].includes(currentUser.id)) {
                throw new error_response_types_1.UnauthorizedRequestError("You cannot review this order");
            }
            const updateResult = yield orderRepo
                .createQueryBuilder()
                .update(Order_1.Order)
                .set({
                buyerReviewText: reviewNote,
                buyerReviewSubmittedAt: Utils.utcNow(),
            })
                .where({ id: order.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    disputeOrder(req, reqBody, orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const { disputeType, disputeText } = reqBody;
            const currentUser = req.user;
            if (_.isUndefined(disputeText)) {
                throw new error_response_types_1.BadRequestError(`Please type details of the dispute.`);
            }
            //--
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const order = yield orderRepo.findOne({ uuid: orderUuid });
            if (!order) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            if (![order.buyerUserId].includes(currentUser.id)) {
                throw new error_response_types_1.UnauthorizedRequestError("You cannot review this order");
            }
            const updateResult = yield orderRepo
                .createQueryBuilder()
                .update(Order_1.Order)
                .set({
                disputeType,
                disputeText,
                disputeTextSubmittedAt: Utils.utcNow(),
            })
                .where({ id: order.id })
                .execute();
            // EmailService.sendOrderDisputeToFinance(currentUser, disputeType, disputeText, order)
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetMyOrders(req, pageNumber, sortOrder, persona, orderStatus, orderPaymentStatus, orderPaymentVariant, procInvoiceUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            //--
            let query = {};
            if (persona === Persona_1.Persona.BUYER) {
                query = { buyerUserId: currentUser.id };
            }
            else if (persona === Persona_1.Persona.SELLER) {
                query = { sellerUserId: currentUser.id };
            }
            if (orderStatus && orderStatus !== Statuses_1.OrderStatusesDto.ALL) {
                query.status = orderStatus;
            }
            if (orderPaymentStatus && orderPaymentStatus !== Statuses_1.OrderPaymentStatusesDto.ALL) {
                query.paymentStatus = orderPaymentStatus;
            }
            if (orderPaymentVariant && orderPaymentVariant !== Statuses_1.OrderPaymentVariantDto.ALL) {
                query.paymentVariant = orderPaymentVariant;
            }
            if (procInvoiceUuid) {
                const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
                const procurementInvoice = yield procurementInvoiceRepo.findOne({
                    where: { uuid: procInvoiceUuid }
                });
                if (!procurementInvoice) {
                    throw new error_response_types_1.UnprocessableEntityError('The specified procurement invoice does not exist');
                }
                query.buyerAccountId = currentUser.accountId;
                query.procurementInvoiceUuid = procInvoiceUuid;
            }
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield orderRepo.count(query);
            const orderListsPages = yield PaginationService.paginate(Order_1.Order, query, pageSize, pageNumber, sortOrder, undefined, join);
            const orderLists = orderListsPages.dataset;
            const buyerUserIds = orderLists.map(order => order.buyerUserId);
            const sellerUserIds = orderLists.map(order => order.sellerUserId);
            const allUserIds = _.uniq(_.flatten([...buyerUserIds, ...sellerUserIds]));
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
            // await ProfileService.getPublicProfileFromUserIds(allUserIds)
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            // @ts-ignore
            const transformedOrderListsDataset = orderLists.map(order => {
                const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === order.buyerUser.uuid);
                const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === order.sellerUser.uuid);
                const currencySymbol = CurrencyEnum[order.currency] || "₦";
                return {
                    orderUuid: order.uuid,
                    orderItems: order.orderItems,
                    referenceNumber: order.referenceNumber,
                    sellerPublicProfile,
                    buyerPublicProfile,
                    orderReceiveType: order.orderReceiveType,
                    status: order.status,
                    paymentStatus: order.paymentStatus,
                    paymentVariant: order.paymentVariant,
                    statusHistory: order.statusHistory,
                    paymentStatusHistory: order.paymentStatusHistory,
                    procurementInvoiceUuid: order.procurementInvoiceUuid,
                    calculatedTotalCostMajor: order.calculatedTotalCostMajor,
                    deliveryCostMajor: order.deliveryCostMajor,
                    currency: order.currency,
                    currencySymbol,
                    createdAt: order.createdAt,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedOrderListsDataset, total: totalCount }
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/lastorderitems"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleLastOrderItems", null);
__decorate([
    (0, tsoa_1.Get)("/:orderUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("orderUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "orderDetails", null);
__decorate([
    (0, tsoa_1.Post)("/create/fromcart/:orderPaymentVariant"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderCreationFromCart", null);
__decorate([
    (0, tsoa_1.Get)("/prepare/fromcart"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderPreparationFromCart", null);
__decorate([
    (0, tsoa_1.Post)("/create/frompreparedcart/:orderPaymentVariant"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderCreationFromPreparedCart", null);
__decorate([
    (0, tsoa_1.Post)("/create/fromquoterequest/:quoteRequestUuid/:orderPaymentVariant"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("quoteRequestUuid")),
    __param(2, (0, tsoa_1.Path)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderCreationFromQuoteRequest", null);
__decorate([
    (0, tsoa_1.Put)("/:orderUuid/statusupdate/:newOrderStatus"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("orderUuid")),
    __param(2, (0, tsoa_1.Path)("newOrderStatus")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderConfirmation", null);
__decorate([
    (0, tsoa_1.Get)("/:orderUuid/cancel"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("orderUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleOrderCancellation", null);
__decorate([
    (0, tsoa_1.Post)("/:orderUuid/review"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("orderUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "reviewOrder", null);
__decorate([
    (0, tsoa_1.Post)("/:orderUuid/dispute"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("orderUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "disputeOrder", null);
__decorate([
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("persona")),
    __param(4, (0, tsoa_1.Query)("status")),
    __param(5, (0, tsoa_1.Query)("paymentStatus")),
    __param(6, (0, tsoa_1.Query)("paymentVariant")),
    __param(7, (0, tsoa_1.Query)("procInvoiceUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "handleGetMyOrders", null);
OrdersController = __decorate([
    (0, tsoa_1.Route)("api/orders"),
    (0, tsoa_1.Tags)("Orders"),
    (0, tsoa_1.Security)("jwt")
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=OrdersController.js.map