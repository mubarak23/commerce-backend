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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AccessController = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tsoa_1 = require("tsoa");
const constants_1 = require("../constants");
const db_1 = require("../db");
const PhoneVerification_1 = require("../entity/PhoneVerification");
const PushNotificationToken_1 = require("../entity/PushNotificationToken");
const User_1 = require("../entity/User");
const WareHouse_1 = require("../entity/WareHouse");
const DeveloperService = __importStar(require("../services/developerService"));
const EmailService = __importStar(require("../services/emailService"));
const PhoneVerificationService = __importStar(require("../services/phoneVerificationService"));
const TokenService = __importStar(require("../services/tokenService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let AccessController = class AccessController {
    loginWithPassword(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let { phoneNumber } = reqBody;
            const { password } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const warehouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const existingUser = yield userRepo.findOne({ phoneNumber });
            if (!existingUser) {
                throw new error_response_types_1.BadRequestError("The phone number does NOT belong to a VALID cinderbuild user.");
            }
            const match = yield bcrypt_1.default.compare(password, existingUser.passwordHash);
            if (!match) {
                throw new error_response_types_1.UnauthorizedRequestError("User credentials are wrong.");
            }
            let isWarehouseUser;
            if (existingUser.wareHouseId) {
                isWarehouseUser = yield warehouseRepo.findOne({ id: existingUser.wareHouseId });
            }
            let isDeveloperAccountApprovedAndConfirm;
            if (existingUser.isDeveloper) {
                isDeveloperAccountApprovedAndConfirm = yield DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
            }
            const tokenData = yield TokenService.getAccessToken(existingUser, isWarehouseUser, isDeveloperAccountApprovedAndConfirm);
            const resData = {
                status: true,
                data: tokenData,
            };
            return resData;
        });
    }
    loginWithPhone(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { countryIso2 } = reqBody;
            let { phoneNumber } = reqBody;
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const supportedCountry = yield Utils.getSupportedCountryFromIso2(countryIso2);
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, supportedCountry.iso2).getNumber();
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const existingUser = yield userRepo.findOne({
                msisdn,
            });
            if (!existingUser) {
                throw new error_response_types_1.BadRequestError('The phone number does NOT belong to a VALID Cinderbuild User.');
            }
            const otp = Utils.generateOtp(4);
            yield PhoneVerificationService.sendPhoneVerificationOtp(phoneNumber, msisdn, otp);
            // send mail to support about the OTP 
            const userMailInfo = {
                firstName: existingUser.firstName,
                email: existingUser.emailAddress,
                otp
            };
            yield EmailService.sendCustomerForgetPasswordOtp(userMailInfo);
            const dataInResponse = {
                phoneVerificationOtp: process.env.NODE_ENV !== constants_1.ProductionEnv ? otp : ''
            };
            const resData = {
                status: true,
                data: dataInResponse
            };
            return resData;
        });
    }
    verifyPhoneForLogin(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { countryIso2, otp } = reqBody;
            let { phoneNumber } = reqBody;
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const supportedCountry = yield Utils.getSupportedCountryFromIso2(countryIso2);
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, supportedCountry.iso2).getNumber();
            const connection = yield (0, db_1.getFreshConnection)();
            const phoneVerificationRepo = connection.getRepository(PhoneVerification_1.PhoneVerification);
            const checkPhoneVerifyCode = yield phoneVerificationRepo.findOne({
                phoneNumber,
                verificationCode: otp,
                isVerified: false,
            });
            if (!checkPhoneVerifyCode) {
                throw new error_response_types_1.UnauthorizedRequestError('Phone verification failed.');
            }
            yield phoneVerificationRepo
                .createQueryBuilder()
                .update(PhoneVerification_1.PhoneVerification)
                .set({ isVerified: true })
                .where({ id: checkPhoneVerifyCode.id })
                .execute();
            const userRepo = connection.getRepository(User_1.User);
            const warehouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const existingUser = yield userRepo.findOne({ msisdn });
            if (!existingUser) {
                throw new error_response_types_1.UnprocessableEntityError('The phone number does NOT belong to a valid CinderBuild customer');
            }
            let isWarehouseUser;
            if (existingUser.wareHouseId) {
                isWarehouseUser = yield warehouseRepo.findOne({ id: existingUser.wareHouseId });
            }
            let isDeveloperAccountApprovedAndConfirm;
            if (existingUser.isDeveloper) {
                isDeveloperAccountApprovedAndConfirm = yield DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
            }
            const tokenData = yield TokenService.getAccessToken(existingUser, undefined, isDeveloperAccountApprovedAndConfirm);
            const resData = {
                status: !!tokenData,
                data: tokenData
            };
            return resData;
        });
    }
    handleLogout(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken_1.PushNotificationToken);
            yield pushNotificationTokenRepo.delete({ userId: currentUser.id });
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    loginWithAdminAcccess(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let { phoneNumber } = reqBody;
            const { password } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const existingUser = yield userRepo.findOne({ phoneNumber });
            if (!existingUser) {
                throw new error_response_types_1.BadRequestError("The phone number does NOT belong to a VALID cinderbuild user.");
            }
            if (existingUser.adminCanEdit === false && existingUser.adminCanView === false) {
                throw new error_response_types_1.UnauthorizedRequestError("Access Denied");
            }
            const match = yield bcrypt_1.default.compare(password, existingUser.passwordHash);
            if (!match) {
                throw new error_response_types_1.UnauthorizedRequestError("User credentials are wrong.");
            }
            let isDeveloperAccountApprovedAndConfirm;
            if (existingUser.isDeveloper) {
                isDeveloperAccountApprovedAndConfirm = yield DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
            }
            const tokenData = yield TokenService.getAccessToken(existingUser, undefined, isDeveloperAccountApprovedAndConfirm);
            const resData = {
                status: true,
                data: tokenData,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/login/password'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "loginWithPassword", null);
__decorate([
    (0, tsoa_1.Post)('/login/phonenumber'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "loginWithPhone", null);
__decorate([
    (0, tsoa_1.Post)('/login/phonenumber/verify/otp'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "verifyPhoneForLogin", null);
__decorate([
    (0, tsoa_1.Put)("/logout"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "handleLogout", null);
__decorate([
    (0, tsoa_1.Post)('/super'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "loginWithAdminAcccess", null);
AccessController = __decorate([
    (0, tsoa_1.Route)("api/access"),
    (0, tsoa_1.Tags)("Access")
], AccessController);
exports.AccessController = AccessController;
//# sourceMappingURL=AccessController.js.map