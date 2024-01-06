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
/* eslint-disable no-await-in-loop */
const moment_1 = __importDefault(require("moment"));
const db_1 = require("../../db");
const Order_1 = require("../../entity/Order");
const typeorm_1 = require("typeorm");
const Statuses_1 = __importStar(require("../../enums/Statuses"));
const BaseCron_1 = __importDefault(require("./BaseCron"));
const FinancialTransaction_1 = require("../../entity/FinancialTransaction");
const Wallet_1 = require("../../entity/Wallet");
const WalletService = __importStar(require("../../services/walletService"));
const ConfigPropertyService = __importStar(require("../../services/configPropertyService"));
const PaymentTransaction_1 = require("../../enums/PaymentTransaction");
const ConfigProperties_1 = __importDefault(require("../../enums/ConfigProperties"));
const Utils = __importStar(require("../../utils/core"));
class ChargeBuyerCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const nowMoment = moment_1.default.utc();
            const orderRepo = connection.getRepository(Order_1.Order);
            const ordersMarkedAsPaymentInDefault = yield orderRepo.find({
                where: {
                    status: Statuses_1.default.PAYMENT_DEFAULT,
                    paymentStatus: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
                    paymentVariant: Statuses_1.OrderPaymentVariantDto.PAY_ON_DELIVERY,
                    markedAsPaymentDefaultAt: (0, typeorm_1.LessThan)(nowMoment.toDate())
                },
                order: { createdAt: 'DESC' },
            });
            if (!ordersMarkedAsPaymentInDefault.length) {
                return null;
            }
            let paymentDefaultDailyChargePercentage = 0;
            paymentDefaultDailyChargePercentage = (yield ConfigPropertyService.getConfigProperty(ConfigProperties_1.default.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE));
            paymentDefaultDailyChargePercentage = paymentDefaultDailyChargePercentage !== null && paymentDefaultDailyChargePercentage !== void 0 ? paymentDefaultDailyChargePercentage : 0;
            for (const order of ordersMarkedAsPaymentInDefault) {
                yield this.applyPaymentDefaultDailyCharge(connection, order, paymentDefaultDailyChargePercentage);
            }
            return true;
        });
    }
    applyPaymentDefaultDailyCharge(connection, order, paymentDefaultDailyChargePercentage) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderAmountMinor = order.calculatedTotalCostMajor * 100;
            const buyerWallet = yield WalletService.getCustomerWallet(order.buyerUserId);
            const dailyPaymentDefaultChargeMinor = Utils.normalizeMoney(orderAmountMinor * paymentDefaultDailyChargePercentage / 100);
            const walletBalanceMinorBefore = buyerWallet.walletBalanceMinor;
            const walletBalanceMinorAfter = buyerWallet.walletBalanceMinor - dailyPaymentDefaultChargeMinor;
            const walletBalanceDebitedStatus = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
                const financialRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
                yield walletRepoT.createQueryBuilder()
                    .update(Wallet_1.Wallet)
                    .set({
                    walletBalanceMinor: walletBalanceMinorAfter,
                })
                    .where({
                    id: buyerWallet.id,
                })
                    .execute();
                const metadata = {};
                const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(buyerWallet, PaymentTransaction_1.PaymentTransactionTypes.ORDER_PAYMENT_DEFAULT_DAILY_DEBIT, dailyPaymentDefaultChargeMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, buyerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
                const transactionDescription = [
                    `${buyerWallet.currency}${dailyPaymentDefaultChargeMinor / 100} daily debit for`,
                    ` order: #${order.referenceNumber} payment default.`
                ].join('');
                debitFinancialTransaction.description = transactionDescription;
                yield financialRepoT.save(debitFinancialTransaction);
                return true;
            }));
            return walletBalanceDebitedStatus;
        });
    }
}
exports.default = ChargeBuyerCron;
//# sourceMappingURL=ChargeBuyerCron.js.map