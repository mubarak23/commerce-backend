import { LocalGovernmentAreaPrice } from '../entity/Product';
import { CategorySettingsData } from './CategorySettingsData';
import { SimpleImageJson } from './SimpleImageJson';
export interface CartItemJson {
  productId: number,
  productUuid: string;
  productName: string,
  quantity: number,
  unitPrice: number,
  unitPriceForBuyer: number,
  unitPromoPriceForBuyer?: number | null,
  promotionId?: number | null, 
  images?: SimpleImageJson[],
  productCategorySettings?: CategorySettingsData,
  deliveryAddressState?: string | null,

  // productLgaPrice?: LocalGovernmentAreaPrice | null,

  quoteRequest?: {
    uuid: string,
    unitPrice: number,
    unitPriceForBuyer: number,
    unitPromoPriceForBuyer?: number | null,
    deliveryFee: number,
    calculatedTotalCostMajor: number,
  }
}
