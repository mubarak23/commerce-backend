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
Object.defineProperty(exports, "__esModule", { value: true });
exports.declineInvoice = exports.completeOrderCreationFromInvoice = exports.processOrderCreationFromInvoice = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Order_1 = require("../entity/Order");
const ProcurementInvoice_1 = require("../entity/ProcurementInvoice");
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const Statuses_1 = require("../enums/Statuses");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const CooperateService = __importStar(require("./cooperateService"));
const OrderService = __importStar(require("./orderService"));
const processOrderCreationFromInvoice = (currentUser, wareHouse, procurementInvoice, invoiceItems, invoiceItemProducts, orderPaymentVariant) => __awaiter(void 0, void 0, void 0, function* () {
    const procurementInvoiceItems = procurementInvoice.invoiceItem;
    const cartItemJson = [];
    for (const item of invoiceItems) {
        const product = invoiceItemProducts.find(el => el.uuid === item.productUuid);
        const procurementInvoiceItem = procurementInvoiceItems.find(el => el.productUuid === item.productUuid);
        if (!product) {
            throw new error_response_types_1.UnprocessableEntityError('Product Does Not Exist');
        }
        const orderCartItem = {
            productId: product.id,
            productUuid: item.productUuid,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: procurementInvoiceItem.unitPriceForBuyer,
            unitPriceForBuyer: procurementInvoiceItem.unitPriceForBuyer,
        };
        cartItemJson.push(orderCartItem);
    }
    const createdOrders = yield OrderService.createOrders(currentUser, cartItemJson, OrderReceiveTypes_1.OrderReceiveTypes.WARE_HOUSE, orderPaymentVariant);
    if (!createdOrders) {
        throw new error_response_types_1.UnprocessableEntityError('Unable to create orders at this time');
    }
    return createdOrders;
});
exports.processOrderCreationFromInvoice = processOrderCreationFromInvoice;
const completeOrderCreationFromInvoice = (createdOrders, wareHouseDetails, procurementInvoice, currentUser, products) => __awaiter(void 0, void 0, void 0, function* () {
    const orderIds = createdOrders.map(order => order.id);
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const orderRepo = transactionalEntityManager.getRepository(Order_1.Order);
        const procurementInvoiceRepo = transactionalEntityManager.getRepository(ProcurementInvoice_1.ProcurementInvoice);
        const orderIds = createdOrders.map(order => order.id);
        const initialValue = 0;
        const totalInvoiceAmountPaid = createdOrders.reduce((sumValue, currentValue) => sumValue + currentValue.calculatedTotalCostMajor, initialValue);
        const updatedQuery = {
            warehouseId: wareHouseDetails.id,
            procurementInvoiceUuid: procurementInvoice.uuid,
        };
        yield orderRepo.createQueryBuilder()
            .update(Order_1.Order)
            .set(updatedQuery)
            .where({
            id: (0, typeorm_1.In)(orderIds),
        })
            .execute();
        const updatedStatusHistory = procurementInvoice.statusHistory;
        updatedStatusHistory.push({
            status: Statuses_1.InvoiceStatuses.ACCEPTED,
            dateTimeInISO8601: Utils.utcNow().toISOString(),
        });
        const updatedInvoiceItems = procurementInvoice.invoiceItem;
        let newInvoiceItems = [];
        for (const product of products) {
            const itemToUpdate = updatedInvoiceItems.find(item => item.productId === product.id);
            newInvoiceItems = updatedInvoiceItems.filter(item => item.productId !== product.id);
            itemToUpdate.isPaid = true;
            newInvoiceItems.push(itemToUpdate);
        }
        const updatedInvoiceQuery = {
            statusHistory: updatedStatusHistory,
            status: Statuses_1.InvoiceStatuses.ACCEPTED,
            calculatedTotalAmountPaidMajor: totalInvoiceAmountPaid,
            invoiceItem: newInvoiceItems,
            orderCreated: true,
            orderCreatedAt: Utils.utcNow().toISOString(),
        };
        yield procurementInvoiceRepo.createQueryBuilder()
            .update(ProcurementInvoice_1.ProcurementInvoice)
            .set(updatedInvoiceQuery)
            .where({
            id: procurementInvoice.id
        })
            .execute();
        return true;
    }));
    const updatedOrders = yield orderRepo.find({
        id: (0, typeorm_1.In)(orderIds)
    });
    yield CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouseDetails);
    return updatedOrders;
});
exports.completeOrderCreationFromInvoice = completeOrderCreationFromInvoice;
const declineInvoice = (procurementInvoice) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice_1.ProcurementInvoice);
    const updatedStatusHistory = procurementInvoice.statusHistory;
    updatedStatusHistory.push({
        status: Statuses_1.InvoiceStatuses.REQUEST_REVIEW,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updatedQuery = {
        statusHistory: updatedStatusHistory,
        status: Statuses_1.InvoiceStatuses.REQUEST_REVIEW,
    };
    yield procurementInvoiceRepo.createQueryBuilder()
        .update(ProcurementInvoice_1.ProcurementInvoice)
        .set(updatedQuery)
        .where({
        uuid: procurementInvoice.uuid
    })
        .execute();
    return true;
});
exports.declineInvoice = declineInvoice;
//# sourceMappingURL=procurementInvoiceService.js.map