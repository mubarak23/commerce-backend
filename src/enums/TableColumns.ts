/* eslint-disable no-shadow */
export enum TemporaryUserColumns {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  EMAIL_ADDRESS = "email_address",
  PHONE_NUMBER = "phone_number",
  MSISDN = "msisdn",
  PASSWORD_HASH = "password_hash",
  COUNTRY_ISO2 = "country_iso2",
  IS_SELLER = "is_Seller",
  IS_COOPERATE = "is_cooperate",
  COOPERATE_EMAIL = "cooperate_email",
  BUSINESS_NAME = "business_name",
  WARE_HOUSE_LOCATION = "wareHouse_location",
  ROLE = 'role',
  DEFAULT_SELLER_UNIQUE_CODE = "default_seller_unique_code",
  COMPANY_NAME = 'company_name',
  CAC_NUMBER = 'cac_Number',
  ADDRESS = 'address'
}
// export enum CategoryColumns {
//   NAME = 'name',
//   UNIT_OF_MEASURE = 'unit_of_measure'
// }

export enum PhoneNumberVerificationColumns {
  PHONE_NUMBER = "phone_number",
  MSISDN = "MSISDN",
  VERIFICATION_CODE = "verification_code",
  SMS_SENT_SUCCESSFULLY = "sms_sent_successfully",
  IS_VERIFIED = "is_verified",
  VERIFIED_AT = "verified_at",
}

export enum AccountColumns {
  UUID = "uuid",
  PRIMARY_USER_ID = 'primary_user_id',
  TYPE = 'type'
}

export enum MortageUserColumns {
  UUID = "uuid",
  USER_ID = 'user_id',
  ACCOUNT_ID = 'account_id',
  TYPE = 'type',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum ProjectColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  ACCOUNT_ID = "account_id",
  TYPE = "type",
  NAME = "name",
  IMAGES = "images",
  DETAILS = "details",
  STAGES = "stages",
  CURRENT_STAGE = "current_stage",
  NUMBER_OF_SLOTS = "number_of_slots",
  START_DATE = "start_date",
  INITIAL_INVESTMENT_PERCENTAGE = "initial_investment_percentage",
  PAYMENT_PLAN = "payment_plan",
  DURATION = "duration",
  COST_PER_SLOT = "cost_per_slot",
  MINIMUM_NUMBER_OF_SLOT = "minimum_number_of_slot",
  LOCATION_ON_MAP = "location_on_map",
  ADDRESS = "address",
  STATE = "state",
  COUNTRY = "country",
  STATUS = "STATUS",
  IS_SOFT_DELETED = "is_soft_deleted"
}

