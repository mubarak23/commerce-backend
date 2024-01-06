import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { ProcurementInvoiceResponseDto, ProcurementInvoiceResponseDtoForAdmin } from "./ProcurementInvoiceResponseDto";

export interface ProcurementDto {
  uuid: string;
  accountId: number;
  invoice?: ProcurementInvoiceResponseDto | null;
  upload: SimpleImageJson;
  isProcessed: boolean,
  createdAt: Date
}

export interface ProcurementDtoForAdmin extends ProcurementDto {
  id: number,
  invoice?: ProcurementInvoiceResponseDtoForAdmin | null
}