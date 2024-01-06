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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let Category = class Category extends BaseEntity_1.default {
    initialize(NewCategoryRequest) {
        var _a;
        this.uuid = (0, uuid_1.v4)();
        this.name = NewCategoryRequest.name;
        // this.brands = brands.map((brand) => {
        //   return { name: brand.name, uuid: brand.uuid}
        // })
        this.unitOfMeasurement = NewCategoryRequest.unitOfMeasurement;
        this.description = (_a = NewCategoryRequest === null || NewCategoryRequest === void 0 ? void 0 : NewCategoryRequest.description) !== null && _a !== void 0 ? _a : '';
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.CategoryColumns.UUID, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.CategoryColumns.NAME, nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.CategoryColumns.BRANDS, nullable: true }),
    __metadata("design:type", Array)
], Category.prototype, "brands", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        name: TableColumns_1.CategoryColumns.UNIT_OF_MEASUREMENT,
        nullable: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "unitOfMeasurement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.CategoryColumns.IMAGE, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.CategoryColumns.BANNER, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.CategoryColumns.DESCRIPTION, nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.CategoryColumns.SETTINGS_DATA, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.CategoryColumns.IS_AVAILABLE,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Category.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.CategoryColumns.PRODUCTS_COUNT,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Category.prototype, "productsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.CategoryColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Category.prototype, "isSoftDeleted", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.CATEGORIES }),
    (0, typeorm_1.Index)(["name"], { unique: true }),
    (0, typeorm_1.Index)(["isAvailable"])
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map