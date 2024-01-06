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
exports.sendSmsByUserId = exports.sendOtp = exports.sendSms = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
const awesome_phonenumber_1 = __importDefault(require("awesome-phonenumber"));
const constants_1 = require("../constants");
const db_1 = require("../db");
const User_1 = require("../entity/User");
const ConfigProperties_1 = __importDefault(require("../enums/ConfigProperties"));
const logger_1 = __importDefault(require("../logger"));
const error_response_types_1 = require("../utils/error-response-types");
const configPropertyService_1 = require("./configPropertyService");
const AfricasTalkingSmsService_1 = require("./sms/AfricasTalkingSmsService");
const MultitexterSmsService_1 = require("./sms/MultitexterSmsService");
const TwilioSmsService_1 = require("./sms/TwilioSmsService");
const SendChampMessageService_1 = require("./whatsapp/SendChampMessageService");
const sendRealSms = (msisdn, smsContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regionCode = new awesome_phonenumber_1.default(msisdn).getRegionCode();
        let sentSuccessfully = false;
        const africasTalkingSmsService = new AfricasTalkingSmsService_1.AfricasTalkingSmsService();
        sentSuccessfully = yield africasTalkingSmsService.sendSms(msisdn, smsContent);
        if (sentSuccessfully)
            return sentSuccessfully;
        const twilioSmsService = new TwilioSmsService_1.TwilioSmsService();
        sentSuccessfully = yield twilioSmsService.sendSms(msisdn, smsContent);
        if (sentSuccessfully)
            return sentSuccessfully;
        if (!sentSuccessfully) {
            if (regionCode && regionCode === 'NG') {
                const multiTexterSmsService = new MultitexterSmsService_1.MultiTexterSmsService();
                sentSuccessfully = yield multiTexterSmsService.sendSms(msisdn, smsContent);
            }
        }
        return sentSuccessfully;
    }
    catch (e) {
        logger_1.default.error(`Cannot send sms content: '${smsContent}' to: ${msisdn}`);
    }
    return false;
});
const sendSms = (msisdn, smsContent) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== constants_1.ProductionEnv) {
        const shouldSendRealSms = yield (0, configPropertyService_1.getConfigProperty)(ConfigProperties_1.default.SEND_REAL_SMS);
        if (shouldSendRealSms) {
            return sendRealSms(msisdn, smsContent);
        }
        return true;
    }
    return sendRealSms(msisdn, smsContent);
});
exports.sendSms = sendSms;
const sendOtp = (msisdn, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const sendThroughWhatsApp = () => __awaiter(void 0, void 0, void 0, function* () {
        const sentSuccessfully = yield new SendChampMessageService_1.SendChampMessageService().sendOtpMessage(msisdn, otp);
        if (sentSuccessfully) {
            return sentSuccessfully;
        }
        return undefined;
    });
    if (process.env.NODE_ENV !== constants_1.ProductionEnv) {
        const shouldSendRealSms = yield (0, configPropertyService_1.getConfigProperty)(ConfigProperties_1.default.SEND_REAL_SMS);
        if (shouldSendRealSms) {
            const sentSuccessfully = yield sendThroughWhatsApp();
            if (!sentSuccessfully)
                return sendRealSms(msisdn, `Your CinderBuild OTP number is ${otp}.`);
        }
        return true;
    }
    const sentSuccessfully = yield sendThroughWhatsApp();
    if (!sentSuccessfully)
        return sendRealSms(msisdn, `Your CinderBuild OTP number is ${otp}.`);
    return sentSuccessfully;
});
exports.sendOtp = sendOtp;
const sendSmsByUserId = (userId, smsContent) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = yield connection.getRepository(User_1.User);
    const user = yield userRepo.findOne({ id: userId });
    if (!user) {
        throw new error_response_types_1.ServerError('Could not find user to sms to ...');
    }
    return (0, exports.sendSms)(user.msisdn, smsContent);
});
exports.sendSmsByUserId = sendSmsByUserId;
//# sourceMappingURL=smsSendingService.js.map