
import { getFreshConnection } from '../db';
import { QuoteRequest } from '../entity/QuoteRequest';

import { getRepository } from 'typeorm';
import { QouteRequestAdminCreateRequestDto } from '../dto/QouteRequestAdminCreateRequestDto';
import { QuoteRequestCreateRequestDto } from '../dto/QuoteRequestCreateRequestDto';
import { SubmitPriceMatricDto } from '../dto/SubmitPriceMatricDto';
import { DeliveryLocation } from '../entity/DeliveryLocation';
import { Product } from "../entity/Product";
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { User } from "../entity/User";
import { CountryCodeToCurrency } from '../enums/Currency';
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { QuoteRequestStatuses } from '../enums/Statuses';
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import * as Utils from "../utils/core";
import { UnprocessableEntityError } from '../utils/error-response-types';
import * as EmailService from "./emailService";
import * as NotificationService from "./notificationService";
import * as PriceMatrixService from "./priceMatrixService";
import * as ProfileService from "./profileService";
import * as PromotionService from './promotionService';
import * as AccountStatService from "./sellerAccountStatService";


export const createQuoteRequest = async (payload: QuoteRequestCreateRequestDto, currentUser: User, product: Product, deliverAddress: string): Promise<QuoteRequest> => {
  const connection = await getFreshConnection()
 

  const quoteRequestCreated: QuoteRequest = await connection.transaction(async (transactionalEntityManager) => {
    const quoteRequestRepoT = transactionalEntityManager.getRepository(QuoteRequest);

    let quoteRequest = new QuoteRequest().initialize(currentUser, payload, product);
    quoteRequest = await quoteRequestRepoT.save(quoteRequest)

    const referenceNumber = Utils.getOrderEntityReferenceNumber(quoteRequest)
    
    await quoteRequestRepoT.createQueryBuilder()
      .update(QuoteRequest)
      .set({
        referenceNumber,
        deliverAddress
      })
      .where({
        id: quoteRequest.id
      })
      .execute()

    const sellerAccountStats = await AccountStatService.getSellerAccountStats(quoteRequest.sellerUserId)
    const accountStatRepoT = transactionalEntityManager.getRepository(SellerAccountStat)
  
    await accountStatRepoT.createQueryBuilder()
      .update(SellerAccountStat)
      .set({
        totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount + 1,
      })
      .where({ id: sellerAccountStats.id })
      .execute()
      
      quoteRequest.referenceNumber = referenceNumber;
    return quoteRequest
  })
  // intiate price matrix process
  await PriceMatrixService.createPriceMatrix(currentUser, quoteRequestCreated, product);
  // TODO
  // Notify seller and Admin of new quote request
  const sellerDetails = await User.findOne({ uuid: quoteRequestCreated.sellerUserUuid })
  await EmailService.sendQouteRequestDetailsMail(currentUser, 
    quoteRequestCreated, sellerDetails!, product)

  const notificationMetadata: NotificationMetadata = {
    quoteRequestUuid: quoteRequestCreated.uuid
  }
  
const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.SMS]: true,
    [NotificationTransportMode.EMAIL]: true
  }
await NotificationService.sendSingleNotificationToUserId(quoteRequestCreated.sellerUserId, quoteRequestCreated?.sellerUserUuid,
    NotificationMessageTypes.QOUTE_REQUEST_RAISED,
    'Quote Request Raised', ` You Have a Quote Request with ref #${quoteRequestCreated.referenceNumber}. CinderBuild Team.`, notificationTransports,  notificationMetadata)
return quoteRequestCreated
}

