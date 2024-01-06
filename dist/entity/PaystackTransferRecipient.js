"use strict";
// @ts-nocheck
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
exports.PaystackTransferRecipient = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
let PaystackTransferRecipient = class PaystackTransferRecipient extends BaseEntity_1.default {
    initialize(accountNumber, bankCode, recipientCode, currency) {
        this.uuid = (0, uuid_1.v4)();
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
        this.recipientCode = recipientCode;
        this.currency = currency;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackTransferRecipientColumns.UUID, unique: true }),
    __metadata("design:type", String)
], PaystackTransferRecipient.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackTransferRecipientColumns.ACCOUNT_NUMBER }),
    __metadata("design:type", String)
], PaystackTransferRecipient.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackTransferRecipientColumns.BANK_CODE, nullable: true }),
    __metadata("design:type", String)
], PaystackTransferRecipient.prototype, "bankCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PaystackTransferRecipientColumns.RECIPIENT_CODE, nullable: true }),
    __metadata("design:type", String)
], PaystackTransferRecipient.prototype, "recipientCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PaystackTransferRecipientColumns.CURRENCY, nullable: false }),
    __metadata("design:type", String)
], PaystackTransferRecipient.prototype, "currency", void 0);
PaystackTransferRecipient = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.PAYSTACK_TRANSFER_RECIPIENT })
], PaystackTransferRecipient);
exports.PaystackTransferRecipient = PaystackTransferRecipient;
//# sourceMappingURL=PaystackTransferRecipient.js.map