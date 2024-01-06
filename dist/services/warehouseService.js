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
exports.canHaveMultipleWareHousePerState = exports.hasDeliveryBeenProcessed = exports.processDeclineDeliveryFees = exports.processAcceptDeliveryFees = exports.canDeliveryRequestBeProcessed = exports.canDeliveryItemBeProceesed = exports.createDeliveryToSiteRequest = exports.isWareHouseAuthorize = exports.createSiteDeliveryLocation = exports.createWareHouse = exports.validateCreateWareHouseData = void 0;
/* eslint-disable no-await-in-loop */
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const WareHouse_1 = require("../entity/WareHouse");
const WareHouseProductPurchase_1 = require("../entity/WareHouseProductPurchase");
const WareHouseToSiteDeliveryRequest_1 = require("../entity/WareHouseToSiteDeliveryRequest");
const OrderPaymentVariant_1 = require("../enums/OrderPaymentVariant");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const Statuses_1 = require("../enums/Statuses");
const emailService = __importStar(require("../services/emailService"));
const PaymentService = __importStar(require("../services/paymentService"));
const WarehouseWalletService = __importStar(require("../services/wareHouseWalletService"));
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const validateCreateWareHouseData = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, state, country, contactFullName, contactPhoneNumber, } = reqBody;
    if (!name) {
        throw new error_response_types_1.UnprocessableEntityError('New WareHouse Require a Name');
    }
    if (!state) {
        throw new error_response_types_1.UnprocessableEntityError('New WareHouse Require a State');
    }
    if (!country) {
        throw new error_response_types_1.UnprocessableEntityError('New WareHouse Require a Country');
    }
    if (!contactFullName) {
        throw new error_response_types_1.UnprocessableEntityError('New WareHouse Require a Contact Name');
    }
    if (!contactPhoneNumber) {
        throw new error_response_types_1.UnprocessableEntityError('New WareHouse Require a Contact Phone Number');
    }
    return true;
});
exports.validateCreateWareHouseData = validateCreateWareHouseData;
const createWareHouse = (currentUser, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const warehouseRepo = connection.getRepository(WareHouse_1.WareHouse);
    let newWareHouse = new WareHouse_1.WareHouse().initialize(currentUser.accountId, currentUser.id, reqBody.name, reqBody.state, reqBody.country, reqBody.contactFullName, reqBody.contactPhoneNumber);
    newWareHouse.isDefault = !!reqBody.isDefault;
    const newWareHouseSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse_1.WareHouse);
        newWareHouse = yield wareHouseRepoT.save(newWareHouse);
        if (reqBody.isDefault) {
            yield wareHouseRepoT.createQueryBuilder()
                .update(WareHouse_1.WareHouse)
                .set({ isDefault: !reqBody.isDefault })
                .where({
                id: (0, typeorm_1.Not)(newWareHouse.id),
                accountId: currentUser.accountId
            })
                .execute();
        }
        return true;
    }));
    const warehouse = yield warehouseRepo.find({
        accountId: currentUser.accountId,
    });
    if (warehouse.length === 1) {
        yield warehouseRepo.createQueryBuilder()
            .update(WareHouse_1.WareHouse)
            .set({ isDefault: true })
            .where({
            accountId: currentUser.accountId
        })
            .execute();
        return true;
    }
    return newWareHouseSuccess;
});
exports.createWareHouse = createWareHouse;
const createSiteDeliveryLocation = (currentUser, reqBody, wareHouse) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    let deliveryLocationSite = new DeliveryLocation_1.DeliveryLocation().initializeWareHouseSite(currentUser.id, reqBody.address, wareHouse.country, reqBody.name, wareHouse.state, reqBody.contactFullName, reqBody.contactPhoneNumber, wareHouse.id);
    deliveryLocationSite = yield DeliveryLocationRepo.save(deliveryLocationSite);
    return true;
});
exports.createSiteDeliveryLocation = createSiteDeliveryLocation;
const isWareHouseAuthorize = (currentUser, warehouse) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUser.wareHouseId) {
        if (currentUser.accountId === warehouse.accountId) {
            return true;
        }
    }
    if (currentUser.wareHouseId !== warehouse.id) {
        throw new error_response_types_1.UnprocessableEntityError('You cannot view a warehouse that was not assign to you.');
    }
    return true;
});
exports.isWareHouseAuthorize = isWareHouseAuthorize;
const createDeliveryToSiteRequest = (currentUser, deliveryItemsDto, warehouse, deliveryLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const productRepo = connection.getRepository(Product_1.Product);
    const wareHouseToSiteProductDeliveryrepo = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
    let totalAmountMajor = 0;
    const productUuid = deliveryItemsDto.map(product => product.productUuid);
    if (!productUuid.length) {
        throw new error_response_types_1.UnprocessableEntityError('Please select some product that will delivered to site.');
    }
    const products = yield productRepo.find({
        where: { uuid: (0, typeorm_1.In)(productUuid) }
    });
    if (!products.length) {
        throw new error_response_types_1.UnprocessableEntityError('The selected product was not found');
    }
    const productIds = products.map(product => product.id);
    const wareHouseProductPurchase = yield wareHouseProductPurchaseRepo.find({
        where: { productId: (0, typeorm_1.In)(productIds), wareHouseId: warehouse.id }
    });
    if (!wareHouseProductPurchase.length) {
        throw new error_response_types_1.UnprocessableEntityError('The selected product was not purchase into the wareHouse');
    }
    products.forEach((product) => {
        const unitPriceForBuyer = Utils.getPriceForBuyer(Math.round(product.price), product);
        totalAmountMajor += unitPriceForBuyer;
    });
    let savedWareHouseToSiteProductDelivery = new WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest().initialize(warehouse.id, currentUser.id, deliveryLocation.id, deliveryItemsDto, totalAmountMajor);
    savedWareHouseToSiteProductDelivery = yield wareHouseToSiteProductDeliveryrepo.save(savedWareHouseToSiteProductDelivery);
    if (!savedWareHouseToSiteProductDelivery) {
        throw new error_response_types_1.UnprocessableEntityError('Unable to complete delivery to site request');
    }
    // dispatch mail 
    yield emailService.sendDeliveryRequestToSiteAdmin(currentUser);
    return true;
});
exports.createDeliveryToSiteRequest = createDeliveryToSiteRequest;
const canDeliveryItemBeProceesed = (currentUser, deliveryItems, wareHouseId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
    const productRepo = connection.getRepository(Product_1.Product);
    const exitingWareHouseProductPurchase = yield wareHouseProductPurchaseRepo.find({
        where: {
            wareHouseId,
        }
    });
    const productUuids = deliveryItems.map(item => item.productUuid);
    const products = yield productRepo.find({
        where: { uuid: (0, typeorm_1.In)(productUuids) }
    });
    // push productId inside deliceryItem Array
    const deliveryItemsWithProductId = [];
    for (const deliveryItem of deliveryItems) {
        const product = products.find(item => item.uuid === deliveryItem.productUuid);
        deliveryItem.productId = product.id;
        deliveryItemsWithProductId.push(deliveryItem);
    }
    for (const item of deliveryItemsWithProductId) {
        const purchaseProduct = exitingWareHouseProductPurchase.find((product) => product.productId === item.productId);
        if (item.quantity > purchaseProduct.availableQuantity) {
            throw new error_response_types_1.UnprocessableEntityError('Cannot delivered a product whose quantity is less than was requested for');
        }
    }
    return true;
});
exports.canDeliveryItemBeProceesed = canDeliveryItemBeProceesed;
const canDeliveryRequestBeProcessed = (deliveryRequestToSite) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
    const productRepo = connection.getRepository(Product_1.Product);
    const exitingWareHouseProductPurchase = yield wareHouseProductPurchaseRepo.find({
        where: {
            wareHouseId: deliveryRequestToSite.wareHouseId,
        }
    });
    const productUuids = deliveryRequestToSite.deliveryItems.map(item => item.productUuid);
    const products = yield productRepo.find({
        where: { uuid: (0, typeorm_1.In)(productUuids) }
    });
    // push productId inside deliceryItem Array
    const deliveryItemsWithProductId = [];
    for (const deliveryItem of deliveryRequestToSite.deliveryItems) {
        const product = products.find(item => item.uuid === deliveryItem.productUuid);
        deliveryItem.productId = product.id;
        deliveryItemsWithProductId.push(deliveryItem);
    }
    for (const item of deliveryItemsWithProductId) {
        const purchaseProduct = exitingWareHouseProductPurchase.find((product) => product.productId === item.productId);
        if (item.quantity > purchaseProduct.availableQuantity) {
            throw new error_response_types_1.UnprocessableEntityError('Cannot delivered a product whose quantity is less than was requested for');
        }
    }
    return true;
});
exports.canDeliveryRequestBeProcessed = canDeliveryRequestBeProcessed;
const processAcceptDeliveryFees = (currentUser, existingWareHouseToSiteDelivery, existingWarehouse, paymentVarient) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.canDeliveryRequestBeProcessed)(existingWareHouseToSiteDelivery);
    const connection = yield (0, db_1.getFreshConnection)();
    let paymentStatus;
    if (paymentVarient === OrderPaymentVariant_1.OrderPaymentVariant.WALLET) {
        yield WarehouseWalletService.saveDeliveryWalletFeeTransaction(currentUser.accountId, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor);
        paymentStatus = {
            status: true,
            paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
        };
    }
    if (paymentVarient === OrderPaymentVariant_1.OrderPaymentVariant.PAY_ON_DELIVERY) {
        if (existingWareHouseToSiteDelivery.deliveryFeeAmountMajor >= existingWarehouse.totalValueMajor) {
            throw new error_response_types_1.UnprocessableEntityError('Unable to process POD for warehouse to site delivery');
        }
        yield WarehouseWalletService.saveDeliveryWalletFeeTransaction(currentUser.accountId, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor);
        paymentStatus = {
            status: true,
            paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
        };
    }
    if (paymentVarient === OrderPaymentVariant_1.OrderPaymentVariant.CARD) {
        const paymentDetails = yield PaymentService.processDeliveryToSiteRequestCardPayment(currentUser, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor, existingWareHouseToSiteDelivery);
        paymentStatus = {
            status: true,
            paymentTransactionStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID,
            paymentDetails
        };
    }
    const acceptDeliveryChargesSuccess = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse_1.WareHouse);
        const wareHouseProductPurchaseRepoT = transactionalEntityManager.getRepository(WareHouseProductPurchase_1.WareHouseProductPurchase);
        const wareHouseProductPurchaseRepoManagerT = wareHouseProductPurchaseRepoT.manager;
        const wareHouseToSiteDeliveryRepoT = transactionalEntityManager.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
        const productRepoT = transactionalEntityManager.getRepository(Product_1.Product);
        let totalQuantity = 0;
        const productUuids = existingWareHouseToSiteDelivery.deliveryItems.map(delItem => delItem.productUuid);
        const productIds = yield productRepoT.find({
            where: { uuid: (0, typeorm_1.In)(productUuids) },
            select: ['id', 'uuid'],
        });
        const wareHouseProductPurchases = yield wareHouseProductPurchaseRepoT.find({
            productId: (0, typeorm_1.In)(productIds.map(withIds => withIds.id)),
            wareHouseId: existingWarehouse.id
        });
        const wareHouseProductPurchaseBulkUpdateQueryParams = wareHouseProductPurchases.map(wareHouseProductPurchase => {
            const product = productIds.find(prod => prod.id === wareHouseProductPurchase.productId);
            const deliveryProductItem = existingWareHouseToSiteDelivery.deliveryItems.find(delItem => delItem.productUuid === product.uuid);
            const newOutFlowQuantity = wareHouseProductPurchase.outFlowQuantity + deliveryProductItem.quantity;
            const newAvailableQuantity = wareHouseProductPurchase.availableQuantity - deliveryProductItem.quantity;
            return `(${wareHouseProductPurchase.id}, ${newOutFlowQuantity}, ${newAvailableQuantity})`;
        });
        const wareHouseProductPurchaseBulkUpdateQuery = `UPDATE warehouse_product_purchases set 
          outflow_quantity = warehouse_product_purchase_update.outflow_quantity, 
          available_quantity = warehouse_product_purchase_update.available_quantity
        from(values${wareHouseProductPurchaseBulkUpdateQueryParams.join(",")}) as warehouse_product_purchase_update (id, outflow_quantity, available_quantity)
        where warehouse_product_purchases.id = warehouse_product_purchase_update.id;`;
        yield wareHouseProductPurchaseRepoManagerT.query(wareHouseProductPurchaseBulkUpdateQuery);
        for (const deliveryItem of existingWareHouseToSiteDelivery.deliveryItems) {
            totalQuantity = deliveryItem.quantity;
        }
        const updateWareHouseQuery = {
            totalQuantity,
            totalValueMajor: existingWarehouse.totalValueMajor - existingWareHouseToSiteDelivery.totalAmountMajor
        };
        yield wareHouseRepoT.createQueryBuilder()
            .update(existingWarehouse)
            .set(updateWareHouseQuery)
            .where({ id: existingWarehouse.id })
            .execute();
        const updatedStatusHistory = [...existingWareHouseToSiteDelivery.deliveryFeeStatusHistory];
        updatedStatusHistory.push({
            status: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED,
            dateTimeInISO8601: Utils.utcNow().toISOString(),
        });
        const updateQuery = {
            deliveryFeeStatus: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED,
            deliveryFeeStatusHistory: updatedStatusHistory
        };
        yield wareHouseToSiteDeliveryRepoT
            .createQueryBuilder()
            .update(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest)
            .set(updateQuery)
            .where({
            uuid: existingWareHouseToSiteDelivery.uuid
        })
            .execute();
        return true;
    }));
    if (!acceptDeliveryChargesSuccess) {
        return false;
    }
    return paymentStatus;
});
exports.processAcceptDeliveryFees = processAcceptDeliveryFees;
const processDeclineDeliveryFees = (status, existingWareHouseToSiteDelivery) => __awaiter(void 0, void 0, void 0, function* () {
    if (status !== Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED) {
        throw new error_response_types_1.UnprocessableEntityError('Payment for delivery fee must carry status of DELIVERY_FEE_REJECTED ');
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const wareHouseToSiteDeliveryRepoT = connection.getRepository(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest);
    // update status
    const updatedStatusHistory = [...existingWareHouseToSiteDelivery.deliveryFeeStatusHistory];
    updatedStatusHistory.push({
        status: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED,
        dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
    const updateQuery = {
        deliveryFeeStatus: Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED,
        deliveryFeeStatusHistory: updatedStatusHistory
    };
    yield wareHouseToSiteDeliveryRepoT
        .createQueryBuilder()
        .update(WareHouseToSiteDeliveryRequest_1.WareHouseToSiteDeliveryRequest)
        .set(updateQuery)
        .where({
        uuid: existingWareHouseToSiteDelivery.uuid
    })
        .execute();
    return true;
});
exports.processDeclineDeliveryFees = processDeclineDeliveryFees;
const hasDeliveryBeenProcessed = (existingWareHouseToSiteDelivery) => __awaiter(void 0, void 0, void 0, function* () {
    if (existingWareHouseToSiteDelivery.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED) {
        throw new error_response_types_1.UnprocessableEntityError('WareHouse Delivery to site has been accepted and processed');
    }
    if (existingWareHouseToSiteDelivery.deliveryFeeStatus === Statuses_1.WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED) {
        throw new error_response_types_1.UnprocessableEntityError('WareHouse Delivery to site has was Rejected');
    }
    return true;
});
exports.hasDeliveryBeenProcessed = hasDeliveryBeenProcessed;
const canHaveMultipleWareHousePerState = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const userSetting = yield userRepo.findOne({
        where: { id: userId }
    });
    if ((_a = userSetting === null || userSetting === void 0 ? void 0 : userSetting.settings) === null || _a === void 0 ? void 0 : _a.canCreateMultipleWareHouseInState) {
        if (((_b = userSetting === null || userSetting === void 0 ? void 0 : userSetting.settings) === null || _b === void 0 ? void 0 : _b.canCreateMultipleWareHouseInState) === true) {
            return true;
        }
        return false;
    }
    return false;
});
exports.canHaveMultipleWareHousePerState = canHaveMultipleWareHousePerState;
//# sourceMappingURL=warehouseService.js.map