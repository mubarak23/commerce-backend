import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import { PaystackDedicatedNubanColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";


@Entity({ name: Tables.PAYSTACK_DEDICATED_NUBANS })
@Index(['userId'])
export class PaystackDedicatedNuban extends BaseEntity {

  @Column({ length: 255, name: PaystackDedicatedNubanColumns.UUID })
  uuid: string;

  @Column({type: 'bigint', name: PaystackDedicatedNubanColumns.USER_ID })
  userId: number;

  @Column({ type: 'jsonb', name: PaystackDedicatedNubanColumns.DEDICATED_NUBAN_PAYLOAD, nullable: false })
  dedicatedNubanPayload?: any;


  @Column({name: PaystackDedicatedNubanColumns.BANK_ID })
  bankId: string;

  @Column({name: PaystackDedicatedNubanColumns.BANK_NAME })
  bankName: string;

  @Column({name: PaystackDedicatedNubanColumns.BANK_ACCOUNT_NUMBER })
  bankAccountNumber: string;

  @Column({name: PaystackDedicatedNubanColumns.BANK_ACCOUNT_NAME })
  bankAccountName: string;


  @Column({name: PaystackDedicatedNubanColumns.PAYSTACK_CUSTOMER_ID, nullable: true })
  paystackCustomerId: string;

  @Column({name: PaystackDedicatedNubanColumns.PAYSTACK_INTEGRATION, nullable: true })
  paystackIntegration: string;


  initialize(userId: number, bankId: string, bankName: string, bankAccountNumber: string, bankAccountName: string,
      paystackCustomerId: string, paystackIntegration: string, dedicatedNubanPayload?: any) {
    this.uuid = uuidv4()
    this.userId = userId
    this.dedicatedNubanPayload = dedicatedNubanPayload

    this.bankId = bankId
    this.bankName = bankName
    this.bankAccountNumber = bankAccountNumber
    this.bankAccountName = bankAccountName
    this.paystackCustomerId = paystackCustomerId
    this.paystackIntegration = paystackIntegration

    this.createdAt = utcNow()

    return this
  }
}
