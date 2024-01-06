import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { CartItemsForSeller } from "./CartItemsForSeller";

export interface OrderSellerGroup {
  userUuid: string,
  orderReceiveType: OrderReceiveTypes;

  pickupLocationUuid?: string | null
  cartItems: CartItemsForSeller[]
}
