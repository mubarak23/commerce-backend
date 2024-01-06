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
exports.createAgenda = exports.connectToMongo = void 0;
const agenda_1 = __importDefault(require("agenda"));
const mongodb_1 = require("mongodb");
const connectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoClient = new mongodb_1.MongoClient('mongodb+srv://adminsand:VKPJp8OjamVXDwj6@cluster0.7p8qtwg.mongodb.net/?retryWrites=true&w=majority');
    yield mongoClient.connect();
    return mongoClient.db();
});
exports.connectToMongo = connectToMongo;
const createAgenda = (db) => __awaiter(void 0, void 0, void 0, function* () {
    return new agenda_1.default().mongo(db, 'jobs');
});
exports.createAgenda = createAgenda;
//# sourceMappingURL=config.js.map