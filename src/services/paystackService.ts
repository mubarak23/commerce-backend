/* eslint-disable camelcase */
import { PaystackTransferRecipient } from "../entity/PaystackTransferRecipient";
import axios, { AxiosResponse } from 'axios'
import { ServerError } from "../utils/error-response-types";
import { IPaystackBank } from "../interfaces/IPaystackBank";
import { IPaystackResolveAccount } from "../interfaces/IPaystackResolveAccount";
import { getFreshConnection } from "../db";
import { User } from "../entity/User";
import logger from '../logger'
import { PaystackDedicatedNuban } from "../entity/PaystackDedicatedNuban";
import { PaymentInitializeResponse } from "../dto/PaymentInitializeResponse";
import * as Utils from "../utils/core"
import * as Constants from "../constants";
import { PaystackPayingUser } from "../interfaces/PaystackPayingUser";


export const getBanksList = async (): Promise<IPaystackBank[]> => {
  const baseURL = 'https://api.paystack.co/bank?country=nigeria'
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }
  try {
    const response: AxiosResponse<any> = await axios.get(baseURL, {
      headers
    })
    if (!response.data || response.status !== 200) {
      throw new ServerError('An error occurred with our third party. Please try again at a later time.')
    }
    const paystackBanks: IPaystackBank[] = response.data.data
  
    return paystackBanks
  } catch(e) {
    throw new ServerError('An error occurred with our third party. Please try again at a later time.')
  }
}

export const accountNameEnquiry = async (bankCode: string, accountNumber: string): Promise<IPaystackResolveAccount> => {
  if(!process.env.PAYSTACK_SECRET_KEY) {
    throw new ServerError("Sorry, there was a server mis-configuration.")
  }
  const baseURL = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }
  try {
    const response: AxiosResponse<any> = await axios.get(baseURL, {
      headers
    })
    if (!response.data || response.status !== 200) {
      throw new ServerError('An error occurred with our third party. Please try again at a later time.')
    }
    const resolveResult: IPaystackResolveAccount = response.data.data
  
    return resolveResult
  } catch (e) {
    throw new ServerError('An error occurred with our third party. Please try again at a later time.')
  }
}

export const initializeTransaction = async (payingUser: PaystackPayingUser, amountMajor: number): Promise<PaymentInitializeResponse> => {
  const baseURL = 'https://api.paystack.co/transaction/initialize'

  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }

  const amountMinor = (amountMajor || 0) * 100

  try {
    const transactionFeeMajor = Utils.getPaystackTransactionFeeMajor(amountMinor / 100)

    const postPayload: any = {
      amount: (amountMajor * 100) + (transactionFeeMajor * 100),
      email: payingUser.emailAddress ?? `${payingUser.fullName.replace(' ', '.')}@cinderbuild.com`, // MANDATORY
      metadata: {
        full_name: payingUser.fullName,
      }
    }  
    console.log(postPayload) 
    const response: AxiosResponse<any> = await axios.post(baseURL, postPayload, {
      headers
    })


    if (!response.data || response.status !== 200) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    const { authorization_url, reference, access_code } = response.data.data

    return {
      paymentProviderRedirectUrl: authorization_url,
      paymentReference: reference,
      accessCode: access_code,
      redirectUrlAfterPayment: Constants.REDIRECT_URL_AFTER_PAYMENT 
    }
  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
  }
}

export const saveTransferReceipt = async (bankCode: string, accountNumber: string, bankAccountName: string): Promise<PaystackTransferRecipient> => {
  const connection = await getFreshConnection()

  const paystackTransferRecipientRepo = connection.getRepository(PaystackTransferRecipient)
  let paystackTransferRecipient = await paystackTransferRecipientRepo.findOne({
    bankCode,
    accountNumber
  })
  if(paystackTransferRecipient) {
    return paystackTransferRecipient
  }
  //--
  const baseURL = 'https://api.paystack.co/transferrecipient'
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }
  const postPayload = {
    type: "nuban",
    name: bankAccountName,
    account_number: accountNumber,
    bank_code: bankCode,
    currency: "NGN",
  }
  try {
    const response: AxiosResponse<any> = await axios.post(baseURL, postPayload, {
      headers
    })
    console.log(`response.data: `, response.data)

    if (!response.data || response.status !== 201) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    const { recipient_code, active, id, currency } = response.data.data
  
    paystackTransferRecipient = new PaystackTransferRecipient().initialize(accountNumber, bankCode, recipient_code, currency)
    const savedRecipient = await paystackTransferRecipientRepo.save(paystackTransferRecipient)

    return savedRecipient
  } catch(e) {
    throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
  }
}

