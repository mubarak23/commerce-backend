import { Roles } from "../enums/Roles";
import { MortgageAccountVerificationUpload } from "../interfaces/MortgageAccountVerificationUpload";
import { IPublicProfile } from "./IProfileResponse";

export interface DeveloperAccountVerificationResponseDto {
  uuid: string,
  developerPublicProfile: IPublicProfile;
  accountType: Roles,
  bankStatement: MortgageAccountVerificationUpload,
  bankStatementApproved: boolean,
  governmentApprovedId: MortgageAccountVerificationUpload,
  governmentApprovedIdApproved: boolean,
  recentUtilityBill: MortgageAccountVerificationUpload,
  recentUtilityBillApproved: boolean,
  cacCertificate: MortgageAccountVerificationUpload,
  cacCertificateApproved: boolean,
  isApproved: boolean,
  accountConfirmed: boolean
}

export interface DeveloperAccountVerificationResponseAdminDto extends DeveloperAccountVerificationResponseDto{
  id: number,
}
