"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionFlowType = void 0;
const PaymentTransaction_1 = require("./PaymentTransaction");
var TransactionFlowType;
(function (TransactionFlowType) {
    TransactionFlowType["IN"] = "in";
    TransactionFlowType["OUT"] = "out";
})(TransactionFlowType || (TransactionFlowType = {}));
const getTransactionFlowType = (transactionType) => {
    if (transactionType === PaymentTransaction_1.PaymentTransactionTypes.BUYER_WALLET_TO_ESCROW
        || transactionType === PaymentTransaction_1.PaymentTransactionTypes.WALLET_FUNDS_WITHDRAWAL) {
        return TransactionFlowType.OUT;
    }
    return TransactionFlowType.IN;
};
exports.getTransactionFlowType = getTransactionFlowType;
exports.default = TransactionFlowType;
//# sourceMappingURL=TransactionFlowType.js.map