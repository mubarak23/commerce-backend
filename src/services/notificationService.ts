/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { In, InsertResult } from "typeorm";
import _ from "underscore";

import { getFreshConnection } from "../db";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { NotificationMessage, NotificationWithFbPushToken } from "../entity/NotificationMessage";
import { Order } from "../entity/Order";
import { Project } from "../entity/Project";
import { PushNotificationToken } from "../entity/PushNotificationToken";
import { QuoteRequest } from "../entity/QuoteRequest";
import { User } from '../entity/User';
import { WareHouseToSiteDeliveryRequest } from "../entity/WareHouseToSiteDeliveryRequest";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { CartItemJson } from "../interfaces/CartItemJson";
import { CooperateMailData } from "../interfaces/CooperateMailData";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import logger from '../logger';
import * as EmailService from "../services/emailService";
import { firestoreDb, sendPushNotification, sendPushNotificationInBatch, sendPushNotificationsInBatch } from "./firebase";
import { sendSms } from "./smsSendingService";


export const sendSingleNotificationToUser = async (user: User, notificationType: NotificationMessageTypes,
    title: string, body: string, transportMode: NotificationTransports, metadata?: NotificationMetadata) => {  
  await sendSingleNotificationToUserId(user.id, user.uuid, notificationType, title, body, transportMode, metadata)
}

export const sendSingleNotificationToUserId = async (userId: number, userUuid: string, notificationType: NotificationMessageTypes,
    title: string, body: string, transportMode: NotificationTransports,  metadata?: NotificationMetadata): Promise<boolean | undefined> => {
  const notification = new NotificationMessage().initialize(userId, notificationType, title, body, metadata)

  const connection = await getFreshConnection()
  const notificationMessageRepo = connection.getRepository(NotificationMessage)

  const orderRepo = connection.getRepository(Order)
  const qouteRequestRepo = connection.getRepository(QuoteRequest)
  const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
  const deliveryLocationRepo = connection.getRepository(DeliveryLocation)
  const projectRepo = connection.getRepository(Project)

  await notificationMessageRepo.save(notification)

  const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken)
  const pushNotificationTokens = await pushNotificationTokenRepo.find({
    userId
  })
  if(!userUuid) {
    const userRepo = connection.getRepository(User)
    const user = await userRepo.findOne({
      id: userId
    })
    if(user) {
      userUuid = user.uuid
    }
  }

  const userRepo = connection.getRepository(User)
  const user = await userRepo.findOne({id: userId})
  if(!user) {
    return
  }

  const res = await sendNotificationToFirestore(user!.uuid, notificationType, title, body, notification, metadata)

  if(transportMode[NotificationTransportMode.SMS]) {
    await sendSms(user!.msisdn, body)
  }

  if(transportMode[NotificationTransportMode.EMAIL]) {
    if(metadata && metadata.orderUuid) {
      const orderDetails = await orderRepo.findOne({uuid: metadata.orderUuid})
      const mailTransport =  await EmailService.sendNotificationToUserViaMail(user!, notificationType, title, orderDetails)
      return true
    }


    if(metadata && metadata.quoteRequestUuid) {
     const join = {
        alias: "quoteRequest",
        leftJoinAndSelect: {
          product: "quoteRequest.product",
        },
      }

      const qouteRequestDetails = await qouteRequestRepo.findOne({
        where: {
          uuid: metadata.quoteRequestUuid,
        },
        join
      });
      const mailTransport =  await EmailService.sendNotificationToUserViaMailForQouteR(user, notificationType, title, qouteRequestDetails)
      console.log(mailTransport)
      return true 
    }
    if(metadata && metadata.wareHouseToSiteRequestUuid){

    const wareHouseToSiteRequest = await wareHouseToSiteDeliveryRequestRepo.findOne({
        where: {
          uuid: metadata?.wareHouseToSiteRequestUuid
        }
      })
    const deliveryLocation = await deliveryLocationRepo.findOne({ id: wareHouseToSiteRequest?.deliveryLocationId})  
    const mailContent: CooperateMailData  ={
      firstName: user.firstName,
      siteName: deliveryLocation?.name,
      deliveryRequestAmount: wareHouseToSiteRequest?.deliveryFeeAmountMajor
    } 
    const mailTransport =  await EmailService.sendNotificationToUserForWareHouseviaMail(user!, notificationType, title, mailContent!)
    }

    if(metadata && metadata.projectUuid){
      const project = await projectRepo.findOne({
        where: { uuid: metadata.projectUuid},
        join: {
          alias: "project",
          leftJoinAndSelect: {
            user: "project.user",
          },
        },
      })
       await EmailService.sendNotificationToUserForProjectMail( project!, user!, notificationType, title)
      
    }
    const mailTransport =  await EmailService.sendNotificationToUserViaMail(user!, notificationType, title)
    console.log(mailTransport)
  }

  if(transportMode[NotificationTransportMode.IN_APP]) {
    for (const pushToken of pushNotificationTokens) {
     const sendingPushResponse = await sendPushNotification(pushToken.deviceToken, title, body, metadata, notificationType)
     console.log(sendingPushResponse)
     console.log('after dipatch to fb')
    }
  }

  return true
}

