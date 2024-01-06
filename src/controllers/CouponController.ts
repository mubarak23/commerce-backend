/* eslint-disable @typescript-eslint/no-parameter-properties */
import * as _ from 'underscore'

import { Body, Controller, Post, Route, Security, Tags, Request, Get, Query, Put } from "tsoa";
import { getRepository, In } from "typeorm";
import { NewCouponRequestDto } from "../dto/NewCouponRequestDto";
import * as CouponService from "../services/couponService";
import { Coupon } from "../entity/Coupon"
import { Product } from "../entity/Product";
import { SortOrder } from "../enums/SortOrder";
import { IServerResponse } from "../interfaces/IServerResponse";
import { ConflictError, UnprocessableEntityError, BadRequestError } from '../utils/error-response-types';
import * as ProductsService from "../services/productsService";
import * as PaginationService from "../services/paginationService";
import { IPaginatedList } from "../dto/IPaginatedList";
import { CouponResponseDto } from "../dto/CouponResponseDto";
import { NewUpdateCouponRequestDto } from "../dto/NewUpdateCouponRequestDto";
import * as Constants from "../constants";
import { User } from '../entity/User';

@Route("api/coupons")
@Tags("Coupon")
@Security("jwt")
export class CouponController extends Controller {

  @Post("")
  public async handleNewProductCoupon(@Request() req: any, @Body() reqBody: NewCouponRequestDto) : Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const {
      code, description, expiryDate, orderMinAmountMajor,
      productUuid, couponValue, couponValueType
    } = reqBody
    const couponsRepo = getRepository(Coupon)

    const existingCoupon = await couponsRepo.findOne({
      code: code.toUpperCase()
    })
  
    if(existingCoupon) {
      throw new ConflictError('A coupon with the same code already exists')
    }

    const producrRepo = getRepository(Product)
    const product = await producrRepo.findOne({ uuid: productUuid})

    if(product?.userId !== currentUser.id){
      throw new UnprocessableEntityError('Can not create coupon code on a product that is not in your catalogue')
    }

    await CouponService.saveProductCouponCode(
      code,
      description ?? '',
      product!.id,
      product!.userId,
      couponValueType,
      couponValue,
      expiryDate ?? undefined,
      orderMinAmountMajor ?? undefined
    )

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get("")
  public async handleGetCouponsPaginatedList(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("isActive") isActive: boolean,
  ):Promise<IServerResponse<IPaginatedList<CouponResponseDto>>>{
    const currentUser: User = req.user

    const query: any = {
      userId: currentUser.id,
      isActive
    };
    const join = {
      alias: "coupons",
      leftJoinAndSelect: {
        product: "coupons.product",
      },
    };

    const pageSize = Constants.DEFAULT_PAGE_SIZE;
    
    const couponListsPage = await PaginationService.paginate(Coupon,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<Coupon>

    const couponRepo = getRepository(Coupon);
    const productRepo = getRepository(Product);
    const totalCount = await couponRepo.count(query);
    
    const couponsDataset: Coupon[] = couponListsPage.dataset;

    const productIds: number[] = []
    for(const coup of couponsDataset) {
      if(coup.productId) productIds.push(coup.productId)
    }
    let products: Product[] = []
    if(productIds.length) {
      products = await productRepo.find({ id: In(productIds) })
    }

    const transformProducts =  await ProductsService.transformProducts(products)  

    const transformedCouponDataset: CouponResponseDto[] = couponsDataset.map(coupon => {
      const couponProduct = transformProducts.find(product =>
        product.productUuid === coupon.product?.uuid)
      
      return {
        code: coupon.code,
        description: coupon.description,
        expiryDate: coupon.expiryDate,
        valueType: coupon.valueType,
        value: coupon.value,
        applyType: coupon.applyType,

        isActive: coupon.isActive,
        productUuid: coupon.product?.uuid,
        product: couponProduct,
        orderMinAmountMajor: coupon.orderMinimumAmountMajor,
      }
    })

    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedCouponDataset, total: totalCount }
    };
    return resData
  }


  @Put("/deactivate")
  public async handleDeactivateCoupon(@Request() req: any, @Body() reqBody: {code: string}) : Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const couponRepo = getRepository(Coupon);
    const existingCoupon = await couponRepo.findOne({ code: reqBody.code.toUpperCase() })
  
    if(!existingCoupon) {
      throw new ConflictError('The coupon does not exist')
    }

    if(existingCoupon.userId !== currentUser.id){
      throw new UnprocessableEntityError('You are not allowed to deactivate a coupon you did not create')
    }

    await couponRepo
      .createQueryBuilder()
      .update(Coupon)
      .set({ isActive: false })
      .where({ id: existingCoupon.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };

    return resData
  }

  @Put("/update")
  public async handleUpdateCoupon(@Request() req: any, @Body() reqBody: NewUpdateCouponRequestDto) : Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    if(!_.without(Object.keys(reqBody), 'code').length) {
      throw new BadRequestError('You specified nothing to update on the coupon')
    }

    const couponRepo = getRepository(Coupon);
    const existingCoupon = await couponRepo.findOne({ code: reqBody.code.toUpperCase() })
  
    if(!existingCoupon) {
      throw new ConflictError('The coupon does not exist')
    }

    if(existingCoupon.userId !== currentUser.id){
      throw new UnprocessableEntityError('You are not allowed to update a coupon you did not create')
    }

    const updateQuery: Partial<Coupon> = {};
    if(reqBody.description){
      updateQuery.description = reqBody.description
    }
    if(reqBody.expiryDate){
      updateQuery.expiryDate = reqBody.expiryDate
    }
    if(reqBody.orderMinimumAmountMajor){
      updateQuery.orderMinimumAmountMajor = reqBody.orderMinimumAmountMajor
    }

    await couponRepo
      .createQueryBuilder()
      .update(Coupon)
      .set(updateQuery)
      .where({ id: existingCoupon.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };

    return resData
  }
}
