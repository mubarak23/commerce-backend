import { IProcurementInvoicetem } from "../interfaces/IProcurementInvoicetem";

export interface CreateOrderFromInvoiceRequestDto {
  invoiceItems: IProcurementInvoicetem[],
  wareHouseUuid: string
}
