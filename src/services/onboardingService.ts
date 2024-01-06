import { CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT } from '../constants';
import { getFreshConnection } from '../db';
import { Account } from '../entity/Account';
import { Business } from '../entity/Business';
import { DeliveryFeeWallet } from '../entity/DeliveryWalletFee';
import { FinancialTransaction, FinancialTransactionMetadata } from '../entity/FinancialTransaction';
import { MortageUser } from '../entity/MortageUser';
import { MortgageAccountVerification } from '../entity/MortgageAccountVerification';
import { PhoneVerification } from '../entity/PhoneVerification';
import { TempUser } from "../entity/TempUser";
import { User } from '../entity/User';
import { Wallet } from '../entity/Wallet';
import { AccountType } from '../enums/AccountType';
import ConfigProperties from "../enums/ConfigProperties";
import { CountryCodeToCurrency } from "../enums/Currency";
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../enums/PaymentTransaction';
import { Roles } from '../enums/Roles';
import { WalletType } from "../enums/WalletType";
import { WelcomeMailData } from '../interfaces/WelcomeMailData';
import * as SignupService from "../services/signupService";
import * as SmsService from "../services/smsSendingService";
import * as Utils from "../utils/core";
import { getConfigProperty } from "./configPropertyService";
import * as EmailService from "./emailService";

export const saveNewUser = async (tempUserExist: TempUser, msisdn: string, foundCountryName: string, 
    checkPhoneVerifyCode?: PhoneVerification): Promise<User> => {
   const newUserCreatedFromTemporaryOrder = !checkPhoneVerifyCode
  const connection = await getFreshConnection();

  const savedUser: User = await connection.transaction(
    async (transactionalEntityManager) => {
      const userRepoT = transactionalEntityManager.getRepository(User);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const accountRepoT = transactionalEntityManager.getRepository(Account)
      const mortageUserRepoT = transactionalEntityManager.getRepository(MortageUser);
      const businessRepoT = transactionalEntityManager.getRepository(Business);
      const deliveryWalletFeeRepoT = transactionalEntityManager.getRepository(DeliveryFeeWallet)
      const phoneVerifictionRepoT = transactionalEntityManager.getRepository(PhoneVerification);
      const mortgageAccountVerificationRepoT = transactionalEntityManager.getRepository(MortgageAccountVerification);

      let newUser = new User().initialize(tempUserExist, msisdn, foundCountryName);
        newUser.createdFromTemporaryOrder = newUserCreatedFromTemporaryOrder
      if(tempUserExist.defaultSellerUniqueCode) {
        const defaultSellerUser = await userRepoT.findOne({
          uniqueCode: tempUserExist.defaultSellerUniqueCode,
        });
        if(defaultSellerUser) {
          newUser.defaultSellerUserId = defaultSellerUser.id
        }
      }
      newUser = await userRepoT.save(newUser);
      //--
      if(tempUserExist.isSeller) {
        const newSellerUserUniqueCode = await SignupService.generateNewSellerCode(userRepoT, newUser)

        await userRepoT
          .createQueryBuilder()
          .update(User)
          .set({ uniqueCode: newSellerUserUniqueCode })
          .where({ id: newUser.id })
          .execute();
      }

      const account = new Account().initialize(
        newUser.id,
        AccountType.CUSTOMER_ACCOUNT
      );
      const userAccount = await accountRepoT.save(account);

      await userRepoT
        .createQueryBuilder()
        .update(User)
        .set({
          accountId: userAccount.id,
        })
        .where({ id: newUser.id })
        .execute();

      const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
      const currency = CurrencyEnum[tempUserExist.countryIso2];

      const wallet = new Wallet().initialize(
        newUser.id,
        userAccount.id,
        WalletType.CUSTOMER_WALLET,
        currency
      );
      await walletRepoT.save(wallet);

      if(checkPhoneVerifyCode) {
        await phoneVerifictionRepoT
          .createQueryBuilder()
          .update(PhoneVerification)
          .set({ isVerified: true })
          .where({ id: checkPhoneVerifyCode.id })
          .execute();
      }

      if(newUser.isCooperate){
        const deliveryWalletFee = new DeliveryFeeWallet().initialize(newUser.id, userAccount.id, currency)
        await  deliveryWalletFeeRepoT.save(deliveryWalletFee)
      }

      if([Roles.DEVELOPER, Roles.INVESTOR].includes(newUser.role)){
        const mortageUser = new MortageUser().initialize(
          newUser.id,
          userAccount.id,
          newUser.role,
        );
        await mortageUserRepoT.save(mortageUser);
      }

      if(newUser.role === Roles.DEVELOPER){
        
        const developerBusiness = new Business().initialize(newUser.id, tempUserExist.companyName, tempUserExist.address, tempUserExist.cacNumber);
        await businessRepoT.save(developerBusiness);
        await userRepoT
        .createQueryBuilder()
        .update(User)
        .set({
          companyName: tempUserExist.companyName,
          isDeveloper: true,
        })
        .where({ id: newUser.id })
        .execute();
        
       const mortgageAccountVerificationProccess = new MortgageAccountVerification().initialize(
        newUser.id,
        Roles.DEVELOPER
       )
       await mortgageAccountVerificationRepoT.save(mortgageAccountVerificationProccess);
       
    
       
        newUser.isDeveloper = true;
      }

      if(newUser.role === Roles.INVESTOR ){
       await userRepoT
        .createQueryBuilder()
        .update(User)
        .set({
          isInvestor: true,
        })
        .where({ id: newUser.id })
        .execute();
        newUser.isInvestor = true;
      }
      
      return newUser;
    }
  );
  
  
  if(!newUserCreatedFromTemporaryOrder) {
    await afterNewUserIsCreated(savedUser)
  }
  
  if(savedUser.isCooperate){
    await afterCooperateUserIsCreated(savedUser)
    await cooperateUserDeliveryWalletDiscount(savedUser)
  }

  return savedUser
}

