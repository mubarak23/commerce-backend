import { OrderReceiver } from "../entity/Order";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { OrderSellerGroup } from "./OrderSellerGroup";

// CreateOrderByAdminRequestDto
export interface CreateOrderByAdminRequestDto {
  userId: number;
  productId: number;
  quantity: number;
  unitPrice: number| null;
  orderPaymentVariant: OrderPaymentVariant,
  orderReceiveType: OrderReceiveTypes,
  differentOrderReceiver?: OrderReceiver | null,
  deliveryAddressId?: number | null;
  pickupLocationId?: number | null;
  sellers?: OrderSellerGroup[] | null,
}