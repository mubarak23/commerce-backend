/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const format = require("string-template")
import * as fs from 'fs';

import { getRepository } from 'typeorm';
import * as Constant from "../constants";
import { ProductionEnv } from '../constants';
import { getFreshConnection } from '../db';
import { MailForDeliveryConfirmationDto } from '../dto/MailForDeliveryConfirmationDto';
import { DeliveryLocation } from '../entity/DeliveryLocation';
import { FinancialTransaction } from '../entity/FinancialTransaction';
import { Order } from '../entity/Order';
import { PaystackDedicatedNuban } from '../entity/PaystackDedicatedNuban';
import { PickupLocation } from '../entity/PickupLocation';
import { PriceMatrix } from '../entity/PriceMatrix';
import { Product } from '../entity/Product';
import { Project } from '../entity/Project';
import { QuoteRequest } from '../entity/QuoteRequest';
import { User } from '../entity/User';
import { Wallet } from '../entity/Wallet';
import NotificationMessageTypes from '../enums/NotificationMessageTypes';
import { OrderReceiveTypes } from '../enums/OrderReceiveTypes';
import { CartItemJson } from '../interfaces/CartItemJson';
import { CooperateMailData } from '../interfaces/CooperateMailData';
import { DeveloperMailInfo } from '../interfaces/DeveloperMailInfo';
import { IBankInfo } from '../interfaces/IBankInfo';
import { IBuyerAccept } from '../interfaces/IBuyerAccept';
import { IBuyerInvite } from '../interfaces/IBuyerInvite';
import { MonoPaymentLinkRequest } from '../interfaces/MonoPaymentLinkRequest';
import { OtpMailInfo } from '../interfaces/OtpMailInfo';
import { WelcomeMailData } from '../interfaces/WelcomeMailData';
import logger from '../logger';
import * as Utils from "../utils/core";


const defaultMailAddress = process.env.NODE_ENV === ProductionEnv ? 'cb_support@cinderbuild.com' : 'noreply@cinderbuild.com';


