import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { QuoteRequestCreateRequestDto } from "../dto/QuoteRequestCreateRequestDto";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { QuoteRequestStatuses } from "../enums/Statuses";
import TableColumns, { QuoteRequestColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { QuoteRequestSellerResponse } from "../interfaces/QuoteRequestSellerResponse";
import { StatusHistory } from "../interfaces/StatusHistory";
import * as Utils from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { Product } from "./Product";
import { User } from "./User";

@Entity({ name: Tables.QUOTE_REQUESTS })
@Index(["userId"])
@Index(["sellerUserId"])
export class QuoteRequest extends DefualtEntity {
  @Column({ name: QuoteRequestColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: QuoteRequestColumns.REFERENCE_NUMBER, nullable: true })
  referenceNumber: string;

  @Column({ type: "bigint", name: QuoteRequestColumns.USER_ID })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: QuoteRequestColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({ name: QuoteRequestColumns.USER_UUID })
  userUuid: string;

  @Column({ name: QuoteRequestColumns.SELLER_USER_UUID })
  sellerUserUuid: string;

  @Column({ type: "bigint", name: QuoteRequestColumns.SELLER_USER_ID })
  sellerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: QuoteRequestColumns.SELLER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  sellerUser: User;

  @Column({ name: QuoteRequestColumns.PRODUCT_ID })
  productId: number;

  @ManyToOne(() => Product, { primary: true })
  @JoinColumn({
    name: QuoteRequestColumns.PRODUCT_ID,
    referencedColumnName: TableColumns.ID,
  })
  product: Product;

  @Column({ name: QuoteRequestColumns.QUANTITY, nullable: true })
  quantity: number;

  @Column({ name: QuoteRequestColumns.NOTES, nullable: true })
  notes?: string;

  @Column({ name: QuoteRequestColumns.ORDER_RECEIVE_TYPE, nullable: true })
  orderReceiveType: OrderReceiveTypes;

  @Column({
    name: QuoteRequestColumns.DELIVERY_ADDRESS,
    nullable: true,
    default: "",
  })
  deliverAddress?: string;

  @Column({
    type: "boolean",
    name: QuoteRequestColumns.HAS_SELLER_RESPONSE,
    nullable: false,
    default: false,
  })
  hasSellerResponse: boolean;

  @Column({
    type: "jsonb",
    name: QuoteRequestColumns.SELLER_RESPONSE,
    nullable: true,
  })
  sellerResponse: QuoteRequestSellerResponse;

  @Column({
    type: "decimal",
    name: QuoteRequestColumns.CALCULATED_TOTAL_COST_MAJOR,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajor: number;

  @Column({
    type: "date",
    name: QuoteRequestColumns.SELLER_RESPONSE_SUBMITTED_AT,
    nullable: true,
  })
  sellerResponseSubmittedAt: Date;

  @Column({ name: QuoteRequestColumns.STATUS, nullable: false })
  status: QuoteRequestStatuses;

  @Column({
    name: QuoteRequestColumns.SELLER_PICKUP_LOCATION_UUID,
    nullable: true
  })
  sellerPickupLocationUuid?: string;

  @Column({
    name: QuoteRequestColumns.DELIVERY_ADDRESS_UUID,
    nullable: true
  })
  deliverAddressUuid?: string;

  @Column({
    name: QuoteRequestColumns.WAREHOUSE_UUID,
    nullable: true
  })
  wareHouseUuid?: string;


  @Column({
    type: "jsonb",
    name: QuoteRequestColumns.STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  statusHistory: StatusHistory<QuoteRequestStatuses>[];

  initialize(
    user: User,
    quoteRequest: QuoteRequestCreateRequestDto,
    product: Product
  ) {
    this.uuid = uuidv4();

    this.userId = user.id;
    this.userUuid = user.uuid;
    this.sellerUserId = product.user.id;
    this.sellerUserUuid = product.user.uuid;
    this.productId = product.id;
    this.quantity = quoteRequest.quantity;
    this.notes = quoteRequest.notes ?? undefined;
    this.deliverAddressUuid = quoteRequest.deliverAddressUuid ?? undefined;
    this.wareHouseUuid = quoteRequest.wareHouseUuid ?? undefined;
    this.sellerPickupLocationUuid = quoteRequest.sellerPickupLocationUuid ?? undefined;
    this.orderReceiveType = quoteRequest.orderReceiveType;
    this.status = QuoteRequestStatuses.PENDING;

    const now = Utils.utcNow();
    this.statusHistory = [
      { status: this.status, dateTimeInISO8601: now.toUTCString() },
    ];

    this.createdAt = now;
    return this;
  }
}
