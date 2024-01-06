import { SmsSendLog } from "../../entity/SmsSendLog"
import axios, { AxiosResponse } from 'axios'
import { ISmsService } from "./ISmsService";

import logger from '../../logger'
import { SmsProviders } from "../../enums/SmsProviders"
import { handleAxiosRequestError } from "../../utils/core"
import { getFreshConnection } from "../../db";


export class MultiTexterSmsService implements ISmsService {

  async sendSms(msisdn: string, smsContent: string): Promise<boolean> {
    const multiTexterRequetPayload = {
      message: smsContent,
      sender_name: 'CinderBuild',
      recipients: msisdn
    }
    let smsSendLog = new SmsSendLog().initialize(msisdn, multiTexterRequetPayload, SmsProviders.MULTITEXTER)

    const connection = await getFreshConnection()
    const smsSendLogRepo = connection.getRepository(SmsSendLog)
  
    smsSendLog = await smsSendLogRepo.save(smsSendLog)
  
    const multiTexterApiKey = process.env.MULTITEXTER_API_KEY
    const headers = {
      'Authorization': `Bearer ${multiTexterApiKey}`,
    }
  
    const baseURL = `https://app.multitexter.com/v2/app/sendsms`
    try {
      const response: AxiosResponse<any> = await axios.post(baseURL, multiTexterRequetPayload, { headers })
      const {data} = response
      
      await smsSendLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: data,
          sentSuccessfully: data.status === 1
        })
        .where({
          id: smsSendLog.id
        })
        .execute()
  
      return data.status === 1
    } catch(e) {  
      const errorMessage = handleAxiosRequestError(e)  
      await smsSendLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: {},
          sentSuccessfully: false,
          httpRequestErrorMessage: e.message || errorMessage,
        })
        .where({
          id: smsSendLog.id
        })
        .execute()
  
      return false
    }
  }
}
