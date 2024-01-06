import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { IPublicProfile, IPublicProfileForAdmin } from "../dto/IProfileResponse";
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrdersDetailsForAdminResponseDto } from "../dto/OrdersDetailsForAdminResponseDto";
import { CurrencyToSymbol } from "../enums/Currency";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import OrderStatuses, { OrderPaymentStatuses } from "../enums/Statuses";
import TableColumns, { OrderColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { CartItemJson } from "../interfaces/CartItemJson";
import { StatusHistory } from "../interfaces/StatusHistory";
import * as Utils from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { DeliveryLocation } from "./DeliveryLocation";
import { PickupLocation } from "./PickupLocation";
import { PriceMatrix } from "./PriceMatrix";
import { Product } from "./Product";
import { User } from "./User";
import { WareHouse } from "./WareHouse";

export interface OrderReceiver {
  userUuid?: string | null,
  userId?: number | null,
  firstName?: string | null,
  lastName?: string | null,
  msisdn?: string | null,
}

export interface AdminOrderTotalOverride {
  newAmountMajor: number,
  reason: string,
}

@Entity({ name: Tables.ORDERS })
@Index(["uuid"])
@Index(["buyerUserId"])
@Index(["sellerUserId"])
@Index(["buyerUserId", "status"])
@Index(["sellerUserId", "status"])
@Index(["buyerUserId", "status", "paymentStatus"])
@Index(["buyerAccountId"])
@Index(["buyerAccountId", "procurementInvoiceUuid"])
export class Order extends DefualtEntity {
  @Column({ name: OrderColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: OrderColumns.REFERENCE_NUMBER, nullable: true })
  referenceNumber: string;

  @Column({ name: OrderColumns.BUYER_USER_ID })
  buyerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: OrderColumns.BUYER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  buyerUser: User;

  @Column({ name: OrderColumns.SELLER_USER_ID })
  sellerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: OrderColumns.SELLER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  sellerUser: User;

  @Column({ name: OrderColumns.BUYER_ACCOUNT_ID, nullable: true })
  buyerAccountId: number;

  @Column({ type: "jsonb", name: OrderColumns.ORDER_ITEMS })
  orderItems: CartItemJson[];

  @Column({ type: "int", name: OrderColumns.RATING_FROM_BUYER, nullable: true })
  ratingFromBuyer: number;

  @Column({
    type: "int",
    name: OrderColumns.RATING_FROM_SELLER,
    nullable: true,
  })
  ratingFromSeller: number;

  @Column({ name: OrderColumns.ORDER_RECEIVE_TYPE, nullable: true })
  orderReceiveType: OrderReceiveTypes;

  @Column({ name: OrderColumns.STATUS, nullable: false })
  status: OrderStatuses;

  @Column({ name: OrderColumns.PAYMENT_STATUS, nullable: false })
  paymentStatus: OrderPaymentStatuses;

  @Column({ name: OrderColumns.PAYMENT_VARIANT, nullable: true, default: OrderPaymentVariant.WALLET })
  paymentVariant: OrderPaymentVariant;

  @Column({
    type: "jsonb",
    name: OrderColumns.STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  statusHistory: StatusHistory<OrderStatuses>[];

  @Column({
    type: "jsonb",
    name: OrderColumns.PAYMENT_STATUS_HISTORY,
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  paymentStatusHistory: StatusHistory<OrderPaymentStatuses>[];

  @Column({ name: OrderColumns.REVIEW_TEXT, nullable: true })
  buyerReviewText: string;

  @Column({ name: OrderColumns.PROCUREMENT_INVOICE_UUID, nullable: true })
  procurementInvoiceUuid: string;
  

  @Column({
    type: "timestamptz",
    name: OrderColumns.REVIEW_SUBMITTED_AT,
    nullable: true,
  })
  buyerReviewSubmittedAt: Date;

  @Column({ name: OrderColumns.DISPUTE_TYPE, nullable: true })
  disputeType?: string;

  @Column({ name: OrderColumns.DISPUTE_TEXT, nullable: true })
  disputeText?: string;

  @Column({
    type: "timestamptz",
    name: OrderColumns.DISPUTE_SUBMITTED_AT,
    nullable: true,
  })
  disputeTextSubmittedAt?: Date;

  @Column({ length: 10, name: OrderColumns.CURRENCY, nullable: true })
  currency: string;

  @Column({
    type: "bigint",
    name: OrderColumns.PRODUCT_LEASE_ID,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  productLeaseId: number;

  @Column({ name: OrderColumns.BUYER_PAYMENT_TRANSACTION_UUID, nullable: true })
  paymentTransactionUuid: string;

  @Column({
    type: "decimal",
    name: OrderColumns.CINDER_BUILD_REVENUE_MAJOR,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  cinderbuildRevenueMajor: number;

  @Column({
    type: "decimal",
    name: OrderColumns.CALCULATED_TOTAL_COST_MAJOR,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajor: number;

  @Column({
    type: "decimal",
    name: OrderColumns.DELIVERY_COST_MAJOR,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  deliveryCostMajor: number;

  @Column({ name: OrderColumns.DELIVERY_LOCATION_ID, nullable: true })
  deliveryLocationId?: number;

  @ManyToOne(() => DeliveryLocation, { primary: true })
  @JoinColumn({
    name: OrderColumns.DELIVERY_LOCATION_ID,
    referencedColumnName: TableColumns.ID,
  })
  deliveryLocation: DeliveryLocation;

  @Column({ name: OrderColumns.PICKUP_LOCATION_ID, nullable: true })
  pickupLocationId?: number;

  @ManyToOne(() => PickupLocation, { primary: true })
  @JoinColumn({
    name: OrderColumns.PICKUP_LOCATION_ID,
    referencedColumnName: TableColumns.ID,
  })
  pickupLocation: PickupLocation;


  @Column({ name: OrderColumns.RECEIVER_USER_ID, nullable: true })
  receiverUserId?: number;

  @Column({type: 'jsonb', name: OrderColumns.RECEIVER, nullable: true })
  receiver?: OrderReceiver;

  @Column({ name: OrderColumns.TEMPORARY_ORDER_UUID, nullable: true })
  temporaryOrderUuid: string;

  @Column({
    type: "timestamptz",
    name: OrderColumns.MARKED_AS_PAYMENT_DEFAULT_AT,
    nullable: true,
  })
  markedAsPaymentDefaultAt?: Date;

  @Column({type: 'jsonb', name: OrderColumns.ADMIN_ORDER_TOTAL_OVERRIDE, nullable: true })
  adminOrderTotalOverride?: AdminOrderTotalOverride;

  @Column({ name: OrderColumns.WAREHOUSE_ID, nullable: true })
  warehouseId?: number;

  @Column({ name: OrderColumns.PRICE_MATRIX_ID, nullable: true })
  priceMatrixId?: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: OrderColumns.PRICE_MATRIX_ID,
    referencedColumnName: TableColumns.ID,
  })
  priceMatrix: PriceMatrix;

  @Column({ name: OrderColumns.SELLER_HAS_CHANGE, nullable: true, default: false, })
  sellerHasChange?: boolean;
  
  initialize(
    buyerUser: User,
    sellerUser: User,
    orderItems: CartItemJson[],
    orderReceiveType: OrderReceiveTypes,
    currency: string,
    paymentVariant: OrderPaymentVariant,
    orderReceiver?: OrderReceiver | null,
    deliveryLocationId?: number,
    pickupLocationId?: number,
    warehouseId?: number 
  ) {
    this.uuid = uuidv4();

    this.buyerUserId = buyerUser.id;
    this.buyerAccountId = buyerUser.accountId;
    this.sellerUserId = sellerUser.id;
    this.orderItems = orderItems;
    this.orderReceiveType = orderReceiveType;

    let orderAmountMajor = 0;
    let cinderbuildRevenueMajor = 0;
    let totalDeliveryCostMajor = 0;

    for (const item of orderItems) {
      if (item.quoteRequest) {
        orderAmountMajor += item.quoteRequest.calculatedTotalCostMajor || 0;
        totalDeliveryCostMajor += (item.quoteRequest.deliveryFee || 0)
        cinderbuildRevenueMajor +=
          (item.quoteRequest.unitPriceForBuyer - item.quoteRequest.unitPrice) *
          item.quantity;
      } else {
        if(item.unitPromoPriceForBuyer){
          orderAmountMajor += item.unitPromoPriceForBuyer * item.quantity;
          cinderbuildRevenueMajor +=
            (item.unitPromoPriceForBuyer - item.unitPrice) * item.quantity;
        } else{
        orderAmountMajor += item.unitPriceForBuyer * item.quantity;
        cinderbuildRevenueMajor +=
          (item.unitPriceForBuyer - item.unitPrice) * item.quantity;
        }

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

    this.cinderbuildRevenueMajor = Utils.normalizeMoney(
      cinderbuildRevenueMajor
    );
    this.currency = currency;

    this.status = OrderStatuses.CREATED;
    this.paymentStatus = OrderPaymentStatuses.BUYER_PAYMENT_PENDING;
    this.paymentVariant = paymentVariant;

    const now = Utils.utcNow();
    this.statusHistory = [
      { status: this.status, dateTimeInISO8601: now.toISOString() },
    ];
    this.paymentStatusHistory = [
      { status: this.paymentStatus, dateTimeInISO8601: now.toISOString() },
    ];

    this.deliveryLocationId = deliveryLocationId;
    this.pickupLocationId = pickupLocationId;
    this.warehouseId = warehouseId || undefined;
    if(orderReceiver) {
      if(orderReceiver.userId) {
        this.receiverUserId = orderReceiver.userId
      }
      this.receiver = orderReceiver
    }

    this.createdAt = Utils.utcNow();
    return this;
  }

  getSubTotal(): number {
    let subTotalMajor = 0

    for (const item of this.orderItems) {
      if (item.quoteRequest) {
        subTotalMajor = item.quoteRequest.calculatedTotalCostMajor - (this.deliveryCostMajor ?? 0);
        break;
      } else if(item.unitPromoPriceForBuyer) {
          subTotalMajor += item.unitPromoPriceForBuyer * item.quantity;
        } else {
          subTotalMajor += item.unitPriceForBuyer * item.quantity;
        }
    }
    return subTotalMajor
  }

  toResponseDto(products: Product[], 
    sellerPublicProfile: IPublicProfile, buyerPublicProfile: IPublicProfile,
    deliveryLocation?: DeliveryLocation, pickupLocation?: PickupLocation, wareHouseLocation?: WareHouse): OrderDetailsResponseDto {

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
    let orderLocation = null;
    let wareHouseDetails = null;
    if(this.orderReceiveType === OrderReceiveTypes.DELIVERY){
      orderLocation = {
        name: deliveryLocation!.address,
        address: deliveryLocation!.address,
        country: deliveryLocation!.country,
        state: deliveryLocation!.state,
        contactFullName: deliveryLocation!.contactFullName,
        contactPhoneNumber: deliveryLocation!.contactPhoneNumber,
      }
    }
    else if(this.orderReceiveType === OrderReceiveTypes.PICKUP){
        orderLocation = {
          name: pickupLocation!.address,
          address: pickupLocation!.address,
          country: pickupLocation!.country,
          state: pickupLocation!.state,
          contactFullName: pickupLocation!.contactFullName,
          contactPhoneNumber: pickupLocation!.contactPhoneNumber,
        }
    } else if(this.orderReceiveType === OrderReceiveTypes.WARE_HOUSE){
      wareHouseDetails = {
        name: wareHouseLocation?.name,
        state: wareHouseLocation!.state,
        contactFullName: wareHouseLocation!.contactFullName,
        contactPhoneNumber: wareHouseLocation!.contactPhoneNumber,
      } 
    }   

    return {
      id: this.id,
      orderUuid: this.uuid,
      orderItems,
      referenceNumber: this.referenceNumber,
      sellerPublicProfile,
      buyerPublicProfile,
      orderReceiveType: this.orderReceiveType,
      orderLocation : orderLocation || wareHouseDetails,

      status: this.status,
      paymentStatus: this.paymentStatus,
      paymentVariant: this.paymentVariant,
      statusHistory: this.statusHistory,
      paymentStatusHistory: this.paymentStatusHistory,
      procurementInvoiceUuid: this.procurementInvoiceUuid,
      calculatedTotalCostMajor: this.calculatedTotalCostMajor,
      deliveryCostMajor: this.deliveryCostMajor,
      currency: this.currency,
      currencySymbol,

      createdAt: this.createdAt,
    }
  }

  transformForAdmin(buyerPublicProfile: IPublicProfileForAdmin, sellerPublicProfile: IPublicProfileForAdmin): OrdersDetailsForAdminResponseDto {
    return {
      id: this.id,
      uuid: this.uuid,
      referenceNumber: this.referenceNumber,
    
      buyerPublicProfile,
      sellerPublicProfile,
    
      orderReceiveType: this.orderReceiveType,
    
      status: this.status,
      paymentStatus: this.paymentStatus,
      paymentVariant: this.paymentVariant,
      statusHistory: this.statusHistory,
      paymentStatusHistory: this.paymentStatusHistory,
    
      calculatedTotalCostMajor: this.calculatedTotalCostMajor,
      deliveryCostMajor: this.deliveryCostMajor,
      receiver: this.receiver,

      currency: this.currency,
    }
  }
}
