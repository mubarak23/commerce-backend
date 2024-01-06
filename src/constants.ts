export const ProductionEnv = 'LiveEnvironment'

export const PRODUCT_LEASE_INTEREST_RATE = 3
export const CINDERBUILD_REVENUE_USER = 1
export const CINDERBUILD_REVENUE_ACCOUNT = 1 
export const CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT = 20000000
export const ADMIN_USER_1 = 'cddffabdsa'
export const ADMIN_USER_2 = 'adduuvbsca'

export const DEFAULT_PAGE_SIZE = 10
export const REDIRECT_URL_AFTER_PAYMENT = process.env.NODE_ENV === ProductionEnv ? `https://cinderbuild.com/order-completed` : 'https://cinderbuild-dev-002.netlify.app/order-completed'
export const CEMENT_CATEGORY_UUID = process.env.NODE_ENV === ProductionEnv ? `e40d9bba-8ccb-4daa-a36f-51ba9eee575e` : `e40d9bba-8ccb-4daa-a36f-51ba9eee575e`
export const VAT = 5;
export const SUPPORT_EMAIL = 'cb_support@cinderbuild.com';

