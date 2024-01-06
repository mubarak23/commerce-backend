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
exports.SendChampMessageService = void 0;
const SmsSendLog_1 = require("../../entity/SmsSendLog");
const axios_1 = __importDefault(require("axios"));
const SmsProviders_1 = require("../../enums/SmsProviders");
const core_1 = require("../../utils/core");
const db_1 = require("../../db");
class SendChampMessageService {
    sendOtpMessage(msisdn, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const sendchampRequetPayload = {
                channel: 'whatsapp',
                sender: process.env.SENDCHAMP_SENDER,
                token_type: 'numeric',
                token_length: 4,
                expiration_time: 30,
                customer_mobile_number: msisdn,
                token: otp
            };
            let whatsAppMessageLog = new SmsSendLog_1.SmsSendLog().initialize(msisdn, sendchampRequetPayload, SmsProviders_1.SmsProviders.SENDCHAMP);
            const connection = yield (0, db_1.getFreshConnection)();
            const whatsAppMessageLogRepo = connection.getRepository(SmsSendLog_1.SmsSendLog);
            whatsAppMessageLog = yield whatsAppMessageLogRepo.save(whatsAppMessageLog);
            const sendChampApiKey = process.env.SENDCHAMP_API_KEY;
            const headers = {
                'Authorization': `Bearer ${sendChampApiKey}`,
            };
            const baseURL = `https://api.sendchamp.com/api/v1/verification/create`;
            try {
                const response = yield axios_1.default.post(baseURL, sendchampRequetPayload, { headers });
                const { data } = response;
                yield whatsAppMessageLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: data,
                    sentSuccessfully: data.data.status === 'sent',
                })
                    .where({
                    id: whatsAppMessageLog.id
                })
                    .execute();
                return true;
            }
            catch (e) {
                const errorMessage = (0, core_1.handleAxiosRequestError)(e);
                yield whatsAppMessageLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: e,
                    sentSuccessfully: false,
                    httpRequestErrorMessage: e.message || errorMessage,
                })
                    .where({
                    id: whatsAppMessageLog.id
                })
                    .execute();
                return false;
            }
        });
    }
}
exports.SendChampMessageService = SendChampMessageService;
//# sourceMappingURL=SendChampMessageService.js.map