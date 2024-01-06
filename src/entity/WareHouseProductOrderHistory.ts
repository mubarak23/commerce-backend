import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { WareHouseProductOrderHistoryColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";

@Entity({ name: Tables.WARE_HOUSE_PRODUCT_ORDER_HISTORY })
@Index(["productPurchaseId", "productId", "createdAt"])
export class WareHouseProductOrderHistory extends DefualtEntity {
  @Column({ name: WareHouseProductOrderHistoryColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WareHouseProductOrderHistoryColumns.USER_ID })
  userId: number;

  @Column({ name: WareHouseProductOrderHistoryColumns.ORDER_ID })
  orderId: number;

  @Column({ name: WareHouseProductOrderHistoryColumns.PRODUCT_ID })
  productId: number;

  @Column({ name: WareHouseProductOrderHistoryColumns.PRODUCT_PURCHASE_ID })
  productPurchaseId: number;
  
  initialize(userId: number, productId: number, orderId: number, 
    productPurchaseId: number ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.productId = productId;
    this.orderId = orderId
    this.productPurchaseId = productPurchaseId;
    this.createdAt = utcNow();
    return this;
  }
}
