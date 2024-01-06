import { Entity, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { PushNotificationTokenColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import PushNotificationDeviceTypes from "../enums/PushNotificationDeviceType";
import { utcNow } from "../utils/core";


@Entity({ name: Tables.PUSH_NOTIFICATION_TOKENS })
@Index(['userId'])
export class PushNotificationToken extends BaseEntity {
  @Column({type: 'bigint', name: PushNotificationTokenColumns.USER_ID })
  userId: number;

  @Column({name: PushNotificationTokenColumns.DEVICE_TYPE, nullable: false })
  deviceType: PushNotificationDeviceTypes

  @Column({name: PushNotificationTokenColumns.TOKEN, nullable: false })
  deviceToken: string;


  initialize(userId: number, deviceType: PushNotificationDeviceTypes, deviceToken: string) {
    this.userId = userId
    this.deviceType = deviceType
    this.deviceToken = deviceToken

    this.createdAt = utcNow()

    return this
  }
}
