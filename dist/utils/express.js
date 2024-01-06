"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondWithConflict = exports.respondWithServerError = exports.respondWithUnprocessableEntity = exports.respondWithNotFound = exports.respondWithForbidden = exports.respondWithUnauthorized = exports.respondWithBadRequest = exports.respondWithSimpleError = exports.respondWithError = exports.respondWithStatus = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const respondWithStatus = (res, statusCode, data) => {
    res.status(statusCode).send(data);
};
exports.respondWithStatus = respondWithStatus;
const respondWithError = (res, exception) => {
    const resData = {
        status: false,
        error: (exception === null || exception === void 0 ? void 0 : exception.error) || (exception === null || exception === void 0 ? void 0 : exception.message)
    };
    if (exception === null || exception === void 0 ? void 0 : exception.detailedErrors) {
        resData.errors = exception === null || exception === void 0 ? void 0 : exception.detailedErrors;
    }
    try {
        if (exception === null || exception === void 0 ? void 0 : exception.statusCode) {
            res.status(exception.statusCode).send(resData);
        }
        else {
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(resData);
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send({
            status: false,
            error: e.message
        });
    }
};
exports.respondWithError = respondWithError;
const respondWithSimpleError = (res, statusCode, message) => {
    const resData = {
        status: false,
        error: message
    };
    try {
        res.status(statusCode).send(resData);
    }
    catch (e) {
        console.log(e.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send({
            status: false,
            error: e.message
        });
    }
};
exports.respondWithSimpleError = respondWithSimpleError;
const respondWithBadRequest = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.BAD_REQUEST, message);
};
exports.respondWithBadRequest = respondWithBadRequest;
const respondWithUnauthorized = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.UNAUTHORIZED, message);
};
exports.respondWithUnauthorized = respondWithUnauthorized;
const respondWithForbidden = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.FORBIDDEN, message);
};
exports.respondWithForbidden = respondWithForbidden;
const respondWithNotFound = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.NOT_FOUND, message);
};
exports.respondWithNotFound = respondWithNotFound;
const respondWithUnprocessableEntity = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, message);
};
exports.respondWithUnprocessableEntity = respondWithUnprocessableEntity;
const respondWithServerError = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR, message);
};
exports.respondWithServerError = respondWithServerError;
const respondWithConflict = (res, message) => {
    (0, exports.respondWithSimpleError)(res, http_status_codes_1.default.CONFLICT, message);
};
exports.respondWithConflict = respondWithConflict;
//# sourceMappingURL=express.js.map