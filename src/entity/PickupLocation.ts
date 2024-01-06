import { v4 as uuidv4 } from 'uuid'
import { Column, BaseEntity as TypeOrmBaseEntity, OneToMany } from "typeorm";
import TableColumns, { PickupLocationColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import Tables from "../enums/Tables";
import { utcNow } from '../utils/core';
import { User } from "./User";


@Entity({ name: Tables.PICKUP_LOCATIONS })
@Index(['user'])
@Index(['uuid'])
export class PickupLocation extends BaseEntity {
  @Column({name: PickupLocationColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: PickupLocationColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: PickupLocationColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({name: PickupLocationColumns.NAME, nullable: true, default: ''})
  name: string;

  @Column({length: 255, name: PickupLocationColumns.ADDRESS, nullable: false })
  address: string;
  
  @Column({length: 255, name: PickupLocationColumns.COUNTRY, nullable: true })
  country: string;
    
  @Column({length: 255, name: PickupLocationColumns.STATE, nullable: true })
  state: string;


  @Column({length: 255, name: PickupLocationColumns.CONTACT_FULL_NAME, nullable: true })
  contactFullName: string;

  @Column({length: 255, name: PickupLocationColumns.CONTACT_PHONE_NUMBER, nullable: true })
  contactPhoneNumber: string;

  @Column({type: 'boolean', name: PickupLocationColumns.IS_SOFT_DELETED, nullable: false, default: false })
  isSoftDeleted: boolean


  initialize(userId: number, name: string, address: string,
      country: string, state: string,
      contactFullName: string, contactPhoneNumber: string) {
    this.uuid = uuidv4()
    this.userId = userId

    this.name = name || ''
    this.address = address

    this.state = state
    this.country = country

    this.contactFullName = contactFullName
    this.contactPhoneNumber = contactPhoneNumber

    this.createdAt = utcNow()

    return this
  }
}
