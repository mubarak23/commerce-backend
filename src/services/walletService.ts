
import { CINDERBUILD_REVENUE_ACCOUNT, CINDERBUILD_REVENUE_USER } from "../constants";
import { getFreshConnection } from "../db";
import { ProcessProjectSubscriptionTransactionDto } from "../dto/ProcessProjectSubscriptionTransactionDto";
import { Account } from "../entity/Account";
import { DeliveryFeeWallet } from "../entity/DeliveryWalletFee";
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { Project } from "../entity/Project";
import { ProjectSubscription } from "../entity/ProjectSubscription";
import { ProjectSubscriptionTransaction } from "../entity/ProjectSubscriptionTransaction";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { WalletToWalletTransfer } from '../entity/WalletToWalletTransfer';
import { AccountType } from "../enums/AccountType";
import { CountryToCurrency } from "../enums/Currency";
import {
  PaymentTransactionStatus,
  PaymentTransactionTypes
} from "../enums/PaymentTransaction";
import { WalletType } from "../enums/WalletType";
import CountriesStates from "../resources/countries+states.json";
import * as Utils from '../utils/core';
import { UnprocessableEntityError } from "../utils/error-response-types";

export const getCustomerWallet = async (userId: number): Promise<Wallet> => {
  const connection = await getFreshConnection();
  const walletRepo = connection.getRepository(Wallet);

  let sourceWallet = await walletRepo.findOne({
    userId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if (!sourceWallet) {
    const userRepo = connection.getRepository(User);
    const accountRepo = connection.getRepository(Account);
    const user = await userRepo.findOne({ id: userId });

    const foundCountry = CountriesStates.find(
      (countryItem) => countryItem.name === user?.countryLongName
    );

    let userAccount = await accountRepo.findOne({ primaryUserId: userId})
    
    if(!userAccount){
      const newAccount = new Account().initialize(
        userId,
        AccountType.CUSTOMER_ACCOUNT
      ) 
      userAccount = await accountRepo.save(newAccount)  
    }
    
    const accountWallet = new Wallet().initialize(
      userId,
      userAccount.id,
      WalletType.CUSTOMER_WALLET,
      foundCountry?.currency || CountryToCurrency.NIGERIA
    );
    sourceWallet = await walletRepo.save(accountWallet);
  }

  return sourceWallet;
};

export const cstoreUserWalletbalance = async (userId: number): Promise<boolean> => {
  const userWallet = await getCustomerWallet(userId);
  const userWalletBlanaceMajor = userWallet.walletBalanceMinor * 100;

  if(userWalletBlanaceMajor > 200000){
    throw new UnprocessableEntityError(`Please Pay For the Previous Order Before Placing Another One`)
  }
  return true;
}
export const getSecondaryCustomerWallet = async (accountId: number): Promise<DeliveryFeeWallet> => {
  const connection = await getFreshConnection();
  const secondaryWalletRepo = connection.getRepository(DeliveryFeeWallet);

  const sourceWallet = await secondaryWalletRepo.findOne({
    accountId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if (!sourceWallet) {
    throw new UnprocessableEntityError('User Does Not have Secondary Wallet')
  }

  return sourceWallet;
};

export const getCinderbuildRevenueWallet = async (): Promise<Wallet> => {
  const connection = await getFreshConnection();
  const walletRepo = connection.getRepository(Wallet);
  let sourceAccountWallet = await walletRepo.findOne({
    type: WalletType.CINDERBUILD_WALLET,
  });

  if (!sourceAccountWallet) {
    const wallet = new Wallet().initialize(
      CINDERBUILD_REVENUE_USER,
      CINDERBUILD_REVENUE_ACCOUNT,
      WalletType.CINDERBUILD_WALLET,
      CountryToCurrency.NIGERIA
    );
    sourceAccountWallet = await walletRepo.save(wallet);
  }
  return sourceAccountWallet;
};

export const saveWithdrawalTransaction = async (
  sourceWallet: Wallet,
  amountMinor: number,
  isPaidStatus: PaymentTransactionStatus,
  reference?: string
) => {
  const totalAmountMinor = amountMinor;

  const connection = await getFreshConnection();

  const finalFinancialTransaction = await connection.transaction(
    async (transactionalEntityManager) => {
      const financialTransactionRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);

      const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
      const walletBalanceMinorAfter =
        sourceWallet.walletBalanceMinor - totalAmountMinor;

      const financialTransaction = new FinancialTransaction().initialize(
        sourceWallet,
        PaymentTransactionTypes.WALLET_FUNDS_WITHDRAWAL,
        totalAmountMinor,
        walletBalanceMinorBefore,
        walletBalanceMinorAfter,
        sourceWallet.currency,
        isPaidStatus,
        reference,
        undefined
      );
      financialTransaction.description = `${sourceWallet.currency}${
        amountMinor / 100
      } funds withdrawal`;

      await financialTransactionRepoT.save(financialTransaction);
      //--
      await walletRepoT
        .createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor - ${totalAmountMinor}`,
        })
        .where({ id: sourceWallet.id })
        .execute();

      return financialTransaction;
    }
  );

  return finalFinancialTransaction;
};

export const walletToWalletTransfer = async (
  adminUserId: number,
  senderUserId: number,
  receiverUserId: number,
  totalTransferAmountMinor: number,
  description?: string
): Promise<boolean> => {
  const senderWallet = await getCustomerWallet(senderUserId)
  const receiverWallet = await getCustomerWallet(receiverUserId)
  
  if(senderWallet.walletBalanceMinor < totalTransferAmountMinor){
    throw new UnprocessableEntityError('Insufficient balance to process this transfer')
  }
  const connection = await getFreshConnection();

  const transferSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const financialTransactionRepoT =
      transactionalEntityManager.getRepository(FinancialTransaction);
    const walletRepoT = transactionalEntityManager.getRepository(Wallet);
    const walletToWalletTransferRepoT = transactionalEntityManager.getRepository(WalletToWalletTransfer);

    const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
    const walletBalanceMinorAfter =
      senderWallet.walletBalanceMinor - totalTransferAmountMinor;

    const debitFinancialTransaction = new FinancialTransaction().initialize(
      senderWallet,
      PaymentTransactionTypes.WALLET_FUNDS_TRANSFER,
      totalTransferAmountMinor,
      walletBalanceMinorBefore,
      walletBalanceMinorAfter,
      senderWallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );
    debitFinancialTransaction.description =
      description ||
      `${senderWallet.currency}${
        totalTransferAmountMinor / 100
      } reconciliation funds transfer `;

    await financialTransactionRepoT.save(debitFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor - ${totalTransferAmountMinor}`,
      })
      .where({ id: senderWallet.id })
      .execute();

    const creditWalletBalanceMinorBefore = receiverWallet.walletBalanceMinor;
    const creditWalletBalanceMinorAfter =
      receiverWallet.walletBalanceMinor + totalTransferAmountMinor;

    const creditFinancialTransaction = new FinancialTransaction().initialize(
      receiverWallet,
      PaymentTransactionTypes.WALLET_FUNDS_TRANSFER,
      totalTransferAmountMinor,
      creditWalletBalanceMinorBefore,
      creditWalletBalanceMinorAfter,
      senderWallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );
    creditFinancialTransaction.description =
      description ||
      `${senderWallet.currency}${
        totalTransferAmountMinor / 100
      } reconciliation funds transfer`;

    await financialTransactionRepoT.save(creditFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor + ${totalTransferAmountMinor}`,
      })
      .where({ id: receiverWallet.id })
      .execute();

    const successfulWalletToWalletTransfer = new WalletToWalletTransfer().initialize(adminUserId, senderUserId, receiverUserId, 
      totalTransferAmountMinor/100, description ?? '')
    await walletToWalletTransferRepoT.save(successfulWalletToWalletTransfer)
    
    return true
  });

  return transferSuccess;
};

export const payRecurrentSubscriptionAmountViaWallet = async (
  projectSubscriptionTransaction : ProjectSubscriptionTransaction,
  projectSubscription: ProjectSubscription,
  developerUserId: number,
  investorUserId: number,
  totalCostPayment: number,
  description: string,
  ):  Promise<boolean> => {

    const investorWallet = await getCustomerWallet(investorUserId)
    const developerWallet = await getCustomerWallet(developerUserId)
  
    // totalCostPayment
   //  const paymentAmountminor = projectSubscriptionTransaction.amountPaidMinor

    const paymentAmountminor =  parseFloat((totalCostPayment * 100).toFixed(2)) 
  
    if(investorWallet.walletBalanceMinor < 0){
      throw new UnprocessableEntityError('Insufficient balance to process this Project Subscription')
    }
    
    if(investorWallet.walletBalanceMinor < paymentAmountminor){
      throw new UnprocessableEntityError('Insufficient balance to process this Project Subscription')
    }
    const connection = await getFreshConnection();

    const projectSubscriptionSuccess = await connection.transaction(async (transactionalEntityManager) => {
      const financialTransactionRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction); 
      const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription);
  
      const investorWalletBalanceMinorBefore = investorWallet.walletBalanceMinor;
      const investorWalletBalanceMinorAfter =
      investorWallet.walletBalanceMinor - paymentAmountminor;
      
      const metadata: FinancialTransactionMetadata = {
        projectSubscriptionUuid: projectSubscription.uuid,
      }
      // debit investor 
      const debitFinancialTransaction = new FinancialTransaction().initialize(
        investorWallet,
        PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT,
        paymentAmountminor,
        investorWalletBalanceMinorBefore,
        investorWalletBalanceMinorAfter,
        investorWallet.currency,
        PaymentTransactionStatus.PAID,
        undefined,
        metadata
      );
      debitFinancialTransaction.description =
        description ||
        `${investorWallet.currency}${
          paymentAmountminor / 100
        } Recurrent Susbscription Payment Deduction For Date: ${projectSubscriptionTransaction.nextPaymentDate}`;
  
      await financialTransactionRepoT.save(debitFinancialTransaction);
  
      await walletRepoT
        .createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor - ${paymentAmountminor}`,
        })
        .where({ id: investorWallet.id })
        .execute();
  
      // credit developer wallet
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
  
      await walletRepoT
        .createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor + ${paymentAmountminor}`,
        })
        .where({ id: developerWallet.id })
        .execute();
         const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
         console.log('amountBeforeMinor before updating amountAfterMinor', amountBeforeMinor)
         console.log('paymentAmountminor', paymentAmountminor)
       //  const amountAfterMinor =  (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        const amountAfterMinor = (paymentAmountminor + projectSubscriptionTransaction.amountBeforeMinor);
        console.log('amountAfterMinor', amountAfterMinor)
        const totalSubscriptionAmount = parseFloat((projectSubscription.numberOfSlots * projectSubscriptionTransaction.project.costPerSlot).toFixed(2))
       
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
      .where({ id: projectSubscriptionTransaction.id, investorUserId: projectSubscriptionTransaction.investorUserId })
      .execute();
  
      const now = Utils.utcNow()
  
      projectSubscription.subscriptionPaymentHistory.push({
        transactionReference: projectSubscriptionTransaction.uuid,
        dateTimeInISO8601: now.toISOString()
      })
  const  amountRemainingMinor = (projectSubscription.amountRemainingMinor -  paymentAmountminor);
  const amountPerPaymentPlanDurationMinor = amountRemainingMinor / projectSubscriptionTransaction.project.duration;
    await projectSubscriptionT
    .createQueryBuilder()
    .update(ProjectSubscription)
    .set({ 
      subscriptionPaymentHistory:  projectSubscription.subscriptionPaymentHistory,
      amountRemainingMinor,
      amountPerPaymentPlanDurationMinor,
      amountPaidMinor: (projectSubscription.amountPaidMinor +  paymentAmountminor)
    })
    .where({ id: projectSubscription.id })
    .execute();

      return true;
    });
  
    return projectSubscriptionSuccess;


  }
export const projectSubscriptionPaymentViaWallet = async (
  projectId: number,
  projectSubscriptionId: number,
  developerUserId: number,
  investorUserId: number,
  paymentAmountmajor: number,
  amountRemainingMajor: number,
  projectSubscription: ProjectSubscription,
  project: Project,
  description?: string
): Promise<boolean> => {

  const investorWallet = await getCustomerWallet(investorUserId)
  const developerWallet = await getCustomerWallet(developerUserId)
  
  const paymentAmountminor = paymentAmountmajor * 100

  if(investorWallet.walletBalanceMinor < 0){
    throw new UnprocessableEntityError('Insufficient balance to process this Project Subscription')
  }
  
  if(investorWallet.walletBalanceMinor < paymentAmountminor){
    throw new UnprocessableEntityError('Insufficient balance to process this Project Subscription')
  }
  const connection = await getFreshConnection();

  const projectSubscriptionSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const financialTransactionRepoT =
      transactionalEntityManager.getRepository(FinancialTransaction);
    const walletRepoT = transactionalEntityManager.getRepository(Wallet);
    const projectSubscriptionTransactionRepoT = transactionalEntityManager.getRepository(ProjectSubscriptionTransaction); 
    const projectSubscriptionT = transactionalEntityManager.getRepository(ProjectSubscription);

    const investorWalletBalanceMinorBefore = investorWallet.walletBalanceMinor;
    const investorWalletBalanceMinorAfter =
    investorWallet.walletBalanceMinor - paymentAmountminor;

    // debit investor 
    const debitFinancialTransaction = new FinancialTransaction().initialize(
      investorWallet,
      PaymentTransactionTypes.PROJECT_SUBSCRIPTION_PAYMENT,
      paymentAmountminor,
      investorWalletBalanceMinorBefore,
      investorWalletBalanceMinorAfter,
      investorWallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );
    debitFinancialTransaction.description =
      description ||
      `${investorWallet.currency}${
        paymentAmountminor / 100
      } project susbscription payment `;

    await financialTransactionRepoT.save(debitFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor - ${paymentAmountminor}`,
      })
      .where({ id: investorWallet.id })
      .execute();

    // credit developer wallet
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
      undefined
    );
    creditFinancialTransaction.description =
      description ||
      `${developerWallet.currency}${
        paymentAmountminor / 100
      } project susbscription payment`;

    await financialTransactionRepoT.save(creditFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor + ${paymentAmountminor}`,
      })
      .where({ id: developerWallet.id })
      .execute();
      
      const nextPaymentDate = (new Date()).toISOString();
      
    // PROCESS PROJECT SUBSCRIPTION TRANSACTION 
    const projectSubscriptionPaymentTransaction: ProcessProjectSubscriptionTransactionDto = {
      investorUserId,
      developerUserId,
      projectId,
      projectSubscriptionId,
      amountBeforeMinor: 0,
      amountPaidMinor: paymentAmountminor,
      amountAfterMinor:  paymentAmountminor,
      amountRemainingMinor: amountRemainingMajor * 100,
      financialTransactionId: creditFinancialTransaction.id,
      description: 'Initial project subscription payment',
      paymentPlanDurationNumber: 0, 
      nextPaymentDate,
    }
    
    const recordProjectSubscriptionTransaction = new ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction)
    await projectSubscriptionTransactionRepoT.save(recordProjectSubscriptionTransaction);
    
    await projectSubscriptionTransactionRepoT
    .createQueryBuilder()
    .update(ProjectSubscriptionTransaction)
    .set({ 
      isPaid: true,
      paidStatus: PaymentTransactionStatus.PAID
    })
    .where({ id: recordProjectSubscriptionTransaction.id })
    .execute();

    const now = Utils.utcNow()

    projectSubscription.subscriptionPaymentHistory.push({
      transactionReference: recordProjectSubscriptionTransaction.uuid,
      dateTimeInISO8601: now.toISOString()
    })
    const totalSubscriptionAmount = parseFloat((projectSubscription.numberOfSlots * project.costPerSlot).toFixed(2))
    
    const  amountRemainingMinor = ((totalSubscriptionAmount * 100 )-  paymentAmountminor);
    
    const amountPerPaymentPlanDurationMinor = amountRemainingMinor / project.duration;
  await projectSubscriptionT
  .createQueryBuilder()
  .update(ProjectSubscription)
  .set({ 
    subscriptionPaymentHistory:  projectSubscription.subscriptionPaymentHistory,
    amountRemainingMinor,
    amountPerPaymentPlanDurationMinor
  })
  .where({ id: projectSubscription.id })
  .execute();

    return true;
  });

  return projectSubscriptionSuccess;
};


export const getCustomerDeliveryWallet = async (userId: number): Promise<DeliveryFeeWallet> => {
  const connection = await getFreshConnection();
  const DeliverywalletRepo = connection.getRepository(DeliveryFeeWallet);

  const sourceDeliveryWalletFee = await DeliverywalletRepo.findOne({
    userId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if(!sourceDeliveryWalletFee){
    throw new UnprocessableEntityError('User Does not have Delivery Wallet')
  }
  return sourceDeliveryWalletFee
}


export const mainWalletToDeliveryWalletTransfer = async (currentUser: User, totalTransferAmountMinor: number): Promise<boolean> => {
  const senderWallet = await getCustomerWallet(currentUser.id)
  const deliveryWalletFee = await getCustomerDeliveryWallet(currentUser.accountId)

  const connection = await getFreshConnection();

  const transferSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const financialTransactionRepoT =
      transactionalEntityManager.getRepository(FinancialTransaction);
    const walletRepoT = transactionalEntityManager.getRepository(Wallet);
    const deliveryFeeWalletRepoT = transactionalEntityManager.getRepository(DeliveryFeeWallet)

    const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
    const walletBalanceMinorAfter =
      senderWallet.walletBalanceMinor - totalTransferAmountMinor;

    const debitFinancialTransaction = new FinancialTransaction().initialize(
      senderWallet,
      PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER,
      totalTransferAmountMinor,
      walletBalanceMinorBefore,
      walletBalanceMinorAfter,
      senderWallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );

    debitFinancialTransaction.description =
      `${senderWallet.currency}${
        totalTransferAmountMinor / 100
      }  main wallet to delivery wallet fee transfer`;

    await financialTransactionRepoT.save(debitFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () => 
          `wallet_balance_minor - ${totalTransferAmountMinor}`,
      })
      .where({ id: senderWallet.id })
      .execute();

    const creditDeliveryWalletBalanceMinorBefore = deliveryWalletFee.walletBalanceMinor;
    const creditDeliveryWalletBalanceMinorAfter =
    deliveryWalletFee.walletBalanceMinor + totalTransferAmountMinor;

    const creditFinancialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
      deliveryWalletFee,
      PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER,
      totalTransferAmountMinor,
      creditDeliveryWalletBalanceMinorBefore,
      creditDeliveryWalletBalanceMinorAfter,
      deliveryWalletFee.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );
    creditFinancialTransaction.description =
      `${deliveryWalletFee.currency}${
        totalTransferAmountMinor / 100
      } main wallet to delivery wallet fee transfer`;

    await financialTransactionRepoT.save(creditFinancialTransaction);

    await deliveryFeeWalletRepoT
      .createQueryBuilder()
      .update(DeliveryFeeWallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor + ${totalTransferAmountMinor}`,
      })
      .where({ id: deliveryWalletFee.id })
      .execute();

      return true
  
  })
  
  return transferSuccess
}

