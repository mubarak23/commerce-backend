/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
import moment from 'moment';
import { EntityManager, getRepository } from "typeorm";

import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { Order } from "../entity/Order";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import * as Utils from "../utils/core";
import * as NotificationService from "./notificationService";

import { getFreshConnection } from "../db";
import { EarningsByMonth } from "../entity/EarningsByMonth";
import { EarningsByYear } from "../entity/EarningsByYear";
import { PriceMatrix } from '../entity/PriceMatrix';
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import logger from '../logger';
import * as EmailService from "../services/emailService";
import * as OrderService from "../services/orderService";
import * as AccountStatService from "../services/sellerAccountStatService";
import * as WalletService from "../services/walletService";


export const afterConfirmedOrderPayment = async (order: Order): Promise<boolean> => {
  logger.info('Inside afterConfirmedOrderPayment ...')

  const now = Utils.utcNow()

  const orderRepoT = getRepository(Order)
  const buyerRepo = getRepository(User)
  const userRepo = getRepository(User)
  const financialRepo = getRepository(FinancialTransaction)

  order.statusHistory.push({
    status: OrderStatuses.IN_PROGRESS,
    dateTimeInISO8601: now.toISOString()
  })

  order.paymentStatusHistory.push({
    status: OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
    dateTimeInISO8601: now.toISOString()
  })

  const orderUpdateQuery: any = {}

  orderUpdateQuery.status = OrderStatuses.IN_PROGRESS
  orderUpdateQuery.statusHistory = order.statusHistory || []
  orderUpdateQuery.paymentStatus = OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW
  orderUpdateQuery.paymentStatusHistory = order.paymentStatusHistory || []
  
  await orderRepoT.createQueryBuilder()
    .update(Order)
    .set(orderUpdateQuery)
    .where({ id: order.id })
    .execute()
  
  const sellerAccountStats = await AccountStatService.getSellerAccountStats(order.sellerUserId)
  const accountStatRepo = getRepository(SellerAccountStat)

  await accountStatRepo.createQueryBuilder()
    .update(SellerAccountStat)
    .set({
      totalOrdersCount: sellerAccountStats.totalOrdersCount + 1,
      totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount + 1,
    })
    .where({ id: sellerAccountStats.id })
    .execute()

  if(order.paymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY ){
    const orderUser = await userRepo.findOne({id: order.buyerUserId})
    await OrderService.updateOrderStatus(order, OrderStatuses.CONFIRMED, orderUser!)
    const notificationMetadata = {
      orderUuid: order.uuid,
    }
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.EMAIL]: true
    }
    const res = await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
      NotificationMessageTypes.POD_ORDER_PAYMENT_NOTIFICATION, 
      'Payment Notification For POD order', `We have received your payment for #${order.referenceNumber} hence, your transaction is now complete. Thank you for shopping on CinderBuild and we hope to see you again soon. Call us on +2349087792957 if you need any help. Thanks, CinderBuild 
      `, notificationTransports, 
      notificationMetadata)
      console.log(`ResBuyerPay ${res}`)
  }

  const notificationMetadata = {
    orderUuid: order.uuid,
  }

  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.EMAIL]: true,
    [NotificationTransportMode.SMS]: true,
  }
  

  const buyerDetail = await buyerRepo.findOne({ id: order.buyerUserId})

  const financialTransaction = await financialRepo.findOne({
    where: {uuid: order.paymentTransactionUuid }
  })
  if(financialTransaction?.metadata?.temporaryOrderUuid){
    console.log('sending mail to unregister with details about his order')
     await EmailService.sendUnregisterUserOrderDetailsMailtoAdmin(buyerDetail!, order, financialTransaction.reference!, financialTransaction.paidStatus!)
    const notificationMetadataTemp = {
      orderUuid: order.uuid,
      temporaryOrderUuid: financialTransaction?.metadata?.temporaryOrderUuid
    }
    await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER, 
      'Successful order payment', `An order with References #${order.referenceNumber} has been made, Keep the order Ref Safe. CinderBuild Team. 
      `, notificationTransports, 
      notificationMetadataTemp)
  }else{
    await EmailService.sendOrderDetailsMailtoAdmin(buyerDetail!, order)
    await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_PAYMENT_IN_ESCROW, 
      'Successful order payment', `An order with References #${order.referenceNumber} has been made, Go to Order, and View the details of the Order. CinderBuild Team. 
      `, notificationTransports, 
      notificationMetadata)
  }


  
  const notificationTransportsToSeller: NotificationTransports = {
    [NotificationTransportMode.EMAIL]: true,
    [NotificationTransportMode.SMS]: true
  }
  await NotificationService.sendSingleNotificationToUserId(order.sellerUserId, order.sellerUser?.uuid,
    NotificationMessageTypes.ORDER_CREATED,
    'Order payment now in escrow',
    `An order with References #${order.referenceNumber} has been made, Go to Order, and View the details of the Order, call us on +2349168777239 or send a mail to support@cinderbuild.com`, 
    notificationTransportsToSeller, 
    notificationMetadata)

  return true
}

