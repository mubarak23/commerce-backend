"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = void 0;
const Rest = {
    STATUS: 'status',
    MESSAGE: 'message',
    ERRORS: 'errors',
    DATA: 'data',
    TOKEN: 'token',
    JWT_TIMEOUT: 604800,
    JWT_REFRESH_TIMEOUT: 2592000, // 30 days
};
exports.Paths = {
    FIREBASE: '/firebase',
    ACCESS: '/access',
    ONBOARDING: '/onboarding',
    PROFILE: '/profile',
    MISCELLANEOUS: '/miscellaneous',
    SIGNUP: '/signup',
    ADMINS: '/admins',
};
exports.default = Rest;
//# sourceMappingURL=Rest.js.map