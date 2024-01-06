/* eslint-disable @typescript-eslint/no-parameter-properties */
import { Body, Delete, Get, Patch, Path, Post, Query, Request, Route, Security, Tags } from "tsoa";
import { In, Not } from "typeorm";
import _ from "underscore";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import NewWareHouseRequestDto from "../dto/NewWareHouseRequestDto";
import { ProductPurchaseOrderHistoryDto } from "../dto/ProductPurchaseOrderHistoryDto";
import UpdateWareHouseRequestDto from "../dto/UpdateWareHouseRequestDto";
import { WareHouseProductPurchaseDto } from "../dto/WareHouseProductPurchaseDto";
import WareHouseResponseDto from "../dto/WareHouseResponseDto";
import { WareHouseSiteRequestDto } from "../dto/WareHouseSiteRequestDto";
import { WareHouseToDeliveryToSiteRequestDto } from "../dto/WareHouseToDeliveryToSiteRequestDto";
import { WareHouseToSiteDeliveryDto } from "../dto/WareHouseToSiteDeliveryDto";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { Order } from "../entity/Order";
import { Product } from '../entity/Product';
import { User } from "../entity/User";
import { WareHouse } from '../entity/WareHouse';
import { WareHouseProductOrderHistory } from "../entity/WareHouseProductOrderHistory";
import { WareHouseProductPurchase } from "../entity/WareHouseProductPurchase";
import { WareHouseToSiteDeliveryRequest } from "../entity/WareHouseToSiteDeliveryRequest";
import { AcceptOrDeclineType } from "../enums/AcceptOrDeclineType";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { SortOrder } from "../enums/SortOrder";
import { WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OmitFields } from "../interfaces/OmitFields";
import * as CooperateService from '../services/cooperateService';
import * as PaginationService from "../services/paginationService";
import * as WareHouseService from '../services/warehouseService';
import { UnprocessableEntityError } from "../utils/error-response-types";

@Route("api/warehouse")
@Tags('Warehouse')
@Security("jwt")
export class WareHouseController {

  @Post('/')
  public async handleCreateNewWareHouse(@Request() req: any, @Body() reqBody: NewWareHouseRequestDto): Promise<IServerResponse<void>> {
    const currentUser: User = req.user
    
    await WareHouseService.validateCreateWareHouseData(reqBody)
  
    if(currentUser.isCooperate){
      await CooperateService.isWareHouseAccount(currentUser)
      await CooperateService.isCooperateAccount(currentUser)
    }

    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    // function that check if the user can create multiple warehouse 
    const canHaveMultipleWareHousePerState = await WareHouseService.canHaveMultipleWareHousePerState(currentUser.id);
    if(!canHaveMultipleWareHousePerState){

    const existingStateWareHouse = await wareHouseRepo.findOne({
      state: reqBody.state,
      accountId: currentUser.accountId
    })

    if(existingStateWareHouse) {
      throw new UnprocessableEntityError('You are not allowed to have more than one warehouse in a state')
    }

    }

    const savedNewWareHouse = await WareHouseService.createWareHouse(currentUser, reqBody)

    if(!savedNewWareHouse){
      throw new UnprocessableEntityError('Unable to create a wareHouse at this time')
    }
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Get('/')
  public async handleFetchMyWareHouses(@Request() req: any ): Promise<IServerResponse<WareHouseResponseDto[]>>{
    const currentUser: User = req.user


    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)

    if(currentUser.isDeveloper){
      const warehouses = await wareHouseRepo.find({
        accountId: currentUser.accountId,
        isSoftDeleted: false
      })
  
      if(!warehouses){
        throw new UnprocessableEntityError('No Warehouse Found')
      }
  
      const resData: IServerResponse<WareHouseResponseDto[]> = {
        status: true,
        data: warehouses.map((warehouse) => {
          return {
            uuid: warehouse.uuid,
            name: warehouse.name,
            state: warehouse.state,
            country: warehouse.country,
            contactFullName: warehouse.contactFullName,
            contactPhoneNumber: warehouse.contactPhoneNumber,
            isDefault: warehouse.isDefault,
            createdByUserId: warehouse.createdByUserId
          };
        }),
      };
  
      return resData;
    }

    await CooperateService.isCooperateAccount(currentUser)
    await CooperateService.isWareHouseAccount(currentUser)

    const warehouses = await wareHouseRepo.find({
      accountId: currentUser.accountId,
      isSoftDeleted: false
    })

    if(!warehouses){
      throw new UnprocessableEntityError('No Warehouse Found')
    }

    const resData: IServerResponse<WareHouseResponseDto[]> = {
      status: true,
      data: warehouses.map((warehouse) => {
        return {
          uuid: warehouse.uuid,
          name: warehouse.name,
          state: warehouse.state,
          country: warehouse.country,
          contactFullName: warehouse.contactFullName,
          contactPhoneNumber: warehouse.contactPhoneNumber,
          isDefault: warehouse.isDefault,
          createdByUserId: warehouse.createdByUserId
        };
      }),
    };

    return resData;
  }


