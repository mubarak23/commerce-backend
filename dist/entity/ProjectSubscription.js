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
exports.ProjectSubscription = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const ProjectEnums_1 = require("../enums/ProjectEnums");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const Project_1 = require("./Project");
const User_1 = require("./User");
let ProjectSubscription = class ProjectSubscription extends BaseEntity_1.default {
    initializeInvestorProjectSubscription(reqBody) {
        this.uuid = (0, uuid_1.v4)();
        this.investorUserId = reqBody.investorUserId;
        this.developerUserId = reqBody.developerUserId;
        this.projectId = reqBody.projectId;
        this.numberOfSlots = reqBody.numberOfSlots;
        this.totalAmountMinor = reqBody.totalAmountMinor;
        this.initialAmountMinor = reqBody.initialAmountMinor;
        this.amountPaidMinor = reqBody.initialAmountMinor;
        this.amountRemainingMinor = reqBody.amountRemainingMinor;
        this.amountPerPaymentPlanDurationMinor = reqBody.amountPerPaymentPlanDurationMinor;
        this.durationPerPaymentPlan = reqBody.durationPerPaymentPlan;
        this.duration = reqBody.duration;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto(projectSubscription, projectUuid, project, investorPublicProfile, developerPublicProfile, susbscriptionTransactions, totalSubscriptionAmountPaidMinor, nextPaymentDueDate) {
        let totalSubscriptionAmountPaidMajor = 0;
        if (totalSubscriptionAmountPaidMinor) {
            totalSubscriptionAmountPaidMajor = (totalSubscriptionAmountPaidMinor / 100);
        }
        return {
            projectSubscriptionUuid: projectSubscription.uuid,
            projectUuid,
            project,
            developerPublicProfile,
            investorPublicProfile,
            susbscriptionTransactions,
            numberOfSlots: projectSubscription.numberOfSlots,
            totalAmountMinor: (projectSubscription.totalAmountMinor / 100),
            initialAmountMinor: (projectSubscription.initialAmountMinor / 100),
            amountRemainingMinor: (projectSubscription.amountRemainingMinor / 100),
            amountDueMinor: (projectSubscription.amountRemainingMinor / 100),
            amountPaidMinor: totalSubscriptionAmountPaidMajor || 0,
            amountPerPaymentPlanDurationMinor: (projectSubscription.amountPerPaymentPlanDurationMinor / 100),
            durationPerPaymentPlan: projectSubscription.durationPerPaymentPlan,
            status: projectSubscription.status,
            duration: projectSubscription.duration,
            durationLeft: projectSubscription.durationLeft,
            durationCovered: projectSubscription.durationCovered,
            nextPaymentDueDate,
            createdAt: projectSubscription.createdAt
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.UUID, unique: true }),
    __metadata("design:type", String)
], ProjectSubscription.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.INVESTOR_USER_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "investorUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionColumns.INVESTOR_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], ProjectSubscription.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.DEVELOPER_USER_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "developerUserId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionColumns.DEVELOPER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], ProjectSubscription.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.PROJECT_ID, nullable: false }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => Project_1.Project, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectSubscriptionColumns.PROJECT_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", Project_1.Project)
], ProjectSubscription.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionColumns.TOTAL_AMOUNT_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "totalAmountMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.DURATION_PER_PAYMENT_PLAN, nullable: true }),
    __metadata("design:type", String)
], ProjectSubscription.prototype, "durationPerPaymentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.DURATION, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.NUMBER_OF_SLOTS, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "numberOfSlots", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionColumns.AMOUNT_PAID_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "amountPaidMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionColumns.INITIAL_AMOUNT_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "initialAmountMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionColumns.AMOUNT_REMAINING_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "amountRemainingMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectSubscriptionColumns.AMOUNT_PER_PAYMENT_PLAN__DURATION_MINOR,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "amountPerPaymentPlanDurationMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.DURATION_COVERED, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "durationCovered", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.DURATION_LEFT, nullable: true }),
    __metadata("design:type", Number)
], ProjectSubscription.prototype, "durationLeft", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.ProjectSubscriptionColumns.SUBSCRIPTON_PAYMENT_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], ProjectSubscription.prototype, "subscriptionPaymentHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.SUBSCRIPTION_DATE, nullable: true, default: (0, core_1.utcNow)() }),
    __metadata("design:type", Date)
], ProjectSubscription.prototype, "susbscriptionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectSubscriptionColumns.STATUS, nullable: true, default: ProjectEnums_1.ProjectStatuses.PENDING }),
    __metadata("design:type", String)
], ProjectSubscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProjectSubscriptionColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ProjectSubscription.prototype, "isSoftDeleted", void 0);
ProjectSubscription = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.PROJECT_SUBSCRIPTIONS }),
    (0, typeorm_2.Index)(['investor', 'developer']),
    (0, typeorm_2.Index)(['uuid'])
], ProjectSubscription);
exports.ProjectSubscription = ProjectSubscription;
//# sourceMappingURL=ProjectSubscription.js.map