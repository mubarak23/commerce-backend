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
exports.WareHouseProductReorderLevel = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let WareHouseProductReorderLevel = class WareHouseProductReorderLevel extends BaseEntity_1.default {
    initialize(userId, wareHouseId, productId, level) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.wareHouseId = wareHouseId;
        this.productId = productId;
        this.level = level;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductReorderLevelColumns.UUID, unique: true }),
    __metadata("design:type", String)
], WareHouseProductReorderLevel.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductReorderLevelColumns.USER_ID }),
    __metadata("design:type", Number)
], WareHouseProductReorderLevel.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductReorderLevelColumns.WARE_HOUSE_ID }),
    __metadata("design:type", Number)
], WareHouseProductReorderLevel.prototype, "wareHouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductReorderLevelColumns.PRODUCT_ID }),
    __metadata("design:type", Number)
], WareHouseProductReorderLevel.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseProductReorderLevelColumns.LEVEL }),
    __metadata("design:type", Number)
], WareHouseProductReorderLevel.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.WareHouseProductReorderLevelColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], WareHouseProductReorderLevel.prototype, "isSoftDeleted", void 0);
WareHouseProductReorderLevel = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.WARE_HOUSE_PRODUCT_REORDER_LEVEL }),
    (0, typeorm_1.Index)(["uuid"])
], WareHouseProductReorderLevel);
exports.WareHouseProductReorderLevel = WareHouseProductReorderLevel;
//# sourceMappingURL=WareHouseProductReorderLevel.js.map