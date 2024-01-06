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
exports.isDeveloperAccountApprovedAndConfirmRequest = exports.isDeveloperAccountApprovedAndConfirm = exports.confirmAndApprovedDeveloperAccount = exports.sendDeveloperAccountApprovalRequest = exports.confirmDeveloperAccount = exports.approveDeveloperAccount = exports.approveDeveloperDocument = void 0;
const db_1 = require("../db");
const MortgageAccountVerification_1 = require("../entity/MortgageAccountVerification");
const DeveloperAccountActivationType_1 = __importDefault(require("../enums/DeveloperAccountActivationType"));
const FileUpload_1 = require("../enums/FileUpload");
const Roles_1 = require("../enums/Roles");
const error_response_types_1 = require("../utils/error-response-types");
const EmailService = __importStar(require("./emailService"));
const approveDeveloperDocument = (developer, payload, fileCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    if (![FileUpload_1.MortgageAccountVerificationFiles.BANK_STATEMENT, FileUpload_1.MortgageAccountVerificationFiles.GOVERNMENT_APPROVED_ID, FileUpload_1.MortgageAccountVerificationFiles.RECENT_UTILITY_BILL, FileUpload_1.MortgageAccountVerificationFiles.CAC_CERTIFICATE].includes(fileCategory)) {
        throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
    }
    const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({
        where: { userId: developer.id, accountType: Roles_1.Roles.DEVELOPER }
    });
    if (!mortgageAccountVerification) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortgage Account Verification in Progress');
    }
    if (fileCategory === FileUpload_1.MortgageAccountVerificationFiles.BANK_STATEMENT) {
        if (mortgageAccountVerification.bankStatement.documentType !== FileUpload_1.UploadFileCategory.BANK_STATEMENT) {
            throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
        }
        if (mortgageAccountVerification.bankStatement.keyFromCloudProvider !== payload.fileKey) {
            throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
        }
        mortgageAccountVerificationRepo
            .createQueryBuilder()
            .update(MortgageAccountVerification_1.MortgageAccountVerification)
            .set({ bankStatementApproved: true })
            .where({
            uuid: mortgageAccountVerification.uuid,
        })
            .execute();
        return true;
    }
    if (fileCategory === FileUpload_1.MortgageAccountVerificationFiles.GOVERNMENT_APPROVED_ID) {
        if (mortgageAccountVerification.governmentApprovedId.documentType !== FileUpload_1.UploadFileCategory.GOVERNMENT_APPROVED_ID) {
            throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
        }
        if (mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider !== payload.fileKey) {
            throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
        }
        mortgageAccountVerificationRepo
            .createQueryBuilder()
            .update(MortgageAccountVerification_1.MortgageAccountVerification)
            .set({ governmentApprovedIdApproved: true })
            .where({
            uuid: mortgageAccountVerification.uuid,
        })
            .execute();
        return true;
    }
    if (fileCategory === FileUpload_1.MortgageAccountVerificationFiles.RECENT_UTILITY_BILL) {
        mortgageAccountVerificationRepo
            .createQueryBuilder()
            .update(MortgageAccountVerification_1.MortgageAccountVerification)
            .set({ recentUtilityBillApproved: true })
            .where({
            uuid: mortgageAccountVerification.uuid,
        })
            .execute();
        return true;
    }
    if (fileCategory === FileUpload_1.MortgageAccountVerificationFiles.CAC_CERTIFICATE) {
        mortgageAccountVerificationRepo
            .createQueryBuilder()
            .update(MortgageAccountVerification_1.MortgageAccountVerification)
            .set({ cacCertificateApproved: true })
            .where({
            uuid: mortgageAccountVerification.uuid,
        })
            .execute();
        return true;
    }
    throw new error_response_types_1.UnprocessableEntityError("Invalid File Type for Approval");
});
exports.approveDeveloperDocument = approveDeveloperDocument;
const approveDeveloperAccount = (developer) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({
        where: { userId: developer.id, accountType: Roles_1.Roles.DEVELOPER }
    });
    if (!mortgageAccountVerification) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortgage Account Verification in Progress');
    }
    mortgageAccountVerificationRepo
        .createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        bankStatementApproved: true,
        governmentApprovedIdApproved: true,
        recentUtilityBillApproved: true,
        isApproved: true,
    })
        .where({
        uuid: mortgageAccountVerification.uuid,
    })
        .execute();
    return true;
});
exports.approveDeveloperAccount = approveDeveloperAccount;
const confirmDeveloperAccount = (developer) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({
        where: { userId: developer.id, accountType: Roles_1.Roles.DEVELOPER }
    });
    if (!mortgageAccountVerification) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortgage Account Verification in Progress');
    }
    if (mortgageAccountVerification.isApproved === false) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Confirm a Mortgage Account Whose Verification Has Not Been Approved');
    }
    mortgageAccountVerificationRepo
        .createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        bankStatementApproved: true,
        governmentApprovedIdApproved: true,
        recentUtilityBillApproved: true,
        isApproved: true,
        accountConfirmed: true,
    })
        .where({
        uuid: mortgageAccountVerification.uuid,
    })
        .execute();
    // dispatch mail say account is approve
    const developerInfo = {
        email: developer.emailAddress,
        firstName: developer.firstName,
    };
    yield EmailService.sendDeveloperAccountApprovalMail(developerInfo);
    return true;
});
exports.confirmDeveloperAccount = confirmDeveloperAccount;
const sendDeveloperAccountApprovalRequest = (developer) => __awaiter(void 0, void 0, void 0, function* () {
    if (developer.isDeveloper !== true) {
        return false;
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    // if all file has been uploaded
    const hasFileBeenUploaded = yield mortgageAccountVerificationRepo.findOne({
        where: { userId: developer.id }
    });
    if (hasFileBeenUploaded && hasFileBeenUploaded.bankStatement && hasFileBeenUploaded.cacCertificate && hasFileBeenUploaded.governmentApprovedId && hasFileBeenUploaded.recentUtilityBill) {
        if (hasFileBeenUploaded.accountConfirmed !== true) {
            // dispatch mail that say his account is waiting for approval
            const developerInfo = {
                email: developer.emailAddress,
                firstName: developer.firstName,
            };
            yield EmailService.sendDeveloperAccountAwaitApprovalMail(developerInfo);
            return true;
        }
        return false;
    }
    return false;
});
exports.sendDeveloperAccountApprovalRequest = sendDeveloperAccountApprovalRequest;
const confirmAndApprovedDeveloperAccount = (developer) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({
        where: { userId: developer.id, accountType: Roles_1.Roles.DEVELOPER }
    });
    if (!mortgageAccountVerification) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortgage Account Verification in Progress');
    }
    mortgageAccountVerificationRepo
        .createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        bankStatementApproved: true,
        governmentApprovedIdApproved: true,
        recentUtilityBillApproved: true,
        isApproved: true,
        accountConfirmed: true,
    })
        .where({
        uuid: mortgageAccountVerification.uuid,
    })
        .execute();
    // dispatch mail say account is approve
    const developerInfo = {
        email: developer.emailAddress,
        firstName: developer.firstName,
    };
    yield EmailService.sendDeveloperAccountApprovalMail(developerInfo);
    return true;
});
exports.confirmAndApprovedDeveloperAccount = confirmAndApprovedDeveloperAccount;
const isDeveloperAccountApprovedAndConfirm = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    const isDeveloperConfirm = yield mortgageAccountVerificationRepo.findOne({
        where: { userId, isApproved: true, accountConfirmed: true }
    });
    if (!isDeveloperConfirm) {
        throw new error_response_types_1.UnprocessableEntityError('Developer Account Has Not Been Verified');
    }
    return true;
});
exports.isDeveloperAccountApprovedAndConfirm = isDeveloperAccountApprovedAndConfirm;
const isDeveloperAccountApprovedAndConfirmRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    const isDeveloperConfirm = yield mortgageAccountVerificationRepo.findOne({
        where: { userId, isApproved: true, accountConfirmed: true }
    });
    if (isDeveloperConfirm) {
        return DeveloperAccountActivationType_1.default.active;
    }
    const developerDocsSend = yield mortgageAccountVerificationRepo.findOne({
        where: { userId }
    });
    if (!developerDocsSend) {
        return DeveloperAccountActivationType_1.default.inactive;
    }
    if (developerDocsSend.bankStatement ||
        developerDocsSend.governmentApprovedId ||
        developerDocsSend.recentUtilityBill ||
        developerDocsSend.cacCertificate) {
        return DeveloperAccountActivationType_1.default.pending;
    }
    return DeveloperAccountActivationType_1.default.inactive;
});
exports.isDeveloperAccountApprovedAndConfirmRequest = isDeveloperAccountApprovedAndConfirmRequest;
//# sourceMappingURL=developerService.js.map