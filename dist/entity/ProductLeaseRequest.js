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
exports.ProductLeaseRequest = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const User_1 = require("./User");
const transformers_1 = require("../utils/transformers");
let ProductLeaseRequest = class ProductLeaseRequest extends BaseEntity_1.default {
    initialize(userId, newProductLeaseRquest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.firstName = newProductLeaseRquest.firstName;
        this.lastName = newProductLeaseRquest.lastName;
        this.phoneNumber = newProductLeaseRquest.phoneNumber;
        this.emailAddress = newProductLeaseRquest.emailAddress;
        this.stateResidence = newProductLeaseRquest.stateResidence;
        this.bvn = (_a = newProductLeaseRquest.bvn) !== null && _a !== void 0 ? _a : undefined;
        this.idCardNumber = (_b = newProductLeaseRquest.idCardNumber) !== null && _b !== void 0 ? _b : undefined;
        this.businessType = (_c = newProductLeaseRquest.businessType) !== null && _c !== void 0 ? _c : undefined;
        this.cacNumber = (_d = newProductLeaseRquest.cacNumber) !== null && _d !== void 0 ? _d : undefined;
        this.companyName = (_e = newProductLeaseRquest.companyName) !== null && _e !== void 0 ? _e : undefined;
        this.companyAddress = (_f = newProductLeaseRquest.companyAddress) !== null && _f !== void 0 ? _f : undefined;
        this.jobTitle = (_g = newProductLeaseRquest.jobTitle) !== null && _g !== void 0 ? _g : undefined;
        this.modeOfDelivery = (_h = newProductLeaseRquest.modeOfDelivery) !== null && _h !== void 0 ? _h : undefined;
        this.productCategoryUuid = (_j = newProductLeaseRquest.productCategoryUuid) !== null && _j !== void 0 ? _j : undefined;
        this.productQuantity = (_k = newProductLeaseRquest.productQuantity) !== null && _k !== void 0 ? _k : undefined;
        this.principalAmountMajor = (_l = newProductLeaseRquest.principalAmountMajor) !== null && _l !== void 0 ? _l : undefined;
        this.currency = newProductLeaseRquest.currency || "NGN";
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto() {
        var _a;
        return {
            uuid: this.uuid,
            principalAmountMajor: (_a = this.principalAmountMajor) !== null && _a !== void 0 ? _a : 0,
            currency: this.currency,
            createdAtUtc: this.createdAt,
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseRequestColumns.UUID, unique: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseRequestColumns.USER_ID }),
    __metadata("design:type", Number)
], ProductLeaseRequest.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.ProductLeaseRequestColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID, }),
    __metadata("design:type", User_1.User)
], ProductLeaseRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.FIRST_NAME, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.LAST_NAME, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.PHONE_NUMBER, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.EMAIL_ADDRESS, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.STATE_RESIDENCE, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "stateResidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.BVN, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "bvn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.BUSINESS_TYPE, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.CAC_NUMBER, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "cacNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.COMPANY_NAME, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.ID_CARD_NUMBER, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "idCardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.COMPANY_ADDRESS, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "companyAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.JOB_TITLE, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "jobTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.MODE_OF_DELIVERY, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "modeOfDelivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.PRODUCT_CATEGORY, nullable: true }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "productCategoryUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductLeaseRequestColumns.PRODUCT_QUANTITY, nullable: true }),
    __metadata("design:type", Number)
], ProductLeaseRequest.prototype, "productQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseRequestColumns.CURRENCY, nullable: false, default: 'NG' }),
    __metadata("design:type", String)
], ProductLeaseRequest.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.ProductLeaseRequestColumns.PRINCIPAL_AMOUNT_MAJOR, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], ProductLeaseRequest.prototype, "principalAmountMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.ProductLeaseRequestColumns.UPLOADS, nullable: true }),
    __metadata("design:type", Array)
], ProductLeaseRequest.prototype, "uploads", void 0);
ProductLeaseRequest = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PRODUCT_LEASE_REQUESTS }),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['uuid'])
], ProductLeaseRequest);
exports.ProductLeaseRequest = ProductLeaseRequest;
//# sourceMappingURL=ProductLeaseRequest.js.map