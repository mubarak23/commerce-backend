/* eslint-disable no-await-in-loop */
import moment from 'moment'
import { getFreshConnection } from '../../db'
import { Order } from '../../entity/Order'
import { LessThan, Connection } from 'typeorm';
import OrderStatuses, { OrderPaymentStatuses, OrderPaymentVariantDto } from '../../enums/Statuses'
import BaseCron from './BaseCron'
import { FinancialTransaction, FinancialTransactionMetadata } from '../../entity/FinancialTransaction';
import { Wallet } from '../../entity/Wallet';
import * as WalletService from "../../services/walletService"
import * as ConfigPropertyService from "../../services/configPropertyService"
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../../enums/PaymentTransaction';
import ConfigProperties from '../../enums/ConfigProperties';
import * as Utils from "../../utils/core"

export default class ChargeBuyerCron extends BaseCron {

  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()

    const nowMoment = moment.utc()

    const orderRepo = connection.getRepository(Order)
    const ordersMarkedAsPaymentInDefault = await orderRepo.find({
      where: {
        status: OrderStatuses.PAYMENT_DEFAULT,
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
        paymentVariant: OrderPaymentVariantDto.PAY_ON_DELIVERY,
        markedAsPaymentDefaultAt: LessThan(nowMoment.toDate())
      },
      order: { createdAt: 'DESC' },
    })
    
    if(!ordersMarkedAsPaymentInDefault.length ){
      return null
    }
    let paymentDefaultDailyChargePercentage = 0
    
    paymentDefaultDailyChargePercentage = await ConfigPropertyService.getConfigProperty(
      ConfigProperties.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE
    ) as number
    paymentDefaultDailyChargePercentage = paymentDefaultDailyChargePercentage ?? 0

    for(const order of ordersMarkedAsPaymentInDefault) {
      await this.applyPaymentDefaultDailyCharge(connection, order, paymentDefaultDailyChargePercentage)
    }
    return true
  }

  async applyPaymentDefaultDailyCharge(connection: Connection, order: Order, 
    paymentDefaultDailyChargePercentage: number
  ): Promise<boolean> {
    const orderAmountMinor = order.calculatedTotalCostMajor * 100
    const buyerWallet = await WalletService.getCustomerWallet(order.buyerUserId)

    const dailyPaymentDefaultChargeMinor = Utils.normalizeMoney(orderAmountMinor * paymentDefaultDailyChargePercentage / 100)

    const walletBalanceMinorBefore = buyerWallet.walletBalanceMinor
    const walletBalanceMinorAfter = buyerWallet.walletBalanceMinor - dailyPaymentDefaultChargeMinor
  
    const walletBalanceDebitedStatus: boolean = await connection.transaction(async (transactionalEntityManager) => {
      const walletRepoT = transactionalEntityManager.getRepository(Wallet)
      const financialRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
    
      await walletRepoT.createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: walletBalanceMinorAfter,
        })
        .where({
          id: buyerWallet.id,
        })
        .execute()
  
      const metadata: FinancialTransactionMetadata = {}
    
      const debitFinancialTransaction = new FinancialTransaction().initialize(
        buyerWallet, PaymentTransactionTypes.ORDER_PAYMENT_DEFAULT_DAILY_DEBIT,
        dailyPaymentDefaultChargeMinor, walletBalanceMinorBefore, walletBalanceMinorAfter, 
        buyerWallet.currency, PaymentTransactionStatus.PAID,
        undefined, metadata)
      const transactionDescription = [
        `${buyerWallet.currency}${dailyPaymentDefaultChargeMinor / 100} daily debit for`,
        ` order: #${order.referenceNumber} payment default.`
      ].join('')
      debitFinancialTransaction.description = transactionDescription
  
      await financialRepoT.save(debitFinancialTransaction)
  
      return true
    })

    return walletBalanceDebitedStatus
  }
}