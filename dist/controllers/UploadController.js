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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable class-methods-use-this */
const tsoa_1 = require("tsoa");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const Fs = __importStar(require("fs"));
const error_response_types_1 = require("../utils/error-response-types");
const FileUploadService = __importStar(require("../services/fileUploadService"));
const FileUpload_1 = require("../enums/FileUpload");
const User_1 = require("../entity/User");
const AdminService = __importStar(require("../services/adminService"));
const ProductsService = __importStar(require("../services/productsService"));
const typeorm_1 = require("typeorm");
// DO NOT EXPORT DEFAULT
let UploadController = class UploadController extends tsoa_1.Controller {
    handleFileUpload(req, file, fileUploadCategory, entityUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                throw new error_response_types_1.BadRequestError(`A file was not uploaded`);
            const currentUser = req.user;
            if (fileUploadCategory === FileUpload_1.UploadFileCategory.BULK_PRODUCTS_FILE) {
                yield AdminService.isValidAdmin(currentUser);
            }
            const fileUploadDirectory = path_1.default.join(os_1.default.tmpdir(), "file-uploads");
            if (!Fs.existsSync(fileUploadDirectory)) {
                Fs.mkdirSync(fileUploadDirectory);
            }
            const randomFileName = (0, uuid_1.v4)();
            const uploadFilePath = path_1.default.join(os_1.default.tmpdir(), "file-uploads", randomFileName);
            yield fs_1.promises.writeFile(uploadFilePath, file.buffer);
            if (fileUploadCategory === FileUpload_1.UploadFileCategory.BULK_PRODUCTS_FILE) {
                processBulksProductUpload(file.buffer);
                yield fs_1.promises.unlink(uploadFilePath);
                const resData = {
                    status: true,
                };
                return resData;
            }
            const fileData = {
                filePath: uploadFilePath,
                mimeType: file.mimetype,
                sizeInBytes: file.size
            };
            yield FileUploadService.processFileUpload(currentUser, fileUploadCategory, fileData, entityUuid);
            yield fs_1.promises.unlink(uploadFilePath);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Put)(''),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.UploadedFile)('file')),
    __param(2, (0, tsoa_1.Query)('fileUploadCategory')),
    __param(3, (0, tsoa_1.Query)('entityUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "handleFileUpload", null);
UploadController = __decorate([
    (0, tsoa_1.Route)("api/upload"),
    (0, tsoa_1.Tags)('Upload'),
    (0, tsoa_1.Security)('jwt')
], UploadController);
exports.UploadController = UploadController;
const processBulksProductUpload = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContents = fileBuffer.toString();
    const products = JSON.parse(fileContents);
    const firstProductUserUuid = products[0].useruuid;
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const productSeller = yield userRepo.findOne({
        uuid: firstProductUserUuid,
    });
    if (!productSeller) {
        throw new error_response_types_1.NotFoundError('Seller not found');
    }
    for (const product of products) {
        const name = product.name;
        const description = product.description;
        const categoryUuid = product.categoryuuid;
        const brandUuid = product.branduuid;
        const price = product.price;
        const locationState = product.locationstate;
        const minQty = product.minqty;
        const maxQty = product.maxqty;
        const newPickupLocationAddress = product.newpickupaddress;
        const newPickupLocationContactPhone = `${product.contactphonenumber}`;
        const newPickupLocationContactFullName = product.contactfullname;
        const newPickupLocationState = product.state;
        const newPickupLocationCountry = product.country;
        const productRequest = {
            name,
            description,
            categoryUuid,
            brandUuid,
            price,
            locationState,
            minQty,
            maxQty,
            newPickupAddress: {
                address: newPickupLocationAddress,
                country: newPickupLocationCountry,
                state: newPickupLocationState,
                contactFullName: newPickupLocationContactFullName,
                contactPhoneNumber: newPickupLocationContactPhone,
            },
        };
        try {
            const createdProduct = yield ProductsService.processProductSave(productSeller, productRequest, true);
        }
        catch (e) {
            console.log(e.message);
        }
    }
});
//# sourceMappingURL=UploadController.js.map