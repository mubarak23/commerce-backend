
import { getFreshConnection } from '../db';
import { MailForDeliveryConfirmationDto } from '../dto/MailForDeliveryConfirmationDto';
import { PriceMatricesResponseByAdmin } from '../dto/PriceMatricesResponseDtoAdmin';
import { SubmitPriceMatricDto } from '../dto/SubmitPriceMatricDto';
import { Business } from '../entity/Business';
import { Order } from '../entity/Order';
import { PaystackDedicatedNuban } from '../entity/PaystackDedicatedNuban';
import { PriceMatrix } from '../entity/PriceMatrix';
import { Product } from '../entity/Product';
import { QuoteRequest } from '../entity/QuoteRequest';
import { User } from '../entity/User';
import { PriceMatriceStatuses, QuoteRequestStatuses } from '../enums/Statuses';
import * as Utils from "../utils/core";
import { NotFoundError, UnprocessableEntityError } from '../utils/error-response-types';
import * as EmailService from './emailService';
import * as EscrowService from './escrowService';
import * as OrderService from './orderService';
import * as PayStackService from './paystackService';
import * as PaystackService from './paystackService';
import * as ProfileService from "./profileService";
import * as QuoteRequestService from './quoteRequestService';
import * as WalletService from './walletService';

export const createPriceMatrix = async (buyerUser: User, qouteRequest: QuoteRequest, product: Product): Promise<boolean> => {
  
  const newPriceMatrix =  new PriceMatrix().initialize(
      buyerUser,
      qouteRequest,
      product,
      qouteRequest.quantity
    )
    const connection = await getFreshConnection();
    const qouteRequestRepo =  connection.getRepository(QuoteRequest)
    const priceMatrixRepo =  connection.getRepository(PriceMatrix)
    await priceMatrixRepo.save(newPriceMatrix);
    
    const qouteRequestDetails = await qouteRequestRepo.findOne({
      where: { id: qouteRequest.id}
    })
    const now = Utils.utcNow()

    newPriceMatrix.statusHistory.push({
      status: PriceMatriceStatuses.CREATED,
      dateTimeInISO8601: now.toISOString()
    })

    await priceMatrixRepo.createQueryBuilder()
    .update(PriceMatrix)
    .set({
      status: PriceMatriceStatuses.CREATED,
      statusHistory: newPriceMatrix.statusHistory,
      deliveryAddress: qouteRequestDetails!.deliverAddress
    })
    .where({ id: newPriceMatrix.id })
    .execute()

    return true;
}

