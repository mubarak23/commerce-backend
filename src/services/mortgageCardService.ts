
import { In } from "typeorm";
import { ProductionEnv } from "../constants";
import { getFreshConnection } from "../db";
import { DeveloperMortgageCardResponseDto } from "../dto/DeveloperMortgageCardResponseDto";
import { MonoDirectPayRequestDto } from "../dto/MonoDirectPayRequestDto";
import { MonoDirectPayResponseDto } from "../dto/MonoDirectPayResponseDto";
import { MonoDirectPayWebhookResponseDto } from "../dto/MonoDirectPayWebhookResponseDto";
import { MortgageCardBalanceDto } from "../dto/MortgageCardBalanceDto";
import { MortgageCardDto } from "../dto/MortgageCardDto";
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { MonoDirectPaySubscription } from "../entity/MonoDirectPaySubscription";
import { MonoDirectPayWebhooks } from "../entity/MonoDirectPayWebhook";
import { MortgageCard } from "../entity/MortgageCard";
import { ProjectSubscription } from "../entity/ProjectSubscription";
import { ProjectSubscriptionTransaction } from "../entity/ProjectSubscriptionTransaction";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { CurrencyToSymbol } from "../enums/Currency";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { MonoPayingUser } from "../interfaces/MonoPayingUser";
import { MonoPaymentLinkRequest } from "../interfaces/MonoPaymentLinkRequest";
import * as Utils from '../utils/core';
import { UnprocessableEntityError } from "../utils/error-response-types";
import * as monoService from './directDebitProvider/monoService';
import * as EmailService from './emailService';
import * as ProfileService from "./profileService";
import * as ProjectService from "./projectService";
import * as SmsService from './smsSendingService';
import * as walletService from './walletService';


