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
exports.sendDifferentFirebaseNotificationsToManyUsers = exports.sendNotificationToManyUsers = exports.sendCartUpdateNotificationToFirestore = exports.updateNotificationInFireStore = exports.sendNotificationToFirestore = exports.sendSingleNotificationToUserId = exports.sendSingleNotificationToUser = void 0;
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
const typeorm_1 = require("typeorm");
const underscore_1 = __importDefault(require("underscore"));
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const NotificationMessage_1 = require("../entity/NotificationMessage");
const Order_1 = require("../entity/Order");
const Project_1 = require("../entity/Project");
const PushNotificationToken_1 = require("../entity/PushNotificationToken");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const User_1 = require("../entity/User");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const NotificationTransport_1 = require("../enums/NotificationTransport");
const logger_1 = __importDefault(require("../logger"));
const EmailService = __importStar(require("../services/emailService"));
const firebase_1 = require("./firebase");
const smsSendingService_1 = require("./smsSendingService");
const sendSingleNotificationToUser = (user, notificationType, title, body, transportMode, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.sendSingleNotificationToUserId)(user.id, user.uuid, notificationType, title, body, transportMode, metadata);
});
exports.sendSingleNotificationToUser = sendSingleNotificationToUser;
const sendSingleNotificationToUserId = (userId, userUuid, notificationType, title, body, transportMode, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = new NotificationMessage_1.NotificationMessage().initialize(userId, notificationType, title, body, metadata);
    const connection = yield (0, db_1.getFreshConnection)();
    const notificationMessageRepo = connection.getRepository(NotificationMessage_1.NotificationMessage);
    const orderRepo = connection.getRepository(Order_1.Order);
    const qouteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
    const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    const projectRepo = connection.getRepository(Project_1.Project);
    yield notificationMessageRepo.save(notification);
    const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken_1.PushNotificationToken);
    const pushNotificationTokens = yield pushNotificationTokenRepo.find({
        userId
    });
    if (!userUuid) {
        const userRepo = connection.getRepository(User_1.User);
        const user = yield userRepo.findOne({
            id: userId
        });
        if (user) {
            userUuid = user.uuid;
        }
    }
    const userRepo = connection.getRepository(User_1.User);
    const user = yield userRepo.findOne({ id: userId });
    if (!user) {
        return;
    }
    const res = yield (0, exports.sendNotificationToFirestore)(user.uuid, notificationType, title, body, notification, metadata);
    if (transportMode[NotificationTransport_1.NotificationTransportMode.SMS]) {
        yield (0, smsSendingService_1.sendSms)(user.msisdn, body);
    }
    if (transportMode[NotificationTransport_1.NotificationTransportMode.EMAIL]) {
        if (metadata && metadata.orderUuid) {
            const orderDetails = yield orderRepo.findOne({ uuid: metadata.orderUuid });
            const mailTransport = yield EmailService.sendNotificationToUserViaMail(user, notificationType, title, orderDetails);
            return true;
        }
        if (metadata && metadata.quoteRequestUuid) {
            const join = {
                alias: "quoteRequest",
                leftJoinAndSelect: {
                    product: "quoteRequest.product",
                },
            };
            const qouteRequestDetails = yield qouteRequestRepo.findOne({
                where: {
                    uuid: metadata.quoteRequestUuid,
                },
                join
            });
            const mailTransport = yield EmailService.sendNotificationToUserViaMailForQouteR(user, notificationType, title, qouteRequestDetails);
            console.log(mailTransport);
            return true;
        }
        if (metadata && metadata.wareHouseToSiteRequestUuid) {
            const wareHouseToSiteRequest = yield wareHouseToSiteDeliveryRequestRepo.findOne({
                where: {
                    uuid: metadata === null || metadata === void 0 ? void 0 : metadata.wareHouseToSiteRequestUuid
                }
            });
            const deliveryLocation = yield deliveryLocationRepo.findOne({ id: wareHouseToSiteRequest === null || wareHouseToSiteRequest === void 0 ? void 0 : wareHouseToSiteRequest.deliveryLocationId });
            const mailContent = {
                firstName: user.firstName,
                siteName: deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.name,
                deliveryRequestAmount: wareHouseToSiteRequest === null || wareHouseToSiteRequest === void 0 ? void 0 : wareHouseToSiteRequest.deliveryFeeAmountMajor
            };
            const mailTransport = yield EmailService.sendNotificationToUserForWareHouseviaMail(user, notificationType, title, mailContent);
        }
        if (metadata && metadata.projectUuid) {
            const project = yield projectRepo.findOne({
                where: { uuid: metadata.projectUuid },
                join: {
                    alias: "project",
                    leftJoinAndSelect: {
                        user: "project.user",
                    },
                },
            });
            yield EmailService.sendNotificationToUserForProjectMail(project, user, notificationType, title);
        }
        const mailTransport = yield EmailService.sendNotificationToUserViaMail(user, notificationType, title);
        console.log(mailTransport);
    }
    if (transportMode[NotificationTransport_1.NotificationTransportMode.IN_APP]) {
        for (const pushToken of pushNotificationTokens) {
            const sendingPushResponse = yield (0, firebase_1.sendPushNotification)(pushToken.deviceToken, title, body, metadata, notificationType);
            console.log(sendingPushResponse);
            console.log('after dipatch to fb');
        }
    }
    return true;
});
exports.sendSingleNotificationToUserId = sendSingleNotificationToUserId;
const sendNotificationToFirestore = (userUuid, notificationType, 
// eslint-disable-next-line consistent-return
title, body, notification, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const firestoreDocRef = (_a = (0, firebase_1.firestoreDb)()) === null || _a === void 0 ? void 0 : _a.collection('notification_updates').doc(`${userUuid}`).collection('notifications').doc(notification.uuid);
        const fbNotificationMessage = Object.assign(Object.assign({}, metadata), { type: notificationType, title,
            body, isRead: false, createdAt: new Date() });
        yield (firestoreDocRef === null || firestoreDocRef === void 0 ? void 0 : firestoreDocRef.set(fbNotificationMessage));
        return true;
    }
    catch (error) {
        logger_1.default.error('Error sending to firestore notification_updates collection: ', error.message);
        console.log(error.stack);
    }
});
exports.sendNotificationToFirestore = sendNotificationToFirestore;
const updateNotificationInFireStore = (userUuid, notification) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const firestoreDocRef = (_b = (0, firebase_1.firestoreDb)()) === null || _b === void 0 ? void 0 : _b.collection('notification_updates').doc(`${userUuid}`).collection('notifications').doc(notification.uuid);
        const notificationUpdate = {
            isRead: notification.isRead,
        };
        yield (firestoreDocRef === null || firestoreDocRef === void 0 ? void 0 : firestoreDocRef.set(notificationUpdate, { merge: true }));
    }
    catch (error) {
        logger_1.default.error('Error sending to firestore notification_updates collection: ', error.message);
        console.log(error.stack);
    }
});
exports.updateNotificationInFireStore = updateNotificationInFireStore;
const sendCartUpdateNotificationToFirestore = (userUuid, cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const firestoreDocRef = (_c = (0, firebase_1.firestoreDb)()) === null || _c === void 0 ? void 0 : _c.collection('cart_updates').doc(`${userUuid}`);
        const fbNotificationMessage = {
            cartItems,
        };
        yield (firestoreDocRef === null || firestoreDocRef === void 0 ? void 0 : firestoreDocRef.set(fbNotificationMessage));
    }
    catch (error) {
        logger_1.default.error('Error sending to firestore account_notifications collection: ', error.message);
        console.log(error.stack);
    }
});
exports.sendCartUpdateNotificationToFirestore = sendCartUpdateNotificationToFirestore;
const sendNotificationToManyUsers = (userIds, notificationType, title, body, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const notificationMessages = userIds.map(userId => {
        return new NotificationMessage_1.NotificationMessage().initialize(userId, notificationType, title, body, metadata);
    });
    const connection = yield (0, db_1.getFreshConnection)();
    const notificationMessageRepo = connection.getRepository(NotificationMessage_1.NotificationMessage);
    const insertResult = yield notificationMessageRepo.createQueryBuilder()
        .insert()
        .into(NotificationMessage_1.NotificationMessage)
        .values(notificationMessages)
        .execute();
    try {
        const fiveHundredChunks = underscore_1.default.chunk(notificationMessages, 500);
        for (const chunk of fiveHundredChunks) {
            const batch = (_d = (0, firebase_1.firestoreDb)()) === null || _d === void 0 ? void 0 : _d.batch();
            for (const notificationInChunk of chunk) {
                const firestoreDocRef = (_e = (0, firebase_1.firestoreDb)()) === null || _e === void 0 ? void 0 : _e.collection('account_notifications').doc(`${notificationInChunk.userId}`).collection('notifications').doc(notificationInChunk.uuid);
                const fbNotificationMessage = {
                    data: Object.assign(Object.assign({}, metadata), { type: notificationType }),
                    notification: {
                        title,
                        body
                    },
                };
                yield (batch === null || batch === void 0 ? void 0 : batch.set(firestoreDocRef, fbNotificationMessage));
            }
            yield (batch === null || batch === void 0 ? void 0 : batch.commit());
        }
    }
    catch (e) {
        logger_1.default.error('Error sending to firestore account_notifications collection in batch: ', e.message);
        console.log(e.stack);
    }
    const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken_1.PushNotificationToken);
    const pushNotificationTokens = yield pushNotificationTokenRepo.find({
        userId: (0, typeorm_1.In)(userIds)
    });
    if (!pushNotificationTokens.length) {
        return;
    }
    const pushTokens = pushNotificationTokens.map(pushToken => pushToken.deviceToken);
    yield (0, firebase_1.sendPushNotificationInBatch)(pushTokens, title, body, metadata, notificationType);
});
exports.sendNotificationToManyUsers = sendNotificationToManyUsers;
const sendDifferentFirebaseNotificationsToManyUsers = (notificationMessages) => __awaiter(void 0, void 0, void 0, function* () {
    const userIds = notificationMessages.map(notification => notification.userId);
    const connection = yield (0, db_1.getFreshConnection)();
    const notificationMessageRepo = connection.getRepository(NotificationMessage_1.NotificationMessage);
    const insertResult = yield notificationMessageRepo.createQueryBuilder()
        .insert()
        .into(NotificationMessage_1.NotificationMessage)
        .values(notificationMessages)
        .execute();
    const pushNotificationTokenRepo = connection.getRepository(PushNotificationToken_1.PushNotificationToken);
    const pushNotificationTokens = yield pushNotificationTokenRepo.find({
        userId: (0, typeorm_1.In)(userIds)
    });
    if (!pushNotificationTokens.length) {
        return;
    }
    const notificationsWithPushToken = underscore_1.default.filter(notificationMessages, notification => !underscore_1.default.isUndefined(notification.fbPushToken) && !!notification.fbPushToken);
    yield (0, firebase_1.sendPushNotificationsInBatch)(notificationsWithPushToken);
});
exports.sendDifferentFirebaseNotificationsToManyUsers = sendDifferentFirebaseNotificationsToManyUsers;
//# sourceMappingURL=notificationService.js.map