import PhoneNumber from "awesome-phonenumber";
import { Body, Controller, Post, Put, Request, Route, Security, Tags } from "tsoa";
import { getRepository } from "typeorm";
import { ProductionEnv } from "../constants";
import { getFreshConnection } from "../db";
import AccessRequestDto from "../dto/AccessRequestDto";
import BusinessInfoRequestDto from "../dto/BusinessInfoRequestDto";
import { NewCooperateUserSignupDto } from "../dto/NewCooperateUserSignupDto";
import { NewMortageInvestorSignup } from "../dto/NewMortageInvestorSignup";
import { NewMortageUserSignupDto } from "../dto/NewMortageUserSignupDto";
import { NewUserRequestDto } from "../dto/NewUserRequestDto";
import { AccessRequest } from "../entity/AccessRequest";
import { Business } from "../entity/Business";
import { PhoneVerification } from "../entity/PhoneVerification";
import { SupportedCountry } from "../entity/SupportedCountry";
import { TempUser } from "../entity/TempUser";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import DeveloperAccountActivationType from "../enums/DeveloperAccountActivationType";
import { Roles } from "../enums/Roles";
import { IAccessTokenData } from "../interfaces/IAccessTokenData";
import { IPhoneVerification } from "../interfaces/IPhoneVerification";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OtpMailInfo } from "../interfaces/OtpMailInfo";
import CountriesStates from "../resources/countries+states.json";
import * as EmailService from "../services/emailService";
import * as miscService from "../services/miscService";
import * as OnboardingService from "../services/onboardingService";
import * as PhoneVerificationService from "../services/phoneVerificationService";
import * as signupService from "../services/signupService";
import * as TokenService from "../services/tokenService";
import * as Utils from "../utils/core";
import { BadRequestError, ConflictError, NotFoundError, UnprocessableEntityError } from '../utils/error-response-types';


@Route("api/onboarding")
@Tags("Onboarding")
export class OnboardingController extends Controller {

  @Post("/signup")
  public async handleFirstStageSignup(
    @Body() requestBody: NewUserRequestDto
  ): Promise<IServerResponse<{ verificationCode?: string | null }>> {
    const { phoneNumber, countryLongName, emailAddress, findUsOption } = requestBody;

    if(findUsOption){
      await miscService.handlefindUsProcesses(findUsOption)
    }

    const connection = await getFreshConnection();
    const supportedCountriesRepo = connection.getRepository(SupportedCountry);
    const supportedCountries = await supportedCountriesRepo.find({});

    const foundCountry = supportedCountries.find(
      (supportedCountry) => supportedCountry.name === countryLongName
    );
    if (!foundCountry) {
      throw new BadRequestError(
        `${countryLongName} is NOT supported at this time`
      );
    }
    //--
    const msisdn = new PhoneNumber(phoneNumber, foundCountry.iso2).getNumber();

    const newUserRepo = getRepository(TempUser);
    const potentialTempUser = await newUserRepo.findOne({
      msisdn,
    });

    if (potentialTempUser) {
      // reset the otp if the otp has not been used
      const resendVerificationCode = await signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser)
      if(resendVerificationCode){
        const resData: IServerResponse<{ verificationCode?: string }> = {
          status: true,
          data: {
            verificationCode:
              process.env.NODE_ENV !== ProductionEnv ? resendVerificationCode : undefined,
          },
        };
        this.setStatus(201);
        return resData;
      }

    }

    const tempUserEmail = await newUserRepo.findOne({
      emailAddress,
    });

    if (tempUserEmail) {
      throw new UnprocessableEntityError("Email Address has already been Used")
      // const resData: IServerResponse<any> = {
      //   status: false,
      //   message: "Email Address has already been Used",
      // };
      // return resData;
    }


