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
const Category_1 = require("../entity/Category");
const CategoriesSeed_1 = __importDefault(require("../seeds/CategoriesSeed"));
class Categories1613499688264 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getRepository)(Category_1.Category).save(CategoriesSeed_1.default);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getRepository)(Category_1.Category).delete({ id: (0, typeorm_1.MoreThan)(1) });
        });
    }
}
exports.default = Categories1613499688264;
//# sourceMappingURL=1613499688264-Categories.js.map