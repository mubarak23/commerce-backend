import { Roles } from "../enums/Roles";

export interface NewUserRequestDto {
  firstName: string;
  lastName: string;

  phoneNumber: string;
  countryLongName: string;
  findUsOption?: string | null;

  emailAddress: string;
  password: string;
  isSeller?: boolean | null;
  isCooperate?: boolean | null;
  role?: Roles | null;
  defaultSellerUniqueCode?: string | null,
}
