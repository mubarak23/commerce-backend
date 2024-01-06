
import DeveloperAccountActivationType from "../enums/DeveloperAccountActivationType";
import { ICloudFile } from "../interfaces/ICloudFile";
export interface IJwtPayload {
  uuid: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  email?: string,
  accountId?: number,
  isSeller?: boolean,
  isCooperate: boolean,
  isDeveloper: boolean,
  isDeveloperAccountApprovedAndConfirm: DeveloperAccountActivationType,
  isInvestor: boolean,
  companyName?: string,
  warehouseUuid: string | null,
  cooperateUserRole: string | null,
  photo?: ICloudFile,
  adminCanEdit: boolean | null,
  adminCanView: boolean | null,
  updateBusinessInfo: boolean | null
}
