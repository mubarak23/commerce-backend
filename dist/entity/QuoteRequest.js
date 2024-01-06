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
exports.QuoteRequest = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const Statuses_1 = require("../enums/Statuses");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Product_1 = require("./Product");
const User_1 = require("./User");
let QuoteRequest = class QuoteRequest extends BaseEntity_1.default {
    initialize(user, quoteRequest, product) {
        var _a, _b, _c, _d;
        this.uuid = (0, uuid_1.v4)();
        this.userId = user.id;
        this.userUuid = user.uuid;
        this.sellerUserId = product.user.id;
        this.sellerUserUuid = product.user.uuid;
        this.productId = product.id;
        this.quantity = quoteRequest.quantity;
        this.notes = (_a = quoteRequest.notes) !== null && _a !== void 0 ? _a : undefined;
        this.deliverAddressUuid = (_b = quoteRequest.deliverAddressUuid) !== null && _b !== void 0 ? _b : undefined;
        this.wareHouseUuid = (_c = quoteRequest.wareHouseUuid) !== null && _c !== void 0 ? _c : undefined;
        this.sellerPickupLocationUuid = (_d = quoteRequest.sellerPickupLocationUuid) !== null && _d !== void 0 ? _d : undefined;
        this.orderReceiveType = quoteRequest.orderReceiveType;
        this.status = Statuses_1.QuoteRequestStatuses.PENDING;
        const now = Utils.utcNow();
        this.statusHistory = [
            { status: this.status, dateTimeInISO8601: now.toUTCString() },
        ];
        this.createdAt = now;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.UUID, unique: true }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.REFERENCE_NUMBER, nullable: true }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", name: TableColumns_1.QuoteRequestColumns.USER_ID }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.QuoteRequestColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], QuoteRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.USER_UUID }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "userUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.SELLER_USER_UUID }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "sellerUserUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", name: TableColumns_1.QuoteRequestColumns.SELLER_USER_ID }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "sellerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.QuoteRequestColumns.SELLER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], QuoteRequest.prototype, "sellerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.PRODUCT_ID }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.QuoteRequestColumns.PRODUCT_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Product_1.Product)
], QuoteRequest.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.QUANTITY, nullable: true }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.NOTES, nullable: true }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.ORDER_RECEIVE_TYPE, nullable: true }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "orderReceiveType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: TableColumns_1.QuoteRequestColumns.DELIVERY_ADDRESS,
        nullable: true,
        default: "",
    }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "deliverAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.QuoteRequestColumns.HAS_SELLER_RESPONSE,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], QuoteRequest.prototype, "hasSellerResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.QuoteRequestColumns.SELLER_RESPONSE,
        nullable: true,
    }),
    __metadata("design:type", Object)
], QuoteRequest.prototype, "sellerResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.QuoteRequestColumns.CALCULATED_TOTAL_COST_MAJOR,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "calculatedTotalCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        name: TableColumns_1.QuoteRequestColumns.SELLER_RESPONSE_SUBMITTED_AT,
        nullable: true,
    }),
    __metadata("design:type", Date)
], QuoteRequest.prototype, "sellerResponseSubmittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.QuoteRequestColumns.STATUS, nullable: false }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: TableColumns_1.QuoteRequestColumns.SELLER_PICKUP_LOCATION_UUID,
        nullable: true
    }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "sellerPickupLocationUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: TableColumns_1.QuoteRequestColumns.DELIVERY_ADDRESS_UUID,
        nullable: true
    }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "deliverAddressUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: TableColumns_1.QuoteRequestColumns.WAREHOUSE_UUID,
        nullable: true
    }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "wareHouseUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.QuoteRequestColumns.STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], QuoteRequest.prototype, "statusHistory", void 0);
QuoteRequest = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.QUOTE_REQUESTS }),
    (0, typeorm_1.Index)(["userId"]),
    (0, typeorm_1.Index)(["sellerUserId"])
], QuoteRequest);
exports.QuoteRequest = QuoteRequest;
//# sourceMappingURL=QuoteRequest.js.map