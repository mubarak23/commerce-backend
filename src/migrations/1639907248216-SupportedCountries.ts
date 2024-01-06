import {MigrationInterface, QueryRunner} from "typeorm";

import {getRepository, MoreThan} from "typeorm";
import { SupportedCountry } from "../entity/SupportedCountry";
import SupportedCountriesSeed from '../seeds/SupportedCountriesSeed'

export default class SupportedCountries1639907248216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(SupportedCountry).save(SupportedCountriesSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(SupportedCountry).delete({id: MoreThan(1)})
  }
}
