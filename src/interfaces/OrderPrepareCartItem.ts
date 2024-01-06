import { IPublicProfile } from '../dto/IProfileResponse';
import { CartItem } from '../dto/CartDetailsResponseDto';
import { PickupLocation } from '../entity/PickupLocation';
import { OmitFields } from './OmitFields';

export interface OrderPrepareCartItem {
  sellerProfile: IPublicProfile,
  cartItems: CartItem[],
  sellerPickupLocations: Omit<PickupLocation, OmitFields>[],
}
