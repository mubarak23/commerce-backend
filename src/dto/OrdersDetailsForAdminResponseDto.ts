import { OrderReceiver } from "../entity/Order";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import { StatusHistory } from "../interfaces/StatusHistory";
import { IPublicProfile } from "./IProfileResponse";

export interface OrdersDetailsForAdminResponseDto {
  id: number;
  uuid: string;
  referenceNumber: string,

  buyerPublicProfile: IPublicProfile,
  sellerPublicProfile: IPublicProfile,

  orderReceiveType: OrderReceiveTypes;

  status: OrderStatuses;
  paymentStatus: OrderPaymentStatuses;
  paymentVariant: OrderPaymentVariant;
  statusHistory: StatusHistory<OrderStatuses>[];
  paymentStatusHistory: StatusHistory<OrderPaymentStatuses>[];

  calculatedTotalCostMajor: number;
  deliveryCostMajor: number;
  receiver?: OrderReceiver | null;

  currency: string
}
