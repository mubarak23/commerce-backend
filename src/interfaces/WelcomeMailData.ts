import { CooperateUserRole } from "../enums/CooperateUserRole";
import { Roles } from "../enums/Roles";

export interface WelcomeMailData {
  email: string,
  firstName: string,
  phoneNumber?: string,
  role?: CooperateUserRole | Roles
}
