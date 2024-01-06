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
exports.resentOptForUnverifedPhoneNumber = exports.generateNewSellerCode = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const typeorm_1 = require("typeorm");
const PhoneVerification_1 = require("../entity/PhoneVerification");
const Utils = __importStar(require("../utils/core"));
const TempUser_1 = require("../entity/TempUser");
const User_1 = require("../entity/User");
const PhoneVerificationService = __importStar(require("../services/phoneVerificationService"));
const EmailService = __importStar(require("../services/emailService"));
const error_response_types_1 = require("../utils/error-response-types");
const Roles_1 = require("../enums/Roles");
const randomstring = require("randomstring");
const generateNewSellerCode = (userRepoT, user) => __awaiter(void 0, void 0, void 0, function* () {
    let potentialUniqueCode = randomstring.generate({
        length: 7,
        charset: 'alphabetic'
    });
    const existingUsersWithCodeNumber = yield userRepoT.count({
        where: {
            id: (0, typeorm_1.Not)(user.id),
            uniqueCode: (0, typeorm_1.Like)(`${potentialUniqueCode}%`)
        },
        order: { createdAt: 'DESC' }
    });
    if (existingUsersWithCodeNumber > 0) {
        potentialUniqueCode += `${existingUsersWithCodeNumber}`;
    }
    return potentialUniqueCode;
});
exports.generateNewSellerCode = generateNewSellerCode;
const resentOptForUnverifedPhoneNumber = (msisdn, requestBody, tempUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { phoneNumber } = requestBody;
    const newUserRepo = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
    const verifiedUserRepo = (0, typeorm_1.getRepository)(User_1.User);
    const PhoneVerificationRepo = (0, typeorm_1.getRepository)(PhoneVerification_1.PhoneVerification);
    const cinderbuildUser = yield verifiedUserRepo.findOne({ msisdn });
    if (cinderbuildUser) {
        throw new error_response_types_1.UnprocessableEntityError('Phone Number Has Been Registered, Please Procced to Login');
    }
    const passwordHash = yield Utils.generatePasswordHash(requestBody.password);
    yield newUserRepo.createQueryBuilder()
        .update(TempUser_1.TempUser)
        .set({ msisdn, emailAddress: requestBody.emailAddress,
        firstName: requestBody.firstName, lastName: requestBody.lastName,
        phoneNumber: requestBody.phoneNumber,
        role: (_a = requestBody.role) !== null && _a !== void 0 ? _a : Roles_1.Roles.NORMAL_USER,
        passwordHash,
        defaultSellerUniqueCode: (_b = requestBody.defaultSellerUniqueCode) !== null && _b !== void 0 ? _b : undefined
    })
        .where({ id: tempUser.id })
        .execute();
    const tempVerificationCode = yield PhoneVerificationRepo.findOne({
        msisdn
    });
    if (tempVerificationCode) {
        yield PhoneVerificationRepo.createQueryBuilder()
            .update(PhoneVerification_1.PhoneVerification)
            .set({ isVerified: false })
            .where({ id: tempVerificationCode.id })
            .execute();
        yield PhoneVerificationService.sendPhoneVerificationOtp(phoneNumber, msisdn, tempVerificationCode.verificationCode);
        const userMailInfo = {
            email: requestBody.emailAddress,
            firstName: requestBody.firstName,
            otp: tempVerificationCode.verificationCode
        };
        yield EmailService.sendCustomerOtp(userMailInfo);
        return tempVerificationCode.verificationCode;
    }
    const phoneVerifyCode = Utils.generateOtp(4);
    const newVerificationCode = new PhoneVerification_1.PhoneVerification().initialize(phoneNumber, msisdn, phoneVerifyCode);
    yield newVerificationCode.save();
    yield PhoneVerificationService.sendPhoneVerificationOtp(phoneNumber, msisdn, phoneVerifyCode);
    const userMailInfo = {
        email: requestBody.emailAddress,
        firstName: requestBody.firstName,
        otp: phoneVerifyCode
    };
    yield EmailService.sendCustomerOtp(userMailInfo);
    return phoneVerifyCode;
});
exports.resentOptForUnverifedPhoneNumber = resentOptForUnverifedPhoneNumber;
//# sourceMappingURL=signupService.js.map