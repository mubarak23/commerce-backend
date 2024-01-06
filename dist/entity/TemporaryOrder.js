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
exports.TemporaryOrder = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const uuid_1 = require("uuid");
const User_1 = require("./User");
const transformers_1 = require("../utils/transformers");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const PickupLocation_1 = require("./PickupLocation");
const Currency_1 = require("../enums/Currency");
let TemporaryOrder = class TemporaryOrder extends BaseEntity_1.default {
    initialize(sellerUser, orderItems, orderReceiveType, buyerUser, currency, deliveryDetails, pickupLocationId) {
        var _a;
        this.uuid = (0, uuid_1.v4)();
        this.sellerUserId = sellerUser.id;
        this.orderItems = orderItems;
        this.orderReceiveType = orderReceiveType;
        this.buyerUser = buyerUser;
        let orderAmountMajor = 0;
        let totalDeliveryCostMajor = 0;
        for (const item of orderItems) {
            if (item.quoteRequest) {
                orderAmountMajor += item.quoteRequest.calculatedTotalCostMajor || 0;
                totalDeliveryCostMajor += (item.quoteRequest.deliveryFee || 0);
            }
            else if (item.unitPromoPriceForBuyer) {
                orderAmountMajor += item.unitPromoPriceForBuyer * item.quantity;
            }
            else {
                orderAmountMajor += item.unitPriceForBuyer * item.quantity;
                if (orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                    if (item.deliveryAddressState) {
                        const deliveryFees = ((_a = item.productCategorySettings) === null || _a === void 0 ? void 0 : _a.deliveryFees) || [];
                        const foundStateDeliveryFee = deliveryFees.find(state => state.state === item.deliveryAddressState);
                        if (foundStateDeliveryFee) {
                            const deliveryFee = (foundStateDeliveryFee.deliveryFeeMajor || 0);
                            totalDeliveryCostMajor += deliveryFee;
                        }
                    }
                }
            }
        }
        this.calculatedTotalCostMajor = Utils.normalizeMoney(orderAmountMajor);
        this.deliveryCostMajor = Utils.normalizeMoney(totalDeliveryCostMajor);
        this.currency = currency;
        this.status = Statuses_1.default.CREATED;
        this.paymentStatus = Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING;
        const now = Utils.utcNow();
        this.statusHistory = [
            { status: this.status, dateTimeInISO8601: now.toISOString() },
        ];
        this.paymentStatusHistory = [
            { status: this.paymentStatus, dateTimeInISO8601: now.toISOString() },
        ];
        this.deliveryDetails = deliveryDetails;
        this.pickupLocationId = pickupLocationId;
        this.createdAt = Utils.utcNow();
        return this;
    }
    toResponseDto(products, sellerPublicProfile, pickupLocation) {
        var _a;
        const orderItems = [];
        for (const oItem of this.orderItems) {
            const oItemProduct = products.find(prod => prod.id === oItem.productId);
            orderItems.push(Object.assign(Object.assign({}, oItem), { productName: oItemProduct.name, images: (_a = oItemProduct.images) !== null && _a !== void 0 ? _a : [] }));
        }
        const CurrencyEnum = Currency_1.CurrencyToSymbol;
        const currencySymbol = CurrencyEnum[this.currency] || '₦';
        const orderLocation = this.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY ?
            {
                name: this.deliveryDetails.address,
                address: this.deliveryDetails.address,
                country: this.deliveryDetails.country,
                state: this.deliveryDetails.state,
                contactFullName: this.deliveryDetails.contactFullName,
                contactPhoneNumber: this.deliveryDetails.contactPhoneNumber,
            } :
            {
                name: pickupLocation.address,
                address: pickupLocation.address,
                country: pickupLocation.country,
                state: pickupLocation.state,
                contactFullName: pickupLocation.contactFullName,
                contactPhoneNumber: pickupLocation.contactPhoneNumber,
            };
        return {
            orderUuid: this.uuid,
            orderItems,
            sellerPublicProfile,
            orderReceiveType: this.orderReceiveType,
            orderLocation,
            status: this.status,
            paymentStatus: this.paymentStatus,
            statusHistory: this.statusHistory,
            paymentStatusHistory: this.paymentStatusHistory,
            calculatedTotalCostMajor: this.calculatedTotalCostMajor,
            deliveryCostMajor: this.deliveryCostMajor,
            currency: this.currency,
            currencySymbol,
            createdAt: this.createdAt,
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.UUID, unique: true }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.TemporaryOrderColumns.BUYER_DETAILS, nullable: false }),
    __metadata("design:type", Object)
], TemporaryOrder.prototype, "buyerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.SELLER_USER_ID }),
    __metadata("design:type", Number)
], TemporaryOrder.prototype, "sellerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.TemporaryOrderColumns.SELLER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], TemporaryOrder.prototype, "sellerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.TemporaryOrderColumns.ORDER_ITEMS }),
    __metadata("design:type", Array)
], TemporaryOrder.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.ORDER_RECEIVE_TYPE, nullable: true }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "orderReceiveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.STATUS, nullable: false }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.PAYMENT_STATUS, nullable: false }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.TemporaryOrderColumns.STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], TemporaryOrder.prototype, "statusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.TemporaryOrderColumns.PAYMENT_STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], TemporaryOrder.prototype, "paymentStatusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, name: TableColumns_1.TemporaryOrderColumns.CURRENCY, nullable: true }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.BUYER_PAYMENT_TRANSACTION_UUID, nullable: true }),
    __metadata("design:type", String)
], TemporaryOrder.prototype, "paymentTransactionUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.TemporaryOrderColumns.CALCULATED_TOTAL_COST_MAJOR,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], TemporaryOrder.prototype, "calculatedTotalCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.TemporaryOrderColumns.DELIVERY_COST_MAJOR,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], TemporaryOrder.prototype, "deliveryCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.TemporaryOrderColumns.DELIVERY_DETAILS, nullable: true }),
    __metadata("design:type", Object)
], TemporaryOrder.prototype, "deliveryDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.TemporaryOrderColumns.PICKUP_LOCATION_ID, nullable: true }),
    __metadata("design:type", Number)
], TemporaryOrder.prototype, "pickupLocationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupLocation_1.PickupLocation, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.TemporaryOrderColumns.PICKUP_LOCATION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", PickupLocation_1.PickupLocation)
], TemporaryOrder.prototype, "pickupLocation", void 0);
TemporaryOrder = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.TEMPORARY_ORDERS }),
    (0, typeorm_1.Index)(["uuid"]),
    (0, typeorm_1.Index)(["sellerUserId"]),
    (0, typeorm_1.Index)(["sellerUserId", "status"])
], TemporaryOrder);
exports.TemporaryOrder = TemporaryOrder;
//# sourceMappingURL=TemporaryOrder.js.map