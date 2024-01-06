/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { getFreshConnection } from '../db';
import { Brand } from '../entity/Brand';
import { Category } from '../entity/Category';
import { MortgageAccountVerification } from '../entity/MortgageAccountVerification';
import { Procurements } from '../entity/Procurement';
import { Product } from '../entity/Product';
import { ProductLeaseRequest } from '../entity/ProductLeaseRequest';
import { Project } from '../entity/Project';
import { User } from "../entity/User";
import { FileCloudProviders, FileData, UploadFileCategory } from "../enums/FileUpload";
import NotificationMessageTypes from '../enums/NotificationMessageTypes';
import { NotificationTransportMode, NotificationTransports } from '../enums/NotificationTransport';
import { ICloudFile } from '../interfaces/ICloudFile';
import { MortgageAccountVerificationUpload } from '../interfaces/MortgageAccountVerificationUpload';
import { ProductLeaseUploadFile } from '../interfaces/ProductLeaseUpload';
import { SellerDocsUpload } from '../interfaces/sellerDocsUpload';
import { NullableString } from '../utils/commonTypes';
import { BadRequestError, NotFoundError, ServerError, UnprocessableEntityError } from '../utils/error-response-types';
import { CloudinaryService } from './cloudstore/CloudinaryService';
import { UploadRequest, UploadResponse } from './cloudstore/cloudstore';
import * as DeveloperService from "./developerService";
import * as EmailService from "./emailService";
import * as NotificationService from "./notificationService";


export const processFileUpload = async (uploaderUser: User, fileCategory: UploadFileCategory, 
    fileData: FileData, entityUuid?: NullableString): Promise<ICloudFile> => {
  const uploadRequest: UploadRequest = {
    fileUuid: uuidv4(),
    file: fileData
  }

  let uploadResponse: ICloudFile | undefined;
  const productLeaseRequestFileTypes = [
    UploadFileCategory.PRODUCT_LEASE_BANK_STATEMENT,
    UploadFileCategory.PRODUCT_LEASE_REQUEST_CAC_CERTIFICATE,
    UploadFileCategory.PRODUCT_LEASE_REQUEST_ID_CARD,
    UploadFileCategory.PRODUCT_LEASE_UTILITY_BILL,
    UploadFileCategory.PRODUCT_LEASE_DISTRIBUTORSHIP_APPOINTMENT_LETTER
  ]

  const sellerDocsFileTypes = [
    UploadFileCategory.SELLER_CAC_DOCUMENT,
    UploadFileCategory.SELLER_ID_CARD,
    UploadFileCategory.SELLER_COMPANY_LOGO
  ]

  if (fileCategory === UploadFileCategory.USER_PHOTO) {
    uploadResponse = await processUserPhotoUpload(uploaderUser, uploadRequest)
  } else if(fileCategory === UploadFileCategory.USER_BACK_DROP_PHOTO){
    uploadResponse = await processStoreFrontBannerImageUpload(uploaderUser, uploadRequest)
  }
  else if (fileCategory === UploadFileCategory.CATEGORY_PHOTO) {
    const categoryRepo = getRepository(Category)
    const category = await categoryRepo.findOne({ uuid: entityUuid! })
    if(!category) {
      throw new NotFoundError('Category was not found')
    }
    uploadResponse = await processCategoryPhotoUpload(uploadRequest, category)
   }
  else if (fileCategory === UploadFileCategory.CATEGORY_BANNER) {
      const categoryRepo = getRepository(Category)
      const category = await categoryRepo.findOne({ uuid: entityUuid! })
      if(!category) {
        throw new NotFoundError('Category was not found')
      }
      uploadResponse = await processCategoryBannerUpload(uploadRequest, category)  
  } else if (fileCategory === UploadFileCategory.BRAND_PHOTO) {
    const brandRepo = getRepository(Brand)
    const brand = await brandRepo.findOne({ uuid: entityUuid! })
    if(!brand) {
      throw new NotFoundError('Brand was not found')
    }
    uploadResponse = await processBrandPhotoUpload(uploadRequest, brand)
  } else if (fileCategory === UploadFileCategory.PRODUCT_PHOTO) {
    const productRepo = getRepository(Product)
    const product = await productRepo.findOne({ uuid: entityUuid! })
    if(!product) {
      throw new NotFoundError('Product was not found')
    }
    uploadResponse = await processProductPhotoUpload(uploadRequest, product)
  }
  else if (fileCategory === UploadFileCategory.PROJECT_IMAGES) {
    const projectRepo = getRepository(Project)
    const project = await projectRepo.findOne({ uuid: entityUuid! })
    if(!project) {
      throw new NotFoundError('Product was not found')
    }
    uploadResponse = await processProjectImageUpload(uploadRequest, project)
  }

  else if (fileCategory === UploadFileCategory.BANK_STATEMENT) {
    const mortgageAccountVerificationRepo = getRepository(MortgageAccountVerification)
    const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({userId: uploaderUser.id })
    if(!mortgageAccountVerification) {
      throw new NotFoundError('No Verification Setup')
    }
    uploadResponse = await processMortgageUserBankStatment(uploadRequest, mortgageAccountVerification)
    await DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser)
  }

  else if (fileCategory === UploadFileCategory.CAC_CERTIFICATE) {
    const mortgageAccountVerificationRepo = getRepository(MortgageAccountVerification)
    const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({userId: uploaderUser.id })
    if(!mortgageAccountVerification) {
      throw new NotFoundError('No Verification Setup')
    }
    uploadResponse = await processMortgageUserCACCertificateUpload(uploadRequest, mortgageAccountVerification)
    await DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser)
  }


  else if (fileCategory === UploadFileCategory.GOVERNMENT_APPROVED_ID) {
    const mortgageAccountVerificationRepo = getRepository(MortgageAccountVerification)
    const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({userId: uploaderUser.id })
    if(!mortgageAccountVerification) {
      throw new NotFoundError('No Verification Setup')
    }
    uploadResponse = await processMortgageUserGovementApprovedId(uploadRequest, mortgageAccountVerification)
    await DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser)
  }

  else if (fileCategory === UploadFileCategory.RECENT_UTILITY_BILL) {
    const mortgageAccountVerificationRepo = getRepository(MortgageAccountVerification)
    const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({userId: uploaderUser.id })
    if(!mortgageAccountVerification) {
      throw new NotFoundError('No Verification Setup')
    }
    
    uploadResponse = await processMortgageUserRecentUtilityBillUpload(uploadRequest, mortgageAccountVerification)
    await DeveloperService.sendDeveloperAccountApprovalRequest(uploaderUser)
  }
