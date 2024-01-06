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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.sendPhoneVerificationOtp = void 0;
const PhoneVerification_1 = require("../entity/PhoneVerification");
const SmsService = __importStar(require("./smsSendingService"));
const db_1 = require("../db");
const sendPhoneVerificationOtp = (phoneNumber, msisdn, otp, transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const phoneVerificationRepoT = transactionalEntityManager ?
        transactionalEntityManager.getRepository(PhoneVerification_1.PhoneVerification) :
        connection.getRepository(PhoneVerification_1.PhoneVerification);
    yield phoneVerificationRepoT.delete({ msisdn });
    let phoneVerify = new PhoneVerification_1.PhoneVerification().initialize(phoneNumber, msisdn, otp);
    phoneVerify = yield phoneVerificationRepoT.save(phoneVerify);
    const smsSentSuccessfully = yield SmsService.sendOtp(msisdn, otp);
    yield phoneVerificationRepoT.createQueryBuilder()
        .update(PhoneVerification_1.PhoneVerification)
        .set({ smsSentSuccessfully })
        .where({ id: phoneVerify.id })
        .execute();
    return smsSentSuccessfully;
});
exports.sendPhoneVerificationOtp = sendPhoneVerificationOtp;
//# sourceMappingURL=phoneVerificationService.js.map