"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
/* eslint-disable consistent-return */
const runtime_1 = require("@tsoa/runtime");
const error_response_types_1 = require("../utils/error-response-types");
const logger_1 = __importDefault(require("../logger"));
const handleErrors = (app) => {
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof runtime_1.ValidateError) {
            return res.status(422).json({
                status: false,
                message: "Validation Failed",
                details: err === null || err === void 0 ? void 0 : err.fields,
            });
        }
        if (err.statusCode && !(err instanceof error_response_types_1.UnauthorizedRequestError)) { // substitude for instanceof BaseServiceException
            logger_1.default.error(err.message);
            logger_1.default.error(err.stack);
            return res.status(err.statusCode).json({
                status: false,
                error: err.message,
            });
        }
        if (err.statusCode && err instanceof error_response_types_1.UnauthorizedRequestError) {
            logger_1.default.error(err.message);
            logger_1.default.error(err.stack);
            if (err.detailedErrors && err.detailedErrors.length) {
                return res.status(err.statusCode).json({
                    status: false,
                    error: err.message,
                    detailedError: err.detailedErrors[0],
                    detailedErrors: err.detailedErrors,
                });
            }
            return res.status(err.statusCode).json({
                status: false,
                error: err.message,
            });
        }
        if (err instanceof Error) {
            logger_1.default.error(err.message);
            logger_1.default.error(err.stack);
            return res.status(500).json({
                status: false,
                error: err.message,
            });
        }
        next();
    });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=globalErrorHandler.js.map