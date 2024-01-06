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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickupLocationController = void 0;
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const db_1 = require("../db");
const PickupLocation_1 = require("../entity/PickupLocation");
const User_1 = require("../entity/User");
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let PickupLocationController = class PickupLocationController extends tsoa_1.Controller {
    handleAddPickUpLocation(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const sellerRepo = connection.getRepository(User_1.User);
            const isloginSeller = yield sellerRepo.findOne({
                id: currentUser.id,
                isSeller: true,
            });
            if (!isloginSeller) {
                throw new error_response_types_1.ConflictError("Only sellers can add a pickup location");
            }
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const existingPickupLocation = yield pickupLocationRepo.findOne({
                userId: currentUser.id,
                name: requestBody.name,
            });
            if (existingPickupLocation) {
                throw new error_response_types_1.ConflictError("Seller Pickup Location with the Name Provided Already Exist");
            }
            const { name, address, country, state, contactFullName, contactPhoneNumber } = requestBody;
            let pickupLocation = new PickupLocation_1.PickupLocation().initialize(currentUser.id, name !== null && name !== void 0 ? name : '', address !== null && address !== void 0 ? address : '', country !== null && country !== void 0 ? country : 'NGN', state !== null && state !== void 0 ? state : '', contactFullName !== null && contactFullName !== void 0 ? contactFullName : '', contactPhoneNumber !== null && contactPhoneNumber !== void 0 ? contactPhoneNumber : '');
            pickupLocation = yield pickupLocation.save();
            const resData = {
                status: true,
                data: _.omit(pickupLocation, "id", "createdAt", "updatedAt"),
            };
            return resData;
        });
    }
    getPickupLocations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const pickupLocations = yield pickupLocationRepo.find({
                userId: currentUser.id,
                isSoftDeleted: false,
            });
            const formattedLocations = _.map(pickupLocations, (loc) => _.omit(loc, "id", "user", "createdAt", "updatedAt"));
            const resData = {
                status: true,
                data: formattedLocations,
            };
            return resData;
        });
    }
    getUserPickupLocations(req, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const user = yield userRepo.findOne({ uuid: userUuid });
            if (!user) {
                throw new error_response_types_1.NotFoundError('User does not exist');
            }
            const pickupLocations = yield pickupLocationRepo.find({
                userId: user.id,
                isSoftDeleted: false,
            });
            if (pickupLocations.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('User does not have pickup locations');
            }
            const formattedLocations = _.map(pickupLocations, (loc) => _.omit(loc, "id", "user", "createdAt", "updatedAt"));
            const resData = {
                status: true,
                data: formattedLocations,
            };
            return resData;
        });
    }
    handleGetPickupLocationDetails(req, locationUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const location = yield pickupLocationRepo.findOne({
                uuid: locationUuid,
                isSoftDeleted: false,
            });
            const resData = {
                status: true,
                data: _.omit(location, "id", "userId", "user", "createdAt", "updatedAt", "isSoftDeleted"),
            };
            return resData;
        });
    }
    updateSellerPickUpLocation(req, requestBody, locationUuid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const pickupLocation = yield pickupLocationRepo.findOne({
                userId: currentUser.id,
                uuid: locationUuid,
            });
            if (!pickupLocation) {
                throw new error_response_types_1.NotFoundError("Location was not found");
            }
            yield pickupLocationRepo.createQueryBuilder()
                .update(PickupLocation_1.PickupLocation)
                .set({
                name: requestBody === null || requestBody === void 0 ? void 0 : requestBody.name,
                address: requestBody === null || requestBody === void 0 ? void 0 : requestBody.address,
                country: requestBody === null || requestBody === void 0 ? void 0 : requestBody.country,
                contactFullName: (_a = requestBody === null || requestBody === void 0 ? void 0 : requestBody.contactFullName) !== null && _a !== void 0 ? _a : '',
                contactPhoneNumber: (_b = requestBody === null || requestBody === void 0 ? void 0 : requestBody.contactPhoneNumber) !== null && _b !== void 0 ? _b : '',
            })
                .where({ id: pickupLocation.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    deletePickupLocation(req, locationUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
            const pickupLocation = yield pickupLocationRepo.findOne({
                userId: currentUser.id,
                uuid: locationUuid,
            });
            if (!pickupLocation) {
                throw new error_response_types_1.NotFoundError("Location was not found");
            }
            yield pickupLocationRepo
                .createQueryBuilder()
                .update(PickupLocation_1.PickupLocation)
                .set({ isSoftDeleted: true })
                .where({ id: pickupLocation.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "handleAddPickUpLocation", null);
__decorate([
    (0, tsoa_1.Get)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "getPickupLocations", null);
__decorate([
    (0, tsoa_1.Get)("/:userUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "getUserPickupLocations", null);
__decorate([
    (0, tsoa_1.Get)("/:locationUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "handleGetPickupLocationDetails", null);
__decorate([
    (0, tsoa_1.Put)("/:locationUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "updateSellerPickUpLocation", null);
__decorate([
    (0, tsoa_1.Delete)("/:locationUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PickupLocationController.prototype, "deletePickupLocation", null);
PickupLocationController = __decorate([
    (0, tsoa_1.Route)("api/pickuplocations"),
    (0, tsoa_1.Tags)("Pickup Locations")
], PickupLocationController);
exports.PickupLocationController = PickupLocationController;
//# sourceMappingURL=PickupLocationController.js.map