/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */
import {MigrationInterface, QueryRunner} from "typeorm";
import * as fs from 'fs'
import { getRepository } from 'typeorm'
// const csv = require('csv-parser')
import { parse } from 'csv-parse';

import * as _ from 'underscore'
import { Brand } from '../entity/Brand'
import { Category } from '../entity/Category'


export default class AddCategoriesAndBrands1642533991446 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.processCategoriesAndBrandsFile()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

  private capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private async processCategoriesAndBrandsFile() {
    let dataRows: any[] = []
    const filePath = `${__dirname}/../resources/CategoriesAndBrands.csv`
    const categoryDefaultImageUrl = 'https://res.cloudinary.com/tradegrid/image/upload/v1642535072/dev/3e0fj_nngknw.png'
    const brandDefaultImageUrl = 'https://res.cloudinary.com/tradegrid/image/upload/v1642534991/dev/Brand-Identity_bireqx.jpg'

    var parser = parse({ columns: false }, function (err, records) {
      dataRows = records
      processDataRows()
    });

    fs.createReadStream(filePath).pipe(parser);
    
    const categoryRepo = getRepository(Category)
    const brandRepo = getRepository(Brand)
  
    const processDataRows = async (): Promise<boolean> => {
      for (const row of dataRows) {
        const categoryName = row[0]
        const brandNames = _.rest(row)
          .map(bName => this.capitalizeFirstLetter(bName.replace('|', '').trim()))
          .filter(bName => bName.length)

        let category = new Category().initialize({
          name: categoryName,
          unitOfMeasurement: 'Bag',
          description: ''
        })
        const existingCategory = await categoryRepo.findOne({
          name: categoryName,
        })
        if (existingCategory) {
          category = existingCategory
        } else {
          category.image = {
            keyFromCloudProvider: '',
            url: categoryDefaultImageUrl,
            mimetype: '',
            fileCloudProvider: '',
          }
          category = await categoryRepo.save(category)
        }

        const brands = brandNames.map(brandName => {
          const newBrand = new Brand().initialize(brandName, [category])
          newBrand.image = {
            keyFromCloudProvider: '',
            url: brandDefaultImageUrl,
            mimetype: '',
            fileCloudProvider: '',
          }

          return newBrand
        })

        await brandRepo.createQueryBuilder()
          .insert()
          .into(Brand)
          .values(brands)
          .onConflict(`("name") DO NOTHING`)
          .execute()
      }

      return true
    }
  }
}
