import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { WareHouseColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.WARE_HOUSES })
@Index(["uuid"])
@Index(["accountId", "isDefault", "isSoftDeleted"])
export class WareHouse extends DefualtEntity {
  @Column({ name: WareHouseColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WareHouseColumns.ACCOUNT_ID })
  accountId: number;

  @Column({ name: WareHouseColumns.CREATEDBY_USER_ID })
  createdByUserId: number;

  @Column({ name: WareHouseColumns.IS_DEFAULT, default: false })
  isDefault: boolean;

  @Column({ length: 255, name: WareHouseColumns.NAME })
  name: string;

  @Column({ length: 255, name: WareHouseColumns.STATE })
  state: string;

  @Column({ length: 255, name: WareHouseColumns.COUNTRY })
  country: string;

  @Column({ name: WareHouseColumns.TOTAL_VALUE_MAJOR })
  totalValueMajor: number;

  @Column({ name: WareHouseColumns.TOTAL_QUANTITY })
  totalQuantity: number;

  @Column({ length: 255, name: WareHouseColumns.CONTACT_FULL_NAME })
  contactFullName: string;

  @Column({ length: 255, name: WareHouseColumns.CONTACT_PHONE_NUMBER })
  contactPhoneNumber: string;

  @Column({
    type: "boolean",
    name: WareHouseColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initialize(accountId: number, createdByUserId: number, name: string, state: string, country: string,
      contactFullName: string, contactPhoneNumber: string ) {
    this.uuid = uuidv4();
    this.accountId = accountId;
    this.createdByUserId = createdByUserId;
    this.name = name;
    this.state = state;
    this.country = country;
    this.totalValueMajor = 0;
    this.totalQuantity = 0;
    this.contactFullName = contactFullName;
    this.contactPhoneNumber = contactPhoneNumber;
    this.createdAt = utcNow();
    return this;
  }
}