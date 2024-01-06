import PhoneNumber from "awesome-phonenumber";
import bcrypt from "bcrypt";

import { Body, Post, Put, Request, Route, Security, Tags } from "tsoa";
import { ProductionEnv } from "../constants";
import { getFreshConnection } from "../db";
import { IPasswordLoginRequestDto } from "../dto/IPasswordRequestDto";
import { LoginWithPhone, LoginWithPhoneOtpVerify } from "../dto/LoginWithPhone";
import { PhoneVerification } from "../entity/PhoneVerification";
import { PushNotificationToken } from "../entity/PushNotificationToken";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import { IAccessTokenData } from "../interfaces/IAccessTokenData";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OtpMailInfo } from "../interfaces/OtpMailInfo";
import * as DeveloperService from '../services/developerService';
import * as EmailService from "../services/emailService";
import * as PhoneVerificationService from "../services/phoneVerificationService";
import * as TokenService from "../services/tokenService";
import * as Utils from "../utils/core";
import { BadRequestError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";

// DO NOT EXPORT DEFAULT

@Route("api/access")
@Tags("Access")
export class AccessController {
  @Post('/login/password')
  public async loginWithPassword(@Body() reqBody: IPasswordLoginRequestDto): Promise<IServerResponse<IAccessTokenData>> {
    let { phoneNumber } = reqBody;
    const { password } = reqBody;

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    const warehouseRepo = connection.getRepository(WareHouse);

    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }

    const existingUser = await userRepo.findOne({phoneNumber})

    if (!existingUser) {
      throw new BadRequestError(
        "The phone number does NOT belong to a VALID cinderbuild user."
      );
    }

    const match = await bcrypt.compare(password, existingUser.passwordHash);
    if (!match) {
      throw new UnauthorizedRequestError("User credentials are wrong.");
    }
    let isWarehouseUser;
    if(existingUser.wareHouseId){
      isWarehouseUser =  await warehouseRepo.findOne({id: existingUser.wareHouseId})
    }
    let isDeveloperAccountApprovedAndConfirm ;
    if( existingUser.isDeveloper){
      isDeveloperAccountApprovedAndConfirm =  await DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
    }
        const tokenData = await TokenService.getAccessToken(existingUser, isWarehouseUser, isDeveloperAccountApprovedAndConfirm);

    const resData: IServerResponse<IAccessTokenData> = {
      status: true,
      data: tokenData,
    };
    return resData;
  }

  @Post('/login/phonenumber')
  public async loginWithPhone(@Body() reqBody: LoginWithPhone): Promise<IServerResponse<{phoneVerificationOtp?: string }>> {
    const { countryIso2 } = reqBody
    let { phoneNumber } = reqBody
    
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }

    const supportedCountry = await Utils.getSupportedCountryFromIso2(countryIso2)
    
    const msisdn = new PhoneNumber(phoneNumber, supportedCountry.iso2).getNumber()

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const existingUser = await userRepo.findOne({
      msisdn,
    })

    if(!existingUser) {
      throw new BadRequestError('The phone number does NOT belong to a VALID Cinderbuild User.')
    }
    
    const otp = Utils.generateOtp(4)

    await PhoneVerificationService.sendPhoneVerificationOtp(
      phoneNumber, msisdn, otp);
    // send mail to support about the OTP 
    const userMailInfo: OtpMailInfo = {
      firstName: existingUser.firstName,
      email: existingUser.emailAddress!,
      otp
    }
    await EmailService.sendCustomerForgetPasswordOtp(userMailInfo)
  
    const dataInResponse = {
      phoneVerificationOtp: process.env.NODE_ENV !== ProductionEnv ? otp : ''
    }

    const resData = {
      status: true,
      data: dataInResponse
    }
    return resData
  }


  @Post('/login/phonenumber/verify/otp')
  public async verifyPhoneForLogin(@Body() reqBody: LoginWithPhoneOtpVerify): Promise<IServerResponse<IAccessTokenData>> {
    const { countryIso2, otp } = reqBody
    let { phoneNumber } = reqBody

    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }

    const supportedCountry = await Utils.getSupportedCountryFromIso2(countryIso2)
    
    const msisdn = new PhoneNumber(phoneNumber, supportedCountry.iso2).getNumber()

    const connection = await getFreshConnection()

    const phoneVerificationRepo = connection.getRepository(PhoneVerification);
    const checkPhoneVerifyCode = await phoneVerificationRepo.findOne({
      phoneNumber,
      verificationCode: otp,
      isVerified: false,
    });

    if (!checkPhoneVerifyCode) {
      throw new UnauthorizedRequestError('Phone verification failed.')
    }

    await phoneVerificationRepo
      .createQueryBuilder()
      .update(PhoneVerification)
      .set({ isVerified: true })
      .where({ id: checkPhoneVerifyCode.id })
      .execute();


    const userRepo = connection.getRepository(User)
    const warehouseRepo = connection.getRepository(WareHouse)

    const existingUser = await userRepo.findOne({msisdn})
    if(!existingUser) {
      throw new UnprocessableEntityError('The phone number does NOT belong to a valid CinderBuild customer')
    }

    let isWarehouseUser;
    if(existingUser.wareHouseId){
      isWarehouseUser =  await warehouseRepo.findOne({id: existingUser.wareHouseId})
    }

    let isDeveloperAccountApprovedAndConfirm ;
    if( existingUser.isDeveloper){
      isDeveloperAccountApprovedAndConfirm =  await DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
    }

    const tokenData = await TokenService.getAccessToken(existingUser, undefined, isDeveloperAccountApprovedAndConfirm);

    const resData: IServerResponse<IAccessTokenData> = {
      status: !!tokenData,
      data: tokenData
    }
    return resData
  }

  @Put("/logout")
  @Security("jwt")
  public async handleLogout(
    @Request() req: any
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection()
    const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken)
    await pushNotificationTokenRepo.delete({userId: currentUser.id})

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }
  @Post('/super')
  public async loginWithAdminAcccess(@Body() reqBody: IPasswordLoginRequestDto): Promise<IServerResponse<IAccessTokenData>> {
    let { phoneNumber } = reqBody;
    const { password } = reqBody;

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }

    const existingUser = await userRepo.findOne({phoneNumber})

    if (!existingUser) {
      throw new BadRequestError(
        "The phone number does NOT belong to a VALID cinderbuild user."
      );
    }

    if(existingUser.adminCanEdit === false && existingUser.adminCanView === false){
      throw new UnauthorizedRequestError(
        "Access Denied"
      );
    }

    const match = await bcrypt.compare(password, existingUser.passwordHash);
    if (!match) {
      throw new UnauthorizedRequestError("User credentials are wrong.");
    }

    let isDeveloperAccountApprovedAndConfirm ;
    if( existingUser.isDeveloper){
      isDeveloperAccountApprovedAndConfirm =  await DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(existingUser.id);
    }
   
    const tokenData = await TokenService.getAccessToken(existingUser, undefined, isDeveloperAccountApprovedAndConfirm);

    const resData: IServerResponse<IAccessTokenData> = {
      status: true,
      data: tokenData,
    };
    return resData;
  }

}
