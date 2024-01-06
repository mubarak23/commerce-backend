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
exports.WalletToWalletTransfer = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const TableColumns_1 = require("../enums/TableColumns");
const core_1 = require("../utils/core");
const Tables_1 = __importDefault(require("../enums/Tables"));
const transformers_1 = require("../utils/transformers");
let WalletToWalletTransfer = class WalletToWalletTransfer extends BaseEntity_1.default {
    initialize(adminUserId, senderUserId, receiverUserId, amountMajor, description) {
        this.adminUserId = adminUserId;
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.amountMajor = amountMajor;
        this.description = description;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletToWalletTransferColumns.ADMIN_USER_ID }),
    __metadata("design:type", Number)
], WalletToWalletTransfer.prototype, "adminUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletToWalletTransferColumns.SENDER_USER_ID }),
    __metadata("design:type", Number)
], WalletToWalletTransfer.prototype, "senderUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletToWalletTransferColumns.RECEIVER_USER_ID }),
    __metadata("design:type", Number)
], WalletToWalletTransfer.prototype, "receiverUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.WalletToWalletTransferColumns.AMOUNT_MAJOR, nullable: false, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], WalletToWalletTransfer.prototype, "amountMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletToWalletTransferColumns.CURRENCY, default: 'NGN', }),
    __metadata("design:type", String)
], WalletToWalletTransfer.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WalletToWalletTransferColumns.DESCRIPTION, nullable: true, default: '' }),
    __metadata("design:type", String)
], WalletToWalletTransfer.prototype, "description", void 0);
WalletToWalletTransfer = __decorate([
    (0, typeorm_1.Index)(["adminUserId"]),
    (0, typeorm_1.Index)(["senderUserId"]),
    (0, typeorm_1.Index)(["receiverUserId"]),
    (0, typeorm_1.Entity)({ name: Tables_1.default.WALLET_TO_WALLET_TRANSFERS })
], WalletToWalletTransfer);
exports.WalletToWalletTransfer = WalletToWalletTransfer;
//# sourceMappingURL=WalletToWalletTransfer.js.map