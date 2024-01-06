import { Twilio } from "twilio";
import { SmsSendLog } from "../../entity/SmsSendLog"
import { ISmsService } from "./ISmsService";

import logger from '../../logger'
import { SmsProviders } from "../../enums/SmsProviders"
import { getFreshConnection } from "../../db";


export class TwilioSmsService implements ISmsService {

  async sendSms(msisdn: string, smsContent: string): Promise<boolean> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    const client = new Twilio(accountSid!, authToken!);

    const requestPayload = { body: smsContent, from: '+19803325592', to: msisdn }
    
    let smsSendLog = new SmsSendLog().initialize(msisdn, requestPayload, SmsProviders.TWILIO)

    const connection = await getFreshConnection()
    const smsSendLogRepo = connection.getRepository(SmsSendLog)
  
    smsSendLog = await smsSendLogRepo.save(smsSendLog)
    
    try {
      const response: any = await client.messages.create(requestPayload)
      
      await smsSendLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: response,
          sentSuccessfully: response.status === 'sent' || response.status === 'queued'
        })
        .where({
          id: smsSendLog.id
        })
        .execute()
  
      return response.status === 'sent' || response.status === 'queued'
    } catch(e) {
      await smsSendLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: {},
          sentSuccessfully: false,
          httpRequestErrorMessage: e.message,
        })
        .where({ id: smsSendLog.id })
        .execute()
  
      return false
    }
  }
}
