/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
import { In } from "typeorm";
import { getFreshConnection } from "../db";
import { Order } from "../entity/Order";
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { InvoiceStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { InvoiceItemJson } from "../interfaces/InvoiceItemJson";
import { IProcurementInvoicetem } from "../interfaces/IProcurementInvoicetem";
import * as Utils from '../utils/core';
import { UnprocessableEntityError } from "../utils/error-response-types";
import * as CooperateService from "./cooperateService";
import * as OrderService from "./orderService";


export const processOrderCreationFromInvoice = async (
  currentUser: User,
  wareHouse: WareHouse,
  procurementInvoice: ProcurementInvoice,
  invoiceItems: IProcurementInvoicetem[],
  invoiceItemProducts: Product[],
  orderPaymentVariant: OrderPaymentVariant,
): Promise<Order[]> => {
  const procurementInvoiceItems = procurementInvoice.invoiceItem;

  const cartItemJson: CartItemJson[] = []
  for(const item of invoiceItems){
    const product = invoiceItemProducts.find(el => el.uuid === item.productUuid)
    const procurementInvoiceItem = procurementInvoiceItems.find(el => el.productUuid === item.productUuid)

    if(!product) {
      throw new UnprocessableEntityError('Product Does Not Exist')
    }
    const orderCartItem = {
      productId: product!.id,
      productUuid: item.productUuid!,
      productName: product.name,
      quantity: item.quantity,
      unitPrice: procurementInvoiceItem!.unitPriceForBuyer,
      unitPriceForBuyer: procurementInvoiceItem!.unitPriceForBuyer,
    }
    cartItemJson.push(orderCartItem)
  }

  const createdOrders = await OrderService.createOrders(currentUser, cartItemJson, OrderReceiveTypes.WARE_HOUSE, orderPaymentVariant)
  if(!createdOrders){
    throw new UnprocessableEntityError('Unable to create orders at this time')
  }


  return createdOrders

}

export const completeOrderCreationFromInvoice = async (
  createdOrders: Order[], wareHouseDetails: WareHouse, 
  procurementInvoice: ProcurementInvoice,
  currentUser: User,
  products: Product[]
):  Promise<Order[]> =>{
  const orderIds: number[] = createdOrders.map(order => order.id)
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order)

  await connection.transaction(async (transactionalEntityManager) => {
    const orderRepo = transactionalEntityManager.getRepository(Order)  
    const procurementInvoiceRepo = transactionalEntityManager.getRepository(ProcurementInvoice)
    const orderIds = createdOrders.map(order => order.id)
    const initialValue = 0
    const totalInvoiceAmountPaid = createdOrders.reduce((sumValue, currentValue) => 
    sumValue + currentValue.calculatedTotalCostMajor, initialValue)
    const updatedQuery = {
      warehouseId: wareHouseDetails.id,
      procurementInvoiceUuid: procurementInvoice.uuid,
    }
    await orderRepo.createQueryBuilder()
      .update(Order)
      .set(updatedQuery)
      .where({
        id: In(orderIds),
      })
      .execute()
  
    const updatedStatusHistory = procurementInvoice.statusHistory;
    updatedStatusHistory.push({
      status: InvoiceStatuses.ACCEPTED,
      dateTimeInISO8601: Utils.utcNow().toISOString(),
    });

   const updatedInvoiceItems = procurementInvoice.invoiceItem

  let newInvoiceItems: InvoiceItemJson[] = [];

    for(const product of products){
      const itemToUpdate: InvoiceItemJson = updatedInvoiceItems.find(item => item.productId === product.id)!
      newInvoiceItems = updatedInvoiceItems.filter(item => item.productId !== product.id)
      itemToUpdate!.isPaid = true
      newInvoiceItems.push(itemToUpdate)
    }


    const updatedInvoiceQuery = {
      statusHistory: updatedStatusHistory,
      status: InvoiceStatuses.ACCEPTED,
      calculatedTotalAmountPaidMajor: totalInvoiceAmountPaid,
      invoiceItem: newInvoiceItems,
      orderCreated: true,
      orderCreatedAt: Utils.utcNow().toISOString(),
    }
    await procurementInvoiceRepo.createQueryBuilder()
      .update(ProcurementInvoice)
      .set(updatedInvoiceQuery)
      .where({
        id: procurementInvoice.id
      })
      .execute()

    return true
  })
   
  const updatedOrders = await orderRepo.find({
    id: In(orderIds)
  })

  await CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouseDetails);
  
  return updatedOrders
}

export const declineInvoice = async (
  procurementInvoice: ProcurementInvoice
):  Promise<boolean> =>{
  const connection = await getFreshConnection();
  const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
  const updatedStatusHistory = procurementInvoice!.statusHistory;
  updatedStatusHistory.push({
    status: InvoiceStatuses.REQUEST_REVIEW,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  });
  const updatedQuery = {
    statusHistory: updatedStatusHistory,
    status: InvoiceStatuses.REQUEST_REVIEW,
  }
  await procurementInvoiceRepo.createQueryBuilder()
    .update(ProcurementInvoice)
    .set(updatedQuery)
    .where({
      uuid: procurementInvoice.uuid
    })
    .execute()
  
  return true
}