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
exports.TemporaryOrdersController = void 0;
/* eslint-disable no-await-in-loop */
const tsoa_1 = require("tsoa");
const OrderService = __importStar(require("../services/orderService"));
const TemporaryOrderService = __importStar(require("../services/temporaryOrderService"));
const db_1 = require("../db");
const error_response_types_1 = require("../utils/error-response-types");
const TemporaryOrder_1 = require("../entity/TemporaryOrder");
// DO NOT EXPORT DEFAULT
let TemporaryOrdersController = class TemporaryOrdersController extends tsoa_1.Controller {
    handleFetchTemporaryOrderDetails(orderUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const temporaryOrderRepo = connection.getRepository(TemporaryOrder_1.TemporaryOrder);
            const temporaryOrder = yield temporaryOrderRepo.findOne({ uuid: orderUuid });
            if (!temporaryOrder) {
                throw new error_response_types_1.NotFoundError("Order was not found");
            }
            const fullOrderDetails = yield TemporaryOrderService.temporaryOrderDetails(temporaryOrder);
            const resData = {
                status: true,
                data: fullOrderDetails,
            };
            return resData;
        });
    }
    handleTemporaryOrderPreparationFromTemporaryCart(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { temporaryCartItems } = reqBody;
            const cartItemsJson = yield TemporaryOrderService.temporaryCartToFullCartItemsJson(temporaryCartItems);
            const preparedOrders = yield OrderService.prepareOrders(cartItemsJson);
            const resData = {
                status: true,
                data: preparedOrders,
            };
            return resData;
        });
    }
    handleTemporaryOrderCreationFromPreparedCart(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdOrders = yield TemporaryOrderService.processTemporaryOrderCreationFromPrepared(requestBody);
            const orderPayResponse = yield TemporaryOrderService.processTemporaryOrdersPayment(requestBody, createdOrders);
            const resData = {
                status: true,
                data: orderPayResponse,
            };
            return resData;
        });
    }
    // paidTemporaryOrderDetails
    handlePaidTemporaryOrder(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const realOrders = yield TemporaryOrderService.paidTemporaryOrderDetails(requestBody.temporaryOrderUuids, requestBody.reference);
            const resData = {
                status: true,
                data: realOrders,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/:orderUuid"),
    __param(0, (0, tsoa_1.Path)("orderUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemporaryOrdersController.prototype, "handleFetchTemporaryOrderDetails", null);
__decorate([
    (0, tsoa_1.Post)("/prepare"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TemporaryOrdersController.prototype, "handleTemporaryOrderPreparationFromTemporaryCart", null);
__decorate([
    (0, tsoa_1.Post)("/temporary/create/frompreparedcart"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TemporaryOrdersController.prototype, "handleTemporaryOrderCreationFromPreparedCart", null);
__decorate([
    (0, tsoa_1.Post)("/temporary/paid/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TemporaryOrdersController.prototype, "handlePaidTemporaryOrder", null);
TemporaryOrdersController = __decorate([
    (0, tsoa_1.Route)("api/temporaryorders"),
    (0, tsoa_1.Tags)("Temporary Orders")
], TemporaryOrdersController);
exports.TemporaryOrdersController = TemporaryOrdersController;
//# sourceMappingURL=TemporaryOrdersController.js.map