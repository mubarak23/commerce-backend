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
exports.SmsSendLog = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const typeorm_2 = require("typeorm");
const core_1 = require("../utils/core");
const SmsProviders_1 = require("../enums/SmsProviders");
let SmsSendLog = class SmsSendLog extends typeorm_2.BaseEntity {
    initialize(msisdn, requestJson, smsProvider) {
        this.recipientMsisdn = msisdn;
        this.smsProvider = smsProvider;
        this.requestJson = requestJson;
        this.sentSuccessfully = undefined;
        this.httpRequestErrorMessage = undefined;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SmsSendLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.SmsSendLogColumns.RECIPIENT_MSISDN, nullable: false }),
    __metadata("design:type", String)
], SmsSendLog.prototype, "recipientMsisdn", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: TableColumns_1.SmsSendLogColumns.SMS_PROVIDER, nullable: false }),
    __metadata("design:type", String)
], SmsSendLog.prototype, "smsProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.SmsSendLogColumns.REQUEST_JSON, nullable: false }),
    __metadata("design:type", Object)
], SmsSendLog.prototype, "requestJson", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.SmsSendLogColumns.RESPONSE_JSON, nullable: true }),
    __metadata("design:type", Object)
], SmsSendLog.prototype, "responseJson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.SmsSendLogColumns.HTTP_REQUEST_ERROR_MESSAGE, nullable: true }),
    __metadata("design:type", String)
], SmsSendLog.prototype, "httpRequestErrorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.SmsSendLogColumns.SENT_SUCCESSFULLY, nullable: true }),
    __metadata("design:type", Boolean)
], SmsSendLog.prototype, "sentSuccessfully", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.default.CREATED_AT, nullable: false }),
    __metadata("design:type", Date)
], SmsSendLog.prototype, "createdAt", void 0);
SmsSendLog = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.SMS_SEND_LOGS }),
    (0, typeorm_1.Index)(['recipientMsisdn'])
], SmsSendLog);
exports.SmsSendLog = SmsSendLog;
//# sourceMappingURL=SmsSendLog.js.map