else if (fileCategory === UploadFileCategory.PROCURMENT_LIST){
    uploadResponse = await processProcurementListUpload(uploaderUser, uploadRequest)
  }
   else if (productLeaseRequestFileTypes.includes(fileCategory)) {
    const productLeaseRequestRepo = getRepository(ProductLeaseRequest);
    let productLeaseRequest: ProductLeaseRequest | undefined;
    
    if (entityUuid) {
      productLeaseRequest = await productLeaseRequestRepo.findOne({ uuid: entityUuid })      
    } else {
      productLeaseRequest = await productLeaseRequestRepo.findOne({userId: uploaderUser.id})
    }
    if (!productLeaseRequest) {
      throw new ServerError('Product lease request was not found')
    }

    uploadResponse = await processProductLeaseRequestUpload(uploadRequest, fileCategory, productLeaseRequest)
  } else if (sellerDocsFileTypes.includes(fileCategory)) {
    const userRepo = getRepository(User);
    const sellerDetails = await userRepo.findOne({ uuid: entityUuid! });
    // if(!sellerDetails) {
    //   throw new NotFoundError('Could not find seller details')
    // }
    uploadResponse = await processSellerDocsUpload(uploadRequest, fileCategory, sellerDetails!)
  }

  if (uploadResponse) {
    return uploadResponse
  }

  throw new Error('Invalid upload request')
}

const processUserPhotoUpload = async (uploaderUser: User, uploadRequest: UploadRequest): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }

  if (uploadResponse) {
    if (uploaderUser?.photo?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(uploaderUser.photo.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const userRepo = connection.getRepository(User)
  await userRepo.createQueryBuilder()
    .update(User)
    .set({
      photo: cloudFile
    })
    .where({
      id: uploaderUser.id
    })
    .execute()

  return cloudFile
}

const processMortgageUserBankStatment = async (uploadRequest: UploadRequest, mortgageAccountVerification: MortgageAccountVerification): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: MortgageAccountVerificationUpload = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: UploadFileCategory.BANK_STATEMENT
  }

  if (uploadResponse) {
    if (mortgageAccountVerification?.bankStatement?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(mortgageAccountVerification.bankStatement.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification)
  await mortgageAccountVerificationRepo.createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({
      bankStatement: cloudFile
    })
    .where({
      id: mortgageAccountVerification.id
    })
    .execute()

  return cloudFile
}

const processMortgageUserGovementApprovedId = async (uploadRequest: UploadRequest, mortgageAccountVerification: MortgageAccountVerification): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: MortgageAccountVerificationUpload = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: UploadFileCategory.GOVERNMENT_APPROVED_ID
  }

  if (uploadResponse) {
    if (mortgageAccountVerification?.governmentApprovedId?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification)
  await mortgageAccountVerificationRepo.createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({
      governmentApprovedId: cloudFile
    })
    .where({
      id: mortgageAccountVerification.id
    })
    .execute()

  return cloudFile
}

const processMortgageUserRecentUtilityBillUpload = async (uploadRequest: UploadRequest, mortgageAccountVerification: MortgageAccountVerification): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: MortgageAccountVerificationUpload = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: UploadFileCategory.RECENT_UTILITY_BILL
  }

  if (uploadResponse) {
    if (mortgageAccountVerification?.recentUtilityBill?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification)
  await mortgageAccountVerificationRepo.createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({
      recentUtilityBill: cloudFile
    })
    .where({
      id: mortgageAccountVerification.id
    })
    .execute()

  return cloudFile
}

