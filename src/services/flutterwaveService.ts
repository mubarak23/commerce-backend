/* eslint-disable @typescript-eslint/no-var-requires */
const Flutterwave = require('flutterwave-node-v3');
import IBankResponseDto from '../dto/IBankResponseDto';
import IBankAccountResolveResponseDto from '../dto/IBankAccountResolveResponseDto';
import Logger from '../logger'
import { ServerError } from '../utils/error-response-types';


export const getBanksList = async (): Promise<IBankResponseDto[]> => {
  const flutterwavePublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
  const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;

  const flw = new Flutterwave(flutterwavePublicKey, flutterwaveSecretKey);

  try {
    const payload = {        
      "country":"NG" // Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively        
    }
    const response = await flw.Bank.country(payload)

    const flutterwaveBanks: IBankResponseDto[] = response.data.map((bank: any) => {
      return {
        code: bank.code,
        name: bank.name,
        country: "NG",
        currency: "NGN",
        active: true,
        type: "",
      }
    })
    return flutterwaveBanks
  } catch (error) {
    throw new ServerError('An error occurred with our third party. Please try again at a later time.')
  }
}

export const accountNameEnquiry = async (bankCode: string, accountNumber: string): Promise<IBankAccountResolveResponseDto> => {
  const flutterwavePublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
  const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;

  const flw = new Flutterwave(flutterwavePublicKey, flutterwaveSecretKey);
  try {
    const payload = {
      "account_number": accountNumber,
      "account_bank": bankCode
    }
    const response = await flw.Misc.verify_Account(payload)
  
    const resolveResult: IBankAccountResolveResponseDto = {
      account_name: response.data.account_name
    }
    return resolveResult
  } catch (e) {
    Logger.error(e)
    throw new ServerError('An error occurred with our third party. Please try again at a later time.')
  }
}
