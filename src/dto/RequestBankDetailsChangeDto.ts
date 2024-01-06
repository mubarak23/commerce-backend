
export interface RequestBankDetailsChangeDto {
  uuid: string,
  userId: number,
  accountNumber: string,
  bankCode: string,
  bankAccountName: string,
  bankName: string,
  createdAt: Date
}

export interface RequestBankDetailsChangeDtoForAdmin extends RequestBankDetailsChangeDto {
  id: number,
}