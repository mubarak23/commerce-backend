import { Entity, Column, Index, JoinColumn } from "typeorm";
import TableColumns, { CouponsColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import DefualtEntity from "./BaseEntity";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import { User } from "@sentry/node";
import { Product } from "./Product";
import { CouponValueType } from '../enums/CouponValueType';
import { CouponApplyType } from "../enums/CouponApplyType";

@Entity({ name: Tables.COUPONS })
@Index(["code"], { unique: true })
export class Coupon extends DefualtEntity {
  @Column({ name: CouponsColumns.USER_ID })
  userId: number;

  @JoinColumn({ name: CouponsColumns.USER_ID , referencedColumnName: TableColumns.ID, })
  user: User;

  @Column({ name: CouponsColumns.PRODUCT_ID })
  productId?: number;

  @JoinColumn({ name: CouponsColumns.PRODUCT_ID , referencedColumnName: TableColumns.ID, })
  product?: Product;


  @Column({ length: 255, name: CouponsColumns.CODE, nullable: false })
  code: string;

  @Column({ length: 255, name: CouponsColumns.DESCRIPTION, nullable: true })
  description: string;

  @Column({ name: CouponsColumns.VALUE_TYPE, nullable: false })
  valueType: CouponValueType;

  @Column({ name: CouponsColumns.APPLY_TYPE, nullable: false })
  applyType: CouponApplyType;

  @Column({ name: CouponsColumns.EXPIRY_DATE, nullable: true })
  expiryDate?: Date;

  @Column({ type: "decimal",  name: CouponsColumns.VALUE, nullable: true, 
    default: 0,
    transformer: new ColumnNumericTransformer(), })
  value: number;

  @Column({ type: "boolean",  name: CouponsColumns.IS_ACTIVE, nullable: false, default: true })
  isActive: boolean;

  @Column({ name: CouponsColumns.ORDER_MINIMUM_AMOUNT_MAJOR, nullable: true })
  orderMinimumAmountMajor?: number;

  
  initialize(code: string, description: string, userId: number, productId: number, 
    type: CouponValueType, value: number, expiryDate?: Date, orderMinimumAmountMajor?: number) {
    this.code = code;
    this.description = description;
    this.userId = userId;
    this.productId =  productId;
    this.valueType = type;
    this.value = value
    this.expiryDate = expiryDate
    this.orderMinimumAmountMajor = orderMinimumAmountMajor
    this.createdAt = utcNow();
    
    return this;
  }
}
