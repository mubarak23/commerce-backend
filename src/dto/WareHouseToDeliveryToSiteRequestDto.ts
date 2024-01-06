import { DeliveryItemJson } from '../interfaces/DeliveryItemJson'

export interface WareHouseToDeliveryToSiteRequestDto {
  deliveryItems: DeliveryItemJson[],
  deliveryLocationUuid: string
}
