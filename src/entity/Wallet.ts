import { Entity, Column, Index } from "typeorm";

import { WalletColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import { WalletType } from "../enums/WalletType";


@Entity({ name: Tables.WALLETS })
@Index(['userId'])
export class Wallet extends BaseEntity {
  @Column({type: 'bigint', name: WalletColumns.USER_ID, nullable: true, transformer: new ColumnNumericTransformer() })
  userId: number;

  @Column({type: 'bigint', name: WalletColumns.ACCOUNT_ID, nullable: true, transformer: new ColumnNumericTransformer() })
  accountId: number;

  @Column({type: 'bigint', name: WalletColumns.WALLET_BALANCE_MINOR, nullable: false, transformer: new ColumnNumericTransformer() })
  walletBalanceMinor: number;

  @Column({name: WalletColumns.CURRENCY, nullable: false })
  currency: string;

  @Column({name: WalletColumns.TYPE, nullable: false })
  type: WalletType;
  
  initialize(userId: number, accountId: number, type: WalletType, currency: string) {
    this.userId = userId
    this.accountId = accountId
    this.type = type
    this.walletBalanceMinor = 0
    this.currency = currency
    this.createdAt = utcNow()

    return this
  }
}
