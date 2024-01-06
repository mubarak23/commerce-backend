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
exports.MortgageAccountVerification = void 0;
// MortgageAccountVerificationColumns 
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Roles_1 = require("../enums/Roles");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const User_1 = require("./User");
// MORTAGE_USERS MortageUserColumns
let MortgageAccountVerification = class MortgageAccountVerification extends BaseEntity_1.default {
    initialize(userId, accountType) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.accountType = accountType;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortgageAccountVerificationColumns.UUID, unique: true }),
    __metadata("design:type", String)
], MortgageAccountVerification.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortgageAccountVerificationColumns.USER_ID, nullable: false }),
    __metadata("design:type", Number)
], MortgageAccountVerification.prototype, "userId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.MortgageAccountVerificationColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], MortgageAccountVerification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortgageAccountVerificationColumns.ACCOUNT_TYPE, nullable: true }),
    __metadata("design:type", String)
], MortgageAccountVerification.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.MortgageAccountVerificationColumns.BANK_STATEMENT, nullable: true }),
    __metadata("design:type", Object)
], MortgageAccountVerification.prototype, "bankStatement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.BANK_STATEMENT_APPROVED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "bankStatementApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.MortgageAccountVerificationColumns.GOVERNMENT_APPROVED_ID, nullable: true }),
    __metadata("design:type", Object)
], MortgageAccountVerification.prototype, "governmentApprovedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.MortgageAccountVerificationColumns.CAC_CERTIFICATE, nullable: true }),
    __metadata("design:type", Object)
], MortgageAccountVerification.prototype, "cacCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.CAC_CERTIFICATE_APPROVED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "cacCertificateApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.GOVERNMENT_APPROVED_ID_APPROVED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "governmentApprovedIdApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.MortgageAccountVerificationColumns.RECENT_UTILITY_BILL, nullable: true }),
    __metadata("design:type", Object)
], MortgageAccountVerification.prototype, "recentUtilityBill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.RECENT_UTILITY_BILL_APPROVED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "recentUtilityBillApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.IS_APPROVED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.ACCOUNT_CONFIRMED, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "accountConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortgageAccountVerificationColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MortgageAccountVerification.prototype, "isSoftDeleted", void 0);
MortgageAccountVerification = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.MORTGAGE_ACCOUNT_VERIFICATIONS }),
    (0, typeorm_2.Index)(['user']),
    (0, typeorm_2.Index)(['uuid'])
], MortgageAccountVerification);
exports.MortgageAccountVerification = MortgageAccountVerification;
//# sourceMappingURL=MortgageAccountVerification.js.map