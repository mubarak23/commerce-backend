import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import TableColumns, { PromotionColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { Category } from "./Category";

@Entity({ name: Tables.PROMOTIONS })
@Index(["name"], { unique: true })
@Index(["isActive"])
@Index(["uuid"], { unique: true })
export class Promotion extends DefualtEntity {
  @Column({ name: PromotionColumns.UUID })
  uuid: string;

  @Column({ length: 255, name: PromotionColumns.NAME })
  name: string;

  @Column({ type: "decimal", name: PromotionColumns.PERCENTAGE })
  percentage: number;

  @Column({ name: PromotionColumns.CATEGORY_ID })
  categoryId: number;
  
  @ManyToOne(() => Category, { primary: true })
  @JoinColumn({
    name: PromotionColumns.CATEGORY_ID,
    referencedColumnName: TableColumns.ID,
  })
  categoryPromotion: Category;

  @Column({ type: 'timestamptz', name: PromotionColumns.END_DATE, nullable: true })
  endDate?: Date;


  @Column({
    type: "boolean",
    name: PromotionColumns.IS_ACTIVE,
    nullable: false,
    default: false,
  })
  isActive: boolean;


  initialize(name: string, categoryId: number, percentage: number, endDate?: Date) {
    this.uuid = uuidv4();
    this.name = name;
    this.categoryId = categoryId;
    this.percentage = percentage;
    this.isActive = true;
    this.endDate = endDate;
    this.createdAt = utcNow();
    return this;
  }
}
