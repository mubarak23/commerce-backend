/* eslint-disable no-await-in-loop */
import { Body, Controller, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from "tsoa";
import * as _ from "underscore";

import { getRepository, In, Not } from "typeorm";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { NewOrderCreateRequestDto } from "../dto/NewOrderCreateRequestDto";
import { OrderCreateWithSellerGroupingRequestDto } from '../dto/OrderCreateWithSellerGroupingRequestDto';
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrderDisputeRequestDto } from "../dto/OrderDisputeRequestDto";
import { OrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { OrderReviewRequestDto } from "../dto/OrderReviewRequestDto";
import { Cart } from "../entity/Cart";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { Order } from '../entity/Order';
import { PickupLocation } from '../entity/PickupLocation';
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { QuoteRequest } from "../entity/QuoteRequest";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import { CurrencyToSymbol } from "../enums/Currency";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { Roles } from "../enums/Roles";
import { SortOrder } from "../enums/SortOrder";
import OrderStatuses, { EndedOrderStatuses, OrderPaymentStatuses, OrderPaymentStatusesDto, OrderPaymentVariantDto, OrderStatusesDto, QuoteRequestStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OrderPrepareCartItem } from '../interfaces/OrderPrepareCartItem';
import { Persona } from "../interfaces/Persona";
import * as CooperateService from "../services/cooperateService";
import * as NotificationService from "../services/notificationService";
import * as OrderService from '../services/orderService';
import * as PaginationService from "../services/paginationService";
import * as PriceMatrixService from "../services/priceMatrixService";
import * as ProfileService from "../services/profileService";
import * as Utils from "../utils/core";
import { BadRequestError, NotFoundError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";

// DO NOT EXPORT DEFAULT

@Route("api/orders")
@Tags("Orders")
@Security("jwt")
export class OrdersController extends Controller {

  private async ensureWareHouseExistsForWareHouseOrder(
    currentUser: User, wareHouseUuid: string
  ): Promise<WareHouse> {
    if(!wareHouseUuid){
      throw new UnprocessableEntityError('A warehouse order was placed but a warehouse was not selected')
    }
    const wareHouseRepo = getRepository(WareHouse);
    const wareHouse =  await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId,
    })
    if(!wareHouse) {
      throw new UnprocessableEntityError('An invalid warehouse was specified')
    }
    return wareHouse
  }


  @Get("/lastorderitems")
  public async handleLastOrderItems(@Request() req: any): Promise<IServerResponse<CartItemJson[]>> {
    const currentUser: User = req.user;

    const recentOrderItems = await OrderService.userLastOrderItems(currentUser)

    const resData: IServerResponse<CartItemJson[]> = {
      status: true,
      data: recentOrderItems
    };

    return resData;
  }

  @Get("/:orderUuid")
  public async orderDetails(@Request() req: any, @Path("orderUuid") orderUuid: string): Promise<IServerResponse<OrderDetailsResponseDto>> {
    const currentuser: User = req.user;

    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    const order = await orderRepo.findOne({ uuid: orderUuid });

    if (!order) {
      throw new NotFoundError("Order was not found");
    }

    if (order.buyerUserId !== currentuser.id && order.sellerUserId !== currentuser.id) {
      throw new UnprocessableEntityError("You are not allowed to view the order's details");
    }

    const fullOrderDetails = await OrderService.orderDetails(order);

    const resData: IServerResponse<OrderDetailsResponseDto> = {
      status: true,
      data: fullOrderDetails,
    };
    return resData;
  }

  @Post("/create/fromcart/:orderPaymentVariant")
  public async handleOrderCreationFromCart(
    @Request() req: any,
    @Path() orderPaymentVariant: OrderPaymentVariant,
    @Body() requestBody: NewOrderCreateRequestDto
  ): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user;

    if (requestBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {
      if (!requestBody.newDeliveryAddress && !requestBody.deliveryAddressUuid) {
        throw new BadRequestError('A delivery order requires delivery information')
      }
    } 

    if (requestBody.orderReceiveType === OrderReceiveTypes.PICKUP) {
      if (!requestBody.locationUuid) {
        throw new BadRequestError('A Pickup order requires Pickup location information')
      }
    } 
    

    const connection = await getFreshConnection();

    const cartRepo = connection.getRepository(Cart);
    const cart = await cartRepo.findOne({ userId: currentUser.id });
    if (!cart) {
      throw new NotFoundError("Cart empty");
    }
    const { cartItems } = cart;
    if (!cartItems || !cartItems.length) {
      throw new NotFoundError("Cart empty");
    }

   
    let deliveryLocation: DeliveryLocation | undefined;
    let pickupLocation: PickupLocation | undefined;
    let wareHouse: WareHouse | undefined;
    const deliveryLocationRepo = getRepository(DeliveryLocation);
    const pickupLocationRepo = getRepository(PickupLocation);

    if(requestBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {
      if(requestBody.newDeliveryAddress) {
        deliveryLocation = await OrderService.ensureDeliveryAddress(currentUser, requestBody.newDeliveryAddress)
      } else if(requestBody.deliveryAddressUuid) {
        deliveryLocation = await deliveryLocationRepo.findOne({
          uuid: requestBody.deliveryAddressUuid
        });
      }
    } else {
      pickupLocation = await pickupLocationRepo.findOne({
        uuid: requestBody.locationUuid!
      });
    }

    if (requestBody.orderReceiveType === OrderReceiveTypes.WARE_HOUSE) {
      if (!requestBody.wareHouseUuid) {
        throw new BadRequestError('A WareHouse order requires warehouse information')
      }
      wareHouse = await this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid!)
    }

    
    const createdOrders = await OrderService.createOrders(currentUser, cart.cartItems,
      requestBody.orderReceiveType, orderPaymentVariant, deliveryLocation, pickupLocation,
      wareHouse, requestBody.differentOrderReceiver,
    );

    const orderPayResponse = await OrderService.processOrdersPayment(
      createdOrders,
      orderPaymentVariant,
      currentUser
    );

    await cartRepo.createQueryBuilder()
      .update(Cart)
      .set({ cartItems: [] })
      .where({ id: cart.id })
      .execute();

    await NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, [])

    const resData: IServerResponse<OrderPayResponseDto> = {
      status: true,
      data: orderPayResponse,
    };
    return resData;
  }

  @Get("/prepare/fromcart")
  public async handleOrderPreparationFromCart(@Request() req: any): Promise<IServerResponse<OrderPrepareCartItem[]>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const cartRepo = connection.getRepository(Cart);
    const cart = await cartRepo.findOne({ userId: currentUser.id });
    if (!cart) {
      throw new NotFoundError("Cart empty");
    }
    const { cartItems } = cart;
    if (!cartItems || !cartItems.length) {
      throw new NotFoundError("Cart empty");
    }

    const preparedOrders = await OrderService.prepareOrders(cart.cartItems);

    const resData: IServerResponse<OrderPrepareCartItem[]> = {
      status: true,
      data: preparedOrders,
    };
    return resData;
  }

  @Post("/create/frompreparedcart/:orderPaymentVariant")
  public async handleOrderCreationFromPreparedCart(@Request() req: any,
    @Path() orderPaymentVariant: OrderPaymentVariant,
    @Body() requestBody: OrderCreateWithSellerGroupingRequestDto
  ): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)

    if(currentUser.role !== Roles.AFFILIATE) {
      const existingUnpaidOrders = await orderRepo.find({
        buyerUserId: currentUser.id,
        status: Not(In([
          OrderStatuses.COMPLETED, OrderStatuses.CONFIRMED, OrderStatuses.ENDED_WITH_DISPUTES,
          OrderStatuses.CANCELLED_BY_BUYER, OrderStatuses.CANCELLED_BY_SELLER, OrderStatuses.CANCELLED_BY_ADMIN,
        ])),
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
      })
      if(existingUnpaidOrders.length) {
        throw new UnprocessableEntityError('Please pay for your unpaid orders before creating a new one')
      }
    }

    const isWareHouseOrder = requestBody.sellers.find(
      aSeller => aSeller.orderReceiveType === OrderReceiveTypes.WARE_HOUSE
    )
    if(isWareHouseOrder) {
      await this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid!)
    }
    
    if(isWareHouseOrder && orderPaymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY) {
      throw new UnprocessableEntityError('Warehouse orders require immediate payment to proceed')
    }


    const createdOrders = await OrderService.processOrderCreationFromPrepared(currentUser, 
      requestBody, orderPaymentVariant);  
    const orderPayResponse = await OrderService.processOrdersPayment(
      createdOrders,
      orderPaymentVariant,
      currentUser
    );

    if(orderPayResponse.orderUuids?.length) {
      const cartRepo = getRepository(Cart);
      const cart = await cartRepo.findOne({ userId: currentUser.id });

      await cartRepo
        .createQueryBuilder()
        .update(Cart)
        .set({ cartItems: [] })
        .where({ id: cart!.id })
        .execute();
      
      await NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, [])
    }

    if(isWareHouseOrder) {
      const wareHouse = await this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid!)
      await CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouse)
    }

    const resData: IServerResponse<OrderPayResponseDto> = {
      status: true,
      data: orderPayResponse,
    };

    return resData;
  }

  //----------

  // Makes it possible to "Buy Now" when the user is looking at the seller's quote response
  @Post("/create/fromquoterequest/:quoteRequestUuid/:orderPaymentVariant")
  public async handleOrderCreationFromQuoteRequest(
    @Request() req: any,
    @Path("quoteRequestUuid") quoteRequestUuid: string,
    @Path() orderPaymentVariant: OrderPaymentVariant,
    @Body() requestBody: NewOrderCreateRequestDto
  ): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user;

    if (requestBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {
      if (!requestBody.newDeliveryAddress && !requestBody.deliveryAddressUuid) {
        throw new BadRequestError('A delivery order requires delivery information')
      }
    }

    if (requestBody.orderReceiveType === OrderReceiveTypes.PICKUP) {
      if (!requestBody.locationUuid) {
        throw new BadRequestError('A Pickup order requires pickup information')
      }
    }

    if (requestBody.orderReceiveType === OrderReceiveTypes.WARE_HOUSE) {
      if (!requestBody.wareHouseUuid) {
        throw new BadRequestError('A WareHouse order requires warehouse information')
      }
    }
    // if (currentUser.settings.isOnCStore !== true){
    if(currentUser.role !== Roles.AFFILIATE){
      
      const existingUnpaidOrders = await OrderService.buyerUnpaidOrders(currentUser.id, [])

      if(existingUnpaidOrders.length) {
        throw new UnprocessableEntityError('Please pay for your unpaid orders before creating a new Order from Quote Request')
      }

    }
  // }
  // let cStoreUserLastPreviousOrder;
  // if(currentUser.settings.isOnCStore === true){
  //   await WalletService.cstoreUserWalletbalance(currentUser.id)
  //   cStoreUserLastPreviousOrder = await OrderService.cStoreLastPreviousOrder(currentUser.id)
  // }

    const isWareHouseOrder = requestBody.orderReceiveType === OrderReceiveTypes.WARE_HOUSE
    
    const connection = await getFreshConnection();

    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        product: "quoteRequest.product",
      },
    };

    const quoteRequestRepo = connection.getRepository(QuoteRequest);
    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        uuid: quoteRequestUuid,
        userId: currentUser.id
      },
      join,
    });
    
    if(quoteRequest!.status === QuoteRequestStatuses.ORDER_CREATED ){
      throw new UnprocessableEntityError(
        'The Qoute Request has Already Been Used to Create an Order, Please Place Another Qoute Request'
      );
    }

    if (!quoteRequest) {
      throw new NotFoundError("The specified quote request could not be found");
    }
    if (!quoteRequest.sellerResponse) {
      // probably send a reminder to the seller to respond
      throw new UnprocessableEntityError(
        "The seller has not responsed to the quote request yet."
      );
    }
   
    let deliveryLocation: DeliveryLocation | undefined;
    let wareHouse: WareHouse | undefined;
    let pickupLocation: PickupLocation | undefined;
    const deliveryLocationRepo = getRepository(DeliveryLocation);
    const pickupLocationRepo = getRepository(PickupLocation);

    if(requestBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {
      if(requestBody.newDeliveryAddress) {
        deliveryLocation = await OrderService.ensureDeliveryAddress(currentUser, requestBody.newDeliveryAddress)
      } else if(requestBody.deliveryAddressUuid) {
        deliveryLocation = await deliveryLocationRepo.findOne({
          uuid: requestBody.deliveryAddressUuid
        });
        if(!deliveryLocation){
          throw new UnprocessableEntityError("Delivery Address Selected does not exist");
        }
      }
    } else if(requestBody.orderReceiveType === OrderReceiveTypes.PICKUP) {
      pickupLocation = await pickupLocationRepo.findOne({
        uuid: requestBody.locationUuid!
      });
     

      if(!pickupLocation){
        throw new UnprocessableEntityError("Pickup location Selected does not exist");
      }
    } else if(requestBody.orderReceiveType === OrderReceiveTypes.WARE_HOUSE){
       wareHouse = await this.ensureWareHouseExistsForWareHouseOrder(currentUser, requestBody.wareHouseUuid!)
    }

    const orderItem: CartItemJson = {
      productId: quoteRequest.product.id,
      productUuid: quoteRequest.product.uuid,
      productName: quoteRequest.product.name,
      quantity: quoteRequest.quantity,
      unitPrice: quoteRequest.sellerResponse.unitPrice,
      unitPriceForBuyer: quoteRequest.sellerResponse.unitPriceForBuyer,
      quoteRequest: {
        uuid: quoteRequest.uuid,
        unitPrice: quoteRequest.sellerResponse.unitPrice,
        unitPriceForBuyer: quoteRequest.sellerResponse.unitPriceForBuyer,
        deliveryFee: quoteRequest.sellerResponse?.deliveryFee ?? 0,
        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
      },
    };

    const createdOrders = await OrderService.createOrders(currentUser, [orderItem], 
      requestBody.orderReceiveType, orderPaymentVariant,
      deliveryLocation, pickupLocation, wareHouse, requestBody.differentOrderReceiver,
    );
    
    await OrderService.closeQuoteRequest(quoteRequest)

    const orderPayResponse = await OrderService.processOrdersPayment(
      createdOrders,
      orderPaymentVariant,
      currentUser
    );
      // createdOrders[0].referenceNumber

     if(isWareHouseOrder) {
      await CooperateService.processOrdertoWareHouse(currentUser, createdOrders, wareHouse!)
    } 
    // update price matrix when an order is place.
    await PriceMatrixService.updatePriceMatrixWithOrderDetails(createdOrders[0].id, createdOrders[0].referenceNumber, quoteRequest.referenceNumber)
    const resData: IServerResponse<OrderPayResponseDto> = {
      status: true,
      data: orderPayResponse,
    };

    // if(currentUser.settings.isOnCStore === true){
    //   if(cStoreUserLastPreviousOrder !== false){
    //     await OrderService.closeCstoreUserPreviousOrder(cStoreUserLastPreviousOrder);
    //   }
    // }
    return resData;
  }

  @Put("/:orderUuid/statusupdate/:newOrderStatus")
  public async handleOrderConfirmation(
    @Request() req: any,
    @Path("orderUuid") orderUuid: string,
    @Path("newOrderStatus") newOrderStatus: OrderStatuses
  ): Promise<IServerResponse<OrderDetailsResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    };

    const order = await orderRepo.findOne({
      where: {
        uuid: orderUuid
      },
      join,
    });
    if (!order) {
      throw new NotFoundError("Order was not found");
    }

    if (order.paymentStatus === OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
      if(order.paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY){
        throw new UnprocessableEntityError('Order has not been paid yet')
        }    
    }
    if (EndedOrderStatuses.includes(order.status)) {
      throw new UnprocessableEntityError("The order has ended");
    }

    const currentOrderDetails = await OrderService.updateOrderStatus(
      order,
      newOrderStatus,
      currentUser
    );

    const resData: IServerResponse<OrderDetailsResponseDto> = {
      status: true,
      data: currentOrderDetails,
    };

    return resData;
  }

  @Get("/:orderUuid/cancel")
  public async handleOrderCancellation(@Request() req: any, @Path("orderUuid") orderUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    };

    const order = await orderRepo.findOne({
      where: {
        uuid: orderUuid
      },
      join,
    });

    if (!order) {
      throw new NotFoundError("Order was not found");
    }

    await OrderService.vaidateOrderCancellation(currentUser, order)

    const cancelResult: boolean = await OrderService.processOrderCancellation(currentUser, order)

    const resData: IServerResponse<void> = {
      status: cancelResult,
    };

    return resData;
  }

  @Post("/:orderUuid/review")
  public async reviewOrder(
    @Request() req: any,
    @Body() reqBody: OrderReviewRequestDto,
    @Path("orderUuid") orderUuid: string
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const { reviewNote, rating } = reqBody;

    if (_.isUndefined(reviewNote)) {
      throw new BadRequestError(`Please type in a review.`);
    }
    //--
    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    const order = await orderRepo.findOne({ uuid: orderUuid });

    if (!order) {
      throw new NotFoundError("Order was not found");
    }
    //--
    if (![order.buyerUserId, order.sellerUserId].includes(currentUser.id)) {
      throw new UnauthorizedRequestError("You cannot rate this order");
    }

    const ratingUpdateGood = await OrderService.submitOrderRating(
      currentUser,
      order,
      rating
    );

    if (![order.buyerUserId].includes(currentUser.id)) {
      throw new UnauthorizedRequestError("You cannot review this order");
    }

    const updateResult = await orderRepo
      .createQueryBuilder()
      .update(Order)
      .set({
        buyerReviewText: reviewNote,
        buyerReviewSubmittedAt: Utils.utcNow(),
      })
      .where({ id: order.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Post("/:orderUuid/dispute")
  public async disputeOrder(
    @Request() req: any,
    @Body() reqBody: OrderDisputeRequestDto,
    @Path("orderUuid") orderUuid: string
  ): Promise<IServerResponse<void>> {
    const { disputeType, disputeText } = reqBody;
    const currentUser: User = req.user;

    if (_.isUndefined(disputeText)) {
      throw new BadRequestError(`Please type details of the dispute.`);
    }
    //--
    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    const order = await orderRepo.findOne({ uuid: orderUuid });

    if (!order) {
      throw new NotFoundError("Order was not found");
    }
    if (![order.buyerUserId].includes(currentUser.id)) {
      throw new UnauthorizedRequestError("You cannot review this order");
    }

    const updateResult = await orderRepo
      .createQueryBuilder()
      .update(Order)
      .set({
        disputeType,
        disputeText,
        disputeTextSubmittedAt: Utils.utcNow(),
      })
      .where({ id: order.id })
      .execute();

    // EmailService.sendOrderDisputeToFinance(currentUser, disputeType, disputeText, order)

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get("")
  public async handleGetMyOrders(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("persona") persona: Persona,
    @Query("status") orderStatus: OrderStatusesDto,
    @Query("paymentStatus") orderPaymentStatus?: OrderPaymentStatusesDto | null,
    @Query("paymentVariant") orderPaymentVariant?: OrderPaymentVariantDto | null,
    @Query("procInvoiceUuid") procInvoiceUuid?: string | null,
  ): Promise<IServerResponse<IPaginatedList<OrderDetailsResponseDto>>> {
    const currentUser: User = req.user;
    
    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    //--
    let query: any = {}
    if (persona === Persona.BUYER) {
      query = { buyerUserId: currentUser.id };
    } else if (persona === Persona.SELLER) {
      query = { sellerUserId: currentUser.id };
    }
    if (orderStatus && orderStatus !== OrderStatusesDto.ALL) {
      query.status = orderStatus
    }
    if (orderPaymentStatus && orderPaymentStatus !== OrderPaymentStatusesDto.ALL) {
      query.paymentStatus = orderPaymentStatus
    }
    if (orderPaymentVariant && orderPaymentVariant !== OrderPaymentVariantDto.ALL) {
      query.paymentVariant = orderPaymentVariant
    }
    if (procInvoiceUuid) {
      const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
      const procurementInvoice = await procurementInvoiceRepo.findOne({ 
        where: { uuid: procInvoiceUuid }
      })
      if(!procurementInvoice) {
        throw new UnprocessableEntityError('The specified procurement invoice does not exist')
      }
      query.buyerAccountId = currentUser.accountId
      query.procurementInvoiceUuid = procInvoiceUuid
    }
    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    }
    //--
    const pageSize = 10
    const totalCount = await orderRepo.count(query);

    const orderListsPages = await PaginationService.paginate(Order,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<Order>
    
    const orderLists: Order[] = orderListsPages.dataset;
    const buyerUserIds: number[] = orderLists.map(order => order.buyerUserId);
    const sellerUserIds: number[] = orderLists.map(order => order.sellerUserId)
    const allUserIds = _.uniq(_.flatten([...buyerUserIds, ...sellerUserIds]))
    
    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
    // await ProfileService.getPublicProfileFromUserIds(allUserIds)
    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;

    // @ts-ignore
    const transformedOrderListsDataset: OrderDetailsResponseDto[] = orderLists.map(order => {
      const buyerPublicProfile = userPublicProfiles.find(publicProfile =>
        publicProfile.userUuid === order.buyerUser.uuid)
      const sellerPublicProfile = userPublicProfiles.find(publicProfile =>
        publicProfile.userUuid === order.sellerUser.uuid)
      
      const currencySymbol = CurrencyEnum[order.currency] || "₦";

      return {
        orderUuid: order.uuid,
        orderItems: order.orderItems,
        referenceNumber: order.referenceNumber,
        sellerPublicProfile,
        buyerPublicProfile,
        orderReceiveType: order.orderReceiveType,

        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentVariant: order.paymentVariant,
        statusHistory: order.statusHistory,
        paymentStatusHistory: order.paymentStatusHistory,
        procurementInvoiceUuid: order.procurementInvoiceUuid, 

        calculatedTotalCostMajor: order.calculatedTotalCostMajor,
        deliveryCostMajor: order.deliveryCostMajor,
        currency: order.currency,
        currencySymbol,
        createdAt: order.createdAt,
      };
    })

     const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedOrderListsDataset, total: totalCount }
    };
    return resData
  }
}
