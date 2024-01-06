import { CouponValueType } from "../enums/CouponValueType";
import { ProductsResponseDto } from "./ProductsResponseDto";
import { CouponApplyType } from '../enums/CouponApplyType';

export interface CouponResponseDto {
  code: string;
  description?: string | null;

  productUuid?: string;
  product?: ProductsResponseDto

  expiryDate?: Date | null;
  isActive: boolean,
  valueType: CouponValueType,
  applyType: CouponApplyType,
  value: number;

  orderMinAmountMajor?: number | null
}
