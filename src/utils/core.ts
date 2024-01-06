/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosError } from 'axios';
import bcrypt from "bcrypt";
import Joi from 'joi';
import moment from 'moment';
import _normalizeEmail from 'normalize-email';
import * as _ from 'underscore';
import validator from 'validator';

import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { ProductionEnv } from '../constants';
import { getFreshConnection } from '../db';
import { Order } from '../entity/Order';
import { Product } from '../entity/Product';
import { Promotion } from '../entity/Promotion';
import { SupportedCountry } from '../entity/SupportedCountry';
import { CountryToCurrency } from '../enums/Currency';
import { FileCloudProviders, UploadFileCategory } from '../enums/FileUpload';
import OrderStatuses from '../enums/Statuses';
import { ICloudFile } from '../interfaces/ICloudFile';
import { BadRequestError } from './error-response-types';


export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
	return typeof obj === "undefined" || obj === null
}

export const serverDomain = () => {
  return process.env.NODE_ENV === ProductionEnv ? 
    'www.cinderbuild.com' : 'cinderbuilddemo.herokuapp.com'
}

export function formatDate(date: Date){
  const formattedDate = new Date(date).toLocaleDateString('en-US', 
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return formattedDate
}

export function CurrencyFormatter (total: number) {
  return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const validateAJoi = (joiSchema: Joi.AnySchema, object: any): boolean => {
  const validationResults = joiSchema.validate(object, {
    abortEarly: false, 
    allowUnknown: true
  })

  if (!validationResults.error) {
    return false
  }
  throw new BadRequestError(validationResults.error.message)
}

export const normalizeMoney = (moneyAmount: number) => {
  return Math.round((moneyAmount + Number.EPSILON) * 100) / 100
}

export const getPriceForBuyer = (price: number | undefined, product?: Product): number => { 
  const percentageMargin = product?.category?.settings?.cinderbuildProfiltMargin?.amountMajor ?? 0
  if(price) {
    const cinderbuildProfitMargin = (percentageMargin / 100) * price
    const priceForBuyer =  normalizeMoney(price + cinderbuildProfitMargin) 
    return priceForBuyer
  }
  return 0
}

export const normalizeEmail = (email: string) => {
  return _normalizeEmail(email).trim().toLowerCase();
}

export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
}


export const utcNow = () => {
  return moment.utc().toDate()
}

export const standardizeDateTime = (dateTime: string) => {
  return moment.utc(dateTime).toDate()
}

function rand(min: number, max: number) {
  const random = Math.random()
  return Math.floor(random * (max - min) + min)
}

export const currentDateFormatted = () => {
  const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1 and pad with leading zeros
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
return formattedDate
}

export const generateOtp = (length: number) => {
  if (process.env.NODE_ENV !== ProductionEnv) {
    return '111111111111111111'.substring(0, length)
  }

  let otp = ''
  const digits = '0123456789'

  while (otp.length < length) {
    const charIndex = rand(0, digits.length - 1)
    otp += digits[charIndex]
  }
  return otp
}

export const generatePasswordHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const passwordSalt = await bcrypt.genSalt(saltRounds);
  
  return bcrypt.hash(password, passwordSalt);
}

export const pickWithRoundRobin = (lastIndex: number, candidateIds: any[]) => {
  if(lastIndex === -1 || lastIndex === candidateIds.length - 1) {
    return candidateIds[0]
  }
  return candidateIds[lastIndex + 1]
}

export const getOrderEntityReferenceNumber = (entity: {id: number}) => {
  return `${10000 + entity.id}`
}
export const getInvoiceEntityReferenceNumber = (entity: {id: number}) => {
  return `${20000 + entity.id}`
}

export const handleAxiosRequestError = (error: AxiosError) => {
  if (error.response) {
    /*
    * The request was made and the server responded with a
    * status code that falls out of the range of 2xx
    */
    return error.response.data.error
  }
  if (error.request) {
    /*
    * The request was made but no response was received, `error.request`
    * is an instance of XMLHttpRequest in the browser and an instance
    * of http.ClientRequest in Node.js
    */
    const errorMessage = 'The server seems down at the moment. Please try again later.'
    return errorMessage
  }

  // Something happened in setting up the request and triggered an Error
  return error.message
}

export const jsonbArrayValue = (array: any[]) => {
  return `'${JSON.stringify(array)}'`
}

export const setArrayColumnQueryOnQueryBuilder = (queryBuilder: SelectQueryBuilder<BaseEntity>,
    columnName: string, arrayColumnValues: number[]): SelectQueryBuilder<BaseEntity> => {
  const findSellerBusinessQueryBuilder = queryBuilder
    .where(`${columnName} @> '{"${arrayColumnValues[0]}"}'`)

  if(arrayColumnValues.length > 1) {
    for(const item of _.rest(arrayColumnValues)) {
      findSellerBusinessQueryBuilder.orWhere(`${columnName} @> '{"${item}"}'`)
    }
  }
  return findSellerBusinessQueryBuilder
}

export const getPaystackTransactionFeeMajor = (amountMajor: number) => {
  let possibleTransactionFee = (0.015 * amountMajor)
  
  if(amountMajor >= 2500) {
    possibleTransactionFee += 100
  }

  return possibleTransactionFee > 2000 ? 2000 : possibleTransactionFee
}

