import { CooperateUserRole } from "../enums/CooperateUserRole";
import OrderStatuses from "../enums/Statuses";

export interface NotificationMetadata {
  orderUuid?: string | null,
  projectUuid?: string | null,
  userId?: number | null,
  cooperateUserRole?: CooperateUserRole,
  newStatusUpdate?: OrderStatuses | null,
  dateTimeInISO8601?: string | null,
  quoteRequestUuid?: string | null,
  inviteLink?: string | null,
  wareHouseToSiteRequestUuid?: string | null
}
