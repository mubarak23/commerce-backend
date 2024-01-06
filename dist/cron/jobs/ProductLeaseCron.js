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
const BaseCron_1 = __importDefault(require("./BaseCron"));
const FinancialTransaction_1 = require("../../entity/FinancialTransaction");
const db_1 = require("../../db");
const ProductLease_1 = require("../../entity/ProductLease");
const typeorm_1 = require("typeorm");
const Utils = __importStar(require("../../utils/core"));
const moment_1 = __importDefault(require("moment"));
const WalletType_1 = require("../../enums//WalletType");
const Wallet_1 = require("../../entity/Wallet");
const PaymentTransaction_1 = require("../../enums/PaymentTransaction");
class ProductLeaseCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const now = Utils.utcNow();
            const productLeases = yield productLeaseRepo.find({
                where: {
                    isActive: true,
                    isSoftDeleted: false,
                    nextLeasePaymentDueDate: (0, typeorm_1.LessThan)(now),
                    isMultiStageInterestCharge: false,
                },
                take: 100,
                order: { createdAt: 'DESC' },
            });
            if (!productLeases.length) {
                return;
            }
            const buyerUserIds = productLeases.map(productLease => productLease.userId);
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            const wallets = yield walletRepo.find({
                userId: (0, typeorm_1.In)(buyerUserIds),
                type: WalletType_1.WalletType.CUSTOMER_WALLET,
            });
            // update test set info = tmp.info from(values(1, 'new1'), (2, 'new2'), (6, 'new6')) as tmp (id, info) where test.id = tmp.id;
            const updateProductLeaseBatchQueryValues = productLeases
                .map(productLease => {
                if (productLease.isPaid) {
                    const sameNextLeasePaymentDueDate = moment_1.default.utc(productLease.nextLeasePaymentDueDate).format('YYYY-MM-DD HH:mm:ss');
                    return `(${productLease.id}, '${sameNextLeasePaymentDueDate}'::timestamp, FALSE)`;
                }
                const newNextLeasePaymentDueDate = moment_1.default.utc(productLease.nextLeasePaymentDueDate).add(30, 'days').format('YYYY-MM-DD HH:mm:ss');
                return `(${productLease.id}, '${newNextLeasePaymentDueDate}'::timestamp, TRUE)`;
            });
            const updateProductLeaseBatchQuery = `UPDATE product_leases set next_lease_payment_due_date = productlease_update.next_lease_payment_due_date, is_active = productlease_update.is_active
        from(values${updateProductLeaseBatchQueryValues.join(",")}) as productlease_update (id, next_lease_payment_due_date, is_active)
        where product_leases.id = productlease_update.id;`;
            //--
            const updateWalletBatchQueryValues = productLeases.map(productLease => {
                var _a;
                const theWallet = wallets.find(aWallet => aWallet.userId === productLease.userId);
                const walletBalanceMinorBefore = (_a = theWallet === null || theWallet === void 0 ? void 0 : theWallet.walletBalanceMinor) !== null && _a !== void 0 ? _a : 0;
                const newWalletBalanceMinor = (walletBalanceMinorBefore - (productLease.principalAmountMinor * productLease.interestRatePercentage / 100)).toFixed(2);
                return `(${theWallet === null || theWallet === void 0 ? void 0 : theWallet.id}, ${newWalletBalanceMinor})`;
            });
            const updateWalletBatchQuery = `UPDATE wallets set wallet_balance_minor = wallet_update.walletBalanceMinor
        from(values${updateWalletBatchQueryValues.join(",")}) as wallet_update (id, walletBalanceMinor)
        where wallets.id = wallet_update.id;`;
            const financialTransactionsBatch = productLeases.map(productLease => {
                var _a;
                const theWallet = wallets.find(aWallet => aWallet.userId === productLease.userId);
                const interestAmountMinor = (productLease.principalAmountMinor * productLease.interestRatePercentage / 100);
                const walletBalanceMinorBefore = (_a = theWallet === null || theWallet === void 0 ? void 0 : theWallet.walletBalanceMinor) !== null && _a !== void 0 ? _a : 0;
                const newWalletBalanceMinor = walletBalanceMinorBefore - interestAmountMinor;
                const metadata = {
                    productLeaseId: productLease.id
                };
                const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(theWallet, PaymentTransaction_1.PaymentTransactionTypes.PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT, interestAmountMinor, theWallet.walletBalanceMinor, newWalletBalanceMinor, theWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
                financialTransaction.description = `${theWallet === null || theWallet === void 0 ? void 0 : theWallet.currency}${interestAmountMinor / 100} product lease interest`;
                return financialTransaction;
            });
            const updateSuccessful = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const productLeaseEntityManager = transactionalEntityManager.getRepository(ProductLease_1.ProductLease).manager;
                const accountWalletEntityManager = transactionalEntityManager.getRepository(Wallet_1.Wallet).manager;
                const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
                const productLeaseUpdateResult = yield productLeaseEntityManager.query(updateProductLeaseBatchQuery, []);
                const accountWalletUpdateResults = yield accountWalletEntityManager.query(updateWalletBatchQuery, []);
                const insertResult = yield financialTransactionRepo.createQueryBuilder()
                    .insert()
                    .into(FinancialTransaction_1.FinancialTransaction)
                    .values(financialTransactionsBatch)
                    .execute();
                return true;
            }));
        });
    }
}
exports.default = ProductLeaseCron;
//# sourceMappingURL=ProductLeaseCron.js.map