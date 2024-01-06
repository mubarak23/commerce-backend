import { PriceMatrixTransactionType } from "../enums/PriceMatrixTransactionType";

export interface SubmitPriceMatricDto {
  sellerUserId: number;
  productSellingPriceMajor: number;
  productCostPriceMajor: number;
  deliveryDate: Date;
  transactionType: PriceMatrixTransactionType;
  qouteRequestRef: number;
  deliveryFee?: number;
  quantity?: number | null;
}