export const afterOrderPaymentWithWallet = async (orders: Order[], sourceWallet: Wallet,
    currentProductLeaseId?: number,): Promise<boolean> => {
  logger.info('Inside afterOrderPaymentWithWallet ...')

  const accountWalletRepoT = getRepository(Wallet)
  const financialTransactionT = getRepository(FinancialTransaction)

  let currentWalletBalanceMinor = sourceWallet.walletBalanceMinor

  for (const order of orders) {
    const amountMinor = order.calculatedTotalCostMajor * 100

    const metadata: FinancialTransactionMetadata = {
      orderUuid: order.uuid,
    }
    if (currentProductLeaseId) {
      metadata.productLeaseId = currentProductLeaseId
    }
    const walletBalanceMinorBefore = currentWalletBalanceMinor
    const walletBalanceMinorAfter = currentWalletBalanceMinor - amountMinor
    currentWalletBalanceMinor = walletBalanceMinorAfter
  
    await accountWalletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({ walletBalanceMinor: currentWalletBalanceMinor })
      .where({ id: sourceWallet.id })
      .execute()
  
    const financialTransaction = new FinancialTransaction().initialize(
      sourceWallet, PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW,
      amountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceWallet.currency, PaymentTransactionStatus.PAID,
      undefined, metadata)
    financialTransaction.description = `Buyer payment for order: #${order.referenceNumber} now in escrow`
    await financialTransactionT.save(financialTransaction)    
  
     await afterConfirmedOrderPayment(order)
  }

  return true
}

