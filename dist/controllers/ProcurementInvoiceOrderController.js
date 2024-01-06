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
exports.ProcurementInvoiceOrderController = void 0;
/* eslint-disable no-await-in-loop */
const tsoa_1 = require("tsoa");
const _ = __importStar(require("underscore"));
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Order_1 = require("../entity/Order");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const Product_1 = require("../entity/Product");
const WareHouse_1 = require("../entity/WareHouse");
const Currency_1 = require("../enums/Currency");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const OrderService = __importStar(require("../services/orderService"));
const InvoiceService = __importStar(require("../services/procurementInvoiceService"));
const ProfileService = __importStar(require("../services/profileService"));
const error_response_types_1 = require("../utils/error-response-types");
// DO NOT EXPORT DEFAULT
let ProcurementInvoiceOrderController = class ProcurementInvoiceOrderController extends tsoa_1.Controller {
    ensureOrderCreateForInvoiceIsOkay(procurementInvoice, invoiceItems) {
        return __awaiter(this, void 0, void 0, function* () {
            const procurementInvoiceItems = procurementInvoice.invoiceItem;
            for (const invoice of invoiceItems) {
                const doesItemExist = procurementInvoiceItems.find(item => item.productUuid === invoice.productUuid);
                if (!doesItemExist) {
                    throw new error_response_types_1.UnprocessableEntityError('Item Does Not Exist in the Procurement Invoice');
                }
            }
            return true;
        });
    }
    handleCreateOrderFromInvoice(req, uuid, orderPaymentVariant, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const wareHouseRepo = connection.getRepository(WareHouse_1.WareHouse);
            const defaultWareHouseDetails = yield wareHouseRepo.findOne({
                where: {
                    uuid: reqBody.wareHouseUuid,
                    accountId: currentUser.accountId,
                    isSoftDeleted: false
                }
            });
            if (!defaultWareHouseDetails) {
                throw new error_response_types_1.UnprocessableEntityError('Please create a default wareHouse');
            }
            //--
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const procurementInvoice = yield procurementInvoiceRepo.findOne({
                uuid,
            });
            if (!procurementInvoice) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot create orders from an Procurement invoice that does not exist');
            }
            if (procurementInvoice.orderCreated) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot create order from a procurement invoice that has already been used');
            }
            //--
            const productUuids = reqBody.invoiceItems.map(productItem => productItem.productUuid);
            if (!productUuids.length) {
                throw new error_response_types_1.UnprocessableEntityError('Please select some products from the invoice');
            }
            const productRepo = connection.getRepository(Product_1.Product);
            const products = yield productRepo.find({
                uuid: (0, typeorm_1.In)(productUuids)
            });
            if (!products.length) {
                throw new error_response_types_1.UnprocessableEntityError('The selected products were NOT found');
            }
            if (products.length !== productUuids.length) {
                throw new error_response_types_1.UnprocessableEntityError('Some products were not found. Please select valid products and try again.');
            }
            yield this.ensureOrderCreateForInvoiceIsOkay(procurementInvoice, reqBody.invoiceItems);
            const ordersCreated = yield InvoiceService.processOrderCreationFromInvoice(currentUser, defaultWareHouseDetails, procurementInvoice, reqBody.invoiceItems, products, orderPaymentVariant);
            const orderPayResponse = yield OrderService.processOrdersPayment(ordersCreated, orderPaymentVariant, currentUser);
            yield InvoiceService.completeOrderCreationFromInvoice(ordersCreated, defaultWareHouseDetails, procurementInvoice, currentUser, products);
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            return resData;
        });
    }
    handleGetPaidOrderByUuid(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const orderRepo = connection.getRepository(Order_1.Order);
            const join = {
                alias: "order",
                leftJoinAndSelect: {
                    buyerUser: "order.buyerUser",
                    sellerUser: "order.sellerUser",
                },
            };
            const orderLists = yield orderRepo.find({
                where: { uuid: (0, typeorm_1.In)(reqBody.orderUuids), buyerUserId: currentUser.id },
                join
            });
            const buyerUserIds = orderLists.map(order => order.buyerUserId);
            const sellerUserIds = orderLists.map(order => order.sellerUserId);
            const allUserIds = _.uniq(_.flatten([...buyerUserIds, ...sellerUserIds]));
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(allUserIds);
            // await ProfileService.getPublicProfileFromUserIds(allUserIds)
            const CurrencyEnum = Currency_1.CurrencyToSymbol;
            // @ts-ignore
            const transformedOrderListsDataset = orderLists.map(order => {
                const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === order.buyerUser.uuid);
                const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === order.sellerUser.uuid);
                const currencySymbol = CurrencyEnum[order.currency] || "₦";
                return {
                    orderUuid: order.uuid,
                    orderItems: order.orderItems,
                    referenceNumber: order.referenceNumber,
                    sellerPublicProfile,
                    buyerPublicProfile,
                    orderReceiveType: order.orderReceiveType,
                    status: order.status,
                    paymentStatus: order.paymentStatus,
                    paymentVariant: order.paymentVariant,
                    statusHistory: order.statusHistory,
                    paymentStatusHistory: order.paymentStatusHistory,
                    calculatedTotalCostMajor: order.calculatedTotalCostMajor,
                    deliveryCostMajor: order.deliveryCostMajor,
                    currency: order.currency,
                    currencySymbol,
                    createdAt: order.createdAt,
                };
            });
            const resData = {
                status: true,
                data: transformedOrderListsDataset
            };
            return resData;
        });
    }
    handleDeclineInvoice(req, procurementInvoiceUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
            const exisitngProcurementInvoice = yield procurementInvoiceRepo.findOne({
                uuid: procurementInvoiceUuid,
                accountId: currentUser.accountId
            });
            if (!exisitngProcurementInvoice) {
                throw new error_response_types_1.UnprocessableEntityError('Procurement Invoice Does Not Exist');
            }
            if (exisitngProcurementInvoice.orderCreated) {
                throw new error_response_types_1.UnprocessableEntityError('Cannot Decline Procurement Invoice That Has Already Been Proccessed');
            }
            yield InvoiceService.declineInvoice(exisitngProcurementInvoice);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/create/procurmentinvoice/:procurementInvoiceUuid/:orderPaymentVariant'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("procurementInvoiceUuid")),
    __param(2, (0, tsoa_1.Path)("orderPaymentVariant")),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProcurementInvoiceOrderController.prototype, "handleCreateOrderFromInvoice", null);
__decorate([
    (0, tsoa_1.Post)('/OrdersByUuids/'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProcurementInvoiceOrderController.prototype, "handleGetPaidOrderByUuid", null);
__decorate([
    (0, tsoa_1.Get)('/:procurementInvoiceUuid/decline'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("procurementInvoiceUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProcurementInvoiceOrderController.prototype, "handleDeclineInvoice", null);
ProcurementInvoiceOrderController = __decorate([
    (0, tsoa_1.Route)("api/procurementinvoiceorders"),
    (0, tsoa_1.Tags)("Procurement Invoice Orders"),
    (0, tsoa_1.Security)("jwt")
], ProcurementInvoiceOrderController);
exports.ProcurementInvoiceOrderController = ProcurementInvoiceOrderController;
//# sourceMappingURL=ProcurementInvoiceOrderController.js.map