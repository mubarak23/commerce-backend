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
exports.calculateUnitPromoPriceForBuyer = exports.defaultPercentageCharge = exports.getPromoPrice = exports.countryToCurrency = exports.generateUniqueReference = exports.countryToCurrencySymbol = exports.getOrderStatusUpdateTitle = exports.nextPaymentDate30days = exports.defaultStoreFrontBanner = exports.userDefaultAvatarCloudFile = exports.getSupportedCountryFromIso2 = exports.getPaystackTransferFeeMajor = exports.getPaystackTransactionFeeMajor = exports.setArrayColumnQueryOnQueryBuilder = exports.jsonbArrayValue = exports.handleAxiosRequestError = exports.getInvoiceEntityReferenceNumber = exports.getOrderEntityReferenceNumber = exports.pickWithRoundRobin = exports.generatePasswordHash = exports.generateOtp = exports.currentDateFormatted = exports.standardizeDateTime = exports.utcNow = exports.isValidEmail = exports.normalizeEmail = exports.getPriceForBuyer = exports.normalizeMoney = exports.validateAJoi = exports.CurrencyFormatter = exports.formatDate = exports.serverDomain = exports.isNullOrUndefined = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const normalize_email_1 = __importDefault(require("normalize-email"));
const _ = __importStar(require("underscore"));
const validator_1 = __importDefault(require("validator"));
const constants_1 = require("../constants");
const db_1 = require("../db");
const SupportedCountry_1 = require("../entity/SupportedCountry");
const Currency_1 = require("../enums/Currency");
const FileUpload_1 = require("../enums/FileUpload");
const Statuses_1 = __importDefault(require("../enums/Statuses"));
const error_response_types_1 = require("./error-response-types");
function isNullOrUndefined(obj) {
    return typeof obj === "undefined" || obj === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
const serverDomain = () => {
    return process.env.NODE_ENV === constants_1.ProductionEnv ?
        'www.cinderbuild.com' : 'cinderbuilddemo.herokuapp.com';
};
exports.serverDomain = serverDomain;
function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return formattedDate;
}
exports.formatDate = formatDate;
function CurrencyFormatter(total) {
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
exports.CurrencyFormatter = CurrencyFormatter;
const validateAJoi = (joiSchema, object) => {
    const validationResults = joiSchema.validate(object, {
        abortEarly: false,
        allowUnknown: true
    });
    if (!validationResults.error) {
        return false;
    }
    throw new error_response_types_1.BadRequestError(validationResults.error.message);
};
exports.validateAJoi = validateAJoi;
const normalizeMoney = (moneyAmount) => {
    return Math.round((moneyAmount + Number.EPSILON) * 100) / 100;
};
exports.normalizeMoney = normalizeMoney;
const getPriceForBuyer = (price, product) => {
    var _a, _b, _c, _d;
    const percentageMargin = (_d = (_c = (_b = (_a = product === null || product === void 0 ? void 0 : product.category) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.cinderbuildProfiltMargin) === null || _c === void 0 ? void 0 : _c.amountMajor) !== null && _d !== void 0 ? _d : 0;
    if (price) {
        const cinderbuildProfitMargin = (percentageMargin / 100) * price;
        const priceForBuyer = (0, exports.normalizeMoney)(price + cinderbuildProfitMargin);
        return priceForBuyer;
    }
    return 0;
};
exports.getPriceForBuyer = getPriceForBuyer;
const normalizeEmail = (email) => {
    return (0, normalize_email_1.default)(email).trim().toLowerCase();
};
exports.normalizeEmail = normalizeEmail;
const isValidEmail = (email) => {
    return validator_1.default.isEmail(email);
};
exports.isValidEmail = isValidEmail;
const utcNow = () => {
    return moment_1.default.utc().toDate();
};
exports.utcNow = utcNow;
const standardizeDateTime = (dateTime) => {
    return moment_1.default.utc(dateTime).toDate();
};
exports.standardizeDateTime = standardizeDateTime;
function rand(min, max) {
    const random = Math.random();
    return Math.floor(random * (max - min) + min);
}
const currentDateFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1 and pad with leading zeros
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
exports.currentDateFormatted = currentDateFormatted;
const generateOtp = (length) => {
    if (process.env.NODE_ENV !== constants_1.ProductionEnv) {
        return '111111111111111111'.substring(0, length);
    }
    let otp = '';
    const digits = '0123456789';
    while (otp.length < length) {
        const charIndex = rand(0, digits.length - 1);
        otp += digits[charIndex];
    }
    return otp;
};
exports.generateOtp = generateOtp;
const generatePasswordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const passwordSalt = yield bcrypt_1.default.genSalt(saltRounds);
    return bcrypt_1.default.hash(password, passwordSalt);
});
exports.generatePasswordHash = generatePasswordHash;
const pickWithRoundRobin = (lastIndex, candidateIds) => {
    if (lastIndex === -1 || lastIndex === candidateIds.length - 1) {
        return candidateIds[0];
    }
    return candidateIds[lastIndex + 1];
};
exports.pickWithRoundRobin = pickWithRoundRobin;
const getOrderEntityReferenceNumber = (entity) => {
    return `${10000 + entity.id}`;
};
exports.getOrderEntityReferenceNumber = getOrderEntityReferenceNumber;
const getInvoiceEntityReferenceNumber = (entity) => {
    return `${20000 + entity.id}`;
};
exports.getInvoiceEntityReferenceNumber = getInvoiceEntityReferenceNumber;
const handleAxiosRequestError = (error) => {
    if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
        return error.response.data.error;
    }
    if (error.request) {
        /*
        * The request was made but no response was received, `error.request`
        * is an instance of XMLHttpRequest in the browser and an instance
        * of http.ClientRequest in Node.js
        */
        const errorMessage = 'The server seems down at the moment. Please try again later.';
        return errorMessage;
    }
    // Something happened in setting up the request and triggered an Error
    return error.message;
};
exports.handleAxiosRequestError = handleAxiosRequestError;
const jsonbArrayValue = (array) => {
    return `'${JSON.stringify(array)}'`;
};
exports.jsonbArrayValue = jsonbArrayValue;
const setArrayColumnQueryOnQueryBuilder = (queryBuilder, columnName, arrayColumnValues) => {
    const findSellerBusinessQueryBuilder = queryBuilder
        .where(`${columnName} @> '{"${arrayColumnValues[0]}"}'`);
    if (arrayColumnValues.length > 1) {
        for (const item of _.rest(arrayColumnValues)) {
            findSellerBusinessQueryBuilder.orWhere(`${columnName} @> '{"${item}"}'`);
        }
    }
    return findSellerBusinessQueryBuilder;
};
exports.setArrayColumnQueryOnQueryBuilder = setArrayColumnQueryOnQueryBuilder;
const getPaystackTransactionFeeMajor = (amountMajor) => {
    let possibleTransactionFee = (0.015 * amountMajor);
    if (amountMajor >= 2500) {
        possibleTransactionFee += 100;
    }
    return possibleTransactionFee > 2000 ? 2000 : possibleTransactionFee;
};
exports.getPaystackTransactionFeeMajor = getPaystackTransactionFeeMajor;
const getPaystackTransferFeeMajor = (amountMajor) => {
    if (amountMajor <= 5000) {
        return 10;
    }
    if (amountMajor >= 5001 && amountMajor <= 50000) {
        return 25;
    }
    return 50;
};
exports.getPaystackTransferFeeMajor = getPaystackTransferFeeMajor;
const getSupportedCountryFromIso2 = (iso2) => __awaiter(void 0, void 0, void 0, function* () {
    const theDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const connection = yield (0, db_1.getFreshConnection)();
    const supportedCountriesRepo = connection.getRepository(SupportedCountry_1.SupportedCountry);
    const supportedCountries = yield supportedCountriesRepo.find({});
    const foundCountry = supportedCountries.find(supportedCountry => {
        if (theDigits.some(num => iso2.indexOf(num) >= 0)) {
            if (iso2.startsWith('+')) {
                return supportedCountry.phoneCode === iso2.substring(1); // To account for devs sending +234 instead of 234
            }
            return supportedCountry.phoneCode === iso2;
        }
        return supportedCountry.iso2 === iso2;
    });
    if (!foundCountry) {
        throw new error_response_types_1.BadRequestError(`The country of the phone-number is NOT supported at this time`);
    }
    return foundCountry;
});
exports.getSupportedCountryFromIso2 = getSupportedCountryFromIso2;
const userDefaultAvatarCloudFile = () => {
    return {
        keyFromCloudProvider: '',
        url: 'https://res.cloudinary.com/trade-grid/image/upload/v1618526995/default_profile_pic_pwfk1s.png',
        mimetype: 'image/png',
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        fileCategory: FileUpload_1.UploadFileCategory.USER_PHOTO,
    };
};
exports.userDefaultAvatarCloudFile = userDefaultAvatarCloudFile;
const defaultStoreFrontBanner = () => {
    return {
        keyFromCloudProvider: '',
        url: 'https://res.cloudinary.com/trade-grid/image/upload/v1618526995/default_profile_pic_pwfk1s.png',
        mimetype: 'image/png',
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
};
exports.defaultStoreFrontBanner = defaultStoreFrontBanner;
const nextPaymentDate30days = (inputDate) => {
    // eslint-disable-next-line no-unused-expressions
    // inputDate.split('T')[0];
    const datePart = inputDate.split('T')[0];
    console.log('datePart', datePart);
    const originalDate = new Date(datePart);
    console.log('originalDate', originalDate);
    // Add 30 days to the original date
    const formattedNextPaymentDate = new Date(originalDate);
    console.log('formattedNextPaymentDate', formattedNextPaymentDate);
    formattedNextPaymentDate.setDate(formattedNextPaymentDate.getDate() + 30);
    console.log('formattedNextPaymentDate + 30', formattedNextPaymentDate);
    console.log('formattedNextPaymentDate.toISOString()', formattedNextPaymentDate.toISOString());
    return formattedNextPaymentDate.toISOString();
};
exports.nextPaymentDate30days = nextPaymentDate30days;
const getOrderStatusUpdateTitle = (order, statusUpdate) => {
    if (statusUpdate === Statuses_1.default.CREATED) {
        return `Order: #${order.referenceNumber} is created`;
    }
    if (statusUpdate === Statuses_1.default.IN_PROGRESS) {
        return `Order: #${order.referenceNumber} is in progress`;
    }
    if (statusUpdate === Statuses_1.default.AVAILABLE_FOR_PICKUP) {
        return `Order: #${order.referenceNumber} is available for pickup`;
    }
    if (statusUpdate === Statuses_1.default.AVAILABLE_FOR_DELIVERY) {
        return `Order: #${order.referenceNumber} is available for delivery`;
    }
    if (statusUpdate === Statuses_1.default.COMPLETED) {
        return `Order: #${order.referenceNumber} is completed by seller`;
    }
    if (statusUpdate === Statuses_1.default.CONFIRMED) {
        return `Order: #${order.referenceNumber} is confirmed by buyer`;
    }
    if (statusUpdate === Statuses_1.default.CANCELLED_BY_BUYER) {
        return `Order: #${order.referenceNumber} is cancelled by buyer`;
    }
    if (statusUpdate === Statuses_1.default.CANCELLED_BY_SELLER) {
        return `Order: #${order.referenceNumber} is cancelled by seller`;
    }
    if (statusUpdate === Statuses_1.default.ENDED_WITH_DISPUTES) {
        return `Order: #${order.referenceNumber} ended with dispute`;
    }
    return '';
};
exports.getOrderStatusUpdateTitle = getOrderStatusUpdateTitle;
const countryToCurrencySymbol = (country) => {
    // @ts-ignore
    return Currency_1.CountryToCurrency[country.toUpperCase()] || "₦";
};
exports.countryToCurrencySymbol = countryToCurrencySymbol;
const generateUniqueReference = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateUniqueReference = generateUniqueReference;
const countryToCurrency = (country) => {
    // @ts-ignore
    return Currency_1.CountryToCurrency[country.toUpperCase()] || "NGN";
};
exports.countryToCurrency = countryToCurrency;
const getPromoPrice = (promoPercentage, price) => {
    return (0, exports.normalizeMoney)((promoPercentage / 100) * price);
};
exports.getPromoPrice = getPromoPrice;
const defaultPercentageCharge = (chargePercentage, orderAmount) => {
    return (0, exports.normalizeMoney)((chargePercentage / 100) * orderAmount);
};
exports.defaultPercentageCharge = defaultPercentageCharge;
const calculateUnitPromoPriceForBuyer = (unitPriceForBuyer, promotion) => {
    if (promotion) {
        const percentageAmount = (0, exports.normalizeMoney)((promotion.percentage / 100) * unitPriceForBuyer);
        return (0, exports.normalizeMoney)(unitPriceForBuyer - percentageAmount);
    }
    return undefined;
};
exports.calculateUnitPromoPriceForBuyer = calculateUnitPromoPriceForBuyer;
//# sourceMappingURL=core.js.map