const processMortgageUserCACCertificateUpload = async (uploadRequest: UploadRequest, mortgageAccountVerification: MortgageAccountVerification): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: MortgageAccountVerificationUpload = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: UploadFileCategory.CAC_CERTIFICATE
  }

  if (uploadResponse) {
    if (mortgageAccountVerification?.cacCertificate?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification)
  await mortgageAccountVerificationRepo.createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({
      cacCertificate: cloudFile
    })
    .where({
      id: mortgageAccountVerification.id
    })
    .execute()

  return cloudFile
}

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

const processProcurementListUpload = async (uploaderUser: User, uploadRequest: UploadRequest): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()
  
  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const connection = await getFreshConnection()
  const procurementRepo = connection.getRepository(Procurements)
  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }

  const savedProcurementList = new Procurements().initialize(
    uploaderUser.accountId,
    cloudFile
  );
  const saveProcurement = await procurementRepo.save(savedProcurementList)
  console.log(saveProcurement)
  if(!saveProcurement){
    throw new UnprocessableEntityError('Unable to save procurement')
  }

  // send mail to admin 
  // send mail to cooperate confiming we receive his procurment list.
  
  const notificationMetadata = {
    userId: uploaderUser.id,
  };
  const notificationTransports: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true,
  };
  const notificationTitle = "Procurement list acknowledgement ";
  const notificationBody = `You have successfully uploaded a procurement list on your Cloudwarehouse.
   You will receive a response with availability and pricing shortly.`

  const res = await NotificationService.sendSingleNotificationToUserId(
    uploaderUser.id,
    uploaderUser?.uuid,
    NotificationMessageTypes.PROCURMENT_LIST_UPLOADED,
    notificationTitle,
    notificationBody,
    notificationTransports,
    notificationMetadata
  );

  await EmailService.sendProcurmentUploadMailToAdmin(uploaderUser)
  
  

  return cloudFile
}


const processStoreFrontBannerImageUpload = async (uploaderUser: User, uploadRequest: UploadRequest): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)
  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }

  if (uploadResponse) {
    if (uploaderUser?.storeFrontBanner?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(uploaderUser.storeFrontBanner.keyFromCloudProvider)
        console.log(deleteResponse)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const userRepo = connection.getRepository(User)
  await userRepo.createQueryBuilder()
    .update(User)
    .set({
      storeFrontBanner: cloudFile
    })
    .where({
      id: uploaderUser.id
    })
    .execute()

  return cloudFile
}



const processCategoryPhotoUpload = async (uploadRequest: UploadRequest, category: Category): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }

  if (uploadResponse) {
    if (category?.image?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(category.image.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const categoryRepo = connection.getRepository(Category)
  await categoryRepo.createQueryBuilder()
    .update(Category)
    .set({
      image: cloudFile
    })
    .where({
      uuid: category.uuid
    })
    .execute()

  return cloudFile
}


const processCategoryBannerUpload = async (uploadRequest: UploadRequest, category: Category): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadBanner(uploadRequest)

  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }

  if (uploadResponse) {
    if (category?.banner?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(category.image.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const categoryRepo = connection.getRepository(Category)
  await categoryRepo.createQueryBuilder()
    .update(Category)
    .set({
      banner: cloudFile
    })
    .where({
      uuid: category.uuid
    })
    .execute()

  return cloudFile
}


const processBrandPhotoUpload = async (uploadRequest: UploadRequest, brand: Brand): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }
  if (uploadResponse) {
    if (brand?.image?.keyFromCloudProvider) {
      try {
        const deleteResponse: boolean = await cloudStore.deleteFile(brand.image.keyFromCloudProvider)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const connection = await getFreshConnection()

  const brandRepo = connection.getRepository(Brand)
  await brandRepo.createQueryBuilder()
    .update(Brand)
    .set({
      image: cloudFile
    })
    .where({
      uuid: brand.uuid
    })
    .execute()

  return cloudFile
}

const processProjectImageUpload = async (uploadRequest: UploadRequest, project: Project): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }
  const connection = await getFreshConnection()
  const projectRepo = connection.getRepository(Project);
  if (!project.images) {
    project.images = []
  }
  await projectRepo.createQueryBuilder()
    .update(Project)
    .set({
      images: [...project.images, cloudFile]
    })
    .where({
      uuid: project.uuid
    })
    .execute()

  return cloudFile
}

const processProductPhotoUpload = async (uploadRequest: UploadRequest, product: Product): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: ICloudFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
  }
  const connection = await getFreshConnection()
  const productRepo = connection.getRepository(Product);
  if (!product.images) {
    product.images = []
  }
  await productRepo.createQueryBuilder()
    .update(Product)
    .set({
      images: [...product.images, cloudFile]
    })
    .where({
      uuid: product.uuid
    })
    .execute()

  return cloudFile
}

