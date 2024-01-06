import bcrypt from 'bcrypt';
import moment from 'moment';
import { Body, Controller, Get, Post, Query, Request, Route, Security, Tags } from "tsoa";
import { MoreThan } from 'typeorm';

import { getFreshConnection } from '../db';
import { IEarningResponseDto, IMonthEarningResponseDto } from '../dto/IEarningResponseDto';
import { IFinancialTransactionResponseDto } from '../dto/IFinancialTransactionResponseDto';
import { IPaginatedList } from '../dto/IPaginatedList';
import { WithdrawFundsRequestDto } from '../dto/WithdrawFundsRequestDto';
import { DeliveryFeeWallet } from '../entity/DeliveryWalletFee';
import { EarningsByMonth } from '../entity/EarningsByMonth';
import { EarningsByYear } from '../entity/EarningsByYear';
import { FinancialTransaction } from '../entity/FinancialTransaction';
import { User } from '../entity/User';
import { CurrencyToSymbol } from '../enums/Currency';
import { PaymentTransactionStatus } from '../enums/PaymentTransaction';
import { Roles } from '../enums/Roles';
import { SortOrder } from '../enums/SortOrder';
import { WalletType } from '../enums/WalletType';
import { IServerResponse } from "../interfaces/IServerResponse";
import * as EmailService from '../services/emailService';
import * as OrderService from '../services/orderService';
import { paginate } from '../services/paginationService';
import * as WalletService from "../services/walletService";
import { UnauthorizedRequestError, UnprocessableEntityError } from '../utils/error-response-types';


// DO NOT EXPORT DEFAULT

@Route("api/wallet")
@Tags('Wallet')
@Security("jwt")
export class WalletController extends Controller {
  
