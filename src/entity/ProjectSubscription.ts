import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { ProjectSubscriptionColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { IPublicProfile } from "../dto/IProfileResponse";
import { ProcessNewProjectSubscriptionDto } from "../dto/ProcessNewProjectSubscriptionDto";
import { ProcessProjectSubscriptionTransactionResponseDto } from "../dto/ProcessProjectSubscriptionTransactionResponseDto";
import { ProjectsResponseDto } from "../dto/ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { ProjectStatuses } from "../enums/ProjectEnums";
import Tables from "../enums/Tables";
import { subscriptionPaymentHistory } from "../interfaces/subscriptionPaymentHistory";
import { utcNow } from '../utils/core';
import { ColumnNumericTransformer } from "../utils/transformers";
import { Project } from "./Project";
import { User } from "./User";

@Entity({ name: Tables.PROJECT_SUBSCRIPTIONS })
@Index(['investor', 'developer'])
@Index(['uuid'])
export class ProjectSubscription extends BaseEntity {
  @Column({name: ProjectSubscriptionColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProjectSubscriptionColumns.INVESTOR_USER_ID, nullable: false })
  investorUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionColumns.INVESTOR_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  investor: User;

  @Column({ name: ProjectSubscriptionColumns.DEVELOPER_USER_ID, nullable: false })
  developerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionColumns.DEVELOPER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  developer: User;

  @Column({ name: ProjectSubscriptionColumns.PROJECT_ID, nullable: false })
  projectId: number;

  @ManyToOne(() => Project, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionColumns.PROJECT_ID,
    referencedColumnName: TableColumns.ID,
  })
  project: Project;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionColumns.TOTAL_AMOUNT_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  totalAmountMinor: number;

  @Column({name: ProjectSubscriptionColumns.DURATION_PER_PAYMENT_PLAN, nullable: true})
  durationPerPaymentPlan: string;

  @Column({name: ProjectSubscriptionColumns.DURATION, nullable: true})
  duration: number;

  @Column({name: ProjectSubscriptionColumns.NUMBER_OF_SLOTS, nullable: true})
  numberOfSlots: number;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionColumns.AMOUNT_PAID_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountPaidMinor: number;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionColumns.INITIAL_AMOUNT_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  initialAmountMinor: number;


  @Column({
    type: "decimal",
    name: ProjectSubscriptionColumns.AMOUNT_REMAINING_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountRemainingMinor: number;


  @Column({
    type: "decimal",
    name: ProjectSubscriptionColumns.AMOUNT_PER_PAYMENT_PLAN__DURATION_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountPerPaymentPlanDurationMinor: number;

  @Column({name: ProjectSubscriptionColumns.DURATION_COVERED, nullable: true})
  durationCovered: number;

  @Column({name: ProjectSubscriptionColumns.DURATION_LEFT, nullable: true})
  durationLeft: number;


  @Column({
    type: "jsonb",
    name: ProjectSubscriptionColumns.SUBSCRIPTON_PAYMENT_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  subscriptionPaymentHistory: subscriptionPaymentHistory<string>[];

  @Column({ name: ProjectSubscriptionColumns.SUBSCRIPTION_DATE, nullable: true, default: utcNow() })
  susbscriptionDate: Date;

  @Column({ name: ProjectSubscriptionColumns.STATUS, nullable: true, default: ProjectStatuses.PENDING })
  status: ProjectStatuses;
  

  @Column({type: 'boolean', name: ProjectSubscriptionColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializeInvestorProjectSubscription(reqBody: ProcessNewProjectSubscriptionDto) {
    this.uuid = uuidv4()
    this.investorUserId = reqBody.investorUserId
    this.developerUserId = reqBody.developerUserId
    this.projectId = reqBody.projectId
    this.numberOfSlots = reqBody.numberOfSlots
    this.totalAmountMinor = reqBody.totalAmountMinor
    this.initialAmountMinor = reqBody.initialAmountMinor
    this.amountPaidMinor = reqBody.initialAmountMinor
    this.amountRemainingMinor = reqBody.amountRemainingMinor
    this.amountPerPaymentPlanDurationMinor = reqBody.amountPerPaymentPlanDurationMinor
    this.durationPerPaymentPlan = reqBody.durationPerPaymentPlan
    this.duration = reqBody.duration
    this.createdAt = utcNow()

    return this
  }

  toResponseDto(
    projectSubscription: ProjectSubscription,
    projectUuid: string,
    project: ProjectsResponseDto,
    investorPublicProfile: IPublicProfile,
    developerPublicProfile: IPublicProfile,
    susbscriptionTransactions?: ProcessProjectSubscriptionTransactionResponseDto[],
    totalSubscriptionAmountPaidMinor?: number,
    nextPaymentDueDate?: Date
  ): ProjectSubscriptionResponseDto {
    let totalSubscriptionAmountPaidMajor = 0
    if(totalSubscriptionAmountPaidMinor){
      totalSubscriptionAmountPaidMajor = (totalSubscriptionAmountPaidMinor/100);
    }
    return {
      projectSubscriptionUuid: projectSubscription.uuid,
      projectUuid,
      project,
      developerPublicProfile,
      investorPublicProfile,
      susbscriptionTransactions,
      numberOfSlots: projectSubscription.numberOfSlots,
      totalAmountMinor: (projectSubscription.totalAmountMinor/100),
      initialAmountMinor: (projectSubscription.initialAmountMinor/100),
      amountRemainingMinor: (projectSubscription.amountRemainingMinor/100),
      amountDueMinor: (projectSubscription.amountRemainingMinor/100),
      amountPaidMinor: totalSubscriptionAmountPaidMajor || 0,
      amountPerPaymentPlanDurationMinor: (projectSubscription.amountPerPaymentPlanDurationMinor/100),
      durationPerPaymentPlan: projectSubscription.durationPerPaymentPlan,
      status: projectSubscription.status,
      duration: projectSubscription.duration,
      durationLeft: projectSubscription.durationLeft,
      durationCovered: projectSubscription.durationCovered,
      nextPaymentDueDate,
      createdAt: projectSubscription.createdAt
    }
  }


}
