import { Entity, Column, JoinColumn, Index } from "typeorm";
import DefualtEntity from "./BaseEntity";
import { v4 as uuidv4 } from 'uuid';
import TableColumns, { RequestBankDetailsChangeColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import * as Utils from "../utils/core";
import { User } from "./User";

@Entity({ name: Tables.REQUEST_BANK_DETAILS_CHANGE })
@Index(['userId'])
export class RequestBankDetailsChange extends DefualtEntity {

  @Column({ name: RequestBankDetailsChangeColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: RequestBankDetailsChangeColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: RequestBankDetailsChangeColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ name: RequestBankDetailsChangeColumns.ACCOUNT_NUMBER })
  accountNumber: string;

  @Column({ name: RequestBankDetailsChangeColumns.BANK_ACCOUNT_NAME })
  bankAccountName: string;

  @Column({ name: RequestBankDetailsChangeColumns.BANK_NAME })
  bankName: string;

  @Column({ name: RequestBankDetailsChangeColumns.BANK_CODE })
  bankCode: string;

  @Column({ name: RequestBankDetailsChangeColumns.IS_PROCESSED, default: false, })
  isProcessed: boolean;

  initialize(userId: number, accountNumber: string, bankAccountName: string, bankName: string, bankCode: string ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.accountNumber = accountNumber,
    this.bankAccountName = bankAccountName,
    this.bankName = bankName,
    this.bankCode = bankCode,
    this.createdAt = Utils.utcNow();
    return this;
  }
}
