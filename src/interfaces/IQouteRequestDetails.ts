import { Timestamp } from "typeorm"
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes"

// IQouteRequestDetails
export interface IQouteRequestDetails {
    referenceNumber: number,
    productCategory: string,
    productName: string,
    quantity: number,
    OffTakeMode: OrderReceiveTypes
    PickUpState: string,
    sellerPrice: number,
    buyerPrice: number,
    totalCost: number,
    acceptCurrency: string,
    deliveryDate: Timestamp,
  }

