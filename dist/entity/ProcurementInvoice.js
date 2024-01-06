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
exports.ProcurementInvoice = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Statuses_1 = require("../enums/Statuses");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let ProcurementInvoice = class ProcurementInvoice extends BaseEntity_1.default {
    initialize(acccountId, procurementId, invoiceItem, calculatedTotalCostMajor) {
        const now = Utils.utcNow();
        this.uuid = (0, uuid_1.v4)();
        this.accountId = acccountId;
        this.procurementId = procurementId;
        this.invoiceItem = invoiceItem;
        this.calculatedTotalCostMajor = calculatedTotalCostMajor;
        this.status = Statuses_1.InvoiceStatuses.SET;
        this.statusHistory = [
            { status: this.status, dateTimeInISO8601: now.toISOString() },
        ];
        this.createdAt = Utils.utcNow();
        return this;
    }
    toResponseDto() {
        return {
            uuid: this.uuid,
            accountId: this.accountId,
            referenceNumber: this.referenceNumber,
            calculatedTotalCostMajor: this.calculatedTotalCostMajor,
            invoiceItem: this.invoiceItem,
            status: this.status,
            statusHistory: this.statusHistory,
            orderCreated: this.orderCreated,
            orderCreatedAt: this.orderCreatedAt,
            createdAt: this.createdAt
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProcurementInvoiceColumns.UUID, unique: true }),
    __metadata("design:type", String)
], ProcurementInvoice.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', name: TableColumns_1.ProcurementInvoiceColumns.ACCOUNT_ID }),
    __metadata("design:type", Number)
], ProcurementInvoice.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProcurementInvoiceColumns.PROCUREMENT_ID }),
    __metadata("design:type", Number)
], ProcurementInvoice.prototype, "procurementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ProcurementInvoiceColumns.REFERENCE_NUMBER, nullable: true }),
    __metadata("design:type", String)
], ProcurementInvoice.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: TableColumns_1.ProcurementInvoiceColumns.INVOICE_ITEMS }),
    __metadata("design:type", Array)
], ProcurementInvoice.prototype, "invoiceItem", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProcurementInvoiceColumns.CALCULATED_TOTAL_COST_MAJOR,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProcurementInvoice.prototype, "calculatedTotalCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProcurementInvoiceColumns.CALCULATED_TOTAL_AMOUNT_PAID_MAJOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProcurementInvoice.prototype, "calculatedTotalAmountPaidMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProcurementInvoiceColumns.STATUS, nullable: false }),
    __metadata("design:type", String)
], ProcurementInvoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.ProcurementInvoiceColumns.STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], ProcurementInvoice.prototype, "statusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProcurementInvoiceColumns.ORDER_CREATED, default: false }),
    __metadata("design:type", Boolean)
], ProcurementInvoice.prototype, "orderCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProcurementInvoiceColumns.ORDER_CREATE_AT, nullable: true }),
    __metadata("design:type", Date)
], ProcurementInvoice.prototype, "orderCreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.ProcurementInvoiceColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], ProcurementInvoice.prototype, "isSoftDeleted", void 0);
ProcurementInvoice = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PROCUREMENT_INVOICES }),
    (0, typeorm_1.Index)(["uuid"]),
    (0, typeorm_1.Index)(["procurementId"])
], ProcurementInvoice);
exports.ProcurementInvoice = ProcurementInvoice;
//# sourceMappingURL=ProcurementInvoice.js.map