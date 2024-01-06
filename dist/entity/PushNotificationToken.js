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
exports.PushNotificationToken = void 0;
const typeorm_1 = require("typeorm");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const PushNotificationDeviceType_1 = __importDefault(require("../enums/PushNotificationDeviceType"));
const core_1 = require("../utils/core");
let PushNotificationToken = class PushNotificationToken extends BaseEntity_1.default {
    initialize(userId, deviceType, deviceToken) {
        this.userId = userId;
        this.deviceType = deviceType;
        this.deviceToken = deviceToken;
        this.createdAt = (0, core_1.utcNow)();
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: TableColumns_1.PushNotificationTokenColumns.USER_ID }),
    __metadata("design:type", Number)
], PushNotificationToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PushNotificationTokenColumns.DEVICE_TYPE, nullable: false }),
    __metadata("design:type", String)
], PushNotificationToken.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.PushNotificationTokenColumns.TOKEN, nullable: false }),
    __metadata("design:type", String)
], PushNotificationToken.prototype, "deviceToken", void 0);
PushNotificationToken = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.PUSH_NOTIFICATION_TOKENS }),
    (0, typeorm_1.Index)(['userId'])
], PushNotificationToken);
exports.PushNotificationToken = PushNotificationToken;
//# sourceMappingURL=PushNotificationToken.js.map