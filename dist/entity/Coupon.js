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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const Product_1 = require("./Product");
const CouponValueType_1 = require("../enums/CouponValueType");
const CouponApplyType_1 = require("../enums/CouponApplyType");
let Coupon = class Coupon extends BaseEntity_1.default {
    initialize(code, description, userId, productId, type, value, expiryDate, orderMinimumAmountMajor) {
        this.code = code;
        this.description = description;
        this.userId = userId;
        this.productId = productId;
        this.valueType = type;
        this.value = value;
        this.expiryDate = expiryDate;
        this.orderMinimumAmountMajor = orderMinimumAmountMajor;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.USER_ID }),
    __metadata("design:type", Number)
], Coupon.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.CouponsColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID, }),
    __metadata("design:type", Object)
], Coupon.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.PRODUCT_ID }),
    __metadata("design:type", Number)
], Coupon.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.CouponsColumns.PRODUCT_ID, referencedColumnName: TableColumns_1.default.ID, }),
    __metadata("design:type", Product_1.Product)
], Coupon.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.CouponsColumns.CODE, nullable: false }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.CouponsColumns.DESCRIPTION, nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.VALUE_TYPE, nullable: false }),
    __metadata("design:type", String)
], Coupon.prototype, "valueType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.APPLY_TYPE, nullable: false }),
    __metadata("design:type", String)
], Coupon.prototype, "applyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.EXPIRY_DATE, nullable: true }),
    __metadata("design:type", Date)
], Coupon.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", name: TableColumns_1.CouponsColumns.VALUE, nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(), }),
    __metadata("design:type", Number)
], Coupon.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: TableColumns_1.CouponsColumns.IS_ACTIVE, nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CouponsColumns.ORDER_MINIMUM_AMOUNT_MAJOR, nullable: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "orderMinimumAmountMajor", void 0);
Coupon = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.COUPONS }),
    (0, typeorm_1.Index)(["code"], { unique: true })
], Coupon);
exports.Coupon = Coupon;
//# sourceMappingURL=Coupon.js.map