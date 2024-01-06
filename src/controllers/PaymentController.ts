/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */
import bcrypt from 'bcrypt';
import { Body, Get, Path, Post, Request, Route, Security, Tags } from "tsoa";
import * as _ from 'underscore';
import Logger from '../logger';
const crypto = require('crypto');
import RequestIp = require('@supercharge/request-ip')

import { IServerResponse } from "../interfaces/IServerResponse";
import { BadRequestError, NotFoundError, ServerError, UnauthorizedRequestError, UnprocessableEntityError } from '../utils/error-response-types';

import { getRepository, In } from "typeorm";
import { getFreshConnection } from "../db";
import { MonoDirectPayWebhookResponseDto } from '../dto/MonoDirectPayWebhookResponseDto';
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { PaymentInitialize } from "../dto/PaymentInitialize";
import { PaymentInitializeResponse } from "../dto/PaymentInitializeResponse";
import { DeliveryLocation } from '../entity/DeliveryLocation';
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { MonoDirectPayWebhooks } from '../entity/MonoDirectPayWebhook';
import { Order } from "../entity/Order";
import { PaystackDedicatedNuban } from "../entity/PaystackDedicatedNuban";
import { PaystackWebhook } from "../entity/PaystackWebhook";
import { TemporaryOrder } from '../entity/TemporaryOrder';
import { TempUser } from '../entity/TempUser';
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { ErrorMessages } from "../enums/ErrorMessages";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { PaymentInitializeVariant } from "../enums/PaymentInitializeVariant";
import { FinancialTransactionReferenceType, PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { MonoWebhookStatus, OrderPaymentStatuses } from "../enums/Statuses";
import logger from '../logger';
import * as MortgageCardService from "../services/mortgageCardService";
import * as OnboardingService from "../services/onboardingService";
import * as OrderService from "../services/orderService";
import * as PaymentService from "../services/paymentService";
import * as PaystackService from "../services/paystackService";
import * as WalletService from "../services/walletService";
import * as Utils from '../utils/core';

// DO NOT EXPORT DEFAULT

export interface OrderPayRequestDto {
  password?: string | null;
}

@Route("api/payments")
@Tags('Payments')
export class PaymentsController {

  @Post('/pay/order/:orderUuid/paymentVariant/:orderPaymentVariant')
  @Security('jwt')
  public async handlePayForExistingOrder(@Request() req: any,
      @Path() orderUuid: string,
      @Path() orderPaymentVariant: OrderPaymentVariant,
      @Body() reqBody: OrderPayRequestDto,): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user

    if (!orderUuid) {
      throw new NotFoundError('The order was not specified')
    }

    const sourceWallet = await WalletService.getCustomerWallet(currentUser.id)

    if(sourceWallet.walletBalanceMinor < 0){
      throw new UnprocessableEntityError('Funds Your Wallet to Pay For Previously Unpaid Orders')
    }

    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    };

    const order = await orderRepo.findOne({
      where: {
        uuid: orderUuid
      },
      join,
    });

    if(!order) {
      throw new NotFoundError('The order was not found')
    }
    if (order.paymentStatus !== OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
      throw new UnprocessableEntityError('The order has already been paid for')        
    }
    if(orderPaymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY) {
      throw new UnprocessableEntityError('You have to pay with your wallet or by card')
    }

    if(order.buyerUserId !== currentUser.id) {
      throw new UnauthorizedRequestError('You cannot pay for this order because it does not belong to you')
    }

    if (orderPaymentVariant === OrderPaymentVariant.WALLET) {
      const match = await bcrypt.compare(reqBody.password!, currentUser.passwordHash)
      if (!match) {
        throw new UnauthorizedRequestError('User credentials are wrong.')
      }
      const walletRepo = connection.getRepository(Wallet)
      const userWallet = await walletRepo.findOne({ userId: currentUser.id})
      const calculatedTotalCostMinor = order.calculatedTotalCostMajor * 100
      if(userWallet && calculatedTotalCostMinor > userWallet.walletBalanceMinor ){
        
        throw new UnprocessableEntityError('Insufficient balance to process payment of order')
      }
    }
    const orderPayResponse = await OrderService.processOrdersPayment([order], orderPaymentVariant, currentUser)
    
    const resData: IServerResponse<OrderPayResponseDto> = {
      status: true,
      data: orderPayResponse
    }
    return resData
  }

  @Post('/paystack/initialize')
  @Security('jwt')
  public async initializePaystackPayment(@Request() req: any, @Body() reqBody: PaymentInitialize ): Promise<IServerResponse<PaymentInitializeResponse>> {
    const { paymentVariant, amountMajor, } = reqBody
    const currentUser: User = req.user

    if(!process.env.PAYSTACK_SECRET_KEY) {
      throw new ServerError("Sorry, there was a server mis-configuration.")
    }
    const connection = await getFreshConnection()

    if (paymentVariant === PaymentInitializeVariant.FUND_MAIN_WALLET) {
      if (!amountMajor) {
        throw new BadRequestError('Invalid amount')
      }
      if (amountMajor > 1000000) {
        throw new BadRequestError('Amount should not be more than 1 Million NGN')        
      }
    }
    const paymentInitResponse = await PaymentService.initPaystackPayment(currentUser, paymentVariant, amountMajor!)
    
    const resData: IServerResponse<PaymentInitializeResponse> = {
      status: true,
      data: paymentInitResponse
    }
    return resData
  }

  @Post('/paystack/verify/webhook')
  public async verifyPaystackTransaction(@Request() req: any): Promise<IServerResponse<void>> {
    logger.info('Inside verifyPaystackTransaction ...')
    const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;
    console.log(req.body);
    const currentSourceIp: string | undefined = RequestIp.getClientIp(req)
    if(!currentSourceIp) {
      throw new UnprocessableEntityError('Could not fetch source ip address')
    }
    const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220']

    if (!validSourceIps.includes(currentSourceIp)) {
      throw new UnauthorizedRequestError('Invalid source ip. Counterfeit content!!!')
    }
    if (req.body.data.status !== 'success') {
      throw new UnprocessableEntityError('Unsuccessful payment!!!')
    }

    const connection = await getFreshConnection()
    //--
    const paystackWebhooksRepo = connection.getRepository(PaystackWebhook)
    const paystackWebhook = new PaystackWebhook().initialize('', req.body)
    await paystackWebhooksRepo.save(paystackWebhook)
    //--
    const hash = crypto.createHmac('sha512', paystackApiSecretKey).update(JSON.stringify(req.body)).digest('hex')
    if (hash !== req.headers['x-paystack-signature']) {
      throw new UnauthorizedRequestError('Counterfeit content!!!')
    }

    const paystackReference: string = req.body.data.reference
    const status = await PaystackService.checkPaystackTransaction(paystackReference)
    if (status !== 'success') {
      throw new UnauthorizedRequestError('Counterfeit content!!!')
    }
    //--
    let allGood = false
    if (req.body.data.channel === 'dedicated_nuban') {
      allGood = await this.processPaymentByBankTransfer(req)
    } else {
      allGood = await this.processPaymentByCard(req)
    }
    //--
    if (allGood) {
      paystackWebhook.isProcessed = true
      await paystackWebhook.save()
    }

    const resData: IServerResponse<void> = {
      status: allGood,
    }
    return resData
  }

  private async processPaymentByBankTransfer(req: any): Promise<boolean> {
    if (!req.body.data?.customer?.customer_code || !req.body.data?.metadata?.receiver_account_number) {
      Logger.error('customer code and receiver account number not present')
      throw new BadRequestError('customer code and receiver account number not present')
    }
    const paystackDedicatedNubanRepo = getRepository(PaystackDedicatedNuban)
    const financialTransactionRepo = getRepository(FinancialTransaction)
  
    const paystackDedicatedNuban = await paystackDedicatedNubanRepo.findOne({
      paystackCustomerId: `${req.body.data.customer.id}`,
      bankAccountNumber: req.body.data.metadata.receiver_account_number,
      bankName: req.body.data.metadata.receiver_bank
    })
    if (paystackDedicatedNuban) {
      const transaction = await financialTransactionRepo.findOne({
        reference: req.body.data.reference,
        referenceType: FinancialTransactionReferenceType.PAYSTACK
      })
      if (transaction && transaction.paidStatus === PaymentTransactionStatus.PAID) {
        return true
      }
      const amountMinor = req.body.data.amount
      const {userId} = paystackDedicatedNuban
  
      const sourceWallet = await WalletService.getCustomerWallet(userId)
      const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor
      const metadata: FinancialTransactionMetadata = {
      }
  
      const financialTransaction = new FinancialTransaction().initialize(
        sourceWallet, PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET,
        amountMinor, walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransactionStatus.UNPAID,
        req.body.data.reference, metadata)
      financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} main wallet fund.`
      
      const transactionRepo = getRepository(FinancialTransaction)
      const savedTransaction = await transactionRepo.save(financialTransaction)
  
      const result = await PaymentService.processVerifiedPaystackPayment(savedTransaction, 
        OrderPaymentVariant.WALLET, sourceWallet
      )
  
      return result ?? false
    }
    return true
  }

  private async processPaymentByCard(req: any): Promise<boolean> {
    let allGood = false
    const paystackReference: string = req.body.data.reference

    const connection = await getFreshConnection()
    const financialTransactionRepo = connection.getRepository(FinancialTransaction)

    const unPaidTransactions = await financialTransactionRepo.find({
      reference: paystackReference,
      referenceType: FinancialTransactionReferenceType.PAYSTACK
    })
    if(!unPaidTransactions.length) {
      throw new NotFoundError(ErrorMessages.PAYMENT_TRANSACTION_NON_EXISTENCE)
    }
    const firstUnpaidTransaction = unPaidTransactions[0]

    if (firstUnpaidTransaction.paidStatus === PaymentTransactionStatus.PAID) {
      return true
    }
    const payingUserId = firstUnpaidTransaction.userId

    await this.ensureTemporaryOrderAndUser(paystackReference)
    console.log('Did we reach here')
    if(firstUnpaidTransaction.transactionType === PaymentTransactionTypes.EXTERNAL_TO_PAY_FOR_ORDER) {    
      try {
        for (const transaction of unPaidTransactions) {
          const sourceWallet = await WalletService.getCustomerWallet(payingUserId)

          allGood = await PaymentService.processVerifiedPaystackPayment(transaction, 
            OrderPaymentVariant.CARD, sourceWallet
          )
          if (!allGood) {
            logger.info(`allGood is false from: processVerifiedPaystackPayment. transaction uuid: `, transaction.uuid)
          }
        }
      } catch (e) {
        logger.error(e)
      }
      return true
    }

    const sourceWallet = await WalletService.getCustomerWallet(payingUserId)

    allGood = await PaymentService.processVerifiedPaystackPayment(firstUnpaidTransaction, 
      OrderPaymentVariant.CARD, sourceWallet
    )
    return false
  }

  private async ensureTemporaryOrderAndUser(paystackReference: string) {
    console.log('inside ensure Temporary Order And User')

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const orderReop = connection.getRepository(Order)
    const financialTransactionRepo = connection.getRepository(FinancialTransaction)
    const temporaryOrderRepo = connection.getRepository(TemporaryOrder)

    const unPaidTransactions = await financialTransactionRepo.find({
      reference: paystackReference,
      referenceType: FinancialTransactionReferenceType.PAYSTACK,
      paidStatus: PaymentTransactionStatus.UNPAID
    })

    const temporaryOrderUuids = unPaidTransactions
      .filter(unPaidTrans => unPaidTrans.metadata?.temporaryOrderUuid)
      .map(unPaidTrans => unPaidTrans.metadata?.temporaryOrderUuid)
      console.log(temporaryOrderUuids)
    if(!temporaryOrderUuids.length) {
      return
    }
   
    const temporaryOrders = await temporaryOrderRepo.find({
      where: {
        uuid: In(temporaryOrderUuids),
      },
      join: {
        alias: "temporaryOrder",
        leftJoinAndSelect: {
          pickupLocation: "temporaryOrder.pickupLocation",
        },
      },
    });
    
    const buyerDetails = temporaryOrders[0].buyerUser
    console.log('Buyer from temp',buyerDetails)

    let savedUser: User | undefined ;
    let userWallet: Wallet | undefined;

    let existingUser = await userRepo.findOne({
      msisdn: buyerDetails.msisdn,
    })
    console.log(`Existing buyer phone number`, existingUser)
    if(existingUser) {
      userWallet = await WalletService.getCustomerWallet(existingUser.id)
      savedUser = existingUser
    }else{
      existingUser = await userRepo.findOne({
        emailAddress: buyerDetails.emailAddress,
      })
      console.log(`Existing buyer email`, existingUser)
      if(existingUser) {
        userWallet = await WalletService.getCustomerWallet(existingUser.id)
        savedUser = existingUser
      }
    }
    
   if(!existingUser){
    const passwordHash = await Utils.generatePasswordHash(Utils.generateOtp(24));
    const tempUser = new TempUser().initializeFromBuyerDetails(buyerDetails.fullName,
      buyerDetails.msisdn, buyerDetails.emailAddress, passwordHash)

     savedUser = await OnboardingService.saveNewUser(tempUser, buyerDetails.msisdn, 'Nigeria')
     userWallet = await WalletService.getCustomerWallet(savedUser.id)
   }
    
    let deliveryLocation: DeliveryLocation | undefined;

    for(const tempOrder of temporaryOrders) {
      if(tempOrder.orderReceiveType === OrderReceiveTypes.DELIVERY) {
        const { address, country, state, contactFullName, contactPhoneNumber } = tempOrder.deliveryDetails!
  
        deliveryLocation = new DeliveryLocation().initialize(savedUser!.id, address,
          country, state, contactFullName!, contactPhoneNumber!);
        
        await deliveryLocation.save()
        break;
      }
    }

    await financialTransactionRepo.createQueryBuilder()
      .update(FinancialTransaction)
      .set({
        userId: savedUser!.id,
        walletId: userWallet!.id,
      })
      .where({
        id: In(unPaidTransactions.map(unPaidTrans => unPaidTrans.id)),
      })
      .execute()

    const orders: Order[] = []
    for(const tempOrder of temporaryOrders) {
      if(tempOrder.orderReceiveType === OrderReceiveTypes.DELIVERY) {
        const createdOrders = await OrderService.createOrdersFromTemporaryOrders(savedUser!, tempOrder.orderItems,
          tempOrder.orderReceiveType, OrderPaymentVariant.CARD, tempOrder.uuid,
          deliveryLocation, undefined, undefined
        );
        console.log('created orders for delivery', createdOrders)
        orders.push(...createdOrders);
      } else {
        const createdOrders = await OrderService.createOrdersFromTemporaryOrders(savedUser!, tempOrder.orderItems,
          tempOrder.orderReceiveType, OrderPaymentVariant.CARD, tempOrder.uuid,
          undefined, undefined, tempOrder.pickupLocation
        );
        console.log('created orders for pickup',createdOrders)
        orders.push(...createdOrders);  
      }
    }

    for(const order of orders) {
      const unPaidTransactionsForOrderIndex = unPaidTransactions.findIndex((transaction) => 
        transaction.metadata?.temporaryOrderUuid === order.temporaryOrderUuid)
      const unPaidTransaction = unPaidTransactions[unPaidTransactionsForOrderIndex]
      
      await orderReop.createQueryBuilder()
        .update(Order)
        .set({ paymentTransactionUuid: unPaidTransaction!.uuid })
        .where({ id: order.id })
        .execute()
      
      unPaidTransactions.splice(unPaidTransactionsForOrderIndex, 1)
      console.log('transction left', unPaidTransactions)
    }
  }

  @Get('/paystack/dedicated-account')
  @Security('jwt')
  public async dedicatedAccount(@Request() req: any): Promise<IServerResponse<Omit<PaystackDedicatedNuban, 'id'>>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()
    
    const paystackDedicatedNubanRepo = connection.getRepository(PaystackDedicatedNuban)
    let paystackDedicatedNuban = await paystackDedicatedNubanRepo.findOne({userId: currentUser.id})

    if (!paystackDedicatedNuban) {
      paystackDedicatedNuban = await PaystackService.createDedicatedNuban(currentUser)

      if (!paystackDedicatedNuban) {
        throw new NotFoundError('Dedicated account not found. Please contact support')        
      }
    }
    
    const resData: IServerResponse<Omit<PaystackDedicatedNuban, 'id'>> = {
      status: true,
      data: _.omit(paystackDedicatedNuban, 'id')
    }
    return resData
  }
  @Get("/orders/:reference")
  public async handlePaidTOrderByPaymentReference(
    @Request() req: any,
    @Path("reference") reference: string
  ):Promise<IServerResponse<OrderDetailsResponseDto[]>> {    
    const realOrders = await  OrderService.ordersByPaymentReference(reference)
    const fullOrderDetails = []
    for(const order of realOrders){
       const responseOrder = await OrderService.orderDetails(order);
       fullOrderDetails.push(responseOrder)
    }
    const resData: IServerResponse<OrderDetailsResponseDto[]> = {
      status: true,
      data: fullOrderDetails,
    };
    return resData;
  }

  @Post('/mono/verify/webhook')
  public async processMonoWebhookTransaction(@Request() req: any): Promise<IServerResponse<void>> {
    logger.info('Inside processMonoWebhookTransaction ...')
    const connection = await getFreshConnection();
    const monoDirectPayWebhooksT  = connection.getRepository(MonoDirectPayWebhooks);
    console.log(req.body);
    // const currentSourceIp: string | undefined = RequestIp.getClientIp(req)
    // if(!currentSourceIp) {
    //   throw new UnprocessableEntityError('Could not fetch source ip address')
    // }
    // const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220']

    // if (!validSourceIps.includes(currentSourceIp)) {
    //   throw new UnauthorizedRequestError('Invalid source ip. Counterfeit content!!!')
    // }
    const payload: MonoDirectPayWebhookResponseDto = {
      id: req.body.data.id,
      type: req.body.data.type,
      event: req.body.event,
      reference: req.body.data.object.reference,
      status: req.body.data.object.status,
      amount: req.body.data.object.amount,
      description: req.body.data.object.description,
      fee: req.body.data.object.fee,
      currency: req.body.data.object.currency,
      liveMode: req.body.data.object.liveMode,
      createdAt: req.body.data.object.created_at,
      updatedAt: req.body.data.object.updated_at
    }
    console.log('payload', payload)
    console.log('req.body.data.status', req.body.data.object.status)
    
    if (req.body.data.object.status !== MonoWebhookStatus.SUCCESSFULL) {
    // store webhook response from mono for failed
    const newMonoDirectPayWebhooks = new MonoDirectPayWebhooks().initializeDirectPayWebHookResponse(payload.reference, payload.status, payload.event, payload)
    await monoDirectPayWebhooksT.save(newMonoDirectPayWebhooks);

      throw new UnprocessableEntityError('Unsuccessful payment!!!')
    }
    await MortgageCardService.processMonoDirectPayWebhook(payload)
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData

  }


}


