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
exports.SupportedCountry = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
let SupportedCountry = class SupportedCountry extends BaseEntity_1.default {
    initialize(name, iso2, phoneCode, currency, currencySymbol) {
        this.name = name;
        this.iso2 = iso2;
        this.phoneCode = phoneCode;
        this.currency = currency;
        this.currencySymbol = currencySymbol;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.SupportedCountryColumns.NAME, nullable: false }),
    __metadata("design:type", String)
], SupportedCountry.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.SupportedCountryColumns.ISO2, nullable: false }),
    __metadata("design:type", String)
], SupportedCountry.prototype, "iso2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: TableColumns_1.SupportedCountryColumns.PHONE_CODE, nullable: false }),
    __metadata("design:type", String)
], SupportedCountry.prototype, "phoneCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.SupportedCountryColumns.CURRENCY, nullable: true }),
    __metadata("design:type", String)
], SupportedCountry.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.SupportedCountryColumns.CURRENCY_SYMBOL, nullable: true }),
    __metadata("design:type", String)
], SupportedCountry.prototype, "currencySymbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.SupportedCountryColumns.IMAGE, nullable: true }),
    __metadata("design:type", Object)
], SupportedCountry.prototype, "image", void 0);
SupportedCountry = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.SUPPORTED_COUNTRIES }),
    (0, typeorm_2.Index)(['name'])
], SupportedCountry);
exports.SupportedCountry = SupportedCountry;
//# sourceMappingURL=SupportedCountry.js.map