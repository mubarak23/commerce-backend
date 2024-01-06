import { LocalGovernmentAreaPrice } from "../entity/Product";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { StatusHistory } from "../interfaces/StatusHistory";
import { IPublicProfile } from "./IProfileResponse";

export interface OrderDetailsResponseDto {
  id: number,
  orderUuid: string;
  orderItems: CartItemJson[];
  referenceNumber: string;
  sellerPublicProfile: IPublicProfile;
  buyerPublicProfile: IPublicProfile;

  orderReceiveType: OrderReceiveTypes;

  status: OrderStatuses;
  paymentStatus: OrderPaymentStatuses;
  paymentVariant: OrderPaymentVariant;
  orderLocation?: {
    name?: string,
    address?: string
    country?: string | null,
    state?: string | null,
    contactFullName?: string | null,
    contactPhoneNumber?: string | null,
  } | null;

  statusHistory: StatusHistory<OrderStatuses>[];
  paymentStatusHistory: StatusHistory<OrderPaymentStatuses>[];
  
  procurementInvoiceUuid: string | null;
  calculatedTotalCostMajor: number;
  deliveryCostMajor: number;
  currency: string;
  currencySymbol: string;
  createdAt: Date;
}
