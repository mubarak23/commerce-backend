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
exports.createQouteRequestByAdmin = exports.respondToQuoteRequest = exports.createQuoteRequest = void 0;
const db_1 = require("../db");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const typeorm_1 = require("typeorm");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const Product_1 = require("../entity/Product");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const User_1 = require("../entity/User");
const Currency_1 = require("../enums/Currency");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const Statuses_1 = require("../enums/Statuses");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const EmailService = __importStar(require("./emailService"));
const NotificationService = __importStar(require("./notificationService"));
const PriceMatrixService = __importStar(require("./priceMatrixService"));
const ProfileService = __importStar(require("./profileService"));
const PromotionService = __importStar(require("./promotionService"));
const AccountStatService = __importStar(require("./sellerAccountStatService"));
const createQuoteRequest = (payload, currentUser, product, deliverAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const quoteRequestCreated = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const quoteRequestRepoT = transactionalEntityManager.getRepository(QuoteRequest_1.QuoteRequest);
        let quoteRequest = new QuoteRequest_1.QuoteRequest().initialize(currentUser, payload, product);
        quoteRequest = yield quoteRequestRepoT.save(quoteRequest);
        const referenceNumber = Utils.getOrderEntityReferenceNumber(quoteRequest);
        yield quoteRequestRepoT.createQueryBuilder()
            .update(QuoteRequest_1.QuoteRequest)
            .set({
            referenceNumber,
            deliverAddress
        })
            .where({
            id: quoteRequest.id
        })
            .execute();
        const sellerAccountStats = yield AccountStatService.getSellerAccountStats(quoteRequest.sellerUserId);
        const accountStatRepoT = transactionalEntityManager.getRepository(SellerAccountStat_1.SellerAccountStat);
        yield accountStatRepoT.createQueryBuilder()
            .update(SellerAccountStat_1.SellerAccountStat)
            .set({
            totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount + 1,
        })
            .where({ id: sellerAccountStats.id })
            .execute();
        quoteRequest.referenceNumber = referenceNumber;
        return quoteRequest;
    }));
    // intiate price matrix process
    yield PriceMatrixService.createPriceMatrix(currentUser, quoteRequestCreated, product);
    // TODO
    // Notify seller and Admin of new quote request
    const sellerDetails = yield User_1.User.findOne({ uuid: quoteRequestCreated.sellerUserUuid });
    yield EmailService.sendQouteRequestDetailsMail(currentUser, quoteRequestCreated, sellerDetails, product);
    const notificationMetadata = {
        quoteRequestUuid: quoteRequestCreated.uuid
    };
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        [NotificationTransport_1.NotificationTransportMode.SMS]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
    };
    yield NotificationService.sendSingleNotificationToUserId(quoteRequestCreated.sellerUserId, quoteRequestCreated === null || quoteRequestCreated === void 0 ? void 0 : quoteRequestCreated.sellerUserUuid, NotificationMessageTypes_1.default.QOUTE_REQUEST_RAISED, 'Quote Request Raised', ` You Have a Quote Request with ref #${quoteRequestCreated.referenceNumber}. CinderBuild Team.`, notificationTransports, notificationMetadata);
    return quoteRequestCreated;
});
exports.createQuoteRequest = createQuoteRequest;
const respondToQuoteRequest = (currentUser, quoteRequest, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
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
    // notify buyer of seller response
    // via mail
    const productDetail = yield productRepo.findOne({ id: quoteRequest.productId });
    const sellerResponse = {
        unitPrice: reqBody.unitPrice,
        unitPriceForBuyer,
        deliveryFee: (reqBody.deliveryFee || 0),
    };
    quoteRequest.calculatedTotalCostMajor = calculatedTotalCostMajor;
    const sendQouteRequestResponseAdmin = yield EmailService.sellerQouteRequestResponseMail(currentUser, quoteRequest, quoteRequest.user, productDetail, sellerResponse);
    const notificationMetadata = {
        quoteRequestUuid: quoteRequest.uuid,
    };
    const CurrencyEnum = Currency_1.CountryCodeToCurrency;
    const currency = CurrencyEnum[currentUser.countryIso2] || "NGN";
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
    return true;
});
exports.respondToQuoteRequest = respondToQuoteRequest;
const createQouteRequestByAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyerUserId, sellerUserId, productId, quantity, productSellingPriceMajor, productCostPriceMajor, transactionType, deliveryDate, orderReceiveType, deliveryAddress, deliveryFee } = payload;
    const buyerUser = yield ProfileService.getUserBuyerFullDetails(buyerUserId);
    const sellerUser = yield ProfileService.getUserSellerFullDetails(sellerUserId);
    const connection = yield (0, db_1.getFreshConnection)();
    const productRepo = connection.getRepository(Product_1.Product);
    const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    const join = {
        alias: "product",
        leftJoinAndSelect: {
            user: "product.user",
        },
    };
    const productDetail = yield productRepo.findOne({
        where: { id: productId },
        join
    });
    if (!productDetail) {
        throw new error_response_types_1.UnprocessableEntityError("Product Does Not Exist");
    }
    if (productDetail.price !== 0) {
        throw new error_response_types_1.UnprocessableEntityError("Product is not available for Quote Request");
    }
    const payloadForcreateQuoteRequest = {
        productUuid: productDetail.uuid,
        quantity,
        orderReceiveType
    };
    if (productCostPriceMajor > productSellingPriceMajor) {
        throw new error_response_types_1.UnprocessableEntityError("Product Cost Price Can Not be More Than Selling Price");
    }
    // add new location for the user
    const buyerDeliveryLocation = yield deliveryLocationRepo.find({
        where: { userId: buyerUser.id }
    });
    let newDeliveryLocation;
    if (buyerDeliveryLocation.length !== 0) {
        const deliveryAddressBuyerFirst = buyerDeliveryLocation[0];
        const deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(buyerUser.id, deliveryAddress, deliveryAddressBuyerFirst.state, 'Nigeria', deliveryAddressBuyerFirst.contactFullName, deliveryAddressBuyerFirst.contactPhoneNumber);
        newDeliveryLocation = yield deliveryLocationRepo.save(deliveryLocation);
    }
    else {
        const contactFullName = `${buyerUser.firstName} ${buyerUser.lastName}`;
        const deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(buyerUser.id, deliveryAddress, 'Lagos', 'Nigeria', contactFullName, buyerUser.msisdn);
        newDeliveryLocation = yield deliveryLocationRepo.save(deliveryLocation);
    }
    // create quote and price matrix
    payloadForcreateQuoteRequest.deliverAddressUuid = newDeliveryLocation.uuid;
    const quoteRequestCreated = yield (0, exports.createQuoteRequest)(payloadForcreateQuoteRequest, buyerUser, productDetail, deliveryAddress);
    // update deiverylocation uuid
    const quoteRequestWithRef = yield quoteRequestRepo.findOne({
        where: { id: quoteRequestCreated.id }
    });
    // submit price matrix for approval
    const submitPriceMatrixPayload = {
        sellerUserId: sellerUser.id,
        productSellingPriceMajor,
        productCostPriceMajor,
        deliveryDate,
        transactionType,
        qouteRequestRef: parseInt(quoteRequestWithRef.referenceNumber),
        deliveryFee,
        quantity
    };
    // submit price for approval
    yield PriceMatrixService.submitPriceMatrix(submitPriceMatrixPayload);
    return true;
});
exports.createQouteRequestByAdmin = createQouteRequestByAdmin;
//# sourceMappingURL=quoteRequestService.js.map