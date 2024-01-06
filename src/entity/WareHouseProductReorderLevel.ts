import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import TableColumns, { WareHouseProductReorderLevelColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { Product } from "./Product";
import { User } from "./User";
import { WareHouse } from "./WareHouse";

@Entity({ name: Tables.WARE_HOUSE_PRODUCT_REORDER_LEVEL })
@Index(["uuid"])
export class WareHouseProductReorderLevel extends DefualtEntity {
  @Column({ name: WareHouseProductReorderLevelColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WareHouseProductReorderLevelColumns.USER_ID })
  userId: number;  

  @Column({ name: WareHouseProductReorderLevelColumns.WARE_HOUSE_ID })
  wareHouseId: number;

  @Column({ name: WareHouseProductReorderLevelColumns.PRODUCT_ID })
  productId: number;

  @Column({ name: WareHouseProductReorderLevelColumns.LEVEL })
  level: number;

  @Column({
    type: "boolean",
    name: WareHouseProductReorderLevelColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initialize(userId: number, wareHouseId: number, productId: number, level: number ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.wareHouseId = wareHouseId;
    this.productId = productId;
    this.level = level;
    this.createdAt = utcNow();
    return this;
  }
}