export const sendCustomerOtp = async (userMailInfo: OtpMailInfo): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/otpmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')

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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendMonoPaymentApprovalLink = async (userMailInfo: MonoPaymentLinkRequest ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/monopaymentlinkmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')

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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendDeveloperAccountAwaitApprovalMail = async (userMailInfo: DeveloperMailInfo ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountpendingapproval.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
    const dashboardLink  = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login` 
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendDeveloperAccountApprovalMail = async (userMailInfo: DeveloperMailInfo ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountapprovemail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
    const dashboardLink  = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/login` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/login` 
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendProjectApprovalRequestMail = async (userMailInfo: User, project: Project): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/developeraccountapprovemail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendProjectApprovalRequestDeclineMail = async (userMailInfo: User, project: Project): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/projectapprovaldeclinemail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendProjectApprovalRequestApprovalMail = async (userMailInfo: User, project: Project): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/projectapprovalrequestgranted.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}




export const sendPriceMatrixForApproval = async (priceMatricData: PriceMatrix, virtualAccount: PaystackDedicatedNuban, buyerWallet: Wallet): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // managment email 
    
    const topLevel0 = process.env.NODE_ENV === ProductionEnv ?  'paul.adeyoyin@cinderbuild.com' : 'izundu.emmie@cinderbuild.com';
    const topLevel1 = process.env.NODE_ENV === ProductionEnv ?  'femi.adebiyi@cinderbuild.com' : 'mubarak.aminu@cinderbuild.com'; 
    const approvalUrl = process.env.NODE_ENV === ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/approve/${priceMatricData.id}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/approve/${priceMatricData.id}`
    const declineUrl = process.env.NODE_ENV === ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/decline/${priceMatricData.id}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/decline/${priceMatricData.id}`
    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/sendpricematrixforapprovalmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
    const product01 =  process.env.NODE_ENV === ProductionEnv ?  'izundu.emmie@cinderbuild.com': 'noreply@cinderbuild.com'
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
        productCostPrice:  Utils.CurrencyFormatter(Utils.normalizeMoney(priceMatricData.productCostPriceMajor)),
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}
export const sendPriceMatricForDeliveryConfirmation = async (mailForDeliveryConfirmation: MailForDeliveryConfirmationDto): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/pricematrixOrderdeliveryconfirmationmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
    const confirmDeliveryurl = process.env.NODE_ENV === ProductionEnv ? `https://octopus-app-tcqnl.ondigitalocean.app/api/pricematrix/confirmdelivery/${mailForDeliveryConfirmation.priceMatrixId}` : `https://cinderbuild-backend-dev-xh9or.ondigitalocean.app/api/pricematrix/confirmdelivery/${mailForDeliveryConfirmation.priceMatrixId}`
    const topLevel0 = 'victoria.ezekafor@cinderbuild.com';
    const topLevel1 = 'ayodele.oluwaleimu@cinderbuild.com';
    const product01 = 'izundu.emmie@cinderbuild.com'
    // 'confirmdelivery'
    const msg = {
      to: topLevel0, 
      cc: topLevel1,
      bcc:product01,
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendDeclinedPriceMatrix = async (declineMailData: any): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/declinepricematrixmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
    const topLevel0 = process.env.NODE_ENV === ProductionEnv ?  Constant.SUPPORT_EMAIL : 'noreply@cinderbuild.com';
    
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}




export const sendApprovePriceMatrix = async (priceMatricData: PriceMatrix, virtualAccount: PaystackDedicatedNuban, buyerWallet: Wallet): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/sendapprovepricematrixmail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendCustomerForgetPasswordOtp = async (userMailInfo: OtpMailInfo): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const otpMailHtmlFilePath = `${__dirname}/../emailTemplates/forgetPasswordOtpMail.html`    
    const otpMailHtmlContent = fs.readFileSync(otpMailHtmlFilePath, 'utf8')

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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendWelcomeMail = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomemail.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')
    
        const msg = {
          to: userMailInfo.email,
          cc: defaultMailAddress,  // "cb_support@cinderbuild.com",
          from: "admin@cinderbuild.com",
          subject: `Welcome to CinderBuild`,
          html: format(welcomeMailHtmlContent, {
            customerFirstName: userMailInfo.firstName,
          }),
        
        };
     
    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendWelcomeMailToSeller = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailtoseller.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')
    
        const msg = {
          to: userMailInfo.email,
          cc: defaultMailAddress,  // "cb_support@cinderbuild.com",
          from: "admin@cinderbuild.com",
          subject: `Welcome to CinderBuild`,
          html: format(welcomeMailHtmlContent, {
            customerFirstName: userMailInfo.firstName,
          }),
        
        };
     
    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const AffiliateSendWelcomeMail = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailAffiliateHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailforaffiliate.html`    
    const welcomeMailAffiliateHtmlContent = fs.readFileSync(welcomeMailAffiliateHtmlFilePath, 'utf8')
      const  msg = {
          to: userMailInfo.email,
          cc: defaultMailAddress,  // "cb_support@cinderbuild.com",
          from: "admin@cinderbuild.com",
          subject: `Welcome to CinderBuild Affiliate Program`,
          html: format(welcomeMailAffiliateHtmlContent, {
            customerFirstName: userMailInfo.firstName,
          }),
        };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendCooperateWelcomeMail = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailCooperateHtmlFilePath = `${__dirname}/../emailTemplates/welcomemailforcooperate.html`    
    const welcomeMailCooperateHtmlContent = fs.readFileSync(welcomeMailCooperateHtmlFilePath, 'utf8')
    const  msg = {
          to: userMailInfo.email,
          cc: defaultMailAddress, 
          from: "admin@cinderbuild.com",
          subject: `Welcome to CinderBuild for Corporates`,
          html: format(welcomeMailCooperateHtmlContent, {
            customerFirstName: userMailInfo.firstName,
          }),
        };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendCooperateDiscountMail = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const discounteHtmlFilePath = `${__dirname}/../emailTemplates/cooperatediscountmail.html`    
    const discountHtmlContent = fs.readFileSync(discounteHtmlFilePath, 'utf8')
      const  msg = {
          to: userMailInfo.email,
          cc: defaultMailAddress, 
          from: "admin@cinderbuild.com",
          subject: `CinderBuild Corporate Discount - Secondary Wallet`,
          html: format(discountHtmlContent, {
            customerFirstName: userMailInfo.firstName,
          }),
        };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendAffiliateWelcomeMail = async (userMailInfo: WelcomeMailData, newPassword: string): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/affiliatewelcomemail.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')

    const msg = {
      to: userMailInfo.email,
      bcc:'izundu.emmie@cinderbuild.com', // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: `Welcome to CinderBuild`,
      html: format(welcomeMailHtmlContent, {
        customerFirstName: userMailInfo.firstName,
        customerPhoneNumber: userMailInfo.phoneNumber,
        password: newPassword,
      }),
    };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendsellerAdminWelcomeMail = async (userMailInfo: WelcomeMailData, newPassword: string): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/selleradminwelcomemail.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')

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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendOMAAdminWelcomeMail = async (userMailInfo: WelcomeMailData, newPassword: string): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/omaadminwelcomemail.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')

    const msg = {
      to: 'cb_support@cinderbuild.com',
      cc:'izundu.emmie@cinderbuild.com', // "cb_support@cinderbuild.com",
      bbc: 'tofunmi.adeola@cinderbuild.com',
      from: "admin@cinderbuild.com",
      subject: `Welcome to CinderBuild - OMA `,
      html: format(welcomeMailHtmlContent, {
        customerFirstName: userMailInfo.firstName,
        customerPhoneNumber: userMailInfo.phoneNumber,
        password: newPassword,
      }),
    };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}



export const sendWelcomeMailToCooperateUser = async (userMailInfo: WelcomeMailData, newPassword: string): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const welcomeMailHtmlFilePath = `${__dirname}/../emailTemplates/welcomecooperateuser.html`    
    const welcomeMailHtmlContent = fs.readFileSync(welcomeMailHtmlFilePath, 'utf8')

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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const howToShopMail = async (userMailInfo: WelcomeMailData): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const howToSellMailHtmlFilePath = `${__dirname}/../emailTemplates/howtosellmail.html`    
    const howToSellMailHtmlContent = fs.readFileSync(howToSellMailHtmlFilePath, 'utf8')
    console.log(userMailInfo)
    const msg = {
      to: userMailInfo.email,
      cc:  defaultMailAddress,  // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: `How To Shop - Cinderbuild`,
      html: format(howToSellMailHtmlContent, {
        customerFirstName: userMailInfo.firstName,
      }),
    };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}



export const sendPromotionalMail = async (userMailInfo: User): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const promotionalMailHtmlFilePath = `${__dirname}/../emailTemplates/promotionalmail.html`    
    const promotionalMailHtmlContent = fs.readFileSync(promotionalMailHtmlFilePath, 'utf8')

    const msg = {
      to: userMailInfo.emailAddress,
      cc:  defaultMailAddress,  // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: `We are LIVE! Get BIG discounts on Dangote, Lafarge & BUA`,
      html: format(promotionalMailHtmlContent, {
        customerFirstName: userMailInfo.firstName,
      }),
    };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendOrderDetailsMailtoAdmin = async (buyerDetail: User, orderDetail: Order): Promise<boolean> => {
  try {
    const firstOrderItem: CartItemJson = orderDetail.orderItems[0]
    const firstProductUuid = firstOrderItem.productUuid

    const connection = await getFreshConnection()
    const productRepo = await connection.getRepository(Product)
    const firstProduct = await productRepo.findOne({
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
    })
    if(!firstProduct) {
      return false
    }
    const sellerUser = firstProduct.user

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const OrderDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/orderdetailmail.html`    
    const OrderDetailsMailHtmlContent = fs.readFileSync(OrderDetailsMailHtmlFilePath, 'utf8')

    const msg = {
      to: defaultMailAddress, // "cb_support@cinderbuild.com",
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendUnregisterUserOrderDetailsMailtoAdmin = async (buyerDetail: User, orderDetail: Order, reference: string, paymentStatus: string): Promise<boolean> => {
  try {
    const firstOrderItem: CartItemJson = orderDetail.orderItems[0]
    const firstProductUuid = firstOrderItem.productUuid

    const connection = await getFreshConnection()
    const productRepo = await connection.getRepository(Product)
    const firstProduct = await productRepo.findOne({
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
    })
    if(!firstProduct) {
      return false
    }
    const sellerUser = firstProduct.user

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const OrderDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/orderdetailsforunregisteredusermail.html`    
    const OrderDetailsMailHtmlContent = fs.readFileSync(OrderDetailsMailHtmlFilePath, 'utf8')

    const msg = {
      to: defaultMailAddress, // "cb_support@cinderbuild.com",
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendQouteRequestDetailsMail = async (buyerDetail:User, 
    qouteRequestDetail: QuoteRequest, sellerDetail: User, productDetail: Product): Promise<boolean> => {
  try {
    let sellerPickupLocation: PickupLocation | undefined
    if(qouteRequestDetail.orderReceiveType === OrderReceiveTypes.PICKUP){
      const pickupLocationRepo = getRepository(PickupLocation);
      sellerPickupLocation = await pickupLocationRepo.findOne({ uuid: qouteRequestDetail.sellerPickupLocationUuid})
      console.log(sellerPickupLocation)
    }

    let deliveryLocation: DeliveryLocation | undefined;
    if(qouteRequestDetail.orderReceiveType === OrderReceiveTypes.DELIVERY){
      const deliveryLocationRepo = getRepository(DeliveryLocation);
      deliveryLocation = await deliveryLocationRepo.findOne({
        uuid: qouteRequestDetail.deliverAddressUuid,
      });
      console.log(deliveryLocation)
    }
  
    const quoteState = qouteRequestDetail.orderReceiveType === "PICKUP" ? 
      sellerPickupLocation?.address ?? '' : deliveryLocation?.address
    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const QouteRequestDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/qouterequestmail.html`    
    const QouteRequestMailHtmlContent = fs.readFileSync(QouteRequestDetailsMailHtmlFilePath, 'utf8')

    const msg = {
      to: defaultMailAddress, // "cb_support@cinderbuild.com",
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sellerQouteRequestResponseMail = async (sellerDetail:User, 
  qouteRequestDetail: QuoteRequest, buyerDetail: User, productDetail: Product, sellerResponse: any): Promise<boolean> => {
try {
  let sellerPickupLocation: PickupLocation | undefined;
  if(qouteRequestDetail.orderReceiveType === OrderReceiveTypes.PICKUP){
    const pickupLocationRepo = getRepository(PickupLocation);
    sellerPickupLocation = await pickupLocationRepo.findOne({ uuid: qouteRequestDetail.sellerPickupLocationUuid})
    console.log(sellerPickupLocation)
  }
  let deliveryLocation: DeliveryLocation | undefined;
  if(qouteRequestDetail.orderReceiveType === OrderReceiveTypes.DELIVERY){
    const deliveryLocationRepo = getRepository(DeliveryLocation);
    deliveryLocation = await deliveryLocationRepo.findOne({
      uuid: qouteRequestDetail.deliverAddressUuid,
    });
    console.log(deliveryLocation)
  }
  
  

  const quoteState = qouteRequestDetail.orderReceiveType === "PICKUP" ? 
    sellerPickupLocation?.address ?? '' : deliveryLocation?.address
  
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const QouteRequestDetailsMailHtmlFilePath = `${__dirname}/../emailTemplates/qouterequestresponse.html`    
  const QouteRequestMailHtmlContent = fs.readFileSync(QouteRequestDetailsMailHtmlFilePath, 'utf8')

  const msg = {
     to: defaultMailAddress, // "cb_support@cinderbuild.com",
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
      PickUpState:  quoteState,
      sellerPrice: sellerResponse.unitPrice,
      buyerPrice: sellerResponse.unitPriceForBuyer, 
      deliveryFee: qouteRequestDetail.sellerResponse.deliveryFee ? qouteRequestDetail.sellerResponse.deliveryFee : 0,
      totalCost: qouteRequestDetail.calculatedTotalCostMajor
    }),
  };

  await sgMail.send(msg)
  return true
} catch (e) {
  logger.error('Sendgrid error: ', e.message)
  return false
}
}




export const sendSellerInviteToBuyer= async (InviteInfo: IBuyerInvite): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const sendSellerInviteToBuyerMailHtmlFilePath = `${__dirname}/../emailTemplates/sellerinvitemail.html`    
    const sendSellerInviteToBuyerMailHtmlContent = fs.readFileSync(sendSellerInviteToBuyerMailHtmlFilePath, 'utf8')
    const domain = Utils.serverDomain()
    const inviteLink = `https://${domain}/invite/${InviteInfo.sellerUnique}`

    const msg = {
      to: InviteInfo.buyerEmail,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
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

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendBuyerAcceptInvite = async (AcceptInfo: IBuyerAccept): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const sendBuyerAcceptInviteMailHtmlFilePath = `${__dirname}/../emailTemplates/buyeracceptinvite.html`    
    const sendBuyerAcceptInviteHtmlContent = fs.readFileSync(sendBuyerAcceptInviteMailHtmlFilePath, 'utf8')

    const msg = {
      to: AcceptInfo.SellerEmail,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: `CinderBuild - Invite accepted`,
      html: format(sendBuyerAcceptInviteHtmlContent, {
        buyerFirstName: AcceptInfo.buyerFirstName,
        sellerFirstName: AcceptInfo.SellerFirstName,
      }),
    };

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendCustomerEnabledForPlp = async (customer: User): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const plpEnabledHtmlFilePath = `${__dirname}/../emailTemplates/plpEnabled.html`    
    const plpEnabledHtmlContent = fs.readFileSync(plpEnabledHtmlFilePath, 'utf8')

    const msg = {
      to: customer.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: `PLP Enabled `,
      html: format(plpEnabledHtmlContent, {customerFirstName: customer.firstName}),
    }
    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendOrderPaymentMailToBuyer = async (orderUser: User, title: string, orderDetails: Order): Promise<boolean> => {
  try {    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const orderPaymentMailFilePath = `${__dirname}/../emailTemplates/ordercreation.html`    
    const orderPaymentMailHtmlContent = fs.readFileSync(orderPaymentMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`
    const msg = {
      to: orderUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(orderPaymentMailHtmlContent, {
        customerFirstName: orderUser.firstName, 
        referenceNumber: orderDetails?.referenceNumber ?? '',
        orderTrackURL
      }),
    }
    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendOrderPaymentMailToUnregisterBuyer = async (orderUser: User, title: string, orderDetails: Order): Promise<boolean> => {
  try {    
    const financialRepo = getRepository(FinancialTransaction)
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const orderPaymentMailFilePath = `${__dirname}/../emailTemplates/ordercreationforunregistereduser.html`    
    const orderPaymentMailHtmlContent = fs.readFileSync(orderPaymentMailFilePath, 'utf8')
    const financialTransaction = await financialRepo.findOne({
      where: {uuid: orderDetails.paymentTransactionUuid }
    })

    const msg = {
      to: orderUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(orderPaymentMailHtmlContent, {
        customerFirstName: orderUser.firstName, 
        totalOrderAmount: orderDetails.calculatedTotalCostMajor,
        referenceNumber: orderDetails?.referenceNumber ?? '',
        paymentRef: financialTransaction?.reference,
        paymentStatus: financialTransaction?.paidStatus
       
      }),
    }
    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}



export const sendOrderCreationMailToSeller = async (sellerUser: User, title: string, orderDetails: Order): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(orderDetails)
    console.log('----------')
    console.log('sellerUser')
    console.log(sellerUser)
    const orderCreationMailFilePath = `${__dirname}/../emailTemplates/orderpayment.html`    
    const orderCreationMailHtmlContent = fs.readFileSync(orderCreationMailFilePath, 'utf8')
    const domain = Utils.serverDomain()
    const orderLink = `https://${domain}/seller/orders/${orderDetails.uuid}`
    
    const msg = {
      to: sellerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Order Placed on Your Product",
      html: format(orderCreationMailHtmlContent, {
        customerFirstName: sellerUser.firstName, 
        referenceNumber: orderDetails?.referenceNumber ?? '', 
        OffTakeMode: orderDetails?.orderReceiveType ?? '',
        orderLink,
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendRequestACallMailToAdmin = async (requestUser: User): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const requestACallMailMailFilePath = `${__dirname}/../emailTemplates/requestacall.html`    
    const requestACallMailHtmlContent = fs.readFileSync(requestACallMailMailFilePath, 'utf8')
    
    const msg = {
      to: defaultMailAddress, // 'cb_support@cinderbuild.com',
      from: "admin@cinderbuild.com",
      subject: "Request A Call",
      html: format(requestACallMailHtmlContent, {
        customerFirstName: requestUser.firstName,
        customerLastName: requestUser.lastName, 
        customerPhoneNumber: requestUser.msisdn,
        customerEmail: requestUser.emailAddress
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendorderAvaialableForPickMail = async (buyerUser: User, orderDetails: Order, orderPickupDetails: PickupLocation): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const orderAvaialableForPickupMailFilePath = `${__dirname}/../emailTemplates/orderavailableforpickup.html`    
    const orderAvaialableForPickupMailHtmlContent = fs.readFileSync(orderAvaialableForPickupMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`
    
    const msg = {
      to: buyerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Available For Pickup",
      html: format(orderAvaialableForPickupMailHtmlContent, {
        customerFirstName: buyerUser.firstName,
        referenceNumber: orderDetails.referenceNumber,
        address: orderPickupDetails.address,
        orderTrackURL
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendorderAvailableForDeliveryMail = async (buyerUser: User, orderDetails: Order, orderDeliveryDetails: DeliveryLocation): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const orderavailablefordeliverMailFilePath = `${__dirname}/../emailTemplates/orderavailablefordelivery.html`    
    const orderavailablefordeliverMailHtmlContent = fs.readFileSync(orderavailablefordeliverMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`
    
    const msg = {
      to: buyerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Available For Delivery",
      html: format(orderavailablefordeliverMailHtmlContent, {
        customerFirstName: buyerUser.firstName,
        referenceNumber: orderDetails.referenceNumber,
        address: orderDeliveryDetails.address,
        orderTrackURL
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}


export const sendOrderConfirmPickupMail = async (buyerUser: User, orderDetails: Order ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const orderconfirmpickupMailFilePath = `${__dirname}/../emailTemplates/orderconfirmpickup.html`    
    const orderconfirmpickupMailHtmlContent = fs.readFileSync(orderconfirmpickupMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`
    
    const msg = {
      to: buyerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Order Picked Up Confirmation",
      html: format(orderconfirmpickupMailHtmlContent, {
        customerFirstName: buyerUser.firstName,
        referenceNumber: orderDetails.referenceNumber,
        orderTrackURL
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendOrderConfirmDeliveryMail = async (buyerUser: User, orderDetails: Order ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const orderconfirmdeliveryMailFilePath = `${__dirname}/../emailTemplates/orderconfirmdelivery.html`    
    const orderconfirmdeliveryMailHtmlContent = fs.readFileSync(orderconfirmdeliveryMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`;

    const reOrderUrl = `https://${domain}/product/${orderDetails.orderItems[0].productUuid}`
    
    const msg = {
      to: buyerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Order Delivery Confirmed",
      html: format(orderconfirmdeliveryMailHtmlContent, {
        customerFirstName: buyerUser.firstName,
        referenceNumber: orderDetails.referenceNumber,
        orderTrackURL,
        reOrderUrl
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendQouteRequestMailSeller = async (sellerUser: User, qouteRequestDetails: QuoteRequest ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const qouteRequestMailFilePath = `${__dirname}/../emailTemplates/qouterequesttoseller.html`    
    const qouteRequestMailHtmlContent = fs.readFileSync(qouteRequestMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const qouteRequestDetailsURL = `https://${domain}/seller/quote-request/${qouteRequestDetails.uuid}`
    
    const msg = {
      to: sellerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Quote Request Raised",
      html: format(qouteRequestMailHtmlContent, {
        customerFirstName: sellerUser.firstName,
        referenceNumber: qouteRequestDetails.referenceNumber,
        productName: qouteRequestDetails.product.name,
        quantity: qouteRequestDetails.quantity,
        qouteRequestDetailsURL
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendQouteRequestResponseMailResponse = async (buyerUser: User, qouteRequestDetails: QuoteRequest ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const qouteRequestResponseMailFilePath = `${__dirname}/../emailTemplates/quoterequestresponsebuyer.html`    
    const qouteRequestResponseMailHtmlContent = fs.readFileSync(qouteRequestResponseMailFilePath, 'utf8')
   

    const qouteRequestDetailsURL = process.env.NODE_ENV === ProductionEnv ?  `https://www.cinderbuild.com/buyer/my-quotes/details/${qouteRequestDetails.uuid}` : `https://cinderbuildfe-dev-no5tq.ondigitalocean.app/buyer/my-quotes/details/${qouteRequestDetails.uuid}` 
    
    const msg = {
      to:  buyerUser.emailAddress,
      cc: defaultMailAddress, // "cb_support@cinderbuild.com",
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
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendMailtoAdminOnPLPApplication = async (plpUser: User ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const productleaseprogramMailFilePath = `${__dirname}/../emailTemplates/plpApplication.html`    
    const productleaseprogramMailHtmlContent = fs.readFileSync(productleaseprogramMailFilePath, 'utf8')

    const msg = {
      to: defaultMailAddress, // "cb_support@cinderbuild.com",
      from: "admin@cinderbuild.com",
      subject: "Application For Product Lease Program",
      html: format(productleaseprogramMailHtmlContent, {
        customerFirstName: plpUser.firstName,
        cuatomerLastName: plpUser.lastName,
        accountId: plpUser.id,
        phoneNumber: plpUser.msisdn,
        emailAddress: plpUser.emailAddress,
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendPODConfirmationMail = async (buyerDetails: User, locationDetails: any, orderDetails: Order ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const podConfirmationMailFilePath = `${__dirname}/../emailTemplates/podconfirmation.html`    
    const podConfirmationMailHtmlContent = fs.readFileSync(podConfirmationMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`

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
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendPODNotificationToSellerMail = async (sellerDetails: User, locationDetails: any, orderDetails: Order, buyerDetails: User ): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const podConfirmationMailFilePath = `${__dirname}/../emailTemplates/podNotificationSeller.html`    
    const podConfirmationMailHtmlContent = fs.readFileSync(podConfirmationMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackLink = `https://${domain}/seller/orders/${orderDetails.uuid}`

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
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendPODPaymentNotificationtoBuyerMail = async (buyerDetails: User, orderDetails: Order): Promise<boolean> => {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const podPaymentNotificationMailFilePath = `${__dirname}/../emailTemplates/podpaymentbuyer.html`    
    const podPaymentNotificationMailHtmlContent = fs.readFileSync(podPaymentNotificationMailFilePath, 'utf8')
    const domain = Utils.serverDomain()

    const orderTrackURL = `https://${domain}/buyer/orders/${orderDetails.uuid}`

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
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
}

export const sendWithdrawalRequestToSupport = async(currentUser: User, userWallet:Wallet, userBankInfo: IBankInfo, wihdrawalAmount: number):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const widthdrawalRequestMailFilePath = `${__dirname}/../emailTemplates/widthrawalrequest.html`    
    const widthdrawalRequestMailHtmlContent = fs.readFileSync(widthdrawalRequestMailFilePath, 'utf8')
    const userWalletBlanaceMajor = Utils.normalizeMoney(userWallet.walletBalanceMinor / 100 ) 
    const withdrawalAmount  = Utils.normalizeMoney(wihdrawalAmount) 
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
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendNewAccountLevelAdded = async(addedUser: User,  title: string):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const welcomeAccountLevelMailFilePath = `${__dirname}/../emailTemplates/welcomeAccountLevel.html`    
    const welcomeAccountLevelMailHtmlContent = fs.readFileSync(welcomeAccountLevelMailFilePath, 'utf8')
     
    const msg = {
      to: addedUser.emailAddress,
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(welcomeAccountLevelMailHtmlContent, {
        userId: addedUser.id,
        customerFirstName: addedUser.firstName
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendNewWareHouseLevelAdded = async(addedUser: User,  title: string):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/welcomeWarehouseLevel.html`    
    const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8')
     
    const msg = {
      to: addedUser.emailAddress,
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(welcomeWarehouseLevelMailHtmlContent, {
        userId: addedUser.id,
        customerFirstName: addedUser.firstName
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}

export const sendDeliveryFeeSetMail = async(user: User,  title: string, mailDetails?: CooperateMailData):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/deliveryfeeset.html`    
    const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8')
     
    const msg = {
      to: user.emailAddress,
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(welcomeWarehouseLevelMailHtmlContent, {
        customerFirstName: user.firstName,
        siteName: mailDetails?.siteName,
        deliveryRequestAmount: mailDetails?.deliveryRequestAmount
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendDeliveryRequestToSiteAdmin = async(user: User):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const welcomeWarehouseLevelMailFilePath = `${__dirname}/../emailTemplates/deliveryrequestadminmail.html`    
    const welcomeWarehouseLevelMailHtmlContent = fs.readFileSync(welcomeWarehouseLevelMailFilePath, 'utf8')
     
    const msg = {
      to: defaultMailAddress,
      from: "admin@cinderbuild.com",
      subject: "WareHouse to Site Delivery Request",
      html: format(welcomeWarehouseLevelMailHtmlContent, {
        userId: user.id
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const procurementListAcknowledgementMail = async(user: User, title: string):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const procurementListAcknowledgementMailFilePath = `${__dirname}/../emailTemplates/precurmentaknoledgemail.html`    
    const procurementListAcknowledgementMailHtmlContent = fs.readFileSync(procurementListAcknowledgementMailFilePath, 'utf8')
     
    const msg = {
      to: user.emailAddress,
      cc: defaultMailAddress,
      from: "admin@cinderbuild.com",
      subject: title,
      html: format(procurementListAcknowledgementMailHtmlContent, {
        customerFirstName: user.firstName,
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendProcurmentUploadMailToAdmin = async(user: User):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const procurmentListUploadMailFilePath = `${__dirname}/../emailTemplates/precurementuploadmailtoadmin.html`    
    const procurmentListUploadMailHtmlContent = fs.readFileSync(procurmentListUploadMailFilePath, 'utf8')
     
    const msg = {
      to: defaultMailAddress,
      from: "admin@cinderbuild.com",
      subject: "Procurment List Uploaded",
      html: format(procurmentListUploadMailHtmlContent, {
        accountId: user.accountId
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendProcurmentInvoiceIsReady = async(user: User):Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const ProcurmentInvoiceIsReadyMailFilePath = `${__dirname}/../emailTemplates/procurmentinvoiceisready.html`    
    const ProcurmentInvoiceIsReadyMailHtmlContent = fs.readFileSync(ProcurmentInvoiceIsReadyMailFilePath, 'utf8')
     
    const msg = {
      to: user.emailAddress,
      cc: defaultMailAddress,
      from: "admin@cinderbuild.com",
      subject: "Your invoice is ready",
      html: format(ProcurmentInvoiceIsReadyMailHtmlContent, {
        customerFirstName: user.firstName,
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}


export const sendTestMailForCronJob = async():Promise<boolean> =>{
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
    const AgendaReadyMailFilePath = `${__dirname}/../emailTemplates/testmail.html`    
    const agendaReadyMailHtmlContent = fs.readFileSync(AgendaReadyMailFilePath, 'utf8')
     
    const msg = {
      to: defaultMailAddress,
      cc: 'mubarak.aminu@cinderbuild.com',
      from: "admin@cinderbuild.com",
      subject: "Cron Job Agenda Test",
      html: format(agendaReadyMailHtmlContent, {
        
      }),
    }

    await sgMail.send(msg)
    return true
  } catch (e) {
    logger.error('Sendgrid error: ', e.message)
    return false
  }
  
}





export const sendNotificationToUserViaMailForQouteR = async (user: User, notificationType: NotificationMessageTypes,
    title: string, qouteRequestDetails?: QuoteRequest) => {
  if(notificationType === NotificationMessageTypes.QOUTE_REQUEST_RAISED){
    const sendQouteRequestToSeller = await sendQouteRequestMailSeller(user, qouteRequestDetails!)
    console.log(sendQouteRequestToSeller)
  }

  if(notificationType === NotificationMessageTypes.QUOTE_REQUEST_SELLER_RESPONSE){
    const qouteRequestResponseToBuyer = await sendQouteRequestResponseMailResponse(user, qouteRequestDetails!)
    console.log(qouteRequestResponseToBuyer)
  }
}


export const sendNotificationToUserForWareHouseviaMail = async (user: User, notificationType: NotificationMessageTypes,
  title: string, mailDetails?: CooperateMailData) => {
    // sendDeliveryFeeSetMail
    if(notificationType === NotificationMessageTypes.WAREHOUSE_TO_SITE_DELIVERY_FEE_SET){
      const mailToUserWHenDeliveryFeeIsSet = await sendDeliveryFeeSetMail(user, title, mailDetails )
      console.log(mailToUserWHenDeliveryFeeIsSet)
    } 

}

export const sendNotificationToUserForProjectMail = async (project: Project, user: User, notificationType: NotificationMessageTypes,
  title?: string) => {
    // sendProjectApprovalRequestMail
    if(notificationType === NotificationMessageTypes.ESTATE_PROJECT_APPROVAL_REQUEST){
      const mailToAdminForProjectApproval = await sendProjectApprovalRequestMail(user, project)
      console.log(mailToAdminForProjectApproval)
    } 

    if(notificationType === NotificationMessageTypes.ESTATE_PROJECT_DECLINED){
      const mailToAdminForProjectApproval = await sendProjectApprovalRequestDeclineMail(user, project)
      console.log(mailToAdminForProjectApproval)
    } 

    if(notificationType === NotificationMessageTypes.ESTATE_PROJECT_APPROVED){
      const mailToAdminForProjectApproval = await sendProjectApprovalRequestApprovalMail(user, project)
      console.log(mailToAdminForProjectApproval)
    } 


}


export const sendNotificationToUserViaMail = async (user: User, notificationType: NotificationMessageTypes,
    title: string, orderDetails?: Order) => {
  const connection = await getFreshConnection()

  const pickupLocationRepo = connection.getRepository(PickupLocation)
  const deliveryLocationRepo = connection.getRepository(DeliveryLocation)
  const userRepo = connection.getRepository(User)

  if(notificationType === NotificationMessageTypes.NEW_ACCOUNT_LEVEL_USER_ADDED){
    // 
    await sendNewAccountLevelAdded(user, title )
  }

  if(notificationType === NotificationMessageTypes.NEW_WAREHOUSE_LEVEL_USER_ADDED){
    await sendNewWareHouseLevelAdded(user, title)
  }

  if(notificationType === NotificationMessageTypes.ORDER_PAYMENT_IN_ESCROW){
    const sendorderPayment =  await sendOrderPaymentMailToBuyer(user, title, orderDetails!)
    console.log(sendorderPayment)
  } 
  if(notificationType === NotificationMessageTypes.ORDER_CREATED){
    const oderCretion =  await sendOrderCreationMailToSeller(user, title, orderDetails!)    
  }
  if(notificationType === NotificationMessageTypes.ENABLE_PLP){
    const enableForPLP = await sendCustomerEnabledForPlp(user)
    console.log(enableForPLP)
  }
  if(notificationType === NotificationMessageTypes.ORDER_AVAILABLE_FOR_PICKUP) {
    const orderPickupDetails = await pickupLocationRepo.findOne({id: orderDetails!.pickupLocationId})
    const sendorderPickupMail = await sendorderAvaialableForPickMail(user, orderDetails!, orderPickupDetails!)
    console.log(sendorderPickupMail)
  }
  if(notificationType === NotificationMessageTypes.ORDER_AVAILABLE_FOR_DELIVERY){
    const orderDeliveryDetails = await deliveryLocationRepo.findOne({id: orderDetails!.deliveryLocationId})
    const orderAvailableForDeliveryMail = await sendorderAvailableForDeliveryMail(user, orderDetails!, orderDeliveryDetails!)
    console.log(orderAvailableForDeliveryMail)
  }

  if(notificationType === NotificationMessageTypes.CONFIRMED_PICKUP){
    const orderConfirmPickupyMail = await sendOrderConfirmPickupMail(user, orderDetails!)
    console.log(orderConfirmPickupyMail)
  }


  if(notificationType === NotificationMessageTypes.CONFIRMED_DELIVERY){
    const orderConfirmDeliveryMail = await sendOrderConfirmDeliveryMail(user, orderDetails!)
    console.log('orderConfirmDeliveryMail', orderConfirmDeliveryMail)
  }

  if(notificationType === NotificationMessageTypes.ORDER_PAYMENT_IN_ESCROW_FOR_UNREGISTER_USER){
    const orderConfirmMailToUnregistredUser = await sendOrderPaymentMailToUnregisterBuyer(user, title, orderDetails!)
    console.log('orderConfirmMailToUnregistredUser', orderConfirmMailToUnregistredUser)
  }

  if(notificationType === NotificationMessageTypes.POD_ORDER_CONFIRMATION){
    if(orderDetails!.pickupLocationId){
      const  locationDetails = await pickupLocationRepo.findOne({ id: orderDetails!.pickupLocationId})
      await sendPODConfirmationMail(user, locationDetails, orderDetails!)
    } 
    else if(orderDetails!.deliveryLocationId){
      const locationDetails = await deliveryLocationRepo.findOne({ id: orderDetails!.deliveryLocationId})
      await sendPODConfirmationMail(user, locationDetails, orderDetails!)
    }
  }

  if(notificationType === NotificationMessageTypes.POD_ORDER_NOTIFCATION){
    const buyerDetails = await userRepo.findOne({id: orderDetails!.buyerUserId})
    if(orderDetails!.pickupLocationId){
      const  locationDetails = await pickupLocationRepo.findOne({ id: orderDetails!.pickupLocationId})
      await sendPODNotificationToSellerMail(user, locationDetails, orderDetails!, buyerDetails!)
    } 
    else if(orderDetails!.deliveryLocationId){
      const locationDetails = await deliveryLocationRepo.findOne({ id: orderDetails!.deliveryLocationId})
      await sendPODNotificationToSellerMail(user, locationDetails, orderDetails!, buyerDetails!)
    }
  }
  if(notificationType === NotificationMessageTypes.POD_ORDER_PAYMENT_NOTIFICATION){
    await sendPODPaymentNotificationtoBuyerMail(user, orderDetails!)
  }

  if(notificationType === NotificationMessageTypes.PROCURMENT_LIST_UPLOADED){
    await procurementListAcknowledgementMail(user, title)
  }

}
