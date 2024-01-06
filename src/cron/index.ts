import NodeCron from 'node-cron'

import CronRunNames from "../enums/CronRunNames"
import ChargeBuyerCron from './jobs/ChargeBuyerCron'
import ClosePaidOrderCron from './jobs/ClosePaidOrderCron'
import ConfirmWalletOrdersCron from './jobs/ConfirmWalletOrdersCron'
import NotifyBuyerBeforeCloseOrderCron from './jobs/NotifyBuyerBeforeCloseOrderCron'
import QuoteRequestExpireCron from './jobs/QuoteRequestExpireCron'

const OneMinute = '* * * * *'
const FiveMinutes = '* 5 * * *'
const TenMinutes = '* 10 * * *'
const FifthMinutes = '* 15 * * *'
const OneHours = '* * 1 * *'
const TwentyFourHours = '* * 24 * * '
const OneMonth = '* * * 1 *'
const TenSeconds = '*/10 * * * * *'

export const start = async () => {
  // NodeCron.schedule(OneMinute, () => {
  //   new ProductLeaseCron().handler(CronRunNames.PRODUCT_LEASE_INTEREST_APPLYER)
  // })
  // NodeCron.schedule(OneMinute, () => {
  //   new MultiStageProductLeaseCron().handler(CronRunNames.MULTI_STAGE_PRODUCT_LEASE_INTEREST_APPLYER)
  // })
  NodeCron.schedule(TwentyFourHours, () => {
    new ClosePaidOrderCron().handler(CronRunNames.CLOSED_PAID_ORDER)
  })
  NodeCron.schedule(OneMinute, () => {
    new QuoteRequestExpireCron().handler(CronRunNames.QUOTE_REQUEST_EXPIRE)
  })

  NodeCron.schedule(TwentyFourHours, () => {
    new ChargeBuyerCron().handler(CronRunNames.CHARGE_BUYER_ON_PAYMENT_DEFAULT)
  })

  NodeCron.schedule(TwentyFourHours, () => {
    new NotifyBuyerBeforeCloseOrderCron().handler(CronRunNames.NOTIFY_BUYER_BEFORE_CLOSE_ORDER)
  })

  NodeCron.schedule(TwentyFourHours, () => {
    new ConfirmWalletOrdersCron().handler(CronRunNames.CONFIRM_WALLET_ORDERS)
  })

  // NodeCron.schedule(TwentyFourHours, () => {
  //   new CStoreOrderLeaseChargeCron().handler(CronRunNames.C_STORE_ORDER_LEASE_CHARGE)
  // })

}
