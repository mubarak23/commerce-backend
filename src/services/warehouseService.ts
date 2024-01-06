/* eslint-disable no-await-in-loop */
import { In, Not } from "typeorm";
import { getFreshConnection } from "../db";
import NewWareHouseRequestDto from "../dto/NewWareHouseRequestDto";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import { WareHouseProductPurchase } from "../entity/WareHouseProductPurchase";
import { WareHouseToSiteDeliveryRequest } from "../entity/WareHouseToSiteDeliveryRequest";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import { WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";
import { DeliveryItemJson } from "../interfaces/DeliveryItemJson";
import * as emailService from '../services/emailService';
import * as PaymentService from "../services/paymentService";
import * as WarehouseWalletService from "../services/wareHouseWalletService";
import * as Utils from "../utils/core";
import { UnprocessableEntityError } from "../utils/error-response-types";


export const validateCreateWareHouseData = async(reqBody: NewWareHouseRequestDto) : Promise<boolean> => {
  const { name, state, country, contactFullName, contactPhoneNumber,  } = reqBody
  if(!name){
    throw new UnprocessableEntityError('New WareHouse Require a Name')
  }
  if(!state){
    throw new UnprocessableEntityError('New WareHouse Require a State')
  }
  if(!country){
    throw new UnprocessableEntityError('New WareHouse Require a Country')
  }
  if(!contactFullName){
    throw new UnprocessableEntityError('New WareHouse Require a Contact Name')
  }
  if(!contactPhoneNumber){
    throw new UnprocessableEntityError('New WareHouse Require a Contact Phone Number')
  }
  return true
}

export const createWareHouse = async(currentUser: User, reqBody: NewWareHouseRequestDto) : Promise<boolean> => {
  const connection = await getFreshConnection()
  const warehouseRepo = connection.getRepository(WareHouse)

  let newWareHouse = new WareHouse().initialize(currentUser.accountId, currentUser.id, reqBody.name, reqBody.state, 
    reqBody.country, reqBody.contactFullName, reqBody.contactPhoneNumber)
  newWareHouse.isDefault = !!reqBody.isDefault

  const newWareHouseSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse)

    newWareHouse = await wareHouseRepoT.save(newWareHouse)

    if(reqBody.isDefault) {
      await wareHouseRepoT.createQueryBuilder()
      .update(WareHouse)
      .set({ isDefault: !reqBody.isDefault })
      .where({
        id: Not(newWareHouse.id),
        accountId: currentUser.accountId
      })
      .execute()
    }
     
    return true
  })

  const warehouse = await warehouseRepo.find({
    accountId: currentUser.accountId,
  })

  if(warehouse.length === 1){
    await warehouseRepo.createQueryBuilder()
      .update(WareHouse)
      .set({ isDefault: true })
      .where({
        accountId: currentUser.accountId
      })
      .execute()
    return true  
  }
        
  return newWareHouseSuccess
}

export const createSiteDeliveryLocation = async (currentUser: User, reqBody: any, wareHouse: WareHouse): Promise<boolean> => {
  const connection = await getFreshConnection();
  const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);

  let deliveryLocationSite = new DeliveryLocation().initializeWareHouseSite(currentUser.id,  reqBody.address, wareHouse.country,
    reqBody.name, wareHouse.state, 
 reqBody.contactFullName, reqBody.contactPhoneNumber, wareHouse.id);
  
  deliveryLocationSite = await DeliveryLocationRepo.save(deliveryLocationSite);
 
  return true
}

export const isWareHouseAuthorize =async (currentUser: User, warehouse: WareHouse): Promise<boolean> => {
  if(!currentUser.wareHouseId){
    if(currentUser.accountId === warehouse.accountId){
      return true
    }
  }
  if(currentUser.wareHouseId !== warehouse.id){
    throw new UnprocessableEntityError('You cannot view a warehouse that was not assign to you.')
  }
  return true
}

