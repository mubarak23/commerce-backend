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
exports.DeliveryFeeWallet = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const WalletType_1 = require("../enums/WalletType");
const core_1 = require("../utils/core");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let DeliveryFeeWallet = class DeliveryFeeWallet extends BaseEntity_1.default {
    initialize(userId, accountId, currency) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.accountId = accountId;
        this.walletBalanceMinor = 0;
        this.currency = currency ? currency : 'NGN';
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryFeeWalletColumns.UUID, unique: true }),
    __metadata("design:type", String)
], DeliveryFeeWallet.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryFeeWalletColumns.USER_ID }),
    __metadata("design:type", Number)
], DeliveryFeeWallet.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryFeeWalletColumns.ACCOUNT_ID }),
    __metadata("design:type", Number)
], DeliveryFeeWallet.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryFeeWalletColumns.WALLET_BALANCE_MINOR }),
    __metadata("design:type", Number)
], DeliveryFeeWallet.prototype, "walletBalanceMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryFeeWalletColumns.CURRENCY, nullable: true, default: 'NGN' }),
    __metadata("design:type", String)
], DeliveryFeeWallet.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryFeeWalletColumns.TYPE, default: WalletType_1.WalletType.CUSTOMER_WALLET }),
    __metadata("design:type", String)
], DeliveryFeeWallet.prototype, "type", void 0);
DeliveryFeeWallet = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.DELIVERY_FEE_WALLETS }),
    (0, typeorm_1.Index)(["id"], { unique: true }),
    (0, typeorm_1.Index)(["userId"])
], DeliveryFeeWallet);
exports.DeliveryFeeWallet = DeliveryFeeWallet;
//# sourceMappingURL=DeliveryWalletFee.js.map