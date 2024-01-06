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
/* eslint-disable no-useless-return */
const BaseCron_1 = __importDefault(require("./BaseCron"));
const db_1 = require("../../db");
const typeorm_1 = require("typeorm");
const Utils = __importStar(require("../../utils/core"));
const moment_1 = __importDefault(require("moment"));
const QuoteRequest_1 = require("../../entity/QuoteRequest");
const Statuses_1 = require("../../enums/Statuses");
const NotificationMessageTypes_1 = __importDefault(require("../../enums/NotificationMessageTypes"));
const NotificationMessage_1 = require("../../entity/NotificationMessage");
class QuoteRequestExpireCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const quoteRequestRepo = connection.getRepository(QuoteRequest_1.QuoteRequest);
            const now = Utils.utcNow();
            const aDayAgoMoment = moment_1.default.utc().add(-24, 'days');
            const quoteRequestsDueForExpiry = yield quoteRequestRepo.find({
                where: {
                    status: Statuses_1.QuoteRequestStatuses.PENDING,
                    createdAt: (0, typeorm_1.LessThan)(aDayAgoMoment.toDate())
                },
                take: 100,
                order: { createdAt: 'DESC' },
            });
            if (!quoteRequestsDueForExpiry.length) {
                return;
            }
            const quoteRequestIds = quoteRequestsDueForExpiry.map(qRequest => qRequest.id);
            const notificationMsgs = quoteRequestsDueForExpiry.map(qRequest => {
                const notificationMessage = new NotificationMessage_1.NotificationMessage().initialize(qRequest.userId, NotificationMessageTypes_1.default.QUOTE_REQUEST_SELLER_EXPIRE, 'Quote Request expiry', `Quote request: #${qRequest.referenceNumber} has expired`, { quoteRequestUuid: qRequest.uuid });
                return notificationMessage;
            });
            yield quoteRequestRepo
                .createQueryBuilder()
                .update(QuoteRequest_1.QuoteRequest)
                .set({ status: Statuses_1.QuoteRequestStatuses.EXPIRED })
                .where({ id: (0, typeorm_1.In)(quoteRequestIds) })
                .execute();
        });
    }
}
exports.default = QuoteRequestExpireCron;
//# sourceMappingURL=QuoteRequestExpireCron.js.map