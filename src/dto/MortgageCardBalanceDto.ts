export interface MortgageCardBalanceDto {
  pan: string,
  currency: string, 
  currencySymbol: string,
   amountMajor: number
  isUsed: boolean,
  isActive: boolean,
  isSoftDeleted: boolean,
  createdAt: Date
}