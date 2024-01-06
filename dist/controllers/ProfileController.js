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
exports.ProfileController = void 0;
const tsoa_1 = require("tsoa");
const moment_1 = __importDefault(require("moment"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_response_types_1 = require("../utils/error-response-types");
const User_1 = require("../entity/User");
const db_1 = require("../db");
const ProfileService = __importStar(require("../services/profileService"));
const PaystackService = __importStar(require("../services/paystackService"));
const EarningsByYear_1 = require("../entity/EarningsByYear");
const EarningsByMonth_1 = require("../entity/EarningsByMonth");
const typeorm_1 = require("typeorm");
const AccountStatService = __importStar(require("../services/sellerAccountStatService"));
const SignupService = __importStar(require("../services/signupService"));
const Utils = __importStar(require("../utils/core"));
const WalletService = __importStar(require("../services/walletService"));
const EmailService = __importStar(require("../services/emailService"));
const NotificationService = __importStar(require("../services/notificationService"));
const Currency_1 = require("../enums/Currency");
const SortOrder_1 = require("../enums/SortOrder");
const PaginationService = __importStar(require("../services/paginationService"));
const Business_1 = require("../entity/Business");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const smsSendingService_1 = require("../services/smsSendingService");
const RequestBankDetailsChange_1 = require("../entity/RequestBankDetailsChange");
// DO NOT EXPORT DEFAULT
let ProfileController = class ProfileController {
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const profileData = yield ProfileService.getSelfProfile(currentUser);
            const resData = {
                status: true,
                data: profileData,
            };
            return resData;
        });
    }
    updateProfile(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { firstName, lastName } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ firstName, lastName })
                .where({ id: currentUser.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    getPublicProfile(req, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const foundUser = yield userRepo.findOne({
                phoneNumber
            });
            if (!foundUser) {
                throw new error_response_types_1.NotFoundError("The user was not found");
            }
            const publicProfile = yield ProfileService.getPublicProfile(foundUser);
            const resData = {
                status: true,
                data: publicProfile
            };
            return resData;
        });
    }
    getBuyerProfiles(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const userRepo = (0, typeorm_1.getRepository)(User_1.User);
            const query = {
                defaultSellerUserId: currentUser.id
            };
            const pageSize = 10;
            const totalCount = yield userRepo.count(query);
            const buyerUsersPage = yield PaginationService.paginate(User_1.User, query, pageSize, pageNumber, sortOrder);
            const buyerUserIds = buyerUsersPage.dataset.map(buyerUser => buyerUser.id);
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(buyerUserIds);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: userPublicProfiles, total: totalCount }
            };
            return resData;
        });
    }
    bankAccountInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const resData = {
                status: true,
                data: currentUser.bankInfo,
            };
            return resData;
        });
    }
    addBuyerToMyLinkList(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const businessRepo = connection.getRepository(Business_1.Business);
            const domain = Utils.serverDomain();
            let { phoneNumber } = reqBody;
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const sellerBusinessDetail = yield businessRepo.findOne({ userId: currentUser.id });
            if (!sellerBusinessDetail) {
                throw new error_response_types_1.NotFoundError('Seller user record was not found');
            }
            const buyerUser = yield userRepo.findOne({ phoneNumber });
            const sellerSignupLink = `https://${domain}/register/${currentUser.uniqueCode}`;
            if (!buyerUser) {
                const messageBody = [
                    `${currentUser.firstName} (${sellerBusinessDetail.name}) would like to add you to their StoreFront as a customer.`,
                    ` As a StoreFront customer, You can make purchases and also enjoy Credit facilities and frequent discounts`,
                    ` Use the link below to Sign-up on CinderBuild. ${sellerSignupLink}`
                ];
                const body = messageBody.join('');
                yield (0, smsSendingService_1.sendSms)(reqBody.phoneNumber, body);
                const resData = {
                    status: true,
                };
                return resData;
            }
            if (buyerUser.defaultSellerUserId && buyerUser.defaultSellerUserId === currentUser.id) {
                const resData = {
                    status: true,
                };
                return resData;
            }
            // Send email or sms invite to the buyer with the seller's unique code formatted into a signup/ link
            if (buyerUser.emailAddress) {
                const inviteInforma = {
                    buyerEmail: buyerUser.emailAddress,
                    buyerFirstName: buyerUser.firstName,
                    sellerFirstName: currentUser.firstName,
                    sellerUnique: currentUser.uniqueCode,
                    sellerBusinessName: sellerBusinessDetail.name
                };
                yield EmailService.sendSellerInviteToBuyer(inviteInforma);
            }
            const sellerInviteLink = `https://${domain}/invite/${currentUser.uniqueCode}`;
            const notificationMetadata = { inviteLink: sellerInviteLink };
            const notificationTransports = {
                [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
                [NotificationTransport_1.NotificationTransportMode.SMS]: true
            };
            yield NotificationService.sendSingleNotificationToUserId(buyerUser.id, buyerUser.uuid, NotificationMessageTypes_1.default.SELLER_INVITE_TO_BUYER, 'A Seller Invite You to Join His storefront', `${currentUser.firstName} (${sellerBusinessDetail.name}) would like to add you to their StoreFront as a customer. As a StoreFront customer, You can make purchases and also
       enjoy Credit facilities and frequent discounts. Use the link below to Sign-up on CinderBuild. ${sellerInviteLink} CinderBuild Team.`, notificationTransports, notificationMetadata);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleUnlinkBuyer(req, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const buyerToUnlink = yield userRepo.findOne({ uuid: userUuid });
            if (!buyerToUnlink) {
                throw new error_response_types_1.NotFoundError('Buyer user record was not found');
            }
            if (buyerToUnlink.defaultSellerUserId !== currentUser.id) {
                const resData = {
                    message: 'You are not allowed to unlink a buyer that does not belong to you',
                    status: false,
                };
                return resData;
            }
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ defaultSellerUserId: undefined })
                .where({ id: buyerToUnlink.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleUnlinkSeller(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ defaultSellerUserId: undefined })
                .where({ id: currentUser.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleDefaultSellerAcceptInvite(req, sellerUniqueCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const seller = yield userRepo.findOne({
                isSeller: true,
                uniqueCode: sellerUniqueCode
            });
            if (!seller) {
                const resData = {
                    message: "You are not allowed to join the buyer's list of a seller that does not exist.",
                    status: false,
                };
                return resData;
            }
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ defaultSellerUserId: seller.id })
                .where({ id: currentUser.id })
                .execute();
            if (seller.emailAddress) {
                const acceptInfo = {
                    SellerFirstName: seller.firstName,
                    SellerEmail: seller.emailAddress,
                    buyerFirstName: currentUser.firstName
                };
                yield EmailService.sendBuyerAcceptInvite(acceptInfo);
            }
            const notificationTransports = {
                [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            };
            const domain = Utils.serverDomain();
            const inviteLink = `https://${domain}/seller/seller-retailers`;
            const notificationMetadata = {
                inviteLink
            };
            yield NotificationService.sendSingleNotificationToUserId(currentUser.id, currentUser.uuid, NotificationMessageTypes_1.default.BUYER_ACCEPT_SELLER_INVITE, 'A Buyer Has Accepted Your Invite', `${currentUser.firstName} has Accepted Your Invite`, notificationTransports, notificationMetadata);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    saveBankAccountInfo(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber, bankName, bankCode } = reqBody;
            const currentUser = req.user;
            if (currentUser.bankInfo && currentUser.bankInfo.bankAccountNumber) {
                throw new error_response_types_1.UnprocessableEntityError('The user already bank account information saved!');
            }
            const accountResolveResult = yield PaystackService.accountNameEnquiry(bankCode, accountNumber);
            const bankAccountName = accountResolveResult.account_name;
            //--
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                bankInfo: {
                    bankCode,
                    bankName: bankName || "",
                    bankAccountNumber: accountNumber,
                    bankAccountName,
                },
            })
                .where({ id: currentUser.id })
                .execute();
            yield PaystackService.saveTransferReceipt(bankCode, accountNumber, bankAccountName);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    // Requires that the user first verify his phone number
    // The user will then be given an access code that will allow him
    // set a new password
    handleSetNewPassword(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword } = reqBody;
            const currentUser = req.user;
            const saltRounds = 10;
            const passwordSalt = yield bcrypt_1.default.genSalt(saltRounds);
            const passwordHash = yield bcrypt_1.default.hash(newPassword, passwordSalt);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ passwordHash })
                .where({ id: currentUser.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    resetPassword(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, newPassword } = reqBody;
            const currentUser = req.user;
            const match = yield bcrypt_1.default.compare(oldPassword, currentUser.passwordHash);
            if (!match) {
                throw new error_response_types_1.UnauthorizedRequestError("User credentials are wrong.");
            }
            const saltRounds = 10;
            const passwordSalt = yield bcrypt_1.default.genSalt(saltRounds);
            const passwordHash = yield bcrypt_1.default.hash(newPassword, passwordSalt);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ passwordHash })
                .where({ id: currentUser.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleSellerDashboardStats(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (!currentUser.isSeller) {
                throw new error_response_types_1.UnauthorizedRequestError("The requested information does not apply to you");
            }
            const aYearAgoMoment = moment_1.default.utc().add(-12, "months");
            const connection = yield (0, db_1.getFreshConnection)();
            const earningsByYearRepo = connection.getRepository(EarningsByYear_1.EarningsByYear);
            const sellerYearEarnings = yield earningsByYearRepo.find({
                userId: currentUser.id,
            });
            const earningbyMonthRepo = connection.getRepository(EarningsByMonth_1.EarningsByMonth);
            const userMonthEarnings = yield earningbyMonthRepo.find({
                userId: currentUser.id,
                createdAt: (0, typeorm_1.MoreThan)(aYearAgoMoment.toDate()),
            });
            const formattedMonthEarnings = userMonthEarnings.map((earning) => {
                return {
                    friendlyMonth: (0, moment_1.default)((0, moment_1.default)(`${earning.monthISO8601}-01`).format("YYYY-MM-DD")).format("MMMM"),
                    monthISO8601: earning.monthISO8601,
                    totalEarningsMajor: earning.totalEarningsMinor / 100,
                };
            });
            const yearEarnings = sellerYearEarnings.map((sellerYearEarning) => {
                return {
                    year: sellerYearEarning.year,
                    totalEarningsMajor: sellerYearEarning.totalEarningsMinor / 100,
                };
            });
            let totalRevenueMinor = 0;
            for (const yearEarning of sellerYearEarnings) {
                totalRevenueMinor += yearEarning.totalEarningsMinor;
            }
            const totalRevenueMajor = Utils.normalizeMoney(totalRevenueMinor / 100);
            const sellerAccountStats = yield AccountStatService.getSellerAccountStats(currentUser.id);
            const wallet = yield WalletService.getCustomerWallet(currentUser.id);
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            const currencySymbol = CurrencyEnum[wallet.currency] || "₦";
            const sellerStatistics = {
                totalRevenueMajor,
                totalRevenueCurrency: wallet.currency,
                totalRevenueCurrencySymbol: currencySymbol,
                totalOrdersCount: sellerAccountStats.totalOrdersCount,
                totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount,
                totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount,
                monthEarnings: formattedMonthEarnings,
                yearEarnings,
            };
            const resData = {
                status: true,
                data: sellerStatistics,
            };
            return resData;
        });
    }
    sellerProfileDocs(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const seller = yield userRepo.findOne({
                uuid: currentUser.uuid,
                isSeller: true,
            });
            if (!seller) {
                throw new error_response_types_1.NotFoundError('Seller user record was not found');
            }
            const resData = {
                status: true,
                data: seller.sellerDocs || [],
            };
            return resData;
        });
    }
    requestAcall(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield EmailService.sendRequestACallMailToAdmin(currentUser);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    upgradeBuyerToSeller(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const newSellerUserUniqueCode = yield SignupService.generateNewSellerCode(userRepo, currentUser);
            yield userRepo
                .createQueryBuilder()
                .update(User_1.User)
                .set({ isSeller: true,
                uniqueCode: newSellerUserUniqueCode
            })
                .where({
                id: currentUser.id,
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleSellerPublicProfile(uniqueCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const seller = yield userRepo.findOne({ uniqueCode, isSeller: true });
            if (!seller) {
                throw new error_response_types_1.UnprocessableEntityError('Seller Store front does not exist');
            }
            const sellerPublicProfile = yield ProfileService.getPublicProfile(seller);
            const resData = {
                status: true,
                data: sellerPublicProfile
            };
            return resData;
        });
    }
    handleRequestchangeBankDetailsChange(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const requestBankDetailsChangeDto = connection.getRepository(RequestBankDetailsChange_1.RequestBankDetailsChange);
            const { accountNumber, bankName, bankCode } = reqBody;
            const accountResolveResult = yield PaystackService.accountNameEnquiry(bankCode, accountNumber);
            if (currentUser.bankInfo.bankAccountNumber === accountNumber) {
                throw new error_response_types_1.UnprocessableEntityError('User Bank details  Submitted has already been processed');
            }
            const bankAccountName = accountResolveResult.account_name;
            let saveRequest = new RequestBankDetailsChange_1.RequestBankDetailsChange().initialize(currentUser.id, accountNumber, bankAccountName, bankName, bankCode);
            saveRequest = yield requestBankDetailsChangeDto.save(saveRequest);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, tsoa_1.Patch)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, tsoa_1.Get)('/public/:phoneNumber'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getPublicProfile", null);
__decorate([
    (0, tsoa_1.Get)("/linkedbuyers"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getBuyerProfiles", null);
__decorate([
    (0, tsoa_1.Get)("/bankaccount"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "bankAccountInfo", null);
__decorate([
    (0, tsoa_1.Post)("/linkedbuyers/invite"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addBuyerToMyLinkList", null);
__decorate([
    (0, tsoa_1.Patch)("/unlinkbuyer"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleUnlinkBuyer", null);
__decorate([
    (0, tsoa_1.Patch)("/unlinkseller"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleUnlinkSeller", null);
__decorate([
    (0, tsoa_1.Patch)("/defaultseller/acceptinvite"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("sellerUniqueCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleDefaultSellerAcceptInvite", null);
__decorate([
    (0, tsoa_1.Put)("/bankaccount"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "saveBankAccountInfo", null);
__decorate([
    (0, tsoa_1.Put)("/newpassword"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleSetNewPassword", null);
__decorate([
    (0, tsoa_1.Put)("/resetpassword"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "resetPassword", null);
__decorate([
    (0, tsoa_1.Get)("/seller/statistics"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleSellerDashboardStats", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/seller/document"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "sellerProfileDocs", null);
__decorate([
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.Get)("/requestcall"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "requestAcall", null);
__decorate([
    (0, tsoa_1.Get)('/upgradeToSeller'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "upgradeBuyerToSeller", null);
__decorate([
    (0, tsoa_1.Get)('/publicstore/:uniqueCode'),
    __param(0, (0, tsoa_1.Path)("uniqueCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleSellerPublicProfile", null);
__decorate([
    (0, tsoa_1.Post)('/request-bank-details-change'),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "handleRequestchangeBankDetailsChange", null);
ProfileController = __decorate([
    (0, tsoa_1.Route)("api/profile"),
    (0, tsoa_1.Tags)("Profile")
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfileController.js.map