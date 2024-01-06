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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const typeorm_1 = require("typeorm");
const Account_1 = require("../entity/Account");
const User_1 = require("../entity/User");
const AccountType_1 = require("../enums/AccountType");
const firstSuperAdminPhoneNumber = '0000000000';
class FirstCinderbuildAdmin1640555086504 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryLongName = 'Nigeria';
            const countryIso2Code = 'NG';
            const msisdn = new awesome_phonenumber_1.default(firstSuperAdminPhoneNumber, countryIso2Code).getNumber();
            const passwordHash = '$2b$10$2vraFno0Yw7TdGBdb5a4/ePz/fQjNVA4Q585q4wXOZG1vDLD5E60O';
            const user = new User_1.User().initializeAdmin('Cinderbuild', 'Admin', firstSuperAdminPhoneNumber, msisdn, passwordHash, countryIso2Code, countryLongName);
            user.isEnabled = true;
            const userRepoT = (0, typeorm_1.getRepository)(User_1.User);
            const firstUser = yield userRepoT.save(user);
            const account = new Account_1.Account().initialize(firstUser.id, AccountType_1.AccountType.CUSTOMER_ACCOUNT);
            const accountRepo = (0, typeorm_1.getRepository)(Account_1.Account);
            yield accountRepo.save(account);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.User);
            yield userRepo.delete({ phoneNumber: firstSuperAdminPhoneNumber });
        });
    }
}
exports.default = FirstCinderbuildAdmin1640555086504;
//# sourceMappingURL=1640555086504-FirstCinderbuildAdmin.js.map