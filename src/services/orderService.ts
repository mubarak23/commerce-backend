/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
import * as _ from "underscore";

import { EntityManager, getRepository, In, Not } from 'typeorm';
import { getFreshConnection } from "../db";
import { CartItem } from '../dto/CartDetailsResponseDto';
import { NewDeliveryAddress } from '../dto/NewOrderCreateRequestDto';
import { OrderCreateWithSellerGroupingRequestDto } from '../dto/OrderCreateWithSellerGroupingRequestDto';
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { DeliveryLocation } from '../entity/DeliveryLocation';
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { Order, OrderReceiver } from '../entity/Order';
import { PickupLocation } from '../entity/PickupLocation';
import { Product } from '../entity/Product';
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { User } from '../entity/User';
import { CountryCodeToCurrency } from "../enums/Currency";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import OrderStatuses, { EndedOrderStatuses, OrderPaymentStatuses, QuoteRequestStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import { OrderPrepareCartItem } from '../interfaces/OrderPrepareCartItem';
import * as PaymentService from "../services/paymentService";
import * as PaystackService from "../services/paystackService";
import * as AccountStatService from "../services/sellerAccountStatService";
import * as WalletService from '../services/walletService';
import * as Utils from "../utils/core";
import { NotFoundError, ServerError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";
import * as EscrowService from "./escrowService";
import * as NotificationService from "./notificationService";
import * as PriceMatricService from "./priceMatrixService";
import * as ProductsService from "./productsService";
import * as ProfileService from "./profileService";
import { sendSms } from "./smsSendingService";

import { Cart } from "../entity/Cart";
import { PriceMatrix } from "../entity/PriceMatrix";
import { QuoteRequest } from "../entity/QuoteRequest";
import { Wallet } from "../entity/Wallet";
import { WareHouse } from "../entity/WareHouse";
import ConfigProperties from '../enums/ConfigProperties';
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { Roles } from "../enums/Roles";
import { PaystackPayingUser } from "../interfaces/PaystackPayingUser";
import * as ConfigPropertyService from '../services/configPropertyService';


export const createOrders = async (currentUser: User, cartItems: CartItemJson[],
    orderReceiveType: OrderReceiveTypes, 
    paymentVariant: OrderPaymentVariant,
    deliveryLocation?: DeliveryLocation, 
    pickupLocation?: PickupLocation,
    warehouseLocation?: WareHouse,
    differentOrderReceiver?: OrderReceiver | null,
    temporaryOrderUuid?: string | null,
  ): Promise<Order[]> => {
  const connection = await getFreshConnection()



  if(currentUser.role === Roles.AFFILIATE) {
    if(paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY) {
      throw new UnprocessableEntityError('Affiliates can only create pay on delivery orders')
    }
  }
  
  if(currentUser.role !== Roles.AFFILIATE){
      
    const existingUnpaidOrders = await buyerUnpaidOrders(currentUser.id, [])

    if(existingUnpaidOrders.length) {
      throw new UnprocessableEntityError('Please pay for your unpaid orders before creating a new one')
    }

  }

  const productUuids = cartItems.map(cartItem => cartItem.productUuid)

  const products = await ProductsService.getProductsByUuid(productUuids)
  if (!products.length) {
    throw new NotFoundError('We could not find the products in your cart')
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

  if(differentOrderReceiver) {
    if(differentOrderReceiver.userUuid) {
      const userRepo = connection.getRepository(User)
      const differentUser = await userRepo.findOne({
        uuid: differentOrderReceiver.userUuid
      })
      if(differentUser) {
        differentOrderReceiver.firstName = differentUser.firstName
        differentOrderReceiver.lastName = differentUser.lastName
        differentOrderReceiver.userId = differentUser.id
        differentOrderReceiver.msisdn = differentUser.msisdn
      }
    }
    if(differentOrderReceiver.userId) {
      const userRepo = connection.getRepository(User)
      const differentUser = await userRepo.findOne({
        id: differentOrderReceiver.userId
      })
      if(differentUser) {
        differentOrderReceiver.firstName = differentUser.firstName
        differentOrderReceiver.lastName = differentUser.lastName
        differentOrderReceiver.userId = differentUser.id
        differentOrderReceiver.msisdn = differentUser.msisdn
      }
    }
  }
  
  const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
  const currency = CurrencyEnum[currentUser.countryIso2];

  const createdOrders: Order[] = await connection.transaction(async (transactionManager) => {
    const orders = []
    const orderRepoT = transactionManager.getRepository(Order);

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
          deliveryAddressState: deliveryLocation?.state,
          quoteRequest: cartItem!.quoteRequest
        }
        return newOrderItem
      })
      
      if(paymentVariant === OrderPaymentVariant.WALLET ){
        await hasAvailableBalance(currentUser, orderItems)
      }
      
      let order = new Order().initialize(currentUser, firstProduct.user, orderItems, orderReceiveType,
        currency, paymentVariant, differentOrderReceiver, deliveryLocation?.id, pickupLocation?.id, warehouseLocation?.id)
      if(temporaryOrderUuid) {
        order.temporaryOrderUuid = temporaryOrderUuid
      }
      order = await orderRepoT.save(order)

      const join = {
        alias: "order",
        leftJoinAndSelect: {
          buyerUser: "order.buyerUser",
          sellerUser: "order.sellerUser",
        },
      };
      const orderWithJoins = await orderRepoT.findOne({
        where: {
          uuid: order.uuid,
        },
        join,
      });
      const referenceNumber = Utils.getOrderEntityReferenceNumber(orderWithJoins!)

      await orderRepoT.createQueryBuilder()
        .update(Order)
        .set({
          referenceNumber,
        })
        .where({
          id: orderWithJoins!.id
        })
        .execute()
        orderWithJoins!.referenceNumber = referenceNumber
      
      orders.push(orderWithJoins!)
    }

    return orders
  })

  if(paymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY){
    for(const order of createdOrders){
      await processPODNotification(currentUser, order)
    }
  }

  return createdOrders
}

