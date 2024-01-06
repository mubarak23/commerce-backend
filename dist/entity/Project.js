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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const ProjectEnums_1 = require("../enums/ProjectEnums");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
const User_1 = require("./User");
let Project = class Project extends BaseEntity_1.default {
    initializeProjectByDeveloper(reqBody, userId, accountId) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.accountId = accountId;
        this.name = reqBody.name;
        this.type = reqBody.type;
        this.details = reqBody.details;
        this.duration = reqBody.duration;
        this.paymentPlan = reqBody.paymentPlan ? reqBody.paymentPlan : ProjectEnums_1.ProjectPaymentPlan.MONTHLY;
        this.costPerSlot = reqBody.costPerSlot;
        this.numberOfSlots = reqBody.numberOfSlots;
        this.startDate = reqBody.startDate;
        this.minimumNumberOfSlot = reqBody.minimumNumberOfSlot ? reqBody.minimumNumberOfSlot : 1;
        this.initialInvestmentPercentage = reqBody.initialInvestmentPercentage;
        this.address = reqBody.address;
        this.state = reqBody.state;
        this.status = ProjectEnums_1.ProjectStatuses.PENDING;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto(developerPublicProfile, project, projectResponseImages, projectSubscriptions, numberOfSlotSold) {
        return {
            projectUuid: project.uuid,
            developerPublicProfile,
            name: project.name,
            details: project.details,
            type: project.type,
            costPerSlot: project.costPerSlot,
            initialInvestmentPercentage: project.initialInvestmentPercentage,
            duration: project.duration,
            numberOfSlots: project.numberOfSlots,
            startDate: project.startDate,
            paymentPlan: project.paymentPlan,
            status: project.status,
            minimumNumberOfSlot: project.minimumNumberOfSlot,
            images: projectResponseImages,
            address: project.address,
            state: project.state,
            numberOfSlotSold,
            locationOnMap: project.locationOnMap,
            projectSubscriptions,
            stages: project.stages,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.UUID, unique: true }),
    __metadata("design:type", String)
], Project.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.USER_ID, nullable: false }),
    __metadata("design:type", Number)
], Project.prototype, "userId", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_2.JoinColumn)({
        name: TableColumns_1.ProjectColumns.USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], Project.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.ACCOUNT_ID, nullable: false }),
    __metadata("design:type", Number)
], Project.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ProjectColumns.TYPE, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.ProjectColumns.NAME, nullable: false }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.DETAILS, nullable: false }),
    __metadata("design:type", String)
], Project.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.ProjectColumns.IMAGES, nullable: true }),
    __metadata("design:type", Array)
], Project.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.ProjectColumns.STAGES,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Project.prototype, "stages", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.CURRENT_STAGE, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "currentStage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectColumns.COST_PER_SLOT,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Project.prototype, "costPerSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.NUMBER_OF_SLOTS, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "numberOfSlots", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.MINIMUM_NUMBER_OF_SLOT, nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Project.prototype, "minimumNumberOfSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.DURATION, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.PAYMENT_PLAN, nullable: true, default: ProjectEnums_1.ProjectPaymentPlan.MONTHLY }),
    __metadata("design:type", String)
], Project.prototype, "paymentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.ProjectColumns.INITIAL_INVESTMENT_PERCENTAGE,
        default: 0,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Project.prototype, "initialInvestmentPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.LOCATION_ON_MAP, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "locationOnMap", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.ADDRESS, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.STATE, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.COUNTRY, nullable: true, default: "Nigeria" }),
    __metadata("design:type", String)
], Project.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.START_DATE, nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.ProjectColumns.STATUS, nullable: false }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.ProjectColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isSoftDeleted", void 0);
Project = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.PROJECTS }),
    (0, typeorm_2.Index)(['user']),
    (0, typeorm_2.Index)(['uuid'])
], Project);
exports.Project = Project;
//# sourceMappingURL=Project.js.map