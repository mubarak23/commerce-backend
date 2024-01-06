/* eslint-disable no-await-in-loop */
import { Get, Route, Tags, Request, Post, Body, Controller, Put, Path } from "tsoa";
import * as _ from "underscore";

import { IServerResponse } from "../interfaces/IServerResponse";
import * as OrderService from '../services/orderService'
import * as TemporaryOrderService from '../services/temporaryOrderService'
import { TemporaryOrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { OrderPrepareCartItem } from '../interfaces/OrderPrepareCartItem';
import { TemporaryOrderCreateWithSellerGroupingRequestDto } from "../dto/TemporaryOrderCreateWithSellerGroupingRequestDto";
import NewCartItemRequestDto from "../dto/NewCartItemRequestDto";
import { getFreshConnection } from "../db";
import { NotFoundError } from "../utils/error-response-types";
import { TemporaryOrder } from '../entity/TemporaryOrder';
import { TemporaryOrderDetailsResponseDto } from "../dto/TemporaryOrderDetailsResponseDto";
import { Order } from "../entity/Order";

// DO NOT EXPORT DEFAULT

@Route("api/temporaryorders")
@Tags("Temporary Orders")
export class TemporaryOrdersController extends Controller {

  @Get("/:orderUuid")
  public async handleFetchTemporaryOrderDetails(
    @Path("orderUuid") orderUuid: string
  ): Promise<IServerResponse<TemporaryOrderDetailsResponseDto>> {
    const connection = await getFreshConnection();
    const temporaryOrderRepo = connection.getRepository(TemporaryOrder);
    const temporaryOrder = await temporaryOrderRepo.findOne({ uuid: orderUuid });

    if (!temporaryOrder) {
      throw new NotFoundError("Order was not found");
    }

    const fullOrderDetails = await TemporaryOrderService.temporaryOrderDetails(temporaryOrder);

    const resData: IServerResponse<TemporaryOrderDetailsResponseDto> = {
      status: true,
      data: fullOrderDetails,
    };
    return resData;
  }

  @Post("/prepare")
  public async handleTemporaryOrderPreparationFromTemporaryCart(
    @Body() reqBody: {temporaryCartItems: NewCartItemRequestDto[]}
  ): Promise<IServerResponse<OrderPrepareCartItem[]>> {
    const { temporaryCartItems } = reqBody;

    const cartItemsJson = await TemporaryOrderService.temporaryCartToFullCartItemsJson(temporaryCartItems)
    const preparedOrders = await OrderService.prepareOrders(cartItemsJson);
    
    const resData: IServerResponse<OrderPrepareCartItem[]> = {
      status: true,
      data: preparedOrders,
    };
    return resData;
  }

  @Post("/temporary/create/frompreparedcart")
  public async handleTemporaryOrderCreationFromPreparedCart(
    @Body() requestBody: TemporaryOrderCreateWithSellerGroupingRequestDto
  ): Promise<IServerResponse<TemporaryOrderPayResponseDto>> {    
    const createdOrders = await TemporaryOrderService.processTemporaryOrderCreationFromPrepared(
      requestBody);

    const orderPayResponse = await TemporaryOrderService.processTemporaryOrdersPayment(
      requestBody, createdOrders,
    );

    const resData: IServerResponse<TemporaryOrderPayResponseDto> = {
      status: true,
      data: orderPayResponse,
    };

    return resData;
  }

  // paidTemporaryOrderDetails
  @Post("/temporary/paid/")
  public async handlePaidTemporaryOrder(
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    @Body() requestBody: {temporaryOrderUuids: string[], reference: string}
  ): Promise<IServerResponse<any>> {    
    const realOrders = await TemporaryOrderService.paidTemporaryOrderDetails(requestBody.temporaryOrderUuids, requestBody.reference)

    const resData: IServerResponse<Order[]> = {
      status: true,
      data: realOrders,
    };

    return resData;
  }

}
