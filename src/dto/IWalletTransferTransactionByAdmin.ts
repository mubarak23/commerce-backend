// IWalletTransferTransactionByAdmin
export interface IWalletTransferTransactionByAdmin {
  senderUserId: number;
  receiverUserId: number;
  amountMajor: number;
  description: string;
}
