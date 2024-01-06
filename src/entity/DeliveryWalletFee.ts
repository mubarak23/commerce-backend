import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { DeliveryFeeWalletColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { WalletType } from "../enums/WalletType";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.DELIVERY_FEE_WALLETS })
@Index(["id"], { unique: true })
@Index(["userId"])
export class DeliveryFeeWallet extends DefualtEntity {
  @Column({ name: DeliveryFeeWalletColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: DeliveryFeeWalletColumns.USER_ID })
  userId: number;

  @Column({ name: DeliveryFeeWalletColumns.ACCOUNT_ID })
  accountId: number;

  @Column({ name: DeliveryFeeWalletColumns.WALLET_BALANCE_MINOR })
  walletBalanceMinor: number;

  @Column({name: DeliveryFeeWalletColumns.CURRENCY, nullable: true, default: 'NGN' })
  currency: string;

  @Column({ length: 255, name: DeliveryFeeWalletColumns.TYPE, default: WalletType.CUSTOMER_WALLET })
  type: string;

  initialize(userId: number, accountId: number, currency: string) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.accountId = accountId;
    this.walletBalanceMinor = 0;
    this.currency = currency ? currency: 'NGN';
    this.createdAt = utcNow();
    return this;
  }
}
