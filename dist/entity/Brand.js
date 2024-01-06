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
exports.Brand = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
let Brand = class Brand extends BaseEntity_1.default {
    initialize(brandName, categories) {
        this.uuid = (0, uuid_1.v4)();
        this.name = brandName;
        this.categories = categories.map((cat) => {
            return { name: cat.name, uuid: cat.uuid };
        });
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.BrandColumns.UUID, unique: true }),
    __metadata("design:type", String)
], Brand.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.BrandColumns.NAME }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.BrandColumns.CATEGORIES, nullable: true }),
    __metadata("design:type", Array)
], Brand.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.BrandColumns.IMAGE, nullable: true }),
    __metadata("design:type", Object)
], Brand.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.BrandColumns.IS_AVAILABLE,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Brand.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.BrandColumns.PRODUCTS_COUNT,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Brand.prototype, "productsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.BrandColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Brand.prototype, "isSoftDeleted", void 0);
Brand = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.BRANDS }),
    (0, typeorm_1.Index)(["name"], { unique: true }),
    (0, typeorm_1.Index)(["isAvailable"])
], Brand);
exports.Brand = Brand;
//# sourceMappingURL=Brand.js.map