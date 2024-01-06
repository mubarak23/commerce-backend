export interface DeliveryLocationRequestDto {
    contactFullName: string;
    contactPhoneNumber: string;
    address: string;
    country?: string | null;
    state: string;
}