import { CouponValueType } from "../enums/CouponValueType";

export interface NewCouponRequestDto {
  code: string;
  description?: string | null;
  productUuid: string;
  expiryDate?: Date | null;
  
  couponValueType: CouponValueType,
  couponValue: number;

  orderMinAmountMajor?: number | null
}
