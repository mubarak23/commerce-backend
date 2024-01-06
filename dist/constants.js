"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORT_EMAIL = exports.VAT = exports.CEMENT_CATEGORY_UUID = exports.REDIRECT_URL_AFTER_PAYMENT = exports.DEFAULT_PAGE_SIZE = exports.ADMIN_USER_2 = exports.ADMIN_USER_1 = exports.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT = exports.CINDERBUILD_REVENUE_ACCOUNT = exports.CINDERBUILD_REVENUE_USER = exports.PRODUCT_LEASE_INTEREST_RATE = exports.ProductionEnv = void 0;
exports.ProductionEnv = 'LiveEnvironment';
exports.PRODUCT_LEASE_INTEREST_RATE = 3;
exports.CINDERBUILD_REVENUE_USER = 1;
exports.CINDERBUILD_REVENUE_ACCOUNT = 1;
exports.CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT = 20000000;
exports.ADMIN_USER_1 = 'cddffabdsa';
exports.ADMIN_USER_2 = 'adduuvbsca';
exports.DEFAULT_PAGE_SIZE = 10;
exports.REDIRECT_URL_AFTER_PAYMENT = process.env.NODE_ENV === exports.ProductionEnv ? `https://cinderbuild.com/order-completed` : 'https://cinderbuild-dev-002.netlify.app/order-completed';
exports.CEMENT_CATEGORY_UUID = process.env.NODE_ENV === exports.ProductionEnv ? `e40d9bba-8ccb-4daa-a36f-51ba9eee575e` : `e40d9bba-8ccb-4daa-a36f-51ba9eee575e`;
exports.VAT = 5;
exports.SUPPORT_EMAIL = 'cb_support@cinderbuild.com';
//# sourceMappingURL=constants.js.map