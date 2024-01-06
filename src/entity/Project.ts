import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { ProjectColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { IPublicProfile } from "../dto/IProfileResponse";
import { NewProjectRequestDto } from "../dto/NewProjectRequestDto";
import { ProjectsResponseDto } from "../dto/ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { ProjectPaymentPlan, ProjectStages, ProjectStatuses } from "../enums/ProjectEnums";
import Tables from "../enums/Tables";
import { ProjectStage } from "../interfaces/ProjectStage";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from '../utils/core';
import { ColumnNumericTransformer } from "../utils/transformers";
import { User } from "./User";

@Entity({ name: Tables.PROJECTS })
@Index(['user'])
@Index(['uuid'])
export class Project extends BaseEntity {
  @Column({name: ProjectColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProjectColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProjectColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({name: ProjectColumns.ACCOUNT_ID, nullable: false})
  accountId: number;

  @Column({ length: 255, name: ProjectColumns.TYPE, nullable: true })
  type: string;

  @Column({ length: 255, name: ProjectColumns.NAME, nullable: false })
  name: string;

  @Column({ name: ProjectColumns.DETAILS, nullable: false })
  details: string;

  @Column({ type: "jsonb", name: ProjectColumns.IMAGES, nullable: true })
  images: SimpleImageJson[];

  @Column({
    type: "jsonb",
    name: ProjectColumns.STAGES,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  stages: ProjectStage<string>[];

  @Column({ name: ProjectColumns.CURRENT_STAGE, nullable: true })
  currentStage: ProjectStages;

  @Column({
    type: "decimal",
    name: ProjectColumns.COST_PER_SLOT,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  costPerSlot: number;

  @Column({name: ProjectColumns.NUMBER_OF_SLOTS, nullable: true})
  numberOfSlots: number;

  @Column({name: ProjectColumns.MINIMUM_NUMBER_OF_SLOT, nullable: true, default: 1})
  minimumNumberOfSlot: number;


  @Column({name: ProjectColumns.DURATION, nullable: true})
  duration: number;

  @Column({ name: ProjectColumns.PAYMENT_PLAN, nullable: true, default: ProjectPaymentPlan.MONTHLY })
  paymentPlan: ProjectPaymentPlan;
  
  @Column({
    type: "decimal",
    name: ProjectColumns.INITIAL_INVESTMENT_PERCENTAGE,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  initialInvestmentPercentage: number;

  @Column({ name: ProjectColumns.LOCATION_ON_MAP, nullable: true })
  locationOnMap: string;

  @Column({ name: ProjectColumns.ADDRESS, nullable: true })
  address: string;

  @Column({ name: ProjectColumns.STATE, nullable: true })
  state: string;

  @Column({ name: ProjectColumns.COUNTRY, nullable: true, default: "Nigeria" })
  country: string;

  @Column({ name: ProjectColumns.START_DATE, nullable: true })
  startDate: Date;

  @Column({ name: ProjectColumns.STATUS, nullable: false })
  status: ProjectStatuses;
  

  @Column({type: 'boolean', name: ProjectColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializeProjectByDeveloper(reqBody: NewProjectRequestDto, userId: number, accountId: number) {
    this.uuid = uuidv4()
    this.userId = userId
    this.accountId = accountId
    this.name = reqBody.name
    this.type = reqBody.type
    this.details = reqBody.details
    this.duration = reqBody.duration
    this.paymentPlan = reqBody.paymentPlan ? reqBody.paymentPlan : ProjectPaymentPlan.MONTHLY
    this.costPerSlot = reqBody.costPerSlot
    this.numberOfSlots = reqBody.numberOfSlots
    this.startDate = reqBody.startDate
    this.minimumNumberOfSlot = reqBody.minimumNumberOfSlot ? reqBody.minimumNumberOfSlot : 1
    this.initialInvestmentPercentage = reqBody.initialInvestmentPercentage
    this.address = reqBody.address
    this.state = reqBody.state
    this.status = ProjectStatuses.PENDING
    this.createdAt = utcNow()

    return this
  }

  toResponseDto(
    developerPublicProfile: IPublicProfile,
    project: Project,
    projectResponseImages?: {url: string, mimetype: string}[],
    projectSubscriptions?: ProjectSubscriptionResponseDto[] ,
    numberOfSlotSold?: number
  ): ProjectsResponseDto {
    
    return {
      projectUuid: project.uuid,
      developerPublicProfile,
      name: project.name,
      details: project.details,
      type: project.type,
      costPerSlot: project.costPerSlot,
      initialInvestmentPercentage: project.initialInvestmentPercentage,
      duration: project.duration,
      numberOfSlots: project.numberOfSlots,
      startDate: project.startDate,
      paymentPlan: project.paymentPlan,
      status: project.status,
      minimumNumberOfSlot: project.minimumNumberOfSlot,
      images: projectResponseImages,
      address: project.address,
      state: project.state,
      numberOfSlotSold,
      locationOnMap: project.locationOnMap,
      projectSubscriptions,
      stages: project.stages,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }


}
