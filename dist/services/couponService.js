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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProductCouponCode = exports.isCouponValid = void 0;
const typeorm_1 = require("typeorm");
const Coupon_1 = require("../entity/Coupon");
const error_response_types_1 = require("../utils/error-response-types");
const isCouponValid = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const couponsRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
    const existingCoupon = yield couponsRepo.findOne({
        code: code.toUpperCase()
    });
    if (existingCoupon) {
        throw new error_response_types_1.ConflictError('A coupon with the same code already exists');
    }
    return true;
});
exports.isCouponValid = isCouponValid;
const saveProductCouponCode = (code, description, productId, userId, couponValueType, value, expiryDate, orderMinimumAmountMajor) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductCoupon = new Coupon_1.Coupon().initialize(code.toUpperCase(), description, userId, productId, couponValueType, value, expiryDate, orderMinimumAmountMajor);
    const couponRepo = (0, typeorm_1.getRepository)(Coupon_1.Coupon);
    const saveCode = yield couponRepo.save(newProductCoupon);
    return saveCode;
});
exports.saveProductCouponCode = saveProductCouponCode;
//# sourceMappingURL=couponService.js.map