import { Entity, Column, Index } from "typeorm";
import { AvailableLocationStatesColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";

@Entity({ name: Tables.AVAILABLE_LOCATION_STATES })
export class AvailableLocationState extends DefualtEntity {
  @Column({ length: 255, name: AvailableLocationStatesColumns.STATE })
  state: string;

  @Column({ length: 255, name: AvailableLocationStatesColumns.COUNTRY })
  country: string;

  @Column({
    length: 255,
    name: AvailableLocationStatesColumns.COUNTRY_ISO2_CODE,
  })
  countryIso2Code: string;

  @Column({
    type: "bigint",
    name: AvailableLocationStatesColumns.PRODUCTS_COUNT,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  productsCount: number;

  initialize(
    stateName: string,
    countryLongName: string,
    countryIso2Code: string
  ) {
    this.state = stateName;
    this.country = countryLongName;
    this.countryIso2Code = countryIso2Code;
    this.productsCount = 1;

    this.createdAt = utcNow();
    return this;
  }
}
