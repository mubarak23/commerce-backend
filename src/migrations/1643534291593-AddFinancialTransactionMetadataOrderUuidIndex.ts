/* eslint-disable @typescript-eslint/no-empty-function */
import {MigrationInterface, QueryRunner} from "typeorm";
import Tables from "../enums/Tables";

export class AddFinancialTransactionMetadataOrderUuidIndex1643534291593 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.manager.query("create index financial_transaction_metadata_order_uuid_gin_idx on financial_transactions using gin ((metadata->'orderUuid'));")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(Tables.FINANCIAL_TRANSACTIONS, 'financial_transaction_metadata_order_uuid_gin_idx');
  }
}
