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
/* eslint-disable consistent-return */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
// NotifyBuyerBeforeCloseOrderCron
const moment_1 = __importDefault(require("moment"));
const db_1 = require("../../db");
const Order_1 = require("../../entity/Order");
const typeorm_1 = require("typeorm");
const Statuses_1 = __importStar(require("../../enums/Statuses"));
const NotificationService = __importStar(require("../../services/notificationService"));
const Util = __importStar(require("../../utils/core"));
const BaseCron_1 = __importDefault(require("./BaseCron"));
const User_1 = require("../../entity/User");
const OrderReceiveTypes_1 = require("../../enums/OrderReceiveTypes");
const NotificationTransport_1 = require("../../enums/NotificationTransport");
const NotificationMessageTypes_1 = __importDefault(require("../../enums/NotificationMessageTypes"));
class NotifyBuyerBeforeCloseOrderCron extends BaseCron_1.default {
    startWorking() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const OneDayAgoMoment = moment_1.default.utc().add(-24, 'days');
            const orderRepo = connection.getRepository(Order_1.Order);
            const userRepo = connection.getRepository(User_1.User);
            const paidOrdersToClose = yield orderRepo.find({
                where: {
                    status: Statuses_1.default.CONFIRMED,
                    paymentStatus: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
                    updatedAt: (0, typeorm_1.LessThan)(OneDayAgoMoment.toDate())
                },
                order: { createdAt: 'DESC' },
            });
            if (!paidOrdersToClose.length) {
                return;
            }
            const orderBuyerUserIds = paidOrdersToClose.map(order => order.buyerUserId);
            const orderBuyers = yield userRepo.find({
                id: (0, typeorm_1.In)(orderBuyerUserIds)
            });
            for (const order of paidOrdersToClose) {
                const buyerUser = orderBuyers.find(oB => oB.id === order.buyerUserId);
                if (!buyerUser) {
                    console.log('User not Found');
                    continue;
                }
                // push notification
                const formatedDate = Util.formatDate(order.updatedAt);
                if (order.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                    const notificationMetadata = {
                        orderUuid: order.uuid,
                    };
                    const notificationTransports = {
                        [NotificationTransport_1.NotificationTransportMode.SMS]: true
                    };
                    const smsbody = `Dear ${buyerUser.firstName}, this is a reminder on order #${order.referenceNumber} that was delivered on 
        ${formatedDate}. Please note you have 24 hours to raise a dispute if your item has not been delivered.
          You can do this by either placing a call to +2347001236202 or send an email to support@cinderbuild.com`;
                    yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_a = order.buyerUser) === null || _a === void 0 ? void 0 : _a.uuid, NotificationMessageTypes_1.default.ORDER_DELIVERED, 'Order Delivered', smsbody, notificationTransports, notificationMetadata);
                    return true;
                }
                if (order.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
                    const notificationMetadata = {
                        orderUuid: order.uuid,
                    };
                    const notificationTransports = {
                        [NotificationTransport_1.NotificationTransportMode.SMS]: true
                    };
                    const smsbody = `Dear ${buyerUser.firstName}, this is a reminder on order #${order.referenceNumber} that was picked up on 
        ${formatedDate}. Please note you have 24 hours to raise a dispute if your item has not been delivered.
          You can do this by either placing a call to +2347001236202 or send an email to support@cinderbuild.com`;
                    yield NotificationService.sendSingleNotificationToUserId(order.buyerUserId, (_b = order.buyerUser) === null || _b === void 0 ? void 0 : _b.uuid, NotificationMessageTypes_1.default.ORDER_PICKED_UP, 'Order Picked Up', smsbody, notificationTransports, notificationMetadata);
                    return true;
                }
            }
            return true;
        });
    }
}
exports.default = NotifyBuyerBeforeCloseOrderCron;
//# sourceMappingURL=NotifyBuyerBeforeCloseOrderCron.js.map