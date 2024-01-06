enum Tables {
  TEMPORARY_USERS = "temporary_users",
  USERS = "users",
  CATEGORIES = "categories",
  PHONE_VERIFICATION = "phone_verification",
  CATEGORY_ITEMS = "category_items",
  PRODUCTS = "products",
  BRANDS = "brands",
  REQUEST_BANK_DETAILS_CHANGE = 'request_bank_details_change',
  AUDIT_LOGS = "audit_logs",

  ACCOUNTS = "accounts",
  WARE_HOUSES = "warehouses",
  WARE_HOUSE_PRODUCT_PURCHASES = 'warehouse_product_purchases',
  WARE_HOUSE_TO_SITE_DELIVERY_REQUESTS = 'warehouse_to_site_delivery_requests',
  WARE_HOUSE_PRODUCT_ORDER_HISTORY = 'warehouse_product_order_histories',
  WARE_HOUSE_PRODUCT_REORDER_LEVEL = 'warehouse_product_reorder_level',
  PROCUREMENTS = 'procurements',
  PROCUREMENT_INVOICES = 'procurement_invoices',

  MORTAGE_USERS = "mortage_users",
  PROJECTS = "projects",
  MORTGAGE_CARD = "mortgage_cards",
  PROJECT_SUBSCRIPTIONS = "project_subscriptions",
  PROJECT_SUBSCRIPTION_TRANSACTIONS = "project_susbscription_transactions",
  MORTGAGE_ACCOUNT_VERIFICATIONS = "mortgage_account_verifications",
  MONO_DIRECT_PAY_SUBSCRIPTIONS = "mono_direct_pay_subscriptions",
  MONO_DIRECT_PAY_WEB_HOOKS = "mono_direct_pay_web_hooks",

  DELIVERY_FEE_WALLETS = 'delivery_fee_wallets',
  CARTS = "carts",
  ORDERS = "orders",
  TEMPORARY_ORDERS = "temporary_orders",
  SAVED_PRODUCTS = "saved_products",
  COUPONS = "coupons",
  PRICE_MATRICES = "price_matrices",

  PICKUP_LOCATIONS = "pickup_locations",
  DELIVERY_LOCATIONS = "delivery_locations",
  PRODUCT_LEASES = "product_leases",
  PRODUCT_LEASE_REQUESTS = "product_leases_requests",
  EMAIL_ACTIVATIONS = "email_activations",

  SMS_SEND_LOGS = "sms_send_logs",
  CRON_RUNS = "cron_runs",
  FINDUS = "find_us",

  BUSINESSES = "businesses",
  PUSH_NOTIFICATION_TOKENS = "push_notification_tokens",
  CONFIG_PROPERTIES = "config_properties",
  SUPPORTED_COUNTRIES = "supported_countries",
  WALLETS = "wallets",
  EARNINGS_BY_YEAR = "earnings_by_year",
  EARNINGS_BY_MONTH = "earnings_by_month",
  SELLER_ACCOUNT_STATS = "seller_account_stats",
  FINANCIAL_TRANSACTIONS = "financial_transactions",
  NOTIFICATION_MESSAGES = "notification_messages",
  AVAILABLE_LOCATION_STATES = "available_location_states",
  QUOTE_REQUESTS = "quote_requests",

  PAYSTACK_WEBHOOKS = "paystack_webhooks",
  PAYSTACK_DEDICATED_NUBANS = "paystack_dedicated_nubans",
  PAYSTACK_TRANSFER_RECIPIENT = "paystack_transfer_recipients",
  PRODUCT_REVIEWS = "product_reviews",
  PROMOTIONS = "promotions",

  ACCESS_REQUEST = "access_request",

  SELLER_PICK_LOCATION = "seller_pick_locations",
  
  WALLET_TO_WALLET_TRANSFERS = "wallet_to_wallet_transfers",
}

export default Tables;
