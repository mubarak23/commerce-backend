import { Entity, Column, Index, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'

import TableColumns, { ProductLeaseRequestColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { User } from "./User";
import { ProductLeaseUploadFile } from "../interfaces/ProductLeaseUpload";
import { ColumnNumericTransformer } from "../utils/transformers";
import { ProductLeaseRequestDto } from "../dto/ProductLeaseRequestDto";
import { ProductLeaseResponseDto } from "../dto/ProductLeaseResponseDto";


@Entity({ name: Tables.PRODUCT_LEASE_REQUESTS })
@Index(['userId'])
@Index(['uuid'])
export class ProductLeaseRequest extends BaseEntity {
  @Column({name: ProductLeaseRequestColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProductLeaseRequestColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: ProductLeaseRequestColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  
  @Column({ type: "text", name: ProductLeaseRequestColumns.FIRST_NAME, nullable: true })
  firstName: string;

  @Column({ type: "text", name: ProductLeaseRequestColumns.LAST_NAME, nullable: true })
  lastName: string;

  @Column({ type: "text", name: ProductLeaseRequestColumns.PHONE_NUMBER, nullable: true})
  phoneNumber: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.EMAIL_ADDRESS, nullable: true})
  emailAddress: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.STATE_RESIDENCE, nullable: true})
  stateResidence: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.BVN, nullable: true})
  bvn?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.BUSINESS_TYPE, nullable: true})
  businessType?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.CAC_NUMBER, nullable: true})
  cacNumber?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.COMPANY_NAME, nullable: true})
  companyName?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.ID_CARD_NUMBER, nullable: true})
  idCardNumber?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.COMPANY_ADDRESS, nullable: true})
  companyAddress?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.JOB_TITLE, nullable: true})
  jobTitle?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.MODE_OF_DELIVERY, nullable: true })
  modeOfDelivery?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.PRODUCT_CATEGORY, nullable: true})
  productCategoryUuid?: string

  @Column({ type: "text", name: ProductLeaseRequestColumns.PRODUCT_QUANTITY, nullable: true})
  productQuantity?: number
  
  @Column({ name: ProductLeaseRequestColumns.CURRENCY, nullable: false, default: 'NG' })
  currency: string;

  @Column({type: 'bigint', name: ProductLeaseRequestColumns.PRINCIPAL_AMOUNT_MAJOR, nullable: true, transformer: new ColumnNumericTransformer() })
  principalAmountMajor?: number

  @Column({ type: "jsonb", name: ProductLeaseRequestColumns.UPLOADS, nullable: true })
  uploads: ProductLeaseUploadFile[];


  initialize(userId: number, newProductLeaseRquest: ProductLeaseRequestDto) {
    this.uuid = uuidv4()
    this.userId = userId

    this.firstName = newProductLeaseRquest.firstName;
    this.lastName = newProductLeaseRquest.lastName;
    this.phoneNumber = newProductLeaseRquest.phoneNumber;
    this.emailAddress = newProductLeaseRquest.emailAddress;
    this.stateResidence = newProductLeaseRquest.stateResidence;
    this.bvn = newProductLeaseRquest.bvn ?? undefined;
    this.idCardNumber = newProductLeaseRquest.idCardNumber ?? undefined;
    this.businessType = newProductLeaseRquest.businessType ?? undefined;
    this.cacNumber = newProductLeaseRquest.cacNumber ?? undefined;
    this.companyName = newProductLeaseRquest.companyName ?? undefined;
    this.companyAddress = newProductLeaseRquest.companyAddress ?? undefined;
    this.jobTitle = newProductLeaseRquest.jobTitle ?? undefined;
    this.modeOfDelivery = newProductLeaseRquest.modeOfDelivery ?? undefined;
    this.productCategoryUuid = newProductLeaseRquest.productCategoryUuid ?? undefined;
    this.productQuantity = newProductLeaseRquest.productQuantity ?? undefined;
    this.principalAmountMajor = newProductLeaseRquest.principalAmountMajor ?? undefined;
    this.currency = newProductLeaseRquest.currency || "NGN"

    this.createdAt = utcNow()

    return this
  }

  toResponseDto(): ProductLeaseResponseDto {
    return {
      uuid: this.uuid,
      principalAmountMajor: this.principalAmountMajor ?? 0,
      currency: this.currency,
      createdAtUtc: this.createdAt,
    }
  }
}
