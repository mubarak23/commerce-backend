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
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const db_1 = require("../../db");
const FinancialTransaction_1 = require("../../entity/FinancialTransaction");
const Order_1 = require("../../entity/Order");
const Wallet_1 = require("../../entity/Wallet");
const WalletType_1 = require("../../enums//WalletType");
const OrderPaymentVariant_1 = require("../../enums/OrderPaymentVariant");
const PaymentTransaction_1 = require("../../enums/PaymentTransaction");
const Statuses_1 = __importDefault(require("../../enums/Statuses"));
const BaseCron_1 = __importDefault(require("./BaseCron"));
class CStoreOrderLeaseChargeCron extends BaseCron_1.default {
    startWorking() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Start of the CRON Job');
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const aFourDayAgoMoment = moment_1.default.utc().subtract(4, 'days');
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            const cstoreUnpaidOrders = yield orderRepo.find({
                where: {
                    status: Statuses_1.default.IN_PROGRESS,
                    paymentVariant: OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY,
                    updatedAt: (0, typeorm_1.LessThanOrEqual)(aFourDayAgoMoment.toDate())
                },
                join,
                order: { createdAt: 'DESC' },
            });
            if (!cstoreUnpaidOrders.length) {
                return;
            }
            console.log('C store unpaid order', cstoreUnpaidOrders);
            // const sellerUserIds = products.filter((product) => product.isActive === true).map((product) => product.userId);
            const cStorebuyerUserIds = cstoreUnpaidOrders.filter((userOrder) => { var _a; return ((_a = userOrder.buyerUser.settings) === null || _a === void 0 ? void 0 : _a.isOnCStore) === true; }).map(CstoreOrder => CstoreOrder.buyerUserId);
            console.log('C store User Ids:', cStorebuyerUserIds);
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            const wallets = yield walletRepo.find({
                userId: (0, typeorm_1.In)(cStorebuyerUserIds),
                type: WalletType_1.WalletType.CUSTOMER_WALLET,
            });
            const paymentDefaultChargePercentage = 0.167;
            // paymentDefaultChargePercentage = await ConfigPropertyService.getConfigProperty(
            //   ConfigProperties.C_STORE_DEFAULT_PAYMENT_CHARGE_PERCENTAGE
            // ) as number
            // paymentDefaultChargePercentage = paymentDefaultChargePercentage ?? 0
            const updateCstoreWalletBatchQueryValues = cstoreUnpaidOrders.filter((userOrder) => { var _a; return ((_a = userOrder.buyerUser.settings) === null || _a === void 0 ? void 0 : _a.isOnCStore) === true; }).map(order => {
                var _a;
                const theWallet = wallets.find(aWallet => aWallet.userId === order.buyerUserId);
                const walletBalanceMinorBefore = (_a = theWallet === null || theWallet === void 0 ? void 0 : theWallet.walletBalanceMinor) !== null && _a !== void 0 ? _a : 0;
                const calculatedCostMinor = order.calculatedTotalCostMajor * 100;
                const newWalletBalanceMinor = (walletBalanceMinorBefore - (calculatedCostMinor * paymentDefaultChargePercentage / 100)).toFixed(2);
                return `(${theWallet === null || theWallet === void 0 ? void 0 : theWallet.id}, ${newWalletBalanceMinor})`;
            });
            const updateWalletBatchQuery = `UPDATE wallets set wallet_balance_minor = wallet_update.walletBalanceMinor
        from(values${updateCstoreWalletBatchQueryValues.join(",")}) as wallet_update (id, walletBalanceMinor)
        where wallets.id = wallet_update.id;`;
            const financialTransactionsCstoreBatch = cstoreUnpaidOrders.filter((userOrder) => { var _a; return ((_a = userOrder.buyerUser.settings) === null || _a === void 0 ? void 0 : _a.isOnCStore) === true; }).map(order => {
                var _a;
                const theWallet = wallets.find(aWallet => aWallet.userId === order.buyerUserId);
                const calculatedCostMinor = order.calculatedTotalCostMajor * 100;
                const interestAmountMinor = (calculatedCostMinor * paymentDefaultChargePercentage / 100);
                const walletBalanceMinorBefore = (_a = theWallet === null || theWallet === void 0 ? void 0 : theWallet.walletBalanceMinor) !== null && _a !== void 0 ? _a : 0;
                const newWalletBalanceMinor = walletBalanceMinorBefore - interestAmountMinor;
                const metadata = {
                    orderUuid: order.uuid
                };
                const { walletBalanceMinor } = theWallet;
                const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(theWallet, PaymentTransaction_1.PaymentTransactionTypes.C_STORE_DEFAULT_PAYMENT_CHARGES, interestAmountMinor, walletBalanceMinor, newWalletBalanceMinor, theWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.PAID, undefined, metadata);
                financialTransaction.description = `${theWallet === null || theWallet === void 0 ? void 0 : theWallet.currency}${(interestAmountMinor / 100).toFixed(2)} unpaid order (${order.referenceNumber}) interest charge`;
                return financialTransaction;
            });
            const updateSuccessful = yield connection.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const accountWalletEntityManager = transactionalEntityManager.getRepository(Wallet_1.Wallet).manager;
                const financialTransactionRepo = transactionalEntityManager.getRepository(FinancialTransaction_1.FinancialTransaction);
                const accountWalletUpdateResults = yield accountWalletEntityManager.query(updateWalletBatchQuery, []);
                const insertResult = yield financialTransactionRepo.createQueryBuilder()
                    .insert()
                    .into(FinancialTransaction_1.FinancialTransaction)
                    .values(financialTransactionsCstoreBatch)
                    .execute();
                return true;
            }));
        });
    }
}
exports.default = CStoreOrderLeaseChargeCron;
//# sourceMappingURL=CStoreOrderLeaseCron.js.map