import { getFreshConnection } from "../db";
import { Order } from "../entity/Order";
import { ProductLease } from "../entity/ProductLease";
import * as Utils from "../utils/core"


export const fetchActiveProductLease = async (userId: number): Promise<ProductLease | undefined> => {
  const connection = await getFreshConnection()

  const productLeaseRepo = connection.getRepository(ProductLease)

  return productLeaseRepo.findOne({
    where: {
      userId,
      isActive: true,
      isPaid: false,
      isSoftDeleted: false,
    },
    order: { createdAt: 'ASC' },
  })
}

export const getOrdersAmountMajorTotalOnProductLease = async (productLeaseId: number): Promise<number> => {
  const connection = await getFreshConnection()

  const orderRepo = connection.getRepository(Order)

  const ordersOnPlp = await orderRepo.find({
    productLeaseId
  })

  if (!ordersOnPlp.length) {
    return 0
  }

  let ordersAmountMinorSum = 0

  for (const order of ordersOnPlp) {
    ordersAmountMinorSum += order.calculatedTotalCostMajor
  }

  return ordersAmountMinorSum
}

export const updateProductLeaseState = async (userId: number, productLease: ProductLease | undefined, 
    amountMinor: number, walletBalanceMinorBefore: number) => {
  if (!productLease) {
    productLease = await fetchActiveProductLease(userId)
    if (!productLease) {
      return
    }
  }

  if (walletBalanceMinorBefore < 0 && walletBalanceMinorBefore + amountMinor >= 0) {
    const connection = await getFreshConnection()
    const productLeaseRepo = connection.getRepository(ProductLease)

    await productLeaseRepo.createQueryBuilder()
      .update(ProductLease)
      .set({
        isActive: false,
        isPaid: true,
        paidAt: Utils.utcNow(),
      })
      .where({
        id: productLease.id,
      })
      .execute()
      
    // TODO
    // Send notification that product lease has ended
  }
}
