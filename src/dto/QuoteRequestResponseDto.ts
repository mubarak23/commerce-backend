import { PickupLocation } from "../entity/PickupLocation";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { QuoteRequestStatuses } from "../enums/Statuses";
import { OmitFields } from "../interfaces/OmitFields";
import { QuoteRequestSellerResponse } from "../interfaces/QuoteRequestSellerResponse";
import { IPublicProfile } from "./IProfileResponse";

export interface QuoteRequestResponseDto {
  uuid: string,
  product: {
    uuid: string,
    name: string,
    description: string,
    unitOfMeasurement: string,
    pickupAddressDetails?: Omit<PickupLocation, OmitFields> | null
  },
  quantity: number,
  buyerUserPublicProfile: IPublicProfile,
  sellerUserPublicProfile: IPublicProfile,
  notes?: string | null,
  orderReceiveType: OrderReceiveTypes,
  deliveryAddress?: string | null,
  deliverAddressUuid?: string | null,
  sellerResponse?: QuoteRequestSellerResponse | null;
  calculatedTotalCostMajor?: number | null;
  status: QuoteRequestStatuses,
  dateCreatedIso8601: Date,
  sellerPickupLocation?: {
    name: string,
    address: string,
    uuid: string,
  }
}

export interface QuoteRequestResponseDtoAdmin extends QuoteRequestResponseDto{
  id: number,
  userId: number
  referenceNumber: string,
}