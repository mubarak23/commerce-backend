"use strict";
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
exports.start = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const CronRunNames_1 = __importDefault(require("../enums/CronRunNames"));
const ChargeBuyerCron_1 = __importDefault(require("./jobs/ChargeBuyerCron"));
const ClosePaidOrderCron_1 = __importDefault(require("./jobs/ClosePaidOrderCron"));
const ConfirmWalletOrdersCron_1 = __importDefault(require("./jobs/ConfirmWalletOrdersCron"));
const NotifyBuyerBeforeCloseOrderCron_1 = __importDefault(require("./jobs/NotifyBuyerBeforeCloseOrderCron"));
const QuoteRequestExpireCron_1 = __importDefault(require("./jobs/QuoteRequestExpireCron"));
const OneMinute = '* * * * *';
const FiveMinutes = '* 5 * * *';
const TenMinutes = '* 10 * * *';
const FifthMinutes = '* 15 * * *';
const OneHours = '* * 1 * *';
const TwentyFourHours = '* * 24 * * ';
const OneMonth = '* * * 1 *';
const TenSeconds = '*/10 * * * * *';
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // NodeCron.schedule(OneMinute, () => {
    //   new ProductLeaseCron().handler(CronRunNames.PRODUCT_LEASE_INTEREST_APPLYER)
    // })
    // NodeCron.schedule(OneMinute, () => {
    //   new MultiStageProductLeaseCron().handler(CronRunNames.MULTI_STAGE_PRODUCT_LEASE_INTEREST_APPLYER)
    // })
    node_cron_1.default.schedule(TwentyFourHours, () => {
        new ClosePaidOrderCron_1.default().handler(CronRunNames_1.default.CLOSED_PAID_ORDER);
    });
    node_cron_1.default.schedule(OneMinute, () => {
        new QuoteRequestExpireCron_1.default().handler(CronRunNames_1.default.QUOTE_REQUEST_EXPIRE);
    });
    node_cron_1.default.schedule(TwentyFourHours, () => {
        new ChargeBuyerCron_1.default().handler(CronRunNames_1.default.CHARGE_BUYER_ON_PAYMENT_DEFAULT);
    });
    node_cron_1.default.schedule(TwentyFourHours, () => {
        new NotifyBuyerBeforeCloseOrderCron_1.default().handler(CronRunNames_1.default.NOTIFY_BUYER_BEFORE_CLOSE_ORDER);
    });
    node_cron_1.default.schedule(TwentyFourHours, () => {
        new ConfirmWalletOrdersCron_1.default().handler(CronRunNames_1.default.CONFIRM_WALLET_ORDERS);
    });
    // NodeCron.schedule(TwentyFourHours, () => {
    //   new CStoreOrderLeaseChargeCron().handler(CronRunNames.C_STORE_ORDER_LEASE_CHARGE)
    // })
});
exports.start = start;
//# sourceMappingURL=index.js.map