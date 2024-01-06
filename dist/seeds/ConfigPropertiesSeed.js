"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
const configProperties = [
    { id: 1, name: ConfigProperties_1.default.ESCROW_CHARGE_PERCENTAGE, value: '0.005', description: 'The number multiplied by the quote total price to arrive at escrow charge amount' },
    { id: 2, name: ConfigProperties_1.default.SEND_REAL_SMS, value: 'false', description: 'Send sms through third party provider in dev environment' },
    { id: 3, name: ConfigProperties_1.default.CINDERBUILD_REVENUE_PERCENTAGE, value: '0.05', description: 'The number multiplied by the seller price to compute the price the buyer will see.' },
    { id: 4, name: ConfigProperties_1.default.COOPERATE_ACCOUNT_DISCOUNT, value: 'false', description: 'The number add N200,000 to a delivery wallet fee (secondary wallet)' },
    { id: 4, name: ConfigProperties_1.default.VAT, value: '5', description: 'Value added tax' },
];
exports.default = configProperties;
//# sourceMappingURL=ConfigPropertiesSeed.js.map