    if(requestBody.defaultSellerUniqueCode) {
      const userRepo = getRepository(User);
      const defaultSellerUser = await userRepo.findOne({
        uniqueCode: requestBody.defaultSellerUniqueCode,
      });
      if(!defaultSellerUser) {
        throw new NotFoundError('The specified default seller does not exist')
      }
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

    const passwordHash = await Utils.generatePasswordHash(requestBody.password);

    const tempUser = new TempUser().initialize(
      requestBody,
      msisdn,
      foundCountry.iso2,
      passwordHash, requestBody.role ?? Roles.NORMAL_USER,
      requestBody.defaultSellerUniqueCode ?? undefined
    );
    await newUserRepo.save(tempUser);

    const resData: IServerResponse<{ verificationCode?: string }> = {
      status: true,
      data: {
        verificationCode:
          process.env.NODE_ENV !== ProductionEnv ? phoneVerifyCode : undefined,
      },
    };

    this.setStatus(201);
    return resData;
  }

  @Post("/signup/cooperate")
  public async handleCooperateSignup(
    @Body() requestBody: NewCooperateUserSignupDto
  ): Promise<IServerResponse<{ verificationCode?: string | null }>> {
    const { phoneNumber, countryLongName, emailAddress, findUsOption } = requestBody;

    if(findUsOption){
      await miscService.handlefindUsProcesses(findUsOption)
    }

    const connection = await getFreshConnection();
    const supportedCountriesRepo = connection.getRepository(SupportedCountry);
    const supportedCountries = await supportedCountriesRepo.find({});

    const foundCountry = supportedCountries.find(
      (supportedCountry) => supportedCountry.name === countryLongName
    );
    if (!foundCountry) {
      throw new BadRequestError(
        `${countryLongName} is NOT supported at this time`
      );
    }
    //--
    const msisdn = new PhoneNumber(phoneNumber, foundCountry.iso2).getNumber();

    const newUserRepo = getRepository(TempUser);
    const potentialTempUser = await newUserRepo.findOne({
      msisdn,
    });

    if (potentialTempUser) {
      // reset the otp if the otp has not been used
      const resendVerificationCode = await signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser)
      if(resendVerificationCode){
        const resData: IServerResponse<{ verificationCode?: string }> = {
          status: true,
          data: {
            verificationCode:
              process.env.NODE_ENV !== ProductionEnv ? resendVerificationCode : undefined,
          },
        };
        this.setStatus(201);
        return resData;
      }

    }

    const tempUserEmail = await newUserRepo.findOne({
      emailAddress,
    });

    if (tempUserEmail) {
      throw new UnprocessableEntityError("Email Address has already been Used")
      // const resData: IServerResponse<any> = {
      //   status: false,
      //   message: "Email Address has already been Used",
      // };
      // return resData;
    }


    if(requestBody.defaultSellerUniqueCode) {
      const userRepo = getRepository(User);
      const defaultSellerUser = await userRepo.findOne({
        uniqueCode: requestBody.defaultSellerUniqueCode,
      });
      if(!defaultSellerUser) {
        throw new NotFoundError('The specified default seller does not exist')
      }
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

    const passwordHash = await Utils.generatePasswordHash(requestBody.password);

    const tempUser = new TempUser().initializeCooperateUser(
      requestBody,
      msisdn,
      foundCountry.iso2,
      passwordHash, requestBody.role ?? Roles.NORMAL_USER,
      requestBody.defaultSellerUniqueCode ?? undefined
    );
    await newUserRepo.save(tempUser);

    const resData: IServerResponse<{ verificationCode?: string }> = {
      status: true,
      data: {
        verificationCode:
          process.env.NODE_ENV !== ProductionEnv ? phoneVerifyCode : undefined,
      },
    };

    this.setStatus(201);
    return resData;
  }