export const fetchAllPan = async (): Promise<MortgageCardDto[]> => {
  const connection = await getFreshConnection()
  const MortgageCardRepo = connection.getRepository(MortgageCard)

  const cards = await MortgageCardRepo.find({
    where: { isUsed: false}
  })

  // if(cards && cards.length === 0 ){
  //   // pupulate the table with this demo pan 
  //    // Populate the table with demo PANs if no cards are found
  //    const demoPANs = [
  //     "8669-9241-1696-6400",
  //     "8669-9241-1696-6401",
  //     "8669-9241-1696-6402",
  //     "8669-9241-1696-6403",
  //     "8669-9241-1696-6404",
  //     "8669-9241-1696-6405",
  //     "8669-9241-1696-6406",
  //     "8669-9241-1696-6407",
  //     "8669-9241-1696-6408",
  //     "8669-9241-1696-6409",
  //     "8669-9241-1696-6410",
  //     "8669-9241-1696-6411",
  //     "8669-9241-1696-6412",
  //     "8669-9241-1696-6413",
  //     "8669-9241-1696-6414",
  //     "8669-9241-1696-6415",
  //     "8669-9241-1696-6416",
  //     "8669-9241-1696-6417",
  //     "8669-9241-1696-6418",
  //   ];

  //   for (const pan of demoPANs) {
  //     const newCard = new MortgageCard().initializePan(pan);
  //     // eslint-disable-next-line no-await-in-loop
  //     await MortgageCardRepo.save(newCard);
  //     cards.push(newCard);
  //   }
  //   cards = await MortgageCardRepo.find({
  //     where: { isUsed: false },
  //   });
  //   const mortgageCards: MortgageCardDto[] = cards.map((card) => ({
  //     pan: card.pan,
  //     isUsed: card.isUsed,
  //     isSoftDeleted: card.isSoftDeleted,
  //     createdAt: card.createdAt,
  //   }));
  
  //   return mortgageCards;
  // }

  const mortgageCards: MortgageCardDto[] = cards.map((card) => ({
    pan: card.pan,
    isUsed: card.isUsed,
    isSoftDeleted: card.isSoftDeleted,
    createdAt: card.createdAt,
  }));

  return mortgageCards;

  }
  
  export const activateMortgageCard = async (user: User, pan: string): Promise<DeveloperMortgageCardResponseDto> =>{
    const connection = await getFreshConnection()
    const MortgageCardRepo = connection.getRepository(MortgageCard)
    const cardPanUsed = await MortgageCardRepo.findOne({
      where: { pan, isUsed: false, isActive: false, isSoftDeleted: false}
    })
    if(!cardPanUsed){
      throw new UnprocessableEntityError("Mortgage Card Pan Number Does Not Exist")
    }
    
    if(!cardPanUsed?.userId  == null){
      throw new UnprocessableEntityError(
        "Mortgage Card Pan Number Has Been Used"
      )
    }
    const cardPanUser = await MortgageCardRepo.findOne({
      where: { pan, userId: user.id, isUsed: true, isActive: true, isSoftDeleted: false}
    })

    if(cardPanUser){
      throw new UnprocessableEntityError("User Has Already Activated the Mortgage Card")
    }
    await MortgageCardRepo.createQueryBuilder()
    .update(MortgageCard)
    .set({
      userId: user.id,
      isUsed: true,
      isActive: true,
      isSoftDeleted: false
    })
    .where({
      id: cardPanUsed.id
    })
    .execute()
    const developerCardDetail = await MortgageCardRepo.findOne({
      where: { pan, userId: user.id, isUsed: true, isActive: true, isSoftDeleted: false}
    })

    const developerUserPublicProfile = await ProfileService.getPublicMortageUserProfile(user);
    const developerCardDetails: DeveloperMortgageCardResponseDto = {
      pan,
      developerUserPublicProfile,
      isUsed: developerCardDetail!.isUsed,
      isActive: developerCardDetail!.isActive,
      isSoftDeleted: developerCardDetail!.isSoftDeleted,
      createdAt: developerCardDetail!.createdAt
    }
    return developerCardDetails
  }

  

  export const processDirectPayRequestviaMono = async (user: User, transaction: ProjectSubscriptionTransaction, amountPaidMajor?: number ): Promise<MonoDirectPayResponseDto> => {
    const connection = await getFreshConnection()
    const MonoDirectPaySubscriptionRepo = connection.getRepository(MonoDirectPaySubscription)

    const reference = Utils.generateUniqueReference(12); 
    
    let amountPaidMinor 

    if(amountPaidMajor){
      amountPaidMinor =  (amountPaidMajor || 0) * 100;
    }else {
      // eslint-disable-next-line prefer-destructuring
      amountPaidMinor = transaction.amountPaidMinor
    }

    const payload: MonoDirectPayRequestDto = {
      type: 'onetime-debit',
      amount: amountPaidMinor,
      description: `recurrent payment subscription - ${transaction.projectSubscriptionId}`,
      reference,
      redirectUrl: process.env.NODE_ENV === ProductionEnv ? 'https://www.cinderbuild.com/' : 'https://cinderbuildfe-dev-no5tq.ondigitalocean.app/estate-managers/subscriber-projects',
    }

    const payingUser: MonoPayingUser = {
      emailAddress: user.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName
    }

    console.log('payingUser', payingUser)
    const newMonoDirectPaySubscription = new MonoDirectPaySubscription().initializeDirectPayRequest(user.id, transaction.developerUserId, reference, transaction.id, transaction.uuid, payload);
   
    const saveMonoDirectPay =  await MonoDirectPaySubscriptionRepo.save(newMonoDirectPaySubscription);
 
    const requestPayment = await monoService.initializeDirectPayment(payingUser, payload)

  
    
    await MonoDirectPaySubscriptionRepo.createQueryBuilder()
    .update(MonoDirectPaySubscription)
    .set({
      responseData: requestPayment,
      reference: requestPayment.reference
    })
    .where({
      id: saveMonoDirectPay.id
    })
    .execute()

    const smsMessage = `Your Project Subscription Payment, Approve it Using this link: ${requestPayment.paymentLink}`
   // send approval link via sms
    await SmsService.sendSms(user.msisdn, smsMessage)

    
    const userInfoMonoPaymentLinkRequest: MonoPaymentLinkRequest = {
      emailAddress: user.emailAddress!,
      firstName: user.firstName,
      paymentLink: requestPayment.paymentLink
    }
    // send mail to user with payment approval link 
    await EmailService.sendMonoPaymentApprovalLink(userInfoMonoPaymentLinkRequest)

    return requestPayment

  } 

  // developer: User, reference: string, monoDirectPaySubscription: MonoDirectPaySubscription
  export const processMonoDirectPayWebhook = async (webhookResponseData: MonoDirectPayWebhookResponseDto): Promise<boolean> => {
   
    const connection = await getFreshConnection()
    const monoDirectPaySubscriptionRepo = connection.getRepository(MonoDirectPaySubscription)
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
    const monoDirectPayWebhooksRepo  = connection.getRepository(MonoDirectPayWebhooks);

    const monoDirectPaySubscription = await monoDirectPaySubscriptionRepo.findOne({
      where: { reference: webhookResponseData.reference}
    })

    if(!monoDirectPaySubscription){
      return false
    }

    // if thw webhook has been use 
    const monWebhookExist = await monoDirectPayWebhooksRepo.findOne({
      where: { reference: monoDirectPaySubscription.reference, isUsed: true}
    })

    if(monWebhookExist){
      return false
    }

    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }

  
    const projectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
      where: { id: monoDirectPaySubscription.projectSubscriptionTransactionId, investorUserId: monoDirectPaySubscription.investorUserId, isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID},
      join
    })

    if(!projectSubscriptionTransaction){
      return false
    }

    const paymentAmountminor =  webhookResponseData.amount;
    const {description} = webhookResponseData;
    const developerWallet = await walletService.getCustomerWallet(projectSubscriptionTransaction.developerUserId)

    const projectSubscriptionTransactionSuccess = await connection.transaction(async (transactionalEntityManager) => {
      const financialTransactionRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction); 
      const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription);
      const monoDirectPaySubscriptionT = connection.getRepository(MonoDirectPaySubscription);
      const monoDirectPayWebhooksT  = connection.getRepository(MonoDirectPayWebhooks);

      // update mono direct pay subscription using the reference to success, 
      await monoDirectPaySubscriptionT
      .createQueryBuilder()
      .update(MonoDirectPaySubscription)
      .set({ 
        responseData: webhookResponseData,
      })
      .where({ id: monoDirectPaySubscription.id })
      .execute();


       // store webhook response from mono for success
       const newMonoDirectPayWebhooks = new MonoDirectPayWebhooks().initializeDirectPayWebHookResponse(monoDirectPaySubscription.reference, webhookResponseData.status, webhookResponseData.event, webhookResponseData )
       await monoDirectPayWebhooksT.save(newMonoDirectPayWebhooks);
        // mark as used
       await monoDirectPayWebhooksT
       .createQueryBuilder()
       .update(MonoDirectPayWebhooks)
       .set({ 
         isUsed: true,
       })
       .where({ id: newMonoDirectPayWebhooks.id })
       .execute();


       // Pay the developer into his wallet
      const metadata: FinancialTransactionMetadata = {
        projectSubscriptionUuid: projectSubscriptionTransaction.projectSubscription.uuid,
      }
     
      const developerWalletBalanceMinorBefore = developerWallet.walletBalanceMinor;
      const developerWalletBalanceMinorAfter =
        developerWallet.walletBalanceMinor + paymentAmountminor;
  
      const creditFinancialTransaction = new FinancialTransaction().initialize(
        developerWallet,
        PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT,
        paymentAmountminor,
        developerWalletBalanceMinorBefore,
        developerWalletBalanceMinorAfter,
        developerWallet.currency,
        PaymentTransactionStatus.PAID,
        undefined,
        metadata
      );
      creditFinancialTransaction.description =
        description ||
        `${developerWallet.currency}${
          paymentAmountminor / 100
        } Recurrent Susbscription Payment for Date: ${projectSubscriptionTransaction.nextPaymentDate}`;
  
      await financialTransactionRepoT.save(creditFinancialTransaction);
  
        // credit developer wallet
      await walletRepoT
        .createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor + ${paymentAmountminor}`,
        })
        .where({ id: developerWallet.id })
        .execute();
        // Update  recurrent transaction to paid and update the amount paid
         const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
         console.log('amountBeforeMinor before updating amountAfterMinor', amountBeforeMinor)
         console.log('paymentAmountminor', paymentAmountminor)
       
        const amountAfterMinor = (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        console.log('amountAfterMinor', amountAfterMinor)
        const totalSubscriptionAmount = parseFloat((projectSubscriptionTransaction.projectSubscription.numberOfSlots * projectSubscriptionTransaction.project.costPerSlot).toFixed(2))
       
        await projectSubscriptionTransactionRepoT
      .createQueryBuilder()
      .update(ProjectSubscriptionTransaction)
      .set({ 
        financialTransactionId: creditFinancialTransaction.id,
        amountPaidMinor: paymentAmountminor,
        amountAfterMinor,
        amountRemainingMinor: ((totalSubscriptionAmount * 100) - amountAfterMinor),
        isPaid: true,
        paidStatus: PaymentTransactionStatus.PAID,
        updatedAt:  Utils.utcNow()
      })
      .where({ id: projectSubscriptionTransaction.id })
      .execute();


      // update investor subscription remaining balance
      const now = Utils.utcNow()
  
      projectSubscriptionTransaction.projectSubscription.subscriptionPaymentHistory.push({
        transactionReference: projectSubscriptionTransaction.uuid,
        dateTimeInISO8601: now.toISOString()
      })
  const  amountRemainingMinor = (projectSubscriptionTransaction.projectSubscription.amountRemainingMinor -  paymentAmountminor);
  const amountPerPaymentPlanDurationMinor = amountRemainingMinor / projectSubscriptionTransaction.project.duration;
    await projectSubscriptionT
    .createQueryBuilder()
    .update(ProjectSubscription)
    .set({ 
      subscriptionPaymentHistory:  projectSubscriptionTransaction.projectSubscription.subscriptionPaymentHistory,
      amountRemainingMinor,
      amountPerPaymentPlanDurationMinor,
      amountPaidMinor: (projectSubscriptionTransaction.projectSubscription.amountPaidMinor +  paymentAmountminor)
    })
    .where({ id: projectSubscriptionTransaction.projectSubscription.id, investorUserId:projectSubscriptionTransaction.investorUserId })
    .execute();

      return true;
    });

    const paidProjectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
      where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscriptionId, isPaid: true, paidStatus: PaymentTransactionStatus.PAID },
      join
    })
  
    const projectSubscriptionTransactionSoFar = await projectSubscriptionTransactionRepo.find({
      where: {  projectSubscriptionId: projectSubscriptionTransaction.projectSubscriptionId, isPaid: true, paidStatus: PaymentTransactionStatus.PAID }
    })
  const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;

  const durationLeft = paidProjectSubscriptionTransaction!.projectSubscription.durationLeft - 1;
  
  
  console.log('durationLeft', durationLeft)

  await ProjectService.updateProjectSubscriptionDuration(paidProjectSubscriptionTransaction!.projectSubscription, paidProjectSubscriptionTransaction!.investor, durationLeft )      
  

    // Call the next recurrent subscription 
    await ProjectService.nextPendingRecurrentPayment(projectSubscriptionTransaction.projectSubscription, projectSubscriptionTransaction.project, projectSubscriptionTransaction.investor, projectSubscriptionTransaction.developer, paidProjectSubscriptionTransaction!, durationPaymentCovered)
    
    // inside DB transaction
     // update mono direct pay subscription using the reference to success, 
     // store webhook response from mono 
     // Update  recurrent transaction to paid and update the amount paid and remaining amount on the investor subscription,
     // update investor subscription remaining balance
     // Pay the developer into his wallet
   // Call the next recurrent subscription 


    return projectSubscriptionTransactionSuccess; 
  }

  export const processMortgageCardBalance = async (developer: User, ): Promise<MortgageCardBalanceDto> => {
    const connection = await getFreshConnection()
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
    const MortgageCardRepo = connection.getRepository(MortgageCard)

  
    await ProjectService.isUserADeveloper(developer.id);


    const developerMortgageCard = await MortgageCardRepo.findOne({
      where: { userId: developer.id, isUsed: true, isActive: true, isSoftDeleted: false}
    })

    if(!developerMortgageCard){
      throw new UnprocessableEntityError('No Active Mortgage Card at the Moment')
    }

    const wallet = await walletService.getCustomerWallet(developerMortgageCard.userId)

  


    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[wallet.currency ?? 'NGN'] || '₦'
    

    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }

  
    const projectSubscriptionTransactions = await projectSubscriptionTransactionRepo.find({
      where: { developerUserId: developerMortgageCard.userId,  isPaid: true, paidStatus: PaymentTransactionStatus.PAID},
      join
    })

    if(!projectSubscriptionTransactions){
      const mortgageCardWithBalance: MortgageCardBalanceDto = {
        pan: developerMortgageCard.pan,
        currency: wallet.currency ?? 'NGN',
        currencySymbol,
        amountMajor: 0.00,
        isUsed: developerMortgageCard.isUsed,
        isActive: developerMortgageCard.isActive,
        isSoftDeleted: developerMortgageCard.isSoftDeleted,
        createdAt: developerMortgageCard.createdAt
      }
      return mortgageCardWithBalance;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    // console.log('currentMonth', currentMonth)
    const filteredTransactions = projectSubscriptionTransactions.filter(
      (transaction) => {
        const nextPaymentDate = new Date(transaction.nextPaymentDate);
        const transactionMonth = nextPaymentDate.getMonth(); 
        const transactionYear = nextPaymentDate.getFullYear();
       //  console.log('transactionMonth', transactionMonth)
        return transactionMonth === currentMonth && transactionYear === currentYear;
      }
    );

    if(filteredTransactions.length === 0){
      const mortgageCardWithBalance: MortgageCardBalanceDto = {
        pan: developerMortgageCard.pan,
        currency: wallet.currency ?? 'NGN',
        currencySymbol,
        amountMajor: 0.00,
        isUsed: developerMortgageCard.isUsed,
        isActive: developerMortgageCard.isActive,
        isSoftDeleted: developerMortgageCard.isSoftDeleted,
        createdAt: developerMortgageCard.createdAt
      }
      return mortgageCardWithBalance;
    }

    const investorUserIds = filteredTransactions.map( investor => investor.investorUserId);

    const UnpaidProjectSubscriptionTransactions = await projectSubscriptionTransactionRepo.find({
      where: { developerUserId: developerMortgageCard.userId, investorUserId: In(investorUserIds),  isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID},
      join
    })

    if(UnpaidProjectSubscriptionTransactions.length === 0) {
      const mortgageCardWithBalance: MortgageCardBalanceDto = {
        pan: developerMortgageCard.pan,
        currency: wallet.currency ?? 'NGN',
        currencySymbol,
        amountMajor: 0.00,
        isUsed: developerMortgageCard.isUsed,
        isActive: developerMortgageCard.isActive,
        isSoftDeleted: developerMortgageCard.isSoftDeleted,
        createdAt: developerMortgageCard.createdAt
      }
      return mortgageCardWithBalance;
    }
  
    const nextPaymentMonth = Utils.nextPaymentDate30days(currentDate.toISOString());

    const filteredUnpaidTransactions = projectSubscriptionTransactions.filter(
      (transaction) => {
        const nextPaymentDate = new Date(transaction.nextPaymentDate);
        const transactionMonth = nextPaymentDate.getMonth(); 
       //  console.log('transactionMonth', transactionMonth)
        return transactionMonth === nextPaymentMonth;
      }
    );

  if(filteredUnpaidTransactions.length === 0){
    const mortgageCardWithBalance: MortgageCardBalanceDto = {
      pan: developerMortgageCard.pan,
      currency: wallet.currency ?? 'NGN',
      currencySymbol,
      amountMajor: 0.00,
      isUsed: developerMortgageCard.isUsed,
      isActive: developerMortgageCard.isActive,
      isSoftDeleted: developerMortgageCard.isSoftDeleted,
      createdAt: developerMortgageCard.createdAt
    }
    return mortgageCardWithBalance;
  }

  const mortgageCardBalanceMinor =
  filteredUnpaidTransactions.reduce(
    (acc, { amountPaidMinor }) => acc + amountPaidMinor,
    0,
  );
  
  const mortgageCardBalanceMajor = (mortgageCardBalanceMinor || 0) / 100;
  
  const mortgageCardWithBalance: MortgageCardBalanceDto = {
    pan: developerMortgageCard.pan,
    currency: wallet.currency ?? 'NGN',
    currencySymbol,
    amountMajor: mortgageCardBalanceMajor,
    isUsed: developerMortgageCard.isUsed,
    isActive: developerMortgageCard.isActive,
    isSoftDeleted: developerMortgageCard.isSoftDeleted,
    createdAt: developerMortgageCard.createdAt
  }
  return mortgageCardWithBalance;

  }