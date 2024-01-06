import { ProjectPaymentPlan } from "../enums/ProjectEnums";

export interface NewProjectRequestDto {
  name: string,
  details: string,
  type: string,
  costPerSlot: number,
  initialInvestmentPercentage: number,
  numberOfSlots: number,
  startDate: Date,
  address: string,
  state: string,
  minimumNumberOfSlot?: number,
  duration: number,
  paymentPlan?: ProjectPaymentPlan
}