
export interface ISmsService {
  sendSms(msisdn: string, smsContent: string): Promise<boolean>
}