export enum ProjectSubscriptionColumns {
  UUID = 'uuid',
  INVESTOR_USER_ID = 'investor_user_id',
  DEVELOPER_USER_ID = 'developer_user_id',
  PROJECT_ID = 'project_id',
  NUMBER_OF_SLOTS = 'number_of_slots',
  TOTAL_AMOUNT_MINOR = 'total_amount_minor',
  AMOUNT_PER_PAYMENT_PLAN__DURATION_MINOR = 'amount_per_payment_duration_minor',
  DURATION_PER_PAYMENT_PLAN = 'duration_per_payment_plan',  
  DURATION = 'duration',
  INITIAL_AMOUNT_MINOR = 'initial_amount_minor',
  AMOUNT_REMAINING_MINOR = 'amount_remaining_minor',
  AMOUNT_PAID_MINOR = 'amount_paid_minor',
  DURATION_COVERED = 'duration_covered',
  DURATION_LEFT = 'duration_left',
  SUBSCRIPTON_PAYMENT_HISTORY = 'subscription_payment_history',
  SUBSCRIPTION_DATE = 'susbscription_date',
  STATUS = 'STATUS',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum ProjectSubscriptionTransactionsColumns {
  UUID = 'uuid',
  INVESTOR_USER_ID = 'investor_user_id',
  DEVELOPER_USER_ID = 'developer_user_id',
  PROJECT_ID = 'project_id',
  PROJECT_SUBSCRIPTION_ID = 'project_susbscription_id',
  FINANCIAL_TRANSACTION_ID = 'financial_transaction_id',
  AMOUNT_BEFORE_MINOR = 'amount_before_minor',
  AMOUNT_PAID_MINOR = 'amount_paid_minor',
  AMOUNT_AFTER_MINOR = 'amount_after_minor',
  AMOUNT_REMAINING_MINOR = 'amount_remaining_minor',
  DESCRIPTION = 'description',
  IS_PAID = 'is_paid',
  PAID_STATUS = 'paid_status',
  PAYMENT_PLAN_DURATION_NUMBER  = 'payment_plan_duration_number',
  NEXT_PAYMENT_DATE = 'next_payment_date',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum MortgageCardColumns{
  UUID = 'uuid',
  PAN = 'pan',
  USER_ID = 'user_id',
  IS_ACTIVE = 'is_active',
  IS_USED = 'is_used',
  IS_SOFT_DELETED = 'is_soft_deleted'
}  

export enum MonoDirectPaySubscriptionsColumns {
  UUID = 'uuid',
  INVESTOR_USER_ID = 'investor_user_id',
  DEVELOPER_USER_ID = 'developer_user_id',
  PROJECT_SUBSCRIPTION_TRANSACTION_UUID = 'project_susbscription_transaction_uuid',
  PROJECT_SUBSCRIPTION_TRANSACTION_ID = 'project_susbscription_transaction_id',
  REFERENCE = 'reference',
  REQUEST_PAYLOAD = 'request_payload',
  RESPONSE_DATA = 'response_data',
  PAYMENT_LINK = 'payment_link',
  WEB_HOOK_EVENT = 'web_hook_event',
  STATUS = 'status',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum MonoDirectPayWebHooksColumns {
  UUID = 'uuid',
  REFERENCE = 'reference',
  RESPONSE_DATA = 'response_data',
  WEB_HOOK_EVENT = 'web_hook_event',
  STATUS = 'status',
  IS_USED = 'is_used',
  IS_SOFT_DELETED = 'is_soft_deleted'
}


export enum WareHouseColumns {
  UUID = 'uuid',
  ACCOUNT_ID = 'account_id',
  CREATEDBY_USER_ID = 'created_by_user_id',
  NAME = 'name',
  STATE = 'state',
  COUNTRY = 'country',
  IS_DEFAULT = 'is_default',
  TOTAL_VALUE_MAJOR = 'total_value_major',
  TOTAL_QUANTITY = 'total_quantity',
  CONTACT_FULL_NAME = 'contact_full_name',
  CONTACT_PHONE_NUMBER = 'phone_number',
  IS_SOFT_DELETED = 'is_soft_deleted'
}


export enum WareHouseProductPurchaseColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  WARE_HOUSE_ID = 'ware_house_id',
  PRODUCT_ID = 'product_id',
  AVAILABLE_QUANTITY = 'available_quantity',
  INFLOW_QUANTITY = 'inflow_quantity',
  OUTFLOW_QUANTITY = 'outflow_quantity',
}

export enum WareHouseProductReorderLevelColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  WARE_HOUSE_ID = 'ware_house_id',
  PRODUCT_ID = 'product_id',
  LEVEL = 'level',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum WareHouseProductOrderHistoryColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  PRODUCT_PURCHASE_ID = 'product_purchase_id',
  PRODUCT_ID = 'product_id',
  ORDER_ID = 'order_id'
}


export enum WareHouseToSiteDeliveriesProductColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  WARE_HOUSE_ID = 'ware_house_id',
  DELIVERY_LOCATION_ID = 'delivery_location_id',
  DELIVERY_ITEMS = 'delivery_items',
  TOTAL_AMOUNT_MAJOR = 'total_amount_major',
  DELIVERY_FEE_AMOUNT_MAJOR = 'delivery_fee_amount_major',
  DELIVERY_FEE_STATUS = 'delivery_fee_status',
  DELIVERY_FEE_STATUS_HISTORY = 'DELIVERY_FEE_STATUS_HISTORY',
  PAYMENT_TRANSACTION_UUID =  'payment_transaction_uuid'
}

export enum RequestBankDetailsChangeColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  BANK_NAME = "bank_name",
  BANK_ACCOUNT_NAME = "bank_account_name",
  ACCOUNT_NUMBER = "account_number",
  BANK_CODE = "bank_code",
  IS_PROCESSED = "is_processed"
}

export enum ProcurementColumns {
  UUID = 'uuid',
  ACCOUNT_ID = 'account_id',
  UPLOAD = 'upload',
  IS_PROCESSED = 'is_proccessed',
  PROCESSED_AT = 'proccessed_at',
  IS_SOFT_DELETED = 'is_soft_deleted'
}

