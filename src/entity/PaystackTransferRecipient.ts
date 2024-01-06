// @ts-nocheck

import { v4 as uuidv4 } from 'uuid'
import { Column } from "typeorm";
import { PaystackTransferRecipientColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';



@Entity({ name: Tables.PAYSTACK_TRANSFER_RECIPIENT })
export class PaystackTransferRecipient extends BaseEntity {
  @Column({name: PaystackTransferRecipientColumns.UUID, unique: true })
  uuid: string;

  @Column({name: PaystackTransferRecipientColumns.ACCOUNT_NUMBER })
  accountNumber: string;

  @Column({name: PaystackTransferRecipientColumns.BANK_CODE, nullable: true })
  bankCode: string;

  @Column({length: 255, name: PaystackTransferRecipientColumns.RECIPIENT_CODE, nullable: true })
  recipientCode: string;

  @Column({length: 255, name: PaystackTransferRecipientColumns.CURRENCY, nullable: false })
  currency: string;
  

  initialize(accountNumber: string, bankCode: string, recipientCode: string, currency: string) {
    this.uuid = uuidv4()

    this.accountNumber = accountNumber
    this.bankCode = bankCode
    this.recipientCode = recipientCode
    this.currency = currency

    this.createdAt = utcNow()

    return this
  }
}