export const respondToQuoteRequest = async (currentUser: User, quoteRequest: QuoteRequest, reqBody: { unitPrice: number, deliveryFee: number | null }): Promise<boolean> => {
  
  const quoteRequestRepo = getRepository(QuoteRequest);
  const productRepo = getRepository(Product)
  
  const now = Utils.utcNow()

  quoteRequest.statusHistory.push({
    status: QuoteRequestStatuses.PROCESSED,
    dateTimeInISO8601: now.toISOString()
  })
  const qouteRequestProduct = await productRepo.findOne({ id: quoteRequest.productId})

  const unitPriceForBuyer = Utils.getPriceForBuyer(reqBody.unitPrice, qouteRequestProduct)
  const productCategoryPromo = await PromotionService.activeCategoryPromotion(quoteRequest.product.categoryId)
  const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

  const referenceNumber = Utils.getOrderEntityReferenceNumber(quoteRequest)

  const subtotalMajor = (unitPriceForBuyer * quoteRequest.quantity)
  const calculatedTotalCostMajor = Utils.normalizeMoney(subtotalMajor + (reqBody.deliveryFee ?? 0))

  await quoteRequestRepo.createQueryBuilder()
    .update(QuoteRequest)
    .set({
      hasSellerResponse: true,
      referenceNumber,
      sellerResponse: {
        unitPrice: reqBody.unitPrice,
        unitPriceForBuyer,
        unitPromoPriceForBuyer,
        promotionId: productCategoryPromo?.id,
        deliveryFee: (reqBody.deliveryFee || 0),
      },
      calculatedTotalCostMajor,
      sellerResponseSubmittedAt: now,
      status: QuoteRequestStatuses.PROCESSED,
      statusHistory: quoteRequest.statusHistory,
    })
    .where({ id: quoteRequest.id })
    .execute()
      
  const sellerAccountStats = await AccountStatService.getSellerAccountStats(currentUser.id)
  const accountStatRepo = getRepository(SellerAccountStat)

  await accountStatRepo.createQueryBuilder()
    .update(SellerAccountStat)
    .set({
      totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount - 1,
    })
    .where({ id: sellerAccountStats.id })
    .execute()
  
  // TODO
  // notify buyer of seller response
  // via mail
  const productDetail: Product | undefined = await productRepo.findOne({id: quoteRequest.productId})
  const sellerResponse = {
    unitPrice: reqBody.unitPrice,
    unitPriceForBuyer,
    deliveryFee: (reqBody.deliveryFee || 0),
  };
  quoteRequest.calculatedTotalCostMajor = calculatedTotalCostMajor
  const sendQouteRequestResponseAdmin =  await EmailService.sellerQouteRequestResponseMail(currentUser, 
    quoteRequest, quoteRequest.user, productDetail!, sellerResponse )
  

  const notificationMetadata: NotificationMetadata = {
    quoteRequestUuid: quoteRequest.uuid,
  }
  const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
  const currency = CurrencyEnum[currentUser.countryIso2] || "NGN";

  const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has responded 
    to your Quote request: #${quoteRequest.referenceNumber}. 
    Total cost: ${currency}${quoteRequest.calculatedTotalCostMajor}`
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true,
    [NotificationTransportMode.SMS]: true
  }
  // send mail here 
  
  NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, quoteRequest.user?.uuid,
    NotificationMessageTypes.QUOTE_REQUEST_SELLER_RESPONSE,
    'Seller has responded to your Quote Request.  CinderBuild Team.', notificatiionMessage, notificationTransports, notificationMetadata)

 return true;   
}

export const createQouteRequestByAdmin = async (payload: QouteRequestAdminCreateRequestDto): Promise<boolean> => {
  const { buyerUserId, sellerUserId, productId, quantity, productSellingPriceMajor, productCostPriceMajor, transactionType, deliveryDate, orderReceiveType, deliveryAddress, deliveryFee} = payload
   const buyerUser = await ProfileService.getUserBuyerFullDetails(buyerUserId);

    const sellerUser = await ProfileService.getUserSellerFullDetails(sellerUserId)
   const connection = await getFreshConnection()
   const productRepo = connection.getRepository(Product)
   const quoteRequestRepo = connection.getRepository(QuoteRequest)
   const deliveryLocationRepo = connection.getRepository(DeliveryLocation)
   
   const join = {
    alias: "product",
    leftJoinAndSelect: {
      user: "product.user",
    },
  }
   const productDetail = await productRepo.findOne({
    where: {  id: productId },
    join
   })

   if(!productDetail){
    throw new UnprocessableEntityError("Product Does Not Exist")
   }

   if(productDetail.price !== 0){
    throw new UnprocessableEntityError("Product is not available for Quote Request")
   }

   const payloadForcreateQuoteRequest:QuoteRequestCreateRequestDto = {
    productUuid: productDetail.uuid,
    quantity,
    orderReceiveType
   }
   if(productCostPriceMajor > productSellingPriceMajor){
    throw new UnprocessableEntityError("Product Cost Price Can Not be More Than Selling Price")
   }
    // add new location for the user
    const buyerDeliveryLocation = await deliveryLocationRepo.find({
      where: { userId: buyerUser.id}
     })
   
     let newDeliveryLocation
     if(buyerDeliveryLocation.length !== 0){
      const deliveryAddressBuyerFirst = buyerDeliveryLocation[0]
     
      const  deliveryLocation = new DeliveryLocation().initialize(buyerUser.id, deliveryAddress, deliveryAddressBuyerFirst.state, 'Nigeria', deliveryAddressBuyerFirst.contactFullName, deliveryAddressBuyerFirst.contactPhoneNumber);
      
      newDeliveryLocation = await deliveryLocationRepo.save(deliveryLocation);
     
    }else {
      const contactFullName = `${buyerUser.firstName} ${buyerUser.lastName}`
      const  deliveryLocation = new DeliveryLocation().initialize(buyerUser.id, deliveryAddress, 'Lagos', 'Nigeria', contactFullName, buyerUser.msisdn);
      
      newDeliveryLocation =  await deliveryLocationRepo.save(deliveryLocation);
    }

    
   // create quote and price matrix
   payloadForcreateQuoteRequest.deliverAddressUuid = newDeliveryLocation.uuid
   const quoteRequestCreated = await createQuoteRequest(payloadForcreateQuoteRequest, buyerUser, productDetail, deliveryAddress);
  
  
   // update deiverylocation uuid
   const quoteRequestWithRef = await quoteRequestRepo.findOne({
    where: { id: quoteRequestCreated.id}
   })
   // submit price matrix for approval
   const submitPriceMatrixPayload: SubmitPriceMatricDto = {
    sellerUserId: sellerUser.id,
    productSellingPriceMajor, 
    productCostPriceMajor,
    deliveryDate,
    transactionType,
    qouteRequestRef: parseInt(quoteRequestWithRef!.referenceNumber),
    deliveryFee,
    quantity
   }

   // submit price for approval
   await PriceMatrixService.submitPriceMatrix(submitPriceMatrixPayload);
  return true;
}