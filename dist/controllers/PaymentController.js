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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.PaymentsController = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */
const bcrypt_1 = __importDefault(require("bcrypt"));
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const logger_1 = __importDefault(require("../logger"));
const crypto = require('crypto');
const RequestIp = require("@supercharge/request-ip");
const error_response_types_1 = require("../utils/error-response-types");
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const MonoDirectPayWebhook_1 = require("../entity/MonoDirectPayWebhook");
const Order_1 = require("../entity/Order");
const PaystackDedicatedNuban_1 = require("../entity/PaystackDedicatedNuban");
const PaystackWebhook_1 = require("../entity/PaystackWebhook");
const TemporaryOrder_1 = require("../entity/TemporaryOrder");
const TempUser_1 = require("../entity/TempUser");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const ErrorMessages_1 = require("../enums/ErrorMessages");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const PaymentInitializeVariant_1 = require("../enums/PaymentInitializeVariant");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Statuses_1 = require("../enums/Statuses");
const logger_2 = __importDefault(require("../logger"));
const MortgageCardService = __importStar(require("../services/mortgageCardService"));
const OnboardingService = __importStar(require("../services/onboardingService"));
const OrderService = __importStar(require("../services/orderService"));
const PaymentService = __importStar(require("../services/paymentService"));
const PaystackService = __importStar(require("../services/paystackService"));
const WalletService = __importStar(require("../services/walletService"));
const Utils = __importStar(require("../utils/core"));
let PaymentsController = class PaymentsController {
    handlePayForExistingOrder(req, orderUuid, orderPaymentVariant, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (!orderUuid) {
                throw new error_response_types_1.NotFoundError('The order was not specified');
            }
            const sourceWallet = yield WalletService.getCustomerWallet(currentUser.id);
            if (sourceWallet.walletBalanceMinor < 0) {
                throw new error_response_types_1.UnprocessableEntityError('Funds Your Wallet to Pay For Previously Unpaid Orders');
            }
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            const order = yield orderRepo.findOne({
                where: {
                    uuid: orderUuid
                },
                join,
            });
            if (!order) {
                throw new error_response_types_1.NotFoundError('The order was not found');
            }
            if (order.paymentStatus !== Statuses_1.OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
                throw new error_response_types_1.UnprocessableEntityError('The order has already been paid for');
            }
            if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
                throw new error_response_types_1.UnprocessableEntityError('You have to pay with your wallet or by card');
            }
            if (order.buyerUserId !== currentUser.id) {
                throw new error_response_types_1.UnauthorizedRequestError('You cannot pay for this order because it does not belong to you');
            }
            if (orderPaymentVariant === OrderPaymentVariant_1.OrderPaymentVariant.WALLET) {
                const match = yield bcrypt_1.default.compare(reqBody.password, currentUser.passwordHash);
                if (!match) {
                    throw new error_response_types_1.UnauthorizedRequestError('User credentials are wrong.');
                }
                const walletRepo = connection.getRepository(Wallet_1.Wallet);
                const userWallet = yield walletRepo.findOne({ userId: currentUser.id });
                const calculatedTotalCostMinor = order.calculatedTotalCostMajor * 100;
                if (userWallet && calculatedTotalCostMinor > userWallet.walletBalanceMinor) {
                    throw new error_response_types_1.UnprocessableEntityError('Insufficient balance to process payment of order');
                }
            }
            const orderPayResponse = yield OrderService.processOrdersPayment([order], orderPaymentVariant, currentUser);
            const resData = {
                status: true,
                data: orderPayResponse
            };
            return resData;
        });
    }
    initializePaystackPayment(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paymentVariant, amountMajor, } = reqBody;
            const currentUser = req.user;
            if (!process.env.PAYSTACK_SECRET_KEY) {
                throw new error_response_types_1.ServerError("Sorry, there was a server mis-configuration.");
            }
            const connection = yield (0, db_1.getFreshConnection)();
            if (paymentVariant === PaymentInitializeVariant_1.PaymentInitializeVariant.FUND_MAIN_WALLET) {
                if (!amountMajor) {
                    throw new error_response_types_1.BadRequestError('Invalid amount');
                }
                if (amountMajor > 1000000) {
                    throw new error_response_types_1.BadRequestError('Amount should not be more than 1 Million NGN');
                }
            }
            const paymentInitResponse = yield PaymentService.initPaystackPayment(currentUser, paymentVariant, amountMajor);
            const resData = {
                status: true,
                data: paymentInitResponse
            };
            return resData;
        });
    }
    verifyPaystackTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_2.default.info('Inside verifyPaystackTransaction ...');
            const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;
            console.log(req.body);
            const currentSourceIp = RequestIp.getClientIp(req);
            if (!currentSourceIp) {
                throw new error_response_types_1.UnprocessableEntityError('Could not fetch source ip address');
            }
            const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220'];
            if (!validSourceIps.includes(currentSourceIp)) {
                throw new error_response_types_1.UnauthorizedRequestError('Invalid source ip. Counterfeit content!!!');
            }
            if (req.body.data.status !== 'success') {
                throw new error_response_types_1.UnprocessableEntityError('Unsuccessful payment!!!');
            }
            const connection = yield (0, db_1.getFreshConnection)();
            //--
            const paystackWebhooksRepo = connection.getRepository(PaystackWebhook_1.PaystackWebhook);
            const paystackWebhook = new PaystackWebhook_1.PaystackWebhook().initialize('', req.body);
            yield paystackWebhooksRepo.save(paystackWebhook);
            //--
            const hash = crypto.createHmac('sha512', paystackApiSecretKey).update(JSON.stringify(req.body)).digest('hex');
            if (hash !== req.headers['x-paystack-signature']) {
                throw new error_response_types_1.UnauthorizedRequestError('Counterfeit content!!!');
            }
            const paystackReference = req.body.data.reference;
            const status = yield PaystackService.checkPaystackTransaction(paystackReference);
            if (status !== 'success') {
                throw new error_response_types_1.UnauthorizedRequestError('Counterfeit content!!!');
            }
            //--
            let allGood = false;
            if (req.body.data.channel === 'dedicated_nuban') {
                allGood = yield this.processPaymentByBankTransfer(req);
            }
            else {
                allGood = yield this.processPaymentByCard(req);
            }
            //--
            if (allGood) {
                paystackWebhook.isProcessed = true;
                yield paystackWebhook.save();
            }
            const resData = {
                status: allGood,
            };
            return resData;
        });
    }
    processPaymentByBankTransfer(req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = req.body.data) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.customer_code) || !((_d = (_c = req.body.data) === null || _c === void 0 ? void 0 : _c.metadata) === null || _d === void 0 ? void 0 : _d.receiver_account_number)) {
                logger_1.default.error('customer code and receiver account number not present');
                throw new error_response_types_1.BadRequestError('customer code and receiver account number not present');
            }
            const paystackDedicatedNubanRepo = (0, typeorm_1.getRepository)(PaystackDedicatedNuban_1.PaystackDedicatedNuban);
            const financialTransactionRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
            const paystackDedicatedNuban = yield paystackDedicatedNubanRepo.findOne({
                paystackCustomerId: `${req.body.data.customer.id}`,
                bankAccountNumber: req.body.data.metadata.receiver_account_number,
                bankName: req.body.data.metadata.receiver_bank
            });
            if (paystackDedicatedNuban) {
                const transaction = yield financialTransactionRepo.findOne({
                    reference: req.body.data.reference,
                    referenceType: PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK
                });
                if (transaction && transaction.paidStatus === PaymentTransaction_1.PaymentTransactionStatus.PAID) {
                    return true;
                }
                const amountMinor = req.body.data.amount;
                const { userId } = paystackDedicatedNuban;
                const sourceWallet = yield WalletService.getCustomerWallet(userId);
                const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor;
                const metadata = {};
                const financialTransaction = new FinancialTransaction_1.FinancialTransaction().initialize(sourceWallet, PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET, amountMinor, walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransaction_1.PaymentTransactionStatus.UNPAID, req.body.data.reference, metadata);
                financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} main wallet fund.`;
                const transactionRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
                const savedTransaction = yield transactionRepo.save(financialTransaction);
                const result = yield PaymentService.processVerifiedPaystackPayment(savedTransaction, OrderPaymentVariant_1.OrderPaymentVariant.WALLET, sourceWallet);
                return result !== null && result !== void 0 ? result : false;
            }
            return true;
        });
    }
    processPaymentByCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let allGood = false;
            const paystackReference = req.body.data.reference;
            const connection = yield (0, db_1.getFreshConnection)();
            const financialTransactionRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
            const unPaidTransactions = yield financialTransactionRepo.find({
                reference: paystackReference,
                referenceType: PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK
            });
            if (!unPaidTransactions.length) {
                throw new error_response_types_1.NotFoundError(ErrorMessages_1.ErrorMessages.PAYMENT_TRANSACTION_NON_EXISTENCE);
            }
            const firstUnpaidTransaction = unPaidTransactions[0];
            if (firstUnpaidTransaction.paidStatus === PaymentTransaction_1.PaymentTransactionStatus.PAID) {
                return true;
            }
            const payingUserId = firstUnpaidTransaction.userId;
            yield this.ensureTemporaryOrderAndUser(paystackReference);
            console.log('Did we reach here');
            if (firstUnpaidTransaction.transactionType === PaymentTransaction_1.PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER) {
                try {
                    for (const transaction of unPaidTransactions) {
                        const sourceWallet = yield WalletService.getCustomerWallet(payingUserId);
                        allGood = yield PaymentService.processVerifiedPaystackPayment(transaction, OrderPaymentVariant_1.OrderPaymentVariant.CARD, sourceWallet);
                        if (!allGood) {
                            logger_2.default.info(`allGood is false from: processVerifiedPaystackPayment. transaction uuid: `, transaction.uuid);
                        }
                    }
                }
                catch (e) {
                    logger_2.default.error(e);
                }
                return true;
            }
            const sourceWallet = yield WalletService.getCustomerWallet(payingUserId);
            allGood = yield PaymentService.processVerifiedPaystackPayment(firstUnpaidTransaction, OrderPaymentVariant_1.OrderPaymentVariant.CARD, sourceWallet);
            return false;
        });
    }
    ensureTemporaryOrderAndUser(paystackReference) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside ensure Temporary Order And User');
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const orderReop = connection.getRepository(Order_1.Order);
            const financialTransactionRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
            const temporaryOrderRepo = connection.getRepository(TemporaryOrder_1.TemporaryOrder);
            const unPaidTransactions = yield financialTransactionRepo.find({
                reference: paystackReference,
                referenceType: PaymentTransaction_1.FinancialTransactionReferenceType.PAYSTACK,
                paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID
            });
            const temporaryOrderUuids = unPaidTransactions
                .filter(unPaidTrans => { var _a; return (_a = unPaidTrans.metadata) === null || _a === void 0 ? void 0 : _a.temporaryOrderUuid; })
                .map(unPaidTrans => { var _a; return (_a = unPaidTrans.metadata) === null || _a === void 0 ? void 0 : _a.temporaryOrderUuid; });
            console.log(temporaryOrderUuids);
            if (!temporaryOrderUuids.length) {
                return;
            }
            const temporaryOrders = yield temporaryOrderRepo.find({
                where: {
                    uuid: (0, typeorm_1.In)(temporaryOrderUuids),
                },
                join: {
                    alias: "temporaryOrder",
                    leftJoinAndSelect: {
                        pickupLocation: "temporaryOrder.pickupLocation",
                    },
                },
            });
            const buyerDetails = temporaryOrders[0].buyerUser;
            console.log('Buyer from temp', buyerDetails);
            let savedUser;
            let userWallet;
            let existingUser = yield userRepo.findOne({
                msisdn: buyerDetails.msisdn,
            });
            console.log(`Existing buyer phone number`, existingUser);
            if (existingUser) {
                userWallet = yield WalletService.getCustomerWallet(existingUser.id);
                savedUser = existingUser;
            }
            else {
                existingUser = yield userRepo.findOne({
                    emailAddress: buyerDetails.emailAddress,
                });
                console.log(`Existing buyer email`, existingUser);
                if (existingUser) {
                    userWallet = yield WalletService.getCustomerWallet(existingUser.id);
                    savedUser = existingUser;
                }
            }
            if (!existingUser) {
                const passwordHash = yield Utils.generatePasswordHash(Utils.generateOtp(24));
                const tempUser = new TempUser_1.TempUser().initializeFromBuyerDetails(buyerDetails.fullName, buyerDetails.msisdn, buyerDetails.emailAddress, passwordHash);
                savedUser = yield OnboardingService.saveNewUser(tempUser, buyerDetails.msisdn, 'Nigeria');
                userWallet = yield WalletService.getCustomerWallet(savedUser.id);
            }
            let deliveryLocation;
            for (const tempOrder of temporaryOrders) {
                if (tempOrder.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                    const { address, country, state, contactFullName, contactPhoneNumber } = tempOrder.deliveryDetails;
                    deliveryLocation = new DeliveryLocation_1.DeliveryLocation().initialize(savedUser.id, address, country, state, contactFullName, contactPhoneNumber);
                    yield deliveryLocation.save();
                    break;
                }
            }
            yield financialTransactionRepo.createQueryBuilder()
                .update(FinancialTransaction_1.FinancialTransaction)
                .set({
                userId: savedUser.id,
                walletId: userWallet.id,
            })
                .where({
                id: (0, typeorm_1.In)(unPaidTransactions.map(unPaidTrans => unPaidTrans.id)),
            })
                .execute();
            const orders = [];
            for (const tempOrder of temporaryOrders) {
                if (tempOrder.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
                    const createdOrders = yield OrderService.createOrdersFromTemporaryOrders(savedUser, tempOrder.orderItems, tempOrder.orderReceiveType, OrderPaymentVariant_1.OrderPaymentVariant.CARD, tempOrder.uuid, deliveryLocation, undefined, undefined);
                    console.log('created orders for delivery', createdOrders);
                    orders.push(...createdOrders);
                }
                else {
                    const createdOrders = yield OrderService.createOrdersFromTemporaryOrders(savedUser, tempOrder.orderItems, tempOrder.orderReceiveType, OrderPaymentVariant_1.OrderPaymentVariant.CARD, tempOrder.uuid, undefined, undefined, tempOrder.pickupLocation);
                    console.log('created orders for pickup', createdOrders);
                    orders.push(...createdOrders);
                }
            }
            for (const order of orders) {
                const unPaidTransactionsForOrderIndex = unPaidTransactions.findIndex((transaction) => { var _a; return ((_a = transaction.metadata) === null || _a === void 0 ? void 0 : _a.temporaryOrderUuid) === order.temporaryOrderUuid; });
                const unPaidTransaction = unPaidTransactions[unPaidTransactionsForOrderIndex];
                yield orderReop.createQueryBuilder()
                    .update(Order_1.Order)
                    .set({ paymentTransactionUuid: unPaidTransaction.uuid })
                    .where({ id: order.id })
                    .execute();
                unPaidTransactions.splice(unPaidTransactionsForOrderIndex, 1);
                console.log('transction left', unPaidTransactions);
            }
        });
    }
    dedicatedAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const paystackDedicatedNubanRepo = connection.getRepository(PaystackDedicatedNuban_1.PaystackDedicatedNuban);
            let paystackDedicatedNuban = yield paystackDedicatedNubanRepo.findOne({ userId: currentUser.id });
            if (!paystackDedicatedNuban) {
                paystackDedicatedNuban = yield PaystackService.createDedicatedNuban(currentUser);
                if (!paystackDedicatedNuban) {
                    throw new error_response_types_1.NotFoundError('Dedicated account not found. Please contact support');
                }
            }
            const resData = {
                status: true,
                data: _.omit(paystackDedicatedNuban, 'id')
            };
            return resData;
        });
    }
    handlePaidTOrderByPaymentReference(req, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const realOrders = yield OrderService.ordersByPaymentReference(reference);
            const fullOrderDetails = [];
            for (const order of realOrders) {
                const responseOrder = yield OrderService.orderDetails(order);
                fullOrderDetails.push(responseOrder);
            }
            const resData = {
                status: true,
                data: fullOrderDetails,
            };
            return resData;
        });
    }
    processMonoWebhookTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_2.default.info('Inside processMonoWebhookTransaction ...');
            const connection = yield (0, db_1.getFreshConnection)();
            const monoDirectPayWebhooksT = connection.getRepository(MonoDirectPayWebhook_1.MonoDirectPayWebhooks);
            console.log(req.body);
            // const currentSourceIp: string | undefined = RequestIp.getClientIp(req)
            // if(!currentSourceIp) {
            //   throw new UnprocessableEntityError('Could not fetch source ip address')
            // }
            // const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220']
            // if (!validSourceIps.includes(currentSourceIp)) {
            //   throw new UnauthorizedRequestError('Invalid source ip. Counterfeit content!!!')
            // }
            const payload = {
                id: req.body.data.id,
                type: req.body.data.type,
                event: req.body.event,
                reference: req.body.data.object.reference,
                status: req.body.data.object.status,
                amount: req.body.data.object.amount,
                description: req.body.data.object.description,
                fee: req.body.data.object.fee,
                currency: req.body.data.object.currency,
                liveMode: req.body.data.object.liveMode,
                createdAt: req.body.data.object.created_at,
                updatedAt: req.body.data.object.updated_at
            };
            console.log('payload', payload);
            console.log('req.body.data.status', req.body.data.object.status);
            if (req.body.data.object.status !== Statuses_1.MonoWebhookStatus.SUCCESSFULL) {
                // store webhook response from mono for failed
                const newMonoDirectPayWebhooks = new MonoDirectPayWebhook_1.MonoDirectPayWebhooks().initializeDirectPayWebHookResponse(payload.reference, payload.status, payload.event, payload);
                yield monoDirectPayWebhooksT.save(newMonoDirectPayWebhooks);
                throw new error_response_types_1.UnprocessableEntityError('Unsuccessful payment!!!');
            }
            yield MortgageCardService.processMonoDirectPayWebhook(payload);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/pay/order/:orderUuid/paymentVariant/:orderPaymentVariant'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handlePayForExistingOrder", null);
__decorate([
    (0, tsoa_1.Post)('/paystack/initialize'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initializePaystackPayment", null);
__decorate([
    (0, tsoa_1.Post)('/paystack/verify/webhook'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verifyPaystackTransaction", null);
__decorate([
    (0, tsoa_1.Get)('/paystack/dedicated-account'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "dedicatedAccount", null);
__decorate([
    (0, tsoa_1.Get)("/orders/:reference"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("reference")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handlePaidTOrderByPaymentReference", null);
__decorate([
    (0, tsoa_1.Post)('/mono/verify/webhook'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "processMonoWebhookTransaction", null);
PaymentsController = __decorate([
    (0, tsoa_1.Route)("api/payments"),
    (0, tsoa_1.Tags)('Payments')
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=PaymentController.js.map