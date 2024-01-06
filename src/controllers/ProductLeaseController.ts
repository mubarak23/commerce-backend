import { Get, Header, Request, Route, Tags, Security, Put, Body, Post, Inject, Query, Path } from "tsoa";
import * as _ from 'underscore'

import { IServerResponse } from "../interfaces/IServerResponse";
import { getFreshConnection } from "../db";
import { User } from "../entity/User";
import { ProductLeaseResponseDto } from "../dto/ProductLeaseResponseDto";
import { SortOrder } from "../enums/SortOrder";
import { paginate } from "../services/paginationService";
import { FinancialTransaction } from "../entity/FinancialTransaction";
import { Wallet } from "../entity/Wallet";
import { ProductLease } from '../entity/ProductLease';
import { IFinancialTransactionResponseDto } from "../dto/IFinancialTransactionResponseDto";
import { IPaginatedList } from "../dto/IPaginatedList";
import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import * as EmailService from '../services/emailService'
import { CountryCodeToCurrency } from "../enums/Currency";
import { WalletType } from "../enums/WalletType";
import { ProductLeaseRequestDto } from "../dto/ProductLeaseRequestDto";
import { ProductLeaseUploadFile } from "../interfaces/ProductLeaseUpload"
import { BadRequestError, NotFoundError } from "../utils/error-response-types";
import { Category } from "../entity/Category";
import * as ProductLeaseService from "../services/productLeaseService";
import { ProductLeaseRequest } from '../entity/ProductLeaseRequest';
import { Account } from "../entity/Account";

// DO NOT EXPORT DEFAULT

@Route("api/productlease")
@Tags("Product Lease")
@Security("jwt")
export class ProductLeaseController {
  @Post("/productlease/request")
  public async requestProductLease(
    @Request() req: any,
    @Body() requestBody: ProductLeaseRequestDto
  ): Promise<IServerResponse<ProductLeaseResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const productLeaseRepo = connection.getRepository(ProductLease);
    const productLeaseRequestRepo =
      connection.getRepository(ProductLeaseRequest);

    const activeLease = await productLeaseRepo.findOne({
      userId: currentUser.id,
      isActive: true,
    });

    if (activeLease) {
      throw new BadRequestError(
        "An Active Product Financing is currently Running"
      );
    }
    const submittedProductLeaseRequest = await productLeaseRequestRepo.findOne({
      userId: currentUser.id,
    });
    if (submittedProductLeaseRequest) {
      throw new BadRequestError("A Product Lease Request has been submitted");
    }

    let category: Category | undefined;
    if(requestBody.productCategoryUuid) {
      const categoryRepo = connection.getRepository(Category);
      category = await categoryRepo.findOne({
        uuid: requestBody.productCategoryUuid,
      });
      if (!category) {
        throw new BadRequestError("The Category selected does not exist ");
      }  
    }

    const productleaseRequest = new ProductLeaseRequest().initialize(
      currentUser.id,
      requestBody
    );

    const newProductleaseRequest = await productLeaseRequestRepo.save(
      productleaseRequest
    );
    const plpTrigger =  await EmailService.sendMailtoAdminOnPLPApplication(currentUser)

