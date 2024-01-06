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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Currency_1 = require("../enums/Currency");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const Statuses_1 = __importStar(require("../enums/Statuses"));
const TableColumns_1 = __importStar(require("../enums/TableColumns"));
const Tables_1 = __importDefault(require("../enums/Tables"));
const Utils = __importStar(require("../utils/core"));
const transformers_1 = require("../utils/transformers");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const DeliveryLocation_1 = require("./DeliveryLocation");
const PickupLocation_1 = require("./PickupLocation");
const PriceMatrix_1 = require("./PriceMatrix");
const User_1 = require("./User");
let Order = class Order extends BaseEntity_1.default {
    initialize(buyerUser, sellerUser, orderItems, orderReceiveType, currency, paymentVariant, orderReceiver, deliveryLocationId, pickupLocationId, warehouseId) {
        var _a;
        this.uuid = (0, uuid_1.v4)();
        this.buyerUserId = buyerUser.id;
        this.buyerAccountId = buyerUser.accountId;
        this.sellerUserId = sellerUser.id;
        this.orderItems = orderItems;
        this.orderReceiveType = orderReceiveType;
        let orderAmountMajor = 0;
        let cinderbuildRevenueMajor = 0;
        let totalDeliveryCostMajor = 0;
        for (const item of orderItems) {
            if (item.quoteRequest) {
                orderAmountMajor += item.quoteRequest.calculatedTotalCostMajor || 0;
                totalDeliveryCostMajor += (item.quoteRequest.deliveryFee || 0);
                cinderbuildRevenueMajor +=
                    (item.quoteRequest.unitPriceForBuyer - item.quoteRequest.unitPrice) *
                        item.quantity;
            }
            else {
                if (item.unitPromoPriceForBuyer) {
                    orderAmountMajor += item.unitPromoPriceForBuyer * item.quantity;
                    cinderbuildRevenueMajor +=
                        (item.unitPromoPriceForBuyer - item.unitPrice) * item.quantity;
                }
                else {
                    orderAmountMajor += item.unitPriceForBuyer * item.quantity;
                    cinderbuildRevenueMajor +=
                        (item.unitPriceForBuyer - item.unitPrice) * item.quantity;
                }
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
        this.cinderbuildRevenueMajor = Utils.normalizeMoney(cinderbuildRevenueMajor);
        this.currency = currency;
        this.status = Statuses_1.default.CREATED;
        this.paymentStatus = Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING;
        this.paymentVariant = paymentVariant;
        const now = Utils.utcNow();
        this.statusHistory = [
            { status: this.status, dateTimeInISO8601: now.toISOString() },
        ];
        this.paymentStatusHistory = [
            { status: this.paymentStatus, dateTimeInISO8601: now.toISOString() },
        ];
        this.deliveryLocationId = deliveryLocationId;
        this.pickupLocationId = pickupLocationId;
        this.warehouseId = warehouseId || undefined;
        if (orderReceiver) {
            if (orderReceiver.userId) {
                this.receiverUserId = orderReceiver.userId;
            }
            this.receiver = orderReceiver;
        }
        this.createdAt = Utils.utcNow();
        return this;
    }
    getSubTotal() {
        var _a;
        let subTotalMajor = 0;
        for (const item of this.orderItems) {
            if (item.quoteRequest) {
                subTotalMajor = item.quoteRequest.calculatedTotalCostMajor - ((_a = this.deliveryCostMajor) !== null && _a !== void 0 ? _a : 0);
                break;
            }
            else if (item.unitPromoPriceForBuyer) {
                subTotalMajor += item.unitPromoPriceForBuyer * item.quantity;
            }
            else {
                subTotalMajor += item.unitPriceForBuyer * item.quantity;
            }
        }
        return subTotalMajor;
    }
    toResponseDto(products, sellerPublicProfile, buyerPublicProfile, deliveryLocation, pickupLocation, wareHouseLocation) {
        var _a;
        const orderItems = [];
        for (const oItem of this.orderItems) {
            const oItemProduct = products.find(prod => prod.id === oItem.productId);
            orderItems.push(Object.assign(Object.assign({}, oItem), { productName: oItemProduct.name, images: (_a = oItemProduct.images) !== null && _a !== void 0 ? _a : [] }));
        }
        const CurrencyEnum = Currency_1.CurrencyToSymbol;
        const currencySymbol = CurrencyEnum[this.currency] || '₦';
        let orderLocation = null;
        let wareHouseDetails = null;
        if (this.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
            orderLocation = {
                name: deliveryLocation.address,
                address: deliveryLocation.address,
                country: deliveryLocation.country,
                state: deliveryLocation.state,
                contactFullName: deliveryLocation.contactFullName,
                contactPhoneNumber: deliveryLocation.contactPhoneNumber,
            };
        }
        else if (this.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
            orderLocation = {
                name: pickupLocation.address,
                address: pickupLocation.address,
                country: pickupLocation.country,
                state: pickupLocation.state,
                contactFullName: pickupLocation.contactFullName,
                contactPhoneNumber: pickupLocation.contactPhoneNumber,
            };
        }
        else if (this.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE) {
            wareHouseDetails = {
                name: wareHouseLocation === null || wareHouseLocation === void 0 ? void 0 : wareHouseLocation.name,
                state: wareHouseLocation.state,
                contactFullName: wareHouseLocation.contactFullName,
                contactPhoneNumber: wareHouseLocation.contactPhoneNumber,
            };
        }
        return {
            id: this.id,
            orderUuid: this.uuid,
            orderItems,
            referenceNumber: this.referenceNumber,
            sellerPublicProfile,
            buyerPublicProfile,
            orderReceiveType: this.orderReceiveType,
            orderLocation: orderLocation || wareHouseDetails,
            status: this.status,
            paymentStatus: this.paymentStatus,
            paymentVariant: this.paymentVariant,
            statusHistory: this.statusHistory,
            paymentStatusHistory: this.paymentStatusHistory,
            procurementInvoiceUuid: this.procurementInvoiceUuid,
            calculatedTotalCostMajor: this.calculatedTotalCostMajor,
            deliveryCostMajor: this.deliveryCostMajor,
            currency: this.currency,
            currencySymbol,
            createdAt: this.createdAt,
        };
    }
    transformForAdmin(buyerPublicProfile, sellerPublicProfile) {
        return {
            id: this.id,
            uuid: this.uuid,
            referenceNumber: this.referenceNumber,
            buyerPublicProfile,
            sellerPublicProfile,
            orderReceiveType: this.orderReceiveType,
            status: this.status,
            paymentStatus: this.paymentStatus,
            paymentVariant: this.paymentVariant,
            statusHistory: this.statusHistory,
            paymentStatusHistory: this.paymentStatusHistory,
            calculatedTotalCostMajor: this.calculatedTotalCostMajor,
            deliveryCostMajor: this.deliveryCostMajor,
            receiver: this.receiver,
            currency: this.currency,
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.UUID, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.REFERENCE_NUMBER, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.BUYER_USER_ID }),
    __metadata("design:type", Number)
], Order.prototype, "buyerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.OrderColumns.BUYER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], Order.prototype, "buyerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.SELLER_USER_ID }),
    __metadata("design:type", Number)
], Order.prototype, "sellerUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.OrderColumns.SELLER_USER_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", User_1.User)
], Order.prototype, "sellerUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.BUYER_ACCOUNT_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "buyerAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", name: TableColumns_1.OrderColumns.ORDER_ITEMS }),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: TableColumns_1.OrderColumns.RATING_FROM_BUYER, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "ratingFromBuyer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        name: TableColumns_1.OrderColumns.RATING_FROM_SELLER,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "ratingFromSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.ORDER_RECEIVE_TYPE, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "orderReceiveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.STATUS, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.PAYMENT_STATUS, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.PAYMENT_VARIANT, nullable: true, default: OrderPaymentVariant_1.OrderPaymentVariant.WALLET }),
    __metadata("design:type", String)
], Order.prototype, "paymentVariant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.OrderColumns.STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "statusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        name: TableColumns_1.OrderColumns.PAYMENT_STATUS_HISTORY,
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "paymentStatusHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.REVIEW_TEXT, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "buyerReviewText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.PROCUREMENT_INVOICE_UUID, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "procurementInvoiceUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        name: TableColumns_1.OrderColumns.REVIEW_SUBMITTED_AT,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "buyerReviewSubmittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.DISPUTE_TYPE, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "disputeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.DISPUTE_TEXT, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "disputeText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        name: TableColumns_1.OrderColumns.DISPUTE_SUBMITTED_AT,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "disputeTextSubmittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, name: TableColumns_1.OrderColumns.CURRENCY, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: TableColumns_1.OrderColumns.PRODUCT_LEASE_ID,
        nullable: true,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Order.prototype, "productLeaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.BUYER_PAYMENT_TRANSACTION_UUID, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "paymentTransactionUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.OrderColumns.CINDER_BUILD_REVENUE_MAJOR,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Order.prototype, "cinderbuildRevenueMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.OrderColumns.CALCULATED_TOTAL_COST_MAJOR,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Order.prototype, "calculatedTotalCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        name: TableColumns_1.OrderColumns.DELIVERY_COST_MAJOR,
        nullable: true,
        default: 0,
        transformer: new transformers_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryCostMajor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.DELIVERY_LOCATION_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryLocationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryLocation_1.DeliveryLocation, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.OrderColumns.DELIVERY_LOCATION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", DeliveryLocation_1.DeliveryLocation)
], Order.prototype, "deliveryLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.PICKUP_LOCATION_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "pickupLocationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupLocation_1.PickupLocation, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.OrderColumns.PICKUP_LOCATION_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", PickupLocation_1.PickupLocation)
], Order.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.RECEIVER_USER_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "receiverUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.OrderColumns.RECEIVER, nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.TEMPORARY_ORDER_UUID, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "temporaryOrderUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        name: TableColumns_1.OrderColumns.MARKED_AS_PAYMENT_DEFAULT_AT,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "markedAsPaymentDefaultAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: TableColumns_1.OrderColumns.ADMIN_ORDER_TOTAL_OVERRIDE, nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "adminOrderTotalOverride", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.WAREHOUSE_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "warehouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.PRICE_MATRIX_ID, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "priceMatrixId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { primary: true }),
    (0, typeorm_1.JoinColumn)({
        name: TableColumns_1.OrderColumns.PRICE_MATRIX_ID,
        referencedColumnName: TableColumns_1.default.ID,
    }),
    __metadata("design:type", PriceMatrix_1.PriceMatrix)
], Order.prototype, "priceMatrix", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: TableColumns_1.OrderColumns.SELLER_HAS_CHANGE, nullable: true, default: false, }),
    __metadata("design:type", Boolean)
], Order.prototype, "sellerHasChange", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: Tables_1.default.ORDERS }),
    (0, typeorm_1.Index)(["uuid"]),
    (0, typeorm_1.Index)(["buyerUserId"]),
    (0, typeorm_1.Index)(["sellerUserId"]),
    (0, typeorm_1.Index)(["buyerUserId", "status"]),
    (0, typeorm_1.Index)(["sellerUserId", "status"]),
    (0, typeorm_1.Index)(["buyerUserId", "status", "paymentStatus"]),
    (0, typeorm_1.Index)(["buyerAccountId"]),
    (0, typeorm_1.Index)(["buyerAccountId", "procurementInvoiceUuid"])
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map