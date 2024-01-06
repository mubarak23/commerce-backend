"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @ts-ignore
const helmet_1 = __importDefault(require("helmet"));
const bodyParser_1 = __importDefault(require("./bodyParser"));
const cors_1 = __importDefault(require("./cors"));
const http_logger_1 = __importDefault(require("./http-logger"));
const swagger_1 = __importDefault(require("./swagger"));
const constants_1 = require("../constants");
const iniitializeMiddlewares = (app) => {
    app.use((0, helmet_1.default)());
    (0, bodyParser_1.default)(app);
    (0, cors_1.default)(app);
    if (process.env.NODE_ENV === constants_1.ProductionEnv) {
        app.use(http_logger_1.default);
    }
    // This is key to make swagger work
    app.use(express_1.default.static("public"));
    app.set('views', `${__dirname}/public`);
    (0, swagger_1.default)(app);
};
exports.default = iniitializeMiddlewares;
//# sourceMappingURL=index.js.map