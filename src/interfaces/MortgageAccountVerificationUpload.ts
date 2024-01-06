// MortgageAccountVerificationUpload 
import { UploadFileCategory } from "../enums/FileUpload";
import { ICloudFile } from "./ICloudFile";

export interface MortgageAccountVerificationUpload extends ICloudFile {
  documentType: UploadFileCategory
}
