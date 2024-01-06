import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BrandColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { Category } from "./Category";
import { ColumnNumericTransformer } from "../utils/transformers";

@Entity({ name: Tables.BRANDS })
@Index(["name"], { unique: true })
@Index(["isAvailable"])
export class Brand extends DefualtEntity {
  @Column({ name: BrandColumns.UUID, unique: true })
  uuid: string;

  @Column({ length: 255, name: BrandColumns.NAME })
  name: string;

  @Column({ type: "jsonb", name: BrandColumns.CATEGORIES, nullable: true })
  categories: { name: string; uuid: string }[];
  // productsCount: any;

  @Column({ type: "jsonb", name: BrandColumns.IMAGE, nullable: true })
  image: SimpleImageJson;

  @Column({
    type: "boolean",
    name: BrandColumns.IS_AVAILABLE,
    nullable: false,
    default: false,
  })
  isAvailable: boolean;

  @Column({
    type: "bigint",
    name: BrandColumns.PRODUCTS_COUNT,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  productsCount: number;

  @Column({
    type: "boolean",
    name: BrandColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;


  initialize(brandName: string, categories: Category[]) {
    this.uuid = uuidv4();
    this.name = brandName;
    this.categories = categories.map((cat) => {
      return { name: cat.name, uuid: cat.uuid };
    });
    this.createdAt = utcNow();
    return this;
  }
}
