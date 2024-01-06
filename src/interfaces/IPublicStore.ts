import { IPublicProfile } from "../dto/IProfileResponse";
import { ProductsResponseDto } from "../dto/ProductsResponseDto";

//
export interface IPublicStore {
    sellerPublicProfile: IPublicProfile
    products: ProductsResponseDto
}