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
exports.processDeliveryToSiteRequestCardPayment = exports.processOrderRefundToBuyer = exports.processVerifiedPaystackPayment = exports.processPayForOrderTransaction = exports.processFundWalletTransaction = exports.processAnyUnpaidOrders = exports.initPaystackPayment = exports.payWithWallet = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
const _ = __importStar(require("underscore"));
const Order_1 = require("../entity/Order");
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Wallet_1 = require("../entity/Wallet");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const PaymentInitializeVariant_1 = require("../enums/PaymentInitializeVariant");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Roles_1 = require("../enums/Roles");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const logger_1 = __importDefault(require("../logger"));
const EmailService = __importStar(require("../services/emailService"));
const NotificationService = __importStar(require("../services/notificationService"));
const OrderService = __importStar(require("../services/orderService"));
const PaystackService = __importStar(require("../services/paystackService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const EscrowService = __importStar(require("./escrowService"));
const WalletService = __importStar(require("./walletService"));
const WareHouseWalletService = __importStar(require("./wareHouseWalletService"));
const payWithWallet = (orders, orderAmountMajor, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceWallet = yield WalletService.getCustomerWallet(currentUser.id);
    const { walletBalanceMinor } = sourceWallet;
    const orderAmountMinor = Utils.normalizeMoney(orderAmountMajor * 100);
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    if (orderAmountMajor === 0) {
        for (const order of orders) {
            yield EscrowService.afterConfirmedOrderPayment(order);
        }
        return true;
    }
    if (orders[0].paymentVariant !== OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        if (walletBalanceMinor < orderAmountMinor) {
            yield orderRepo.delete({
                id: (0, typeorm_1.In)(orders.map(ord => ord.id))
            });
            throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process payment of order');
        }
    }
    for (const order of orders) {
        const mailToAdmin = yield EmailService.sendOrderDetailsMailtoAdmin(currentUser, order);
    }
    const fundsMoveResult = yield EscrowService.afterOrderPaymentWithWallet(orders, sourceWallet);
    return fundsMoveResult;
});
exports.payWithWallet = payWithWallet;
const initPaystackPayment = (payingUser, paymentVariant, amountMajor) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentTransactionType = PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET;
    if (paymentVariant === PaymentInitializeVariant_1.PaymentInitializeVariant.FUND_MAIN_WALLET) {
        paymentTransactionType = PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET;
    }
    else if (paymentVariant === PaymentInitializeVariant_1.PaymentInitializeVariant.PRODUCT_LEASE_PAYMENT) {
        paymentTransactionType = PaymentTransaction_1.PaymentTransactionTypes.PRODUCT_LEASE_PAYMENT;
    }
    else {
        throw new error_response_types_1.BadRequestError('Invalid payment initialize type');
    }
    //--
    const paystackPayingUser = {
        emailAddress: payingUser.emailAddress,
        fullName: `${payingUser.firstName} ${payingUser.lastName}`
    };
    const { paymentReference, paymentProviderRedirectUrl, accessCode, redirectUrlAfterPayment } = yield PaystackService.initializeTransaction(paystackPayingUser, amountMajor);
    const sourceWallet = yield WalletService.getCustomerWallet(payingUser.id);
    const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
    const metadata = {};
    const amountMinor = (amountMajor || 0) * 100;
    const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, paymentTransactionType, amountMinor, walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.UNPAID, paymentReference, metadata);
    financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} main wallet fund`;
    const connection = yield (0, db_1.getFreshConnection)();
    const transactionRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
    yield transactionRepo.save(financialTransaction);
    return {
        paymentProviderRedirectUrl,
        paymentReference,
        accessCode,
        redirectUrlAfterPayment
    };
});
exports.initPaystackPayment = initPaystackPayment;
const processAnyUnpaidOrders = (buyerUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = (0, typeorm_1.getRepository)(Order_1.Order);
    const existingUnpaidOrders = yield OrderService.buyerUnpaidOrders(buyerUserId, []);
    if (!existingUnpaidOrders.length) {
        return;
    }
    console.log(existingUnpaidOrders);
    //--
    let totalOrderAmountMajor = 0;
    for (const existingUnpaidOrder of existingUnpaidOrders) {
        totalOrderAmountMajor += existingUnpaidOrder.calculatedTotalCostMajor;
    }
    const totalOrderAmountMinor = totalOrderAmountMajor * 100;
    const sourceWallet = yield WalletService.getCustomerWallet(buyerUserId);
    //--
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const payingUser = yield userRepo.findOne({
        id: buyerUserId,
    });
    const existingUnpaidOrdersOrderUuids = existingUnpaidOrders.map(order => order.uuid);
    const existingWalletDeductTransactionsTemp = yield (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction)
        .createQueryBuilder()
        .where("metadata->>'orderUuid' IN (:...orderUuids)", {
        orderUuids: existingUnpaidOrdersOrderUuids,
    })
        .getMany();
    const existingWalletDeductTransactions = [];
    for (const eWallDeductTransTemp of existingWalletDeductTransactionsTemp) {
        if (eWallDeductTransTemp.paidStatus === PaymentTransaction_1.PaymentTransactionStatus.PAID &&
            eWallDeductTransTemp.walletBalanceMinorAfter && eWallDeductTransTemp.walletBalanceMinorAfter < 0) {
            existingWalletDeductTransactions.push(eWallDeductTransTemp);
        }
    }
    const lowestAfterBalanceMinor = _.min(existingWalletDeductTransactions.map(trans => {
        return trans.walletBalanceMinorAfter;
    }));
    const whatWalletShouldBeAfterFullPayment = lowestAfterBalanceMinor + totalOrderAmountMinor;
    // if(sourceWallet.walletBalanceMinor < whatWalletShouldBeAfterFullPayment) {
    //   return
    // }
    console.log('what buyer wallet should be after payment', whatWalletShouldBeAfterFullPayment);
    if (sourceWallet.walletBalanceMinor < 0) {
        return;
    }
    if (existingWalletDeductTransactions.length) {
        for (const unPaidOrder of existingUnpaidOrders) {
            const foundDeductionTransaction = existingWalletDeductTransactions.find(deductTrans => { var _a; return ((_a = deductTrans.metadata) === null || _a === void 0 ? void 0 : _a.orderUuid) === unPaidOrder.uuid; });
            if (!foundDeductionTransaction) {
                yield OrderService.processOrdersPayment([unPaidOrder], OrderPaymentVariant_1.OrderPaymentVariant.WALLET, payingUser);
            }
        }
    }
    else {
        yield OrderService.processOrdersPayment(existingUnpaidOrders, OrderPaymentVariant_1.OrderPaymentVariant.WALLET, payingUser);
    }
    const join = {
        alias: "order",
        leftJoinAndSelect: {
            buyerUser: "order.buyerUser",
            sellerUser: "order.sellerUser",
        },
    };
    const existingUnconfirmedOrders = yield orderRepo.find({
        where: {
            buyerUserId,
            paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY,
            status: (0, typeorm_1.Not)((0, typeorm_1.In)([
                Statuses_1.default.COMPLETED, Statuses_1.default.CONFIRMED, Statuses_1.default.ENDED_WITH_DISPUTES,
                Statuses_1.default.CANCELLED_BY_BUYER, Statuses_1.default.CANCELLED_BY_SELLER,
            ])),
        },
        join,
    });
    if (!existingUnconfirmedOrders.length) {
        return;
    }
    for (const openOrder of existingUnconfirmedOrders) {
        yield OrderService.updateOrderStatus(openOrder, Statuses_1.default.CONFIRMED, payingUser);
    }
});
exports.processAnyUnpaidOrders = processAnyUnpaidOrders;
const processFundWalletTransaction = (transaction, sourceWallet) => __awaiter(void 0, void 0, void 0, function* () {
    const financialTransactionRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
    const walletRepo = (0, typeorm_1.getRepository)(Wallet_1.Wallet);
    const paymentTransactionUpdate = {
        walletBalanceMinorAfter: () => `wallet_balance_minor_before + ${transaction.amountMinor}`,
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID,
        paidAt: Utils.utcNow()
    };
    yield financialTransactionRepo.update(transaction.id, paymentTransactionUpdate);
    yield walletRepo.createQueryBuilder()
        .update(Wallet_1.Wallet)
        .set({
        walletBalanceMinor: sourceWallet.walletBalanceMinor + transaction.amountMinor,
    })
        .where({
        userId: transaction.userId,
    })
        .execute();
    const notificationMessage = `${transaction.currency}${transaction.amountMinor / 100} funded to your main wallet`;
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const primaryUser = yield userRepo.findOne({
        id: transaction.userId,
    });
    if (!primaryUser) {
        return true;
    }
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    yield NotificationService.sendSingleNotificationToUserId(primaryUser.id, primaryUser.uuid, NotificationMessageTypes_1.default.MAIN_WALLET_FUND, 'Main Wallet funded successfully!', notificationMessage, notificationTransports);
    if (primaryUser.role !== Roles_1.Roles.AFFILIATE) {
        yield (0, exports.processAnyUnpaidOrders)(sourceWallet.userId);
    }
    return true;
});
exports.processFundWalletTransaction = processFundWalletTransaction;
const processPayForOrderTransaction = (orderPaymentVariant, transaction, sourceWallet) => __awaiter(void 0, void 0, void 0, function* () {
    const financialTransactionRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
    const walletRepo = (0, typeorm_1.getRepository)(Wallet_1.Wallet);
    const orderRepo = (0, typeorm_1.getRepository)(Order_1.Order);
    const join = {
        alias: "order",
        leftJoinAndSelect: {
            buyerUser: "order.buyerUser",
            sellerUser: "order.sellerUser",
        },
    };
    const order = yield orderRepo.findOne({
        where: {
            paymentTransactionUuid: transaction.uuid
        },
        join,
    });
    console.log(order);
    if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.WALLET) {
        const paymentTransactionUpdate = {
            walletBalanceMinorAfter: () => `wallet_balance_minor_before - ${transaction.amountMinor}`,
            paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID,
            paidAt: Utils.utcNow()
        };
        yield financialTransactionRepo.update(transaction.id, paymentTransactionUpdate);
        yield walletRepo.createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: sourceWallet.walletBalanceMinor - transaction.amountMinor,
        })
            .where({
            userId: transaction.userId,
        })
            .execute();
    }
    else if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.CARD) {
        const paymentTransactionUpdate = {
            paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID,
            paidAt: Utils.utcNow()
        };
        yield financialTransactionRepo.update(transaction.id, paymentTransactionUpdate);
    }
    return EscrowService.afterConfirmedOrderPayment(order);
});
exports.processPayForOrderTransaction = processPayForOrderTransaction;
const processVerifiedPaystackPayment = (transaction, orderPaymentVariant, sourceWallet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (transaction.transactionType === PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET) {
            return (0, exports.processFundWalletTransaction)(transaction, sourceWallet);
        }
        if (transaction.transactionType === PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER) {
            return (0, exports.processPayForOrderTransaction)(orderPaymentVariant, transaction, sourceWallet);
        }
        return true;
    }
    catch (e) {
        logger_1.default.info(`Inside processVerifiedPaystackPayment exception: `, e.message);
        logger_1.default.info(`Inside processVerifiedPaystackPayment exception stack: `, e.stack);
    }
    return true;
});
exports.processVerifiedPaystackPayment = processVerifiedPaystackPayment;
const processOrderRefundToBuyer = (order, transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
    const orderAmountMinor = order.calculatedTotalCostMajor * 100;
    const now = Utils.utcNow();
    const sourceWallet = yield WalletService.getCustomerWallet(order.buyerUserId);
    const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
    const walletBalanceMinorAfter = sourceWallet.walletBalanceMinor + orderAmountMinor;
    const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
    const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
    const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
    order.paymentStatusHistory.push({
        status: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_REFUND,
        dateTimeInISO8601: now.toISOString()
    });
    const orderUpdateQuery = {};
    orderUpdateQuery.paymentStatus = Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_REFUND;
    orderUpdateQuery.paymentStatusHistory = order.paymentStatusHistory || [];
    yield orderRepoT.createQueryBuilder()
        .update(Order_1.Order)
        .set(orderUpdateQuery)
        .where({ id: order.id })
        .execute();
    const metadata = {
        orderUuid: order.uuid,
    };
    const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.ESCROW_TO_REFUND_BUYER, orderAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
    financialTransaction.description = `${sourceWallet.currency}${orderAmountMinor / 100} main wallet refund for order: #${order.referenceNumber}.`;
    yield financialTransactionRepoT.save(financialTransaction);
    yield walletRepoT.createQueryBuilder()
        .update(Wallet_1.Wallet)
        .set({
        walletBalanceMinor: walletBalanceMinorAfter,
    })
        .where({
        userId: order.buyerUserId,
    })
        .execute();
    return true;
});
exports.processOrderRefundToBuyer = processOrderRefundToBuyer;
const processDeliveryToSiteRequestCardPayment = (currentUser, DeliveryFeeTotalAmountMajor, WareHouseToSiteDelivery) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const paystackPayingUser = {
        emailAddress: currentUser.emailAddress,
        fullName: `${currentUser.firstName} ${currentUser.lastName}`
    };
    const DeliveryFeeTotalAmountMinor = DeliveryFeeTotalAmountMajor * 100;
    const { paymentReference, paymentProviderRedirectUrl, accessCode, redirectUrlAfterPayment } = yield PaystackService.initializeTransaction(paystackPayingUser, DeliveryFeeTotalAmountMinor);
    if (!paymentReference) {
        throw new error_response_types_1.ServerError('An error occurred while processing your payment. Please try again');
    }
    yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const sourceDeliveryWallet = yield WareHouseWalletService.getCustomerSecondaryWallet(currentUser.accountId);
        const walletBalanceMinorBefore = sourceDeliveryWallet.walletBalanceMinor;
        const metadata = {
            wareHouseTositeUuid: WareHouseToSiteDelivery.uuid,
        };
        const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeDeliveryFeeTransaction(sourceDeliveryWallet, PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER, DeliveryFeeTotalAmountMinor, walletBalanceMinorBefore, undefined, sourceDeliveryWallet.currency ? sourceDeliveryWallet.currency : 'NGN', PaymentTransaction_1.PaymentTransactionStatus.UNPAID, paymentReference, metadata);
        financialTransaction.description = `${sourceDeliveryWallet.currency ? sourceDeliveryWallet.currency : 'NGN'}${DeliveryFeeTotalAmountMinor} Delivery to Site Payment`;
        const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const savedTransaction = yield transactionRepoT.save(financialTransaction);
        const wareHouseToSiteDeliveryRepoT = transactionalEntityManager.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
        if (WareHouseToSiteDelivery) {
            yield wareHouseToSiteDeliveryRepoT.createQueryBuilder()
                .update(Order_1.Order)
                .set({ paymentTransactionUuid: savedTransaction.uuid })
                .where({ uuid: WareHouseToSiteDelivery.uuid })
                .execute();
        }
    }));
    return {
        paymentReference,
        paymentProviderRedirectUrl,
        accessCode,
        redirectUrlAfterPayment
    };
});
exports.processDeliveryToSiteRequestCardPayment = processDeliveryToSiteRequestCardPayment;
//# sourceMappingURL=paymentService.js.map