  @Post("/signup/mortgage")
  public async handleMortageSignup(
    @Body() requestBody: NewMortageUserSignupDto
  ): Promise<IServerResponse<{ verificationCode?: string | null }>> {
    const { phoneNumber, countryLongName, emailAddress, role, findUsOption } = requestBody;

    if(findUsOption){
      await miscService.handlefindUsProcesses(findUsOption)
    }

    if(![Roles.DEVELOPER].includes(role)){
        throw new UnprocessableEntityError('Wrong Mortgage Role Selected')
    }
    const connection = await getFreshConnection();
    const supportedCountriesRepo = connection.getRepository(SupportedCountry);
    const supportedCountries = await supportedCountriesRepo.find({});

    const foundCountry = supportedCountries.find(
      (supportedCountry) => supportedCountry.name === countryLongName
    );
    if (!foundCountry) {
      throw new BadRequestError(
        `${countryLongName} is NOT supported at this time`
      );
    }
    //--
    const msisdn = new PhoneNumber(phoneNumber, foundCountry.iso2).getNumber();

    const newUserRepo = getRepository(TempUser);
    const potentialTempUser = await newUserRepo.findOne({
      msisdn,
    });

    if (potentialTempUser) {
      // reset the otp if the otp has not been used
      const resendVerificationCode = await signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser)
      if(resendVerificationCode){
        const resData: IServerResponse<{ verificationCode?: string }> = {
          status: true,
          data: {
            verificationCode:
              process.env.NODE_ENV !== ProductionEnv ? resendVerificationCode : undefined,
          },
        };
        this.setStatus(201);
        return resData;
      }

    }

    const tempUserEmail = await newUserRepo.findOne({
      emailAddress,
    });

    if (tempUserEmail) {
      throw new UnprocessableEntityError("Email Address has already been Used")
      // const resData: IServerResponse<any> = {
      //   status: false,
      //   message: "Email Address has already been Used",
      // };
      // return resData;
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

    const passwordHash = await Utils.generatePasswordHash(requestBody.password);

    const tempUser = new TempUser().initializeMortageDeveloperUser(
      requestBody,
      msisdn,
      foundCountry.iso2,
      passwordHash,
    );
    await newUserRepo.save(tempUser);

    const resData: IServerResponse<{ verificationCode?: string }> = {
      status: true,
      data: {
        verificationCode:
          process.env.NODE_ENV !== ProductionEnv ? phoneVerifyCode : undefined,
      },
    };

    this.setStatus(201);
    return resData;
  }


