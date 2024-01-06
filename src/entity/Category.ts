import { Column, Entity, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { NewCategoryRequestDto } from "../dto/NewCategoryRequestDto";
import { CategoryColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { CategorySettingsData } from '../interfaces/CategorySettingsData';
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.CATEGORIES })
@Index(["name"], { unique: true })
@Index(["isAvailable"])
export class Category extends DefualtEntity {
  @Column({ name: CategoryColumns.UUID, unique: true })
  uuid: string;

  @Column({ length: 255, name: CategoryColumns.NAME, nullable: false })
  name: string;

  @Column({ type: "jsonb", name: CategoryColumns.BRANDS, nullable: true })
  brands: { name: string; uuid: string }[];

  // unitOfMeasurement
  @Column({
    length: 255,
    name: CategoryColumns.UNIT_OF_MEASUREMENT,
    nullable: true,
  })
  unitOfMeasurement: string;

  @Column({ type: "jsonb", name: CategoryColumns.IMAGE, nullable: true })
  image: SimpleImageJson;

  @Column({ type: "jsonb", name: CategoryColumns.BANNER, nullable: true })
  banner: SimpleImageJson;

  // productsCount: any;
  @Column({ length: 255, name: CategoryColumns.DESCRIPTION, nullable: false })
  description: string;

  @Column({ type: "jsonb", name: CategoryColumns.SETTINGS_DATA, nullable: true })
  settings: CategorySettingsData;

  @Column({
    type: "boolean",
    name: CategoryColumns.IS_AVAILABLE,
    nullable: false,
    default: false,
  })
  isAvailable: boolean;
  @Column({
    type: "bigint",
    name: CategoryColumns.PRODUCTS_COUNT,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  productsCount: number;

  @Column({
    type: "boolean",
    name: CategoryColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initialize(NewCategoryRequest: NewCategoryRequestDto) {
    this.uuid = uuidv4();
    this.name = NewCategoryRequest.name;
    // this.brands = brands.map((brand) => {
    //   return { name: brand.name, uuid: brand.uuid}
    // })
    this.unitOfMeasurement = NewCategoryRequest.unitOfMeasurement;
    this.description = NewCategoryRequest?.description ?? '';
    this.createdAt = utcNow();

    return this;
  }
}
