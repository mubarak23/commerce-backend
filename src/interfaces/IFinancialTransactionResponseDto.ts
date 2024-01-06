import { FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { PaymentTransactionTypes } from "../enums/PaymentTransaction";
import TransactionFlowType from "../enums/TransactionFlowType";
import { IPublicProfile } from "../dto/IProfileResponse";


export interface IFinancialTransactionResponseDto {
  uuid: string;

  type: PaymentTransactionTypes;

  amountMajor: number;

  currency: string;

  walletBalanceMajorBefore: number;
  
  walletBalanceMajorAfter: number;

  metadata: FinancialTransactionMetadata;

  paidStatus: any;

  description: string;

  flowType: TransactionFlowType;

  createdAt: Date;
}

export interface IFinancialTransactionForAdmin extends IFinancialTransactionResponseDto {
  id: string;
  userId: number,
  publicProfile: IPublicProfile,
}