export const createDeliveryToSiteRequest = async (currentUser: User, 
  deliveryItemsDto: DeliveryItemJson[], 
  warehouse: WareHouse,
  deliveryLocation: DeliveryLocation
): Promise<boolean> => {
  const connection = await getFreshConnection();
  const productRepo = connection.getRepository(Product);

  const wareHouseToSiteProductDeliveryrepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
  const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase)


  let totalAmountMajor = 0;
  const productUuid: string[] = deliveryItemsDto.map(product => product.productUuid )
  if(!productUuid.length) {
    throw new UnprocessableEntityError('Please select some product that will delivered to site.')
  }

  const products = await productRepo.find({
    where: { uuid: In(productUuid) }
  })
  if(!products.length) {
    throw new UnprocessableEntityError('The selected product was not found')
  }
  
  const productIds = products.map( product =>  product.id)
  const wareHouseProductPurchase = await wareHouseProductPurchaseRepo.find({
    where: { productId: In(productIds), wareHouseId: warehouse.id}
  })

if(!wareHouseProductPurchase.length) {
    throw new UnprocessableEntityError('The selected product was not purchase into the wareHouse')
  }
  products.forEach((product) => {
    
    const unitPriceForBuyer = Utils.getPriceForBuyer(Math.round(product.price!), product)
    totalAmountMajor += unitPriceForBuyer
  }) 
  let savedWareHouseToSiteProductDelivery = new WareHouseToSiteDeliveryRequest().initialize(
    warehouse.id, currentUser.id,deliveryLocation.id, 
    deliveryItemsDto, totalAmountMajor
  )
  savedWareHouseToSiteProductDelivery = await wareHouseToSiteProductDeliveryrepo.save(savedWareHouseToSiteProductDelivery)

  if(!savedWareHouseToSiteProductDelivery) {
    throw new UnprocessableEntityError('Unable to complete delivery to site request')
  }
  // dispatch mail 
  await emailService.sendDeliveryRequestToSiteAdmin(currentUser)
  
  return true
}

export const canDeliveryItemBeProceesed = async (currentUser: User, 
  deliveryItems: DeliveryItemJson[], wareHouseId: number): Promise<any> => {
    const connection = await getFreshConnection()
    const wareHouseProductPurchaseRepo =  connection.getRepository(WareHouseProductPurchase)
    const productRepo = connection.getRepository(Product)
    const exitingWareHouseProductPurchase = await wareHouseProductPurchaseRepo.find({
      where: {
        wareHouseId,
      }
    })
    const productUuids = deliveryItems.map( item => item.productUuid)

    const products = await productRepo.find({
      where: { uuid: In(productUuids) }
    })

    // push productId inside deliceryItem Array
    const deliveryItemsWithProductId = []

    for(const deliveryItem of  deliveryItems){
        const product = products.find(item => item.uuid === deliveryItem.productUuid)
        deliveryItem.productId = product!.id 
        deliveryItemsWithProductId.push(deliveryItem)
    }
   
    for(const item of deliveryItemsWithProductId){
      const purchaseProduct = exitingWareHouseProductPurchase.find((product) => product.productId === item.productId)
      if(item.quantity > purchaseProduct!.availableQuantity){
        throw new UnprocessableEntityError('Cannot delivered a product whose quantity is less than was requested for')
      }
   } 
   return true
} 

export const canDeliveryRequestBeProcessed = async (
   deliveryRequestToSite:WareHouseToSiteDeliveryRequest ) => {
    const connection = await getFreshConnection()
    const wareHouseProductPurchaseRepo =  connection.getRepository(WareHouseProductPurchase)
    const productRepo = connection.getRepository(Product)

    const exitingWareHouseProductPurchase = await wareHouseProductPurchaseRepo.find({
      where: {
        wareHouseId: deliveryRequestToSite.wareHouseId,
      }
    })

    const productUuids = deliveryRequestToSite.deliveryItems.map( item => item.productUuid)

    const products = await productRepo.find({
      where: { uuid: In(productUuids) }
    })

    // push productId inside deliceryItem Array
    const deliveryItemsWithProductId = []

    for(const deliveryItem of  deliveryRequestToSite.deliveryItems){
        const product = products.find(item => item.uuid === deliveryItem.productUuid)
        deliveryItem.productId = product!.id 
        deliveryItemsWithProductId.push(deliveryItem)
    }
    
   for(const item of deliveryItemsWithProductId){
      const purchaseProduct = exitingWareHouseProductPurchase.find((product) => product.productId === item.productId)
      if(item.quantity > purchaseProduct!.availableQuantity){
        throw new UnprocessableEntityError('Cannot delivered a product whose quantity is less than was requested for')
      }
   } 
   return true
  }


