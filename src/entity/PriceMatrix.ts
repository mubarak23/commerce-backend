import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { PriceMatrixTransactionType } from "../enums/PriceMatrixTransactionType";
import { PriceMatriceStatuses } from "../enums/Statuses";
import TableColumns, { PriceMatrixColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { StatusHistory } from "../interfaces/StatusHistory";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { Order } from "./Order";
import { Product } from "./Product";
import { QuoteRequest } from "./QuoteRequest";
import { User } from "./User";

@Entity({ name: Tables.PRICE_MATRICES })
// @Index(["name"], { unique: true })
// @Index(["isAvailable"])
export class PriceMatrix extends DefualtEntity {
  @Column({ name: PriceMatrixColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: PriceMatrixColumns.ORDER_ID, nullable: true })
  orderId: number;

  @ManyToOne(() => Order, { primary: true })
  @JoinColumn({
    name: PriceMatrixColumns.ORDER_ID,
    referencedColumnName: TableColumns.ID,
  })
  order: Order;

  @Column({ name: PriceMatrixColumns.ORDER_REF, nullable: true })
  orderRef: string;

  @Column({ name: PriceMatrixColumns.QUOTE_REQUEST_REF })
  qouteRequestRef: string;

  @Column({ name: PriceMatrixColumns.QUOTE_REQUEST_ID })
  qouteRequestId: number;

  @ManyToOne(() => QuoteRequest, { primary: true })
  @JoinColumn({
    name: PriceMatrixColumns.QUOTE_REQUEST_ID,
    referencedColumnName: TableColumns.ID,
  })
  quoteRequest: QuoteRequest;

  @Column({ name: PriceMatrixColumns.BUYER_USER_ID })
  buyerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: PriceMatrixColumns.BUYER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  buyerUser: User;

  @Column({ name: PriceMatrixColumns.SELLER_USER_ID, nullable: true })
  sellerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: PriceMatrixColumns.SELLER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  sellerUser: User;

  @Column({ name: PriceMatrixColumns.PRODUCT_ID })
  productId: number;

  @ManyToOne(() => Product, { primary: true })
  @JoinColumn({
    name: PriceMatrixColumns.PRODUCT_ID,
    referencedColumnName: TableColumns.ID,
  })
  product: Product;

  @Column({ name: PriceMatrixColumns.QUANTITY, nullable: false })
  quantity: number;

  @Column({ length: 255, name: PriceMatrixColumns.TRANSACTION_TYPE, nullable: true })
  transactionType: PriceMatrixTransactionType;

  @Column({ name: PriceMatrixColumns.DELIVERY_DATE, nullable: true })
  deliveryDate: Date;

  @Column({ length: 255, name: PriceMatrixColumns.DELIVERY_ADDRESS, nullable: true })
  deliveryAddress: string;

  @Column({
    type: "decimal",
    name: PriceMatrixColumns.PRODUCT_SELLING_PRICE,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  productSellingPriceMajor: number;

 @Column({
  type: "decimal",
  name: PriceMatrixColumns.PRODUCT_COST_PRICE,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
productCostPriceMajor: number;

@Column({
  type: "decimal",
  name: PriceMatrixColumns.TOTAL_PRODUCT_SELLING_PRICE,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
totalProductSellingPriceMajor: number;

@Column({
  type: "decimal",
  name: PriceMatrixColumns.TOTAL_PRODUCT_COST_PRICE,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
totalProductCostPriceMajor: number;

@Column({
  type: "decimal",
  name: PriceMatrixColumns.PRODUCT_MARGIN,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
productMarginMajor: number;

@Column({
  type: "decimal",
  name: PriceMatrixColumns.TOTAL_MARGIN,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
totlaMarginMajor: number;

@Column({
  type: "decimal",
  name: PriceMatrixColumns.DELIVERY_FEE_MAJOR,
  default: 0,
  nullable: true,
  transformer: new ColumnNumericTransformer(),
})
deliveryFee: number;

@Column({ name: PriceMatrixColumns.STATUS, nullable: true })
status: PriceMatriceStatuses;

@Column({
  type: "jsonb",
  name: PriceMatrixColumns.STATUS_HISTORY,
  array: false,
  default: () => "'[]'",
  nullable: true,
})
statusHistory: StatusHistory<PriceMatriceStatuses>[];



  initialize(
    buyerUser: User,
    quoteRequest: QuoteRequest,
    product: Product,
    quantity: number,
  ) {
    this.uuid = uuidv4();
    this.qouteRequestRef = quoteRequest.referenceNumber;
    this.qouteRequestId = quoteRequest.id;
    this.buyerUserId = buyerUser.id;
    this.productId = product.id;
    this.quantity = quantity;
    this.createdAt = utcNow();
    return this;
  }
}
