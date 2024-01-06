import { getFreshConnection } from '../../db';
import { SmsSendLog } from '../../entity/SmsSendLog';
import { SmsProviders } from '../../enums/SmsProviders';
import { ISmsService } from './ISmsService';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AfricasTalking = require('africastalking');

export class AfricasTalkingSmsService implements ISmsService {
  async sendSms(msisdn: string, smsContent: string): Promise<boolean> {
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

    let smsSendLog = new SmsSendLog().initialize(msisdn, options, SmsProviders.AFRICASTALKING);

    const connection = await getFreshConnection();
    const smsSendLogRepo = connection.getRepository(SmsSendLog);

    smsSendLog = await smsSendLogRepo.save(smsSendLog);
    try {
      const response = await sms.send(options);
      const isSuccessful = response.SMSMessageData.Recipients[0].status === 'Success';
      await smsSendLogRepo
        .createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: response,
          sentSuccessfully: isSuccessful,
        })
        .where({
          id: smsSendLog.id,
        })
        .execute();
      return isSuccessful;
    } catch (e) {
      await smsSendLogRepo
        .createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: {},
          sentSuccessfully: false,
          httpRequestErrorMessage: e.message,
        })
        .where({ id: smsSendLog.id })
        .execute();
      return false;
    }
  }
}
