/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import * as _ from 'underscore'
import { getRepository, In } from "typeorm";
import { getFreshConnection } from "../db";
import { TemporaryOrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { TemporaryOrderCreateWithSellerGroupingRequestDto, BuyerDetails } from "../dto/TemporaryOrderCreateWithSellerGroupingRequestDto";
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { PickupLocation } from "../entity/PickupLocation";
import { TemporaryOrder } from '../entity/TemporaryOrder';
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { CartItemJson } from '../interfaces/CartItemJson';
import * as ProductsService from "./productsService"
import * as PaystackService from "../services/paystackService";
import { NotFoundError, ServerError, UnprocessableEntityError } from "../utils/error-response-types";
import { PaystackPayingUser } from "../interfaces/PaystackPayingUser";
import { CountryCodeToCurrency } from '../enums/Currency';
import { DeliveryDetails } from '../interfaces/DeliveryDetails';
import { OrderSellerGroup } from '../dto/OrderSellerGroup';
import * as Utils from "../utils/core"
import NewCartItemRequestDto from '../dto/NewCartItemRequestDto';
import * as ProfileService from "../services/profileService"
import { User } from '../entity/User';
import { TemporaryOrderDetailsResponseDto } from '../dto/TemporaryOrderDetailsResponseDto';
import { Product } from '../entity/Product';
import { Order } from '../entity/Order';


const validatetempOrderData = async (requestBody: TemporaryOrderCreateWithSellerGroupingRequestDto): Promise<boolean> => {
  if(requestBody.sellers.length === 0){
   throw new UnprocessableEntityError('Incompleted Seller Product Details')
  } 
  if(!requestBody.buyer){
    throw new UnprocessableEntityError('Please Provide Full Buyer Details')
  }
  return true
}

export const createTemporaryOrders = async (cartItems: CartItemJson[],
  orderReceiveType: OrderReceiveTypes, 
  buyerDetail: BuyerDetails,
  deliveryDetails?: DeliveryDetails | null, 
  pickupLocation?: PickupLocation,
): Promise<TemporaryOrder[]> => {
  const connection = await getFreshConnection()
  const orderRepo = connection.getRepository(TemporaryOrder)

  const productUuids = cartItems.map(cartItem => cartItem.productUuid)

  const products = await ProductsService.getProductsByUuid(productUuids)
  if (!products.length) {
    throw new NotFoundError('We could not find the products in your cart')
  }
  for (const product of products){
    if(product?.price === 0){
      throw new UnprocessableEntityError('Product with Price of zero Can Only be process via Qoute Request');
    }
  }
  const nonDeletedProductUuids = products.map(prod => prod.uuid)

  const sellerUserUuids = _.uniq(products.map(product => product.user.uuid))

  const sellerUserUuidsToProductUuids: {[sellerUuid: string]: string[]} = {}

  for (const productUuid of nonDeletedProductUuids) {
    const product = products.find(prod => prod.uuid === productUuid)

    const sellerUserUuid = product!.user.uuid
    if(!sellerUserUuidsToProductUuids[sellerUserUuid]) {
      sellerUserUuidsToProductUuids[sellerUserUuid] = []
    }
    sellerUserUuidsToProductUuids[sellerUserUuid].push(productUuid)
  }

  const currency = CountryCodeToCurrency.NG;

  const createdOrders: TemporaryOrder[] = await connection.transaction(async (transactionManager) => {
    const orders = []
    const orderRepoT = transactionManager.getRepository(TemporaryOrder);

    for (const sellerUserUuid of sellerUserUuids) {
      const sellerProductUuids = sellerUserUuidsToProductUuids[sellerUserUuid]
      const firstProduct = products.find(prod => prod.uuid === sellerProductUuids[0])
      if(!firstProduct) {
        continue;
      }

      const orderItems = sellerProductUuids.map(spUuid => {
        const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === spUuid)
        const sellerP = products.find(prod => prod.uuid === spUuid)

        const newOrderItem: CartItemJson = {
          productId: sellerP!.id,
          productUuid: sellerP!.uuid,
          productName: sellerP!.name,
          quantity: cartItem!.quantity,
          unitPrice: cartItem!.unitPrice,
          unitPriceForBuyer: cartItem!.unitPriceForBuyer,
          unitPromoPriceForBuyer: cartItem!.unitPromoPriceForBuyer,
          promotionId: cartItem!.promotionId,
          productCategorySettings: sellerP!.category?.settings,
          deliveryAddressState: deliveryDetails?.state,
          quoteRequest: cartItem!.quoteRequest
        }
        return newOrderItem
      })
      
      let temporaryOrder = new TemporaryOrder().initialize(firstProduct.user, orderItems, orderReceiveType, buyerDetail,
        currency, deliveryDetails ?? undefined, pickupLocation?.id)
      temporaryOrder = await orderRepoT.save(temporaryOrder)

      const join = {
        alias: "order",
        leftJoinAndSelect: {
          sellerUser: "order.sellerUser",
        },
      };
      const orderWithJoins = await orderRepoT.findOne({
        where: {
          uuid: temporaryOrder.uuid,
        },
        join,
      });
      
      orders.push(orderWithJoins!)
    }

    return orders
  })

  return createdOrders
}

