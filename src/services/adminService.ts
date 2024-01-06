import express from 'express';
import { getRepository, In, UpdateResult } from "typeorm";
import { getFreshConnection } from "../db";
import { AddItemToInvoiceRequestDto } from "../dto/AddItemToInvoiceRequestDto";
import { IVirtualDedicatedAccount } from "../dto/IVirtualDedicatedAccount";
import { Category } from "../entity/Category";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import {
  FinancialTransaction,
  FinancialTransactionMetadata
} from "../entity/FinancialTransaction";
import { Order } from "../entity/Order";
import { PaystackDedicatedNuban } from "../entity/PaystackDedicatedNuban";
import { Procurements } from "../entity/Procurement";
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { Product } from "../entity/Product";
import { QuoteRequest } from "../entity/QuoteRequest";
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { WareHouseToSiteDeliveryRequest } from "../entity/WareHouseToSiteDeliveryRequest";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import {
  NotificationTransportMode,
  NotificationTransports
} from "../enums/NotificationTransport";
import {
  PaymentTransactionStatus,
  PaymentTransactionTypes
} from "../enums/PaymentTransaction";
import OrderStatuses, { QuoteRequestStatuses, WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";
import { IMoveProductToSeller } from "../interfaces/IMoveProductToSeller";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import * as Utils from "../utils/core";
import { NotFoundError, UnauthorizedRequestError, UnprocessableEntityError } from '../utils/error-response-types';
import * as autditLogService from './auditLogService';
import * as NotificationService from "./notificationService";
import * as AccountStatService from './sellerAccountStatService';
import * as WalletService from "./walletService";
export const isValidAdmin = async (currentUser: User): Promise<boolean> => {
  const userRepo = getRepository(User);
  const adminUser = await userRepo.findOne({ phoneNumber: currentUser.phoneNumber, isAdmin: true });
  if (!adminUser) {
    return false;
  }
  if(adminUser.isAdmin === false) {
    throw new UnauthorizedRequestError("Not allowed!");
  }
  if (adminUser.id !== currentUser.id) {
    throw new UnauthorizedRequestError("Not allowed!");
  }
  if(adminUser.adminCanView === false){
    throw new UnauthorizedRequestError("Not allowed!");
  }

  return true;
};

export const adminCanEdit = async (req: express.Request,  currentUser: User): Promise<boolean> => {
  if(currentUser.adminCanEdit === false){
    throw new UnauthorizedRequestError("Not allowed!");
  }
  await autditLogService.saveAuditLogs(req, currentUser)
  return true
}

export const markPodOrderPaymentDefault = async (
  order: Order
): Promise<boolean> => {
  const connection = await getFreshConnection();

  const orderAmountMinor = order.calculatedTotalCostMajor * 100;
  const buyerWallet = await WalletService.getCustomerWallet(order.buyerUserId);
  const walletBalanceMinorBefore = buyerWallet.walletBalanceMinor;
  const walletBalanceMinorAfter =
    buyerWallet.walletBalanceMinor - orderAmountMinor;

  order.statusHistory.push({
    status: OrderStatuses.PAYMENT_DEFAULT,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  });

  const updateQuery: any = {
    status: OrderStatuses.PAYMENT_DEFAULT,
    statusHistory: order.statusHistory,
    markedAsPaymentDefaultAt: Utils.utcNow(),
  };

  const walletBalanceDebitedStatus: boolean = await connection.transaction(
    async (transactionalEntityManager) => {
      const orderRepoT = transactionalEntityManager.getRepository(Order);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const financialRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);

      await orderRepoT
        .createQueryBuilder()
        .update(Order)
        .set(updateQuery)
        .where({
          id: order.id,
        })
        .execute();

      await walletRepoT
        .createQueryBuilder()
        .update(Wallet)
        .set({
          walletBalanceMinor: walletBalanceMinorAfter,
        })
        .where({
          id: buyerWallet.id,
        })
        .execute();

      const metadata: FinancialTransactionMetadata = {};

      const debitFinancialTransaction = new FinancialTransaction().initialize(
        buyerWallet,
        PaymentTransactionTypes.ORDER_PAYMENT_DEFAULT_DEBIT,
        orderAmountMinor,
        walletBalanceMinorBefore,
        walletBalanceMinorAfter,
        buyerWallet.currency,
        PaymentTransactionStatus.PAID,
        undefined,
        metadata
      );
      const transactionDescription = [
        `${buyerWallet.currency}${orderAmountMinor / 100} debit for`,
        ` order: #${order.referenceNumber} payment default.`,
      ].join("");
      debitFinancialTransaction.description = transactionDescription;

      await financialRepoT.save(debitFinancialTransaction);

      return true;
    }
  );

  if (walletBalanceDebitedStatus) {
    const notificationMetadata = {
      orderUuid: order.uuid,
    };
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.SMS]: true,
      [NotificationTransportMode.IN_APP]: true,
    };
    const notificationTitle = "Order payment default";
    const notificationBody = `Your Order: #${order.referenceNumber} has been marked as payment in default. Thanks, CinderBuild`;

    const res = await NotificationService.sendSingleNotificationToUserId(
      order.buyerUserId,
      order.buyerUser?.uuid,
      NotificationMessageTypes.POD_ORDER_PAYMENT_DEFAULT,
      notificationTitle,
      notificationBody,
      notificationTransports,
      notificationMetadata
    );
  }

  return walletBalanceDebitedStatus;
};


