import { PaymentTransactionTypes } from "./PaymentTransaction"

enum TransactionFlowType {
  IN = 'in',
  OUT = 'out',
}


export const getTransactionFlowType = (transactionType: PaymentTransactionTypes) => {
  if(transactionType === PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW 
    || transactionType === PaymentTransactionTypes.WALLET_FUNDS_WITHDRAWAL) {
    return TransactionFlowType.OUT
  } 
    return TransactionFlowType.IN
  
}

export default TransactionFlowType
