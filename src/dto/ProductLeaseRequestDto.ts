import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";

export interface ProductLeaseRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  stateResidence: string;
  bvn: string | null;
  businessType: string | null;
  cacNumber: string | null;
  companyName: string | null;
  companyAddress: string | null;
  jobTitle: string | null;
  modeOfDelivery: string | null;
  productCategoryUuid: string | null;
  idCardNumber: string| null;
  productQuantity: number | null ;
  principalAmountMajor: number | null;
  currency: string | null;
}
