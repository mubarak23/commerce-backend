/* eslint-disable consistent-return */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
// NotifyBuyerBeforeCloseOrderCron
import moment from 'moment'
import { getFreshConnection } from '../../db'
import { Order } from '../../entity/Order'
import { In, LessThan } from 'typeorm';
import OrderStatuses, { OrderPaymentStatuses } from '../../enums/Statuses'
import * as NotificationService from "../../services/notificationService"
import * as Util from "../../utils/core"
import BaseCron from './BaseCron'
import { User } from '../../entity/User';
import { OrderReceiveTypes } from '../../enums/OrderReceiveTypes';
import { NotificationMetadata } from '../../interfaces/NotificationMetadata';
import { NotificationTransportMode, NotificationTransports } from '../../enums/NotificationTransport';
import NotificationMessageTypes from '../../enums/NotificationMessageTypes';

export default class NotifyBuyerBeforeCloseOrderCron extends BaseCron {

  public async startWorking(): Promise<any> {
    const connection = await getFreshConnection()

    const OneDayAgoMoment = moment.utc().add(-24, 'days')

    const orderRepo = connection.getRepository(Order)
    const userRepo = connection.getRepository(User)

    const paidOrdersToClose = await orderRepo.find({
      where: {
        status: OrderStatuses.CONFIRMED,
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
        updatedAt: LessThan(OneDayAgoMoment.toDate())
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
        console.log('User not Found')
        continue
      }
      // push notification
      const formatedDate = Util.formatDate(order.updatedAt)
      if(order.orderReceiveType === OrderReceiveTypes.DELIVERY ){
        const notificationMetadata: NotificationMetadata = {
          orderUuid: order.uuid,
        }
            
        const notificationTransports: NotificationTransports = {
          [NotificationTransportMode.SMS]: true
        }
          
        const smsbody = `Dear ${buyerUser.firstName}, this is a reminder on order #${order.referenceNumber} that was delivered on 
        ${formatedDate}. Please note you have 24 hours to raise a dispute if your item has not been delivered.
          You can do this by either placing a call to +2347001236202 or send an email to support@cinderbuild.com`
    
        await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
          NotificationMessageTypes.ORDER_DELIVERED,
          'Order Delivered', smsbody, 
          notificationTransports,  notificationMetadata)
          return true
      }

      if(order.orderReceiveType === OrderReceiveTypes.PICKUP ){
        const notificationMetadata: NotificationMetadata = {
          orderUuid: order.uuid,
        }
            
        const notificationTransports: NotificationTransports = {
          [NotificationTransportMode.SMS]: true
        }
        const smsbody = `Dear ${buyerUser.firstName}, this is a reminder on order #${order.referenceNumber} that was picked up on 
        ${formatedDate}. Please note you have 24 hours to raise a dispute if your item has not been delivered.
          You can do this by either placing a call to +2347001236202 or send an email to support@cinderbuild.com`
    
        await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
          NotificationMessageTypes.ORDER_PICKED_UP,
          'Order Picked Up', smsbody, 
          notificationTransports,  notificationMetadata
        )
        return true
      }
    }
    return true
  }
}