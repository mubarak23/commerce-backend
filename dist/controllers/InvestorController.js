"use strict";
// DO NOT EXPORT DEFAULT
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
exports.InvestorController = void 0;
const tsoa_1 = require("tsoa");
const db_1 = require("../db");
const ProjectSubscription_1 = require("../entity/ProjectSubscription");
const ProjectSubscriptionTransaction_1 = require("../entity/ProjectSubscriptionTransaction");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const ProjectEnums_1 = require("../enums/ProjectEnums");
const ProjectSubscriptionPaymentVariant_1 = require("../enums/ProjectSubscriptionPaymentVariant");
const SortOrder_1 = require("../enums/SortOrder");
const PaginationService = __importStar(require("../services/paginationService"));
const ProjectService = __importStar(require("../services/projectService"));
const error_response_types_1 = require("../utils/error-response-types");
let InvestorController = class InvestorController extends tsoa_1.Controller {
    handleGetMyPortfolioProjectSubscription(req, pageNumber, sortOrder, projectStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            //--
            const query = {};
            if (projectStatus && projectStatus !== ProjectEnums_1.ProjectStatuses.ALL) {
                query.status = projectStatus;
            }
            query.investorUserId = req.user.id;
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectSubscriptionRepo.count(query);
            const projectSubscriptionListsPages = yield PaginationService.paginate(ProjectSubscription_1.ProjectSubscription, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectSubscriptionLists = projectSubscriptionListsPages.dataset;
            if (projectSubscriptionLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project Subscription at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformProjectSubscriptions(projectSubscriptionLists);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleProjectSubscriptionFetchDetails(req, subscriptionUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            const projectSubscription = yield projectSubscriptionRepo.findOne({
                where: { uuid: subscriptionUuid, investorUserId: req.user.id, isSoftDeleted: false },
                join
            });
            if (!projectSubscription) {
                throw new error_response_types_1.NotFoundError("Specified Project Portfolio Does Not Exist");
            }
            const transformProjectDetails = yield ProjectService.transformProjectSubscription(projectSubscription, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    handleGetMyProjectSubscriptionTransactions(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionTransactionsRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
            //--
            const query = {};
            query.investorUserId = req.user.id;
            query.isPaid = true;
            query.paidStatus = PaymentTransaction_1.PaymentTransactionStatus.PAID;
            const join = {
                alias: "project_susbscription_transactions",
                leftJoinAndSelect: {
                    projectSubscription: "project_susbscription_transactions.projectSubscription",
                    project: "project_susbscription_transactions.project",
                    developer: "project_susbscription_transactions.developer",
                    investor: "project_susbscription_transactions.investor",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectSubscriptionTransactionsRepo.count(query);
            const projectSubscriptionTransactionListsPages = yield PaginationService.paginate(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectSubscriptionTransactionLists = projectSubscriptionTransactionListsPages.dataset;
            if (projectSubscriptionTransactionLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project Subscription Transactions at the Moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformProjectSubscriptionTransactions(projectSubscriptionTransactionLists, req.user);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetPendingRecurrentProjectSubscriptionTransactions(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
            const join = {
                alias: "project_susbscription_transactions",
                leftJoinAndSelect: {
                    projectSubscription: "project_susbscription_transactions.projectSubscription",
                    project: "project_susbscription_transactions.project",
                    developer: "project_susbscription_transactions.developer",
                    investor: "project_susbscription_transactions.investor",
                },
            };
            const projectSubscriptionTransactions = yield projectSubscriptionTransactionRepo.find({
                where: { investorUserId: req.user.id, isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID, isSoftDeleted: false },
                join
            });
            if (projectSubscriptionTransactions.length === 0) {
                throw new error_response_types_1.NotFoundError("No Recurrent Payment At the Moment");
            }
            // const currentDate = new Date();
            // const currentMonth = currentDate.getMonth() + 1;
            // const currentYear = currentDate.getFullYear();
            // // console.log('currentMonth', currentMonth)
            // const filteredTransactions = projectSubscriptionTransactions.filter(
            //   (transaction) => {
            //     const nextPaymentDate = new Date(transaction.nextPaymentDate);
            //     const transactionMonth = nextPaymentDate.getMonth(); 
            //     const transactionYear = nextPaymentDate.getFullYear();
            //    //  console.log('transactionMonth', transactionMonth)
            //     return transactionMonth === currentMonth && transactionYear === currentYear;
            //   }
            // );
            // if(filteredTransactions.length === 0){
            //   throw new NotFoundError("No Recurrent Payment For the Month At the Moment");
            // }
            console.log('projectSubscriptionTransactions - 0', projectSubscriptionTransactions[0]);
            // console.log('projectSubscriptionTransactions - 1', projectSubscriptionTransactions[1])
            // console.log('projectSubscriptionTransactions - 2', projectSubscriptionTransactions[2])
            // const filteredTransactions = []
            // filteredTransactions.push(projectSubscriptionTransactions[0])
            // filteredTransactions.push(projectSubscriptionTransactions[1])
            // filteredTransactions.push(projectSubscriptionTransactions[2])
            const transformProjectSubscriptionTransactions = yield ProjectService.transformProjectSubscriptionTransactions(projectSubscriptionTransactions, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectSubscriptionTransactions,
            };
            return resData;
        });
    }
    handleGetSingleProjectSubscriptionTransactions(req, transactionUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
            const join = {
                alias: "project_susbscription_transactions",
                leftJoinAndSelect: {
                    projectSubscription: "project_susbscription_transactions.projectSubscription",
                    project: "project_susbscription_transactions.project",
                    developer: "project_susbscription_transactions.developer",
                    investor: "project_susbscription_transactions.investor",
                },
            };
            const projectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
                where: { uuid: transactionUuid, investorUserId: req.user.id, isSoftDeleted: false },
                join
            });
            if (!projectSubscriptionTransaction) {
                throw new error_response_types_1.NotFoundError("Specified Project Portfolio Does Not Exist");
            }
            const transformProjectSubscriptionTransaction = yield ProjectService.transformProjectSubscriptionTransaction(projectSubscriptionTransaction, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectSubscriptionTransaction,
            };
            return resData;
        });
    }
    createProjectSubscription(req, requestBody, projectSubscriptionPaymentVariant, transactionUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield ProjectService.paymentForRecurrentSubscriptionTransansaction(requestBody.totalCost, transactionUuid, currentUser, projectSubscriptionPaymentVariant);
            this.setStatus(200);
            const resData = {
                status: true,
                data: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("portfolio"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "handleGetMyPortfolioProjectSubscription", null);
__decorate([
    (0, tsoa_1.Get)("/portfolio/:subscriptionUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("subscriptionUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "handleProjectSubscriptionFetchDetails", null);
__decorate([
    (0, tsoa_1.Get)("projecttransactions"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "handleGetMyProjectSubscriptionTransactions", null);
__decorate([
    (0, tsoa_1.Get)("/projecttransactions/pendingrecurrentpayment"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "handleGetPendingRecurrentProjectSubscriptionTransactions", null);
__decorate([
    (0, tsoa_1.Get)("/projecttransactions/:transactionUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("transactionUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "handleGetSingleProjectSubscriptionTransactions", null);
__decorate([
    (0, tsoa_1.Post)("/projecttransactions/payment/:transactionUuid/:projectSubscriptionPaymentVariant"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)('projectSubscriptionPaymentVariant')),
    __param(3, (0, tsoa_1.Path)("transactionUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "createProjectSubscription", null);
InvestorController = __decorate([
    (0, tsoa_1.Route)("api/investor"),
    (0, tsoa_1.Tags)("Project Investor")
], InvestorController);
exports.InvestorController = InvestorController;
//# sourceMappingURL=InvestorController.js.map