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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.procurementListAcknowledgementMail = exports.sendDeliveryRequestToSiteAdmin = exports.sendDeliveryFeeSetMail = exports.sendNewWareHouseLevelAdded = exports.sendNewAccountLevelAdded = exports.sendWithdrawalRequestToSupport = exports.sendPODPaymentNotificationtoBuyerMail = exports.sendPODNotificationToSellerMail = exports.sendPODConfirmationMail = exports.sendMailtoAdminOnPLPApplication = exports.sendQouteRequestResponseMailResponse = exports.sendQouteRequestMailSeller = exports.sendOrderConfirmDeliveryMail = exports.sendOrderConfirmPickupMail = exports.sendorderAvailableForDeliveryMail = exports.sendorderAvaialableForPickMail = exports.sendRequestACallMailToAdmin = exports.sendOrderCreationMailToSeller = exports.sendOrderPaymentMailToUnregisterBuyer = exports.sendOrderPaymentMailToBuyer = exports.sendCustomerEnabledForPlp = exports.sendBuyerAcceptInvite = exports.sendSellerInviteToBuyer = exports.sellerQouteRequestResponseMail = exports.sendQouteRequestDetailsMail = exports.sendUnregisterUserOrderDetailsMailtoAdmin = exports.sendOrderDetailsMailtoAdmin = exports.sendPromotionalMail = exports.howToShopMail = exports.sendWelcomeMailToCooperateUser = exports.sendOMAAdminWelcomeMail = exports.sendsellerAdminWelcomeMail = exports.sendAffiliateWelcomeMail = exports.sendCooperateDiscountMail = exports.sendCooperateWelcomeMail = exports.AffiliateSendWelcomeMail = exports.sendWelcomeMailToSeller = exports.sendWelcomeMail = exports.sendCustomerForgetPasswordOtp = exports.sendApprovePriceMatrix = exports.sendDeclinedPriceMatrix = exports.sendPriceMatricForDeliveryConfirmation = exports.sendPriceMatrixForApproval = exports.sendProjectApprovalRequestApprovalMail = exports.sendProjectApprovalRequestDeclineMail = exports.sendProjectApprovalRequestMail = exports.sendDeveloperAccountApprovalMail = exports.sendDeveloperAccountAwaitApprovalMail = exports.sendMonoPaymentApprovalLink = exports.sendCustomerOtp = void 0;
exports.sendNotificationToUserViaMail = exports.sendNotificationToUserForProjectMail = exports.sendNotificationToUserForWareHouseviaMail = exports.sendNotificationToUserViaMailForQouteR = exports.sendTestMailForCronJob = exports.sendProcurmentInvoiceIsReady = exports.sendProcurmentUploadMailToAdmin = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const format = require("string-template");
const fs = __importStar(require("fs"));
const typeorm_1 = require("typeorm");
const Constant = __importStar(require("../constants"));
const constants_1 = require("../constants");
const db_1 = require("../db");
const DeliveryLocation_1 = require("../entity/DeliveryLocation");
const FinancialTransaction_1 = require("../entity/FinancialTransaction");
const PickupLocation_1 = require("../entity/PickupLocation");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const OrderReceiveTypes_1 = require("../enums/OrderReceiveTypes");
const logger_1 = __importDefault(require("../logger"));
const Utils = __importStar(require("../utils/core"));
const defaultMailAddress = process.env.NODE_ENV === constants_1.ProductionEnv ? 'cb_support@cinderbuild.com' : 'noreply@cinderbuild.com';
const sendCustomerOtp = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/otpmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Signup - OTP`,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                otp: userMailInfo.otp
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendCustomerOtp = sendCustomerOtp;
const sendMonoPaymentApprovalLink = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/monopaymentlinkmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Approve Payment Request `,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                paymentLink: userMailInfo.paymentLink
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendMonoPaymentApprovalLink = sendMonoPaymentApprovalLink;
const sendDeveloperAccountAwaitApprovalMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountpendingapproval.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const dashboardLink = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login`;
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Developer Account Pending Approval `,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                dashboardLink,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendDeveloperAccountAwaitApprovalMail = sendDeveloperAccountAwaitApprovalMail;
const sendDeveloperAccountApprovalMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountapprovemail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const dashboardLink = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login`;
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Developer Account Has Been Approved`,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                dashboardLink,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendDeveloperAccountApprovalMail = sendDeveloperAccountApprovalMail;
const sendProjectApprovalRequestMail = (userMailInfo, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountapprovemail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        //  const dashboardLink  = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login` 
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Project Approval Request`,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                cuatomerLastName: userMailInfo.lastName,
                phoneNumber: userMailInfo.msisdn,
                emailAddress: userMailInfo.emailAddress,
                projectName: project.name,
                costPerSlot: project.costPerSlot,
                numberOfSlot: project.numberOfSlots,
                duration: project.duration,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendProjectApprovalRequestMail = sendProjectApprovalRequestMail;
const sendProjectApprovalRequestDeclineMail = (userMailInfo, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/projectapprovaldeclinemail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        //  const dashboardLink  = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login` 
        const msg = {
            to: userMailInfo.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Project Approval Request Decline`,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                cuatomerLastName: userMailInfo.lastName,
                phoneNumber: userMailInfo.msisdn,
                emailAddress: userMailInfo.emailAddress,
                projectName: project.name,
                costPerSlot: project.costPerSlot,
                numberOfSlot: project.numberOfSlots,
                duration: project.duration,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendProjectApprovalRequestDeclineMail = sendProjectApprovalRequestDeclineMail;
const sendProjectApprovalRequestApprovalMail = (userMailInfo, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/projectapprovalrequestgranted.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        //  const dashboardLink  = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login` 
        const msg = {
            to: userMailInfo.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Project Has Been Approved `,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                cuatomerLastName: userMailInfo.lastName,
                phoneNumber: userMailInfo.msisdn,
                emailAddress: userMailInfo.emailAddress,
                projectName: project.name,
                costPerSlot: project.costPerSlot,
                numberOfSlot: project.numberOfSlots,
                duration: project.duration,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendProjectApprovalRequestApprovalMail = sendProjectApprovalRequestApprovalMail;
const sendPriceMatrixForApproval = (priceMatricData, virtualAccount, buyerWallet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // managment email 
        const topLevel0 = process.env.NODE_ENV === constants_1.ProductionEnv ? 'paul.adeyoyin@cinderbuild.com' : 'izundu.emmie@cinderbuild.com';
        const topLevel1 = process.env.NODE_ENV === constants_1.ProductionEnv ? 'femi.adebiyi@cinderbuild.com' : 'mubarak.aminu@cinderbuild.com';
        const approvalUrl = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/approve/${priceMatricData.id}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/approve/${priceMatricData.id}`;
        const declineUrl = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/decline/${priceMatricData.id}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/decline/${priceMatricData.id}`;
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/sendpricematrixforapprovalmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const product01 = process.env.NODE_ENV === constants_1.ProductionEnv ? 'izundu.emmie@cinderbuild.com' : 'noreply@cinderbuild.com';
        const msg = {
            to: topLevel0,
            cc: topLevel1,
            bcc: product01,
            from: "admin@cinderbuild.com",
            subject: `PRICE MATRIX APPROVAL REQUEST FOR ${priceMatricData.buyerUser.firstName.toLocaleUpperCase()} - ${priceMatricData.buyerUser.lastName.toUpperCase()} QUOTE REQUEST REF NUMBER: ${priceMatricData.qouteRequestRef}`,
            html: format(otpMailHtmlContent, {
                sellerFirstName: priceMatricData.sellerUser.firstName,
                sellerLastName: priceMatricData.sellerUser.lastName,
                buyerFirstName: priceMatricData.buyerUser.firstName,
                buyerLastName: priceMatricData.buyerUser.lastName,
                quoteRequestRef: priceMatricData.qouteRequestRef,
                productName: priceMatricData.product.name,
                quantity: priceMatricData.quantity,
                transactionType: priceMatricData.transactionType,
                productCostPrice: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productCostPriceMajor)),
                productSellingPrice: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productSellingPriceMajor)),
                productMargin: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productMarginMajor)),
                totalProductMargin: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totlaMarginMajor)),
                totalProductSellingPriceMajor: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totalProductSellingPriceMajor)),
                totalProductCostPriceMajor: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totalProductCostPriceMajor)),
                deliveryDate: Utils.formatDate(priceMatricData.deliveryDate),
                deliveryAddress: priceMatricData.deliveryAddress,
                accountName: virtualAccount.bankAccountName,
                accountNumber: virtualAccount.bankAccountNumber,
                bankName: virtualAccount.bankName,
                buyerWalletBalance: Utils.CurrencyFormatter(buyerWallet.walletBalanceMinor / 100),
                approvalUrl,
                declineUrl
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPriceMatrixForApproval = sendPriceMatrixForApproval;
const sendPriceMatricForDeliveryConfirmation = (mailForDeliveryConfirmation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/pricematrixOrderdeliveryconfirmationmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const confirmDeliveryurl = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/confirmdelivery/${mailForDeliveryConfirmation.priceMatrixId}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/confirmdelivery/${mailForDeliveryConfirmation.priceMatrixId}`;
        const topLevel0 = 'victoria.ezekafor@cinderbuild.com';
        const topLevel1 = 'ayodele.oluwaleimu@cinderbuild.com';
        const product01 = 'izundu.emmie@cinderbuild.com';
        // 'confirmdelivery'
        const msg = {
            to: topLevel0,
            cc: topLevel1,
            bcc: product01,
            from: "admin@cinderbuild.com",
            subject: `Price Matrix Order Delivery Confirmation - ${mailForDeliveryConfirmation.orderRef}`,
            html: format(otpMailHtmlContent, {
                sellerId: mailForDeliveryConfirmation.sellerId,
                priceMatrixId: mailForDeliveryConfirmation.priceMatrixId,
                amount: mailForDeliveryConfirmation.amount,
                quoteRequestRef: mailForDeliveryConfirmation.quoteRequestRef,
                orderRef: mailForDeliveryConfirmation.orderRef,
                accountName: mailForDeliveryConfirmation.accountName,
                accountNumber: mailForDeliveryConfirmation.accountNumber,
                bankName: mailForDeliveryConfirmation.bankName,
                confirmDeliveryurl,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPriceMatricForDeliveryConfirmation = sendPriceMatricForDeliveryConfirmation;
const sendDeclinedPriceMatrix = (declineMailData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/declinepricematrixmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const topLevel0 = process.env.NODE_ENV === constants_1.ProductionEnv ? Constant.SUPPORT_EMAIL : 'noreply@cinderbuild.com';
        const msg = {
            to: topLevel0,
            from: "admin@cinderbuild.com",
            subject: `Declined Price Matrix with Quote Request Ref - ${declineMailData.quoteRequestRef}`,
            html: format(otpMailHtmlContent, {
                buyerFirstName: declineMailData.buyerFirstName,
                buyerLastName: declineMailData.buyerLastName,
                quoteRequestRef: declineMailData.quoteRequestRef,
                quantity: declineMailData.quantity,
                productSellingPriceMajor: declineMailData.productSellingPriceMajor,
                productCostPriceMajor: declineMailData.productCostPriceMajor,
                productMarginMajor: declineMailData.productMarginMajor,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendDeclinedPriceMatrix = sendDeclinedPriceMatrix;
const sendApprovePriceMatrix = (priceMatricData, virtualAccount, buyerWallet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/sendapprovepricematrixmail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `APPROVED PRICE MATRIX FOR ${priceMatricData.buyerUser.firstName.toLocaleUpperCase()} - ${priceMatricData.buyerUser.lastName.toUpperCase()} QUOTE REQUEST REF NUMBER: ${priceMatricData.qouteRequestRef}`,
            html: format(otpMailHtmlContent, {
                sellerFirstName: priceMatricData.sellerUser.firstName,
                sellerLastName: priceMatricData.sellerUser.lastName,
                buyerFirstName: priceMatricData.buyerUser.firstName,
                buyerLastName: priceMatricData.buyerUser.lastName,
                quoteRequestRef: priceMatricData.qouteRequestRef,
                productName: priceMatricData.product.name,
                quantity: priceMatricData.quantity,
                transactionType: priceMatricData.transactionType,
                productCostPrice: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productCostPriceMajor)),
                productSellingPrice: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productSellingPriceMajor)),
                productMargin: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productMarginMajor)),
                totalProductMargin: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totlaMarginMajor)),
                totalProductSellingPriceMajor: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totalProductSellingPriceMajor)),
                totalProductCostPriceMajor: Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.totalProductCostPriceMajor)),
                deliveryDate: Utils.formatDate(priceMatricData.deliveryDate),
                deliveryAddress: priceMatricData.deliveryAddress,
                accountName: virtualAccount.bankAccountName,
                accountNumber: virtualAccount.bankAccountNumber,
                bankName: virtualAccount.bankName,
                buyerWalletBalance: Utils.CurrencyFormatter(buyerWallet.walletBalanceMinor / 100),
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendApprovePriceMatrix = sendApprovePriceMatrix;
const sendCustomerForgetPasswordOtp = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/forgetPasswordOtpMail.html`;
        const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Forget Password - OTP`,
            html: format(otpMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                otp: userMailInfo.otp
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendCustomerForgetPasswordOtp = sendCustomerForgetPasswordOtp;
const sendWelcomeMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomemail.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild`,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendWelcomeMail = sendWelcomeMail;
const sendWelcomeMailToSeller = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailtoseller.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild`,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendWelcomeMailToSeller = sendWelcomeMailToSeller;
const AffiliateSendWelcomeMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailAffiliateHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailforaffiliate.html`;
        const welcomeMailAffiliateHtmlContent = fs.readFileSync(welcomeMailAffiliateHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild Affiliate Program`,
            html: format(welcomeMailAffiliateHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.AffiliateSendWelcomeMail = AffiliateSendWelcomeMail;
const sendCooperateWelcomeMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailCooperateHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailforcooperate.html`;
        const welcomeMailCooperateHtmlContent = fs.readFileSync(welcomeMailCooperateHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild for Corporates`,
            html: format(welcomeMailCooperateHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendCooperateWelcomeMail = sendCooperateWelcomeMail;
const sendCooperateDiscountMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const discounteHtmlFilePath = `${__dirname}/../emailTemplates/cooperatediscountmail.html`;
        const discountHtmlContent = fs.readFileSync(discounteHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `CinderBuild Corporate Discount - Secondary Wallet`,
            html: format(discountHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendCooperateDiscountMail = sendCooperateDiscountMail;
const sendAffiliateWelcomeMail = (userMailInfo, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/affiliatewelcomemail.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            bcc: 'izundu.emmie@cinderbuild.com',
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild`,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                customerPhoneNumber: userMailInfo.phoneNumber,
                password: newPassword,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendAffiliateWelcomeMail = sendAffiliateWelcomeMail;
const sendsellerAdminWelcomeMail = (userMailInfo, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/selleradminwelcomemail.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild`,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                customerPhoneNumber: userMailInfo.phoneNumber,
                password: newPassword,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendsellerAdminWelcomeMail = sendsellerAdminWelcomeMail;
const sendOMAAdminWelcomeMail = (userMailInfo, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/omaadminwelcomemail.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: 'cb_support@cinderbuild.com',
            cc: 'izundu.emmie@cinderbuild.com',
            bbc: 'tofunmi.adeola@cinderbuild.com',
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild - OMA `,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                customerPhoneNumber: userMailInfo.phoneNumber,
                password: newPassword,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOMAAdminWelcomeMail = sendOMAAdminWelcomeMail;
const sendWelcomeMailToCooperateUser = (userMailInfo, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomecooperateuser.html`;
        const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.email,
            from: "admin@cinderbuild.com",
            subject: `Welcome to CinderBuild`,
            html: format(welcomeMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
                customerPhoneNumber: userMailInfo.phoneNumber,
                password: newPassword,
                role: userMailInfo.role
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendWelcomeMailToCooperateUser = sendWelcomeMailToCooperateUser;
const howToShopMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const howToSellMailHtmlFilePath = `${__dirname}/../emailTemplates/howtosellmail.html`;
        const howToSellMailHtmlContent = fs.readFileSync(howToSellMailHtmlFilePath, 'utf8');
        console.log(userMailInfo);
        const msg = {
            to: userMailInfo.email,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `How To Shop - Cinderbuild`,
            html: format(howToSellMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.howToShopMail = howToShopMail;
const sendPromotionalMail = (userMailInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const promotionalMailHtmlFilePath = `${__dirname}/../emailTemplates/promotionalmail.html`;
        const promotionalMailHtmlContent = fs.readFileSync(promotionalMailHtmlFilePath, 'utf8');
        const msg = {
            to: userMailInfo.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `We are LIVE! Get BIG discounts on Dangote, Lafarge & BUA`,
            html: format(promotionalMailHtmlContent, {
                customerFirstName: userMailInfo.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPromotionalMail = sendPromotionalMail;
const sendOrderDetailsMailtoAdmin = (buyerDetail, orderDetail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstOrderItem = orderDetail.orderItems[0];
        const firstProductUuid = firstOrderItem.productUuid;
        const connection = yield (0, db_1.getFreshConnection)();
        const productRepo = yield connection.getRepository(Product_1.Product);
        const firstProduct = yield productRepo.findOne({
            where: {
                uuid: firstProductUuid,
            },
            join: {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                    brand: "product.brand",
                },
            },
        });
        if (!firstProduct) {
            return false;
        }
        const sellerUser = firstProduct.user;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const OrderDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/orderdetailmail.html`;
        const OrderDetailsMailHtmlContent = fs.readFileSync(OrderDetailsMailHtmlFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `CinderBuild - Order Details`,
            html: format(OrderDetailsMailHtmlContent, {
                buyerId: buyerDetail.id,
                buyerName: buyerDetail.firstName,
                buyerEmailAddress: buyerDetail.emailAddress,
                buyerPhoneNumber: buyerDetail.phoneNumber,
                sellerId: sellerUser.id,
                sellerName: sellerUser.firstName,
                sellerEmailAddress: sellerUser.emailAddress,
                sellerPhoneNumber: sellerUser.phoneNumber,
                orderRef: orderDetail.referenceNumber,
                OffTakeMode: orderDetail.orderReceiveType,
                category: firstProduct.category.name,
                name: firstProduct.name,
                sellerPrice: firstOrderItem.unitPrice,
                buyerPrice: firstOrderItem.unitPriceForBuyer,
                totalCost: orderDetail.calculatedTotalCostMajor
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderDetailsMailtoAdmin = sendOrderDetailsMailtoAdmin;
const sendUnregisterUserOrderDetailsMailtoAdmin = (buyerDetail, orderDetail, reference, paymentStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstOrderItem = orderDetail.orderItems[0];
        const firstProductUuid = firstOrderItem.productUuid;
        const connection = yield (0, db_1.getFreshConnection)();
        const productRepo = yield connection.getRepository(Product_1.Product);
        const firstProduct = yield productRepo.findOne({
            where: {
                uuid: firstProductUuid,
            },
            join: {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                    brand: "product.brand",
                },
            },
        });
        if (!firstProduct) {
            return false;
        }
        const sellerUser = firstProduct.user;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const OrderDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/orderdetailsforunregisteredusermail.html`;
        const OrderDetailsMailHtmlContent = fs.readFileSync(OrderDetailsMailHtmlFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `CinderBuild - Order Details For Unregistered User`,
            html: format(OrderDetailsMailHtmlContent, {
                buyerId: buyerDetail.id,
                buyerName: buyerDetail.firstName,
                buyerEmailAddress: buyerDetail.emailAddress,
                buyerPhoneNumber: buyerDetail.phoneNumber,
                sellerId: sellerUser.id,
                sellerName: sellerUser.firstName,
                sellerEmailAddress: sellerUser.emailAddress,
                sellerPhoneNumber: sellerUser.phoneNumber,
                orderRef: orderDetail.referenceNumber,
                OffTakeMode: orderDetail.orderReceiveType,
                paymentRef: reference,
                paymentStatus,
                category: firstProduct.category.name,
                name: firstProduct.name,
                sellerPrice: firstOrderItem.unitPrice,
                buyerPrice: firstOrderItem.unitPriceForBuyer,
                totalCost: orderDetail.calculatedTotalCostMajor
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendUnregisterUserOrderDetailsMailtoAdmin = sendUnregisterUserOrderDetailsMailtoAdmin;
const sendQouteRequestDetailsMail = (buyerDetail, qouteRequestDetail, sellerDetail, productDetail) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let sellerPickupLocation;
        if (qouteRequestDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            sellerPickupLocation = yield pickupLocationRepo.findOne({ uuid: qouteRequestDetail.sellerPickupLocationUuid });
            console.log(sellerPickupLocation);
        }
        let deliveryLocation;
        if (qouteRequestDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            deliveryLocation = yield deliveryLocationRepo.findOne({
                uuid: qouteRequestDetail.deliverAddressUuid,
            });
            console.log(deliveryLocation);
        }
        const quoteState = qouteRequestDetail.orderReceiveType === "PICKUP" ?
            (_a = sellerPickupLocation === null || sellerPickupLocation === void 0 ? void 0 : sellerPickupLocation.address) !== null && _a !== void 0 ? _a : '' : deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.address;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const QouteRequestDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/qouterequestmail.html`;
        const QouteRequestMailHtmlContent = fs.readFileSync(QouteRequestDetailsMailHtmlFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: 'CinderBuild - Quote Request Details',
            html: format(QouteRequestMailHtmlContent, {
                buyerId: buyerDetail.id,
                buyerName: buyerDetail.firstName,
                buyerEmailAddress: buyerDetail.emailAddress,
                buyerPhoneNumber: buyerDetail.msisdn,
                sellerId: sellerDetail.id,
                sellerName: sellerDetail.firstName,
                sellerEmailAddress: sellerDetail.emailAddress,
                sellerPhoneNumber: sellerDetail.phoneNumber,
                referenceNumber: qouteRequestDetail.id,
                quantity: qouteRequestDetail.quantity,
                productName: productDetail.name,
                OffTakeMode: qouteRequestDetail.orderReceiveType,
                PickUpState: quoteState
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendQouteRequestDetailsMail = sendQouteRequestDetailsMail;
const sellerQouteRequestResponseMail = (sellerDetail, qouteRequestDetail, buyerDetail, productDetail, sellerResponse) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let sellerPickupLocation;
        if (qouteRequestDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.PICKUP) {
            const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
            sellerPickupLocation = yield pickupLocationRepo.findOne({ uuid: qouteRequestDetail.sellerPickupLocationUuid });
            console.log(sellerPickupLocation);
        }
        let deliveryLocation;
        if (qouteRequestDetail.orderReceiveType === OrderReceiveTypes_1.OrderReceiveTypes.DELIVERY) {
            const deliveryLocationRepo = (0, typeorm_1.getRepository)(DeliveryLocation_1.DeliveryLocation);
            deliveryLocation = yield deliveryLocationRepo.findOne({
                uuid: qouteRequestDetail.deliverAddressUuid,
            });
            console.log(deliveryLocation);
        }
        const quoteState = qouteRequestDetail.orderReceiveType === "PICKUP" ?
            (_b = sellerPickupLocation === null || sellerPickupLocation === void 0 ? void 0 : sellerPickupLocation.address) !== null && _b !== void 0 ? _b : '' : deliveryLocation === null || deliveryLocation === void 0 ? void 0 : deliveryLocation.address;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const QouteRequestDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/qouterequestresponse.html`;
        const QouteRequestMailHtmlContent = fs.readFileSync(QouteRequestDetailsMailHtmlFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: 'CinderBuild - Quote Request Response',
            html: format(QouteRequestMailHtmlContent, {
                buyerId: buyerDetail.id,
                buyerName: buyerDetail.firstName,
                buyerEmailAddress: buyerDetail.emailAddress,
                buyerPhoneNumber: buyerDetail.phoneNumber,
                sellerId: sellerDetail.id,
                sellerName: sellerDetail.firstName,
                sellerEmailAddress: sellerDetail.emailAddress,
                sellerPhoneNumber: sellerDetail.phoneNumber,
                referenceNumber: qouteRequestDetail.referenceNumber,
                quantity: qouteRequestDetail.quantity,
                productName: productDetail.name,
                OffTakeMode: qouteRequestDetail.orderReceiveType,
                PickUpState: quoteState,
                sellerPrice: sellerResponse.unitPrice,
                buyerPrice: sellerResponse.unitPriceForBuyer,
                deliveryFee: qouteRequestDetail.sellerResponse.deliveryFee ? qouteRequestDetail.sellerResponse.deliveryFee : 0,
                totalCost: qouteRequestDetail.calculatedTotalCostMajor
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sellerQouteRequestResponseMail = sellerQouteRequestResponseMail;
const sendSellerInviteToBuyer = (InviteInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const sendSellerInviteToBuyerMailHtmlFilePath = `${__dirname}/../emailTemplates/sellerinvitemail.html`;
        const sendSellerInviteToBuyerMailHtmlContent = fs.readFileSync(sendSellerInviteToBuyerMailHtmlFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const inviteLink = `https://${domain}/invite/${InviteInfo.sellerUnique}`;
        const msg = {
            to: InviteInfo.buyerEmail,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `CinderBuild - ${InviteInfo.sellerFirstName} would like to add you as a customer`,
            html: format(sendSellerInviteToBuyerMailHtmlContent, {
                buyerFirstName: InviteInfo.buyerFirstName,
                // eslint-disable-next-line no-constant-condition
                inviteLink,
                sellerFirstName: InviteInfo.sellerFirstName,
                organizaionName: InviteInfo.sellerBusinessName
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendSellerInviteToBuyer = sendSellerInviteToBuyer;
const sendBuyerAcceptInvite = (AcceptInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const sendBuyerAcceptInviteMailHtmlFilePath = `${__dirname}/../emailTemplates/buyeracceptinvite.html`;
        const sendBuyerAcceptInviteHtmlContent = fs.readFileSync(sendBuyerAcceptInviteMailHtmlFilePath, 'utf8');
        const msg = {
            to: AcceptInfo.SellerEmail,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `CinderBuild - Invite accepted`,
            html: format(sendBuyerAcceptInviteHtmlContent, {
                buyerFirstName: AcceptInfo.buyerFirstName,
                sellerFirstName: AcceptInfo.SellerFirstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendBuyerAcceptInvite = sendBuyerAcceptInvite;
const sendCustomerEnabledForPlp = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const plpEnabledHtmlFilePath = `${__dirname}/../emailTemplates/plpEnabled.html`;
        const plpEnabledHtmlContent = fs.readFileSync(plpEnabledHtmlFilePath, 'utf8');
        const msg = {
            to: customer.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: `PLP Enabled `,
            html: format(plpEnabledHtmlContent, { customerFirstName: customer.firstName }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendCustomerEnabledForPlp = sendCustomerEnabledForPlp;
const sendOrderPaymentMailToBuyer = (orderUser, title, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderPaymentMailFilePath = `${__dirname}/../emailTemplates/ordercreation.html`;
        const orderPaymentMailHtmlContent = fs.readFileSync(orderPaymentMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: orderUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(orderPaymentMailHtmlContent, {
                customerFirstName: orderUser.firstName,
                referenceNumber: (_c = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.referenceNumber) !== null && _c !== void 0 ? _c : '',
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderPaymentMailToBuyer = sendOrderPaymentMailToBuyer;
const sendOrderPaymentMailToUnregisterBuyer = (orderUser, title, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const financialRepo = (0, typeorm_1.getRepository)(FinancialTransaction_1.FinancialTransaction);
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderPaymentMailFilePath = `${__dirname}/../emailTemplates/ordercreationforunregistereduser.html`;
        const orderPaymentMailHtmlContent = fs.readFileSync(orderPaymentMailFilePath, 'utf8');
        const financialTransaction = yield financialRepo.findOne({
            where: { uuid: orderDetails.paymentTransactionUuid }
        });
        const msg = {
            to: orderUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(orderPaymentMailHtmlContent, {
                customerFirstName: orderUser.firstName,
                totalOrderAmount: orderDetails.calculatedTotalCostMajor,
                referenceNumber: (_d = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.referenceNumber) !== null && _d !== void 0 ? _d : '',
                paymentRef: financialTransaction === null || financialTransaction === void 0 ? void 0 : financialTransaction.reference,
                paymentStatus: financialTransaction === null || financialTransaction === void 0 ? void 0 : financialTransaction.paidStatus
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderPaymentMailToUnregisterBuyer = sendOrderPaymentMailToUnregisterBuyer;
const sendOrderCreationMailToSeller = (sellerUser, title, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log(orderDetails);
        console.log('----------');
        console.log('sellerUser');
        console.log(sellerUser);
        const orderCreationMailFilePath = `${__dirname}/../emailTemplates/orderpayment.html`;
        const orderCreationMailHtmlContent = fs.readFileSync(orderCreationMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderLink = `https://${domain}/seller/orders/${orderDetails.uuid}`;
        const msg = {
            to: sellerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Order Placed on Your Product",
            html: format(orderCreationMailHtmlContent, {
                customerFirstName: sellerUser.firstName,
                referenceNumber: (_e = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.referenceNumber) !== null && _e !== void 0 ? _e : '',
                OffTakeMode: (_f = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.orderReceiveType) !== null && _f !== void 0 ? _f : '',
                orderLink,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderCreationMailToSeller = sendOrderCreationMailToSeller;
const sendRequestACallMailToAdmin = (requestUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const requestACallMailMailFilePath = `${__dirname}/../emailTemplates/requestacall.html`;
        const requestACallMailHtmlContent = fs.readFileSync(requestACallMailMailFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Request A Call",
            html: format(requestACallMailHtmlContent, {
                customerFirstName: requestUser.firstName,
                customerLastName: requestUser.lastName,
                customerPhoneNumber: requestUser.msisdn,
                customerEmail: requestUser.emailAddress
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendRequestACallMailToAdmin = sendRequestACallMailToAdmin;
const sendorderAvaialableForPickMail = (buyerUser, orderDetails, orderPickupDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderAvaialableForPickupMailFilePath = `${__dirname}/../emailTemplates/orderavailableforpickup.html`;
        const orderAvaialableForPickupMailHtmlContent = fs.readFileSync(orderAvaialableForPickupMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: buyerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Available For Pickup",
            html: format(orderAvaialableForPickupMailHtmlContent, {
                customerFirstName: buyerUser.firstName,
                referenceNumber: orderDetails.referenceNumber,
                address: orderPickupDetails.address,
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendorderAvaialableForPickMail = sendorderAvaialableForPickMail;
const sendorderAvailableForDeliveryMail = (buyerUser, orderDetails, orderDeliveryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderavailablefordeliverMailFilePath = `${__dirname}/../emailTemplates/orderavailablefordelivery.html`;
        const orderavailablefordeliverMailHtmlContent = fs.readFileSync(orderavailablefordeliverMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: buyerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Available For Delivery",
            html: format(orderavailablefordeliverMailHtmlContent, {
                customerFirstName: buyerUser.firstName,
                referenceNumber: orderDetails.referenceNumber,
                address: orderDeliveryDetails.address,
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendorderAvailableForDeliveryMail = sendorderAvailableForDeliveryMail;
const sendOrderConfirmPickupMail = (buyerUser, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderconfirmpickupMailFilePath = `${__dirname}/../emailTemplates/orderconfirmpickup.html`;
        const orderconfirmpickupMailHtmlContent = fs.readFileSync(orderconfirmpickupMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: buyerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Order Picked Up Confirmation",
            html: format(orderconfirmpickupMailHtmlContent, {
                customerFirstName: buyerUser.firstName,
                referenceNumber: orderDetails.referenceNumber,
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderConfirmPickupMail = sendOrderConfirmPickupMail;
const sendOrderConfirmDeliveryMail = (buyerUser, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const orderconfirmdeliveryMailFilePath = `${__dirname}/../emailTemplates/orderconfirmdelivery.html`;
        const orderconfirmdeliveryMailHtmlContent = fs.readFileSync(orderconfirmdeliveryMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const reOrderUrl = `https://${domain}/product/${orderDetails.orderItems[0].productUuid}`;
        const msg = {
            to: buyerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Order Delivery Confirmed",
            html: format(orderconfirmdeliveryMailHtmlContent, {
                customerFirstName: buyerUser.firstName,
                referenceNumber: orderDetails.referenceNumber,
                orderTrackURL,
                reOrderUrl
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendOrderConfirmDeliveryMail = sendOrderConfirmDeliveryMail;
const sendQouteRequestMailSeller = (sellerUser, qouteRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const qouteRequestMailFilePath = `${__dirname}/../emailTemplates/qouterequesttoseller.html`;
        const qouteRequestMailHtmlContent = fs.readFileSync(qouteRequestMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const qouteRequestDetailsURL = `https://${domain}/seller/quote-request/${qouteRequestDetails.uuid}`;
        const msg = {
            to: sellerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Quote Request Raised",
            html: format(qouteRequestMailHtmlContent, {
                customerFirstName: sellerUser.firstName,
                referenceNumber: qouteRequestDetails.referenceNumber,
                productName: qouteRequestDetails.product.name,
                quantity: qouteRequestDetails.quantity,
                qouteRequestDetailsURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendQouteRequestMailSeller = sendQouteRequestMailSeller;
const sendQouteRequestResponseMailResponse = (buyerUser, qouteRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const qouteRequestResponseMailFilePath = `${__dirname}/../emailTemplates/quoterequestresponsebuyer.html`;
        const qouteRequestResponseMailHtmlContent = fs.readFileSync(qouteRequestResponseMailFilePath, 'utf8');
        const qouteRequestDetailsURL = process.env.NODE_ENV === constants_1.ProductionEnv ? `https://www.cinderbuild.com/buyer/my-quotes/details/${qouteRequestDetails.uuid}` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/buyer/my-quotes/details/${qouteRequestDetails.uuid}`;
        const msg = {
            to: buyerUser.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Quote Request Response",
            html: format(qouteRequestResponseMailHtmlContent, {
                customerFirstName: buyerUser.firstName,
                referenceNumber: qouteRequestDetails.referenceNumber,
                productName: qouteRequestDetails.product.name,
                quantity: qouteRequestDetails.quantity,
                buyerPrice: Utils.CurrencyFormatter(qouteRequestDetails.sellerResponse.unitPriceForBuyer),
                deliveryFee: qouteRequestDetails.sellerResponse.deliveryFee ? Utils.CurrencyFormatter(qouteRequestDetails.sellerResponse.deliveryFee) : 0,
                totalCost: Utils.CurrencyFormatter(qouteRequestDetails.calculatedTotalCostMajor),
                qouteRequestDetailsURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendQouteRequestResponseMailResponse = sendQouteRequestResponseMailResponse;
const sendMailtoAdminOnPLPApplication = (plpUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const productleaseprogramMailFilePath = `${__dirname}/../emailTemplates/plpApplication.html`;
        const productleaseprogramMailHtmlContent = fs.readFileSync(productleaseprogramMailFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Application For Product Lease Program",
            html: format(productleaseprogramMailHtmlContent, {
                customerFirstName: plpUser.firstName,
                cuatomerLastName: plpUser.lastName,
                accountId: plpUser.id,
                phoneNumber: plpUser.msisdn,
                emailAddress: plpUser.emailAddress,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendMailtoAdminOnPLPApplication = sendMailtoAdminOnPLPApplication;
const sendPODConfirmationMail = (buyerDetails, locationDetails, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const podConfirmationMailFilePath = `${__dirname}/../emailTemplates/podconfirmation.html`;
        const podConfirmationMailHtmlContent = fs.readFileSync(podConfirmationMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: buyerDetails.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Pay On Delivery Order Confirmation",
            html: format(podConfirmationMailHtmlContent, {
                orderReference: orderDetails.referenceNumber,
                customerFirstName: buyerDetails.firstName,
                address: locationDetails.address,
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPODConfirmationMail = sendPODConfirmationMail;
const sendPODNotificationToSellerMail = (sellerDetails, locationDetails, orderDetails, buyerDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const podConfirmationMailFilePath = `${__dirname}/../emailTemplates/podNotificationSeller.html`;
        const podConfirmationMailHtmlContent = fs.readFileSync(podConfirmationMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackLink = `https://${domain}/seller/orders/${orderDetails.uuid}`;
        const msg = {
            to: sellerDetails.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Pay On Delivery Order Confirmation",
            html: format(podConfirmationMailHtmlContent, {
                orderReference: orderDetails.referenceNumber,
                sellerFirstName: sellerDetails.firstName,
                address: locationDetails.address,
                customerfirstName: buyerDetails.firstName,
                customerLastname: buyerDetails.lastName,
                customerPhoneNumber: buyerDetails.msisdn,
                PaymentStatus: orderDetails.paymentStatus,
                PaymentMethod: orderDetails.paymentVariant,
                orderTrackLink
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPODNotificationToSellerMail = sendPODNotificationToSellerMail;
const sendPODPaymentNotificationtoBuyerMail = (buyerDetails, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const podPaymentNotificationMailFilePath = `${__dirname}/../emailTemplates/podpaymentbuyer.html`;
        const podPaymentNotificationMailHtmlContent = fs.readFileSync(podPaymentNotificationMailFilePath, 'utf8');
        const domain = Utils.serverDomain();
        const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;
        const msg = {
            to: buyerDetails.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Pay On Delivery Order Payment Notification",
            html: format(podPaymentNotificationMailHtmlContent, {
                orderReference: orderDetails.referenceNumber,
                orderAmount: orderDetails.calculatedTotalCostMajor,
                customerfirstName: buyerDetails.firstName,
                orderTrackURL
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendPODPaymentNotificationtoBuyerMail = sendPODPaymentNotificationtoBuyerMail;
const sendWithdrawalRequestToSupport = (currentUser, userWallet, userBankInfo, wihdrawalAmount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const widthdrawalRequestMailFilePath = `${__dirname}/../emailTemplates/widthrawalrequest.html`;
        const widthdrawalRequestMailHtmlContent = fs.readFileSync(widthdrawalRequestMailFilePath, 'utf8');
        const userWalletBlanaceMajor = Utils.normalizeMoney(userWallet.walletBalanceMinor / 100);
        const withdrawalAmount = Utils.normalizeMoney(wihdrawalAmount);
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Withdrawal Request",
            html: format(widthdrawalRequestMailHtmlContent, {
                userId: currentUser.id,
                walletBalance: Utils.CurrencyFormatter(userWalletBlanaceMajor),
                withdrawalAmount: Utils.CurrencyFormatter(withdrawalAmount),
                bankName: userBankInfo.bankName,
                bankCode: userBankInfo.bankCode,
                bankAccountNumber: userBankInfo.bankAccountNumber,
                bankAccountName: userBankInfo.bankAccountName,
                emailAddress: currentUser.emailAddress,
                phoneNumber: currentUser.msisdn
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendWithdrawalRequestToSupport = sendWithdrawalRequestToSupport;
const sendNewAccountLevelAdded = (addedUser, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeAccountLevelMailFilePath = `${__dirname}/../emailTemplates/welcomeAccountLevel.html`;
        const welcomeAccountLevelMailHtmlContent = fs.readFileSync(welcomeAccountLevelMailFilePath, 'utf8');
        const msg = {
            to: addedUser.emailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(welcomeAccountLevelMailHtmlContent, {
                userId: addedUser.id,
                customerFirstName: addedUser.firstName
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendNewAccountLevelAdded = sendNewAccountLevelAdded;
const sendNewWareHouseLevelAdded = (addedUser, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/welcomeWarehouseLevel.html`;
        const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8');
        const msg = {
            to: addedUser.emailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(welcomeWarehouseLevelMailHtmlContent, {
                userId: addedUser.id,
                customerFirstName: addedUser.firstName
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendNewWareHouseLevelAdded = sendNewWareHouseLevelAdded;
const sendDeliveryFeeSetMail = (user, title, mailDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/deliveryfeeset.html`;
        const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8');
        const msg = {
            to: user.emailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(welcomeWarehouseLevelMailHtmlContent, {
                customerFirstName: user.firstName,
                siteName: mailDetails === null || mailDetails === void 0 ? void 0 : mailDetails.siteName,
                deliveryRequestAmount: mailDetails === null || mailDetails === void 0 ? void 0 : mailDetails.deliveryRequestAmount
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendDeliveryFeeSetMail = sendDeliveryFeeSetMail;
const sendDeliveryRequestToSiteAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/deliveryrequestadminmail.html`;
        const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "WareHouse to Site Delivery Request",
            html: format(welcomeWarehouseLevelMailHtmlContent, {
                userId: user.id
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendDeliveryRequestToSiteAdmin = sendDeliveryRequestToSiteAdmin;
const procurementListAcknowledgementMail = (user, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const procurementListAcknowledgementMailFilePath = `${__dirname}/../emailTemplates/precurmentaknoledgemail.html`;
        const procurementListAcknowledgementMailHtmlContent = fs.readFileSync(procurementListAcknowledgementMailFilePath, 'utf8');
        const msg = {
            to: user.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: title,
            html: format(procurementListAcknowledgementMailHtmlContent, {
                customerFirstName: user.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.procurementListAcknowledgementMail = procurementListAcknowledgementMail;
const sendProcurmentUploadMailToAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const procurmentListUploadMailFilePath = `${__dirname}/../emailTemplates/precurementuploadmailtoadmin.html`;
        const procurmentListUploadMailHtmlContent = fs.readFileSync(procurmentListUploadMailFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Procurment List Uploaded",
            html: format(procurmentListUploadMailHtmlContent, {
                accountId: user.accountId
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendProcurmentUploadMailToAdmin = sendProcurmentUploadMailToAdmin;
const sendProcurmentInvoiceIsReady = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const ProcurmentInvoiceIsReadyMailFilePath = `${__dirname}/../emailTemplates/procurmentinvoiceisready.html`;
        const ProcurmentInvoiceIsReadyMailHtmlContent = fs.readFileSync(ProcurmentInvoiceIsReadyMailFilePath, 'utf8');
        const msg = {
            to: user.emailAddress,
            cc: defaultMailAddress,
            from: "admin@cinderbuild.com",
            subject: "Your invoice is ready",
            html: format(ProcurmentInvoiceIsReadyMailHtmlContent, {
                customerFirstName: user.firstName,
            }),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendProcurmentInvoiceIsReady = sendProcurmentInvoiceIsReady;
const sendTestMailForCronJob = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const AgendaReadyMailFilePath = `${__dirname}/../emailTemplates/testmail.html`;
        const agendaReadyMailHtmlContent = fs.readFileSync(AgendaReadyMailFilePath, 'utf8');
        const msg = {
            to: defaultMailAddress,
            cc: 'mubarak.aminu@cinderbuild.com',
            from: "admin@cinderbuild.com",
            subject: "Cron Job Agenda Test",
            html: format(agendaReadyMailHtmlContent, {}),
        };
        yield sgMail.send(msg);
        return true;
    }
    catch (e) {
        logger_1.default.error('Sendgrid error: ', e.message);
        return false;
    }
});
exports.sendTestMailForCronJob = sendTestMailForCronJob;
const sendNotificationToUserViaMailForQouteR = (user, notificationType, title, qouteRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
    if (notificationType === NotificationMessageTypes_1.default.QOUTE_REQUEST_RAISED) {
        const sendQouteRequestToSeller = yield (0, exports.sendQouteRequestMailSeller)(user, qouteRequestDetails);
        console.log(sendQouteRequestToSeller);
    }
    if (notificationType === NotificationMessageTypes_1.default.QUOTE_REQUEST_SELLER_RESPONSE) {
        const qouteRequestResponseToBuyer = yield (0, exports.sendQouteRequestResponseMailResponse)(user, qouteRequestDetails);
        console.log(qouteRequestResponseToBuyer);
    }
});
exports.sendNotificationToUserViaMailForQouteR = sendNotificationToUserViaMailForQouteR;
const sendNotificationToUserForWareHouseviaMail = (user, notificationType, title, mailDetails) => __awaiter(void 0, void 0, void 0, function* () {
    // sendDeliveryFeeSetMail
    if (notificationType === NotificationMessageTypes_1.default.WAREHOUSE_TO_SITE_DELIVERY_FEE_SET) {
        const mailToUserWHenDeliveryFeeIsSet = yield (0, exports.sendDeliveryFeeSetMail)(user, title, mailDetails);
        console.log(mailToUserWHenDeliveryFeeIsSet);
    }
});
exports.sendNotificationToUserForWareHouseviaMail = sendNotificationToUserForWareHouseviaMail;
const sendNotificationToUserForProjectMail = (project, user, notificationType, title) => __awaiter(void 0, void 0, void 0, function* () {
    // sendProjectApprovalRequestMail
    if (notificationType === NotificationMessageTypes_1.default.ESTATE_PROJECT_APPROVAL_REQUEST) {
        const mailToAdminForProjectApproval = yield (0, exports.sendProjectApprovalRequestMail)(user, project);
        console.log(mailToAdminForProjectApproval);
    }
    if (notificationType === NotificationMessageTypes_1.default.ESTATE_PROJECT_DECLINED) {
        const mailToAdminForProjectApproval = yield (0, exports.sendProjectApprovalRequestDeclineMail)(user, project);
        console.log(mailToAdminForProjectApproval);
    }
    if (notificationType === NotificationMessageTypes_1.default.ESTATE_PROJECT_APPROVED) {
        const mailToAdminForProjectApproval = yield (0, exports.sendProjectApprovalRequestApprovalMail)(user, project);
        console.log(mailToAdminForProjectApproval);
    }
});
exports.sendNotificationToUserForProjectMail = sendNotificationToUserForProjectMail;
const sendNotificationToUserViaMail = (user, notificationType, title, orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const pickupLocationRepo = connection.getRepository(PickupLocation_1.PickupLocation);
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation_1.DeliveryLocation);
    const userRepo = connection.getRepository(User_1.User);
    if (notificationType === NotificationMessageTypes_1.default.NEW_ACCOUNT_LEVEL_USER_ADDED) {
        // 
        yield (0, exports.sendNewAccountLevelAdded)(user, title);
    }
    if (notificationType === NotificationMessageTypes_1.default.NEW_WAREHOUSE_LEVEL_USER_ADDED) {
        yield (0, exports.sendNewWareHouseLevelAdded)(user, title);
    }
    if (notificationType === NotificationMessageTypes_1.default.ORDER_PAYMENT_IN_ESCROW) {
        const sendorderPayment = yield (0, exports.sendOrderPaymentMailToBuyer)(user, title, orderDetails);
        console.log(sendorderPayment);
    }
    if (notificationType === NotificationMessageTypes_1.default.ORDER_CREATED) {
        const oderCretion = yield (0, exports.sendOrderCreationMailToSeller)(user, title, orderDetails);
    }
    if (notificationType === NotificationMessageTypes_1.default.ENABLE_PLP) {
        const enableForPLP = yield (0, exports.sendCustomerEnabledForPlp)(user);
        console.log(enableForPLP);
    }
    if (notificationType === NotificationMessageTypes_1.default.ORDER_AVAILABLE_FOR_PICKUP) {
        const orderPickupDetails = yield pickupLocationRepo.findOne({ id: orderDetails.pickupLocationId });
        const sendorderPickupMail = yield (0, exports.sendorderAvaialableForPickMail)(user, orderDetails, orderPickupDetails);
        console.log(sendorderPickupMail);
    }
    if (notificationType === NotificationMessageTypes_1.default.ORDER_AVAILABLE_FOR_DELIVERY) {
        const orderDeliveryDetails = yield deliveryLocationRepo.findOne({ id: orderDetails.deliveryLocationId });
        const orderAvailableForDeliveryMail = yield (0, exports.sendorderAvailableForDeliveryMail)(user, orderDetails, orderDeliveryDetails);
        console.log(orderAvailableForDeliveryMail);
    }
    if (notificationType === NotificationMessageTypes_1.default.CONFIRMED_PICKUP) {
        const orderConfirmPickupyMail = yield (0, exports.sendOrderConfirmPickupMail)(user, orderDetails);
        console.log(orderConfirmPickupyMail);
    }
    if (notificationType === NotificationMessageTypes_1.default.CONFIRMED_DELIVERY) {
        const orderConfirmDeliveryMail = yield (0, exports.sendOrderConfirmDeliveryMail)(user, orderDetails);
        console.log('orderConfirmDeliveryMail', orderConfirmDeliveryMail);
    }
    if (notificationType === NotificationMessageTypes_1.default.ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER) {
        const orderConfirmMailToUnregistredUser = yield (0, exports.sendOrderPaymentMailToUnregisterBuyer)(user, title, orderDetails);
        console.log('orderConfirmMailToUnregistredUser', orderConfirmMailToUnregistredUser);
    }
    if (notificationType === NotificationMessageTypes_1.default.POD_ORDER_CONFIRMATION) {
        if (orderDetails.pickupLocationId) {
            const locationDetails = yield pickupLocationRepo.findOne({ id: orderDetails.pickupLocationId });
            yield (0, exports.sendPODConfirmationMail)(user, locationDetails, orderDetails);
        }
        else if (orderDetails.deliveryLocationId) {
            const locationDetails = yield deliveryLocationRepo.findOne({ id: orderDetails.deliveryLocationId });
            yield (0, exports.sendPODConfirmationMail)(user, locationDetails, orderDetails);
        }
    }
    if (notificationType === NotificationMessageTypes_1.default.POD_ORDER_NOTIFCATION) {
        const buyerDetails = yield userRepo.findOne({ id: orderDetails.buyerUserId });
        if (orderDetails.pickupLocationId) {
            const locationDetails = yield pickupLocationRepo.findOne({ id: orderDetails.pickupLocationId });
            yield (0, exports.sendPODNotificationToSellerMail)(user, locationDetails, orderDetails, buyerDetails);
        }
        else if (orderDetails.deliveryLocationId) {
            const locationDetails = yield deliveryLocationRepo.findOne({ id: orderDetails.deliveryLocationId });
            yield (0, exports.sendPODNotificationToSellerMail)(user, locationDetails, orderDetails, buyerDetails);
        }
    }
    if (notificationType === NotificationMessageTypes_1.default.POD_ORDER_PAYMENT_NOTIFICATION) {
        yield (0, exports.sendPODPaymentNotificationtoBuyerMail)(user, orderDetails);
    }
    if (notificationType === NotificationMessageTypes_1.default.PROCURMENT_LIST_UPLOADED) {
        yield (0, exports.procurementListAcknowledgementMail)(user, title);
    }
});
exports.sendNotificationToUserViaMail = sendNotificationToUserViaMail;
//# sourceMappingURL=emailService.js.map