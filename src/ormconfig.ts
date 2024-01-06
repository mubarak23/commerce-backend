/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import path from "path";
import { ConnectionOptions } from "typeorm";

import Categories1613499688264 from "./migrations/1613499688264-Categories";
import SupportedCountries1639907248216 from "./migrations/1639907248216-SupportedCountries";
import CinderbuildRevenueWallet1640554725923 from "./migrations/1640554725923-CinderbuildRevenueWallet";
import FirstCinderbuildAdmin1640555086504 from "./migrations/1640555086504-FirstCinderbuildAdmin";
import InitialConfigProperties1641412621796 from "./migrations/1641412621796-InitialConfigProperties";
import AddCategoriesAndBrands1642533991446 from "./migrations/1642533991446-AddCategoriesAndBrands";
import { AddFinancialTransactionMetadataOrderUuidIndex1643534291593 } from "./migrations/1643534291593-AddFinancialTransactionMetadataOrderUuidIndex";
import { AddOrderPaymentDefaultDailyChargePercentage1663502014866 } from "./migrations/1663502014866-AddOrderPaymentDefaultDailyChargePercentage";
import { RemoveLgaPrices1672686032797 } from "./migrations/1672686032797-RemoveLgaPrices";
import { CinderbuildAdminUsers1687169321849 } from "./migrations/1687169321849-CinderbuildAdminUsers";

let ssl = true
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'automated_test') {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env.test") });
  ssl = false
} else if (process.env.NODE_ENV === 'development1') {
  ssl = false
}

const buildDbConfig = ():ConnectionOptions => {
  if(process.env.DATABASE_URL) {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [`${__dirname}/entity/**/*{.ts,.js}`],
      migrations: [
        Categories1613499688264,
        SupportedCountries1639907248216,
        FirstCinderbuildAdmin1640555086504,
        CinderbuildRevenueWallet1640554725923,
        InitialConfigProperties1641412621796,
        // AddCategoriesAndBrands1642533991446,
        AddFinancialTransactionMetadataOrderUuidIndex1643534291593,
        AddOrderPaymentDefaultDailyChargePercentage1663502014866,
       //  RemoveLgaPrices1672686032797,
        CinderbuildAdminUsers1687169321849
      ],
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.CACERT,
      },
      synchronize: true,
      extra: {
        // ssl: process.env.NODE_ENV === ProductionEnv,
        // ssl, // commented for real database not heroku addon db
        // rejectUnauthorized: true, // commented for real database not heroku addon db
    
        // based on  https://node-postgres.com/api/pool
        // max connection pool size
        max: 12,
        keepAlive: true,
        // idleTimeoutMillis: 600000,
    
        // connection timeout
        connectionTimeoutMillis: 25000,
      },
      poolErrorHandler: (err: any) => {
        console.log("Database pool error: ", err.message);
        console.log("Database pool error details: ", JSON.stringify(err, null, 4));
      },
      // logging: process.env.NODE_ENV !== ProductionEnv
    };
  }
  
  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [`${__dirname}/entity/**/*{.ts,.js}`],
    migrations: [
      Categories1613499688264,
      SupportedCountries1639907248216,
      FirstCinderbuildAdmin1640555086504,
      CinderbuildRevenueWallet1640554725923,
      InitialConfigProperties1641412621796,
      AddCategoriesAndBrands1642533991446,
      AddFinancialTransactionMetadataOrderUuidIndex1643534291593,
      AddOrderPaymentDefaultDailyChargePercentage1663502014866,
      RemoveLgaPrices1672686032797
    ],
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.CACERT,
    },
    synchronize: true,
    extra: {
      // ssl: process.env.NODE_ENV === ProductionEnv,
      // ssl, // commented for real database not heroku addon db
      // rejectUnauthorized: true, // commented for real database not heroku addon db
  
      // based on  https://node-postgres.com/api/pool
      // max connection pool size
      max: 12,
      keepAlive: true,
      // idleTimeoutMillis: 600000,
  
      // connection timeout
      connectionTimeoutMillis: 25000,
    },
    poolErrorHandler: (err: any) => {
      console.log("Database pool error: ", err.message);
      console.log("Database pool error details: ", JSON.stringify(err, null, 4));
    },
    // logging: process.env.NODE_ENV !== ProductionEnv
  };
}
// ProductionEnv
const config: ConnectionOptions = buildDbConfig()

export default config;