export const moveFundsFromEscrowToSellerForOrder = async (order: Order, sellerUser: User, sellerAccountWallet: Wallet, priceMatrix?: PriceMatrix) => {
  // return early if the seller has been paid 
  if(order.paymentStatus === OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER){
    console.log('seller has been paid before buyer pay for the order')
    return true
  }
  
  if(priceMatrix){
    await moveFundsFromEscrowToSellerViaPriceMatrix(priceMatrix, order, sellerUser, sellerAccountWallet)
   console.log('From moveFundsFromEscrowToSellerViaPriceMatrix ')
    return true
  }
 
  const amountMinor = order.calculatedTotalCostMajor * 100
  const sellerPayoutMinor = (order.calculatedTotalCostMajor - order.cinderbuildRevenueMajor) * 100
  const cinderbuildRevenueMinor = order.cinderbuildRevenueMajor * 100

  const walletBalanceMinorBefore = sellerAccountWallet.walletBalanceMinor
  const walletBalanceMinorAfter = sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor

 

  const connection = await getFreshConnection()

  const orderT = connection.getRepository(Order)

  const allDone = await connection.transaction(async transactionalEntityManager => {
    const accountWalletRepoT = transactionalEntityManager.getRepository(Wallet)
    const financialTransactionT = transactionalEntityManager.getRepository(FinancialTransaction)
    
    const metadata: FinancialTransactionMetadata = {
      orderUuid: order.uuid,
    }

    await accountWalletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({ walletBalanceMinor: sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor })
      .where({ id: sellerAccountWallet.id })
      .execute()

    const sellerFinancialTransaction = new FinancialTransaction().initialize(
      sellerAccountWallet, PaymentTransactionTypes.ESCROW_TO_SELLER,
      sellerPayoutMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sellerAccountWallet.currency, 
      PaymentTransactionStatus.PAID, undefined, metadata)
    sellerFinancialTransaction.description = `Payment for order: #${order.referenceNumber}`

    await financialTransactionT.save(sellerFinancialTransaction)
    //--
    const cinderbuildRevenueWallet = await WalletService.getCinderbuildRevenueWallet()

    const cinderbuildRevenueWalletBalanceMinorBefore = cinderbuildRevenueWallet.walletBalanceMinor
    const cinderbuildRevenueWalletBalanceMinorAfter = cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor

    await accountWalletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({ walletBalanceMinor: cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor })
      .where({ id: cinderbuildRevenueWallet.id })
      .execute()

    const cinderbuildEscrowChargesFinancialTransaction = new FinancialTransaction().initialize(
      cinderbuildRevenueWallet, PaymentTransactionTypes.ESCROW_TO_CINDERBUILD_REVENUE,
      cinderbuildRevenueMinor, cinderbuildRevenueWalletBalanceMinorBefore, cinderbuildRevenueWalletBalanceMinorAfter,
      cinderbuildRevenueWallet.currency,
      PaymentTransactionStatus.PAID, undefined, metadata)
    cinderbuildEscrowChargesFinancialTransaction.description = `CinderBuild revenue for order: #${order.referenceNumber}`

    await financialTransactionT.save(cinderbuildEscrowChargesFinancialTransaction)
    //--
    const isAllGood = await incrementEarningStatistics(transactionalEntityManager, order.sellerUserId, sellerPayoutMinor)

    return isAllGood
  })

  if(allDone) {
    const notificationMetadata = {
      orderUuid: order.uuid,
    }
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.EMAIL]: true,
    }
    
    const now = Utils.utcNow()
    const newPaymentStatusEntry = {
      paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
      dateTimeInISO8601: now.toISOString()
    }
    order.statusHistory = order.statusHistory || []

    await orderT.createQueryBuilder()
      .update(Order)
      .set({
        paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
        paymentStatusHistory: [...order.paymentStatusHistory, newPaymentStatusEntry]  
      })
      .where({ id: order.id })
      .execute()
  
    await NotificationService.sendSingleNotificationToUserId(sellerUser.id, sellerUser.uuid,
      NotificationMessageTypes.ESCROW_PAYMENT_TO_SELLER, 
      'Payment for order', `${sellerAccountWallet.currency}${amountMinor / 100} Payment for order: #${order.referenceNumber}`, 
      notificationTransports, notificationMetadata)
  }
  return true
}


export const moveFundsFromEscrowToSellerViaPriceMatrix = async ( priceMatrix: PriceMatrix,  order: Order, sellerUser: User, sellerAccountWallet: Wallet) => {

  const sellerPayoutMinor = priceMatrix.totalProductCostPriceMajor * 100;
 
  const amountMinor = order.calculatedTotalCostMajor * 100
  
  const cinderbuildRevenueMinor = order.cinderbuildRevenueMajor * 100

  const walletBalanceMinorBefore = sellerAccountWallet.walletBalanceMinor
  const walletBalanceMinorAfter = sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor

  const connection = await getFreshConnection()

  const orderT = connection.getRepository(Order)

  const allDone = await connection.transaction(async transactionalEntityManager => {
    const accountWalletRepoT = transactionalEntityManager.getRepository(Wallet)
    const financialTransactionT = transactionalEntityManager.getRepository(FinancialTransaction)
    
    const metadata: FinancialTransactionMetadata = {
      orderUuid: order.uuid,
    }

    await accountWalletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({ walletBalanceMinor: sellerAccountWallet.walletBalanceMinor + sellerPayoutMinor })
      .where({ id: sellerAccountWallet.id })
      .execute()

    const sellerFinancialTransaction = new FinancialTransaction().initialize(
      sellerAccountWallet, PaymentTransactionTypes.ESCROW_TO_SELLER,
      sellerPayoutMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sellerAccountWallet.currency, 
      PaymentTransactionStatus.PAID, undefined, metadata)
    sellerFinancialTransaction.description = `Payment for order: #${order.referenceNumber}`

    await financialTransactionT.save(sellerFinancialTransaction)
    //--
    const cinderbuildRevenueWallet = await WalletService.getCinderbuildRevenueWallet()

    const cinderbuildRevenueWalletBalanceMinorBefore = cinderbuildRevenueWallet.walletBalanceMinor
    const cinderbuildRevenueWalletBalanceMinorAfter = cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor

    await accountWalletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({ walletBalanceMinor: cinderbuildRevenueWallet.walletBalanceMinor + cinderbuildRevenueMinor })
      .where({ id: cinderbuildRevenueWallet.id })
      .execute()

    const cinderbuildEscrowChargesFinancialTransaction = new FinancialTransaction().initialize(
      cinderbuildRevenueWallet, PaymentTransactionTypes.ESCROW_TO_CINDERBUILD_REVENUE,
      cinderbuildRevenueMinor, cinderbuildRevenueWalletBalanceMinorBefore, cinderbuildRevenueWalletBalanceMinorAfter,
      cinderbuildRevenueWallet.currency,
      PaymentTransactionStatus.PAID, undefined, metadata)
    cinderbuildEscrowChargesFinancialTransaction.description = `CinderBuild revenue for order: #${order.referenceNumber}`

    await financialTransactionT.save(cinderbuildEscrowChargesFinancialTransaction)
    //--
    const isAllGood = await incrementEarningStatistics(transactionalEntityManager, order.sellerUserId, sellerPayoutMinor)

    return isAllGood
  })

  if(allDone) {
    const notificationMetadata = {
      orderUuid: order.uuid,
    }
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.EMAIL]: true,
    }
    
    const now = Utils.utcNow()
    const newPaymentStatusEntry = {
      paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
      dateTimeInISO8601: now.toISOString()
    }
    order.statusHistory = order.statusHistory || []

    await orderT.createQueryBuilder()
      .update(Order)
      .set({
        paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
        paymentStatusHistory: [...order.paymentStatusHistory, newPaymentStatusEntry]  
      })
      .where({ id: order.id })
      .execute()
  
    await NotificationService.sendSingleNotificationToUserId(sellerUser.id, sellerUser.uuid,
      NotificationMessageTypes.ESCROW_PAYMENT_TO_SELLER, 
      'Payment for order', `${sellerAccountWallet.currency}${amountMinor / 100} Payment for order: #${order.referenceNumber}`, 
      notificationTransports, notificationMetadata)
  }
  return true

}

