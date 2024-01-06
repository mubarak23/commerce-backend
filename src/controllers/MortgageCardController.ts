
import { Body, Controller, Get, Post, Request, Route, Security, Tags } from "tsoa";
import ActivateMortgageCardRequestDto from "../dto/ActivateMortgageCardRequestDto";
import { MortgageCardBalanceDto } from "../dto/MortgageCardBalanceDto";
import { MortgageCardDto } from "../dto/MortgageCardDto";
import { User } from "../entity/User";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as MortgageCardService from '../services/mortgageCardService';

@Route("api/mortgagecard")
@Tags('MortgageCard')
export class MortgageCardController extends Controller {
  
  @Security("jwt")
  @Get('/balance')
  public async mainMortgageCardBalance(@Request() req: any): Promise<IServerResponse<MortgageCardBalanceDto>> {
    const currentUser: User = req.user
    
    const mortgagecardBalance = await MortgageCardService.processMortgageCardBalance(currentUser);

    const resData: IServerResponse<MortgageCardBalanceDto> = {
      status: true,
      data: mortgagecardBalance
    }
    return resData
  }

  @Security("jwt")
  @Post("/activate")
  public async createCategories( @Request() req: any, @Body() requestBody: ActivateMortgageCardRequestDto): Promise<IServerResponse<MortgageCardDto>> {
    const activateCard = await MortgageCardService.activateMortgageCard(req.user, requestBody
      .pan)
    this.setStatus(201);
    const resData: IServerResponse<MortgageCardDto> = {
      status: true,
      data: activateCard
    };
    return resData;
  }

  
}
