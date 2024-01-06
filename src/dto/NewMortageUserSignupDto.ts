import { Roles } from "../enums/Roles";

export interface NewMortageUserSignupDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryLongName: string;
  findUsOption?: string | null;
  emailAddress: string;
  password: string;
  companyName: string;
  cacNumber: string;
  address: string;
  role: Roles;
}
