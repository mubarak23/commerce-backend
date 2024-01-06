import { IPublicProfile } from "./IProfileResponse";
import { ProjectsResponseDto } from "./ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from "./ProjectSubscriptionResponseDto";

export interface ProjectTransactionResponseDto {
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
  project: ProjectsResponseDto,
  investorPublicProfile: IPublicProfile,
  projectSubscriptions: ProjectSubscriptionResponseDto,
  paymentPlanDurationNumber: number,
  nextPaymentDate?: string,
  createdAt: Date
}