import { OrderReceiver } from '../entity/Order';
import { OrderSellerGroup } from './OrderSellerGroup';
import { DeliveryDetails } from '../interfaces/DeliveryDetails';

export interface OrderCreateWithSellerGroupingRequestDto {
  sellers: OrderSellerGroup[],

  differentOrderReceiver?: OrderReceiver | null,

  newDeliveryAddress?: DeliveryDetails | null;
  deliveryAddressUuid?: string | null;
  wareHouseUuid?: string | null;
}
