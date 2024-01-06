    export interface NewPickupLocationRequestDto {
    address: string;
    country: string;
    state: string;
    city?: string | null;
    contactFullName: string;
    contactPhoneNumber: string;
    productUuid: string
  }
