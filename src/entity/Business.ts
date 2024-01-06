import { Entity, Column, JoinColumn, Index } from "typeorm";
import DefualtEntity from "./BaseEntity";
import TableColumns, { BusinessesColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { User } from "./User";

@Entity({ name: Tables.BUSINESSES })
@Index(['userId'])
export class Business extends DefualtEntity {
  @Column({ name: BusinessesColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: BusinessesColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ length: 255, name: BusinessesColumns.NAME })
  name: string;

  @Column({ length: 255, name: BusinessesColumns.ADDRESS })
  address: string;

  @Column({ length: 255, name: BusinessesColumns.CAC_NUMBER })
  cacNumber: string;

  initialize(userId: number, name: string, address: string, cacNumber: string) {
    this.userId = userId;
    this.name = name;
    this.address = address;
    this.cacNumber = cacNumber;
    return this;
  }
}
