import { Get, Request, Route, Tags, Security, Post, Put, Body, Path, Query, Patch } from "tsoa";
import * as _ from 'underscore'
import moment from 'moment'
import bcrypt from 'bcrypt'

import { IServerResponse } from "../interfaces/IServerResponse";
import { NotFoundError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";
import { User } from "../entity/User";
import { ResetForgottenPasswordRequestDto, ResetPasswordRequestDto } from "../dto/ResetPasswordRequestDto";
import { getFreshConnection } from "../db";
import * as ProfileService from "../services/profileService"
import IProfile, { IPublicProfile } from "../dto/IProfileResponse";
import * as PaystackService from '../services/paystackService'
import { IBankInfo } from "../interfaces/IBankInfo";
import { SaveNewBankAccount } from "../dto/BankAccountRequestDto";
import { ISellerDashboardStats } from "../dto/ISellerDashboardStats.dto";
import { SellerDocsUpload } from "../interfaces/sellerDocsUpload";
import { EarningsByYear } from "../entity/EarningsByYear";
import { EarningsByMonth } from "../entity/EarningsByMonth";
import { getRepository, MoreThan } from "typeorm";
import * as AccountStatService from "../services/sellerAccountStatService"
import * as SignupService from "../services/signupService"
import * as Utils from "../utils/core"
import * as WalletService from "../services/walletService"
import * as EmailService from "../services/emailService"
import * as NotificationService from "../services/notificationService"
import { CurrencyToSymbol } from "../enums/Currency";
import { IPaginatedList } from "../dto/IPaginatedList";
import { SortOrder } from "../enums/SortOrder";
import * as PaginationService from "../services/paginationService";
import * as ProductsService from "../services/productsService";
import { LinkBuyerToSellerRequestDto } from "../dto/LinkBuyerToSellerRequestDto";
import { IBuyerInvite } from "../interfaces/IBuyerInvite";
import { Business } from "../entity/Business";
import { IBuyerAccept } from "../interfaces/IBuyerAccept";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransports, NotificationTransportMode } from "../enums/NotificationTransport";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import { sendSms } from "../services/smsSendingService";
import { Product } from "../entity/Product";
import { ProductsResponseDto } from "../dto/ProductsResponseDto";
import { IPublicStore } from "../interfaces/IPublicStore";
import { RequestBankDetailsChange } from "../entity/RequestBankDetailsChange";
import { RequestBankDetailsChangeDto } from "../dto/RequestBankDetailsChangeDto";


// DO NOT EXPORT DEFAULT

@Route("api/profile")
@Tags("Profile")
export class ProfileController {
  @Get("")
  @Security("jwt")
  public async getProfile(@Request() req: any): Promise<IServerResponse<IProfile>> {
    const currentUser: User = req.user;

    const profileData: IProfile = await ProfileService.getSelfProfile(
      currentUser
    );

    const resData: IServerResponse<IProfile> = {
      status: true,
      data: profileData,
    };
    return resData;
  }

