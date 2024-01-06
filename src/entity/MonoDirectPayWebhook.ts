// MonoDirectPayWebhook
// MonoDirectPaySubscription MonoDirectPaySubscriptionsColumns
import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { MonoDirectPayWebHooksColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';

//  MortgageCardColumns
@Entity({ name: Tables.MONO_DIRECT_PAY_WEB_HOOKS })
@Index(['uuid'])
export class MonoDirectPayWebhooks extends BaseEntity {
  @Column({name: MonoDirectPayWebHooksColumns.UUID, unique: true })
  uuid: string;

  @Column({ length: 255, name: MonoDirectPayWebHooksColumns.REFERENCE, nullable: false, })
  reference: string


  @Column({type: 'json', name: MonoDirectPayWebHooksColumns.RESPONSE_DATA, nullable: true })
  responseData: object

  @Column({ length: 255, name: MonoDirectPayWebHooksColumns.STATUS, nullable: false, })
  status: string

  @Column({ length: 255, name: MonoDirectPayWebHooksColumns.WEB_HOOK_EVENT, nullable: false, })
  webHookEvent: string

  @Column({type: 'boolean', name: MonoDirectPayWebHooksColumns.IS_USED, nullable: false, default: false })
  isUsed: boolean


  @Column({type: 'boolean', name: MonoDirectPayWebHooksColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializeDirectPayWebHookResponse( reference: string, status: string, webHookEvent: string, responseData: any) {
    this.uuid = uuidv4()
    this.reference = reference
    this.status = status
    this.webHookEvent = webHookEvent
    this.responseData = responseData
    this.createdAt = utcNow()
    return this
  }
}
