"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkPaystackTransaction = exports.createDedicatedNuban = exports.saveTransferReceipt = exports.initializeTransaction = exports.accountNameEnquiry = exports.getBanksList = void 0;
/* eslint-disable camelcase */
const PaystackTransferRecipient_1 = require("../entity/PaystackTransferRecipient");
const axios_1 = __importDefault(require("axios"));
const error_response_types_1 = require("../utils/error-response-types");
const db_1 = require("../db");
const logger_1 = __importDefault(require("../logger"));
const PaystackDedicatedNuban_1 = require("../entity/PaystackDedicatedNuban");
const Utils = __importStar(require("../utils/core"));
const Constants = __importStar(require("../constants"));
const getBanksList = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = 'https://api.paystack.co/bank?country=nigeria';
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    try {
        const response = yield axios_1.default.get(baseURL, {
            headers
        });
        if (!response.data || response.status !== 200) {
            throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
        }
        const paystackBanks = response.data.data;
        return paystackBanks;
    }
    catch (e) {
        throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
    }
});
exports.getBanksList = getBanksList;
const accountNameEnquiry = (bankCode, accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.PAYSTACK_SECRET_KEY) {
        throw new error_response_types_1.ServerError("Sorry, there was a server mis-configuration.");
    }
    const baseURL = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    try {
        const response = yield axios_1.default.get(baseURL, {
            headers
        });
        if (!response.data || response.status !== 200) {
            throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
        }
        const resolveResult = response.data.data;
        return resolveResult;
    }
    catch (e) {
        throw new error_response_types_1.ServerError('An error occurred with our third party. Please try again at a later time.');
    }
});
exports.accountNameEnquiry = accountNameEnquiry;
const initializeTransaction = (payingUser, amountMajor) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const baseURL = 'https://api.paystack.co/transaction/initialize';
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    const amountMinor = (amountMajor || 0) * 100;
    try {
        const transactionFeeMajor = Utils.getPaystackTransactionFeeMajor(amountMinor / 100);
        const postPayload = {
            amount: (amountMajor * 100) + (transactionFeeMajor * 100),
            email: (_a = payingUser.emailAddress) !== null && _a !== void 0 ? _a : `${payingUser.fullName.replace(' ', '.')}@cinderbuild.com`,
            metadata: {
                full_name: payingUser.fullName,
            }
        };
        console.log(postPayload);
        const response = yield axios_1.default.post(baseURL, postPayload, {
            headers
        });
        if (!response.data || response.status !== 200) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        const { authorization_url, reference, access_code } = response.data.data;
        return {
            paymentProviderRedirectUrl: authorization_url,
            paymentReference: reference,
            accessCode: access_code,
            redirectUrlAfterPayment: Constants.REDIRECT_URL_AFTER_PAYMENT
        };
    }
    catch (e) {
        const errorMessage = Utils.handleAxiosRequestError(e);
        console.log(`e handleAxiosRequestError message: `, errorMessage);
        console.log(`e message: `, e.message);
        console.log(e.stack);
        throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
    }
});
exports.initializeTransaction = initializeTransaction;
const saveTransferReceipt = (bankCode, accountNumber, bankAccountName) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const paystackTransferRecipientRepo = connection.getRepository(PaystackTransferRecipient_1.PaystackTransferRecipient);
    let paystackTransferRecipient = yield paystackTransferRecipientRepo.findOne({
        bankCode,
        accountNumber
    });
    if (paystackTransferRecipient) {
        return paystackTransferRecipient;
    }
    //--
    const baseURL = 'https://api.paystack.co/transferrecipient';
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    const postPayload = {
        type: "nuban",
        name: bankAccountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
    };
    try {
        const response = yield axios_1.default.post(baseURL, postPayload, {
            headers
        });
        console.log(`response.data: `, response.data);
        if (!response.data || response.status !== 201) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        const { recipient_code, active, id, currency } = response.data.data;
        paystackTransferRecipient = new PaystackTransferRecipient_1.PaystackTransferRecipient().initialize(accountNumber, bankCode, recipient_code, currency);
        const savedRecipient = yield paystackTransferRecipientRepo.save(paystackTransferRecipient);
        return savedRecipient;
    }
    catch (e) {
        throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
    }
});
exports.saveTransferReceipt = saveTransferReceipt;
const createDedicatedNuban = (userRecord) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const connection = yield (0, db_1.getFreshConnection)();
    const paystackDedicatedNubanRepo = connection.getRepository(PaystackDedicatedNuban_1.PaystackDedicatedNuban);
    let paystackDedicatedNuban = yield paystackDedicatedNubanRepo.findOne({
        userId: userRecord.id
    });
    if (paystackDedicatedNuban) {
        return paystackDedicatedNuban;
    }
    //--
    const createCustomerBaseURL = 'https://api.paystack.co/customer';
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    const createCustomerPostPayload = {
        first_name: userRecord.firstName,
        last_name: userRecord.lastName,
        email: userRecord.emailAddress,
        phone: userRecord.msisdn,
    };
    try {
        const createCustomerResponse = yield axios_1.default.post(createCustomerBaseURL, createCustomerPostPayload, {
            headers
        });
        if (!createCustomerResponse.data) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        const { customer_code, integration, id } = createCustomerResponse.data.data;
        const customerId = id;
        //--
        const updateCustomerBaseURL = `https://api.paystack.co/customer/${customer_code}`;
        const updateCustomerPostPayload = {
            first_name: userRecord.firstName,
            last_name: userRecord.lastName,
            phone: userRecord.msisdn,
        };
        const updateCustomerResponse = yield axios_1.default.put(updateCustomerBaseURL, updateCustomerPostPayload, {
            headers
        });
        //--
        const createDedicatedNubanBaseURL = 'https://api.paystack.co/dedicated_account';
        const createDedicatedNubanPostPayload = {
            customer: customerId,
            preferred_bank: process.env.NODE_ENV === Constants.ProductionEnv ? "wema-bank" : "test-bank", // This is intentional.
        };
        const createDedicatedNubanResponse = yield axios_1.default.post(createDedicatedNubanBaseURL, createDedicatedNubanPostPayload, {
            headers
        });
        if (!(createDedicatedNubanResponse === null || createDedicatedNubanResponse === void 0 ? void 0 : createDedicatedNubanResponse.data)) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        const { bank, account_name, account_number } = (_b = createDedicatedNubanResponse === null || createDedicatedNubanResponse === void 0 ? void 0 : createDedicatedNubanResponse.data) === null || _b === void 0 ? void 0 : _b.data;
        const dedicatedNubanActualPayload = (_c = createDedicatedNubanResponse === null || createDedicatedNubanResponse === void 0 ? void 0 : createDedicatedNubanResponse.data) === null || _c === void 0 ? void 0 : _c.data;
        paystackDedicatedNuban = new PaystackDedicatedNuban_1.PaystackDedicatedNuban().initialize(userRecord.id, bank.id, bank.name, account_number, account_name, customerId, integration, dedicatedNubanActualPayload);
        const savedDedicatedNuban = yield paystackDedicatedNubanRepo.save(paystackDedicatedNuban);
        return savedDedicatedNuban;
    }
    catch (e) {
        logger_1.default.error('Error funding wallet: ', e.message);
        console.log(e.stack);
        throw new error_response_types_1.ServerError('An error occurred. Please try again at a later time.');
    }
});
exports.createDedicatedNuban = createDedicatedNuban;
const checkPaystackTransaction = (paystackTransactionReference) => __awaiter(void 0, void 0, void 0, function* () {
    const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const baseURL = `https://api.paystack.co/transaction/verify/${encodeURIComponent(paystackTransactionReference)}`;
    const headers = {
        'Authorization': `Bearer ${paystackApiSecretKey}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    try {
        const response = yield axios_1.default.get(baseURL, {
            headers
        });
        if ((response.status < 200 || response.status >= 210) || !response.data) {
            throw new Error('Sorry, verification failed! Please try again.');
        }
        const { currency, gateway_response, amount, requested_amount, status } = response.data.data;
        // const paystackReference = response.data.data.reference
        return status;
    }
    catch (e) {
        throw new error_response_types_1.ServerError('Paystack verification failed');
    }
});
exports.checkPaystackTransaction = checkPaystackTransaction;
//# sourceMappingURL=paystackService.js.map