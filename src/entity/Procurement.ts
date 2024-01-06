import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ProcurementColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";


@Entity({ name: Tables.PROCUREMENTS })
@Index(["uuid"])
@Index(["isProcessed", "createdAt"])
export class Procurements extends DefualtEntity {

  @Column({ name: ProcurementColumns.UUID, unique: true })
  uuid: string;
  
  @Column({ name: ProcurementColumns.ACCOUNT_ID, nullable: true })
  accountId: number;

  @Column({ type: "jsonb", name: ProcurementColumns.UPLOAD, nullable: true })
  upload: SimpleImageJson;

  @Column({ type: "boolean", name: ProcurementColumns.IS_PROCESSED, nullable: true, default: false })
  isProcessed: boolean;

  @Column({ name: ProcurementColumns.PROCESSED_AT, nullable: true })
  proccessedAt: Date;
  
  @Column({
    type: "boolean",
    name: ProcurementColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initialize(accountId: number, upload: SimpleImageJson) {
    this.uuid = uuidv4();
    this.accountId = accountId; 
    this.upload = upload;
    this.createdAt = utcNow();
    return this;
  }
}
