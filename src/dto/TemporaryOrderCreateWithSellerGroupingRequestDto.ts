import { OrderSellerGroup } from "./OrderSellerGroup";
import { DeliveryDetails } from '../interfaces/DeliveryDetails';

export interface TemporaryOrderCreateWithSellerGroupingRequestDto {
  sellers: OrderSellerGroup[],

  buyer: {
    fullName: string;
    emailAddress: string;
    msisdn: string;
  },

  newDeliveryAddress?: DeliveryDetails | null;
}

export interface BuyerDetails {
    fullName: string;
    emailAddress: string;
    msisdn: string;
}