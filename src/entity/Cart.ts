import { Entity, Column, JoinColumn, Index } from "typeorm";
import DefualtEntity from "./BaseEntity";
import TableColumns, { CartColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import * as Utils from "../utils/core";
import { User } from "./User";
import { CartItemJson } from "../interfaces/CartItemJson";
import { Product, LocalGovernmentAreaPrice } from './Product';
import { ProductsResponseDto } from "../dto/ProductsResponseDto";
import { CartItem } from "../dto/CartDetailsResponseDto";

@Entity({ name: Tables.CARTS })
@Index(["userId"], { unique: true })
export class Cart extends DefualtEntity {
  @Column({ name: CartColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: CartColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ type: "jsonb", name: CartColumns.CART_ITEMS, })
  cartItems: CartItemJson[];

  initialize(currentUser: User, firstProduct: Product, quantity: number ) {
    this.userId = currentUser.id;
    const unitPriceForBuyer = Utils.getPriceForBuyer(firstProduct.price ?? 0, firstProduct)

    this.cartItems = [{
      productId: firstProduct.id,
      productUuid: firstProduct.uuid,
      productName: firstProduct.name,
      quantity,
      unitPrice: firstProduct.price ?? 0,
      unitPriceForBuyer,
      images: firstProduct.images,
    }]

    this.createdAt = Utils.utcNow();
    return this;
  }

  initializeEmpty(currentUser: User) {
    this.userId = currentUser.id;
    this.cartItems = []

    this.createdAt = Utils.utcNow();
    return this;
  }

  public static toCartResponseItem(productResponseDto: ProductsResponseDto, cartItemJson: CartItemJson): CartItem {
    return {
      ...productResponseDto,
      unitPriceForBuyer: cartItemJson.unitPriceForBuyer ?? 0,
      quantity: cartItemJson.quantity ?? 0,
    }
  }
}