    const resData: IServerResponse<ProductLeaseResponseDto> = {
      status: true,
      data: newProductleaseRequest.toResponseDto(),
    };
    return resData;
  }

  @Get("/productlease/status")
  public async productLeaseStatus(@Request() req: any): Promise<IServerResponse<ProductLeaseResponseDto | null>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const productLeaseRepo = connection.getRepository(ProductLease);
    const activeProductLease = await productLeaseRepo.findOne({
      userId: currentUser.id,
      isActive: true,
      isSoftDeleted: false,
    });

    if (!activeProductLease) {
      return {
        status: true,
        data: null,
      };
    }

    const walletRepo = connection.getRepository(Wallet);
    let wallet = await walletRepo.findOne({
      where: { userId: currentUser.id },
      order: { createdAt: "ASC" },
    });

    if (!wallet) {

      const walletRepoT = connection.getRepository(Wallet);
      const accountRepo = connection.getRepository(Account)
      const userAccount = await accountRepo.findOne({ primaryUserId: currentUser.id})
      const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
      const currency = CurrencyEnum[currentUser.countryIso2] || "NGN";

      wallet = new Wallet().initialize(
        currentUser.id,
        userAccount!.id,
        WalletType.CUSTOMER_WALLET,
        currency
      );
      await walletRepoT.save(wallet);
    }

    const resData: IServerResponse<ProductLeaseResponseDto> = {
      status: true,
      data: {
        uuid: activeProductLease.uuid,
        principalAmountMajor: activeProductLease.principalAmountMinor / 100,
        interestRatePercentage: activeProductLease.interestRatePercentage,
        nextLeasePaymentDueDateUtc: activeProductLease.nextLeasePaymentDueDate,
        totalLoanAmountDueMajor: Math.abs(wallet.walletBalanceMinor) / 100,
        createdAtUtc: activeProductLease.createdAt,
        currency: activeProductLease.currency,
        creditScore: 0,
      },
    };
    return resData;
  }

  @Get("/productlease/:uuid/payments/history")
  public async productLeasePaymentsHistory(
    @Request() req: any,
    @Path("uuid") uuid: string,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder
  ): Promise<
    IServerResponse<IPaginatedList<IFinancialTransactionResponseDto>>
  > {
    const currentUser: User = req.user;
    const connection = await getFreshConnection();
    const productLeaseRepo = connection.getRepository(ProductLease);
    const financialTransactionRepo = connection.getRepository(FinancialTransaction);

    const activeProductLease = await productLeaseRepo.findOne({
      uuid,
    });

    const pageSize = 10;
    const offset = (pageNumber - 1) * pageSize
    
    const pageResultQuery = financialTransactionRepo
      .createQueryBuilder()
      .where("metadata->>'productLeaseId' = :productLeaseId", {
        productLeaseId: activeProductLease!.id
      })
      .andWhere("user_id = :userId", {
        userId: currentUser.id
      })
      .andWhere("paid_status = :paidStatus", {
        paidStatus: PaymentTransactionStatus.PAID
      })
      .skip(offset)
      .limit(pageSize)
      .orderBy("created_at", sortOrder)
    
    const pageResultCount = await pageResultQuery.getCount()
    const pageResultDataset = await pageResultQuery.getMany()
    
    const formattedDataSet: IFinancialTransactionResponseDto[] =
      pageResultDataset.map((dataRecord) => {
        const transaction = dataRecord as FinancialTransaction;
        return transaction.toResponseDto();
      });

    const resData = {
      status: true,
      data: {
        pageNumber,
        pageSize,
        total: pageResultCount,
        dataset: formattedDataSet
      },
    };

    return resData;
  }

  @Post("/productlease/leaveintent")
  public async processProductLeaveLeaveIntent(
    @Request() req: any
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const productLeaseRepo = connection.getRepository(ProductLease);
    const activeProductLease = await productLeaseRepo.findOne({
      userId: currentUser.id,
      isActive: true,
      isSoftDeleted: false,
    });

    const resData = {
      status: true,
    };
    return resData;
  }

  @Get("/productlease/documents")
  public async productLeaseRequestDocs(
    @Request() req: any
  ): Promise<IServerResponse<Omit<ProductLeaseUploadFile, 'keyFromCloudProvider'>[]>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const productLeaseRequestRepo =
      connection.getRepository(ProductLeaseRequest);
    const productLeaseRequest = await productLeaseRequestRepo.findOne({
      userId: currentUser.id,
    });
    if (!productLeaseRequest) {
      throw new NotFoundError('No product lease request found')
    }

    const uploadDocuments: Omit<ProductLeaseUploadFile, 'keyFromCloudProvider'>[] = 
      (productLeaseRequest.uploads || []).map(uDoc => _.omit(uDoc, 'keyFromCloudProvider'))

    const resData = {
      status: true,
      data: uploadDocuments,
    };
    return resData;
  }
}

// IProductLeaseDocsResponseDto