export const processAcceptDeliveryFees = async (currentUser: User,
   existingWareHouseToSiteDelivery: WareHouseToSiteDeliveryRequest,
    existingWarehouse: WareHouse,
    paymentVarient: OrderPaymentVariant): Promise<any> => {
  await canDeliveryRequestBeProcessed(existingWareHouseToSiteDelivery)
  const connection = await getFreshConnection();
  let paymentStatus
  if(paymentVarient === OrderPaymentVariant.WALLET){
    await WarehouseWalletService.saveDeliveryWalletFeeTransaction(currentUser.accountId, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor)
    paymentStatus =  {
      status: true,
      paymentTransactionStatus: PaymentTransactionStatus.PAID
    }
  }
  if(paymentVarient === OrderPaymentVariant.PAY_ON_DELIVERY) {
    if(existingWareHouseToSiteDelivery.deliveryFeeAmountMajor >= existingWarehouse.totalValueMajor){
      throw new UnprocessableEntityError('Unable to process POD for warehouse to site delivery')
    }
    await WarehouseWalletService.saveDeliveryWalletFeeTransaction(currentUser.accountId, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor)
    paymentStatus =  {
      status: true,
      paymentTransactionStatus: PaymentTransactionStatus.PAID
    }
  }
  if(paymentVarient === OrderPaymentVariant.CARD){
    const paymentDetails = await PaymentService.processDeliveryToSiteRequestCardPayment(currentUser, existingWareHouseToSiteDelivery.deliveryFeeAmountMajor,existingWareHouseToSiteDelivery)
    paymentStatus =  {
      status: true,
      paymentTransactionStatus: PaymentTransactionStatus.UNPAID,
      paymentDetails
    }
  }
  const acceptDeliveryChargesSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const wareHouseRepoT = transactionalEntityManager.getRepository(WareHouse)
    const wareHouseProductPurchaseRepoT = transactionalEntityManager.getRepository(WareHouseProductPurchase)
    const wareHouseProductPurchaseRepoManagerT = wareHouseProductPurchaseRepoT.manager
    const wareHouseToSiteDeliveryRepoT = transactionalEntityManager.getRepository(WareHouseToSiteDeliveryRequest)
    const productRepoT = transactionalEntityManager.getRepository(Product)

    let totalQuantity = 0;
    const productUuids: string[] = existingWareHouseToSiteDelivery.deliveryItems.map(delItem => delItem.productUuid)

    const productIds = await productRepoT.find({
      where: {uuid: In(productUuids)},
      select: ['id', 'uuid'],
    })

    const wareHouseProductPurchases = await wareHouseProductPurchaseRepoT.find({
      productId: In(productIds.map(withIds => withIds.id)),
      wareHouseId: existingWarehouse.id
    })

    const wareHouseProductPurchaseBulkUpdateQueryParams: string[] = wareHouseProductPurchases.map(wareHouseProductPurchase => {
      const product = productIds.find(prod => prod.id === wareHouseProductPurchase.productId)
      const deliveryProductItem = existingWareHouseToSiteDelivery.deliveryItems.find(delItem => delItem.productUuid === product!.uuid)

      const newOutFlowQuantity = wareHouseProductPurchase.outFlowQuantity + deliveryProductItem!.quantity
      const newAvailableQuantity = wareHouseProductPurchase.availableQuantity - deliveryProductItem!.quantity

      return `(${wareHouseProductPurchase.id}, ${newOutFlowQuantity}, ${newAvailableQuantity})`
    })

    const wareHouseProductPurchaseBulkUpdateQuery = 
      `UPDATE warehouse_product_purchases set 
          outflow_quantity = warehouse_product_purchase_update.outflow_quantity, 
          available_quantity = warehouse_product_purchase_update.available_quantity
        from(values${wareHouseProductPurchaseBulkUpdateQueryParams.join(",")}) as warehouse_product_purchase_update (id, outflow_quantity, available_quantity)
        where warehouse_product_purchases.id = warehouse_product_purchase_update.id;`

    await wareHouseProductPurchaseRepoManagerT.query(wareHouseProductPurchaseBulkUpdateQuery)

    for(const deliveryItem of existingWareHouseToSiteDelivery.deliveryItems) {
      totalQuantity = deliveryItem.quantity
    }

    const updateWareHouseQuery = {
      totalQuantity,
      totalValueMajor: existingWarehouse.totalValueMajor - existingWareHouseToSiteDelivery.totalAmountMajor
    }
    await wareHouseRepoT.createQueryBuilder()
      .update(existingWarehouse)
      .set(updateWareHouseQuery)
      .where({ id: existingWarehouse.id })
      .execute()
  
    const updatedStatusHistory = [...existingWareHouseToSiteDelivery.deliveryFeeStatusHistory];
    updatedStatusHistory.push({
      status: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED,
      dateTimeInISO8601: Utils.utcNow().toISOString(),
    });
  
    const updateQuery: any = {
      deliveryFeeStatus: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED,
      deliveryFeeStatusHistory : updatedStatusHistory
    };
  
    await wareHouseToSiteDeliveryRepoT
      .createQueryBuilder()
      .update(WareHouseToSiteDeliveryRequest)
      .set(updateQuery)
      .where({
        uuid: existingWareHouseToSiteDelivery.uuid
      })
      .execute();
    return true
  })  
  if(!acceptDeliveryChargesSuccess){
    return false
  }
  return paymentStatus
}

