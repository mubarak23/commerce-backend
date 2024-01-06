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
exports.ConfigProperty = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
let ConfigProperty = class ConfigProperty extends BaseEntity_1.default {
    initialize(name, value, description) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ConfigPropertyColumns.NAME }),
    __metadata("design:type", String)
], ConfigProperty.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ConfigPropertyColumns.VALUE }),
    __metadata("design:type", String)
], ConfigProperty.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ConfigPropertyColumns.DESCRIPTION, nullable: true }),
    __metadata("design:type", String)
], ConfigProperty.prototype, "description", void 0);
ConfigProperty = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.CONFIG_PROPERTIES }),
    (0, typeorm_1.Index)(['name'], { unique: true })
], ConfigProperty);
exports.ConfigProperty = ConfigProperty;
//# sourceMappingURL=ConfigProperty.js.map