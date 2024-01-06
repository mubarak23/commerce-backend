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
exports.DeliveryLocationController = void 0;
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const User_1 = require("../entity/User");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let DeliveryLocationController = class DeliveryLocationController extends tsoa_1.Controller {
    handleGetDeliveryLocations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const deliveryaddresses = yield deliveryLocationRepo.find({
                userId: currentUser.id,
                isSoftDeleted: false,
            });
            const formattedDeliveryAddresses = _.map(deliveryaddresses, (loc) => _.omit(loc, "id", "user", "createdAt", "updatedAt"));
            const resData = {
                status: true,
                data: formattedDeliveryAddresses,
            };
            return resData;
        });
    }
    handleUserDeliveryLocations(req, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const userRepo = connection.getRepository(User_1.User);
            const user = yield userRepo.findOne({ uuid: userUuid });
            if (!user) {
                throw new error_response_types_1.NotFoundError('User does not exist');
            }
            const deliveryaddresses = yield deliveryLocationRepo.find({
                userId: user.id,
                isSoftDeleted: false,
            });
            if (deliveryaddresses.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('User does not have delivery locations');
            }
            const formattedDeliveryAddresses = _.map(deliveryaddresses, (loc) => _.omit(loc, "id", "user", "createdAt", "updatedAt"));
            const resData = {
                status: true,
                data: formattedDeliveryAddresses,
            };
            return resData;
        });
    }
    // @Get("/warehouses")
    // public async handleGetWareHouses(@Request() req: any): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>[]>> {
    //   const currentUser: User = req.user;
    //   const connection = await getFreshConnection();
    //   const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
    //   const warehouseRepo = connection.getRepository(WareHouse)
    //   const wareHouses = await warehouseRepo.find({
    //     userId: currentUser.id
    //   })
    //   const warehouseIds: number[] = []
    //   wareHouses.forEach((wareHouse) => {
    //     warehouseIds.push(wareHouse.id)
    //   })
    //   const deliveryWareHouseAddresses = await deliveryLocationRepo.find({
    //     userId: currentUser.id,
    //     wareHouseId: In(warehouseIds),
    //     isSoftDeleted: false,
    //   });
    //   const formattedWareHouseAddresses = _.map(deliveryWareHouseAddresses, (loc) =>
    //     _.omit(loc, "id", "user", "createdAt", "updatedAt")
    //   );
    //   const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>[]> = {
    //     status: true,
    //     data: formattedWareHouseAddresses,
    //   };
    //   return resData;
    // }
    handleGetGetDeliveryLocationDetails(req, locationUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const location = yield DeliveryLocationRepo.findOne({
                uuid: locationUuid,
                isSoftDeleted: false,
            });
            const resData = {
                status: true,
                data: _.omit(location, "id", "user", "createdAt", "updatedAt"),
            };
            return resData;
        });
    }
    handleAddDeliveryLocation(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { address, contactFullName, contactPhoneNumber, country, state } = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const getDeliveryLocation = yield DeliveryLocationRepo.findOne({
                userId: currentUser.id,
                address,
            });
            if (getDeliveryLocation) {
                throw new error_response_types_1.UnprocessableEntityError("Delivery Location Has Been Added On Your List");
            }
            const deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(currentUser.id, address, state, 'Nigeria', contactFullName, contactPhoneNumber);
            yield DeliveryLocationRepo.save(deliveryLocation);
            const resData = {
                status: true,
                data: { uuid: deliveryLocation.uuid }
            };
            return resData;
        });
    }
    updateUserDeliveryLocation(req, requestBody, locationUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const updateDeliveryLocation = requestBody;
            const connection = yield (0, db_1.getFreshConnection)();
            const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const deliveryLocation = yield deliveryLocationRepo.findOne({
                userId: currentUser.id,
                uuid: locationUuid,
            });
            if (!deliveryLocation) {
                throw new error_response_types_1.NotFoundError("Delivery Location was not found");
            }
            const updateQuery = updateDeliveryLocation;
            const deliveryLocationUpdateSuccess = false;
            if (!Object.keys(updateQuery).length) {
                throw new error_response_types_1.BadRequestError("No parameters were specified to update the delivery location");
            }
            yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const deliveryLocationRepoT = transactionalEntityManager.getRepository(DeliveryLocation_1.DeliveryLocation);
                if (!Utils.isNullOrUndefined(updateDeliveryLocation.isDefault)) {
                    yield deliveryLocationRepoT.createQueryBuilder()
                        .update(DeliveryLocation_1.DeliveryLocation)
                        .set({ isDefault: false })
                        .where({ userId: currentUser.id })
                        .execute();
                    yield deliveryLocationRepoT.createQueryBuilder()
                        .update(DeliveryLocation_1.DeliveryLocation)
                        .set({ isDefault: requestBody.isDefault })
                        .where({ id: deliveryLocation.id })
                        .execute();
                    delete updateQuery.isDefault;
                }
                if (Object.keys(updateQuery).length) {
                    yield deliveryLocationRepoT.createQueryBuilder()
                        .update(DeliveryLocation_1.DeliveryLocation)
                        .set(updateQuery)
                        .where({ id: deliveryLocation.id })
                        .execute();
                }
                return true;
            }));
            const resData = {
                status: deliveryLocationUpdateSuccess,
            };
            return resData;
        });
    }
    deleteDeliveryLocation(req, locationUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
            const getDeliveryLocation = yield DeliveryLocationRepo.findOne({
                userId: currentUser.id,
                uuid: locationUuid,
            });
            if (!getDeliveryLocation) {
                throw new error_response_types_1.NotFoundError("Location was not found");
            }
            yield DeliveryLocationRepo.createQueryBuilder()
                .update(DeliveryLocation_1.DeliveryLocation)
                .set({ isSoftDeleted: true })
                .where({ id: getDeliveryLocation.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "handleGetDeliveryLocations", null);
__decorate([
    (0, tsoa_1.Get)("/:userUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "handleUserDeliveryLocations", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/:locationUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "handleGetGetDeliveryLocationDetails", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "handleAddDeliveryLocation", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/:locationUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "updateUserDeliveryLocation", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Delete)("/:locationUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("locationUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "deleteDeliveryLocation", null);
DeliveryLocationController = __decorate([
    (0, tsoa_1.Route)("api/deliverylocations"),
    (0, tsoa_1.Tags)("Delivery Locations")
], DeliveryLocationController);
exports.DeliveryLocationController = DeliveryLocationController;
//# sourceMappingURL=DeliveryLocationController.js.map