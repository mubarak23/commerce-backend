
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { PriceMatrixTransactionType } from "../enums/PriceMatrixTransactionType";

export interface QouteRequestAdminCreateRequestDto {
  buyerUserId: number;
  sellerUserId: number;
  productId: number;
  quantity: number;
  productSellingPriceMajor: number;
  productCostPriceMajor: number;
  transactionType: PriceMatrixTransactionType;
  deliveryDate: Date;
  orderReceiveType: OrderReceiveTypes;
  deliveryAddress: string;
  deliveryFee?: number;
  notes?: string | null;
}
