import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { AccountColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.ACCOUNTS })
@Index(["id"], { unique: true })
@Index(["primaryUserId"])
export class Account extends DefualtEntity {
  @Column({ name: AccountColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: AccountColumns.PRIMARY_USER_ID, unique: true })
  primaryUserId: number;

  @Column({ length: 255, name: AccountColumns.TYPE })
  type: string;

  initialize(primaryUserId: number, type: string, ) {
    this.uuid = uuidv4();
    this.type = type;
    this.primaryUserId = primaryUserId;
    this.createdAt = utcNow();
    return this;
  }
}
