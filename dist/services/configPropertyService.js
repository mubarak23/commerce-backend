"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigProperty = void 0;
const db_1 = require("../db");
const ConfigProperty_1 = require("../entity/ConfigProperty");
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
const error_response_types_1 = require("../utils/error-response-types");
const getConfigProperty = (configPropertyName) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const configPropertyRepo = connection.getRepository(ConfigProperty_1.ConfigProperty);
    const configProperty = yield configPropertyRepo.findOne({
        name: configPropertyName
    });
    if (!configProperty) {
        throw new error_response_types_1.NotFoundError(`There are was an internal server error.`);
    }
    if (configPropertyName === ConfigProperties_1.default.ESCROW_CHARGE_PERCENTAGE) {
        return Number(configProperty.value);
    }
    if (configPropertyName === ConfigProperties_1.default.SEND_REAL_SMS) {
        return configProperty ? configProperty.value === 'true' : false;
    }
    if (configPropertyName === ConfigProperties_1.default.CINDERBUILD_REVENUE_PERCENTAGE) {
        return Number(configProperty.value);
    }
    if (configPropertyName === ConfigProperties_1.default.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE) {
        return Number(configProperty.value);
    }
    if (configPropertyName === ConfigProperties_1.default.C_STORE_DEFAULT_PAYMENT_CHARGE_PERCENTAGE) {
        return Number(configProperty.value);
    }
    return configProperty.value;
});
exports.getConfigProperty = getConfigProperty;
//# sourceMappingURL=configPropertyService.js.map