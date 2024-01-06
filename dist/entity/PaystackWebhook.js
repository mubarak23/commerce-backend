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
exports.PaystackWebhook = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
let PaystackWebhook = class PaystackWebhook extends BaseEntity_1.default {
    initialize(transactionUuid, paystackPayload) {
        this.uuid = (0, uuid_1.v4)();
        this.transactionUuid = transactionUuid;
        this.paystackPayload = paystackPayload;
        this.isProcessed = false;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PaystackWebhooksColumns.UUID, nullable: true }),
    __metadata("design:type", String)
], PaystackWebhook.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PaystackWebhooksColumns.TRANSACTION_UUID, nullable: true }),
    __metadata("design:type", String)
], PaystackWebhook.prototype, "transactionUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.PaystackWebhooksColumns.PAYSTACK_PAYLOAD, nullable: false }),
    __metadata("design:type", Object)
], PaystackWebhook.prototype, "paystackPayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.PaystackWebhooksColumns.IS_PROCESSED, nullable: true }),
    __metadata("design:type", Boolean)
], PaystackWebhook.prototype, "isProcessed", void 0);
PaystackWebhook = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PAYSTACK_WEBHOOKS })
], PaystackWebhook);
exports.PaystackWebhook = PaystackWebhook;
//# sourceMappingURL=PaystackWebhook.js.map