/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-await-in-loop */
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Product } from "../entity/Product";

export class RemoveLgaPrices1672686032797 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepo = getRepository(Product)

    const products = await productRepo.find({})

    const updateValues = products.map(product => {
      const newProductPrice: number = (product.localGovernmentAreaPrices && product.localGovernmentAreaPrices.prices.length > 0) ?
        product.localGovernmentAreaPrices.prices[0].price : (product.price ?? 0)
      
      return `(${product.id}, ${newProductPrice})`
    })

    if(updateValues.length) {
      const query = 
      `UPDATE products set 
        price = product_update.newPrice,
        local_government_area_prices = NULL

        from(values${updateValues.join(",")}) as product_update (id, newPrice)
        where products.id = product_update.id;`
    
      await productRepo.manager.query(query, [])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
