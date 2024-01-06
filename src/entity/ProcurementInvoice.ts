import { Column, Entity, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ProcurementInvoiceResponseDto } from "../dto/ProcurementInvoiceResponseDto";
import { InvoiceStatuses } from "../enums/Statuses";
import { ProcurementInvoiceColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { InvoiceItemJson } from "../interfaces/InvoiceItemJson";
import { StatusHistory } from "../interfaces/StatusHistory";
import * as Utils from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";



@Entity({ name: Tables.PROCUREMENT_INVOICES })
@Index(["uuid"])
@Index(["procurementId"])
export class ProcurementInvoice extends DefualtEntity {

  @Column({ name: ProcurementInvoiceColumns.UUID, unique: true })
  uuid: string;
  
  @Column({ type:'integer', name: ProcurementInvoiceColumns.ACCOUNT_ID })
  accountId: number;

  @Column({name: ProcurementInvoiceColumns.PROCUREMENT_ID })
  procurementId: number;

  @Column({length: 255, name: ProcurementInvoiceColumns.REFERENCE_NUMBER, nullable: true })
  referenceNumber: string;

  @Column({ type:'json', name: ProcurementInvoiceColumns.INVOICE_ITEMS })
  invoiceItem: InvoiceItemJson[];

  @Column({
    type: "decimal",
    name: ProcurementInvoiceColumns.CALCULATED_TOTAL_COST_MAJOR,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajor: number

  @Column({
    type: "decimal",
    name: ProcurementInvoiceColumns.CALCULATED_TOTAL_AMOUNT_PAID_MAJOR,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalAmountPaidMajor: number
  

  @Column({ name: ProcurementInvoiceColumns.STATUS, nullable: false })
  status: InvoiceStatuses;

  @Column({
    type: "jsonb",
    name: ProcurementInvoiceColumns.STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  statusHistory: StatusHistory<InvoiceStatuses>[];

  @Column({ type: 'boolean', name: ProcurementInvoiceColumns.ORDER_CREATED, default: false })
  orderCreated: boolean;

  @Column({ name: ProcurementInvoiceColumns.ORDER_CREATE_AT, nullable: true })
  orderCreatedAt: Date;

  @Column({
    type: "boolean",
    name: ProcurementInvoiceColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;


  initialize(acccountId: number, procurementId: number, invoiceItem: InvoiceItemJson[], calculatedTotalCostMajor: number) {
    const now = Utils.utcNow();
    this.uuid = uuidv4();
    this.accountId = acccountId;
    this.procurementId = procurementId;
    this.invoiceItem = invoiceItem;
    this.calculatedTotalCostMajor = calculatedTotalCostMajor;

    this.status = InvoiceStatuses.SET;
    this.statusHistory = [
      { status: this.status, dateTimeInISO8601: now.toISOString() },
    ];
    
    this.createdAt = Utils.utcNow();
    return this;
  }


  toResponseDto(): ProcurementInvoiceResponseDto {
    return {
      uuid: this.uuid,
      accountId: this.accountId,
      referenceNumber: this.referenceNumber,
      calculatedTotalCostMajor: this.calculatedTotalCostMajor,
      invoiceItem: this.invoiceItem,
      status: this.status,
      statusHistory: this.statusHistory,
      orderCreated: this.orderCreated,
      orderCreatedAt: this.orderCreatedAt,
      createdAt: this.createdAt
    }
  }
}
