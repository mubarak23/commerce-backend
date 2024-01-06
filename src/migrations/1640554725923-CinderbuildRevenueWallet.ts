import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Account } from "../entity/Account";
import { Wallet } from "../entity/Wallet";
import { WalletType } from "../enums/WalletType";

export default class CinderbuildRevenueWallet1640554725923 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const cinderbuildRevenueWallet: Wallet = new Wallet().initialize(1, 1, WalletType.CINDERBUILD_WALLET, 'NGN')

    const walletRepo = getRepository(Wallet)
    await walletRepo.save(cinderbuildRevenueWallet)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const walletRepo = getRepository(Wallet)
    await walletRepo.delete({type: WalletType.CINDERBUILD_WALLET})
  }
}
