/* eslint-disable @typescript-eslint/no-empty-function */
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { ConfigProperty } from '../entity/ConfigProperty';
import ConfigProperties from "../enums/ConfigProperties";

export class AddOrderPaymentDefaultDailyChargePercentage1663502014866 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const configProperty: ConfigProperty = new ConfigProperty().initialize(
      ConfigProperties.ORDER_PAYMENT_DEFAULT_DAILY_CHARGE_PERCENTAGE, 
      '0.167', 'Order payment default daily charge percentage')    
    
    const configPropertyRepo = getRepository(ConfigProperty)  
    await configPropertyRepo.save(configProperty)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
