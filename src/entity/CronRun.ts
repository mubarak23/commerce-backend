import { Entity, Column, OneToMany, Index } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import { CronRunColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import { PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity } from "typeorm";



@Entity({ name: Tables.CRON_RUNS })
@Index(['name'], { unique: true })
export class CronRun extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id?: number
  
  @Column({length: 255, name: CronRunColumns.NAME, nullable: false })
  name?: string;

  @Column({type: 'boolean', name: CronRunColumns.IS_RUNNING, nullable: false, default: true })
  isRunning?: boolean

  @Column({type: 'timestamptz', name: CronRunColumns.LAST_RUN_START, nullable: true })
  lastRunStart?: Date

  @Column({type: 'timestamptz', name: CronRunColumns.LAST_RUN_END, nullable: true })
  lastRunEnd?: Date


  initialize(name: string, lastRunStart: Date) {
    this.name = name

    this.lastRunStart = lastRunStart
    this.lastRunEnd = undefined

    return this
  }
}
