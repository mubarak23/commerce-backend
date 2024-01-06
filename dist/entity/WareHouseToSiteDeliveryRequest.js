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
exports.WareHouseToSiteDeliveryRequest = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const TableColumns_1 = require("../enums/TableColumns");
const Tables_1 = __importDefault(require("../enums/Tables"));
const core_1 = require("../utils/core");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Statuses_1 = require("../enums/Statuses");
let WareHouseToSiteDeliveryRequest = class WareHouseToSiteDeliveryRequest extends BaseEntity_1.default {
    initialize(wareHouseId, userId, deliveryLocationId, deliveryItems, totalAmountMajor) {
        this.uuid = (0, uuid_1.v4)();
        this.userId = userId;
        this.wareHouseId = wareHouseId;
        this.deliveryLocationId = deliveryLocationId;
        this.deliveryItems = deliveryItems;
        this.totalAmountMajor = totalAmountMajor;
        this.createdAt = (0, core_1.utcNow)();
        this.deliveryFeeStatus = Statuses_1.WareHouseToSiteDeliveryFeeStatuses.REQUESTED;
        this.deliveryFeeStatusHistory = [
            { status: this.deliveryFeeStatus, dateTimeInISO8601: this.createdAt.toISOString() },
        ];
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.UUID, unique: true }),
    __metadata("design:type", String)
], WareHouseToSiteDeliveryRequest.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.USER_ID }),
    __metadata("design:type", Number)
], WareHouseToSiteDeliveryRequest.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.WARE_HOUSE_ID }),
    __metadata("design:type", Number)
], WareHouseToSiteDeliveryRequest.prototype, "wareHouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.DELIVERY_LOCATION_ID }),
    __metadata("design:type", Number)
], WareHouseToSiteDeliveryRequest.prototype, "deliveryLocationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.DELIVERY_ITEMS }),
    __metadata("design:type", Array)
], WareHouseToSiteDeliveryRequest.prototype, "deliveryItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.TOTAL_AMOUNT_MAJOR }),
    __metadata("design:type", Number)
], WareHouseToSiteDeliveryRequest.prototype, "totalAmountMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_AMOUNT_MAJOR, nullable: true }),
    __metadata("design:type", Number)
], WareHouseToSiteDeliveryRequest.prototype, "deliveryFeeAmountMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_STATUS, nullable: false }),
    __metadata("design:type", String)
], WareHouseToSiteDeliveryRequest.prototype, "deliveryFeeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], WareHouseToSiteDeliveryRequest.prototype, "deliveryFeeStatusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.WareHouseToSiteDeliveriesProductColumns.PAYMENT_TRANSACTION_UUID, nullable: true }),
    __metadata("design:type", String)
], WareHouseToSiteDeliveryRequest.prototype, "paymentTransactionUuid", void 0);
WareHouseToSiteDeliveryRequest = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.WARE_HOUSE_TO_SITE_DELIVERY_REQUESTS }),
    (0, typeorm_1.Index)(["id"], { unique: true })
], WareHouseToSiteDeliveryRequest);
exports.WareHouseToSiteDeliveryRequest = WareHouseToSiteDeliveryRequest;
//# sourceMappingURL=WareHouseToSiteDeliveryRequest.js.map