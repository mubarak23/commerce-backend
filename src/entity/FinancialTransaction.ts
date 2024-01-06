import { Column, Entity, Index } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { IFinancialTransactionResponseDto } from "../dto/IFinancialTransactionResponseDto";
import { CurrencyToSymbol } from "../enums/Currency";
import { FinancialTransactionReferenceType, PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { FinancialTransactionColumns } from '../enums/TableColumns';
import Tables from "../enums/Tables";
import { getTransactionFlowType } from "../enums/TransactionFlowType";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import BaseEntity from "./BaseEntity";
import { DeliveryFeeWallet } from "./DeliveryWalletFee";
import { Wallet } from "./Wallet";


export interface FinancialTransactionMetadata {
  orderUuid?: string
  temporaryOrderUuid?: string
  productLeaseId?: number,
  wareHouseTositeUuid?: string,
  projectSubscriptionUuid?: string,
}


@Entity({ name: Tables.FINANCIAL_TRANSACTIONS })
@Index(['uuid'], { unique: true })
@Index(['reference'])
@Index(['userId'])
export class FinancialTransaction extends BaseEntity {

  @Column({length: 255, name: FinancialTransactionColumns.UUID, nullable: false })
  uuid: string;

  @Column({type: 'bigint', name: FinancialTransactionColumns.USER_ID, nullable: true, transformer: new ColumnNumericTransformer() }) // nullable true because of tradegrid revenue wallet
  userId: number;

  @Column({type: 'bigint', name: FinancialTransactionColumns.WALLET_ID, nullable: false })
  walletId: number;

  @Column({length: 255, name: FinancialTransactionColumns.REFERENCE, nullable: true })
  reference?: string;

  @Column({name: FinancialTransactionColumns.REFERENCE_TYPE, nullable: true })
  referenceType: FinancialTransactionReferenceType;

  @Column({name: FinancialTransactionColumns.TRANSACTION_TYPE, nullable: false })
  transactionType: PaymentTransactionTypes;

  @Column({type: 'decimal', name: FinancialTransactionColumns.AMOUNT_MINOR, nullable: false, transformer: new ColumnNumericTransformer() })
  amountMinor: number;

  @Column({name: FinancialTransactionColumns.PAID_STATUS, nullable: false })
  paidStatus: PaymentTransactionStatus;

  @Column({type: 'decimal', name: FinancialTransactionColumns.WALLET_BALANCE_MINOR_BEFORE, nullable: true, transformer: new ColumnNumericTransformer() })
  walletBalanceMinorBefore: number;

  @Column({type: 'decimal', name: FinancialTransactionColumns.WALLET_BALANCE_MINOR_AFTER, nullable: true, transformer: new ColumnNumericTransformer() })
  walletBalanceMinorAfter?: number;

  @Column({name: FinancialTransactionColumns.PAID_AT, nullable: true })
  paidAt: Date;

  @Column({type: 'jsonb', name: FinancialTransactionColumns.METADATA, nullable: true })
  metadata?: FinancialTransactionMetadata;

  @Column({name: FinancialTransactionColumns.CURRENCY, nullable: false })
  currency: string;

  @Column({name: FinancialTransactionColumns.DESCRIPTION, nullable: true, default: '' })
  description: string;


  initialize(wallet: Wallet, paymentTransactionType: PaymentTransactionTypes, 
      amountMinor: number, walletBalanceMinorBefore: number, walletBalanceMinorAfter: number | undefined, currency: string,
      paidStatus: PaymentTransactionStatus,
      reference?: string, metadata?: FinancialTransactionMetadata) {
    this.uuid = uuidv4()
    this.userId = wallet.userId
    this.walletId = wallet.id

    this.reference = reference
    if (reference) {
      this.referenceType = FinancialTransactionReferenceType.PAYSTACK      
    }

    this.transactionType = paymentTransactionType
    this.paidStatus = paidStatus

    this.amountMinor = amountMinor
    this.walletBalanceMinorBefore = walletBalanceMinorBefore
    this.walletBalanceMinorAfter = walletBalanceMinorAfter
    this.currency = currency
    this.metadata = metadata

    this.createdAt = utcNow()

    return this
  }

  initializeDeliveryFeeTransaction(wallet: DeliveryFeeWallet, paymentTransactionType: PaymentTransactionTypes, 
    amountMinor: number, walletBalanceMinorBefore: number, walletBalanceMinorAfter: number | undefined, currency: string,
    paidStatus: PaymentTransactionStatus,
    reference?: string, metadata?: FinancialTransactionMetadata) {
  this.uuid = uuidv4()
  this.userId = wallet.userId
  this.walletId = wallet.id

  this.reference = reference
  if (reference) {
    this.referenceType = FinancialTransactionReferenceType.PAYSTACK      
  }

  this.transactionType = paymentTransactionType
  this.paidStatus = paidStatus

  this.amountMinor = amountMinor
  this.walletBalanceMinorBefore = walletBalanceMinorBefore
  this.walletBalanceMinorAfter = walletBalanceMinorAfter
  this.currency = currency
  this.metadata = metadata

  this.createdAt = utcNow()

  return this
}

  initializeForTemporaryOrder(paymentTransactionType: PaymentTransactionTypes, 
    amountMinor: number, currency: string,
    paidStatus: PaymentTransactionStatus,
    reference?: string, metadata?: FinancialTransactionMetadata) {
  this.uuid = uuidv4()
  this.userId = 0
  this.walletId = -1
  
  this.reference = reference
  if (reference) {
    this.referenceType = FinancialTransactionReferenceType.PAYSTACK      
  }

  this.transactionType = paymentTransactionType
  this.paidStatus = paidStatus

  this.amountMinor = amountMinor
  this.walletBalanceMinorBefore = 0
  this.walletBalanceMinorAfter = undefined
  this.currency = currency
  this.metadata = metadata

  this.createdAt = utcNow()

  return this
}

  toResponseDto(): IFinancialTransactionResponseDto {
    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[this.currency]

    return {
      uuid: this.uuid,
      type: this.transactionType,
      paidStatus: this.paidStatus,
      amountMajor: this.amountMinor / 100,
      currency: this.currency,
      currencySymbol,
      walletBalanceMajorBefore: this.walletBalanceMinorBefore / 100,
      walletBalanceMajorAfter: (this.walletBalanceMinorAfter ?? 0) / 100,
      metadata: this.metadata ?? {},
      description: this.description,
      flowType: getTransactionFlowType(this.transactionType),
      createdAt: this.createdAt,
    }
  }
}
