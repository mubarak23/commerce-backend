import { Roles } from "../enums/Roles";

export interface NewMortageInvestorSignup {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryLongName: string;
  emailAddress: string;
  password: string;
  role: Roles;
}
