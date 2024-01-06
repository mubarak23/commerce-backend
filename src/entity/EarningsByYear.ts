import { Entity, Column, Index, JoinColumn } from "typeorm";

import TableColumns, { EarningsByYearColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import { User } from "./User";


@Entity({ name: Tables.EARNINGS_BY_YEAR })
@Index(['userId'])
@Index(['userId', 'year'])
export class EarningsByYear extends BaseEntity {
  @Column({type: 'bigint', name: EarningsByYearColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: EarningsByYearColumns.USER_ID, referencedColumnName: TableColumns.ID })
  user: User;

  @Column({name: EarningsByYearColumns.YEAR })
  year: string;

  @Column({type: 'bigint', name: EarningsByYearColumns.TOTAL_EARNINGS_MINOR, transformer: new ColumnNumericTransformer() })
  totalEarningsMinor: number;

  
  initialize(userId: number, year: string, earningMinor: number) {
    this.userId = userId
    this.year = year
    this.totalEarningsMinor = earningMinor
    this.createdAt = utcNow()

    return this
  }
}
