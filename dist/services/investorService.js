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
exports.addinvestor = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const db_1 = require("../db");
const TempUser_1 = require("../entity/TempUser");
const User_1 = require("../entity/User");
const Roles_1 = require("../enums/Roles");
const SupportedCountriesSeed_1 = __importDefault(require("../seeds/SupportedCountriesSeed"));
const Utils = __importStar(require("../utils/core"));
const emailService = __importStar(require("./emailService"));
const OnboardingService = __importStar(require("./onboardingService"));
const addinvestor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const tempUserRepo = connection.getRepository(TempUser_1.TempUser);
    const phoneNumberLine = payload.phoneNumber.substring(1);
    const user = yield userRepo.findOne({
        where: { phoneNumber: phoneNumberLine, emailAddress: payload.emailAddress }
    });
    if (user) {
        return user;
    }
    let { phoneNumber } = payload;
    if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.substring(1);
    }
    const awesomePhoneNumber = new awesome_phonenumber_1.default(phoneNumber, "NG");
    const msisdn = awesomePhoneNumber.getNumber();
    const randomNumericPassword = Utils.generateOtp(6);
    const passwordHash = yield Utils.generatePasswordHash(randomNumericPassword);
    const countryLongName = 'Nigeria';
    const newInvestorPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber,
        countryLongName: 'Nigeria',
        emailAddress: payload.emailAddress,
        password: passwordHash,
        role: Roles_1.Roles.INVESTOR,
    };
    const foundCountry = SupportedCountriesSeed_1.default.find((supportedCountry) => supportedCountry.name === countryLongName);
    const tempUser = new TempUser_1.TempUser().initialize(newInvestorPayload, msisdn, foundCountry.iso2, passwordHash, Roles_1.Roles.INVESTOR);
    const newTempUser = yield tempUserRepo.save(tempUser);
    const savedUser = yield OnboardingService.saveNewUser(newTempUser, msisdn, foundCountry.name);
    const newMailData = {
        email: payload.emailAddress,
        firstName: payload.firstName,
        phoneNumber: payload.phoneNumber,
        role: Roles_1.Roles.INVESTOR,
    };
    yield emailService.sendWelcomeMailToCooperateUser(newMailData, randomNumericPassword);
    return savedUser;
});
exports.addinvestor = addinvestor;
//# sourceMappingURL=investorService.js.map