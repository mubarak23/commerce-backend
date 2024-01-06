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
exports.FinancialTransaction = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Currency_1 = require("../enums/Currency");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const TransactionFlowType_1 = require("../enums/TransactionFlowType");
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let FinancialTransaction = class FinancialTransaction extends BaseEntity_1.default {
    initialize(wallet, paymentTransactionType, amountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, currency, paidStatus, reference, metadata) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = wallet.userId;
        this.walletId = wallet.id;
        this.reference = reference;
        if (reference) {
            this.referenceType = PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK;
        }
        this.transactionType = paymentTransactionType;
        this.paidStatus = paidStatus;
        this.amountMinor = amountMinor;
        this.walletBalanceMinorBefore = walletBalanceMinorBefore;
        this.walletBalanceMinorAfter = walletBalanceMinorAfter;
        this.currency = currency;
        this.metadata = metadata;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    initializeDeliveryFeeTransaction(wallet, paymentTransactionType, amountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, currency, paidStatus, reference, metadata) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = wallet.userId;
        this.walletId = wallet.id;
        this.reference = reference;
        if (reference) {
            this.referenceType = PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK;
        }
        this.transactionType = paymentTransactionType;
        this.paidStatus = paidStatus;
        this.amountMinor = amountMinor;
        this.walletBalanceMinorBefore = walletBalanceMinorBefore;
        this.walletBalanceMinorAfter = walletBalanceMinorAfter;
        this.currency = currency;
        this.metadata = metadata;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    initializeForTemporaryOrder(paymentTransactionType, amountMinor, currency, paidStatus, reference, metadata) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = 0;
        this.walletId = -1;
        this.reference = reference;
        if (reference) {
            this.referenceType = PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK;
        }
        this.transactionType = paymentTransactionType;
        this.paidStatus = paidStatus;
        this.amountMinor = amountMinor;
        this.walletBalanceMinorBefore = 0;
        this.walletBalanceMinorAfter = undefined;
        this.currency = currency;
        this.metadata = metadata;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto() {
        var _a, _b;
        const CurrencyEnum = Currency_1.CurrencyToSymbol;
        const currencySymbol = CurrencyEnum[this.currency];
        return {
            uuid: this.uuid,
            type: this.transactionType,
            paidStatus: this.paidStatus,
            amountMajor: this.amountMinor / 100,
            currency: this.currency,
            currencySymbol,
            walletBalanceMajorBefore: this.walletBalanceMinorBefore / 100,
            walletBalanceMajorAfter: ((_a = this.walletBalanceMinorAfter) !== null && _a !== void 0 ? _a : 0) / 100,
            metadata: (_b = this.metadata) !== null && _b !== void 0 ? _b : {},
            description: this.description,
            flowType: (0, TransactionFlowType_1.getTransactionFlowType)(this.transactionType),
            createdAt: this.createdAt,
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.FinancialTransactionColumns.UUID, nullable: false }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.FinancialTransactionColumns.USER_ID, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }) // nullable true because of tradegrid revenue wallet
    ,
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.FinancialTransactionColumns.WALLET_ID, nullable: false }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "walletId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.FinancialTransactionColumns.REFERENCE, nullable: true }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.REFERENCE_TYPE, nullable: true }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "referenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.TRANSACTION_TYPE, nullable: false }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.FinancialTransactionColumns.AMOUNT_MINOR, nullable: false, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "amountMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.PAID_STATUS, nullable: false }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "paidStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.FinancialTransactionColumns.WALLET_BALANCE_MINOR_BEFORE, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "walletBalanceMinorBefore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.FinancialTransactionColumns.WALLET_BALANCE_MINOR_AFTER, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "walletBalanceMinorAfter", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.PAID_AT, nullable: true }),
    __metadata("design:type", Date)
], FinancialTransaction.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.FinancialTransactionColumns.METADATA, nullable: true }),
    __metadata("design:type", Object)
], FinancialTransaction.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.CURRENCY, nullable: false }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FinancialTransactionColumns.DESCRIPTION, nullable: true, default: '' }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "description", void 0);
FinancialTransaction = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.FINANCIAL_TRANSACTIONS }),
    (0, typeorm_1.Index)(['uuid'], { unique: true }),
    (0, typeorm_1.Index)(['reference']),
    (0, typeorm_1.Index)(['userId'])
], FinancialTransaction);
exports.FinancialTransaction = FinancialTransaction;
//# sourceMappingURL=FinancialTransaction.js.map