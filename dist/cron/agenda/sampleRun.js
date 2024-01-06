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
// import nodemailer from 'nodemailer';
const EmailService = __importStar(require("../../services/emailService"));
const agenderConfig = __importStar(require("./config"));
function testRunCron() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB
        const db = yield agenderConfig.connectToMongo();
        // Create a new Agenda instance and link it to the MongoDB connection
        const agenda = yield agenderConfig.createAgenda(db);
        console.log('before we enter test-request-mail');
        // Define a job
        agenda.define('test-request-mail', (job) => __awaiter(this, void 0, void 0, function* () {
            console.log('inside test-request-mail');
            // sendTestMailForCronJob
            yield EmailService.sendTestMailForCronJob();
            return true;
            // fetch all unpaid ptoject sussbcription transactions 
            // filter all transaction that are due to be paid today using today's date
            // for each of the unpaid transaction 
            // request payment link from 
            // call sendMonoPaymentApprovalLink to send mail to use to pay 
            // Email configuration
        }));
        // Start the agenda scheduler
        yield agenda.start();
        // Define and schedule a job to run every 10 minutes
        agenda.every('10 minutes', 'test-request-mail');
        // Close the MongoDB connection when the script exits
        process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
            yield agenda.stop();
            yield db.client.close();
            process.exit(0);
        }));
    });
}
testRunCron();
//# sourceMappingURL=sampleRun.js.map