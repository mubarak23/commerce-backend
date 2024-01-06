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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.cStoreLastPreviousOrder = exports.closeCstoreUserPreviousOrder = exports.updateOrderWithPriceMatrixDetails = exports.userLastOrderItems = exports.closeQuoteRequest = exports.changeOrderTotalByAdmnin = exports.orderDetails = exports.buyerUnpaidOrders = exports.submitOrderRating = exports.processOrderCancellation = exports.vaidateOrderCancellation = exports.affiliateUnpaidOrder = exports.dispatchOrderNotificationBasedOnStatus = exports.updateOrderStatus = exports.ensureDeliveryAddress = exports.revertDeductUpFrontPaymentForPOD = exports.deductUpFrontPaymentForPOD = exports.ordersByPaymentReference = exports.processOrdersPayment = exports.prepareOrders = exports.processOrderCreationFromPrepared = exports.notifyAffiliatesBuyerOfNewOrder = exports.processPODNotification = exports.hasAvailableBalance = exports.createOrdersFromTemporaryOrders = exports.createOrders = void 0;
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
const _ = __importStar(require("underscore"));
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Order_1 = require("../entity/Order");
const PickupLocation_1 = require("../entity/PickupLocation");
const Product_1 = require("../entity/Product");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const User_1 = require("../entity/User");
const Currency_1 = require("../enums/Currency");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const PaymentService = __importStar(require("../services/paymentService"));
const PaystackService = __importStar(require("../services/paystackService"));
const AccountStatService = __importStar(require("../services/sellerAccountStatService"));
const WalletService = __importStar(require("../services/walletService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const EscrowService = __importStar(require("./escrowService"));
const NotificationService = __importStar(require("./notificationService"));
const PriceMatricService = __importStar(require("./priceMatrixService"));
const ProductsService = __importStar(require("./productsService"));
const ProfileService = __importStar(require("./profileService"));
const smsSendingService_1 = require("./smsSendingService");
const Cart_1 = require("../entity/Cart");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const Wallet_1 = require("../entity/Wallet");
const WareHouse_1 = require("../entity/WareHouse");
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const Roles_1 = require("../enums/Roles");
const ConfigPropertyService = __importStar(require("../services/configPropertyService"));
const createOrders = (currentUser, cartItems, orderReceiveType, paymentVariant, deliveryLocation, pickupLocation, warehouseLocation, differentOrderReceiver, temporaryOrderUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    if (currentUser.role === Roles_1.Roles.AFFILIATE) {
        if (paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
            throw new error_response_types_1.UnprocessableEntityError('Affiliates can only create pay on delivery orders');
        }
    }
    if (currentUser.role !== Roles_1.Roles.AFFILIATE) {
        const existingUnpaidOrders = yield (0, exports.buyerUnpaidOrders)(currentUser.id, []);
        if (existingUnpaidOrders.length) {
            throw new error_response_types_1.UnprocessableEntityError('Please pay for your unpaid orders before creating a new one');
        }
    }
    const productUuids = cartItems.map(cartItem => cartItem.productUuid);
    const products = yield ProductsService.getProductsByUuid(productUuids);
    if (!products.length) {
        throw new error_response_types_1.NotFoundError('We could not find the products in your cart');
    }
    const nonDeletedProductUuids = products.map(prod => prod.uuid);
    const sellerUserUuids = _.uniq(products.map(product => product.user.uuid));
    const sellerUserUuidsToProductUuids = {};
    for (const productUuid of nonDeletedProductUuids) {
        const product = products.find(prod => prod.uuid === productUuid);
        const sellerUserUuid = product.user.uuid;
        if (!sellerUserUuidsToProductUuids[sellerUserUuid]) {
            sellerUserUuidsToProductUuids[sellerUserUuid] = [];
        }
        sellerUserUuidsToProductUuids[sellerUserUuid].push(productUuid);
    }
    if (differentOrderReceiver) {
        if (differentOrderReceiver.userUuid) {
            const userRepo = connection.getRepository(User_1.User);
            const differentUser = yield userRepo.findOne({
                uuid: differentOrderReceiver.userUuid
            });
            if (differentUser) {
                differentOrderReceiver.firstName = differentUser.firstName;
                differentOrderReceiver.lastName = differentUser.lastName;
                differentOrderReceiver.userId = differentUser.id;
                differentOrderReceiver.msisdn = differentUser.msisdn;
            }
        }
        if (differentOrderReceiver.userId) {
            const userRepo = connection.getRepository(User_1.User);
            const differentUser = yield userRepo.findOne({
                id: differentOrderReceiver.userId
            });
            if (differentUser) {
                differentOrderReceiver.firstName = differentUser.firstName;
                differentOrderReceiver.lastName = differentUser.lastName;
                differentOrderReceiver.userId = differentUser.id;
                differentOrderReceiver.msisdn = differentUser.msisdn;
            }
        }
    }
    const CurrencyEnum = Currency_1.CountryCodeToCurrency;
    const currency = CurrencyEnum[currentUser.countryIso2];
    const createdOrders = yield connection.transaction((transactionManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orders = [];
        const orderRepoT = transactionManager.getRepository(Order_1.Order);
        for (const sellerUserUuid of sellerUserUuids) {
            const sellerProductUuids = sellerUserUuidsToProductUuids[sellerUserUuid];
            const firstProduct = products.find(prod => prod.uuid === sellerProductUuids[0]);
            if (!firstProduct) {
                continue;
            }
            const orderItems = sellerProductUuids.map(spUuid => {
                var _a;
                const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === spUuid);
                const sellerP = products.find(prod => prod.uuid === spUuid);
                const newOrderItem = {
                    productId: sellerP.id,
                    productUuid: sellerP.uuid,
                    productName: sellerP.name,
                    quantity: cartItem.quantity,
                    unitPrice: cartItem.unitPrice,
                    unitPriceForBuyer: cartItem.unitPriceForBuyer,
                    unitPromoPriceForBuyer: cartItem.unitPromoPriceForBuyer,
                    promotionId: cartItem.promotionId,
                    productCategorySettings: (_a = sellerP.category) === null || _a === void 0 ? void 0 : _a.settings,
                    deliveryAddressState: deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.state,
                    quoteRequest: cartItem.quoteRequest
                };
                return newOrderItem;
            });
            if (paymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.WALLET) {
                yield (0, exports.hasAvailableBalance)(currentUser, orderItems);
            }
            let order = new Order_1.Order().initialize(currentUser, firstProduct.user, orderItems, orderReceiveType, currency, paymentVariant, differentOrderReceiver, deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.id, pickupLocation === null || pickupLocation === void 0 ? void 0 : pickupLocation.id, warehouseLocation === null || warehouseLocation === void 0 ? void 0 : warehouseLocation.id);
            if (temporaryOrderUuid) {
                order.temporaryOrderUuid = temporaryOrderUuid;
            }
            order = yield orderRepoT.save(order);
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            const orderWithJoins = yield orderRepoT.findOne({
                where: {
                    uuid: order.uuid,
                },
                join,
            });
            const referenceNumber = Utils.getOrderEntityReferenceNumber(orderWithJoins);
            yield orderRepoT.createQueryBuilder()
                .update(Order_1.Order)
                .set({
                referenceNumber,
            })
                .where({
                id: orderWithJoins.id
            })
                .execute();
            orderWithJoins.referenceNumber = referenceNumber;
            orders.push(orderWithJoins);
        }
        return orders;
    }));
    if (paymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        for (const order of createdOrders) {
            yield (0, exports.processPODNotification)(currentUser, order);
        }
    }
    return createdOrders;
});
exports.createOrders = createOrders;
const createOrdersFromTemporaryOrders = (currentUser, cartItems, orderReceiveType, paymentVariant, temporaryOrderUuid, deliveryLocation, warehouseLocation, pickupLocation) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.createOrders)(currentUser, cartItems, orderReceiveType, paymentVariant, deliveryLocation, pickupLocation, warehouseLocation, undefined, temporaryOrderUuid);
});
exports.createOrdersFromTemporaryOrders = createOrdersFromTemporaryOrders;
const hasAvailableBalance = (currentUser, orderItems) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const walletRepo = connection.getRepository(Wallet_1.Wallet);
    // calculate 
    let totalOrderAmount = 0;
    for (const orderItem of orderItems) {
        const singleOrderAmount = orderItem.quantity * orderItem.unitPriceForBuyer;
        totalOrderAmount += singleOrderAmount;
    }
    const totalOrderAmountMinor = totalOrderAmount * 100;
    const buyerWallet = yield walletRepo.findOne({ userId: currentUser.id });
    if (buyerWallet && totalOrderAmountMinor > buyerWallet.walletBalanceMinor) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process payment of order');
    }
    return true;
});
exports.hasAvailableBalance = hasAvailableBalance;
const processPODNotification = (currentUser, order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const connection = yield (0, db_1.getFreshConnection)();
    const messageBody = [
        `Dear, ${currentUser.firstName}. `,
        `You have successfully placed a cash on delivery order with the order reference: #${order.referenceNumber}. `,
        `Please note you are expected to make payment immediately when your items arrive. `,
        `Thanks, CinderBuild`
    ];
    const body = messageBody.join('');
    if (order.deliveryLocationId) {
        const deliveryRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
        const deliveryDetails = yield deliveryRepo.findOne({ id: order.deliveryLocationId });
        yield (0, smsSendingService_1.sendSms)((_a = deliveryDetails === null || deliveryDetails === void 0 ? void 0 : deliveryDetails.contactPhoneNumber) !== null && _a !== void 0 ? _a : '', body);
    }
    if (order.pickupLocationId) {
        const pickuplocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
        const pickLocationDetails = yield pickuplocationRepo.findOne({ id: order.pickupLocationId });
        yield (0, smsSendingService_1.sendSms)((_b = pickLocationDetails === null || pickLocationDetails === void 0 ? void 0 : pickLocationDetails.contactPhoneNumber) !== null && _b !== void 0 ? _b : '', body);
    }
    const notificationMetadata = {
        orderUuid: order.uuid,
    };
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.SMS]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    const resConf = yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_c = order.buyerUser) === null || _c === void 0 ? void 0 : _c.uuid, NotificationMessageTypes_1.default.POD_ORDER_CONFIRMATION, 'Pay on Delivery Order Confirmation', body, notificationTransports, notificationMetadata);
    console.log(`resBuyerCon ${resConf}`);
    //----------
    const domain = Utils.serverDomain();
    const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`;
    const notificationMetadataSeller = {
        orderUuid: order.uuid,
    };
    const notificationTransportsSeller = {
        [NotificationTransport_1.NotificationTransportMode.SMS]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    const resSeller = yield NotificationService.sendSingleNotificationToUserId(order.sellerUserId, (_d = order.sellerUser) === null || _d === void 0 ? void 0 : _d.uuid, NotificationMessageTypes_1.default.POD_ORDER_NOTIFCATION, 'Pay on Delivery Order Notification', `Dear ${order.sellerUser.firstName}, a cash on delivery order has been placed on your product. Please note our Support team will contact you shortly on how to proceed. 
    Click on the link to track your order ${orderTrackLink}. Thanks, CinderBuild`, notificationTransportsSeller, notificationMetadataSeller);
    if (currentUser.role === Roles_1.Roles.AFFILIATE) {
        yield (0, exports.notifyAffiliatesBuyerOfNewOrder)(currentUser, order);
    }
    return true;
});
exports.processPODNotification = processPODNotification;
const notifyAffiliatesBuyerOfNewOrder = (affiliateUser, order) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l, _m;
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const affiliateFirstName = affiliateUser.firstName;
    let affiliateBuyerFirstName = '';
    let affiliateBuyerMsisdn = '';
    if (order.receiverUserId) {
        const affiliateBuyer = yield userRepo.findOne(order.receiverUserId);
        if (affiliateBuyer) {
            affiliateBuyerFirstName = affiliateBuyer.firstName;
            affiliateBuyerMsisdn = affiliateBuyer.msisdn;
        }
        else {
            if ((_e = order.receiver) === null || _e === void 0 ? void 0 : _e.firstName) {
                affiliateBuyerFirstName = (_f = order.receiver) === null || _f === void 0 ? void 0 : _f.firstName;
            }
            else {
                return;
            }
            if ((_g = order.receiver) === null || _g === void 0 ? void 0 : _g.msisdn) {
                affiliateBuyerMsisdn = (_h = order.receiver) === null || _h === void 0 ? void 0 : _h.msisdn;
            }
            else {
                return;
            }
        }
    }
    else if (order.receiver) {
        if ((_j = order.receiver) === null || _j === void 0 ? void 0 : _j.firstName) {
            affiliateBuyerFirstName = (_k = order.receiver) === null || _k === void 0 ? void 0 : _k.firstName;
        }
        if ((_l = order.receiver) === null || _l === void 0 ? void 0 : _l.msisdn) {
            affiliateBuyerMsisdn = (_m = order.receiver) === null || _m === void 0 ? void 0 : _m.msisdn;
        }
    }
    if (affiliateBuyerFirstName.length && affiliateBuyerMsisdn.length) {
        const messageBody = [
            `Dear ${affiliateBuyerFirstName}.`,
            ` Your cash on delivery order: #${order.referenceNumber} has been created by: ${affiliateFirstName}.`,
            ` Please note you are expected to make payment immediately when your items arrive. Thanks, CinderBuild`
        ];
        const body = messageBody.join('');
        yield (0, smsSendingService_1.sendSms)(affiliateBuyerMsisdn, body);
    }
});
exports.notifyAffiliatesBuyerOfNewOrder = notifyAffiliatesBuyerOfNewOrder;
const processOrderCreationFromPrepared = (currentUser, requestBody, orderPaymentVariant) => __awaiter(void 0, void 0, void 0, function* () {
    let deliveryLocation;
    const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const orders = [];
    if (requestBody.newDeliveryAddress) {
        deliveryLocation = yield (0, exports.ensureDeliveryAddress)(currentUser, requestBody.newDeliveryAddress);
    }
    else if (requestBody.deliveryAddressUuid) {
        deliveryLocation = yield deliveryLocationRepo.findOne({
            uuid: requestBody.deliveryAddressUuid
        });
    }
    const sellerUserUuids = [];
    const pickupLocationUuids = [];
    const productUuids = [];
    let pickupLocations = [];
    let products = [];
    for (const sellerCartInfo of requestBody.sellers) {
        if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
            if (!requestBody.deliveryAddressUuid && !requestBody.newDeliveryAddress) {
                throw new error_response_types_1.UnprocessableEntityError('A Delivery Order was placed but Delivery Location details was Not Provided');
            }
        }
        if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && !sellerCartInfo.pickupLocationUuid) {
            throw new error_response_types_1.UnprocessableEntityError('A Pick Up Order was placed but Pickup Location was Not Selected.');
        }
        sellerUserUuids.push(sellerCartInfo.userUuid);
        if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
            pickupLocationUuids.push(sellerCartInfo.pickupLocationUuid);
        }
        for (const sellerCartItems of sellerCartInfo.cartItems) {
            productUuids.push(sellerCartItems.productUuid);
        }
    }
    if (pickupLocationUuids.length) {
        pickupLocations = yield pickupLocationRepo.find({
            uuid: (0, typeorm_1.In)(pickupLocationUuids)
        });
    }
    if (productUuids.length) {
        products = yield productRepo.find({
            where: {
                uuid: (0, typeorm_1.In)(productUuids),
                isSoftDeleted: false,
            },
            select: ['id', 'uuid', 'name', 'price']
        });
    }
    const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
    const cart = yield cartRepo.findOne({ userId: currentUser.id });
    const cartItems = cart.cartItems;
    const revenuePercentage = yield ConfigPropertyService.getConfigProperty(ConfigProperties_1.default.CINDERBUILD_REVENUE_PERCENTAGE);
    const revenuePercentageAsNum = Number(revenuePercentage);
    for (const sellerCartInfo of requestBody.sellers) {
        let pickupLocation;
        if (sellerCartInfo) {
            if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
                pickupLocation = pickupLocations.find(pLoc => pLoc.uuid === sellerCartInfo.pickupLocationUuid);
            }
            const preparedCartItems = sellerCartInfo.cartItems.map(sellerCItem => {
                const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === sellerCItem.productUuid);
                return cartItem;
            });
            const warehouseLocation = undefined;
            const createdOrders = yield (0, exports.createOrders)(currentUser, preparedCartItems, sellerCartInfo.orderReceiveType, orderPaymentVariant, deliveryLocation, pickupLocation, warehouseLocation, requestBody.differentOrderReceiver);
            orders.push(...createdOrders);
        }
    }
    return orders;
});
exports.processOrderCreationFromPrepared = processOrderCreationFromPrepared;
const prepareOrders = (cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    const productUuids = cartItems.map(cartItem => cartItem.productUuid);
    const products = yield ProductsService.getProductsByUuid(productUuids);
    if (!products.length) {
        throw new error_response_types_1.NotFoundError('We could not find the products in your cart');
    }
    const nonDeletedProductUuids = products.map(prod => prod.uuid);
    const sellerUserUuids = _.uniq(products.map(product => product.user.uuid));
    const sellerUserIds = _.uniq(products.map(product => product.user.id));
    const sellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(sellerUserIds);
    const sellerUserUuidsToProductUuids = {};
    for (const productUuid of nonDeletedProductUuids) {
        const product = products.find(prod => prod.uuid === productUuid);
        const sellerUserUuid = product.user.uuid;
        if (!sellerUserUuidsToProductUuids[sellerUserUuid]) {
            sellerUserUuidsToProductUuids[sellerUserUuid] = [];
        }
        sellerUserUuidsToProductUuids[sellerUserUuid].push(productUuid);
    }
    const preparedOrders = [];
    for (const sellerUserUuid of sellerUserUuids) {
        const sellerProductUuids = _.uniq(sellerUserUuidsToProductUuids[sellerUserUuid]);
        const firstProduct = products.find(prod => prod.uuid === sellerProductUuids[0]);
        const sellerPublicProfile = sellerPublicProfiles.find(sellerPublicP => sellerPublicP.userUuid === sellerUserUuid);
        const sellerPickupLocations = yield firstProduct.user.pickupLocations;
        const activeSellerPickuplocations = sellerPickupLocations.filter((location) => location.isSoftDeleted !== true);
        // @ts-ignore
        const orderPrepareCartItems = sellerProductUuids.map(spUuid => {
            const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === spUuid);
            return cartItem;
        });
        preparedOrders.push({
            sellerProfile: sellerPublicProfile,
            cartItems: orderPrepareCartItems,
            sellerPickupLocations: _.map(activeSellerPickuplocations, (loc) => _.omit(loc, "id", "user", "userId", "createdAt", "updatedAt", "isSoftDeleted"))
        });
    }
    return preparedOrders;
});
exports.prepareOrders = prepareOrders;
const processOrdersPayment = (orders, orderPaymentVariant, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userWallet = yield WalletService.getCustomerWallet(currentUser.id);
    console.log('Inside Payment for order');
    const createdOrders = orders.map((order) => {
        return { uuid: order.uuid, orderRef: order.referenceNumber };
    });
    const orderUuids = orders.map(order => order.uuid);
    let orderAmountMajor = 0;
    for (const order of orders) {
        orderAmountMajor += order.calculatedTotalCostMajor;
    }
    if (currentUser.role !== Roles_1.Roles.AFFILIATE) {
        if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
            const existingUnpaidOrders = yield (0, exports.buyerUnpaidOrders)(currentUser.id, orderUuids);
            if (existingUnpaidOrders.length) {
                throw new error_response_types_1.UnprocessableEntityError('Please pay for your unpaid orders before creating a new one');
            }
            // if(userWallet.walletBalanceMinor * 100 >= orderAmountMajor ){
            //   console.log('Did we reach here')
            //     await PaymentService.payWithWallet(orders, orderAmountMajor, currentUser)
            //     return {
            //       orders: createdOrders,
            //       orderUuids,
            //       paymentTransactionStatus: PaymentTransactionStatus.PAID
            //     }
            // }
            const deductSuccessful = yield (0, exports.deductUpFrontPaymentForPOD)(orders, currentUser, orderAmountMajor);
            if (!deductSuccessful) {
                throw new error_response_types_1.ServerError('There was a server error. Please try again.');
            }
            return {
                orders: createdOrders,
                orderUuids,
                paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
            };
        }
    }
    if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.WALLET) {
        yield PaymentService.payWithWallet(orders, orderAmountMajor, currentUser);
        return {
            orders: createdOrders,
            orderUuids,
            paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
        };
    }
    if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        const deductSuccessful = yield (0, exports.deductUpFrontPaymentForPOD)(orders, currentUser, orderAmountMajor);
        if (!deductSuccessful) {
            throw new error_response_types_1.ServerError('There was a server error. Please try again.');
        }
        return {
            orders: createdOrders,
            orderUuids,
            paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
        };
    }
    // TODO: Add new index to account for the paid_status column
    yield (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction)
        .createQueryBuilder()
        .where("metadata->>'orderUuid' IN (:...orderUuids)", {
        orderUuids,
    })
        .andWhere("paid_status = :paidStatus", {
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
    })
        .delete();
    const paystackPayingUser = {
        emailAddress: currentUser.emailAddress,
        fullName: `${currentUser.firstName} ${currentUser.lastName}`
    };
    const { paymentReference, paymentProviderRedirectUrl, accessCode, redirectUrlAfterPayment } = yield PaystackService.initializeTransaction(paystackPayingUser, orderAmountMajor);
    if (!paymentReference) {
        throw new error_response_types_1.ServerError('An error occurred while processing your payment. Please try again');
    }
    const paystackTransactionSaved = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        for (const order of orders) {
            const sourceWallet = yield WalletService.getCustomerWallet(currentUser.id);
            const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
            const metadata = {
                orderUuid: order.uuid,
            };
            const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER, (order.calculatedTotalCostMajor * 100), walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.UNPAID, paymentReference, metadata);
            financialTransaction.description = `${sourceWallet.currency}${order.calculatedTotalCostMajor} order payment`;
            const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
            const savedTransaction = yield transactionRepoT.save(financialTransaction);
            const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
            if (order) {
                yield orderRepoT.createQueryBuilder()
                    .update(Order_1.Order)
                    .set({ paymentTransactionUuid: savedTransaction.uuid })
                    .where({ uuid: order.uuid })
                    .execute();
            }
        }
        return true;
    }));
    if (!paystackTransactionSaved) {
        throw new error_response_types_1.ServerError('An error occurred while processing your payment. Please try again');
    }
    return {
        orders: createdOrders,
        orderUuids,
        paymentProviderDetails: {
            paymentReference,
            paymentProviderRedirectUrl,
            accessCode,
            redirectUrlAfterPayment,
        },
        paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
    };
});
exports.processOrdersPayment = processOrdersPayment;
const ordersByPaymentReference = (paymentReference) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    // full list of temporary order from the
    const financialRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
    const orderRepo = connection.getRepository(Order_1.Order);
    const financialTransactions = yield financialRepo.find({
        reference: paymentReference,
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
    });
    // const  orderuuids = financialTransactions.map(unPaidTrans => unPaidTrans.metadata?.orderUuid)
    if (!financialTransactions) {
        throw new error_response_types_1.NotFoundError('Order with the Provided Payment reference does not exist');
    }
    // if(financialTransactions.paidStatus !== PaymentTransactionStatus.PAID){
    //   throw new UnprocessableEntityError('Payment for the following reference was not completed.')
    // }
    const financialTransactionUuids = financialTransactions.map(transaction => transaction.uuid);
    const actualOrders = yield orderRepo.find({
        where: { paymentTransactionUuid: (0, typeorm_1.In)(financialTransactionUuids) }
    });
    if (actualOrders.length === 0) {
        throw new error_response_types_1.NotFoundError('Orders with the Provided Payment reference were not Processed.');
    }
    console.log('real orders', actualOrders);
    return actualOrders;
});
exports.ordersByPaymentReference = ordersByPaymentReference;
const deductUpFrontPaymentForPOD = (orders, user, totalOrderAmountMajor) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside deduct UpFront Payment For POD ');
    const connection = yield (0, db_1.getFreshConnection)();
    const buyerWallet = yield WalletService.getCustomerWallet(user.id);
    const totalOrderAmountMinor = totalOrderAmountMajor * 100;
    let walletBalanceMinorBefore = buyerWallet.walletBalanceMinor;
    const walletDeductionTransations = [];
    for (const order of orders) {
        const transactionMetadata = {
            orderUuid: order.uuid,
        };
        const walletBalanceMinorAfter = walletBalanceMinorBefore - (order.calculatedTotalCostMajor * 100);
        const walletDeductionTransation = new FinancialTransaction_1.FinancialTransaction().initialize(buyerWallet, PaymentTransaction_1.PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW, order.calculatedTotalCostMajor * 100, walletBalanceMinorBefore, walletBalanceMinorAfter, buyerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, transactionMetadata);
        walletDeductionTransation.description =
            `Wallet balance deduction for Pay On Delivery Order: #${order.referenceNumber}`;
        walletDeductionTransations.push(walletDeductionTransation);
        walletBalanceMinorBefore = walletBalanceMinorAfter;
    }
    const walletBalanceDeductStatus = yield connection.transaction((transactionManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionManager.getRepository(Wallet_1.Wallet);
        yield financialTransactionRepoT.createQueryBuilder()
            .insert()
            .into(FinancialTransaction_1.FinancialTransaction)
            .values(walletDeductionTransations)
            .execute();
        yield walletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: buyerWallet.walletBalanceMinor - totalOrderAmountMinor,
        })
            .where({
            userId: user.id,
        })
            .execute();
        return true;
    }));
    if (walletBalanceDeductStatus) {
        console.log('update order status to in progress after deduction');
        for (const order of orders) {
            const now = Utils.utcNow();
            const newStatusEntry = {
                status: Statuses_1.default.IN_PROGRESS,
                dateTimeInISO8601: now.toISOString()
            };
            order.statusHistory = order.statusHistory || [];
            const orderDeliveryLocationRepo = connection.getRepository(Order_1.Order);
            yield orderDeliveryLocationRepo.createQueryBuilder()
                .update(Order_1.Order)
                .set({
                status: Statuses_1.default.IN_PROGRESS,
                statusHistory: [...order.statusHistory, newStatusEntry]
            })
                .where({
                id: order.id
            })
                .execute();
        }
    }
    return walletBalanceDeductStatus;
});
exports.deductUpFrontPaymentForPOD = deductUpFrontPaymentForPOD;
const revertDeductUpFrontPaymentForPOD = (order, user, transactionManager) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside revert deduct UpFront Payment For POD ');
    const connection = yield (0, db_1.getFreshConnection)();
    const buyerWallet = yield WalletService.getCustomerWallet(user.id);
    if (order.paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        throw new error_response_types_1.UnprocessableEntityError('Upfront Deduction Revesal is only Available on Pay on Delivery Order.');
    }
    const totalOrderAmountMinor = (order.calculatedTotalCostMajor * 100);
    let walletBalanceMinorBefore = buyerWallet.walletBalanceMinor;
    const transactionMetadata = {
        orderUuid: order.uuid,
    };
    const walletBalanceMinorAfter = walletBalanceMinorBefore + (order.calculatedTotalCostMajor * 100);
    const walletDeductionReversalTransation = new FinancialTransaction_1.FinancialTransaction().initialize(buyerWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_BUYER_WALLET, order.calculatedTotalCostMajor * 100, walletBalanceMinorBefore, walletBalanceMinorAfter, buyerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, transactionMetadata);
    walletDeductionReversalTransation.description =
        `Wallet balance deduction Reversal for Pay On Delivery Order: #${order.referenceNumber}`;
    walletBalanceMinorBefore = walletBalanceMinorAfter;
    const financialTransactionRepoT = transactionManager.getRepository(FinancialTransaction_1.FinancialTransaction);
    const walletRepoT = transactionManager.getRepository(Wallet_1.Wallet);
    yield financialTransactionRepoT.createQueryBuilder()
        .insert()
        .into(FinancialTransaction_1.FinancialTransaction)
        .values(walletDeductionReversalTransation)
        .execute();
    yield walletRepoT.createQueryBuilder()
        .update(Wallet_1.Wallet)
        .set({
        walletBalanceMinor: buyerWallet.walletBalanceMinor + totalOrderAmountMinor,
    })
        .where({
        userId: user.id,
    })
        .execute();
    return true;
});
exports.revertDeductUpFrontPaymentForPOD = revertDeductUpFrontPaymentForPOD;
const ensureDeliveryAddress = (buyerUser, newDeliveryAddress) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newDeliveryAddress) {
        return undefined;
    }
    const { address, country, state, contactFullName, contactPhoneNumber } = newDeliveryAddress;
    const deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(buyerUser.id, address, country, state, contactFullName !== null && contactFullName !== void 0 ? contactFullName : '', contactPhoneNumber !== null && contactPhoneNumber !== void 0 ? contactPhoneNumber : '');
    return deliveryLocation.save();
});
exports.ensureDeliveryAddress = ensureDeliveryAddress;
const updateOrderStatus = (order, newOrderStatus, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    if (order.status === Statuses_1.default.CANCELLED_BY_ADMIN) {
        throw new error_response_types_1.UnauthorizedRequestError('You Cannot update an Order that has Been Cancel Admin');
    }
    if (newOrderStatus === Statuses_1.default.RECEIVED) {
        yield PriceMatricService.doesPriceMatrixExistForOrder(order);
    }
    const sellerWallet = yield WalletService.getCustomerWallet(order.sellerUserId);
    if ([Statuses_1.default.IN_PROGRESS, Statuses_1.default.AVAILABLE_FOR_PICKUP, Statuses_1.default.COMPLETED].includes(newOrderStatus)) {
        if (currentUser.id !== order.sellerUserId) {
            throw new error_response_types_1.UnauthorizedRequestError('You are not allowed to make that status update');
        }
    }
    if ([Statuses_1.default.CONFIRMED, Statuses_1.default.ENDED_WITH_DISPUTES].includes(newOrderStatus)) {
        if (currentUser.id !== order.buyerUserId) {
            throw new error_response_types_1.UnauthorizedRequestError('You are not allowed to make that status update');
        }
    }
    if ([Statuses_1.default.COMPLETED].includes(newOrderStatus)) {
        if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
            if (order.paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                throw new error_response_types_1.UnprocessableEntityError('The order has not been paid for yet.');
            }
        }
    }
    const statusExist = order.statusHistory.map((item) => item.status).find((item) => item === newOrderStatus);
    if (statusExist) {
        throw new error_response_types_1.UnprocessableEntityError('Order Has Been Updated With The Provided Status');
    }
    yield pushNewOrderStatusEntry(order, newOrderStatus);
    if (newOrderStatus === Statuses_1.default.ENDED_WITH_DISPUTES) {
        yield EscrowService.refundBuyerForOrder(order);
    }
    else if (newOrderStatus === Statuses_1.default.RECEIVED
        || newOrderStatus === Statuses_1.default.CONFIRMED
        || newOrderStatus === Statuses_1.default.CONFIRMED_BY_SYSTEM) {
        yield EscrowService.moveFundsFromEscrowToSellerForOrder(order, order.sellerUser, sellerWallet);
    }
    if (Statuses_1.EndedOrderStatuses.includes(newOrderStatus)) {
        const sellerAccountStats = yield AccountStatService.getSellerAccountStats(order.sellerUserId);
        const accountStatRepo = (0, typeorm_1.getRepository)(SellerAccountStat_1.SellerAccountStat);
        yield accountStatRepo.createQueryBuilder()
            .update(SellerAccountStat_1.SellerAccountStat)
            .set({
            totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount - 1,
        })
            .where({ id: sellerAccountStats.id })
            .execute();
    }
    const notificationMetadata = {
        orderUuid: order.uuid,
        newStatusUpdate: newOrderStatus,
        dateTimeInISO8601: Utils.utcNow().toISOString()
    };
    const notificationTitle = Utils.getOrderStatusUpdateTitle(order, newOrderStatus);
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.SMS]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_o = order.buyerUser) === null || _o === void 0 ? void 0 : _o.uuid, NotificationMessageTypes_1.default.ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE, notificationTitle, '', notificationTransports, notificationMetadata);
    yield (0, exports.dispatchOrderNotificationBasedOnStatus)(order, newOrderStatus);
    return (0, exports.orderDetails)(order);
});
exports.updateOrderStatus = updateOrderStatus;
const pushNewOrderStatusEntry = (order, newOrderStatus) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside update order status');
    const now = Utils.utcNow();
    const newStatusEntry = {
        status: newOrderStatus,
        dateTimeInISO8601: now.toISOString()
    };
    order.statusHistory = order.statusHistory || [];
    const updatedStatusHistory = [...order.statusHistory];
    if (newOrderStatus === Statuses_1.default.RECEIVED) {
        updatedStatusHistory.push(newStatusEntry);
        if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER) {
            console.log('confirm status was send here');
            const isConfirmedStatusExisting = order.statusHistory
                .filter((status) => status.status === Statuses_1.default.CONFIRMED)
                .length > 0;
            if (!isConfirmedStatusExisting) {
                updatedStatusHistory.push({
                    status: Statuses_1.default.CONFIRMED,
                    dateTimeInISO8601: now.toISOString()
                });
                newOrderStatus = Statuses_1.default.CONFIRMED;
            }
        }
    }
    else if (newOrderStatus === Statuses_1.default.CONFIRMED) {
        const isReceivedStatusExisting = order.statusHistory
            .filter((status) => status.status === Statuses_1.default.RECEIVED)
            .length > 0;
        if (!isReceivedStatusExisting) {
            updatedStatusHistory.push({
                status: Statuses_1.default.RECEIVED,
                dateTimeInISO8601: now.toISOString()
            });
        }
        updatedStatusHistory.push({
            status: Statuses_1.default.CONFIRMED,
            dateTimeInISO8601: now.toISOString()
        });
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const orderDeliveryLocationRepo = connection.getRepository(Order_1.Order);
    yield orderDeliveryLocationRepo.createQueryBuilder()
        .update(Order_1.Order)
        .set({
        status: newOrderStatus,
        statusHistory: updatedStatusHistory,
    })
        .where({
        id: order.id
    })
        .execute();
});
const dispatchOrderNotificationBasedOnStatus = (orderDetail, statusNotification) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q, _r, _s, _t, _u;
    if (statusNotification === Statuses_1.default.AVAILABLE_FOR_PICKUP) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTitle = Utils.getOrderStatusUpdateTitle(orderDetail, statusNotification);
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
        };
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_p = orderDetail.buyerUser) === null || _p === void 0 ? void 0 : _p.uuid, NotificationMessageTypes_1.default.ORDER_AVAILABLE_FOR_PICKUP, notificationTitle, `Your Order with ref #${orderDetail.referenceNumber} is available for pickup. CinderBuild Team.`, notificationTransports, notificationMetadata);
        return true;
    }
    if (statusNotification === Statuses_1.default.AVAILABLE_FOR_DELIVERY) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTitle = Utils.getOrderStatusUpdateTitle(orderDetail, statusNotification);
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
        };
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_q = orderDetail.buyerUser) === null || _q === void 0 ? void 0 : _q.uuid, NotificationMessageTypes_1.default.ORDER_AVAILABLE_FOR_DELIVERY, notificationTitle, `Your order with ref #${orderDetail.referenceNumber} is available for delivery`, notificationTransports, notificationMetadata);
        return true;
    }
    if (orderDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && statusNotification === Statuses_1.default.CONFIRMED) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
        };
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_r = orderDetail.buyerUser) === null || _r === void 0 ? void 0 : _r.uuid, NotificationMessageTypes_1.default.CONFIRMED_PICKUP, 'Order Picked Up Confirmed', `Your order with ref #${orderDetail.referenceNumber} has been picked up`, notificationTransports, notificationMetadata);
        return true;
    }
    if (orderDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY && statusNotification === Statuses_1.default.CONFIRMED) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
        };
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_s = orderDetail.buyerUser) === null || _s === void 0 ? void 0 : _s.uuid, NotificationMessageTypes_1.default.CONFIRMED_DELIVERY, 'Order Delivery Confirmed', `Your order with ref #${orderDetail.referenceNumber} has been delivered`, notificationTransports, notificationMetadata);
        return true;
    }
    if (orderDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY && statusNotification === Statuses_1.default.CONFIRMED) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.SMS]: true
        };
        const formatedDate = Utils.formatDate(orderDetail.updatedAt);
        const smsbody = `Dear ${orderDetail.buyerUser.firstName}, we can confirm that your order #${orderDetail.referenceNumber} has been successfully delivered 
    to you today ${formatedDate} and we will now go ahead to close your transaction. Please note you have 48 hours to raise 
    a dispute if your item has not been delivered. You can do this by either placing a call to +2347001236202 or 
    send an email to support@cinderbuild.com`;
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_t = orderDetail.buyerUser) === null || _t === void 0 ? void 0 : _t.uuid, NotificationMessageTypes_1.default.ORDER_DELIVERED, 'Order Delivered', smsbody, notificationTransports, notificationMetadata);
        return true;
    }
    if (orderDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && statusNotification === Statuses_1.default.CONFIRMED) {
        const notificationMetadata = {
            orderUuid: orderDetail.uuid,
            newStatusUpdate: statusNotification,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.SMS]: true
        };
        const formatedDate = Utils.formatDate(orderDetail.updatedAt);
        const smsbody = `Dear ${orderDetail.buyerUser.firstName}, we can confirm that your order #${orderDetail.referenceNumber} has been picked up 
    today at ${formatedDate} and we will now go ahead to close your transaction. Please note you have 48 hours to raise 
    a dispute if your item has not been delivered. You can do this by either placing a call to +2347001236202 or 
    send an email to support@cinderbuild.com`;
        yield NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, (_u = orderDetail.buyerUser) === null || _u === void 0 ? void 0 : _u.uuid, NotificationMessageTypes_1.default.ORDER_PICKED_UP, 'Order Picked Up', smsbody, notificationTransports, notificationMetadata);
        return true;
    }
    return true;
});
exports.dispatchOrderNotificationBasedOnStatus = dispatchOrderNotificationBasedOnStatus;
const affiliateUnpaidOrder = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const unpaidOrderByAffiliate = yield orderRepo.find({
        where: {
            buyerUserId: currentUser.id,
            paymentStatus: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
        },
    });
    if (unpaidOrderByAffiliate.length) {
        throw new error_response_types_1.UnprocessableEntityError("Pay for All Unpaid Orders Before Placing a Withdrawal Request");
    }
    return true;
});
exports.affiliateUnpaidOrder = affiliateUnpaidOrder;
const vaidateOrderCancellation = (currentUser, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUser.id === order.buyerUserId &&
        order.status === Statuses_1.default.CANCELLED_BY_BUYER) {
        throw new error_response_types_1.UnprocessableEntityError("Order is already cancelled by buyer");
    }
    if (currentUser.id === order.sellerUserId &&
        order.status === Statuses_1.default.CANCELLED_BY_SELLER) {
        throw new error_response_types_1.UnprocessableEntityError("Order is already cancelled by seller");
    }
    if (order.status === Statuses_1.default.AVAILABLE_FOR_PICKUP) {
        throw new error_response_types_1.UnprocessableEntityError("The order is already available for pickup.");
    }
    if (order.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
        if (currentUser.id === order.buyerUserId && order.status === Statuses_1.default.IN_PROGRESS) {
            throw new error_response_types_1.UnprocessableEntityError("Sorry, you cannot cancel a delivery order that is already in progress");
        }
    }
    if (Statuses_1.EndedOrderStatuses.includes(order.status)) {
        throw new error_response_types_1.UnprocessableEntityError("Order has already ended");
    }
    return true;
});
exports.vaidateOrderCancellation = vaidateOrderCancellation;
const processOrderCancellation = (currentUser, order) => __awaiter(void 0, void 0, void 0, function* () {
    var _v, _w;
    const connection = yield (0, db_1.getFreshConnection)();
    const cancelStatus = currentUser.id === order.buyerUserId
        ? Statuses_1.default.CANCELLED_BY_BUYER
        : Statuses_1.default.CANCELLED_BY_SELLER;
    order.statusHistory.push({
        status: cancelStatus,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updateQuery = {
        status: cancelStatus,
        statusHistory: order.statusHistory,
    };
    const allDone = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
        yield orderRepoT
            .createQueryBuilder()
            .update(Order_1.Order)
            .set(updateQuery)
            .where({
            id: order.id,
        })
            .execute();
        if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW) {
            const refundResult = yield PaymentService.processOrderRefundToBuyer(order, transactionalEntityManager);
            return refundResult;
        }
        return true;
    }));
    if (allDone) {
        const notificationMetadata = {
            orderUuid: order.uuid,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.SMS]: true,
        };
        if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_REFUND) {
            const buyerRefundMsg = `Order: #${order.referenceNumber} has been cancelled. 
      Your refund has been processed and should be visible in your wallet balance.`;
            yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_v = order.buyerUser) === null || _v === void 0 ? void 0 : _v.uuid, NotificationMessageTypes_1.default.ORDER_REFUND_TO_BUYER, 'Order refund', buyerRefundMsg, notificationTransports, notificationMetadata);
        }
        if (currentUser.id === order.buyerUserId) { // Means it is only possible for pickup orders before available for pickup.
            yield NotificationService.sendSingleNotificationToUserId(order.sellerUserId, (_w = order.sellerUser) === null || _w === void 0 ? void 0 : _w.uuid, NotificationMessageTypes_1.default.ORDER_CANCELLED_BY_BUYER, 'Order cancellation', `Order: #${order.referenceNumber} has been cancelled by the buyer. CinderBuild Team.`, notificationTransports, notificationMetadata);
        }
    }
    return allDone;
});
exports.processOrderCancellation = processOrderCancellation;
const submitOrderRating = (currentUser, order, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRatingUpdateObject = {};
    if (order.buyerUserId === currentUser.id) {
        orderRatingUpdateObject.ratingFromBuyer = rating;
    }
    if (order.sellerUserId === currentUser.id) {
        orderRatingUpdateObject.ratingFromSeller = rating;
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const userRepo = connection.getRepository(User_1.User);
    yield orderRepo.createQueryBuilder()
        .update(Order_1.Order)
        .set(orderRatingUpdateObject)
        .where({
        id: order.id
    })
        .execute();
    yield userRepo.createQueryBuilder()
        .update(User_1.User)
        .set({
        totalRatingsValue: () => `total_ratings_value + ${rating}`,
        totalNumberOfRatings: () => "total_number_of_ratings + 1",
    })
        .where({
        id: (order.buyerUserId === currentUser.id) ? order.sellerUserId : order.buyerUserId
    })
        .execute();
    return true;
});
exports.submitOrderRating = submitOrderRating;
const buyerUnpaidOrders = (buyerUserId, exclusionOrderUuids) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const query = {
        buyerUserId,
        paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY,
        status: (0, typeorm_1.Not)((0, typeorm_1.In)([
            Statuses_1.default.COMPLETED, Statuses_1.default.CONFIRMED, Statuses_1.default.ENDED_WITH_DISPUTES, Statuses_1.default.RECEIVED,
            Statuses_1.default.AVAILABLE_FOR_DELIVERY, Statuses_1.default.AVAILABLE_FOR_PICKUP,
            Statuses_1.default.CANCELLED_BY_BUYER, Statuses_1.default.CANCELLED_BY_SELLER, Statuses_1.default.CANCELLED_BY_ADMIN,
        ])),
        paymentStatus: ((0, typeorm_1.In)([Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING, Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER])),
    };
    if (exclusionOrderUuids.length) {
        query.uuid = (0, typeorm_1.Not)((0, typeorm_1.In)(exclusionOrderUuids));
    }
    const existingUnpaidOrders = yield orderRepo.find(query);
    return existingUnpaidOrders;
});
exports.buyerUnpaidOrders = buyerUnpaidOrders;
const orderDetails = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const orderUsers = yield userRepo.find({
        id: (0, typeorm_1.In)([order.buyerUserId, order.sellerUserId]),
    });
    const buyerUser = orderUsers.find(oUser => oUser.id === order.buyerUserId);
    const sellerUser = orderUsers.find(oUser => oUser.id === order.sellerUserId);
    const buyerPublicProfile = yield ProfileService.getPublicProfile(buyerUser);
    const sellerPublicProfile = yield ProfileService.getPublicProfile(sellerUser);
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
    const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
    let deliveryLocation;
    if (order.deliveryLocationId) {
        deliveryLocation = yield deliveryLocationRepo.findOne({
            id: order.deliveryLocationId
        });
    }
    let pickupLocation;
    if (order.pickupLocationId) {
        pickupLocation = yield pickupLocationRepo.findOne({
            id: order.pickupLocationId
        });
    }
    let wareHouseLocation;
    if (order.warehouseId) {
        wareHouseLocation = yield wareHouseRepo.findOne({
            id: order.warehouseId
        });
    }
    const orderItemProductIds = order.orderItems.map(oItem => oItem.productId);
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const products = yield productRepo.find({
        id: (0, typeorm_1.In)(orderItemProductIds),
    });
    const newOrderDetailsResponseDto = order.toResponseDto(products, sellerPublicProfile, buyerPublicProfile, deliveryLocation, pickupLocation, wareHouseLocation);
    return newOrderDetailsResponseDto;
});
exports.orderDetails = orderDetails;
const changeOrderTotalByAdmnin = (order, newOrderAmountMajor, changeReason) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const buyerwallet = yield WalletService.getCustomerWallet(order.buyerUserId);
    const orderTotalDifferenceMinor = (Utils.normalizeMoney(order.calculatedTotalCostMajor - newOrderAmountMajor) * 100);
    const buyerWalletBalanceAfterMinor = buyerwallet.walletBalanceMinor + orderTotalDifferenceMinor;
    const changeOrderAmount = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const financialRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        yield orderRepoT.createQueryBuilder()
            .update(Order_1.Order)
            .set({
            calculatedTotalCostMajor: newOrderAmountMajor,
            adminOrderTotalOverride: {
                newAmountMajor: newOrderAmountMajor,
                reason: changeReason,
            }
        })
            .where({ uuid: order.uuid })
            .execute();
        yield walletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: buyerWalletBalanceAfterMinor
        })
            .where({ userId: buyerwallet.userId })
            .execute();
        const newFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(buyerwallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_BUYER_WALLET, orderTotalDifferenceMinor, buyerwallet.walletBalanceMinor, buyerWalletBalanceAfterMinor, buyerwallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, {
            orderUuid: order.uuid,
        });
        newFinancialTransaction.description = changeReason;
        yield financialRepoT.save(newFinancialTransaction);
        return true;
    }));
    return changeOrderAmount;
});
exports.changeOrderTotalByAdmnin = changeOrderTotalByAdmnin;
const closeQuoteRequest = (quoteRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const now = Utils.utcNow();
    quoteRequest.statusHistory.push({
        status: Statuses_1.QuoteRequestStatuses.ORDER_CREATED,
        dateTimeInISO8601: now.toISOString()
    });
    yield quoteRequestRepo
        .createQueryBuilder()
        .update(QuoteRequest_1.QuoteRequest)
        .set({ status: Statuses_1.QuoteRequestStatuses.ORDER_CREATED,
        statusHistory: quoteRequest.statusHistory, })
        .where({ id: quoteRequest.id })
        .execute();
    return true;
});
exports.closeQuoteRequest = closeQuoteRequest;
const userLastOrderItems = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    let lastOrderItems = [];
    const recentOrder = yield orderRepo.find({
        where: { buyerUserId: currentUser.id,
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER
        },
        order: { id: 'DESC' },
    });
    if (!recentOrder || !recentOrder[0]) {
        return lastOrderItems;
    }
    lastOrderItems = recentOrder[0].orderItems;
    return lastOrderItems;
});
exports.userLastOrderItems = userLastOrderItems;
const updateOrderWithPriceMatrixDetails = (priceMatrix) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const orderDetail = yield orderRepo.findOne({
        where: { id: priceMatrix.orderId }
    });
    if (!orderDetail) {
        return false;
    }
    yield orderRepo
        .createQueryBuilder()
        .update(Order_1.Order)
        .set({ priceMatrixId: priceMatrix.id, sellerHasChange: true })
        .where({ id: orderDetail.id })
        .execute();
    return true;
});
exports.updateOrderWithPriceMatrixDetails = updateOrderWithPriceMatrixDetails;
const closeCstoreUserPreviousOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const now = Utils.utcNow();
    const orderDetail = yield orderRepo.findOne({
        where: { id: orderId }
    });
    if (!orderDetail) {
        return false;
    }
    if (orderDetail.status === Statuses_1.default.IN_PROGRESS) {
        orderDetail.statusHistory.push({
            status: Statuses_1.default.CONFIRMED,
            dateTimeInISO8601: now.toISOString()
        });
        orderDetail.paymentStatusHistory.push({
            status: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            dateTimeInISO8601: now.toISOString()
        });
        yield orderRepo
            .createQueryBuilder()
            .update(Order_1.Order)
            .set({
            status: Statuses_1.default.CONFIRMED,
            statusHistory: orderDetail.statusHistory,
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            paymentStatusHistory: orderDetail.paymentStatusHistory,
        })
            .where({ id: orderDetail.id })
            .execute();
        return true;
    }
    return true;
});
exports.closeCstoreUserPreviousOrder = closeCstoreUserPreviousOrder;
const cStoreLastPreviousOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const buyerOrders = yield orderRepo.find({
        where: { buyerUserId: userId }
    });
    if (!buyerOrders) {
        return false;
    }
    return buyerOrders[0];
});
exports.cStoreLastPreviousOrder = cStoreLastPreviousOrder;
//# sourceMappingURL=orderService.js.map