export interface ProcessProjectSubscriptionTransactionDto {
  investorUserId: number,
  developerUserId: number,
  projectId: number,
  projectSubscriptionId: number,
  amountBeforeMinor: number,
  amountPaidMinor: number,
  amountAfterMinor: number,
  amountRemainingMinor: number,
  financialTransactionId: number,
  description: string,
  paymentPlanDurationNumber: number,
  nextPaymentDate: string,
}