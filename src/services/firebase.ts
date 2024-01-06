/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import * as FirebaseAdmin from 'firebase-admin';
import * as _ from 'underscore'

import { NotificationWithFbPushToken } from '../entity/NotificationMessage';
import NotificationMessageTypes from '../enums/NotificationMessageTypes';
import logger from '../logger'


const project_id = process.env.FIREBASE_project_id
const private_key = process.env.FIREBASE_private_key
const client_email = process.env.FIREBASE_client_email

const serviceAccount: FirebaseAdmin.ServiceAccount = {
  projectId: project_id,
  privateKey: private_key ? private_key.replace(/\\n/g, '\n') : '',
  clientEmail: client_email,
}

const app: FirebaseAdmin.app.App | undefined = private_key ? FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount)
}) : undefined

const fireStoreDb: FirebaseFirestore.Firestore | undefined = private_key ?
  FirebaseAdmin.firestore() : undefined


export const verifyFirebaseIdToken = async (idToken: string, fbUid: string): Promise<string | undefined> => {
  try {
    const decodedToken = await FirebaseAdmin.auth().verifyIdToken(idToken)
    const { uid, email, email_verified } = decodedToken

    const userRecord = await FirebaseAdmin.auth().getUser(uid)

    if(uid === fbUid) {
      if(userRecord && userRecord.email) {
        return userRecord.email
      }
      return undefined
    }
    return undefined
  } catch(error) {
    return undefined
  }
}

function isValidDate(date: any) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !Number.isNaN(date);
}

export const sendPushNotification = async (fbPushToken: string, title: string, body: string,
  payload: any, notificationType: NotificationMessageTypes) => {

  const fbNotificationMessage = {
    data: {...payload, type: notificationType},
    notification: {
      title,
      body
    },
    token: fbPushToken
  }

  try {
    const response = await app?.messaging().send(fbNotificationMessage)
    return true
  } catch (error) {
    if (error.message !== 'Requested entity was not found.') {
      logger.error('Error sending message: ', error.message)
      console.log(error.stack)        
    }
    return false
  }
}

// https://firebase.google.com/docs/cloud-messaging/send-message#send-a-batch-of-messages
export const sendPushNotificationInBatch = async (fbPushTokens: string[], title: string, body: string,
    payload: any, notificationType: NotificationMessageTypes): Promise<boolean> => {
  const fiveHundredChunks = _.chunk(fbPushTokens, 500)

  for(const chunk of fiveHundredChunks) {
    const fbNotificationMessages = []

    for(const fbPushToken of chunk) {
      const fbNotificationMessage = {
        data: {...payload, type: notificationType},
        notification: {
          title,
          body
        },
        token: fbPushToken
      }
      fbNotificationMessages.push(fbNotificationMessage)
    }

    try {
      const response = await app?.messaging().sendAll(fbNotificationMessages)
    } catch(error) {
      logger.error('Error sending message: ', error)
      return false
    }  
  }
  return true
}

interface FbNotificationData {
  [key: string]: string;
}

export const sendPushNotificationsInBatch = async (notificationMessages: NotificationWithFbPushToken[]): Promise<boolean> => {
  const fiveHundredNotificationMessages = _.chunk(notificationMessages, 500)

  for(const notifications of fiveHundredNotificationMessages) {
    const fbNotificationMessages: FirebaseAdmin.messaging.Message[] = []

    for(const notification of notifications) {
      const fbNotificationMessage: FirebaseAdmin.messaging.Message = {
        data: { 
          ...notification.metadata as FbNotificationData, 
          type: notification.type
        },
        notification: {
          title: notification.title,
          body: notification.message
        },
        token: notification.fbPushToken
      }
      fbNotificationMessages.push(fbNotificationMessage)
    }

    try {
      const response = await app?.messaging().sendAll(fbNotificationMessages)
    } catch(error) {
      logger.error('Error sending message: ', error)
      return false
    }
  }
  return true
}


export const firestoreDb = (): FirebaseFirestore.Firestore | undefined => {
  return fireStoreDb
}
