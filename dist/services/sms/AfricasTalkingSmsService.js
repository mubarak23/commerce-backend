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
exports.AfricasTalkingSmsService = void 0;
const db_1 = require("../../db");
const SmsSendLog_1 = require("../../entity/SmsSendLog");
const SmsProviders_1 = require("../../enums/SmsProviders");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AfricasTalking = require('africastalking');
class AfricasTalkingSmsService {
    sendSms(msisdn, smsContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.AFRICASTALKING_API_KEY;
            const username = process.env.AFRICASTALKING_USERNAME;
            const senderId = process.env.AFRICASTALKING_SENDER_ID;
            const africasTalking = AfricasTalking({ apiKey, username });
            const options = {
                to: msisdn,
                message: smsContent,
                from: senderId,
            };
            const sms = africasTalking.SMS;
            let smsSendLog = new SmsSendLog_1.SmsSendLog().initialize(msisdn, options, SmsProviders_1.SmsProviders.AFRICASTALKING);
            const connection = yield (0, db_1.getFreshConnection)();
            const smsSendLogRepo = connection.getRepository(SmsSendLog_1.SmsSendLog);
            smsSendLog = yield smsSendLogRepo.save(smsSendLog);
            try {
                const response = yield sms.send(options);
                const isSuccessful = response.SMSMessageData.Recipients[0].status === 'Success';
                yield smsSendLogRepo
                    .createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: response,
                    sentSuccessfully: isSuccessful,
                })
                    .where({
                    id: smsSendLog.id,
                })
                    .execute();
                return isSuccessful;
            }
            catch (e) {
                yield smsSendLogRepo
                    .createQueryBuilder()
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
exports.AfricasTalkingSmsService = AfricasTalkingSmsService;
//# sourceMappingURL=AfricasTalkingSmsService.js.map