export const temporaryOrderDetails = async (order: TemporaryOrder): Promise<TemporaryOrderDetailsResponseDto> => {
  const connection = await getFreshConnection();
  const userRepo = connection.getRepository(User);

  const sellerUser = await userRepo.findOne({
    id: order.sellerUserId,
  })
  const sellerPublicProfile = await ProfileService.getPublicProfile(sellerUser!)

  const pickupLocationRepo = connection.getRepository(PickupLocation);

  let pickupLocation: PickupLocation | undefined;
  if(order.pickupLocationId) {
    pickupLocation = await pickupLocationRepo.findOne({
      id: order.pickupLocationId
    });
  }

  const orderItemProductIds = order.orderItems.map(oItem => oItem.productId);
  const productRepo = getRepository(Product);
  const products = await productRepo.find({
    id: In(orderItemProductIds),
  })

  const orderDetailsResponseDto: TemporaryOrderDetailsResponseDto = order.toResponseDto(products,
    sellerPublicProfile, pickupLocation)
  
  return orderDetailsResponseDto;
}

export const temporaryCartToFullCartItemsJson = async (temporaryCart: NewCartItemRequestDto[]): Promise<CartItemJson[]> => {
  const productUuids: string[] = temporaryCart.map(cItem => cItem.productUuid)
  const finalCartItemJson: CartItemJson[] = []

  const products = await ProductsService.getProductsByUuid(productUuids)

  for(const cartItem of temporaryCart) {
    const product = products.find(p => p.uuid === cartItem.productUuid)
    
    if(product?.price === 0){
      throw new UnprocessableEntityError('Product with price of zero can only be process via Qoute Request');
    }

    const forcedProduct = product!

    const unitPriceForBuyer = Utils.getPriceForBuyer(forcedProduct.price ?? 0, product)
    // const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer)

    const newSellerCartItemJson: CartItemJson = {
      productId: forcedProduct.id,
      productUuid: forcedProduct.uuid,
      productName: forcedProduct.name,
      quantity: cartItem.quantity,
      unitPrice: (forcedProduct.price) ?? 0,
      images: forcedProduct.images,
      unitPriceForBuyer, 
      unitPromoPriceForBuyer,
      // promotionId: productCategoryPromo?.id,
      productCategorySettings: forcedProduct.category?.settings,
    }
    finalCartItemJson.push(newSellerCartItemJson)  
  }
  return finalCartItemJson
}