export enum ProcurementInvoiceColumns {
  UUID = 'uuid',
  ACCOUNT_ID = 'account_id',
  PROCUREMENT_ID = 'procurement_id',
  REFERENCE_NUMBER = 'reference_number',
  INVOICE_ITEMS = 'invoice_items',
  CALCULATED_TOTAL_COST_MAJOR = 'calculated_total_cost_major',
  CALCULATED_TOTAL_AMOUNT_PAID_MAJOR = 'calculated_total_amount_paid_major',
  
  STATUS = 'status',
  STATUS_HISTORY = 'status_history',

  ORDER_CREATED = 'order_created',
  ORDER_CREATE_AT = 'order_created_at',
  
  IS_SOFT_DELETED = 'is_soft_deleted'
}


export enum DeliveryFeeWalletColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',
  ACCOUNT_ID = 'account_id',
  WALLET_BALANCE_MINOR = 'wallet_balance_minor',
  CURRENCY = 'currency',
  TYPE = 'type'
}

export enum FindUsColumns {
  UUID = "uuid",
  NAME = "name",
  IS_AVAILABLE = "is_available",
  COUNTS = "counts",
}

export enum SmsSendLogColumns {
  RECIPIENT_MSISDN = "recipient_msisdn",
  SMS_PROVIDER = "sms_provider",
  REQUEST_JSON = "request_json",
  RESPONSE_JSON = "response_json",
  HTTP_REQUEST_ERROR_MESSAGE = "http_request_error_message",
  SENT_SUCCESSFULLY = "sent_successfully",
}

export enum BrandColumns {
  NAME = "name",
  CATEGORIES = "categories",
  UUID = "uuid",
  IMAGE = "image",
  IS_AVAILABLE = "is_available",
  PRODUCTS_COUNT = "products_count",
  IS_SOFT_DELETED = "is_soft_deleted"
}

export enum AvailableLocationStatesColumns {
  STATE = "state",
  COUNTRY = "country",
  COUNTRY_ISO2_CODE = "country_iso2_code",
  PRODUCTS_COUNT = "products_count",
}

// COUPONS
export enum CouponsColumns {
  USER_ID = "user_id",
  CODE = "code",
  DESCRIPTION = "description",
  EXPIRY_DATE = "expiry_date",

  VALUE_TYPE = "value_type",
  APPLY_TYPE = "apply_type",

  VALUE = "coupon_value",
  IS_ACTIVE = "is_active",
  PRODUCT_ID = "product_id",
  ORDER_MINIMUM_AMOUNT_MAJOR = "order_minimm_amount_major"
}

export enum ProductsColumns {
  USER_ID = "user_id",
  PARENT_PRODUCT_ID = 'parent_product_id',
  CATEGORY_ID = "category_id",
  CATEGORY_UUID = "category_uuid",
  BRAND_ID = "brand_id",
  BRAND_UUID = "brand_uuid",

  NAME = "name",
  PRICE = "price",
  CURRENCY = "currency",
  LOCATION_STATE = "location_state",
  LOCAL_GOVERNMENT_AREA_PRICES = "local_government_area_prices",
  DESCRIPTION = "description",
  MAX_QTY = "max_qty",
  MIN_QTY = "min_qty",
  IMAGES = "images",
  UUID = "uuid",
  HAS_VARIANTS = "has_variants",
  IS_VARIANT = "is_variant",
  IS_ACTIVE = "is_active",
  IS_SOFT_DELETED = "is_soft_deleted",
  TOTAL_RATINGS_VALUE = "TOTAL_RATINGS_VALUE",
  TOTAL_NUMBER_OF_RATINGS = "TOTAL_NUMBER_OF_RATINGS",
  TAGS = "tags",
  PICKUP_LOCATION_ID = "pickup_location_id",
  OLD_SELLER_ID = "old_seller_id",
}

// PROMOTIONS
export enum PromotionColumns {
  UUID = "uuid",
  NAME = "name",
  PERCENTAGE = "percentage",
  CATEGORY_ID = "category_id",
  IS_ACTIVE = "is_active",
  END_DATE = "end_date",
}

export enum BusinessesColumns {
  USER_ID = "user_id",
  NAME = "name",
  ADDRESS = "address",
  CAC_NUMBER = "cac_number",
}

export enum EmailVerificationColumns {
  USER_ID = "user_id",
  EMAIL_ADDRESS = "email_address",
}

