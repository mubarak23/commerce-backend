export interface ProductLeaseResponseDto {
  uuid: string;
  principalAmountMajor?: number;
  interestRatePercentage?: number;
  nextLeasePaymentDueDateUtc?: Date;
  totalLoanAmountDueMajor?: number;
  currency?: string;
  createdAtUtc?: Date;
  creditScore?: number,
}
