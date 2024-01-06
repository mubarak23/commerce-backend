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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const User_1 = require("./User");
let Cart = class Cart extends BaseEntity_1.default {
    initialize(currentUser, firstProduct, quantity) {
        var _a, _b;
        this.userId = currentUser.id;
        const unitPriceForBuyer = Utils.getPriceForBuyer((_a = firstProduct.price) !== null && _a !== void 0 ? _a : 0, firstProduct);
        this.cartItems = [{
                productId: firstProduct.id,
                productUuid: firstProduct.uuid,
                productName: firstProduct.name,
                quantity,
                unitPrice: (_b = firstProduct.price) !== null && _b !== void 0 ? _b : 0,
                unitPriceForBuyer,
                images: firstProduct.images,
            }];
        this.createdAt = Utils.utcNow();
        return this;
    }
    initializeEmpty(currentUser) {
        this.userId = currentUser.id;
        this.cartItems = [];
        this.createdAt = Utils.utcNow();
        return this;
    }
    static toCartResponseItem(productResponseDto, cartItemJson) {
        var _a, _b;
        return Object.assign(Object.assign({}, productResponseDto), { unitPriceForBuyer: (_a = cartItemJson.unitPriceForBuyer) !== null && _a !== void 0 ? _a : 0, quantity: (_b = cartItemJson.quantity) !== null && _b !== void 0 ? _b : 0 });
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CartColumns.USER_ID }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.CartColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID, }),
    __metadata("design:type", User_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.CartColumns.CART_ITEMS, }),
    __metadata("design:type", Array)
], Cart.prototype, "cartItems", void 0);
Cart = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.CARTS }),
    (0, typeorm_1.Index)(["userId"], { unique: true })
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map