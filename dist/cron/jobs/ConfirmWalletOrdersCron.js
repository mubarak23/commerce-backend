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
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const db_1 = require("../../db");
const Order_1 = require("../../entity/Order");
const User_1 = require("../../entity/User");
const OrderPaymentVariant_1 = require("../../enums/OrderPaymentVariant");
const Statuses_1 = __importStar(require("../../enums/Statuses"));
const OrderService = __importStar(require("../../services/orderService"));
const BaseCron_1 = __importDefault(require("./BaseCron"));
class ConfirmWalletOrdersCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const aFiveDaysAgoMoment = moment_1.default.utc().add(5, 'days');
            const orderRepo = connection.getRepository(Order_1.Order);
            const userRepo = connection.getRepository(User_1.User);
            const unconfirmWalletOrders = yield orderRepo.find({
                where: {
                    status: Statuses_1.default.IN_PROGRESS,
                    paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.WALLET,
                    paymentStatus: Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW,
                    updatedAt: (0, typeorm_1.LessThan)(aFiveDaysAgoMoment.toDate())
                },
                order: { createdAt: 'DESC' },
            });
            if (!unconfirmWalletOrders.length) {
                return;
            }
            const orderBuyerUserIds = unconfirmWalletOrders.map(order => order.buyerUserId);
            const orderBuyers = yield userRepo.find({
                id: (0, typeorm_1.In)(orderBuyerUserIds)
            });
            for (const order of unconfirmWalletOrders) {
                const buyerUser = orderBuyers.find(oB => oB.id === order.buyerUserId);
                if (!buyerUser) {
                    continue;
                }
                yield OrderService.updateOrderStatus(order, Statuses_1.default.CONFIRMED, buyerUser);
            }
            return true;
        });
    }
}
exports.default = ConfirmWalletOrdersCron;
//# sourceMappingURL=ConfirmWalletOrdersCron.js.map