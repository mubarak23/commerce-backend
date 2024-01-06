
export interface NewBankAccountRequestDto {
  accountNumber: string,
  bankCode: string,
}

export interface SaveNewBankAccount {
  accountNumber: string,
  bankCode: string,
  bankName: string,
}
