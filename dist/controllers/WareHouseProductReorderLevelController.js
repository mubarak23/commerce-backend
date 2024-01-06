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
exports.WareHouseProductReorderLevelController = void 0;
/* eslint-disable @typescript-eslint/no-parameter-properties */
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Product_1 = require("../entity/Product");
const WareHouse_1 = require("../entity/WareHouse");
const WareHouseProductPurchase_1 = require("../entity/WareHouseProductPurchase");
const WareHouseProductReorderLevel_1 = require("../entity/WareHouseProductReorderLevel");
const CooperateService = __importStar(require("../services/cooperateService"));
const WareHouseService = __importStar(require("../services/warehouseService"));
const error_response_types_1 = require("../utils/error-response-types");
let WareHouseProductReorderLevelController = class WareHouseProductReorderLevelController {
    handleCreateProductReorderLevel(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { wareHouseUuid, productUuid, level } = reqBody;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = connection.getRepository(Product_1.Product);
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel_1.WareHouseProductReorderLevel);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('WareHouse Does Not Exist');
            }
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid
            });
            if (!existingProduct) {
                throw new error_response_types_1.UnprocessableEntityError('Product Does Not Exist');
            }
            const wareHouseProductPurchase = yield wareHouseProductPurchaseRepo.findOne({
                wareHouseId: existingWareHouse.id,
                productId: existingProduct.id
            });
            if (!wareHouseProductPurchase) {
                throw new error_response_types_1.UnprocessableEntityError('The Product Selected Does Not Exist in the WareHouse');
            }
            yield WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse);
            const exisitngProductReorderLevel = yield wareHouseProductReorderLevelRepo.findOne({
                wareHouseId: existingWareHouse.id,
                productId: existingProduct.id,
                isSoftDeleted: false
            });
            if (exisitngProductReorderLevel) {
                yield wareHouseProductReorderLevelRepo.createQueryBuilder()
                    .update(WareHouseProductReorderLevel_1.WareHouseProductReorderLevel)
                    .set({ level })
                    .where({ id: exisitngProductReorderLevel.id })
                    .execute();
            }
            // create a new one 
            let setProductReorderLevel = new WareHouseProductReorderLevel_1.WareHouseProductReorderLevel().initialize(currentUser.id, existingWareHouse.id, existingProduct.id, level);
            setProductReorderLevel = yield wareHouseProductReorderLevelRepo.save(setProductReorderLevel);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleFetchWareReorderLevel(req, wareHouseUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const productRepo = connection.getRepository(Product_1.Product);
            const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
            const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel_1.WareHouseProductReorderLevel);
            const existingWareHouse = yield wareHouseRepo.findOne({
                uuid: wareHouseUuid,
                accountId: currentUser.accountId
            });
            if (!existingWareHouse) {
                throw new error_response_types_1.UnprocessableEntityError('WareHouse Does Not Exist');
            }
            const wareHouseReorderLevel = yield wareHouseProductReorderLevelRepo.find({
                wareHouseId: existingWareHouse.id,
                isSoftDeleted: false
            });
            if (wareHouseReorderLevel.length === 0) {
                throw new error_response_types_1.NotFoundError('No Reorder Level Products');
            }
            const productIds = wareHouseReorderLevel.map(product => product.productId);
            const productDetails = yield productRepo.find({ id: (0, typeorm_1.In)(productIds) });
            const wareHouseProductPurchase = yield wareHouseProductPurchaseRepo.find({
                productId: (0, typeorm_1.In)(productIds)
            });
            if (!wareHouseProductPurchase) {
                throw new error_response_types_1.NotFoundError('No Reorder Level Products');
            }
            const transformWareProductReorderLevels = wareHouseReorderLevel.map(reorderLevel => {
                const productDetail = productDetails.find(product => product.id === reorderLevel.productId);
                const productPurchaseDetails = wareHouseProductPurchase.find(purchase => purchase.productId === reorderLevel.productId);
                return {
                    uuid: reorderLevel.uuid,
                    produtUuid: productDetail === null || productDetail === void 0 ? void 0 : productDetail.uuid,
                    productName: productDetail === null || productDetail === void 0 ? void 0 : productDetail.name,
                    wareHouseDetail: existingWareHouse,
                    level: reorderLevel.level,
                    avalailableInStock: productPurchaseDetails === null || productPurchaseDetails === void 0 ? void 0 : productPurchaseDetails.availableQuantity
                };
            });
            const resData = {
                status: true,
                data: transformWareProductReorderLevels
            };
            return resData;
        });
    }
    handleDeleteProderReorderLevel(req, reorderLevelUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel_1.WareHouseProductReorderLevel);
            const wareHouseProductReorderLevel = yield wareHouseProductReorderLevelRepo.findOne({
                uuid: reorderLevelUuid
            });
            if (!wareHouseProductReorderLevel) {
                throw new error_response_types_1.UnprocessableEntityError('Product Reorder Level was Not Set');
            }
            yield wareHouseProductReorderLevelRepo.createQueryBuilder()
                .update(WareHouseProductReorderLevel_1.WareHouseProductReorderLevel)
                .set({ isSoftDeleted: true })
                .where({
                uuid: wareHouseProductReorderLevel.uuid
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WareHouseProductReorderLevelController.prototype, "handleCreateProductReorderLevel", null);
__decorate([
    (0, tsoa_1.Get)('/:wareHouseUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("wareHouseUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseProductReorderLevelController.prototype, "handleFetchWareReorderLevel", null);
__decorate([
    (0, tsoa_1.Delete)('/:reorderLevelUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("reorderLevelUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WareHouseProductReorderLevelController.prototype, "handleDeleteProderReorderLevel", null);
WareHouseProductReorderLevelController = __decorate([
    (0, tsoa_1.Route)("api/reorderlevel"),
    (0, tsoa_1.Tags)('Reorder Level'),
    (0, tsoa_1.Security)("jwt")
], WareHouseProductReorderLevelController);
exports.WareHouseProductReorderLevelController = WareHouseProductReorderLevelController;
//# sourceMappingURL=WareHouseProductReorderLevelController.js.map