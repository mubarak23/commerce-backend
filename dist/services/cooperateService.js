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
exports.isWareHouseAccount = exports.isCooperateAccount = exports.processOrdertoWareHouse = exports.addnewUserToCooperateAccount = exports.addExistingUserToCooperateAccount = void 0;
/* eslint-disable no-await-in-loop */
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const db_1 = require("../db");
const Account_1 = require("../entity/Account");
const Order_1 = require("../entity/Order");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const WareHouse_1 = require("../entity/WareHouse");
const WareHouseProductOrderHistory_1 = require("../entity/WareHouseProductOrderHistory");
const WareHouseProductPurchase_1 = require("../entity/WareHouseProductPurchase");
const AccountType_1 = require("../enums/AccountType");
const CooperateUserRole_1 = require("../enums/CooperateUserRole");
const Currency_1 = require("../enums/Currency");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const WalletType_1 = require("../enums/WalletType");
const emailService = __importStar(require("../services/emailService"));
const NotificationService = __importStar(require("../services/notificationService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const addExistingUserToCooperateAccount = (cooperateUser, existingUser, role, wareHouseId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepoT = connection.getRepository(User_1.User);
    const accountRepoT = connection.getRepository(Account_1.Account);
    const existingUserAccount = yield accountRepoT.findOne({ primaryUserId: existingUser.id });
    if (existingUserAccount.id !== existingUser.accountId) {
        throw new error_response_types_1.UnprocessableEntityError('The User Has Already Been Added to Another Cooperate Account');
    }
    const updateQuery = {
        accountId: cooperateUser.accountId,
        isCooperate: true,
        companyName: (_a = cooperateUser.companyName) !== null && _a !== void 0 ? _a : null,
        wareHouseId: wareHouseId !== null && wareHouseId !== void 0 ? wareHouseId : null
    };
    yield userRepoT.createQueryBuilder()
        .update(User_1.User)
        .set(updateQuery)
        .where({ id: existingUser.id })
        .execute();
    const notificationTitle = `${(0, CooperateUserRole_1.displayCorporateUserRole)(role)} role user added`;
    const notificationBody = [
        `Cooperate user [${(_b = cooperateUser.firstName) !== null && _b !== void 0 ? _b : ''}]`,
        `has added you as an ${(0, CooperateUserRole_1.displayCorporateUserRole)(role)} user on CinderBuild`
    ].join('');
    const notificationMetadata = {
        userId: existingUser.id,
        cooperateUserRole: role,
    };
    const notificationMessageType = role === CooperateUserRole_1.CooperateUserRole.ACCOUNT_LEVEL ?
        NotificationMessageTypes_1.default.NEW_ACCOUNT_LEVEL_USER_ADDED :
        NotificationMessageTypes_1.default.NEW_WAREHOUSE_LEVEL_USER_ADDED;
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true
    };
    yield NotificationService.sendSingleNotificationToUserId(existingUser.id, existingUser.uuid, notificationMessageType, notificationTitle, notificationBody, notificationTransports, notificationMetadata);
    return true;
});
exports.addExistingUserToCooperateAccount = addExistingUserToCooperateAccount;
const addnewUserToCooperateAccount = (cooperateUser, requestPayload, wareHouseId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    let { phoneNumber } = requestPayload;
    const { firstName, lastName, emailAddress, role } = requestPayload;
    if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.substring(1);
    }
    const awesomePhoneNumber = new awesome_phonenumber_1.default(phoneNumber, "NG");
    const msisdn = awesomePhoneNumber.getNumber();
    const randomNumericPassword = Utils.generateOtp(6);
    const passwordHash = yield Utils.generatePasswordHash(randomNumericPassword);
    const savedUser = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userRepoT = transactionalEntityManager.getRepository(User_1.User);
        const walletRepoT = transactionalEntityManager.getRepository(Wallet_1.Wallet);
        const accountRepoT = transactionalEntityManager.getRepository(Account_1.Account);
        let newUser = new User_1.User().initializeNewCooperateUser(firstName !== null && firstName !== void 0 ? firstName : '', lastName !== null && lastName !== void 0 ? lastName : '', phoneNumber, msisdn, emailAddress, passwordHash);
        newUser = yield userRepoT.save(newUser);
        const account = new Account_1.Account().initialize(newUser.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
        const newAccount = yield accountRepoT.save(account);
        const CurrencyEnum = Currency_1.CountryCodeToCurrency;
        const currency = CurrencyEnum[newUser.countryIso2];
        const wallet = new Wallet_1.Wallet().initialize(newUser.id, newAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, currency);
        yield walletRepoT.save(wallet);
        const updateQuery = {
            accountId: cooperateUser.accountId,
            isCooperate: true,
            companyName: (_c = cooperateUser.companyName) !== null && _c !== void 0 ? _c : null,
            wareHouseId: wareHouseId !== null && wareHouseId !== void 0 ? wareHouseId : null
        };
        yield userRepoT.createQueryBuilder()
            .update(User_1.User)
            .set(updateQuery)
            .where({ id: newUser.id })
            .execute();
        return true;
    }));
    const newMailData = {
        email: requestPayload.emailAddress,
        firstName: requestPayload.firstName,
        phoneNumber: requestPayload.phoneNumber,
        role: requestPayload.role,
    };
    yield emailService.sendWelcomeMailToCooperateUser(newMailData, randomNumericPassword);
    return true;
});
exports.addnewUserToCooperateAccount = addnewUserToCooperateAccount;
const processOrdertoWareHouse = (currentUser, orders, wareHouse) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    let totalValueMajor = 0;
    let totalQuantity = 0;
    const wareHouseUpdated = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse_1.WareHouse);
        const orderRepoT = transactionalEntityManager.getRepository(Order_1.Order);
        const wareHouseProductPurchaseRepoT = transactionalEntityManager.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
        const wareHouseProductOrderHistoryRepoT = transactionalEntityManager.getRepository(WareHouseProductOrderHistory_1.WareHouseProductOrderHistory);
        for (const order of orders) {
            totalValueMajor += order.calculatedTotalCostMajor;
            for (const item of order.orderItems) {
                totalQuantity += item.quantity;
                let wareHouseProductPurchase = yield wareHouseProductPurchaseRepoT.findOne({
                    userId: currentUser.id,
                    productId: item.productId
                });
                if (wareHouseProductPurchase) {
                    const updateQuery = {
                        inFlowQuantity: wareHouseProductPurchase.inFlowQuantity + item.quantity,
                        availableQuantity: wareHouseProductPurchase.availableQuantity + item.quantity
                    };
                    yield wareHouseProductPurchaseRepoT.createQueryBuilder()
                        .update(WareHouseProductPurchase_1.WareHouseProductPurchase)
                        .set(updateQuery)
                        .where({ id: wareHouseProductPurchase.id })
                        .execute();
                }
                else {
                    const newWareHouseProductPurchase = new WareHouseProductPurchase_1.WareHouseProductPurchase().initialize(currentUser.id, wareHouse.id, item.productId, item.quantity);
                    wareHouseProductPurchase = yield wareHouseProductPurchaseRepoT.save(newWareHouseProductPurchase);
                }
                const newWareHousePurchaseOrderHistory = new WareHouseProductOrderHistory_1.WareHouseProductOrderHistory().initialize(currentUser.id, item.productId, order.id, wareHouseProductPurchase.id);
                yield wareHouseProductOrderHistoryRepoT.save(newWareHousePurchaseOrderHistory);
            }
            yield orderRepoT.createQueryBuilder()
                .update(Order_1.Order)
                .set({ warehouseId: wareHouse.id })
                .where({ id: order.id })
                .execute();
        }
        const updateQuery = {
            totalValueMajor: wareHouse.totalValueMajor + totalValueMajor,
            totalQuantity: wareHouse.totalQuantity + totalQuantity
        };
        yield wareHouseRepoT.createQueryBuilder()
            .update(WareHouse_1.WareHouse)
            .set(updateQuery)
            .where({ id: wareHouse.id })
            .execute();
        return true;
    }));
    return wareHouseUpdated;
});
exports.processOrdertoWareHouse = processOrdertoWareHouse;
const isCooperateAccount = (currentuser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentuser.accountId) {
        const errorMessage = [
            'The current user does not have an account yet. ',
            'Please contact a CinderBuild administrator'
        ].join('');
        throw new error_response_types_1.UnprocessableEntityError(errorMessage);
    }
    if (!currentuser.isCooperate) {
        const errorMessage = [
            'The current user does not have have cooperate feature yet ',
            'Please contact a CinderBuild administrator'
        ].join('');
        throw new error_response_types_1.UnprocessableEntityError(errorMessage);
    }
    return true;
});
exports.isCooperateAccount = isCooperateAccount;
const isWareHouseAccount = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUser.wareHouseId) {
        const errorMessage = [
            'The current user cannot take this action ',
            'Please contact a CinderBuild administrator'
        ].join('');
        throw new error_response_types_1.UnprocessableEntityError(errorMessage);
    }
    return true;
});
exports.isWareHouseAccount = isWareHouseAccount;
//# sourceMappingURL=cooperateService.js.map