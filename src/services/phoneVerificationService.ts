import { EntityManager } from 'typeorm'
import { PhoneVerification } from '../entity/PhoneVerification'
import * as SmsService from './smsSendingService'
import { getFreshConnection } from '../db'


export const sendPhoneVerificationOtp = async (phoneNumber: string, msisdn: string, 
    otp: string, transactionalEntityManager?: EntityManager): Promise<boolean> => {

  const connection = await getFreshConnection()

  const phoneVerificationRepoT = transactionalEntityManager ? 
    transactionalEntityManager.getRepository(PhoneVerification) :
    connection.getRepository(PhoneVerification)

    await phoneVerificationRepoT.delete({msisdn})

  let phoneVerify = new PhoneVerification().initialize(phoneNumber, msisdn, otp)
  phoneVerify = await phoneVerificationRepoT.save(phoneVerify)

  const smsSentSuccessfully = await SmsService.sendOtp(msisdn, otp)

  await phoneVerificationRepoT.createQueryBuilder()
    .update(PhoneVerification)
    .set({ smsSentSuccessfully })
    .where({ id: phoneVerify.id })
    .execute()
  
  return smsSentSuccessfully
}
