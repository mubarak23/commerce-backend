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
exports.AccessRequest = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
let AccessRequest = class AccessRequest extends BaseEntity_1.default {
    initialize(isSeller, businessName, businessLocationCountry, businessLocationState, applicantName, applicantRole, applicantEmail, applicantPhone, weeklyTurnOver, enquiries) {
        this.uuid = (0, uuid_1.v4)();
        this.isSeller = isSeller;
        this.businessName = businessName;
        this.businessLocationCountry = businessLocationCountry;
        this.businessLocationState = businessLocationState;
        this.applicantName = applicantName;
        this.applicantRole = applicantRole;
        this.applicantEmail = applicantEmail;
        this.applicantPhone = applicantPhone;
        this.weeklyTurnOver = weeklyTurnOver;
        this.enquiries = enquiries;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.UUID, unique: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.ISSELLER, nullable: true, default: true }),
    __metadata("design:type", Boolean)
], AccessRequest.prototype, "isSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.BUSINESS_NAME, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.BUSINESS_LOCATION_COUNTRY, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "businessLocationCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.BUSINESS_LOCATION_STATE, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "businessLocationState", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.APPLICANT_NAME, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "applicantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.APPLICANT_ROLE, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "applicantRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.APPLICANT_EMAIL, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "applicantEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.APPLICANT_PHONE, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "applicantPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.WEEKLY_TURN_OVER, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "weeklyTurnOver", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.AccessRequestColumns.ENQUIRIES, nullable: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "enquiries", void 0);
AccessRequest = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.ACCESS_REQUEST }),
    (0, typeorm_2.Index)(["uuid"])
], AccessRequest);
exports.AccessRequest = AccessRequest;
//# sourceMappingURL=AccessRequest.js.map