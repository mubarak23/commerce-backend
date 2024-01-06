import { v4 as uuidv4 } from "uuid";
import { Column } from "typeorm";
import { AccessRequestColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";


@Entity({ name: Tables.ACCESS_REQUEST })
@Index(["uuid"])
export class AccessRequest extends BaseEntity {
  @Column({ name: AccessRequestColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: AccessRequestColumns.ISSELLER, nullable: true, default: true })
  isSeller: boolean;

  @Column({ name: AccessRequestColumns.BUSINESS_NAME, nullable: true })
  businessName: string;

  @Column({ name: AccessRequestColumns.BUSINESS_LOCATION_COUNTRY, nullable: true })
  businessLocationCountry: string;

   @Column({ name: AccessRequestColumns.BUSINESS_LOCATION_STATE, nullable: true })
  businessLocationState: string;

  @Column({ name: AccessRequestColumns.APPLICANT_NAME, nullable: true })
  applicantName: string;

  @Column({ name: AccessRequestColumns.APPLICANT_ROLE, nullable: true })
  applicantRole: string;

  @Column({ name: AccessRequestColumns.APPLICANT_EMAIL, nullable: true })
  applicantEmail: string;

  @Column({ name: AccessRequestColumns.APPLICANT_PHONE, nullable: true })
  applicantPhone: string;

  @Column({ name: AccessRequestColumns.WEEKLY_TURN_OVER, nullable: true })
  weeklyTurnOver: string;

  @Column({ name: AccessRequestColumns.ENQUIRIES, nullable: true })
  enquiries: string;

  initialize(
    isSeller: boolean,
    businessName: string,
    businessLocationCountry: string,
    businessLocationState: string,
    applicantName: string,
    applicantRole: string,
    applicantEmail: string,
    applicantPhone: string,
    weeklyTurnOver: string,
    enquiries: string
  ) {
    this.uuid = uuidv4();
    this.isSeller = isSeller;
    this.businessName = businessName;

    this.businessLocationCountry = businessLocationCountry;
    this.businessLocationState = businessLocationState;
    this.applicantName = applicantName;

    this.applicantRole = applicantRole;
    this.applicantEmail = applicantEmail;

    this.applicantPhone = applicantPhone;
    this.weeklyTurnOver = weeklyTurnOver;

    this.enquiries = enquiries;

    this.createdAt = utcNow();

    return this;
  }
}
