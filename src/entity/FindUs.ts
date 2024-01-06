import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { FindUsColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";


@Entity({ name: Tables.FINDUS })
@Index(["name"], { unique: true })
export class Findus extends DefualtEntity {

 @Column({ name: FindUsColumns.UUID, unique: true })
  uuid: string;
  
 @Column({ length: 255, name: FindUsColumns.NAME, nullable: true })
  name: string;

@Column({ type: "boolean", name: FindUsColumns.IS_AVAILABLE, nullable: true, default: false })
  is_available: boolean;
  

@Column({ type: "integer", name: FindUsColumns.COUNTS, nullable: true, default: 0 })
  counts: number;


  initialize(name: string) {
    this.uuid = uuidv4();
    this.name = name;    
    this.createdAt = utcNow();
    return this;
  }
}
