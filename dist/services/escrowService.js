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
exports.refundBuyerForOrder = exports.moveFundsFromEscrowToSellerViaPriceMatrix = exports.moveFundsFromEscrowToSellerForOrder = exports.afterOrderPaymentWithWallet = exports.afterConfirmedOrderPayment = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Order_1 = require("../entity/Order");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const Utils = __importStar(require("../utils/core"));
const NotificationService = __importStar(require("./notificationService"));
const db_1 = require("../db");
const EarningsByMonth_1 = require("../entity/EarningsByMonth");
const EarningsByYear_1 = require("../entity/EarningsByYear");
const SellerAccountStat_1 = require("../entity/SellerAccountStat");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const NotificationTransport_1 = require("../enums/NotificationTransport");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const logger_1 = __importDefault(require("../logger"));
const EmailService = __importStar(require("../services/emailService"));
const OrderService = __importStar(require("../services/orderService"));
const AccountStatService = __importStar(require("../services/sellerAccountStatService"));
const WalletService = __importStar(require("../services/walletService"));
const afterConfirmedOrderPayment = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    logger_1.default.info('Inside afterConfirmedOrderPayment ...');
    const now = Utils.utcNow();
    const orderRepoT = (0, typeorm_1.getRepository)(Order_1.Order);
    const buyerRepo = (0, typeorm_1.getRepository)(User_1.User);
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const financialRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
    order.statusHistory.push({
        status: Statuses_1.default.IN_PROGRESS,
        dateTimeInISO8601: now.toISOString()
    });
    order.paymentStatusHistory.push({
        status: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
        dateTimeInISO8601: now.toISOString()
    });
    const orderUpdateQuery = {};
    orderUpdateQuery.status = Statuses_1.default.IN_PROGRESS;
    orderUpdateQuery.statusHistory = order.statusHistory || [];
    orderUpdateQuery.paymentStatus = Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW;
    orderUpdateQuery.paymentStatusHistory = order.paymentStatusHistory || [];
    yield orderRepoT.createQueryBuilder()
        .update(Order_1.Order)
        .set(orderUpdateQuery)
        .where({ id: order.id })
        .execute();
    const sellerAccountStats = yield AccountStatService.getSellerAccountStats(order.sellerUserId);
    const accountStatRepo = (0, typeorm_1.getRepository)(SellerAccountStat_1.SellerAccountStat);
    yield accountStatRepo.createQueryBuilder()
        .update(SellerAccountStat_1.SellerAccountStat)
        .set({
        totalOrdersCount: sellerAccountStats.totalOrdersCount + 1,
        totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount + 1,
    })
        .where({ id: sellerAccountStats.id })
        .execute();
    if (order.paymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        const orderUser = yield userRepo.findOne({ id: order.buyerUserId });
        yield OrderService.updateOrderStatus(order, Statuses_1.default.CONFIRMED, orderUser);
        const notificationMetadata = {
            orderUuid: order.uuid,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
        };
        const res = yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_a = order.buyerUser) === null || _a === void 0 ? void 0 : _a.uuid, NotificationMessageTypes_1.default.POD_ORDER_PAYMENT_NOTIFICATION, 'Payment Notification For POD order', `We have received your payment for #${order.referenceNumber} hence, your transaction is now complete. Thank you for shopping on CinderBuild and we hope to see you again soon. Call us on +2349087792957 if you need any help. Thanks, CinderBuild 
      `, notificationTransports, notificationMetadata);
        console.log(`ResBuyerPay ${res}`);
    }
    const notificationMetadata = {
        orderUuid: order.uuid,
    };
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        [NotificationTransport_1.NotificationTransportMode.SMS]: true,
    };
    const buyerDetail = yield buyerRepo.findOne({ id: order.buyerUserId });
    const financialTransaction = yield financialRepo.findOne({
        where: { uuid: order.paymentTransactionUuid }
    });
    if ((_b = financialTransaction === null || financialTransaction === void 0 ? void 0 : financialTransaction.metadata) === null || _b === void 0 ? void 0 : _b.temporaryOrderUuid) {
        console.log('sending mail to unregister with details about his order');
        yield EmailService.sendUnregisterUserOrderDetailsMailtoAdmin(buyerDetail, order, financialTransaction.reference, financialTransaction.paidStatus);
        const notificationMetadataTemp = {
            orderUuid: order.uuid,
            temporaryOrderUuid: (_c = financialTransaction === null || financialTransaction === void 0 ? void 0 : financialTransaction.metadata) === null || _c === void 0 ? void 0 : _c.temporaryOrderUuid
        };
        yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_d = order.buyerUser) === null || _d === void 0 ? void 0 : _d.uuid, NotificationMessageTypes_1.default.ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER, 'Successful order payment', `An order with References #${order.referenceNumber} has been made, Keep the order Ref Safe. CinderBuild Team. 
      `, notificationTransports, notificationMetadataTemp);
    }
    else {
        yield EmailService.sendOrderDetailsMailtoAdmin(buyerDetail, order);
        yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_e = order.buyerUser) === null || _e === void 0 ? void 0 : _e.uuid, NotificationMessageTypes_1.default.ORDER_PAYMENT_IN_ESCROW, 'Successful order payment', `An order with References #${order.referenceNumber} has been made, Go to Order, and View the details of the Order. CinderBuild Team. 
      `, notificationTransports, notificationMetadata);
    }
    const notificationTransportsToSeller = {
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        [NotificationTransport_1.NotificationTransportMode.SMS]: true
    };
    yield NotificationService.sendSingleNotificationToUserId(order.sellerUserId, (_f = order.sellerUser) === null || _f === void 0 ? void 0 : _f.uuid, NotificationMessageTypes_1.default.ORDER_CREATED, 'Order payment now in escrow', `An order with References #${order.referenceNumber} has been made, Go to Order, and View the details of the Order, call us on +2349168777239 or send a mail to support@cinderbuild.com`, notificationTransportsToSeller, notificationMetadata);
    return true;
});
exports.afterConfirmedOrderPayment = afterConfirmedOrderPayment;
const afterOrderPaymentWithWallet = (orders, sourceWallet, currentProductLeaseId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Inside afterOrderPaymentWithWallet ...');
    const accountWalletRepoT = (0, typeorm_1.getRepository)(Wallet_1.Wallet);
    const financialTransactionT = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
    let currentWalletBalanceMinor = sourceWallet.walletBalanceMinor;
    for (const order of orders) {
        const amountMinor = order.calculatedTotalCostMajor * 100;
        const metadata = {
            orderUuid: order.uuid,
        };
        if (currentProductLeaseId) {
            metadata.productLeaseId = currentProductLeaseId;
        }
        const walletBalanceMinorBefore = currentWalletBalanceMinor;
        const walletBalanceMinorAfter = currentWalletBalanceMinor - amountMinor;
        currentWalletBalanceMinor = walletBalanceMinorAfter;
        yield accountWalletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({ walletBalanceMinor: currentWalletBalanceMinor })
            .where({ id: sourceWallet.id })
            .execute();
        const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW, amountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        financialTransaction.description = `Buyer payment for order: #${order.referenceNumber} now in escrow`;
        yield financialTransactionT.save(financialTransaction);
        yield (0, exports.afterConfirmedOrderPayment)(order);
    }
    return true;
});
exports.afterOrderPaymentWithWallet = afterOrderPaymentWithWallet;
const moveFundsFromEscrowToSellerForOrder = (order, sellerUser, sellerAccountWallet, priceMatrix) => __awaiter(void 0, void 0, void 0, function* () {
    // return early if the seller has been paid 
    if (order.paymentStatus === Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER) {
        console.log('seller has been paid before buyer pay for the order');
        return true;
    }
    if (priceMatrix) {
        yield (0, exports.moveFundsFromEscrowToSellerViaPriceMatrix)(priceMatrix, order, sellerUser, sellerAccountWallet);
        console.log('From moveFundsFromEscrowToSellerViaPriceMatrix ');
        return true;
    }
    const amountMinor = order.calculatedTotalCostMajor * 100;
    const sellerPayoutMinor = (order.calculatedTotalCostMajor - order.cinderbuildRevenueMajor) * 100;
    const cinderbuildRevenueMinor = order.cinderbuildRevenueMajor * 100;
    const walletBalanceMinorBefore = sellerAccountWallet.walletBalanceMinor;
    const walletBalanceMinorAfter = sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor;
    const connection = yield (0, db_1.getFreshConnection)();
    const orderT = connection.getRepository(Order_1.Order);
    const allDone = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const accountWalletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const financialTransactionT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const metadata = {
            orderUuid: order.uuid,
        };
        yield accountWalletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({ walletBalanceMinor: sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor })
            .where({ id: sellerAccountWallet.id })
            .execute();
        const sellerFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sellerAccountWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_SELLER, sellerPayoutMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sellerAccountWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        sellerFinancialTransaction.description = `Payment for order: #${order.referenceNumber}`;
        yield financialTransactionT.save(sellerFinancialTransaction);
        //--
        const cinderbuildRevenueWallet = yield WalletService.getCinderbuildRevenueWallet();
        const cinderbuildRevenueWalletBalanceMinorBefore = cinderbuildRevenueWallet.walletBalanceMinor;
        const cinderbuildRevenueWalletBalanceMinorAfter = cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor;
        yield accountWalletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({ walletBalanceMinor: cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor })
            .where({ id: cinderbuildRevenueWallet.id })
            .execute();
        const cinderbuildEscrowChargesFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(cinderbuildRevenueWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_CINDERBUILD_REVENUE, cinderbuildRevenueMinor, cinderbuildRevenueWalletBalanceMinorBefore, cinderbuildRevenueWalletBalanceMinorAfter, cinderbuildRevenueWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        cinderbuildEscrowChargesFinancialTransaction.description = `CinderBuild revenue for order: #${order.referenceNumber}`;
        yield financialTransactionT.save(cinderbuildEscrowChargesFinancialTransaction);
        //--
        const isAllGood = yield incrementEarningStatistics(transactionalEntityManager, order.sellerUserId, sellerPayoutMinor);
        return isAllGood;
    }));
    if (allDone) {
        const notificationMetadata = {
            orderUuid: order.uuid,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        };
        const now = Utils.utcNow();
        const newPaymentStatusEntry = {
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            dateTimeInISO8601: now.toISOString()
        };
        order.statusHistory = order.statusHistory || [];
        yield orderT.createQueryBuilder()
            .update(Order_1.Order)
            .set({
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            paymentStatusHistory: [...order.paymentStatusHistory, newPaymentStatusEntry]
        })
            .where({ id: order.id })
            .execute();
        yield NotificationService.sendSingleNotificationToUserId(sellerUser.id, sellerUser.uuid, NotificationMessageTypes_1.default.ESCROW_PAYMENT_TO_SELLER, 'Payment for order', `${sellerAccountWallet.currency}${amountMinor / 100} Payment for order: #${order.referenceNumber}`, notificationTransports, notificationMetadata);
    }
    return true;
});
exports.moveFundsFromEscrowToSellerForOrder = moveFundsFromEscrowToSellerForOrder;
const moveFundsFromEscrowToSellerViaPriceMatrix = (priceMatrix, order, sellerUser, sellerAccountWallet) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerPayoutMinor = priceMatrix.totalProductCostPriceMajor * 100;
    const amountMinor = order.calculatedTotalCostMajor * 100;
    const cinderbuildRevenueMinor = order.cinderbuildRevenueMajor * 100;
    const walletBalanceMinorBefore = sellerAccountWallet.walletBalanceMinor;
    const walletBalanceMinorAfter = sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor;
    const connection = yield (0, db_1.getFreshConnection)();
    const orderT = connection.getRepository(Order_1.Order);
    const allDone = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const accountWalletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const financialTransactionT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const metadata = {
            orderUuid: order.uuid,
        };
        yield accountWalletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({ walletBalanceMinor: sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor })
            .where({ id: sellerAccountWallet.id })
            .execute();
        const sellerFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sellerAccountWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_SELLER, sellerPayoutMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sellerAccountWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        sellerFinancialTransaction.description = `Payment for order: #${order.referenceNumber}`;
        yield financialTransactionT.save(sellerFinancialTransaction);
        //--
        const cinderbuildRevenueWallet = yield WalletService.getCinderbuildRevenueWallet();
        const cinderbuildRevenueWalletBalanceMinorBefore = cinderbuildRevenueWallet.walletBalanceMinor;
        const cinderbuildRevenueWalletBalanceMinorAfter = cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor;
        yield accountWalletRepoT.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({ walletBalanceMinor: cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor })
            .where({ id: cinderbuildRevenueWallet.id })
            .execute();
        const cinderbuildEscrowChargesFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(cinderbuildRevenueWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_CINDERBUILD_REVENUE, cinderbuildRevenueMinor, cinderbuildRevenueWalletBalanceMinorBefore, cinderbuildRevenueWalletBalanceMinorAfter, cinderbuildRevenueWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        cinderbuildEscrowChargesFinancialTransaction.description = `CinderBuild revenue for order: #${order.referenceNumber}`;
        yield financialTransactionT.save(cinderbuildEscrowChargesFinancialTransaction);
        //--
        const isAllGood = yield incrementEarningStatistics(transactionalEntityManager, order.sellerUserId, sellerPayoutMinor);
        return isAllGood;
    }));
    if (allDone) {
        const notificationMetadata = {
            orderUuid: order.uuid,
        };
        const notificationTransports = {
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        };
        const now = Utils.utcNow();
        const newPaymentStatusEntry = {
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            dateTimeInISO8601: now.toISOString()
        };
        order.statusHistory = order.statusHistory || [];
        yield orderT.createQueryBuilder()
            .update(Order_1.Order)
            .set({
            paymentStatus: Statuses_1.OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            paymentStatusHistory: [...order.paymentStatusHistory, newPaymentStatusEntry]
        })
            .where({ id: order.id })
            .execute();
        yield NotificationService.sendSingleNotificationToUserId(sellerUser.id, sellerUser.uuid, NotificationMessageTypes_1.default.ESCROW_PAYMENT_TO_SELLER, 'Payment for order', `${sellerAccountWallet.currency}${amountMinor / 100} Payment for order: #${order.referenceNumber}`, notificationTransports, notificationMetadata);
    }
    return true;
});
exports.moveFundsFromEscrowToSellerViaPriceMatrix = moveFundsFromEscrowToSellerViaPriceMatrix;
const refundBuyerForOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const amountMinor = order.calculatedTotalCostMajor * 100;
    const buyerWallet = yield WalletService.getCustomerWallet(order.buyerUserId);
    const notificationMetadata = {
        orderUuid: order.uuid,
    };
    // TODO: Inform support so that dispute can be investigated before refund issued
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    const notificationTitle = 'Order dispute acknowledgement';
    const notificationBody = `We acknowledge your disput for order: #${order.referenceNumber}. We will investigate and issue a refund if applicable.`;
    yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_g = order.buyerUser) === null || _g === void 0 ? void 0 : _g.uuid, NotificationMessageTypes_1.default.ORDER_DISPUTE_ACKNOWLEDGEMENT, notificationTitle, notificationBody, notificationTransports, notificationMetadata);
});
exports.refundBuyerForOrder = refundBuyerForOrder;
const incrementEarningStatistics = (transactionalEntityManager, sellerUserId, amountMinor) => __awaiter(void 0, void 0, void 0, function* () {
    const monthEarningTransactionT = transactionalEntityManager.getRepository(EarningsByMonth_1.EarningsByMonth);
    const monthYearTransactionT = transactionalEntityManager.getRepository(EarningsByYear_1.EarningsByYear);
    const monthISO8601 = moment_1.default.utc().format('YYYY-MM');
    let monthEarning = yield monthEarningTransactionT.findOne({
        userId: sellerUserId,
        monthISO8601,
    });
    if (monthEarning) {
        yield monthEarningTransactionT.createQueryBuilder()
            .update(EarningsByMonth_1.EarningsByMonth)
            .set({ totalEarningsMinor: monthEarning.totalEarningsMinor + amountMinor })
            .where({ id: monthEarning.id })
            .execute();
    }
    else {
        monthEarning = new EarningsByMonth_1.EarningsByMonth().initialize(sellerUserId, monthISO8601, amountMinor);
        yield monthEarningTransactionT.save(monthEarning);
    }
    //--
    const year = moment_1.default.utc().format('YYYY');
    let yearEarning = yield monthYearTransactionT.findOne({
        userId: sellerUserId,
        year,
    });
    if (yearEarning) {
        yield monthYearTransactionT.createQueryBuilder()
            .update(EarningsByYear_1.EarningsByYear)
            .set({ totalEarningsMinor: yearEarning.totalEarningsMinor + amountMinor })
            .where({ id: yearEarning.id })
            .execute();
    }
    else {
        yearEarning = new EarningsByYear_1.EarningsByYear().initialize(sellerUserId, year, amountMinor);
        yield monthYearTransactionT.save(yearEarning);
    }
    return true;
});
//# sourceMappingURL=escrowService.js.map