export const createOrdersFromTemporaryOrders = async (currentUser: User, cartItems: CartItemJson[],
  orderReceiveType: OrderReceiveTypes, 
  paymentVariant: OrderPaymentVariant,
  temporaryOrderUuid: string,
  deliveryLocation?: DeliveryLocation, 
  warehouseLocation?: WareHouse,
  pickupLocation?: PickupLocation,
): Promise<Order[]> => {
  return createOrders(currentUser, cartItems, orderReceiveType, paymentVariant,
    deliveryLocation,  pickupLocation, warehouseLocation,
    undefined, temporaryOrderUuid,
  )
}

export const hasAvailableBalance = async (currentUser: User, 
  orderItems: CartItemJson[]): Promise<boolean> => {
    const connection = await getFreshConnection()
    const walletRepo = connection.getRepository(Wallet)
    // calculate 
    let totalOrderAmount = 0
    for(const orderItem of orderItems){
      const singleOrderAmount = orderItem.quantity * orderItem.unitPriceForBuyer
      totalOrderAmount += singleOrderAmount
    }
    const totalOrderAmountMinor = totalOrderAmount * 100
    const buyerWallet = await walletRepo.findOne({ userId: currentUser.id})

    if(buyerWallet && totalOrderAmountMinor > buyerWallet.walletBalanceMinor ) {
      
      throw new UnprocessableEntityError('Insufficient balance to process payment of order')
    }
    return true
  }

export const processPODNotification = async (currentUser: User, order: Order): Promise<boolean> => {
  const connection = await getFreshConnection()
  const messageBody = [
    `Dear, ${currentUser.firstName}. `,
    `You have successfully placed a cash on delivery order with the order reference: #${order.referenceNumber}. `,
    `Please note you are expected to make payment immediately when your items arrive. `,
    `Thanks, CinderBuild`
  ]
  const body = messageBody.join('')

  if(order.deliveryLocationId){   
    const deliveryRepo = connection.getRepository(DeliveryLocation)
    const deliveryDetails = await deliveryRepo.findOne({id: order.deliveryLocationId})
    await sendSms(deliveryDetails?.contactPhoneNumber ?? '', body)   
  }

  if(order.pickupLocationId){
    const pickuplocationRepo = connection.getRepository(PickupLocation)
    const pickLocationDetails = await pickuplocationRepo.findOne({id: order.pickupLocationId})
    await sendSms(pickLocationDetails?.contactPhoneNumber ?? '', body) 
  }
  
  const notificationMetadata: NotificationMetadata = {
    orderUuid: order.uuid,
  }
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.SMS]: true,
    [NotificationTransportMode.EMAIL]: true,
  }
  const resConf =  await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
    NotificationMessageTypes.POD_ORDER_CONFIRMATION,
    'Pay on Delivery Order Confirmation', body,
      notificationTransports,  notificationMetadata)

  console.log(`resBuyerCon ${resConf}`)

  //----------
  const domain = Utils.serverDomain()
  const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
  const notificationMetadataSeller: NotificationMetadata = {
    orderUuid: order.uuid,
  }
  const notificationTransportsSeller: NotificationTransports = {
    [NotificationTransportMode.SMS]: true,
    [NotificationTransportMode.EMAIL]: true,
  }
  const resSeller =  await NotificationService.sendSingleNotificationToUserId(order.sellerUserId, order.sellerUser?.uuid,
    NotificationMessageTypes.POD_ORDER_NOTIFCATION,
    'Pay on Delivery Order Notification', `Dear ${order.sellerUser.firstName}, a cash on delivery order has been placed on your product. Please note our Support team will contact you shortly on how to proceed. 
    Click on the link to track your order ${orderTrackLink}. Thanks, CinderBuild`,
    notificationTransportsSeller,  notificationMetadataSeller) 
  
  if(currentUser.role === Roles.AFFILIATE) {
    await notifyAffiliatesBuyerOfNewOrder(currentUser, order)
  }

  return true
}

export const notifyAffiliatesBuyerOfNewOrder = async (affiliateUser: User, order: Order) => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)

  const affiliateFirstName = affiliateUser.firstName
  let affiliateBuyerFirstName = ''
  let affiliateBuyerMsisdn = ''

  if(order.receiverUserId) {
    const affiliateBuyer = await userRepo.findOne(order.receiverUserId)
    if(affiliateBuyer) {
      affiliateBuyerFirstName = affiliateBuyer.firstName
      affiliateBuyerMsisdn = affiliateBuyer.msisdn  
    } else {
      if(order.receiver?.firstName) {
        affiliateBuyerFirstName = order.receiver?.firstName
      } else {
        return
      }
      if(order.receiver?.msisdn) {
        affiliateBuyerMsisdn = order.receiver?.msisdn
      } else {
        return
      }
    }
  } else if(order.receiver) {
    if(order.receiver?.firstName) {
      affiliateBuyerFirstName = order.receiver?.firstName
    }
    if(order.receiver?.msisdn) {
      affiliateBuyerMsisdn = order.receiver?.msisdn
    }
  }

  if(affiliateBuyerFirstName.length && affiliateBuyerMsisdn.length) {
    const messageBody = [
      `Dear ${affiliateBuyerFirstName}.`,
      ` Your cash on delivery order: #${order.referenceNumber} has been created by: ${affiliateFirstName}.`,
      ` Please note you are expected to make payment immediately when your items arrive. Thanks, CinderBuild`
    ]
    const body = messageBody.join('')
    await sendSms(affiliateBuyerMsisdn, body)
  }
}

