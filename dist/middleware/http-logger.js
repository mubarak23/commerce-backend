"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
// @ts-ignore
function tryToParseJSON(item) {
    try {
        return JSON.parse(item);
    }
    catch (e) {
        return item;
    }
}
const middlewareHandler = (req, res, next) => {
    res.on('finish', () => {
        const requestBody = tryToParseJSON(req.body);
        // @ts-ignore
        const responseBody = tryToParseJSON(res.body);
        logger_1.default.info({
            endPoint: req.originalUrl,
            request: {
                headers: req.headers,
                body: requestBody,
            },
            response: {
                statusCode: res.statusCode,
                body: responseBody,
            },
        });
    });
    next();
};
exports.default = middlewareHandler;
//# sourceMappingURL=http-logger.js.map