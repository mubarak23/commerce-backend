import { Entity, Column, Index } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

import { utcNow } from '../utils/core'
import { EmailValidationColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";


@Entity({ name: Tables.EMAIL_ACTIVATIONS })
@Index(['uniqueToken'], { unique: true })
export class EmailActivation extends BaseEntity {
  @Column({name: EmailValidationColumns.EMAIL_ADDRESS, nullable: false })
  emailAddress: string;

  @Column({name: EmailValidationColumns.UNIQUE_TOKEN, unique: true })
  uniqueToken: string;

  @Column({type: 'boolean', name: EmailValidationColumns.IS_VERIFIED, default: false })
  isVerified: boolean

  @Column({name: EmailValidationColumns.VERIFIED_AT, nullable: true })
  verifiedAt?: Date


  initialize(emailAddress: string) {
    const now = utcNow()
    this.uniqueToken = uuidv4()
    this.emailAddress = emailAddress

    this.isVerified = false
    this.verifiedAt = undefined
    this.createdAt = now

    return this
  }
}