export const processOrderCreationFromPrepared = async (currentUser: User, 
    requestBody: OrderCreateWithSellerGroupingRequestDto, 
    orderPaymentVariant: OrderPaymentVariant): Promise<Order[]> => {
  let deliveryLocation: DeliveryLocation | undefined;
  const deliveryLocationRepo = getRepository(DeliveryLocation);
  const pickupLocationRepo = getRepository(PickupLocation);
  const productRepo = getRepository(Product);

  const orders: Order[] = []

  if(requestBody.newDeliveryAddress) {
    deliveryLocation = await ensureDeliveryAddress(currentUser, requestBody.newDeliveryAddress)
  } else if(requestBody.deliveryAddressUuid) {
    deliveryLocation = await deliveryLocationRepo.findOne({
      uuid: requestBody.deliveryAddressUuid
    });
  }

  const sellerUserUuids: string[] = []
  const pickupLocationUuids: string[] = []
  const productUuids: string[] = []
  let pickupLocations: PickupLocation[] = []
  let products: Product[] = []

  for(const sellerCartInfo of requestBody.sellers) {
    if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.DELIVERY){
      if(!requestBody.deliveryAddressUuid && !requestBody.newDeliveryAddress ){
        throw new UnprocessableEntityError('A Delivery Order was placed but Delivery Location details was Not Provided')
      }
    }
    if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.PICKUP && !sellerCartInfo.pickupLocationUuid){
      throw new UnprocessableEntityError('A Pick Up Order was placed but Pickup Location was Not Selected.')
    }
    sellerUserUuids.push(sellerCartInfo.userUuid)
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

  if(productUuids.length) {
    products = await productRepo.find({
      where: {
        uuid: In(productUuids),
        isSoftDeleted: false,
      },
      select: ['id', 'uuid', 'name', 'price']
    })
  }

  const cartRepo = getRepository(Cart);
  const cart = await cartRepo.findOne({ userId: currentUser.id });
  const cartItems = cart!.cartItems

  const revenuePercentage = await ConfigPropertyService.getConfigProperty(ConfigProperties.CINDERBUILD_REVENUE_PERCENTAGE)
  const revenuePercentageAsNum = Number(revenuePercentage)

  for(const sellerCartInfo of requestBody.sellers) {
    let pickupLocation: PickupLocation | undefined;
    if(sellerCartInfo) {
      if(sellerCartInfo.orderReceiveType === OrderReceiveTypes.PICKUP && sellerCartInfo.pickupLocationUuid) {
        pickupLocation = pickupLocations.find(pLoc => pLoc.uuid === sellerCartInfo.pickupLocationUuid)
      }

      const preparedCartItems: CartItemJson[] = sellerCartInfo.cartItems.map(sellerCItem => {
        const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === sellerCItem.productUuid)
        return cartItem!
      })
      const warehouseLocation = undefined;
      
      const createdOrders = await createOrders(currentUser, preparedCartItems,
        sellerCartInfo.orderReceiveType, orderPaymentVariant,
        deliveryLocation, pickupLocation, warehouseLocation,  requestBody.differentOrderReceiver
      );
      orders.push(...createdOrders);
    }
  }
  return orders
}

export const prepareOrders = async (cartItems: CartItemJson[]): Promise<OrderPrepareCartItem[]> => {
  const productUuids = cartItems.map(cartItem => cartItem.productUuid)

  const products = await ProductsService.getProductsByUuid(productUuids)
  if (!products.length) {
    throw new NotFoundError('We could not find the products in your cart')
  }
  const nonDeletedProductUuids = products.map(prod => prod.uuid)

  const sellerUserUuids = _.uniq(products.map(product => product.user.uuid))
  const sellerUserIds = _.uniq(products.map(product => product.user.id))
  const sellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(sellerUserIds)

  const sellerUserUuidsToProductUuids: {[sellerUuid:string]: string[]} = {}

  for (const productUuid of nonDeletedProductUuids) {
    const product = products.find(prod => prod.uuid === productUuid)
    const sellerUserUuid = product!.user.uuid
    if(!sellerUserUuidsToProductUuids[sellerUserUuid]) {
      sellerUserUuidsToProductUuids[sellerUserUuid] = []
    }
    sellerUserUuidsToProductUuids[sellerUserUuid].push(productUuid)
  }

  const preparedOrders: OrderPrepareCartItem[] = []

  for (const sellerUserUuid of sellerUserUuids) {
    const sellerProductUuids = _.uniq(sellerUserUuidsToProductUuids[sellerUserUuid])
    const firstProduct = products.find(prod => prod.uuid === sellerProductUuids[0])
    const sellerPublicProfile = sellerPublicProfiles.find(sellerPublicP => sellerPublicP.userUuid === sellerUserUuid)
    const sellerPickupLocations = await firstProduct!.user.pickupLocations
    const activeSellerPickuplocations = sellerPickupLocations.filter((location) => location.isSoftDeleted !== true)

    // @ts-ignore
    const orderPrepareCartItems: CartItem[] = sellerProductUuids.map(spUuid => {
      const cartItem = cartItems.find(itemInCart => itemInCart.productUuid === spUuid)

      return cartItem
    })

    preparedOrders.push({
      sellerProfile: sellerPublicProfile!,
      cartItems: orderPrepareCartItems,
      sellerPickupLocations: _.map(activeSellerPickuplocations, (loc) =>
        _.omit(loc, "id", "user", "userId", "createdAt", "updatedAt", "isSoftDeleted")
      )
    })
  }
  return preparedOrders
}

