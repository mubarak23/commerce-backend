export interface CategorySettingsData {
  deliveryFees: CategoryStateDeliveryFee[],
  cinderbuildProfiltMargin?: CategoryProfitMargin | null
}

interface CategoryStateDeliveryFee {
  state: string,
  deliveryFeeMajor?: number
  deliveryFeeCurrency?: string // NGN
}
interface CategoryProfitMargin {
  amountMajor: number,
  currency: string
}