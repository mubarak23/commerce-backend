import { SmsSendLog } from '../../entity/SmsSendLog'
import axios, { AxiosResponse } from 'axios'
import {IWhatsAppService} from './IWhatsAppService'
import { SmsProviders } from '../../enums/SmsProviders'
import { handleAxiosRequestError } from "../../utils/core"
import { getFreshConnection } from "../../db";


export class SendChampMessageService implements IWhatsAppService {

  async sendOtpMessage(msisdn: string, otp: string): Promise<boolean> {
    const sendchampRequetPayload = {
      channel : 'whatsapp',
      sender: process.env.SENDCHAMP_SENDER,
      token_type: 'numeric',
      token_length: 4,
      expiration_time: 30,
      customer_mobile_number: msisdn,
      token: otp
    }

    let whatsAppMessageLog = new SmsSendLog().initialize(msisdn, sendchampRequetPayload, SmsProviders.SENDCHAMP)

    const connection = await getFreshConnection()
    const whatsAppMessageLogRepo = connection.getRepository(SmsSendLog)
      
    whatsAppMessageLog = await whatsAppMessageLogRepo.save(whatsAppMessageLog)
    const sendChampApiKey = process.env.SENDCHAMP_API_KEY
    const headers = {
      'Authorization': `Bearer ${sendChampApiKey}`,
    }

    const baseURL = `https://api.sendchamp.com/api/v1/verification/create`

    try {
      const response: AxiosResponse<any> = await axios.post(baseURL, sendchampRequetPayload, { headers })
      const {data} = response
      
      await whatsAppMessageLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: data,
          sentSuccessfully: data.data.status === 'sent',
        })
        .where({
          id: whatsAppMessageLog.id
        })
        .execute()

      return true
    } catch(e) {
      const errorMessage = handleAxiosRequestError(e)  
      await whatsAppMessageLogRepo.createQueryBuilder()
        .update(SmsSendLog)
        .set({
          responseJson: e,
          sentSuccessfully: false,
          httpRequestErrorMessage: e.message || errorMessage,
        })
        .where({
          id: whatsAppMessageLog.id
        })
        .execute()

      return false
    }
  }
}
