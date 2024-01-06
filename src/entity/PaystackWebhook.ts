import { Entity, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import { PaystackWebhooksColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";


@Entity({ name: Tables.PAYSTACK_WEBHOOKS })
export class PaystackWebhook extends BaseEntity {

  @Column({ length: 255, name: PaystackWebhooksColumns.UUID, nullable: true })
  uuid: string;

  @Column({name: PaystackWebhooksColumns.TRANSACTION_UUID, nullable: true })
  transactionUuid: string;

  @Column({ type: 'jsonb', name: PaystackWebhooksColumns.PAYSTACK_PAYLOAD, nullable: false })
  paystackPayload: any;

  @Column({ type: 'boolean', name: PaystackWebhooksColumns.IS_PROCESSED, nullable: true })
  isProcessed: boolean


  initialize(transactionUuid: string, paystackPayload: any) {
    this.uuid = uuidv4()
    this.transactionUuid = transactionUuid
    this.paystackPayload = paystackPayload
    this.isProcessed = false

    this.createdAt = utcNow()

    return this
  }
}
