import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";

export interface QuoteRequestCreateRequestDto {
  productUuid: string;
  quantity: number;
  notes?: string | null;
  orderReceiveType: OrderReceiveTypes;
  deliverAddressUuid?: string | null;
  wareHouseUuid?: string | null;
  sellerPickupLocationUuid?: string | null;
}
