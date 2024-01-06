/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import * as _ from 'underscore'
import { Order } from '../entity/Order'
import { User } from '../entity/User'

import { EntityManager, getRepository, In, Not } from 'typeorm'
import { getFreshConnection } from '../db'
import { PaymentInitializeResponse } from '../dto/PaymentInitializeResponse'
import { FinancialTransaction, FinancialTransactionMetadata } from '../entity/FinancialTransaction'
import { Wallet } from '../entity/Wallet'
import { WareHouseToSiteDeliveryRequest } from '../entity/WareHouseToSiteDeliveryRequest'
import NotificationMessageTypes from '../enums/NotificationMessageTypes'
import { NotificationTransportMode, NotificationTransports } from '../enums/NotificationTransport'
import { OrderPaymentVariant } from '../enums/OrderPaymentVariant'
import { PaymentInitializeVariant } from '../enums/PaymentInitializeVariant'
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../enums/PaymentTransaction'
import { Roles } from '../enums/Roles'
import OrderStatuses, { OrderPaymentStatuses } from '../enums/Statuses'
import { PaystackPayingUser } from '../interfaces/PaystackPayingUser'
import Logger from '../logger'
import * as EmailService from "../services/emailService"
import * as NotificationService from "../services/notificationService"
import * as OrderService from "../services/orderService"
import * as PaystackService from "../services/paystackService"
import * as Utils from "../utils/core"
import { BadRequestError, ServerError, UnprocessableEntityError } from "../utils/error-response-types"
import * as EscrowService from './escrowService'
import * as WalletService from './walletService'
import * as WareHouseWalletService from './wareHouseWalletService'


export const payWithWallet = async (orders: Order[], orderAmountMajor: number, currentUser: User) : Promise<boolean> => {
  const sourceWallet = await WalletService.getCustomerWallet(currentUser.id)

  const {walletBalanceMinor} = sourceWallet
  const orderAmountMinor = Utils.normalizeMoney(orderAmountMajor * 100)
  
  const connection = await getFreshConnection()
  const orderRepo = connection.getRepository(Order);

  if(orderAmountMajor === 0) {
    for (const order of orders) {
      await EscrowService.afterConfirmedOrderPayment(order)
    }
    return true
  }

  if(orders[0].paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY) {
    if (walletBalanceMinor < orderAmountMinor) {
      await orderRepo.delete({
        id: In(orders.map(ord => ord.id))
      })
    
      throw new UnprocessableEntityError('Insufficient balance to process payment of order')
    }
  }

  for(const order of orders) {
    const mailToAdmin = await EmailService.sendOrderDetailsMailtoAdmin(currentUser, order)
  }

  const fundsMoveResult = await EscrowService.afterOrderPaymentWithWallet(orders, sourceWallet)

  return fundsMoveResult
}

