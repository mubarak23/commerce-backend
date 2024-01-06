import { getRepository } from "typeorm"
import { SellerAccountStat } from "../entity/SellerAccountStat"



export const getSellerAccountStats = async (userId: number): Promise<SellerAccountStat> => {
  const accountStatRepo = getRepository(SellerAccountStat)

  let accountStatWallet = await accountStatRepo.findOne({
    userId,
  })

  if (!accountStatWallet) {
    accountStatWallet = new SellerAccountStat().initialize(userId)
    accountStatWallet = await accountStatRepo.save(accountStatWallet)
  }

  return accountStatWallet
}
