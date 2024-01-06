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
exports.cooperateUserDeliveryWalletDiscount = exports.afterNewUserIsCreated = exports.afterCooperateUserIsCreated = exports.saveNewUser = void 0;
const constants_1 = require("../constants");
const db_1 = require("../db");
const Account_1 = require("../entity/Account");
const Business_1 = require("../entity/Business");
const DeliveryWalletFee_1 = require("../entity/DeliveryWalletFee");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const MortageUser_1 = require("../entity/MortageUser");
const MortgageAccountVerification_1 = require("../entity/MortgageAccountVerification");
const PhoneVerification_1 = require("../entity/PhoneVerification");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const AccountType_1 = require("../enums/AccountType");
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
const Currency_1 = require("../enums/Currency");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Roles_1 = require("../enums/Roles");
const WalletType_1 = require("../enums/WalletType");
const SignupService = __importStar(require("../services/signupService"));
const SmsService = __importStar(require("../services/smsSendingService"));
const Utils = __importStar(require("../utils/core"));
const configPropertyService_1 = require("./configPropertyService");
const EmailService = __importStar(require("./emailService"));
const saveNewUser = (tempUserExist, msisdn, foundCountryName, checkPhoneVerifyCode) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserCreatedFromTemporaryOrder = !checkPhoneVerifyCode;
    const connection = yield (0, db_1.getFreshConnection)();
    const savedUser = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepoT = transactionalEntityManager.getRepository(User_1.User);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const accountRepoT = transactionalEntityManager.getRepository(Account_1.Account);
        const mortageUserRepoT = transactionalEntityManager.getRepository(MortageUser_1.MortageUser);
        const businessRepoT = transactionalEntityManager.getRepository(Business_1.Business);
        const deliveryWalletFeeRepoT = transactionalEntityManager.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
        const phoneVerifictionRepoT = transactionalEntityManager.getRepository(PhoneVerification_1.PhoneVerification);
        const mortgageAccountVerificationRepoT = transactionalEntityManager.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
        let newUser = new User_1.User().initialize(tempUserExist, msisdn, foundCountryName);
        newUser.createdFromTemporaryOrder = newUserCreatedFromTemporaryOrder;
        if (tempUserExist.defaultSellerUniqueCode) {
            const defaultSellerUser = yield userRepoT.findOne({
                uniqueCode: tempUserExist.defaultSellerUniqueCode,
            });
            if (defaultSellerUser) {
                newUser.defaultSellerUserId = defaultSellerUser.id;
            }
        }
        newUser = yield userRepoT.save(newUser);
        //--
        if (tempUserExist.isSeller) {
            const newSellerUserUniqueCode = yield SignupService.generateNewSellerCode(userRepoT, newUser);
            yield userRepoT
                .createQueryBuilder()
                .update(User_1.User)
                .set({ uniqueCode: newSellerUserUniqueCode })
                .where({ id: newUser.id })
                .execute();
        }
        const account = new Account_1.Account().initialize(newUser.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
        const userAccount = yield accountRepoT.save(account);
        yield userRepoT
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            accountId: userAccount.id,
        })
            .where({ id: newUser.id })
            .execute();
        const CurrencyEnum = Currency_1.CountryCodeToCurrency;
        const currency = CurrencyEnum[tempUserExist.countryIso2];
        const wallet = new Wallet_1.Wallet().initialize(newUser.id, userAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, currency);
        yield walletRepoT.save(wallet);
        if (checkPhoneVerifyCode) {
            yield phoneVerifictionRepoT
                .createQueryBuilder()
                .update(PhoneVerification_1.PhoneVerification)
                .set({ isVerified: true })
                .where({ id: checkPhoneVerifyCode.id })
                .execute();
        }
        if (newUser.isCooperate) {
            const deliveryWalletFee = new DeliveryWalletFee_1.DeliveryFeeWallet().initialize(newUser.id, userAccount.id, currency);
            yield deliveryWalletFeeRepoT.save(deliveryWalletFee);
        }
        if ([Roles_1.Roles.DEVELOPER, Roles_1.Roles.INVESTOR].includes(newUser.role)) {
            const mortageUser = new MortageUser_1.MortageUser().initialize(newUser.id, userAccount.id, newUser.role);
            yield mortageUserRepoT.save(mortageUser);
        }
        if (newUser.role === Roles_1.Roles.DEVELOPER) {
            const developerBusiness = new Business_1.Business().initialize(newUser.id, tempUserExist.companyName, tempUserExist.address, tempUserExist.cacNumber);
            yield businessRepoT.save(developerBusiness);
            yield userRepoT
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                companyName: tempUserExist.companyName,
                isDeveloper: true,
            })
                .where({ id: newUser.id })
                .execute();
            const mortgageAccountVerificationProccess = new MortgageAccountVerification_1.MortgageAccountVerification().initialize(newUser.id, Roles_1.Roles.DEVELOPER);
            yield mortgageAccountVerificationRepoT.save(mortgageAccountVerificationProccess);
            newUser.isDeveloper = true;
        }
        if (newUser.role === Roles_1.Roles.INVESTOR) {
            yield userRepoT
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                isInvestor: true,
            })
                .where({ id: newUser.id })
                .execute();
            newUser.isInvestor = true;
        }
        return newUser;
    }));
    if (!newUserCreatedFromTemporaryOrder) {
        yield (0, exports.afterNewUserIsCreated)(savedUser);
    }
    if (savedUser.isCooperate) {
        yield (0, exports.afterCooperateUserIsCreated)(savedUser);
        yield (0, exports.cooperateUserDeliveryWalletDiscount)(savedUser);
    }
    return savedUser;
});
exports.saveNewUser = saveNewUser;
const afterCooperateUserIsCreated = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const cooperateUserMailInfo = {
        email: newUser.emailAddress,
        firstName: newUser.firstName
    };
    const domain = Utils.serverDomain();
    const loginLink = `https://${domain}/login`;
    const smsMessage = `Hello (name), Welcome to Cinderbuild You now have access to Builder360 Check your
     registered email for more information or Login here> ${loginLink}`;
    const wasthisDelivered = yield SmsService.sendOtp(newUser.msisdn, smsMessage);
    const sendMail = yield EmailService.sendCooperateWelcomeMail(cooperateUserMailInfo);
    console.log('is mail sent', sendMail);
    return true;
});
exports.afterCooperateUserIsCreated = afterCooperateUserIsCreated;
const afterNewUserIsCreated = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userMailInfo = {
        email: newUser.emailAddress,
        firstName: newUser.firstName
    };
    if (newUser.emailAddress && newUser.role === Roles_1.Roles.NORMAL_USER) {
        const userMailInfo = {
            email: newUser.emailAddress,
            firstName: newUser.firstName
        };
        if (newUser.isSeller === true) {
            yield EmailService.sendWelcomeMailToSeller(userMailInfo);
            yield EmailService.howToShopMail(userMailInfo);
        }
        yield EmailService.sendWelcomeMail(userMailInfo);
    }
    if (newUser.emailAddress && newUser.role === Roles_1.Roles.AFFILIATE) {
        const affiliateUserMailInfo = {
            email: newUser.emailAddress,
            firstName: newUser.firstName
        };
        yield EmailService.AffiliateSendWelcomeMail(affiliateUserMailInfo);
        yield EmailService.howToShopMail(affiliateUserMailInfo);
    }
    yield EmailService.sendWelcomeMail(userMailInfo);
    return true;
});
exports.afterNewUserIsCreated = afterNewUserIsCreated;
const cooperateUserDeliveryWalletDiscount = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const shouldGiveDiscountToCooperateUser = yield (0, configPropertyService_1.getConfigProperty)(ConfigProperties_1.default.COOPERATE_ACCOUNT_DISCOUNT);
    if (!shouldGiveDiscountToCooperateUser) {
        return false;
    }
    const applyDiscount = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const deliveryWalletFeeRepoT = transactionalEntityManager.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
        const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
        const sourceWallet = yield deliveryWalletFeeRepoT.findOne({
            userId: newUser.id
        });
        const metadata = {};
        const walletBalanceMinorAfter = sourceWallet.walletBalanceMinor + constants_1.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT;
        const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initializeDeliveryFeeTransaction(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.COOPERATE_ACCOUNT_DISCOUNT, constants_1.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT, sourceWallet.walletBalanceMinor, walletBalanceMinorAfter, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
        financialTransaction.description = `${sourceWallet.currency}${constants_1.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT / 100} main wallet Discount Applied.`;
        yield financialTransactionRepoT.save(financialTransaction);
        yield deliveryWalletFeeRepoT.createQueryBuilder()
            .update(DeliveryWalletFee_1.DeliveryFeeWallet)
            .set({
            walletBalanceMinor: sourceWallet.walletBalanceMinor + financialTransaction.amountMinor,
        })
            .where({
            userId: financialTransaction.userId,
        })
            .execute();
        return true;
    }));
    // send discount mail
    if (constants_1.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT) {
        const emailContent = {
            email: newUser.emailAddress,
            firstName: newUser.firstName
        };
        yield EmailService.sendCooperateDiscountMail(emailContent);
    }
    return applyDiscount;
});
exports.cooperateUserDeliveryWalletDiscount = cooperateUserDeliveryWalletDiscount;
//# sourceMappingURL=onboardingService.js.map