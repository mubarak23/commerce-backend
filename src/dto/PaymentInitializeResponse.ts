export interface PaymentInitializeResponse {
  paymentProviderRedirectUrl: string
  paymentReference: string,
  accessCode: string
  redirectUrlAfterPayment: string
}
