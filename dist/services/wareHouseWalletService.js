"use strict";
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
exports.saveDeliveryWalletFeeTransaction = exports.mainWalletToDeliveryWalletTransfer = exports.getCustomerMainWallet = exports.getCustomerSecondaryWallet = exports.getCustomerDeliveryWallet = void 0;
const db_1 = require("../db");
const DeliveryWalletFee_1 = require("../entity/DeliveryWalletFee");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Wallet_1 = require("../entity/Wallet");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const WalletType_1 = require("../enums/WalletType");
const error_response_types_1 = require("../utils/error-response-types");
const getCustomerDeliveryWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const DeliverywalletRepo = connection.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
    const sourceDeliveryWalletFee = yield DeliverywalletRepo.findOne({
        userId,
        type: WalletType_1.WalletType.CUSTOMER_WALLET,
    });
    if (!sourceDeliveryWalletFee) {
        throw new error_response_types_1.UnprocessableEntityError('User Does not have Delivery Wallet');
    }
    return sourceDeliveryWalletFee;
});
exports.getCustomerDeliveryWallet = getCustomerDeliveryWallet;
const getCustomerSecondaryWallet = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const DeliverywalletRepo = connection.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
    const sourceDeliveryWalletFee = yield DeliverywalletRepo.findOne({
        accountId,
        type: WalletType_1.WalletType.CUSTOMER_WALLET,
    });
    if (!sourceDeliveryWalletFee) {
        throw new error_response_types_1.UnprocessableEntityError('User Does not have Delivery Wallet');
    }
    return sourceDeliveryWalletFee;
});
exports.getCustomerSecondaryWallet = getCustomerSecondaryWallet;
const getCustomerMainWallet = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const walletRepo = connection.getRepository(Wallet_1.Wallet);
    const sourceWallet = yield walletRepo.findOne({
        accountId,
        type: WalletType_1.WalletType.CUSTOMER_WALLET,
    });
    if (!sourceWallet) {
        throw new error_response_types_1.UnprocessableEntityError('User Does not have Wallet');
    }
    return sourceWallet;
});
exports.getCustomerMainWallet = getCustomerMainWallet;
const mainWalletToDeliveryWalletTransfer = (currentUser, totalTransferAmountMinor) => __awaiter(void 0, void 0, void 0, function* () {
    const senderWallet = yield (0, exports.getCustomerMainWallet)(currentUser.accountId);
    const deliveryWalletFee = yield (0, exports.getCustomerSecondaryWallet)(currentUser.accountId);
    const connection = yield (0, db_1.getFreshConnection)();
    const transferSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const deliveryFeeWalletRepoT = transactionalEntityManager.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
        const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
        const walletBalanceMinorAfter = senderWallet.walletBalanceMinor - totalTransferAmountMinor;
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(senderWallet, PaymentTransaction_1.PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER, totalTransferAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, senderWallet.currency ? senderWallet.currency : 'NGN', PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        debitFinancialTransaction.description =
            `${senderWallet.currency}${totalTransferAmountMinor / 100}  main wallet to delivery wallet fee transfer`;
        yield financialTransactionRepoT.save(debitFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${totalTransferAmountMinor}`,
        })
            .where({ id: senderWallet.id })
            .execute();
        const creditDeliveryWalletBalanceMinorBefore = deliveryWalletFee.walletBalanceMinor;
        const creditDeliveryWalletBalanceMinorAfter = deliveryWalletFee.walletBalanceMinor + totalTransferAmountMinor;
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeDeliveryFeeTransaction(deliveryWalletFee, PaymentTransaction_1.PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER, totalTransferAmountMinor, creditDeliveryWalletBalanceMinorBefore, creditDeliveryWalletBalanceMinorAfter, deliveryWalletFee.currency ? deliveryWalletFee.currency : 'NGN', PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        creditFinancialTransaction.description =
            `${deliveryWalletFee.currency}${totalTransferAmountMinor / 100} main wallet to delivery wallet fee transfer`;
        yield financialTransactionRepoT.save(creditFinancialTransaction);
        yield deliveryFeeWalletRepoT
            .createQueryBuilder()
            .update(DeliveryWalletFee_1.DeliveryFeeWallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor + ${totalTransferAmountMinor}`,
        })
            .where({ id: deliveryWalletFee.id })
            .execute();
        return true;
    }));
    return transferSuccess;
});
exports.mainWalletToDeliveryWalletTransfer = mainWalletToDeliveryWalletTransfer;
const saveDeliveryWalletFeeTransaction = (accountId, amountMajor, reference) => __awaiter(void 0, void 0, void 0, function* () {
    const totalAmountMinor = amountMajor * 100;
    const connection = yield (0, db_1.getFreshConnection)();
    const deliveryFeeWalletRepoT = connection.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
    const sourceDeliveryFeeWallet = yield deliveryFeeWalletRepoT.findOne({ accountId, });
    console.log(sourceDeliveryFeeWallet);
    const finalFinancialTransaction = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletBalanceMinorBefore = sourceDeliveryFeeWallet.walletBalanceMinor;
        const walletBalanceMinorAfter = sourceDeliveryFeeWallet.walletBalanceMinor - totalAmountMinor;
        const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeDeliveryFeeTransaction(sourceDeliveryFeeWallet, PaymentTransaction_1.PaymentTransactionTypes.WARE_HOUSE_TO_SITE_DELIVERY_PAYMENT, totalAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceDeliveryFeeWallet.currency ? sourceDeliveryFeeWallet.currency : 'NGN', PaymentTransaction_1.PaymentTransactionStatus.PAID, reference, undefined);
        financialTransaction.description = `${sourceDeliveryFeeWallet.currency}${totalAmountMinor / 100}  wallet payment for delivery fee`;
        yield financialTransactionRepoT.save(financialTransaction);
        //--
        yield deliveryFeeWalletRepoT
            .createQueryBuilder()
            .update(DeliveryWalletFee_1.DeliveryFeeWallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${totalAmountMinor}`,
        })
            .where({ id: sourceDeliveryFeeWallet.id })
            .execute();
        return financialTransaction;
    }));
    return finalFinancialTransaction;
});
exports.saveDeliveryWalletFeeTransaction = saveDeliveryWalletFeeTransaction;
//# sourceMappingURL=wareHouseWalletService.js.map