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
const typeorm_1 = require("typeorm");
const ConfigProperty_1 = require("../entity/ConfigProperty");
const ConfigPropertiesSeed_1 = __importDefault(require("../seeds/ConfigPropertiesSeed"));
class InitialConfigProperties1641412621796 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield (0, typeorm_1.getRepository)(ConfigProperty_1.ConfigProperty).createQueryBuilder()
                .insert()
                .into(ConfigProperty_1.ConfigProperty)
                .values(ConfigPropertiesSeed_1.default)
                .onConflict('DO NOTHING')
                .execute();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getRepository)(ConfigProperty_1.ConfigProperty).delete({});
        });
    }
}
exports.default = InitialConfigProperties1641412621796;
//# sourceMappingURL=1641412621796-InitialConfigProperties.js.map