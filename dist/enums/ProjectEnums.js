"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPaymentPlan = exports.ProjectStatuses = exports.ProjectStages = void 0;
var ProjectStages;
(function (ProjectStages) {
    ProjectStages["SITE_PREPARATION"] = "SITE_PREPARATION";
    ProjectStages["EXCAVATION"] = "EXCAVATION";
    ProjectStages["FOUNDATION"] = "FOUNDATION";
    ProjectStages["FRAMING"] = "FRAMING";
    ProjectStages["INTERIOR_FINISHES"] = "INTERIOR_FINISHES";
    ProjectStages["EXTERIOR_FINISHES"] = "EXTERIOR_FINISHES";
})(ProjectStages = exports.ProjectStages || (exports.ProjectStages = {}));
var ProjectStatuses;
(function (ProjectStatuses) {
    ProjectStatuses["PENDING"] = "PENDING";
    ProjectStatuses["DECLINED"] = "DECLINED";
    ProjectStatuses["ACTIVE"] = "ACTIVE";
    ProjectStatuses["CLOSED"] = "CLOSED";
    ProjectStatuses["ALL"] = "ALL";
})(ProjectStatuses = exports.ProjectStatuses || (exports.ProjectStatuses = {}));
var ProjectPaymentPlan;
(function (ProjectPaymentPlan) {
    ProjectPaymentPlan["DAILY"] = "DAILY";
    ProjectPaymentPlan["WEEKLY"] = "WEEKLY";
    ProjectPaymentPlan["MONTHLY"] = "MONTHLY";
    ProjectPaymentPlan["YEARLY"] = "YEARLY";
})(ProjectPaymentPlan = exports.ProjectPaymentPlan || (exports.ProjectPaymentPlan = {}));
//# sourceMappingURL=ProjectEnums.js.map