export const sellerCartItemsToFullCartItems = async (sellerGroup: OrderSellerGroup): Promise<CartItemJson[]> => {
  const productUuids: string[] = []
  const finalCartItemJson: CartItemJson[] = []

  productUuids.push(...sellerGroup.cartItems.map(sCartItem => sCartItem.productUuid))

  const products = await ProductsService.getProductsByUuid(productUuids)

  for(const sCartItem of sellerGroup.cartItems) {
    const product = products.find(p => p.uuid === sCartItem.productUuid)
    const forcedProduct = product!
    
    const unitPriceForBuyer = Utils.getPriceForBuyer(forcedProduct.price ?? 0, product)
    // const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer)

    const newSellerCartItemJson: CartItemJson = {
      productId: forcedProduct.id,
      productUuid: forcedProduct.uuid,
      productName: forcedProduct.name,
      quantity: sCartItem.quantity,
      unitPrice: (forcedProduct.price) ?? 0,
      images: forcedProduct.images,
      unitPriceForBuyer, 
      unitPromoPriceForBuyer,
      // promotionId: productCategoryPromo?.id,
      productCategorySettings: forcedProduct.category?.settings,
    }
    finalCartItemJson.push(newSellerCartItemJson)  
  }
  return finalCartItemJson
}

export const processTemporaryOrderCreationFromPrepared = async (
    requestBody: TemporaryOrderCreateWithSellerGroupingRequestDto): Promise<TemporaryOrder[]> => {
  const pickupLocationRepo = getRepository(PickupLocation);
  const productRepo = getRepository(Product);

  const temporaryOrders: TemporaryOrder[] = []

  const sellerUserUuids: string[] = []
  const pickupLocationUuids: string[] = []
  const productUuids: string[] = []
  let pickupLocations: PickupLocation[] = []
  let products: Product[] = []

  await validatetempOrderData(requestBody)

  for(const sellerCartInfo of requestBody.sellers) {
    sellerUserUuids.push(sellerCartInfo.userUuid)
    if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.DELIVERY && !requestBody.newDeliveryAddress){
      throw new UnprocessableEntityError('A Delivery Order was placed but Delivery Details was Not Provided.')
    }
    if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.PICKUP && !sellerCartInfo.pickupLocationUuid){
      throw new UnprocessableEntityError('A Pick Up Order was placed but Pickup Location was Not Selected.')
    }
    if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
      pickupLocationUuids.push(sellerCartInfo.pickupLocationUuid)
    }
    for(const sellerCartItems of sellerCartInfo.cartItems) {
      productUuids.push(sellerCartItems.productUuid)
    }
  }

  if(pickupLocationUuids.length) {
    pickupLocations = await pickupLocationRepo.find({
      uuid: In(pickupLocationUuids)
    })
  }
  for(const productUiid of productUuids){
    // eslint-disable-next-line no-await-in-loop
    const productExist = await productRepo.findOne({ uuid: productUiid})
    if(!productExist){
      throw new NotFoundError(`Product with following uuid ${productUiid} Does not exist`)
    }
  }

  if(productUuids.length) {
    products = await productRepo.find({
      where: {
        uuid: In(productUuids),
        isSoftDeleted: false,
      },
      select: ['id', 'uuid', 'name', 'price']
    })
  }

  for(const sellerCartInfo of requestBody.sellers) {
    let pickupLocation: PickupLocation | undefined;
    if(sellerCartInfo) {
      if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
        pickupLocation = pickupLocations.find(pLoc => pLoc.uuid === sellerCartInfo.pickupLocationUuid)
      }

      const preparedCartItems: CartItemJson[] = await sellerCartItemsToFullCartItems(sellerCartInfo)

      const createdOrders = await createTemporaryOrders(preparedCartItems,
        sellerCartInfo.orderReceiveType, requestBody.buyer, requestBody.newDeliveryAddress, pickupLocation
      );
      temporaryOrders.push(...createdOrders);
    }
  }
  return temporaryOrders
}

