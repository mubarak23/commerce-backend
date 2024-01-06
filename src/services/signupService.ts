/* eslint-disable @typescript-eslint/no-var-requires */
import { getRepository, Like, Not, Repository } from "typeorm"
import { NewUserRequestDto } from "../dto/NewUserRequestDto";
import { PhoneVerification } from "../entity/PhoneVerification";
import * as Utils from "../utils/core"
import { TempUser } from "../entity/TempUser";
import { User } from "../entity/User"
import * as PhoneVerificationService from '../services/phoneVerificationService';
import * as EmailService from '../services/emailService';
import { OtpMailInfo } from "../interfaces/OtpMailInfo";
import { UnprocessableEntityError } from "../utils/error-response-types";
import { Roles } from "../enums/Roles";
const randomstring = require("randomstring");


export const generateNewSellerCode = async (userRepoT: Repository<User>, user: User) => {
  let potentialUniqueCode = randomstring.generate({
    length: 7,
    charset: 'alphabetic'
  });

  const existingUsersWithCodeNumber = await userRepoT.count({
    where: {
      id: Not(user.id),
      uniqueCode: Like(`${potentialUniqueCode}%`)
    },
    order: { createdAt: 'DESC' }
  })
  
  if(existingUsersWithCodeNumber > 0) {
    potentialUniqueCode += `${existingUsersWithCodeNumber}`
  }

  return potentialUniqueCode
}

export const resentOptForUnverifedPhoneNumber = async (msisdn: string,requestBody: NewUserRequestDto, tempUser: TempUser) => {
  const { phoneNumber } = requestBody
  const newUserRepo = getRepository(TempUser);
  const verifiedUserRepo = getRepository(User)
  const PhoneVerificationRepo = getRepository(PhoneVerification) 
  const cinderbuildUser = await verifiedUserRepo.findOne({ msisdn })
  if(cinderbuildUser){
    throw new UnprocessableEntityError('Phone Number Has Been Registered, Please Procced to Login')
  }

  const passwordHash = await Utils.generatePasswordHash(requestBody.password);

  await newUserRepo.createQueryBuilder()
    .update(TempUser)
    .set({msisdn, emailAddress: requestBody.emailAddress, 
      firstName: requestBody.firstName, lastName: requestBody.lastName,
      phoneNumber: requestBody.phoneNumber,
      role: requestBody.role ?? Roles.NORMAL_USER,
      passwordHash,
      defaultSellerUniqueCode: requestBody.defaultSellerUniqueCode ?? undefined
    })
    .where({ id: tempUser.id })
    .execute()

  const tempVerificationCode = await PhoneVerificationRepo.findOne({
    msisdn
  })

  if(tempVerificationCode ){
    await PhoneVerificationRepo.createQueryBuilder()
      .update(PhoneVerification)
      .set({isVerified: false })
      .where({ id: tempVerificationCode.id })
      .execute()

    await PhoneVerificationService.sendPhoneVerificationOtp(phoneNumber, msisdn, tempVerificationCode.verificationCode );

    const userMailInfo: OtpMailInfo = {
      email: requestBody.emailAddress,
      firstName: requestBody.firstName,
      otp: tempVerificationCode.verificationCode
    }

    await EmailService.sendCustomerOtp(userMailInfo)

    return tempVerificationCode.verificationCode
  }

  const phoneVerifyCode = Utils.generateOtp(4);
  const newVerificationCode = new PhoneVerification().initialize(
    phoneNumber,
    msisdn,
    phoneVerifyCode
  );
  await newVerificationCode.save();

  await PhoneVerificationService.sendPhoneVerificationOtp(phoneNumber, msisdn, phoneVerifyCode );

  const userMailInfo: OtpMailInfo = {
    email: requestBody.emailAddress,
    firstName: requestBody.firstName,
    otp: phoneVerifyCode
  }

  await EmailService.sendCustomerOtp(userMailInfo)

  return phoneVerifyCode
}
