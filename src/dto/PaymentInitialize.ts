import { PaymentInitializeVariant } from "../enums/PaymentInitializeVariant";

export interface PaymentInitialize {
  paymentVariant: PaymentInitializeVariant,

  amountMajor?: number | null
}
