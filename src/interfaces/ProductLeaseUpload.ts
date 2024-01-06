import { UploadFileCategory } from "../enums/FileUpload";
import { ICloudFile } from "./ICloudFile";

export interface ProductLeaseUploadFile extends ICloudFile {
  documentType: UploadFileCategory
}
