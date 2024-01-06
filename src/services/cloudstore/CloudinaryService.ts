import * as store from "./cloudstore";

import { v2 as cloudinary } from "cloudinary";
import { ProductionEnv } from "../../constants";
import { ErrorMessages } from "../../enums/ErrorMessages";
import { ServerError } from "../../utils/error-response-types";

const isCloudinaryImageDeleted = (cloudinaryDeleteResponse: {
  result: string;
}): boolean => {
  if (!cloudinaryDeleteResponse) {
    return false;
  } if (!cloudinaryDeleteResponse.result) {
    return false;
  } 
    return (
      cloudinaryDeleteResponse.result === "ok" ||
      cloudinaryDeleteResponse.result === "not found"
    );
  
};

export class CloudinaryService implements store.CloudStore {
  async uploadFile(
    uploadRequest: store.UploadRequest
  ): Promise<store.UploadResponse> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_APP_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      const folderName = process.env.NODE_ENV !== ProductionEnv ? "dev" : "prod";
      const cloudinaryUploadResult = await cloudinary.uploader.upload(
         uploadRequest.file.filePath,
        { folder: folderName, transformation: [
          // { width:1944, height:1215 },
          {fetch_format: "auto"}
        ] },
      );
      console.log(cloudinaryUploadResult);

      if (!cloudinaryUploadResult.error) {
        const response: store.UploadResponse = {
          url: cloudinaryUploadResult.secure_url,
          key: cloudinaryUploadResult.public_id,
        };
        return response;
      } 
      throw new ServerError(ErrorMessages.IMAGE_UPLOAD_FAILED);
    } catch (e) {
      // logger.error(e.message);
      console.log('cloudinary file upload error')
      console.log(e.message)
      throw new ServerError(ErrorMessages.IMAGE_UPLOAD_FAILED);
    }
  }

  async uploadBanner(
    uploadRequest: store.UploadRequest
  ): Promise<store.UploadResponse> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_APP_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      const folderName = process.env.NODE_ENV !== ProductionEnv ? "dev" : "prod";
      const cloudinaryUploadResult = await cloudinary.uploader.upload(
         uploadRequest.file.filePath,
        { folder: folderName, transformation: [
          { width:1336, height:196 }
        ]  },
        
      );
      console.log(cloudinaryUploadResult);

      if (!cloudinaryUploadResult.error) {
        const response: store.UploadResponse = {
          url: cloudinaryUploadResult.secure_url,
          key: cloudinaryUploadResult.public_id,
        };
        return response;
      } 
      throw new ServerError(ErrorMessages.IMAGE_UPLOAD_FAILED);
    } catch (e) {
      // logger.error(e.message);
      console.log('cloudinary file upload error')
      console.log(e.message)
      throw new ServerError(ErrorMessages.IMAGE_UPLOAD_FAILED);
    }
  }


  async deleteFile(fileKey: string): Promise<boolean> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_APP_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const cloudinaryResponse = await cloudinary.uploader.destroy(fileKey);
    return isCloudinaryImageDeleted(cloudinaryResponse);
  }
}
