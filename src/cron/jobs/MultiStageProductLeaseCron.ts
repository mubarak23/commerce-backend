import * as _ from 'underscore'
import BaseCron from './BaseCron'
import { FinancialTransaction, FinancialTransactionMetadata } from '../../entity/FinancialTransaction'
import { getFreshConnection } from '../../db'
import { ProductLease } from '../../entity/ProductLease'
import { In, InsertResult, LessThan, MoreThan } from 'typeorm';
import * as Utils from "../../utils/core"
import moment from 'moment'
import { Wallet } from '../../entity/Wallet'
import { WalletType } from '../../enums/WalletType'
import { PaymentTransactionStatus, PaymentTransactionTypes } from '../../enums/PaymentTransaction'

export default class MultiStageProductLeaseCron extends BaseCron {
  
  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()
    
    const now = Utils.utcNow()

    const productLeaseRepo = connection.getRepository(ProductLease)

    const plpslpToCharge = await productLeaseRepo.find({
      where: {
        isActive: true,
        principalAmountMinor: MoreThan(0),
        isSoftDeleted: false,
        nextInterestChargeDate: LessThan(now),
        isMultiStageInterestCharge: true,
      },
    })

    if (!plpslpToCharge.length) {
      return
    }
    const buyerUserIds = plpslpToCharge.map(productLease => productLease.userId)

    const walletRepo = connection.getRepository(Wallet)
    const accountMainWallets = await walletRepo.find({
      userId: In(buyerUserIds),
      type: WalletType.CUSTOMER_WALLET,
    })

    const updateProductLeaseBatchQuery = this.constructPlpUpdateSqlQuery(plpslpToCharge, accountMainWallets)
    const updateWalletBatchQuery = this.constructCustomerWalletUpdateSqlQuery(plpslpToCharge, accountMainWallets)

    const financialTransactionsBatch: FinancialTransaction[] = []

    for(const productLease of plpslpToCharge) {
      const accountWallet = accountMainWallets.find(accountWallet =>
        `${accountWallet.userId}` === `${productLease.userId}`)
      const interestAmountMinor = (productLease.principalAmountMinor * productLease.nextInterestRatePercentage/100)
      const newWalletBalanceMinor = accountWallet!.walletBalanceMinor - interestAmountMinor

      const metadata: FinancialTransactionMetadata = {
        productLeaseId: productLease.id
      }

      const financialTransaction = new FinancialTransaction().initialize(
        accountWallet!, PaymentTransactionTypes.PRODUCT_LEASE_INTEREST_PAYMENT_DEBIT,
        interestAmountMinor, accountWallet!.walletBalanceMinor, newWalletBalanceMinor, 
        accountWallet!.currency, PaymentTransactionStatus.PAID,
        undefined, metadata)
      // financialTransaction.description = `${accountWallet!.currency}${interestAmountMinor/100} product lease interest`
      financialTransaction.description = `Product lease ${productLease.nextInterestRatePercentage}% interest`

      financialTransactionsBatch.push(financialTransaction)
    }

    const updateSuccessful = await connection.transaction(async transactionalEntityManager => {
      const productLeaseManager = transactionalEntityManager.getRepository(ProductLease).manager
      const walletEntityManager = transactionalEntityManager.getRepository(Wallet).manager
      const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction)

      await productLeaseManager.query(updateProductLeaseBatchQuery, [])
      await walletEntityManager.query(updateWalletBatchQuery, [])
      await financialTransactionRepo.createQueryBuilder()
        .insert()
        .into(FinancialTransaction)
        .values(financialTransactionsBatch)
        .execute()
  
      return true
    })
    console.log(`ProductLeaseCron updateSuccessful: ${updateSuccessful}`)
  }

  private constructPlpUpdateSqlQuery(productLeases: ProductLease[],
      accountMainWallets: Wallet[]): string { 
    const nowMoment = moment.utc()

    const updateProductLeaseBatchQueryValues = productLeases.map(productLease => {
      const accountWallet = accountMainWallets.find(accountWallet => `${accountWallet.userId}` === `${productLease.userId}`)
      const formattedSameNextInterestRateChargeDate = moment.utc(productLease.nextInterestChargeDate).format('YYYY-MM-DD HH:mm:ss')

      if (!accountWallet) {
        return `(${productLease.id}, '${formattedSameNextInterestRateChargeDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive})`
      }
      const plpNextInterestChargeDateMoment = moment.utc(productLease.nextInterestChargeDate)

      if(plpNextInterestChargeDateMoment.isBefore(nowMoment)) {
        if(productLease.interestChargeCurrentStage === 1) {
          const plpNextInterestChargeDate = moment.utc(productLease.createdAt).add(6, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
          return `(${productLease.id}, '${plpNextInterestChargeDate}'::timestamp, 3, TRUE, 2)`
        } if(productLease.interestChargeCurrentStage === 2) {
          const plpNextInterestChargeDate = moment.utc(productLease.createdAt).add(14, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
          return `(${productLease.id}, '${plpNextInterestChargeDate}'::timestamp, 2, TRUE, 3)`
        } 
          const nextLeasePaymentDueDate = moment.utc(productLease.nextLeasePaymentDueDate).format('YYYY-MM-DD HH:mm:ss')
          return `(${productLease.id}, '${nextLeasePaymentDueDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive}, ${productLease.interestChargeCurrentStage})`
        
      } 
      return `(${productLease.id}, '${formattedSameNextInterestRateChargeDate}'::timestamp, ${productLease.nextInterestRatePercentage}, ${productLease.isActive}, ${productLease.interestChargeCurrentStage})`
    })

    // update test set info = tmp.info from(values(1, 'new1'), (2, 'new2'), (6, 'new6')) as tmp (id, info) where test.id = tmp.id;

    const query = 
      `UPDATE product_leases set 
          next_interest_charge_date = product_leases_update.next_interest_charge_date, 
          next_interest_rate_percentage = product_leases_update.next_interest_rate_percentage, 
          is_active = product_leases_update.is_active, 
          interest_charge_current_stage = product_leases_update.interest_charge_current_stage
        from(values${updateProductLeaseBatchQueryValues.join(",")}) as product_leases_update (id, next_interest_charge_date, next_interest_rate_percentage, is_active, interest_charge_current_stage)
        where product_leases.id = product_leases_update.id;`
    
    return query
  }

  private constructCustomerWalletUpdateSqlQuery(plpslpToCharge: ProductLease[], accountMainWallets: Wallet[]):string { 
    const updateWalletBatchQueryValues = plpslpToCharge.map(productLease => {
      const accountWallet = accountMainWallets.find(accountWallet => `${accountWallet.userId}` === `${productLease.userId}`)
      const newWalletBalanceMinor = (accountWallet!.walletBalanceMinor - (productLease.principalAmountMinor * productLease.nextInterestRatePercentage/100)).toFixed(2)

      return `(${accountWallet!.id}, ${newWalletBalanceMinor})`
    })
    const query = 
      `UPDATE wallets set wallet_balance_minor = accountwallet_update.walletBalanceMinor
        from(values${updateWalletBatchQueryValues.join(",")}) as accountwallet_update (id, walletBalanceMinor)
        where wallets.id = accountwallet_update.id;`
    
    return query
  }
}
