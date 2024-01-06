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
exports.transformDedicatedAccount = exports.declineQuoteRequestByAdmin = exports.moveSellerProductsToAnOmaAccount = exports.markDeliveryRequestAsShipped = exports.prepareInvoiceItem = exports.submitDeliveryFeeForWareHouseToSiteDelivery = exports.changeCinderbuildMargin = exports.markPodOrderPaymentDefault = exports.adminCanEdit = exports.isValidAdmin = void 0;
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Category_1 = require("../entity/Category");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Order_1 = require("../entity/Order");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const Product_1 = require("../entity/Product");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const autditLogService = __importStar(require("./auditLogService"));
const NotificationService = __importStar(require("./notificationService"));
const AccountStatService = __importStar(require("./sellerAccountStatService"));
const WalletService = __importStar(require("./walletService"));
const isValidAdmin = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const adminUser = yield userRepo.findOne({ phoneNumber: currentUser.phoneNumber, isAdmin: true });
    if (!adminUser) {
        return false;
    }
    if (adminUser.isAdmin === false) {
        throw new error_response_types_1.UnauthorizedRequestError("Not allowed!");
    }
    if (adminUser.id !== currentUser.id) {
        throw new error_response_types_1.UnauthorizedRequestError("Not allowed!");
    }
    if (adminUser.adminCanView === false) {
        throw new error_response_types_1.UnauthorizedRequestError("Not allowed!");
    }
    return true;
});
exports.isValidAdmin = isValidAdmin;
const adminCanEdit = (req, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUser.adminCanEdit === false) {
        throw new error_response_types_1.UnauthorizedRequestError("Not allowed!");
    }
    yield autditLogService.saveAuditLogs(req, currentUser);
    return true;
});
exports.adminCanEdit = adminCanEdit;
const markPodOrderPaymentDefault = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connection = yield (0, db_1.getFreshConnection)();
    const orderAmountMinor = order.calculatedTotalCostMajor * 100;
    const buyerWallet = yield WalletService.getCustomerWallet(order.buyerUserId);
    const walletBalanceMinorBefore = buyerWallet.walletBalanceMinor;
    const walletBalanceMinorAfter = buyerWallet.walletBalanceMinor - orderAmountMinor;
    order.statusHistory.push({
        status: Statuses_1.default.PAYMENT_DEFAULT,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updateQuery = {
        status: Statuses_1.default.PAYMENT_DEFAULT,
        statusHistory: order.statusHistory,
        markedAsPaymentDefaultAt: Utils.utcNow(),
    };
    const walletBalanceDebitedStatus = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const financialRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        yield orderRepoT
            .createQueryBuilder()
            .update(Order_1.Order)
            .set(updateQuery)
            .where({
            id: order.id,
        })
            .execute();
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: walletBalanceMinorAfter,
        })
            .where({
            id: buyerWallet.id,
        })
            .execute();
        const metadata = {};
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(buyerWallet, PaymentTransaction_1.PaymentTransactionTypes.ORDER_PAYMENT_DEFAULT_DEBIT, orderAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, buyerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        const transactionDescription = [
            `${buyerWallet.currency}${orderAmountMinor / 100} debit for`,
            ` order: #${order.referenceNumber} payment default.`,
        ].join("");
        debitFinancialTransaction.description = transactionDescription;
        yield financialRepoT.save(debitFinancialTransaction);
        return true;
    }));
    if (walletBalanceDebitedStatus) {
        const notificationMetadata = {
            orderUuid: order.uuid,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.SMS]: true,
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        };
        const notificationTitle = "Order payment default";
        const notificationBody = `Your Order: #${order.referenceNumber} has been marked as payment in default. Thanks, CinderBuild`;
        const res = yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_a = order.buyerUser) === null || _a === void 0 ? void 0 : _a.uuid, NotificationMessageTypes_1.default.POD_ORDER_PAYMENT_DEFAULT, notificationTitle, notificationBody, notificationTransports, notificationMetadata);
    }
    return walletBalanceDebitedStatus;
});
exports.markPodOrderPaymentDefault = markPodOrderPaymentDefault;
const changeCinderbuildMargin = (categoryuuid, newMarginAmountMajor, currency) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const categoryRepo = connection.getRepository(Category_1.Category);
    const category = yield categoryRepo.findOne({ uuid: categoryuuid });
    if (!category) {
        throw new error_response_types_1.NotFoundError('Category Does Not Exist');
    }
    const updateQuery = {
        currency,
        amountMajor: newMarginAmountMajor
    };
    if (category.settings.cinderbuildProfiltMargin) {
        Object.assign(category.settings.cinderbuildProfiltMargin, updateQuery);
        yield categoryRepo
            .createQueryBuilder()
            .update(Category_1.Category)
            .set({ settings: category.settings })
            .where({
            uuid: category.uuid
        })
            .execute();
    }
    yield categoryRepo
        .createQueryBuilder()
        .update(Category_1.Category)
        .set({ settings: { cinderbuildProfiltMargin: updateQuery } })
        .where({
        uuid: category.uuid
    })
        .execute();
    return true;
});
exports.changeCinderbuildMargin = changeCinderbuildMargin;
const submitDeliveryFeeForWareHouseToSiteDelivery = (wareHouseToSiteRequest, deliveryFeeAmountMajor) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
    const userRepo = connection.getRepository(User_1.User);
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    if (wareHouseToSiteRequest.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET) {
        const deliveryFeeUpdateResult = yield wareHouseToSiteDeliveryRequestRepo
            .createQueryBuilder()
            .update(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest)
            .set({
            deliveryFeeAmountMajor
        })
            .where({
            uuid: wareHouseToSiteRequest.uuid
        })
            .execute();
        if (!deliveryFeeUpdateResult.affected) {
            throw new error_response_types_1.UnprocessableEntityError('An unrecoverable error occurred. Please try again.');
        }
        return true;
    }
    wareHouseToSiteRequest.deliveryFeeStatusHistory.push({
        status: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updateQuery = {
        deliveryFeeAmountMajor,
        deliveryFeeStatusHistory: wareHouseToSiteRequest.deliveryFeeStatusHistory,
        deliveryFeeStatus: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET
    };
    const deliveryFeeUpdateResult = yield wareHouseToSiteDeliveryRequestRepo
        .createQueryBuilder()
        .update(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest)
        .set(updateQuery)
        .where({
        uuid: wareHouseToSiteRequest.uuid
    })
        .execute();
    if (!deliveryFeeUpdateResult.affected) {
        throw new error_response_types_1.UnprocessableEntityError('An unrecoverable error occurred. Please try again.');
    }
    const warehouseToSiteDeliveryRequestCreatedBy = yield userRepo.findOne({ id: wareHouseToSiteRequest.userId });
    if (!warehouseToSiteDeliveryRequestCreatedBy) {
        return false;
    }
    const deliveryLocation = yield deliveryLocationRepo.findOne({
        where: {
            id: wareHouseToSiteRequest.deliveryLocationId
        }
    });
    const notificationMetadata = {
        wareHouseToSiteRequestUuid: wareHouseToSiteRequest.uuid,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    };
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
    };
    const notificationTitle = 'Warehouse to Site Delivery Fee Has Been Set';
    const notificationBody = [
        `"Hello ${warehouseToSiteDeliveryRequestCreatedBy.firstName},
    Your order to be shipped to ${deliveryLocation.name} will be delivered at ${deliveryFeeAmountMajor}.
    Please click to confirm or decline your shipment `,
        'CinderBuild Team.'
    ].join(' ');
    yield NotificationService.sendSingleNotificationToUserId(warehouseToSiteDeliveryRequestCreatedBy.id, warehouseToSiteDeliveryRequestCreatedBy.uuid, NotificationMessageTypes_1.default.WAREHOUSE_TO_SITE_DELIVERY_FEE_SET, notificationTitle, notificationBody, notificationTransports, notificationMetadata);
    return true;
});
exports.submitDeliveryFeeForWareHouseToSiteDelivery = submitDeliveryFeeForWareHouseToSiteDelivery;
const prepareInvoiceItem = (procurement, addItems) => __awaiter(void 0, void 0, void 0, function* () {
    const { invoiceItem } = addItems;
    const connection = yield (0, db_1.getFreshConnection)();
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
    const procurementInvoice = yield procurementInvoiceRepo.findOne({
        procurementId: procurement.id,
    });
    if (!procurementInvoice) {
        const calculatedTotalCostMajor = invoiceItem.quantity * invoiceItem.unitPriceForBuyer;
        const invoiceItems = [invoiceItem];
        const newUserInvoice = new ProcurementInvoice_1.ProcurementInvoice().initialize(procurement.accountId, procurement.id, invoiceItems, calculatedTotalCostMajor);
        const saveInvoice = yield procurementInvoiceRepo.save(newUserInvoice);
        const referenceNumber = Utils.getInvoiceEntityReferenceNumber(saveInvoice);
        yield procurementInvoiceRepo
            .createQueryBuilder()
            .update(ProcurementInvoice_1.ProcurementInvoice)
            .set({ referenceNumber })
            .where({
            id: saveInvoice.id
        })
            .execute();
        return true;
    }
    if (procurementInvoice.orderCreated) {
        throw new error_response_types_1.UnprocessableEntityError('An order has already been created from the procurement invoice');
    }
    const invoiceItemsWithoutTheNewOne = procurementInvoice.invoiceItem
        .filter(item => item.productId !== invoiceItem.productId);
    let totalInvoiceAmountMajor = 0;
    if (invoiceItemsWithoutTheNewOne) {
        invoiceItemsWithoutTheNewOne.push(invoiceItem);
        for (const item of invoiceItemsWithoutTheNewOne) {
            totalInvoiceAmountMajor += item.quantity * item.unitPriceForBuyer;
        }
        const updateQuery = {
            invoiceItem: invoiceItemsWithoutTheNewOne,
            calculatedTotalCostMajor: totalInvoiceAmountMajor
        };
        const updateInvoiceResult = yield procurementInvoiceRepo.createQueryBuilder()
            .update(ProcurementInvoice_1.ProcurementInvoice)
            .set(updateQuery)
            .where({
            id: procurementInvoice.id
        })
            .execute();
        if (!updateInvoiceResult.affected) {
            throw new error_response_types_1.UnprocessableEntityError('An unrecoverable error occurred. Please try again.');
        }
        return true;
    }
    return true;
});
exports.prepareInvoiceItem = prepareInvoiceItem;
const markDeliveryRequestAsShipped = (existingDeliveryRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
    const updatedStatusHistory = existingDeliveryRequest.deliveryFeeStatusHistory;
    updatedStatusHistory.push({
        status: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updatedQuery = {
        deliveryFeeStatusHistory: updatedStatusHistory,
        deliveryFeeStatus: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED,
    };
    yield wareHouseToSiteDeliveryRequestRepo.createQueryBuilder()
        .update(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest)
        .set(updatedQuery)
        .where({
        uuid: existingDeliveryRequest.uuid
    })
        .execute();
    return true;
});
exports.markDeliveryRequestAsShipped = markDeliveryRequestAsShipped;
const moveSellerProductsToAnOmaAccount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const productRepo = connection.getRepository(Product_1.Product);
    const userRepo = connection.getRepository(User_1.User);
    const sellerCategoryProduct = yield productRepo.find({
        where: { categoryId: payload.categoryId, userId: payload.sellerId }
    });
    if (!sellerCategoryProduct) {
        return false;
    }
    const productIds = sellerCategoryProduct.map(product => product.id);
    console.log(productIds);
    yield productRepo.createQueryBuilder()
        .update(Product_1.Product)
        .set({ userId: payload.omaSellerId, oldSellerId: payload.sellerId })
        .where({
        id: (0, typeorm_1.In)(productIds)
    })
        .execute();
    yield userRepo.createQueryBuilder()
        .update(User_1.User)
        .set({ isSeller: false })
        .where({
        id: payload.sellerId
    })
        .execute();
    return true;
});
exports.moveSellerProductsToAnOmaAccount = moveSellerProductsToAnOmaAccount;
const declineQuoteRequestByAdmin = (quoteRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const now = Utils.utcNow();
    const connection = yield (0, db_1.getFreshConnection)();
    const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    quoteRequest.statusHistory.push({
        status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_ADMIN,
        dateTimeInISO8601: now.toISOString()
    });
    yield quoteRequestRepo.createQueryBuilder()
        .update(QuoteRequest_1.QuoteRequest)
        .set({
        status: Statuses_1.QuoteRequestStatuses.DECLINED_BY_ADMIN,
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
    // notify buyer of seller decline
    const notificationMetadata = {
        quoteRequestUuid: quoteRequest.uuid,
    };
    const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has declined 
    your Quote request: #${quoteRequest.referenceNumber}.`;
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
    };
    NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, (_b = quoteRequest.user) === null || _b === void 0 ? void 0 : _b.uuid, NotificationMessageTypes_1.default.QUOTE_REQUEST_SELLER_DECLINE, 'Seller has declined your Quote Request', notificatiionMessage, notificationTransports, notificationMetadata);
    return true;
});
exports.declineQuoteRequestByAdmin = declineQuoteRequestByAdmin;
const transformDedicatedAccount = (virtualAccounts) => __awaiter(void 0, void 0, void 0, function* () {
    const virtualDedicatedAccountResponse = [];
    for (const account of virtualAccounts) {
        const oneTransformAccount = {
            userId: account.userId,
            bankId: account.bankId,
            bankName: account.bankName,
            bankAccountName: account.bankAccountName,
            bankAccountNumber: account.bankAccountNumber
        };
        virtualDedicatedAccountResponse.push(oneTransformAccount);
    }
    return virtualDedicatedAccountResponse;
});
exports.transformDedicatedAccount = transformDedicatedAccount;
//# sourceMappingURL=adminService.js.map