export const submitPriceMatrix = async ( payload: SubmitPriceMatricDto): Promise<PriceMatrix> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix)
  const sellerRepo =  connection.getRepository(User)
  const businessRepo = connection.getRepository(Business)

  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  const priceMatrix = await priceMatrixRepo.findOne({
    where: { qouteRequestRef: payload.qouteRequestRef },
    join
  })

  if(!priceMatrix){
    throw new NotFoundError('The Specified Qoute Request Price Matrix Could Not Be Found')
  }

  const sellerDetails = await sellerRepo.findOne({
    where: { id: payload.sellerUserId, isSeller: true}
  })
  
  if(!sellerDetails){
    throw new UnprocessableEntityError("Seller Does Not Exist");
  }

  const sellerBusiness = await businessRepo.findOne({
    where: { userId: sellerDetails.id}
  })

  if(!sellerBusiness){
    throw new UnprocessableEntityError("Seller Must Update Business Information Before They Can Accept Order.")
  }

 

  if(priceMatrix.status === PriceMatriceStatuses.PRICE_SUBMITTED){
   const updatePriceMatrix= await updatePriceMatrixDetails(payload, priceMatrix)  
   return updatePriceMatrix
  }

  if(priceMatrix.status === PriceMatriceStatuses.APPROVED){
    
    if(priceMatrix?.quantity !== payload.quantity){
      await updatePriceMatrixWithNewQuantity(payload, priceMatrix)
      return priceMatrix
    }
    throw new UnprocessableEntityError('Price Matrix Has Been Approved')
  }


  if(priceMatrix.status === PriceMatriceStatuses.DECLINED){
    const updatePriceMatrix= await updatePriceMatrixDetailsAfterDecline(payload, priceMatrix)
    const  virtualDedicatedAccount = await PaystackService.createDedicatedNuban(updatePriceMatrix.sellerUser);
    const buyerWallet = await WalletService.getCustomerWallet(updatePriceMatrix.buyerUserId);
    await EmailService.sendPriceMatrixForApproval(updatePriceMatrix, virtualDedicatedAccount, buyerWallet);  
    return updatePriceMatrix
  }


  const errorMessages: any = {
    [PriceMatriceStatuses.DELIVERED]: 'Cannot Submit Price After Order Delivery',
    [PriceMatriceStatuses.CONFIRMED_DELIVERY]: 'Cannot Submit Price After Order Delivery Confirmation',
    [PriceMatriceStatuses.SELLER_PAID]: 'Price Matrix For Seller Completed'
  };
 
  // eslint-disable-next-line no-prototype-builtins
  if (errorMessages.hasOwnProperty(priceMatrix.status)) {
    throw new UnprocessableEntityError(errorMessages[priceMatrix.status]);
  }
  

  const now = Utils.utcNow()

  priceMatrix.statusHistory.push({
    status: PriceMatriceStatuses.PRICE_SUBMITTED,
    dateTimeInISO8601: now.toISOString()
  })

  if(payload.productSellingPriceMajor < payload.productCostPriceMajor){
    throw new UnprocessableEntityError("Selling Price Cannot be less than Cost Price")
  }

  if(payload.quantity !== priceMatrix.quantity){
    throw new UnprocessableEntityError('Cannot Change Buyer Qoute Request Product Quantity')
  }

  const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor
  const totalProductSellingPriceMajor = payload.productSellingPriceMajor * priceMatrix.quantity;
  const totlaMarginMajor = productMajorMargin * priceMatrix.quantity;
  const totalProductCostPriceMajor = payload.productCostPriceMajor * priceMatrix.quantity;

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    sellerUserId: payload.sellerUserId,
    productSellingPriceMajor: payload.productSellingPriceMajor,
    productCostPriceMajor: payload.productCostPriceMajor,
    deliveryDate: payload.deliveryDate,
    transactionType: payload.transactionType,
    productMarginMajor: productMajorMargin,
    totalProductSellingPriceMajor,
    totalProductCostPriceMajor,
    totlaMarginMajor,
    deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
    status: PriceMatriceStatuses.PRICE_SUBMITTED,
    statusHistory: priceMatrix.statusHistory,
  })
  .where({ qouteRequestRef: payload.qouteRequestRef })
  .execute()
 

  const updatedPriceMatrix = await priceMatrixRepo.findOne({
    where: { qouteRequestRef: payload.qouteRequestRef},
    join
  })

  const  virtualDedicatedAccount = await PaystackService.createDedicatedNuban(updatedPriceMatrix!.sellerUser);
  const buyerWallet = await WalletService.getCustomerWallet(updatedPriceMatrix!.buyerUserId);
  await EmailService.sendPriceMatrixForApproval(updatedPriceMatrix!, virtualDedicatedAccount, buyerWallet);  

  return updatedPriceMatrix!;
}

export const updatePriceMatrixDetails = async (payload: SubmitPriceMatricDto, priceMatrix: PriceMatrix ): Promise<PriceMatrix> => {
  
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix)
  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  if(payload.productSellingPriceMajor < payload.productCostPriceMajor){
    throw new UnprocessableEntityError("Selling Price Cannot Be Less Than Cost Price")
  }

  if(payload.quantity !== priceMatrix.quantity){
    throw new UnprocessableEntityError('Cannot Change Buyer Quote Request Product Quantity')
  }
  

  const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor
  const totalProductSellingPriceMajor = payload.productSellingPriceMajor * priceMatrix.quantity;
  const totlaMarginMajor = productMajorMargin * priceMatrix.quantity;
  const totalProductCostPriceMajor = payload.productCostPriceMajor * priceMatrix.quantity;


  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    sellerUserId: payload.sellerUserId,
    productSellingPriceMajor: payload.productSellingPriceMajor,
    productCostPriceMajor: payload.productCostPriceMajor,
    deliveryDate: payload.deliveryDate,
    transactionType: payload.transactionType,
    productMarginMajor: productMajorMargin,
    totalProductSellingPriceMajor,
    totalProductCostPriceMajor,
    totlaMarginMajor,
    deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
    status: PriceMatriceStatuses.PRICE_SUBMITTED,
  })
  .where({ qouteRequestRef: payload.qouteRequestRef })
  .execute()

  const updatedPriceMatrix = await priceMatrixRepo.findOne({
    where: { qouteRequestRef: payload.qouteRequestRef},
    join
  })

