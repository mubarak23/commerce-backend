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
exports.TempUser = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const typeorm_1 = require("typeorm");
const Roles_1 = require("../enums/Roles");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
let TempUser = class TempUser extends BaseEntity_1.default {
    initialize(newUserRequest, msisdn, countryIso2, passwordHash, role, defaultSellerUniqueCode) {
        this.firstName = newUserRequest.firstName;
        this.lastName = newUserRequest.lastName;
        this.emailAddress = newUserRequest.emailAddress;
        this.phoneNumber = newUserRequest.phoneNumber;
        this.msisdn = msisdn;
        this.countryIso2 = countryIso2;
        this.passwordHash = passwordHash;
        this.isSeller = newUserRequest.isSeller || false;
        this.isCooperate = newUserRequest.isCooperate || false;
        this.defaultSellerUniqueCode = defaultSellerUniqueCode;
        this.role = role;
        return this;
    }
    initializeCooperateUser(newUserRequest, msisdn, countryIso2, passwordHash, role, defaultSellerUniqueCode) {
        this.firstName = newUserRequest.firstName;
        this.lastName = newUserRequest.lastName;
        this.emailAddress = newUserRequest.emailAddress;
        this.phoneNumber = newUserRequest.phoneNumber;
        this.msisdn = msisdn;
        this.countryIso2 = countryIso2;
        this.passwordHash = passwordHash;
        this.isSeller = false;
        this.isCooperate = newUserRequest.isCooperate || true;
        this.businessName = newUserRequest.businessName;
        this.companyName = newUserRequest.businessName;
        this.cooperateEmail = newUserRequest.emailAddress;
        this.defaultSellerUniqueCode = defaultSellerUniqueCode;
        this.role = role;
        return this;
    }
    initializeMortageUser(newUserRequest, msisdn, countryIso2, passwordHash) {
        this.firstName = newUserRequest.firstName;
        this.lastName = newUserRequest.lastName;
        this.emailAddress = newUserRequest.emailAddress;
        this.phoneNumber = newUserRequest.phoneNumber;
        this.msisdn = msisdn;
        this.countryIso2 = countryIso2;
        this.passwordHash = passwordHash;
        this.isSeller = false;
        this.isCooperate = false;
        this.role = newUserRequest.role;
        return this;
    }
    initializeMortageDeveloperUser(newUserRequest, msisdn, countryIso2, passwordHash) {
        this.firstName = newUserRequest.firstName;
        this.lastName = newUserRequest.lastName;
        this.emailAddress = newUserRequest.emailAddress;
        this.phoneNumber = newUserRequest.phoneNumber;
        this.msisdn = msisdn;
        this.countryIso2 = countryIso2;
        this.passwordHash = passwordHash;
        this.isSeller = false;
        this.isCooperate = false;
        this.role = newUserRequest.role;
        this.companyName = newUserRequest.companyName;
        this.address = newUserRequest.address;
        this.cacNumber = newUserRequest.cacNumber;
        return this;
    }
    initializeMortageInvestorUser(newUserRequest, msisdn, countryIso2, passwordHash) {
        this.firstName = newUserRequest.firstName;
        this.lastName = newUserRequest.lastName;
        this.emailAddress = newUserRequest.emailAddress;
        this.phoneNumber = newUserRequest.phoneNumber;
        this.msisdn = msisdn;
        this.countryIso2 = countryIso2;
        this.passwordHash = passwordHash;
        this.isSeller = false;
        this.isCooperate = false;
        this.role = newUserRequest.role;
        return this;
    }
    initializeFromBuyerDetails(buyerFullName, buyerMsisdn, buyerEmailAddress, passwordHash) {
        const fullNameSplit = buyerFullName.split(' ');
        // eslint-disable-next-line prefer-destructuring
        this.firstName = fullNameSplit[0];
        this.lastName = fullNameSplit[1] ? fullNameSplit[1] : fullNameSplit[0];
        this.emailAddress = buyerEmailAddress;
        this.phoneNumber = new awesome_phonenumber_1.default(buyerMsisdn, "NG").getNumber("national");
        this.msisdn = buyerMsisdn;
        this.countryIso2 = "NG";
        this.passwordHash = passwordHash;
        this.isSeller = false;
        this.role = Roles_1.Roles.NORMAL_USER;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.FIRST_NAME }),
    __metadata("design:type", String)
], TempUser.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.LAST_NAME }),
    __metadata("design:type", String)
], TempUser.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.EMAIL_ADDRESS }),
    __metadata("design:type", String)
], TempUser.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.PHONE_NUMBER }),
    __metadata("design:type", String)
], TempUser.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.COUNTRY_ISO2, nullable: false }),
    __metadata("design:type", String)
], TempUser.prototype, "countryIso2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.MSISDN, nullable: false }),
    __metadata("design:type", String)
], TempUser.prototype, "msisdn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.PASSWORD_HASH, nullable: false }),
    __metadata("design:type", String)
], TempUser.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: TableColumns_1.TemporaryUserColumns.IS_SELLER, default: false }),
    __metadata("design:type", Boolean)
], TempUser.prototype, "isSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: TableColumns_1.TemporaryUserColumns.IS_COOPERATE, default: false }),
    __metadata("design:type", Boolean)
], TempUser.prototype, "isCooperate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.COOPERATE_EMAIL, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "cooperateEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.BUSINESS_NAME, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.WARE_HOUSE_LOCATION, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "wareHouseLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.DEFAULT_SELLER_UNIQUE_CODE, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "defaultSellerUniqueCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.COMPANY_NAME, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.CAC_NUMBER, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "cacNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.TemporaryUserColumns.ADDRESS, nullable: true }),
    __metadata("design:type", String)
], TempUser.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryUserColumns.ROLE, nullable: true, default: Roles_1.Roles.NORMAL_USER }),
    __metadata("design:type", String)
], TempUser.prototype, "role", void 0);
TempUser = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.TEMPORARY_USERS })
], TempUser);
exports.TempUser = TempUser;
//# sourceMappingURL=TempUser.js.map