export interface NewSellerOmaRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress?: string | null;
  isOMA?: boolean | null;
}
