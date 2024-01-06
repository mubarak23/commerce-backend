"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const setupSwagger = (app) => {
    app.use("/swagger-ui", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    }));
};
exports.default = setupSwagger;
//# sourceMappingURL=swagger.js.map