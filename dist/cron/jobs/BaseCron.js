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
const logger_1 = __importDefault(require("../../logger"));
const core_1 = require("../../utils/core");
const CronRun_1 = require("../../entity/CronRun");
const db_1 = require("../../db");
class BaseCron {
    handler(jobName) {
        return __awaiter(this, void 0, void 0, function* () {
            // logger.info(`Inside: ${jobName}`)
            const connection = yield (0, db_1.getFreshConnection)();
            const cronRunRepo = connection.getRepository(CronRun_1.CronRun);
            let cronRun = yield cronRunRepo.findOne({
                name: jobName
            });
            if (cronRun) {
                cronRun.isRunning = true;
                cronRun.lastRunStart = (0, core_1.utcNow)();
                cronRun.lastRunEnd = undefined;
                yield cronRunRepo.save(cronRun);
            }
            else {
                cronRun = new CronRun_1.CronRun().initialize(jobName, (0, core_1.utcNow)());
                yield cronRunRepo.save(cronRun);
            }
            //--
            try {
                yield this.startWorking();
            }
            catch (e) {
                logger_1.default.error(e);
            }
            finally {
                yield cronRunRepo.createQueryBuilder()
                    .update(CronRun_1.CronRun)
                    .set({
                    isRunning: false,
                    lastRunEnd: (0, core_1.utcNow)()
                })
                    .whereInIds([cronRun.id])
                    .execute();
            }
        });
    }
}
exports.default = BaseCron;
//# sourceMappingURL=BaseCron.js.map