if(priceMatrix.productSellingPriceMajor !== payload.productSellingPriceMajor){
  const  virtualDedicatedAccount = await PaystackService.createDedicatedNuban(updatedPriceMatrix!.sellerUser);
  const buyerWallet = await WalletService.getCustomerWallet(updatedPriceMatrix!.buyerUserId);
  await EmailService.sendPriceMatrixForApproval(updatedPriceMatrix!, virtualDedicatedAccount, buyerWallet); 
}

return updatedPriceMatrix!;

}

export const updatePriceMatrixWithNewQuantity = async (payload: SubmitPriceMatricDto, priceMatrix: PriceMatrix ): Promise<boolean> => {
  
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix)
  const qouteRequestRepo = connection.getRepository(QuoteRequest)
  const quoteRequestDetails = await qouteRequestRepo.findOne({
  where: { referenceNumber: priceMatrix.qouteRequestRef}
  })

  if(!quoteRequestDetails){
    throw new UnprocessableEntityError('Price Matrix Quote Request Not Found')
  }

  if(quoteRequestDetails.status === QuoteRequestStatuses.ORDER_CREATED){
    throw new UnprocessableEntityError('Order Created, Cannot change Quantity')
  }


  if(payload.quantity){
    const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor
    const totalProductSellingPriceMajor = payload.productSellingPriceMajor * payload.quantity!;
    const totlaMarginMajor = productMajorMargin * payload.quantity!;
    const totalProductCostPriceMajor = payload.productCostPriceMajor * payload.quantity!;
    await qouteRequestRepo.createQueryBuilder()
    .update(QuoteRequest)
    .set({
      quantity: payload.quantity,
    })
    .where({ referenceNumber: priceMatrix.qouteRequestRef })
    .execute()
    await priceMatrixRepo.createQueryBuilder()
    .update(PriceMatrix)
    .set({
      quantity: payload.quantity,
      totalProductSellingPriceMajor,
      totalProductCostPriceMajor,
      totlaMarginMajor,
      deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
    })
    .where({ id: priceMatrix.id })
    .execute()

  }

  if(payload.sellerUserId){
    await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    sellerUserId: payload.sellerUserId
  })
  .where({ qouteRequestRef: priceMatrix.qouteRequestRef })
  .execute()
  }



return true;

}


