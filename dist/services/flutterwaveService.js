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
exports.accountNameEnquiry = exports.getBanksList = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const Flutterwave = require('flutterwave-node-v3');
const logger_1 = __importDefault(require("../logger"));
const error_response_types_1 = require("../utils/error-response-types");
const getBanksList = () => __awaiter(void 0, void 0, void 0, function* () {
    const flutterwavePublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const flw = new Flutterwave(flutterwavePublicKey, flutterwaveSecretKey);
    try {
        const payload = {
            "country": "NG" // Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively        
        };
        const response = yield flw.Bank.country(payload);
        const flutterwaveBanks = response.data.map((bank) => {
            return {
                code: bank.code,
                name: bank.name,
                country: "NG",
                currency: "NGN",
                active: true,
                type: "",
            };
        });
        return flutterwaveBanks;
    }
    catch (error) {
        throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
    }
});
exports.getBanksList = getBanksList;
const accountNameEnquiry = (bankCode, accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const flutterwavePublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const flw = new Flutterwave(flutterwavePublicKey, flutterwaveSecretKey);
    try {
        const payload = {
            "account_number": accountNumber,
            "account_bank": bankCode
        };
        const response = yield flw.Misc.verify_Account(payload);
        const resolveResult = {
            account_name: response.data.account_name
        };
        return resolveResult;
    }
    catch (e) {
        logger_1.default.error(e);
        throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
    }
});
exports.accountNameEnquiry = accountNameEnquiry;
//# sourceMappingURL=flutterwaveService.js.map