export const saveDeliveryWalletFeeTransaction = async (
  accountId: number,
  amountMajor: number,
  reference?: string
) => {
  const totalAmountMinor = amountMajor * 100;

  const connection = await getFreshConnection();
  const deliveryFeeWalletRepoT = connection.getRepository(DeliveryFeeWallet)

  const sourceDeliveryFeeWallet = await getSecondaryCustomerWallet(accountId)  

  const finalFinancialTransaction = await connection.transaction(
    async (transactionalEntityManager) => {
      const financialTransactionRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);
      

      const walletBalanceMinorBefore = sourceDeliveryFeeWallet!.walletBalanceMinor;
      const walletBalanceMinorAfter =
      sourceDeliveryFeeWallet! .walletBalanceMinor - totalAmountMinor;

      const financialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
        sourceDeliveryFeeWallet!,
        PaymentTransactionTypes.WARE_HOUSE_TO_SITE_DELIVERY_PAYMENT,
        totalAmountMinor,
        walletBalanceMinorBefore,
        walletBalanceMinorAfter,
        sourceDeliveryFeeWallet!.currency ? sourceDeliveryFeeWallet!.currency : 'NGN' ,
        PaymentTransactionStatus.PAID,
        reference,
        undefined
      );
      financialTransaction.description = `${sourceDeliveryFeeWallet!.currency}${
        totalAmountMinor / 100
      }  wallet payment for delivery fee`;

      await financialTransactionRepoT.save(financialTransaction);
      //--
      await deliveryFeeWalletRepoT
        .createQueryBuilder()
        .update(DeliveryFeeWallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor - ${totalAmountMinor}`,
        })
        .where({ id: sourceDeliveryFeeWallet!.id })
        .execute();

      return financialTransaction;
    }
  );

  return finalFinancialTransaction;
};
