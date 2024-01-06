import { Entity, Column, Index, } from "typeorm";
import DefualtEntity from "./BaseEntity";
import { PhoneNumberVerificationColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";

@Entity({ name: Tables.PHONE_VERIFICATION })
@Index(['msisdn'])
@Index(['msisdn', 'isVerified'])  
export class PhoneVerification extends DefualtEntity {
  @Column({ length: 255, name: PhoneNumberVerificationColumns.PHONE_NUMBER })
  phoneNumber: string;

  @Column({ name: PhoneNumberVerificationColumns.MSISDN, nullable: false })
  msisdn: string;

  @Column({ length: 255, name: PhoneNumberVerificationColumns.VERIFICATION_CODE })
  verificationCode: string;

  @Column({type: 'boolean', name: PhoneNumberVerificationColumns.SMS_SENT_SUCCESSFULLY, nullable: true })
  smsSentSuccessfully?: boolean

  @Column({type: 'boolean', name: PhoneNumberVerificationColumns.IS_VERIFIED, default: false })
  isVerified: boolean

  @Column({name: PhoneNumberVerificationColumns.VERIFIED_AT, nullable: true })
  verifiedAt?: Date

  initialize(phoneNumber: string, msisdn: string, verificationCode: string) {
    this.phoneNumber = phoneNumber;
    this.msisdn = msisdn
    this.verificationCode = verificationCode;

    this.smsSentSuccessfully = undefined
    this.isVerified = false
    this.verifiedAt = undefined

    return this
  }
}
