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
exports.saveDeliveryWalletFeeTransaction = exports.mainWalletToDeliveryWalletTransfer = exports.getCustomerDeliveryWallet = exports.projectSubscriptionPaymentViaWallet = exports.payRecurrentSubscriptionAmountViaWallet = exports.walletToWalletTransfer = exports.saveWithdrawalTransaction = exports.getCinderbuildRevenueWallet = exports.getSecondaryCustomerWallet = exports.cstoreUserWalletbalance = exports.getCustomerWallet = void 0;
const constants_1 = require("../constants");
const db_1 = require("../db");
const Account_1 = require("../entity/Account");
const DeliveryWalletFee_1 = require("../entity/DeliveryWalletFee");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const ProjectSubscription_1 = require("../entity/ProjectSubscription");
const ProjectSubscriptionTransaction_1 = require("../entity/ProjectSubscriptionTransaction");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const WalletToWalletTransfer_1 = require("../entity/WalletToWalletTransfer");
const AccountType_1 = require("../enums/AccountType");
const Currency_1 = require("../enums/Currency");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const WalletType_1 = require("../enums/WalletType");
const countries_states_json_1 = __importDefault(require("../resources/countries+states.json"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const getCustomerWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const walletRepo = connection.getRepository(Wallet_1.Wallet);
    let sourceWallet = yield walletRepo.findOne({
        userId,
        type: WalletType_1.WalletType.CUSTOMER_WALLET,
    });
    if (!sourceWallet) {
        const userRepo = connection.getRepository(User_1.User);
        const accountRepo = connection.getRepository(Account_1.Account);
        const user = yield userRepo.findOne({ id: userId });
        const foundCountry = countries_states_json_1.default.find((countryItem) => countryItem.name === (user === null || user === void 0 ? void 0 : user.countryLongName));
        let userAccount = yield accountRepo.findOne({ primaryUserId: userId });
        if (!userAccount) {
            const newAccount = new Account_1.Account().initialize(userId, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
            userAccount = yield accountRepo.save(newAccount);
        }
        const accountWallet = new Wallet_1.Wallet().initialize(userId, userAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, (foundCountry === null || foundCountry === void 0 ? void 0 : foundCountry.currency) || Currency_1.CountryToCurrency.NIGERIA);
        sourceWallet = yield walletRepo.save(accountWallet);
    }
    return sourceWallet;
});
exports.getCustomerWallet = getCustomerWallet;
const cstoreUserWalletbalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userWallet = yield (0, exports.getCustomerWallet)(userId);
    const userWalletBlanaceMajor = userWallet.walletBalanceMinor * 100;
    if (userWalletBlanaceMajor > 200000) {
        throw new error_response_types_1.UnprocessableEntityError(`Please Pay For the Previous Order Before Placing Another One`);
    }
    return true;
});
exports.cstoreUserWalletbalance = cstoreUserWalletbalance;
const getSecondaryCustomerWallet = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const secondaryWalletRepo = connection.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
    const sourceWallet = yield secondaryWalletRepo.findOne({
        accountId,
        type: WalletType_1.WalletType.CUSTOMER_WALLET,
    });
    if (!sourceWallet) {
        throw new error_response_types_1.UnprocessableEntityError('User Does Not have Secondary Wallet');
    }
    return sourceWallet;
});
exports.getSecondaryCustomerWallet = getSecondaryCustomerWallet;
const getCinderbuildRevenueWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const walletRepo = connection.getRepository(Wallet_1.Wallet);
    let sourceAccountWallet = yield walletRepo.findOne({
        type: WalletType_1.WalletType.CINDERBUILD_WALLET,
    });
    if (!sourceAccountWallet) {
        const wallet = new Wallet_1.Wallet().initialize(constants_1.CINDERBUILD_REVENUE_USER, constants_1.CINDERBUILD_REVENUE_ACCOUNT, WalletType_1.WalletType.CINDERBUILD_WALLET, Currency_1.CountryToCurrency.NIGERIA);
        sourceAccountWallet = yield walletRepo.save(wallet);
    }
    return sourceAccountWallet;
});
exports.getCinderbuildRevenueWallet = getCinderbuildRevenueWallet;
const saveWithdrawalTransaction = (sourceWallet, amountMinor, isPaidStatus, reference) => __awaiter(void 0, void 0, void 0, function* () {
    const totalAmountMinor = amountMinor;
    const connection = yield (0, db_1.getFreshConnection)();
    const finalFinancialTransaction = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
        const walletBalanceMinorAfter = sourceWallet.walletBalanceMinor - totalAmountMinor;
        const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.WALLET_FUNDS_WITHDRAWAL, totalAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceWallet.currency, isPaidStatus, reference, undefined);
        financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} funds withdrawal`;
        yield financialTransactionRepoT.save(financialTransaction);
        //--
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${totalAmountMinor}`,
        })
            .where({ id: sourceWallet.id })
            .execute();
        return financialTransaction;
    }));
    return finalFinancialTransaction;
});
exports.saveWithdrawalTransaction = saveWithdrawalTransaction;
const walletToWalletTransfer = (adminUserId, senderUserId, receiverUserId, totalTransferAmountMinor, description) => __awaiter(void 0, void 0, void 0, function* () {
    const senderWallet = yield (0, exports.getCustomerWallet)(senderUserId);
    const receiverWallet = yield (0, exports.getCustomerWallet)(receiverUserId);
    if (senderWallet.walletBalanceMinor < totalTransferAmountMinor) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process this transfer');
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const transferSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const walletToWalletTransferRepoT = transactionalEntityManager.getRepository(WalletToWalletTransfer_1.WalletToWalletTransfer);
        const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
        const walletBalanceMinorAfter = senderWallet.walletBalanceMinor - totalTransferAmountMinor;
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(senderWallet, PaymentTransaction_1.PaymentTransactionTypes.WALLET_FUNDS_TRANSFER, totalTransferAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, senderWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        debitFinancialTransaction.description =
            description ||
                `${senderWallet.currency}${totalTransferAmountMinor / 100} reconciliation funds transfer `;
        yield financialTransactionRepoT.save(debitFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${totalTransferAmountMinor}`,
        })
            .where({ id: senderWallet.id })
            .execute();
        const creditWalletBalanceMinorBefore = receiverWallet.walletBalanceMinor;
        const creditWalletBalanceMinorAfter = receiverWallet.walletBalanceMinor + totalTransferAmountMinor;
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(receiverWallet, PaymentTransaction_1.PaymentTransactionTypes.WALLET_FUNDS_TRANSFER, totalTransferAmountMinor, creditWalletBalanceMinorBefore, creditWalletBalanceMinorAfter, senderWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        creditFinancialTransaction.description =
            description ||
                `${senderWallet.currency}${totalTransferAmountMinor / 100} reconciliation funds transfer`;
        yield financialTransactionRepoT.save(creditFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor + ${totalTransferAmountMinor}`,
        })
            .where({ id: receiverWallet.id })
            .execute();
        const successfulWalletToWalletTransfer = new WalletToWalletTransfer_1.WalletToWalletTransfer().initialize(adminUserId, senderUserId, receiverUserId, totalTransferAmountMinor / 100, description !== null && description !== void 0 ? description : '');
        yield walletToWalletTransferRepoT.save(successfulWalletToWalletTransfer);
        return true;
    }));
    return transferSuccess;
});
exports.walletToWalletTransfer = walletToWalletTransfer;
const payRecurrentSubscriptionAmountViaWallet = (projectSubscriptionTransaction, projectSubscription, developerUserId, investorUserId, totalCostPayment, description) => __awaiter(void 0, void 0, void 0, function* () {
    const investorWallet = yield (0, exports.getCustomerWallet)(investorUserId);
    const developerWallet = yield (0, exports.getCustomerWallet)(developerUserId);
    // totalCostPayment
    //  const paymentAmountminor = projectSubscriptionTransaction.amountPaidMinor
    const paymentAmountminor = parseFloat((totalCostPayment * 100).toFixed(2));
    if (investorWallet.walletBalanceMinor < 0) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process this Project Subscription');
    }
    if (investorWallet.walletBalanceMinor < paymentAmountminor) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process this Project Subscription');
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
        const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription_1.ProjectSubscription);
        const investorWalletBalanceMinorBefore = investorWallet.walletBalanceMinor;
        const investorWalletBalanceMinorAfter = investorWallet.walletBalanceMinor - paymentAmountminor;
        const metadata = {
            projectSubscriptionUuid: projectSubscription.uuid,
        };
        // debit investor 
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(investorWallet, PaymentTransaction_1.PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT, paymentAmountminor, investorWalletBalanceMinorBefore, investorWalletBalanceMinorAfter, investorWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        debitFinancialTransaction.description =
            description ||
                `${investorWallet.currency}${paymentAmountminor / 100} Recurrent Susbscription Payment Deduction For Date: ${projectSubscriptionTransaction.nextPaymentDate}`;
        yield financialTransactionRepoT.save(debitFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${paymentAmountminor}`,
        })
            .where({ id: investorWallet.id })
            .execute();
        // credit developer wallet
        const developerWalletBalanceMinorBefore = developerWallet.walletBalanceMinor;
        const developerWalletBalanceMinorAfter = developerWallet.walletBalanceMinor + paymentAmountminor;
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(developerWallet, PaymentTransaction_1.PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT, paymentAmountminor, developerWalletBalanceMinorBefore, developerWalletBalanceMinorAfter, developerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        creditFinancialTransaction.description =
            description ||
                `${developerWallet.currency}${paymentAmountminor / 100} Recurrent Susbscription Payment for Date: ${projectSubscriptionTransaction.nextPaymentDate}`;
        yield financialTransactionRepoT.save(creditFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor + ${paymentAmountminor}`,
        })
            .where({ id: developerWallet.id })
            .execute();
        const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
        console.log('amountBeforeMinor before updating amountAfterMinor', amountBeforeMinor);
        console.log('paymentAmountminor', paymentAmountminor);
        //  const amountAfterMinor =  (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        const amountAfterMinor = (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        console.log('amountAfterMinor', amountAfterMinor);
        const totalSubscriptionAmount = parseFloat((projectSubscription.numberOfSlots * projectSubscriptionTransaction.project.costPerSlot).toFixed(2));
        yield projectSubscriptionTransactionRepoT
            .createQueryBuilder()
            .update(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction)
            .set({
            financialTransactionId: creditFinancialTransaction.id,
            amountPaidMinor: paymentAmountminor,
            amountAfterMinor,
            amountRemainingMinor: ((totalSubscriptionAmount * 100) - amountAfterMinor),
            isPaid: true,
            paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID,
            updatedAt: Utils.utcNow()
        })
            .where({ id: projectSubscriptionTransaction.id, investorUserId: projectSubscriptionTransaction.investorUserId })
            .execute();
        const now = Utils.utcNow();
        projectSubscription.subscriptionPaymentHistory.push({
            transactionReference: projectSubscriptionTransaction.uuid,
            dateTimeInISO8601: now.toISOString()
        });
        const amountRemainingMinor = (projectSubscription.amountRemainingMinor - paymentAmountminor);
        const amountPerPaymentPlanDurationMinor = amountRemainingMinor / projectSubscriptionTransaction.project.duration;
        yield projectSubscriptionT
            .createQueryBuilder()
            .update(ProjectSubscription_1.ProjectSubscription)
            .set({
            subscriptionPaymentHistory: projectSubscription.subscriptionPaymentHistory,
            amountRemainingMinor,
            amountPerPaymentPlanDurationMinor,
            amountPaidMinor: (projectSubscription.amountPaidMinor + paymentAmountminor)
        })
            .where({ id: projectSubscription.id })
            .execute();
        return true;
    }));
    return projectSubscriptionSuccess;
});
exports.payRecurrentSubscriptionAmountViaWallet = payRecurrentSubscriptionAmountViaWallet;
const projectSubscriptionPaymentViaWallet = (projectId, projectSubscriptionId, developerUserId, investorUserId, paymentAmountmajor, amountRemainingMajor, projectSubscription, project, description) => __awaiter(void 0, void 0, void 0, function* () {
    const investorWallet = yield (0, exports.getCustomerWallet)(investorUserId);
    const developerWallet = yield (0, exports.getCustomerWallet)(developerUserId);
    const paymentAmountminor = paymentAmountmajor * 100;
    if (investorWallet.walletBalanceMinor < 0) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process this Project Subscription');
    }
    if (investorWallet.walletBalanceMinor < paymentAmountminor) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process this Project Subscription');
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
        const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription_1.ProjectSubscription);
        const investorWalletBalanceMinorBefore = investorWallet.walletBalanceMinor;
        const investorWalletBalanceMinorAfter = investorWallet.walletBalanceMinor - paymentAmountminor;
        // debit investor 
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(investorWallet, PaymentTransaction_1.PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT, paymentAmountminor, investorWalletBalanceMinorBefore, investorWalletBalanceMinorAfter, investorWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        debitFinancialTransaction.description =
            description ||
                `${investorWallet.currency}${paymentAmountminor / 100} project susbscription payment `;
        yield financialTransactionRepoT.save(debitFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor - ${paymentAmountminor}`,
        })
            .where({ id: investorWallet.id })
            .execute();
        // credit developer wallet
        const developerWalletBalanceMinorBefore = developerWallet.walletBalanceMinor;
        const developerWalletBalanceMinorAfter = developerWallet.walletBalanceMinor + paymentAmountminor;
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(developerWallet, PaymentTransaction_1.PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT, paymentAmountminor, developerWalletBalanceMinorBefore, developerWalletBalanceMinorAfter, developerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
        creditFinancialTransaction.description =
            description ||
                `${developerWallet.currency}${paymentAmountminor / 100} project susbscription payment`;
        yield financialTransactionRepoT.save(creditFinancialTransaction);
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor + ${paymentAmountminor}`,
        })
            .where({ id: developerWallet.id })
            .execute();
        const nextPaymentDate = (new Date()).toISOString();
        // PROCESS PROJECT SUBSCRIPTION TRANSACTION 
        const projectSubscriptionPaymentTransaction = {
            investorUserId,
            developerUserId,
            projectId,
            projectSubscriptionId,
            amountBeforeMinor: 0,
            amountPaidMinor: paymentAmountminor,
            amountAfterMinor: paymentAmountminor,
            amountRemainingMinor: amountRemainingMajor * 100,
            financialTransactionId: creditFinancialTransaction.id,
            description: 'Initial project subscription payment',
            paymentPlanDurationNumber: 0,
            nextPaymentDate,
        };
        const recordProjectSubscriptionTransaction = new ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction);
        yield projectSubscriptionTransactionRepoT.save(recordProjectSubscriptionTransaction);
        yield projectSubscriptionTransactionRepoT
            .createQueryBuilder()
            .update(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction)
            .set({
            isPaid: true,
            paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
        })
            .where({ id: recordProjectSubscriptionTransaction.id })
            .execute();
        const now = Utils.utcNow();
        projectSubscription.subscriptionPaymentHistory.push({
            transactionReference: recordProjectSubscriptionTransaction.uuid,
            dateTimeInISO8601: now.toISOString()
        });
        const totalSubscriptionAmount = parseFloat((projectSubscription.numberOfSlots * project.costPerSlot).toFixed(2));
        const amountRemainingMinor = ((totalSubscriptionAmount * 100) - paymentAmountminor);
        const amountPerPaymentPlanDurationMinor = amountRemainingMinor / project.duration;
        yield projectSubscriptionT
            .createQueryBuilder()
            .update(ProjectSubscription_1.ProjectSubscription)
            .set({
            subscriptionPaymentHistory: projectSubscription.subscriptionPaymentHistory,
            amountRemainingMinor,
            amountPerPaymentPlanDurationMinor
        })
            .where({ id: projectSubscription.id })
            .execute();
        return true;
    }));
    return projectSubscriptionSuccess;
});
exports.projectSubscriptionPaymentViaWallet = projectSubscriptionPaymentViaWallet;
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
const mainWalletToDeliveryWalletTransfer = (currentUser, totalTransferAmountMinor) => __awaiter(void 0, void 0, void 0, function* () {
    const senderWallet = yield (0, exports.getCustomerWallet)(currentUser.id);
    const deliveryWalletFee = yield (0, exports.getCustomerDeliveryWallet)(currentUser.accountId);
    const connection = yield (0, db_1.getFreshConnection)();
    const transferSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const deliveryFeeWalletRepoT = transactionalEntityManager.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
        const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
        const walletBalanceMinorAfter = senderWallet.walletBalanceMinor - totalTransferAmountMinor;
        const debitFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(senderWallet, PaymentTransaction_1.PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER, totalTransferAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, senderWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
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
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeDeliveryFeeTransaction(deliveryWalletFee, PaymentTransaction_1.PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER, totalTransferAmountMinor, creditDeliveryWalletBalanceMinorBefore, creditDeliveryWalletBalanceMinorAfter, deliveryWalletFee.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, undefined);
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
    const sourceDeliveryFeeWallet = yield (0, exports.getSecondaryCustomerWallet)(accountId);
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
//# sourceMappingURL=walletService.js.map