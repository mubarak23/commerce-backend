import { IPublicProfile } from "../dto/IProfileResponse"

export interface IProductLease {
  uuid: string
  principalAmountMajor: number
  interestRatePercentage: number
  amountDueMajor: number
  nextLeasePaymentDueDateUtc: Date
  totalLoanAmountDue: number
  createdAtUtc: Date

  currency: string
}

export interface IPublicProfileProductLease {
  id: string,
  uuid: string,
  publicProfile: IPublicProfile,
  principalAmountMajor: number
  interestRatePercentage: number
  nextLeasePaymentDueDateUtc: Date
  createdAtUtc: Date

  currency: string
}
