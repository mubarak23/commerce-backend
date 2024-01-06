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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Currency_1 = require("../enums/Currency");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Brand_1 = require("./Brand");
const Category_1 = require("./Category");
const PickupLocation_1 = require("./PickupLocation");
const User_1 = require("./User");
let Product = class Product extends BaseEntity_1.default {
    initialize(userId, newProductRequest, category, brand, priceCurrency, tags) {
        this.uuid = (0, uuid_1.v4)();
        this.name = newProductRequest.name;
        this.description = newProductRequest.description;
        this.userId = userId;
        if (category) {
            this.categoryId = category.id;
            this.categoryUuid = category.uuid;
        }
        if (brand) {
            this.brandId = brand.id;
            this.brandUuid = brand.uuid;
        }
        this.price = newProductRequest.price;
        this.currency = priceCurrency;
        this.locationState = newProductRequest.locationState;
        this.tags = tags;
        this.maxQty = newProductRequest.maxQty;
        this.minQty = newProductRequest.minQty;
        this.createdAt = Utils.utcNow();
        return this;
    }
    getCurrency() {
        const allowedCurrencies = Object.keys(Currency_1.CurrencyToSymbol);
        if (!allowedCurrencies.includes(this.currency)) {
            return Currency_1.CountryToCurrency.NIGERIA;
        }
        return this.currency;
    }
    toResponseDto(sellerPublicProfile, productResponseImages, sellerPickupLocationsDto, unitPriceForBuyer, unitPromoPriceForBuyer, isOnCart, oldSellerPublicProfile) {
        var _a, _b;
        const CurrencyEnum = Currency_1.CurrencyToSymbol;
        let productPromoPrice = 0;
        if (unitPromoPriceForBuyer) {
            productPromoPrice = unitPromoPriceForBuyer;
        }
        return {
            productUuid: this.uuid,
            productName: this.name,
            productDescription: this.description,
            minimumQuantity: this.minQty,
            maximumQuantity: this.maxQty,
            unitOfMeasurement: (_b = (_a = this.category) === null || _a === void 0 ? void 0 : _a.unitOfMeasurement) !== null && _b !== void 0 ? _b : "",
            isOnCart,
            brand: {
                uuid: this.brand.uuid,
                name: this.brand.name,
            },
            category: {
                uuid: this.category.uuid,
                name: this.category.name,
                settings: this.category.settings,
            },
            images: productResponseImages,
            sellerPublicProfile,
            sellerUserId: sellerPublicProfile.userId,
            oldSellerPublicProfile,
            price: this.price,
            unitPriceForBuyer,
            unitPromoPriceForBuyer: productPromoPrice,
            currency: this.currency,
            currencySymbol: CurrencyEnum[this.getCurrency()] || Currency_1.CountryToCurrencySymbol.NIGERIA,
            locationState: this.locationState,
            totalNumberOfRatings: this.totalNumberOfRatings,
            totalRatingsValue: this.totalRatingsValue,
            hasVariants: this.hasVariants,
            isVariant: this.isVariant,
            tags: this.tags,
            sellerPickupLocations: sellerPickupLocationsDto,
            isActive: this.isActive,
            createdAt: this.createdAt
            // TODO: This must go.
            // pickupAddressDetails: _.omit(
            //   this.pickupLocation,
            //   "id",
            //   "user",
            //   "createdAt",
            //   "updatedAt"
            // ),
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.UUID, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.USER_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.PARENT_PRODUCT_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "parentProductId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductsColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.CATEGORY_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.CATEGORY_UUID }),
    __metadata("design:type", String)
], Product.prototype, "categoryUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, { primary: true, eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductsColumns.CATEGORY_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.BRAND_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.BRAND_UUID }),
    __metadata("design:type", String)
], Product.prototype, "brandUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Brand_1.Brand, { primary: true, eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductsColumns.BRAND_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Brand_1.Brand)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductsColumns.NAME, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", name: TableColumns_1.ProductsColumns.PRICE, nullable: true, transformer: new transformers_1.ColumnNumericTransformer(), }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductsColumns.CURRENCY }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: TableColumns_1.ProductsColumns.LOCATION_STATE,
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "locationState", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.ProductsColumns.LOCAL_GOVERNMENT_AREA_PRICES, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "localGovernmentAreaPrices", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: TableColumns_1.ProductsColumns.DESCRIPTION, default: "" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", name: TableColumns_1.ProductsColumns.MAX_QTY }),
    __metadata("design:type", Number)
], Product.prototype, "maxQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", name: TableColumns_1.ProductsColumns.MIN_QTY }),
    __metadata("design:type", Number)
], Product.prototype, "minQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.ProductsColumns.TAGS, nullable: true, default: {} }),
    __metadata("design:type", Object)
], Product.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.ProductsColumns.IMAGES, nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.ProductsColumns.HAS_VARIANTS,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "hasVariants", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.ProductsColumns.IS_VARIANT,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isVariant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.ProductsColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isSoftDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.ProductsColumns.IS_ACTIVE,
        nullable: true,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProductsColumns.TOTAL_RATINGS_VALUE,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Product.prototype, "totalRatingsValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.ProductsColumns.TOTAL_NUMBER_OF_RATINGS,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Product.prototype, "totalNumberOfRatings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.PICKUP_LOCATION_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "pickupLocationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupLocation_1.PickupLocation, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductsColumns.PICKUP_LOCATION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", PickupLocation_1.PickupLocation)
], Product.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProductsColumns.OLD_SELLER_ID, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "oldSellerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.ProductsColumns.OLD_SELLER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], Product.prototype, "oldSeller", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PRODUCTS }),
    (0, typeorm_1.Index)(["userId"]),
    (0, typeorm_1.Index)(["userId", 'uuid']),
    (0, typeorm_1.Index)(["userId", 'isSoftDeleted', 'isVariant']),
    (0, typeorm_1.Index)(["parentProductId"]),
    (0, typeorm_1.Index)(["categoryId", "brandId", "locationState", "price"]),
    (0, typeorm_1.Index)(["categoryUuid", "brandUuid", "locationState", "price"]),
    (0, typeorm_1.Index)(["locationState"]),
    (0, typeorm_1.Index)(["uuid", "isSoftDeleted"]),
    (0, typeorm_1.Index)(["name"]),
    (0, typeorm_1.Index)(["name", "brandUuid", "price"]),
    (0, typeorm_1.Index)(["isVariant", "isSoftDeleted"]),
    (0, typeorm_1.Index)(["brandUuid", "isVariant", "isSoftDeleted"]),
    (0, typeorm_1.Index)(["categoryUuid", "isVariant", "isSoftDeleted"]),
    (0, typeorm_1.Index)(["parentProductId", "isVariant", "isSoftDeleted"])
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map