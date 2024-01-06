"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreshConnection = void 0;
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const typeorm_2 = require("typeorm");
const logger_1 = __importDefault(require("./logger"));
const getFreshConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        const connection = yield (0, typeorm_2.createConnection)(ormconfig_1.default);
        return connection;
    }
    catch (errorLevel1) {
        connection = (0, typeorm_1.getConnection)();
        const driver = connection.driver;
        for (const client of driver.master._clients) {
            try {
                yield client.query('SELECT 1');
                return connection;
            }
            catch (error) {
                logger_1.default.info('Reconnecting ...');
                try {
                    yield (0, typeorm_1.getConnection)().driver.disconnect();
                    yield (0, typeorm_1.getConnection)().driver.connect();
                }
                catch (e) {
                    yield (0, typeorm_2.createConnection)(ormconfig_1.default);
                }
                finally {
                    connection = (0, typeorm_1.getConnection)();
                }
                return connection;
            }
        }
    }
    finally {
        return (0, typeorm_1.getConnection)();
    }
});
exports.getFreshConnection = getFreshConnection;
//# sourceMappingURL=db.js.map