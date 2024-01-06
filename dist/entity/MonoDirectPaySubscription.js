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
exports.MonoDirectPaySubscription = void 0;
// MonoDirectPaySubscription MonoDirectPaySubscriptionsColumns
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const ProjectSubscriptionTransaction_1 = require("./ProjectSubscriptionTransaction");
const User_1 = require("./User");
//  MortgageCardColumns
let MonoDirectPaySubscription = class MonoDirectPaySubscription extends BaseEntity_1.default {
    initializeDirectPayRequest(investorUserId, developerUserId, reference, projectSubscriptionTransactionId, projectSubscriptionTransactionUuid, requestPayload) {
        this.uuid = (0, uuid_1.v4)();
        this.investorUserId = investorUserId;
        this.developerUserId = developerUserId;
        this.reference = reference;
        this.projectSubscriptionTransactionId = projectSubscriptionTransactionId;
        this.projectSubscriptionTransactionUuid = projectSubscriptionTransactionUuid;
        this.requestPayload = requestPayload;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPaySubscriptionsColumns.UUID, unique: true }),
    __metadata("design:type", String)
], MonoDirectPaySubscription.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPaySubscriptionsColumns.INVESTOR_USER_ID, nullable: true }),
    __metadata("design:type", Number)
], MonoDirectPaySubscription.prototype, "investorUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.MonoDirectPaySubscriptionsColumns.INVESTOR_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], MonoDirectPaySubscription.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPaySubscriptionsColumns.DEVELOPER_USER_ID, nullable: true }),
    __metadata("design:type", Number)
], MonoDirectPaySubscription.prototype, "developerUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.MonoDirectPaySubscriptionsColumns.DEVELOPER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], MonoDirectPaySubscription.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_UUID, nullable: false }),
    __metadata("design:type", String)
], MonoDirectPaySubscription.prototype, "projectSubscriptionTransactionUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_ID, nullable: false }),
    __metadata("design:type", Number)
], MonoDirectPaySubscription.prototype, "projectSubscriptionTransactionId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction)
], MonoDirectPaySubscription.prototype, "projectSubscriptionTransaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.MonoDirectPaySubscriptionsColumns.REFERENCE, nullable: false, }),
    __metadata("design:type", String)
], MonoDirectPaySubscription.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: TableColumns_1.MonoDirectPaySubscriptionsColumns.REQUEST_PAYLOAD, nullable: false }),
    __metadata("design:type", Object)
], MonoDirectPaySubscription.prototype, "requestPayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: TableColumns_1.MonoDirectPaySubscriptionsColumns.RESPONSE_DATA, nullable: true }),
    __metadata("design:type", Object)
], MonoDirectPaySubscription.prototype, "responseData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MonoDirectPaySubscriptionsColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MonoDirectPaySubscription.prototype, "isSoftDeleted", void 0);
MonoDirectPaySubscription = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.MONO_DIRECT_PAY_SUBSCRIPTIONS }),
    (0, typeorm_2.Index)(['investor']),
    (0, typeorm_2.Index)(['developer']),
    (0, typeorm_2.Index)(['uuid'])
], MonoDirectPaySubscription);
exports.MonoDirectPaySubscription = MonoDirectPaySubscription;
//# sourceMappingURL=MonoDirectPaySubscription.js.map