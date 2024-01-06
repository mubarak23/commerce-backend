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
exports.PriceMatrix = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const PriceMatrixTransactionType_1 = require("../enums/PriceMatrixTransactionType");
const Statuses_1 = require("../enums/Statuses");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Order_1 = require("./Order");
const Product_1 = require("./Product");
const QuoteRequest_1 = require("./QuoteRequest");
const User_1 = require("./User");
let PriceMatrix = 
// @Index(["name"], { unique: true })
// @Index(["isAvailable"])
class PriceMatrix extends BaseEntity_1.default {
    initialize(buyerUser, quoteRequest, product, quantity) {
        this.uuid = (0, uuid_1.v4)();
        this.qouteRequestRef = quoteRequest.referenceNumber;
        this.qouteRequestId = quoteRequest.id;
        this.buyerUserId = buyerUser.id;
        this.productId = product.id;
        this.quantity = quantity;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.UUID, unique: true }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.ORDER_ID, nullable: true }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.PriceMatrixColumns.ORDER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Order_1.Order)
], PriceMatrix.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.ORDER_REF, nullable: true }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "orderRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.QUOTE_REQUEST_REF }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "qouteRequestRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.QUOTE_REQUEST_ID }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "qouteRequestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuoteRequest_1.QuoteRequest, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.PriceMatrixColumns.QUOTE_REQUEST_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", QuoteRequest_1.QuoteRequest)
], PriceMatrix.prototype, "quoteRequest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.BUYER_USER_ID }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "buyerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.PriceMatrixColumns.BUYER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], PriceMatrix.prototype, "buyerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.SELLER_USER_ID, nullable: true }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "sellerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.PriceMatrixColumns.SELLER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], PriceMatrix.prototype, "sellerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.PRODUCT_ID }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.PriceMatrixColumns.PRODUCT_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Product_1.Product)
], PriceMatrix.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.QUANTITY, nullable: false }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PriceMatrixColumns.TRANSACTION_TYPE, nullable: true }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.DELIVERY_DATE, nullable: true }),
    __metadata("design:type", Date)
], PriceMatrix.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PriceMatrixColumns.DELIVERY_ADDRESS, nullable: true }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.PRODUCT_SELLING_PRICE,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "productSellingPriceMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.PRODUCT_COST_PRICE,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "productCostPriceMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.TOTAL_PRODUCT_SELLING_PRICE,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "totalProductSellingPriceMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.TOTAL_PRODUCT_COST_PRICE,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "totalProductCostPriceMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.PRODUCT_MARGIN,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "productMarginMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.TOTAL_MARGIN,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "totlaMarginMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.PriceMatrixColumns.DELIVERY_FEE_MAJOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], PriceMatrix.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PriceMatrixColumns.STATUS, nullable: true }),
    __metadata("design:type", String)
], PriceMatrix.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.PriceMatrixColumns.STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], PriceMatrix.prototype, "statusHistory", void 0);
PriceMatrix = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PRICE_MATRICES })
    // @Index(["name"], { unique: true })
    // @Index(["isAvailable"])
], PriceMatrix);
exports.PriceMatrix = PriceMatrix;
//# sourceMappingURL=PriceMatrix.js.map