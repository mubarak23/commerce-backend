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
exports.NotificationMessage = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const User_1 = require("./User");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const core_1 = require("../utils/core");
let NotificationMessage = class NotificationMessage extends BaseEntity_1.default {
    initialize(userId, type, title, message, metadata) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.message = message;
        this.metadata = metadata;
        this.isRead = false;
        this.readAt = undefined;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
    toResponseDto() {
        const responseDto = {
            uuid: this.uuid,
            type: this.type,
            title: this.title,
            message: this.message,
            metadata: this.metadata,
            isRead: this.isRead,
            readAt: this.readAt,
            createdAt: this.createdAt
        };
        return responseDto;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.NotificationMessageColumns.UUID, unique: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.NotificationMessageColumns.USER_ID }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: TableColumns_1.NotificationMessageColumns.USER_ID, referencedColumnName: TableColumns_1.default.ID }),
    __metadata("design:type", User_1.User)
], NotificationMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.NotificationMessageColumns.TYPE, nullable: false }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.NotificationMessageColumns.METADATA, nullable: true }),
    __metadata("design:type", Object)
], NotificationMessage.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: TableColumns_1.NotificationMessageColumns.TITLE, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: TableColumns_1.NotificationMessageColumns.MESSAGE }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: TableColumns_1.NotificationMessageColumns.IS_READ, nullable: false, default: false }),
    __metadata("design:type", Boolean)
], NotificationMessage.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: TableColumns_1.NotificationMessageColumns.READ_AT, nullable: true }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "readAt", void 0);
NotificationMessage = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.NOTIFICATION_MESSAGES }),
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Index)(['userId', 'isRead'])
], NotificationMessage);
exports.NotificationMessage = NotificationMessage;
//# sourceMappingURL=NotificationMessage.js.map