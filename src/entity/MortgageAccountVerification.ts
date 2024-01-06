// MortgageAccountVerificationColumns 
import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { MortgageAccountVerificationColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "../enums/Roles";
import Tables from "../enums/Tables";
import { MortgageAccountVerificationUpload } from "../interfaces/MortgageAccountVerificationUpload";
import { utcNow } from '../utils/core';
import { User } from "./User";

// MORTAGE_USERS MortageUserColumns
@Entity({ name: Tables.MORTGAGE_ACCOUNT_VERIFICATIONS })
@Index(['user'])
@Index(['uuid'])
export class  MortgageAccountVerification extends BaseEntity {
  @Column({name: MortgageAccountVerificationColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: MortgageAccountVerificationColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: MortgageAccountVerificationColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({name: MortgageAccountVerificationColumns.ACCOUNT_TYPE, nullable: true})
  accountType: Roles;

  @Column({ type: "jsonb", name: MortgageAccountVerificationColumns.BANK_STATEMENT, nullable: true })
  bankStatement: MortgageAccountVerificationUpload;

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.BANK_STATEMENT_APPROVED, nullable: true, default: false })
  bankStatementApproved: boolean

  @Column({ type: "jsonb", name: MortgageAccountVerificationColumns.GOVERNMENT_APPROVED_ID, nullable: true })
  governmentApprovedId: MortgageAccountVerificationUpload;

  @Column({ type: "jsonb", name: MortgageAccountVerificationColumns.CAC_CERTIFICATE, nullable: true })
  cacCertificate: MortgageAccountVerificationUpload;

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.CAC_CERTIFICATE_APPROVED, nullable: true, default: false })
  cacCertificateApproved: boolean

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.GOVERNMENT_APPROVED_ID_APPROVED, nullable: true, default: false })
  governmentApprovedIdApproved: boolean

  @Column({ type: "jsonb", name: MortgageAccountVerificationColumns.RECENT_UTILITY_BILL, nullable: true })
  recentUtilityBill: MortgageAccountVerificationUpload;

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.RECENT_UTILITY_BILL_APPROVED, nullable: true, default: false })
  recentUtilityBillApproved: boolean

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.IS_APPROVED, nullable: true, default: false })
  isApproved: boolean

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.ACCOUNT_CONFIRMED, nullable: true, default: false })
  accountConfirmed: boolean

  @Column({type: 'boolean', name: MortgageAccountVerificationColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initialize(userId: number, accountType: Roles) {
    this.uuid = uuidv4()
    this.userId = userId
    this.accountType = accountType
    this.createdAt = utcNow()

    return this
  }
}