export const processOrdersPayment = async (orders: Order[], orderPaymentVariant: OrderPaymentVariant,
    currentUser: User): Promise<OrderPayResponseDto> => {
  const connection = await getFreshConnection();
  const userWallet = await WalletService.getCustomerWallet(currentUser.id) 
  
  console.log('Inside Payment for order')
  const createdOrders = orders.map((order) => {
    return { uuid: order.uuid, orderRef: order.referenceNumber}
  })
  const  orderUuids = orders.map(order => order.uuid)
  let orderAmountMajor = 0
  for (const order of orders) {
    orderAmountMajor += order.calculatedTotalCostMajor
  }

   

  if(currentUser.role !== Roles.AFFILIATE) {
    if (orderPaymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY) {
      const existingUnpaidOrders = await buyerUnpaidOrders(currentUser.id, orderUuids)
      if(existingUnpaidOrders.length) {
        throw new UnprocessableEntityError('Please pay for your unpaid orders before creating a new one')
      }

      // if(userWallet.walletBalanceMinor * 100 >= orderAmountMajor ){
      //   console.log('Did we reach here')
      //     await PaymentService.payWithWallet(orders, orderAmountMajor, currentUser)
      //     return {
      //       orders: createdOrders,
      //       orderUuids,
      //       paymentTransactionStatus: PaymentTransactionStatus.PAID
      //     }
      // }

      const deductSuccessful = await deductUpFrontPaymentForPOD(orders, currentUser, orderAmountMajor)
      if(!deductSuccessful) {
        throw new ServerError('There was a server error. Please try again.')
      }
      return {
        orders: createdOrders,
        orderUuids,
        paymentTransactionStatus: PaymentTransactionStatus.UNPAID
      }
    }
  }

  if (orderPaymentVariant === OrderPaymentVariant.WALLET) {
    await PaymentService.payWithWallet(orders, orderAmountMajor, currentUser)
    return {
      orders: createdOrders,
      orderUuids,
      paymentTransactionStatus: PaymentTransactionStatus.PAID
    }
  }
  if(orderPaymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY){
    
 

    const deductSuccessful = await deductUpFrontPaymentForPOD(orders, currentUser, orderAmountMajor)
    if(!deductSuccessful) {
      throw new ServerError('There was a server error. Please try again.')
    }
    return {
      orders: createdOrders,
      orderUuids,
      paymentTransactionStatus: PaymentTransactionStatus.UNPAID
    }
  }

  // TODO: Add new index to account for the paid_status column
  await getRepository(FinancialTransaction)
    .createQueryBuilder()
    .where("metadata->>'orderUuid' IN (:...orderUuids)", {
      orderUuids,
    })
    .andWhere("paid_status = :paidStatus", {
      paidStatus: PaymentTransactionStatus.UNPAID
    })
    .delete()

  const paystackPayingUser: PaystackPayingUser = {
    emailAddress: currentUser.emailAddress,
    fullName: `${currentUser.firstName} ${currentUser.lastName}`
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
    for (const order of orders) {
      const sourceWallet = await WalletService.getCustomerWallet(currentUser.id)
      const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor
  
      const metadata: FinancialTransactionMetadata = {
        orderUuid: order.uuid,
      }
  
      const financialTransaction = new FinancialTransaction().initialize(
        sourceWallet, PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER,
        (order.calculatedTotalCostMajor * 100), walletBalanceMinorBefore, undefined,
        sourceWallet.currency, PaymentTransactionStatus.UNPAID,
        paymentReference, metadata)
      financialTransaction.description = `${sourceWallet.currency}${order.calculatedTotalCostMajor} order payment`
  
      const transactionRepoT = transactionalEntityManager.getRepository(FinancialTransaction)
      const savedTransaction = await transactionRepoT.save(financialTransaction)
  
      const orderRepoT = transactionalEntityManager.getRepository(Order)
      if(order) {
        await orderRepoT.createQueryBuilder()
          .update(Order)
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
    orders: createdOrders,
    orderUuids,
    paymentProviderDetails: {
      paymentReference,
      paymentProviderRedirectUrl,
      accessCode,
      redirectUrlAfterPayment,
    },
    paymentTransactionStatus: PaymentTransactionStatus.UNPAID
  }
}


export const ordersByPaymentReference = async ( paymentReference: string): Promise<Order[]> => {
  const connection = await getFreshConnection();

  // full list of temporary order from the
  const financialRepo = connection.getRepository(FinancialTransaction)
  const orderRepo = connection.getRepository(Order)
 const financialTransactions = await financialRepo.find({
  reference: paymentReference,
  paidStatus: PaymentTransactionStatus.PAID
 })
 
 // const  orderuuids = financialTransactions.map(unPaidTrans => unPaidTrans.metadata?.orderUuid)
  if(!financialTransactions){
    throw new NotFoundError('Order with the Provided Payment reference does not exist')
  }

  // if(financialTransactions.paidStatus !== PaymentTransactionStatus.PAID){
  //   throw new UnprocessableEntityError('Payment for the following reference was not completed.')
  // }

  const financialTransactionUuids = financialTransactions.map(transaction => transaction.uuid )
 
 const actualOrders = await orderRepo.find(
  {
    where: {paymentTransactionUuid: In(financialTransactionUuids)}
  } 
 )
 if(actualOrders.length === 0){
  throw new NotFoundError('Orders with the Provided Payment reference were not Processed.')
 }

 console.log('real orders', actualOrders)
 return actualOrders
}


export const deductUpFrontPaymentForPOD = async (orders: Order[], user: User, totalOrderAmountMajor: number): Promise<boolean> => {
  console.log('inside deduct UpFront Payment For POD ')
  const connection = await getFreshConnection();
  const buyerWallet = await WalletService.getCustomerWallet(user.id)

  const totalOrderAmountMinor = totalOrderAmountMajor * 100
  let walletBalanceMinorBefore = buyerWallet.walletBalanceMinor
  const walletDeductionTransations: FinancialTransaction[] = []

  for (const order of orders) {
    const transactionMetadata: FinancialTransactionMetadata = {
      orderUuid: order.uuid,
    }
    const walletBalanceMinorAfter = walletBalanceMinorBefore - (order.calculatedTotalCostMajor * 100)

    const walletDeductionTransation = new FinancialTransaction().initialize(
      buyerWallet,
      PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW,
      order.calculatedTotalCostMajor * 100,
      walletBalanceMinorBefore,
      walletBalanceMinorAfter,
      buyerWallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      transactionMetadata
    );
    walletDeductionTransation.description = 
      `Wallet balance deduction for Pay On Delivery Order: #${order.referenceNumber}`
  
    walletDeductionTransations.push(walletDeductionTransation)
    walletBalanceMinorBefore = walletBalanceMinorAfter
  }

  const walletBalanceDeductStatus: boolean = await connection.transaction(async (transactionManager) => {
     const financialTransactionRepoT = transactionManager.getRepository(FinancialTransaction)
     const walletRepoT = transactionManager.getRepository(Wallet)

    await financialTransactionRepoT.createQueryBuilder()
      .insert()
      .into(FinancialTransaction)
      .values(walletDeductionTransations)
      .execute()

    await walletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: buyerWallet!.walletBalanceMinor - totalOrderAmountMinor,
      })
      .where({
        userId: user.id,
      })
      .execute()
    
    return true
  })
  if(walletBalanceDeductStatus){
    console.log('update order status to in progress after deduction')
    for (const order of orders) {
      const now = Utils.utcNow()
      const newStatusEntry = {
        status: OrderStatuses.IN_PROGRESS,
        dateTimeInISO8601: now.toISOString()
      }
      order.statusHistory = order.statusHistory || []

      const orderDeliveryLocationRepo = connection.getRepository(Order)
      await orderDeliveryLocationRepo.createQueryBuilder()
        .update(Order)
        .set({
          status: OrderStatuses.IN_PROGRESS,
          statusHistory: [...order.statusHistory, newStatusEntry]  
        })
        .where({
          id: order.id
        })
        .execute()
    }
  }
  return walletBalanceDeductStatus
}

