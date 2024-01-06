import { Roles } from '../enums/Roles';

export default interface IProfile {
  userUuid: string,
  isOnProductLease?: boolean | null,
  isOnDelayedProductLease?: boolean | null,
  
  firstName: string,
  lastName: string,
  msisdn: string,
  emailAddress?: string | null,
  photoUrl: string,
  role: Roles,
  isCooperate: boolean
  accountId: number,
  wareHouseid: number | null,

  sellerUniqueCode?: string | null,

  accountRating: IRating,
  
  businessProfile?: IBusinessProfile | null
}

export interface IBusinessProfile {
  businessName: string,
  businessAddress: string,
  businessCACNumber: string,
}

export interface IPublicProfile {
  userUuid: string,
  userId?: number | null,
  firstName: string,
  lastName: string,
  photoUrl: string,
  storeFrontBannerImageUrl?: string | null,
  role: Roles,

  sellerUniqueCode?: string | null,
  phoneNumber?: string | null,
  accountRating: IRating,

  businessProfile?: IPublicBusinessProfile | null
}

export interface IPublicBusinessProfile {
  businessName: string,
  businessAddress: string,
}

export interface IRating {
  totalRatingsValue: number
  totalNumberOfRatings: number
}

export interface IPublicProfileForAdmin extends IPublicProfile {
  userId: number,
  msisdn: string,
  phoneNumber: string,
  isSeller: boolean,
  isCooperate: boolean,
  accountId: number,
  walletBalanceMajor: number,
  walletCurrency: string,
}
