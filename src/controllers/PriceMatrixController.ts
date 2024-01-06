
import { Controller, Get, Path, Request, Route, Tags } from "tsoa";
import { ProductionEnv } from "../constants";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as PriceMatrixService from "../services/priceMatrixService";

// DO NOT EXPORT DEFAULT

@Route("api/pricematrix")
@Tags("Price Matrix")
export class PriceMatrixController extends Controller {
  @Get('approve/:id')
  public async handleApprovePricesMatrix(@Request() req: Express.Request, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    await PriceMatrixService.processApprovalPriceMatrix(id)
    const redirectUrl = process.env.NODE_ENV === ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app'
    
    this.setStatus(301)
    this.setHeader('Location', redirectUrl)
    const resData: IServerResponse<void> = {
      status: true,
      message: 'Redirecting...',
     url: redirectUrl
    }
    return resData
   
  }

  // processPriceMatrixOrderDeliveryConfirmation

  @Get('confirmdelivery/:id')
  public async handleConfirmDeliveryForPricesMatrix(@Request() req: Express.Request, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    await PriceMatrixService.processPriceMatrixOrderDeliveryConfirmation(id)
    const redirectUrl = process.env.NODE_ENV === ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app'
    
    this.setStatus(301)
    this.setHeader('Location', redirectUrl)
    const resData: IServerResponse<void> = {
      status: true,
      message: 'Redirecting...',
     url: redirectUrl
    }
    return resData
   
  }

  // processDeclinePriceMatrix
  @Get('decline/:id')
  public async handleDeclinePricesMatrix(@Request() req: Express.Request, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    await PriceMatrixService.processDeclinePriceMatrix(id)
    const redirectUrl = process.env.NODE_ENV === ProductionEnv ? 'https://www.cinderbuild.com' : 'https://cinderbuild-dev-002.netlify.app'
    
    this.setStatus(301)
    this.setHeader('Location', redirectUrl)
    const resData: IServerResponse<void> = {
      status: true,
      message: 'Redirecting...',
     url: redirectUrl
    }
    return resData
   
  }
  
}


