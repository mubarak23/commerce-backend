"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackDedicatedNuban = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
let PaystackDedicatedNuban = class PaystackDedicatedNuban extends BaseEntity_1.default {
    initialize(userId, bankId, bankName, bankAccountNumber, bankAccountName, paystackCustomerId, paystackIntegration, dedicatedNubanPayload) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.dedicatedNubanPayload = dedicatedNubanPayload;
        this.bankId = bankId;
        this.bankName = bankName;
        this.bankAccountNumber = bankAccountNumber;
        this.bankAccountName = bankAccountName;
        this.paystackCustomerId = paystackCustomerId;
        this.paystackIntegration = paystackIntegration;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PaystackDedicatedNubanColumns.UUID }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.PaystackDedicatedNubanColumns.USER_ID }),
    __metadata("design:type", Number)
], PaystackDedicatedNuban.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.PaystackDedicatedNubanColumns.DEDICATED_NUBAN_PAYLOAD, nullable: false }),
    __metadata("design:type", Object)
], PaystackDedicatedNuban.prototype, "dedicatedNubanPayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.BANK_ID }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "bankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.BANK_NAME }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.BANK_ACCOUNT_NUMBER }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.BANK_ACCOUNT_NAME }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "bankAccountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.PAYSTACK_CUSTOMER_ID, nullable: true }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "paystackCustomerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackDedicatedNubanColumns.PAYSTACK_INTEGRATION, nullable: true }),
    __metadata("design:type", String)
], PaystackDedicatedNuban.prototype, "paystackIntegration", void 0);
PaystackDedicatedNuban = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PAYSTACK_DEDICATED_NUBANS }),
    (0, typeorm_1.Index)(['userId'])
], PaystackDedicatedNuban);
exports.PaystackDedicatedNuban = PaystackDedicatedNuban;
//# sourceMappingURL=PaystackDedicatedNuban.js.map