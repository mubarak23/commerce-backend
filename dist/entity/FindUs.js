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
exports.Findus = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
let Findus = class Findus extends BaseEntity_1.default {
    initialize(name) {
        this.uuid = (0, uuid_1.v4)();
        this.name = name;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.FindUsColumns.UUID, unique: true }),
    __metadata("design:type", String)
], Findus.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.FindUsColumns.NAME, nullable: true }),
    __metadata("design:type", String)
], Findus.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: TableColumns_1.FindUsColumns.IS_AVAILABLE, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Findus.prototype, "is_available", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: TableColumns_1.FindUsColumns.COUNTS, nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Findus.prototype, "counts", void 0);
Findus = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.FINDUS }),
    (0, typeorm_1.Index)(["name"], { unique: true })
], Findus);
exports.Findus = Findus;
//# sourceMappingURL=FindUs.js.map