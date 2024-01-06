"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.BankController = void 0;
const tsoa_1 = require("tsoa");
const PaystackService = __importStar(require("../services/paystackService"));
// https://www.npmjs.com/package/paystack-node
// https://medium.com/bithubph/payment-integration-with-node-js-express-request-and-paystack-api-8cebf51c1f52
// DO NOT EXPORT DEFAULT
let BankController = class BankController {
    getBanksList() {
        return __awaiter(this, void 0, void 0, function* () {
            const paystackBanks = yield PaystackService.getBanksList();
            const resData = {
                status: true,
                data: paystackBanks
            };
            return resData;
        });
    }
    bankAccountNameEnquiry(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber, bankCode } = reqBody;
            const accountResolveResult = yield PaystackService.accountNameEnquiry(bankCode, accountNumber);
            const resData = {
                status: true,
                data: accountResolveResult
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/nigerianbanks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBanksList", null);
__decorate([
    (0, tsoa_1.Post)('/account/nameenquiry'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "bankAccountNameEnquiry", null);
BankController = __decorate([
    (0, tsoa_1.Route)("api/bank"),
    (0, tsoa_1.Tags)('Bank')
], BankController);
exports.BankController = BankController;
//# sourceMappingURL=BankController.js.map