export const initPaystackPayment = async (payingUser: User,
    paymentVariant: PaymentInitializeVariant, amountMajor: number,
  ): Promise<PaymentInitializeResponse> => {
  let paymentTransactionType = PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET

  if (paymentVariant === PaymentInitializeVariant.FUND_MAIN_WALLET) {
    paymentTransactionType = PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET
  } else if (paymentVariant === PaymentInitializeVariant.PRODUCT_LEASE_PAYMENT) {
    paymentTransactionType = PaymentTransactionTypes.PRODUCT_LEASE_PAYMENT
  } else {
    throw new BadRequestError('Invalid payment initialize type')
  }
  //--
  const paystackPayingUser: PaystackPayingUser = {
    emailAddress: payingUser.emailAddress,
    fullName: `${payingUser.firstName} ${payingUser.lastName}`
  }
  const {
    paymentReference,
    paymentProviderRedirectUrl,
    accessCode,
    redirectUrlAfterPayment
  } = await PaystackService.initializeTransaction(paystackPayingUser, amountMajor)

  const sourceWallet = await WalletService.getCustomerWallet(payingUser.id)
  const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor

  const metadata: FinancialTransactionMetadata = {}

  const amountMinor: number = (amountMajor || 0) * 100
  const financialTransaction = new FinancialTransaction().initialize(
    sourceWallet, paymentTransactionType,
    amountMinor, walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransactionStatus.UNPAID,
    paymentReference, metadata)
  financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} main wallet fund`

  const connection = await getFreshConnection()
  const transactionRepo = connection.getRepository(FinancialTransaction)
  await transactionRepo.save(financialTransaction)

  return {
    paymentProviderRedirectUrl,
    paymentReference,
    accessCode,
    redirectUrlAfterPayment
  }
}

export const processAnyUnpaidOrders = async (buyerUserId: number) => {
  const orderRepo = getRepository(Order)

  const existingUnpaidOrders = await OrderService.buyerUnpaidOrders(buyerUserId, [])
  if(!existingUnpaidOrders.length) {
    return
  }
  console.log(existingUnpaidOrders)
  //--
  let totalOrderAmountMajor = 0
  for (const existingUnpaidOrder of existingUnpaidOrders) {
    totalOrderAmountMajor += existingUnpaidOrder.calculatedTotalCostMajor
  }
  const totalOrderAmountMinor = totalOrderAmountMajor * 100
  const sourceWallet = await WalletService.getCustomerWallet(buyerUserId)
  //--
  const userRepo = getRepository(User)
  const payingUser = await userRepo.findOne({
    id: buyerUserId,
  })
  const existingUnpaidOrdersOrderUuids = existingUnpaidOrders.map(order => order.uuid)

  const existingWalletDeductTransactionsTemp = await getRepository(FinancialTransaction)
    .createQueryBuilder()
    .where("metadata->>'orderUuid' IN (:...orderUuids)", {
      orderUuids: existingUnpaidOrdersOrderUuids,
    })
    .getMany()
  const existingWalletDeductTransactions: FinancialTransaction[] = []

  for(const eWallDeductTransTemp of existingWalletDeductTransactionsTemp) {
    if(eWallDeductTransTemp.paidStatus === PaymentTransactionStatus.PAID && 
        eWallDeductTransTemp.walletBalanceMinorAfter && eWallDeductTransTemp.walletBalanceMinorAfter < 0) {
      existingWalletDeductTransactions.push(eWallDeductTransTemp)
    }
  }

  const lowestAfterBalanceMinor: number = _.min(existingWalletDeductTransactions.map(trans => {
    return trans.walletBalanceMinorAfter
  })) as number
  const whatWalletShouldBeAfterFullPayment = lowestAfterBalanceMinor + totalOrderAmountMinor;

  // if(sourceWallet.walletBalanceMinor < whatWalletShouldBeAfterFullPayment) {
  //   return
  // }
  
  console.log('what buyer wallet should be after payment', whatWalletShouldBeAfterFullPayment)
  if(sourceWallet.walletBalanceMinor < 0 ){
    return 
  }
  
  if(existingWalletDeductTransactions.length) {
    for(const unPaidOrder of existingUnpaidOrders) {
      const foundDeductionTransaction = existingWalletDeductTransactions.find(deductTrans => 
        deductTrans.metadata?.orderUuid === unPaidOrder.uuid)
      
      if(!foundDeductionTransaction) {
        await OrderService.processOrdersPayment(
          [unPaidOrder],
          OrderPaymentVariant.WALLET,
          payingUser!
        );
      }
    }
  } else {
    await OrderService.processOrdersPayment(
      existingUnpaidOrders,
      OrderPaymentVariant.WALLET,
      payingUser!
    );
  }
  
  const join = {
    alias: "order",
    leftJoinAndSelect: {
      buyerUser: "order.buyerUser",
      sellerUser: "order.sellerUser",
    },
  };

  const existingUnconfirmedOrders = await orderRepo.find({
    where: {
      buyerUserId,
      paymentVariant: OrderPaymentVariant.PAY_ON_DELIVERY,        
      status: Not(In([
        OrderStatuses.COMPLETED, OrderStatuses.CONFIRMED, OrderStatuses.ENDED_WITH_DISPUTES,
        OrderStatuses.CANCELLED_BY_BUYER, OrderStatuses.CANCELLED_BY_SELLER,
      ])),
    },
    join,
  })
  if(!existingUnconfirmedOrders.length) {
    return
  }

  for(const openOrder of existingUnconfirmedOrders) {
    await OrderService.updateOrderStatus(openOrder, OrderStatuses.CONFIRMED, payingUser!)
  }
}

export const processFundWalletTransaction = async (
  transaction: FinancialTransaction, sourceWallet: Wallet,
): Promise<boolean> => {
  const financialTransactionRepo = getRepository(FinancialTransaction)
  const walletRepo = getRepository(Wallet)
  
  const paymentTransactionUpdate: any = {
    walletBalanceMinorAfter: () => `wallet_balance_minor_before + ${transaction.amountMinor}`,
    paidStatus: PaymentTransactionStatus.PAID,
    paidAt: Utils.utcNow()
  }
  await financialTransactionRepo.update(transaction.id, paymentTransactionUpdate)

  await walletRepo.createQueryBuilder()
    .update(Wallet)
    .set({
      walletBalanceMinor: sourceWallet!.walletBalanceMinor + transaction.amountMinor,
    })
    .where({
      userId: transaction.userId,
    })
    .execute()
        
  const notificationMessage = `${transaction.currency}${transaction.amountMinor/100} funded to your main wallet`
  const userRepo = getRepository(User)
  const primaryUser = await userRepo.findOne({
    id: transaction.userId,
  })
  if(!primaryUser) {
    return true
  }

  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.EMAIL]: true,
  }

  await NotificationService.sendSingleNotificationToUserId(primaryUser!.id, primaryUser!.uuid,
    NotificationMessageTypes.MAIN_WALLET_FUND, 'Main Wallet funded successfully!', notificationMessage, 
    notificationTransports)

  if(primaryUser.role !== Roles.AFFILIATE) {
    await processAnyUnpaidOrders(sourceWallet.userId)
  }
  
  return true
}

export const processPayForOrderTransaction = async (orderPaymentVariant: OrderPaymentVariant,
  transaction: FinancialTransaction, sourceWallet: Wallet,
): Promise<boolean> => {
  const financialTransactionRepo = getRepository(FinancialTransaction)
  const walletRepo = getRepository(Wallet)
    
  const orderRepo = getRepository(Order)
  const join = {
    alias: "order",
    leftJoinAndSelect: {
      buyerUser: "order.buyerUser",
      sellerUser: "order.sellerUser",
    },
  };

  const order = await orderRepo.findOne({
    where: {
      paymentTransactionUuid: transaction.uuid
    },
    join,
  });

  console.log(order)

  if(orderPaymentVariant === OrderPaymentVariant.WALLET) {
    const paymentTransactionUpdate: any = {
      walletBalanceMinorAfter: () => `wallet_balance_minor_before - ${transaction.amountMinor}`,
      paidStatus: PaymentTransactionStatus.PAID,
      paidAt: Utils.utcNow()
    }
    await financialTransactionRepo.update(transaction.id, paymentTransactionUpdate)

    await walletRepo.createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: sourceWallet!.walletBalanceMinor - transaction.amountMinor,
      })
      .where({
        userId: transaction.userId,
      })
      .execute()
  } else if(orderPaymentVariant === OrderPaymentVariant.CARD) {
    const paymentTransactionUpdate: any = {
      paidStatus: PaymentTransactionStatus.PAID,
      paidAt: Utils.utcNow()
    }
    await financialTransactionRepo.update(transaction.id, paymentTransactionUpdate)
  }
 
  return EscrowService.afterConfirmedOrderPayment(order!)
  
}

export const processVerifiedPaystackPayment = async (transaction: FinancialTransaction,
    orderPaymentVariant: OrderPaymentVariant,
    sourceWallet: Wallet): Promise<boolean> => {
  try {
    if(transaction.transactionType === PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET) {
      return processFundWalletTransaction(transaction, sourceWallet)      
    }

    if(transaction.transactionType === PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER) {
      return processPayForOrderTransaction(orderPaymentVariant, transaction, sourceWallet)
    }
    return true
  } catch (e) {
    Logger.info(`Inside processVerifiedPaystackPayment exception: `, e.message)
    Logger.info(`Inside processVerifiedPaystackPayment exception stack: `, e.stack)
  }
  return true
}

export const processOrderRefundToBuyer = async (order: Order, transactionalEntityManager: EntityManager): Promise<boolean> => {
  const orderAmountMinor = order.calculatedTotalCostMajor * 100

  const now = Utils.utcNow()

  const sourceWallet = await WalletService.getCustomerWallet(order.buyerUserId)
  const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor
  const walletBalanceMinorAfter = sourceWallet.walletBalanceMinor + orderAmountMinor

  const orderRepoT = transactionalEntityManager.getRepository(Order)
  const financialTransactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
  const walletRepoT = transactionalEntityManager.getRepository(Wallet)

  order.paymentStatusHistory.push({
    status: OrderPaymentStatuses.BUYER_PAYMENT_REFUND,
    dateTimeInISO8601: now.toISOString()
  })

  const orderUpdateQuery: any = {}

  orderUpdateQuery.paymentStatus = OrderPaymentStatuses.BUYER_PAYMENT_REFUND
  orderUpdateQuery.paymentStatusHistory = order.paymentStatusHistory || []
  
  await orderRepoT.createQueryBuilder()
    .update(Order)
    .set(orderUpdateQuery)
    .where({ id: order.id })
    .execute()
  
  const metadata: FinancialTransactionMetadata = {
    orderUuid: order.uuid,
  }

  const financialTransaction = new FinancialTransaction().initialize(
    sourceWallet, PaymentTransactionTypes.ESCROW_TO_REFUND_BUYER,
    orderAmountMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, sourceWallet.currency, PaymentTransactionStatus.PAID,
    undefined, metadata)
  financialTransaction.description = `${sourceWallet.currency}${orderAmountMinor / 100} main wallet refund for order: #${order.referenceNumber}.`

  await financialTransactionRepoT.save(financialTransaction)

  await walletRepoT.createQueryBuilder()
    .update(Wallet)
    .set({
      walletBalanceMinor: walletBalanceMinorAfter,
    })
    .where({
      userId: order.buyerUserId,
    })
    .execute()

  return true
}