export const revertDeductUpFrontPaymentForPOD = async (order: Order, user: User, transactionManager: EntityManager): Promise<boolean> => {
  console.log('inside revert deduct UpFront Payment For POD ')
  const connection = await getFreshConnection();
  const buyerWallet = await WalletService.getCustomerWallet(user.id)

  if(order.paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY){
    throw new UnprocessableEntityError('Upfront Deduction Revesal is only Available on Pay on Delivery Order.')
  }

  const totalOrderAmountMinor = (order.calculatedTotalCostMajor * 100)
  let walletBalanceMinorBefore = buyerWallet.walletBalanceMinor

  const transactionMetadata: FinancialTransactionMetadata = {
    orderUuid: order.uuid,
  }
  const walletBalanceMinorAfter = walletBalanceMinorBefore + (order.calculatedTotalCostMajor * 100)

  const walletDeductionReversalTransation = new FinancialTransaction().initialize(
    buyerWallet,
    PaymentTransactionTypes.ESCROW_TO_BUYER_WALLET,
    order.calculatedTotalCostMajor * 100,
    walletBalanceMinorBefore,
    walletBalanceMinorAfter,
    buyerWallet.currency,
    PaymentTransactionStatus.PAID,
    undefined,
    transactionMetadata
  );
  walletDeductionReversalTransation.description = 
    `Wallet balance deduction Reversal for Pay On Delivery Order: #${order.referenceNumber}`

  walletBalanceMinorBefore = walletBalanceMinorAfter

  const financialTransactionRepoT = transactionManager.getRepository(FinancialTransaction)
  const walletRepoT = transactionManager.getRepository(Wallet)

  await financialTransactionRepoT.createQueryBuilder()
    .insert()
    .into(FinancialTransaction)
    .values(walletDeductionReversalTransation)
    .execute()

  await walletRepoT.createQueryBuilder()
    .update(Wallet)
    .set({
      walletBalanceMinor: buyerWallet!.walletBalanceMinor + totalOrderAmountMinor,
    })
    .where({
      userId: user.id,
    })
    .execute()

  return true
}

export const ensureDeliveryAddress = async (buyerUser: User, newDeliveryAddress: NewDeliveryAddress): Promise<DeliveryLocation | undefined> => {
  if (!newDeliveryAddress) {
    return undefined
  }
  const { address, country, state, contactFullName, contactPhoneNumber } = newDeliveryAddress
  
  const deliveryLocation = new DeliveryLocation().initialize(buyerUser.id, address,
    country, state, contactFullName ?? '', contactPhoneNumber ?? '');

  return deliveryLocation.save()
}

export const updateOrderStatus = async (order: Order, newOrderStatus: OrderStatuses,
    currentUser: User,): Promise<OrderDetailsResponseDto> => {

  if(order.status === OrderStatuses.CANCELLED_BY_ADMIN){
    throw new UnauthorizedRequestError('You Cannot update an Order that has Been Cancel Admin')
  }

  if(newOrderStatus === OrderStatuses.RECEIVED){
    
    await PriceMatricService.doesPriceMatrixExistForOrder(order);
  }
  const sellerWallet = await WalletService.getCustomerWallet(order.sellerUserId)

  if ([OrderStatuses.IN_PROGRESS, OrderStatuses.AVAILABLE_FOR_PICKUP, OrderStatuses.COMPLETED].includes(newOrderStatus)) {
    if (currentUser.id !== order.sellerUserId) {
      throw new UnauthorizedRequestError('You are not allowed to make that status update')
    }
  }

  if ([OrderStatuses.CONFIRMED, OrderStatuses.ENDED_WITH_DISPUTES].includes(newOrderStatus)) {
    if (currentUser.id !== order.buyerUserId) {
      throw new UnauthorizedRequestError('You are not allowed to make that status update')
    }
  }

  if ([OrderStatuses.COMPLETED].includes(newOrderStatus)) {
    if (order.paymentStatus === OrderPaymentStatuses.BUYER_PAYMENT_PENDING ) {
      if(order.paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY){
      throw new UnprocessableEntityError('The order has not been paid for yet.')
      }
    }
  }

  
  const statusExist = order.statusHistory.map( (item) => item.status).find((item) => item === newOrderStatus)

  if(statusExist){
    throw new UnprocessableEntityError('Order Has Been Updated With The Provided Status')
  }

  await pushNewOrderStatusEntry(order, newOrderStatus)

  if (newOrderStatus === OrderStatuses.ENDED_WITH_DISPUTES) {
    await EscrowService.refundBuyerForOrder(order)
  } else if (newOrderStatus === OrderStatuses.RECEIVED 
    || newOrderStatus === OrderStatuses.CONFIRMED 
    || newOrderStatus === OrderStatuses.CONFIRMED_BY_SYSTEM) {
    await EscrowService.moveFundsFromEscrowToSellerForOrder(order, order.sellerUser, sellerWallet)
  }
  
  if (EndedOrderStatuses.includes(newOrderStatus)) {
    const sellerAccountStats = await AccountStatService.getSellerAccountStats(order.sellerUserId)
    const accountStatRepo = getRepository(SellerAccountStat)
  
    await accountStatRepo.createQueryBuilder()
      .update(SellerAccountStat)
      .set({
        totalPendingOrdersCount: sellerAccountStats.totalPendingOrdersCount - 1,
      })
      .where({ id: sellerAccountStats.id })
      .execute()
  }

  const notificationMetadata: NotificationMetadata = {
    orderUuid: order.uuid,
    newStatusUpdate: newOrderStatus,
    dateTimeInISO8601: Utils.utcNow().toISOString()
  }
  const notificationTitle = Utils.getOrderStatusUpdateTitle(order, newOrderStatus)
  
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.SMS]: true,
    [NotificationTransportMode.EMAIL]: true,
  }

  await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid,
    NotificationMessageTypes.ORDER_PICKUP_OR_DELIVERY_STATUS_UPDATE,
    notificationTitle, '', notificationTransports,  notificationMetadata)
  
  await dispatchOrderNotificationBasedOnStatus(order, newOrderStatus)

  return orderDetails(order);
}