export const updatePriceMatrixDetailsAfterDecline = async (payload: SubmitPriceMatricDto, priceMatrix: PriceMatrix ): Promise<PriceMatrix> => {
  
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix)
  const qouteRequestRepo = connection.getRepository(QuoteRequest)

  const quoteRequestDetails = await qouteRequestRepo.findOne({
  where: { referenceNumber: priceMatrix.qouteRequestRef}
  })

  if(!quoteRequestDetails){
    throw new UnprocessableEntityError('Price Matrix Quote Request Not Found')
  }

  if(quoteRequestDetails.status === QuoteRequestStatuses.ORDER_CREATED){
    throw new UnprocessableEntityError('Order Created')
  }

  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  if(payload.productSellingPriceMajor < payload.productCostPriceMajor){
    throw new UnprocessableEntityError("Selling Price Cannot be less than Cost Price")
  }

  const now = Utils.utcNow()

  priceMatrix.statusHistory.push({
    status: PriceMatriceStatuses.PRICE_SUBMITTED,
    dateTimeInISO8601: now.toISOString()
  })

  
  const productMajorMargin = payload.productSellingPriceMajor - payload.productCostPriceMajor
  const totalProductSellingPriceMajor = payload.productSellingPriceMajor * payload.quantity!;
  const totlaMarginMajor = productMajorMargin * payload.quantity!;
  const totalProductCostPriceMajor = payload.productCostPriceMajor * payload.quantity!;

  await qouteRequestRepo.createQueryBuilder()
  .update(QuoteRequest)
  .set({
    quantity: payload.quantity!,
  })
  .where({ referenceNumber: priceMatrix.qouteRequestRef })
  .execute()

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    sellerUserId: payload.sellerUserId,
    quantity: payload.quantity!,
    productSellingPriceMajor: payload.productSellingPriceMajor,
    productCostPriceMajor: payload.productCostPriceMajor,
    deliveryDate: payload.deliveryDate,
    transactionType: payload.transactionType,
    productMarginMajor: productMajorMargin,
    totalProductSellingPriceMajor,
    totalProductCostPriceMajor,
    totlaMarginMajor,
    deliveryFee: payload.deliveryFee ? payload.deliveryFee : 0,
    status: PriceMatriceStatuses.PRICE_SUBMITTED,
    statusHistory: priceMatrix.statusHistory,
  })
  .where({ qouteRequestRef: payload.qouteRequestRef })
  .execute()

  const updatedPriceMatrix = await priceMatrixRepo.findOne({
    where: { qouteRequestRef: payload.qouteRequestRef},
    join
  })
  return updatedPriceMatrix!;

}

export const transformPriceMatrixDetails = async (pricematrix: PriceMatrix): Promise<PriceMatricesResponseByAdmin> => {

  const buyerUserPublicProfile = await ProfileService.getSelfProfile(pricematrix.buyerUser)

  return {
    id: pricematrix.id,
    buyerUserId: pricematrix.buyerUserId,
    sellerUserId: pricematrix.sellerUserId,
    uuid: pricematrix.uuid,
    qouteRequestRef: pricematrix.qouteRequestRef,
    qouteRequestId: pricematrix.qouteRequestId,
    product: {
      uuid: pricematrix.product.uuid,
      name: pricematrix.product.name,
      description: pricematrix.product.description,
      unitOfMeasurement: pricematrix.product.category?.unitOfMeasurement ?? "",
    },
    quantity: pricematrix.quantity,
    transactionType: pricematrix.transactionType,
    buyerUserPublicProfile: buyerUserPublicProfile!,
    sellerUserPublicProfile: null,
    deliveryDate: pricematrix.deliveryDate,
    deliveryAddress: pricematrix.deliveryAddress,
    productSellingPriceMajor: pricematrix.productSellingPriceMajor,
    productCostPriceMajor: pricematrix.productCostPriceMajor,
    totalProductSellingPriceMajor: pricematrix.totalProductSellingPriceMajor,
    productMarginMajor: pricematrix.productMarginMajor,
    totlaMarginMajor: pricematrix.totlaMarginMajor,
    status: pricematrix.status,
    statusHistory: pricematrix.statusHistory,
    createdAt: pricematrix.createdAt,
  }

}

export const PriceMatrixByOrderRef = async (ref: string ): Promise<PriceMatrix | boolean> => {
  
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);

  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      order: "price_matrices.order"
    },
  };

  const priceMatrixDetails = await priceMatrixRepo.findOne({
    where: { orderRef: ref },
    join
  });
  if(!priceMatrixDetails){
    return false
  }
  return priceMatrixDetails;

}

