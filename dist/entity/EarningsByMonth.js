"use strict";
// @ts-nocheck
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningsByMonth = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const core_1 = require("../utils/core");
const transformers_1 = require("../utils/transformers");
let EarningsByMonth = class EarningsByMonth extends BaseEntity_1.default {
    initialize(userId, monthISO8601, earningMinor) {
        this.userId = userId;
        this.monthISO8601 = monthISO8601;
        this.totalEarningsMinor = earningMinor;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.EarningsByYearColumns.USER_ID }),
    __metadata("design:type", Number)
], EarningsByMonth.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.EarningsByYearColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID }),
    __metadata("design:type", typeof (_a = typeof Account !== "undefined" && Account) === "function" ? _a : Object)
], EarningsByMonth.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.EarningsByYearColumns.MONTH }),
    __metadata("design:type", String)
], EarningsByMonth.prototype, "monthISO8601", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.EarningsByYearColumns.TOTAL_EARNINGS_MINOR, transformer: new transformers_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], EarningsByMonth.prototype, "totalEarningsMinor", void 0);
EarningsByMonth = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.EARNINGS_BY_MONTH }),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['userId', 'createdAt'])
], EarningsByMonth);
exports.EarningsByMonth = EarningsByMonth;
//# sourceMappingURL=EarningsByMonth.js.map