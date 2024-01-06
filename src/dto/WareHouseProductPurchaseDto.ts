import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { WareHouse } from "../entity/WareHouse";

export interface WareHouseProductPurchaseDto {
  uuid: string;
  warehouse: WareHouse;
  user: User;
  product: Product;
  inFlowQuantity: number;
  outFlowQuantity: number;
  availableQuantity: number;
  createdAt: Date
}