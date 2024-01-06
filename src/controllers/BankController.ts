import { Body, Get, Post, Route, Tags } from 'tsoa'

import { IServerResponse } from '../interfaces/IServerResponse'
import { IPaystackBank } from '../interfaces/IPaystackBank'
import * as PaystackService from '../services/paystackService'
import { NewBankAccountRequestDto } from '../dto/BankAccountRequestDto'

// https://www.npmjs.com/package/paystack-node
// https://medium.com/bithubph/payment-integration-with-node-js-express-request-and-paystack-api-8cebf51c1f52

// DO NOT EXPORT DEFAULT

@Route("api/bank")
@Tags('Bank')
export class BankController {
  
  @Get('/nigerianbanks')
  public async getBanksList(): Promise<IServerResponse<IPaystackBank[]>> {
    const paystackBanks: IPaystackBank[] = await PaystackService.getBanksList()
    const resData: IServerResponse<IPaystackBank[]> = {
      status: true,
      data: paystackBanks
    }
    return resData
  }

  @Post('/account/nameenquiry')
  public async bankAccountNameEnquiry(@Body() reqBody: NewBankAccountRequestDto): Promise<IServerResponse<{account_name: string}>> {
    const { accountNumber, bankCode } = reqBody

    const accountResolveResult = await PaystackService.accountNameEnquiry(bankCode, accountNumber)
    const resData: IServerResponse<{account_name: string}> = {
      status: true,
      data: accountResolveResult
    }
    return resData
  }
}
