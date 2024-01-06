import { CooperateUserRole } from "../enums/CooperateUserRole";

// NewAddUserRequest
export interface AddUserRequestDto {
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber: string;
  emailAddress: string;
  wareHouseUuid?: string | null;
  role: CooperateUserRole
}
