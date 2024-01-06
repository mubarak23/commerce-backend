/* eslint-disable no-useless-return */
import BaseCron from './BaseCron'
import logger from '../../logger'
import { FinancialTransaction, FinancialTransactionMetadata } from '../../entity/FinancialTransaction'
import { getFreshConnection } from '../../db'
import { ProductLease } from '../../entity/ProductLease'
import { In, InsertResult, LessThan, MoreThan } from 'typeorm';
import * as Utils from "../../utils/core"
import moment from 'moment'
import { QuoteRequest } from '../../entity/QuoteRequest'
import { QuoteRequestStatuses } from '../../enums/Statuses'
import * as NotificationService from "../../services/notificationService"
import NotificationMessageTypes from '../../enums/NotificationMessageTypes'
import { NotificationMessage } from '../../entity/NotificationMessage'


export default class QuoteRequestExpireCron extends BaseCron {
  
  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()

    const quoteRequestRepo = connection.getRepository(QuoteRequest)

    const now = Utils.utcNow()
    const aDayAgoMoment = moment.utc().add(-24, 'days')

    const quoteRequestsDueForExpiry = await quoteRequestRepo.find({
      where: {
        status: QuoteRequestStatuses.PENDING,
        createdAt: LessThan(aDayAgoMoment.toDate())
      },
      take: 100,
      order: { createdAt: 'DESC' },
    })

    if (!quoteRequestsDueForExpiry.length) {
      return
    }

    const quoteRequestIds: number[] = quoteRequestsDueForExpiry.map(qRequest => qRequest.id)

    const notificationMsgs: NotificationMessage[] = quoteRequestsDueForExpiry.map(qRequest => {
      const notificationMessage = new NotificationMessage().initialize(qRequest.userId,
        NotificationMessageTypes.QUOTE_REQUEST_SELLER_EXPIRE,
        'Quote Request expiry',
        `Quote request: #${qRequest.referenceNumber} has expired`,
        { quoteRequestUuid: qRequest.uuid })

      return notificationMessage
    })

    await quoteRequestRepo
      .createQueryBuilder()
      .update(QuoteRequest)
      .set({ status: QuoteRequestStatuses.EXPIRED })
      .where({ id: In(quoteRequestIds) })
      .execute();
  }
}
