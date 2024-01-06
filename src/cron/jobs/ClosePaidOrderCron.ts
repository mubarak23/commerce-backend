/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
import moment from 'moment'
import { getFreshConnection } from '../../db'
import { Order } from '../../entity/Order'
import { In, LessThan } from 'typeorm';
import OrderStatuses, { OrderPaymentStatuses } from '../../enums/Statuses'
import * as OrderService from '../../services/orderService'
import BaseCron from './BaseCron'
import { User } from '../../entity/User';

export default class ClosePaidOrderCron extends BaseCron {

  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()

    const threeDayAgoMoment = moment.utc().add(-48, 'days')

    const orderRepo = connection.getRepository(Order)
    const userRepo = connection.getRepository(User)

    const paidOrdersToClose = await orderRepo.find({
      where: {
        status: OrderStatuses.CONFIRMED,
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
        updatedAt: LessThan(threeDayAgoMoment.toDate())
      },
      order: { createdAt: 'DESC' },
    })

    if(!paidOrdersToClose.length) {
      return
    }

    const orderBuyerUserIds = paidOrdersToClose.map(order => order.buyerUserId)
    const orderBuyers = await userRepo.find({
      id: In(orderBuyerUserIds)
    })

    for(const order of paidOrdersToClose) {
      const buyerUser = orderBuyers.find(oB => oB.id === order.buyerUserId)
      if(!buyerUser) {
        continue
      }
      await OrderService.updateOrderStatus(order, OrderStatuses.CONFIRMED_BY_SYSTEM, buyerUser)
    }
    
    return true
  }
}