import { ProjectPaymentPlan } from "../enums/ProjectEnums";

export interface NewUpdateProjectRequestDto {
  name?: string | null,
  details?: string | null,
  type?: string | null,
  costPerSlot?: number | null,
  initialInvestmentPercentage?: number | null,
  numberOfSlots?: number | null,
  startDate?: Date | null,
  minimumNumberOfSlot?: number | null,
  duration?: number | null,
  address?: string | null,
  state?: string | null,
  paymentPlan?: ProjectPaymentPlan | null
}