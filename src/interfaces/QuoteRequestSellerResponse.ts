export interface QuoteRequestSellerResponse {
  unitPrice: number,
  unitPriceForBuyer: number,
  unitPromoPriceForBuyer?: number | null,
  promotionId?: number | null,
  deliveryFee?: number | null,
  minimumQuantity: number,
  maximumQuantity: number,

  pickupAddress?: string | null,
}
