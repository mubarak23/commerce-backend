import moment from 'moment'
import { In, InsertResult, LessThanOrEqual } from 'typeorm'
import { getFreshConnection } from '../../db'
import { FinancialTransaction, FinancialTransactionMetadata } from '../../entity/FinancialTransaction'
import { Order } from '../../entity/Order'
import { Wallet } from '../../entity/Wallet'
import { WalletType } from '../../enums//WalletType'
import { OrderPaymentVariant } from '../../enums/OrderPaymentVariant'
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../../enums/PaymentTransaction'
import OrderStatuses from '../../enums/Statuses'
import BaseCron from './BaseCron'


export default class CStoreOrderLeaseChargeCron extends BaseCron {
  
  public async startWorking(): Promise<any> {

    console.log('Start of the CRON Job');
    
    const connection = await getFreshConnection()


    const orderRepo = connection.getRepository(Order)


    const aFourDayAgoMoment = moment.utc().subtract(4, 'days');

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    };


    const cstoreUnpaidOrders = await orderRepo.find({
      where: {
        status: OrderStatuses.IN_PROGRESS,
        paymentVariant: OrderPaymentVariant.PAY_ON_DELIVERY,
        updatedAt: LessThanOrEqual(aFourDayAgoMoment.toDate())
      },
      join,
      order: { createdAt: 'DESC' },
    })

    if(!cstoreUnpaidOrders.length) {
      return
    }

    console.log('C store unpaid order', cstoreUnpaidOrders)
    // const sellerUserIds = products.filter((product) => product.isActive === true).map((product) => product.userId);
    
    const cStorebuyerUserIds = cstoreUnpaidOrders.filter((userOrder) => userOrder.buyerUser.settings?.isOnCStore === true).map(CstoreOrder => CstoreOrder.buyerUserId)
  
    console.log('C store User Ids:', cStorebuyerUserIds)

    const walletRepo = connection.getRepository(Wallet)
    const wallets = await walletRepo.find({
      userId: In(cStorebuyerUserIds),
      type: WalletType.CUSTOMER_WALLET,
    })

    const paymentDefaultChargePercentage = 0.167
    
    // paymentDefaultChargePercentage = await ConfigPropertyService.getConfigProperty(
    //   ConfigProperties.C_STORE_DEFAULT_PAYMENT_CHARGE_PERCENTAGE
    // ) as number
    // paymentDefaultChargePercentage = paymentDefaultChargePercentage ?? 0


    const updateCstoreWalletBatchQueryValues = cstoreUnpaidOrders.filter((userOrder) => userOrder.buyerUser.settings?.isOnCStore === true).map(order => {
      const theWallet = wallets.find(aWallet => aWallet.userId === order.buyerUserId)
      const walletBalanceMinorBefore = theWallet?.walletBalanceMinor ?? 0
      const calculatedCostMinor = order.calculatedTotalCostMajor * 100
      const newWalletBalanceMinor = (walletBalanceMinorBefore - (calculatedCostMinor * paymentDefaultChargePercentage/100)).toFixed(2)

      return `(${theWallet?.id}, ${newWalletBalanceMinor})`
    })

    const updateWalletBatchQuery = 
      `UPDATE wallets set wallet_balance_minor = wallet_update.walletBalanceMinor
        from(values${updateCstoreWalletBatchQueryValues.join(",")}) as wallet_update (id, walletBalanceMinor)
        where wallets.id = wallet_update.id;`

    const financialTransactionsCstoreBatch: FinancialTransaction[] = cstoreUnpaidOrders.filter((userOrder) => userOrder.buyerUser.settings?.isOnCStore === true).map(order => {
      const theWallet = wallets.find(aWallet => aWallet.userId === order.buyerUserId)
      const calculatedCostMinor = order.calculatedTotalCostMajor * 100
      const interestAmountMinor = (calculatedCostMinor * paymentDefaultChargePercentage/100)
      const walletBalanceMinorBefore = theWallet?.walletBalanceMinor ?? 0
      const newWalletBalanceMinor = walletBalanceMinorBefore - interestAmountMinor

      const metadata: FinancialTransactionMetadata = {
        orderUuid: order.uuid
      }

      const {walletBalanceMinor} = theWallet!;


      const financialTransaction = new FinancialTransaction().initialize(
        theWallet!, PaymentTransactionTypes.C_STORE_DEFAULT_PAYMENT_CHARGES,
        interestAmountMinor, walletBalanceMinor, newWalletBalanceMinor, theWallet!.currency, PaymentTransactionStatus.PAID,
        undefined, metadata)
      financialTransaction.description = `${theWallet?.currency}${(interestAmountMinor/100).toFixed(2)} unpaid order (${order.referenceNumber}) interest charge`
  
      return financialTransaction
    })

  
    const updateSuccessful = await connection.transaction(async transactionalEntityManager => {
      const accountWalletEntityManager = transactionalEntityManager.getRepository(Wallet).manager
      const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction)

      const accountWalletUpdateResults = await accountWalletEntityManager.query(updateWalletBatchQuery, [])
      const insertResult: InsertResult = await financialTransactionRepo.createQueryBuilder()
        .insert()
        .into(FinancialTransaction)
        .values(financialTransactionsCstoreBatch)
        .execute()
  
      return true
    })
  }
}