export enum AccountWalletColumns {
  USER_ID = "user_id",
  BALANCE = "balance",
}

export enum BankAccountColumns {
  USER_ID = "user_id",
  BANK_NAME = "bank_name",
  ACCOUNT_NAME = "account_name",
  ACCOUNT_NUMBER = "account_number",
}

export enum CartColumns {
  USER_ID = "user_id",
  CART_ITEMS = "cart_items",
}

export enum OrderColumns {
  USER_ID = "user_id",
  SELLER_USER_ID = "seller_user_id",
  BUYER_ACCOUNT_ID = "buyer_account_id",
  REFERENCE_NUMBER = "reference_number",
  UUID = "uuid",
  BUYER_USER_ID = "buyer_user_id",
  RATING_FROM_BUYER = "rating_from_buyer",
  RATING_FROM_SELLER = "rating_from_seller",
  ORDER_RECEIVE_TYPE = "order_receive_type",

  WAREHOUSE_ID = "warehouse_id",
  PRICE_MATRIX_ID = "price_matrix_id",
  SELLER_HAS_CHANGE = "seller_has_change",
  ORDER_ITEMS = "order_items",

  STATUS = "status",
  PAYMENT_STATUS = "payment_status",
  PAYMENT_VARIANT = 'payment_variant',
  STATUS_HISTORY = "status_history",
  PAYMENT_STATUS_HISTORY = "payment_status_history",

  REVIEW_TEXT = "review_text",
  REVIEW_SUBMITTED_AT = "review_submitted_at",
  DISPUTE_TYPE = "diispute_type",
  DISPUTE_TEXT = "dispute_text",
  DISPUTE_SUBMITTED_AT = "dispute_submitted_at",

  PRODUCT_LEASE_ID = "product_lease_id",
  BUYER_PAYMENT_TRANSACTION_UUID = "buyer_payment_transaction_uuid",
  PROCUREMENT_INVOICE_UUID = 'procurement_invoice_uuid',

  CURRENCY = "currency",

  CALCULATED_TOTAL_COST_MAJOR = "calculated_total_cost_major",
  CINDER_BUILD_REVENUE_MAJOR = "cinderbuild_revenue_major",
  DELIVERY_COST_MAJOR = "delivery_cost_major",
  
  DELIVERY_LOCATION_ID = "delivery_location_id",
  DELIVERY_DETAILS = "delivery_details",
  PICKUP_LOCATION_ID = "pickup_location_id",
  RECEIVER_USER_ID = "receiver_user_id",
  RECEIVER = "receiver",

  TEMPORARY_ORDER_UUID = "temporary_order_uuid",

  MARKED_AS_PAYMENT_DEFAULT_AT = "marked_as_payment_default_at",
  ADMIN_ORDER_TOTAL_OVERRIDE = "admin_order_total_override",
}


export enum TemporaryOrderColumns {
  BUYER_DETAILS = "buyer_details",
  SELLER_USER_ID = "seller_user_id",
  UUID = "uuid",
  ORDER_RECEIVE_TYPE = "order_receive_type",

  ORDER_ITEMS = "order_items",

  STATUS = "status",
  PAYMENT_STATUS = "payment_status",
  STATUS_HISTORY = "status_history",
  PAYMENT_STATUS_HISTORY = "payment_status_history",

  BUYER_PAYMENT_TRANSACTION_UUID = "buyer_payment_transaction_uuid",

  CURRENCY = "currency",

  CALCULATED_TOTAL_COST_MAJOR = "calculated_total_cost_major",
  DELIVERY_COST_MAJOR = "delivery_cost_major",
  
  DELIVERY_DETAILS = "delivery_details",
  PICKUP_LOCATION_ID = "pickup_location_id",
}

export enum SavedProductColumns {
  USER_ID = "user_id",
  PRODUCT_ID = "product_id",
}

export enum QuoteRequestColumns {
  UUID = "uuid",
  REFERENCE_NUMBER = "reference_number",
  USER_ID = "user_id",
  USER_UUID = "user_uuid",
  SELLER_USER_ID = "seller_user_id",
  SELLER_USER_UUID = "seller_user_uuid",

  PRODUCT_ID = "product_id",
  QUANTITY = "quantity",
  ORDER_RECEIVE_TYPE = "order_receive_type",
  DELIVERY_ADDRESS = "delivery_address",
  NOTES = "notes",

