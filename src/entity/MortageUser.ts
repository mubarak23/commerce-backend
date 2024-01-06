import { Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { MortageUserColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "../enums/Roles";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';
import { User } from "./User";

// MORTAGE_USERS MortageUserColumns
@Entity({ name: Tables.MORTAGE_USERS })
@Index(['user'])
@Index(['uuid'])
export class MortageUser extends BaseEntity {
  @Column({name: MortageUserColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: MortageUserColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: MortageUserColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({name: MortageUserColumns.ACCOUNT_ID, nullable: false})
  accountId: number;

  @Column({ length: 255, name: MortageUserColumns.TYPE, nullable: false })
  type: Roles;

  @Column({type: 'boolean', name: MortageUserColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initialize(userId: number, accountId: number, type: Roles) {
    this.uuid = uuidv4()
    this.userId = userId
    this.accountId = accountId
    this.type = type
    this.createdAt = utcNow()

    return this
  }
}
