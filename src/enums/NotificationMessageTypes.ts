enum NotificationMessageTypes {
  QUOTE_REQUEST_SENT_TO_SELLER = 'QUOTE_REQUEST_SENT_TO_SELLER',

  QUOTE_REQUEST_SELLER_RESPONSE = 'QUOTE_REQUEST_SELLER_RESPONSE',
  QUOTE_REQUEST_SELLER_DECLINE = 'QUOTE_REQUEST_SELLER_DECLINE',
  QUOTE_REQUEST_SELLER_EXPIRE = 'QUOTE_REQUEST_SELLER_EXPIRE',
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CANCELLED_BY_BUYER = 'ORDER_CANCELLED_BY_BUYER',
  ORDER_CANCELLED_BY_SELLER = 'ORDER_CANCELLED_BY_SELLER',

  MAIN_WALLET_FUND = 'MAIN_WALLET_FUND',
  ORDER_DISPUTE_ACKNOWLEDGEMENT = 'ORDER_DISPUTE_ACKNOWLEDGEMENT',

  ORDER_PICKED_UP = 'ORDER_PICKED_UP',
  ORDER_DELIVERED = 'ORDER_DELIVERED',

  NEW_ACCOUNT_LEVEL_USER_ADDED = 'NEW_ACCOUNT_LEVEL_USER_ADDED',

  NEW_WAREHOUSE_LEVEL_USER_ADDED = 'NEW_WAREHOUSE_LEVEL_USER_ADDED',

  PROCURMENT_LIST_UPLOADED = 'PROCURMENT_LIST_UPLOADED',

  ORDER_PAYMENT_IN_ESCROW = 'ORDER_PAYMENT_IN_ESCROW',
  ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER = 'ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER',
  ORDER_AVAILABLE_FOR_PICKUP = 'ORDER_AVAILABLE_FOR_PICKUP',
  WAREHOUSE_TO_SITE_DELIVERY_FEE_SET = 'WAREHOUSE_TO_SITE_DELIVERY_FEE_SET',
  ORDER_AVAILABLE_FOR_DELIVERY = 'ORDER_AVAILABLE_FOR_DELIVERY',
  CONFIRMED_PICKUP = 'CONFIRMED_PICKUP',
  CONFIRMED_DELIVERY = 'CONFIRMED_DEVELIERY',
  QOUTE_REQUEST_RAISED = 'QOUTE_REQUEST_RAISED',
  QOUTE_REQUEST_RESPONSE = 'QOUTE_REQUEST_RESPONSE',
  ESCROW_PAYMENT_TO_SELLER = 'ESCROW_PAYMENT_TO_SELLER',
  ESCROW_PAYMENT_TO_BUYER = 'ESCROW_PAYMENT_TO_BUYER',
  ORDER_REFUND_TO_BUYER = 'ORDER_REFUND_TO_BUYER',
  SELLER_INVITE_TO_BUYER = 'SELLER_INVITE_TO_BUYER',
  BUYER_ACCEPT_SELLER_INVITE = 'BUYER_ACCEPT_SELLER_INVITE',
  ENABLE_PLP = 'ENABLE_PLP',
  POD_ORDER_CONFIRMATION = 'POD_ORDER_CONFIRMAION', // BUYER
  POD_ORDER_NOTIFCATION = 'POD_ORDER_NOTIFICATION', // SELLER
  POD_ORDER_PAYMENT_NOTIFICATION = 'POD_ORDER_PAYMENT_NOTIFICATION', // BUYER 

  ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE = 'ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE',
  POD_ORDER_PAYMENT_DEFAULT = 'POD_ORDER_PAYMENT_DEFAULT', // BUYER 

ESTATE_PROJECT_APPROVAL_REQUEST = 'ESTATE_PROJECT_APPROVAL_REQUEST',
ESTATE_PROJECT_APPROVED = 'ESTATE_PROJECT_APPROVED',
ESTATE_PROJECT_DECLINED = 'ESTATE_PROJECT_DECLINED'

}

export default NotificationMessageTypes
