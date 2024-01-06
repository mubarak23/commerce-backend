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
exports.CinderbuildAdminUsers1687169321849 = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const Account_1 = require("../entity/Account");
const User_1 = require("../entity/User");
const AccountType_1 = require("../enums/AccountType");
const Utils = __importStar(require("../utils/core"));
const cinderbuildAdminUser1 = '0110011001';
const cinderbuildAdminUser2 = '1001100110';
class CinderbuildAdminUsers1687169321849 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryLongName = 'Nigeria';
            const countryIso2Code = 'NG';
            const msisdn1 = new awesome_phonenumber_1.default(cinderbuildAdminUser1, countryIso2Code).getNumber();
            const passwordUser1Hash = yield Utils.generatePasswordHash(constants_1.ADMIN_USER_1);
            const userRepoT = (0, typeorm_1.getRepository)(User_1.User);
            const accountRepo = (0, typeorm_1.getRepository)(Account_1.Account);
            // User Admin 1
            const user1 = new User_1.User().initializeAdmin('Operation', 'Admin', cinderbuildAdminUser1, msisdn1, passwordUser1Hash, countryIso2Code, countryLongName);
            user1.isEnabled = true;
            user1.isAdmin = true;
            user1.adminCanEdit = false;
            user1.adminCanView = true;
            const adminUser1 = yield userRepoT.save(user1);
            const account = new Account_1.Account().initialize(adminUser1.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
            yield accountRepo.save(account);
            // User Admin 2
            const msisdn2 = new awesome_phonenumber_1.default(cinderbuildAdminUser1, countryIso2Code).getNumber();
            const passwordUser2Hash = yield Utils.generatePasswordHash(constants_1.ADMIN_USER_2);
            const user2 = new User_1.User().initializeAdmin('Product', 'Admin', cinderbuildAdminUser2, msisdn2, passwordUser2Hash, countryIso2Code, countryLongName);
            user1.isEnabled = true;
            user1.isAdmin = true;
            user1.adminCanEdit = true;
            user1.adminCanView = true;
            const adminUser2 = yield userRepoT.save(user2);
            const account2 = new Account_1.Account().initialize(adminUser2.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
            yield accountRepo.save(account2);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.User);
            yield userRepo.delete({ phoneNumber: cinderbuildAdminUser1 });
            yield userRepo.delete({ phoneNumber: cinderbuildAdminUser2 });
        });
    }
}
exports.CinderbuildAdminUsers1687169321849 = CinderbuildAdminUsers1687169321849;
//# sourceMappingURL=1687169321849-CinderbuildAdminUsers.js.map