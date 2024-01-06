import { Order } from "../entity/Order";
import OrderStatuses from "../enums/Statuses";


export interface ProductPurchaseOrderHistoryDto {
  uuid: string;
  order: Order;
  orderReference: string,
  quantity: number,
  status: OrderStatuses,
  calculatedTotalOrderAmountMajor: number,
  productName: string;
  createdAt: Date
}