import {getRepository, MigrationInterface, MoreThan, QueryRunner} from "typeorm";
import { Category } from "../entity/Category";

import CategoriesSeed from '../seeds/CategoriesSeed'


export default class Categories1613499688264 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(Category).save(CategoriesSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(Category).delete({id: MoreThan(1)})
  }
}
