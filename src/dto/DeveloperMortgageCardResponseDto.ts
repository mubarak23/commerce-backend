import { IPublicProfile } from "./IProfileResponse";

// DeveloperMortgageCardResponseDto
export interface DeveloperMortgageCardResponseDto {
  pan: string,
  isUsed: boolean,
  isActive: boolean,
  developerUserPublicProfile: IPublicProfile,
  isSoftDeleted: boolean,
  createdAt: Date
}
