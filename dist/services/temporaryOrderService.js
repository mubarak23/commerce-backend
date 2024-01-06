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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paidTemporaryOrderDetails = exports.processTemporaryOrdersPayment = exports.processTemporaryOrderCreationFromPrepared = exports.sellerCartItemsToFullCartItems = exports.temporaryCartToFullCartItemsJson = exports.temporaryOrderDetails = exports.createTemporaryOrders = void 0;
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
const _ = __importStar(require("underscore"));
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const PickupLocation_1 = require("../entity/PickupLocation");
const TemporaryOrder_1 = require("../entity/TemporaryOrder");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const ProductsService = __importStar(require("./productsService"));
const PaystackService = __importStar(require("../services/paystackService"));
const error_response_types_1 = require("../utils/error-response-types");
const Currency_1 = require("../enums/Currency");
const Utils = __importStar(require("../utils/core"));
const ProfileService = __importStar(require("../services/profileService"));
const User_1 = require("../entity/User");
const Product_1 = require("../entity/Product");
const Order_1 = require("../entity/Order");
const validatetempOrderData = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (requestBody.sellers.length === 0) {
        throw new error_response_types_1.UnprocessableEntityError('Incompleted Seller Product Details');
    }
    if (!requestBody.buyer) {
        throw new error_response_types_1.UnprocessableEntityError('Please Provide Full Buyer Details');
    }
    return true;
});
const createTemporaryOrders = (cartItems, orderReceiveType, buyerDetail, deliveryDetails, pickupLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(TemporaryOrder_1.TemporaryOrder);
    const productUuids = cartItems.map(cartItem => cartItem.productUuid);
    const products = yield ProductsService.getProductsByUuid(productUuids);
    if (!products.length) {
        throw new error_response_types_1.NotFoundError('We could not find the products in your cart');
    }
    for (const product of products) {
        if ((product === null || product === void 0 ? void 0 : product.price) === 0) {
            throw new error_response_types_1.UnprocessableEntityError('Product with Price of zero Can Only be process via Qoute Request');
        }
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
    const currency = Currency_1.CountryCodeToCurrency.NG;
    const createdOrders = yield connection.transaction((transactionManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orders = [];
        const orderRepoT = transactionManager.getRepository(TemporaryOrder_1.TemporaryOrder);
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
                    deliveryAddressState: deliveryDetails === null || deliveryDetails === void 0 ? void 0 : deliveryDetails.state,
                    quoteRequest: cartItem.quoteRequest
                };
                return newOrderItem;
            });
            let temporaryOrder = new TemporaryOrder_1.TemporaryOrder().initialize(firstProduct.user, orderItems, orderReceiveType, buyerDetail, currency, deliveryDetails !== null && deliveryDetails !== void 0 ? deliveryDetails : undefined, pickupLocation === null || pickupLocation === void 0 ? void 0 : pickupLocation.id);
            temporaryOrder = yield orderRepoT.save(temporaryOrder);
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    sellerUser: "order.sellerUser",
                },
            };
            const orderWithJoins = yield orderRepoT.findOne({
                where: {
                    uuid: temporaryOrder.uuid,
                },
                join,
            });
            orders.push(orderWithJoins);
        }
        return orders;
    }));
    return createdOrders;
});
exports.createTemporaryOrders = createTemporaryOrders;
const temporaryOrderDetails = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const sellerUser = yield userRepo.findOne({
        id: order.sellerUserId,
    });
    const sellerPublicProfile = yield ProfileService.getPublicProfile(sellerUser);
    const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
    let pickupLocation;
    if (order.pickupLocationId) {
        pickupLocation = yield pickupLocationRepo.findOne({
            id: order.pickupLocationId
        });
    }
    const orderItemProductIds = order.orderItems.map(oItem => oItem.productId);
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const products = yield productRepo.find({
        id: (0, typeorm_1.In)(orderItemProductIds),
    });
    const orderDetailsResponseDto = order.toResponseDto(products, sellerPublicProfile, pickupLocation);
    return orderDetailsResponseDto;
});
exports.temporaryOrderDetails = temporaryOrderDetails;
const temporaryCartToFullCartItemsJson = (temporaryCart) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const productUuids = temporaryCart.map(cItem => cItem.productUuid);
    const finalCartItemJson = [];
    const products = yield ProductsService.getProductsByUuid(productUuids);
    for (const cartItem of temporaryCart) {
        const product = products.find(p => p.uuid === cartItem.productUuid);
        if ((product === null || product === void 0 ? void 0 : product.price) === 0) {
            throw new error_response_types_1.UnprocessableEntityError('Product with price of zero can only be process via Qoute Request');
        }
        const forcedProduct = product;
        const unitPriceForBuyer = Utils.getPriceForBuyer((_a = forcedProduct.price) !== null && _a !== void 0 ? _a : 0, product);
        // const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
        const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer);
        const newSellerCartItemJson = {
            productId: forcedProduct.id,
            productUuid: forcedProduct.uuid,
            productName: forcedProduct.name,
            quantity: cartItem.quantity,
            unitPrice: (_b = (forcedProduct.price)) !== null && _b !== void 0 ? _b : 0,
            images: forcedProduct.images,
            unitPriceForBuyer,
            unitPromoPriceForBuyer,
            // promotionId: productCategoryPromo?.id,
            productCategorySettings: (_c = forcedProduct.category) === null || _c === void 0 ? void 0 : _c.settings,
        };
        finalCartItemJson.push(newSellerCartItemJson);
    }
    return finalCartItemJson;
});
exports.temporaryCartToFullCartItemsJson = temporaryCartToFullCartItemsJson;
const sellerCartItemsToFullCartItems = (sellerGroup) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const productUuids = [];
    const finalCartItemJson = [];
    productUuids.push(...sellerGroup.cartItems.map(sCartItem => sCartItem.productUuid));
    const products = yield ProductsService.getProductsByUuid(productUuids);
    for (const sCartItem of sellerGroup.cartItems) {
        const product = products.find(p => p.uuid === sCartItem.productUuid);
        const forcedProduct = product;
        const unitPriceForBuyer = Utils.getPriceForBuyer((_d = forcedProduct.price) !== null && _d !== void 0 ? _d : 0, product);
        // const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
        const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer);
        const newSellerCartItemJson = {
            productId: forcedProduct.id,
            productUuid: forcedProduct.uuid,
            productName: forcedProduct.name,
            quantity: sCartItem.quantity,
            unitPrice: (_e = (forcedProduct.price)) !== null && _e !== void 0 ? _e : 0,
            images: forcedProduct.images,
            unitPriceForBuyer,
            unitPromoPriceForBuyer,
            // promotionId: productCategoryPromo?.id,
            productCategorySettings: (_f = forcedProduct.category) === null || _f === void 0 ? void 0 : _f.settings,
        };
        finalCartItemJson.push(newSellerCartItemJson);
    }
    return finalCartItemJson;
});
exports.sellerCartItemsToFullCartItems = sellerCartItemsToFullCartItems;
const processTemporaryOrderCreationFromPrepared = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const temporaryOrders = [];
    const sellerUserUuids = [];
    const pickupLocationUuids = [];
    const productUuids = [];
    let pickupLocations = [];
    let products = [];
    yield validatetempOrderData(requestBody);
    for (const sellerCartInfo of requestBody.sellers) {
        sellerUserUuids.push(sellerCartInfo.userUuid);
        if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY && !requestBody.newDeliveryAddress) {
            throw new error_response_types_1.UnprocessableEntityError('A Delivery Order was placed but Delivery Details was Not Provided.');
        }
        if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && !sellerCartInfo.pickupLocationUuid) {
            throw new error_response_types_1.UnprocessableEntityError('A Pick Up Order was placed but Pickup Location was Not Selected.');
        }
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
    for (const productUiid of productUuids) {
        // eslint-disable-next-line no-await-in-loop
        const productExist = yield productRepo.findOne({ uuid: productUiid });
        if (!productExist) {
            throw new error_response_types_1.NotFoundError(`Product with following uuid ${productUiid} Does not exist`);
        }
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
    for (const sellerCartInfo of requestBody.sellers) {
        let pickupLocation;
        if (sellerCartInfo) {
            if (sellerCartInfo.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
                pickupLocation = pickupLocations.find(pLoc => pLoc.uuid === sellerCartInfo.pickupLocationUuid);
            }
            const preparedCartItems = yield (0, exports.sellerCartItemsToFullCartItems)(sellerCartInfo);
            const createdOrders = yield (0, exports.createTemporaryOrders)(preparedCartItems, sellerCartInfo.orderReceiveType, requestBody.buyer, requestBody.newDeliveryAddress, pickupLocation);
            temporaryOrders.push(...createdOrders);
        }
    }
    return temporaryOrders;
});
exports.processTemporaryOrderCreationFromPrepared = processTemporaryOrderCreationFromPrepared;
const processTemporaryOrdersPayment = (requestBody, temporaryOrders) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const temporaryOrderUuids = temporaryOrders.map(order => order.uuid);
    let orderAmountMajor = 0;
    for (const order of temporaryOrders) {
        orderAmountMajor += order.calculatedTotalCostMajor;
    }
    const tempCreatedOrders = temporaryOrders.map((order) => {
        return { uuid: order.uuid, orderRef: order.id.toString() };
    });
    // TODO: Add new index to account for the paid_status column
    yield (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction)
        .createQueryBuilder()
        .where("metadata->>'temporaryOrderUuid' IN (:...temporaryOrderUuids)", {
        temporaryOrderUuids,
    })
        .andWhere("paid_status = :paidStatus", {
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
    })
        .delete();
    const paystackPayingUser = {
        emailAddress: requestBody.buyer.emailAddress || undefined,
        fullName: requestBody.buyer.fullName
    };
    const { paymentReference, paymentProviderRedirectUrl, accessCode, redirectUrlAfterPayment } = yield PaystackService.initializeTransaction(paystackPayingUser, orderAmountMajor);
    if (!paymentReference) {
        throw new error_response_types_1.ServerError('An error occurred while processing your payment. Please try again');
    }
    const paystackTransactionSaved = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        for (const order of temporaryOrders) {
            const metadata = {
                temporaryOrderUuid: order.uuid,
            };
            const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeForTemporaryOrder(PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER, order.calculatedTotalCostMajor * 100, Currency_1.CountryCodeToCurrency.NG, PaymentTransaction_1.PaymentTransactionStatus.UNPAID, paymentReference, metadata);
            financialTransaction.description = `NGN${order.calculatedTotalCostMajor} order payment`;
            const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
            const savedTransaction = yield transactionRepoT.save(financialTransaction);
            const temporaryOrderRepoT = transactionalEntityManager.getRepository(TemporaryOrder_1.TemporaryOrder);
            if (order) {
                yield temporaryOrderRepoT.createQueryBuilder()
                    .update(TemporaryOrder_1.TemporaryOrder)
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
        temporaryOrders: tempCreatedOrders,
        temporaryOrderUuids,
        paymentProviderDetails: {
            paymentReference,
            paymentProviderRedirectUrl,
            accessCode,
            redirectUrlAfterPayment
        },
        paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
    };
});
exports.processTemporaryOrdersPayment = processTemporaryOrdersPayment;
const paidTemporaryOrderDetails = (temporaryOrderUuids, paymentReference) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    // full list of temporary order from the
    const financialRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
    const orderRepo = connection.getRepository(Order_1.Order);
    const financialTransactions = yield financialRepo.find({
        reference: paymentReference
    });
    console.log(financialTransactions);
    const tempOrderFinancial = [];
    // eslint-disable-next-line guard-for-in
    for (const uuid of temporaryOrderUuids) {
        const transaction = financialTransactions.find((item) => { var _a; return ((_a = item.metadata) === null || _a === void 0 ? void 0 : _a.temporaryOrderUuid) === uuid; });
        console.log('transaction', transaction);
        tempOrderFinancial.push(transaction === null || transaction === void 0 ? void 0 : transaction.uuid);
    }
    const realOrders = yield orderRepo.find({
        where: { paymentTransactionUuid: (0, typeorm_1.In)(tempOrderFinancial) }
    });
    console.log('real orders', realOrders);
    return realOrders;
});
exports.paidTemporaryOrderDetails = paidTemporaryOrderDetails;
//# sourceMappingURL=temporaryOrderService.js.map