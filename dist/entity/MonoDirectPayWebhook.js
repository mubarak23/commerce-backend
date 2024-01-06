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
exports.MonoDirectPayWebhooks = void 0;
// MonoDirectPayWebhook
// MonoDirectPaySubscription MonoDirectPaySubscriptionsColumns
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_2 = require("typeorm");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
//  MortgageCardColumns
let MonoDirectPayWebhooks = class MonoDirectPayWebhooks extends BaseEntity_1.default {
    initializeDirectPayWebHookResponse(reference, status, webHookEvent, responseData) {
        this.uuid = (0, uuid_1.v4)();
        this.reference = reference;
        this.status = status;
        this.webHookEvent = webHookEvent;
        this.responseData = responseData;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.MonoDirectPayWebHooksColumns.UUID, unique: true }),
    __metadata("design:type", String)
], MonoDirectPayWebhooks.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.MonoDirectPayWebHooksColumns.REFERENCE, nullable: false, }),
    __metadata("design:type", String)
], MonoDirectPayWebhooks.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: TableColumns_1.MonoDirectPayWebHooksColumns.RESPONSE_DATA, nullable: true }),
    __metadata("design:type", Object)
], MonoDirectPayWebhooks.prototype, "responseData", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.MonoDirectPayWebHooksColumns.STATUS, nullable: false, }),
    __metadata("design:type", String)
], MonoDirectPayWebhooks.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: TableColumns_1.MonoDirectPayWebHooksColumns.WEB_HOOK_EVENT, nullable: false, }),
    __metadata("design:type", String)
], MonoDirectPayWebhooks.prototype, "webHookEvent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MonoDirectPayWebHooksColumns.IS_USED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MonoDirectPayWebhooks.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.MonoDirectPayWebHooksColumns.IS_SOFT_DELETED, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MonoDirectPayWebhooks.prototype, "isSoftDeleted", void 0);
MonoDirectPayWebhooks = __decorate([
    (0, typeorm_2.Entity)({ name: Tables_1.default.MONO_DIRECT_PAY_WEB_HOOKS }),
    (0, typeorm_2.Index)(['uuid'])
], MonoDirectPayWebhooks);
exports.MonoDirectPayWebhooks = MonoDirectPayWebhooks;
//# sourceMappingURL=MonoDirectPayWebhook.js.map