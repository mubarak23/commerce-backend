import { Body, Controller, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from "tsoa";
import * as _ from 'underscore';
import * as ProfileService from "../services/profileService";

import { getRepository, IsNull, Not } from "typeorm";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { QuoteRequestCreateRequestDto } from "../dto/QuoteRequestCreateRequestDto";
import { QuoteRequestResponseDto } from "../dto/QuoteRequestResponseDto";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { PickupLocation } from "../entity/PickupLocation";
import { Product } from "../entity/Product";
import { QuoteRequest } from "../entity/QuoteRequest";
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { SortOrder } from "../enums/SortOrder";
import { QuoteRequestStatuses } from "../enums/Statuses";
import { IServerResponse } from "../interfaces/IServerResponse";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import { OmitFields } from "../interfaces/OmitFields";
import { Persona } from "../interfaces/Persona";
import * as NotificationService from "../services/notificationService";
import * as PaginationService from "../services/paginationService";
import * as QouteRequestService from "../services/quoteRequestService";
import * as AccountStatService from "../services/sellerAccountStatService";
import * as Utils from "../utils/core";
import { BadRequestError, NotFoundError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";
// DO NOT EXPORT DEFAULT

@Route("api/quoterequests")
@Tags('Quote Request')
@Security('jwt')
export class QuoteRequestController extends Controller {

  @Get("/:quoteRequestUuid")
  @Security('jwt')
  public async handleGetQuoteRequestDetails(@Request() req: any,
      @Path('quoteRequestUuid') quoteRequestUuid: string): Promise<IServerResponse<QuoteRequestResponseDto>> {
    const currentUser: User = req.user

    const quoteRequestRepo = getRepository(QuoteRequest);
    const pickupLocationRepo = getRepository(PickupLocation);

    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        product: "quoteRequest.product",
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
      },
    }

    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        uuid: quoteRequestUuid,
      },
      join
    });
    if (!quoteRequest) {
      throw new NotFoundError("The specified quote request could not be found")
    }
    if (quoteRequest.sellerUserId !== currentUser.id && quoteRequest.userId !== currentUser.id) {
      throw new UnauthorizedRequestError("You are not allowed to view the selected quote request")
    }

    const buyerUserPublicProfiles = await ProfileService.getPublicProfile(quoteRequest.user)
    const sellerUserPublicProfiles = await ProfileService.getPublicProfile(quoteRequest.sellerUser)

    let pickupLocation: PickupLocation | undefined;
    if(quoteRequest.sellerPickupLocationUuid) {
      pickupLocation = await pickupLocationRepo.findOne({
        uuid: quoteRequest.sellerPickupLocationUuid,
      });  
    }

    const resData: IServerResponse<QuoteRequestResponseDto> = {
      status: true,
      data: {
        uuid: quoteRequest.uuid,
        product: {
          uuid: quoteRequest.product.uuid,
          name: quoteRequest.product.name,
          description: quoteRequest.product.description,
          unitOfMeasurement:
            quoteRequest.product.category?.unitOfMeasurement ?? "",
        },
        quantity: quoteRequest.quantity,
        buyerUserPublicProfile: buyerUserPublicProfiles,
        sellerUserPublicProfile: sellerUserPublicProfiles,
        notes: quoteRequest.notes,
        orderReceiveType: quoteRequest.orderReceiveType,
        deliveryAddress: quoteRequest.deliverAddress,
        deliverAddressUuid: quoteRequest.deliverAddressUuid,
        sellerResponse: quoteRequest.sellerResponse,
        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
        status: quoteRequest.status,
        dateCreatedIso8601: quoteRequest.createdAt,
        sellerPickupLocation: pickupLocation ? {
          name: pickupLocation.name,
          address: pickupLocation.address,
          uuid: pickupLocation.uuid,
        } : undefined
      },
    };
    return resData
  }

  @Post("")
  @Security('jwt')
  public async handleNewRequestQuote(@Request() req: any, @Body()reqBody: QuoteRequestCreateRequestDto): Promise<IServerResponse<Omit<QuoteRequest, OmitFields>>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()

    const productRepo = getRepository(Product);
    const pickupLocationRepo = getRepository(PickupLocation);
    const deliveryLocationRepo = getRepository(DeliveryLocation)
    const wareHouseRepo = getRepository(WareHouse)
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
      },
    }
    const product = await productRepo.findOne({
      where: {
        uuid: reqBody.productUuid,
        isSoftDeleted: false,  
      },
      join
    });
    if (!product) {
      throw new NotFoundError('The specified product could not be found')
    }
    if (product.user.id === currentUser.id) {
      throw new UnprocessableEntityError('You cannot create a quote request for your own product')
    }
    let deliveryLocation: DeliveryLocation | undefined;
    let deliverAddress = '';
    if (reqBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {

      if (!reqBody.deliverAddressUuid) {
        throw new BadRequestError('Delivery address Must Be Selected')
      }
     
      if(reqBody.deliverAddressUuid) {
        deliveryLocation = await deliveryLocationRepo.findOne({
          uuid: reqBody.deliverAddressUuid,
        });  
        
      }
      if (!deliveryLocation) {
        throw new BadRequestError("The selected delivery address is not valid");
      }
      deliverAddress = deliveryLocation?.address
    }
    let sellerPickupLocation: PickupLocation | undefined;
    if (reqBody.orderReceiveType === OrderReceiveTypes.PICKUP) {
      if(reqBody.sellerPickupLocationUuid) {
        sellerPickupLocation = await pickupLocationRepo.findOne({
          uuid: reqBody.sellerPickupLocationUuid,
          userId: product.userId,
        });  
      }
      if (!sellerPickupLocation) {
        throw new BadRequestError("Product Seller Pickup Location Must Be Selected");
      }
      deliverAddress = sellerPickupLocation.address
    }

    let wareHouseLocation: WareHouse | undefined;
    
    if(reqBody.orderReceiveType === OrderReceiveTypes.WARE_HOUSE){
      
      if (!reqBody.wareHouseUuid) {
        throw new BadRequestError('WareHouse Must Be Selected')
      }

      if(reqBody.wareHouseUuid) {
        wareHouseLocation = await wareHouseRepo.findOne({
          uuid: reqBody.wareHouseUuid,
          accountId: currentUser.accountId
        });  
      }
      if (!wareHouseLocation) {
        throw new BadRequestError("The selected warehouse location is not valid");
      }

    }

    const quoteRequestRepo = getRepository(QuoteRequest);
    const existingQuoteRequest = await quoteRequestRepo.findOne({
      userId: currentUser.id,
      productId: product.id,
      status: QuoteRequestStatuses.PROCESSED,
    });
    if (existingQuoteRequest) {
      const quantityMatches = existingQuoteRequest.sellerResponse.minimumQuantity <= reqBody.quantity
        && existingQuoteRequest.sellerResponse.maximumQuantity >= reqBody.quantity
      
      if (quantityMatches) {
        const resData: IServerResponse<Omit<QuoteRequest, OmitFields>> = {
          status: true,
          data: _.omit(existingQuoteRequest, 'id', 'userId', 'sellerUserId', 'sellerUser', 'productId', 'product')
        };
        return resData;
      }
      await quoteRequestRepo.createQueryBuilder()
        .update(QuoteRequest)
        .set({
          status: QuoteRequestStatuses.ENDED_BY_BUYER,
        })
        .where({ id: existingQuoteRequest.id })
        .execute()
    }
    const quoteRequestCreated = await QouteRequestService.createQuoteRequest(reqBody, currentUser, product, deliverAddress );
  
    const resData: IServerResponse<Omit<QuoteRequest, OmitFields>> = {
      status: true,
      data: _.omit(quoteRequestCreated, 'id', 'userId', 'sellerUserId', 'sellerUser', 'productId', 'product')
    };
    return resData;
  }

  @Post("/:quoteRequestUuid/seller_response")
  @Security('jwt')
  public async handleQuoteRequestSellerResponse(@Request() req: any,
      @Path('quoteRequestUuid') quoteRequestUuid: string,
      @Body() reqBody: { unitPrice: number, deliveryFee: number | null }): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const quoteRequestRepo = getRepository(QuoteRequest);
    const productRepo = getRepository(Product)
    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
        product: "quoteRequest.product"
      },
    }

    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        uuid: quoteRequestUuid,
      },
      join,
    });
    if (!quoteRequest) {
      throw new NotFoundError('The specified quote request could not be found')
    }
    if (quoteRequest.sellerUserId !== currentUser.id) {
      throw new UnprocessableEntityError("You are NOT allowed to respond to the specified quote request")
    }
    if (quoteRequest.status !== QuoteRequestStatuses.PENDING) {
      throw new UnprocessableEntityError('Cannot respond to the quote request')
    }

   const successResponseToQuoteRequest = await QouteRequestService.respondToQuoteRequest(currentUser, quoteRequest, reqBody);
   
    const resData = {
      status: true,
    };
    return resData
  }

  @Put("/:quoteRequestUuid/seller_response/decline")
  @Security('jwt')
  public async handleQuoteRequestSellerDecline(@Request() req: any,
      @Path('quoteRequestUuid') quoteRequestUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const quoteRequestRepo = getRepository(QuoteRequest);
    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
      },
    }

    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        uuid: quoteRequestUuid,
      },
      join,
    });
    if (!quoteRequest) {
      throw new NotFoundError('The specified quote request could not be found')
    }
    if (quoteRequest.sellerUserId !== currentUser.id) {
      throw new UnprocessableEntityError("You are NOT allowed to respond to the specified quote request")
    }
    if (quoteRequest.status !== QuoteRequestStatuses.PENDING) {
      throw new UnprocessableEntityError('Cannot decline the quote request')
    }
    
    const now = Utils.utcNow()

    quoteRequest.statusHistory.push({
      status: QuoteRequestStatuses.DECLINED_BY_SELLER,
      dateTimeInISO8601: now.toISOString()
    })
  
    await quoteRequestRepo.createQueryBuilder()
      .update(QuoteRequest)
      .set({
        status: QuoteRequestStatuses.DECLINED_BY_SELLER,
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

    const resData = {
      status: true,
    };
    return resData
  }

  @Get("")
  public async handleGetMyQuoteRequests(@Request() req: any,
      @Query('pageNumber') pageNumber: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('persona') persona: Persona,
      @Query('pendingResponse') pendingResponse: 'true' | 'false'): Promise<IServerResponse<IPaginatedList<QuoteRequestResponseDto>>> {
    const currentUser: User = req.user

    const quoteRequestRepo = getRepository(QuoteRequest);
    
    let query: any = {}
    if(persona === Persona.BUYER) {
      query = { userId: currentUser.id }
    } else if(persona === Persona.SELLER) {
      query = { sellerUserId: currentUser.id }
    }
    if (pendingResponse) {
      if (pendingResponse === 'true') {
        query.sellerResponse = IsNull()
      } else if (pendingResponse === 'false') {
        query.sellerResponse = Not(IsNull())        
      }
    }

    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        product: "quoteRequest.product",
      },
    }

    const pageSize = 10

    const quoteRequestsPage = await PaginationService.paginate(QuoteRequest,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<QuoteRequest>
    const quoteRequests: QuoteRequest[] = quoteRequestsPage.dataset

    const totalCount = await quoteRequestRepo.count(query)

    const buyerUserIds = quoteRequests.map(quoteRequest => quoteRequest.userId)
    const sellerUserIds = quoteRequests.map(quoteRequest => quoteRequest.sellerUserId)
    const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]))

    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
  
    const transformedQuoteRequestsDataset: QuoteRequestResponseDto[] = quoteRequests.map(quoteRequest => {
      const buyerUserUuid = quoteRequest.userUuid
      const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === buyerUserUuid)

      const selllerUserUuid = quoteRequest.sellerUserUuid
      const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === selllerUserUuid)

      return {
        uuid: quoteRequest.uuid,
        product: {
          uuid: quoteRequest.product.uuid,
          name: quoteRequest.product.name,
          description: quoteRequest.product.description,
          unitOfMeasurement: quoteRequest.product.category?.unitOfMeasurement ?? "",
        },
        quantity: quoteRequest.quantity,
        buyerUserPublicProfile: buyerPublicProfile!,
        sellerUserPublicProfile: sellerPublicProfile!,
        notes: quoteRequest.notes,
        orderReceiveType: quoteRequest.orderReceiveType,
        deliveryAddress: quoteRequest.deliverAddress,
        sellerResponse: quoteRequest.sellerResponse,
        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
        status: quoteRequest.status,
        dateCreatedIso8601: quoteRequest.createdAt,
      }
    })
  
    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedQuoteRequestsDataset, total: totalCount }
    };
    return resData
  }
}
