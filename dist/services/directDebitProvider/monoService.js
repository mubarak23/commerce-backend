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
exports.verifyMonoDirectPayTransaction = exports.initializeDirectPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const Utils = __importStar(require("../../utils/core"));
const error_response_types_1 = require("../../utils/error-response-types");
const initializeDirectPayment = (payingUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = 'https://api.withmono.com/v1/payments/initiate';
    const headers = {
        'accept': 'application/json',
        'mono-sec-key': `${process.env.MONO_SEC_KEY}`,
        'content-type': 'application/json',
    };
    const amountMinor = (payload.amount || 0);
    const cinderbuildReference = Utils.generateUniqueReference(12);
    try {
        const postPayload = {
            amount: amountMinor,
            type: payload.type,
            reference: cinderbuildReference,
            description: payload.description,
            redirect_url: payload.redirectUrl,
            meta: payingUser
        };
        console.log('payload', postPayload);
        console.log('headers', headers);
        const response = yield axios_1.default.post(baseURL, postPayload, {
            headers
        });
        if (!response.data || response.status !== 200) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        console.log('mono response: ', response);
        // eslint-disable-next-line camelcase
        const { id, type, amount, description, payment_link, created_at, updated_at, reference } = response.data;
        return {
            // eslint-disable-next-line camelcase
            id, reference: cinderbuildReference, type, amount, description, paymentLink: payment_link, createdAt: created_at, updatedAt: updated_at
        };
    }
    catch (e) {
        const errorMessage = Utils.handleAxiosRequestError(e);
        console.log('error', e);
        console.log(`e handleAxiosRequestError message: `, errorMessage);
        console.log(`e message: `, e.message);
        console.log(e.stack);
        throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
    }
});
exports.initializeDirectPayment = initializeDirectPayment;
const verifyMonoDirectPayTransaction = (transactionReference) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = 'https://api.withmono.com/v1/payments/verify';
    const headers = {
        'mono-sec-key': `Bearer ${process.env.MONO_SEC_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    };
    try {
        const postPayload = {
            reference: transactionReference
        };
        console.log(postPayload);
        const response = yield axios_1.default.post(baseURL, postPayload, {
            headers
        });
        if (!response.data || response.status !== 200) {
            throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
        }
        console.log('mono trn response: ', response);
        // eslint-disable-next-line camelcase
        return response.data.data;
    }
    catch (e) {
        const errorMessage = Utils.handleAxiosRequestError(e);
        console.log(`e handleAxiosRequestError message: `, errorMessage);
        console.log(`e message: `, e.message);
        console.log(e.stack);
        throw new error_response_types_1.ServerError('An error occurred with our payment provider. Please try again at a later time.');
    }
});
exports.verifyMonoDirectPayTransaction = verifyMonoDirectPayTransaction;
//# sourceMappingURL=monoService.js.map