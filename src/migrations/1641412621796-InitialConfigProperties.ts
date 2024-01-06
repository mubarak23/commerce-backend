import {getRepository, InsertResult, MigrationInterface, QueryRunner} from "typeorm";
import { ConfigProperty } from "../entity/ConfigProperty";
import ConfigProperties  from "../seeds/ConfigPropertiesSeed"

export default class InitialConfigProperties1641412621796 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const insertResult: InsertResult = await getRepository(ConfigProperty).createQueryBuilder()
      .insert()
      .into(ConfigProperty)
      .values(ConfigProperties)
      .onConflict('DO NOTHING')
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(ConfigProperty).delete({})
  }
}
