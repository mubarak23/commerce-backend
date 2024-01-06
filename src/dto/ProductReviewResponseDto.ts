import { IPublicProfile } from "./IProfileResponse";

export interface ProductReviewsResponseDto {
  reviewUuid: string,
  reviewerPublicProfile: IPublicProfile,
  rating: number,
  reviewNote: string,
  reviewDateUtc: string,
}