export const processApprovalPriceMatrix = async (id:number ): Promise<boolean> => {
  
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  const quoteRequestRepo = connection.getRepository(QuoteRequest);
  const userRepo = connection.getRepository(User);
  const virtualDedicatedAccountsRepo = connection.getRepository(PaystackDedicatedNuban);

  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
    },
  };

  const priceMatrixDetails = await priceMatrixRepo.findOne({
    where: { id },
    join
  })
  if(!priceMatrixDetails){
    throw new UnprocessableEntityError('Price Matrix Not Found')
  }

  if(priceMatrixDetails.status !== PriceMatriceStatuses.PRICE_SUBMITTED){
    throw new UnprocessableEntityError('Cannot Approve Price Matrix without a price');
  }


  const quoteJoin = {
    alias: "quoteRequest",
    leftJoinAndSelect: {
      user: "quoteRequest.user",
      sellerUser: "quoteRequest.sellerUser",
      product: "quoteRequest.product"
    },
  }
  const qouteRequestDetail = await quoteRequestRepo.findOne({
    where: { id: priceMatrixDetails.qouteRequestId},
    join: quoteJoin
  })

  if(!qouteRequestDetail){
    throw new UnprocessableEntityError('Quote Request Not Found')
  }

  // collect data for response.
  const buyerUser = await userRepo.findOne({
    where: { id: qouteRequestDetail.userId}
  })

  if(!buyerUser){
    throw new UnprocessableEntityError('Buyer on the Quote Request Does Not Exist')
  }
  const quoteRequestPayload = { 
    unitPrice: priceMatrixDetails.productSellingPriceMajor,
     deliveryFee: priceMatrixDetails.deliveryFee ? priceMatrixDetails.deliveryFee : null}
  await QuoteRequestService.respondToQuoteRequest(buyerUser, qouteRequestDetail, quoteRequestPayload)
// 
  await updatePriceMatrixWithApproval(priceMatrixDetails)
  const virtualAccount = await virtualDedicatedAccountsRepo.findOne({
    userId: priceMatrixDetails.sellerUserId
  })
  const buyerWallet = await WalletService.getCustomerWallet(priceMatrixDetails.buyerUserId); 
  // send mail to support 
  await EmailService.sendApprovePriceMatrix(priceMatrixDetails, virtualAccount!, buyerWallet)
  return true
}

export const updatePriceMatrixWithApproval = async (priceMatrixDetails: PriceMatrix ): Promise<boolean> => {
 
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
 
  const now = Utils.utcNow()

  priceMatrixDetails.statusHistory.push({
    status: PriceMatriceStatuses.APPROVED,
    dateTimeInISO8601: now.toISOString()
  })

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    status: PriceMatriceStatuses.APPROVED,
    statusHistory: priceMatrixDetails.statusHistory,
  })
  .where({ id: priceMatrixDetails.id })
  .execute()

  return true
}

export const updatePriceMatrixWithOrderDetails = async (orderId: number, orderRef: string, quoteRequestRef: string ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  const orderRepo = connection.getRepository(Order);
  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { qouteRequestRef: quoteRequestRef },
    join,
  })

  if(!pricematrix){
    return false
  }
  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    orderId,
    orderRef,
  })
  .where({ id: pricematrix.id })
  .execute()

  await orderRepo.createQueryBuilder()
  .update(Order)
  .set({
    priceMatrixId: pricematrix.id,
  })
  .where({ id: orderId })
  .execute()


  return true;
}


export const processPriceMatrixOrderDelivery = async (id:number ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { id },
    join,
  })


  if(!pricematrix){
    throw new UnprocessableEntityError('Price matrix Does Not Exist')
  }

  if(pricematrix.orderId === null){
    throw new UnprocessableEntityError('Price matrix Order has not been Placed')
  }

  if(pricematrix.orderRef === null){
    throw new UnprocessableEntityError('Price matrix Order has not been Placed')
  }

  if(pricematrix.quoteRequest.status !== QuoteRequestStatuses.ORDER_CREATED){
    throw new UnprocessableEntityError('No Order Placed')
  }

  const disallowedStatusesForDecline = [
    PriceMatriceStatuses.DECLINED,
    PriceMatriceStatuses.DELIVERED,
    PriceMatriceStatuses.CONFIRMED_DELIVERY,
    PriceMatriceStatuses.SELLER_PAID
  ];
  
  if (disallowedStatusesForDecline.includes(pricematrix.status)) {
    throw new UnprocessableEntityError('Cannot Marke Price Matrix as Delivered in its current status');
  }

  
  // update the status as delivered
  const now = Utils.utcNow()

  pricematrix.statusHistory.push({
    status: PriceMatriceStatuses.DELIVERED,
    dateTimeInISO8601: now.toISOString()
  })

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    status: PriceMatriceStatuses.DELIVERED,
    statusHistory: pricematrix.statusHistory,
  })
  .where({ id: pricematrix.id })
  .execute()

  const sellerVirtualAccount  = await PayStackService.createDedicatedNuban(pricematrix.sellerUser)
