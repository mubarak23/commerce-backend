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
exports.updateProductLeaseState = exports.getOrdersAmountMajorTotalOnProductLease = exports.fetchActiveProductLease = void 0;
const db_1 = require("../db");
const Order_1 = require("../entity/Order");
const ProductLease_1 = require("../entity/ProductLease");
const Utils = __importStar(require("../utils/core"));
const fetchActiveProductLease = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
    return productLeaseRepo.findOne({
        where: {
            userId,
            isActive: true,
            isPaid: false,
            isSoftDeleted: false,
        },
        order: { createdAt: 'ASC' },
    });
});
exports.fetchActiveProductLease = fetchActiveProductLease;
const getOrdersAmountMajorTotalOnProductLease = (productLeaseId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const orderRepo = connection.getRepository(Order_1.Order);
    const ordersOnPlp = yield orderRepo.find({
        productLeaseId
    });
    if (!ordersOnPlp.length) {
        return 0;
    }
    let ordersAmountMinorSum = 0;
    for (const order of ordersOnPlp) {
        ordersAmountMinorSum += order.calculatedTotalCostMajor;
    }
    return ordersAmountMinorSum;
});
exports.getOrdersAmountMajorTotalOnProductLease = getOrdersAmountMajorTotalOnProductLease;
const updateProductLeaseState = (userId, productLease, amountMinor, walletBalanceMinorBefore) => __awaiter(void 0, void 0, void 0, function* () {
    if (!productLease) {
        productLease = yield (0, exports.fetchActiveProductLease)(userId);
        if (!productLease) {
            return;
        }
    }
    if (walletBalanceMinorBefore < 0 && walletBalanceMinorBefore + amountMinor >= 0) {
        const connection = yield (0, db_1.getFreshConnection)();
        const productLeaseRepo = connection.getRepository(ProductLease_1.ProductLease);
        yield productLeaseRepo.createQueryBuilder()
            .update(ProductLease_1.ProductLease)
            .set({
            isActive: false,
            isPaid: true,
            paidAt: Utils.utcNow(),
        })
            .where({
            id: productLease.id,
        })
            .execute();
        // TODO
        // Send notification that product lease has ended
    }
});
exports.updateProductLeaseState = updateProductLeaseState;
//# sourceMappingURL=productLeaseService.js.map