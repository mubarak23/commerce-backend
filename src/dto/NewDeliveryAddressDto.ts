  export interface NewDeliveryAddressRequestDto {
    address: string;
    country: string;
    state: string;
    city?: string | null;
    contactFullName: string;
    contactPhoneNumber: string;
    orderUuid: string;
  }
  