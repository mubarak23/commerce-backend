import { Entity, Column, Index } from "typeorm";
import { ConfigPropertyColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from '../utils/core';


@Entity({ name: Tables.CONFIG_PROPERTIES })
@Index(['name'], { unique: true })
export class ConfigProperty extends BaseEntity {
  @Column({length: 255, name: ConfigPropertyColumns.NAME })
  name: string;

  @Column({length: 255, name: ConfigPropertyColumns.VALUE})
  value: string;

  @Column({length: 255, name: ConfigPropertyColumns.DESCRIPTION, nullable: true })
  description: string;

  initialize(name: string, value: string, description: string) {
    this.name = name
    this.description = description
    this.value = value
    this.createdAt = utcNow()

    return this
  }
}