export const createDedicatedNuban = async (userRecord: User): Promise<PaystackDedicatedNuban> => {
  const connection = await getFreshConnection()

  const paystackDedicatedNubanRepo = connection.getRepository(PaystackDedicatedNuban)
  let paystackDedicatedNuban = await paystackDedicatedNubanRepo.findOne({
    userId: userRecord.id
  })
  if(paystackDedicatedNuban) {
    return paystackDedicatedNuban
  }
  //--
  const createCustomerBaseURL = 'https://api.paystack.co/customer'
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }
  const createCustomerPostPayload = {
    first_name: userRecord.firstName,
    last_name: userRecord.lastName,
    email: userRecord.emailAddress,
    phone: userRecord.msisdn,
  }
  try {
    const createCustomerResponse: AxiosResponse<any> = await axios.post(createCustomerBaseURL, createCustomerPostPayload, {
      headers
    })

    if (!createCustomerResponse.data) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    const { customer_code, integration, id } = createCustomerResponse.data.data
    const customerId = id
    //--
    const updateCustomerBaseURL = `https://api.paystack.co/customer/${customer_code}`
    const updateCustomerPostPayload = {
      first_name: userRecord.firstName,
      last_name: userRecord.lastName,
      phone: userRecord.msisdn,
    }
    const updateCustomerResponse: AxiosResponse<any> = await axios.put(updateCustomerBaseURL, updateCustomerPostPayload, {
      headers
    })
    //--
    const createDedicatedNubanBaseURL = 'https://api.paystack.co/dedicated_account'
    const createDedicatedNubanPostPayload = {
      customer: customerId,
      preferred_bank: process.env.NODE_ENV === Constants.ProductionEnv ? "wema-bank" : "test-bank", // This is intentional.
    }
    const createDedicatedNubanResponse: AxiosResponse<any> = await axios.post(createDedicatedNubanBaseURL, createDedicatedNubanPostPayload, {
      headers
    })

    if (!createDedicatedNubanResponse?.data) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    const { bank, account_name, account_number } = createDedicatedNubanResponse?.data?.data
    const dedicatedNubanActualPayload = createDedicatedNubanResponse?.data?.data
  
    paystackDedicatedNuban = new PaystackDedicatedNuban().initialize(userRecord.id,
      bank.id, bank.name, account_number, account_name, customerId, integration, dedicatedNubanActualPayload)
    const savedDedicatedNuban = await paystackDedicatedNubanRepo.save(paystackDedicatedNuban)

    return savedDedicatedNuban
  } catch(e) {
    logger.error('Error funding wallet: ', e.message)
    console.log(e.stack)
    throw new ServerError('An error occurred. Please try again at a later time.')
  }
}


export const checkPaystackTransaction = async (paystackTransactionReference: string): Promise<string> => {
  const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;

  const baseURL = `https://api.paystack.co/transaction/verify/${encodeURIComponent(paystackTransactionReference)}`

  const headers = {
    'Authorization': `Bearer ${paystackApiSecretKey}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }

  try {
    const response: AxiosResponse<any> = await axios.get(baseURL, {
      headers
    })

    if ((response.status < 200 || response.status >= 210) || !response.data) {
      throw new Error('Sorry, verification failed! Please try again.')
    }

    const { currency, gateway_response, amount, requested_amount, status } = response.data.data
    // const paystackReference = response.data.data.reference

    return status
  } catch (e) {
    throw new ServerError('Paystack verification failed')
  }
}
