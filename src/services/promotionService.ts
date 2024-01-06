import { getFreshConnection } from "../db";
import { Promotion } from "../entity/Promotion";

export const activeCategoryPromotion = async (categoryId: number): Promise<Promotion | undefined> => {
  const connection = await getFreshConnection()
  
  const promotionRepo = connection.getRepository(Promotion)
  return promotionRepo.findOne({ categoryId, isActive: true})
}
