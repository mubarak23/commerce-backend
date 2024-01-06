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
exports.processMortgageCardBalance = exports.processMonoDirectPayWebhook = exports.processDirectPayRequestviaMono = exports.activateMortgageCard = exports.fetchAllPan = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const db_1 = require("../db");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const MonoDirectPaySubscription_1 = require("../entity/MonoDirectPaySubscription");
const MonoDirectPayWebhook_1 = require("../entity/MonoDirectPayWebhook");
const MortgageCard_1 = require("../entity/MortgageCard");
const ProjectSubscription_1 = require("../entity/ProjectSubscription");
const ProjectSubscriptionTransaction_1 = require("../entity/ProjectSubscriptionTransaction");
const Wallet_1 = require("../entity/Wallet");
const Currency_1 = require("../enums/Currency");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const monoService = __importStar(require("./directDebitProvider/monoService"));
const EmailService = __importStar(require("./emailService"));
const ProfileService = __importStar(require("./profileService"));
const ProjectService = __importStar(require("./projectService"));
const SmsService = __importStar(require("./smsSendingService"));
const walletService = __importStar(require("./walletService"));
const fetchAllPan = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const MortgageCardRepo = connection.getRepository(MortgageCard_1.MortgageCard);
    const cards = yield MortgageCardRepo.find({
        where: { isUsed: false }
    });
    // if(cards && cards.length === 0 ){
    //   // pupulate the table with this demo pan 
    //    // Populate the table with demo PANs if no cards are found
    //    const demoPANs = [
    //     "8669-9241-1696-6400",
    //     "8669-9241-1696-6401",
    //     "8669-9241-1696-6402",
    //     "8669-9241-1696-6403",
    //     "8669-9241-1696-6404",
    //     "8669-9241-1696-6405",
    //     "8669-9241-1696-6406",
    //     "8669-9241-1696-6407",
    //     "8669-9241-1696-6408",
    //     "8669-9241-1696-6409",
    //     "8669-9241-1696-6410",
    //     "8669-9241-1696-6411",
    //     "8669-9241-1696-6412",
    //     "8669-9241-1696-6413",
    //     "8669-9241-1696-6414",
    //     "8669-9241-1696-6415",
    //     "8669-9241-1696-6416",
    //     "8669-9241-1696-6417",
    //     "8669-9241-1696-6418",
    //   ];
    //   for (const pan of demoPANs) {
    //     const newCard = new MortgageCard().initializePan(pan);
    //     // eslint-disable-next-line no-await-in-loop
    //     await MortgageCardRepo.save(newCard);
    //     cards.push(newCard);
    //   }
    //   cards = await MortgageCardRepo.find({
    //     where: { isUsed: false },
    //   });
    //   const mortgageCards: MortgageCardDto[] = cards.map((card) => ({
    //     pan: card.pan,
    //     isUsed: card.isUsed,
    //     isSoftDeleted: card.isSoftDeleted,
    //     createdAt: card.createdAt,
    //   }));
    //   return mortgageCards;
    // }
    const mortgageCards = cards.map((card) => ({
        pan: card.pan,
        isUsed: card.isUsed,
        isSoftDeleted: card.isSoftDeleted,
        createdAt: card.createdAt,
    }));
    return mortgageCards;
});
exports.fetchAllPan = fetchAllPan;
const activateMortgageCard = (user, pan) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const MortgageCardRepo = connection.getRepository(MortgageCard_1.MortgageCard);
    const cardPanUsed = yield MortgageCardRepo.findOne({
        where: { pan, isUsed: false, isActive: false, isSoftDeleted: false }
    });
    if (!cardPanUsed) {
        throw new error_response_types_1.UnprocessableEntityError("Mortgage Card Pan Number Does Not Exist");
    }
    if (!(cardPanUsed === null || cardPanUsed === void 0 ? void 0 : cardPanUsed.userId) == null) {
        throw new error_response_types_1.UnprocessableEntityError("Mortgage Card Pan Number Has Been Used");
    }
    const cardPanUser = yield MortgageCardRepo.findOne({
        where: { pan, userId: user.id, isUsed: true, isActive: true, isSoftDeleted: false }
    });
    if (cardPanUser) {
        throw new error_response_types_1.UnprocessableEntityError("User Has Already Activated the Mortgage Card");
    }
    yield MortgageCardRepo.createQueryBuilder()
        .update(MortgageCard_1.MortgageCard)
        .set({
        userId: user.id,
        isUsed: true,
        isActive: true,
        isSoftDeleted: false
    })
        .where({
        id: cardPanUsed.id
    })
        .execute();
    const developerCardDetail = yield MortgageCardRepo.findOne({
        where: { pan, userId: user.id, isUsed: true, isActive: true, isSoftDeleted: false }
    });
    const developerUserPublicProfile = yield ProfileService.getPublicMortageUserProfile(user);
    const developerCardDetails = {
        pan,
        developerUserPublicProfile,
        isUsed: developerCardDetail.isUsed,
        isActive: developerCardDetail.isActive,
        isSoftDeleted: developerCardDetail.isSoftDeleted,
        createdAt: developerCardDetail.createdAt
    };
    return developerCardDetails;
});
exports.activateMortgageCard = activateMortgageCard;
const processDirectPayRequestviaMono = (user, transaction, amountPaidMajor) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const MonoDirectPaySubscriptionRepo = connection.getRepository(MonoDirectPaySubscription_1.MonoDirectPaySubscription);
    const reference = Utils.generateUniqueReference(12);
    let amountPaidMinor;
    if (amountPaidMajor) {
        amountPaidMinor = (amountPaidMajor || 0) * 100;
    }
    else {
        // eslint-disable-next-line prefer-destructuring
        amountPaidMinor = transaction.amountPaidMinor;
    }
    const payload = {
        type: 'onetime-debit',
        amount: amountPaidMinor,
        description: `recurrent payment subscription - ${transaction.projectSubscriptionId}`,
        reference,
        redirectUrl: process.env.NODE_ENV === constants_1.ProductionEnv ? 'https://www.cinderbuild.com/' : 'https://cinderbuildfe-dev-no5tq.ondigitalocean.app/estate-managers/subscriber-projects',
    };
    const payingUser = {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
    };
    console.log('payingUser', payingUser);
    const newMonoDirectPaySubscription = new MonoDirectPaySubscription_1.MonoDirectPaySubscription().initializeDirectPayRequest(user.id, transaction.developerUserId, reference, transaction.id, transaction.uuid, payload);
    const saveMonoDirectPay = yield MonoDirectPaySubscriptionRepo.save(newMonoDirectPaySubscription);
    const requestPayment = yield monoService.initializeDirectPayment(payingUser, payload);
    yield MonoDirectPaySubscriptionRepo.createQueryBuilder()
        .update(MonoDirectPaySubscription_1.MonoDirectPaySubscription)
        .set({
        responseData: requestPayment,
        reference: requestPayment.reference
    })
        .where({
        id: saveMonoDirectPay.id
    })
        .execute();
    const smsMessage = `Your Project Subscription Payment, Approve it Using this link: ${requestPayment.paymentLink}`;
    // send approval link via sms
    yield SmsService.sendSms(user.msisdn, smsMessage);
    const userInfoMonoPaymentLinkRequest = {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        paymentLink: requestPayment.paymentLink
    };
    // send mail to user with payment approval link 
    yield EmailService.sendMonoPaymentApprovalLink(userInfoMonoPaymentLinkRequest);
    return requestPayment;
});
exports.processDirectPayRequestviaMono = processDirectPayRequestviaMono;
// developer: User, reference: string, monoDirectPaySubscription: MonoDirectPaySubscription
const processMonoDirectPayWebhook = (webhookResponseData) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const monoDirectPaySubscriptionRepo = connection.getRepository(MonoDirectPaySubscription_1.MonoDirectPaySubscription);
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const monoDirectPayWebhooksRepo = connection.getRepository(MonoDirectPayWebhook_1.MonoDirectPayWebhooks);
    const monoDirectPaySubscription = yield monoDirectPaySubscriptionRepo.findOne({
        where: { reference: webhookResponseData.reference }
    });
    if (!monoDirectPaySubscription) {
        return false;
    }
    // if thw webhook has been use 
    const monWebhookExist = yield monoDirectPayWebhooksRepo.findOne({
        where: { reference: monoDirectPaySubscription.reference, isUsed: true }
    });
    if (monWebhookExist) {
        return false;
    }
    const join = {
        alias: "project_susbscription_transactions",
        leftJoinAndSelect: {
            projectSubscription: "project_susbscription_transactions.projectSubscription",
            project: "project_susbscription_transactions.project",
            developer: "project_susbscription_transactions.developer",
            investor: "project_susbscription_transactions.investor",
        },
    };
    const projectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
        where: { id: monoDirectPaySubscription.projectSubscriptionTransactionId, investorUserId: monoDirectPaySubscription.investorUserId, isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID },
        join
    });
    if (!projectSubscriptionTransaction) {
        return false;
    }
    const paymentAmountminor = webhookResponseData.amount;
    const { description } = webhookResponseData;
    const developerWallet = yield walletService.getCustomerWallet(projectSubscriptionTransaction.developerUserId);
    const projectSubscriptionTransactionSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
        const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription_1.ProjectSubscription);
        const monoDirectPaySubscriptionT = connection.getRepository(MonoDirectPaySubscription_1.MonoDirectPaySubscription);
        const monoDirectPayWebhooksT = connection.getRepository(MonoDirectPayWebhook_1.MonoDirectPayWebhooks);
        // update mono direct pay subscription using the reference to success, 
        yield monoDirectPaySubscriptionT
            .createQueryBuilder()
            .update(MonoDirectPaySubscription_1.MonoDirectPaySubscription)
            .set({
            responseData: webhookResponseData,
        })
            .where({ id: monoDirectPaySubscription.id })
            .execute();
        // store webhook response from mono for success
        const newMonoDirectPayWebhooks = new MonoDirectPayWebhook_1.MonoDirectPayWebhooks().initializeDirectPayWebHookResponse(monoDirectPaySubscription.reference, webhookResponseData.status, webhookResponseData.event, webhookResponseData);
        yield monoDirectPayWebhooksT.save(newMonoDirectPayWebhooks);
        // mark as used
        yield monoDirectPayWebhooksT
            .createQueryBuilder()
            .update(MonoDirectPayWebhook_1.MonoDirectPayWebhooks)
            .set({
            isUsed: true,
        })
            .where({ id: newMonoDirectPayWebhooks.id })
            .execute();
        // Pay the developer into his wallet
        const metadata = {
            projectSubscriptionUuid: projectSubscriptionTransaction.projectSubscription.uuid,
        };
        const developerWalletBalanceMinorBefore = developerWallet.walletBalanceMinor;
        const developerWalletBalanceMinorAfter = developerWallet.walletBalanceMinor + paymentAmountminor;
        const creditFinancialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(developerWallet, PaymentTransaction_1.PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT, paymentAmountminor, developerWalletBalanceMinorBefore, developerWalletBalanceMinorAfter, developerWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        creditFinancialTransaction.description =
            description ||
                `${developerWallet.currency}${paymentAmountminor / 100} Recurrent Susbscription Payment for Date: ${projectSubscriptionTransaction.nextPaymentDate}`;
        yield financialTransactionRepoT.save(creditFinancialTransaction);
        // credit developer wallet
        yield walletRepoT
            .createQueryBuilder()
            .update(Wallet_1.Wallet)
            .set({
            walletBalanceMinor: () => `wallet_balance_minor + ${paymentAmountminor}`,
        })
            .where({ id: developerWallet.id })
            .execute();
        // Update  recurrent transaction to paid and update the amount paid
        const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
        console.log('amountBeforeMinor before updating amountAfterMinor', amountBeforeMinor);
        console.log('paymentAmountminor', paymentAmountminor);
        const amountAfterMinor = (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        console.log('amountAfterMinor', amountAfterMinor);
        const totalSubscriptionAmount = parseFloat((projectSubscriptionTransaction.projectSubscription.numberOfSlots * projectSubscriptionTransaction.project.costPerSlot).toFixed(2));
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
            .where({ id: projectSubscriptionTransaction.id })
            .execute();
        // update investor subscription remaining balance
        const now = Utils.utcNow();
        projectSubscriptionTransaction.projectSubscription.subscriptionPaymentHistory.push({
            transactionReference: projectSubscriptionTransaction.uuid,
            dateTimeInISO8601: now.toISOString()
        });
        const amountRemainingMinor = (projectSubscriptionTransaction.projectSubscription.amountRemainingMinor - paymentAmountminor);
        const amountPerPaymentPlanDurationMinor = amountRemainingMinor / projectSubscriptionTransaction.project.duration;
        yield projectSubscriptionT
            .createQueryBuilder()
            .update(ProjectSubscription_1.ProjectSubscription)
            .set({
            subscriptionPaymentHistory: projectSubscriptionTransaction.projectSubscription.subscriptionPaymentHistory,
            amountRemainingMinor,
            amountPerPaymentPlanDurationMinor,
            amountPaidMinor: (projectSubscriptionTransaction.projectSubscription.amountPaidMinor + paymentAmountminor)
        })
            .where({ id: projectSubscriptionTransaction.projectSubscription.id, investorUserId: projectSubscriptionTransaction.investorUserId })
            .execute();
        return true;
    }));
    const paidProjectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
        where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscriptionId, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
        join
    });
    const projectSubscriptionTransactionSoFar = yield projectSubscriptionTransactionRepo.find({
        where: { projectSubscriptionId: projectSubscriptionTransaction.projectSubscriptionId, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID }
    });
    const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;
    const durationLeft = paidProjectSubscriptionTransaction.projectSubscription.durationLeft - 1;
    console.log('durationLeft', durationLeft);
    yield ProjectService.updateProjectSubscriptionDuration(paidProjectSubscriptionTransaction.projectSubscription, paidProjectSubscriptionTransaction.investor, durationLeft);
    // Call the next recurrent subscription 
    yield ProjectService.nextPendingRecurrentPayment(projectSubscriptionTransaction.projectSubscription, projectSubscriptionTransaction.project, projectSubscriptionTransaction.investor, projectSubscriptionTransaction.developer, paidProjectSubscriptionTransaction, durationPaymentCovered);
    // inside DB transaction
    // update mono direct pay subscription using the reference to success, 
    // store webhook response from mono 
    // Update  recurrent transaction to paid and update the amount paid and remaining amount on the investor subscription,
    // update investor subscription remaining balance
    // Pay the developer into his wallet
    // Call the next recurrent subscription 
    return projectSubscriptionTransactionSuccess;
});
exports.processMonoDirectPayWebhook = processMonoDirectPayWebhook;
const processMortgageCardBalance = (developer) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const MortgageCardRepo = connection.getRepository(MortgageCard_1.MortgageCard);
    yield ProjectService.isUserADeveloper(developer.id);
    const developerMortgageCard = yield MortgageCardRepo.findOne({
        where: { userId: developer.id, isUsed: true, isActive: true, isSoftDeleted: false }
    });
    if (!developerMortgageCard) {
        throw new error_response_types_1.UnprocessableEntityError('No Active Mortgage Card at the Moment');
    }
    const wallet = yield walletService.getCustomerWallet(developerMortgageCard.userId);
    const CurrencyEnum = Currency_1.CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[(_a = wallet.currency) !== null && _a !== void 0 ? _a : 'NGN'] || '₦';
    const join = {
        alias: "project_susbscription_transactions",
        leftJoinAndSelect: {
            projectSubscription: "project_susbscription_transactions.projectSubscription",
            project: "project_susbscription_transactions.project",
            developer: "project_susbscription_transactions.developer",
            investor: "project_susbscription_transactions.investor",
        },
    };
    const projectSubscriptionTransactions = yield projectSubscriptionTransactionRepo.find({
        where: { developerUserId: developerMortgageCard.userId, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
        join
    });
    if (!projectSubscriptionTransactions) {
        const mortgageCardWithBalance = {
            pan: developerMortgageCard.pan,
            currency: (_b = wallet.currency) !== null && _b !== void 0 ? _b : 'NGN',
            currencySymbol,
            amountMajor: 0.00,
            isUsed: developerMortgageCard.isUsed,
            isActive: developerMortgageCard.isActive,
            isSoftDeleted: developerMortgageCard.isSoftDeleted,
            createdAt: developerMortgageCard.createdAt
        };
        return mortgageCardWithBalance;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    // console.log('currentMonth', currentMonth)
    const filteredTransactions = projectSubscriptionTransactions.filter((transaction) => {
        const nextPaymentDate = new Date(transaction.nextPaymentDate);
        const transactionMonth = nextPaymentDate.getMonth();
        const transactionYear = nextPaymentDate.getFullYear();
        //  console.log('transactionMonth', transactionMonth)
        return transactionMonth === currentMonth && transactionYear === currentYear;
    });
    if (filteredTransactions.length === 0) {
        const mortgageCardWithBalance = {
            pan: developerMortgageCard.pan,
            currency: (_c = wallet.currency) !== null && _c !== void 0 ? _c : 'NGN',
            currencySymbol,
            amountMajor: 0.00,
            isUsed: developerMortgageCard.isUsed,
            isActive: developerMortgageCard.isActive,
            isSoftDeleted: developerMortgageCard.isSoftDeleted,
            createdAt: developerMortgageCard.createdAt
        };
        return mortgageCardWithBalance;
    }
    const investorUserIds = filteredTransactions.map(investor => investor.investorUserId);
    const UnpaidProjectSubscriptionTransactions = yield projectSubscriptionTransactionRepo.find({
        where: { developerUserId: developerMortgageCard.userId, investorUserId: (0, typeorm_1.In)(investorUserIds), isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID },
        join
    });
    if (UnpaidProjectSubscriptionTransactions.length === 0) {
        const mortgageCardWithBalance = {
            pan: developerMortgageCard.pan,
            currency: (_d = wallet.currency) !== null && _d !== void 0 ? _d : 'NGN',
            currencySymbol,
            amountMajor: 0.00,
            isUsed: developerMortgageCard.isUsed,
            isActive: developerMortgageCard.isActive,
            isSoftDeleted: developerMortgageCard.isSoftDeleted,
            createdAt: developerMortgageCard.createdAt
        };
        return mortgageCardWithBalance;
    }
    const nextPaymentMonth = Utils.nextPaymentDate30days(currentDate.toISOString());
    const filteredUnpaidTransactions = projectSubscriptionTransactions.filter((transaction) => {
        const nextPaymentDate = new Date(transaction.nextPaymentDate);
        const transactionMonth = nextPaymentDate.getMonth();
        //  console.log('transactionMonth', transactionMonth)
        return transactionMonth === nextPaymentMonth;
    });
    if (filteredUnpaidTransactions.length === 0) {
        const mortgageCardWithBalance = {
            pan: developerMortgageCard.pan,
            currency: (_e = wallet.currency) !== null && _e !== void 0 ? _e : 'NGN',
            currencySymbol,
            amountMajor: 0.00,
            isUsed: developerMortgageCard.isUsed,
            isActive: developerMortgageCard.isActive,
            isSoftDeleted: developerMortgageCard.isSoftDeleted,
            createdAt: developerMortgageCard.createdAt
        };
        return mortgageCardWithBalance;
    }
    const mortgageCardBalanceMinor = filteredUnpaidTransactions.reduce((acc, { amountPaidMinor }) => acc + amountPaidMinor, 0);
    const mortgageCardBalanceMajor = (mortgageCardBalanceMinor || 0) / 100;
    const mortgageCardWithBalance = {
        pan: developerMortgageCard.pan,
        currency: (_f = wallet.currency) !== null && _f !== void 0 ? _f : 'NGN',
        currencySymbol,
        amountMajor: mortgageCardBalanceMajor,
        isUsed: developerMortgageCard.isUsed,
        isActive: developerMortgageCard.isActive,
        isSoftDeleted: developerMortgageCard.isSoftDeleted,
        createdAt: developerMortgageCard.createdAt
    };
    return mortgageCardWithBalance;
});
exports.processMortgageCardBalance = processMortgageCardBalance;
//# sourceMappingURL=mortgageCardService.js.map