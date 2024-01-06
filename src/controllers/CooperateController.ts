import { Post, Route, Tags, Path, Request, Body, Get, Security, Patch, Query } from "tsoa";
import { getFreshConnection } from "../db";
import { AddUserRequestDto } from "../dto/AddUserRequest";
import { User } from "../entity/User";
import * as cooperateService from '../services/cooperateService'
import * as PaginationService from '../services/paginationService'
import * as ProfileService from '../services/profileService'
import * as CooperateService from '../services/cooperateService';
import * as WalletService from '../services/walletService'
import * as WareHouseWalletService from '../services/wareHouseWalletService'
import { IPaginatedList } from "../dto/IPaginatedList";
import { DeliveryWalletTranferDto } from "../dto/DeliveryWalletTranferDto"
import { IServerResponse } from "../interfaces/IServerResponse";
import { WareHouse } from '../entity/WareHouse';
import { Account } from '../entity/Account';
import PhoneNumber from "awesome-phonenumber";
import { SortOrder } from "../enums/SortOrder";
import { UnprocessableEntityError } from "../utils/error-response-types";
import { ICloudFile } from "../interfaces/ICloudFile";
import * as Utils from '../utils/core'
import { CooperateUserRole } from '../enums/CooperateUserRole'


@Route("api/cooperate")
@Tags('cooperate')
@Security("jwt")
export class CooperateController {

