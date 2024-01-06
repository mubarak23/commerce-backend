/* eslint-disable no-unused-expressions */
import { Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import TableColumns, { DeliveryLocationColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import { User } from "./User";

@Entity({ name: Tables.DELIVERY_LOCATIONS })
@Index(["user"])
@Index(["uuid"])
export class DeliveryLocation extends BaseEntity {
  @Column({ name: DeliveryLocationColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: DeliveryLocationColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({name: DeliveryLocationColumns.USER_ID, referencedColumnName: TableColumns.ID })
  user: User;

  @Column({ name: DeliveryLocationColumns.WARE_HOUSE_ID, nullable: true })
  wareHouseId: number;

  @Column({ length: 255, name: DeliveryLocationColumns.ADDRESS, nullable: false })
  address: string;

  @Column({ length: 255, name: DeliveryLocationColumns.NAME, nullable: true })
  name: string;

  @Column({ length: 255, name: DeliveryLocationColumns.COUNTRY, nullable: true })
  country: string;

  @Column({ length: 255, name: DeliveryLocationColumns.CITY, nullable: true })
  state: string;

  @Column({ length: 255, name: DeliveryLocationColumns.CONTACT_FULL_NAME, nullable: true })
  contactFullName: string;

  @Column({ length: 255, name: DeliveryLocationColumns.CONTACT_PHONE_NUMBER, nullable: true,})
  contactPhoneNumber: string;

  @Column({ type: "boolean",  name: DeliveryLocationColumns.IS_DEFAULT, nullable: true, default: false })
  isDefault: boolean;

  @Column({
    type: "boolean",
    name: DeliveryLocationColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initialize(
    userId: number,
    address: string,
    state: string,
    country: string,
    contactFullName: string,
    contactPhoneNumber: string
  ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.address = address;

    this.state = state;
    this.country = country;

    this.contactFullName = contactFullName;
    this.contactPhoneNumber = contactPhoneNumber;

    this.createdAt = utcNow();

    return this;
  }

  initializeWareHouseSite(
    userId: number,
    address: string,
    country: string,
    name: string,
    state: string,
    contactFullName: string,
    contactPhoneNumber: string,
    wareHouseId: number,
  ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.address = address;
    this.country = country;
    this.name = name;
    this.state = state;
    this.contactFullName = contactFullName;
    this.contactPhoneNumber = contactPhoneNumber;
    this.wareHouseId = wareHouseId;
    this.createdAt = utcNow();
    return this;
  }
}
