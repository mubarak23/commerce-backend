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
exports.doesPriceMatrixExistForOrder = exports.processDeclinePriceMatrixByAdmin = exports.processDeclinePriceMatrix = exports.processPriceMatrixOrderDeliveryConfirmation = exports.processPriceMatrixOrderDelivery = exports.updatePriceMatrixWithOrderDetails = exports.updatePriceMatrixWithApproval = exports.processApprovalPriceMatrix = exports.PriceMatrixByOrderRef = exports.transformPriceMatrixDetails = exports.updatePriceMatrixDetailsAfterDecline = exports.updatePriceMatrixWithNewQuantity = exports.updatePriceMatrixDetails = exports.submitPriceMatrix = exports.createPriceMatrix = void 0;
const db_1 = require("../db");
const Business_1 = require("../entity/Business");
const Order_1 = require("../entity/Order");
const PaystackDedicatedNuban_1 = require("../entity/PaystackDedicatedNuban");
const PriceMatrix_1 = require("../entity/PriceMatrix");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const User_1 = require("../entity/User");
const Statuses_1 = require("../enums/Statuses");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const EmailService = __importStar(require("./emailService"));
const EscrowService = __importStar(require("./escrowService"));
const OrderService = __importStar(require("./orderService"));
const PayStackService = __importStar(require("./paystackService"));
const PaystackService = __importStar(require("./paystackService"));
const ProfileService = __importStar(require("./profileService"));
const QuoteRequestService = __importStar(require("./quoteRequestService"));
const WalletService = __importStar(require("./walletService"));
const createPriceMatrix = (buyerUser, qouteRequest, product) => __awaiter(void 0, void 0, void 0, function* () {
    const newPriceMatrix = new PriceMatrix_1.PriceMatrix().initialize(buyerUser, qouteRequest, product, qouteRequest.quantity);
    const connection = yield (0, db_1.getFreshConnection)();
    const qouteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    yield priceMatrixRepo.save(newPriceMatrix);
    const qouteRequestDetails = yield qouteRequestRepo.findOne({
        where: { id: qouteRequest.id }
    });
    const now = Utils.utcNow();
    newPriceMatrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.CREATED,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.CREATED,
        statusHistory: newPriceMatrix.statusHistory,
        deliveryAddress: qouteRequestDetails.deliverAddress
    })
        .where({ id: newPriceMatrix.id })
        .execute();
    return true;
});
exports.createPriceMatrix = createPriceMatrix;
const submitPriceMatrix = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const sellerRepo = connection.getRepository(User_1.User);
    const businessRepo = connection.getRepository(Business_1.Business);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    const priceMatrix = yield priceMatrixRepo.findOne({
        where: { qouteRequestRef: payload.qouteRequestRef },
        join
    });
    if (!priceMatrix) {
        throw new error_response_types_1.NotFoundError('The Specified Qoute Request Price Matrix Could Not Be Found');
    }
    const sellerDetails = yield sellerRepo.findOne({
        where: { id: payload.sellerUserId, isSeller: true }
    });
    if (!sellerDetails) {
        throw new error_response_types_1.UnprocessableEntityError("Seller Does Not Exist");
    }
    const sellerBusiness = yield businessRepo.findOne({
        where: { userId: sellerDetails.id }
    });
    if (!sellerBusiness) {
        throw new error_response_types_1.UnprocessableEntityError("Seller Must Update Business Information Before They Can Accept Order.");
    }
    if (priceMatrix.status === Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED) {
        const updatePriceMatrix = yield (0, exports.updatePriceMatrixDetails)(payload, priceMatrix);
        return updatePriceMatrix;
    }
    if (priceMatrix.status === Statuses_1.PriceMatriceStatuses.APPROVED) {
        if ((priceMatrix === null || priceMatrix === void 0 ? void 0 : priceMatrix.quantity) !== payload.quantity) {
            yield (0, exports.updatePriceMatrixWithNewQuantity)(payload, priceMatrix);
            return priceMatrix;
        }
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Has Been Approved');
    }
    if (priceMatrix.status === Statuses_1.PriceMatriceStatuses.DECLINED) {
        const updatePriceMatrix = yield (0, exports.updatePriceMatrixDetailsAfterDecline)(payload, priceMatrix);
        const virtualDedicatedAccount = yield PaystackService.createDedicatedNuban(updatePriceMatrix.sellerUser);
        const buyerWallet = yield WalletService.getCustomerWallet(updatePriceMatrix.buyerUserId);
        yield EmailService.sendPriceMatrixForApproval(updatePriceMatrix, virtualDedicatedAccount, buyerWallet);
        return updatePriceMatrix;
    }
    const errorMessages = {
        [Statuses_1.PriceMatriceStatuses.DELIVERED]: 'Cannot Submit Price After Order Delivery',
        [Statuses_1.PriceMatriceStatuses.CONFIRMED_DELIVERY]: 'Cannot Submit Price After Order Delivery Confirmation',
        [Statuses_1.PriceMatriceStatuses.SELLER_PAID]: 'Price Matrix For Seller Completed'
    };
    // eslint-disable-next-line no-prototype-builtins
    if (errorMessages.hasOwnProperty(priceMatrix.status)) {
        throw new error_response_types_1.UnprocessableEntityError(errorMessages[priceMatrix.status]);
    }
    const now = Utils.utcNow();
    priceMatrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED,
        dateTimeInISO8601: now.toISOString()
    });
    if (payload.productSellingPriceMajor < payload.productCostPriceMajor) {
        throw new error_response_types_1.UnprocessableEntityError("Selling Price Cannot be less than Cost Price");
    }
    if (payload.quantity !== priceMatrix.quantity) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Change Buyer Qoute Request Product Quantity');
    }
    const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor;
    const totalProductSellingPriceMajor = payload.productSellingPriceMajor * priceMatrix.quantity;
    const totlaMarginMajor = productMajorMargin * priceMatrix.quantity;
    const totalProductCostPriceMajor = payload.productCostPriceMajor * priceMatrix.quantity;
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        sellerUserId: payload.sellerUserId,
        productSellingPriceMajor: payload.productSellingPriceMajor,
        productCostPriceMajor: payload.productCostPriceMajor,
        deliveryDate: payload.deliveryDate,
        transactionType: payload.transactionType,
        productMarginMajor: productMajorMargin,
        totalProductSellingPriceMajor,
        totalProductCostPriceMajor,
        totlaMarginMajor,
        deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
        status: Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED,
        statusHistory: priceMatrix.statusHistory,
    })
        .where({ qouteRequestRef: payload.qouteRequestRef })
        .execute();
    const updatedPriceMatrix = yield priceMatrixRepo.findOne({
        where: { qouteRequestRef: payload.qouteRequestRef },
        join
    });
    const virtualDedicatedAccount = yield PaystackService.createDedicatedNuban(updatedPriceMatrix.sellerUser);
    const buyerWallet = yield WalletService.getCustomerWallet(updatedPriceMatrix.buyerUserId);
    yield EmailService.sendPriceMatrixForApproval(updatedPriceMatrix, virtualDedicatedAccount, buyerWallet);
    return updatedPriceMatrix;
});
exports.submitPriceMatrix = submitPriceMatrix;
const updatePriceMatrixDetails = (payload, priceMatrix) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    if (payload.productSellingPriceMajor < payload.productCostPriceMajor) {
        throw new error_response_types_1.UnprocessableEntityError("Selling Price Cannot Be Less Than Cost Price");
    }
    if (payload.quantity !== priceMatrix.quantity) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Change Buyer Quote Request Product Quantity');
    }
    const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor;
    const totalProductSellingPriceMajor = payload.productSellingPriceMajor * priceMatrix.quantity;
    const totlaMarginMajor = productMajorMargin * priceMatrix.quantity;
    const totalProductCostPriceMajor = payload.productCostPriceMajor * priceMatrix.quantity;
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        sellerUserId: payload.sellerUserId,
        productSellingPriceMajor: payload.productSellingPriceMajor,
        productCostPriceMajor: payload.productCostPriceMajor,
        deliveryDate: payload.deliveryDate,
        transactionType: payload.transactionType,
        productMarginMajor: productMajorMargin,
        totalProductSellingPriceMajor,
        totalProductCostPriceMajor,
        totlaMarginMajor,
        deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
        status: Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED,
    })
        .where({ qouteRequestRef: payload.qouteRequestRef })
        .execute();
    const updatedPriceMatrix = yield priceMatrixRepo.findOne({
        where: { qouteRequestRef: payload.qouteRequestRef },
        join
    });
    if (priceMatrix.productSellingPriceMajor !== payload.productSellingPriceMajor) {
        const virtualDedicatedAccount = yield PaystackService.createDedicatedNuban(updatedPriceMatrix.sellerUser);
        const buyerWallet = yield WalletService.getCustomerWallet(updatedPriceMatrix.buyerUserId);
        yield EmailService.sendPriceMatrixForApproval(updatedPriceMatrix, virtualDedicatedAccount, buyerWallet);
    }
    return updatedPriceMatrix;
});
exports.updatePriceMatrixDetails = updatePriceMatrixDetails;
const updatePriceMatrixWithNewQuantity = (payload, priceMatrix) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const qouteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const quoteRequestDetails = yield qouteRequestRepo.findOne({
        where: { referenceNumber: priceMatrix.qouteRequestRef }
    });
    if (!quoteRequestDetails) {
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Quote Request Not Found');
    }
    if (quoteRequestDetails.status === Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
        throw new error_response_types_1.UnprocessableEntityError('Order Created, Cannot change Quantity');
    }
    if (payload.quantity) {
        const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor;
        const totalProductSellingPriceMajor = payload.productSellingPriceMajor * payload.quantity;
        const totlaMarginMajor = productMajorMargin * payload.quantity;
        const totalProductCostPriceMajor = payload.productCostPriceMajor * payload.quantity;
        yield qouteRequestRepo.createQueryBuilder()
            .update(QuoteRequest_1.QuoteRequest)
            .set({
            quantity: payload.quantity,
        })
            .where({ referenceNumber: priceMatrix.qouteRequestRef })
            .execute();
        yield priceMatrixRepo.createQueryBuilder()
            .update(PriceMatrix_1.PriceMatrix)
            .set({
            quantity: payload.quantity,
            totalProductSellingPriceMajor,
            totalProductCostPriceMajor,
            totlaMarginMajor,
            deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
        })
            .where({ id: priceMatrix.id })
            .execute();
    }
    if (payload.sellerUserId) {
        yield priceMatrixRepo.createQueryBuilder()
            .update(PriceMatrix_1.PriceMatrix)
            .set({
            sellerUserId: payload.sellerUserId
        })
            .where({ qouteRequestRef: priceMatrix.qouteRequestRef })
            .execute();
    }
    return true;
});
exports.updatePriceMatrixWithNewQuantity = updatePriceMatrixWithNewQuantity;
const updatePriceMatrixDetailsAfterDecline = (payload, priceMatrix) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const qouteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const quoteRequestDetails = yield qouteRequestRepo.findOne({
        where: { referenceNumber: priceMatrix.qouteRequestRef }
    });
    if (!quoteRequestDetails) {
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Quote Request Not Found');
    }
    if (quoteRequestDetails.status === Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
        throw new error_response_types_1.UnprocessableEntityError('Order Created');
    }
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    if (payload.productSellingPriceMajor < payload.productCostPriceMajor) {
        throw new error_response_types_1.UnprocessableEntityError("Selling Price Cannot be less than Cost Price");
    }
    const now = Utils.utcNow();
    priceMatrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED,
        dateTimeInISO8601: now.toISOString()
    });
    const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor;
    const totalProductSellingPriceMajor = payload.productSellingPriceMajor * payload.quantity;
    const totlaMarginMajor = productMajorMargin * payload.quantity;
    const totalProductCostPriceMajor = payload.productCostPriceMajor * payload.quantity;
    yield qouteRequestRepo.createQueryBuilder()
        .update(QuoteRequest_1.QuoteRequest)
        .set({
        quantity: payload.quantity,
    })
        .where({ referenceNumber: priceMatrix.qouteRequestRef })
        .execute();
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        sellerUserId: payload.sellerUserId,
        quantity: payload.quantity,
        productSellingPriceMajor: payload.productSellingPriceMajor,
        productCostPriceMajor: payload.productCostPriceMajor,
        deliveryDate: payload.deliveryDate,
        transactionType: payload.transactionType,
        productMarginMajor: productMajorMargin,
        totalProductSellingPriceMajor,
        totalProductCostPriceMajor,
        totlaMarginMajor,
        deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
        status: Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED,
        statusHistory: priceMatrix.statusHistory,
    })
        .where({ qouteRequestRef: payload.qouteRequestRef })
        .execute();
    const updatedPriceMatrix = yield priceMatrixRepo.findOne({
        where: { qouteRequestRef: payload.qouteRequestRef },
        join
    });
    return updatedPriceMatrix;
});
exports.updatePriceMatrixDetailsAfterDecline = updatePriceMatrixDetailsAfterDecline;
const transformPriceMatrixDetails = (pricematrix) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const buyerUserPublicProfile = yield ProfileService.getSelfProfile(pricematrix.buyerUser);
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
        buyerUserPublicProfile: buyerUserPublicProfile,
        sellerUserPublicProfile: null,
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
exports.transformPriceMatrixDetails = transformPriceMatrixDetails;
const PriceMatrixByOrderRef = (ref) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            order: "price_matrices.order"
        },
    };
    const priceMatrixDetails = yield priceMatrixRepo.findOne({
        where: { orderRef: ref },
        join
    });
    if (!priceMatrixDetails) {
        return false;
    }
    return priceMatrixDetails;
});
exports.PriceMatrixByOrderRef = PriceMatrixByOrderRef;
const processApprovalPriceMatrix = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const userRepo = connection.getRepository(User_1.User);
    const virtualDedicatedAccountsRepo = connection.getRepository(PaystackDedicatedNuban_1.PaystackDedicatedNuban);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
        },
    };
    const priceMatrixDetails = yield priceMatrixRepo.findOne({
        where: { id },
        join
    });
    if (!priceMatrixDetails) {
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Not Found');
    }
    if (priceMatrixDetails.status !== Statuses_1.PriceMatriceStatuses.PRICE_SUBMITTED) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Approve Price Matrix without a price');
    }
    const quoteJoin = {
        alias: "quoteRequest",
        leftJoinAndSelect: {
            user: "quoteRequest.user",
            sellerUser: "quoteRequest.sellerUser",
            product: "quoteRequest.product"
        },
    };
    const qouteRequestDetail = yield quoteRequestRepo.findOne({
        where: { id: priceMatrixDetails.qouteRequestId },
        join: quoteJoin
    });
    if (!qouteRequestDetail) {
        throw new error_response_types_1.UnprocessableEntityError('Quote Request Not Found');
    }
    // collect data for response.
    const buyerUser = yield userRepo.findOne({
        where: { id: qouteRequestDetail.userId }
    });
    if (!buyerUser) {
        throw new error_response_types_1.UnprocessableEntityError('Buyer on the Quote Request Does Not Exist');
    }
    const quoteRequestPayload = {
        unitPrice: priceMatrixDetails.productSellingPriceMajor,
        deliveryFee: priceMatrixDetails.deliveryFee ? priceMatrixDetails.deliveryFee : null
    };
    yield QuoteRequestService.respondToQuoteRequest(buyerUser, qouteRequestDetail, quoteRequestPayload);
    // 
    yield (0, exports.updatePriceMatrixWithApproval)(priceMatrixDetails);
    const virtualAccount = yield virtualDedicatedAccountsRepo.findOne({
        userId: priceMatrixDetails.sellerUserId
    });
    const buyerWallet = yield WalletService.getCustomerWallet(priceMatrixDetails.buyerUserId);
    // send mail to support 
    yield EmailService.sendApprovePriceMatrix(priceMatrixDetails, virtualAccount, buyerWallet);
    return true;
});
exports.processApprovalPriceMatrix = processApprovalPriceMatrix;
const updatePriceMatrixWithApproval = (priceMatrixDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const now = Utils.utcNow();
    priceMatrixDetails.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.APPROVED,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.APPROVED,
        statusHistory: priceMatrixDetails.statusHistory,
    })
        .where({ id: priceMatrixDetails.id })
        .execute();
    return true;
});
exports.updatePriceMatrixWithApproval = updatePriceMatrixWithApproval;
const updatePriceMatrixWithOrderDetails = (orderId, orderRef, quoteRequestRef) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const orderRepo = connection.getRepository(Order_1.Order);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
        },
    };
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { qouteRequestRef: quoteRequestRef },
        join,
    });
    if (!pricematrix) {
        return false;
    }
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        orderId,
        orderRef,
    })
        .where({ id: pricematrix.id })
        .execute();
    yield orderRepo.createQueryBuilder()
        .update(Order_1.Order)
        .set({
        priceMatrixId: pricematrix.id,
    })
        .where({ id: orderId })
        .execute();
    return true;
});
exports.updatePriceMatrixWithOrderDetails = updatePriceMatrixWithOrderDetails;
const processPriceMatrixOrderDelivery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { id },
        join,
    });
    if (!pricematrix) {
        throw new error_response_types_1.UnprocessableEntityError('Price matrix Does Not Exist');
    }
    if (pricematrix.orderId === null) {
        throw new error_response_types_1.UnprocessableEntityError('Price matrix Order has not been Placed');
    }
    if (pricematrix.orderRef === null) {
        throw new error_response_types_1.UnprocessableEntityError('Price matrix Order has not been Placed');
    }
    if (pricematrix.quoteRequest.status !== Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
        throw new error_response_types_1.UnprocessableEntityError('No Order Placed');
    }
    const disallowedStatusesForDecline = [
        Statuses_1.PriceMatriceStatuses.DECLINED,
        Statuses_1.PriceMatriceStatuses.DELIVERED,
        Statuses_1.PriceMatriceStatuses.CONFIRMED_DELIVERY,
        Statuses_1.PriceMatriceStatuses.SELLER_PAID
    ];
    if (disallowedStatusesForDecline.includes(pricematrix.status)) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Marke Price Matrix as Delivered in its current status');
    }
    // update the status as delivered
    const now = Utils.utcNow();
    pricematrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.DELIVERED,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.DELIVERED,
        statusHistory: pricematrix.statusHistory,
    })
        .where({ id: pricematrix.id })
        .execute();
    const sellerVirtualAccount = yield PayStackService.createDedicatedNuban(pricematrix.sellerUser);
    // dispatch mail here 
    const deliveryMailData = {
        sellerId: pricematrix.id,
        priceMatrixId: pricematrix.id,
        amount: pricematrix.productCostPriceMajor * pricematrix.quantity,
        quoteRequestRef: pricematrix.qouteRequestRef,
        orderRef: pricematrix.orderRef,
        accountName: sellerVirtualAccount.bankAccountName,
        accountNumber: sellerVirtualAccount.bankAccountNumber,
        bankName: sellerVirtualAccount.bankName,
    };
    yield EmailService.sendPriceMatricForDeliveryConfirmation(deliveryMailData);
    return true;
});
exports.processPriceMatrixOrderDelivery = processPriceMatrixOrderDelivery;
const processPriceMatrixOrderDeliveryConfirmation = (priceMatricesId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            order: "price_matrices.order",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { id: priceMatricesId },
        join,
    });
    if (!pricematrix) {
        return false;
    }
    if (pricematrix.quoteRequest.status !== Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
        throw new error_response_types_1.UnprocessableEntityError('No Order Placed');
    }
    if (pricematrix.order.priceMatrixId === priceMatricesId && pricematrix.order.sellerHasChange === true) {
        return true;
    }
    if (pricematrix.status === Statuses_1.PriceMatriceStatuses.DECLINED) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Confirm Delivery For a Price Matrix That Has Been Declined');
    }
    if (pricematrix.status !== Statuses_1.PriceMatriceStatuses.DELIVERED) {
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Order Not Delivered');
    }
    // update the status as delivered
    const now = Utils.utcNow();
    pricematrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.CONFIRMED_DELIVERY,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.CONFIRMED_DELIVERY,
        statusHistory: pricematrix.statusHistory,
    })
        .where({ id: pricematrix.id })
        .execute();
    const sellerWallet = yield WalletService.getCustomerWallet(pricematrix.sellerUserId);
    yield EscrowService.moveFundsFromEscrowToSellerForOrder(pricematrix.order, pricematrix.sellerUser, sellerWallet, pricematrix);
    // update order with pricematricId and sellerHasBeenPaid
    yield OrderService.updateOrderWithPriceMatrixDetails(pricematrix);
    pricematrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.SELLER_PAID,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.SELLER_PAID,
        statusHistory: pricematrix.statusHistory,
    })
        .where({ id: pricematrix.id })
        .execute();
    return true;
});
exports.processPriceMatrixOrderDeliveryConfirmation = processPriceMatrixOrderDeliveryConfirmation;
const processDeclinePriceMatrix = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { id },
        join,
    });
    if (!pricematrix) {
        throw new error_response_types_1.UnprocessableEntityError('Price matrix Does Not Exist');
    }
    const disallowedStatusesForDecline = [
        Statuses_1.PriceMatriceStatuses.DECLINED,
        Statuses_1.PriceMatriceStatuses.APPROVED,
        Statuses_1.PriceMatriceStatuses.DELIVERED,
        Statuses_1.PriceMatriceStatuses.CONFIRMED_DELIVERY,
        Statuses_1.PriceMatriceStatuses.SELLER_PAID
    ];
    if (disallowedStatusesForDecline.includes(pricematrix.status)) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Decline a Price Matrix in its current status');
    }
    // update the status as decline
    const now = Utils.utcNow();
    pricematrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.DECLINED,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        productSellingPriceMajor: 0,
        productCostPriceMajor: 0,
        productMarginMajor: 0,
        totalProductSellingPriceMajor: 0,
        totalProductCostPriceMajor: 0,
        totlaMarginMajor: 0,
        status: Statuses_1.PriceMatriceStatuses.DECLINED,
        statusHistory: pricematrix.statusHistory,
    })
        .where({ id: pricematrix.id })
        .execute();
    const declineMailData = {
        buyerFirstName: pricematrix.buyerUser.firstName,
        buyerLastName: pricematrix.buyerUser.lastName,
        quoteRequestRef: pricematrix.qouteRequestRef,
        quantity: pricematrix.quantity,
        priceMatrixId: pricematrix.id,
        productSellingPriceMajor: pricematrix.productSellingPriceMajor,
        productCostPriceMajor: pricematrix.productCostPriceMajor,
        productMarginMajor: pricematrix.productMarginMajor,
    };
    yield EmailService.sendDeclinedPriceMatrix(declineMailData);
    return true;
});
exports.processDeclinePriceMatrix = processDeclinePriceMatrix;
const processDeclinePriceMatrixByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const qouteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            order: "price_matrices.order",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { id },
        join,
    });
    if (!pricematrix) {
        throw new error_response_types_1.UnprocessableEntityError('Price Matrix Not Found');
    }
    if (pricematrix.status === Statuses_1.PriceMatriceStatuses.DECLINED_BY_ADMIN) {
        throw new error_response_types_1.UnprocessableEntityError("Price Matrix Has Been Declined By Admin");
    }
    const qouteRequestDetails = yield qouteRequestRepo.findOne({
        where: { id: pricematrix.qouteRequestId }
    });
    if (!qouteRequestDetails) {
        throw new error_response_types_1.UnprocessableEntityError('Quote Request for the Price Matrix Does Not Exist');
    }
    if (qouteRequestDetails.status === Statuses_1.QuoteRequestStatuses.ORDER_CREATED) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Decline Price Matrix, Order Has Been Placed');
    }
    // update the status as decline by Admin 
    const now = Utils.utcNow();
    pricematrix.statusHistory.push({
        status: Statuses_1.PriceMatriceStatuses.DECLINED_BY_ADMIN,
        dateTimeInISO8601: now.toISOString()
    });
    yield priceMatrixRepo.createQueryBuilder()
        .update(PriceMatrix_1.PriceMatrix)
        .set({
        status: Statuses_1.PriceMatriceStatuses.DECLINED_BY_ADMIN,
        statusHistory: pricematrix.statusHistory,
    })
        .where({ id: pricematrix.id })
        .execute();
    qouteRequestDetails.statusHistory.push({
        status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_ADMIN,
        dateTimeInISO8601: now.toISOString()
    });
    yield qouteRequestRepo.createQueryBuilder()
        .update(QuoteRequest_1.QuoteRequest)
        .set({
        status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_ADMIN,
        statusHistory: qouteRequestDetails.statusHistory
    })
        .where({ id: qouteRequestDetails.id })
        .execute();
    return true;
});
exports.processDeclinePriceMatrixByAdmin = processDeclinePriceMatrixByAdmin;
const doesPriceMatrixExistForOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const priceMatrixRepo = connection.getRepository(PriceMatrix_1.PriceMatrix);
    const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
            product: "price_matrices.product",
            buyerUser: "price_matrices.buyerUser",
            sellerUser: "price_matrices.sellerUser",
            order: "price_matrices.order",
            quoteRequest: "price_matrices.quoteRequest"
        },
    };
    const pricematrix = yield priceMatrixRepo.findOne({
        where: { orderRef: order.referenceNumber },
        join,
    });
    if (pricematrix) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot update order, Price Matric in Progress');
    }
    return true;
});
exports.doesPriceMatrixExistForOrder = doesPriceMatrixExistForOrder;
//# sourceMappingURL=priceMatrixService.js.map