const processProductLeaseRequestUpload = async (uploadRequest: UploadRequest,
    fileCategory: UploadFileCategory, productLeaseRequest: ProductLeaseRequest): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: ProductLeaseUploadFile = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: fileCategory,
  }
  const productLeaseRequestRepo = getRepository(ProductLeaseRequest);
  if (!productLeaseRequest.uploads) {
    productLeaseRequest.uploads = [];
  }
  const updatedUploads = productLeaseRequest.uploads;

  const existingUploadFile = productLeaseRequest.uploads.find(fUpload => fUpload.documentType === fileCategory)
  if (existingUploadFile) {
    existingUploadFile.url = cloudFile.url
  } else {
    updatedUploads.push(cloudFile)
  }

  await productLeaseRequestRepo.createQueryBuilder()
    .update(ProductLeaseRequest)
    .set({
      uploads: updatedUploads,
    })
    .where({
      id: productLeaseRequest.id
    })
    .execute()

  return cloudFile
}

// processSellerDocsUpload
const processSellerDocsUpload = async (uploadRequest: UploadRequest,
    fileCategory: UploadFileCategory, seller: User): Promise<ICloudFile> => {
  const cloudStore: CloudinaryService = new CloudinaryService()

  const uploadResponse: UploadResponse = await cloudStore.uploadFile(uploadRequest)

  const cloudFile: SellerDocsUpload = {
    keyFromCloudProvider: uploadResponse.key,
    url: uploadResponse.url,
    mimetype: uploadRequest.file.mimeType,
    fileCloudProvider: FileCloudProviders.CLOUDINARY,
    documentType: fileCategory,
  };
  const sellerRepo = getRepository(User);
  if (!seller.sellerDocs) {
    seller.sellerDocs = [];
  }
  const updatedUploads = seller.sellerDocs;

  const existingUploadFile = seller.sellerDocs.find(fUpload => fUpload.documentType === fileCategory)
  if (existingUploadFile) {
    existingUploadFile.url = cloudFile.url
  } else {
    updatedUploads.push(cloudFile)
  }

  await sellerRepo.createQueryBuilder()
    .update(User)
    .set({
      sellerDocs: updatedUploads,
    })
    .where({
      uuid: seller.uuid
    })
    .execute()

  return cloudFile
}


export const processDeleteProductPhoto = async (keyFromCloudProvider: string, product: Product): Promise<boolean> =>{
  const cloudStore: CloudinaryService = new CloudinaryService()
  const productRepo = getRepository(Product);

  const { images } = product

  const foundProductImage = images.find(
    (image) => image.keyFromCloudProvider === keyFromCloudProvider
  );
  if(!foundProductImage){
    throw new BadRequestError('Image does not exist on the product')
  }

  const remainingImages = images.filter( (image) => image.keyFromCloudProvider !== keyFromCloudProvider )
 
  try {
    await cloudStore.deleteFile(keyFromCloudProvider)
    
    await productRepo
    .createQueryBuilder()
    .update(Product)
    .set({
      images: remainingImages,
    })
    .where({
      id: product.id,
    })
    .execute();
    

  } catch (e) {
    console.log(e)
    throw new BadRequestError('Failed to Delete Product Image')
  }
  return true

}
