import { Entity, Column, OneToMany, Index } from "typeorm";
import TableColumns, { SmsSendLogColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import { PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity } from "typeorm";
import { utcNow } from "../utils/core";
import { SmsProviders } from "../enums/SmsProviders";


@Entity({ name: Tables.SMS_SEND_LOGS })
@Index(['recipientMsisdn'])
export class SmsSendLog extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({name: SmsSendLogColumns.RECIPIENT_MSISDN, nullable: false })
  recipientMsisdn: string;

  @Column({length: 20, name: SmsSendLogColumns.SMS_PROVIDER, nullable: false })
  smsProvider: SmsProviders

  @Column({type: 'jsonb', name: SmsSendLogColumns.REQUEST_JSON, nullable: false })
  requestJson: any;

  @Column({type: 'jsonb', name: SmsSendLogColumns.RESPONSE_JSON, nullable: true })
  responseJson?: any;

  @Column({name: SmsSendLogColumns.HTTP_REQUEST_ERROR_MESSAGE, nullable: true })
  httpRequestErrorMessage?: string;

  @Column({type: 'boolean', name: SmsSendLogColumns.SENT_SUCCESSFULLY, nullable: true })
  sentSuccessfully?: boolean

  @Column({type: 'timestamptz', name: TableColumns.CREATED_AT, nullable: false })
  createdAt?: Date


  initialize(msisdn: string, requestJson: any, smsProvider: SmsProviders) {
    this.recipientMsisdn = msisdn
    this.smsProvider = smsProvider

    this.requestJson = requestJson
    this.sentSuccessfully = undefined
    this.httpRequestErrorMessage = undefined

    this.createdAt = utcNow()

    return this
  }
}