const pushNewOrderStatusEntry = async (order: Order, newOrderStatus: OrderStatuses) => {
  console.log('inside update order status')
  const now = Utils.utcNow()

  const newStatusEntry = {
    status: newOrderStatus,
    dateTimeInISO8601: now.toISOString()
  }
  order.statusHistory = order.statusHistory || []

  const updatedStatusHistory = [...order.statusHistory]

  if(newOrderStatus === OrderStatuses.RECEIVED) { 
    updatedStatusHistory.push(newStatusEntry)
    if(order.paymentStatus === OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER) {
      console.log('confirm status was send here')
      const isConfirmedStatusExisting = order.statusHistory
      .filter((status) => status.status === OrderStatuses.CONFIRMED)
      .length > 0
      if(!isConfirmedStatusExisting) {
        updatedStatusHistory.push({
          status: OrderStatuses.CONFIRMED,
          dateTimeInISO8601: now.toISOString()
        })
        newOrderStatus = OrderStatuses.CONFIRMED  
      }
    }
  } else if(newOrderStatus === OrderStatuses.CONFIRMED) {
    const isReceivedStatusExisting = order.statusHistory
      .filter((status) => status.status === OrderStatuses.RECEIVED)
      .length > 0
    if(!isReceivedStatusExisting) {
      updatedStatusHistory.push({
        status: OrderStatuses.RECEIVED,
        dateTimeInISO8601: now.toISOString()
      })  
    }

    updatedStatusHistory.push({
      status: OrderStatuses.CONFIRMED,
      dateTimeInISO8601: now.toISOString()
    })
  }

  const connection = await getFreshConnection()
  const orderDeliveryLocationRepo = connection.getRepository(Order)
  await orderDeliveryLocationRepo.createQueryBuilder()
    .update(Order)
    .set({
      status: newOrderStatus,
      statusHistory: updatedStatusHistory,
    })
    .where({
      id: order.id
    })
    .execute()
}

export const dispatchOrderNotificationBasedOnStatus = async(orderDetail: Order, statusNotification: OrderStatuses): Promise<boolean> => {
  if(statusNotification === OrderStatuses.AVAILABLE_FOR_PICKUP) {
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
    const notificationTitle = Utils.getOrderStatusUpdateTitle(orderDetail, statusNotification)
    
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.EMAIL]: true
    }
    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_AVAILABLE_FOR_PICKUP,
      notificationTitle, `Your Order with ref #${orderDetail.referenceNumber} is available for pickup. CinderBuild Team.`, 
      notificationTransports,  notificationMetadata)
    return true 
  }

  if(statusNotification === OrderStatuses.AVAILABLE_FOR_DELIVERY) {
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
    const notificationTitle = Utils.getOrderStatusUpdateTitle(orderDetail, statusNotification)

    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.EMAIL]: true
    }
    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_AVAILABLE_FOR_DELIVERY,
      notificationTitle, `Your order with ref #${orderDetail.referenceNumber} is available for delivery`, 
      notificationTransports,  notificationMetadata)
    return true
  }

  if(orderDetail.orderReceiveType === OrderReceiveTypes.PICKUP && statusNotification === OrderStatuses.CONFIRMED){
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
          
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.EMAIL]: true
    }
    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.CONFIRMED_PICKUP,
      'Order Picked Up Confirmed', `Your order with ref #${orderDetail.referenceNumber} has been picked up`, 
      notificationTransports,  notificationMetadata)
    return true
  }
  
  if(orderDetail.orderReceiveType === OrderReceiveTypes.DELIVERY && statusNotification === OrderStatuses.CONFIRMED){
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
      
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.EMAIL]: true
    }
    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.CONFIRMED_DELIVERY,
      'Order Delivery Confirmed', `Your order with ref #${orderDetail.referenceNumber} has been delivered`, 
      notificationTransports,  notificationMetadata)
    
    return true
  }

  if(orderDetail.orderReceiveType === OrderReceiveTypes.DELIVERY && statusNotification === OrderStatuses.CONFIRMED){
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
      
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.SMS]: true
    }
    const formatedDate = Utils.formatDate(orderDetail.updatedAt)
    const smsbody = `Dear ${orderDetail.buyerUser.firstName}, we can confirm that your order #${orderDetail.referenceNumber} has been successfully delivered 
    to you today ${formatedDate} and we will now go ahead to close your transaction. Please note you have 48 hours to raise 
    a dispute if your item has not been delivered. You can do this by either placing a call to +2347001236202 or 
    send an email to support@cinderbuild.com`

    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_DELIVERED,
      'Order Delivered', smsbody, 
      notificationTransports,  notificationMetadata)
    
    return true
    
  }

  if(orderDetail.orderReceiveType === OrderReceiveTypes.PICKUP && statusNotification === OrderStatuses.CONFIRMED){
    const notificationMetadata: NotificationMetadata = {
      orderUuid: orderDetail.uuid,
      newStatusUpdate: statusNotification,
    }
      
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.SMS]: true
    }
    const formatedDate = Utils.formatDate(orderDetail.updatedAt)

    const smsbody = `Dear ${orderDetail.buyerUser.firstName}, we can confirm that your order #${orderDetail.referenceNumber} has been picked up 
    today at ${formatedDate} and we will now go ahead to close your transaction. Please note you have 48 hours to raise 
    a dispute if your item has not been delivered. You can do this by either placing a call to +2347001236202 or 
    send an email to support@cinderbuild.com`

    await NotificationService.sendSingleNotificationToUserId(orderDetail.buyerUserId, orderDetail.buyerUser?.uuid,
      NotificationMessageTypes.ORDER_PICKED_UP,
      'Order Picked Up', smsbody, 
      notificationTransports,  notificationMetadata)
    
    return true
  }
  return true
}

export const affiliateUnpaidOrder = async (currentUser: User): Promise<boolean> =>{

  const connection = await getFreshConnection()
  const orderRepo = connection.getRepository(Order)
  const unpaidOrderByAffiliate = await orderRepo.find({
    where: {
      buyerUserId: currentUser.id,
      paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
    },
  })
  if(unpaidOrderByAffiliate.length){
    throw new UnprocessableEntityError(
      "Pay for All Unpaid Orders Before Placing a Withdrawal Request"
    ); 
  }

  return true

}