export const sendNotificationToFirestore  = async (userUuid: string, notificationType: NotificationMessageTypes,
    // eslint-disable-next-line consistent-return
    title: string, body: string, notification: NotificationMessage,  metadata?: NotificationMetadata)  => {
  try {
    const firestoreDocRef = firestoreDb()?.
      collection('notification_updates').doc(`${userUuid}`).
      collection('notifications').doc(notification.uuid)
    
    const fbNotificationMessage = {
      ...metadata, 
      type: notificationType,
      title,
      body,
      isRead:false,
      createdAt: new Date()
    }
    await firestoreDocRef?.set(fbNotificationMessage)
    return true
  } catch(error) {
    logger.error('Error sending to firestore notification_updates collection: ', error.message)
    console.log(error.stack)
  }
}

export const updateNotificationInFireStore = async(userUuid: string, notification: NotificationMessage) => {
  try {
    const firestoreDocRef = firestoreDb()?.
      collection('notification_updates').doc(`${userUuid}`).
      collection('notifications').doc(notification.uuid)
    
    const notificationUpdate = {
      isRead: notification.isRead,
    }
    await firestoreDocRef?.set(notificationUpdate, {merge: true})
  } catch(error) {
    logger.error('Error sending to firestore notification_updates collection: ', error.message)
    console.log(error.stack)
  }

}


export const sendCartUpdateNotificationToFirestore = async (userUuid: string, cartItems: CartItemJson[]) => {
  try {
    const firestoreDocRef = firestoreDb()?.
      collection('cart_updates').doc(`${userUuid}`)
    
    const fbNotificationMessage = {
      cartItems,
    }
    await firestoreDocRef?.set(fbNotificationMessage)
  } catch(error) {
    logger.error('Error sending to firestore account_notifications collection: ', error.message)
    console.log(error.stack)
  }
}

export const sendNotificationToManyUsers = async (userIds: number[],
    notificationType: NotificationMessageTypes,
    title: string, body: string, metadata?: NotificationMetadata) => {
  const notificationMessages = userIds.map(userId => {
    return new NotificationMessage().initialize(userId, notificationType, title, body, metadata)
  })

  const connection = await getFreshConnection()

  const notificationMessageRepo = connection.getRepository(NotificationMessage)

  const insertResult: InsertResult = await notificationMessageRepo.createQueryBuilder()
    .insert()
    .into(NotificationMessage)
    .values(notificationMessages)
    .execute()

  try {
    const fiveHundredChunks = _.chunk(notificationMessages, 500)
    for (const chunk of fiveHundredChunks) {
      const batch = firestoreDb()?.batch()

      for (const notificationInChunk of chunk) {
        const firestoreDocRef = firestoreDb()?.
          collection('account_notifications').doc(`${notificationInChunk.userId!}`).
          collection('notifications').doc(notificationInChunk.uuid)
        
        const fbNotificationMessage = {
          data: {...metadata, type: notificationType},
          notification: {
            title,
            body
          },
        }
        await batch?.set(firestoreDocRef!, fbNotificationMessage)
      }
      await batch?.commit()
    }
  } catch (e) {
    logger.error('Error sending to firestore account_notifications collection in batch: ', e.message)
    console.log(e.stack)
  }

  const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken)
  const pushNotificationTokens = await pushNotificationTokenRepo.find({
    userId: In(userIds)
  })

  if(!pushNotificationTokens.length) {
    return
  }

  const pushTokens = pushNotificationTokens.map(pushToken => pushToken.deviceToken)
  await sendPushNotificationInBatch(pushTokens, title, body, metadata, notificationType)
}

export const sendDifferentFirebaseNotificationsToManyUsers = async (notificationMessages: NotificationWithFbPushToken[]) => {
  const userIds = notificationMessages.map(notification => notification.userId)

  const connection = await getFreshConnection()

  const notificationMessageRepo = connection.getRepository(NotificationMessage)

  const insertResult: InsertResult = await notificationMessageRepo.createQueryBuilder()
    .insert()
    .into(NotificationMessage)
    .values(notificationMessages)
    .execute()

  const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken)
  const pushNotificationTokens = await pushNotificationTokenRepo.find({
    userId: In(userIds)
  })

  if(!pushNotificationTokens.length) {
    return
  }

  const notificationsWithPushToken = _.filter(notificationMessages, notification => !_.isUndefined(notification.fbPushToken) && !!notification.fbPushToken)

  await sendPushNotificationsInBatch(notificationsWithPushToken)
}
