import axios, { AxiosResponse } from "axios"
import { MonoDirectPayRequestDto } from "../../dto/MonoDirectPayRequestDto"
import { MonoDirectPayResponseDto } from "../../dto/MonoDirectPayResponseDto"
import { MonoPayingUser } from "../../interfaces/MonoPayingUser"
import * as Utils from '../../utils/core'
import { ServerError } from "../../utils/error-response-types"


export const initializeDirectPayment = async (payingUser: MonoPayingUser, payload: MonoDirectPayRequestDto): Promise<MonoDirectPayResponseDto> => {
  const baseURL = 'https://api.withmono.com/v1/payments/initiate'

  const headers = {
    'accept': 'application/json',
    'mono-sec-key': `${process.env.MONO_SEC_KEY}`,
    'content-type': 'application/json',
  }

  const amountMinor = (payload.amount || 0)
  const cinderbuildReference = Utils.generateUniqueReference(12);
  try {
  
    const postPayload = {
      amount: amountMinor,
      type: payload.type,
      reference: cinderbuildReference,
      description: payload.description,
      redirect_url: payload.redirectUrl,
      meta: payingUser
    }  
    console.log('payload', postPayload) 
    console.log('headers', headers)
    const response: AxiosResponse<any> = await axios.post(baseURL, postPayload, {
      headers
    })


    if (!response.data || response.status !== 200) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    console.log('mono response: ', response)
    // eslint-disable-next-line camelcase
    const { id, type, amount, description, payment_link, created_at, updated_at,  reference } = response.data
    
    return {
      // eslint-disable-next-line camelcase
      id, reference: cinderbuildReference, type, amount, description, paymentLink:payment_link , createdAt: created_at, updatedAt: updated_at
    }
  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log('error', e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
  }
}

export const verifyMonoDirectPayTransaction = async (transactionReference: string): Promise<string> => {
  const baseURL = 'https://api.withmono.com/v1/payments/verify'

  const headers = {
    'mono-sec-key': `Bearer ${process.env.MONO_SEC_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache'
  }


  try {
  
    const postPayload = {
      reference: transactionReference
    }  
    console.log(postPayload) 
    const response: AxiosResponse<any> = await axios.post(baseURL, postPayload, {
      headers
    })


    if (!response.data || response.status !== 200) {
      throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
    }
    console.log('mono trn response: ', response)
    // eslint-disable-next-line camelcase
    return  response.data.data

     
  } catch(e) {
    const errorMessage = Utils.handleAxiosRequestError(e)
    console.log(`e handleAxiosRequestError message: `, errorMessage)
    console.log(`e message: `, e.message)
    console.log(e.stack)

    throw new ServerError('An error occurred with our payment provider. Please try again at a later time.')
  }
}
