import { UploadFileCategory } from "../enums/FileUpload";
import { ICloudFile } from "./ICloudFile";

export interface SellerDocsUpload extends ICloudFile {
  documentType: UploadFileCategory;
}
