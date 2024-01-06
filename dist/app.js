"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = require("./routes");
const GlobalErrorHandler = __importStar(require("./middleware/globalErrorHandler"));
const sentry_1 = __importDefault(require("./sentry"));
const Sentry = __importStar(require("@sentry/node"));
process.env.TZ = "UTC";
const app = (0, express_1.default)();
// The Sentry request handler must be the first middleware on the app
(0, sentry_1.default)(app);
(0, middleware_1.default)(app);
(0, routes_1.RegisterRoutes)(app);
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
GlobalErrorHandler.handleErrors(app);
exports.default = app;
//# sourceMappingURL=app.js.map