export const processTemporaryOrdersPayment = async (requestBody: TemporaryOrderCreateWithSellerGroupingRequestDto, 
    temporaryOrders: TemporaryOrder[]): Promise<TemporaryOrderPayResponseDto> => {
  const connection = await getFreshConnection();
  
  const temporaryOrderUuids = temporaryOrders.map(order => order.uuid)
  let orderAmountMajor = 0
  for (const order of temporaryOrders) {
    orderAmountMajor += order.calculatedTotalCostMajor
  }
  const tempCreatedOrders = temporaryOrders.map((order) => {
    return { uuid: order.uuid, orderRef: order.id.toString()} 
  })


  // TODO: Add new index to account for the paid_status column
  await getRepository(FinancialTransaction)
    .createQueryBuilder()
    .where("metadata->>'temporaryOrderUuid' IN (:...temporaryOrderUuids)", {
      temporaryOrderUuids,
    })
    .andWhere("paid_status = :paidStatus", {
      paidStatus: PaymentTransactionStatus.UNPAID
    })
    .delete()

  const paystackPayingUser: PaystackPayingUser = {
    emailAddress: requestBody.buyer.emailAddress || undefined,
    fullName: requestBody.buyer.fullName
  }

  const {
    paymentReference,
    paymentProviderRedirectUrl,
    accessCode,
    redirectUrlAfterPayment
  } = await PaystackService.initializeTransaction(paystackPayingUser, orderAmountMajor)

  if (!paymentReference) {
    throw new ServerError('An error occurred while processing your payment. Please try again')
  }

  const paystackTransactionSaved: boolean = await connection.transaction(async (transactionalEntityManager) => {
    for (const order of temporaryOrders) {
      const metadata: FinancialTransactionMetadata = {
        temporaryOrderUuid: order.uuid,
      }
      const financialTransaction = new FinancialTransaction().initializeForTemporaryOrder(
        PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER,
        order.calculatedTotalCostMajor * 100,
        CountryCodeToCurrency.NG, PaymentTransactionStatus.UNPAID,
        paymentReference, metadata)
      financialTransaction.description = `NGN${order.calculatedTotalCostMajor} order payment`

      const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
      const savedTransaction = await transactionRepoT.save(financialTransaction)
      const temporaryOrderRepoT = transactionalEntityManager.getRepository(TemporaryOrder)
      if(order) {
        await temporaryOrderRepoT.createQueryBuilder()
          .update(TemporaryOrder)
          .set({ paymentTransactionUuid: savedTransaction.uuid })
          .where({ uuid: order.uuid })
          .execute()
      }
    }  
    return true
  })

  if (!paystackTransactionSaved) {
    throw new ServerError('An error occurred while processing your payment. Please try again')
  }

  return {
    temporaryOrders: tempCreatedOrders,
    temporaryOrderUuids,
    paymentProviderDetails: {
      paymentReference,
      paymentProviderRedirectUrl,
      accessCode,
      redirectUrlAfterPayment  
    },
    paymentTransactionStatus: PaymentTransactionStatus.UNPAID
  }
}

export const paidTemporaryOrderDetails = async (temporaryOrderUuids: string[], paymentReference: string): Promise<Order[]> => {
  const connection = await getFreshConnection();

  // full list of temporary order from the
  const financialRepo = connection.getRepository(FinancialTransaction)
  const orderRepo = connection.getRepository(Order)
  const financialTransactions = await financialRepo.find({
    reference: paymentReference
  })
  console.log(financialTransactions)

  const tempOrderFinancial = []
  // eslint-disable-next-line guard-for-in
  for(const uuid of temporaryOrderUuids){
    const transaction = financialTransactions.find((item) => item.metadata?.temporaryOrderUuid === uuid)
    console.log('transaction', transaction)
    tempOrderFinancial.push(transaction?.uuid)
  }
  const realOrders = await orderRepo.find({
    where: {paymentTransactionUuid: In(tempOrderFinancial)}
  })
  console.log('real orders', realOrders)
  return realOrders
}