// dispatch mail here 

  const deliveryMailData:MailForDeliveryConfirmationDto = {
    sellerId: pricematrix.id,
    priceMatrixId: pricematrix.id,
    amount: pricematrix.productCostPriceMajor * pricematrix.quantity,
    quoteRequestRef: pricematrix.qouteRequestRef,
    orderRef: pricematrix.orderRef,
    accountName: sellerVirtualAccount.bankAccountName,
    accountNumber: sellerVirtualAccount.bankAccountNumber,
    bankName: sellerVirtualAccount.bankName,
  }

 await EmailService.sendPriceMatricForDeliveryConfirmation(deliveryMailData) 
 
return true;
}

export const processPriceMatrixOrderDeliveryConfirmation = async (priceMatricesId: number ): Promise<boolean> => {

  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      order: "price_matrices.order",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { id: priceMatricesId },
    join,
  })
  if(!pricematrix){
    return false
  }

  if(pricematrix.quoteRequest.status !== QuoteRequestStatuses.ORDER_CREATED){
    throw new UnprocessableEntityError('No Order Placed')
  }
 

  if(pricematrix.order.priceMatrixId === priceMatricesId && pricematrix.order.sellerHasChange === true){
    return true
  } 

  if(pricematrix.status === PriceMatriceStatuses.DECLINED){
    throw new UnprocessableEntityError('Cannot Confirm Delivery For a Price Matrix That Has Been Declined')
  }

  if(pricematrix.status !== PriceMatriceStatuses.DELIVERED){
    throw new UnprocessableEntityError('Price Matrix Order Not Delivered')
  }

    // update the status as delivered
    const now = Utils.utcNow()

    pricematrix.statusHistory.push({
      status: PriceMatriceStatuses.CONFIRMED_DELIVERY,
      dateTimeInISO8601: now.toISOString()
    })


  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    status: PriceMatriceStatuses.CONFIRMED_DELIVERY,
    statusHistory: pricematrix.statusHistory,
  })
  .where({ id: pricematrix.id })
  .execute()

  
  const sellerWallet  = await WalletService.getCustomerWallet(pricematrix.sellerUserId)
  await EscrowService.moveFundsFromEscrowToSellerForOrder(pricematrix.order, pricematrix.sellerUser,sellerWallet, pricematrix )


  // update order with pricematricId and sellerHasBeenPaid
  await OrderService.updateOrderWithPriceMatrixDetails(pricematrix)

  pricematrix.statusHistory.push({
    status: PriceMatriceStatuses.SELLER_PAID,
    dateTimeInISO8601: now.toISOString()
  })

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    status: PriceMatriceStatuses.SELLER_PAID,
    statusHistory: pricematrix.statusHistory,
  })
  .where({ id: pricematrix.id })
  .execute()

  return true;
}

