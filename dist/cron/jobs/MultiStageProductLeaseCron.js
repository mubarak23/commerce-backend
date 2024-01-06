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
const Wallet_1 = require("../../entity/Wallet");
const WalletType_1 = require("../../enums/WalletType");
const PaymentTransaction_1 = require("../../enums/PaymentTransaction");
class MultiStageProductLeaseCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const now = Utils.utcNow();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const plpslpToCharge = yield productLeaseRepo.find({
                where: {
                    isActive: true,
                    principalAmountMinor: (0, typeorm_1.MoreThan)(0),
                    isSoftDeleted: false,
                    nextInterestChargeDate: (0, typeorm_1.LessThan)(now),
                    isMultiStageInterestCharge: true,
                },
            });
            if (!plpslpToCharge.length) {
                return;
            }
            const buyerUserIds = plpslpToCharge.map(productLease => productLease.userId);
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            const accountMainWallets = yield walletRepo.find({
                userId: (0, typeorm_1.In)(buyerUserIds),
                type: WalletType_1.WalletType.CUSTOMER_WALLET,
            });
            const updateProductLeaseBatchQuery = this.constructPlpUpdateSqlQuery(plpslpToCharge, accountMainWallets);
            const updateWalletBatchQuery = this.constructCustomerWalletUpdateSqlQuery(plpslpToCharge, accountMainWallets);
            const financialTransactionsBatch = [];
            for (const productLease of plpslpToCharge) {
                const accountWallet = accountMainWallets.find(accountWallet => `${accountWallet.userId}` === `${productLease.userId}`);
                const interestAmountMinor = (productLease.principalAmountMinor * productLease.nextInterestRatePercentage / 100);
                const newWalletBalanceMinor = accountWallet.walletBalanceMinor - interestAmountMinor;
                const metadata = {
                    productLeaseId: productLease.id
                };
                const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(accountWallet, PaymentTransaction_1.PaymentTransactionTypes.PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT, interestAmountMinor, accountWallet.walletBalanceMinor, newWalletBalanceMinor, accountWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
                // financialTransaction.description = `${accountWallet!.currency}${interestAmountMinor/100} product lease interest`
                financialTransaction.description = `Product lease ${productLease.nextInterestRatePercentage}% interest`;
                financialTransactionsBatch.push(financialTransaction);
            }
            const updateSuccessful = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const productLeaseManager = transactionalEntityManager.getRepository(ProductLease_1.ProductLease).manager;
                const walletEntityManager = transactionalEntityManager.getRepository(Wallet_1.Wallet).manager;
                const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
                yield productLeaseManager.query(updateProductLeaseBatchQuery, []);
                yield walletEntityManager.query(updateWalletBatchQuery, []);
                yield financialTransactionRepo.createQueryBuilder()
                    .insert()
                    .into(FinancialTransaction_1.FinancialTransaction)
                    .values(financialTransactionsBatch)
                    .execute();
                return true;
            }));
            console.log(`ProductLeaseCron updateSuccessful: ${updateSuccessful}`);
        });
    }
    constructPlpUpdateSqlQuery(productLeases, accountMainWallets) {
        const nowMoment = moment_1.default.utc();
        const updateProductLeaseBatchQueryValues = productLeases.map(productLease => {
            const accountWallet = accountMainWallets.find(accountWallet => `${accountWallet.userId}` === `${productLease.userId}`);
            const formattedSameNextInterestRateChargeDate = moment_1.default.utc(productLease.nextInterestChargeDate).format('YYYY-MM-DD HH:mm:ss');
            if (!accountWallet) {
                return `(${productLease.id}, '${formattedSameNextInterestRateChargeDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive})`;
            }
            const plpNextInterestChargeDateMoment = moment_1.default.utc(productLease.nextInterestChargeDate);
            if (plpNextInterestChargeDateMoment.isBefore(nowMoment)) {
                if (productLease.interestChargeCurrentStage === 1) {
                    const plpNextInterestChargeDate = moment_1.default.utc(productLease.createdAt).add(6, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
                    return `(${productLease.id}, '${plpNextInterestChargeDate}'::timestamp, 3, TRUE, 2)`;
                }
                if (productLease.interestChargeCurrentStage === 2) {
                    const plpNextInterestChargeDate = moment_1.default.utc(productLease.createdAt).add(14, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
                    return `(${productLease.id}, '${plpNextInterestChargeDate}'::timestamp, 2, TRUE, 3)`;
                }
                const nextLeasePaymentDueDate = moment_1.default.utc(productLease.nextLeasePaymentDueDate).format('YYYY-MM-DD HH:mm:ss');
                return `(${productLease.id}, '${nextLeasePaymentDueDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive}, ${productLease.interestChargeCurrentStage})`;
            }
            return `(${productLease.id}, '${formattedSameNextInterestRateChargeDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive}, ${productLease.interestChargeCurrentStage})`;
        });
        // update test set info = tmp.info from(values(1, 'new1'), (2, 'new2'), (6, 'new6')) as tmp (id, info) where test.id = tmp.id;
        const query = `UPDATE product_leases set 
          next_interest_charge_date = product_leases_update.next_interest_charge_date, 
          next_interest_rate_percentage = product_leases_update.next_interest_rate_percentage, 
          is_active = product_leases_update.is_active, 
          interest_charge_current_stage = product_leases_update.interest_charge_current_stage
        from(values${updateProductLeaseBatchQueryValues.join(",")}) as product_leases_update (id, next_interest_charge_date, next_interest_rate_percentage, is_active, interest_charge_current_stage)
        where product_leases.id = product_leases_update.id;`;
        return query;
    }
    constructCustomerWalletUpdateSqlQuery(plpslpToCharge, accountMainWallets) {
        const updateWalletBatchQueryValues = plpslpToCharge.map(productLease => {
            const accountWallet = accountMainWallets.find(accountWallet => `${accountWallet.userId}` === `${productLease.userId}`);
            const newWalletBalanceMinor = (accountWallet.walletBalanceMinor - (productLease.principalAmountMinor * productLease.nextInterestRatePercentage / 100)).toFixed(2);
            return `(${accountWallet.id}, ${newWalletBalanceMinor})`;
        });
        const query = `UPDATE wallets set wallet_balance_minor = accountwallet_update.walletBalanceMinor
        from(values${updateWalletBatchQueryValues.join(",")}) as accountwallet_update (id, walletBalanceMinor)
        where wallets.id = accountwallet_update.id;`;
        return query;
    }
}
exports.default = MultiStageProductLeaseCron;
//# sourceMappingURL=MultiStageProductLeaseCron.js.map