  @Post("/signup/mortgageinvestor")
  public async handleMortageInvestorSignup(
    @Body() requestBody: NewMortageInvestorSignup
  ): Promise<IServerResponse<{ verificationCode?: string | null }>> {
    const { phoneNumber, countryLongName, emailAddress, role } = requestBody;

  

    if(![Roles.INVESTOR].includes(role)){
        throw new UnprocessableEntityError('Wrong Mortgage Role Selected')
    }
    const connection = await getFreshConnection();
    const supportedCountriesRepo = connection.getRepository(SupportedCountry);
    const supportedCountries = await supportedCountriesRepo.find({});

    const foundCountry = supportedCountries.find(
      (supportedCountry) => supportedCountry.name === countryLongName
    );
    if (!foundCountry) {
      throw new BadRequestError(
        `${countryLongName} is NOT supported at this time`
      );
    }
    //--
    const msisdn = new PhoneNumber(phoneNumber, foundCountry.iso2).getNumber();

    const newUserRepo = getRepository(TempUser);
    const potentialTempUser = await newUserRepo.findOne({
      msisdn,
    });

    if (potentialTempUser) {
      // reset the otp if the otp has not been used
      const resendVerificationCode = await signupService.resentOptForUnverifedPhoneNumber(msisdn, requestBody, potentialTempUser)
      if(resendVerificationCode){
        const resData: IServerResponse<{ verificationCode?: string }> = {
          status: true,
          data: {
            verificationCode:
              process.env.NODE_ENV !== ProductionEnv ? resendVerificationCode : undefined,
          },
        };
        this.setStatus(201);
        return resData;
      }

    }

    const tempUserEmail = await newUserRepo.findOne({
      emailAddress,
    });

    if (tempUserEmail) {
      throw new UnprocessableEntityError("Email Address has already been Used")
      // const resData: IServerResponse<any> = {
      //   status: false,
      //   message: "Email Address has already been Used",
      // };
      // return resData;
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

    const passwordHash = await Utils.generatePasswordHash(requestBody.password);

    const tempUser = new TempUser().initializeMortageInvestorUser(
      requestBody,
      msisdn,
      foundCountry.iso2,
      passwordHash,
    );
    await newUserRepo.save(tempUser);

    const resData: IServerResponse<{ verificationCode?: string }> = {
      status: true,
      data: {
        verificationCode:
          process.env.NODE_ENV !== ProductionEnv ? phoneVerifyCode : undefined,
      },
    };

    this.setStatus(201);
    return resData;
  }



  @Post("/verify")
  public async verifyTempUser(@Body() requestBody: IPhoneVerification): Promise<IServerResponse<IAccessTokenData>> {
    const phoneVerify = requestBody;

    const phoneVerificationRepository = getRepository(PhoneVerification);
    const checkPhoneVerifyCode = await phoneVerificationRepository.findOne({
      phoneNumber: phoneVerify.phoneNumber,
      verificationCode: phoneVerify.verificationCode,
      isVerified: false,
    });

    if (!checkPhoneVerifyCode) {
      const resData: IServerResponse<any> = {
        status: false,
        message: "Wrong verification code",
      };
      return resData;
    }

    const tempUserRepository = getRepository(TempUser);
    const warehouseRepo = getRepository(WareHouse)
    const tempUserExist = await tempUserRepository.findOne({
      phoneNumber: phoneVerify.phoneNumber,
    });
    if (!tempUserExist) {
      const resData: IServerResponse<any> = {
        status: false,
        message: "Temp User Does not Exist ",
      };
      return resData;
    }
    const msisdn = new PhoneNumber(
      tempUserExist.phoneNumber,
      tempUserExist.countryIso2
    ).getNumber();

    const foundCountry = CountriesStates.find(
      (countryItem) => countryItem.iso2 === tempUserExist.countryIso2
    );

    const savedUser: User = await OnboardingService.saveNewUser(tempUserExist, msisdn, foundCountry!.name, checkPhoneVerifyCode)
    
    let isWarehouseUser;
    if(savedUser.wareHouseId){
      isWarehouseUser =  await warehouseRepo.findOne({id: savedUser.wareHouseId})
    }

    const tokenData = await TokenService.getAccessToken(savedUser, isWarehouseUser, DeveloperAccountActivationType.inactive);

    const resData: IServerResponse<IAccessTokenData> = {
      status: true,
      data: tokenData,
      message: "Account Creation Was Successful, Proceed to Login",
    };
    return resData;
  }

  @Put("/businessinfo")
  @Security("jwt")
  public async processBusinessInfo(@Request() req: any, @Body() requestBody: BusinessInfoRequestDto): Promise<IServerResponse<void>> {
    const { businessName, businessAddress, cacNumber } = requestBody;
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const businessRepo = connection.getRepository(Business);
    const existingBusiness = await businessRepo.findOne({
      userId: currentUser.id,
    });
    if (existingBusiness) {
      throw new ConflictError("You already have a business record");
    }

    const business = new Business().initialize(
      currentUser.id,
      businessName,
      businessAddress,
      cacNumber
    );
    await businessRepo.save(business);

    if (!currentUser.isSeller) {
      const userRepo = connection.getRepository(User);

      await userRepo
        .createQueryBuilder()
        .update(User)
        .set({ isSeller: true })
        .where({ id: currentUser.id })
        .execute();
    }

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Post("/accessrequest")
  public async processAccessRequest(
    @Request() req: any,
    @Body() requestBody: AccessRequestDto): Promise<IServerResponse<void>> {
    const { isSeller, businessName, businessLocationCountry, businessLocationState, applicantName, applicantRole, applicantEmail,
      applicantPhone, weeklyTurnOver, enquiries } = requestBody;
    const connection = await getFreshConnection();

    const accessRequestRepo = connection.getRepository(AccessRequest);
    const newAccessRequest = new AccessRequest().initialize(
      isSeller, businessName, businessLocationCountry, businessLocationState, applicantName,
      applicantRole, applicantEmail, applicantPhone,
      weeklyTurnOver, enquiries);
    await accessRequestRepo.save(newAccessRequest);

      const resData: IServerResponse<void> = {
        status: true,
      };
      this.setStatus(201);
    return resData;
  }
}
