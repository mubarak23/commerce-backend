import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import TableColumns, { AuditLogsColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { User } from "./User";

@Entity({ name: Tables.AUDIT_LOGS })
@Index(["id"], { unique: true })
export class AuditLogs extends DefualtEntity {
  @Column({ name: AuditLogsColumns.USER_ID })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: AuditLogsColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({ name: AuditLogsColumns.METHOD })
  method: string;

  @Column({ name: AuditLogsColumns.PATH })
  path: string;

  @Column({ type: "jsonb", name: AuditLogsColumns.PAYLOAD })
  payload: any[];


  initialize(userId: number, method: string, path: string, payload: any) {
    this.userId = userId;
    this.method = method;
    this.path = path;
    this.payload = payload;
    this.createdAt = utcNow();
    return this;
  }
}
