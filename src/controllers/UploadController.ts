/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable class-methods-use-this */
import { Path, Route, Tags, Security, Request, Put, UploadedFile, Controller, Query } from "tsoa";
import { v4 as uuidv4 } from "uuid";
import { promises as fsAsync } from 'fs';

import path from 'path'
import os from 'os'
import * as Fs from 'fs'

import { IServerResponse } from "../interfaces/IServerResponse";
import { BadRequestError, NotFoundError } from "../utils/error-response-types";
import * as FileUploadService from "../services/fileUploadService";
import { FileData, UploadFileCategory } from "../enums/FileUpload";
import { User } from "../entity/User";
import * as AdminService from "../services/adminService"
import * as ProductsService from "../services/productsService";
import { NewProductRequestDto } from "../dto/NewProductRequestDto";
import { getRepository } from "typeorm";
import { NullableString } from "../utils/commonTypes";

// DO NOT EXPORT DEFAULT

@Route("api/upload")
@Tags('Upload')
@Security('jwt')
export class UploadController extends Controller {

  @Put('')
  public async handleFileUpload(@Request() req: any,
      @UploadedFile('file') file: Express.Multer.File,
      @Query('fileUploadCategory') fileUploadCategory: UploadFileCategory,
      @Query('entityUuid') entityUuid?: NullableString,
    ): Promise<IServerResponse<void>> {
    if (!file) throw new BadRequestError(`A file was not uploaded`)

    const currentUser: User = req.user
    if (fileUploadCategory === UploadFileCategory.BULK_PRODUCTS_FILE) {
      await AdminService.isValidAdmin(currentUser)
    }

    const fileUploadDirectory = path.join(os.tmpdir(), "file-uploads");

    if (!Fs.existsSync(fileUploadDirectory)) {
      Fs.mkdirSync(fileUploadDirectory)
    }
    const randomFileName = uuidv4();

    const uploadFilePath: string = path.join(os.tmpdir(), "file-uploads", randomFileName)

    await fsAsync.writeFile(uploadFilePath, file.buffer);

    if (fileUploadCategory === UploadFileCategory.BULK_PRODUCTS_FILE) {
      processBulksProductUpload(file.buffer)

      await fsAsync.unlink(uploadFilePath)

      const resData: IServerResponse<void> = {
        status: true,
      }
  
      return resData
    }

    const fileData: FileData = {
      filePath: uploadFilePath,
      mimeType: file.mimetype,
      sizeInBytes: file.size
    }

    await FileUploadService.processFileUpload(currentUser, fileUploadCategory, fileData, entityUuid)

    await fsAsync.unlink(uploadFilePath)

    const resData: IServerResponse<void> = {
      status: true,
    }

    return resData
  }
}

const processBulksProductUpload = async (fileBuffer: Buffer) => {
  const fileContents = fileBuffer.toString()
  const products = JSON.parse(fileContents)
  const firstProductUserUuid = products[0].useruuid

  const userRepo = getRepository(User);

  const productSeller = await userRepo.findOne({
    uuid: firstProductUserUuid,
  });
  if (!productSeller) {
    throw new NotFoundError('Seller not found')
  }

  for (const product of products) {
    const name = product.name as string
    const description = product.description as string
    const categoryUuid = product.categoryuuid as string
    const brandUuid = product.branduuid as string
    const price = product.price as number
    const locationState = product.locationstate as string
    const minQty = product.minqty as number
    const maxQty = product.maxqty as number
    const newPickupLocationAddress = product.newpickupaddress as string
    const newPickupLocationContactPhone = `${(product.contactphonenumber as number)}`
    const newPickupLocationContactFullName = product.contactfullname as string
    const newPickupLocationState = product.state as string
    const newPickupLocationCountry = product.country as string

    const productRequest: NewProductRequestDto = {
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
    }

    try {
      const createdProduct = await ProductsService.processProductSave(productSeller,
        productRequest, true)
    } catch(e) {
      console.log(e.message)
    }
  }
}
