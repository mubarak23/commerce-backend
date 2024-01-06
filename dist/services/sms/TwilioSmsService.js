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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioSmsService = void 0;
const twilio_1 = require("twilio");
const SmsSendLog_1 = require("../../entity/SmsSendLog");
const SmsProviders_1 = require("../../enums/SmsProviders");
const db_1 = require("../../db");
class TwilioSmsService {
    sendSms(msisdn, smsContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = new twilio_1.Twilio(accountSid, authToken);
            const requestPayload = { body: smsContent, from: '+19803325592', to: msisdn };
            let smsSendLog = new SmsSendLog_1.SmsSendLog().initialize(msisdn, requestPayload, SmsProviders_1.SmsProviders.TWILIO);
            const connection = yield (0, db_1.getFreshConnection)();
            const smsSendLogRepo = connection.getRepository(SmsSendLog_1.SmsSendLog);
            smsSendLog = yield smsSendLogRepo.save(smsSendLog);
            try {
                const response = yield client.messages.create(requestPayload);
                yield smsSendLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: response,
                    sentSuccessfully: response.status === 'sent' || response.status === 'queued'
                })
                    .where({
                    id: smsSendLog.id
                })
                    .execute();
                return response.status === 'sent' || response.status === 'queued';
            }
            catch (e) {
                yield smsSendLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: {},
                    sentSuccessfully: false,
                    httpRequestErrorMessage: e.message,
                })
                    .where({ id: smsSendLog.id })
                    .execute();
                return false;
            }
        });
    }
}
exports.TwilioSmsService = TwilioSmsService;
//# sourceMappingURL=TwilioSmsService.js.map