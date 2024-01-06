"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionReferenceType = exports.PaymentTransactionStatus = exports.PaymentTransactionTypes = void 0;
var PaymentTransactionTypes;
(function (PaymentTransactionTypes) {
    PaymentTransactionTypes["EXTERNAL_TO_FUND_WALLET"] = "external_to_fund_wallet";
    PaymentTransactionTypes["EXTERNAL_TO_PAY_FOR_ORDER"] = "external_to_pay_for_order";
    PaymentTransactionTypes["BUYER_WALLET_TO_ESCROW"] = "buyer_wallet_to_escrow";
    PaymentTransactionTypes["ESCROW_TO_BUYER_WALLET"] = "escrow_to_buyer_wallet";
    PaymentTransactionTypes["ESCROW_TO_SELLER"] = "escrow_to_seller";
    PaymentTransactionTypes["ESCROW_TO_CINDERBUILD_REVENUE"] = "escrow_to_cinderbuild_revenue";
    PaymentTransactionTypes["ESCROW_TO_REFUND_BUYER"] = "escrow_to_refund_buyer";
    PaymentTransactionTypes["WARE_HOUSE_TO_SITE_DELIVERY_PAYMENT"] = "warehouse_to_site_delivery_payment";
    PaymentTransactionTypes["COOPERATE_ACCOUNT_DISCOUNT"] = "cooperate_account_discount";
    PaymentTransactionTypes["PROJECT_SUBSCRIPTION_PAYMENT"] = "project_subscription_payment";
    PaymentTransactionTypes["WALLET_FUNDS_WITHDRAWAL"] = "wallet_funds_withdrawal";
    PaymentTransactionTypes["WALLET_FUNDS_WITHDRAWAL_REFUND"] = "wallet_funds_withdrawal_refund";
    PaymentTransactionTypes["WALLET_FUNDS_TRANSFER"] = "wallet_funds_transfer";
    PaymentTransactionTypes["WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER"] = "wallet_to_delivery_fee_wallet_transfer";
    PaymentTransactionTypes["PRODUCT_LEASE_PRINCIPAL_DEBIT"] = "product_lease_principal_debit";
    PaymentTransactionTypes["PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT"] = "product_lease_interest_payment_debit";
    PaymentTransactionTypes["C_STORE_DEFAULT_PAYMENT_CHARGES"] = "c_store_default_payment_charges";
    PaymentTransactionTypes["PRODUCT_LEASE_PAYMENT"] = "product_lease_payment";
    PaymentTransactionTypes["ORDER_PAYMENT_DEFAULT_DEBIT"] = "order_payment_default_debit";
    PaymentTransactionTypes["ORDER_PAYMENT_DEFAULT_DAILY_DEBIT"] = "order_payment_default_daily_debit";
})(PaymentTransactionTypes = exports.PaymentTransactionTypes || (exports.PaymentTransactionTypes = {}));
var PaymentTransactionStatus;
(function (PaymentTransactionStatus) {
    PaymentTransactionStatus["UNPAID"] = "unpaid";
    PaymentTransactionStatus["PAID"] = "paid";
    PaymentTransactionStatus["FAILED"] = "failed";
})(PaymentTransactionStatus = exports.PaymentTransactionStatus || (exports.PaymentTransactionStatus = {}));
var FinancialTransactionReferenceType;
(function (FinancialTransactionReferenceType) {
    FinancialTransactionReferenceType["PAYSTACK"] = "paystack";
})(FinancialTransactionReferenceType = exports.FinancialTransactionReferenceType || (exports.FinancialTransactionReferenceType = {}));
//# sourceMappingURL=PaymentTransaction.js.map