export const changeCinderbuildMargin = async (
  categoryuuid: string, newMarginAmountMajor: number, currency: string
): Promise<boolean> => {
  const connection = await getFreshConnection();
  const categoryRepo = connection.getRepository(Category)

  const category = await categoryRepo.findOne({ uuid: categoryuuid})
  if(!category){
    throw new NotFoundError('Category Does Not Exist')
  }
  
  const updateQuery = {
    currency,
    amountMajor: newMarginAmountMajor
  }

 if(category.settings.cinderbuildProfiltMargin){

  Object.assign(category.settings.cinderbuildProfiltMargin, updateQuery)
  await categoryRepo
  .createQueryBuilder()
  .update(Category)
  .set({settings: category.settings})
  .where({
    uuid: category.uuid
  })
  .execute();

}

await categoryRepo
  .createQueryBuilder()
  .update(Category)
  .set({settings: {cinderbuildProfiltMargin: updateQuery} })
  .where({
    uuid: category.uuid
  })
  .execute();


  return true
}

export const submitDeliveryFeeForWareHouseToSiteDelivery = async (
  wareHouseToSiteRequest: WareHouseToSiteDeliveryRequest, deliveryFeeAmountMajor: number,
): Promise<boolean> => {
  const connection = await getFreshConnection();
  const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest) 
  const userRepo = connection.getRepository(User)
  const deliveryLocationRepo = connection.getRepository(DeliveryLocation)

  if(wareHouseToSiteRequest.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET){
    const deliveryFeeUpdateResult: UpdateResult = await wareHouseToSiteDeliveryRequestRepo
    .createQueryBuilder()
    .update(WareHouseToSiteDeliveryRequest)
    .set({
      deliveryFeeAmountMajor
    })
    .where({
      uuid: wareHouseToSiteRequest.uuid
    })
    .execute();

  if(!deliveryFeeUpdateResult.affected) {
    throw new UnprocessableEntityError('An unrecoverable error occurred. Please try again.')
  }
  return true

}
  wareHouseToSiteRequest.deliveryFeeStatusHistory.push({
    status: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  });

  const updateQuery: any = {
    deliveryFeeAmountMajor,
    deliveryFeeStatusHistory: wareHouseToSiteRequest.deliveryFeeStatusHistory,
    deliveryFeeStatus: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET
  };

  const deliveryFeeUpdateResult: UpdateResult = await wareHouseToSiteDeliveryRequestRepo
    .createQueryBuilder()
    .update(WareHouseToSiteDeliveryRequest)
    .set(updateQuery)
    .where({
      uuid: wareHouseToSiteRequest.uuid
    })
    .execute();

  if(!deliveryFeeUpdateResult.affected) {
    throw new UnprocessableEntityError('An unrecoverable error occurred. Please try again.')
  }
  
  const warehouseToSiteDeliveryRequestCreatedBy = await userRepo.findOne({ id: wareHouseToSiteRequest.userId});
  if(!warehouseToSiteDeliveryRequestCreatedBy) {
    return false
  }
  

  const deliveryLocation = await deliveryLocationRepo.findOne({
    where: {
      id: wareHouseToSiteRequest.deliveryLocationId
    }
  })
  const notificationMetadata: NotificationMetadata = {
    wareHouseToSiteRequestUuid: wareHouseToSiteRequest.uuid,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  }
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true
  }
  const notificationTitle = 'Warehouse to Site Delivery Fee Has Been Set'
  const notificationBody = [
    `"Hello ${warehouseToSiteDeliveryRequestCreatedBy.firstName},
    Your order to be shipped to ${deliveryLocation!.name} will be delivered at ${deliveryFeeAmountMajor}.
    Please click to confirm or decline your shipment `,
    'CinderBuild Team.'
  ].join(' ')

  await NotificationService.sendSingleNotificationToUserId(
    warehouseToSiteDeliveryRequestCreatedBy.id, 
    warehouseToSiteDeliveryRequestCreatedBy.uuid,
    NotificationMessageTypes.WAREHOUSE_TO_SITE_DELIVERY_FEE_SET,
    notificationTitle, notificationBody, 
    notificationTransports,  notificationMetadata)
  return true
}

