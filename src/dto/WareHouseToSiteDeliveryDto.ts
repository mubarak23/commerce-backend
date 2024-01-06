import { DeliveryLocation } from "../entity/DeliveryLocation";
import { WareHouse } from "../entity/WareHouse";
import { WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";
import { DeliveryItemJson } from "../interfaces/DeliveryItemJson";
import { OmitFields } from "../interfaces/OmitFields";
import { StatusHistory } from "../interfaces/StatusHistory";


export interface WareHouseToSiteDeliveryDto {
  uuid: string,
  wareHouseDetails?: WareHouse,
  userId: number,
  deliveryItems: DeliveryItemJson[],
  deliveryRequestHistory: StatusHistory<WareHouseToSiteDeliveryFeeStatuses>[],
  status: WareHouseToSiteDeliveryFeeStatuses ,
  totalAmountMajor: number,
  deliveryFeeAmountMajor: number,
  deliverySiteDetails?: Omit<DeliveryLocation, OmitFields>,
  createdAt: Date
}


export interface WareHouseToSiteDeliveryDtoForAdmin extends WareHouseToSiteDeliveryDto {
  id: number,
}
