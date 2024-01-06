import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { MortgageCardColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';
import { User } from "./User";

//  MortgageCardColumns
@Entity({ name: Tables.MORTGAGE_CARD })
@Index(['user'])
@Index(['uuid'])
export class MortgageCard extends BaseEntity {
  @Column({name: MortgageCardColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: MortgageCardColumns.USER_ID, nullable: true })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: MortgageCardColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({name: MortgageCardColumns.PAN, nullable: false})
  pan: string;

  @Column({type: 'boolean', name: MortgageCardColumns.IS_ACTIVE, nullable: false, default: false })
  isActive: boolean

  @Column({type: 'boolean', name: MortgageCardColumns.IS_USED, nullable: false, default: false })
  isUsed: boolean
  

  @Column({type: 'boolean', name: MortgageCardColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initializePan(pan: string ) {
    this.uuid = uuidv4()
    this.pan = pan 
    this.createdAt = utcNow()
    return this
  }
}
