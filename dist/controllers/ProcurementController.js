"use strict";
// ProcurementInvoice
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
exports.ProcurementController = exports.ProcurementsListFilter = void 0;
const tsoa_1 = require("tsoa");
const db_1 = require("../db");
const PaginationService = __importStar(require("../services/paginationService"));
const SortOrder_1 = require("../enums/SortOrder");
const typeorm_1 = require("typeorm");
const CooperateService = __importStar(require("../services/cooperateService"));
const error_response_types_1 = require("../utils/error-response-types");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const Procurement_1 = require("../entity/Procurement");
var ProcurementsListFilter;
(function (ProcurementsListFilter) {
    ProcurementsListFilter["ALL"] = "ALL";
    ProcurementsListFilter["PROCESS_PENDING"] = "PROCESS_PENDING";
    ProcurementsListFilter["IS_PROCESSED"] = "IS_PROCESSED";
})(ProcurementsListFilter = exports.ProcurementsListFilter || (exports.ProcurementsListFilter = {}));
let ProcurementController = class ProcurementController {
    handleGetMyProcurements(req, pageNumber, sortOrder, filter, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield CooperateService.isCooperateAccount(currentUser);
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementRepo = connection.getRepository(Procurement_1.Procurements);
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            //--
            let query = {};
            query = {
                accountId: currentUser.accountId,
            };
            if (filter === ProcurementsListFilter.IS_PROCESSED) {
                query.isProcessed = true;
            }
            else if (filter === ProcurementsListFilter.PROCESS_PENDING) {
                query.isProcessed = false;
            }
            if (startDate) {
                query = { createdAt: (0, typeorm_1.MoreThan)(startDate) };
            }
            if (endDate) {
                query = { createdAt: (0, typeorm_1.LessThan)(endDate) };
            }
            if (startDate && endDate) {
                query = { createdAt: (0, typeorm_1.Between)(startDate, endDate) };
            }
            //--
            const pageSize = 10;
            const totalCount = yield procurementRepo.count(query);
            const procurementListsPages = yield PaginationService.paginate(Procurement_1.Procurements, query, pageSize, pageNumber, sortOrder, undefined);
            if (procurementListsPages.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Procurement Available');
            }
            const procurementIds = procurementListsPages.dataset.map(procurement => procurement.id);
            const procurementInvoices = yield procurementInvoiceRepo.find({ procurementId: (0, typeorm_1.In)(procurementIds) });
            // @ts-ignore
            const transformedProcurmentDataset = procurementListsPages.dataset.map(proc => {
                const invoiceDetails = procurementInvoices.find(invoice => invoice.procurementId === proc.id);
                return {
                    uuid: proc.uuid,
                    accountId: proc.accountId,
                    procurementInvoice: invoiceDetails ? invoiceDetails.toResponseDto() : null,
                    upload: proc.upload,
                    isProcessed: proc.isProcessed,
                    createdAt: proc.createdAt
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProcurmentDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetProcurementsDetails(req, procurementUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementRepo = connection.getRepository(Procurement_1.Procurements);
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const procurement = yield procurementRepo.findOne({
                uuid: procurementUuid,
            });
            if (!procurement) {
                throw new error_response_types_1.UnprocessableEntityError("Invoice Does Not Exist");
            }
            if (procurement.accountId !== currentUser.accountId) {
                throw new error_response_types_1.UnauthorizedRequestError("You do not have access to view the specified procurement");
            }
            const procurementInvoice = yield procurementInvoiceRepo.findOne({
                procurementId: procurement.id,
            });
            const transformProcurmentDetails = {
                uuid: procurement.uuid,
                accountId: procurement.accountId,
                invoice: procurementInvoice === null || procurementInvoice === void 0 ? void 0 : procurementInvoice.toResponseDto(),
                upload: procurement.upload,
                isProcessed: procurement.isProcessed,
                createdAt: procurement.createdAt
            };
            const resData = {
                status: true,
                data: transformProcurmentDetails
            };
            return resData;
        });
    }
    handleGetInvoiceDetails(req, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const invoice = yield procurementInvoiceRepo.findOne({
                uuid,
            });
            if (!invoice) {
                throw new error_response_types_1.UnprocessableEntityError("Invoice Does Not Exist");
            }
            if (invoice.accountId !== currentUser.accountId) {
                throw new error_response_types_1.UnauthorizedRequestError("You do not have access to view the specified procurement invoice");
            }
            const transformInvoiceDetails = {
                uuid: invoice.uuid,
                accountId: invoice.accountId,
                referenceNumber: invoice.referenceNumber,
                calculatedTotalCostMajor: invoice.calculatedTotalCostMajor,
                invoiceItem: invoice.invoiceItem,
                status: invoice.status,
                statusHistory: invoice.statusHistory,
                orderCreated: invoice.orderCreated,
                orderCreatedAt: invoice.orderCreatedAt,
                createdAt: invoice.createdAt
            };
            const resData = {
                status: true,
                data: transformInvoiceDetails
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("filter")),
    __param(4, (0, tsoa_1.Query)("startDate")),
    __param(5, (0, tsoa_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProcurementController.prototype, "handleGetMyProcurements", null);
__decorate([
    (0, tsoa_1.Get)('/:procurementUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('procurementUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProcurementController.prototype, "handleGetProcurementsDetails", null);
__decorate([
    (0, tsoa_1.Get)('/invoice/:uuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProcurementController.prototype, "handleGetInvoiceDetails", null);
ProcurementController = __decorate([
    (0, tsoa_1.Route)("api/procurements"),
    (0, tsoa_1.Tags)("Procurement"),
    (0, tsoa_1.Security)("jwt")
], ProcurementController);
exports.ProcurementController = ProcurementController;
//# sourceMappingURL=ProcurementController.js.map