export enum PaymentTransactionTypes {
  EXTERNAL_TO_FUND_WALLET = "external_to_fund_wallet",
  EXTERNAL_TO_PAY_FOR_ORDER = "external_to_pay_for_order",

  BUYER_WALLET_TO_ESCROW = "buyer_wallet_to_escrow",
  ESCROW_TO_BUYER_WALLET = "escrow_to_buyer_wallet",
  ESCROW_TO_SELLER = "escrow_to_seller",
  ESCROW_TO_CINDERBUILD_REVENUE = "escrow_to_cinderbuild_revenue",
  ESCROW_TO_REFUND_BUYER = "escrow_to_refund_buyer",
  WARE_HOUSE_TO_SITE_DELIVERY_PAYMENT = 'warehouse_to_site_delivery_payment',

  COOPERATE_ACCOUNT_DISCOUNT = 'cooperate_account_discount',

  PROJECT_SUBSCRIPTION_PAYMENT = 'project_subscription_payment',

  WALLET_FUNDS_WITHDRAWAL = "wallet_funds_withdrawal",
  WALLET_FUNDS_WITHDRAWAL_REFUND = "wallet_funds_withdrawal_refund",
  WALLET_FUNDS_TRANSFER = "wallet_funds_transfer",
  WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER = "wallet_to_delivery_fee_wallet_transfer",

  PRODUCT_LEASE_PRINCIPAL_DEBIT = "product_lease_principal_debit",
  PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT = "product_lease_interest_payment_debit",

  C_STORE_DEFAULT_PAYMENT_CHARGES = 'c_store_default_payment_charges',

  PRODUCT_LEASE_PAYMENT = "product_lease_payment",

  ORDER_PAYMENT_DEFAULT_DEBIT = "order_payment_default_debit",
  ORDER_PAYMENT_DEFAULT_DAILY_DEBIT = "order_payment_default_daily_debit",
}

export enum PaymentTransactionStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  FAILED = "failed",
}

export enum FinancialTransactionReferenceType {
  PAYSTACK = "paystack",
}
