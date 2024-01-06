import { PickupLocation } from "../entity/PickupLocation";
import { CategorySettingsData } from '../interfaces/CategorySettingsData';
import { OmitFields } from "../interfaces/OmitFields";
import { QuoteRequestSellerResponse } from "../interfaces/QuoteRequestSellerResponse";
import { IPublicProfile } from "./IProfileResponse";

export interface ProductsResponseDto {
  productUuid: string;
  productName: string;
  productDescription: string;
  sellerUserId?: number | null;
  sellerPublicProfile: IPublicProfile;
  oldSellerPublicProfile?: IPublicProfile | null;
  sellerPickupLocations?: Omit<PickupLocation, OmitFields>[];
  price?: number | null;
  unitPriceForBuyer: number;
  unitPromoPriceForBuyer?: number | null;
  minimumQuantity: number;
  maximumQuantity: number;
  unitOfMeasurement: string;

  currency: string;
  currencySymbol: string;
  locationState: string;
  totalRatingsValue: number;
  totalNumberOfRatings: number;
  isOnCart?: boolean;
  quoteRequest?: {
    uuid: string;
    quantity: number;
    sellerResponse: QuoteRequestSellerResponse;
  } | null;
  brand: {
    uuid: string;
    name: string;
  };
  category: {
    uuid: string;
    name: string;
    settings: CategorySettingsData,
  };
  images: {
    url: string,
    mimetype: string,
  }[];
  hasVariants: boolean,
  isVariant: boolean,
  tags?: any | null;
  variantsProducts?: ProductsResponseDto[] | boolean
  isActive?: boolean | null;
  createdAt: Date

  // pickupAddressDetails?: Omit<PickupLocation, OmitFields> | null;
}

export interface ProductsResponseDtoAdmin extends ProductsResponseDto {
  id: number
}