import { Column, BaseEntity as TypeOrmBaseEntity } from "typeorm";
import { SupportedCountryColumns } from "../enums/TableColumns";
import BaseEntity from "./BaseEntity";

import { Entity, Index } from "typeorm";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";


@Entity({ name: Tables.SUPPORTED_COUNTRIES })
@Index(['name'])
export class SupportedCountry extends BaseEntity {
  @Column({length: 255, name: SupportedCountryColumns.NAME, nullable: false })
  name: string;

  @Column({length: 255, name: SupportedCountryColumns.ISO2, nullable: false })
  iso2: string;
  
  @Column({type: 'decimal', name: SupportedCountryColumns.PHONE_CODE, nullable: false })
  phoneCode: string;

  @Column({length: 255, name: SupportedCountryColumns.CURRENCY, nullable: true })
  currency: string;

  @Column({length: 255, name: SupportedCountryColumns.CURRENCY_SYMBOL, nullable: true })
  currencySymbol: string;

  @Column({ type: "jsonb", name: SupportedCountryColumns.IMAGE, nullable: true })
  image: SimpleImageJson;

  initialize(name: string, iso2: string, phoneCode: string, currency: string, currencySymbol: string) {
    this.name = name
    this.iso2 = iso2
    this.phoneCode = phoneCode
    this.currency = currency
    this.currencySymbol = currencySymbol

    return this
  }
}
