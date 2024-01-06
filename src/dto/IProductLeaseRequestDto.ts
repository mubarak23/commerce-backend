export interface INewProductLeaseRequestDto {
  customerMsisdn?: string | null,
  customerUserId?: number | null,
  principalAmountMinor: number
  interestRatePercentage: number,
}

export interface IEditProductLeaseRequestDto {
  principalAmountMinor: number
  interestRatePercentage: number,
  nextLeasePaymentDueDate: string,
  isActive: boolean,
}

export interface INewProductStatusToggleDto {
  customerMsisdn?: string | null,
  customerUserId?: number | null,
}
