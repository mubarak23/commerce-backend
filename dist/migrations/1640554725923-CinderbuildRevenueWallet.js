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
const typeorm_1 = require("typeorm");
const Wallet_1 = require("../entity/Wallet");
const WalletType_1 = require("../enums/WalletType");
class CinderbuildRevenueWallet1640554725923 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const cinderbuildRevenueWallet = new Wallet_1.Wallet().initialize(1, 1, WalletType_1.WalletType.CINDERBUILD_WALLET, 'NGN');
            const walletRepo = (0, typeorm_1.getRepository)(Wallet_1.Wallet);
            yield walletRepo.save(cinderbuildRevenueWallet);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletRepo = (0, typeorm_1.getRepository)(Wallet_1.Wallet);
            yield walletRepo.delete({ type: WalletType_1.WalletType.CINDERBUILD_WALLET });
        });
    }
}
exports.default = CinderbuildRevenueWallet1640554725923;
//# sourceMappingURL=1640554725923-CinderbuildRevenueWallet.js.map