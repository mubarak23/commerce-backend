import { FileData } from "../../enums/FileUpload";

export interface UploadRequest {
  fileUuid: any;
  file: FileData;
}

export interface UploadResponse {
  url: string;
  key: string;
}

export interface CloudStore {
  uploadFile(uploadData: UploadRequest): Promise<UploadResponse>;
  uploadBanner(uploadData: UploadRequest): Promise<UploadResponse>;
}