  @Get('/main/balance')
  public async mainWalletBalance(@Request() req: any): Promise<IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}>> {
    const currentUser: User = req.user
    
    const wallet = await WalletService.getCustomerWallet(currentUser.id)

    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[wallet.currency ?? 'NGN'] || '₦'

    const resData: IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}> = {
      status: true,
      data: {
        currency: wallet.currency ?? 'NGN',
        currencySymbol,
        amountMajor: (wallet!.walletBalanceMinor || 0) / 100
      }
    }
    return resData
  }

  @Post('/withdraw')
  public async withdraw(@Request() req: any, @Body() reqBody: WithdrawFundsRequestDto): Promise<IServerResponse<IFinancialTransactionResponseDto>> {
    const { amountMajor, password, } = reqBody
    const currentUser: User = req.user

    const match = await bcrypt.compare(password, currentUser.passwordHash)
    if (!match) {
      throw new UnauthorizedRequestError('User credentials are wrong.')
    }
    if(currentUser.role === Roles.AFFILIATE){
      await OrderService.affiliateUnpaidOrder(currentUser)
    }

    const sourceWallet = await WalletService.getCustomerWallet(currentUser.id)
  
    const walletBalanceMinor = sourceWallet?.walletBalanceMinor || 0  
    const amountMinor = amountMajor * 100

    if(walletBalanceMinor < 0) {
      throw new UnprocessableEntityError(`Insufficient balance for your withdrawal including the transaction charge`)
    }

    if(walletBalanceMinor < amountMinor) {
      throw new UnprocessableEntityError(`Insufficient balance for your withdrawal including the transaction charge`)
    }

    if (!currentUser.bankInfo?.bankName && !currentUser.bankInfo?.bankAccountNumber) {
      throw new UnprocessableEntityError('Please set your bank account information')
    }

    const finalFinancialTransaction = await WalletService.saveWithdrawalTransaction(sourceWallet, amountMinor, PaymentTransactionStatus.PAID)

    await EmailService.sendWithdrawalRequestToSupport(currentUser, sourceWallet, currentUser.bankInfo, amountMajor)

    const resData: IServerResponse<IFinancialTransactionResponseDto> = {
      status: true,
      data: finalFinancialTransaction.toResponseDto()
    }

    return resData
  }


  @Get('/transactions')
  public async financialTransactions(@Request() req: any, 
      @Query('pageNumber') pageNumber: any, 
      @Query('sortOrder') sortOrder: SortOrder): Promise<IServerResponse<IPaginatedList<IFinancialTransactionResponseDto>>> {
    const currentUser: User = req.user

    const pageSize = 10
    const query = {
      userId: currentUser.id,
      paidStatus: PaymentTransactionStatus.PAID
    }
    const pageResult = await paginate(FinancialTransaction, query, pageSize, pageNumber, sortOrder)

    const formattedDataSet: IFinancialTransactionResponseDto[] = pageResult.dataset.map(dataRecord => {
      const transaction = dataRecord as FinancialTransaction
      return transaction.toResponseDto()
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet}
    }
    
    return resData
  }

  @Get('/earnings')
  public async earnings(@Request() req: any): Promise<IServerResponse<IEarningResponseDto>> {
    const currentUser: User = req.user
    
    const aYearAgoMoment = moment.utc().add(-12, 'months')

    const connection = await getFreshConnection()

    const earningbyMonthRepo = connection.getRepository(EarningsByMonth)
    const userMonthEarnings = await earningbyMonthRepo.find({
      userId: currentUser.id,
      createdAt: MoreThan(aYearAgoMoment.toDate())
    })

    const formattedMonthEarnings: IMonthEarningResponseDto[] = userMonthEarnings.map(earning => {
      return {
        friendlyMonth: moment(moment(`${earning.monthISO8601}-01`).format("YYYY-MM-DD")).format('MMMM'),
        monthISO8601: earning.monthISO8601,
        totalEarningsMajor: earning.totalEarningsMinor / 100
      }
    })

    const earningsByYearRepo = connection.getRepository(EarningsByYear)
    const year = moment.utc().format('YYYY')
    const userYearEarning = await earningsByYearRepo.findOne({
      userId: currentUser.id,
      year,
    })

    const userYearEarnings = await earningsByYearRepo.find({
      userId: currentUser.id,
    })


    const wallet = await WalletService.getCustomerWallet(currentUser.id)

    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[wallet.currency] || '₦'

    const resData = {
      status: true,
      data: {
        currentYearEarningsMajor: userYearEarning ? userYearEarning.totalEarningsMinor / 100 : 0,
        yearEarnings: userYearEarnings.map(yearEarnings => {
          return {
            year: yearEarnings.year,
            totalEarningsMajor: yearEarnings.totalEarningsMinor / 100
          }
        }),
        monthEarnings: formattedMonthEarnings,
        currency: wallet.currency,
        currencySymbol,
      }
    }
    
    return resData
  }


  @Get('/secondary/balance')
  public async secondaryWalletBalance(@Request() req: any): Promise<IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}>> {
    const currentUser: User = req.user
    
    const wallet = await WalletService.getSecondaryCustomerWallet(currentUser.accountId)

    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[wallet.currency ?? 'NGN'] || '₦'

    const resData: IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}> = {
      status: true,
      data: {
        currency: wallet.currency ?? 'NGN',
        currencySymbol,
        amountMajor: (wallet!.walletBalanceMinor || 0) / 100
      }
    }
    return resData
  }

  @Get('/secondary/transactions')
  public async secondaryDinancialTransactions(@Request() req: any, 
      @Query('pageNumber') pageNumber: any, 
      @Query('sortOrder') sortOrder: SortOrder): Promise<IServerResponse<IPaginatedList<IFinancialTransactionResponseDto>>> {
    const currentUser: User = req.user
    const connection = await getFreshConnection();
    const secondaryWalletRepo = connection.getRepository(DeliveryFeeWallet);
    const secondaryWallet  = await secondaryWalletRepo.findOne({
      accountId: currentUser.accountId,
      type: WalletType.CUSTOMER_WALLET,
    });    
    if(!secondaryWallet){
      throw new UnprocessableEntityError('Secondary Wallet Does Not Exist')
    }
    const pageSize = 10
    const query: any = {
      userId: currentUser.id,
      walletId: secondaryWallet?.id,
      paidStatus: PaymentTransactionStatus.PAID
    }
    const pageResult = await paginate(FinancialTransaction, query, pageSize, pageNumber, sortOrder)

    const formattedDataSet: IFinancialTransactionResponseDto[] = pageResult.dataset.map(dataRecord => {
      const transaction = dataRecord as FinancialTransaction
      return transaction.toResponseDto()
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet}
    }
    
    return resData
  }
}
