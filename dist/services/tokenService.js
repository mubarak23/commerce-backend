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
exports.getAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const Business_1 = require("../entity/Business");
const CooperateUserRole_1 = require("../enums/CooperateUserRole");
const DeveloperAccountActivationType_1 = __importDefault(require("../enums/DeveloperAccountActivationType"));
const Rest_1 = __importDefault(require("../enums/Rest"));
const getAccessToken = (existingUser, warehouse, isDeveloperAccountApprovedAndConfirm) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const signableUser = {
        uuid: existingUser.uuid,
        firstName: (_a = existingUser.firstName) !== null && _a !== void 0 ? _a : '',
        lastName: (_b = existingUser.lastName) !== null && _b !== void 0 ? _b : '',
        phoneNumber: (_c = existingUser.msisdn) !== null && _c !== void 0 ? _c : '',
        email: (_d = existingUser.emailAddress) !== null && _d !== void 0 ? _d : '',
        isSeller: existingUser.isSeller,
        accountId: existingUser.accountId,
        isCooperate: existingUser.isCooperate,
        isDeveloper: existingUser.isDeveloper,
        isInvestor: existingUser.isInvestor,
        isDeveloperAccountApprovedAndConfirm: isDeveloperAccountApprovedAndConfirm || DeveloperAccountActivationType_1.default.inactive,
        companyName: (_e = existingUser.companyName) !== null && _e !== void 0 ? _e : null,
        warehouseUuid: warehouse ? warehouse.uuid : null,
        cooperateUserRole: warehouse ? CooperateUserRole_1.CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole_1.CooperateUserRole.ACCOUNT_LEVEL,
        photo: existingUser.photo,
        adminCanEdit: existingUser.adminCanEdit,
        adminCanView: existingUser.adminCanView,
        updateBusinessInfo: yield isBusinessInfoUpdated(existingUser.id)
    };
    const jwtSecret = process.env.JWT_SECRET;
    const generatedToken = jsonwebtoken_1.default.sign(signableUser, jwtSecret, {
        expiresIn: Rest_1.default.JWT_TIMEOUT
    });
    const generatedRefreshToken = jsonwebtoken_1.default.sign(signableUser, jwtSecret, {
        expiresIn: Rest_1.default.JWT_REFRESH_TIMEOUT
    });
    // if(existingUser.isDeveloper){
    //   await developerService.sendDeveloperAccountApprovalRequest(existingUser)
    // }
    return {
        token: generatedToken,
        refreshToken: generatedRefreshToken,
    };
});
exports.getAccessToken = getAccessToken;
const isBusinessInfoUpdated = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const businessRepo = (0, typeorm_1.getRepository)(Business_1.Business);
    const businessInfo = yield businessRepo.findOne({ where: { userId } });
    // eslint-disable-next-line no-unneeded-ternary
    return businessInfo == null ? true : false;
});
//# sourceMappingURL=tokenService.js.map