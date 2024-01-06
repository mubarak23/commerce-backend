export interface NewProductRequestDto {
  name: string;
  description: string;

  categoryUuid: string;
  brandUuid: string;

  price?: number; // optional because of quote requests on products without a price
  locationState: string;

  tags?: any | null;
  minQty: number;
  maxQty: number;

  newPickupAddress?: {
    name?: string | null;
    address: string;
    country: string;
    state: string;
    contactFullName: string | null;
    contactPhoneNumber: string | null;
  };

  pickupAddressUuid?: string | null;
}

export interface NewProductRequestDtoByAdmin {
  userId: number,
  name: string;
  description: string;

  categoryId: string;
  brandId: string;

  price?: number; // optional because of quote requests on products without a price
  locationState: string;

  tags?: any | null;
  minQty: number;
  maxQty: number;
}
