import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { ProjectSubscriptionTransactionsColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { IPublicProfile } from "../dto/IProfileResponse";
import { ProcessProjectSubscriptionTransactionDto } from "../dto/ProcessProjectSubscriptionTransactionDto";
import { ProcessProjectSubscriptionTransactionResponseDto } from "../dto/ProcessProjectSubscriptionTransactionResponseDto";
import { ProjectsResponseDto } from "../dto/ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { ProjectTransactionResponseDto } from "../dto/ProjectTransactionResponseDto";
import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';
import { ColumnNumericTransformer } from "../utils/transformers";
import { Project } from "./Project";
import { ProjectSubscription } from "./ProjectSubscription";
import { User } from "./User";

@Entity({ name: Tables.PROJECT_SUBSCRIPTION_TRANSACTIONS })
@Index(['investor', 'developer'])
@Index(['uuid'])
export class ProjectSubscriptionTransaction extends BaseEntity {
  @Column({name: ProjectSubscriptionTransactionsColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProjectSubscriptionTransactionsColumns.INVESTOR_USER_ID, nullable: false })
  investorUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionTransactionsColumns.INVESTOR_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  investor: User;

  @Column({ name: ProjectSubscriptionTransactionsColumns.DEVELOPER_USER_ID, nullable: false })
  developerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionTransactionsColumns.DEVELOPER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  developer: User;

  @Column({ name: ProjectSubscriptionTransactionsColumns.PROJECT_ID, nullable: false })
  projectId: number;

  @ManyToOne(() => Project, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionTransactionsColumns.PROJECT_ID,
    referencedColumnName: TableColumns.ID,
  })
  project: Project;

  @Column({ name: ProjectSubscriptionTransactionsColumns.PROJECT_SUBSCRIPTION_ID, nullable: false })
  projectSubscriptionId: number;

  @ManyToOne(() => ProjectSubscription, { primary: true })
  @JoinColumn({
    name: ProjectSubscriptionTransactionsColumns.PROJECT_SUBSCRIPTION_ID,
    referencedColumnName: TableColumns.ID,
  })
  projectSubscription: ProjectSubscription;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionTransactionsColumns.AMOUNT_BEFORE_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountBeforeMinor: number;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionTransactionsColumns.AMOUNT_PAID_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountPaidMinor: number;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionTransactionsColumns.AMOUNT_AFTER_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountAfterMinor: number;

  @Column({
    type: "decimal",
    name: ProjectSubscriptionTransactionsColumns.AMOUNT_REMAINING_MINOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amountRemainingMinor: number;


  @Column({name: ProjectSubscriptionTransactionsColumns.DESCRIPTION, nullable: true})
  description: string;

  @Column({name: ProjectSubscriptionTransactionsColumns.PAYMENT_PLAN_DURATION_NUMBER, nullable: true})
  paymentPlanDurationNumber: number;

 
  @Column({name: ProjectSubscriptionTransactionsColumns.FINANCIAL_TRANSACTION_ID, nullable: true})
  financialTransactionId: number;

  @Column({name: ProjectSubscriptionTransactionsColumns.IS_PAID, nullable: true, default: false})
  isPaid: boolean;

  @Column({name: ProjectSubscriptionTransactionsColumns.PAID_STATUS, nullable: true, default: PaymentTransactionStatus.UNPAID })
  paidStatus: PaymentTransactionStatus;

  @Column({ name: ProjectSubscriptionTransactionsColumns.NEXT_PAYMENT_DATE, nullable: true, default: utcNow() })
  nextPaymentDate: string;


  @Column({type: 'boolean', name: ProjectSubscriptionTransactionsColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializeInvestorProjectSubscriptionTransaction(reqBody: ProcessProjectSubscriptionTransactionDto) {
    this.uuid = uuidv4()
    this.investorUserId = reqBody.investorUserId
    this.developerUserId = reqBody.developerUserId
    this.projectId = reqBody.projectId
    this.projectSubscriptionId = reqBody.projectSubscriptionId
    this.amountBeforeMinor = reqBody.amountBeforeMinor
    this.amountPaidMinor = reqBody.amountPaidMinor
    this.amountAfterMinor = reqBody.amountAfterMinor
    this.amountRemainingMinor = reqBody.amountRemainingMinor
    this.paymentPlanDurationNumber = reqBody.paymentPlanDurationNumber
    this.financialTransactionId = reqBody.financialTransactionId
    this.description = reqBody.description
    this.createdAt = utcNow()

    return this
  }

  toResponseDto(
    subscriptionTransaction:ProjectSubscriptionTransaction,
  ): ProcessProjectSubscriptionTransactionResponseDto {
    return {
      uuid: subscriptionTransaction.uuid,
      investorUserId: subscriptionTransaction.investorUserId,
      developerUserId: subscriptionTransaction.developerUserId,
      projectUuid: subscriptionTransaction.project.uuid,
      projectSubscriptionUuid: subscriptionTransaction.projectSubscription.uuid,
      amountBeforeMinor: (subscriptionTransaction.amountBeforeMinor/100),
      amountPaidMinor: (subscriptionTransaction.amountPaidMinor/100),
      amountAfterMinor: (subscriptionTransaction.amountAfterMinor/100),
      amountRemainingMinor: (subscriptionTransaction.amountRemainingMinor/100),
      financialTransactionId: subscriptionTransaction.financialTransactionId,
      description: subscriptionTransaction.description,
      paymentPlanDurationNumber: subscriptionTransaction.paymentPlanDurationNumber,
      createdAt: subscriptionTransaction.createdAt
    }
  }

  toProjectTransactionResponseDto(
    subscriptionTransaction:ProjectSubscriptionTransaction,
    project: ProjectsResponseDto,
    investorPublicProfile: IPublicProfile,
    projectSubscriptions: ProjectSubscriptionResponseDto,
  ): ProjectTransactionResponseDto {
    return {
      uuid: subscriptionTransaction.uuid,
      investorUserId: subscriptionTransaction.investorUserId,
      developerUserId: subscriptionTransaction.developerUserId,
      projectUuid: subscriptionTransaction.project.uuid,
      projectSubscriptionUuid: subscriptionTransaction.projectSubscription.uuid,
      amountBeforeMinor: (subscriptionTransaction.amountBeforeMinor/100),
      amountPaidMinor: (subscriptionTransaction.amountPaidMinor/100),
      amountAfterMinor: (subscriptionTransaction.amountAfterMinor/100),
      amountRemainingMinor: (subscriptionTransaction.amountRemainingMinor/100),
      financialTransactionId: subscriptionTransaction.financialTransactionId,
      description: subscriptionTransaction.description,
      paymentPlanDurationNumber: subscriptionTransaction.paymentPlanDurationNumber,
      project,
      investorPublicProfile,
      projectSubscriptions,
      nextPaymentDate: subscriptionTransaction.nextPaymentDate,
      createdAt: subscriptionTransaction.createdAt
    }
  }


}
