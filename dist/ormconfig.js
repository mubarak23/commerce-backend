"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path_1 = __importDefault(require("path"));
const _1613499688264_Categories_1 = __importDefault(require("./migrations/1613499688264-Categories"));
const _1639907248216_SupportedCountries_1 = __importDefault(require("./migrations/1639907248216-SupportedCountries"));
const _1640554725923_CinderbuildRevenueWallet_1 = __importDefault(require("./migrations/1640554725923-CinderbuildRevenueWallet"));
const _1640555086504_FirstCinderbuildAdmin_1 = __importDefault(require("./migrations/1640555086504-FirstCinderbuildAdmin"));
const _1641412621796_InitialConfigProperties_1 = __importDefault(require("./migrations/1641412621796-InitialConfigProperties"));
const _1642533991446_AddCategoriesAndBrands_1 = __importDefault(require("./migrations/1642533991446-AddCategoriesAndBrands"));
const _1643534291593_AddFinancialTransactionMetadataOrderUuidIndex_1 = require("./migrations/1643534291593-AddFinancialTransactionMetadataOrderUuidIndex");
const _1663502014866_AddOrderPaymentDefaultDailyChargePercentage_1 = require("./migrations/1663502014866-AddOrderPaymentDefaultDailyChargePercentage");
const _1672686032797_RemoveLgaPrices_1 = require("./migrations/1672686032797-RemoveLgaPrices");
const _1687169321849_CinderbuildAdminUsers_1 = require("./migrations/1687169321849-CinderbuildAdminUsers");
let ssl = true;
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'automated_test') {
    require("dotenv").config({ path: path_1.default.resolve(__dirname, "../.env.test") });
    ssl = false;
}
else if (process.env.NODE_ENV === 'development1') {
    ssl = false;
}
const buildDbConfig = () => {
    if (process.env.DATABASE_URL) {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [`${__dirname}/entity/**/*{.ts,.js}`],
            migrations: [
                _1613499688264_Categories_1.default,
                _1639907248216_SupportedCountries_1.default,
                _1640555086504_FirstCinderbuildAdmin_1.default,
                _1640554725923_CinderbuildRevenueWallet_1.default,
                _1641412621796_InitialConfigProperties_1.default,
                // AddCategoriesAndBrands1642533991446,
                _1643534291593_AddFinancialTransactionMetadataOrderUuidIndex_1.AddFinancialTransactionMetadataOrderUuidIndex1643534291593,
                _1663502014866_AddOrderPaymentDefaultDailyChargePercentage_1.AddOrderPaymentDefaultDailyChargePercentage1663502014866,
                //  RemoveLgaPrices1672686032797,
                _1687169321849_CinderbuildAdminUsers_1.CinderbuildAdminUsers1687169321849
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
            poolErrorHandler: (err) => {
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
            _1613499688264_Categories_1.default,
            _1639907248216_SupportedCountries_1.default,
            _1640555086504_FirstCinderbuildAdmin_1.default,
            _1640554725923_CinderbuildRevenueWallet_1.default,
            _1641412621796_InitialConfigProperties_1.default,
            _1642533991446_AddCategoriesAndBrands_1.default,
            _1643534291593_AddFinancialTransactionMetadataOrderUuidIndex_1.AddFinancialTransactionMetadataOrderUuidIndex1643534291593,
            _1663502014866_AddOrderPaymentDefaultDailyChargePercentage_1.AddOrderPaymentDefaultDailyChargePercentage1663502014866,
            _1672686032797_RemoveLgaPrices_1.RemoveLgaPrices1672686032797
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
        poolErrorHandler: (err) => {
            console.log("Database pool error: ", err.message);
            console.log("Database pool error details: ", JSON.stringify(err, null, 4));
        },
        // logging: process.env.NODE_ENV !== ProductionEnv
    };
};
// ProductionEnv
const config = buildDbConfig();
exports.default = config;
//# sourceMappingURL=ormconfig.js.map