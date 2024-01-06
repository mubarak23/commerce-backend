/* eslint-disable no-await-in-loop */
import PhoneNumber from "awesome-phonenumber";
import { getFreshConnection } from "../db";
import { AddUserRequestDto } from "../dto/AddUserRequest";
import { Account } from "../entity/Account";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { WareHouse } from "../entity/WareHouse";
import { WareHouseProductOrderHistory } from "../entity/WareHouseProductOrderHistory";
import { WareHouseProductPurchase } from "../entity/WareHouseProductPurchase";
import { AccountType } from "../enums/AccountType";
import { CooperateUserRole, displayCorporateUserRole } from "../enums/CooperateUserRole";
import { CountryCodeToCurrency } from "../enums/Currency";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { WalletType } from "../enums/WalletType";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import { WelcomeMailData } from "../interfaces/WelcomeMailData";
import * as emailService from '../services/emailService';
import * as NotificationService from '../services/notificationService';
import * as Utils from '../utils/core';
import { UnprocessableEntityError } from '../utils/error-response-types';

export const addExistingUserToCooperateAccount = async (cooperateUser: User, existingUser: User, 
    role: CooperateUserRole, wareHouseId?: number) : Promise<boolean> => {
  const connection = await getFreshConnection();  
  const userRepoT =  connection.getRepository(User)
  const accountRepoT = connection.getRepository(Account)
  
  const existingUserAccount = await accountRepoT.findOne({ primaryUserId: existingUser.id })
  if(existingUserAccount!.id !== existingUser.accountId){
    throw new UnprocessableEntityError('The User Has Already Been Added to Another Cooperate Account')
  }
  const updateQuery: any = {
    accountId: cooperateUser.accountId,
    isCooperate: true,
    companyName: cooperateUser.companyName ?? null,
    wareHouseId: wareHouseId ?? null
  }

  await userRepoT.createQueryBuilder()
    .update(User)
    .set(updateQuery)
    .where({ id: existingUser.id })
    .execute()

  const notificationTitle = `${displayCorporateUserRole(role)} role user added`

  const notificationBody = [
    `Cooperate user [${cooperateUser.firstName ?? ''}]`,
    `has added you as an ${displayCorporateUserRole(role)} user on CinderBuild`
  ].join('')

  const notificationMetadata: NotificationMetadata = {
    userId: existingUser.id,
    cooperateUserRole: role,
  }

  const notificationMessageType: NotificationMessageTypes = role === CooperateUserRole.ACCOUNT_LEVEL ? 
    NotificationMessageTypes.NEW_ACCOUNT_LEVEL_USER_ADDED : 
    NotificationMessageTypes.NEW_WAREHOUSE_LEVEL_USER_ADDED

  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true
  }
  
  await NotificationService.sendSingleNotificationToUserId(existingUser.id, existingUser.uuid,
    notificationMessageType,
    notificationTitle, notificationBody,
    notificationTransports,  notificationMetadata)

  return true
}

export const addnewUserToCooperateAccount = async (cooperateUser: User, requestPayload: AddUserRequestDto, wareHouseId?: number) : Promise<boolean> => {
  const connection = await getFreshConnection();
  let { phoneNumber } = requestPayload;
  const { firstName, lastName, emailAddress, role } = requestPayload;

  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1)
  }
  const awesomePhoneNumber = new PhoneNumber(phoneNumber, "NG")
  const msisdn = awesomePhoneNumber.getNumber()
  const randomNumericPassword = Utils.generateOtp(6);
  const passwordHash = await Utils.generatePasswordHash(randomNumericPassword);

  const savedUser: any = await connection.transaction(
    async (transactionalEntityManager) => {
      const userRepoT = transactionalEntityManager.getRepository(User);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const accountRepoT = transactionalEntityManager.getRepository(Account)
    
      let newUser = new User().initializeNewCooperateUser(firstName ?? '', lastName ?? '', phoneNumber, msisdn, 
        emailAddress!, passwordHash);
      newUser = await userRepoT.save(newUser);
    
      const account = new Account().initialize(
        newUser.id,
        AccountType.CUSTOMER_ACCOUNT
      );
      const newAccount = await accountRepoT.save(account);
    
      const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
      const currency = CurrencyEnum[newUser.countryIso2];
      const wallet = new Wallet().initialize(
        newUser.id,
        newAccount.id,
        WalletType.CUSTOMER_WALLET,
        currency
      )
      await walletRepoT.save(wallet);
    
      const updateQuery: any = {
        accountId: cooperateUser.accountId,
        isCooperate: true,
        companyName: cooperateUser.companyName ?? null,
        wareHouseId: wareHouseId ?? null
      }
    
      await userRepoT.createQueryBuilder()
        .update(User)
        .set(updateQuery)
        .where({ id: newUser.id })
        .execute()  
      return true
    })


  const newMailData: WelcomeMailData = {
    email: requestPayload.emailAddress,
    firstName: requestPayload.firstName!,
    phoneNumber: requestPayload.phoneNumber!,
    role: requestPayload.role,
  }
  
  await emailService.sendWelcomeMailToCooperateUser(newMailData, randomNumericPassword)
   
  return true
}

