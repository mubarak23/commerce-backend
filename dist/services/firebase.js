"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreDb = exports.sendPushNotificationsInBatch = exports.sendPushNotificationInBatch = exports.sendPushNotification = exports.verifyFirebaseIdToken = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const FirebaseAdmin = __importStar(require("firebase-admin"));
const _ = __importStar(require("underscore"));
const logger_1 = __importDefault(require("../logger"));
const project_id = process.env.FIREBASE_project_id;
const private_key = process.env.FIREBASE_private_key;
const client_email = process.env.FIREBASE_client_email;
const serviceAccount = {
    projectId: project_id,
    privateKey: private_key ? private_key.replace(/\\n/g, '\n') : '',
    clientEmail: client_email,
};
const app = private_key ? FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(serviceAccount)
}) : undefined;
const fireStoreDb = private_key ?
    FirebaseAdmin.firestore() : undefined;
const verifyFirebaseIdToken = (idToken, fbUid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield FirebaseAdmin.auth().verifyIdToken(idToken);
        const { uid, email, email_verified } = decodedToken;
        const userRecord = yield FirebaseAdmin.auth().getUser(uid);
        if (uid === fbUid) {
            if (userRecord && userRecord.email) {
                return userRecord.email;
            }
            return undefined;
        }
        return undefined;
    }
    catch (error) {
        return undefined;
    }
});
exports.verifyFirebaseIdToken = verifyFirebaseIdToken;
function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !Number.isNaN(date);
}
const sendPushNotification = (fbPushToken, title, body, payload, notificationType) => __awaiter(void 0, void 0, void 0, function* () {
    const fbNotificationMessage = {
        data: Object.assign(Object.assign({}, payload), { type: notificationType }),
        notification: {
            title,
            body
        },
        token: fbPushToken
    };
    try {
        const response = yield (app === null || app === void 0 ? void 0 : app.messaging().send(fbNotificationMessage));
        return true;
    }
    catch (error) {
        if (error.message !== 'Requested entity was not found.') {
            logger_1.default.error('Error sending message: ', error.message);
            console.log(error.stack);
        }
        return false;
    }
});
exports.sendPushNotification = sendPushNotification;
// https://firebase.google.com/docs/cloud-messaging/send-message#send-a-batch-of-messages
const sendPushNotificationInBatch = (fbPushTokens, title, body, payload, notificationType) => __awaiter(void 0, void 0, void 0, function* () {
    const fiveHundredChunks = _.chunk(fbPushTokens, 500);
    for (const chunk of fiveHundredChunks) {
        const fbNotificationMessages = [];
        for (const fbPushToken of chunk) {
            const fbNotificationMessage = {
                data: Object.assign(Object.assign({}, payload), { type: notificationType }),
                notification: {
                    title,
                    body
                },
                token: fbPushToken
            };
            fbNotificationMessages.push(fbNotificationMessage);
        }
        try {
            const response = yield (app === null || app === void 0 ? void 0 : app.messaging().sendAll(fbNotificationMessages));
        }
        catch (error) {
            logger_1.default.error('Error sending message: ', error);
            return false;
        }
    }
    return true;
});
exports.sendPushNotificationInBatch = sendPushNotificationInBatch;
const sendPushNotificationsInBatch = (notificationMessages) => __awaiter(void 0, void 0, void 0, function* () {
    const fiveHundredNotificationMessages = _.chunk(notificationMessages, 500);
    for (const notifications of fiveHundredNotificationMessages) {
        const fbNotificationMessages = [];
        for (const notification of notifications) {
            const fbNotificationMessage = {
                data: Object.assign(Object.assign({}, notification.metadata), { type: notification.type }),
                notification: {
                    title: notification.title,
                    body: notification.message
                },
                token: notification.fbPushToken
            };
            fbNotificationMessages.push(fbNotificationMessage);
        }
        try {
            const response = yield (app === null || app === void 0 ? void 0 : app.messaging().sendAll(fbNotificationMessages));
        }
        catch (error) {
            logger_1.default.error('Error sending message: ', error);
            return false;
        }
    }
    return true;
});
exports.sendPushNotificationsInBatch = sendPushNotificationsInBatch;
const firestoreDb = () => {
    return fireStoreDb;
};
exports.firestoreDb = firestoreDb;
//# sourceMappingURL=firebase.js.map