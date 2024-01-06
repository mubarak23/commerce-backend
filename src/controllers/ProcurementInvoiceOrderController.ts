/* eslint-disable no-await-in-loop */
import { Body, Controller, Get, Path, Post, Request, Route, Security, Tags } from "tsoa";
import * as _ from "underscore";

import { In } from "typeorm";
import { getFreshConnection } from "../db";
import { CreateOrderFromInvoiceRequestDto } from "../dto/CreateOrderFromInvoiceRequestDto";
import { orderByUuidsDto } from "../dto/orderByUuidsDto";
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { Order } from '../entity/Order';
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";
import { CurrencyToSymbol } from "../enums/Currency";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { IProcurementInvoicetem } from "../interfaces/IProcurementInvoicetem";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as OrderService from '../services/orderService';
import * as InvoiceService from "../services/procurementInvoiceService";
import * as ProfileService from "../services/profileService";
import { UnprocessableEntityError } from "../utils/error-response-types";

// DO NOT EXPORT DEFAULT

@Route("api/procurementinvoiceorders")
@Tags("Procurement Invoice Orders")
@Security("jwt")
export class ProcurementInvoiceOrderController extends Controller {

  private async ensureOrderCreateForInvoiceIsOkay(
    procurementInvoice: ProcurementInvoice,
    invoiceItems: IProcurementInvoicetem[],
  ): Promise<boolean> {
    const procurementInvoiceItems = procurementInvoice.invoiceItem;

    for(const invoice of invoiceItems) {
      const doesItemExist = procurementInvoiceItems.find(item => item.productUuid === invoice.productUuid)
      if(!doesItemExist){
        throw new UnprocessableEntityError('Item Does Not Exist in the Procurement Invoice')
      }
    }
    return true
  }

  @Post('/create/procurmentinvoice/:procurementInvoiceUuid/:orderPaymentVariant')
  public async handleCreateOrderFromInvoice(@Request() req: any,
    @Path("procurementInvoiceUuid") uuid: string,
    @Path("orderPaymentVariant") orderPaymentVariant: OrderPaymentVariant,
    @Body() reqBody: CreateOrderFromInvoiceRequestDto
   ): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const wareHouseRepo = connection.getRepository(WareHouse)
    
    const defaultWareHouseDetails = await wareHouseRepo.findOne({
      where: {
       uuid: reqBody.wareHouseUuid,
        accountId: currentUser.accountId, 
        isSoftDeleted: false
      }
    })
    if(!defaultWareHouseDetails) {
      throw new UnprocessableEntityError('Please create a default wareHouse')
    }
    //--
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
    const procurementInvoice = await procurementInvoiceRepo.findOne({ 
      uuid,
    })

    if(!procurementInvoice) {
      throw new UnprocessableEntityError('Cannot create orders from an Procurement invoice that does not exist')
    }
    if(procurementInvoice.orderCreated) {
      throw new UnprocessableEntityError('Cannot create order from a procurement invoice that has already been used')
    }
    //--
    const productUuids: string[] = reqBody.invoiceItems.map(productItem => productItem.productUuid )
    if(!productUuids.length) {
      throw new UnprocessableEntityError('Please select some products from the invoice')
    }

    const productRepo = connection.getRepository(Product)
    const products = await productRepo.find({
      uuid: In(productUuids)
    })
    if(!products.length) {
      throw new UnprocessableEntityError('The selected products were NOT found')
    }
    if(products.length !== productUuids.length) {
      throw new UnprocessableEntityError('Some products were not found. Please select valid products and try again.')
    }

    await this.ensureOrderCreateForInvoiceIsOkay(procurementInvoice, reqBody.invoiceItems)

    const ordersCreated = await InvoiceService.processOrderCreationFromInvoice(
      currentUser, defaultWareHouseDetails, procurementInvoice, 
      reqBody.invoiceItems, products, orderPaymentVariant
    )

    const orderPayResponse = await OrderService.processOrdersPayment(
      ordersCreated,
      orderPaymentVariant,
      currentUser
    );
    
    await InvoiceService.completeOrderCreationFromInvoice(ordersCreated, defaultWareHouseDetails,
       procurementInvoice, currentUser, products)
    
    const resData = {
      status: true,
      data: orderPayResponse,
    }
    return resData
  }

  @Post('/OrdersByUuids/')
  public async handleGetPaidOrderByUuid(@Request() req: any,
  @Body() reqBody: orderByUuidsDto,
   ): Promise<IServerResponse<OrderDetailsResponseDto[]>> {
    const currentUser: User = req.user;
    const connection = await getFreshConnection()
    const orderRepo =  connection.getRepository(Order);

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    }
    const orderLists = await orderRepo.find({
      where:  { uuid: In(reqBody.orderUuids), buyerUserId: currentUser.id } ,
      join
    })
     
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

        calculatedTotalCostMajor: order.calculatedTotalCostMajor,
        deliveryCostMajor: order.deliveryCostMajor,
        currency: order.currency,
        currencySymbol,
        createdAt: order.createdAt,
      };
    })

     const resData = {
      status: true,
      data: transformedOrderListsDataset
    };
    return resData
    
  }

  @Get('/:procurementInvoiceUuid/decline')
  public async handleDeclineInvoice(@Request() req: any,
  @Path("procurementInvoiceUuid") procurementInvoiceUuid: string
   ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const connection = await getFreshConnection()
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
    const exisitngProcurementInvoice = await procurementInvoiceRepo.findOne({
      uuid: procurementInvoiceUuid,
      accountId: currentUser.accountId
    })

    if(!exisitngProcurementInvoice){
      throw new UnprocessableEntityError('Procurement Invoice Does Not Exist')
    } 
    if(exisitngProcurementInvoice.orderCreated){
      throw new UnprocessableEntityError('Cannot Decline Procurement Invoice That Has Already Been Proccessed')
    }

    await InvoiceService.declineInvoice(exisitngProcurementInvoice)

    const resData = {
      status: true,
    };
    return resData
}

}
