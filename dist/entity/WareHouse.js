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
exports.WareHouse = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let WareHouse = class WareHouse extends BaseEntity_1.default {
    initialize(accountId, createdByUserId, name, state, country, contactFullName, contactPhoneNumber) {
        this.uuid = (0, uuid_1.v4)();
        this.accountId = accountId;
        this.createdByUserId = createdByUserId;
        this.name = name;
        this.state = state;
        this.country = country;
        this.totalValueMajor = 0;
        this.totalQuantity = 0;
        this.contactFullName = contactFullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.UUID, unique: true }),
    __metadata("design:type", String)
], WareHouse.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.ACCOUNT_ID }),
    __metadata("design:type", Number)
], WareHouse.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.CREATEDBY_USER_ID }),
    __metadata("design:type", Number)
], WareHouse.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.IS_DEFAULT, default: false }),
    __metadata("design:type", Boolean)
], WareHouse.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.WareHouseColumns.NAME }),
    __metadata("design:type", String)
], WareHouse.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.WareHouseColumns.STATE }),
    __metadata("design:type", String)
], WareHouse.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.WareHouseColumns.COUNTRY }),
    __metadata("design:type", String)
], WareHouse.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.TOTAL_VALUE_MAJOR }),
    __metadata("design:type", Number)
], WareHouse.prototype, "totalValueMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseColumns.TOTAL_QUANTITY }),
    __metadata("design:type", Number)
], WareHouse.prototype, "totalQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.WareHouseColumns.CONTACT_FULL_NAME }),
    __metadata("design:type", String)
], WareHouse.prototype, "contactFullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.WareHouseColumns.CONTACT_PHONE_NUMBER }),
    __metadata("design:type", String)
], WareHouse.prototype, "contactPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.WareHouseColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], WareHouse.prototype, "isSoftDeleted", void 0);
WareHouse = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.WARE_HOUSES }),
    (0, typeorm_1.Index)(["uuid"]),
    (0, typeorm_1.Index)(["accountId", "isDefault", "isSoftDeleted"])
], WareHouse);
exports.WareHouse = WareHouse;
//# sourceMappingURL=WareHouse.js.map