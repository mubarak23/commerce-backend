// MonoDirectPaySubscription MonoDirectPaySubscriptionsColumns
import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { MonoDirectPaySubscriptionsColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { MonoDirectPayRequestDto } from "../dto/MonoDirectPayRequestDto";
import { MonoDirectPayResponseDto } from "../dto/MonoDirectPayResponseDto";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';
import { ProjectSubscriptionTransaction } from "./ProjectSubscriptionTransaction";
import { User } from "./User";

//  MortgageCardColumns
@Entity({ name: Tables.MONO_DIRECT_PAY_SUBSCRIPTIONS })
@Index(['investor'])
@Index(['developer'])
@Index(['uuid'])
export class MonoDirectPaySubscription extends BaseEntity {
  @Column({name: MonoDirectPaySubscriptionsColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: MonoDirectPaySubscriptionsColumns.INVESTOR_USER_ID, nullable: true })
  investorUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: MonoDirectPaySubscriptionsColumns.INVESTOR_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  investor: User;

  @Column({ name: MonoDirectPaySubscriptionsColumns.DEVELOPER_USER_ID, nullable: true })
  developerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: MonoDirectPaySubscriptionsColumns.DEVELOPER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  developer: User;


  @Column({name: MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_UUID, nullable: false})
  projectSubscriptionTransactionUuid: string;

  @Column({name: MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_ID, nullable: false})
  projectSubscriptionTransactionId: number;

  @ManyToOne(() => ProjectSubscriptionTransaction, { primary: true })
  @JoinColumn({
    name: MonoDirectPaySubscriptionsColumns.PROJECT_SUBSCRIPTION_TRANSACTION_ID,
    referencedColumnName: TableColumns.ID,
  })
  projectSubscriptionTransaction: ProjectSubscriptionTransaction;


  @Column({ length: 255, name: MonoDirectPaySubscriptionsColumns.REFERENCE, nullable: false, })
  reference: string


  @Column({type: 'json', name: MonoDirectPaySubscriptionsColumns.REQUEST_PAYLOAD, nullable: false })
  requestPayload: MonoDirectPayRequestDto

  @Column({type: 'json', name: MonoDirectPaySubscriptionsColumns.RESPONSE_DATA, nullable: true })
  responseData: MonoDirectPayResponseDto
  

  @Column({type: 'boolean', name: MonoDirectPaySubscriptionsColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializeDirectPayRequest(investorUserId: number, developerUserId: number, reference: string, projectSubscriptionTransactionId: number, projectSubscriptionTransactionUuid: string, requestPayload: MonoDirectPayRequestDto,  ) {
    this.uuid = uuidv4()
    this.investorUserId = investorUserId
    this.developerUserId = developerUserId
    this.reference = reference
    this.projectSubscriptionTransactionId = projectSubscriptionTransactionId
    this.projectSubscriptionTransactionUuid = projectSubscriptionTransactionUuid 
    this.requestPayload = requestPayload
    this.createdAt = utcNow()
    return this
  }
}
