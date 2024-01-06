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
exports.PhoneVerification = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
let PhoneVerification = class PhoneVerification extends BaseEntity_1.default {
    initialize(phoneNumber, msisdn, verificationCode) {
        this.phoneNumber = phoneNumber;
        this.msisdn = msisdn;
        this.verificationCode = verificationCode;
        this.smsSentSuccessfully = undefined;
        this.isVerified = false;
        this.verifiedAt = undefined;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PhoneNumberVerificationColumns.PHONE_NUMBER }),
    __metadata("design:type", String)
], PhoneVerification.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PhoneNumberVerificationColumns.MSISDN, nullable: false }),
    __metadata("design:type", String)
], PhoneVerification.prototype, "msisdn", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.PhoneNumberVerificationColumns.VERIFICATION_CODE }),
    __metadata("design:type", String)
], PhoneVerification.prototype, "verificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.PhoneNumberVerificationColumns.SMS_SENT_SUCCESSFULLY, nullable: true }),
    __metadata("design:type", Boolean)
], PhoneVerification.prototype, "smsSentSuccessfully", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.PhoneNumberVerificationColumns.IS_VERIFIED, default: false }),
    __metadata("design:type", Boolean)
], PhoneVerification.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PhoneNumberVerificationColumns.VERIFIED_AT, nullable: true }),
    __metadata("design:type", Date)
], PhoneVerification.prototype, "verifiedAt", void 0);
PhoneVerification = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PHONE_VERIFICATION }),
    (0, typeorm_1.Index)(['msisdn']),
    (0, typeorm_1.Index)(['msisdn', 'isVerified'])
], PhoneVerification);
exports.PhoneVerification = PhoneVerification;
//# sourceMappingURL=PhoneVerification.js.map