  HAS_SELLER_RESPONSE = "has_seller_response",
  SELLER_RESPONSE = "seller_response",
  CALCULATED_TOTAL_COST_MAJOR = "calculated_total_cost_major",
  SELLER_RESPONSE_SUBMITTED_AT = "seller_response_submitted_at",
  SELLER_PICKUP_LOCATION_UUID = "seller_pickup_location_uuid",
  DELIVERY_ADDRESS_UUID = "delivery_address_uuid",
  WAREHOUSE_UUID = "warehouse_uuid",
  STATUS = "STATUS",
  STATUS_HISTORY = "STATUS_HISTORY",
}

export enum ProductReviewColumns {
  UUID = "uuid",
  PRODUCT_ID = "product_id",
  USER_ID = "user_id",
  USER_UUID = "user_uuid",
  REVIEW_NOTE = "review_note",
  RATING = "rating",
}

export enum UserColumns {
  UUID = "user_uuid",

  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  USERNAME = "username",
  EMAIL_ADDRESS = "email_address",
  PHONE_NUMBER = "phone_number",
  MSISDN = "msisdn",
  PASSWORD_HASH = "password_hash",
  COUNTRY_LONG_NAME = "country_long_name",
  COUNTRY_ISO2 = "country_iso2",

  PHOTO = "photo",
  IS_SELLER = "is_Seller",
  IS_COOPERATE = "is_cooperate",
  ACCOUNT_ID = "account_id",
  WAREHOUSE_ID = "warehouse_id",

  TOTAL_RATINGS_VALUE = "total_ratings_value",
  TOTAL_NUMBER_OF_RATINGS = "total_number_of_ratings",

  SETTINGS = "settings",
  BANK_INFO = "bank_info",
  SELLER_DOCS = "SELLER_DOCS",
  DEFAULT_SELLER_USER_ID = "default_seller_user_id",
  UNIQUE_CODE = "unique_code",
  ROLE = 'role',
  STORE_FRONT_BANNER = 'store_front_banner',
  CREATED_FROM_TEMPORARY_ORDER = "created_from_temporary_order",
  COMPANY_NAME = 'company_name',
  IS_ADMIN = 'is_admin',
  IS_DEVELOPER = 'is_developer',
  IS_INVESTOR = 'is_investor',
  ADMIN_CAN_VIEW = 'admin_can_view',
  ADMIN_CAN_EDIT = 'admin_can_edit'
}

export enum UserAccessTokenColumns {
  USER_ID = "user_id",
  TOKEN = "token",
  REFRESH_TOKEN = "refreshToken",
  IS_ACTIVE = "is_active",
}

export enum EmailValidationColumns {
  EMAIL_ADDRESS = "email_address",
  UUID = "user_uuid",

  UNIQUE_TOKEN = "unique_token",
  IS_VERIFIED = "is_verified",
  VERIFIED_AT = "verified_at",
}

export enum AuditLogsColumns {
  USER_ID = "user_id",
  METHOD = "method",
  PATH = "path",
  PAYLOAD = "payload"
}

export enum PriceMatrixColumns {
  UUID = "price_matrix_uuid",
  BUYER_USER_ID = "buyer_user_id",
  SELLER_USER_ID = "seller_user_id",
  ORDER_ID = "oder_id",
  ORDER_REF = "order_ref",
  QUOTE_REQUEST_ID = "qoute_request_id",
  QUOTE_REQUEST_REF = "qoute_request_ref",
  PRODUCT_ID = "product_id",
  QUANTITY = "quantity",
  TRANSACTION_TYPE = "transaction_type",
  DELIVERY_DATE = "delivery_date",
  DELIVERY_ADDRESS = "delivery_address",
  PRODUCT_COST_PRICE = "product_cost_price",
  PRODUCT_SELLING_PRICE = "product_selling_price",
  PRODUCT_MARGIN = "product_margin",
  TOTAL_MARGIN = "margin",
  TOTAL_PRODUCT_SELLING_PRICE = "total_product_selling_price",
  TOTAL_PRODUCT_COST_PRICE = "total_product_cost_price",
  DELIVERY_FEE_MAJOR = "delivery_fee_major",
  STATUS = 'status',
  STATUS_HISTORY = 'status_history',
}