export const prepareInvoiceItem = async (procurement: Procurements, addItems: AddItemToInvoiceRequestDto): Promise<boolean> => {
  const { invoiceItem } = addItems

  const connection = await getFreshConnection();
  const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice) 
  const procurementInvoice = await procurementInvoiceRepo.findOne({
    procurementId: procurement.id,
  })

  if(!procurementInvoice) {
    const calculatedTotalCostMajor = invoiceItem.quantity * invoiceItem.unitPriceForBuyer
    const invoiceItems = [invoiceItem]
  
    const newUserInvoice = new ProcurementInvoice().initialize(
      procurement.accountId, procurement.id, 
      invoiceItems, calculatedTotalCostMajor
    );
    const saveInvoice = await procurementInvoiceRepo.save(newUserInvoice);
    const referenceNumber = Utils.getInvoiceEntityReferenceNumber(saveInvoice)
  
    await procurementInvoiceRepo
      .createQueryBuilder()
      .update(ProcurementInvoice)
      .set({referenceNumber})
      .where({
        id: saveInvoice.id
      })
      .execute();
    
    return true
  }

  if(procurementInvoice.orderCreated) {
    throw new UnprocessableEntityError('An order has already been created from the procurement invoice')
  }

  const invoiceItemsWithoutTheNewOne = procurementInvoice.invoiceItem
    .filter(item => item.productId !== invoiceItem.productId)
  let totalInvoiceAmountMajor = 0
  if(invoiceItemsWithoutTheNewOne) {
    invoiceItemsWithoutTheNewOne.push(invoiceItem);
    for(const item of invoiceItemsWithoutTheNewOne) {
      totalInvoiceAmountMajor += item.quantity * item.unitPriceForBuyer
    }
    const updateQuery = {
      invoiceItem: invoiceItemsWithoutTheNewOne, 
      calculatedTotalCostMajor: totalInvoiceAmountMajor
    } 
    const updateInvoiceResult: UpdateResult = await procurementInvoiceRepo.createQueryBuilder()
      .update(ProcurementInvoice)
      .set(updateQuery)
      .where({
        id: procurementInvoice.id
      })
      .execute();

    if(!updateInvoiceResult.affected) {
      throw new UnprocessableEntityError('An unrecoverable error occurred. Please try again.')
    }
    return true  
  }
  return true
}


