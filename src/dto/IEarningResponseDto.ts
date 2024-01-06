
export interface IMonthEarningResponseDto {
  friendlyMonth: string;
  monthISO8601: string;
  totalEarningsMajor: number;
}

export interface IYearEarningResponseDto {
  year: string;
  totalEarningsMajor: number;
}

export interface IEarningResponseDto {
  currentYearEarningsMajor: number
  yearEarnings: IYearEarningResponseDto[]
  monthEarnings: IMonthEarningResponseDto[]

  currency: string
  currencySymbol: string
}
