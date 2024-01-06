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
exports.AddOrderPaymentDefaultDailyChargePercentage1663502014866 = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
const typeorm_1 = require("typeorm");
const ConfigProperty_1 = require("../entity/ConfigProperty");
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
class AddOrderPaymentDefaultDailyChargePercentage1663502014866 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const configProperty = new ConfigProperty_1.ConfigProperty().initialize(ConfigProperties_1.default.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE, '0.167', 'Order payment default daily charge percentage');
            const configPropertyRepo = (0, typeorm_1.getRepository)(ConfigProperty_1.ConfigProperty);
            yield configPropertyRepo.save(configProperty);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.AddOrderPaymentDefaultDailyChargePercentage1663502014866 = AddOrderPaymentDefaultDailyChargePercentage1663502014866;
//# sourceMappingURL=1663502014866-AddOrderPaymentDefaultDailyChargePercentage.js.map