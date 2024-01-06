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
exports.ProductLease = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const User_1 = require("./User");
let ProductLease = class ProductLease extends BaseEntity_1.default {
    initialize(userId, principalAmountMinor, nextLeasePaymentDueDate, interestRatePercentage, currency) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.principalAmountMinor = principalAmountMinor;
        this.interestRatePercentage = interestRatePercentage;
        this.nextLeasePaymentDueDate = nextLeasePaymentDueDate;
        this.isDelayed = false;
        //--
        this.nextInterestRatePercentage = interestRatePercentage;
        const plpNextInterestChargeDate = moment_1.default.utc().add(2, 'days').endOf('day').toDate();
        this.nextInterestChargeDate = plpNextInterestChargeDate;
        this.isMultiStageInterestCharge = true;
        this.interestChargeCurrentStage = 1;
        //--
        this.isActive = true;
        this.currency = currency;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    transformForPublic(publicProfile) {
        return Object.assign(Object.assign({}, this), { id: this.uuid, principalAmountMajor: this.principalAmountMinor / 100, nextLeasePaymentDueDateUtc: this.nextLeasePaymentDueDate, createdAtUtc: this.createdAt, publicProfile: publicProfile });
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseColumns.UUID, unique: true }),
    __metadata("design:type", String)
], ProductLease.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseColumns.USER_ID }),
    __metadata("design:type", Number)
], ProductLease.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductLeaseColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], ProductLease.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.ProductLeaseColumns.PRINCIPAL_AMOUNT_MINOR, nullable: false, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], ProductLease.prototype, "principalAmountMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.ProductLeaseColumns.INTEREST_RATE_PERCENTAGE, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], ProductLease.prototype, "interestRatePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseColumns.CURRENCY, nullable: false, default: 'NG' }),
    __metadata("design:type", String)
], ProductLease.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.ProductLeaseColumns.NEXT_LEASE_PAYMENT_DUE_DATE, nullable: true }),
    __metadata("design:type", Date)
], ProductLease.prototype, "nextLeasePaymentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProductLeaseColumns.IS_PAID, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProductLease.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.ProductLeaseColumns.PAID_AT, nullable: true }),
    __metadata("design:type", Date)
], ProductLease.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProductLeaseColumns.IS_DELAYED, default: false }),
    __metadata("design:type", Boolean)
], ProductLease.prototype, "isDelayed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProductLeaseColumns.IS_MULTI_STAGE_INTEREST_CHARGE, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProductLease.prototype, "isMultiStageInterestCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.ProductLeaseColumns.NEXT_INTEREST_CHARGE_DATE, nullable: true }),
    __metadata("design:type", Date)
], ProductLease.prototype, "nextInterestChargeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.ProductLeaseColumns.NEXT_INTEREST_RATE_PERCENTAGE, nullable: true, default: 0, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], ProductLease.prototype, "nextInterestRatePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductLeaseColumns.INTEREST_CHARGE_CURENT_STAGE, nullable: true, default: 1, }),
    __metadata("design:type", Number)
], ProductLease.prototype, "interestChargeCurrentStage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProductLeaseColumns.IS_ACTIVE, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProductLease.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProductLeaseColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProductLease.prototype, "isSoftDeleted", void 0);
ProductLease = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PRODUCT_LEASES }),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['userId', 'isActive', 'isSoftDeleted']),
    (0, typeorm_1.Index)(['userId', 'isActive', 'isPaid', 'isSoftDeleted'])
], ProductLease);
exports.ProductLease = ProductLease;
//# sourceMappingURL=ProductLease.js.map