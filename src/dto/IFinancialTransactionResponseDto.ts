import { FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { PaymentTransactionTypes } from "../enums/PaymentTransaction";
import TransactionFlowType from "../enums/TransactionFlowType";


export interface IFinancialTransactionResponseDto {
  uuid: string;

  type: PaymentTransactionTypes;

  amountMajor: number;

  currency: string;
  currencySymbol: string;

  walletBalanceMajorBefore: number;
  walletBalanceMajorAfter: number;

  metadata: FinancialTransactionMetadata;

  paidStatus: any;

  description: string;

  flowType: TransactionFlowType;

  createdAt: Date;
}
