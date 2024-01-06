import { Entity, Column, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { WareHouseToSiteDeliveriesProductColumns } from "../enums/TableColumns";
import { DeliveryItemJson } from "../interfaces/DeliveryItemJson"
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { StatusHistory } from "../interfaces/StatusHistory";
import { WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";

@Entity({ name: Tables.WARE_HOUSE_TO_SITE_DELIVERY_REQUESTS })
@Index(["id"], { unique: true })
export class WareHouseToSiteDeliveryRequest extends DefualtEntity {
  @Column({ name: WareHouseToSiteDeliveriesProductColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.USER_ID })
  userId: number;

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.WARE_HOUSE_ID })
  wareHouseId: number;

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.DELIVERY_LOCATION_ID })
  deliveryLocationId: number;

  @Column({ type: "jsonb", name: WareHouseToSiteDeliveriesProductColumns.DELIVERY_ITEMS })
  deliveryItems: DeliveryItemJson[];

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.TOTAL_AMOUNT_MAJOR })
  totalAmountMajor: number;

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_AMOUNT_MAJOR, nullable: true })
  deliveryFeeAmountMajor: number;

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_STATUS, nullable: false })
  deliveryFeeStatus: WareHouseToSiteDeliveryFeeStatuses;

  @Column({
    type: "jsonb",
    name: WareHouseToSiteDeliveriesProductColumns.DELIVERY_FEE_STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  deliveryFeeStatusHistory: StatusHistory<WareHouseToSiteDeliveryFeeStatuses>[];

  @Column({ name: WareHouseToSiteDeliveriesProductColumns.PAYMENT_TRANSACTION_UUID, nullable: true })
  paymentTransactionUuid: string


  initialize(wareHouseId: number, userId: number, deliveryLocationId: number,
    deliveryItems: DeliveryItemJson[], totalAmountMajor: number ) {
    this.uuid = uuidv4();
    this.userId = userId;
    this.wareHouseId = wareHouseId;
    this.deliveryLocationId = deliveryLocationId;
    this.deliveryItems = deliveryItems;
    this.totalAmountMajor = totalAmountMajor;
    this.createdAt = utcNow();

    this.deliveryFeeStatus = WareHouseToSiteDeliveryFeeStatuses.REQUESTED;
    this.deliveryFeeStatusHistory = [
      { status: this.deliveryFeeStatus, dateTimeInISO8601: this.createdAt.toISOString() },
    ];
    return this;
  }
}