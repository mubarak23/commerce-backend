export interface ProcessNewProjectSubscriptionDto {
  investorUserId: number,
  developerUserId: number,
  projectId: number,
  numberOfSlots: number,
  totalAmountMinor: number,
  initialAmountMinor: number,
  amountRemainingMinor: number,
  amountPerPaymentPlanDurationMinor: number,
  durationPerPaymentPlan: string,
  duration: number,
}