  @Patch("")
  @Security("jwt")
  public async updateProfile(@Request() req: any,  @Body() 
  reqBody: {firstName:string, lastName: string}): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const { firstName, lastName} = reqBody
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User) 
    await userRepo
    .createQueryBuilder()
    .update(User)
    .set({ firstName, lastName})
    .where({ id: currentUser.id })
    .execute();

  const resData: IServerResponse<void> = {
    status: true,
  };
  return resData;

  }

  @Get('/public/:phoneNumber')
  public async getPublicProfile(@Request() req: any, 
      @Path('phoneNumber') phoneNumber: string): Promise<IServerResponse<IPublicProfile>> {
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }
    
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const foundUser = await userRepo.findOne({
      phoneNumber
    })

    if(!foundUser) {
      throw new NotFoundError("The user was not found")
    }

    const publicProfile = await ProfileService.getPublicProfile(foundUser)
    
    const resData: IServerResponse<IPublicProfile> = {
      status: true,
      data: publicProfile
    }
    return resData
  }

  @Get("/linkedbuyers")
  @Security("jwt")
  public async getBuyerProfiles(@Request() req: any,
      @Query("pageNumber") pageNumber: any,
      @Query("sortOrder") sortOrder: SortOrder): Promise<IServerResponse<IPaginatedList<IPublicProfile>>> {
    const currentUser: User = req.user;

    const userRepo = getRepository(User)

    const query = {
      defaultSellerUserId: currentUser.id
    }
    const pageSize = 10
    const totalCount = await userRepo.count(query);

    const buyerUsersPage = await PaginationService.paginate(User,
      query, pageSize, pageNumber, sortOrder) as IPaginatedList<User>

    const buyerUserIds = buyerUsersPage.dataset.map(buyerUser => buyerUser.id);

    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(buyerUserIds)

    const resData: IServerResponse<IPaginatedList<IPublicProfile>> = {
      status: true,
      data: { pageNumber, pageSize, dataset: userPublicProfiles, total: totalCount }
    };
    return resData;
  }

  @Get("/bankaccount")
  @Security("jwt")
  public async bankAccountInfo(@Request() req: any): Promise<IServerResponse<IBankInfo>> {
    const currentUser: User = req.user;

    const resData: IServerResponse<IBankInfo> = {
      status: true,
      data: currentUser.bankInfo,
    };
    return resData;
  }

  @Post("/linkedbuyers/invite")
  @Security("jwt")
  public async addBuyerToMyLinkList(@Request() req: any, @Body() reqBody: LinkBuyerToSellerRequestDto): Promise<IServerResponse<void>>{    
    const currentUser: User = req.user
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    const businessRepo = connection.getRepository(Business);
    const domain = Utils.serverDomain()
    
    let {phoneNumber} = reqBody
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }
    const sellerBusinessDetail =  await businessRepo.findOne({ userId: currentUser.id})
    if(!sellerBusinessDetail) {
      throw new NotFoundError('Seller user record was not found')
    }
    const buyerUser = await userRepo.findOne({ phoneNumber})
    const sellerSignupLink = `https://${domain}/register/${currentUser.uniqueCode}`
    if(!buyerUser) {
      const messageBody = [
        `${currentUser.firstName} (${sellerBusinessDetail.name}) would like to add you to their StoreFront as a customer.`,
        ` As a StoreFront customer, You can make purchases and also enjoy Credit facilities and frequent discounts`,
        ` Use the link below to Sign-up on CinderBuild. ${sellerSignupLink}`
      ]
      const body = messageBody.join('')
      await sendSms(reqBody.phoneNumber, body)
      const resData: IServerResponse<void> = {
        status: true,
      };
      return resData;
    }

    if(buyerUser.defaultSellerUserId && buyerUser.defaultSellerUserId === currentUser.id) {
      const resData: IServerResponse<void> = {
        status: true,
      };
      return resData;
    }

    // Send email or sms invite to the buyer with the seller's unique code formatted into a signup/ link
    if(buyerUser.emailAddress) {
      const inviteInforma: IBuyerInvite = {
        buyerEmail: buyerUser.emailAddress,
        buyerFirstName: buyerUser.firstName,
        sellerFirstName: currentUser.firstName,
        sellerUnique: currentUser.uniqueCode,
        sellerBusinessName: sellerBusinessDetail.name
      }
      await EmailService.sendSellerInviteToBuyer(inviteInforma)  
    }
    const sellerInviteLink = `https://${domain}/invite/${currentUser.uniqueCode}`

    const notificationMetadata: NotificationMetadata = { inviteLink: sellerInviteLink }

    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.SMS]: true
    }
  
    await NotificationService.sendSingleNotificationToUserId(buyerUser.id, buyerUser.uuid,
      NotificationMessageTypes.SELLER_INVITE_TO_BUYER, 
      'A Seller Invite You to Join His storefront', 
      `${currentUser.firstName} (${sellerBusinessDetail.name}) would like to add you to their StoreFront as a customer. As a StoreFront customer, You can make purchases and also
       enjoy Credit facilities and frequent discounts. Use the link below to Sign-up on CinderBuild. ${sellerInviteLink} CinderBuild Team.`
     , 
      notificationTransports,notificationMetadata
    )  
    
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Patch("/unlinkbuyer")
  @Security("jwt")
  public async handleUnlinkBuyer(@Request() req: any,  @Query("userUuid") userUuid: string): Promise<IServerResponse<void>>{ 
    const currentUser: User = req.user

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    const buyerToUnlink = await userRepo.findOne({ uuid: userUuid })
    if(!buyerToUnlink) {
      throw new NotFoundError('Buyer user record was not found')
    }

    if(buyerToUnlink.defaultSellerUserId !== currentUser.id){
     const resData: IServerResponse<void> = {
       message: 'You are not allowed to unlink a buyer that does not belong to you',
       status: false,
     };
     return resData;
    }

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ defaultSellerUserId: undefined })
      .where({ id: buyerToUnlink.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
   }

   @Patch("/unlinkseller")
   @Security("jwt")
   public async handleUnlinkSeller(@Request() req: any): Promise<IServerResponse<void>>{      
    const currentUser: User = req.user

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ defaultSellerUserId: undefined })
      .where({ id: currentUser.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Patch("/defaultseller/acceptinvite")
  @Security("jwt")
  public async handleDefaultSellerAcceptInvite(@Request() req: any, 
      @Query("sellerUniqueCode") sellerUniqueCode: string): Promise<IServerResponse<void>>{ 
    const currentUser: User = req.user

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    const seller = await userRepo.findOne({
      isSeller: true, 
      uniqueCode: sellerUniqueCode
    })

    if(!seller){
      const resData: IServerResponse<void> = {
        message: "You are not allowed to join the buyer's list of a seller that does not exist.",
        status: false,
      };
      return resData
    }

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ defaultSellerUserId: seller.id })
      .where({ id: currentUser.id })
      .execute();

    if(seller.emailAddress) {
      const acceptInfo: IBuyerAccept = {
        SellerFirstName: seller.firstName,
        SellerEmail: seller.emailAddress,
        buyerFirstName: currentUser.firstName
      }
      await EmailService.sendBuyerAcceptInvite(acceptInfo)  
    }

    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
    }
    const domain = Utils.serverDomain()
    const inviteLink = `https://${domain}/seller/seller-retailers`
    const notificationMetadata: NotificationMetadata = {
      inviteLink
    }
  
    await NotificationService.sendSingleNotificationToUserId(currentUser.id, currentUser.uuid,
      NotificationMessageTypes.BUYER_ACCEPT_SELLER_INVITE, 
      'A Buyer Has Accepted Your Invite', `${currentUser.firstName} has Accepted Your Invite`, notificationTransports,notificationMetadata
    )

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Put("/bankaccount")
  @Security("jwt")
  public async saveBankAccountInfo(@Request() req: any, @Body() reqBody: SaveNewBankAccount): Promise<IServerResponse<void>> {
    const { accountNumber, bankName, bankCode } = reqBody;
    const currentUser: User = req.user;

    if(currentUser.bankInfo && currentUser.bankInfo.bankAccountNumber) {
      throw new UnprocessableEntityError('The user already bank account information saved!')
    }

    const accountResolveResult = await PaystackService.accountNameEnquiry(
      bankCode,
      accountNumber
    );
    const bankAccountName = accountResolveResult.account_name;
    //--
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        bankInfo: {
          bankCode,
          bankName: bankName || "",
          bankAccountNumber: accountNumber,
          bankAccountName,
        },
      })
      .where({ id: currentUser.id })
      .execute();

    await PaystackService.saveTransferReceipt(
      bankCode,
      accountNumber,
      bankAccountName
    );

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  // Requires that the user first verify his phone number
  // The user will then be given an access code that will allow him
  // set a new password
  @Put("/newpassword")
  @Security("jwt")
  public async handleSetNewPassword(@Request() req: any, @Body() reqBody: ResetForgottenPasswordRequestDto): Promise<IServerResponse<void>> {
    const { newPassword } = reqBody;
    const currentUser: User = req.user;

    const saltRounds = 10;
    const passwordSalt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(newPassword, passwordSalt);

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ passwordHash })
      .where({ id: currentUser.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Put("/resetpassword")
  @Security("jwt")
  public async resetPassword(@Request() req: any, @Body() reqBody: ResetPasswordRequestDto): Promise<IServerResponse<void>> {
    const { oldPassword, newPassword } = reqBody;
    const currentUser: User = req.user;

    const match = await bcrypt.compare(oldPassword, currentUser.passwordHash);
    if (!match) {
      throw new UnauthorizedRequestError("User credentials are wrong.");
    }

    const saltRounds = 10;
    const passwordSalt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(newPassword, passwordSalt);

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ passwordHash })
      .where({ id: currentUser.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get("/seller/statistics")
  @Security("jwt")
  public async handleSellerDashboardStats(@Request() req: any): Promise<IServerResponse<ISellerDashboardStats>> {
    const currentUser: User = req.user;

    if (!currentUser.isSeller) {
      throw new UnauthorizedRequestError(
        "The requested information does not apply to you"
      );
    }

    const aYearAgoMoment = moment.utc().add(-12, "months");

    const connection = await getFreshConnection();
    const earningsByYearRepo = connection.getRepository(EarningsByYear);

    const sellerYearEarnings = await earningsByYearRepo.find({
      userId: currentUser.id,
    });

    const earningbyMonthRepo = connection.getRepository(EarningsByMonth);
    const userMonthEarnings = await earningbyMonthRepo.find({
      userId: currentUser.id,
      createdAt: MoreThan(aYearAgoMoment.toDate()),
    });
    const formattedMonthEarnings = userMonthEarnings.map((earning) => {
      return {
        friendlyMonth: moment(
          moment(`${earning.monthISO8601}-01`).format("YYYY-MM-DD")
        ).format("MMMM"),
        monthISO8601: earning.monthISO8601,
        totalEarningsMajor: earning.totalEarningsMinor / 100,
      };
    });

    const yearEarnings = sellerYearEarnings.map((sellerYearEarning) => {
      return {
        year: sellerYearEarning.year,
        totalEarningsMajor: sellerYearEarning.totalEarningsMinor / 100,
      };
    });

    let totalRevenueMinor = 0;
    for (const yearEarning of sellerYearEarnings) {
      totalRevenueMinor += yearEarning.totalEarningsMinor;
    }
    const totalRevenueMajor = Utils.normalizeMoney(totalRevenueMinor / 100);

    const sellerAccountStats = await AccountStatService.getSellerAccountStats(
      currentUser.id
    );

    const wallet = await WalletService.getCustomerWallet(currentUser.id);
    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[wallet.currency] || "₦";

    const sellerStatistics = {
      totalRevenueMajor,
      totalRevenueCurrency: wallet.currency,
      totalRevenueCurrencySymbol: currencySymbol,

      totalOrdersCount: sellerAccountStats.totalOrdersCount,
      totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount,
      totalPendingQuoteRequestsCount:
        sellerAccountStats.totalPendingQuoteRequestsCount,

      monthEarnings: formattedMonthEarnings,
      yearEarnings,
    };
    const resData: IServerResponse<ISellerDashboardStats> = {
      status: true,
      data: sellerStatistics,
    };

    return resData;
  }

  @Security("jwt")
  @Get("/seller/document")
  public async sellerProfileDocs(@Request() req: any): Promise<IServerResponse<SellerDocsUpload[]>> {
    const currentUser: User = req.user;
    const connection = await getFreshConnection();

    const userRepo = connection.getRepository(User);
    const seller = await userRepo.findOne({
      uuid: currentUser.uuid,
      isSeller: true,
    });
    if(!seller) {
      throw new NotFoundError('Seller user record was not found')
    }

    const resData = {
      status: true,
      data: seller.sellerDocs || [],
    };
    return resData;
  }
  @Security('jwt')
  @Get("/requestcall")
  public async requestAcall(@Request() req: any): Promise<IServerResponse<void>>{
    const currentUser: User = req.user
    await EmailService.sendRequestACallMailToAdmin(currentUser)
    const resData = {
      status: true,
    };
    return resData
  }
  @Get('/upgradeToSeller')
  @Security("jwt")
  public async upgradeBuyerToSeller(@Request() req: any ): Promise<IServerResponse<boolean>> {
    const currentUser: User = req.user
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    const newSellerUserUniqueCode = await SignupService.generateNewSellerCode(userRepo, currentUser)

    await userRepo
    .createQueryBuilder()
    .update(User)
    .set({ isSeller: true,
        uniqueCode: newSellerUserUniqueCode
      })
    .where({
      id: currentUser.id,
    })
    .execute();
    const resData = {
      status: true,
    };
    return resData
  }
  @Get('/publicstore/:uniqueCode')
  public async handleSellerPublicProfile(
    @Path("uniqueCode") uniqueCode: string,
  ): Promise<IServerResponse<IPublicProfile>>{

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    const seller = await userRepo.findOne({ uniqueCode, isSeller: true })
    if(!seller){
      throw new UnprocessableEntityError('Seller Store front does not exist')
    }

    const sellerPublicProfile: IPublicProfile = await ProfileService.getPublicProfile(seller)

    const resData: IServerResponse<IPublicProfile> = {
      status: true,
      data: sellerPublicProfile 
    };
    return resData;
  }

  @Post('/request-bank-details-change')
  @Security("jwt")
  public async handleRequestchangeBankDetailsChange(
    @Request() req: any, @Body() reqBody: SaveNewBankAccount,
  ): Promise<IServerResponse<void>>{
    const currentUser: User = req.user

    const connection = await getFreshConnection();
    const requestBankDetailsChangeDto = connection.getRepository(RequestBankDetailsChange)
    const { accountNumber, bankName, bankCode } = reqBody
    const accountResolveResult = await PaystackService.accountNameEnquiry(
      bankCode,
      accountNumber
    );

    if(currentUser.bankInfo.bankAccountNumber === accountNumber) {
      throw new UnprocessableEntityError('User Bank details  Submitted has already been processed')
    }

    const bankAccountName = accountResolveResult.account_name;
    
    let saveRequest = new RequestBankDetailsChange().initialize(currentUser.id, accountNumber, bankAccountName, bankName, bankCode )
    saveRequest = await requestBankDetailsChangeDto.save(saveRequest)

    const resData: IServerResponse<void> = {
      status: true,  
    };
    return resData;
  }
  
}
