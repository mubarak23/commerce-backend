import { Entity, Column, Index, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'

import TableColumns, { ProductReviewColumns } from '../enums/TableColumns'
import Tables from "../enums/Tables";
import BaseEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { User } from "./User";
import { Product } from "./Product";


@Entity({ name: Tables.PRODUCT_REVIEWS })
@Index(['productId'])
export class ProductReview extends BaseEntity {
  @Column({name: ProductReviewColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProductReviewColumns.USER_ID })
  userId: number;

  @Column({ name: ProductReviewColumns.USER_UUID })
  userUuid: string;

  @JoinColumn({ name: ProductReviewColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ name: ProductReviewColumns.PRODUCT_ID })
  productId: number;

  @JoinColumn({ name: ProductReviewColumns.PRODUCT_ID , referencedColumnName: TableColumns.ID, })
  product: Product;

  @Column({type: 'int', name: ProductReviewColumns.RATING, })
  rating: number;

  @Column({name: ProductReviewColumns.REVIEW_NOTE, nullable: true })
  reviewNote: string

  initialize(user: User, productId: number, rating: number, reviewNote: string) {
    this.uuid = uuidv4()
    this.userId = user.id
    this.userUuid = user.uuid
    this.productId = productId
    this.rating = rating
    this.reviewNote = reviewNote

    this.createdAt = utcNow()

    return this
  }
}
