import { IMonthEarningResponseDto, IYearEarningResponseDto } from "./IEarningResponseDto";

export interface ISellerDashboardStats {
  totalRevenueMajor: number;
  totalRevenueCurrency: string;
  totalRevenueCurrencySymbol: string;
  
  totalOrdersCount: number;
  totalPendingOrdersCount: number;
  totalPendingQuoteRequestsCount: number;

  yearEarnings: IYearEarningResponseDto[];
  monthEarnings: IMonthEarningResponseDto[];
}