export const vaidateOrderCancellation = async (currentUser: User, order: Order): Promise<boolean> => {
  if (
    currentUser.id === order.buyerUserId &&
    order.status === OrderStatuses.CANCELLED_BY_BUYER
  ) {
    throw new UnprocessableEntityError("Order is already cancelled by buyer");
  }
  if (
    currentUser.id === order.sellerUserId &&
    order.status === OrderStatuses.CANCELLED_BY_SELLER
  ) {
    throw new UnprocessableEntityError(
      "Order is already cancelled by seller"
    );
  }

  if (order.status === OrderStatuses.AVAILABLE_FOR_PICKUP) {
    throw new UnprocessableEntityError("The order is already available for pickup.");
  }
  if (order.orderReceiveType === OrderReceiveTypes.DELIVERY) {
    if (currentUser.id === order.buyerUserId && order.status === OrderStatuses.IN_PROGRESS) {
      throw new UnprocessableEntityError("Sorry, you cannot cancel a delivery order that is already in progress");        
    }
  }

  if (EndedOrderStatuses.includes(order.status)) {
    throw new UnprocessableEntityError("Order has already ended");
  }

  return true
}

export const processOrderCancellation = async (currentUser: User, order: Order): Promise<boolean> => {
  const connection = await getFreshConnection()

  const cancelStatus =
    currentUser.id === order.buyerUserId
      ? OrderStatuses.CANCELLED_BY_BUYER
      : OrderStatuses.CANCELLED_BY_SELLER;

  order.statusHistory.push({
    status: cancelStatus,
    dateTimeInISO8601: Utils.utcNow().toISOString(),
  });

  const updateQuery: any = {
    status: cancelStatus,
    statusHistory: order.statusHistory,
  };

  const allDone: boolean = await connection.transaction(async transactionalEntityManager => {
    const orderRepoT = transactionalEntityManager.getRepository(Order)

    await orderRepoT
      .createQueryBuilder()
      .update(Order)
      .set(updateQuery)
      .where({
        id: order.id,
      })
      .execute();
    
    if (order.paymentStatus === OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW) {
      const refundResult = await PaymentService.processOrderRefundToBuyer(order, transactionalEntityManager)
      return refundResult
    }

    return true
  })

  if (allDone) {
    const notificationMetadata = {
      orderUuid: order.uuid,
    }

    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.SMS]: true,
    }

    if (order.paymentStatus === OrderPaymentStatuses.BUYER_PAYMENT_REFUND) {
      const buyerRefundMsg = `Order: #${order.referenceNumber} has been cancelled. 
      Your refund has been processed and should be visible in your wallet balance.`
      await NotificationService.sendSingleNotificationToUserId(order.buyerUserId, order.buyerUser?.uuid, 
        NotificationMessageTypes.ORDER_REFUND_TO_BUYER, 
        'Order refund', buyerRefundMsg, notificationTransports, notificationMetadata)
    }

    if (currentUser.id === order.buyerUserId) {// Means it is only possible for pickup orders before available for pickup.
      await NotificationService.sendSingleNotificationToUserId(order.sellerUserId, order.sellerUser?.uuid, 
        NotificationMessageTypes.ORDER_CANCELLED_BY_BUYER,
        'Order cancellation', `Order: #${order.referenceNumber} has been cancelled by the buyer. CinderBuild Team.`, notificationTransports,
        notificationMetadata)
    }
  }

  return allDone
}

export const submitOrderRating = async (currentUser: User, order: Order, rating: number) => {
  const orderRatingUpdateObject: any = {}
  if(order.buyerUserId === currentUser.id) {
    orderRatingUpdateObject.ratingFromBuyer = rating
  }
  if(order.sellerUserId === currentUser.id) {
    orderRatingUpdateObject.ratingFromSeller = rating
  }

  const connection = await getFreshConnection()

  const orderRepo = connection.getRepository(Order)
  const userRepo = connection.getRepository(User)

  await orderRepo.createQueryBuilder()
    .update(Order)
    .set(orderRatingUpdateObject)
    .where({
      id: order.id
    })
    .execute()

  await userRepo.createQueryBuilder()
    .update(User)
    .set({
      totalRatingsValue: () => `total_ratings_value + ${rating}`,
      totalNumberOfRatings: () => "total_number_of_ratings + 1",
    })
    .where({
      id: (order.buyerUserId === currentUser.id) ? order.sellerUserId : order.buyerUserId
    })
    .execute()
  
  return true
}

export const buyerUnpaidOrders = async (buyerUserId: number, exclusionOrderUuids: string[]): Promise<Order[]> => {
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order);

  const query: any = {
    buyerUserId,

    paymentVariant: OrderPaymentVariant.PAY_ON_DELIVERY,
    status: Not(In([
      OrderStatuses.COMPLETED, OrderStatuses.CONFIRMED, OrderStatuses.ENDED_WITH_DISPUTES, OrderStatuses.RECEIVED,
      OrderStatuses.AVAILABLE_FOR_DELIVERY, OrderStatuses.AVAILABLE_FOR_PICKUP,
      OrderStatuses.CANCELLED_BY_BUYER, OrderStatuses.CANCELLED_BY_SELLER, OrderStatuses.CANCELLED_BY_ADMIN,
    ])),
    paymentStatus: (In([OrderPaymentStatuses.BUYER_PAYMENT_PENDING, OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER])),    
  }

  if(exclusionOrderUuids.length) {
    query.uuid = Not(In(exclusionOrderUuids))
  }

  const existingUnpaidOrders = await orderRepo.find(query)

  return existingUnpaidOrders
}

