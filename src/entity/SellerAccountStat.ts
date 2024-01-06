import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import TableColumns, { SellerAccountStatColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { User } from "./User";


@Entity({ name: Tables.SELLER_ACCOUNT_STATS })
@Index(['userId'])
export class SellerAccountStat extends BaseEntity {  
  @Column({ name: SellerAccountStatColumns.USER_ID })
  userId: number;

  @ManyToOne(type => User, { primary: true })
  @JoinColumn({name: SellerAccountStatColumns.USER_ID, referencedColumnName: TableColumns.ID})
  user: User;

  @Column({ name: SellerAccountStatColumns.TOTAL_ORDERS_COUNT, default: 0 })
  totalOrdersCount: number;

  @Column({ name: SellerAccountStatColumns.TOTAL_PENDING_ORDERS_COUNT, default: 0 })
  totalPendingOrdersCount: number;

  @Column({ name: SellerAccountStatColumns.TOTAL_PENDING_REQUESTS, default: 0 })
  totalPendingQuoteRequestsCount: number;

  
  initialize(userId: number) {
    this.userId = userId

    return this
  }
}
