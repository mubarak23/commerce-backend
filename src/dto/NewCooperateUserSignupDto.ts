import { Roles } from "../enums/Roles";

export interface NewCooperateUserSignupDto {
  firstName: string;
  lastName: string;

  phoneNumber: string;
  countryLongName: string;
  findUsOption?: string | null;

  emailAddress: string;
  businessName: string;
  password: string;
  isSeller?: boolean | null;
  isCooperate?: boolean | null;
  role?: Roles | null;
  defaultSellerUniqueCode?: string | null,
}