export const markDeliveryRequestAsShipped = async (
  existingDeliveryRequest: WareHouseToSiteDeliveryRequest
):  Promise<boolean> =>{
  const connection = await getFreshConnection();
  const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
  const updatedStatusHistory = existingDeliveryRequest!.deliveryFeeStatusHistory;
  updatedStatusHistory.push({
    status: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  });
  const updatedQuery = {
    deliveryFeeStatusHistory: updatedStatusHistory,
    deliveryFeeStatus: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED,
  }
  await wareHouseToSiteDeliveryRequestRepo.createQueryBuilder()
    .update(WareHouseToSiteDeliveryRequest)
    .set(updatedQuery)
    .where({
      uuid: existingDeliveryRequest.uuid
    })
    .execute()
  
  return true
}


export const moveSellerProductsToAnOmaAccount = async (
  payload: IMoveProductToSeller
):  Promise<boolean> =>{
  const connection = await getFreshConnection();
  const productRepo = connection.getRepository(Product)
  const userRepo = connection.getRepository(User)

  const sellerCategoryProduct = await productRepo.find({
    where: { categoryId: payload.categoryId, userId: payload.sellerId}
  })

  if(!sellerCategoryProduct){
    return false
  }

  const productIds = sellerCategoryProduct.map(product => product.id)

  console.log(productIds)
  
  await productRepo.createQueryBuilder()
    .update(Product)
    .set({ userId: payload.omaSellerId, oldSellerId: payload.sellerId })
    .where({
      id: In(productIds)
    })
    .execute()

  await userRepo.createQueryBuilder()
    .update(User)
    .set({ isSeller: false })
    .where({
      id: payload.sellerId
    })
    .execute()

  return true
}


export const declineQuoteRequestByAdmin = async (
quoteRequest: QuoteRequest,
):  Promise<boolean> =>{
  
  const now = Utils.utcNow()

  const connection = await getFreshConnection()
  const quoteRequestRepo = connection.getRepository(QuoteRequest) 
  
  quoteRequest.statusHistory.push({
    status: QuoteRequestStatuses.DECLINED_BY_ADMIN,
    dateTimeInISO8601: now.toISOString()
  })
  
  await quoteRequestRepo.createQueryBuilder()
    .update(QuoteRequest)
    .set({
      status: QuoteRequestStatuses.DECLINED_BY_ADMIN,
      statusHistory: quoteRequest.statusHistory,
    })
    .where({ id: quoteRequest.id })
    .execute()
  
  const sellerAccountStats = await AccountStatService.getSellerAccountStats(quoteRequest.userId)
  const accountStatRepo = getRepository(SellerAccountStat)
  
  await accountStatRepo.createQueryBuilder()
    .update(SellerAccountStat)
    .set({
      totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount - 1,
    })
    .where({ id: sellerAccountStats.id })
    .execute()
  
  // TODO
  // notify buyer of seller decline
  const notificationMetadata: NotificationMetadata = {
    quoteRequestUuid: quoteRequest.uuid,
  }
  
  const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has declined 
    your Quote request: #${quoteRequest.referenceNumber}.`
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
  }
  
  NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, quoteRequest.user?.uuid,
    NotificationMessageTypes.QUOTE_REQUEST_SELLER_DECLINE,
    'Seller has declined your Quote Request', notificatiionMessage, notificationTransports,  notificationMetadata)
  

  return true
}



export const transformDedicatedAccount = async (virtualAccounts: PaystackDedicatedNuban[]): Promise<IVirtualDedicatedAccount[]> => {
  const virtualDedicatedAccountResponse: IVirtualDedicatedAccount[] = []

  for(const account of virtualAccounts) {
    const oneTransformAccount: IVirtualDedicatedAccount = {
      userId: account.userId,
      bankId: account.bankId,
      bankName: account.bankName,
      bankAccountName: account.bankAccountName,
      bankAccountNumber: account.bankAccountNumber
    }
    virtualDedicatedAccountResponse.push(oneTransformAccount)
  }
  
return virtualDedicatedAccountResponse

}