export const processDeliveryToSiteRequestCardPayment = async (currentUser: User, 
  DeliveryFeeTotalAmountMajor: number, WareHouseToSiteDelivery: WareHouseToSiteDeliveryRequest): Promise<PaymentInitializeResponse> => {
  
  const connection = await getFreshConnection()
  const paystackPayingUser: PaystackPayingUser = {
    emailAddress: currentUser.emailAddress,
    fullName: `${currentUser.firstName} ${currentUser.lastName}`
  }
  const DeliveryFeeTotalAmountMinor = DeliveryFeeTotalAmountMajor * 100
  const {
    paymentReference,
    paymentProviderRedirectUrl,
    accessCode,
    redirectUrlAfterPayment
  } = await PaystackService.initializeTransaction(paystackPayingUser, DeliveryFeeTotalAmountMinor)

  if (!paymentReference) {
    throw new ServerError('An error occurred while processing your payment. Please try again')
  }

   await connection.transaction(async (transactionalEntityManager) => {
      const sourceDeliveryWallet = await WareHouseWalletService.getCustomerSecondaryWallet(currentUser.accountId)
      const walletBalanceMinorBefore = sourceDeliveryWallet.walletBalanceMinor
  
      const metadata: FinancialTransactionMetadata = {
        wareHouseTositeUuid: WareHouseToSiteDelivery.uuid,
      }
  
      const financialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
        sourceDeliveryWallet, PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER,
        DeliveryFeeTotalAmountMinor, walletBalanceMinorBefore, undefined,
        sourceDeliveryWallet.currency ? sourceDeliveryWallet.currency : 'NGN', PaymentTransactionStatus.UNPAID,
        paymentReference, metadata)
      financialTransaction.description = `${sourceDeliveryWallet.currency ? sourceDeliveryWallet.currency : 'NGN' }${DeliveryFeeTotalAmountMinor} Delivery to Site Payment`
  
      const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
      const savedTransaction = await transactionRepoT.save(financialTransaction)
  
      const wareHouseToSiteDeliveryRepoT = transactionalEntityManager.getRepository(WareHouseToSiteDeliveryRequest)
      if(WareHouseToSiteDelivery) {
        await wareHouseToSiteDeliveryRepoT.createQueryBuilder()
          .update(Order)
          .set({ paymentTransactionUuid: savedTransaction.uuid })
          .where({ uuid: WareHouseToSiteDelivery.uuid })
          .execute()
      }
  })
  return {
    paymentReference,
    paymentProviderRedirectUrl,
    accessCode,
    redirectUrlAfterPayment
  }
} 
