import { PickupLocation } from "../entity/PickupLocation";
import { PriceMatrixTransactionType } from "../enums/PriceMatrixTransactionType";
import { PriceMatriceStatuses } from "../enums/Statuses";
import { OmitFields } from "../interfaces/OmitFields";
import { StatusHistory } from "../interfaces/StatusHistory";
import { IPublicProfile } from "./IProfileResponse";

export interface PriceMatricesResponseByAdmin {
  id: number,
  uuid: string,
  qouteRequestRef: string,
  qouteRequestId: number,
  buyerUserPublicProfile: IPublicProfile,
  buyerUserId: number,
  sellerUserPublicProfile: IPublicProfile | null,
  sellerUserId: number | null,
  quantity: number,
  transactionType: PriceMatrixTransactionType | null, 
  product: {
    uuid: string,
    name: string,
    description: string,
    unitOfMeasurement: string,
    pickupAddressDetails?: Omit<PickupLocation, OmitFields> | null
  },
  deliveryDate: Date | null,
  deliveryAddress: string | null,
  productSellingPriceMajor: number | null,
  productCostPriceMajor: number | null,
  totalProductSellingPriceMajor: number | null,
  productMarginMajor: number | null,
  totlaMarginMajor: number | null,
  statusHistory: StatusHistory<PriceMatriceStatuses>[] 
  status: PriceMatriceStatuses,
  createdAt: Date,
}