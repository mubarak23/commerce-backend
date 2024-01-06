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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlefindUsProcesses = exports.addUserCreatedfindUsOption = exports.handleIncreaseCountOption = void 0;
const db_1 = require("../db");
const FindUs_1 = require("../entity/FindUs");
const handleIncreaseCountOption = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const findusRepo = connection.getRepository(FindUs_1.Findus);
    const findUsOption = yield findusRepo.findOne({ name });
    if (!findUsOption) {
        return false;
    }
    yield findusRepo.createQueryBuilder()
        .update(FindUs_1.Findus)
        .set({ counts: findUsOption.counts + 1 })
        .where({
        id: findUsOption.id
    })
        .execute();
    return true;
});
exports.handleIncreaseCountOption = handleIncreaseCountOption;
const addUserCreatedfindUsOption = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const findusRepo = connection.getRepository(FindUs_1.Findus);
    const createNewOption = new FindUs_1.Findus().initialize(name);
    yield findusRepo.save(createNewOption);
    yield findusRepo.createQueryBuilder()
        .update(FindUs_1.Findus)
        .set({ counts: 1 })
        .where({
        id: createNewOption.id
    })
        .execute();
    return true;
});
exports.addUserCreatedfindUsOption = addUserCreatedfindUsOption;
const handlefindUsProcesses = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const findusRepo = connection.getRepository(FindUs_1.Findus);
    const isOptionExists = yield findusRepo.findOne({ name });
    if (isOptionExists) {
        yield (0, exports.handleIncreaseCountOption)(isOptionExists.name);
        return true;
    }
    yield (0, exports.addUserCreatedfindUsOption)(name);
    return true;
});
exports.handlefindUsProcesses = handlefindUsProcesses;
//# sourceMappingURL=miscService.js.map