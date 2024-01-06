import { InvoiceStatuses } from "../enums/Statuses";
import { InvoiceItemJson } from "../interfaces/InvoiceItemJson";
import { StatusHistory } from "../interfaces/StatusHistory";

export interface ProcurementInvoiceResponseDto {
  uuid: string;
  accountId: number;
  referenceNumber: string,
  calculatedTotalCostMajor: number,
  invoiceItem: InvoiceItemJson[]
  status: InvoiceStatuses,
  statusHistory: StatusHistory<InvoiceStatuses>[],
  orderCreated: boolean,
  orderCreatedAt: Date
  createdAt: Date
}

export interface ProcurementInvoiceResponseDtoForAdmin extends ProcurementInvoiceResponseDto {
  id: number,
}
