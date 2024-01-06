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
exports.getUserSellerFullDetails = exports.getUserBuyerFullDetails = exports.getPublicProfileFromUserIdsForAdmin = exports.getPublicProfileFromUserIds = exports.getBusinessProfileFromUserId = exports.getPublicProfileFromUserUuid = exports.getPublicProfileFromUserId = exports.getSelfProfile = exports.getBusinessProfileFromUser = exports.getBusinessProfile = exports.activateCStoreUser = exports.getPublicMortageUserFromUserIds = exports.getPublicMortageUserProfile = exports.getPublicProfile = exports.getPublicBusinessProfile = void 0;
/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Business_1 = require("../entity/Business");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const getPublicBusinessProfile = (business) => __awaiter(void 0, void 0, void 0, function* () {
    if (!business) {
        return;
    }
    return {
        businessName: business.name,
        businessAddress: business.address,
    };
});
exports.getPublicBusinessProfile = getPublicBusinessProfile;
const getPublicProfile = (theUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const businessRepo = connection.getRepository(Business_1.Business);
    const business = yield businessRepo.findOne({ userId: theUser.id });
    const businessPublicProfile = yield (0, exports.getPublicBusinessProfile)(business);
    const userPhoto = theUser.photo || Utils.userDefaultAvatarCloudFile();
    const storeFrontBanner = theUser.storeFrontBanner || Utils.defaultStoreFrontBanner();
    const profileData = {
        userUuid: theUser.uuid,
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        photoUrl: userPhoto.url,
        storeFrontBannerImageUrl: storeFrontBanner.url,
        role: theUser.role,
        sellerUniqueCode: theUser.uniqueCode,
        accountRating: {
            totalRatingsValue: theUser.totalRatingsValue,
            totalNumberOfRatings: theUser.totalNumberOfRatings,
        },
        businessProfile: businessPublicProfile
    };
    return profileData;
});
exports.getPublicProfile = getPublicProfile;
const getPublicMortageUserProfile = (theUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userPhoto = theUser.photo || Utils.userDefaultAvatarCloudFile();
    const storeFrontBanner = theUser.storeFrontBanner || Utils.defaultStoreFrontBanner();
    const profileData = {
        userUuid: theUser.uuid,
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        photoUrl: userPhoto.url,
        storeFrontBannerImageUrl: storeFrontBanner.url,
        role: theUser.role,
        sellerUniqueCode: theUser.uniqueCode,
        accountRating: {
            totalRatingsValue: theUser.totalRatingsValue,
            totalNumberOfRatings: theUser.totalNumberOfRatings,
        },
    };
    return profileData;
});
exports.getPublicMortageUserProfile = getPublicMortageUserProfile;
const getPublicMortageUserFromUserIds = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userIds.length) {
        return [];
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const users = yield userRepo.find({
        id: (0, typeorm_1.In)(userIds),
    });
    if (!users.length) {
        return [];
    }
    const profilesData = [];
    for (const user of users) {
        const userData = users.find(u => u.id === user.id);
        if (!userData) {
            continue;
        }
        const userPhoto = userData.photo || Utils.userDefaultAvatarCloudFile();
        profilesData.push({
            userUuid: userData.uuid,
            userId: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            photoUrl: userPhoto.url,
            phoneNumber: userData.msisdn,
            sellerUniqueCode: userData.uniqueCode,
            role: userData.role,
            accountRating: {
                totalRatingsValue: user.totalRatingsValue,
                totalNumberOfRatings: user.totalNumberOfRatings,
            },
        });
    }
    return profilesData;
});
exports.getPublicMortageUserFromUserIds = getPublicMortageUserFromUserIds;
const activateCStoreUser = (customerUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const isOnCStoreValue = !((_a = customerUser.settings) === null || _a === void 0 ? void 0 : _a.isOnCStore);
    yield userRepo
        .createQueryBuilder()
        .update(User_1.User)
        .set({
        settings: Object.assign(Object.assign({}, customerUser === null || customerUser === void 0 ? void 0 : customerUser.settings), { isOnCStore: isOnCStoreValue }),
    })
        .where({ id: customerUser.id })
        .execute();
    // send mail to user about his c-store activation
    return true;
});
exports.activateCStoreUser = activateCStoreUser;
const getBusinessProfile = (business) => __awaiter(void 0, void 0, void 0, function* () {
    if (!business) {
        return {};
    }
    return {
        businessName: business.name,
        businessAddress: business.address,
        businessCACNumber: business.cacNumber,
    };
});
exports.getBusinessProfile = getBusinessProfile;
const getBusinessProfileFromUser = (theUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const businessRepo = connection.getRepository(Business_1.Business);
    const business = yield businessRepo.findOne({
        userId: theUser.id
    });
    if (!business) {
        return;
    }
    const businessProfileData = yield (0, exports.getBusinessProfile)(business);
    return businessProfileData;
});
exports.getBusinessProfileFromUser = getBusinessProfileFromUser;
const getSelfProfile = (theUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const businessProfileData = yield (0, exports.getBusinessProfileFromUser)(theUser);
    const userPhoto = theUser.photo || Utils.userDefaultAvatarCloudFile();
    const profileData = {
        userUuid: theUser.uuid,
        isOnProductLease: !!((_b = theUser.settings) === null || _b === void 0 ? void 0 : _b.isOnProductLease),
        isOnDelayedProductLease: !!((_c = theUser.settings) === null || _c === void 0 ? void 0 : _c.isOnDelayedProductLease),
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        emailAddress: theUser.emailAddress,
        msisdn: theUser.msisdn,
        photoUrl: userPhoto.url,
        role: theUser.role,
        isCooperate: theUser.isCooperate,
        accountId: theUser.accountId,
        wareHouseid: theUser.wareHouseId,
        sellerUniqueCode: theUser.uniqueCode,
        accountRating: {
            totalRatingsValue: theUser.totalRatingsValue,
            totalNumberOfRatings: theUser.totalNumberOfRatings,
        },
        businessProfile: businessProfileData
    };
    return profileData;
});
exports.getSelfProfile = getSelfProfile;
const getPublicProfileFromUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const user = yield userRepo.findOne({
        id: userId
    });
    if (!user) {
        throw new error_response_types_1.NotFoundError('User not found');
    }
    const publicProfile = yield (0, exports.getPublicProfile)(user);
    return publicProfile;
});
exports.getPublicProfileFromUserId = getPublicProfileFromUserId;
const getPublicProfileFromUserUuid = (userUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const user = yield userRepo.findOne({
        uuid: userUuid
    });
    if (!user) {
        throw new error_response_types_1.NotFoundError('User not found');
    }
    const publicProfile = yield (0, exports.getPublicProfile)(user);
    return publicProfile;
});
exports.getPublicProfileFromUserUuid = getPublicProfileFromUserUuid;
const getBusinessProfileFromUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const businessRepo = connection.getRepository(Business_1.Business);
    const user = yield userRepo.findOne({
        id: userId
    });
    const business = yield businessRepo.findOne({
        userId,
    });
    if (!business) {
        return;
    }
    const businessProfileData = yield (0, exports.getBusinessProfile)(business);
    return businessProfileData;
});
exports.getBusinessProfileFromUserId = getBusinessProfileFromUserId;
const getPublicProfileFromUserIds = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userIds.length) {
        return [];
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const users = yield userRepo.find({
        id: (0, typeorm_1.In)(userIds),
    });
    if (!users.length) {
        return [];
    }
    const businessRepo = connection.getRepository(Business_1.Business);
    const businesses = yield businessRepo.find({ userId: (0, typeorm_1.In)(userIds) });
    const profilesData = [];
    for (const user of users) {
        const userData = users.find(u => u.id === user.id);
        if (!userData) {
            continue;
        }
        const userPhoto = userData.photo || Utils.userDefaultAvatarCloudFile();
        const businessData = businesses.find(biz => biz.userId === user.id);
        profilesData.push({
            userUuid: userData.uuid,
            userId: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            photoUrl: userPhoto.url,
            phoneNumber: userData.msisdn,
            sellerUniqueCode: userData.uniqueCode,
            role: userData.role,
            accountRating: {
                totalRatingsValue: user.totalRatingsValue,
                totalNumberOfRatings: user.totalNumberOfRatings,
            },
            businessProfile: businessData ? {
                businessName: businessData.name,
                businessAddress: businessData.address,
            } : null
        });
    }
    return profilesData;
});
exports.getPublicProfileFromUserIds = getPublicProfileFromUserIds;
const getPublicProfileFromUserIdsForAdmin = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    if (!userIds.length) {
        return [];
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const users = yield userRepo.find({
        id: (0, typeorm_1.In)(userIds),
    });
    const walletRepo = connection.getRepository(Wallet_1.Wallet);
    const wallets = yield walletRepo.find({ userId: (0, typeorm_1.In)(userIds) });
    const profilesData = [];
    for (const user of users) {
        const userData = users.find(u => u.id === user.id);
        if (!userData || userData === null) {
            continue;
        }
        const userPhoto = (_d = userData === null || userData === void 0 ? void 0 : userData.photo) !== null && _d !== void 0 ? _d : Utils.userDefaultAvatarCloudFile();
        const accountWalletData = wallets.find(wall => wall.userId === userData.id);
        const profileData = {
            id: userData.uuid,
            userId: userData.id,
            userUuid: userData.uuid,
            isOnProductLease: !!((_e = userData === null || userData === void 0 ? void 0 : userData.settings) === null || _e === void 0 ? void 0 : _e.isOnProductLease),
            isOnDelayedProductLease: !!((_f = userData === null || userData === void 0 ? void 0 : userData.settings) === null || _f === void 0 ? void 0 : _f.isOnDelayedProductLease),
            firstName: userData.firstName,
            lastName: userData.lastName,
            photoUrl: userPhoto.url,
            role: userData.role,
            isSeller: userData.isSeller,
            isCooperate: userData.isCooperate,
            accountId: userData.accountId,
            sellerUniqueCode: userData.uniqueCode,
            accountRating: {
                totalRatingsValue: userData.totalRatingsValue,
                totalNumberOfRatings: userData.totalNumberOfRatings,
            },
            businessProfile: null,
            msisdn: userData.msisdn,
            phoneNumber: userData.phoneNumber,
            walletBalanceMajor: accountWalletData ? (_g = (accountWalletData === null || accountWalletData === void 0 ? void 0 : accountWalletData.walletBalanceMinor) / 100) !== null && _g !== void 0 ? _g : 0 : 0,
            walletCurrency: accountWalletData ? accountWalletData.currency : "",
        };
        profilesData.push(profileData);
    }
    return profilesData;
});
exports.getPublicProfileFromUserIdsForAdmin = getPublicProfileFromUserIdsForAdmin;
const getUserBuyerFullDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const user = yield userRepo.findOne({
        where: { id: userId }
    });
    if (!user) {
        throw new error_response_types_1.UnprocessableEntityError("Buyer User Not Found");
    }
    return user;
});
exports.getUserBuyerFullDetails = getUserBuyerFullDetails;
const getUserSellerFullDetails = (sellerUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const businessRepo = connection.getRepository(Business_1.Business);
    const sellerDetails = yield userRepo.findOne({
        where: { id: sellerUserId, isSeller: true }
    });
    if (!sellerDetails) {
        throw new error_response_types_1.UnprocessableEntityError("Seller Does Not Exist");
    }
    const sellerBusiness = yield businessRepo.findOne({
        where: { userId: sellerDetails.id }
    });
    if (!sellerBusiness) {
        throw new error_response_types_1.UnprocessableEntityError("Seller Must Update Business Information Before They Can Accept Order.");
    }
    return sellerDetails;
});
exports.getUserSellerFullDetails = getUserSellerFullDetails;
//# sourceMappingURL=profileService.js.map