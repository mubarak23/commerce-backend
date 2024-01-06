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
exports.WareHouseProductPurchase = void 0;
// WareHouseProductPurchase
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const User_1 = require("./User");
const core_1 = require("../utils/core");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Product_1 = require("./Product");
const WareHouse_1 = require("./WareHouse");
let WareHouseProductPurchase = class WareHouseProductPurchase extends BaseEntity_1.default {
    initialize(userId, wareHouseId, productId, inFlowQuantity) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.wareHouseId = wareHouseId;
        this.productId = productId;
        this.inFlowQuantity = inFlowQuantity;
        this.outFlowQuantity = 0;
        this.availableQuantity = inFlowQuantity;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.UUID, unique: true }),
    __metadata("design:type", String)
], WareHouseProductPurchase.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.USER_ID }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.WareHouseProductPurchaseColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], WareHouseProductPurchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.WARE_HOUSE_ID }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "wareHouseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WareHouse_1.WareHouse, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.WareHouseProductPurchaseColumns.WARE_HOUSE_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", WareHouse_1.WareHouse)
], WareHouseProductPurchase.prototype, "wareHouse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.PRODUCT_ID }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.WareHouseProductPurchaseColumns.PRODUCT_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Product_1.Product)
], WareHouseProductPurchase.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.INFLOW_QUANTITY }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "inFlowQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.OUTFLOW_QUANTITY }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "outFlowQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductPurchaseColumns.AVAILABLE_QUANTITY }),
    __metadata("design:type", Number)
], WareHouseProductPurchase.prototype, "availableQuantity", void 0);
WareHouseProductPurchase = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.WARE_HOUSE_PRODUCT_PURCHASES }),
    (0, typeorm_1.Index)(["uuid", "productId"])
], WareHouseProductPurchase);
exports.WareHouseProductPurchase = WareHouseProductPurchase;
//# sourceMappingURL=WareHouseProductPurchase.js.map