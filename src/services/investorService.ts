import PhoneNumber from "awesome-phonenumber";
import { getFreshConnection } from "../db";
import { AddInvestorUserDto } from "../dto/AddInvestorUserDto";
import { NewUserRequestDto } from "../dto/NewUserRequestDto";
import { TempUser } from "../entity/TempUser";
import { User } from "../entity/User";
import { Roles } from "../enums/Roles";
import { WelcomeMailData } from "../interfaces/WelcomeMailData";
import supportedCountries from "../seeds/SupportedCountriesSeed";
import * as Utils from '../utils/core';
import * as emailService from './emailService';
import * as OnboardingService from './onboardingService';

export const addinvestor = async (payload: AddInvestorUserDto): Promise<User> => {
  const connection = await getFreshConnection();
  const userRepo = connection.getRepository(User);
  const tempUserRepo = connection.getRepository(TempUser);

  const phoneNumberLine = payload.phoneNumber.substring(1);
  const user = await userRepo.findOne({
    where: { phoneNumber: phoneNumberLine, emailAddress: payload.emailAddress }
  })

  if(user){
    return user;
  }

  let {phoneNumber} = payload;

  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1)
  }
  const awesomePhoneNumber = new PhoneNumber(phoneNumber, "NG")
  const msisdn = awesomePhoneNumber.getNumber()
  const randomNumericPassword = Utils.generateOtp(6);
  const passwordHash = await Utils.generatePasswordHash(randomNumericPassword);
  const countryLongName = 'Nigeria'
  const newInvestorPayload: NewUserRequestDto = {
    firstName: payload.firstName,
  lastName: payload.lastName,
  phoneNumber,
  countryLongName: 'Nigeria',
  emailAddress: payload.emailAddress,
  password: passwordHash,
  role: Roles.INVESTOR,
  }

  const foundCountry = supportedCountries.find(
    (supportedCountry) => supportedCountry.name === countryLongName
  );

  const tempUser = new TempUser().initialize(
    newInvestorPayload,
    msisdn,
    foundCountry.iso2,
    passwordHash,
    Roles.INVESTOR
  );
 const newTempUser =  await tempUserRepo.save(tempUser);


const savedUser: User = await OnboardingService.saveNewUser(newTempUser, msisdn, foundCountry!.name)
    
const newMailData: WelcomeMailData = {
  email: payload.emailAddress,
  firstName: payload.firstName,
  phoneNumber: payload.phoneNumber,
  role: Roles.INVESTOR,
}

await emailService.sendWelcomeMailToCooperateUser(newMailData, randomNumericPassword)
 
  
  return savedUser;
}