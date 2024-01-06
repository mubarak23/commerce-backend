import { getRepository } from "typeorm";
import { Coupon } from "../entity/Coupon";
import { ConflictError } from '../utils/error-response-types';
import { CouponValueType } from '../enums/CouponValueType';

export const isCouponValid =  async (code: string): Promise<boolean> => {
  const couponsRepo = getRepository(Coupon)

  const existingCoupon = await couponsRepo.findOne({
    code: code.toUpperCase()
  })

  if(existingCoupon) {
    throw new ConflictError('A coupon with the same code already exists')
  }
  return true
}

export const saveProductCouponCode = async (code: string, 
  description: string, productId: number, userId: number,
  couponValueType: CouponValueType, value: number, 
  expiryDate?: Date, orderMinimumAmountMajor?: number) => {
  
  const newProductCoupon = new Coupon().initialize(
    code.toUpperCase(),
    description,
    userId,
    productId,
    couponValueType,
    value,
    expiryDate, 
    orderMinimumAmountMajor
  );

  const couponRepo = getRepository(Coupon)
  const saveCode = await couponRepo.save(newProductCoupon)
  
  return saveCode
}