  @Get('/delivery-to-site')
  public async handleGetSiteDeliveryRequests(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query("pageNumber") pageNumber: any,
      @Query("startDate") startDate?: Date | null,
      @Query("endDate") endDate?: Date | null,): Promise<IServerResponse<IPaginatedList<WareHouseToSiteDeliveryDto>>> {
    const currentUser: User = req.user
   
    const connection = await getFreshConnection()
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation)
    const wareHouseRepo = connection.getRepository(WareHouse)
    let query: any = {}
    
    query = { userId: currentUser.id };
    
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }


    const pageSize = 10

    const totalAssignmentsNumber = await wareHouseToSiteProductDeliveryRepo.count({
      where: query,
    })

    const pageResult = await PaginationService.paginate(WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder)

    // eslint-disable-next-line eqeqeq
    if(pageResult.dataset.length == 0){
      throw new UnprocessableEntityError('No Items Found')
    }
    const warehouseToSiteDeliveryRequestDataSet = pageResult.dataset as WareHouseToSiteDeliveryRequest[]

    const siteDeliveryLocationIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.deliveryLocationId)
    const deliveryLocationSites = await DeliveryLocationRepo.find({
      where: { id: In(siteDeliveryLocationIds) }
    })

    const WareHouseIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.wareHouseId)
    const wareHouses = await wareHouseRepo.find({
      where: { id: In(WareHouseIds) }
    })

    const transformedWareHouseProductLists: WareHouseToSiteDeliveryDto[] = warehouseToSiteDeliveryRequestDataSet.map( deliveryRequest => {
      const deliverySiteDetails: DeliveryLocation = deliveryLocationSites.find( item => item.id === deliveryRequest.deliveryLocationId )!  
      const wareHouseDetails: WareHouse = wareHouses.find( item => item.id === deliveryRequest.wareHouseId )!  

      return {
        uuid: deliveryRequest.uuid,
        wareHouseDetails,
        userId: deliveryRequest.userId,
        deliveryItems: deliveryRequest.deliveryItems,
        deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
        status: deliveryRequest.deliveryFeeStatus ,
        totalAmountMajor: deliveryRequest.totalAmountMajor,
        deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
        deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
        createdAt: deliveryRequest.createdAt
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedWareHouseProductLists, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/delivery-to-site/:deliveryRequestUuid')
  public async handleFetchDeliveryDetails(@Request() req: any,
  @Path("deliveryRequestUuid") deliveryRequestUuid: string,
  ): Promise<IServerResponse<WareHouseToSiteDeliveryDto>> {
    const currentUser: User = req.user

    await CooperateService.isCooperateAccount(currentUser)

    const connection = await getFreshConnection()
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
    const wareHouseRepo = connection.getRepository(WareHouse)
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation)

    const existingDeliveryRequest = await wareHouseToSiteProductDeliveryRepo.findOne({
      uuid: deliveryRequestUuid,
      userId: currentUser.id
    })
    if(!existingDeliveryRequest) {
      throw new UnprocessableEntityError('WareHouse delivery request does not exist')
    }

    const wareHouseDetails = await wareHouseRepo.findOne({
      id: existingDeliveryRequest.wareHouseId
    })

    const deliverySiteDetails = await deliveryLocationRepo.findOne({
      id: existingDeliveryRequest.deliveryLocationId
    })

    const transformWareHouseDetails =  {
      uuid: existingDeliveryRequest.uuid,
      wareHouseDetails,
      userId: existingDeliveryRequest.userId,
      deliveryItems: existingDeliveryRequest.deliveryItems,
      deliveryRequestHistory: existingDeliveryRequest.deliveryFeeStatusHistory,
      status: existingDeliveryRequest.deliveryFeeStatus ,
      totalAmountMajor: existingDeliveryRequest.totalAmountMajor,
      deliveryFeeAmountMajor: existingDeliveryRequest.deliveryFeeAmountMajor,
      deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
      createdAt: existingDeliveryRequest.createdAt
    };

    const resData: IServerResponse<WareHouseToSiteDeliveryDto> = {
      status: true,
      data: transformWareHouseDetails

    }; 

    return resData
  }

  @Get('/delivery-to-site/:deliverySiteUuid/site')
  public async handleFetchSingleDeliveryRquest(@Request() req: any,
  @Path("deliverySiteUuid") deliverySiteUuid: string,
  ): Promise<IServerResponse<WareHouseToSiteDeliveryDto[]>> {
    const currentUser: User = req.user

    await CooperateService.isCooperateAccount(currentUser)

    const connection = await getFreshConnection()
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
    const wareHouseRepo = connection.getRepository(WareHouse)
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation)

    const deliverySiteDetails = await deliveryLocationRepo.findOne({
      uuid: deliverySiteUuid
    })
    if(!deliverySiteDetails){
      throw new UnprocessableEntityError('Site delivery location does not exist')
    }
    const existingDeliveryRequests = await wareHouseToSiteProductDeliveryRepo.find({
      deliveryLocationId: deliverySiteDetails.id,
    })
   
    if(!existingDeliveryRequests) {
      throw new UnprocessableEntityError('WareHouse delivery request does not exist')
    }

    const WareHouseIds: number[] = existingDeliveryRequests.map(item => item.wareHouseId)
    const wareHouses = await wareHouseRepo.find({
      where: { id: In(WareHouseIds) }
    })

    const transformedDeliveryRequests: WareHouseToSiteDeliveryDto[] = existingDeliveryRequests.map( deliveryRequest => {
      const wareHouseDetails: WareHouse = wareHouses.find( item => item.id === deliveryRequest.wareHouseId )!  

      return {
        uuid: deliveryRequest.uuid,
        wareHouseDetails,
        userId: deliveryRequest.userId,
        deliveryItems: deliveryRequest.deliveryItems,
        deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
        status: deliveryRequest.deliveryFeeStatus ,
        totalAmountMajor: deliveryRequest.totalAmountMajor,
        deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
        deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
        createdAt: deliveryRequest.createdAt
      };
    })

    const resData: IServerResponse<WareHouseToSiteDeliveryDto[]> = {
      status: true,
      data: transformedDeliveryRequests
    }; 

    return resData
  }

  @Get('/:wareHouseUuid')
  public async handleFetchWareHouseDetails(@Request() req: any,
  @Path("wareHouseUuid") wareHouseUuid: string,
  ): Promise<IServerResponse<WareHouseResponseDto>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)

    const existingWareHouse = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })

    if(!existingWareHouse) {
      throw new UnprocessableEntityError('WareHouse does not exist')
    }

    if(currentUser.isDeveloper){
  
      const transformWareHouseDetails =  {
        uuid: existingWareHouse.uuid,
        name: existingWareHouse.name,
        state: existingWareHouse.state,
        country: existingWareHouse.country,
        contactFullName: existingWareHouse.contactFullName,
        contactPhoneNumber: existingWareHouse.contactPhoneNumber,
        isDefault: existingWareHouse.isDefault,
        createdByUserId: existingWareHouse.createdByUserId
      };
  
      const resData: IServerResponse<WareHouseResponseDto> = {
        status: true,
        data: transformWareHouseDetails
  
      }; 
  
      return resData
    }



    await CooperateService.isCooperateAccount(currentUser); 


    await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse!)

    const transformWareHouseDetails =  {
      uuid: existingWareHouse.uuid,
      name: existingWareHouse.name,
      state: existingWareHouse.state,
      country: existingWareHouse.country,
      contactFullName: existingWareHouse.contactFullName,
      contactPhoneNumber: existingWareHouse.contactPhoneNumber,
      isDefault: existingWareHouse.isDefault,
      createdByUserId: existingWareHouse.createdByUserId
    };

    const resData: IServerResponse<WareHouseResponseDto> = {
      status: true,
      data: transformWareHouseDetails

    }; 

    return resData
  }

  @Delete('/:wareHouseUuid')
  public async handleDeleteWareHouse(@Request() req: any,
  @Path("wareHouseUuid") wareHouseUuid: string,
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user



    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase);
    const existingWareHouse = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })
    if(!existingWareHouse) {
      throw new UnprocessableEntityError('You are not allowed to delete a warehouse you did not create')
    }

   const wareHouseHasProduct = await wareHouseProductPurchaseRepo.find({
    wareHouseId: existingWareHouse.id
   })

   // eslint-disable-next-line eqeqeq
   if(wareHouseHasProduct.length !=0 ) {
    throw new UnprocessableEntityError('You are not allowed to delete a warehouse that has product in it')
   }

   if(currentUser.isDeveloper){
    await wareHouseRepo.createQueryBuilder()
    .update(WareHouse)
    .set({ isSoftDeleted: true})
    .where({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })
    .execute()
 
   const resData: IServerResponse<void> = {
       status: true,
     }
     return resData
   }

   await CooperateService.isCooperateAccount(currentUser)

   await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse!)

   await wareHouseRepo.createQueryBuilder()
   .update(WareHouse)
   .set({ isSoftDeleted: true})
   .where({
     uuid: wareHouseUuid,
     accountId: currentUser.accountId
   })
   .execute()

  const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Patch('/:wareHouseUuid')
  public async updateNewWareHouse(@Request() req: any,
   @Path("wareHouseUuid") wareHouseUuid: string,
   @Body() reqBody: UpdateWareHouseRequestDto): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    let query: any = {}
    if(reqBody.contactFullName){
      query = { contactFullName: reqBody.contactFullName }
    }

    if(reqBody.contactPhoneNumber){
      query = { contactPhoneNumber: reqBody.contactPhoneNumber }
    }

    if(reqBody.name){
      query = { name: reqBody.name }
    }

    if(reqBody.isDefault){
      query = { isDefault: reqBody.isDefault }
    }


    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser)
    }

    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const existingWareHouse = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })
    if(!existingWareHouse) {
      throw new UnprocessableEntityError('You are not allowed to edit a wareHouse that you did not create')
    }

    await wareHouseRepo.createQueryBuilder()
      .update(WareHouse)
      .set(query)
      .where({
        uuid: wareHouseUuid,
        accountId: currentUser.accountId
      })
      .execute()

    await wareHouseRepo.createQueryBuilder()
      .update(WareHouse)
      .set({ isDefault: !reqBody.isDefault })
      .where({
        uuid: Not(wareHouseUuid),
        accountId: currentUser.accountId
      })
      .execute()

    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }



  @Post("/:wareHouseUuid/sites")
  public async handleCreateNewWareHouseSite(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Body() requestBody: WareHouseSiteRequestDto
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;  

    const { address } = requestBody

    const connection = await getFreshConnection();
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const wareHouseRepo = connection.getRepository(WareHouse)
    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }
    
    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    const getDeliveryLocation = await DeliveryLocationRepo.findOne({
      userId: currentUser.id,
      address,
    });

    if (getDeliveryLocation) {
      throw new UnprocessableEntityError("Site delivery location has been added on your list");
    }

    const newWareHouseSite = await WareHouseService.createSiteDeliveryLocation(currentUser, requestBody, existingWareHouse)

    if(!newWareHouseSite){
      throw new UnprocessableEntityError("Unable to create site delivery location");
    }

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get('/:wareHouseUuid/sites')
  public async handleFetchWareHouseSites(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string
  ): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>[]>> {
    
    const currentUser: User = req.user;
    const connection = await getFreshConnection();


    const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const WareHouseRepo = connection.getRepository(WareHouse)
    const existingWareHouse  = await WareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    const sites = await deliveryLocationRepo.find({
      wareHouseId: existingWareHouse.id,
      isSoftDeleted: false,
    });

    const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>[]> = {
      status: true,
      data: sites.map(aSite => _.omit(aSite, "id", "user", "createdAt", "updatedAt")),
    };
    
    return resData;
  }

  @Get("/:wareHouseUuid/product_purchase")
  public async getWareHouseProductPurchases(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<IPaginatedList<any>>>  {
    const currentUser: User = req.user;

    
    const connection = await getFreshConnection();
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase);
    const wareHouseRepo = connection.getRepository(WareHouse)
    const productRepo = connection.getRepository(Product)
    const userRepoT = connection.getRepository(User)

    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }
   
    //--
    let query: any = {}
   
    query = { wareHouseId: existingWareHouse.id };
    
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }

    const join = {
      alias: "WareHouseProductPurchase",
      leftJoinAndSelect: {
        buyerUser: "WareHouseProductPurchase.user",
        sellerUser: "WareHouseProductPurchase.product",
      },
    }
  
    //--
    const pageSize = 10
    const totalCount = await wareHouseProductPurchaseRepo.count(query);

    const warehouseProductListsPages = await PaginationService.paginate(WareHouseProductPurchase,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<WareHouseProductPurchase>

    if(warehouseProductListsPages.dataset.length === 0){
        throw new UnprocessableEntityError('No Items Found')
    }  
    
    const warehouseProducts: WareHouseProductPurchase[] = warehouseProductListsPages.dataset;
    const wareHouseUserIds: number[] = warehouseProducts.map(user => user.userId);
    const productIds: number[] = warehouseProducts.map(product => product.productId)
    const warehouseIds: number[] = warehouseProducts.map(warehouse => warehouse.wareHouseId)
    
    const userPublicProfiles = await userRepoT.find({ id: In(wareHouseUserIds) })
    const wareHouseDetails = await wareHouseRepo.find({ id: In(warehouseIds)})
    const productDetails = await productRepo.find({ id: In(productIds)})
    
    // @ts-ignore
    const transformedWareHouseProductListsDataset: WareHouseProductPurchaseDto[] = warehouseProducts.map(productPurchase => {
    const userPublicProfile = userPublicProfiles.find(publicProfile =>
        publicProfile.id === productPurchase.userId)
    const wareHouseDetail = wareHouseDetails.find( wareHouse => wareHouse.id === productPurchase.wareHouseId) 
    const productDetail = productDetails.find( product => product.id === productPurchase.productId)  
      
      return {
        uuid: productPurchase.uuid,
        warehouse: wareHouseDetail,
        user: userPublicProfile,
        product: productDetail,
        inFlowQuantity: productPurchase.inFlowQuantity,
        outFlowQuantity: productPurchase.outFlowQuantity,
        availableQuantity: productPurchase.availableQuantity,
        createdAt: productPurchase.createdAt,
      };
    })

     const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedWareHouseProductListsDataset, total: totalCount }
    };
    return resData
  }

  @Get("/:wareHouseUuid/product_purchase/byDate")
  public async getWareHouseProductPurchaseByDate(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<any>>{
    const currentUser: User = req.user;

    
    const connection = await getFreshConnection();
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase);
    const wareHouseRepo = connection.getRepository(WareHouse)
    const productRepo = connection.getRepository(Product)
    const userRepoT = connection.getRepository(User)

    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    let query: any = {}
   
    query = { wareHouseId: existingWareHouse.id };
    
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }
  
    const productPurchases = await wareHouseProductPurchaseRepo.find({
      where: query
    })

    if(productPurchases.length === 0){
      throw new UnprocessableEntityError('No Items Found')
  }  

    const wareHouseUserIds: number[] = productPurchases.map(user => user.userId);
    const productIds: number[] = productPurchases.map(product => product.productId)
    const warehouseIds: number[] = productPurchases.map(warehouse => warehouse.wareHouseId)
    
    
    const userPublicProfiles = await userRepoT.find({ id: In(wareHouseUserIds) })
    const wareHouseDetails = await wareHouseRepo.find({ id: In(warehouseIds)})
    const productDetails = await productRepo.find({ id: In(productIds)})

    const transformedWareHouseProductListsDataset: WareHouseProductPurchaseDto[] = productPurchases.map(productPurchase => {
    const userPublicProfile = userPublicProfiles.find(publicProfile =>
        publicProfile.id === productPurchase.userId)
    const wareHouseDetail = wareHouseDetails.find( wareHouse => wareHouse.id === productPurchase.wareHouseId) 
    const productDetail = productDetails.find( product => product.id === productPurchase.productId)  
      
      return {
        uuid: productPurchase.uuid,
        warehouse: wareHouseDetail!,
        user: userPublicProfile!,
        product: productDetail!,
        inFlowQuantity: productPurchase.inFlowQuantity,
        outFlowQuantity: productPurchase.outFlowQuantity,
        availableQuantity: productPurchase.availableQuantity,
        createdAt: productPurchase.createdAt,
      };
    })
    const resData = {
      status: true,
      data: transformedWareHouseProductListsDataset
    };
    return resData

  }

  @Get("/:wareHouseUuid/")
  public async getWareHouseProductOrderHistory(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Query("productUuid") productUuid: string,
    @Query("productPurchaseUuid") productPurchaseUuid: string,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<IPaginatedList<any>>>{
    const currentUser: User = req.user;

  
  
    const connection = await getFreshConnection();
    const wareHouseProductOrderHistoryRepo = connection.getRepository(WareHouseProductOrderHistory);
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase)
    const wareHouseRepo = connection.getRepository(WareHouse)
    const productRepo = connection.getRepository(Product)
    const userRepo = connection.getRepository(User)
    const orderRepo = connection.getRepository(Order)

    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }


    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    const existingProduct = await productRepo.findOne({ uuid: productUuid})

    if(!existingProduct){
      throw new UnprocessableEntityError('selected product does not does not exist')
    }

    const wareHouseProductPurchase = await wareHouseProductPurchaseRepo.findOne({
      uuid: productPurchaseUuid,
      productId: existingProduct.id
    })
  
    if(!wareHouseProductPurchase){
      throw new UnprocessableEntityError('selected product purchase history doest exist')
    }


    let query: any = {}
    
    query = { productPurchaseId: wareHouseProductPurchase.id,  productId: existingProduct.id,  };
    
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }

    const pageSize = 10
    const totalCount = await wareHouseProductOrderHistoryRepo.count(query);
    const warehouseProductPurchaseOrderHistoryListsPages = await PaginationService.paginate(WareHouseProductOrderHistory,
      query, pageSize, pageNumber, sortOrder, undefined) as IPaginatedList<WareHouseProductOrderHistory>

    if(warehouseProductPurchaseOrderHistoryListsPages.dataset.length === 0){
      throw new UnprocessableEntityError('No items Found')
    }  

    const productOrderHistory: WareHouseProductOrderHistory[] = warehouseProductPurchaseOrderHistoryListsPages.dataset;
    const orderIds: number[] = productOrderHistory.map(order => order.orderId)

    const productOrders = await orderRepo.find({
      where: { id: In(orderIds) }
    })

    const transformedProductOrderedListsDataset: ProductPurchaseOrderHistoryDto[] = productOrderHistory.map(productPurchaseOrder => {
      const orderDetails: Order = productOrders.find( order => order.id === productPurchaseOrder.orderId)!  
      const product = orderDetails!.orderItems.find( item => item.productId === existingProduct.id )  

      return {
        uuid: productPurchaseOrder.uuid,
        productName: product!.productName,
        quantity: product!.quantity,
        order:orderDetails,
        orderReference: orderDetails!.referenceNumber,
        status: orderDetails!.status,
        calculatedTotalOrderAmountMajor: orderDetails!.calculatedTotalCostMajor,
        createdAt: productPurchaseOrder.createdAt,
      };
    })
      
    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedProductOrderedListsDataset, total: totalCount }
    };
    return resData
  }

  @Get('/:wareHouseUuid/delivery-to-site')
  public async handleGetWareHouseToSiteDeliveryRequests(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Path("wareHouseUuid") wareHouseUuid: string,
      @Query("pageNumber") pageNumber: any,
      @Query("startDate") startDate?: Date | null,
      @Query("endDate") endDate?: Date | null,): Promise<IServerResponse<IPaginatedList<WareHouseToSiteDeliveryDto>>> {
    const currentUser: User = req.user
   
    const connection = await getFreshConnection()
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation)
    const wareHouseRepo = connection.getRepository(WareHouse)

    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })

    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    
    let query: any = {}
    
    query = { wareHouseId: existingWareHouse.id, userId: currentUser.id };
    
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }


    const pageSize = 10

    const totalAssignmentsNumber = await wareHouseToSiteProductDeliveryRepo.count({
      where: query,
    })

    const pageResult = await PaginationService.paginate(WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder)
    
    if(pageResult.dataset.length === 0){
      throw new UnprocessableEntityError('No Items Found')
     } 

    const warehouseToSiteDeliveryRequestDataSet = pageResult.dataset as WareHouseToSiteDeliveryRequest[]

    const siteDeliveryLocationIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.deliveryLocationId)
    const deliveryLocationSites = await DeliveryLocationRepo.find({
      where: { id: In(siteDeliveryLocationIds) }
    })

    const WareHouseIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.wareHouseId)
    const wareHouses = await wareHouseRepo.find({
      where: { id: In(WareHouseIds) }
    })

    const transformedWareHouseProductLists: WareHouseToSiteDeliveryDto[] = warehouseToSiteDeliveryRequestDataSet.map( deliveryRequest => {
      const deliverySiteDetails: DeliveryLocation = deliveryLocationSites.find( item => item.id === deliveryRequest.deliveryLocationId )!  
      const wareHouseDetails: WareHouse = wareHouses.find( item => item.id === deliveryRequest.wareHouseId )!  

      return {
        uuid: deliveryRequest.uuid,
        wareHouseDetails,
        userId: deliveryRequest.userId,
        deliveryItems: deliveryRequest.deliveryItems,
        deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
        status: deliveryRequest.deliveryFeeStatus ,
        totalAmountMajor: deliveryRequest.totalAmountMajor,
        deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
        deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
        createdAt: deliveryRequest.createdAt
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedWareHouseProductLists, total: totalAssignmentsNumber}
    }
    return resData
  }



  @Post("/:wareHouseUuid/delivery-to-site")
  public async handleDeliveryRequestToSite(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Body() requestBody: WareHouseToDeliveryToSiteRequestDto
  ): Promise<IServerResponse<void>> {
    const { deliveryLocationUuid, deliveryItems } = requestBody
    const currentUser: User = req.user;


    const connection = await getFreshConnection();
    const wareHouseRepo = connection.getRepository(WareHouse)
    const deliveryRepo = connection.getRepository(DeliveryLocation)

   
    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })
    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }

    await WareHouseService.canDeliveryItemBeProceesed(currentUser, deliveryItems, existingWareHouse.id) 

    const deliveryLocation = await deliveryRepo.findOne({ uuid: deliveryLocationUuid, wareHouseId: existingWareHouse.id })

    if(!deliveryLocation){
      throw new UnprocessableEntityError('Site delivery location does not exist')
    }

    await WareHouseService.createDeliveryToSiteRequest(currentUser, deliveryItems, 
      existingWareHouse, deliveryLocation)
    const resData = {
      status: true
    };
    return resData
  }

  @Post("/:wareHouseUuid/delivery-to-site/:deliveryRequestUuid/:acceptOrDecline")
  public async acceptDeliveryRequestToSiteFee(
    @Request() req: any,
    @Path("wareHouseUuid") wareHouseUuid: string,
    @Path("deliveryRequestUuid") deliveryToSiteUuid: string,
    @Path("acceptOrDecline") acceptOrDecline: AcceptOrDeclineType,
    @Body() requestBody: {
      status: WareHouseToSiteDeliveryFeeStatuses,
      paymentVariant?: OrderPaymentVariant | null
    }
  ): Promise<IServerResponse<void>> {
    const { status, paymentVariant } = requestBody
    const currentUser: User = req.user;
    
    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)

    const existingWareHouse  = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
    })
    if(!existingWareHouse){
      throw new UnprocessableEntityError('Selected warehouse does not exist')
    }

    if(!currentUser.isDeveloper){
      await CooperateService.isCooperateAccount(currentUser);

      await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse)
    }
  
    
    const existingWareHouseToSiteDelivery  = await wareHouseToSiteProductDeliveryRepo.findOne({
      uuid: deliveryToSiteUuid,
      wareHouseId: existingWareHouse.id
    })

    if(!existingWareHouseToSiteDelivery){
      throw new UnprocessableEntityError('Selected delivery to site does not exist')
    }

    await WareHouseService.hasDeliveryBeenProcessed(existingWareHouseToSiteDelivery)
    
    const acceptAsBoolean: boolean = acceptOrDecline === AcceptOrDeclineType.ACCEPT
    let paymentResponse
    if(acceptAsBoolean) {
      if(status !== WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED ){
        throw new UnprocessableEntityError('Payment for Delivery fee must carry status of DELIVERY_FEE_ACCEPTED ')
      }
      paymentResponse = await WareHouseService.processAcceptDeliveryFees(currentUser, existingWareHouseToSiteDelivery,
         existingWareHouse, paymentVariant!)
    } else {
      await WareHouseService.processDeclineDeliveryFees(status, existingWareHouseToSiteDelivery)
    }
    const resData = {
      status: true,
      data: paymentResponse
    };
    return resData

  }
} 
