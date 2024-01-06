export interface MailForDeliveryConfirmationDto {
  sellerId: number,
  priceMatrixId: number,
  amount: number,
  quoteRequestRef: string,
  orderRef: string,
  accountName: string,
  accountNumber: string,
  bankName: string,
}