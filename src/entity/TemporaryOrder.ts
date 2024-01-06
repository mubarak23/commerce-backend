import { Entity, Column, JoinColumn, ManyToOne, Index } from "typeorm";
import DefualtEntity from "./BaseEntity";
import TableColumns, { TemporaryOrderColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import * as Utils from "../utils/core";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./User";
import { ColumnNumericTransformer } from "../utils/transformers";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import { StatusHistory } from "../interfaces/StatusHistory";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { CartItemJson } from "../interfaces/CartItemJson";
import { PickupLocation } from "./PickupLocation";
import { TemporaryOrderDetailsResponseDto } from "../dto/TemporaryOrderDetailsResponseDto";
import { IPublicProfile } from "../dto/IProfileResponse";
import { Product } from "./Product";
import { CurrencyToSymbol } from "../enums/Currency";
import {  BuyerDetails } from "../dto/TemporaryOrderCreateWithSellerGroupingRequestDto";


export interface DeliveryDetails {
  address: string;
  country: string;
  state: string;
  contactFullName?: string | null;
  contactPhoneNumber?: string | null;
}

@Entity({ name: Tables.TEMPORARY_ORDERS })
@Index(["uuid"])
@Index(["sellerUserId"])
@Index(["sellerUserId", "status"])
export class TemporaryOrder extends DefualtEntity {
  @Column({ name: TemporaryOrderColumns.UUID, unique: true })
  uuid: string;

  @Column({ type: "jsonb", name: TemporaryOrderColumns.BUYER_DETAILS, nullable: false })
  buyerUser: {
    fullName: string;
    emailAddress: string;
    msisdn: string;
  };

  @Column({ name: TemporaryOrderColumns.SELLER_USER_ID })
  sellerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: TemporaryOrderColumns.SELLER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  sellerUser: User;

  @Column({ type: "jsonb", name: TemporaryOrderColumns.ORDER_ITEMS })
  orderItems: CartItemJson[];

  @Column({ name: TemporaryOrderColumns.ORDER_RECEIVE_TYPE, nullable: true })
  orderReceiveType: OrderReceiveTypes;

  @Column({ name: TemporaryOrderColumns.STATUS, nullable: false })
  status: OrderStatuses;

  @Column({ name: TemporaryOrderColumns.PAYMENT_STATUS, nullable: false })
  paymentStatus: OrderPaymentStatuses;

  @Column({
    type: "jsonb",
    name: TemporaryOrderColumns.STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  statusHistory: StatusHistory<OrderStatuses>[];

  @Column({
    type: "jsonb",
    name: TemporaryOrderColumns.PAYMENT_STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  paymentStatusHistory: StatusHistory<OrderPaymentStatuses>[];

  @Column({ length: 10, name: TemporaryOrderColumns.CURRENCY, nullable: true })
  currency: string;

  @Column({ name: TemporaryOrderColumns.BUYER_PAYMENT_TRANSACTION_UUID, nullable: true })
  paymentTransactionUuid: string;

  @Column({
    type: "decimal",
    name: TemporaryOrderColumns.CALCULATED_TOTAL_COST_MAJOR,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajor: number;

  @Column({
    type: "decimal",
    name: TemporaryOrderColumns.DELIVERY_COST_MAJOR,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  deliveryCostMajor: number;

  @Column({ type: "jsonb", name: TemporaryOrderColumns.DELIVERY_DETAILS, nullable: true })
  deliveryDetails?: DeliveryDetails;

  @Column({ name: TemporaryOrderColumns.PICKUP_LOCATION_ID, nullable: true })
  pickupLocationId?: number;

  @ManyToOne(() => PickupLocation, { primary: true })
  @JoinColumn({
    name: TemporaryOrderColumns.PICKUP_LOCATION_ID,
    referencedColumnName: TableColumns.ID,
  })
  pickupLocation: PickupLocation;

  
  initialize(
    sellerUser: User,
    orderItems: CartItemJson[],
    orderReceiveType: OrderReceiveTypes,
    buyerUser:BuyerDetails,
    currency: string,
    deliveryDetails?: DeliveryDetails,
    pickupLocationId?: number,
  ) {
    this.uuid = uuidv4();

    this.sellerUserId = sellerUser.id;
    this.orderItems = orderItems;
    this.orderReceiveType = orderReceiveType;
    this.buyerUser = buyerUser;
    let orderAmountMajor = 0;
    let totalDeliveryCostMajor = 0;

    for (const item of orderItems) {
      if (item.quoteRequest) {
        orderAmountMajor += item.quoteRequest.calculatedTotalCostMajor || 0;
        totalDeliveryCostMajor += (item.quoteRequest.deliveryFee || 0)
      } else if(item.unitPromoPriceForBuyer){
          orderAmountMajor += item.unitPromoPriceForBuyer * item.quantity;
        } else {
          orderAmountMajor += item.unitPriceForBuyer * item.quantity;

          if(orderReceiveType === OrderReceiveTypes.DELIVERY) {
            if(item.deliveryAddressState) {
              const deliveryFees = item.productCategorySettings?.deliveryFees || []

              const foundStateDeliveryFee = deliveryFees.find(state => state.state === item.deliveryAddressState)
              if(foundStateDeliveryFee) {
                const deliveryFee = (foundStateDeliveryFee.deliveryFeeMajor || 0)
                totalDeliveryCostMajor += deliveryFee
              }
            }
          }
        }
    }
    this.calculatedTotalCostMajor = Utils.normalizeMoney(orderAmountMajor);
    this.deliveryCostMajor = Utils.normalizeMoney(totalDeliveryCostMajor)

    this.currency = currency;

    this.status = OrderStatuses.CREATED;
    this.paymentStatus = OrderPaymentStatuses.BUYER_PAYMENT_PENDING;

    const now = Utils.utcNow();
    this.statusHistory = [
      { status: this.status, dateTimeInISO8601: now.toISOString() },
    ];
    this.paymentStatusHistory = [
      { status: this.paymentStatus, dateTimeInISO8601: now.toISOString() },
    ];

    this.deliveryDetails = deliveryDetails;
    this.pickupLocationId = pickupLocationId;

    this.createdAt = Utils.utcNow();
    return this;
  }

  toResponseDto(products: Product[], 
    sellerPublicProfile: IPublicProfile,
    pickupLocation?: PickupLocation): TemporaryOrderDetailsResponseDto {

    const orderItems: CartItemJson[] = []

    for(const oItem of this.orderItems) {
      const oItemProduct = products.find(prod => prod.id === oItem.productId)
      orderItems.push({
        ...oItem,        
        productName: oItemProduct!.name,
        images: oItemProduct!.images ?? []
      })
    }

    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    const currencySymbol = CurrencyEnum[this.currency] || '₦'

    const orderLocation = this.orderReceiveType === OrderReceiveTypes.DELIVERY ? 
      {
        name: this.deliveryDetails!.address,
        address: this.deliveryDetails!.address,
        country: this.deliveryDetails!.country,
        state: this.deliveryDetails!.state,
        contactFullName: this.deliveryDetails!.contactFullName,
        contactPhoneNumber: this.deliveryDetails!.contactPhoneNumber,
      } : 
      {
        name: pickupLocation!.address,
        address: pickupLocation!.address,
        country: pickupLocation!.country,
        state: pickupLocation!.state,
        contactFullName: pickupLocation!.contactFullName,
        contactPhoneNumber: pickupLocation!.contactPhoneNumber,
      }

    return {
      orderUuid: this.uuid,
      orderItems,
      sellerPublicProfile,
      orderReceiveType: this.orderReceiveType,
      orderLocation,

      status: this.status,
      paymentStatus: this.paymentStatus,
      statusHistory: this.statusHistory,
      paymentStatusHistory: this.paymentStatusHistory,

      calculatedTotalCostMajor: this.calculatedTotalCostMajor,
      deliveryCostMajor: this.deliveryCostMajor,
      currency: this.currency,
      currencySymbol,

      createdAt: this.createdAt,
    }
  }
}
