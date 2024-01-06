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
exports.CooperateController = void 0;
const tsoa_1 = require("tsoa");
const db_1 = require("../db");
const User_1 = require("../entity/User");
const cooperateService = __importStar(require("../services/cooperateService"));
const PaginationService = __importStar(require("../services/paginationService"));
const CooperateService = __importStar(require("../services/cooperateService"));
const WareHouseWalletService = __importStar(require("../services/wareHouseWalletService"));
const WareHouse_1 = require("../entity/WareHouse");
const Account_1 = require("../entity/Account");
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const SortOrder_1 = require("../enums/SortOrder");
const error_response_types_1 = require("../utils/error-response-types");
const Utils = __importStar(require("../utils/core"));
const CooperateUserRole_1 = require("../enums/CooperateUserRole");
let CooperateController = class CooperateController {
    getCooperateUsers(req, pageNumber, sortOrder, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield cooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepoT = connection.getRepository(User_1.User);
            let query = {};
            query = { accountId: currentUser.accountId };
            if (startDate) {
                query = { createdAt: startDate };
            }
            if (endDate) {
                query = { createdAt: endDate };
            }
            const pageSize = 10;
            const totalCount = yield userRepoT.count(query);
            const cooperateUserListsPages = yield PaginationService.paginate(User_1.User, query, pageSize, pageNumber, sortOrder, undefined);
            if (cooperateUserListsPages.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Account Does Not have Any User Added');
            }
            const cooperateUserist = cooperateUserListsPages.dataset;
            const transformUserPublicProfile = cooperateUserist.map(theUser => {
                const userPhoto = theUser.photo || Utils.userDefaultAvatarCloudFile();
                return {
                    uuid: theUser.uuid,
                    firstName: theUser.firstName,
                    lastName: theUser.lastName,
                    emailAddress: theUser.emailAddress,
                    msisdn: theUser.msisdn,
                    photoUrl: userPhoto.url,
                    role: theUser.wareHouseId ? CooperateUserRole_1.CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole_1.CooperateUserRole.ACCOUNT_LEVEL,
                    isCooperate: theUser.isCooperate,
                    accountId: theUser.accountId,
                    wareHouseid: theUser.wareHouseId,
                    sellerUniqueCode: theUser.uniqueCode,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformUserPublicProfile, total: totalCount }
            };
            return resData;
        });
    }
    getCooperateUser(req, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepoT = connection.getRepository(User_1.User);
            yield CooperateService.isCooperateAccount(currentUser);
            const theUser = yield userRepoT.findOne({ uuid: userUuid, accountId: currentUser.accountId });
            if (!theUser) {
                throw new error_response_types_1.UnprocessableEntityError('User Does Not Exist');
            }
            const userPhoto = theUser.photo || Utils.userDefaultAvatarCloudFile();
            const transformUser = {
                uuid: theUser.uuid,
                firstName: theUser.firstName,
                lastName: theUser.lastName,
                emailAddress: theUser.emailAddress,
                msisdn: theUser.msisdn,
                photoUrl: userPhoto.url,
                role: theUser.wareHouseId ? CooperateUserRole_1.CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole_1.CooperateUserRole.ACCOUNT_LEVEL,
                isCooperate: theUser.isCooperate,
                accountId: theUser.accountId,
                wareHouseid: theUser.wareHouseId,
                sellerUniqueCode: theUser.uniqueCode,
            };
            const resData = {
                status: true,
                data: transformUser
            };
            return resData;
        });
    }
    handleCreateNewCorporateUser(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentuser = req.user;
            if (!currentuser.accountId) {
                const errorMessage = [
                    'The current user does not have an account yet. ',
                    'Please contact a CinderBuild administrator'
                ].join('');
                throw new error_response_types_1.UnprocessableEntityError(errorMessage);
            }
            if (!currentuser.isCooperate) {
                throw new error_response_types_1.UnprocessableEntityError('The current user does not have have cooperate feature, Please contact a CinderBuild administrator');
            }
            const { role } = reqBody;
            let { phoneNumber } = reqBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            let wareHouse;
            if (reqBody.wareHouseUuid) {
                wareHouse = yield wareHouseRepo.findOne({ uuid: reqBody.wareHouseUuid });
                if (!wareHouse) {
                    throw new error_response_types_1.UnprocessableEntityError('WareHouse Does Not Exist');
                }
            }
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
            const awesomePhoneNumber = new awesome_phonenumber_1.default(phoneNumber, "NG");
            if (!awesomePhoneNumber.isValid()) {
                throw new error_response_types_1.UnprocessableEntityError('Phone number is invalid');
            }
            const existingUser = yield userRepo.findOne({ phoneNumber, emailAddress: reqBody.emailAddress });
            if (existingUser) {
                yield cooperateService.addExistingUserToCooperateAccount(currentuser, existingUser, role, wareHouse === null || wareHouse === void 0 ? void 0 : wareHouse.id);
                const resData = {
                    status: true,
                };
                return resData;
            }
            const addNewUser = yield cooperateService.addnewUserToCooperateAccount(currentuser, reqBody, wareHouse === null || wareHouse === void 0 ? void 0 : wareHouse.id);
            if (!addNewUser) {
                throw new error_response_types_1.UnprocessableEntityError('Unable to Add User at this time.');
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    deactivateUser(req, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentuser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const accountRepo = connection.getRepository(Account_1.Account);
            yield CooperateService.isCooperateAccount(currentuser);
            const userToDeactivate = yield userRepo.findOne({ uuid: userUuid });
            if (!userToDeactivate) {
                throw new error_response_types_1.UnprocessableEntityError('User Does Not Exist');
            }
            if (currentuser.accountId !== userToDeactivate.accountId) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot Deactivate User You Did Not Add to your cooperate account');
            }
            const deactivatedUserAccount = yield accountRepo.findOne({ primaryUserId: userToDeactivate.id });
            const updateQuery = {
                accountId: deactivatedUserAccount === null || deactivatedUserAccount === void 0 ? void 0 : deactivatedUserAccount.id,
                isCooperate: false,
                wareHouseId: null
            };
            yield userRepo.createQueryBuilder()
                .update(User_1.User)
                .set(updateQuery)
                .where({ id: userToDeactivate.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleMaintoDeliveryWalletTransfer(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { amountMajor } = reqBody;
            const totalTransferAmountMinor = amountMajor * 100;
            yield CooperateService.isCooperateAccount(currentUser);
            const transferSuccess = yield WareHouseWalletService.mainWalletToDeliveryWalletTransfer(currentUser, totalTransferAmountMinor);
            if (!transferSuccess) {
                throw new error_response_types_1.UnprocessableEntityError('Unable to Process main wallet to Delivery wallet Fee Transfer');
            }
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/user"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("startDate")),
    __param(4, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CooperateController.prototype, "getCooperateUsers", null);
__decorate([
    (0, tsoa_1.Get)("/user/:userUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CooperateController.prototype, "getCooperateUser", null);
__decorate([
    (0, tsoa_1.Post)('/user'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CooperateController.prototype, "handleCreateNewCorporateUser", null);
__decorate([
    (0, tsoa_1.Patch)('/user/:userUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CooperateController.prototype, "deactivateUser", null);
__decorate([
    (0, tsoa_1.Patch)('/wallet-to-wallet-transfter'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CooperateController.prototype, "handleMaintoDeliveryWalletTransfer", null);
CooperateController = __decorate([
    (0, tsoa_1.Route)("api/cooperate"),
    (0, tsoa_1.Tags)('cooperate'),
    (0, tsoa_1.Security)("jwt")
], CooperateController);
exports.CooperateController = CooperateController;
//# sourceMappingURL=CooperateController.js.map