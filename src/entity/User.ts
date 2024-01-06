import PhoneNumber from 'awesome-phonenumber';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

import { Roles } from '../enums/Roles';
import TableColumns, { UserColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { IBankInfo } from "../interfaces/IBankInfo";
import { ICloudFile } from "../interfaces/ICloudFile";
import { SellerDocsUpload } from "../interfaces/sellerDocsUpload";
import { SettingsData } from "../interfaces/SettingsData";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { PickupLocation } from './PickupLocation';
import { TempUser } from "./TempUser";

@Entity({ name: Tables.USERS })
@Index(["uuid"])
@Index(["phoneNumber"])
@Index(["msisdn"])
@Index(["emailAddress"])
@Index(["uniqueCode"])
@Index(["defaultSellerUserId"])
@Index(["role"])
@Index(["uuid", "role"])
export class User extends DefualtEntity {
  @Column({ name: UserColumns.UUID, unique: true })
  uuid: string;

  @Column({ length: 255, name: UserColumns.FIRST_NAME, nullable: false })
  firstName: string;

  @Column({ length: 255, name: UserColumns.LAST_NAME, nullable: false })
  lastName: string;

  @Column({ name: UserColumns.EMAIL_ADDRESS, nullable: true })
  emailAddress?: string;

  @Column({ name: UserColumns.PHONE_NUMBER, nullable: false })
  phoneNumber: string;

  @Column({ name: UserColumns.MSISDN, nullable: true })
  msisdn: string;

  @Column({ name: UserColumns.COUNTRY_ISO2, nullable: false })
  countryIso2: string;

  @Column({
    name: UserColumns.COUNTRY_LONG_NAME,
    nullable: false,
    default: "Nigeria",
  })
  countryLongName: string;

  @Column({ name: UserColumns.PASSWORD_HASH, nullable: false })
  passwordHash: string;

  @Column({ type: "jsonb", name: UserColumns.PHOTO, nullable: true })
  photo: ICloudFile;

  @Column({
    type: "boolean",
    name: UserColumns.IS_SELLER,
    nullable: false,
    default: false,
  })
  isSeller: boolean;

  @Column({
    type: "boolean",
    name: TableColumns.IS_ENABLED,
    nullable: false,
    default: true,
  })
  isEnabled: boolean;

  @Column({
    type: "boolean",
    name: UserColumns.CREATED_FROM_TEMPORARY_ORDER,
    nullable: false,
    default: false,
  })
  createdFromTemporaryOrder: boolean;

  @Column({
    type: "decimal",
    name: UserColumns.TOTAL_RATINGS_VALUE,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  totalRatingsValue: number;

  @Column({
    type: "bigint",
    name: UserColumns.TOTAL_NUMBER_OF_RATINGS,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  totalNumberOfRatings: number;

  @Column({ type: "jsonb", name: UserColumns.SETTINGS, nullable: true })
  settings: SettingsData;

  @Column({ type: "jsonb", name: UserColumns.BANK_INFO, nullable: true })
  bankInfo: IBankInfo;

  @Column({ type: "jsonb", name: UserColumns.SELLER_DOCS, nullable: true })
  sellerDocs: SellerDocsUpload[];

  @OneToMany(() => PickupLocation, (pickupLocation) => pickupLocation.user)
  pickupLocations: Promise<PickupLocation[]>
  
  @Column({ name: UserColumns.DEFAULT_SELLER_USER_ID, nullable: true })
  defaultSellerUserId: number;

  @Column({name: UserColumns.UNIQUE_CODE, nullable: true })
  uniqueCode: string

  @Column({name: UserColumns.ROLE, nullable: true, default: Roles.NORMAL_USER })
  role: Roles

  @Column({ type: "jsonb", name: UserColumns.STORE_FRONT_BANNER, nullable: true })
  storeFrontBanner: ICloudFile;

  @Column({
    type: "boolean",
    name: UserColumns.IS_COOPERATE,
    nullable: true,
    default: false,
  })
  isCooperate: boolean;

  @Column({
    type: "boolean",
    name: UserColumns.IS_DEVELOPER,
    nullable: false,
    default: false,
  })
  isDeveloper: boolean;

  @Column({
    type: "boolean",
    name: UserColumns.IS_INVESTOR,
    nullable: false,
    default: false,
  })
  isInvestor: boolean;

  @Column({ name: UserColumns.ACCOUNT_ID, nullable: true })
  accountId: number;

  @Column({ name: UserColumns.WAREHOUSE_ID, nullable: true })
  wareHouseId: number;

  @Column({ length: 255, name: UserColumns.COMPANY_NAME, nullable: true })
  companyName: string;

  @Column({
    type: "boolean",
    name: UserColumns.IS_ADMIN,
    nullable: false,
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: "boolean",
    name: UserColumns.ADMIN_CAN_VIEW,
    nullable: false,
    default: false,
  })
  adminCanView: boolean;

  @Column({
    type: "boolean",
    name: UserColumns.ADMIN_CAN_EDIT,
    nullable: false,
    default: false,
  })
  adminCanEdit: boolean;



  initialize(tempUser: TempUser, msisdn: string, countryLongName: string) {
    this.uuid = uuidv4();

    const now = utcNow();
    this.firstName = tempUser.firstName;
    this.lastName = tempUser.lastName;
    this.emailAddress = tempUser.emailAddress;

    if (tempUser.phoneNumber.startsWith("0")) {
      this.phoneNumber = tempUser.phoneNumber.substring(1);
    } else {
      this.phoneNumber = tempUser.phoneNumber;
    }

    this.msisdn = msisdn;
    this.passwordHash = tempUser.passwordHash;
    this.countryIso2 = tempUser.countryIso2;
    this.countryLongName = countryLongName;
    this.isSeller = tempUser.isSeller;
    this.companyName = tempUser.companyName;
    this.role = tempUser.role;
    this.isCooperate = tempUser.isCooperate;
    this.isEnabled = true;

    this.totalRatingsValue = 0;
    this.totalNumberOfRatings = 0;
    this.createdAt = now;
    return this;
  }

  initializeFromSimple(buyerFullName: string, buyerEmailAddress: string, buyerMsisdn: string, passwordHash: string) {
    this.uuid = uuidv4();

    const now = utcNow();
    const fullNameSplit = buyerFullName.split(' ')

    // eslint-disable-next-line prefer-destructuring
    this.firstName = fullNameSplit[0];
    this.lastName = fullNameSplit[1] ? fullNameSplit[1] : fullNameSplit[0];
    this.emailAddress = buyerEmailAddress;
    this.msisdn = buyerMsisdn;
    this.phoneNumber = new PhoneNumber(buyerMsisdn, "NG").getNumber("national")

    this.passwordHash = passwordHash;
    this.countryIso2 = 'NG';
    this.countryLongName = 'Nigeria';
    this.isSeller = false;
    this.role = Roles.NORMAL_USER;
    this.isEnabled = true;

    this.totalRatingsValue = 0;
    this.totalNumberOfRatings = 0;
    this.createdAt = now;
    return this;
  }

  initializeAdmin(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    msisdn: string,
    passwordHash: string,
    countryIso2: string,
    countryLongName: string
  ) {
    this.uuid = uuidv4();

    const now = utcNow();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.msisdn = msisdn;
    this.passwordHash = passwordHash;
    this.countryIso2 = countryIso2;
    this.countryLongName = countryLongName;
    this.createdAt = now;
    return this;
  }

  initializeAffiliate(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    msisdn: string,
    emailAddress: string | undefined,
    passwordHash: string,
  ) {
    this.uuid = uuidv4();

    const now = utcNow();
    this.firstName = firstName;
    this.lastName = lastName;
    if (phoneNumber.startsWith("0")) {
      this.phoneNumber = phoneNumber.substring(1);
    } else {
      this.phoneNumber = phoneNumber;
    }
    this.msisdn = msisdn;
    this.emailAddress = emailAddress;
    this.passwordHash = passwordHash;
    this.countryIso2 = "NG";
    this.countryLongName = "Nigeria";
    this.role = Roles.AFFILIATE;
    this.createdAt = now;
    return this;
  }

  initializeSellerOma(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    msisdn: string,
    emailAddress: string | undefined,
    passwordHash: string,
  ) {
    this.uuid = uuidv4();

    const now = utcNow();
    this.firstName = firstName;
    this.lastName = lastName;
    if (phoneNumber.startsWith("0")) {
      this.phoneNumber = phoneNumber.substring(1);
    } else {
      this.phoneNumber = phoneNumber;
    }
    this.msisdn = msisdn;
    this.emailAddress = emailAddress;
    this.passwordHash = passwordHash;
    this.countryIso2 = "NG";
    this.isSeller = true;
    this.isEnabled = true;
    this.countryLongName = "Nigeria";
    this.role = Roles.NORMAL_USER;
    this.createdAt = now;
    return this;
  }

  initializeNewCooperateUser(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    msisdn: string,
    emailAddress: string,
    passwordHash: string,
  ) {
    this.uuid = uuidv4();

    const now = utcNow();
    this.firstName = firstName;
    this.lastName = lastName;
    if (phoneNumber.startsWith("0")) {
      this.phoneNumber = phoneNumber.substring(1);
    } else {
      this.phoneNumber = phoneNumber;
    }
    this.msisdn = msisdn;
    this.emailAddress = emailAddress;
    this.passwordHash = passwordHash;
    this.countryIso2 = "NG";
    this.isSeller = false;
    this.countryLongName = "Nigeria";
    this.role = Roles.NORMAL_USER;
    this.isCooperate = true
    this.createdAt = now;
    return this;
  }

}
