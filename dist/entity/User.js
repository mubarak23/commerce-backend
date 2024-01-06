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
exports.User = void 0;
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Roles_1 = require("../enums/Roles");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const PickupLocation_1 = require("./PickupLocation");
let User = class User extends BaseEntity_1.default {
    initialize(tempUser, msisdn, countryLongName) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        this.firstName = tempUser.firstName;
        this.lastName = tempUser.lastName;
        this.emailAddress = tempUser.emailAddress;
        if (tempUser.phoneNumber.startsWith("0")) {
            this.phoneNumber = tempUser.phoneNumber.substring(1);
        }
        else {
            this.phoneNumber = tempUser.phoneNumber;
        }
        this.msisdn = msisdn;
        this.passwordHash = tempUser.passwordHash;
        this.countryIso2 = tempUser.countryIso2;
        this.countryLongName = countryLongName;
        this.isSeller = tempUser.isSeller;
        this.companyName = tempUser.companyName;
        this.role = tempUser.role;
        this.isCooperate = tempUser.isCooperate;
        this.isEnabled = true;
        this.totalRatingsValue = 0;
        this.totalNumberOfRatings = 0;
        this.createdAt = now;
        return this;
    }
    initializeFromSimple(buyerFullName, buyerEmailAddress, buyerMsisdn, passwordHash) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        const fullNameSplit = buyerFullName.split(' ');
        // eslint-disable-next-line prefer-destructuring
        this.firstName = fullNameSplit[0];
        this.lastName = fullNameSplit[1] ? fullNameSplit[1] : fullNameSplit[0];
        this.emailAddress = buyerEmailAddress;
        this.msisdn = buyerMsisdn;
        this.phoneNumber = new awesome_phonenumber_1.default(buyerMsisdn, "NG").getNumber("national");
        this.passwordHash = passwordHash;
        this.countryIso2 = 'NG';
        this.countryLongName = 'Nigeria';
        this.isSeller = false;
        this.role = Roles_1.Roles.NORMAL_USER;
        this.isEnabled = true;
        this.totalRatingsValue = 0;
        this.totalNumberOfRatings = 0;
        this.createdAt = now;
        return this;
    }
    initializeAdmin(firstName, lastName, phoneNumber, msisdn, passwordHash, countryIso2, countryLongName) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.msisdn = msisdn;
        this.passwordHash = passwordHash;
        this.countryIso2 = countryIso2;
        this.countryLongName = countryLongName;
        this.createdAt = now;
        return this;
    }
    initializeAffiliate(firstName, lastName, phoneNumber, msisdn, emailAddress, passwordHash) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        this.firstName = firstName;
        this.lastName = lastName;
        if (phoneNumber.startsWith("0")) {
            this.phoneNumber = phoneNumber.substring(1);
        }
        else {
            this.phoneNumber = phoneNumber;
        }
        this.msisdn = msisdn;
        this.emailAddress = emailAddress;
        this.passwordHash = passwordHash;
        this.countryIso2 = "NG";
        this.countryLongName = "Nigeria";
        this.role = Roles_1.Roles.AFFILIATE;
        this.createdAt = now;
        return this;
    }
    initializeSellerOma(firstName, lastName, phoneNumber, msisdn, emailAddress, passwordHash) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        this.firstName = firstName;
        this.lastName = lastName;
        if (phoneNumber.startsWith("0")) {
            this.phoneNumber = phoneNumber.substring(1);
        }
        else {
            this.phoneNumber = phoneNumber;
        }
        this.msisdn = msisdn;
        this.emailAddress = emailAddress;
        this.passwordHash = passwordHash;
        this.countryIso2 = "NG";
        this.isSeller = true;
        this.isEnabled = true;
        this.countryLongName = "Nigeria";
        this.role = Roles_1.Roles.NORMAL_USER;
        this.createdAt = now;
        return this;
    }
    initializeNewCooperateUser(firstName, lastName, phoneNumber, msisdn, emailAddress, passwordHash) {
        this.uuid = (0, uuid_1.v4)();
        const now = (0, core_1.utcNow)();
        this.firstName = firstName;
        this.lastName = lastName;
        if (phoneNumber.startsWith("0")) {
            this.phoneNumber = phoneNumber.substring(1);
        }
        else {
            this.phoneNumber = phoneNumber;
        }
        this.msisdn = msisdn;
        this.emailAddress = emailAddress;
        this.passwordHash = passwordHash;
        this.countryIso2 = "NG";
        this.isSeller = false;
        this.countryLongName = "Nigeria";
        this.role = Roles_1.Roles.NORMAL_USER;
        this.isCooperate = true;
        this.createdAt = now;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.UUID, unique: true }),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.UserColumns.FIRST_NAME, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.UserColumns.LAST_NAME, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.EMAIL_ADDRESS, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.PHONE_NUMBER, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.MSISDN, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "msisdn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.COUNTRY_ISO2, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "countryIso2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: TableColumns_1.UserColumns.COUNTRY_LONG_NAME,
        nullable: false,
        default: "Nigeria",
    }),
    __metadata("design:type", String)
], User.prototype, "countryLongName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.PASSWORD_HASH, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.UserColumns.PHOTO, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.IS_SELLER,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.default.IS_ENABLED,
        nullable: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.CREATED_FROM_TEMPORARY_ORDER,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "createdFromTemporaryOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.UserColumns.TOTAL_RATINGS_VALUE,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], User.prototype, "totalRatingsValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.UserColumns.TOTAL_NUMBER_OF_RATINGS,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], User.prototype, "totalNumberOfRatings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.UserColumns.SETTINGS, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.UserColumns.BANK_INFO, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "bankInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.UserColumns.SELLER_DOCS, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "sellerDocs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PickupLocation_1.PickupLocation, (pickupLocation) => pickupLocation.user),
    __metadata("design:type", Promise)
], User.prototype, "pickupLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.DEFAULT_SELLER_USER_ID, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "defaultSellerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.UNIQUE_CODE, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "uniqueCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.ROLE, nullable: true, default: Roles_1.Roles.NORMAL_USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.UserColumns.STORE_FRONT_BANNER, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "storeFrontBanner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.IS_COOPERATE,
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isCooperate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.IS_DEVELOPER,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeveloper", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.IS_INVESTOR,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isInvestor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.ACCOUNT_ID, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.UserColumns.WAREHOUSE_ID, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "wareHouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.UserColumns.COMPANY_NAME, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.IS_ADMIN,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.ADMIN_CAN_VIEW,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "adminCanView", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: TableColumns_1.UserColumns.ADMIN_CAN_EDIT,
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "adminCanEdit", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.USERS }),
    (0, typeorm_1.Index)(["uuid"]),
    (0, typeorm_1.Index)(["phoneNumber"]),
    (0, typeorm_1.Index)(["msisdn"]),
    (0, typeorm_1.Index)(["emailAddress"]),
    (0, typeorm_1.Index)(["uniqueCode"]),
    (0, typeorm_1.Index)(["defaultSellerUserId"]),
    (0, typeorm_1.Index)(["role"]),
    (0, typeorm_1.Index)(["uuid", "role"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map