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
exports.ProjectSubscriptionTransaction = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const Project_1 = require("./Project");
const ProjectSubscription_1 = require("./ProjectSubscription");
const User_1 = require("./User");
let ProjectSubscriptionTransaction = class ProjectSubscriptionTransaction extends BaseEntity_1.default {
    initializeInvestorProjectSubscriptionTransaction(reqBody) {
        this.uuid = (0, uuid_1.v4)();
        this.investorUserId = reqBody.investorUserId;
        this.developerUserId = reqBody.developerUserId;
        this.projectId = reqBody.projectId;
        this.projectSubscriptionId = reqBody.projectSubscriptionId;
        this.amountBeforeMinor = reqBody.amountBeforeMinor;
        this.amountPaidMinor = reqBody.amountPaidMinor;
        this.amountAfterMinor = reqBody.amountAfterMinor;
        this.amountRemainingMinor = reqBody.amountRemainingMinor;
        this.paymentPlanDurationNumber = reqBody.paymentPlanDurationNumber;
        this.financialTransactionId = reqBody.financialTransactionId;
        this.description = reqBody.description;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto(subscriptionTransaction) {
        return {
            uuid: subscriptionTransaction.uuid,
            investorUserId: subscriptionTransaction.investorUserId,
            developerUserId: subscriptionTransaction.developerUserId,
            projectUuid: subscriptionTransaction.project.uuid,
            projectSubscriptionUuid: subscriptionTransaction.projectSubscription.uuid,
            amountBeforeMinor: (subscriptionTransaction.amountBeforeMinor / 100),
            amountPaidMinor: (subscriptionTransaction.amountPaidMinor / 100),
            amountAfterMinor: (subscriptionTransaction.amountAfterMinor / 100),
            amountRemainingMinor: (subscriptionTransaction.amountRemainingMinor / 100),
            financialTransactionId: subscriptionTransaction.financialTransactionId,
            description: subscriptionTransaction.description,
            paymentPlanDurationNumber: subscriptionTransaction.paymentPlanDurationNumber,
            createdAt: subscriptionTransaction.createdAt
        };
    }
    toProjectTransactionResponseDto(subscriptionTransaction, project, investorPublicProfile, projectSubscriptions) {
        return {
            uuid: subscriptionTransaction.uuid,
            investorUserId: subscriptionTransaction.investorUserId,
            developerUserId: subscriptionTransaction.developerUserId,
            projectUuid: subscriptionTransaction.project.uuid,
            projectSubscriptionUuid: subscriptionTransaction.projectSubscription.uuid,
            amountBeforeMinor: (subscriptionTransaction.amountBeforeMinor / 100),
            amountPaidMinor: (subscriptionTransaction.amountPaidMinor / 100),
            amountAfterMinor: (subscriptionTransaction.amountAfterMinor / 100),
            amountRemainingMinor: (subscriptionTransaction.amountRemainingMinor / 100),
            financialTransactionId: subscriptionTransaction.financialTransactionId,
            description: subscriptionTransaction.description,
            paymentPlanDurationNumber: subscriptionTransaction.paymentPlanDurationNumber,
            project,
            investorPublicProfile,
            projectSubscriptions,
            nextPaymentDate: subscriptionTransaction.nextPaymentDate,
            createdAt: subscriptionTransaction.createdAt
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.UUID, unique: true }),
    __metadata("design:type", String)
], ProjectSubscriptionTransaction.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.INVESTOR_USER_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "investorUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.INVESTOR_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], ProjectSubscriptionTransaction.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.DEVELOPER_USER_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "developerUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.DEVELOPER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], ProjectSubscriptionTransaction.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PROJECT_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => Project_1.Project, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PROJECT_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Project_1.Project)
], ProjectSubscriptionTransaction.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PROJECT_SUBSCRIPTION_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "projectSubscriptionId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => ProjectSubscription_1.ProjectSubscription, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PROJECT_SUBSCRIPTION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", ProjectSubscription_1.ProjectSubscription)
], ProjectSubscriptionTransaction.prototype, "projectSubscription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.AMOUNT_BEFORE_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "amountBeforeMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.AMOUNT_PAID_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "amountPaidMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.AMOUNT_AFTER_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "amountAfterMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionTransactionsColumns.AMOUNT_REMAINING_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "amountRemainingMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.DESCRIPTION, nullable: true }),
    __metadata("design:type", String)
], ProjectSubscriptionTransaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PAYMENT_PLAN_DURATION_NUMBER, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "paymentPlanDurationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.FINANCIAL_TRANSACTION_ID, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscriptionTransaction.prototype, "financialTransactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.IS_PAID, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], ProjectSubscriptionTransaction.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.PAID_STATUS, nullable: true, default: PaymentTransaction_1.PaymentTransactionStatus.UNPAID }),
    __metadata("design:type", String)
], ProjectSubscriptionTransaction.prototype, "paidStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionTransactionsColumns.NEXT_PAYMENT_DATE, nullable: true, default: (0, core_1.utcNow)() }),
    __metadata("design:type", String)
], ProjectSubscriptionTransaction.prototype, "nextPaymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProjectSubscriptionTransactionsColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProjectSubscriptionTransaction.prototype, "isSoftDeleted", void 0);
ProjectSubscriptionTransaction = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.PROJECT_SUBSCRIPTION_TRANSACTIONS }),
    (0, typeorm_2.Index)(['investor', 'developer']),
    (0, typeorm_2.Index)(['uuid'])
], ProjectSubscriptionTransaction);
exports.ProjectSubscriptionTransaction = ProjectSubscriptionTransaction;
//# sourceMappingURL=ProjectSubscriptionTransaction.js.map