  @Get("/user")
  public async getCooperateUsers(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<IPaginatedList<any>>>  {
    const currentUser: User = req.user;
    
    await cooperateService.isCooperateAccount(currentUser)
    const connection = await getFreshConnection();
    const userRepoT = connection.getRepository(User)
    let query: any = {}
    query = { accountId: currentUser.accountId };
  
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }
    
    const pageSize = 10
    const totalCount = await userRepoT.count(query);

    const cooperateUserListsPages = await PaginationService.paginate(User,
      query, pageSize, pageNumber, sortOrder, undefined) as IPaginatedList<User>

    if(cooperateUserListsPages.dataset.length === 0){
      throw new UnprocessableEntityError('Account Does Not have Any User Added')
    }
    const cooperateUserist: User[] = cooperateUserListsPages.dataset
    const transformUserPublicProfile: any[] = cooperateUserist.map( theUser => {
      const userPhoto: ICloudFile = theUser.photo || Utils.userDefaultAvatarCloudFile()
      return {
        uuid: theUser.uuid,
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        emailAddress: theUser.emailAddress,
        msisdn: theUser.msisdn,
        photoUrl: userPhoto.url,
        role: theUser.wareHouseId ? CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole.ACCOUNT_LEVEL,
        isCooperate: theUser.isCooperate,
        accountId: theUser.accountId,
        wareHouseid: theUser.wareHouseId,
        sellerUniqueCode: theUser.uniqueCode,
      }
    })
    
    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformUserPublicProfile, total: totalCount }
    };
    return resData
  }

  @Get("/user/:userUuid")
  public async getCooperateUser(
    @Request() req: any,
    @Path("userUuid") userUuid: string
  ): Promise<IServerResponse<any>>  {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const userRepoT = connection.getRepository(User)
    
    await CooperateService.isCooperateAccount(currentUser)

    const theUser = await userRepoT.findOne({ uuid: userUuid, accountId: currentUser.accountId})

    if(!theUser){
      throw new UnprocessableEntityError('User Does Not Exist')
    }
    const userPhoto: ICloudFile = theUser.photo || Utils.userDefaultAvatarCloudFile()
    const transformUser = {
      uuid: theUser.uuid,
      firstName: theUser.firstName,
      lastName: theUser.lastName,
      emailAddress: theUser.emailAddress,
      msisdn: theUser.msisdn,
      photoUrl: userPhoto.url,
      role: theUser.wareHouseId ? CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole.ACCOUNT_LEVEL,
      isCooperate: theUser.isCooperate,
      accountId: theUser.accountId,
      wareHouseid: theUser.wareHouseId,
      sellerUniqueCode: theUser.uniqueCode,
    }

    const resData: IServerResponse<any> = {
      status: true,
      data: transformUser
    }
    return resData

  }
 
  @Post('/user')
  public async handleCreateNewCorporateUser(@Request() req: any, @Body() reqBody: AddUserRequestDto): Promise<IServerResponse<void>> {
    const currentuser: User = req.user;
    if(!currentuser.accountId) {
      const errorMessage = [
        'The current user does not have an account yet. ',
        'Please contact a CinderBuild administrator'
      ].join('')
      throw new UnprocessableEntityError(errorMessage)
    }
    if(!currentuser.isCooperate){
      throw new UnprocessableEntityError('The current user does not have have cooperate feature, Please contact a CinderBuild administrator')
    }
    const { role } = reqBody
    let { phoneNumber } = reqBody;

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User)
    
    const wareHouseRepo = connection.getRepository(WareHouse)
    let wareHouse: WareHouse | undefined;
    if(reqBody.wareHouseUuid) {
      wareHouse = await wareHouseRepo.findOne({ uuid: reqBody.wareHouseUuid })
      if(!wareHouse){
        throw new UnprocessableEntityError('WareHouse Does Not Exist')
      }
    }

    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1)
    }
    const awesomePhoneNumber = new PhoneNumber(phoneNumber, "NG")
    if(!awesomePhoneNumber.isValid()) {
      throw new UnprocessableEntityError('Phone number is invalid')
    }
    const existingUser = await userRepo.findOne({ phoneNumber, emailAddress: reqBody.emailAddress })
    if(existingUser) {
      await cooperateService.addExistingUserToCooperateAccount(currentuser, existingUser, role, wareHouse?.id)
      const resData: IServerResponse<void> = {
        status: true,
      }
      return resData
    }

  const addNewUser =  await cooperateService.addnewUserToCooperateAccount(currentuser, reqBody, wareHouse?.id)
  if(!addNewUser){
    throw new UnprocessableEntityError('Unable to Add User at this time.')
  }
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Patch('/user/:userUuid')
  public async deactivateUser(
    @Request() req: any,
    @Path("userUuid") userUuid: string
  ): Promise<IServerResponse<void>> {
    const currentuser: User = req.user;
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User)
    const accountRepo = connection.getRepository(Account)

    await CooperateService.isCooperateAccount(currentuser)

    const userToDeactivate = await userRepo.findOne({ uuid: userUuid})
    if(!userToDeactivate){
      throw new UnprocessableEntityError('User Does Not Exist')
    }
    if(currentuser.accountId !== userToDeactivate.accountId){
      throw new UnprocessableEntityError('Cannot Deactivate User You Did Not Add to your cooperate account')
    }
    const deactivatedUserAccount = await accountRepo.findOne({ primaryUserId: userToDeactivate.id})
    const updateQuery: any = {
      accountId: deactivatedUserAccount?.id,
      isCooperate: false,
      wareHouseId: null
    }
    await userRepo.createQueryBuilder()
      .update(User)
      .set(updateQuery)
      .where({ id: userToDeactivate.id })
      .execute()

    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  
  }

  @Patch('/wallet-to-wallet-transfter')
  public async handleMaintoDeliveryWalletTransfer(
    @Request() req: any,
    @Body() reqBody: DeliveryWalletTranferDto
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user
    const { amountMajor } = reqBody
    const totalTransferAmountMinor = amountMajor * 100
    await CooperateService.isCooperateAccount(currentUser)

    const transferSuccess = await WareHouseWalletService.mainWalletToDeliveryWalletTransfer(currentUser, totalTransferAmountMinor)

    if(!transferSuccess){
      throw new UnprocessableEntityError('Unable to Process main wallet to Delivery wallet Fee Transfer')
    }

    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData

  }

}