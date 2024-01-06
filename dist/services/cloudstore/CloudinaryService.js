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
exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("../../constants");
const ErrorMessages_1 = require("../../enums/ErrorMessages");
const error_response_types_1 = require("../../utils/error-response-types");
const isCloudinaryImageDeleted = (cloudinaryDeleteResponse) => {
    if (!cloudinaryDeleteResponse) {
        return false;
    }
    if (!cloudinaryDeleteResponse.result) {
        return false;
    }
    return (cloudinaryDeleteResponse.result === "ok" ||
        cloudinaryDeleteResponse.result === "not found");
};
class CloudinaryService {
    uploadFile(uploadRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_APP_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            try {
                const folderName = process.env.NODE_ENV !== constants_1.ProductionEnv ? "dev" : "prod";
                const cloudinaryUploadResult = yield cloudinary_1.v2.uploader.upload(uploadRequest.file.filePath, { folder: folderName, transformation: [
                        // { width:1944, height:1215 },
                        { fetch_format: "auto" }
                    ] });
                console.log(cloudinaryUploadResult);
                if (!cloudinaryUploadResult.error) {
                    const response = {
                        url: cloudinaryUploadResult.secure_url,
                        key: cloudinaryUploadResult.public_id,
                    };
                    return response;
                }
                throw new error_response_types_1.ServerError(ErrorMessages_1.ErrorMessages.IMAGE_UPLOAD_FAILED);
            }
            catch (e) {
                // logger.error(e.message);
                console.log('cloudinary file upload error');
                console.log(e.message);
                throw new error_response_types_1.ServerError(ErrorMessages_1.ErrorMessages.IMAGE_UPLOAD_FAILED);
            }
        });
    }
    uploadBanner(uploadRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_APP_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            try {
                const folderName = process.env.NODE_ENV !== constants_1.ProductionEnv ? "dev" : "prod";
                const cloudinaryUploadResult = yield cloudinary_1.v2.uploader.upload(uploadRequest.file.filePath, { folder: folderName, transformation: [
                        { width: 1336, height: 196 }
                    ] });
                console.log(cloudinaryUploadResult);
                if (!cloudinaryUploadResult.error) {
                    const response = {
                        url: cloudinaryUploadResult.secure_url,
                        key: cloudinaryUploadResult.public_id,
                    };
                    return response;
                }
                throw new error_response_types_1.ServerError(ErrorMessages_1.ErrorMessages.IMAGE_UPLOAD_FAILED);
            }
            catch (e) {
                // logger.error(e.message);
                console.log('cloudinary file upload error');
                console.log(e.message);
                throw new error_response_types_1.ServerError(ErrorMessages_1.ErrorMessages.IMAGE_UPLOAD_FAILED);
            }
        });
    }
    deleteFile(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_APP_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const cloudinaryResponse = yield cloudinary_1.v2.uploader.destroy(fileKey);
            return isCloudinaryImageDeleted(cloudinaryResponse);
        });
    }
}
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=CloudinaryService.js.map