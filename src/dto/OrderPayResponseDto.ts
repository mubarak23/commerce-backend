import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import { CreatedOrderData } from "../interfaces/CreatedOrderData";
import { PaymentInitializeResponse } from "./PaymentInitializeResponse";

export interface OrderPayResponseDto {
  orders: CreatedOrderData[],
  orderUuids: string[],
  paymentProviderDetails?: PaymentInitializeResponse,
  paymentTransactionStatus: PaymentTransactionStatus
}

export interface TemporaryOrderPayResponseDto {
  temporaryOrders: CreatedOrderData[],
  temporaryOrderUuids: string[],
  paymentProviderDetails?: PaymentInitializeResponse,
  paymentTransactionStatus: PaymentTransactionStatus
}
