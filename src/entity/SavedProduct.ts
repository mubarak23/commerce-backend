import { Entity, Column, JoinColumn, Index } from "typeorm";
import DefualtEntity from "./BaseEntity";
import TableColumns, { SavedProductColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import * as Utils from "../utils/core";
import { User } from "./User";
import { Product } from "./Product";

@Entity({ name: Tables.SAVED_PRODUCTS })
@Index(['userId'])
export class SavedProduct extends DefualtEntity {
  @Column({ name: SavedProductColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: SavedProductColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ name: SavedProductColumns.PRODUCT_ID })
  productId: number;

  @JoinColumn({ name: SavedProductColumns.PRODUCT_ID , referencedColumnName: TableColumns.ID, })
  product: Product;

  initialize(userId: number, productId: number) {
    this.userId = userId;
    this.productId = productId

    this.createdAt = Utils.utcNow();
    return this;
  }
}
