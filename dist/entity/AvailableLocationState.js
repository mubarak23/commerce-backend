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
exports.AvailableLocationState = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
let AvailableLocationState = class AvailableLocationState extends BaseEntity_1.default {
    initialize(stateName, countryLongName, countryIso2Code) {
        this.state = stateName;
        this.country = countryLongName;
        this.countryIso2Code = countryIso2Code;
        this.productsCount = 1;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.AvailableLocationStatesColumns.STATE }),
    __metadata("design:type", String)
], AvailableLocationState.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.AvailableLocationStatesColumns.COUNTRY }),
    __metadata("design:type", String)
], AvailableLocationState.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        name: TableColumns_1.AvailableLocationStatesColumns.COUNTRY_ISO2_CODE,
    }),
    __metadata("design:type", String)
], AvailableLocationState.prototype, "countryIso2Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.AvailableLocationStatesColumns.PRODUCTS_COUNT,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], AvailableLocationState.prototype, "productsCount", void 0);
AvailableLocationState = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.AVAILABLE_LOCATION_STATES })
], AvailableLocationState);
exports.AvailableLocationState = AvailableLocationState;
//# sourceMappingURL=AvailableLocationState.js.map