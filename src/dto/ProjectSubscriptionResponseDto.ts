import { ProjectStatuses } from "../enums/ProjectEnums";
import { IPublicProfile } from "./IProfileResponse";
import { ProcessProjectSubscriptionTransactionResponseDto } from "./ProcessProjectSubscriptionTransactionResponseDto";
import { ProjectsResponseDto } from "./ProjectResponseDto";

export interface ProjectSubscriptionResponseDto {
  projectSubscriptionUuid: string,
  projectUuid: string,
  project: ProjectsResponseDto,
  developerPublicProfile: IPublicProfile,
  investorPublicProfile: IPublicProfile,
  susbscriptionTransactions?: ProcessProjectSubscriptionTransactionResponseDto[] | null,
  numberOfSlots: number,
  totalAmountMinor: number,
  initialAmountMinor: number,
  amountRemainingMinor: number,
  amountDueMinor: number,
  amountPaidMinor: number,
  amountPerPaymentPlanDurationMinor: number,
  durationPerPaymentPlan: string,
  duration: number,
  durationLeft?: number | 0,
  durationCovered?: number | 0,
  nextPaymentDueDate?: Date | null,
  status: ProjectStatuses,
  createdAt: Date
}