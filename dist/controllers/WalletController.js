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
exports.WalletController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const DeliveryWalletFee_1 = require("../entity/DeliveryWalletFee");
const EarningsByMonth_1 = require("../entity/EarningsByMonth");
const EarningsByYear_1 = require("../entity/EarningsByYear");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Currency_1 = require("../enums/Currency");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Roles_1 = require("../enums/Roles");
const SortOrder_1 = require("../enums/SortOrder");
const WalletType_1 = require("../enums/WalletType");
const EmailService = __importStar(require("../services/emailService"));
const OrderService = __importStar(require("../services/orderService"));
const paginationService_1 = require("../services/paginationService");
const WalletService = __importStar(require("../services/walletService"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let WalletController = class WalletController extends tsoa_1.Controller {
    mainWalletBalance(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const wallet = yield WalletService.getCustomerWallet(currentUser.id);
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            const currencySymbol = CurrencyEnum[(_a = wallet.currency) !== null && _a !== void 0 ? _a : 'NGN'] || '₦';
            const resData = {
                status: true,
                data: {
                    currency: (_b = wallet.currency) !== null && _b !== void 0 ? _b : 'NGN',
                    currencySymbol,
                    amountMajor: (wallet.walletBalanceMinor || 0) / 100
                }
            };
            return resData;
        });
    }
    withdraw(req, reqBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { amountMajor, password, } = reqBody;
            const currentUser = req.user;
            const match = yield bcrypt_1.default.compare(password, currentUser.passwordHash);
            if (!match) {
                throw new error_response_types_1.UnauthorizedRequestError('User credentials are wrong.');
            }
            if (currentUser.role === Roles_1.Roles.AFFILIATE) {
                yield OrderService.affiliateUnpaidOrder(currentUser);
            }
            const sourceWallet = yield WalletService.getCustomerWallet(currentUser.id);
            const walletBalanceMinor = (sourceWallet === null || sourceWallet === void 0 ? void 0 : sourceWallet.walletBalanceMinor) || 0;
            const amountMinor = amountMajor * 100;
            if (walletBalanceMinor < 0) {
                throw new error_response_types_1.UnprocessableEntityError(`Insufficient balance for your withdrawal including the transaction charge`);
            }
            if (walletBalanceMinor < amountMinor) {
                throw new error_response_types_1.UnprocessableEntityError(`Insufficient balance for your withdrawal including the transaction charge`);
            }
            if (!((_a = currentUser.bankInfo) === null || _a === void 0 ? void 0 : _a.bankName) && !((_b = currentUser.bankInfo) === null || _b === void 0 ? void 0 : _b.bankAccountNumber)) {
                throw new error_response_types_1.UnprocessableEntityError('Please set your bank account information');
            }
            const finalFinancialTransaction = yield WalletService.saveWithdrawalTransaction(sourceWallet, amountMinor, PaymentTransaction_1.PaymentTransactionStatus.PAID);
            yield EmailService.sendWithdrawalRequestToSupport(currentUser, sourceWallet, currentUser.bankInfo, amountMajor);
            const resData = {
                status: true,
                data: finalFinancialTransaction.toResponseDto()
            };
            return resData;
        });
    }
    financialTransactions(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const pageSize = 10;
            const query = {
                userId: currentUser.id,
                paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
            };
            const pageResult = yield (0, paginationService_1.paginate)(FinancialTransaction_1.FinancialTransaction, query, pageSize, pageNumber, sortOrder);
            const formattedDataSet = pageResult.dataset.map(dataRecord => {
                const transaction = dataRecord;
                return transaction.toResponseDto();
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedDataSet })
            };
            return resData;
        });
    }
    earnings(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const aYearAgoMoment = moment_1.default.utc().add(-12, 'months');
            const connection = yield (0, db_1.getFreshConnection)();
            const earningbyMonthRepo = connection.getRepository(EarningsByMonth_1.EarningsByMonth);
            const userMonthEarnings = yield earningbyMonthRepo.find({
                userId: currentUser.id,
                createdAt: (0, typeorm_1.MoreThan)(aYearAgoMoment.toDate())
            });
            const formattedMonthEarnings = userMonthEarnings.map(earning => {
                return {
                    friendlyMonth: (0, moment_1.default)((0, moment_1.default)(`${earning.monthISO8601}-01`).format("YYYY-MM-DD")).format('MMMM'),
                    monthISO8601: earning.monthISO8601,
                    totalEarningsMajor: earning.totalEarningsMinor / 100
                };
            });
            const earningsByYearRepo = connection.getRepository(EarningsByYear_1.EarningsByYear);
            const year = moment_1.default.utc().format('YYYY');
            const userYearEarning = yield earningsByYearRepo.findOne({
                userId: currentUser.id,
                year,
            });
            const userYearEarnings = yield earningsByYearRepo.find({
                userId: currentUser.id,
            });
            const wallet = yield WalletService.getCustomerWallet(currentUser.id);
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            const currencySymbol = CurrencyEnum[wallet.currency] || '₦';
            const resData = {
                status: true,
                data: {
                    currentYearEarningsMajor: userYearEarning ? userYearEarning.totalEarningsMinor / 100 : 0,
                    yearEarnings: userYearEarnings.map(yearEarnings => {
                        return {
                            year: yearEarnings.year,
                            totalEarningsMajor: yearEarnings.totalEarningsMinor / 100
                        };
                    }),
                    monthEarnings: formattedMonthEarnings,
                    currency: wallet.currency,
                    currencySymbol,
                }
            };
            return resData;
        });
    }
    secondaryWalletBalance(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const wallet = yield WalletService.getSecondaryCustomerWallet(currentUser.accountId);
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            const currencySymbol = CurrencyEnum[(_a = wallet.currency) !== null && _a !== void 0 ? _a : 'NGN'] || '₦';
            const resData = {
                status: true,
                data: {
                    currency: (_b = wallet.currency) !== null && _b !== void 0 ? _b : 'NGN',
                    currencySymbol,
                    amountMajor: (wallet.walletBalanceMinor || 0) / 100
                }
            };
            return resData;
        });
    }
    secondaryDinancialTransactions(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const secondaryWalletRepo = connection.getRepository(DeliveryWalletFee_1.DeliveryFeeWallet);
            const secondaryWallet = yield secondaryWalletRepo.findOne({
                accountId: currentUser.accountId,
                type: WalletType_1.WalletType.CUSTOMER_WALLET,
            });
            if (!secondaryWallet) {
                throw new error_response_types_1.UnprocessableEntityError('Secondary Wallet Does Not Exist');
            }
            const pageSize = 10;
            const query = {
                userId: currentUser.id,
                walletId: secondaryWallet === null || secondaryWallet === void 0 ? void 0 : secondaryWallet.id,
                paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
            };
            const pageResult = yield (0, paginationService_1.paginate)(FinancialTransaction_1.FinancialTransaction, query, pageSize, pageNumber, sortOrder);
            const formattedDataSet = pageResult.dataset.map(dataRecord => {
                const transaction = dataRecord;
                return transaction.toResponseDto();
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedDataSet })
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/main/balance'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "mainWalletBalance", null);
__decorate([
    (0, tsoa_1.Post)('/withdraw'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdraw", null);
__decorate([
    (0, tsoa_1.Get)('/transactions'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('pageNumber')),
    __param(2, (0, tsoa_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "financialTransactions", null);
__decorate([
    (0, tsoa_1.Get)('/earnings'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "earnings", null);
__decorate([
    (0, tsoa_1.Get)('/secondary/balance'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "secondaryWalletBalance", null);
__decorate([
    (0, tsoa_1.Get)('/secondary/transactions'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('pageNumber')),
    __param(2, (0, tsoa_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "secondaryDinancialTransactions", null);
WalletController = __decorate([
    (0, tsoa_1.Route)("api/wallet"),
    (0, tsoa_1.Tags)('Wallet'),
    (0, tsoa_1.Security)("jwt")
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map