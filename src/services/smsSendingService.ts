/* eslint-disable @typescript-eslint/no-use-before-define */
import PhoneNumber from "awesome-phonenumber";

import { ProductionEnv } from "../constants";
import { getFreshConnection } from "../db";
import { User } from "../entity/User";
import ConfigProperties from "../enums/ConfigProperties";
import logger from "../logger";
import { ServerError } from "../utils/error-response-types";
import { getConfigProperty } from "./configPropertyService";
import { AfricasTalkingSmsService } from "./sms/AfricasTalkingSmsService";
import { ISmsService } from "./sms/ISmsService";
import { MultiTexterSmsService } from "./sms/MultitexterSmsService";
import { TwilioSmsService } from "./sms/TwilioSmsService";
import { SendChampMessageService } from "./whatsapp/SendChampMessageService";


const sendRealSms = async (msisdn: string, smsContent: string): Promise<boolean> => {
  try {
    const regionCode = new PhoneNumber(msisdn).getRegionCode();

    let sentSuccessfully = false;

    const africasTalkingSmsService: ISmsService = new AfricasTalkingSmsService();
    sentSuccessfully = await africasTalkingSmsService.sendSms(msisdn, smsContent);
    if (sentSuccessfully) return sentSuccessfully;
  
    const twilioSmsService: ISmsService = new TwilioSmsService()
    sentSuccessfully = await twilioSmsService.sendSms(msisdn, smsContent)
    if (sentSuccessfully) return sentSuccessfully;
    
    
    if (!sentSuccessfully) {
      if (regionCode && regionCode === 'NG') {
        const multiTexterSmsService: ISmsService = new MultiTexterSmsService()
        sentSuccessfully = await multiTexterSmsService.sendSms(msisdn, smsContent)
      }
    }
    return sentSuccessfully  
  } catch(e) {
    logger.error(`Cannot send sms content: '${smsContent}' to: ${msisdn}`)
  }
  return false
};

export const sendSms = async (msisdn: string, smsContent: string): Promise<boolean> => {
  if (process.env.NODE_ENV !== ProductionEnv) {
    const shouldSendRealSms = await getConfigProperty(
      ConfigProperties.SEND_REAL_SMS
    );

    if (shouldSendRealSms) {
      return sendRealSms(msisdn, smsContent);
    }
    return true;
  }
  return sendRealSms(msisdn, smsContent);
};

export const sendOtp = async (msisdn: string, otp: string): Promise<boolean> => {
  const sendThroughWhatsApp = async () => {
    const sentSuccessfully = await new SendChampMessageService().sendOtpMessage(msisdn, otp)
    if(sentSuccessfully) {
      return sentSuccessfully
    }
    return undefined
  }

  if (process.env.NODE_ENV !== ProductionEnv) {
    const shouldSendRealSms = await getConfigProperty(
      ConfigProperties.SEND_REAL_SMS
    );

    if (shouldSendRealSms) {
      const sentSuccessfully = await sendThroughWhatsApp()
      if(!sentSuccessfully) return sendRealSms(msisdn, `Your CinderBuild OTP number is ${otp}.`);
    }
    return true;
  }

  const sentSuccessfully = await sendThroughWhatsApp()
  if(!sentSuccessfully) return sendRealSms(msisdn, `Your CinderBuild OTP number is ${otp}.`);
  return sentSuccessfully
};

export const sendSmsByUserId = async (userId: number, smsContent: string): Promise<boolean> => {
  const connection = await getFreshConnection();

  const userRepo = await connection.getRepository(User);
  const user = await userRepo.findOne({ id: userId });
  if(!user) {
    throw new ServerError('Could not find user to sms to ...')
  }

  return sendSms(user.msisdn, smsContent);
};

