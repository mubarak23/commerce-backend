export interface IWhatsAppService {
  sendOtpMessage(msisdn: string, otp: string): Promise<boolean>
}
