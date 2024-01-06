import { CouponValueType } from "../enums/CouponValueType";

export interface NewUpdateCouponRequestDto {
  code: string;
  description?: string | null;
  expiryDate?: Date | null;
  orderMinimumAmountMajor?: number | null
}
