import { OrderReceiver } from "../entity/Order";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";

export interface NewOrderCreateRequestDto {
  orderReceiveType: OrderReceiveTypes;
  newDeliveryAddress?: NewDeliveryAddress | null;
  deliveryAddressUuid?: string | null;
  locationUuid?: string | null;
  differentOrderReceiver?: OrderReceiver | null;
  wareHouseUuid? : string | null
}

export interface NewDeliveryAddress {
  address: string;
  country: string;
  state: string;
  contactFullName: string | null;
  contactPhoneNumber: string | null;
}
