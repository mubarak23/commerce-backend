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
const db_1 = require("../../db");
const ProjectSubscriptionTransaction_1 = require("../../entity/ProjectSubscriptionTransaction");
const PaymentTransaction_1 = require("../../enums/PaymentTransaction");
const MortgageCardService = __importStar(require("../../services/mortgageCardService"));
const agenderConfig = __importStar(require("./config"));
function recurrentPaymentNotificationRunCron() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB
        const db = yield agenderConfig.connectToMongo();
        // Create a new Agenda instance and link it to the MongoDB connection
        const agenda = yield agenderConfig.createAgenda(db);
        console.log('Before we enter dispatch-recurrent-payment-request');
        // Define a job
        agenda.define('dispatch-recurrent-payment-request', (job) => __awaiter(this, void 0, void 0, function* () {
            console.log('Inside dispatch-recurrent-payment-request');
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
            const join = {
                alias: "project_susbscription_transactions",
                leftJoinAndSelect: {
                    projectSubscription: "project_susbscription_transactions.projectSubscription",
                    project: "project_susbscription_transactions.project",
                    developer: "project_susbscription_transactions.developer",
                    investor: "project_susbscription_transactions.investor",
                },
            };
            const unpaidProjectSubscriptionTransactions = yield projectSubscriptionTransactionRepo.find({
                where: { isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID },
                join
            });
            if (unpaidProjectSubscriptionTransactions.length === 0) {
                return false;
            }
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            // console.log('currentMonth', currentMonth)
            const filteredTransactions = unpaidProjectSubscriptionTransactions.filter((transaction) => {
                const nextPaymentDate = new Date(transaction.nextPaymentDate);
                const transactionMonth = nextPaymentDate.getMonth();
                const transactionYear = nextPaymentDate.getFullYear();
                //  console.log('transactionMonth', transactionMonth)
                return transactionMonth === currentMonth && transactionYear === currentYear;
            });
            if (filteredTransactions.length === 0) {
                return false;
            }
            for (const transaction of filteredTransactions) {
                // eslint-disable-next-line no-await-in-loop
                yield MortgageCardService.processDirectPayRequestviaMono(transaction.investor, transaction);
                return true;
            }
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
        // Define and schedule a job to run every 24 hours
        agenda.every('24 hours', 'dispatch-recurrent-payment-request');
        // Close the MongoDB connection when the script exits
        process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
            yield agenda.stop();
            yield db.client.close();
            process.exit(0);
        }));
    });
}
recurrentPaymentNotificationRunCron();
//# sourceMappingURL=paymentNotification.js.map