export const getPaystackTransferFeeMajor = (amountMajor: number) => {  
  if(amountMajor <= 5000) {
    return 10
  } if(amountMajor >= 5001 && amountMajor <= 50000) {
    return 25
  } 
  return 50
}

export const getSupportedCountryFromIso2 = async (iso2: string): Promise<SupportedCountry> => {
  const theDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  const connection = await getFreshConnection()
  const supportedCountriesRepo = connection.getRepository(SupportedCountry)
  const supportedCountries: SupportedCountry[] = await supportedCountriesRepo.find({})

  const foundCountry = supportedCountries.find(supportedCountry => {
    if (theDigits.some(num => iso2.indexOf(num) >= 0)) {
      if (iso2.startsWith('+')) {
        return supportedCountry.phoneCode === iso2.substring(1) // To account for devs sending +234 instead of 234
      }
      return supportedCountry.phoneCode === iso2
    }
    return supportedCountry.iso2 === iso2
  })
  if(!foundCountry) {
    throw new BadRequestError(`The country of the phone-number is NOT supported at this time`)
  }

  return foundCountry
}

export const userDefaultAvatarCloudFile = () => {
  return {
    keyFromCloudProvider: '',
    url: 'https://res.cloudinary.com/trade-grid/image/upload/v1618526995/default_profile_pic_pwfk1s.png',
    mimetype: 'image/png',
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    fileCategory: UploadFileCategory.USER_PHOTO,
  }
}

export const defaultStoreFrontBanner = (): ICloudFile => {
  return {
    keyFromCloudProvider: '',
    url: 'https://res.cloudinary.com/trade-grid/image/upload/v1618526995/default_profile_pic_pwfk1s.png',
    mimetype: 'image/png',
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }
}

export const nextPaymentDate30days = (inputDate: string): any => {
  
  // eslint-disable-next-line no-unused-expressions
  // inputDate.split('T')[0];
  const datePart = inputDate.split('T')[0];
  console.log('datePart', datePart)
  const originalDate = new Date(datePart);
  console.log('originalDate', originalDate)
  // Add 30 days to the original date
  const formattedNextPaymentDate = new Date(originalDate);
  console.log('formattedNextPaymentDate', formattedNextPaymentDate)
  formattedNextPaymentDate.setDate(formattedNextPaymentDate.getDate() + 30);
  console.log('formattedNextPaymentDate + 30', formattedNextPaymentDate)
  
  
 console.log('formattedNextPaymentDate.toISOString()', formattedNextPaymentDate.toISOString())
  return formattedNextPaymentDate.toISOString()
}


export const getOrderStatusUpdateTitle = (order: Order, statusUpdate: OrderStatuses): string => {
  if (statusUpdate === OrderStatuses.CREATED) {
    return `Order: #${order.referenceNumber} is created`
  } if (statusUpdate === OrderStatuses.IN_PROGRESS) {
    return `Order: #${order.referenceNumber} is in progress`
  } if (statusUpdate === OrderStatuses.AVAILABLE_FOR_PICKUP) {
    return `Order: #${order.referenceNumber} is available for pickup`
  } if (statusUpdate === OrderStatuses.AVAILABLE_FOR_DELIVERY) {
    return `Order: #${order.referenceNumber} is available for delivery`
  } if (statusUpdate === OrderStatuses.COMPLETED) {
    return `Order: #${order.referenceNumber} is completed by seller`
  } if (statusUpdate === OrderStatuses.CONFIRMED) {
    return `Order: #${order.referenceNumber} is confirmed by buyer`
  } if (statusUpdate === OrderStatuses.CANCELLED_BY_BUYER) {
    return `Order: #${order.referenceNumber} is cancelled by buyer`
  } if (statusUpdate === OrderStatuses.CANCELLED_BY_SELLER) {
    return `Order: #${order.referenceNumber} is cancelled by seller`
  } if (statusUpdate === OrderStatuses.ENDED_WITH_DISPUTES) {
    return `Order: #${order.referenceNumber} ended with dispute`
  }
  return ''
}

export const countryToCurrencySymbol = (country: string): string => {
  // @ts-ignore
  return CountryToCurrency[country.toUpperCase()] || "₦"
}

export const generateUniqueReference = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}


export const countryToCurrency = (country: string): string => {
  // @ts-ignore
  return CountryToCurrency[country.toUpperCase()] || "NGN"
}
export const getPromoPrice = (promoPercentage: number, price: number): number => {
  return normalizeMoney( (promoPercentage / 100) * price )
}

export const defaultPercentageCharge = (chargePercentage: number, orderAmount: number): number => {
  return normalizeMoney( (chargePercentage / 100) * orderAmount )
}

export const calculateUnitPromoPriceForBuyer = (unitPriceForBuyer: number, promotion?: Promotion): number | undefined => {
  if(promotion) {
    const percentageAmount = normalizeMoney( (promotion.percentage / 100) * unitPriceForBuyer )
    return normalizeMoney( unitPriceForBuyer - percentageAmount )
  }
  return undefined
}