export const refundBuyerForOrder = async (order: Order) => {
  const amountMinor = order.calculatedTotalCostMajor * 100
  const buyerWallet = await WalletService.getCustomerWallet(order.buyerUserId)

  const notificationMetadata = {
    orderUuid: order.uuid,
  }

  // TODO: Inform support so that dispute can be investigated before refund issued
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.EMAIL]: true,
  }
  
  const notificationTitle = 'Order dispute acknowledgement'
  const notificationBody = `We acknowledge your disput for order: #${order.referenceNumber}. We will investigate and issue a refund if applicable.`

  await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
    NotificationMessageTypes.ORDER_DISPUTE_ACKNOWLEDGEMENT,
    notificationTitle, notificationBody, notificationTransports,
    notificationMetadata)
}

const incrementEarningStatistics = async (transactionalEntityManager: EntityManager, sellerUserId: number, amountMinor: number): Promise<boolean> => {
  const monthEarningTransactionT = transactionalEntityManager.getRepository(EarningsByMonth)
  const monthYearTransactionT = transactionalEntityManager.getRepository(EarningsByYear)

  const monthISO8601 = moment.utc().format('YYYY-MM')

  let monthEarning = await monthEarningTransactionT.findOne({
    userId: sellerUserId,
    monthISO8601,
  })
  if(monthEarning) {
    await monthEarningTransactionT.createQueryBuilder()
      .update(EarningsByMonth)
      .set({ totalEarningsMinor: monthEarning.totalEarningsMinor + amountMinor })
      .where({ id: monthEarning.id })
      .execute()
  } else {
    monthEarning = new EarningsByMonth().initialize(sellerUserId, monthISO8601, amountMinor)
    await monthEarningTransactionT.save(monthEarning)
  }

  //--
  const year = moment.utc().format('YYYY')
  let yearEarning = await monthYearTransactionT.findOne({
    userId: sellerUserId,
    year,
  })
  if(yearEarning) {
    await monthYearTransactionT.createQueryBuilder()
      .update(EarningsByYear)
      .set({ totalEarningsMinor: yearEarning.totalEarningsMinor + amountMinor })
      .where({ id: yearEarning.id })
      .execute()
  } else {
    yearEarning = new EarningsByYear().initialize(sellerUserId, year, amountMinor)
    await monthYearTransactionT.save(yearEarning)
  }
  return true
}