export enum MortgageAccountVerificationColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  ACCOUNT_TYPE = "account_type",
  BANK_STATEMENT = "bank_statement",
  CAC_CERTIFICATE = "cac_certificate",
  CAC_CERTIFICATE_APPROVED = "cac_certificate_approved",
  GOVERNMENT_APPROVED_ID = "government_approved_id",
  RECENT_UTILITY_BILL = "recent_utility_bill",
  BANK_STATEMENT_APPROVED = "bank_statement_approved",
  GOVERNMENT_APPROVED_ID_APPROVED = "government_approved_id_approved",
  RECENT_UTILITY_BILL_APPROVED = "recent_utility_bill_approved",
  IS_APPROVED = "is_approved",
  ACCOUNT_CONFIRMED = "account_confirmed",
  IS_SOFT_DELETED = "is_soft_deleted"
}

export enum CronRunColumns {
  UUID = "cron_run_uuid",
  NAME = "name",
  IS_RUNNING = "is_running",
  LAST_RUN_START = "last_run_start",
  LAST_RUN_END = "last_run_end",
}

export enum CategoryColumns {
  UUID = "category_uuid",
  NAME = "name",
  BRANDS = "brands",
  UNIT_OF_MEASUREMENT = "unit_of_measurement",
  IMAGE = "image",
  BANNER = "banner",
  DESCRIPTION = "description",
  SETTINGS_DATA = "settings_data",
  IS_AVAILABLE = "is_available",
  PRODUCTS_COUNT = "products_count",
  IS_SOFT_DELETED = "is_soft_deleted"
}

export enum ConfigPropertyColumns {
  NAME = "name",
  VALUE = "value",
  DESCRIPTION = "description",
}

export enum PushNotificationTokenColumns {
  USER_ID = "user_id",
  DEVICE_TYPE = "device_type",
  TOKEN = "token",
}

export enum SupportedCountryColumns {
  NAME = "name",
  ISO2 = "iso2",
  PHONE_CODE = "phone_code",
  CURRENCY = "currency",
  CURRENCY_SYMBOL = "currency_symbol",
  IMAGE = "image"
}

export enum WalletColumns {
  USER_ID = "user_id",
  WALLET_BALANCE_MINOR = "wallet_balance_minor",
  CURRENCY = "currency",
  TYPE = "type",
  ACCOUNT_ID = "account_id",
}

export enum OrderDayCountsColumns {
  USER_ID = "user_id",
  DAY = "day_iso_8601",
  COUNT = "count",
}

export enum EarningsByMonthColumns {
  USER_ID = "user_id",
  MONTH = "month_iso_8601",
  TOTAL_EARNINGS_MINOR = "total_earnings_minor",
}

export enum EarningsByYearColumns {
  USER_ID = "user_id",
  YEAR = "year",
  TOTAL_EARNINGS_MINOR = "total_earnings_minor",
}

export enum SellerAccountStatColumns {
  USER_ID = 'user_id',

  TOTAL_ORDERS_COUNT = "total_orders_count",
  TOTAL_PENDING_ORDERS_COUNT = "total_pending_orders_count",
  TOTAL_PENDING_REQUESTS = "total_pending_requests",
}

export enum FinancialTransactionColumns {
  UUID = "transaction_uuid",
  USER_ID = "user_id",
  WALLET_ID = "wallet_id",

  REFERENCE = "reference",
  REFERENCE_TYPE = "reference_type",
  TRANSACTION_TYPE = "transaction_type",
  AMOUNT_MINOR = "amount_minor",
  PAID_STATUS = "paid_status",

  WALLET_BALANCE_MINOR_BEFORE = "wallet_balance_minor_before",
  WALLET_BALANCE_MINOR_AFTER = "wallet_balance_minor_after",

  PAID_AT = "paid_at",
  METADATA = "metadata",
  CURRENCY = "currency",
  DESCRIPTION = "description",
}

export enum NotificationMessageColumns {
  UUID = "notification_message_uuid",
  USER_ID = "user_id",
  TYPE = "type",
  METADATA = "metadata",
  TITLE = "title",
  MESSAGE = "message",
  IS_READ = "is_read",
  READ_AT = "read_at",
}

export enum ProductLeaseColumns {
  USER_ID = "user_id",
  UUID = "uuid",
  CURRENCY = "currency",
  PRINCIPAL_AMOUNT_MINOR = "principal_amount_minor",
  INTEREST_RATE_PERCENTAGE = "interest_rate_percentage",
  NEXT_LEASE_PAYMENT_DUE_DATE = "next_lease_payment_due_date",
  PAID_AT = 'paid_at',
  UPLOADS = "uploads",
  IS_SOFT_DELETED = "is_soft_deleted",
  IS_PAID = "is_paid",
  IS_ACTIVE = "is_active",
  IS_DELAYED = 'is_delayed',

