import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { StatusHistory } from "../interfaces/StatusHistory";
import { IPublicProfile } from "./IProfileResponse";

export interface TemporaryOrderDetailsResponseDto {
  orderUuid: string;
  orderItems: CartItemJson[];
  sellerPublicProfile: IPublicProfile;

  orderReceiveType: OrderReceiveTypes;

  status: OrderStatuses;
  paymentStatus: OrderPaymentStatuses;
  orderLocation?: {
    name: string,
    address: string
    country?: string | null,
    state?: string | null,
    contactFullName?: string | null,
    contactPhoneNumber?: string | null,
  };

  statusHistory: StatusHistory<OrderStatuses>[];
  paymentStatusHistory: StatusHistory<OrderPaymentStatuses>[];

  calculatedTotalCostMajor: number;
  deliveryCostMajor: number;
  currency: string;
  currencySymbol: string;
  createdAt: Date;
}
