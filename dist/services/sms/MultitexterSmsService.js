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
exports.MultiTexterSmsService = void 0;
const SmsSendLog_1 = require("../../entity/SmsSendLog");
const axios_1 = __importDefault(require("axios"));
const SmsProviders_1 = require("../../enums/SmsProviders");
const core_1 = require("../../utils/core");
const db_1 = require("../../db");
class MultiTexterSmsService {
    sendSms(msisdn, smsContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const multiTexterRequetPayload = {
                message: smsContent,
                sender_name: 'CinderBuild',
                recipients: msisdn
            };
            let smsSendLog = new SmsSendLog_1.SmsSendLog().initialize(msisdn, multiTexterRequetPayload, SmsProviders_1.SmsProviders.MULTITEXTER);
            const connection = yield (0, db_1.getFreshConnection)();
            const smsSendLogRepo = connection.getRepository(SmsSendLog_1.SmsSendLog);
            smsSendLog = yield smsSendLogRepo.save(smsSendLog);
            const multiTexterApiKey = process.env.MULTITEXTER_API_KEY;
            const headers = {
                'Authorization': `Bearer ${multiTexterApiKey}`,
            };
            const baseURL = `https://app.multitexter.com/v2/app/sendsms`;
            try {
                const response = yield axios_1.default.post(baseURL, multiTexterRequetPayload, { headers });
                const { data } = response;
                yield smsSendLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: data,
                    sentSuccessfully: data.status === 1
                })
                    .where({
                    id: smsSendLog.id
                })
                    .execute();
                return data.status === 1;
            }
            catch (e) {
                const errorMessage = (0, core_1.handleAxiosRequestError)(e);
                yield smsSendLogRepo.createQueryBuilder()
                    .update(SmsSendLog_1.SmsSendLog)
                    .set({
                    responseJson: {},
                    sentSuccessfully: false,
                    httpRequestErrorMessage: e.message || errorMessage,
                })
                    .where({
                    id: smsSendLog.id
                })
                    .execute();
                return false;
            }
        });
    }
}
exports.MultiTexterSmsService = MultiTexterSmsService;
//# sourceMappingURL=MultitexterSmsService.js.map