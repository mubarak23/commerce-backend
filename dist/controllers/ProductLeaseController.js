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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLeaseController = void 0;
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const db_1 = require("../db");
const SortOrder_1 = require("../enums/SortOrder");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const Wallet_1 = require("../entity/Wallet");
const ProductLease_1 = require("../entity/ProductLease");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const EmailService = __importStar(require("../services/emailService"));
const Currency_1 = require("../enums/Currency");
const WalletType_1 = require("../enums/WalletType");
const error_response_types_1 = require("../utils/error-response-types");
const Category_1 = require("../entity/Category");
const ProductLeaseRequest_1 = require("../entity/ProductLeaseRequest");
const Account_1 = require("../entity/Account");
// DO NOT EXPORT DEFAULT
let ProductLeaseController = class ProductLeaseController {
    requestProductLease(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const productLeaseRequestRepo = connection.getRepository(ProductLeaseRequest_1.ProductLeaseRequest);
            const activeLease = yield productLeaseRepo.findOne({
                userId: currentUser.id,
                isActive: true,
            });
            if (activeLease) {
                throw new error_response_types_1.BadRequestError("An Active Product Financing is currently Running");
            }
            const submittedProductLeaseRequest = yield productLeaseRequestRepo.findOne({
                userId: currentUser.id,
            });
            if (submittedProductLeaseRequest) {
                throw new error_response_types_1.BadRequestError("A Product Lease Request has been submitted");
            }
            let category;
            if (requestBody.productCategoryUuid) {
                const categoryRepo = connection.getRepository(Category_1.Category);
                category = yield categoryRepo.findOne({
                    uuid: requestBody.productCategoryUuid,
                });
                if (!category) {
                    throw new error_response_types_1.BadRequestError("The Category selected does not exist ");
                }
            }
            const productleaseRequest = new ProductLeaseRequest_1.ProductLeaseRequest().initialize(currentUser.id, requestBody);
            const newProductleaseRequest = yield productLeaseRequestRepo.save(productleaseRequest);
            const plpTrigger = yield EmailService.sendMailtoAdminOnPLPApplication(currentUser);
            const resData = {
                status: true,
                data: newProductleaseRequest.toResponseDto(),
            };
            return resData;
        });
    }
    productLeaseStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const activeProductLease = yield productLeaseRepo.findOne({
                userId: currentUser.id,
                isActive: true,
                isSoftDeleted: false,
            });
            if (!activeProductLease) {
                return {
                    status: true,
                    data: null,
                };
            }
            const walletRepo = connection.getRepository(Wallet_1.Wallet);
            let wallet = yield walletRepo.findOne({
                where: { userId: currentUser.id },
                order: { createdAt: "ASC" },
            });
            if (!wallet) {
                const walletRepoT = connection.getRepository(Wallet_1.Wallet);
                const accountRepo = connection.getRepository(Account_1.Account);
                const userAccount = yield accountRepo.findOne({ primaryUserId: currentUser.id });
                const CurrencyEnum = Currency_1.CountryCodeToCurrency;
                const currency = CurrencyEnum[currentUser.countryIso2] || "NGN";
                wallet = new Wallet_1.Wallet().initialize(currentUser.id, userAccount.id, WalletType_1.WalletType.CUSTOMER_WALLET, currency);
                yield walletRepoT.save(wallet);
            }
            const resData = {
                status: true,
                data: {
                    uuid: activeProductLease.uuid,
                    principalAmountMajor: activeProductLease.principalAmountMinor / 100,
                    interestRatePercentage: activeProductLease.interestRatePercentage,
                    nextLeasePaymentDueDateUtc: activeProductLease.nextLeasePaymentDueDate,
                    totalLoanAmountDueMajor: Math.abs(wallet.walletBalanceMinor) / 100,
                    createdAtUtc: activeProductLease.createdAt,
                    currency: activeProductLease.currency,
                    creditScore: 0,
                },
            };
            return resData;
        });
    }
    productLeasePaymentsHistory(req, uuid, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const financialTransactionRepo = connection.getRepository(FinancialTransaction_1.FinancialTransaction);
            const activeProductLease = yield productLeaseRepo.findOne({
                uuid,
            });
            const pageSize = 10;
            const offset = (pageNumber - 1) * pageSize;
            const pageResultQuery = financialTransactionRepo
                .createQueryBuilder()
                .where("metadata->>'productLeaseId' = :productLeaseId", {
                productLeaseId: activeProductLease.id
            })
                .andWhere("user_id = :userId", {
                userId: currentUser.id
            })
                .andWhere("paid_status = :paidStatus", {
                paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
            })
                .skip(offset)
                .limit(pageSize)
                .orderBy("created_at", sortOrder);
            const pageResultCount = yield pageResultQuery.getCount();
            const pageResultDataset = yield pageResultQuery.getMany();
            const formattedDataSet = pageResultDataset.map((dataRecord) => {
                const transaction = dataRecord;
                return transaction.toResponseDto();
            });
            const resData = {
                status: true,
                data: {
                    pageNumber,
                    pageSize,
                    total: pageResultCount,
                    dataset: formattedDataSet
                },
            };
            return resData;
        });
    }
    processProductLeaveLeaveIntent(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
            const activeProductLease = yield productLeaseRepo.findOne({
                userId: currentUser.id,
                isActive: true,
                isSoftDeleted: false,
            });
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    productLeaseRequestDocs(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productLeaseRequestRepo = connection.getRepository(ProductLeaseRequest_1.ProductLeaseRequest);
            const productLeaseRequest = yield productLeaseRequestRepo.findOne({
                userId: currentUser.id,
            });
            if (!productLeaseRequest) {
                throw new error_response_types_1.NotFoundError('No product lease request found');
            }
            const uploadDocuments = (productLeaseRequest.uploads || []).map(uDoc => _.omit(uDoc, 'keyFromCloudProvider'));
            const resData = {
                status: true,
                data: uploadDocuments,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/productlease/request"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductLeaseController.prototype, "requestProductLease", null);
__decorate([
    (0, tsoa_1.Get)("/productlease/status"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductLeaseController.prototype, "productLeaseStatus", null);
__decorate([
    (0, tsoa_1.Get)("/productlease/:uuid/payments/history"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], ProductLeaseController.prototype, "productLeasePaymentsHistory", null);
__decorate([
    (0, tsoa_1.Post)("/productlease/leaveintent"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductLeaseController.prototype, "processProductLeaveLeaveIntent", null);
__decorate([
    (0, tsoa_1.Get)("/productlease/documents"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductLeaseController.prototype, "productLeaseRequestDocs", null);
ProductLeaseController = __decorate([
    (0, tsoa_1.Route)("api/productlease"),
    (0, tsoa_1.Tags)("Product Lease"),
    (0, tsoa_1.Security)("jwt")
], ProductLeaseController);
exports.ProductLeaseController = ProductLeaseController;
// IProductLeaseDocsResponseDto
//# sourceMappingURL=ProductLeaseController.js.map