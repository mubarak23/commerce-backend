"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoWebhookStatus = exports.InvoiceStatuses = exports.WareHouseToSiteDeliveryFeeStatuses = exports.OrderPaymentVariantDto = exports.OrderPaymentStatusesDto = exports.OrderPaymentStatuses = exports.OrderDeliveryLocationStatuses = exports.PriceMatriceStatuses = exports.QuoteRequestStatuses = exports.EndedOrderStatuses = exports.ActiveOrderStatuses = exports.OrderStatusesDto = exports.OrderStatuses = void 0;
/* eslint-disable no-shadow */
var OrderStatuses;
(function (OrderStatuses) {
    OrderStatuses["CREATED"] = "CREATED";
    OrderStatuses["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatuses["AVAILABLE_FOR_PICKUP"] = "AVAILABLE_FOR_PICKUP";
    OrderStatuses["AVAILABLE_FOR_DELIVERY"] = "AVAILABLE_FOR_DELIVERY";
    OrderStatuses["RECEIVED"] = "RECEIVED";
    OrderStatuses["COMPLETED"] = "COMPLETED";
    OrderStatuses["CONFIRMED"] = "CONFIRMED";
    OrderStatuses["CONFIRMED_BY_SYSTEM"] = "CONFIRMED_BY_SYSTEM";
    OrderStatuses["CANCELLED_BY_BUYER"] = "CANCELLED_BY_BUYER";
    OrderStatuses["CANCELLED_BY_SELLER"] = "CANCELLED_BY_SELLER";
    OrderStatuses["CANCELLED_BY_ADMIN"] = "CANCELLED_BY_ADMIN";
    OrderStatuses["ENDED_WITH_DISPUTES"] = "ENDED_WITH_DISPUTES";
    OrderStatuses["PAYMENT_DEFAULT"] = "PAYMENT_DEFAULT";
})(OrderStatuses = exports.OrderStatuses || (exports.OrderStatuses = {}));
var OrderStatusesDto;
(function (OrderStatusesDto) {
    OrderStatusesDto["ALL"] = "ALL";
    OrderStatusesDto["CREATED"] = "CREATED";
    OrderStatusesDto["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatusesDto["AVAILABLE_FOR_PICKUP"] = "AVAILABLE_FOR_PICKUP";
    OrderStatusesDto["AVAILABLE_FOR_DELIVERY"] = "AVAILABLE_FOR_DELIVERY";
    OrderStatusesDto["RECEIVED"] = "RECEIVED";
    OrderStatusesDto["COMPLETED"] = "COMPLETED";
    OrderStatusesDto["CONFIRMED"] = "CONFIRMED";
    OrderStatusesDto["CONFIRMED_BY_SYSTEM"] = "CONFIRMED_BY_SYSTEM";
    OrderStatusesDto["CANCELLED_BY_BUYER"] = "CANCELLED_BY_BUYER";
    OrderStatusesDto["CANCELLED_BY_SELLER"] = "CANCELLED_BY_SELLER";
    OrderStatusesDto["CANCELLED_BY_ADMIN"] = "CANCELLED_BY_ADMIN";
    OrderStatusesDto["ENDED_WITH_DISPUTES"] = "ENDED_WITH_DISPUTES";
    OrderStatusesDto["PAYMENT_DEFAULT"] = "PAYMENT_DEFAULT";
})(OrderStatusesDto = exports.OrderStatusesDto || (exports.OrderStatusesDto = {}));
exports.ActiveOrderStatuses = [
    OrderStatuses.CREATED,
    OrderStatuses.IN_PROGRESS,
    OrderStatuses.AVAILABLE_FOR_PICKUP,
];
exports.EndedOrderStatuses = [
    OrderStatuses.COMPLETED,
    OrderStatuses.CONFIRMED,
    OrderStatuses.ENDED_WITH_DISPUTES,
    OrderStatuses.CANCELLED_BY_BUYER,
    OrderStatuses.CANCELLED_BY_SELLER,
    OrderStatuses.CANCELLED_BY_ADMIN
];
var QuoteRequestStatuses;
(function (QuoteRequestStatuses) {
    QuoteRequestStatuses["PENDING"] = "PENDING";
    QuoteRequestStatuses["PROCESSED"] = "PROCESSED";
    QuoteRequestStatuses["CANCELLED_BY_BUYER"] = "CANCELLED_BY_BUYER";
    QuoteRequestStatuses["ENDED_BY_BUYER"] = "ENDED_BY_BUYER";
    QuoteRequestStatuses["ORDER_CREATED"] = "ORDER_CREATED";
    QuoteRequestStatuses["DECLINED_BY_SELLER"] = "DECLINED_BY_SELLER";
    QuoteRequestStatuses["DECLINED_BY_ADMIN"] = "DECLINED_BY_ADMIN";
    QuoteRequestStatuses["EXPIRED"] = "EXPIRED";
})(QuoteRequestStatuses = exports.QuoteRequestStatuses || (exports.QuoteRequestStatuses = {}));
var PriceMatriceStatuses;
(function (PriceMatriceStatuses) {
    PriceMatriceStatuses["CREATED"] = "CREATED";
    PriceMatriceStatuses["PRICE_SUBMITTED"] = "PRICE_SUBMITTED";
    PriceMatriceStatuses["APPROVED"] = "APPROVED";
    PriceMatriceStatuses["DELIVERED"] = "DELIVERED";
    PriceMatriceStatuses["CONFIRMED_DELIVERY"] = "CONFIRMED_DELIVERY";
    PriceMatriceStatuses["SELLER_PAID"] = "SELLER_PAID";
    PriceMatriceStatuses["DECLINED"] = "DECLINED";
    PriceMatriceStatuses["DECLINED_BY_ADMIN"] = "DECLINED_BY_ADMIN";
})(PriceMatriceStatuses = exports.PriceMatriceStatuses || (exports.PriceMatriceStatuses = {}));
var OrderDeliveryLocationStatuses;
(function (OrderDeliveryLocationStatuses) {
    OrderDeliveryLocationStatuses["PENDING"] = "PENDING";
    OrderDeliveryLocationStatuses["LOADING"] = "LOADING";
    OrderDeliveryLocationStatuses["IN_TRANSIT"] = "IN_TRANSIT";
    OrderDeliveryLocationStatuses["ON_SITE"] = "ON_SITE";
    OrderDeliveryLocationStatuses["DISCHARGE_REQUESTED"] = "DISCHARGE_REQUESTED";
    OrderDeliveryLocationStatuses["DISCHARGE_REQUEST_CONFIRMED"] = "DISCHARGE_REQUEST_CONFIRMED";
    OrderDeliveryLocationStatuses["DELIVERY_CONFIRMATION_REQUESTED"] = "DELIVERY_CONFIRMATION_REQUESTED";
    OrderDeliveryLocationStatuses["DELIVERY_CONFIRMED"] = "DELIVERY_CONFIRMED";
    OrderDeliveryLocationStatuses["DELIVERY_DISPUTE"] = "DELIVERY_DISPUTE";
})(OrderDeliveryLocationStatuses = exports.OrderDeliveryLocationStatuses || (exports.OrderDeliveryLocationStatuses = {}));
var OrderPaymentStatuses;
(function (OrderPaymentStatuses) {
    OrderPaymentStatuses["BUYER_PAYMENT_PENDING"] = "BUYER_PAYMENT_PENDING";
    OrderPaymentStatuses["BUYER_PAYMENT_IN_ESCROW"] = "BUYER_PAYMENT_IN_ESCROW";
    OrderPaymentStatuses["BUYER_PAYMENT_REFUND"] = "BUYER_PAYMENT_REFUND";
    OrderPaymentStatuses["ESCROW_FUNDS_MOVED_TO_SELLER"] = "ESCROW_FUNDS_MOVED_TO_SELLER";
    OrderPaymentStatuses["CANCELLED_BY_ADMIN"] = "CANCELLED_BY_ADMIN";
})(OrderPaymentStatuses = exports.OrderPaymentStatuses || (exports.OrderPaymentStatuses = {}));
var OrderPaymentStatusesDto;
(function (OrderPaymentStatusesDto) {
    OrderPaymentStatusesDto["ALL"] = "ALL";
    OrderPaymentStatusesDto["BUYER_PAYMENT_PENDING"] = "BUYER_PAYMENT_PENDING";
    OrderPaymentStatusesDto["BUYER_PAYMENT_IN_ESCROW"] = "BUYER_PAYMENT_IN_ESCROW";
    OrderPaymentStatusesDto["BUYER_PAYMENT_REFUND"] = "BUYER_PAYMENT_REFUND";
    OrderPaymentStatusesDto["ESCROW_FUNDS_MOVED_TO_SELLER"] = "ESCROW_FUNDS_MOVED_TO_SELLER";
})(OrderPaymentStatusesDto = exports.OrderPaymentStatusesDto || (exports.OrderPaymentStatusesDto = {}));
var OrderPaymentVariantDto;
(function (OrderPaymentVariantDto) {
    OrderPaymentVariantDto["ALL"] = "ALL";
    OrderPaymentVariantDto["WALLET"] = "WALLET";
    OrderPaymentVariantDto["CARD"] = "CARD";
    OrderPaymentVariantDto["PAY_ON_DELIVERY"] = "PAY_ON_DELIVERY";
})(OrderPaymentVariantDto = exports.OrderPaymentVariantDto || (exports.OrderPaymentVariantDto = {}));
var WareHouseToSiteDeliveryFeeStatuses;
(function (WareHouseToSiteDeliveryFeeStatuses) {
    WareHouseToSiteDeliveryFeeStatuses["REQUESTED"] = "REQUESTED";
    WareHouseToSiteDeliveryFeeStatuses["DELIVERY_FEE_SET"] = "DELIVERY_FEE_SET";
    WareHouseToSiteDeliveryFeeStatuses["DELIVERY_FEE_ACCEPTED"] = "DELIVERY_FEE_ACCEPTED";
    WareHouseToSiteDeliveryFeeStatuses["DELIVERY_FEE_REJECTED"] = "DELIVERY_FEE_REJECTED";
    WareHouseToSiteDeliveryFeeStatuses["DELIVERY_ITEMS_SHIPPED"] = "DELIVERY_ITEMS_SHIPPED";
})(WareHouseToSiteDeliveryFeeStatuses = exports.WareHouseToSiteDeliveryFeeStatuses || (exports.WareHouseToSiteDeliveryFeeStatuses = {}));
var InvoiceStatuses;
(function (InvoiceStatuses) {
    InvoiceStatuses["SET"] = "SET";
    InvoiceStatuses["ACCEPTED"] = "ACCEPTED";
    InvoiceStatuses["REQUEST_REVIEW"] = "REQUEST_REVIEW";
    InvoiceStatuses["REJECTED"] = "REJECTED";
})(InvoiceStatuses = exports.InvoiceStatuses || (exports.InvoiceStatuses = {}));
var MonoWebhookStatus;
(function (MonoWebhookStatus) {
    MonoWebhookStatus["SUCCESSFULL"] = "successful";
    MonoWebhookStatus["FAILED"] = "failed";
})(MonoWebhookStatus = exports.MonoWebhookStatus || (exports.MonoWebhookStatus = {}));
exports.default = OrderStatuses;
//# sourceMappingURL=Statuses.js.map