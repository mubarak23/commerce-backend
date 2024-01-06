
 
export interface ProcessProjectSubscriptionTransactionResponseDto {
  uuid: string
  investorUserId: number,
  developerUserId: number,
  projectUuid: string,
  projectSubscriptionUuid: string,
  amountBeforeMinor: number,
  amountPaidMinor: number,
  amountAfterMinor: number,
  amountRemainingMinor: number,
  financialTransactionId: number,
  description: string,
  paymentPlanDurationNumber: number,
  createdAt: Date
}