  IS_MULTI_STAGE_INTEREST_CHARGE = 'multi_stage_interest_charge',
  INTEREST_CHARGE_CURENT_STAGE = 'interest_charge_current_stage',
  NEXT_INTEREST_RATE_PERCENTAGE = 'next_interest_rate_percentage',
  NEXT_INTEREST_CHARGE_DATE = 'next_interest_charge_date',
}

export enum ProductLeaseRequestColumns {
  UUID = "uuid",
  USER_ID = "user_id",

  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  PHONE_NUMBER = "phone_number",
  EMAIL_ADDRESS = "email_address",
  STATE_RESIDENCE = "state_residence",
  BVN = "bvn",
  ID_CARD_NUMBER = "id_card_number",
  BUSINESS_TYPE = "business_type",
  CAC_NUMBER = "cac_number",
  COMPANY_NAME = "company_name",
  COMPANY_ADDRESS = "company_address",
  JOB_TITLE = "job_title",
  MODE_OF_DELIVERY = "mode_of_delivery",
  PRODUCT_CATEGORY = "product_category",
  PRODUCT_NAME = "product_name",
  PRODUCT_QUANTITY = "product_quantity",
  PRINCIPAL_AMOUNT_MAJOR = "principal_amount_major",
  CURRENCY = "currency",

  UPLOADS = "uploads"
}

export enum PaystackWebhooksColumns {
  UUID = 'webhook_uuid',
  TRANSACTION_UUID = 'transaction_uuid',
  PAYSTACK_PAYLOAD = 'paystack_payload',
  IS_PROCESSED = 'is_processed'
}

export enum PaystackDedicatedNubanColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  DEDICATED_NUBAN_PAYLOAD = "dedicated_nuban_payload",

  BANK_ID = "",
  BANK_NAME = "",
  BANK_ACCOUNT_NUMBER = "",
  BANK_ACCOUNT_NAME = "",

  PAYSTACK_CUSTOMER_ID = "",
  PAYSTACK_INTEGRATION = "",
}

export enum PaystackTransferRecipientColumns {
  UUID = "uuid",
  ACCOUNT_NUMBER = "account_number",
  BANK_CODE = "bank_code",
  RECIPIENT_CODE = "recipient_code",
  CURRENCY = "currency",
}

export enum PickupLocationColumns {
  UUID = 'uuid',
  USER_ID = 'user_id',

  NAME = 'name',
  ADDRESS = 'address',

  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
  
  CONTACT_FULL_NAME = 'contact_full_name',
  CONTACT_PHONE_NUMBER = 'contact_phone_number',
  
  IS_SOFT_DELETED = 'is_soft_deleted',
}

export enum DeliveryLocationColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  WARE_HOUSE_ID = 'ware_house_id',

  ADDRESS = "address",
  NAME = "name",

  COUNTRY = "country",
  STATE = "state",
  CITY = "city",

  CONTACT_FULL_NAME = "contact_full_name",
  CONTACT_PHONE_NUMBER = "contact_phone_number",
  IS_DEFAULT = "is_default",

  IS_SOFT_DELETED = "is_soft_deleted",
}

export enum AccessRequestColumns {
  UUID = "uuid",
  ISSELLER = "is_seller",
  BUSINESS_NAME = "business_name",
  BUSINESS_LOCATION_COUNTRY = "business_location_country",
  BUSINESS_LOCATION_STATE = "business_location_state",
  APPLICANT_NAME = "applicant_name",
  APPLICANT_ROLE = "applicant_role",
  APPLICANT_EMAIL = "applicant_email",
  APPLICANT_PHONE = "applicant_phone",
  WEEKLY_TURN_OVER = "weekly_turn_over",
  ENQUIRIES = "enquiries",
}


export enum WalletToWalletTransferColumns {
  ADMIN_USER_ID = "admin_user_id",
  SENDER_USER_ID = "sender_user_id",
  RECEIVER_USER_ID = "receiver_user_id",
  AMOUNT_MAJOR = 'amount_major',
  CURRENCY = "currency",
  DESCRIPTION = 'description'
}

export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
