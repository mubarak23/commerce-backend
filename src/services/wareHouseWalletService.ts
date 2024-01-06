import { getFreshConnection } from "../db";
import { DeliveryFeeWallet } from "../entity/DeliveryWalletFee";
import { FinancialTransaction } from "../entity/FinancialTransaction";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { WalletType } from "../enums/WalletType";
import { UnprocessableEntityError } from "../utils/error-response-types";


export const getCustomerDeliveryWallet = async (userId: number): Promise<DeliveryFeeWallet> => {
  const connection = await getFreshConnection();
  const DeliverywalletRepo = connection.getRepository(DeliveryFeeWallet);

  const sourceDeliveryWalletFee = await DeliverywalletRepo.findOne({
    userId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if(!sourceDeliveryWalletFee){
    throw new UnprocessableEntityError('User Does not have Delivery Wallet')
  }
  return sourceDeliveryWalletFee
}

export const getCustomerSecondaryWallet = async (accountId: number): Promise<DeliveryFeeWallet> => {
  const connection = await getFreshConnection();
  const DeliverywalletRepo = connection.getRepository(DeliveryFeeWallet);

  const sourceDeliveryWalletFee = await DeliverywalletRepo.findOne({
    accountId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if(!sourceDeliveryWalletFee){
    throw new UnprocessableEntityError('User Does not have Delivery Wallet')
  }
  return sourceDeliveryWalletFee
}

export const getCustomerMainWallet = async (accountId: number): Promise<Wallet> => {
  const connection = await getFreshConnection();
  const walletRepo = connection.getRepository(Wallet);

  const sourceWallet = await walletRepo.findOne({
    accountId,
    type: WalletType.CUSTOMER_WALLET,
  });

  if(!sourceWallet){
    throw new UnprocessableEntityError('User Does not have Wallet')
  }
  return sourceWallet
}

export const mainWalletToDeliveryWalletTransfer = async (currentUser: User, totalTransferAmountMinor: number): Promise<boolean> => {
  const senderWallet = await getCustomerMainWallet(currentUser.accountId)
  const deliveryWalletFee = await getCustomerSecondaryWallet(currentUser.accountId)

  const connection = await getFreshConnection();

  const transferSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const financialTransactionRepoT =
      transactionalEntityManager.getRepository(FinancialTransaction);
    const walletRepoT = transactionalEntityManager.getRepository(Wallet);
    const deliveryFeeWalletRepoT = transactionalEntityManager.getRepository(DeliveryFeeWallet)

    const walletBalanceMinorBefore = senderWallet.walletBalanceMinor;
    const walletBalanceMinorAfter =
      senderWallet.walletBalanceMinor - totalTransferAmountMinor;

    const debitFinancialTransaction = new FinancialTransaction().initialize(
      senderWallet,
      PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER,
      totalTransferAmountMinor,
      walletBalanceMinorBefore,
      walletBalanceMinorAfter,
      senderWallet!.currency ? senderWallet!.currency : 'NGN' ,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );

    debitFinancialTransaction.description =
      `${senderWallet.currency}${
        totalTransferAmountMinor / 100
      }  main wallet to delivery wallet fee transfer`;

    await financialTransactionRepoT.save(debitFinancialTransaction);

    await walletRepoT
      .createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: () => 
          `wallet_balance_minor - ${totalTransferAmountMinor}`,
      })
      .where({ id: senderWallet.id })
      .execute();

    const creditDeliveryWalletBalanceMinorBefore = deliveryWalletFee.walletBalanceMinor;
    const creditDeliveryWalletBalanceMinorAfter =
    deliveryWalletFee.walletBalanceMinor + totalTransferAmountMinor;

    const creditFinancialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
      deliveryWalletFee,
      PaymentTransactionTypes.WALLET_TO_DELIVERY_FEE_WALLET_TRANSFER,
      totalTransferAmountMinor,
      creditDeliveryWalletBalanceMinorBefore,
      creditDeliveryWalletBalanceMinorAfter,
      deliveryWalletFee!.currency ? deliveryWalletFee!.currency : 'NGN' ,
      PaymentTransactionStatus.PAID,
      undefined,
      undefined
    );
    creditFinancialTransaction.description =
      `${deliveryWalletFee.currency}${
        totalTransferAmountMinor / 100
      } main wallet to delivery wallet fee transfer`;

    await financialTransactionRepoT.save(creditFinancialTransaction);

    await deliveryFeeWalletRepoT
      .createQueryBuilder()
      .update(DeliveryFeeWallet)
      .set({
        walletBalanceMinor: () =>
          `wallet_balance_minor + ${totalTransferAmountMinor}`,
      })
      .where({ id: deliveryWalletFee.id })
      .execute();

      return true
  
  })
  
  return transferSuccess
}

export const saveDeliveryWalletFeeTransaction = async (
  accountId: number,
  amountMajor: number,
  reference?: string
) => {
  const totalAmountMinor = amountMajor * 100;

  const connection = await getFreshConnection();
  const deliveryFeeWalletRepoT = connection.getRepository(DeliveryFeeWallet)

  const sourceDeliveryFeeWallet = await deliveryFeeWalletRepoT.findOne({ accountId, })
  console.log(sourceDeliveryFeeWallet)
  const finalFinancialTransaction = await connection.transaction(
    async (transactionalEntityManager) => {
      const financialTransactionRepoT =
        transactionalEntityManager.getRepository(FinancialTransaction);

      const walletBalanceMinorBefore = sourceDeliveryFeeWallet!.walletBalanceMinor;
      const walletBalanceMinorAfter =
      sourceDeliveryFeeWallet!.walletBalanceMinor - totalAmountMinor;

      const financialTransaction = new FinancialTransaction().initializeDeliveryFeeTransaction(
        sourceDeliveryFeeWallet!,
        PaymentTransactionTypes.WARE_HOUSE_TO_SITE_DELIVERY_PAYMENT,
        totalAmountMinor,
        walletBalanceMinorBefore,
        walletBalanceMinorAfter,
        sourceDeliveryFeeWallet!.currency ? sourceDeliveryFeeWallet!.currency : 'NGN' ,
        PaymentTransactionStatus.PAID,
        reference,
        undefined
      );
      financialTransaction.description = `${sourceDeliveryFeeWallet!.currency}${
        totalAmountMinor / 100
      }  wallet payment for delivery fee`;

      await financialTransactionRepoT.save(financialTransaction);
      //--
      await deliveryFeeWalletRepoT
        .createQueryBuilder()
        .update(DeliveryFeeWallet)
        .set({
          walletBalanceMinor: () =>
            `wallet_balance_minor - ${totalAmountMinor}`,
        })
        .where({ id: sourceDeliveryFeeWallet!.id })
        .execute();

      return financialTransaction;
    }
  );

  return finalFinancialTransaction;
};
