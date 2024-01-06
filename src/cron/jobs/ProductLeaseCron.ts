import BaseCron from './BaseCron'
import logger from '../../logger'
import { FinancialTransaction, FinancialTransactionMetadata } from '../../entity/FinancialTransaction'
import { getFreshConnection } from '../../db'
import { ProductLease } from '../../entity/ProductLease'
import { Between, In, InsertResult, LessThan, MoreThan } from 'typeorm';
import * as Utils from "../../utils/core"
import moment from 'moment'
import { WalletType } from '../../enums//WalletType'
import { Wallet } from '../../entity/Wallet'
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../../enums/PaymentTransaction'


export default class ProductLeaseCron extends BaseCron {
  
  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()
    
    const productLeaseRepo = connection.getRepository(ProductLease)

    const now = Utils.utcNow()

    const productLeases = await productLeaseRepo.find({
      where: {
        isActive: true,
        isSoftDeleted: false,
        nextLeasePaymentDueDate: LessThan(now),
        isMultiStageInterestCharge: false,
      },
      take: 100,
      order: { createdAt: 'DESC' },
    })
    if (!productLeases.length) {
      return
    }

    const buyerUserIds = productLeases.map(productLease => productLease.userId)

    const walletRepo = connection.getRepository(Wallet)
    const wallets = await walletRepo.find({
      userId: In(buyerUserIds),
      type: WalletType.CUSTOMER_WALLET,
    })

    // update test set info = tmp.info from(values(1, 'new1'), (2, 'new2'), (6, 'new6')) as tmp (id, info) where test.id = tmp.id;

    const updateProductLeaseBatchQueryValues: string[] = productLeases
      .map(productLease => {
        if (productLease.isPaid) {
          const sameNextLeasePaymentDueDate = moment.utc(productLease.nextLeasePaymentDueDate).format('YYYY-MM-DD HH:mm:ss')
          return `(${productLease.id}, '${sameNextLeasePaymentDueDate}'::timestamp, FALSE)`
        } 
          const newNextLeasePaymentDueDate = moment.utc(productLease.nextLeasePaymentDueDate).add(30, 'days').format('YYYY-MM-DD HH:mm:ss')
          return `(${productLease.id}, '${newNextLeasePaymentDueDate}'::timestamp, TRUE)`
        
      })

    const updateProductLeaseBatchQuery =
      `UPDATE product_leases set next_lease_payment_due_date = productlease_update.next_lease_payment_due_date, is_active = productlease_update.is_active
        from(values${updateProductLeaseBatchQueryValues.join(",")}) as productlease_update (id, next_lease_payment_due_date, is_active)
        where product_leases.id = productlease_update.id;`
    //--
    const updateWalletBatchQueryValues = productLeases.map(productLease => {
      const theWallet = wallets.find(aWallet => aWallet.userId === productLease.userId)
      const walletBalanceMinorBefore = theWallet?.walletBalanceMinor ?? 0
      const newWalletBalanceMinor = (walletBalanceMinorBefore - (productLease.principalAmountMinor * productLease.interestRatePercentage/100)).toFixed(2)

      return `(${theWallet?.id}, ${newWalletBalanceMinor})`
    })
    const updateWalletBatchQuery = 
      `UPDATE wallets set wallet_balance_minor = wallet_update.walletBalanceMinor
        from(values${updateWalletBatchQueryValues.join(",")}) as wallet_update (id, walletBalanceMinor)
        where wallets.id = wallet_update.id;`

    
    const financialTransactionsBatch: FinancialTransaction[] = productLeases.map(productLease => {
      const theWallet = wallets.find(aWallet => aWallet.userId === productLease.userId)
      const interestAmountMinor = (productLease.principalAmountMinor * productLease.interestRatePercentage/100)
      const walletBalanceMinorBefore = theWallet?.walletBalanceMinor ?? 0
      const newWalletBalanceMinor = walletBalanceMinorBefore - interestAmountMinor

      const metadata: FinancialTransactionMetadata = {
        productLeaseId: productLease.id
      }

      const financialTransaction = new FinancialTransaction().initialize(
        theWallet!, PaymentTransactionTypes.PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT,
        interestAmountMinor, theWallet!.walletBalanceMinor, newWalletBalanceMinor, theWallet!.currency, PaymentTransactionStatus.PAID,
        undefined, metadata)
      financialTransaction.description = `${theWallet?.currency}${interestAmountMinor/100} product lease interest`
  
      return financialTransaction
    })
  
    const updateSuccessful = await connection.transaction(async transactionalEntityManager => {
      const productLeaseEntityManager = transactionalEntityManager.getRepository(ProductLease).manager
      const accountWalletEntityManager = transactionalEntityManager.getRepository(Wallet).manager
      const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction)

      const productLeaseUpdateResult = await productLeaseEntityManager.query(updateProductLeaseBatchQuery, [])
      const accountWalletUpdateResults = await accountWalletEntityManager.query(updateWalletBatchQuery, [])
      const insertResult: InsertResult = await financialTransactionRepo.createQueryBuilder()
        .insert()
        .into(FinancialTransaction)
        .values(financialTransactionsBatch)
        .execute()
  
      return true
    })
  }
}
