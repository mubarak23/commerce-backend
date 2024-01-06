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
exports.OnboardingController = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const db_1 = require("../db");
const AccessRequest_1 = require("../entity/AccessRequest");
const Business_1 = require("../entity/Business");
const PhoneVerification_1 = require("../entity/PhoneVerification");
const SupportedCountry_1 = require("../entity/SupportedCountry");
const TempUser_1 = require("../entity/TempUser");
const User_1 = require("../entity/User");
const WareHouse_1 = require("../entity/WareHouse");
const DeveloperAccountActivationType_1 = __importDefault(require("../enums/DeveloperAccountActivationType"));
const Roles_1 = require("../enums/Roles");
const countries_states_json_1 = __importDefault(require("../resources/countries+states.json"));
const EmailService = __importStar(require("../services/emailService"));
const miscService = __importStar(require("../services/miscService"));
const OnboardingService = __importStar(require("../services/onboardingService"));
const PhoneVerificationService = __importStar(require("../services/phoneVerificationService"));
const signupService = __importStar(require("../services/signupService"));
const TokenService = __importStar(require("../services/tokenService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
let OnboardingController = class OnboardingController extends tsoa_1.Controller {
    handleFirstStageSignup(requestBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, countryLongName, emailAddress, findUsOption } = requestBody;
            if (findUsOption) {
                yield miscService.handlefindUsProcesses(findUsOption);
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
            const supportedCountries = yield supportedCountriesRepo.find({});
            const foundCountry = supportedCountries.find((supportedCountry) => supportedCountry.name === countryLongName);
            if (!foundCountry) {
                throw new error_response_types_1.BadRequestError(`${countryLongName} is NOT supported at this time`);
            }
            //--
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, foundCountry.iso2).getNumber();
            const newUserRepo = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
            const potentialTempUser = yield newUserRepo.findOne({
                msisdn,
            });
            if (potentialTempUser) {
                // reset the otp if the otp has not been used
                const resendVerificationCode = yield signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser);
                if (resendVerificationCode) {
                    const resData = {
                        status: true,
                        data: {
                            verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? resendVerificationCode : undefined,
                        },
                    };
                    this.setStatus(201);
                    return resData;
                }
            }
            const tempUserEmail = yield newUserRepo.findOne({
                emailAddress,
            });
            if (tempUserEmail) {
                throw new error_response_types_1.UnprocessableEntityError("Email Address has already been Used");
                // const resData: IServerResponse<any> = {
                //   status: false,
                //   message: "Email Address has already been Used",
                // };
                // return resData;
            }
            if (requestBody.defaultSellerUniqueCode) {
                const userRepo = (0, typeorm_1.getRepository)(User_1.User);
                const defaultSellerUser = yield userRepo.findOne({
                    uniqueCode: requestBody.defaultSellerUniqueCode,
                });
                if (!defaultSellerUser) {
                    throw new error_response_types_1.NotFoundError('The specified default seller does not exist');
                }
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
            const passwordHash = yield Utils.generatePasswordHash(requestBody.password);
            const tempUser = new TempUser_1.TempUser().initialize(requestBody, msisdn, foundCountry.iso2, passwordHash, (_a = requestBody.role) !== null && _a !== void 0 ? _a : Roles_1.Roles.NORMAL_USER, (_b = requestBody.defaultSellerUniqueCode) !== null && _b !== void 0 ? _b : undefined);
            yield newUserRepo.save(tempUser);
            const resData = {
                status: true,
                data: {
                    verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? phoneVerifyCode : undefined,
                },
            };
            this.setStatus(201);
            return resData;
        });
    }
    handleCooperateSignup(requestBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, countryLongName, emailAddress, findUsOption } = requestBody;
            if (findUsOption) {
                yield miscService.handlefindUsProcesses(findUsOption);
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
            const supportedCountries = yield supportedCountriesRepo.find({});
            const foundCountry = supportedCountries.find((supportedCountry) => supportedCountry.name === countryLongName);
            if (!foundCountry) {
                throw new error_response_types_1.BadRequestError(`${countryLongName} is NOT supported at this time`);
            }
            //--
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, foundCountry.iso2).getNumber();
            const newUserRepo = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
            const potentialTempUser = yield newUserRepo.findOne({
                msisdn,
            });
            if (potentialTempUser) {
                // reset the otp if the otp has not been used
                const resendVerificationCode = yield signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser);
                if (resendVerificationCode) {
                    const resData = {
                        status: true,
                        data: {
                            verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? resendVerificationCode : undefined,
                        },
                    };
                    this.setStatus(201);
                    return resData;
                }
            }
            const tempUserEmail = yield newUserRepo.findOne({
                emailAddress,
            });
            if (tempUserEmail) {
                throw new error_response_types_1.UnprocessableEntityError("Email Address has already been Used");
                // const resData: IServerResponse<any> = {
                //   status: false,
                //   message: "Email Address has already been Used",
                // };
                // return resData;
            }
            if (requestBody.defaultSellerUniqueCode) {
                const userRepo = (0, typeorm_1.getRepository)(User_1.User);
                const defaultSellerUser = yield userRepo.findOne({
                    uniqueCode: requestBody.defaultSellerUniqueCode,
                });
                if (!defaultSellerUser) {
                    throw new error_response_types_1.NotFoundError('The specified default seller does not exist');
                }
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
            const passwordHash = yield Utils.generatePasswordHash(requestBody.password);
            const tempUser = new TempUser_1.TempUser().initializeCooperateUser(requestBody, msisdn, foundCountry.iso2, passwordHash, (_a = requestBody.role) !== null && _a !== void 0 ? _a : Roles_1.Roles.NORMAL_USER, (_b = requestBody.defaultSellerUniqueCode) !== null && _b !== void 0 ? _b : undefined);
            yield newUserRepo.save(tempUser);
            const resData = {
                status: true,
                data: {
                    verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? phoneVerifyCode : undefined,
                },
            };
            this.setStatus(201);
            return resData;
        });
    }
    handleMortageSignup(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, countryLongName, emailAddress, role, findUsOption } = requestBody;
            if (findUsOption) {
                yield miscService.handlefindUsProcesses(findUsOption);
            }
            if (![Roles_1.Roles.DEVELOPER].includes(role)) {
                throw new error_response_types_1.UnprocessableEntityError('Wrong Mortgage Role Selected');
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
            const supportedCountries = yield supportedCountriesRepo.find({});
            const foundCountry = supportedCountries.find((supportedCountry) => supportedCountry.name === countryLongName);
            if (!foundCountry) {
                throw new error_response_types_1.BadRequestError(`${countryLongName} is NOT supported at this time`);
            }
            //--
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, foundCountry.iso2).getNumber();
            const newUserRepo = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
            const potentialTempUser = yield newUserRepo.findOne({
                msisdn,
            });
            if (potentialTempUser) {
                // reset the otp if the otp has not been used
                const resendVerificationCode = yield signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser);
                if (resendVerificationCode) {
                    const resData = {
                        status: true,
                        data: {
                            verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? resendVerificationCode : undefined,
                        },
                    };
                    this.setStatus(201);
                    return resData;
                }
            }
            const tempUserEmail = yield newUserRepo.findOne({
                emailAddress,
            });
            if (tempUserEmail) {
                throw new error_response_types_1.UnprocessableEntityError("Email Address has already been Used");
                // const resData: IServerResponse<any> = {
                //   status: false,
                //   message: "Email Address has already been Used",
                // };
                // return resData;
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
            const passwordHash = yield Utils.generatePasswordHash(requestBody.password);
            const tempUser = new TempUser_1.TempUser().initializeMortageDeveloperUser(requestBody, msisdn, foundCountry.iso2, passwordHash);
            yield newUserRepo.save(tempUser);
            const resData = {
                status: true,
                data: {
                    verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? phoneVerifyCode : undefined,
                },
            };
            this.setStatus(201);
            return resData;
        });
    }
    handleMortageInvestorSignup(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, countryLongName, emailAddress, role } = requestBody;
            if (![Roles_1.Roles.INVESTOR].includes(role)) {
                throw new error_response_types_1.UnprocessableEntityError('Wrong Mortgage Role Selected');
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
            const supportedCountries = yield supportedCountriesRepo.find({});
            const foundCountry = supportedCountries.find((supportedCountry) => supportedCountry.name === countryLongName);
            if (!foundCountry) {
                throw new error_response_types_1.BadRequestError(`${countryLongName} is NOT supported at this time`);
            }
            //--
            const msisdn = new awesome_phonenumber_1.default(phoneNumber, foundCountry.iso2).getNumber();
            const newUserRepo = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
            const potentialTempUser = yield newUserRepo.findOne({
                msisdn,
            });
            if (potentialTempUser) {
                // reset the otp if the otp has not been used
                const resendVerificationCode = yield signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser);
                if (resendVerificationCode) {
                    const resData = {
                        status: true,
                        data: {
                            verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? resendVerificationCode : undefined,
                        },
                    };
                    this.setStatus(201);
                    return resData;
                }
            }
            const tempUserEmail = yield newUserRepo.findOne({
                emailAddress,
            });
            if (tempUserEmail) {
                throw new error_response_types_1.UnprocessableEntityError("Email Address has already been Used");
                // const resData: IServerResponse<any> = {
                //   status: false,
                //   message: "Email Address has already been Used",
                // };
                // return resData;
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
            const passwordHash = yield Utils.generatePasswordHash(requestBody.password);
            const tempUser = new TempUser_1.TempUser().initializeMortageInvestorUser(requestBody, msisdn, foundCountry.iso2, passwordHash);
            yield newUserRepo.save(tempUser);
            const resData = {
                status: true,
                data: {
                    verificationCode: process.env.NODE_ENV !== constants_1.ProductionEnv ? phoneVerifyCode : undefined,
                },
            };
            this.setStatus(201);
            return resData;
        });
    }
    verifyTempUser(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneVerify = requestBody;
            const phoneVerificationRepository = (0, typeorm_1.getRepository)(PhoneVerification_1.PhoneVerification);
            const checkPhoneVerifyCode = yield phoneVerificationRepository.findOne({
                phoneNumber: phoneVerify.phoneNumber,
                verificationCode: phoneVerify.verificationCode,
                isVerified: false,
            });
            if (!checkPhoneVerifyCode) {
                const resData = {
                    status: false,
                    message: "Wrong verification code",
                };
                return resData;
            }
            const tempUserRepository = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
            const warehouseRepo = (0, typeorm_1.getRepository)(WareHouse_1.WareHouse);
            const tempUserExist = yield tempUserRepository.findOne({
                phoneNumber: phoneVerify.phoneNumber,
            });
            if (!tempUserExist) {
                const resData = {
                    status: false,
                    message: "Temp User Does not Exist ",
                };
                return resData;
            }
            const msisdn = new awesome_phonenumber_1.default(tempUserExist.phoneNumber, tempUserExist.countryIso2).getNumber();
            const foundCountry = countries_states_json_1.default.find((countryItem) => countryItem.iso2 === tempUserExist.countryIso2);
            const savedUser = yield OnboardingService.saveNewUser(tempUserExist, msisdn, foundCountry.name, checkPhoneVerifyCode);
            let isWarehouseUser;
            if (savedUser.wareHouseId) {
                isWarehouseUser = yield warehouseRepo.findOne({ id: savedUser.wareHouseId });
            }
            const tokenData = yield TokenService.getAccessToken(savedUser, isWarehouseUser, DeveloperAccountActivationType_1.default.inactive);
            const resData = {
                status: true,
                data: tokenData,
                message: "Account Creation Was Successful, Proceed to Login",
            };
            return resData;
        });
    }
    processBusinessInfo(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { businessName, businessAddress, cacNumber } = requestBody;
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const businessRepo = connection.getRepository(Business_1.Business);
            const existingBusiness = yield businessRepo.findOne({
                userId: currentUser.id,
            });
            if (existingBusiness) {
                throw new error_response_types_1.ConflictError("You already have a business record");
            }
            const business = new Business_1.Business().initialize(currentUser.id, businessName, businessAddress, cacNumber);
            yield businessRepo.save(business);
            if (!currentUser.isSeller) {
                const userRepo = connection.getRepository(User_1.User);
                yield userRepo
                    .createQueryBuilder()
                    .update(User_1.User)
                    .set({ isSeller: true })
                    .where({ id: currentUser.id })
                    .execute();
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    processAccessRequest(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { isSeller, businessName, businessLocationCountry, businessLocationState, applicantName, applicantRole, applicantEmail, applicantPhone, weeklyTurnOver, enquiries } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const accessRequestRepo = connection.getRepository(AccessRequest_1.AccessRequest);
            const newAccessRequest = new AccessRequest_1.AccessRequest().initialize(isSeller, businessName, businessLocationCountry, businessLocationState, applicantName, applicantRole, applicantEmail, applicantPhone, weeklyTurnOver, enquiries);
            yield accessRequestRepo.save(newAccessRequest);
            const resData = {
                status: true,
            };
            this.setStatus(201);
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/signup"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "handleFirstStageSignup", null);
__decorate([
    (0, tsoa_1.Post)("/signup/cooperate"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "handleCooperateSignup", null);
__decorate([
    (0, tsoa_1.Post)("/signup/mortgage"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "handleMortageSignup", null);
__decorate([
    (0, tsoa_1.Post)("/signup/mortgageinvestor"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "handleMortageInvestorSignup", null);
__decorate([
    (0, tsoa_1.Post)("/verify"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "verifyTempUser", null);
__decorate([
    (0, tsoa_1.Put)("/businessinfo"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "processBusinessInfo", null);
__decorate([
    (0, tsoa_1.Post)("/accessrequest"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "processAccessRequest", null);
OnboardingController = __decorate([
    (0, tsoa_1.Route)("api/onboarding"),
    (0, tsoa_1.Tags)("Onboarding")
], OnboardingController);
exports.OnboardingController = OnboardingController;
//# sourceMappingURL=OnboardingController.js.map