export const afterCooperateUserIsCreated = async (newUser: User) => {
  
    const cooperateUserMailInfo: WelcomeMailData = {
      email: newUser.emailAddress!,
      firstName: newUser.firstName
    }
    const domain = Utils.serverDomain()
    const loginLink = `https://${domain}/login`
    const smsMessage = `Hello (name), Welcome to Cinderbuild You now have access to Builder360 Check your
     registered email for more information or Login here> ${loginLink}`
    const wasthisDelivered =  await SmsService.sendOtp(newUser.msisdn, smsMessage)
   const sendMail =  await EmailService.sendCooperateWelcomeMail(cooperateUserMailInfo)    
   console.log('is mail sent', sendMail) 
   return true
}

export const afterNewUserIsCreated = async (newUser: User) => {
  const userMailInfo: WelcomeMailData = {
    email: newUser.emailAddress!,
    firstName: newUser.firstName
  }
  if(newUser.emailAddress && newUser.role === Roles.NORMAL_USER) {
    const userMailInfo: WelcomeMailData = {
      email: newUser.emailAddress,
      firstName: newUser.firstName
    }
    if(newUser.isSeller === true){
      await EmailService.sendWelcomeMailToSeller(userMailInfo)
      await EmailService.howToShopMail(userMailInfo)
    }
    await EmailService.sendWelcomeMail(userMailInfo)
  }
  
  if(newUser.emailAddress && newUser.role === Roles.AFFILIATE){
    const affiliateUserMailInfo: WelcomeMailData = {
      email: newUser.emailAddress,
      firstName: newUser.firstName
    }
    await EmailService.AffiliateSendWelcomeMail(affiliateUserMailInfo)
    await EmailService.howToShopMail(affiliateUserMailInfo) 
  } 

  await EmailService.sendWelcomeMail(userMailInfo)
  return true
}


export const cooperateUserDeliveryWalletDiscount = async(newUser: User) => {
  const connection = await getFreshConnection()
  const shouldGiveDiscountToCooperateUser = await getConfigProperty(
    ConfigProperties.COOPERATE_ACCOUNT_DISCOUNT
  );
  if(!shouldGiveDiscountToCooperateUser){
     return false
  }

  const applyDiscount: any = await connection.transaction(
    async (transactionalEntityManager) => {
      const deliveryWalletFeeRepoT = transactionalEntityManager.getRepository(DeliveryFeeWallet)
      const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
      const sourceWallet = await deliveryWalletFeeRepoT.findOne({
        userId: newUser.id
      })
      const metadata: FinancialTransactionMetadata = {}
      const walletBalanceMinorAfter = sourceWallet!.walletBalanceMinor +  CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT
      const financialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
        sourceWallet!, PaymentTransactionTypes.COOPERATE_ACCOUNT_DISCOUNT,
        CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT, sourceWallet!.walletBalanceMinor, walletBalanceMinorAfter, sourceWallet!.currency, PaymentTransactionStatus.PAID,
        undefined, metadata)
      financialTransaction.description = `${sourceWallet!.currency}${CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT / 100} main wallet Discount Applied.`
      await financialTransactionRepoT.save(financialTransaction)

      await deliveryWalletFeeRepoT.createQueryBuilder()
      .update(DeliveryFeeWallet)
      .set({
        walletBalanceMinor: sourceWallet!.walletBalanceMinor + financialTransaction.amountMinor,
      })
      .where({
        userId: financialTransaction.userId,
      })
      .execute()
    return true
    })
  // send discount mail
  if(CINDERBUILD_COOPERATE_ACCOUNT_DISCOUNT){
    const emailContent: WelcomeMailData = {
      email: newUser.emailAddress!,
      firstName: newUser.firstName
  } 
    await EmailService.sendCooperateDiscountMail(emailContent)
  }
   
 return applyDiscount
}
