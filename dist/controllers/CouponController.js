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
exports.CouponController = void 0;
/* eslint-disable @typescript-eslint/no-parameter-properties */
const _ = __importStar(require("underscore"));
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const CouponService = __importStar(require("../services/couponService"));
const Coupon_1 = require("../entity/Coupon");
const Product_1 = require("../entity/Product");
const SortOrder_1 = require("../enums/SortOrder");
const error_response_types_1 = require("../utils/error-response-types");
const ProductsService = __importStar(require("../services/productsService"));
const PaginationService = __importStar(require("../services/paginationService"));
const Constants = __importStar(require("../constants"));
let CouponController = class CouponController extends tsoa_1.Controller {
    handleNewProductCoupon(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { code, description, expiryDate, orderMinAmountMajor, productUuid, couponValue, couponValueType } = reqBody;
            const couponsRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
            const existingCoupon = yield couponsRepo.findOne({
                code: code.toUpperCase()
            });
            if (existingCoupon) {
                throw new error_response_types_1.ConflictError('A coupon with the same code already exists');
            }
            const producrRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const product = yield producrRepo.findOne({ uuid: productUuid });
            if ((product === null || product === void 0 ? void 0 : product.userId) !== currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError('Can not create coupon code on a product that is not in your catalogue');
            }
            yield CouponService.saveProductCouponCode(code, description !== null && description !== void 0 ? description : '', product.id, product.userId, couponValueType, couponValue, expiryDate !== null && expiryDate !== void 0 ? expiryDate : undefined, orderMinAmountMajor !== null && orderMinAmountMajor !== void 0 ? orderMinAmountMajor : undefined);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleGetCouponsPaginatedList(req, pageNumber, sortOrder, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const query = {
                userId: currentUser.id,
                isActive
            };
            const join = {
                alias: "coupons",
                leftJoinAndSelect: {
                    product: "coupons.product",
                },
            };
            const pageSize = Constants.DEFAULT_PAGE_SIZE;
            const couponListsPage = yield PaginationService.paginate(Coupon_1.Coupon, query, pageSize, pageNumber, sortOrder, undefined, join);
            const couponRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const totalCount = yield couponRepo.count(query);
            const couponsDataset = couponListsPage.dataset;
            const productIds = [];
            for (const coup of couponsDataset) {
                if (coup.productId)
                    productIds.push(coup.productId);
            }
            let products = [];
            if (productIds.length) {
                products = yield productRepo.find({ id: (0, typeorm_1.In)(productIds) });
            }
            const transformProducts = yield ProductsService.transformProducts(products);
            const transformedCouponDataset = couponsDataset.map(coupon => {
                var _a;
                const couponProduct = transformProducts.find(product => { var _a; return product.productUuid === ((_a = coupon.product) === null || _a === void 0 ? void 0 : _a.uuid); });
                return {
                    code: coupon.code,
                    description: coupon.description,
                    expiryDate: coupon.expiryDate,
                    valueType: coupon.valueType,
                    value: coupon.value,
                    applyType: coupon.applyType,
                    isActive: coupon.isActive,
                    productUuid: (_a = coupon.product) === null || _a === void 0 ? void 0 : _a.uuid,
                    product: couponProduct,
                    orderMinAmountMajor: coupon.orderMinimumAmountMajor,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedCouponDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleDeactivateCoupon(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const couponRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
            const existingCoupon = yield couponRepo.findOne({ code: reqBody.code.toUpperCase() });
            if (!existingCoupon) {
                throw new error_response_types_1.ConflictError('The coupon does not exist');
            }
            if (existingCoupon.userId !== currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError('You are not allowed to deactivate a coupon you did not create');
            }
            yield couponRepo
                .createQueryBuilder()
                .update(Coupon_1.Coupon)
                .set({ isActive: false })
                .where({ id: existingCoupon.id })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleUpdateCoupon(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (!_.without(Object.keys(reqBody), 'code').length) {
                throw new error_response_types_1.BadRequestError('You specified nothing to update on the coupon');
            }
            const couponRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
            const existingCoupon = yield couponRepo.findOne({ code: reqBody.code.toUpperCase() });
            if (!existingCoupon) {
                throw new error_response_types_1.ConflictError('The coupon does not exist');
            }
            if (existingCoupon.userId !== currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError('You are not allowed to update a coupon you did not create');
            }
            const updateQuery = {};
            if (reqBody.description) {
                updateQuery.description = reqBody.description;
            }
            if (reqBody.expiryDate) {
                updateQuery.expiryDate = reqBody.expiryDate;
            }
            if (reqBody.orderMinimumAmountMajor) {
                updateQuery.orderMinimumAmountMajor = reqBody.orderMinimumAmountMajor;
            }
            yield couponRepo
                .createQueryBuilder()
                .update(Coupon_1.Coupon)
                .set(updateQuery)
                .where({ id: existingCoupon.id })
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
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "handleNewProductCoupon", null);
__decorate([
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("isActive")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "handleGetCouponsPaginatedList", null);
__decorate([
    (0, tsoa_1.Put)("/deactivate"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "handleDeactivateCoupon", null);
__decorate([
    (0, tsoa_1.Put)("/update"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "handleUpdateCoupon", null);
CouponController = __decorate([
    (0, tsoa_1.Route)("api/coupons"),
    (0, tsoa_1.Tags)("Coupon"),
    (0, tsoa_1.Security)("jwt")
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=CouponController.js.map