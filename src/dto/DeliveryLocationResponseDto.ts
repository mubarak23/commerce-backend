export interface DeliveryLocationResponseDto {
  id: number;
  userId: number;
  contactFullName: string;
  contactPhoneNumber: string;
  address: string;
  country?: string | null;
  state: string;
  createdAt?: Date | null;
}