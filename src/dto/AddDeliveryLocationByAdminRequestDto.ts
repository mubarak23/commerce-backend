export interface AddDeliveryLocationByAdminRequestDto {
  userId: number;
  contactFullName: string;
  contactPhoneNumber: string;
  address: string;
  state: string;
}