export const orderDetails = async (order: Order): Promise<OrderDetailsResponseDto> => {
  const connection = await getFreshConnection();
  const userRepo = connection.getRepository(User);

  const orderUsers = await userRepo.find({
    id: In([order.buyerUserId, order.sellerUserId]),
  })
  const buyerUser = orderUsers.find(oUser => oUser.id === order.buyerUserId)
  const sellerUser = orderUsers.find(oUser => oUser.id === order.sellerUserId)

  const buyerPublicProfile = await ProfileService.getPublicProfile(buyerUser!)
  const sellerPublicProfile = await ProfileService.getPublicProfile(sellerUser!)

  const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
  const pickupLocationRepo = connection.getRepository(PickupLocation);
  const wareHouseRepo = connection.getRepository(WareHouse)

  let deliveryLocation: DeliveryLocation | undefined;
  if(order.deliveryLocationId) {
    deliveryLocation = await deliveryLocationRepo.findOne({
      id: order.deliveryLocationId
    });  
  }

  let pickupLocation: PickupLocation | undefined;
  if(order.pickupLocationId) {
    pickupLocation = await pickupLocationRepo.findOne({
      id: order.pickupLocationId
    });
  }

  let wareHouseLocation: WareHouse | undefined;
  if(order.warehouseId) {
    wareHouseLocation = await wareHouseRepo.findOne({
      id: order.warehouseId
    });
  }

  const orderItemProductIds = order.orderItems.map(oItem => oItem.productId);
  const productRepo = getRepository(Product);
  const products = await productRepo.find({
    id: In(orderItemProductIds),
  })

  const newOrderDetailsResponseDto: OrderDetailsResponseDto = order.toResponseDto(products,
    sellerPublicProfile, buyerPublicProfile, deliveryLocation, pickupLocation, wareHouseLocation)
  
  return newOrderDetailsResponseDto;
}

export const changeOrderTotalByAdmnin = async (order: Order,  newOrderAmountMajor: number, changeReason: string): Promise<boolean> => {
  const connection = await getFreshConnection();

  const buyerwallet = await WalletService.getCustomerWallet(order.buyerUserId)

  const orderTotalDifferenceMinor = (Utils.normalizeMoney(order.calculatedTotalCostMajor - newOrderAmountMajor) * 100)

  const buyerWalletBalanceAfterMinor = buyerwallet.walletBalanceMinor + orderTotalDifferenceMinor

  const changeOrderAmount: boolean = await connection.transaction(async (transactionalEntityManager) => {
    const orderRepoT = transactionalEntityManager.getRepository(Order)
    const walletRepoT = transactionalEntityManager.getRepository(Wallet)
    const financialRepoT = transactionalEntityManager.getRepository(FinancialTransaction)

    await orderRepoT.createQueryBuilder()
      .update(Order)
      .set({
        calculatedTotalCostMajor: newOrderAmountMajor,
        adminOrderTotalOverride: {
          newAmountMajor: newOrderAmountMajor,
          reason: changeReason,
        }
      })
      .where({ uuid: order.uuid })
      .execute()

    await walletRepoT.createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: buyerWalletBalanceAfterMinor
      })
      .where({ userId: buyerwallet.userId })
      .execute()
    
    const newFinancialTransaction = new FinancialTransaction().initialize(
      buyerwallet,
      PaymentTransactionTypes.ESCROW_TO_BUYER_WALLET,
      orderTotalDifferenceMinor,
      buyerwallet.walletBalanceMinor,
      buyerWalletBalanceAfterMinor,
      buyerwallet.currency,
      PaymentTransactionStatus.PAID,
      undefined,
      {
        orderUuid: order.uuid,
      }
    );
    newFinancialTransaction.description = changeReason

    await financialRepoT.save(newFinancialTransaction);

    return true
  })

  return changeOrderAmount
}


export const closeQuoteRequest = async (quoteRequest: QuoteRequest): Promise<boolean> => {
  const connection = await getFreshConnection();
  const quoteRequestRepo = connection.getRepository(QuoteRequest)

  const now = Utils.utcNow()

  quoteRequest.statusHistory.push({
    status: QuoteRequestStatuses.ORDER_CREATED,
    dateTimeInISO8601: now.toISOString()
  })

  await quoteRequestRepo
    .createQueryBuilder()
    .update(QuoteRequest)
    .set({ status: QuoteRequestStatuses.ORDER_CREATED,
       statusHistory: quoteRequest.statusHistory, })
    .where({ id: quoteRequest.id })
    .execute();

  return true

}

export const userLastOrderItems = async (currentUser: User): Promise<CartItemJson[]> => {
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order)
  let lastOrderItems: CartItemJson[] | PromiseLike<CartItemJson[]> = []
  const recentOrder = await orderRepo.find({
    where: { buyerUserId: currentUser.id,
      paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER
    },
    order: { id: 'DESC' },
  })
  if(!recentOrder || !recentOrder[0]){
    return lastOrderItems
  }

  lastOrderItems = recentOrder[0].orderItems;
  return lastOrderItems
}


export const updateOrderWithPriceMatrixDetails = async (priceMatrix: PriceMatrix): Promise<boolean> => {
  
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order)
  const orderDetail = await orderRepo.findOne({
    where: { id: priceMatrix.orderId }
  })

  if(!orderDetail){
    return false
  }

  await orderRepo
  .createQueryBuilder()
  .update(Order)
  .set({ priceMatrixId: priceMatrix.id, sellerHasChange: true})
  .where({ id: orderDetail.id })
  .execute();


  return true;
}

export const closeCstoreUserPreviousOrder = async (orderId: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order)

  const now = Utils.utcNow()

  const orderDetail = await orderRepo.findOne({
    where: { id: orderId }
  })

  if(!orderDetail){
    return false;
  }
  
  if(orderDetail.status === OrderStatuses.IN_PROGRESS){
    orderDetail.statusHistory.push({
      status: OrderStatuses.CONFIRMED,
      dateTimeInISO8601: now.toISOString()
    })

    orderDetail.paymentStatusHistory.push({
      status: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
      dateTimeInISO8601: now.toISOString()
    })
    await orderRepo
  .createQueryBuilder()
  .update(Order)
  .set({ 
    status: OrderStatuses.CONFIRMED,
    statusHistory: orderDetail.statusHistory,
    paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
    paymentStatusHistory: orderDetail.paymentStatusHistory,
  })
  .where({ id: orderDetail.id })
  .execute();
  return true;  
}
  return true;

}

export const cStoreLastPreviousOrder = async (userId: number): Promise<Order | any > => {
  const connection = await getFreshConnection();
  const orderRepo = connection.getRepository(Order)
  const buyerOrders = await orderRepo.find({
    where: { buyerUserId: userId}
  }) 
  if(!buyerOrders){
    return false;
  }

  return buyerOrders[0];

}