export const processOrdertoWareHouse = async (currentUser: User, orders: Order[], wareHouse: WareHouse) : Promise<boolean> => {
  const connection = await getFreshConnection()
  
  let totalValueMajor = 0
  let totalQuantity = 0

  const wareHouseUpdated: boolean = await connection.transaction(async (transactionalEntityManager) => {
    const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse)
    const orderRepoT = transactionalEntityManager.getRepository(Order)
    const wareHouseProductPurchaseRepoT = transactionalEntityManager.getRepository(WareHouseProductPurchase)
    const wareHouseProductOrderHistoryRepoT = transactionalEntityManager.getRepository(WareHouseProductOrderHistory)

    for (const order of orders) {
      totalValueMajor += order.calculatedTotalCostMajor 
    
      for(const item of order.orderItems) {
        totalQuantity += item.quantity
        let wareHouseProductPurchase = await wareHouseProductPurchaseRepoT.findOne({
          userId: currentUser.id,
          productId: item.productId
        })
        if(wareHouseProductPurchase){
          const updateQuery: Partial<WareHouseProductPurchase> = {
            inFlowQuantity: wareHouseProductPurchase.inFlowQuantity + item.quantity,
            availableQuantity: wareHouseProductPurchase.availableQuantity + item.quantity
          }
          await wareHouseProductPurchaseRepoT.createQueryBuilder()
            .update(WareHouseProductPurchase)
            .set(updateQuery)
            .where({ id: wareHouseProductPurchase.id })
            .execute()
        } else {
          const newWareHouseProductPurchase = new WareHouseProductPurchase().initialize(
            currentUser.id, wareHouse.id, item.productId, item.quantity
          );
          wareHouseProductPurchase = await wareHouseProductPurchaseRepoT.save(newWareHouseProductPurchase);  
        }
  
        const newWareHousePurchaseOrderHistory = new WareHouseProductOrderHistory().initialize(
          currentUser.id, item.productId, order.id, wareHouseProductPurchase.id
        )
        
        await wareHouseProductOrderHistoryRepoT.save(newWareHousePurchaseOrderHistory)
      }
      await orderRepoT.createQueryBuilder()
      .update(Order)
      .set({ warehouseId: wareHouse.id})
      .where({ id: order.id })
      .execute()
    }

    const updateQuery: Partial<WareHouse> = {
      totalValueMajor: wareHouse.totalValueMajor + totalValueMajor,
      totalQuantity: wareHouse.totalQuantity + totalQuantity
    }
  
    await wareHouseRepoT.createQueryBuilder()
      .update(WareHouse)
      .set(updateQuery)
      .where({ id: wareHouse.id })
      .execute() 
    return true
  })

  return wareHouseUpdated
}


export const isCooperateAccount = async (currentuser: User): Promise<boolean> =>{
  if(!currentuser.accountId) {
    const errorMessage = [
      'The current user does not have an account yet. ',
      'Please contact a CinderBuild administrator'
    ].join('')
    throw new UnprocessableEntityError(errorMessage)
  }
  if(!currentuser.isCooperate){
    const errorMessage = [
      'The current user does not have have cooperate feature yet ',
      'Please contact a CinderBuild administrator'
    ].join('')
    throw new UnprocessableEntityError(errorMessage)
    
  }
  return true
} 

export const isWareHouseAccount = async (currentUser: User): Promise<boolean> => {
  if(currentUser.wareHouseId) {
    const errorMessage = [
      'The current user cannot take this action ',
      'Please contact a CinderBuild administrator'
    ].join('')
    throw new UnprocessableEntityError(errorMessage)
  }
  return true
}