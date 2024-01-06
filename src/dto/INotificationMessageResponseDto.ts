import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";

export interface INotificationMessageResponseDto {
  uuid: string,
  type: NotificationMessageTypes,
  metadata?: NotificationMetadata,
  title: string,
  message: string,
  
  isRead: boolean,
  createdAt?: Date | null,
  readAt?: Date | null
}
