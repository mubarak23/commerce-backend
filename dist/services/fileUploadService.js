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
exports.processDeleteProductPhoto = exports.processFileUpload = void 0;
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const db_1 = require("../db");
const Brand_1 = require("../entity/Brand");
const Category_1 = require("../entity/Category");
const MortgageAccountVerification_1 = require("../entity/MortgageAccountVerification");
const Procurement_1 = require("../entity/Procurement");
const Product_1 = require("../entity/Product");
const ProductLeaseRequest_1 = require("../entity/ProductLeaseRequest");
const Project_1 = require("../entity/Project");
const User_1 = require("../entity/User");
const FileUpload_1 = require("../enums/FileUpload");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const error_response_types_1 = require("../utils/error-response-types");
const CloudinaryService_1 = require("./cloudstore/CloudinaryService");
const DeveloperService = __importStar(require("./developerService"));
const EmailService = __importStar(require("./emailService"));
const NotificationService = __importStar(require("./notificationService"));
const processFileUpload = (uploaderUser, fileCategory, fileData, entityUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadRequest = {
        fileUuid: (0, uuid_1.v4)(),
        file: fileData
    };
    let uploadResponse;
    const productLeaseRequestFileTypes = [
        FileUpload_1.UploadFileCategory.PRODUCT_LEASE_BANK_STATEMENT,
        FileUpload_1.UploadFileCategory.PRODUCT_LEASE_REQUEST_CAC_CERTIFICATE,
        FileUpload_1.UploadFileCategory.PRODUCT_LEASE_REQUEST_ID_CARD,
        FileUpload_1.UploadFileCategory.PRODUCT_LEASE_UTILITY_BILL,
        FileUpload_1.UploadFileCategory.PRODUCT_LEASE_DISTRIBUTORSHIP_APPOINTMENT_LETTER
    ];
    const sellerDocsFileTypes = [
        FileUpload_1.UploadFileCategory.SELLER_CAC_DOCUMENT,
        FileUpload_1.UploadFileCategory.SELLER_ID_CARD,
        FileUpload_1.UploadFileCategory.SELLER_COMPANY_LOGO
    ];
    if (fileCategory === FileUpload_1.UploadFileCategory.USER_PHOTO) {
        uploadResponse = yield processUserPhotoUpload(uploaderUser, uploadRequest);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.USER_BACK_DROP_PHOTO) {
        uploadResponse = yield processStoreFrontBannerImageUpload(uploaderUser, uploadRequest);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.CATEGORY_PHOTO) {
        const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
        const category = yield categoryRepo.findOne({ uuid: entityUuid });
        if (!category) {
            throw new error_response_types_1.NotFoundError('Category was not found');
        }
        uploadResponse = yield processCategoryPhotoUpload(uploadRequest, category);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.CATEGORY_BANNER) {
        const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
        const category = yield categoryRepo.findOne({ uuid: entityUuid });
        if (!category) {
            throw new error_response_types_1.NotFoundError('Category was not found');
        }
        uploadResponse = yield processCategoryBannerUpload(uploadRequest, category);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.BRAND_PHOTO) {
        const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
        const brand = yield brandRepo.findOne({ uuid: entityUuid });
        if (!brand) {
            throw new error_response_types_1.NotFoundError('Brand was not found');
        }
        uploadResponse = yield processBrandPhotoUpload(uploadRequest, brand);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.PRODUCT_PHOTO) {
        const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
        const product = yield productRepo.findOne({ uuid: entityUuid });
        if (!product) {
            throw new error_response_types_1.NotFoundError('Product was not found');
        }
        uploadResponse = yield processProductPhotoUpload(uploadRequest, product);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.PROJECT_IMAGES) {
        const projectRepo = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = yield projectRepo.findOne({ uuid: entityUuid });
        if (!project) {
            throw new error_response_types_1.NotFoundError('Product was not found');
        }
        uploadResponse = yield processProjectImageUpload(uploadRequest, project);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.BANK_STATEMENT) {
        const mortgageAccountVerificationRepo = (0, typeorm_1.getRepository)(MortgageAccountVerification_1.MortgageAccountVerification);
        const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({ userId: uploaderUser.id });
        if (!mortgageAccountVerification) {
            throw new error_response_types_1.NotFoundError('No Verification Setup');
        }
        uploadResponse = yield processMortgageUserBankStatment(uploadRequest, mortgageAccountVerification);
        yield DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.CAC_CERTIFICATE) {
        const mortgageAccountVerificationRepo = (0, typeorm_1.getRepository)(MortgageAccountVerification_1.MortgageAccountVerification);
        const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({ userId: uploaderUser.id });
        if (!mortgageAccountVerification) {
            throw new error_response_types_1.NotFoundError('No Verification Setup');
        }
        uploadResponse = yield processMortgageUserCACCertificateUpload(uploadRequest, mortgageAccountVerification);
        yield DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.GOVERNMENT_APPROVED_ID) {
        const mortgageAccountVerificationRepo = (0, typeorm_1.getRepository)(MortgageAccountVerification_1.MortgageAccountVerification);
        const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({ userId: uploaderUser.id });
        if (!mortgageAccountVerification) {
            throw new error_response_types_1.NotFoundError('No Verification Setup');
        }
        uploadResponse = yield processMortgageUserGovementApprovedId(uploadRequest, mortgageAccountVerification);
        yield DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.RECENT_UTILITY_BILL) {
        const mortgageAccountVerificationRepo = (0, typeorm_1.getRepository)(MortgageAccountVerification_1.MortgageAccountVerification);
        const mortgageAccountVerification = yield mortgageAccountVerificationRepo.findOne({ userId: uploaderUser.id });
        if (!mortgageAccountVerification) {
            throw new error_response_types_1.NotFoundError('No Verification Setup');
        }
        uploadResponse = yield processMortgageUserRecentUtilityBillUpload(uploadRequest, mortgageAccountVerification);
        yield DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser);
    }
    else if (fileCategory === FileUpload_1.UploadFileCategory.PROCURMENT_LIST) {
        uploadResponse = yield processProcurementListUpload(uploaderUser, uploadRequest);
    }
    else if (productLeaseRequestFileTypes.includes(fileCategory)) {
        const productLeaseRequestRepo = (0, typeorm_1.getRepository)(ProductLeaseRequest_1.ProductLeaseRequest);
        let productLeaseRequest;
        if (entityUuid) {
            productLeaseRequest = yield productLeaseRequestRepo.findOne({ uuid: entityUuid });
        }
        else {
            productLeaseRequest = yield productLeaseRequestRepo.findOne({ userId: uploaderUser.id });
        }
        if (!productLeaseRequest) {
            throw new error_response_types_1.ServerError('Product lease request was not found');
        }
        uploadResponse = yield processProductLeaseRequestUpload(uploadRequest, fileCategory, productLeaseRequest);
    }
    else if (sellerDocsFileTypes.includes(fileCategory)) {
        const userRepo = (0, typeorm_1.getRepository)(User_1.User);
        const sellerDetails = yield userRepo.findOne({ uuid: entityUuid });
        // if(!sellerDetails) {
        //   throw new NotFoundError('Could not find seller details')
        // }
        uploadResponse = yield processSellerDocsUpload(uploadRequest, fileCategory, sellerDetails);
    }
    if (uploadResponse) {
        return uploadResponse;
    }
    throw new Error('Invalid upload request');
});
exports.processFileUpload = processFileUpload;
const processUserPhotoUpload = (uploaderUser, uploadRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    if (uploadResponse) {
        if ((_a = uploaderUser === null || uploaderUser === void 0 ? void 0 : uploaderUser.photo) === null || _a === void 0 ? void 0 : _a.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(uploaderUser.photo.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    yield userRepo.createQueryBuilder()
        .update(User_1.User)
        .set({
        photo: cloudFile
    })
        .where({
        id: uploaderUser.id
    })
        .execute();
    return cloudFile;
});
const processMortgageUserBankStatment = (uploadRequest, mortgageAccountVerification) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: FileUpload_1.UploadFileCategory.BANK_STATEMENT
    };
    if (uploadResponse) {
        if ((_b = mortgageAccountVerification === null || mortgageAccountVerification === void 0 ? void 0 : mortgageAccountVerification.bankStatement) === null || _b === void 0 ? void 0 : _b.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(mortgageAccountVerification.bankStatement.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    yield mortgageAccountVerificationRepo.createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        bankStatement: cloudFile
    })
        .where({
        id: mortgageAccountVerification.id
    })
        .execute();
    return cloudFile;
});
const processMortgageUserGovementApprovedId = (uploadRequest, mortgageAccountVerification) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: FileUpload_1.UploadFileCategory.GOVERNMENT_APPROVED_ID
    };
    if (uploadResponse) {
        if ((_c = mortgageAccountVerification === null || mortgageAccountVerification === void 0 ? void 0 : mortgageAccountVerification.governmentApprovedId) === null || _c === void 0 ? void 0 : _c.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    yield mortgageAccountVerificationRepo.createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        governmentApprovedId: cloudFile
    })
        .where({
        id: mortgageAccountVerification.id
    })
        .execute();
    return cloudFile;
});
const processMortgageUserRecentUtilityBillUpload = (uploadRequest, mortgageAccountVerification) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: FileUpload_1.UploadFileCategory.RECENT_UTILITY_BILL
    };
    if (uploadResponse) {
        if ((_d = mortgageAccountVerification === null || mortgageAccountVerification === void 0 ? void 0 : mortgageAccountVerification.recentUtilityBill) === null || _d === void 0 ? void 0 : _d.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    yield mortgageAccountVerificationRepo.createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        recentUtilityBill: cloudFile
    })
        .where({
        id: mortgageAccountVerification.id
    })
        .execute();
    return cloudFile;
});
const processMortgageUserCACCertificateUpload = (uploadRequest, mortgageAccountVerification) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: FileUpload_1.UploadFileCategory.CAC_CERTIFICATE
    };
    if (uploadResponse) {
        if ((_e = mortgageAccountVerification === null || mortgageAccountVerification === void 0 ? void 0 : mortgageAccountVerification.cacCertificate) === null || _e === void 0 ? void 0 : _e.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification_1.MortgageAccountVerification);
    yield mortgageAccountVerificationRepo.createQueryBuilder()
        .update(MortgageAccountVerification_1.MortgageAccountVerification)
        .set({
        cacCertificate: cloudFile
    })
        .where({
        id: mortgageAccountVerification.id
    })
        .execute();
    return cloudFile;
});
// const processMortgageUserUtilityBillsUpload = async (
//   uploadRequest: UploadRequest, mortgageAccountVerification: MortgageAccountVerification, fileCategory: UploadFileCategory, 
//   ): Promise<ICloudFile> => {
// const cloudStore: CloudinaryService = new CloudinaryService()
// const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
// const cloudFile: MortgageAccountVerificationUpload = {
//   keyFromCloudProvider: uploadResponse.key,
//   url: uploadResponse.url,
//   mimetype: uploadRequest.file.mimeType,
//   fileCloudProvider: FileCloudProviders.CLOUDINARY,
//   documentType: fileCategory,
// }
// const mortgageAccountVerificationRepo = getRepository(MortgageAccountVerification);
// if (!mortgageAccountVerification.recentUtilityBills) {
//   mortgageAccountVerification.recentUtilityBills = [];
// }
// const updatedUploads = mortgageAccountVerification.recentUtilityBills;
// const existingUploadFile = mortgageAccountVerification.recentUtilityBills.find(fUpload => fUpload.documentType === fileCategory)
// if (existingUploadFile) {
//   existingUploadFile.url = cloudFile.url
// } else {
//   updatedUploads.push(cloudFile)
// }
// await mortgageAccountVerificationRepo.createQueryBuilder()
//   .update(MortgageAccountVerification)
//   .set({
//     recentUtilityBills: updatedUploads,
//   })
//   .where({
//     id: mortgageAccountVerification.id
//   })
//   .execute()
// return cloudFile
// }
const processProcurementListUpload = (uploaderUser, uploadRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const connection = yield (0, db_1.getFreshConnection)();
    const procurementRepo = connection.getRepository(Procurement_1.Procurements);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    const savedProcurementList = new Procurement_1.Procurements().initialize(uploaderUser.accountId, cloudFile);
    const saveProcurement = yield procurementRepo.save(savedProcurementList);
    console.log(saveProcurement);
    if (!saveProcurement) {
        throw new error_response_types_1.UnprocessableEntityError('Unable to save procurement');
    }
    // send mail to admin 
    // send mail to cooperate confiming we receive his procurment list.
    const notificationMetadata = {
        userId: uploaderUser.id,
    };
    const notificationTransports = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    const notificationTitle = "Procurement list acknowledgement ";
    const notificationBody = `You have successfully uploaded a procurement list on your Cloudwarehouse.
   You will receive a response with availability and pricing shortly.`;
    const res = yield NotificationService.sendSingleNotificationToUserId(uploaderUser.id, uploaderUser === null || uploaderUser === void 0 ? void 0 : uploaderUser.uuid, NotificationMessageTypes_1.default.PROCURMENT_LIST_UPLOADED, notificationTitle, notificationBody, notificationTransports, notificationMetadata);
    yield EmailService.sendProcurmentUploadMailToAdmin(uploaderUser);
    return cloudFile;
});
const processStoreFrontBannerImageUpload = (uploaderUser, uploadRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    if (uploadResponse) {
        if ((_f = uploaderUser === null || uploaderUser === void 0 ? void 0 : uploaderUser.storeFrontBanner) === null || _f === void 0 ? void 0 : _f.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(uploaderUser.storeFrontBanner.keyFromCloudProvider);
                console.log(deleteResponse);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    yield userRepo.createQueryBuilder()
        .update(User_1.User)
        .set({
        storeFrontBanner: cloudFile
    })
        .where({
        id: uploaderUser.id
    })
        .execute();
    return cloudFile;
});
const processCategoryPhotoUpload = (uploadRequest, category) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    if (uploadResponse) {
        if ((_g = category === null || category === void 0 ? void 0 : category.image) === null || _g === void 0 ? void 0 : _g.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(category.image.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const categoryRepo = connection.getRepository(Category_1.Category);
    yield categoryRepo.createQueryBuilder()
        .update(Category_1.Category)
        .set({
        image: cloudFile
    })
        .where({
        uuid: category.uuid
    })
        .execute();
    return cloudFile;
});
const processCategoryBannerUpload = (uploadRequest, category) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadBanner(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    if (uploadResponse) {
        if ((_h = category === null || category === void 0 ? void 0 : category.banner) === null || _h === void 0 ? void 0 : _h.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(category.image.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const categoryRepo = connection.getRepository(Category_1.Category);
    yield categoryRepo.createQueryBuilder()
        .update(Category_1.Category)
        .set({
        banner: cloudFile
    })
        .where({
        uuid: category.uuid
    })
        .execute();
    return cloudFile;
});
const processBrandPhotoUpload = (uploadRequest, brand) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    if (uploadResponse) {
        if ((_j = brand === null || brand === void 0 ? void 0 : brand.image) === null || _j === void 0 ? void 0 : _j.keyFromCloudProvider) {
            try {
                const deleteResponse = yield cloudStore.deleteFile(brand.image.keyFromCloudProvider);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    const connection = yield (0, db_1.getFreshConnection)();
    const brandRepo = connection.getRepository(Brand_1.Brand);
    yield brandRepo.createQueryBuilder()
        .update(Brand_1.Brand)
        .set({
        image: cloudFile
    })
        .where({
        uuid: brand.uuid
    })
        .execute();
    return cloudFile;
});
const processProjectImageUpload = (uploadRequest, project) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    if (!project.images) {
        project.images = [];
    }
    yield projectRepo.createQueryBuilder()
        .update(Project_1.Project)
        .set({
        images: [...project.images, cloudFile]
    })
        .where({
        uuid: project.uuid
    })
        .execute();
    return cloudFile;
});
const processProductPhotoUpload = (uploadRequest, product) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
    };
    const connection = yield (0, db_1.getFreshConnection)();
    const productRepo = connection.getRepository(Product_1.Product);
    if (!product.images) {
        product.images = [];
    }
    yield productRepo.createQueryBuilder()
        .update(Product_1.Product)
        .set({
        images: [...product.images, cloudFile]
    })
        .where({
        uuid: product.uuid
    })
        .execute();
    return cloudFile;
});
const processProductLeaseRequestUpload = (uploadRequest, fileCategory, productLeaseRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: fileCategory,
    };
    const productLeaseRequestRepo = (0, typeorm_1.getRepository)(ProductLeaseRequest_1.ProductLeaseRequest);
    if (!productLeaseRequest.uploads) {
        productLeaseRequest.uploads = [];
    }
    const updatedUploads = productLeaseRequest.uploads;
    const existingUploadFile = productLeaseRequest.uploads.find(fUpload => fUpload.documentType === fileCategory);
    if (existingUploadFile) {
        existingUploadFile.url = cloudFile.url;
    }
    else {
        updatedUploads.push(cloudFile);
    }
    yield productLeaseRequestRepo.createQueryBuilder()
        .update(ProductLeaseRequest_1.ProductLeaseRequest)
        .set({
        uploads: updatedUploads,
    })
        .where({
        id: productLeaseRequest.id
    })
        .execute();
    return cloudFile;
});
// processSellerDocsUpload
const processSellerDocsUpload = (uploadRequest, fileCategory, seller) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const uploadResponse = yield cloudStore.uploadFile(uploadRequest);
    const cloudFile = {
        keyFromCloudProvider: uploadResponse.key,
        url: uploadResponse.url,
        mimetype: uploadRequest.file.mimeType,
        fileCloudProvider: FileUpload_1.FileCloudProviders.CLOUDINARY,
        documentType: fileCategory,
    };
    const sellerRepo = (0, typeorm_1.getRepository)(User_1.User);
    if (!seller.sellerDocs) {
        seller.sellerDocs = [];
    }
    const updatedUploads = seller.sellerDocs;
    const existingUploadFile = seller.sellerDocs.find(fUpload => fUpload.documentType === fileCategory);
    if (existingUploadFile) {
        existingUploadFile.url = cloudFile.url;
    }
    else {
        updatedUploads.push(cloudFile);
    }
    yield sellerRepo.createQueryBuilder()
        .update(User_1.User)
        .set({
        sellerDocs: updatedUploads,
    })
        .where({
        uuid: seller.uuid
    })
        .execute();
    return cloudFile;
});
const processDeleteProductPhoto = (keyFromCloudProvider, product) => __awaiter(void 0, void 0, void 0, function* () {
    const cloudStore = new CloudinaryService_1.CloudinaryService();
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const { images } = product;
    const foundProductImage = images.find((image) => image.keyFromCloudProvider === keyFromCloudProvider);
    if (!foundProductImage) {
        throw new error_response_types_1.BadRequestError('Image does not exist on the product');
    }
    const remainingImages = images.filter((image) => image.keyFromCloudProvider !== keyFromCloudProvider);
    try {
        yield cloudStore.deleteFile(keyFromCloudProvider);
        yield productRepo
            .createQueryBuilder()
            .update(Product_1.Product)
            .set({
            images: remainingImages,
        })
            .where({
            id: product.id,
        })
            .execute();
    }
    catch (e) {
        console.log(e);
        throw new error_response_types_1.BadRequestError('Failed to Delete Product Image');
    }
    return true;
});
exports.processDeleteProductPhoto = processDeleteProductPhoto;
//# sourceMappingURL=fileUploadService.js.map