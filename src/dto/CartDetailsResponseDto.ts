import { LocalGovernmentAreaPrice } from "../entity/Product";
import { ProductsResponseDto } from "./ProductsResponseDto";

export interface CartDetailsResponseDto {
  items: CartItem[]
}

export interface CartItem extends ProductsResponseDto {
  quantity: number,
}
