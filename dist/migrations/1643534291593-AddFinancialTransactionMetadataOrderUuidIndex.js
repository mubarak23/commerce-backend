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
exports.AddFinancialTransactionMetadataOrderUuidIndex1643534291593 = void 0;
const Tables_1 = __importDefault(require("../enums/Tables"));
class AddFinancialTransactionMetadataOrderUuidIndex1643534291593 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.connection.manager.query("create index financial_transaction_metadata_order_uuid_gin_idx on financial_transactions using gin ((metadata->'orderUuid'));");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex(Tables_1.default.FINANCIAL_TRANSACTIONS, 'financial_transaction_metadata_order_uuid_gin_idx');
        });
    }
}
exports.AddFinancialTransactionMetadataOrderUuidIndex1643534291593 = AddFinancialTransactionMetadataOrderUuidIndex1643534291593;
//# sourceMappingURL=1643534291593-AddFinancialTransactionMetadataOrderUuidIndex.js.map