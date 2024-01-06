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
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const WalletType_1 = require("../enums/WalletType");
let Wallet = class Wallet extends BaseEntity_1.default {
    initialize(userId, accountId, type, currency) {
        this.userId = userId;
        this.accountId = accountId;
        this.type = type;
        this.walletBalanceMinor = 0;
        this.currency = currency;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.WalletColumns.USER_ID, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], Wallet.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.WalletColumns.ACCOUNT_ID, nullable: true, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], Wallet.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.WalletColumns.WALLET_BALANCE_MINOR, nullable: false, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], Wallet.prototype, "walletBalanceMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletColumns.CURRENCY, nullable: false }),
    __metadata("design:type", String)
], Wallet.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletColumns.TYPE, nullable: false }),
    __metadata("design:type", String)
], Wallet.prototype, "type", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.WALLETS }),
    (0, typeorm_1.Index)(['userId'])
], Wallet);
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map