export const processDeclineDeliveryFees = async (status: WareHouseToSiteDeliveryFeeStatuses, existingWareHouseToSiteDelivery: WareHouseToSiteDeliveryRequest): Promise<boolean> => {
  
  if(status !== WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED ){
    throw new UnprocessableEntityError('Payment for delivery fee must carry status of DELIVERY_FEE_REJECTED ')
  }
  const connection = await getFreshConnection();
  const wareHouseToSiteDeliveryRepoT = connection.getRepository(WareHouseToSiteDeliveryRequest)
   // update status
  
  const updatedStatusHistory = [...existingWareHouseToSiteDelivery.deliveryFeeStatusHistory];
    updatedStatusHistory.push({
      status: WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED,
      dateTimeInISO8601: Utils.utcNow().toISOString(),
    });

  const updateQuery: any = {
    deliveryFeeStatus:WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED,
    deliveryFeeStatusHistory: updatedStatusHistory
  };

  await wareHouseToSiteDeliveryRepoT
  .createQueryBuilder()
  .update(WareHouseToSiteDeliveryRequest)
  .set(updateQuery)
  .where({
    uuid: existingWareHouseToSiteDelivery.uuid
  })
  .execute();
  return true
}

export const hasDeliveryBeenProcessed = async (existingWareHouseToSiteDelivery: WareHouseToSiteDeliveryRequest): Promise<boolean> => {
  if(existingWareHouseToSiteDelivery.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED){
    throw new UnprocessableEntityError('WareHouse Delivery to site has been accepted and processed')
  }
  if(existingWareHouseToSiteDelivery.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_REJECTED){
    throw new UnprocessableEntityError('WareHouse Delivery to site has was Rejected') 
  }
  return true
}

export const canHaveMultipleWareHousePerState = async (userId: number): Promise<boolean> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const userSetting =  await userRepo.findOne({
    where: { id: userId}
  })
  if(userSetting?.settings?.canCreateMultipleWareHouseInState){
    
    if(userSetting?.settings?.canCreateMultipleWareHouseInState === true){
      return true;
    }
      return false
    
  }
  return false;
}