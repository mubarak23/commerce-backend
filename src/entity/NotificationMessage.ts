import { Entity, Column, JoinColumn, Index } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import TableColumns, { NotificationMessageColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { User } from "./User";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { utcNow } from "../utils/core";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import { INotificationMessageResponseDto } from "../dto/INotificationMessageResponseDto";


export type NotificationWithFbPushToken = NotificationMessage & { fbPushToken: string }

@Entity({ name: Tables.NOTIFICATION_MESSAGES })
@Index(['userId'])
@Index(['userId', 'isRead'])
export class NotificationMessage extends BaseEntity {
  @Column({name: NotificationMessageColumns.UUID, unique: true })
  uuid: string;

  @Column({type: 'bigint', name: NotificationMessageColumns.USER_ID })
  userId: number;

  @JoinColumn({name: NotificationMessageColumns.USER_ID, referencedColumnName: TableColumns.ID})
  user: User;

  @Column({name: NotificationMessageColumns.TYPE, nullable: false })
  type: NotificationMessageTypes;

  @Column({type: 'jsonb', name: NotificationMessageColumns.METADATA, nullable: true })
  metadata?: NotificationMetadata;

  @Column({type: 'text', name: NotificationMessageColumns.TITLE, nullable: true })
  title: string;

  @Column({type: 'text', name: NotificationMessageColumns.MESSAGE })
  message: string;

  @Column({type: 'boolean', name: NotificationMessageColumns.IS_READ, nullable: false, default: false})
  isRead: boolean

  @Column({type: 'timestamptz', name: NotificationMessageColumns.READ_AT, nullable: true})
  readAt?: Date


  initialize(userId: number, type: NotificationMessageTypes, title: string, message: string, metadata?: NotificationMetadata) {
    this.uuid = uuidv4()
    this.userId = userId
    this.type = type
    this.title = title
    this.message = message
    this.metadata = metadata

    this.isRead = false
    this.readAt = undefined
    this.createdAt = utcNow()

    return this
  }

  toResponseDto(): INotificationMessageResponseDto {
    const responseDto = {
      uuid: this.uuid,
      type: this.type,
      title: this.title,
      message: this.message,
      metadata: this.metadata,
      isRead: this.isRead,
      readAt: this.readAt,
      createdAt: this.createdAt
    }
    return responseDto
  }
}
