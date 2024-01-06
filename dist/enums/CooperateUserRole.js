"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCorporateUserRole = exports.CooperateUserRole = void 0;
var CooperateUserRole;
(function (CooperateUserRole) {
    CooperateUserRole["ACCOUNT_LEVEL"] = "ACCOUNT_LEVEL";
    CooperateUserRole["WARE_HOUSE_LEVEL"] = "WARE_HOUSE_LEVEL";
})(CooperateUserRole = exports.CooperateUserRole || (exports.CooperateUserRole = {}));
const displayCorporateUserRole = (role) => {
    if (role === CooperateUserRole.ACCOUNT_LEVEL) {
        return 'Account Level';
    }
    if (role === CooperateUserRole.WARE_HOUSE_LEVEL) {
        return 'Ware House Level';
    }
    return '';
};
exports.displayCorporateUserRole = displayCorporateUserRole;
//# sourceMappingURL=CooperateUserRole.js.map