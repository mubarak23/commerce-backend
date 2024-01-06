import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import DefualtEntity from "./BaseEntity";
import TableColumns, { WalletToWalletTransferColumns } from "../enums/TableColumns";
import { utcNow } from "../utils/core";
import Tables from "../enums/Tables";
import { ColumnNumericTransformer } from "../utils/transformers";

@Index(["adminUserId"])
@Index(["senderUserId"])
@Index(["receiverUserId"])
@Entity({ name: Tables.WALLET_TO_WALLET_TRANSFERS })
export class WalletToWalletTransfer extends DefualtEntity {
  @Column({ name: WalletToWalletTransferColumns.ADMIN_USER_ID })
  adminUserId: number;

  @Column({ name: WalletToWalletTransferColumns.SENDER_USER_ID })
  senderUserId: number;

  @Column({ name: WalletToWalletTransferColumns.RECEIVER_USER_ID })
  receiverUserId: number;

  @Column({type: 'decimal', name: WalletToWalletTransferColumns.AMOUNT_MAJOR, nullable: false, transformer: new ColumnNumericTransformer() })
  amountMajor: number;

  @Column({name: WalletToWalletTransferColumns.CURRENCY, default: 'NGN',  })
  currency: string;

  @Column({name: WalletToWalletTransferColumns.DESCRIPTION, nullable: true, default: '' })
  description: string;

  
  initialize(adminUserId: number, senderUserId: number, receiverUserId: number, amountMajor: number, description: string) {
    this.adminUserId = adminUserId
    this.senderUserId = senderUserId
    this.receiverUserId = receiverUserId
    this.amountMajor = amountMajor
    this.description = description
    this.createdAt = utcNow()

    return this
  }
}
