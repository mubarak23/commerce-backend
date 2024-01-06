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
exports.EmailActivation = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const core_1 = require("../utils/core");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let EmailActivation = class EmailActivation extends BaseEntity_1.default {
    initialize(emailAddress) {
        const now = (0, core_1.utcNow)();
        this.uniqueToken = (0, uuid_1.v4)();
        this.emailAddress = emailAddress;
        this.isVerified = false;
        this.verifiedAt = undefined;
        this.createdAt = now;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.EmailValidationColumns.EMAIL_ADDRESS, nullable: false }),
    __metadata("design:type", String)
], EmailActivation.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.EmailValidationColumns.UNIQUE_TOKEN, unique: true }),
    __metadata("design:type", String)
], EmailActivation.prototype, "uniqueToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.EmailValidationColumns.IS_VERIFIED, default: false }),
    __metadata("design:type", Boolean)
], EmailActivation.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.EmailValidationColumns.VERIFIED_AT, nullable: true }),
    __metadata("design:type", Date)
], EmailActivation.prototype, "verifiedAt", void 0);
EmailActivation = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.EMAIL_ACTIVATIONS }),
    (0, typeorm_1.Index)(['uniqueToken'], { unique: true })
], EmailActivation);
exports.EmailActivation = EmailActivation;
//# sourceMappingURL=EmailActivation.js.map