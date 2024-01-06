import { Entity, Column, Index, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import TableColumns, { ProductLeaseColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import { User } from "./User";
import { IPublicProfileProductLease } from "../interfaces/IProductLease";
import { IPublicProfile } from "../dto/IProfileResponse";

@Entity({ name: Tables.PRODUCT_LEASES })
@Index(['userId'])
@Index(['userId', 'isActive', 'isSoftDeleted'])
@Index(['userId', 'isActive', 'isPaid', 'isSoftDeleted'])
export class ProductLease extends BaseEntity {
  @Column({name: ProductLeaseColumns.UUID, unique: true })
  uuid: string;

  @Column({name: ProductLeaseColumns.USER_ID })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProductLeaseColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({type: 'bigint', name: ProductLeaseColumns.PRINCIPAL_AMOUNT_MINOR, nullable: false, transformer: new ColumnNumericTransformer() })
  principalAmountMinor: number;

  @Column({type: 'decimal', name: ProductLeaseColumns.INTEREST_RATE_PERCENTAGE, nullable: true, transformer: new ColumnNumericTransformer() })
  interestRatePercentage: number;

  @Column({name: ProductLeaseColumns.CURRENCY, nullable: false, default: 'NG' })
  currency: string;

  @Column({type: 'timestamptz', name: ProductLeaseColumns.NEXT_LEASE_PAYMENT_DUE_DATE, nullable: true})
  nextLeasePaymentDueDate: Date

  @Column({type: 'boolean', name: ProductLeaseColumns.IS_PAID, nullable: false, default: false })
  isPaid: boolean

  @Column({type: 'timestamptz', name: ProductLeaseColumns.PAID_AT, nullable: true})
  paidAt: Date

  @Column({type: 'boolean', name: ProductLeaseColumns.IS_DELAYED, default: false })
  isDelayed: boolean

  @Column({type: 'boolean', name: ProductLeaseColumns.IS_MULTI_STAGE_INTEREST_CHARGE, nullable: false, default: false })
  isMultiStageInterestCharge: boolean
  
  @Column({type: 'timestamptz', name: ProductLeaseColumns.NEXT_INTEREST_CHARGE_DATE, nullable: true})
  nextInterestChargeDate: Date

  @Column({type: 'decimal', name: ProductLeaseColumns.NEXT_INTEREST_RATE_PERCENTAGE, nullable: true, default: 0, transformer: new ColumnNumericTransformer() })
  nextInterestRatePercentage: number;
    
  @Column({name: ProductLeaseColumns.INTEREST_CHARGE_CURENT_STAGE, nullable: true, default: 1, })
  interestChargeCurrentStage: number;

  @Column({type: 'boolean', name: ProductLeaseColumns.IS_ACTIVE, nullable: false, default: false })
  isActive: boolean

  @Column({type: 'boolean', name: ProductLeaseColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initialize(userId: number, principalAmountMinor: number, nextLeasePaymentDueDate: Date,
      interestRatePercentage: number, currency: string) {
    this.uuid = uuidv4()
    this.userId = userId
    this.principalAmountMinor = principalAmountMinor;
    this.interestRatePercentage = interestRatePercentage;
    this.nextLeasePaymentDueDate = nextLeasePaymentDueDate
    this.isDelayed = false
    //--
    this.nextInterestRatePercentage = interestRatePercentage
    
    const plpNextInterestChargeDate = moment.utc().add(2, 'days').endOf('day').toDate()
    this.nextInterestChargeDate = plpNextInterestChargeDate
    this.isMultiStageInterestCharge = true
    this.interestChargeCurrentStage = 1
    //--
    this.isActive = true
    this.currency = currency
    this.createdAt = utcNow()

    return this
  }

  transformForPublic(publicProfile: IPublicProfile): IPublicProfileProductLease {
    return {
      ...this,
      id: this.uuid,
      principalAmountMajor: this.principalAmountMinor / 100,
      nextLeasePaymentDueDateUtc: this.nextLeasePaymentDueDate,
      createdAtUtc: this.createdAt,
      publicProfile: publicProfile!,
    }
  }
}
