import { ProjectPaymentPlan, ProjectStatuses } from "../enums/ProjectEnums";
import { ProjectStage } from "../interfaces/ProjectStage";
import { IPublicProfile } from "./IProfileResponse";
import { ProjectSubscriptionResponseDto } from "./ProjectSubscriptionResponseDto";

export interface ProjectsResponseDto {
    projectUuid: string,
    developerPublicProfile: IPublicProfile;
    name: string;
    details: string;
    type: string;
    costPerSlot: number;
    initialInvestmentPercentage: number;
    duration: number;
    paymentPlan: ProjectPaymentPlan;
    numberOfSlots: number;
    status: ProjectStatuses;
    createdAt: Date;
    updatedAt: Date;
    startDate?:  Date | null;
    minimumNumberOfSlot?: number;
    address: string;
    state: string;
    locationOnMap?: string;
    numberOfSlotSold?: number,
    images?: {
      url: string,
      mimetype: string,
    }[] | null,
    projectSubscriptions?: ProjectSubscriptionResponseDto[]| null,
    stages?: ProjectStage<string>[] | null,
    
}