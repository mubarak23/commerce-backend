// @ts-nocheck

import { Entity, Column, JoinColumn, Index } from "typeorm";

import TableColumns, { EarningsByYearColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";


@Entity({ name: Tables.EARNINGS_BY_MONTH })
@Index(['userId'])
@Index(['userId', 'createdAt'])
export class EarningsByMonth extends BaseEntity {
  @Column({type: 'bigint', name: EarningsByYearColumns.USER_ID })
  userId: number;

  @JoinColumn({name: EarningsByYearColumns.USER_ID, referencedColumnName: TableColumns.ID})
  user: Account;

  @Column({name: EarningsByYearColumns.MONTH })
  monthISO8601: string;

  @Column({type: 'bigint', name: EarningsByYearColumns.TOTAL_EARNINGS_MINOR, transformer: new ColumnNumericTransformer() })
  totalEarningsMinor: number;

  
  initialize(userId: number, monthISO8601: string, earningMinor: number) {
    this.userId = userId
    this.monthISO8601 = monthISO8601
    this.totalEarningsMinor = earningMinor
    this.createdAt = utcNow()

    return this
  }
}
