"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ConflictError = exports.UnprocessableEntityError = exports.NotFoundError = exports.ForbiddenRequestError = exports.UnauthorizedRequestError = exports.BadRequestError = exports.BaseServiceException = exports.DetailedError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class DetailedError {
    constructor(message, standardErrorCode) {
        this.message = message;
        this.standardizedErrorCode = standardErrorCode;
    }
}
exports.DetailedError = DetailedError;
class BaseServiceException extends Error {
    constructor(error, detailedErrors) {
        super(error);
        this.error = error;
        this.detailedErrors = detailedErrors;
        if (!error && detailedErrors.length) {
            this.error = detailedErrors[0].message;
        }
        this.message = this.error;
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
    }
}
exports.BaseServiceException = BaseServiceException;
class BadRequestError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedRequestError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.UNAUTHORIZED;
    }
}
exports.UnauthorizedRequestError = UnauthorizedRequestError;
class ForbiddenRequestError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.FORBIDDEN;
    }
}
exports.ForbiddenRequestError = ForbiddenRequestError;
class NotFoundError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
class UnprocessableEntityError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.UNPROCESSABLE_ENTITY;
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class ConflictError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.CONFLICT;
    }
}
exports.ConflictError = ConflictError;
class ServerError extends BaseServiceException {
    constructor(error, detailedErrors = []) {
        super(error, detailedErrors);
        this.statusCode = http_status_codes_1.default.FORBIDDEN;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=error-response-types.js.map