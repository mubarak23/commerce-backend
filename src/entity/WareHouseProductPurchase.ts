// WareHouseProductPurchase
import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import TableColumns, { WareHouseProductPurchaseColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { User } from './User';
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { Product } from "./Product";
import { WareHouse } from "./WareHouse";

@Entity({ name: Tables.WARE_HOUSE_PRODUCT_PURCHASES })
@Index(["uuid", "productId"])
export class WareHouseProductPurchase extends DefualtEntity {
  @Column({ name: WareHouseProductPurchaseColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WareHouseProductPurchaseColumns.USER_ID })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: WareHouseProductPurchaseColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({ name: WareHouseProductPurchaseColumns.WARE_HOUSE_ID })
  wareHouseId: number;

  @ManyToOne(() => WareHouse, { primary: true })
  @JoinColumn({
    name: WareHouseProductPurchaseColumns.WARE_HOUSE_ID,
    referencedColumnName: TableColumns.ID,
  })
  wareHouse: WareHouse;


  @Column({ name: WareHouseProductPurchaseColumns.PRODUCT_ID })
  productId: number;

  @ManyToOne(() => Product, { primary: true })
  @JoinColumn({
    name: WareHouseProductPurchaseColumns.PRODUCT_ID,
    referencedColumnName: TableColumns.ID,
  })
  product: Product;

  @Column({ name: WareHouseProductPurchaseColumns.INFLOW_QUANTITY })
  inFlowQuantity: number;

  @Column({ name: WareHouseProductPurchaseColumns.OUTFLOW_QUANTITY })
  outFlowQuantity: number;

  @Column({ name: WareHouseProductPurchaseColumns.AVAILABLE_QUANTITY })
  availableQuantity: number;


  initialize(userId: number, wareHouseId: number, productId: number, inFlowQuantity: number) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.wareHouseId = wareHouseId;
    this.productId = productId;
    this.inFlowQuantity = inFlowQuantity;
    this.outFlowQuantity = 0;
    this.availableQuantity = inFlowQuantity;
    this.createdAt = utcNow();
    return this;
  }
}