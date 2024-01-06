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
exports.DeliveryLocation = void 0;
/* eslint-disable no-unused-expressions */
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const User_1 = require("./User");
let DeliveryLocation = class DeliveryLocation extends BaseEntity_1.default {
    initialize(userId, address, state, country, contactFullName, contactPhoneNumber) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.address = address;
        this.state = state;
        this.country = country;
        this.contactFullName = contactFullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    initializeWareHouseSite(userId, address, country, name, state, contactFullName, contactPhoneNumber, wareHouseId) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.address = address;
        this.country = country;
        this.name = name;
        this.state = state;
        this.contactFullName = contactFullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.wareHouseId = wareHouseId;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryLocationColumns.UUID, unique: true }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryLocationColumns.USER_ID, nullable: false }),
    __metadata("design:type", Number)
], DeliveryLocation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({ name: TableColumns_1.DeliveryLocationColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID }),
    __metadata("design:type", User_1.User)
], DeliveryLocation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.DeliveryLocationColumns.WARE_HOUSE_ID, nullable: true }),
    __metadata("design:type", Number)
], DeliveryLocation.prototype, "wareHouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.ADDRESS, nullable: false }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.NAME, nullable: true }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.COUNTRY, nullable: true }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.CITY, nullable: true }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.CONTACT_FULL_NAME, nullable: true }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "contactFullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.DeliveryLocationColumns.CONTACT_PHONE_NUMBER, nullable: true, }),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "contactPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: TableColumns_1.DeliveryLocationColumns.IS_DEFAULT, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], DeliveryLocation.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.DeliveryLocationColumns.IS_SOFT_DELETED,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], DeliveryLocation.prototype, "isSoftDeleted", void 0);
DeliveryLocation = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.DELIVERY_LOCATIONS }),
    (0, typeorm_2.Index)(["user"]),
    (0, typeorm_2.Index)(["uuid"])
], DeliveryLocation);
exports.DeliveryLocation = DeliveryLocation;
//# sourceMappingURL=DeliveryLocation.js.map