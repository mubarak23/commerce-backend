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
exports.CronRun = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const typeorm_2 = require("typeorm");
let CronRun = class CronRun extends typeorm_2.BaseEntity {
    initialize(name, lastRunStart) {
        this.name = name;
        this.lastRunStart = lastRunStart;
        this.lastRunEnd = undefined;
        return this;
    }
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CronRun.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.CronRunColumns.NAME, nullable: false }),
    __metadata("design:type", String)
], CronRun.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.CronRunColumns.IS_RUNNING, nullable: false, default: true }),
    __metadata("design:type", Boolean)
], CronRun.prototype, "isRunning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.CronRunColumns.LAST_RUN_START, nullable: true }),
    __metadata("design:type", Date)
], CronRun.prototype, "lastRunStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.CronRunColumns.LAST_RUN_END, nullable: true }),
    __metadata("design:type", Date)
], CronRun.prototype, "lastRunEnd", void 0);
CronRun = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.CRON_RUNS }),
    (0, typeorm_1.Index)(['name'], { unique: true })
], CronRun);
exports.CronRun = CronRun;
//# sourceMappingURL=CronRun.js.map