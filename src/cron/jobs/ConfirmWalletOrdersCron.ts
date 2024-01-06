/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
import moment from 'moment';
import { In, LessThan } from 'typeorm';
import { getFreshConnection } from '../../db';
import { Order } from '../../entity/Order';
import { User } from '../../entity/User';
import { OrderPaymentVariant } from '../../enums/OrderPaymentVariant';
import OrderStatuses, { OrderPaymentStatuses } from '../../enums/Statuses';
import * as OrderService from '../../services/orderService';
import BaseCron from './BaseCron';

export default class ConfirmWalletOrdersCron extends BaseCron {

  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()

    const aFiveDaysAgoMoment = moment.utc().add(5, 'days')

    const orderRepo = connection.getRepository(Order)
    const userRepo = connection.getRepository(User)

    const unconfirmWalletOrders = await orderRepo.find({
      where: {
        status: OrderStatuses.IN_PROGRESS,
        paymentVariant: OrderPaymentVariant.WALLET,
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
        updatedAt: LessThan(aFiveDaysAgoMoment.toDate())
      },
      order: { createdAt: 'DESC' },
    })

    if(!unconfirmWalletOrders.length) {
      return
    }

    const orderBuyerUserIds = unconfirmWalletOrders.map(order => order.buyerUserId)
    const orderBuyers = await userRepo.find({
      id: In(orderBuyerUserIds)
    })

    for(const order of unconfirmWalletOrders) {
      const buyerUser = orderBuyers.find(oB => oB.id === order.buyerUserId)
      if(!buyerUser) {
        continue
      }
      await OrderService.updateOrderStatus(order, OrderStatuses.CONFIRMED, buyerUser)
    }
    
    return true
  }
}