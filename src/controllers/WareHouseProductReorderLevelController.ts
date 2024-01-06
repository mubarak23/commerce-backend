
/* eslint-disable @typescript-eslint/no-parameter-properties */
import { Body, Delete, Get, Path, Post, Request, Route, Security, Tags } from "tsoa";
import { In } from "typeorm";
import { getFreshConnection } from "../db";
import ProductReorderLevelResponseDto from "../dto/ProductReorderLevelResponseDto";
import SetProductReorderLevelRequestDto from "../dto/SetProductReorderLevelRequestDto";
import { Product } from '../entity/Product';
import { User } from "../entity/User";
import { WareHouse } from '../entity/WareHouse';
import { WareHouseProductPurchase } from "../entity/WareHouseProductPurchase";
import { WareHouseProductReorderLevel } from "../entity/WareHouseProductReorderLevel";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as CooperateService from '../services/cooperateService';
import * as WareHouseService from '../services/warehouseService';
import { NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";

@Route("api/reorderlevel")
@Tags('Reorder Level')
@Security("jwt")
export class WareHouseProductReorderLevelController {

  @Post('/')
  public async handleCreateProductReorderLevel(@Request() req: any, @Body() reqBody: SetProductReorderLevelRequestDto): Promise<IServerResponse<void>> {
    const currentUser: User = req.user
    const { wareHouseUuid, productUuid, level } = reqBody

    await CooperateService.isCooperateAccount(currentUser)

    const connection = await getFreshConnection()
    const productRepo = connection.getRepository(Product)
    const wareHouseRepo = connection.getRepository(WareHouse)
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase)
    const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel)
    const existingWareHouse = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })
    if(!existingWareHouse) {
      throw new UnprocessableEntityError('WareHouse Does Not Exist')
    }

    const existingProduct = await productRepo.findOne({
      uuid: productUuid
    })

    if(!existingProduct){
      throw new UnprocessableEntityError('Product Does Not Exist')
    }
    

    const wareHouseProductPurchase = await wareHouseProductPurchaseRepo.findOne({
      wareHouseId: existingWareHouse.id,
      productId: existingProduct.id
    })
    
    if(!wareHouseProductPurchase){
      throw new UnprocessableEntityError('The Product Selected Does Not Exist in the WareHouse')
    }

    await WareHouseService.isWareHouseAuthorize(currentUser, existingWareHouse!)

    const exisitngProductReorderLevel = await wareHouseProductReorderLevelRepo.findOne({
      wareHouseId: existingWareHouse.id,
      productId: existingProduct.id,
      isSoftDeleted: false
    })
    if(exisitngProductReorderLevel){ 
      await wareHouseProductReorderLevelRepo.createQueryBuilder()
        .update(WareHouseProductReorderLevel)
        .set({ level })
        .where({ id: exisitngProductReorderLevel!.id })
        .execute()
    }
    // create a new one 
    let setProductReorderLevel = new WareHouseProductReorderLevel().initialize(currentUser.id, existingWareHouse.id, existingProduct.id, level );
    setProductReorderLevel = await wareHouseProductReorderLevelRepo.save(setProductReorderLevel)

    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Get('/:wareHouseUuid')
  public async handleFetchWareReorderLevel(@Request() req: any,  @Path("wareHouseUuid") wareHouseUuid: string, ): 
  Promise<IServerResponse<ProductReorderLevelResponseDto[]>>{
    const currentUser: User = req.user

    await CooperateService.isCooperateAccount(currentUser)
   
    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const productRepo = connection.getRepository(Product)
    const wareHouseProductPurchaseRepo = connection.getRepository(WareHouseProductPurchase)
    const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel)

    const existingWareHouse = await wareHouseRepo.findOne({
      uuid: wareHouseUuid,
      accountId: currentUser.accountId
    })
    if(!existingWareHouse) {
      throw new UnprocessableEntityError('WareHouse Does Not Exist')
    }
   
    const wareHouseReorderLevel = await wareHouseProductReorderLevelRepo.find({
      wareHouseId: existingWareHouse.id,
      isSoftDeleted: false
    })
    
    if(wareHouseReorderLevel.length === 0){
      throw new NotFoundError('No Reorder Level Products')
    }

    const productIds: number[] = wareHouseReorderLevel.map(product => product.productId);
   
    const productDetails = await productRepo.find({ id: In(productIds)})
    const wareHouseProductPurchase = await wareHouseProductPurchaseRepo.find({
      productId: In(productIds)
    })

    if(!wareHouseProductPurchase){
      throw new NotFoundError('No Reorder Level Products')
    }

    const transformWareProductReorderLevels: ProductReorderLevelResponseDto[] = wareHouseReorderLevel.map( reorderLevel => {
      const productDetail = productDetails.find( product => product.id === reorderLevel.productId)
      const productPurchaseDetails = wareHouseProductPurchase.find( purchase => purchase.productId === reorderLevel.productId)

      return {
        uuid: reorderLevel.uuid,
        produtUuid: productDetail?.uuid,
        productName: productDetail?.name,
        wareHouseDetail: existingWareHouse,
        level: reorderLevel.level,
        avalailableInStock: productPurchaseDetails?.availableQuantity
      }
    })

    const resData: IServerResponse<ProductReorderLevelResponseDto[]> = {
      status: true,
      data: transformWareProductReorderLevels
    };

    return resData;
  }

  @Delete('/:reorderLevelUuid')
  public async handleDeleteProderReorderLevel(@Request() req: any,
  @Path("reorderLevelUuid") reorderLevelUuid: string,
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    await CooperateService.isCooperateAccount(currentUser)

    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const wareHouseProductReorderLevelRepo = connection.getRepository(WareHouseProductReorderLevel)


   const wareHouseProductReorderLevel = await wareHouseProductReorderLevelRepo.findOne({
    uuid: reorderLevelUuid
   })

   if(!wareHouseProductReorderLevel) {
    throw new UnprocessableEntityError('Product Reorder Level was Not Set')
   }

   await wareHouseProductReorderLevelRepo.createQueryBuilder()
   .update(WareHouseProductReorderLevel)
   .set({ isSoftDeleted: true})
   .where({
     uuid: wareHouseProductReorderLevel.uuid
   })
   .execute()

  const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }



}