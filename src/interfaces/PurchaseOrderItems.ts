import { SimpleImageJson } from './SimpleImageJson';
export interface PurchaseOrderItemJson {
  referenceNumber: string,
  quantity: number,
  unitPriceForBuyer: number,
  images?: SimpleImageJson[],
  quoteRequest?: {
    uuid: string,
    unitPrice: number,
    unitPriceForBuyer: number,
    unitPromoPriceForBuyer?: number | null,
    deliveryFee: number,
    calculatedTotalCostMajor: number,
  }
}
