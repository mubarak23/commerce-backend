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
exports.MortageUser = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Roles_1 = require("../enums/Roles");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const User_1 = require("./User");
// MORTAGE_USERS MortageUserColumns
let MortageUser = class MortageUser extends BaseEntity_1.default {
    initialize(userId, accountId, type) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.accountId = accountId;
        this.type = type;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortageUserColumns.UUID, unique: true }),
    __metadata("design:type", String)
], MortageUser.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortageUserColumns.USER_ID, nullable: false }),
    __metadata("design:type", Number)
], MortageUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.MortageUserColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], MortageUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MortageUserColumns.ACCOUNT_ID, nullable: false }),
    __metadata("design:type", Number)
], MortageUser.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.MortageUserColumns.TYPE, nullable: false }),
    __metadata("design:type", String)
], MortageUser.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MortageUserColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MortageUser.prototype, "isSoftDeleted", void 0);
MortageUser = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.MORTAGE_USERS }),
    (0, typeorm_2.Index)(['user']),
    (0, typeorm_2.Index)(['uuid'])
], MortageUser);
exports.MortageUser = MortageUser;
//# sourceMappingURL=MortageUser.js.map