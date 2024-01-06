export interface NewAffiliateRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress?: string | null;
}
