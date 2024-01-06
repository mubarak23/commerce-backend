import { WareHouse } from "../entity/WareHouse"

// ProductReorderLevelResponseDto
export default interface ProductReorderLevelResponseDto {
  uuid: string,
  produtUuid?: string| null,
  productName?: string | null,
  wareHouseDetail?: WareHouse | null
  level: number,
  avalailableInStock?: number | null
}
