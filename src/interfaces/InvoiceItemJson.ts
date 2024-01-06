export interface InvoiceItemJson {
  productId: number,
  productUuid?: string;
  productName: string,
  quantity: number,
  isPaid?: boolean,
  unitPrice?: number,
  unitPriceForBuyer: number,
  unitPromoPriceForBuyer?: number | null
}