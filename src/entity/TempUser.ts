import PhoneNumber from 'awesome-phonenumber';
import { Column, Entity } from "typeorm";

import { NewCooperateUserSignupDto } from "../dto/NewCooperateUserSignupDto";
import { NewMortageInvestorSignup } from '../dto/NewMortageInvestorSignup';
import { NewMortageUserSignupDto } from '../dto/NewMortageUserSignupDto';
import { NewUserRequestDto } from "../dto/NewUserRequestDto";
import { Roles } from "../enums/Roles";
import { TemporaryUserColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.TEMPORARY_USERS })
export class TempUser extends DefualtEntity {
  @Column({ length: 255, name: TemporaryUserColumns.FIRST_NAME })
  firstName: string;

  @Column({ length: 255, name: TemporaryUserColumns.LAST_NAME })
  lastName: string;

  @Column({ length: 255, name: TemporaryUserColumns.EMAIL_ADDRESS })
  emailAddress: string;

  @Column({ name: TemporaryUserColumns.PHONE_NUMBER })
  phoneNumber: string;

  @Column({ name: TemporaryUserColumns.COUNTRY_ISO2, nullable: false })
  countryIso2: string;

  @Column({ name: TemporaryUserColumns.MSISDN, nullable: false })
  msisdn: string;

  @Column({ name: TemporaryUserColumns.PASSWORD_HASH, nullable: false })
  passwordHash: string;

  @Column({ type: "boolean", name: TemporaryUserColumns.IS_SELLER, default: false })
  isSeller: boolean;

  @Column({ type: "boolean", name: TemporaryUserColumns.IS_COOPERATE, default: false })
  isCooperate: boolean;

  @Column({ name: TemporaryUserColumns.COOPERATE_EMAIL, nullable: true })
  cooperateEmail: string;

  @Column({ name: TemporaryUserColumns.BUSINESS_NAME, nullable: true })
  businessName: string;

  @Column({ name: TemporaryUserColumns.WARE_HOUSE_LOCATION, nullable: true })
  wareHouseLocation: string;

  @Column({name: TemporaryUserColumns.DEFAULT_SELLER_UNIQUE_CODE, nullable: true })
  defaultSellerUniqueCode?: string

  @Column({ length: 255, name: TemporaryUserColumns.COMPANY_NAME, nullable: true })
  companyName: string;

  @Column({ length: 255, name: TemporaryUserColumns.CAC_NUMBER, nullable: true })
  cacNumber: string;

  @Column({ length: 255, name: TemporaryUserColumns.ADDRESS, nullable: true })
  address: string;

  @Column({name: TemporaryUserColumns.ROLE, nullable: true, default: Roles.NORMAL_USER })
  role: Roles

  initialize(newUserRequest: NewUserRequestDto, 
      msisdn: string, countryIso2: string, 
      passwordHash: string, role: Roles, defaultSellerUniqueCode?: string) {
    this.firstName = newUserRequest.firstName;
    this.lastName = newUserRequest.lastName;
    this.emailAddress = newUserRequest.emailAddress;
    this.phoneNumber = newUserRequest.phoneNumber;
    this.msisdn = msisdn
    this.countryIso2 = countryIso2
    this.passwordHash = passwordHash;
    this.isSeller = newUserRequest.isSeller || false;
    this.isCooperate = newUserRequest.isCooperate || false;
    this.defaultSellerUniqueCode = defaultSellerUniqueCode
    this.role = role

    return this;
  }

  initializeCooperateUser(newUserRequest: NewCooperateUserSignupDto, 
    msisdn: string, countryIso2: string, 
    passwordHash: string, role: Roles, defaultSellerUniqueCode?: string) {
  this.firstName = newUserRequest.firstName;
  this.lastName = newUserRequest.lastName;
  this.emailAddress = newUserRequest.emailAddress;
  this.phoneNumber = newUserRequest.phoneNumber;
  this.msisdn = msisdn
  this.countryIso2 = countryIso2
  this.passwordHash = passwordHash;
  this.isSeller = false;
  this.isCooperate = newUserRequest.isCooperate || true;
  this.businessName = newUserRequest.businessName;
  this.companyName = newUserRequest.businessName;
  this.cooperateEmail = newUserRequest.emailAddress;
  this.defaultSellerUniqueCode = defaultSellerUniqueCode
  this.role = role

  return this;
}


initializeMortageUser(newUserRequest: NewMortageUserSignupDto, 
  msisdn: string, countryIso2: string, 
  passwordHash: string) {
this.firstName = newUserRequest.firstName;
this.lastName = newUserRequest.lastName;
this.emailAddress = newUserRequest.emailAddress;
this.phoneNumber = newUserRequest.phoneNumber;
this.msisdn = msisdn;
this.countryIso2 = countryIso2;
this.passwordHash = passwordHash;
this.isSeller = false;
this.isCooperate = false;
this.role = newUserRequest.role;
return this;
}

initializeMortageDeveloperUser(newUserRequest: NewMortageUserSignupDto, 
  msisdn: string, countryIso2: string, 
  passwordHash: string) {
this.firstName = newUserRequest.firstName;
this.lastName = newUserRequest.lastName;
this.emailAddress = newUserRequest.emailAddress;
this.phoneNumber = newUserRequest.phoneNumber;
this.msisdn = msisdn;
this.countryIso2 = countryIso2;
this.passwordHash = passwordHash;
this.isSeller = false;
this.isCooperate = false;
this.role = newUserRequest.role;
this.companyName = newUserRequest.companyName;
this.address = newUserRequest.address;
this.cacNumber = newUserRequest.cacNumber;
return this;
}

initializeMortageInvestorUser(newUserRequest: NewMortageInvestorSignup, 
  msisdn: string, countryIso2: string, 
  passwordHash: string) {
this.firstName = newUserRequest.firstName;
this.lastName = newUserRequest.lastName;
this.emailAddress = newUserRequest.emailAddress;
this.phoneNumber = newUserRequest.phoneNumber;
this.msisdn = msisdn;
this.countryIso2 = countryIso2;
this.passwordHash = passwordHash;
this.isSeller = false;
this.isCooperate = false;
this.role = newUserRequest.role;
return this;
}


  initializeFromBuyerDetails(buyerFullName: string, buyerMsisdn: string, buyerEmailAddress: string, 
      passwordHash: string) {
    const fullNameSplit = buyerFullName.split(' ')
    // eslint-disable-next-line prefer-destructuring
    this.firstName = fullNameSplit[0];
    this.lastName = fullNameSplit[1] ? fullNameSplit[1] : fullNameSplit[0];
    this.emailAddress = buyerEmailAddress;
    this.phoneNumber = new PhoneNumber(buyerMsisdn, "NG").getNumber("national")
    this.msisdn = buyerMsisdn
    this.countryIso2 = "NG"
    this.passwordHash = passwordHash;
    this.isSeller = false;
    this.role = Roles.NORMAL_USER

    return this;
  }
}