export const processDeclinePriceMatrix = async (id:number ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { id },
    join,
  })

  if(!pricematrix){
    throw new UnprocessableEntityError('Price matrix Does Not Exist')
  }



  const disallowedStatusesForDecline = [
    PriceMatriceStatuses.DECLINED,
    PriceMatriceStatuses.APPROVED,
    PriceMatriceStatuses.DELIVERED,
    PriceMatriceStatuses.CONFIRMED_DELIVERY,
    PriceMatriceStatuses.SELLER_PAID
  ];
  
  if (disallowedStatusesForDecline.includes(pricematrix.status)) {
    throw new UnprocessableEntityError('Cannot Decline a Price Matrix in its current status');
  }

  // update the status as decline
  const now = Utils.utcNow()

  pricematrix.statusHistory.push({
    status: PriceMatriceStatuses.DECLINED,
    dateTimeInISO8601: now.toISOString()
  })

  await priceMatrixRepo.createQueryBuilder()
  .update(PriceMatrix)
  .set({
    productSellingPriceMajor:0,
    productCostPriceMajor: 0,
    productMarginMajor: 0,
    totalProductSellingPriceMajor: 0,
    totalProductCostPriceMajor: 0,
    totlaMarginMajor: 0,
    status: PriceMatriceStatuses.DECLINED,
    statusHistory: pricematrix.statusHistory,
  })
  .where({ id: pricematrix.id })
  .execute()

  const declineMailData = {
    buyerFirstName: pricematrix.buyerUser.firstName,
    buyerLastName: pricematrix.buyerUser.lastName,
    quoteRequestRef: pricematrix.qouteRequestRef,
    quantity: pricematrix.quantity,
    priceMatrixId: pricematrix.id,
    productSellingPriceMajor: pricematrix.productSellingPriceMajor,
    productCostPriceMajor: pricematrix.productCostPriceMajor,
    productMarginMajor: pricematrix.productMarginMajor,
  }

 await EmailService.sendDeclinedPriceMatrix(declineMailData) 
 
return true;
}

export const processDeclinePriceMatrixByAdmin = async (id:number ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  const qouteRequestRepo =  connection.getRepository(QuoteRequest)
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      order: "price_matrices.order",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { id },
    join,
  })

  if(!pricematrix){
    throw new UnprocessableEntityError('Price Matrix Not Found');
  }

  if(pricematrix.status === PriceMatriceStatuses.DECLINED_BY_ADMIN ){
    throw new UnprocessableEntityError("Price Matrix Has Been Declined By Admin");
  }

  const qouteRequestDetails = await qouteRequestRepo.findOne({
    where: { id: pricematrix.qouteRequestId}
  })

  if(!qouteRequestDetails){
    throw new UnprocessableEntityError('Quote Request for the Price Matrix Does Not Exist')
  }

  if(qouteRequestDetails.status === QuoteRequestStatuses.ORDER_CREATED){
    throw new UnprocessableEntityError('Cannot Decline Price Matrix, Order Has Been Placed')
  }


   // update the status as decline by Admin 
   const now = Utils.utcNow()

   pricematrix.statusHistory.push({
     status: PriceMatriceStatuses.DECLINED_BY_ADMIN,
     dateTimeInISO8601: now.toISOString()
   })

   await priceMatrixRepo.createQueryBuilder()
   .update(PriceMatrix)
   .set({
     status: PriceMatriceStatuses.DECLINED_BY_ADMIN,
     statusHistory: pricematrix.statusHistory,
   })
   .where({ id: pricematrix.id })
   .execute()

   qouteRequestDetails.statusHistory.push({
      status: QuoteRequestStatuses.DECLINED_BY_ADMIN,
      dateTimeInISO8601: now.toISOString()
   })
   await qouteRequestRepo.createQueryBuilder()
    .update(QuoteRequest)
    .set({
      status: QuoteRequestStatuses.DECLINED_BY_ADMIN,
      statusHistory: qouteRequestDetails.statusHistory
    })
    .where({ id: qouteRequestDetails.id })
    .execute()

  return true;
}


export const doesPriceMatrixExistForOrder = async (order: Order ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const priceMatrixRepo =  connection.getRepository(PriceMatrix);
  const join = {
    alias: "price_matrices",
    leftJoinAndSelect: {
      product: "price_matrices.product",
      buyerUser: "price_matrices.buyerUser",
      sellerUser: "price_matrices.sellerUser",
      order: "price_matrices.order",
      quoteRequest: "price_matrices.quoteRequest"
    },
  };

  const pricematrix = await priceMatrixRepo.findOne({
    where: { orderRef: order.referenceNumber },
    join,
  })

  if(pricematrix){
    throw new UnprocessableEntityError('Cannot update order, Price Matric in Progress')
  }

  return true; 
}