/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PhoneNumber from "awesome-phonenumber";
import moment from 'moment';
import { Body, Controller, Get, Patch, Path, Post, Put, Query, Request, Route, Security, Tags } from "tsoa";
import * as _ from "underscore";

import { getRepository, In, IsNull, Not } from "typeorm";
import * as Constant from '../constants';
import { getFreshConnection } from "../db";
import { IAddNewFinancialTransactionByAdmin } from "../dto/IAddNewFinancialTransactionByAdmin";
import { IPaginatedList } from "../dto/IPaginatedList";
import { IEditProductLeaseRequestDto, INewProductLeaseRequestDto } from "../dto/IProductLeaseRequestDto";
import { IPublicProfile, IPublicProfileForAdmin } from '../dto/IProfileResponse';
import { IWalletTransferTransactionByAdmin } from "../dto/IWalletTransferTransactionByAdmin";
import { NewAffiliateRequestDto } from "../dto/NewAffiliateRequestDto";
import NewBrandRequestDto from "../dto/NewBrandRequestDto";
import { NewCategoryRequestDto } from "../dto/NewCategoryRequestDto";
import { NewPromotionRequestDto } from "../dto/NewPromotionRequestDto";
import { NewUpdateCategoryRequestDto } from "../dto/NewUpdateCategoryRequestDto";
import { OrderDetailsResponseDto } from "../dto/OrderDetailsResponseDto";
import { OrdersDetailsForAdminResponseDto } from "../dto/OrdersDetailsForAdminResponseDto";
import { Account } from "../entity/Account";
import { Brand } from '../entity/Brand';
import { Category } from "../entity/Category";
import { FinancialTransaction, FinancialTransactionMetadata } from '../entity/FinancialTransaction';
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { ProductLease } from "../entity/ProductLease";
import { Promotion } from "../entity/Promotion";
import { RequestBankDetailsChange } from "../entity/RequestBankDetailsChange";
import { User } from '../entity/User';
import { Wallet } from '../entity/Wallet';
import { WalletToWalletTransfer } from '../entity/WalletToWalletTransfer';
import { AccountType } from "../enums/AccountType";
import { CountryCodeToCurrency, CountryToCurrency } from "../enums/Currency";
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { OrderPaymentVariant } from "../enums/OrderPaymentVariant";
import { PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { Roles } from "../enums/Roles";
import { SortOrder } from "../enums/SortOrder";
import OrderStatuses, { OrderPaymentStatuses, QuoteRequestStatuses, WareHouseToSiteDeliveryFeeStatuses } from "../enums/Statuses";
import { WalletType } from "../enums/WalletType";
import { IFinancialTransactionForAdmin } from '../interfaces/IFinancialTransactionResponseDto';
import { IProductLease, IPublicProfileProductLease } from "../interfaces/IProductLease";
import { IServerResponse } from "../interfaces/IServerResponse";
import { INewProductLeaseStatusToggleDto } from "../interfaces/ProductLease";
import { WelcomeMailData } from "../interfaces/WelcomeMailData";
import * as AdminService from "../services/adminService";
import * as auditLogService from '../services/auditLogService';
import * as DeveloperService from "../services/developerService";
import * as EmailService from '../services/emailService';
import * as MortgageCardService from '../services/mortgageCardService';
import * as NotificationService from "../services/notificationService";
import * as OrderService from '../services/orderService';
import * as PaginationService from "../services/paginationService";
import * as PaymentService from "../services/paymentService";
import * as PaystackService from '../services/paystackService';
import * as PriceMatrixService from "../services/priceMatrixService";
import * as ProductLeaseService from '../services/productLeaseService';
import * as ProductService from '../services/productsService';
import * as ProductsService from "../services/productsService";
import * as ProfileService from "../services/profileService";
import * as ProjectService from '../services/projectService';
import * as PromotionService from "../services/promotionService";
import * as QouteRequestService from '../services/quoteRequestService';
import * as AccountStatService from "../services/sellerAccountStatService";
import * as SmsService from '../services/smsSendingService';
import * as WalletService from '../services/walletService';
import * as Utils from "../utils/core";
import { BadRequestError, ConflictError, NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";

import { AddDeliveryLocationByAdminRequestDto } from "../dto/AddDeliveryLocationByAdminRequestDto";
import { AddItemToInvoiceRequestDto } from "../dto/AddItemToInvoiceRequestDto";
import { ApprovedMortgageAccountDocumentDto } from "../dto/ApprovedMortgageAccountDocumentDto";
import { CreateOrderByAdminRequestDto } from "../dto/CreateOrderByAdminRequestDto";
import { DeliveryLocationResponseDto } from "../dto/DeliveryLocationResponseDto";
import { DeveloperAccountVerificationResponseAdminDto } from "../dto/DeveloperAccountVerificationResponseDto";
import { IAuditLogs } from "../dto/IAuditLogs";
import { IVirtualDedicatedAccount } from "../dto/IVirtualDedicatedAccount";
import { MortgageCardDto } from "../dto/MortgageCardDto";
import { MoveSellerProductToOmaDto } from "../dto/MoveSellerProductToOmaDto";
import { NewProductRequestDtoByAdmin } from "../dto/NewProductRequestDto";
import { NewSellerOmaRequestDto } from "../dto/NewSellerOmaRequestDto";
import { OrderPayResponseDto } from "../dto/OrderPayResponseDto";
import { PriceMatricesResponseByAdmin } from "../dto/PriceMatricesResponseDtoAdmin";
import { ProcurementDtoForAdmin } from "../dto/ProcurementDto";
import { ProcurementInvoiceResponseDtoForAdmin } from "../dto/ProcurementInvoiceResponseDto";
import { ProductsResponseDto, ProductsResponseDtoAdmin } from "../dto/ProductsResponseDto";
import { QouteRequestAdminCreateRequestDto } from "../dto/QouteRequestAdminCreateRequestDto";
import { QuoteRequestResponseDtoAdmin } from "../dto/QuoteRequestResponseDto";
import { RequestBankDetailsChangeDtoForAdmin } from "../dto/RequestBankDetailsChangeDto";
import { SubmitPriceMatricDto } from "../dto/SubmitPriceMatricDto";
import { WareHouseToSiteDeliveryDtoForAdmin } from "../dto/WareHouseToSiteDeliveryDto";
import { AuditLogs } from "../entity/AuditLogs";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { MortgageAccountVerification } from "../entity/MortgageAccountVerification";
import { PaystackDedicatedNuban } from "../entity/PaystackDedicatedNuban";
import { PickupLocation } from "../entity/PickupLocation";
import { PriceMatrix } from "../entity/PriceMatrix";
import { Procurements } from "../entity/Procurement";
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { Project } from "../entity/Project";
import { QuoteRequest } from "../entity/QuoteRequest";
import { SellerAccountStat } from "../entity/SellerAccountStat";
import { WareHouse } from "../entity/WareHouse";
import { WareHouseToSiteDeliveryRequest } from '../entity/WareHouseToSiteDeliveryRequest';
import { MortgageAccountVerificationFiles } from "../enums/FileUpload";
import { OrderReceiveTypes } from "../enums/OrderReceiveTypes";
import { ProjectStatuses } from "../enums/ProjectEnums";
import { IMoveProductToSeller } from "../interfaces/IMoveProductToSeller";
import { NotificationMetadata } from "../interfaces/NotificationMetadata";

// DO NOT EXPORT DEFAULT

@Route("api/admin")
@Tags("Admin")
@Security("jwt")
export class AdminController extends Controller {

  @Post("/category/create")
  public async createCategories(@Body() requestBody: NewCategoryRequestDto): Promise<IServerResponse<any>> {
    const categoryData = requestBody;
    const categoryRepository = getRepository(Category);
    const categoryExist = await categoryRepository.findOne({
      name: categoryData.name,
    });
    if (categoryExist) {
      throw new ConflictError("Category has already been created");
    }
    // send request to store image - coming back
    // category_data.image = cloudenlyurl
    const category = new Category().initialize(categoryData);

    await categoryRepository.save(category);
    this.setStatus(201);
    const resData: IServerResponse<any> = {
      status: true,
      data: categoryExist,
    };
    return resData;
  }

  @Patch("category/:categoryUuid")
  public async updateCategory(
      @Request() req: any,
      @Body() requestBody: NewUpdateCategoryRequestDto, 
      @Path("categoryUuid") categoryUuid: any): Promise<IServerResponse<void>> {
        const currentAdminUser: User = req.user
        await AdminService.isValidAdmin(currentAdminUser)
      await AdminService.adminCanEdit(req, currentAdminUser);

    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.findOne({
      uuid: categoryUuid,
    });

    if (!category) {
      this.setStatus(404);

      const resData: IServerResponse<any> = {
        status: false,
        error: "Specified cagegory does not exist",
        message: "Specified category does not exist",
      };
      return resData;
    }

    if (requestBody.brandUuids) {
      const brandRepo = getRepository(Brand);
      const brands = await brandRepo.find({
        uuid: In(requestBody.brandUuids),
      });
      category.brands = brands.map((brand) => {
        return { name: brand.name, uuid: brand.uuid };
      });
    }
    if(requestBody.name) {
      category.name = requestBody.name
    }
    if(requestBody.description) {
      category.description = requestBody.description
    }
    if(requestBody.unitOfMeasurement) {
      category.description = requestBody.unitOfMeasurement
    }
    await category.save();

    this.setStatus(200);
    const resData: IServerResponse<void> = {
      status: true,
    };

    return resData;
  }

  @Post("/brand/create")
  public async createBrand(@Body() requestBody: NewBrandRequestDto): Promise<IServerResponse<any>> {
    const brandRepo = getRepository(Brand);
    const brandExist = await brandRepo.findOne({
      name: requestBody.name,
    });
    if (brandExist) {
      throw new ConflictError("Brand has already been created");
    }

    const categoryRepo = getRepository(Category);

    let categories: Category[] = []
    if(requestBody.categoryUuids) {
      categories = await categoryRepo.find({
        uuid: In(requestBody.categoryUuids),
      });  
    }

    let newBrand = new Brand().initialize(
      requestBody.name,
      categories
    );
    newBrand = await brandRepo.save(newBrand);

    for(const category of categories) {
      const categoryExistingBrand = category.brands?.find(catBrand => catBrand.name === requestBody.name)
      if(!categoryExistingBrand) {
        await categoryRepo.createQueryBuilder()
          .update(Category)
          .set({
            brands: [...category.brands, {
              uuid: newBrand.uuid, 
              name: newBrand.name
            }]
          })
          .where({
            id: category.id
          })
          .execute()
      }
    }

    this.setStatus(201);
    const resData: IServerResponse<any> = {
      status: true,
      data: {
        uuid: newBrand.uuid,
        name: newBrand.name,
      },
    };
    return resData;
  }

  @Patch("brand/:brandUuid")
  public async updateBrand(
    @Request() req: any,
    @Body() requestBody: NewBrandRequestDto,
    @Path("brandUuid") brandUuid: any
  ): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const brandRepo = getRepository(Brand);
    const brand = await brandRepo.findOne({
      uuid: brandUuid,
    });

    if (!brand) {
      this.setStatus(404);

      const resData: IServerResponse<any> = {
        status: false,
        error: "Specified brand does not exist",
        message: "Specified brand does not exist",
      };
      return resData;
    }

    if (!requestBody.name) {
      this.setStatus(400);

      const resData: IServerResponse<any> = {
        status: false,
        error: "No brand name specified",
        message: "Please specify the name of the brand",
      };
      return resData;
    }

    if (requestBody.categoryUuids) {
      const categoryRepo = getRepository(Category);
      const categories = await categoryRepo.find({
        uuid: In(requestBody.categoryUuids),
      });
      brand.categories = categories.map((cat) => {
        return { name: cat.name, uuid: cat.uuid };
      });
    } else {
      brand.categories = [];
    }
    brand.save();

    this.setStatus(200);
    const resData: IServerResponse<void> = {
      status: true,
    };

    return resData;
  }

  @Get("/users")
  public async handleUsersFetch(
    @Request() req: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("pageNumber") pageNumber?: any,
    @Query("filter") filter?: any,
    @Query("ids") ids?: string
  ): Promise<IServerResponse<IPaginatedList<IPublicProfileForAdmin> | IPublicProfileForAdmin[]>> {
    const currentAdminUser: User = req.user;
    await AdminService.isValidAdmin(currentAdminUser);

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids));
      if (!idsAsJsonArray.length) {
        throw new BadRequestError("user ids were not specified");
      }
      const idsAsJsonNumberArray = idsAsJsonArray.map((anId) => Number(anId));

      const query = {
        uuid: In(idsAsJsonArray),
      }

      const users = await userRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const userIds = users.map(user => user.id)

      const publicProfiles =
        await ProfileService.getPublicProfileFromUserIdsForAdmin(
          userIds
        );

      const resData: IServerResponse<IPublicProfileForAdmin[]> = {
        status: true,
        data: publicProfiles,
      };
      return resData;
    }

    const query: any = {
      msisdn: Not(IsNull()),
    };
    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.id = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === 'phoneNumber') {
          if (filtersAsJson[filterKey].startsWith('0')) {
            query[filterKey]  = filtersAsJson[filterKey].substring(1)
          }
        }
      }
    }
    const pageSize = 10;
    pageNumber = pageNumber || 1;
    const offset = (pageNumber - 1) * pageSize;

    const totalAssignmentsNumber = await userRepo.count({
      where: query,
    });
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(
        `Page exceeds current number of users`
      );
    }

    const pageResult = await PaginationService.paginate(
      User,
      query,
      10,
      pageNumber,
      sortOrder
    );

    if (!pageResult.dataset.length) {
      return {
        status: true,
        data: {
          pageNumber,
          total: totalAssignmentsNumber,
          pageSize,
          dataset: [],
        },
      };
    }

    const usersInDataset: User[] = pageResult.dataset.map((dataRecord) => {
      const user = dataRecord as User;
      return user;
    });

    const userIds = usersInDataset.map((user) => user.id);

    const publicProfiles =
      await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);

    const resData: IServerResponse<IPaginatedList<IPublicProfileForAdmin>> = {
      status: true,
      data: {
        dataset: publicProfiles,
        pageNumber,
        total: totalAssignmentsNumber,
        pageSize,
      },
    };
    return resData;
  }

  @Get("/users/:id")
  public async handleUserDetailsFetch(
    @Request() req: any,
    @Path("id") id: string
  ): Promise<IServerResponse<IPublicProfileForAdmin>> {
    const currentAdminUser: User = req.user;
    await AdminService.isValidAdmin(currentAdminUser);

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    const user = await userRepo.findOne({uuid: id});
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const publicProfiles = 
      await ProfileService.getPublicProfileFromUserIdsForAdmin([user.id]);

    const resData: IServerResponse<IPublicProfileForAdmin> = {
      status: true,
      data: publicProfiles[0],
    };
    return resData;
  }

  @Get("/deliverylocations")
  public async handleDeliveryLocationFetch(
    @Request() req: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("pageNumber") pageNumber?: any,
    @Query("filter") filter?: any,
    @Query("ids") ids?: string
  ): Promise<IServerResponse<IPaginatedList<DeliveryLocationResponseDto> | DeliveryLocationResponseDto[]>>{
    const currentAdminUser: User = req.user;
    await AdminService.isValidAdmin(currentAdminUser);

    const connection = await getFreshConnection();
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation);

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids));
      if (!idsAsJsonArray.length) {
        throw new BadRequestError("Delivery Location ids were not specified");
      }
      const idsAsJsonNumberArray = idsAsJsonArray.map((anId) => Number(anId));

      const query = {
        uuid: In(idsAsJsonArray),
      }

      const deliveryLocations = await deliveryLocationRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })

    const formattedDeliveryAddresses: DeliveryLocationResponseDto[] = deliveryLocations.map(location => {
      return {
        id: location.id,
        userId: location.userId,
        contactFullName: location.contactFullName,
        contactPhoneNumber: location.contactPhoneNumber,
        address: location.address,
        state: location.state,
        country: location.country,
        createdAt: location.createdAt
      }
    
    })

    const resData: IServerResponse<DeliveryLocationResponseDto[]> = {
      status: true,
      data: formattedDeliveryAddresses,
    }

      return resData;
    }

    const query: any = {
      
    };
    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.userId = Number(filtersAsJson[filterKey]);
        }
      }
    }
    const pageSize = 10;
    pageNumber = pageNumber || 1;
    const offset = (pageNumber - 1) * pageSize;

    const totalAssignmentsNumber = await deliveryLocationRepo.count({
      where: query,
    });
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(
        `Page exceeds current number of Delivery Location`
      );
    }

    const pageResult = await PaginationService.paginate(
      DeliveryLocation,
      query,
      10,
      pageNumber,
      sortOrder
    );

    if (!pageResult.dataset.length) {
      return {
        status: true,
        data: {
          pageNumber,
          total: totalAssignmentsNumber,
          pageSize,
          dataset: [],
        },
      };
    }

    const deliveryLocationInDataset: DeliveryLocation[] = pageResult.dataset.map((dataRecord) => {
      const location = dataRecord as DeliveryLocation;
      return location;
    });

    const formattedDeliveryAddresses: DeliveryLocationResponseDto[] = deliveryLocationInDataset.map(location => {
      return {
        id: location.id,
        userId: location.userId,
        contactFullName: location.contactFullName,
        contactPhoneNumber: location.contactPhoneNumber,
        address: location.address,
        state: location.state,
        country: location.country,
        createdAt: location.createdAt
      }
    
    })
    const resData: IServerResponse<IPaginatedList<DeliveryLocationResponseDto>> = {
      status: true,
      data: {
        dataset: formattedDeliveryAddresses,
        pageNumber,
        total: totalAssignmentsNumber,
        pageSize,
      },
    };
    return resData;
  }


  @Post("/deliverylocations")
  public async handleAddDeliveryLocation(
    @Request() req: any,
    @Body() requestBody: AddDeliveryLocationByAdminRequestDto
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const { address, contactFullName, contactPhoneNumber, userId, state } = requestBody
    
    const connection = await getFreshConnection();
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const userRepo = connection.getRepository(User);

    const user = await userRepo.findOne({
      where: {
        id: userId
      }
    })

    if(!user){
      throw new NotFoundError('User Does Not Exist');
    }

    const getDeliveryLocation = await DeliveryLocationRepo.findOne({
      userId: user.id,
      address,
    });

    if (getDeliveryLocation) {
      throw new UnprocessableEntityError("Delivery Location Has Been Added On Your List");
    }
    const  deliveryLocation = new DeliveryLocation().initialize(user.id, address, state, 'Nigeria', contactFullName, contactPhoneNumber);
    
      await DeliveryLocationRepo.save(deliveryLocation);
    const resData: IServerResponse<any> = {
      status: true,
      data: { uuid: deliveryLocation.uuid }
    };
    return resData;
  }




  // ----------Product Lease

  @Get('/productleases')
  public async handleGetAllProductLeasesForAdmin(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<IPublicProfileProductLease> | IPublicProfileProductLease[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = getFreshConnection()
    const productLeaseRepo = (await connection).getRepository(ProductLease)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const productLeases = await productLeaseRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const userIds: number[] = productLeases.map(productLease => {
        return productLease.userId
      })
      const publicProfiles: IPublicProfileForAdmin[] = await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds)

      const publicProductLeases: IPublicProfileProductLease[] = productLeases.map(productLease => {
        const publicProfile = publicProfiles.find(pP => pP.userId === productLease.userId)
        return productLease.transformForPublic(publicProfile!)
      })
    
      const resData: IServerResponse<IPublicProfileProductLease[]> = {
        status: true,
        data: publicProductLeases,
      }
      return resData
    }

    const query: any = {}
    if (filter) {
      const filtersAsJson = JSON.parse(filter!)
      for (const filterKey in filtersAsJson) {
        if (filterKey === 'userId') {
          query[filterKey] = Number(filtersAsJson[filterKey])
        }
      }
    }
    const pageSize = 10

    const totalAssignmentsNumber = await productLeaseRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of users`)
    }

    const pageResult = await PaginationService.paginate(ProductLease, query, pageSize, pageNumber, sortOrder)

    const userIds: number[] = pageResult.dataset.map(dataRecord => {
      const productLease = dataRecord as ProductLease
      return productLease.userId
    })

    if (!userIds.length) {
      const resData = {
        status: true,
        data: {...pageResult, dataset: []}
      }
      return resData
    }

    const publicProfiles: IPublicProfileForAdmin[] = await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds)

    const formattedDataSet: IPublicProfileProductLease[] = pageResult.dataset.map(dataRecord => {
      const productLease = dataRecord as ProductLease
      const publicProfile = publicProfiles.find(pP => pP.userId === productLease.userId)
      return productLease.transformForPublic(publicProfile!)
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/productleases/:id')
  public async handleGetOneProductLeasesForAdmin(@Request() req: any, @Path('id') id: string,): Promise<IServerResponse<IPublicProfileProductLease>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
  
    const productLeaseRepo = (await connection).getRepository(ProductLease)

    const productLease = await productLeaseRepo.findOne({
      where: {
        uuid: id,
      },
    })
    if (!productLease) {
      throw new NotFoundError('Product lease not found')
    }
    const publicProfile: IPublicProfile = await ProfileService.getPublicProfileFromUserId(productLease.userId)

    const publicProductLeases: IPublicProfileProductLease = {
      ...productLease,
      id: productLease.uuid,
      principalAmountMajor: productLease.principalAmountMinor / 100,
      nextLeasePaymentDueDateUtc: productLease.nextLeasePaymentDueDate,
      createdAtUtc: productLease.createdAt,
      publicProfile: publicProfile!,
    }
  
    const resData: IServerResponse<IPublicProfileProductLease> = {
      status: true,
      data: publicProductLeases,
    }
    return resData
  }

  @Put("/productleases/toggle")
  @Security("jwt")
  public async handleProductLeaseStatusToggleByAdmin(
    @Request() req: any,
    @Body() reqBody: INewProductLeaseStatusToggleDto
  ): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user;
    await AdminService.isValidAdmin(currentAdminUser);
    await AdminService.adminCanEdit(req, currentAdminUser);

    let { customerUserId } = reqBody;

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    let customerUser: User | undefined;

    if (!customerUserId) {
      throw new BadRequestError("Customer User Id was not sent");
    } else {
      customerUserId = Number(customerUserId!);
    }

    if (customerUserId) {
      customerUser = await userRepo.findOne({ id: customerUserId });
      if (!customerUser) {
        throw new NotFoundError("Customer not found");
      }
    }
    if(!customerUser) {
      throw new NotFoundError("Customer not found");
    }

    const isOnProductLease = !!customerUser.settings?.isOnProductLease;

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        settings: {
          ...customerUser?.settings,
          isOnProductLease: !isOnProductLease,
        },
      })
      .where({ id: customerUserId! })
      .execute();

    if (!isOnProductLease) {
      // EmailService.sendCustomerEnabledForPlp(customerUser)
    }

    // Send Both IN_APP and Email Notification
    const enablePlpMail = await EmailService.sendCustomerEnabledForPlp(customerUser)
    console.log(enablePlpMail)
     const notificationTransports: NotificationTransports = {
        [NotificationTransportMode.IN_APP]: true,
      }
     await NotificationService.sendSingleNotificationToUserId(customerUser.id, customerUser.uuid,
        NotificationMessageTypes.ENABLE_PLP, 
        'PLP Enabled', 
        'This is to notify you that you have been enabled to begin the supply process for <b>PLP</b>You may now Proceed to Raise a Quote Request on the <b>CinderBuild</b> Website.<Br> We are always available to assist you.',
        notificationTransports
        )
     
    const resData: IServerResponse<boolean> = {
      status: true,
      data: !isOnProductLease,
    };

    return resData;
  }

  // @Put("/productleases/delayed/toggle")
  // @Security("jwt")
  // public async handleProductLeaseDelayedToggleByAdmin(
  //   @Request() req: any,
  //   @Body() reqBody: INewProductLeaseStatusToggleDto
  // ): Promise<IServerResponse<boolean>> {
  //   const currentAdminUser: User = req.user;
  //   await AdminService.isValidAdmin(currentAdminUser);

  //   let { customerUserId } = reqBody;

  //   const connection = await getFreshConnection();
  //   const userRepo = connection.getRepository(User);
  //   let customerUser: User;

  //   if (!customerUserId) {
  //     throw new BadRequestError("Customer User Id was not sent");
  //   } else {
  //     customerUserId = Number(customerUserId!);
  //   }

  //   if (!customerUser) {
  //     customerUser = await userRepo.findOne({ id: customerUserId });
  //     if (!customerUser) {
  //       throw new NotFoundError("Customer not found");
  //     }
  //   }

  //   const isOnDelayedProductLease = !!customerUser.settings?.isOnDelayedProductLease;

  //   await userRepo
  //     .createQueryBuilder()
  //     .update(User)
  //     .set({
  //       settings: {
  //         ...customerUser.settings,
  //         isOnDelayedProductLease: !isOnDelayedProductLease,
  //       },
  //     })
  //     .where({ id: customerUserId! })
  //     .execute();

  //   const resData: IServerResponse<boolean> = {
  //     status: true,
  //     data: !isOnDelayedProductLease,
  //   };

  //   return resData;
  // }

  //--

  @Post('/productleases')
  @Security("jwt")
  public async handleNewProductLeaseByAdmin(@Request() req: any, @Body() reqBody: INewProductLeaseRequestDto): Promise<IServerResponse<IPublicProfileProductLease>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { customerMsisdn, principalAmountMinor, interestRatePercentage } = reqBody

    let { customerUserId } = reqBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)

    let customerUser: User | undefined;

    if (customerMsisdn) {
      customerUser = await userRepo.findOne({ msisdn: customerMsisdn! })
      if (!customerUser) {
        throw new NotFoundError('Customer not found')
      }
      customerUserId = customerUser.id
    } else if (customerUserId) {
      customerUser = await userRepo.findOne({ id: customerUserId! })
      if (!customerUser) {
        throw new NotFoundError('Customer not found')
      }
    } else if(!customerUserId) {
      throw new BadRequestError('Customer User Id was not sent')
    }
    if(!customerUser) {
      throw new NotFoundError("Customer not found");
    }

    const productLeaseRepo = connection.getRepository(ProductLease)
    const currentSettings = customerUser.settings || {}

    await userRepo.createQueryBuilder()
      .update(User)
      .set({ settings: {...currentSettings, isOnProductLease: true} })
      .where({ id: customerUserId! })
      .execute()
    
    const activeProductLease = await productLeaseRepo.findOne({
      userId: customerUserId!,
      isActive: true,
      isSoftDeleted: false,
    })
    if (activeProductLease) {
      throw new ConflictError('An existing product lease exists')
    }

    const currency: string = Utils.countryToCurrency(customerUser.countryLongName)

    const newNextLeasePaymentDueDate = moment.utc().add(30, 'days').toDate()
    const productLease = new ProductLease().initialize(customerUser.id, principalAmountMinor,
      newNextLeasePaymentDueDate, interestRatePercentage,
      currency)

    const createdProductLease = await productLeaseRepo.save(productLease)
    const publicProfile: IPublicProfile = await ProfileService.getPublicProfileFromUserId(customerUserId!)

    const resData: IServerResponse<IPublicProfileProductLease> = {
      status: true,
      data: {
        id: createdProductLease.uuid,
        uuid: createdProductLease.uuid,
        publicProfile,
        principalAmountMajor: createdProductLease.principalAmountMinor / 100,
        interestRatePercentage: createdProductLease.interestRatePercentage,
        nextLeasePaymentDueDateUtc: createdProductLease.nextLeasePaymentDueDate,
        createdAtUtc: createdProductLease.createdAt,
        currency: createdProductLease.currency,
      }
    }
    return resData
  }

  @Put('/productleases/:id')
  public async handleEditProductLease(@Request() req: any,
      @Path('id') id: string,
      @Body() reqBody: IEditProductLeaseRequestDto): Promise<IServerResponse<IPublicProfileProductLease>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { principalAmountMinor, interestRatePercentage, nextLeasePaymentDueDate, isActive } = reqBody

    const connection = await getFreshConnection()
    const productLeaseRepo = connection.getRepository(ProductLease)

    const productLease = await productLeaseRepo.findOne({uuid: id})
    if (!productLease) {
      throw new ConflictError('Product lease does not exist')
    }

    if (isActive) {
      if (principalAmountMinor >= 0) {
        productLease.principalAmountMinor = principalAmountMinor
        productLease.interestRatePercentage = interestRatePercentage
  
        if (nextLeasePaymentDueDate && nextLeasePaymentDueDate.length) {
          const nextLeasePaymentDueDateMoment = moment.utc(nextLeasePaymentDueDate)
          if (nextLeasePaymentDueDateMoment.isValid()) {
            productLease.nextLeasePaymentDueDate = nextLeasePaymentDueDateMoment.toDate()
          } else {
            throw new BadRequestError('Next lease payment due date is in valid')
          }
        }
      } else {
        productLease.isActive = false
      }
      productLease.isActive = true
    } else {
      productLease.isActive = false
    }

    // const newNextLeasePaymentDueDate = moment.utc().add(30, 'days').toDate()

    const updatedProductLease = await productLeaseRepo.save(productLease)
    const publicProfile: IPublicProfile = await ProfileService.getPublicProfileFromUserId(updatedProductLease.userId)

    const resData: IServerResponse<IPublicProfileProductLease> = {
      status: true,
      data: {
        id: updatedProductLease.uuid,
        uuid: updatedProductLease.uuid,
        publicProfile,
        principalAmountMajor: updatedProductLease.principalAmountMinor / 100,
        interestRatePercentage: updatedProductLease.interestRatePercentage,
        nextLeasePaymentDueDateUtc: updatedProductLease.nextLeasePaymentDueDate,
        createdAtUtc: updatedProductLease.createdAt,
        currency: updatedProductLease.currency,
      }
    }
    return resData
  }

  @Get('/productleases/user/:id')
  public async productLeaseStatus(@Request() req: any, @Path('id') id: string): Promise<IServerResponse<IProductLease>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)

    const foundUser = await userRepo.findOne({uuid: id})
    if(!foundUser) {
      throw new NotFoundError("The user was not found")
    }

    const productLeaseRepo = connection.getRepository(ProductLease)
    const activeProductLease = await productLeaseRepo.findOne({
      userId: foundUser.id,
      isActive: true,
      isSoftDeleted: false,
    })

    if (!activeProductLease) {
      return {
        status: true,
      }
    }

    const walletRepo = connection.getRepository(Wallet)
    const accountMainWallet = await walletRepo.findOne({
      where: { userId: foundUser.id, loanProvider: null  },
      order: { createdAt: 'ASC' }
    })

    const amountDueMajor = Number( (activeProductLease.principalAmountMinor/100 * activeProductLease.interestRatePercentage/100).toFixed(2) )

    const resData: IServerResponse<IProductLease> = {
      status: true,
      data: {
        uuid: activeProductLease.uuid,
        principalAmountMajor: activeProductLease.principalAmountMinor / 100,
        amountDueMajor,
        interestRatePercentage: activeProductLease.interestRatePercentage,
        nextLeasePaymentDueDateUtc: activeProductLease.nextLeasePaymentDueDate,
        totalLoanAmountDue: Math.abs(accountMainWallet!.walletBalanceMinor!) / 100,
        createdAtUtc: activeProductLease.createdAt,
        currency: activeProductLease.currency,
      }
    }
    return resData
  }

  @Get('/financialtransactions')
  public async handleGetAllFinancialTransactionsForAdmin(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<IFinancialTransactionForAdmin> | IFinancialTransactionForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = getFreshConnection()
    const financialTransactionRepo = (await connection).getRepository(FinancialTransaction)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const financialTransactions = await financialTransactionRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const userIds: number[] = financialTransactions.map(fTransaction => {
        return fTransaction.userId
      })
      const publicProfiles: IPublicProfileForAdmin[] = await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds)

      const transformedTransactions: IFinancialTransactionForAdmin[] = []
      
      for(const fTransaction of financialTransactions) {
        const publicProfile = publicProfiles.find(pP => pP.userId === fTransaction.userId)
        if(publicProfile) {
          transformedTransactions.push({
            ...fTransaction.toResponseDto(),
            id: fTransaction.uuid,
            userId: fTransaction.userId,
            publicProfile: publicProfile!,
          })
        }
      }
    
      const resData: IServerResponse<IFinancialTransactionForAdmin[]> = {
        status: true,
        data: transformedTransactions,
      }
      return resData
    }

    const query: any = {}
    if (filter) {
      const filtersAsJson = JSON.parse(filter!)
      for (const filterKey in filtersAsJson) {
        if (filterKey === 'userId') {
          query[filterKey] = Number(filtersAsJson[filterKey])
        }
      }
    }
    const pageSize = 10

    const totalAssignmentsNumber = await financialTransactionRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of users`)
    }

    const pageResult = await PaginationService.paginate(FinancialTransaction, query, pageSize, pageNumber, sortOrder)

    const userIds: number[] = pageResult.dataset.map(dataRecord => {
      const productLease = dataRecord as ProductLease
      return productLease.userId
    })

    if (!userIds.length) {
      const resData = {
        status: true,
        data: {...pageResult, dataset: []}
      }
      return resData
    }

    const publicProfiles: IPublicProfileForAdmin[] = await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds)

    const formattedDataSet: IFinancialTransactionForAdmin[] = pageResult.dataset.map(dataRecord => {
      const fTransaction = dataRecord as FinancialTransaction
      const publicProfile = publicProfiles.find(pP => pP.userId === fTransaction.userId)
      
      return {
        ...fTransaction.toResponseDto(),
        id: fTransaction.uuid,
        userId: fTransaction.userId,
        publicProfile: publicProfile!,
      }
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Post('/financialtransactions')
  @Security("jwt")
  public async handleNewFinancialTransactionByAdmin(@Request() req: any, @Body() reqBody: IAddNewFinancialTransactionByAdmin): Promise<IServerResponse<IFinancialTransactionForAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { userId, amountMajor, description } = reqBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)

    const amountMinor = amountMajor * 100
    const customerUser = await userRepo.findOne({ id: userId })
    if (!customerUser) {
      throw new NotFoundError('Customer not found')
    }

    const financialTransactionRepo = connection.getRepository(FinancialTransaction)

    const sourceAccountWallet = await WalletService.getCustomerWallet(customerUser.id)
    const walletBalanceMinorBefore = sourceAccountWallet.walletBalanceMinor
    const metadata: FinancialTransactionMetadata = {}

    let transaction = new FinancialTransaction().initialize(
      sourceAccountWallet, PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET,
      Math.abs(amountMinor), walletBalanceMinorBefore, sourceAccountWallet!.walletBalanceMinor + amountMinor,
      sourceAccountWallet.currency, PaymentTransactionStatus.PAID,
      undefined, metadata)
    transaction.description = description || ""
    transaction = await financialTransactionRepo.save(transaction)

    const walletRepo = connection.getRepository(Wallet)

    await walletRepo.createQueryBuilder()
      .update(Wallet)
      .set({
        walletBalanceMinor: sourceAccountWallet!.walletBalanceMinor + amountMinor,
      })
      .where({
        id: sourceAccountWallet.id
      })
      .execute()

    await PaymentService.processAnyUnpaidOrders(sourceAccountWallet.userId)

    const currentSourceAccountWallet = await WalletService.getCustomerWallet(customerUser.id)

    if(currentSourceAccountWallet.walletBalanceMinor > 0) {
      await ProductLeaseService.updateProductLeaseState(customerUser.id, undefined,
        amountMinor, sourceAccountWallet!.walletBalanceMinor)
    }

    const publicProfiles: IPublicProfileForAdmin[] = await ProfileService.getPublicProfileFromUserIdsForAdmin([userId])

    const transformedTransaction: IFinancialTransactionForAdmin = {
      ...transaction.toResponseDto(),
      id: transaction.uuid,
      userId: transaction.userId!,
      publicProfile: publicProfiles![0],
    }

    const resData = {
      status: true,
      data: transformedTransaction
    }
    return resData
  }
  @Get('/sendPromotionalMail')
  @Security("jwt")
  public async promotionalMail(@Request() req: any, ): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const users = await userRepo.find()
    for(const user of users){
       // eslint-disable-next-line no-await-in-loop
       await EmailService.sendPromotionalMail(user)
    }
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: true,
    }
    return resData
  }

  @Put('/orders/pod/cancel/:orderUuid')
  @Security("jwt")
  public async cancelOrderByAdmin(@Request() req: any, @Path('orderUuid') orderUuid: string ): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    
    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)
    const userRepo = connection.getRepository(User)
    const orderDetails = await orderRepo.findOne({
      uuid: orderUuid, 
      paymentVariant: OrderPaymentVariant.PAY_ON_DELIVERY
    })
    const buyer = await userRepo.findOne({
      id: orderDetails?.buyerUserId
    })
    if(!orderDetails){
      throw new ConflictError('Order Does not Exist')
    }

    if(orderDetails.status === OrderStatuses.CONFIRMED){
      throw new ConflictError('Order has already been Confirmed')
    }
    if(orderDetails.status === OrderStatuses.CANCELLED_BY_ADMIN) {
      throw new ConflictError('Order has already been cancelled by the admin')
    }
    if(orderDetails.status === OrderStatuses.CANCELLED_BY_BUYER) {
      throw new ConflictError('Order has already been cancelled by the buyer')
    }
    if(orderDetails.status === OrderStatuses.CANCELLED_BY_SELLER) {
      throw new ConflictError('Order has already been cancelled by the seller')
    }

    orderDetails.statusHistory.push({
      status: OrderStatuses.CANCELLED_BY_ADMIN,
      dateTimeInISO8601: Utils.utcNow().toISOString(),
    });

    const updateQuery: any = {
      status: OrderStatuses.CANCELLED_BY_ADMIN,
      statusHistory: orderDetails.statusHistory
    };

    const walletBalanceDeductStatus: boolean = await connection.transaction(async (transactionManager) => {
      const orderRepoT = transactionManager.getRepository(Order)
 
      if(orderDetails.paymentVariant === OrderPaymentVariant.PAY_ON_DELIVERY){
        await OrderService.revertDeductUpFrontPaymentForPOD(orderDetails, buyer!, transactionManager)
      }

      await orderRepoT
        .createQueryBuilder()
        .update(Order)
        .set(updateQuery)
        .where({
          id: orderDetails.id,
        })
        .execute();

     return true
   })

    const resData: IServerResponse<boolean> = {
      status: true,
      data: true,
    }
    return resData
  }

  @Put('/orders/pod/paymentdefault/:orderUuid')
  @Security("jwt")
  public async orderPaymentDefaultByAdmin(@Request() req: any, @Path('orderUuid') orderUuid: string ): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    
    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)
    const orderDetails = await orderRepo.findOne({
      uuid: orderUuid, 
      paymentVariant: OrderPaymentVariant.PAY_ON_DELIVERY
    })
    if(!orderDetails){
      throw new ConflictError('Order Does not Exist')
    }

    if(orderDetails.status === OrderStatuses.CANCELLED_BY_ADMIN){
      throw new ConflictError('Order has already been cancel by admin')
    }

    if(orderDetails.status === OrderStatuses.PAYMENT_DEFAULT) {
      throw new ConflictError('Order has already been flagged as in default by admin')
    }
    if(orderDetails.paymentStatus !== OrderPaymentStatuses.BUYER_PAYMENT_PENDING) {
      throw new ConflictError('Order should have a payment pending payment status in order to flag it as in default')
    }

    const isSuccessfult = await AdminService.markPodOrderPaymentDefault(orderDetails)
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: isSuccessfult,
    }
    return resData
  }

  @Post('/promotions')
  @Security("jwt")
  public async newPromotion(@Request() req: any, @Body() requestBody:NewPromotionRequestDto): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { categoryUuid, percentage, name } = requestBody
    
    const connection = await getFreshConnection()
    const promotionRepo = connection.getRepository(Promotion)
    const categoryRepo = connection.getRepository(Category)
    const category = await categoryRepo.findOne({ uuid: categoryUuid })
    if(!category){
      throw new NotFoundError('Category Does not Exist')
    }
    const newPromotion = new Promotion().initialize(
      name,
      category.id,
      percentage 
    )
    await promotionRepo.save(newPromotion)
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: true,
    }
    return resData
  }

  @Get('/promotions')
  public async handleGetPromotions(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<Promotion> | Promotion[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const promotionRepo = connection.getRepository(Promotion)

    const join = {
      alias: "promotion",
      leftJoinAndSelect: {
        categoryPromotion: "promotion.categoryPromotion",
      },
    }
    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const promotions = await promotionRepo.find({
        where: query,
        join,
        order: { createdAt: sortOrder },
      })
    
      const resData: IServerResponse<Promotion[]> = {
        status: true,
        data: promotions,
      }
      return resData
    }

    const query: any = {}
    const pageSize = 10

    const totalAssignmentsNumber = await promotionRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of promotions`)
    }

    const pageResult = await PaginationService.paginate(Promotion, query, pageSize, pageNumber, sortOrder, undefined, join)

    const promotionsDataSet = pageResult.dataset as Promotion[]

    const resData = {
      status: true,
      data: {...pageResult, dataset: promotionsDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }
  
  @Get('/categories')
  public async handleGetCategories(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<Category> | Category[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const categoryRepo = connection.getRepository(Category)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const categories = await categoryRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const resData: IServerResponse<Category[]> = {
        status: true,
        data: categories,
      }
      return resData
    }

    const query: any = {}
    const pageSize = 10

    const totalAssignmentsNumber = await categoryRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of categories`)
    }

    const pageResult = await PaginationService.paginate(Category, query, pageSize, pageNumber, sortOrder)
    const categoriesDataSet = pageResult.dataset as Category[]

    const resData = {
      status: true,
      data: {...pageResult, dataset: categoriesDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/brands')
  public async handleGetBrands(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<Brand> | Brand[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const brandRepo = connection.getRepository(Brand)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('brands ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray),
        isSoftDeleted: false
      }
      const brands = await brandRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const resData: IServerResponse<Brand[]> = {
        status: true,
        data: brands,
      }
      return resData
    }

    const query: any = {isSoftDeleted: false}
    const pageSize = 10

    const totalAssignmentsNumber = await brandRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of Brands`)
    }

    const pageResult = await PaginationService.paginate(Brand, query, pageSize, pageNumber, sortOrder)
    const brandsDataSet = pageResult.dataset as Brand[]

    const resData = {
      status: true,
      data: {...pageResult, dataset: brandsDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Post('/affiliates')
  @Security("jwt")
  public async newAffiliate(@Request() req: any, @Body() requestBody:NewAffiliateRequestDto): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { firstName, lastName, phoneNumber, emailAddress } = requestBody

    const awesomePhoneNumber = new PhoneNumber(phoneNumber, "NG")
    if(!awesomePhoneNumber.isValid()) {
      throw new UnprocessableEntityError('Phone number is invalid')
    }
    const msisdn = awesomePhoneNumber.getNumber()

    const randomNumericPassword = Utils.generateOtp(6);
    const passwordHash = await Utils.generatePasswordHash(randomNumericPassword);

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User);

    const existingUser = await userRepo.findOne({
      msisdn,
    })
    if(existingUser) {
      throw new ConflictError("Another user already exists with the same phone number")
    }

    const savedUser: User = await connection.transaction(async (transactionalEntityManager) => {
      const userRepoT = transactionalEntityManager.getRepository(User);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const accountRepoT = transactionalEntityManager.getRepository(Account)
      let newUser = new User().initializeAffiliate(firstName, lastName, phoneNumber, msisdn, 
        emailAddress ?? undefined, passwordHash);

      newUser = await userRepoT.save(newUser);

      const account = new Account().initialize(
        newUser.id,
        AccountType.CUSTOMER_ACCOUNT
      );
      const userAccount = await accountRepoT.save(account);
      //--
      const currency = CountryToCurrency.NIGERIA;

      const wallet = new Wallet().initialize(newUser.id, userAccount.id, WalletType.CUSTOMER_WALLET, currency);
      await walletRepoT.save(wallet);

      return newUser;
    });

    if(savedUser) {
      if(savedUser.emailAddress) {
        const userMailInfo: WelcomeMailData = {
          email: savedUser.emailAddress,
          firstName: savedUser.firstName,
          phoneNumber: savedUser.msisdn
        }
        await EmailService.sendAffiliateWelcomeMail(userMailInfo, randomNumericPassword)  
      }
      const smsMessage = `Your new affiliate CinderBuild account has been created. Your new password is: ${randomNumericPassword}`
      const smsSentSuccessfully = await SmsService.sendSms(msisdn, smsMessage)
    }
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: !!savedUser,
    }
    return resData
  }

  @Post('/users')
  @Security("jwt")
  public async newsellerOma(@Request() req: any, @Body() requestBody:NewSellerOmaRequestDto): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { firstName, lastName, phoneNumber, emailAddress, isOMA } = requestBody

    const awesomePhoneNumber = new PhoneNumber(phoneNumber, "NG")
    if(isOMA === false){
      if(!awesomePhoneNumber.isValid()) {
        throw new UnprocessableEntityError('Phone number is invalid')
      }
    }
    const msisdn = awesomePhoneNumber.getNumber()

    const randomNumericPassword = Utils.generateOtp(6);
    const passwordHash = await Utils.generatePasswordHash(randomNumericPassword);

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User);

    const existingUser = await userRepo.findOne({
      msisdn,
    })
    if(existingUser) {
      throw new ConflictError("Another user already exists with the same phone number")
    }

    const savedUser: User = await connection.transaction(async (transactionalEntityManager) => {
      const userRepoT = transactionalEntityManager.getRepository(User);
      const walletRepoT = transactionalEntityManager.getRepository(Wallet);
      const accountRepoT = transactionalEntityManager.getRepository(Account)
      let newUser = new User().initializeSellerOma(firstName, lastName, phoneNumber, msisdn, 
        emailAddress ?? undefined, passwordHash);

      newUser = await userRepoT.save(newUser);

      const account = new Account().initialize(
        newUser.id,
        AccountType.CUSTOMER_ACCOUNT
      );
      const userAccount = await accountRepoT.save(account);
      //--
      const currency = CountryToCurrency.NIGERIA;

      const wallet = new Wallet().initialize(newUser.id, userAccount.id, WalletType.CUSTOMER_WALLET, currency);
      await walletRepoT.save(wallet);

      return newUser;
    });

    if(savedUser) {
      if(savedUser.emailAddress && isOMA === false) {
        const userMailInfo: WelcomeMailData = {
          email: savedUser.emailAddress,
          firstName: savedUser.firstName,
          phoneNumber: savedUser.msisdn
        }
        await EmailService.sendsellerAdminWelcomeMail(userMailInfo, randomNumericPassword)  
      }
      const smsMessage = `Your new CinderBuild account has been created. Your new password is: ${randomNumericPassword}`
      await SmsService.sendSms(msisdn, smsMessage)

      if(isOMA === true){
        // send mail to support / operation / Product about the new OMA User/
        const omaMailInfo: WelcomeMailData = {
          email: Constant.SUPPORT_EMAIL,
          firstName: savedUser.firstName,
          phoneNumber: savedUser.msisdn
        }
        await EmailService.sendsellerAdminWelcomeMail(omaMailInfo, randomNumericPassword) 
      }
    }
    
    const resData: IServerResponse<boolean> = {
      status: true,
      data: !!savedUser,
    }
    return resData
  }

  @Get('/affiliates')
  public async handleGetAffiliates(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<IPublicProfileForAdmin> | IPublicProfileForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray),
        role: Roles.AFFILIATE,
      }
      const users = await userRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const userIds = users.map(user => user.id)

      const publicProfiles =
        await ProfileService.getPublicProfileFromUserIdsForAdmin(
          userIds
        );

      const resData: IServerResponse<IPublicProfileForAdmin[]> = {
        status: true,
        data: publicProfiles,
      };
      return resData
    }

    const query: any = {
      role: Roles.AFFILIATE
    }
    const pageSize = 10

    const totalAssignmentsNumber = await userRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of affiliate users`)
    }

    const pageResult = await PaginationService.paginate(User, query, pageSize, pageNumber, sortOrder)

    const affiliateUsersDataSet = pageResult.dataset as User[]

    const userIds = affiliateUsersDataSet.map((user) => user.id);

    const publicProfiles =
      await ProfileService.getPublicProfileFromUserIdsForAdmin(userIds);

    const resData = {
      status: true,
      data: {...pageResult, dataset: publicProfiles, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/orders')
  public async handleGetOrders(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<OrdersDetailsForAdminResponseDto> | OrdersDetailsForAdminResponseDto[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('user ids were not specified')
      }
      const query: any = {
        id: In(idsAsJsonArray),
      }
      const orders = await orderRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const buyerUserIds = orders.map((user) => user.buyerUserId);
      const sellerUserIds = orders.map((user) => user.sellerUserId);

      const buyerPublicProfiles =
      await ProfileService.getPublicProfileFromUserIdsForAdmin(buyerUserIds);
    
      const sellerPublicProfiles =
        await ProfileService.getPublicProfileFromUserIdsForAdmin(sellerUserIds);

      const formattedOrdersDataset: OrdersDetailsForAdminResponseDto[] = []

      for(const order of orders) {
        const buyerPublicProfile = buyerPublicProfiles.find(bPp => bPp.userId === order.buyerUserId)
        const sellerPublicProfile = sellerPublicProfiles.find(bPp => bPp.userId === order.sellerUserId)

        formattedOrdersDataset.push(order.transformForAdmin(buyerPublicProfile!, sellerPublicProfile!))
      }

      const resData: IServerResponse<OrdersDetailsForAdminResponseDto[]> = {
        status: true,
        data: formattedOrdersDataset,
      };
      return resData
    }

    const query: any = {
    }

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "buyerUserId") {
          query.buyerUserId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "sellerUserId") {
          query.sellerUserId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "referenceNumber") {
          query.referenceNumber = filtersAsJson[filterKey];
        }
        if (filterKey === "affiliateUserId") {
          query.receiverUserId = Number(filtersAsJson[filterKey]);
        }
      }
    }
    const pageSize = 10

    const totalAssignmentsNumber = await orderRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of orders`)
    }

    const pageResult = await PaginationService.paginate(Order, query, pageSize, pageNumber, sortOrder)

    const ordersDataSet = pageResult.dataset as Order[]

    const buyerUserIds = ordersDataSet.map((user) => user.buyerUserId);
    const sellerUserIds = ordersDataSet.map((user) => user.sellerUserId);

    const buyerPublicProfiles =
      await ProfileService.getPublicProfileFromUserIdsForAdmin(buyerUserIds);
    
    const sellerPublicProfiles =
      await ProfileService.getPublicProfileFromUserIdsForAdmin(sellerUserIds);

    const formattedOrdersDataset: OrdersDetailsForAdminResponseDto[] = []

    for(const order of ordersDataSet) {
      const buyerPublicProfile = buyerPublicProfiles.find(bPp => bPp.userId === order.buyerUserId)
      const sellerPublicProfile = sellerPublicProfiles.find(bPp => bPp.userId === order.sellerUserId)

      formattedOrdersDataset.push(order.transformForAdmin(buyerPublicProfile!, sellerPublicProfile!))
    }

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedOrdersDataset, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Post("/orders")
  public async handleOrderCreationFromPreparedCart(@Request() req: any,
    @Body() requestBody: CreateOrderByAdminRequestDto
  ): Promise<IServerResponse<OrderPayResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)
    const userRepo = connection.getRepository(User);

    const buyerUser = await userRepo.findOne({
      where: { id: requestBody.userId}
    })

    if(!buyerUser){
      throw new NotFoundError('Buyer Does Not Exist');
    }

    if(buyerUser.role !== Roles.AFFILIATE) {
      const existingUnpaidOrders = await orderRepo.find({
        buyerUserId: buyerUser.id,
        status: Not(In([
          OrderStatuses.COMPLETED, OrderStatuses.CONFIRMED, OrderStatuses.ENDED_WITH_DISPUTES,
          OrderStatuses.CANCELLED_BY_BUYER, OrderStatuses.CANCELLED_BY_SELLER, OrderStatuses.CANCELLED_BY_ADMIN,
        ])),
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_PENDING,
      })
      if(existingUnpaidOrders.length) {
        throw new UnprocessableEntityError('Please pay for your unpaid orders before creating a new one')
      }
    }

    let deliveryLocation: DeliveryLocation | undefined;
    let pickupLocation: PickupLocation | undefined;
    let wareHouse: WareHouse | undefined;
    const deliveryLocationRepo = getRepository(DeliveryLocation);
    const pickupLocationRepo = getRepository(PickupLocation);

    if(requestBody.orderReceiveType === OrderReceiveTypes.DELIVERY) {
       if(requestBody.deliveryAddressId) {
        deliveryLocation = await deliveryLocationRepo.findOne({
          id: requestBody.deliveryAddressId,
          userId: requestBody.userId
        });
        if(!deliveryLocation){
          throw new NotFoundError('Delivery Location Selected Does not Exist');
        }
      }
    } else {
      pickupLocation = await pickupLocationRepo.findOne({
        id: requestBody.pickupLocationId!
      });
    }


    const productRepo = connection.getRepository(Product);
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
      },
    }

    const product = await productRepo.findOne({
      where: {
        id: requestBody.productId,
        isSoftDeleted: false,
      },
      join
    });
    if (!product) {
      throw new NotFoundError('The specified product could not be found')
    }


    // pus all the product int

    const unitPriceForBuyer = Utils.getPriceForBuyer(requestBody.unitPrice!, product)

    const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)



    const newOrderItem =[{
      productId: product!.id,
      productUuid: product!.uuid,
      productName: product!.name,
      quantity: requestBody.quantity,
      unitPrice: requestBody.unitPrice!,
      unitPriceForBuyer: unitPriceForBuyer!,
      unitPromoPriceForBuyer: unitPromoPriceForBuyer!,
      productCategorySettings: product!.category?.settings,
      deliveryAddressState: deliveryLocation?.state,
    }];

    const createdOrders = await OrderService.createOrders(buyerUser, newOrderItem,
      requestBody.orderReceiveType, requestBody.orderPaymentVariant, deliveryLocation, pickupLocation,
      wareHouse, requestBody.differentOrderReceiver,
    );

    const orderPayResponse = await OrderService.processOrdersPayment(
      createdOrders,
      requestBody.orderPaymentVariant,
      buyerUser
    );

    const resData: IServerResponse<OrderPayResponseDto> = {
      status: true,
      data: orderPayResponse,
    };

    return resData;
  }
  

  @Get('/wallettowallettransfer')
  public async handleGetWalletToWalletTransfers(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<WalletToWalletTransfer> | WalletToWalletTransfer[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const walletToWalletTransferRepo = connection.getRepository(WalletToWalletTransfer)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const walletToWalletTransfers = await walletToWalletTransferRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const resData: IServerResponse<WalletToWalletTransfer[]> = {
        status: true,
        data: walletToWalletTransfers,
      }
      return resData
    }

    const query: any = {}
    const pageSize = 10

    const totalAssignmentsNumber = await walletToWalletTransferRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of wallet to wallet transfers`)
    }

    const pageResult = await PaginationService.paginate(WalletToWalletTransfer, query, pageSize, pageNumber, sortOrder)

    const walletToWalletTransferDataSet = pageResult.dataset as WalletToWalletTransfer[]

    const resData = {
      status: true,
      data: {...pageResult, dataset: walletToWalletTransferDataSet, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Post('/wallettowallettransfer')
  @Security("jwt")
  public async handleWalletToWalletTransferByAdmin(@Request() req: any, @Body() reqBody: IWalletTransferTransactionByAdmin): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { senderUserId, receiverUserId,  amountMajor, description } = reqBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)

    const totalTransferAmountMinor = amountMajor * 100

    const senderUser = await userRepo.findOne({ id: senderUserId })
    if (!senderUser) {
      throw new NotFoundError('Customer not found')
    }

    const receiverUser = await userRepo.findOne({ id: receiverUserId })
    if (!receiverUser) {
      throw new NotFoundError('Customer not found')
    }

    const handlewalletFundTransfer = await WalletService.walletToWalletTransfer(currentAdminUser.id, 
      senderUserId, receiverUserId, 
      totalTransferAmountMinor, description)

      if(handlewalletFundTransfer && receiverUser.role !== Roles.AFFILIATE){
        // process any unpaid order
        await PaymentService.processAnyUnpaidOrders(receiverUser.id)
        
        const resData: IServerResponse<boolean> = {
          status: handlewalletFundTransfer,
          data: handlewalletFundTransfer,
        }
        return resData
      }

    const resData: IServerResponse<boolean> = {
      status: handlewalletFundTransfer,
      data: handlewalletFundTransfer,
    }
    return resData
  }

  @Put("/orders/:orderUuid/statusupdate/:newOrderStatus")
  public async handleOrderRecievedConfirmation(
    @Request() req: any,
    @Path("orderUuid") orderUuid: string,
    @Path("newOrderStatus") newOrderStatus: OrderStatuses
  ): Promise<IServerResponse<boolean>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    const userRepo = connection.getRepository(User)

    const join = {
      alias: "order",
      leftJoinAndSelect: {
        buyerUser: "order.buyerUser",
        sellerUser: "order.sellerUser",
      },
    };

    const order = await orderRepo.findOne({
      where: {
        uuid: orderUuid
      },
      join,
    });
    if (!order) {
      throw new NotFoundError("Order was not found");
    }

    const currentUser = await userRepo.findOne({ id: order.buyerUserId})

    if (!currentUser) {
      throw new NotFoundError("Order Buyer Does Not Exist");
    }

    await OrderService.updateOrderStatus(
      order,
      newOrderStatus,
      currentUser
    );

    const resData: IServerResponse<boolean> = {
      status: true,
    }
    return resData
  }

  @Get('/orders/:id')
  public async handleGetchangeOrder(@Request() req: any, 
      @Path('id') id: string): Promise<IServerResponse<OrderDetailsResponseDto>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const orderRepo = connection.getRepository(Order)
    const order = await orderRepo.findOne(id);
    if(!order) {
      throw new NotFoundError("Order was not found");
    }
    const orderDetails = await OrderService.orderDetails(order);

    const resData: IServerResponse<OrderDetailsResponseDto> = {
      status: true,
      data: orderDetails
    }
    return resData
  }

  @Put("/orders/:id/changeOrderTotal")
  public async handleOrderTotalChangeConfirmation(
    @Request() req: any,
    @Path('id') id: string,
    @Body() reqBody: {
      newOrderAmountMajor: number, 
      changeReason: string,
    }
  ): Promise<IServerResponse<OrderDetailsResponseDto>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { newOrderAmountMajor, changeReason } = reqBody

    const connection = await getFreshConnection();
    const orderRepo = connection.getRepository(Order);
    const order = await orderRepo.findOne(id);
    if(!order) {
      throw new NotFoundError("Order was not found");
    }

    if(order.paymentVariant !== OrderPaymentVariant.PAY_ON_DELIVERY){
      throw new UnprocessableEntityError('You cannot change order total amount for non pay on delivery orders')
    }

    const orderSubTotalMajor = order.getSubTotal()
    console.log(orderSubTotalMajor)
    if(newOrderAmountMajor < orderSubTotalMajor) {
      throw new UnprocessableEntityError(`You cannot change the order total to less than the sub total: ${order.currency} ${orderSubTotalMajor}`)
    }

    if(order.calculatedTotalCostMajor === orderSubTotalMajor) {
      throw new UnprocessableEntityError(`No change was done on the system because the subtotal and order total are the same`)
    }

    if(order.status === OrderStatuses.CANCELLED_BY_ADMIN){
      throw new UnprocessableEntityError(`Cannot Change Order Amount that been Cancel By Admin`)
    }

    if(order.status === OrderStatuses.CONFIRMED){
      throw new UnprocessableEntityError(`Cannot Change Order that been confirm and closed`)
    }

    if(order.status === OrderStatuses.RECEIVED){
      throw new UnprocessableEntityError(`Cannot Change Order Amount that been Received`)
    }

    if(order.paymentStatus === OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER){
      throw new UnprocessableEntityError(`Cannot Change Order Amount that been Paid`)
    }

    await OrderService.changeOrderTotalByAdmnin(order, newOrderAmountMajor, changeReason)

    const orderDetails = await OrderService.orderDetails(order);

    const resData: IServerResponse<OrderDetailsResponseDto> = {
      status: true,
      data: orderDetails
    }
    return resData
  }
  @Get('/categories/:id')
  public async handleGetCategory(
      @Request() req: any, 
      @Path('id') id: string): Promise<IServerResponse<Category>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const categoryRepo = connection.getRepository(Category)
    const categoryDetails = await categoryRepo.findOne(id);
    if(!categoryDetails) {
      throw new NotFoundError("Category was not found");
    }
    
    const resData: IServerResponse<Category> = {
      status: true,
      data: categoryDetails
    }
    return resData
      
  }
  
  @Put("/categories/:id/")
  public async handleCategoryCinderbuildMergin(
    @Request() req: any,
    @Path('id') id: string,
    @Body() reqBody: {
      newMarginAmountMajor: number, 
      currency: string
    }
  ): Promise<IServerResponse<Category>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { newMarginAmountMajor, currency} = reqBody
    const connection = await getFreshConnection();
    const categoryRepo = connection.getRepository(Category)
  
    const category = await categoryRepo.findOne( id )
    if(!category){
      throw new NotFoundError('Category Does Not Exist')
    }
    await AdminService.changeCinderbuildMargin(category.uuid, newMarginAmountMajor, currency)

    const resData: IServerResponse<Category> = {
      status: true,
      data: category
    }
    return resData
  }

  @Get('/deliveryrequests')
  public async handleGetWareHouseToSiteDeliveryRequests(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<WareHouseToSiteDeliveryDtoForAdmin> | WareHouseToSiteDeliveryDtoForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const wareHouseToSiteProductDeliveryRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation)
    const wareHouseRepo = connection.getRepository(WareHouse)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const warehouseTositeDeliveryRequests = await wareHouseToSiteProductDeliveryRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
      const siteDeliveryLocationIds: number[] = warehouseTositeDeliveryRequests.map(item => item.deliveryLocationId)
      const deliveryLocationSites = await DeliveryLocationRepo.find({
        where: { id: In(siteDeliveryLocationIds) }
      })

      const WareHouseIds: number[] = warehouseTositeDeliveryRequests.map(item => item.wareHouseId)
      const wareHouses = await wareHouseRepo.find({
        where: { id: In(WareHouseIds) }
      })

      const transformedWareHouseProductLists: WareHouseToSiteDeliveryDtoForAdmin[] = warehouseTositeDeliveryRequests.map( deliveryRequest => {
        const deliverySiteDetails: DeliveryLocation = deliveryLocationSites.find( item => item.id === deliveryRequest.deliveryLocationId )!

        const wareHouseDetails: WareHouse = wareHouses.find( item => item.id === deliveryRequest.wareHouseId )!  

        return {
          id: deliveryRequest.id,
          uuid: deliveryRequest.uuid,
          wareHouseDetails,
          userId: deliveryRequest.userId,
          deliveryItems: deliveryRequest.deliveryItems,
          deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
          status: deliveryRequest.deliveryFeeStatus ,
          totalAmountMajor: deliveryRequest.totalAmountMajor,
          deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
          deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
          createdAt: deliveryRequest.createdAt
        };
      }) 
    
      const resData: IServerResponse<WareHouseToSiteDeliveryDtoForAdmin[]> = {
        status: true,
        data: transformedWareHouseProductLists,
      }
      return resData
    }

    const query: any = {}
    const pageSize = 10

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.userId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "wareHouseId") {
          query.wareHouseId = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const totalAssignmentsNumber = await wareHouseToSiteProductDeliveryRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`)
    }

    const pageResult = await PaginationService.paginate(WareHouseToSiteDeliveryRequest, query, pageSize, pageNumber, sortOrder)

    const warehouseToSiteDeliveryRequestDataSet = pageResult.dataset as WareHouseToSiteDeliveryRequest[]

    const siteDeliveryLocationIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.deliveryLocationId)
    const deliveryLocationSites = await DeliveryLocationRepo.find({
      where: { id: In(siteDeliveryLocationIds) }
    })

    const WareHouseIds: number[] = warehouseToSiteDeliveryRequestDataSet.map(item => item.wareHouseId)
    const wareHouses = await wareHouseRepo.find({
      where: { id: In(WareHouseIds) }
    })

    const transformedWareHouseProductLists: WareHouseToSiteDeliveryDtoForAdmin[] = warehouseToSiteDeliveryRequestDataSet.map( deliveryRequest => {
      const deliverySiteDetails: DeliveryLocation = deliveryLocationSites.find( item => item.id === deliveryRequest.deliveryLocationId )!  
      const wareHouseDetails: WareHouse = wareHouses.find( item => item.id === deliveryRequest.wareHouseId )!  

      return {
        id: deliveryRequest.id,
        uuid: deliveryRequest.uuid,
        wareHouseDetails,
        userId: deliveryRequest.userId,
        deliveryItems: deliveryRequest.deliveryItems,
        deliveryRequestHistory: deliveryRequest.deliveryFeeStatusHistory,
        status: deliveryRequest.deliveryFeeStatus ,
        totalAmountMajor: deliveryRequest.totalAmountMajor,
        deliveryFeeAmountMajor: deliveryRequest.deliveryFeeAmountMajor,
        deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
        createdAt: deliveryRequest.createdAt
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedWareHouseProductLists, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/deliveryrequests/:id')
  public async handleGetWarehouseToSiteDeliveryRequest(@Request() req: any, 
      @Path('id') id: string): Promise<IServerResponse<WareHouseToSiteDeliveryDtoForAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const wareHouseRepo = connection.getRepository(WareHouse)
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation)
    const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
   
    const warehouseToSiteDeliveryRequest = await wareHouseToSiteDeliveryRequestRepo.findOne(id);
    if(!warehouseToSiteDeliveryRequest) {
      throw new NotFoundError("Warehouse to Site Delivery Request was not found");
    }
    const wareHouseDetails = await wareHouseRepo.findOne({ id: warehouseToSiteDeliveryRequest.wareHouseId })
    const deliverySiteDetails = await deliveryLocationRepo.findOne({ id: warehouseToSiteDeliveryRequest.deliveryLocationId})
    
    const transformWareToSiteDelivery: WareHouseToSiteDeliveryDtoForAdmin = {
      id: warehouseToSiteDeliveryRequest.id,
      uuid: warehouseToSiteDeliveryRequest.uuid,
      wareHouseDetails,
      userId: warehouseToSiteDeliveryRequest.userId,
      deliveryItems: warehouseToSiteDeliveryRequest.deliveryItems,
      deliveryRequestHistory: warehouseToSiteDeliveryRequest.deliveryFeeStatusHistory,
      status: warehouseToSiteDeliveryRequest.deliveryFeeStatus ,
      totalAmountMajor: warehouseToSiteDeliveryRequest.totalAmountMajor,
      deliveryFeeAmountMajor: warehouseToSiteDeliveryRequest.deliveryFeeAmountMajor,
      deliverySiteDetails: _.omit(deliverySiteDetails, "id", "user", "createdAt", "updatedAt"),
      createdAt: warehouseToSiteDeliveryRequest.createdAt 
    }

    const resData: IServerResponse<WareHouseToSiteDeliveryDtoForAdmin> = {
      status: true,
      data: transformWareToSiteDelivery
    }
    return resData
  }

 

 @Get('/deliveryRequest/:id/shipped')
 public async handleMarKDeliveryRequestAsShipped(@Request() req: any, 
     @Path('id') id: string): Promise<IServerResponse<void>> {
   const currentAdminUser: User = req.user
   await AdminService.isValidAdmin(currentAdminUser)

   const connection = await getFreshConnection()
   const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)  
  
   const wareHouseToSiteDeliveryRequest = await wareHouseToSiteDeliveryRequestRepo.findOne(id);
   if(!wareHouseToSiteDeliveryRequest) {
     throw new NotFoundError("Delivery Request Does Not Exist");
   }

   if(wareHouseToSiteDeliveryRequest.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.REQUESTED){
    throw new UnprocessableEntityError("Delivery Request Has Not Been Proccessed");
   }

   if(wareHouseToSiteDeliveryRequest.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_SET){
    throw new UnprocessableEntityError("Delivery Request Has Not Been Proccessed");
   }


   if(wareHouseToSiteDeliveryRequest.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_ITEMS_SHIPPED){
     throw new UnprocessableEntityError("Delivery Request Has Been Shipped to Site");
   }

   
 

   await AdminService.markDeliveryRequestAsShipped(wareHouseToSiteDeliveryRequest)

   const resData: IServerResponse<void> = {
     status: true,
    
   }
   return resData
 }
 


  @Get('/changebankdetails')
  public async handleGetRequestBankAccountChange(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<RequestBankDetailsChangeDtoForAdmin> | RequestBankDetailsChangeDtoForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const requestBankDetailsChangeRepo = connection.getRepository(RequestBankDetailsChange)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray),
        isProcessed: false
      }
      const requestBankDetailsChanges = await requestBankDetailsChangeRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const transformedRequestBankDetailsChanges: RequestBankDetailsChangeDtoForAdmin[] = requestBankDetailsChanges.map(changeDetails => {
        return {
          id: changeDetails.id,
          uuid: changeDetails.uuid,
          userId: changeDetails.userId,
          bankAccountName: changeDetails.bankAccountName,
          accountNumber: changeDetails.accountNumber,
          bankCode: changeDetails.bankCode,
          bankName: changeDetails.bankName,
          createdAt: changeDetails.createdAt
        };
      })
      const resData: IServerResponse<RequestBankDetailsChangeDtoForAdmin[]> = {
        status: true,
        data: transformedRequestBankDetailsChanges,
      }
      return resData
    }

    const query: any = {
      isProcessed: false
    }
    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.accountId = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const pageSize = 10

    const totalAssignmentsNumber = await requestBankDetailsChangeRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of change of bank details request`)
    }

    const pageResult = await PaginationService.paginate(RequestBankDetailsChange, query, pageSize, pageNumber, sortOrder)

    const requestBankDetailsChanges = pageResult.dataset as RequestBankDetailsChange[]

    const transformedRequestBankDetailsChanges: RequestBankDetailsChangeDtoForAdmin[] = requestBankDetailsChanges.map(changeDetails => {
      return {
        id: changeDetails.id,
        uuid: changeDetails.uuid,
        userId: changeDetails.userId,
        bankAccountName: changeDetails.bankAccountName,
        accountNumber: changeDetails.accountNumber,
        bankCode: changeDetails.bankCode,
        bankName: changeDetails.bankName,
        createdAt: changeDetails.createdAt
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedRequestBankDetailsChanges, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Put("/changebankdetails/:id")
  public async saveBankAccountInfo(
    @Request() req: any,
    @Path('id') id: string
  ): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user;
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User); 
    const requestBankDetailsChangeRepo = connection.getRepository(RequestBankDetailsChange)

    const requestBankDetailsChange = await requestBankDetailsChangeRepo.findOne( id )
    if(!requestBankDetailsChange){
      throw new NotFoundError('Request for change of bank details Does Not Exist')
    }
    const userPreviousBankDetail = await userRepo.findOne({ id: requestBankDetailsChange.userId })
    if(!userPreviousBankDetail){
      throw new NotFoundError('User Does Not Exist')
    }
    if(userPreviousBankDetail!.bankInfo.bankAccountNumber === requestBankDetailsChange.accountNumber) {
      throw new UnprocessableEntityError('User Submited Bank Details that is the same with his previous bank details')
    }

    const accountResolveResult = await PaystackService.accountNameEnquiry(
      requestBankDetailsChange.bankCode,
      requestBankDetailsChange.accountNumber
    );
    const bankAccountName = accountResolveResult.account_name;
    //--
    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        bankInfo: {
          bankCode: requestBankDetailsChange.bankCode,
          bankName:  requestBankDetailsChange.bankName,
          bankAccountNumber: requestBankDetailsChange.accountNumber,
          bankAccountName,
        },
      })
      .where({ id: requestBankDetailsChange.userId })
      .execute();

    await requestBankDetailsChangeRepo
      .createQueryBuilder()
      .update(RequestBankDetailsChange)
      .set({ isProcessed: true})
      .where({ id: requestBankDetailsChange.id })
      .execute();

    await PaystackService.saveTransferReceipt(
      requestBankDetailsChange.bankCode,
      requestBankDetailsChange.accountNumber,
      bankAccountName
    );
      // mail to user 
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Patch("/deliveryrequests/:id")
  public async handleWarehouseToSiteDeliveryRequestDeliveryFeeUpdate(
    @Request() req: any,
    @Path('id') id: string,
    @Body() reqBody: {
      deliveryFeeAmountMajor: number, 
      currency: string
    }
  ): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const { deliveryFeeAmountMajor } = reqBody
    const connection = await getFreshConnection();
    const wareHouseToSiteDeliveryRequestRepo = connection.getRepository(WareHouseToSiteDeliveryRequest)
  
    const wareHouseToSiteRequest = await wareHouseToSiteDeliveryRequestRepo.findOne(id)
    if(!wareHouseToSiteRequest) {
      throw new NotFoundError('Warehouse to site delivery request Does Not Exist')
    }
    if(wareHouseToSiteRequest.deliveryFeeStatus === WareHouseToSiteDeliveryFeeStatuses.DELIVERY_FEE_ACCEPTED){
      throw new NotFoundError('Delivery Fee Has Been Set and Accepted')
    }
    const updateResult = await AdminService.submitDeliveryFeeForWareHouseToSiteDelivery(
      wareHouseToSiteRequest, deliveryFeeAmountMajor,
    )
  
    const resData: IServerResponse<void> = {
      status: updateResult,
    }
    return resData
  }


  @Get('/procurements')
  public async handleGetProcurmentList(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<ProcurementDtoForAdmin> | ProcurementDtoForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const procurementRepo = connection.getRepository(Procurements)
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray),
        isProcessed: false
      }
      const requestProcurement = await procurementRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const transformedProcurement: ProcurementDtoForAdmin[] = requestProcurement.map(list => {
        return {
          id: list.id,
          uuid: list.uuid,
          accountId: list.accountId,
          upload: list.upload,
          invoice: null,
          isProcessed: list.isProcessed,
          createdAt: list.createdAt
        };
      })
      const resData: IServerResponse<ProcurementDtoForAdmin[]> = {
        status: true,
        data: transformedProcurement,
      }
      return resData
    }

    const query: any  = {
      isSoftDeleted: false
    }

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "accountId") {
          query.accountId = Number(filtersAsJson[filterKey]);
        }
      }
    }
    const pageSize = 10

    const totalAssignmentsNumber = await procurementRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of procurement`)
    }

    const pageResult = await PaginationService.paginate(Procurements, query, pageSize, pageNumber, sortOrder)

    const requestProcurement = pageResult.dataset as Procurements[]
    const siteDeliveryLocationIds: number[] = requestProcurement.map(item => item.id)
    const procurementInvoices = await procurementInvoiceRepo.find({
      where: { id: In(siteDeliveryLocationIds) }
    })
    if(requestProcurement.length === 0){
      throw new UnprocessableEntityError('Procurement List Does Exist')
    }
    const transformedProcurementList: ProcurementDtoForAdmin[] = requestProcurement.map(list => {
      const procurementInvoice: ProcurementInvoice = procurementInvoices.find( item => item.id === list.id )!  
      let invoiceDetails
      if(procurementInvoice){
        invoiceDetails = {
          id: procurementInvoice!.id,
          uuid: procurementInvoice!.uuid,
          accountId: procurementInvoice!.accountId,
          referenceNumber: procurementInvoice!.referenceNumber,
          calculatedTotalCostMajor: procurementInvoice!.calculatedTotalCostMajor,
          invoiceItem: procurementInvoice!.invoiceItem,
          status: procurementInvoice!.status,
          statusHistory: procurementInvoice!.statusHistory,
          orderCreated: procurementInvoice!.orderCreated,
          orderCreatedAt: procurementInvoice!.orderCreatedAt,
          createdAt: procurementInvoice!.createdAt
        }
      }

      return {
        id: list.id,
        uuid: list.uuid,
        accountId: list.accountId,
        upload: list.upload,
        invoice:invoiceDetails || null,
        isProcessed: list.isProcessed,
        createdAt: list.createdAt
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedProcurementList, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get("/procurements/:id")
  public async handleProcurementDetails(
    @Request() req: any,
    @Path('id') id: string,
  ): Promise<IServerResponse<ProcurementDtoForAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection();
    const procurmentRepo = connection.getRepository(Procurements)
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
  
    const procurementDetails = await procurmentRepo.findOne(id)
    if(!procurementDetails) {
      throw new NotFoundError('Procurement Does Not Exist')
    }
    const procurementInvoice = await procurementInvoiceRepo.findOne({
      where: { procurementId: procurementDetails.id}
    })
    let invoiceDetails
    if(procurementInvoice){
     
      invoiceDetails = {
        id: procurementInvoice!.id,
        uuid: procurementInvoice!.uuid,
        accountId: procurementInvoice!.accountId,
        referenceNumber: procurementInvoice!.referenceNumber,
        calculatedTotalCostMajor: procurementInvoice!.calculatedTotalCostMajor,
        invoiceItem: procurementInvoice!.invoiceItem,
        status: procurementInvoice!.status,
        statusHistory: procurementInvoice!.statusHistory,
        orderCreated: procurementInvoice!.orderCreated,
        orderCreatedAt: procurementInvoice!.orderCreatedAt,
        createdAt: procurementInvoice!.createdAt
      }
    }
    
    const resultProcurement =  {
      id: procurementDetails.id,
      uuid: procurementDetails.uuid,
      accountId: procurementDetails.accountId,
      upload: procurementDetails.upload,
      invoice: invoiceDetails || null,
      isProcessed: procurementDetails.isProcessed,
      createdAt: procurementDetails.createdAt
    }

    const resData: IServerResponse<ProcurementDtoForAdmin> = {
      status: true,
      data: resultProcurement
    }
    return resData
  }

  @Patch("/procurements/:id")
  public async handleProcurementisProcessed(
    @Request() req: any,
    @Path('id') id: string,
  ): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    const connection = await getFreshConnection();
    const procurmentRepo = connection.getRepository(Procurements)
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
    const userRepo = connection.getRepository(User)
  
    const procurementDetails = await procurmentRepo.findOne(id)
    if(!procurementDetails) {
      throw new NotFoundError('Procurement Does Not Exist')
    }
    
    const doesInvoice = await procurementInvoiceRepo.findOne({
      where: { procurementId: procurementDetails.id}
    })
    if(!doesInvoice){
      throw new UnprocessableEntityError('Cannot Confirm a Procurement whose invoice has is not ready')
    }

    const user = await userRepo.findOne({
      where: { accountId: procurementDetails.accountId}
    })

    await procurmentRepo
      .createQueryBuilder()
      .update(Procurements)
      .set({ isProcessed: true, proccessedAt: Utils.utcNow()})
      .where({ id: procurementDetails.id })
      .execute();
    // send mail to cooperate account that send the precurment list.
    const smsMessage = `Hello ${user!.firstName}, 
    Your procurement list has been attended to, Kindly log into your account to view invoice and proceed with order. `
      const smsSentSuccessfully = await SmsService.sendSms(user!.msisdn, smsMessage)
      console.log(smsSentSuccessfully)
    await EmailService.sendProcurmentInvoiceIsReady(user!)
    
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Post("/procurements/:id/invoices")
  public async addItemToInvoice(
    @Request() req: any, 
    @Path('id') id: number,
    @Body() reqBody: AddItemToInvoiceRequestDto
  ): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const connection = await getFreshConnection();
    const procurementRepo = connection.getRepository(Procurements);

    const procurement = await procurementRepo.findOne({ id })
    if(!procurement){
      throw new UnprocessableEntityError('Procurement Does Not Exist')
    }

    const productRepo = connection.getRepository(Product)
    const product = await productRepo.findOne({id: reqBody.invoiceItem.productId})
    if(!product) {
      throw new NotFoundError('The specified product does not exist')
    }
    reqBody.invoiceItem.productUuid = product.uuid
    const invoiceItemAddedStatus = await AdminService.prepareInvoiceItem(procurement, reqBody)
    if(!invoiceItemAddedStatus){
      throw new UnprocessableEntityError('There was an error in adding your item to the procurement invoice. Please try again.')
    }
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get('/procurements/invoices')
  public async handleAllProcurementInvoice(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<ProcurementInvoiceResponseDtoForAdmin> | ProcurementInvoiceResponseDtoForAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const invoiceRepo = connection.getRepository(ProcurementInvoice)

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray),
        orderCreated: false
      }
      const invoiceProcessed = await invoiceRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
      const transformedProccessedInvoice: ProcurementInvoiceResponseDtoForAdmin[] = invoiceProcessed.map(invoice => {
        return {
          id: invoice.id,
          uuid: invoice.uuid,
          accountId: invoice.accountId,
          referenceNumber: invoice.referenceNumber,
          calculatedTotalCostMajor: invoice.calculatedTotalCostMajor,
          invoiceItem: invoice.invoiceItem,
          status: invoice.status,
          statusHistory: invoice.statusHistory,
          orderCreated: invoice.orderCreated,
          orderCreatedAt: invoice.orderCreatedAt,
          createdAt: invoice.createdAt
        };
      })
      const resData: IServerResponse<ProcurementInvoiceResponseDtoForAdmin[]> = {
        status: true,
        data: transformedProccessedInvoice,
      }
      return resData
    }

    const query: any = {
      orderCreated: false,
      isSoftDeleted: false
    }
    const pageSize = 10

    const totalAssignmentsNumber = await invoiceRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds`)
    }

    const pageResult = await PaginationService.paginate(Procurements, query, pageSize, pageNumber, sortOrder)

    const requestProcurement = pageResult.dataset as ProcurementInvoice[]

    const transformedInvoicetList: ProcurementInvoiceResponseDtoForAdmin[] = requestProcurement.map(invoice => {
      return {
        id: invoice.id,
        ...invoice.toResponseDto(),
      };
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedInvoicetList, total: totalAssignmentsNumber}
    }
    return resData
  } 

  @Get('/procurements/invoices/:id')
  public async handleGetProcurementInvoiceDetails(@Request() req: any, 
      @Path('id') id: string): Promise<IServerResponse<ProcurementInvoiceResponseDtoForAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const invoiceRepo = connection.getRepository(ProcurementInvoice)  
   
    const invoice = await invoiceRepo.findOne(id);
    if(!invoice) {
      throw new NotFoundError("Invoice Does Not Exist");
    }
    
    const transformInvoiceDetails: ProcurementInvoiceResponseDtoForAdmin = {
      id: invoice.id,
      ...invoice.toResponseDto(),
    }

    const resData: IServerResponse<ProcurementInvoiceResponseDtoForAdmin> = {
      status: true,
      data: transformInvoiceDetails
    }
    return resData
  }

  @Get('/products')
  public async handleAllProduct(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<ProductsResponseDtoAdmin> | ProductsResponseDtoAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const productRepo = connection.getRepository(Product)

    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        id: In(idsAsJsonArray),
        isSoftDeleted: false
      }
      const availableProducts = await productRepo.find({
        where: query,
        join,
        order: { createdAt: sortOrder },
      })
      const transformProducts: ProductsResponseDtoAdmin[] = [];
       const processProducts = await ProductService.transformProducts(availableProducts)

      for(const tranformProduct of processProducts){
        const productId = availableProducts.find((product) => product.uuid === tranformProduct.productUuid)
        const productWithId = {id: productId!.id, ...tranformProduct}
        transformProducts.push(productWithId)
      }
     
      const resData: IServerResponse<ProductsResponseDtoAdmin[]> = {
        status: true,
        data: transformProducts,
      }
      return resData
    }

    const query: any = {
      isSoftDeleted: false
    }
    
    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "sellerUserId") {
          query.userId = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const pageSize = 10

    const totalAssignmentsNumber = await productRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds`)
    }

    const pageResult = await PaginationService.paginate(Product, query, pageSize, pageNumber, sortOrder, undefined, join)

    const allProducts = pageResult.dataset as Product[]

    const transformProducts: ProductsResponseDtoAdmin[] = [];
       const processProducts = await ProductService.transformProducts(allProducts)

      for(const tranformProduct of processProducts){
        const productId = allProducts.find((product) => product.uuid === tranformProduct.productUuid)
        const productWithId = {id: productId!.id, ...tranformProduct}
        transformProducts.push(productWithId)
      }

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformProducts, total: totalAssignmentsNumber}
    }
    return resData
  } 

  @Post('/products')
  public async handleCreateProduct(@Request() req: any, 
  @Body() requestBody: NewProductRequestDtoByAdmin): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const {categoryId, brandId, name, description, userId, price, locationState, minQty, maxQty } = requestBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User) 
    const brandRepo = connection.getRepository(Brand);
    const categoryRepo = connection.getRepository(Category) 
   
    const seller = await userRepo.findOne({
      where: { id: userId, isSeller: true}
    });

    if(!seller) {
      throw new NotFoundError("Seller Does Not Exist");
    }

    const category = await categoryRepo.findOne(categoryId);
    if(!category) {
      throw new NotFoundError("Category Does Not Exist");
    }
    
    const brand = await brandRepo.findOne(brandId);
    if(!brand) {
      throw new NotFoundError("Product Does Not Exist");
    }
   
    // 
    const createProductDto = {
      name, description, categoryUuid: category.uuid, brandUuid: brand.uuid, price, locationState, minQty, maxQty,
    }
    const createdProduct = await ProductsService.processProductSave(
      seller, createProductDto, false,
    );

    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Get('/products/:id')
  public async handleGetProductDetails(@Request() req: any, 
      @Path('id') id: string): Promise<IServerResponse<ProductsResponseDtoAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const productRepo = connection.getRepository(Product)  
   
    const product = await productRepo.findOne(id);
    if(!product) {
      throw new NotFoundError("Product Does Not Exist");
    }
    // createdProduct.user
    const transformProduct = await ProductService.transformProduct(product)
    const transformProductDetails: ProductsResponseDtoAdmin = {
      id: product.id,
      ...transformProduct,
    }

    const resData: IServerResponse<ProductsResponseDtoAdmin> = {
      status: true,
      data: transformProductDetails
    }
    return resData
  }

  // NewProductRequestDtoByAdmin

  @Get('/quoterequest')
  public async handleGetQouteRequests(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<QuoteRequestResponseDtoAdmin> | QuoteRequestResponseDtoAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const quoteRequestRepo = connection.getRepository(QuoteRequest)


    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const quoteRequests = await quoteRequestRepo.find({
        where: query,
        order: { createdAt: sortOrder },
      })
    
    
      const buyerUserIds = quoteRequests.map(quoteRequest => quoteRequest.userId)
      const sellerUserIds = quoteRequests.map(quoteRequest => quoteRequest.sellerUserId)
      const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]))
  
      const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
    
      const transformedQuoteRequestsDataset: QuoteRequestResponseDtoAdmin[] = quoteRequests.map(quoteRequest => {
        const buyerUserUuid = quoteRequest.userUuid
        const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === buyerUserUuid)
  
        const selllerUserUuid = quoteRequest.sellerUserUuid
        const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === selllerUserUuid)
  
        return {
          id: quoteRequest.id,
          userId: quoteRequest.userId,
          uuid: quoteRequest.uuid,
          referenceNumber: quoteRequest.referenceNumber,
          product: {
            uuid: quoteRequest.product.uuid,
            name: quoteRequest.product.name,
            description: quoteRequest.product.description,
            unitOfMeasurement: quoteRequest.product.category?.unitOfMeasurement ?? "",
          },
          quantity: quoteRequest.quantity,
          buyerUserPublicProfile: buyerPublicProfile!,
          sellerUserPublicProfile: sellerPublicProfile!,
          notes: quoteRequest.notes,
          orderReceiveType: quoteRequest.orderReceiveType,
          deliveryAddress: quoteRequest.deliverAddress,
          sellerResponse: quoteRequest.sellerResponse,
          calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
          status: quoteRequest.status,
          dateCreatedIso8601: quoteRequest.createdAt,
        }
      })
      const resData: IServerResponse<QuoteRequestResponseDtoAdmin[]> = {
        status: true,
        data: transformedQuoteRequestsDataset,
      }
      return resData
    
  }
    const query: any = {}
    const pageSize = 10

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.userId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "referenceNumber") {
          query.referenceNumber = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const totalAssignmentsNumber = await quoteRequestRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`)
    }

    const pageResult = await PaginationService.paginate(QuoteRequest, query, pageSize, pageNumber, sortOrder)

    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        product: "quoteRequest.product",
      },
    }

    const quoteRequestsPage = await PaginationService.paginate(QuoteRequest,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<QuoteRequest>
    const quoteRequests: QuoteRequest[] = quoteRequestsPage.dataset


    const buyerUserIds = quoteRequests.map(quoteRequest => quoteRequest.userId)
    const sellerUserIds = quoteRequests.map(quoteRequest => quoteRequest.sellerUserId)
    const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]))

    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
  
    const transformedQuoteRequestsDataset: QuoteRequestResponseDtoAdmin[] = quoteRequests.map(quoteRequest => {
      const buyerUserUuid = quoteRequest.userUuid
      const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === buyerUserUuid)

      const selllerUserUuid = quoteRequest.sellerUserUuid
      const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userUuid === selllerUserUuid)

      return {
        id: quoteRequest.id,
        userId: quoteRequest.userId,
        uuid: quoteRequest.uuid,
        referenceNumber: quoteRequest.referenceNumber,
        product: {
          uuid: quoteRequest.product.uuid,
          name: quoteRequest.product.name,
          description: quoteRequest.product.description,
          unitOfMeasurement: quoteRequest.product.category?.unitOfMeasurement ?? "",
        },
        quantity: quoteRequest.quantity,
        buyerUserPublicProfile: buyerPublicProfile!,
        sellerUserPublicProfile: sellerPublicProfile!,
        notes: quoteRequest.notes,
        orderReceiveType: quoteRequest.orderReceiveType,
        deliveryAddress: quoteRequest.deliverAddress,
        sellerResponse: quoteRequest.sellerResponse,
        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
        status: quoteRequest.status,
        dateCreatedIso8601: quoteRequest.createdAt,
      }
    })
  

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedQuoteRequestsDataset, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get("/quoterequest/:id")
  @Security('jwt')
  public async handleGetQuoteRequestDetails(@Request() req: any,
      @Path('id') id: number): Promise<IServerResponse<QuoteRequestResponseDtoAdmin>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const quoteRequestRepo = connection.getRepository(QuoteRequest)
    const pickupLocationRepo = connection.getRepository(PickupLocation);

    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        product: "quoteRequest.product",
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
      },
    }

    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        id
      },
      join
    });
    if (!quoteRequest) {
      throw new NotFoundError("The specified quote request could not be found")
    }
   
    const buyerUserPublicProfiles = await ProfileService.getPublicProfile(quoteRequest.user)
    const sellerUserPublicProfiles = await ProfileService.getPublicProfile(quoteRequest.sellerUser)

    let pickupLocation: PickupLocation | undefined;
    if(quoteRequest.sellerPickupLocationUuid) {
      pickupLocation = await pickupLocationRepo.findOne({
        uuid: quoteRequest.sellerPickupLocationUuid,
      });  
    }

    const resData: IServerResponse<QuoteRequestResponseDtoAdmin> = {
      status: true,
      data: {
        id: quoteRequest.id,
        userId: quoteRequest.userId,
        uuid: quoteRequest.uuid,
        referenceNumber: quoteRequest.referenceNumber,
        product: {
          uuid: quoteRequest.product.uuid,
          name: quoteRequest.product.name,
          description: quoteRequest.product.description,
          unitOfMeasurement:
            quoteRequest.product.category?.unitOfMeasurement ?? "",
        },
        quantity: quoteRequest.quantity,
        buyerUserPublicProfile: buyerUserPublicProfiles,
        sellerUserPublicProfile: sellerUserPublicProfiles,
        notes: quoteRequest.notes,
        orderReceiveType: quoteRequest.orderReceiveType,
        deliveryAddress: quoteRequest.deliverAddress,
        deliverAddressUuid: quoteRequest.deliverAddressUuid,
        sellerResponse: quoteRequest.sellerResponse,
        calculatedTotalCostMajor: quoteRequest.calculatedTotalCostMajor,
        status: quoteRequest.status,
        dateCreatedIso8601: quoteRequest.createdAt,
        sellerPickupLocation: pickupLocation ? {
          name: pickupLocation.name,
          address: pickupLocation.address,
          uuid: pickupLocation.uuid,
        } : undefined
      },
    };
    return resData
  }

  @Post("/quoterequest/:id/adminresponse")
  @Security('jwt')
  public async handleQuoteRequestSellerResponse(@Request() req: any,
      @Path('id') id: number,
      @Body() reqBody: { unitPrice: number, deliveryFee: number | null }): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    
    const connection = await getFreshConnection()
    const quoteRequestRepo = connection.getRepository(QuoteRequest)
    const userRepo = connection.getRepository(User)
    const productRepo = getRepository(Product)
    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
        product: "quoteRequest.product"
      },
    }

    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        id
      },
      join,
    });
    if (!quoteRequest) {
      throw new NotFoundError('The specified quote request could not be found')
    }
   
    if (quoteRequest.status !== QuoteRequestStatuses.PENDING) {
      throw new UnprocessableEntityError('Cannot respond to the quote request')
    }

    const now = Utils.utcNow()

    quoteRequest.statusHistory.push({
      status: QuoteRequestStatuses.PROCESSED,
      dateTimeInISO8601: now.toISOString()
    })
    const qouteRequestProduct = await productRepo.findOne({ id: quoteRequest.productId})

    const unitPriceForBuyer = Utils.getPriceForBuyer(reqBody.unitPrice, qouteRequestProduct)
    const productCategoryPromo = await PromotionService.activeCategoryPromotion(quoteRequest.product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

    const referenceNumber = Utils.getOrderEntityReferenceNumber(quoteRequest)

    const subtotalMajor = (unitPriceForBuyer * quoteRequest.quantity)
    const calculatedTotalCostMajor = Utils.normalizeMoney(subtotalMajor + (reqBody.deliveryFee ?? 0))

    await quoteRequestRepo.createQueryBuilder()
      .update(QuoteRequest)
      .set({
        hasSellerResponse: true,
        referenceNumber,
        sellerResponse: {
          unitPrice: reqBody.unitPrice,
          unitPriceForBuyer,
          unitPromoPriceForBuyer,
          promotionId: productCategoryPromo?.id,
          deliveryFee: (reqBody.deliveryFee || 0),
        },
        calculatedTotalCostMajor,
        sellerResponseSubmittedAt: now,
        status: QuoteRequestStatuses.PROCESSED,
        statusHistory: quoteRequest.statusHistory,
      })
      .where({ id: quoteRequest.id })
      .execute()
        
    const sellerAccountStats = await AccountStatService.getSellerAccountStats(quoteRequest.userId)
    const accountStatRepo = getRepository(SellerAccountStat)
  
    await accountStatRepo.createQueryBuilder()
      .update(SellerAccountStat)
      .set({
        totalPendingQuoteRequestsCount: sellerAccountStats.totalPendingQuoteRequestsCount - 1,
      })
      .where({ id: sellerAccountStats.id })
      .execute()
    
    // TODO
    // notify buyer of seller response
    // via mail
    const sellerDetail = await userRepo.findOne({ id: quoteRequest.userId})
    const productDetail: Product | undefined = await productRepo.findOne({id: quoteRequest.productId})
    const sellerResponse = {
      unitPrice: reqBody.unitPrice,
      unitPriceForBuyer,
      deliveryFee: (reqBody.deliveryFee || 0),
    };

    
    quoteRequest.calculatedTotalCostMajor = calculatedTotalCostMajor
    const sendQouteRequestResponseAdmin =  await EmailService.sellerQouteRequestResponseMail(sellerDetail!, 
      quoteRequest, quoteRequest.user, productDetail!, sellerResponse )
    console.log('Did Qoute Request response mail to Admin works',sendQouteRequestResponseAdmin)

    const notificationMetadata: NotificationMetadata = {
      quoteRequestUuid: quoteRequest.uuid,
    }
    const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
    const currency = CurrencyEnum[sellerDetail!.countryIso2] || "NGN";

    const notificatiionMessage = `Seller: #${quoteRequest.sellerUser.lastName} has responded 
      to your Quote request: #${quoteRequest.referenceNumber}. 
      Total cost: ${currency}${quoteRequest.calculatedTotalCostMajor}`
    const notificationTransports: NotificationTransports = {
      [NotificationTransportMode.IN_APP]: true,
      [NotificationTransportMode.EMAIL]: true,
      [NotificationTransportMode.SMS]: true
    }
    // send mail here 
    
    NotificationService.sendSingleNotificationToUserId(quoteRequest.userId, quoteRequest.user?.uuid,
      NotificationMessageTypes.QUOTE_REQUEST_SELLER_RESPONSE,
      'Seller has responded to your Quote Request.  CinderBuild Team.', notificatiionMessage, notificationTransports, notificationMetadata)

    const resData = {
      status: true,
    };
    return resData
  }


  @Post('/moveproducts')
  public async handleMoveProductToAnotherSeller(@Request() req: any, 
  @Body() requestBody: MoveSellerProductToOmaDto): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const {sellerUuid, newSellerUuid, categoryUuid} = requestBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User) 
    
    const categoryRepo = connection.getRepository(Category) 
   
    const seller = await userRepo.findOne({
      where: { uuid: sellerUuid, isSeller: true}
    });

    const omaSeller = await userRepo.findOne({
      where: { uuid: newSellerUuid, isSeller: true}
    });

    if(!seller) {
      throw new NotFoundError("Seller Does Not Exist");
    }

    if(!omaSeller) {
      throw new NotFoundError("Seller Does Not Exist");
    }

    const category = await categoryRepo.findOne({ uuid:categoryUuid });

    if(!category) {
      throw new NotFoundError("Category Does Not Exist");
    }
    
    const payload: IMoveProductToSeller = {
      sellerId: seller.id,
      omaSellerId: omaSeller.id,
      categoryId: category.id
    }
    await AdminService.moveSellerProductsToAnOmaAccount(payload)
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }

  @Get("/oldseller/products")
  public async handleGetOldSellerProducts(
    @Request() req: any
  ): Promise<IServerResponse<ProductsResponseDto[]>> {
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
   
    const query: any = {
      oldSellerId: Not(IsNull()),
    };

    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        oldSeller: "product.oldSeller",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const productRepo = getRepository(Product);
    const products: Product[] = await productRepo.find({
      where: query,
      join,
    });

    const transformProductDetails = await ProductService.transformOldSellerProducts(products)

    const resData: IServerResponse<ProductsResponseDto[]> = {
      status: true,
      data: transformProductDetails
    };

    return resData;
  }



  @Put('/quoterequest/decline/:quoteRequestUuid')
  public async handleQuoteRequestDecline(@Request() req: any, @Path('quoteRequestUuid') quoteRequestUuid: string): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    
    const connection = await getFreshConnection()
    const quoteRequestRepo = connection.getRepository(QuoteRequest) 
    
    const join = {
      alias: "quoteRequest",
      leftJoinAndSelect: {
        user: "quoteRequest.user",
        sellerUser: "quoteRequest.sellerUser",
      },
    }
    
    const quoteRequest = await quoteRequestRepo.findOne({
      where: {
        uuid: quoteRequestUuid,
      },
      join,
    });
  
    if(!quoteRequest) {
      throw new NotFoundError("Quote Request Does Not Exist");
    }
    if (quoteRequest.status !== QuoteRequestStatuses.PENDING) {
      throw new UnprocessableEntityError('Cannot decline the quote request')
    }
    
    await AdminService.declineQuoteRequestByAdmin(quoteRequest)
    
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }


  @Post('/create-dedicated-account')
  public async handleVirtualAccountCreationForUser(@Request() req: any, 
  @Body() requestBody: { userId: number}): Promise<IServerResponse<IVirtualDedicatedAccount>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const { userId } = requestBody

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User) 
    
  
   
    const userExist = await userRepo.findOne({id: userId});

   

    if(!userExist) {
      throw new NotFoundError("User Does Not Exist");
    }

   

    const newUserVda = await PaystackService.createDedicatedNuban(userExist)
    const resData: IServerResponse<IVirtualDedicatedAccount> = {
      status: true,
      data: {
        userId: userExist.id,
        bankId: newUserVda.bankId,
        bankName: newUserVda.bankName,
        bankAccountNumber: newUserVda.bankAccountNumber,
        bankAccountName: newUserVda.bankAccountName
      }
    }
    return resData
  }

  @Get("/virtual-account")
  public async handleGetUserVirtualAccounts(
    @Request() req: any
  ): Promise<IServerResponse<IVirtualDedicatedAccount[]>> {
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const virtualDedicatedAccountsRepo = getRepository(PaystackDedicatedNuban);
    const virtualAccounts: PaystackDedicatedNuban[] = await virtualDedicatedAccountsRepo.find();

    const transformProductDetails = await AdminService.transformDedicatedAccount(virtualAccounts)

    const resData: IServerResponse<IVirtualDedicatedAccount[]> = {
      status: true,
      data: transformProductDetails
    };

    return resData;
  }


  @Get("/audit-logs")
  public async handleGetAuditLogs(
    @Request() req: any
  ): Promise<IServerResponse<IAuditLogs[]>> {
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const auditLogRepo = getRepository(AuditLogs);
    const responseAuditLogs: IAuditLogs[] = await auditLogRepo.find();

    const transformProductDetails = await auditLogService.transformAuditLogs(responseAuditLogs)

    const resData: IServerResponse<IAuditLogs[]> = {
      status: true,
      data: transformProductDetails
    };

    return resData;
  }

  @Get('/pricematrices')
  public async handleGetPricesMatrices(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<PriceMatricesResponseByAdmin> | PriceMatricesResponseByAdmin[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const priceMatrixRepo = connection.getRepository(PriceMatrix)


    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const join = {
        alias: "price_matrices",
        leftJoinAndSelect: {
          product: "price_matrices.product",
        },
      };
      
      const query: any = {
        uuid: In(idsAsJsonArray)
      }
      const priceMatrices = await priceMatrixRepo.find({
        where: query,
        join,
        order: { createdAt: sortOrder },
      })
    
    
      const buyerUserIds = priceMatrices.map(pricematrix => pricematrix.buyerUserId)
      const sellerUserIds = priceMatrices.map(pricematrix => pricematrix.sellerUserId)
      const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]))
  
      const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
    
      const transformedPriceMatricesDataset: PriceMatricesResponseByAdmin[] = priceMatrices.map(pricematrix => {
        
        const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.buyerUserId)
  
        const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.sellerUserId)
  
        return {
          id: pricematrix.id,
          buyerUserId: pricematrix.buyerUserId,
          sellerUserId: pricematrix.sellerUserId,
          uuid: pricematrix.uuid,
          qouteRequestRef: pricematrix.qouteRequestRef,
          qouteRequestId: pricematrix.qouteRequestId,
          product: {
            uuid: pricematrix.product.uuid,
            name: pricematrix.product.name,
            description: pricematrix.product.description,
            unitOfMeasurement: pricematrix.product.category?.unitOfMeasurement ?? "",
          },
          quantity: pricematrix.quantity,
          transactionType: pricematrix.transactionType,
          buyerUserPublicProfile: buyerPublicProfile!,
          sellerUserPublicProfile: sellerPublicProfile!,
          deliveryDate: pricematrix.deliveryDate,
          deliveryAddress: pricematrix.deliveryAddress,
          productSellingPriceMajor: pricematrix.productSellingPriceMajor,
          productCostPriceMajor: pricematrix.productCostPriceMajor,
          totalProductSellingPriceMajor: pricematrix.totalProductSellingPriceMajor,
          productMarginMajor: pricematrix.productMarginMajor,
          totlaMarginMajor: pricematrix.totlaMarginMajor,
          status: pricematrix.status,
          statusHistory: pricematrix.statusHistory,
          createdAt: pricematrix.createdAt,
        }
      })
      const resData: IServerResponse<PriceMatricesResponseByAdmin[]> = {
        status: true,
        data: transformedPriceMatricesDataset,
      }
      return resData
    
  }
    const query: any = {}
    const pageSize = 10

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "buyerUserId") {
          query.buyerUserId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "qouteRequestRef") {
          query.qouteRequestRef = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const totalAssignmentsNumber = await priceMatrixRepo.count({
      where: query,
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of Price Matrics for Qoute request`)
    }

    const pageResult = await PaginationService.paginate(PriceMatrix, query, pageSize, pageNumber, sortOrder)

    const join = {
      alias: "price_matrices",
      leftJoinAndSelect: {
        product: "price_matrices.product",
      },
    };

    const priceMatricestsPage = await PaginationService.paginate(PriceMatrix,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<PriceMatrix>
    const priceMatrics: PriceMatrix[] = priceMatricestsPage.dataset


    const buyerUserIds = priceMatrics.map(priceMatrix => priceMatrix.buyerUserId)
    const sellerUserIds = priceMatrics.map(priceMatrix => priceMatrix.sellerUserId)
    const allUserIds = _.uniq(_.flatten([buyerUserIds, sellerUserIds]))

    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(allUserIds)
  
    const transformedQuoteRequestsDataset: PriceMatricesResponseByAdmin[] = priceMatrics.map(pricematrix => {
      const buyerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.buyerUserId)
  
      const sellerPublicProfile = userPublicProfiles.find(publicProfile => publicProfile.userId === pricematrix.sellerUserId)

      return {
        id: pricematrix.id,
        buyerUserId: pricematrix.buyerUserId,
        sellerUserId: pricematrix.sellerUserId,
        uuid: pricematrix.uuid,
        qouteRequestRef: pricematrix.qouteRequestRef,
        qouteRequestId: pricematrix.qouteRequestId,
        product: {
          uuid: pricematrix.product.uuid,
          name: pricematrix.product.name,
          description: pricematrix.product.description,
          unitOfMeasurement: pricematrix.product.category?.unitOfMeasurement ?? "",
        },
        quantity: pricematrix.quantity,
        transactionType: pricematrix.transactionType,
        buyerUserPublicProfile: buyerPublicProfile!,
        sellerUserPublicProfile: sellerPublicProfile!,
        deliveryDate: pricematrix.deliveryDate,
        deliveryAddress: pricematrix.deliveryAddress,
        productSellingPriceMajor: pricematrix.productSellingPriceMajor,
        productCostPriceMajor: pricematrix.productCostPriceMajor,
        totalProductSellingPriceMajor: pricematrix.totalProductSellingPriceMajor,
        productMarginMajor: pricematrix.productMarginMajor,
        totlaMarginMajor: pricematrix.totlaMarginMajor,
        status: pricematrix.status,
        statusHistory: pricematrix.statusHistory,
        createdAt: pricematrix.createdAt,
      }
    })
  

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedQuoteRequestsDataset, total: totalAssignmentsNumber}
    }
    return resData
  }

  @Get('/pricematrices/:id')
  public async handleGetPricesMatrixDetails(@Request() req: any, 
  @Path('id') id: number): Promise<IServerResponse<PriceMatricesResponseByAdmin>>{
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const priceMatrixRepo = connection.getRepository(PriceMatrix)
    const join = {
      alias: "price_matrices",
      leftJoinAndSelect: {
        product: "price_matrices.product",
        buyerUser: "price_matrices.buyerUser",
        sellerUser: "price_matrices.sellerUser",
      },
    };
    const priceMatrix = await priceMatrixRepo.findOne({
      where: { id },
      join,
    })
    if(!priceMatrix){
      throw new NotFoundError('Intial Price Matrix Not Found')
    }
    const tranformPriceMatrix = await PriceMatrixService.transformPriceMatrixDetails(priceMatrix);
   
    const resData: IServerResponse<PriceMatricesResponseByAdmin> = {
      status: true,
      data: tranformPriceMatrix
    }
    return resData
  }

  @Post('/pricematrices')
  public async handleSubmitPriceMatrix(@Request() req: any, 
  @Body() requestBody: SubmitPriceMatricDto): Promise<IServerResponse<void>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
  
    await PriceMatrixService.submitPriceMatrix(requestBody)
    // sending mail to maangement for approval   
    
    const resData = {
      status: true,
    }
    return resData;
  }

  @Patch('pricematrices/delivered/:id')
  public async handleApprovePricesMatrix(@Request() req: any, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    await PriceMatrixService.processPriceMatrixOrderDelivery(id);
    const resData = {
      status: true,
    }
    return resData;

   
  }

  // processDeclinePriceMatrixByAdmin
  @Patch('pricematrices/declined/:id')
  public async handleDeclinePricesMatrixByAdmin(@Request() req: any, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    await PriceMatrixService.processDeclinePriceMatrixByAdmin(id);
    const resData = {
      status: true,
    }
    return resData;

   
  }

  // activateCStoreUser
  @Patch('cstore/activateuser/:id')
  public async handleCStoreForUserByAdmin(@Request() req: any, 
  @Path('id') id: number): Promise<IServerResponse<void>>{
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const user = await userRepo.findOne({
      where: { id }
    });

    if(!user){
      throw new UnprocessableEntityError("User Does Not Exist");
    }
    
    await ProfileService.activateCStoreUser(user);
    const resData = {
      status: true,
    }
    return resData;
   
  }

  @Post('/quoterequest/create-admin')
  public async handleQuoteRequestCreation(@Request() req: any, 
  @Body() requestBody: QouteRequestAdminCreateRequestDto): Promise<IServerResponse<void>>{
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);
   
    await QouteRequestService.createQouteRequestByAdmin(requestBody)
    const resData = {
      status: true,
    }
    return resData;
   
  }

  @Get('/mortgageaccountverification')
  public async handleGetMortgageAccountVerification(@Request() req: any, 
      @Query('sortOrder') sortOrder: SortOrder,
      @Query('pageNumber') pageNumber?: any,
      @Query('filter') filter?: any,
      @Query('ids') ids?: string): Promise<IServerResponse<IPaginatedList<DeveloperAccountVerificationResponseAdminDto> | DeveloperAccountVerificationResponseAdminDto[]>> {
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const join = {
      alias: "mortgage_account_verifications",
      leftJoinAndSelect: {
        user: "mortgage_account_verifications.user",
      },
    }

    const connection = await getFreshConnection()
    const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification)


    if (ids) {
      const idsAsJsonArray: string[] = JSON.parse(decodeURIComponent(ids!))
      if (!idsAsJsonArray.length) {
        throw new BadRequestError('ids were not specified')
      }
      const query: any = {
        uuid: In(idsAsJsonArray)
      }

      const mortgageAccountVerifications = await mortgageAccountVerificationRepo.find({
        where: query,
        join,
        order: { createdAt: sortOrder },
      })
    
      const developerUserIds = mortgageAccountVerifications.map( developer => developer.userId);
  
      const developerPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(developerUserIds)
    
      const transformedMortgageAccountVerificationsDataset: DeveloperAccountVerificationResponseAdminDto[] = mortgageAccountVerifications.map(verification => {
        const developerUserUuid = verification.user.uuid

        const developerProfile = developerPublicProfiles.find(publicProfile => publicProfile.userUuid === developerUserUuid)

        return {
          id: verification.id,
          uuid: verification.uuid,
          developerPublicProfile: developerProfile!,
          accountType: verification.accountType,
          bankStatement: verification.bankStatement,
          bankStatementApproved: verification.bankStatementApproved,
          governmentApprovedId: verification.governmentApprovedId,
          governmentApprovedIdApproved: verification.governmentApprovedIdApproved,
          recentUtilityBill: verification.recentUtilityBill,
          recentUtilityBillApproved: verification.recentUtilityBillApproved,
          cacCertificate: verification.cacCertificate,
          cacCertificateApproved: verification.cacCertificateApproved,
          isApproved: verification.isApproved,
          accountConfirmed: verification.accountConfirmed,
        }
      })
      const resData: IServerResponse<DeveloperAccountVerificationResponseAdminDto[]> = {
        status: true,
        data: transformedMortgageAccountVerificationsDataset,
      }
      return resData
    
  }
    const query: any = {}
    const pageSize = 10

    if (filter) {
      const filtersAsJson = JSON.parse(filter!);
      for (const filterKey in filtersAsJson) {
        if (filterKey === "userId") {
          query.userId = Number(filtersAsJson[filterKey]);
        }
        if (filterKey === "referenceNumber") {
          query.referenceNumber = Number(filtersAsJson[filterKey]);
        }
      }
    }

    const totalAssignmentsNumber = await mortgageAccountVerificationRepo.count({
      where: query,
      join
    })

    const offset = (pageNumber - 1) * pageSize
    if (offset > totalAssignmentsNumber) {
      throw new UnprocessableEntityError(`Page exceeds current number of delivery to warehouse request`)
    }

    const pageResult = await PaginationService.paginate(MortgageAccountVerification, query, pageSize, pageNumber, sortOrder)


    const mortgageAccountVerificationsPage = await PaginationService.paginate(MortgageAccountVerification,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<MortgageAccountVerification>
    const mortgageAccountVerifications: MortgageAccountVerification[] = mortgageAccountVerificationsPage.dataset


    const developerUserIds = mortgageAccountVerifications.map( developer => developer.userId);
  

    const developerPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(developerUserIds)
  
    const transformedMortgageAccountVerificationsDataset: DeveloperAccountVerificationResponseAdminDto[] = mortgageAccountVerifications.map(verification => {
      
      const developerUserUuid = verification.user.uuid

      const developerProfile = developerPublicProfiles.find(publicProfile => publicProfile.userUuid === developerUserUuid)

      return {
        id: verification.id,
        uuid: verification.uuid,
        developerPublicProfile: developerProfile!,
        accountType: verification.accountType,
        bankStatement: verification.bankStatement,
        bankStatementApproved: verification.bankStatementApproved,
        governmentApprovedId: verification.governmentApprovedId,
        governmentApprovedIdApproved: verification.governmentApprovedIdApproved,
        recentUtilityBill: verification.recentUtilityBill,
        recentUtilityBillApproved: verification.recentUtilityBillApproved,
        cacCertificate: verification.cacCertificate,
        cacCertificateApproved: verification.cacCertificateApproved,
        isApproved: verification.isApproved,
        accountConfirmed: verification.accountConfirmed,
      }
    })
  

    const resData = {
      status: true,
      data: {...pageResult, dataset: transformedMortgageAccountVerificationsDataset, total: totalAssignmentsNumber}
    }
    return resData
  }

  // approveDeveloperDocument
  @Post('/mortgageaccountverification/approve-document')
  public async handleApproveDeveloperDocument(
    @Request() req: any,
    @Query("fileCategory") fileCategory: MortgageAccountVerificationFiles, 
  @Body() requestBody: ApprovedMortgageAccountDocumentDto): Promise<IServerResponse<void>>{

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const developer = await userRepo.findOne({
      where: { id: requestBody.userId, isDeveloper: true }
    });

    if(!developer){
      throw new UnprocessableEntityError('Developer Account Does Not Exist');
    }

    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
    await AdminService.adminCanEdit(req, currentAdminUser);

    await DeveloperService.approveDeveloperDocument(developer, requestBody, fileCategory)
    const resData = {
      status: true,
    }
    return resData;
   
  }

  @Post('/mortgageaccountverification/approve-account')
  public async handleApproveDeveloperAccount(@Request() req: any, 
  @Body() requestBody: { userId: number}): Promise<IServerResponse<void>>{
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const developer = await userRepo.findOne({
      where: { id: requestBody.userId, isDeveloper: true }
    });

    if(!developer){
      throw new UnprocessableEntityError('Developer Account Does Not Exist');
    }

    await AdminService.adminCanEdit(req, currentAdminUser);

   
    await DeveloperService.approveDeveloperAccount(developer)
    const resData = {
      status: true,
    }
    return resData;
  }

  @Post('/mortgageaccountverification/confirm-account')
  public async handleConfirmDeveloperAccount(@Request() req: any, 
  @Body() requestBody: { userId: number}): Promise<IServerResponse<void>>{
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const developer = await userRepo.findOne({
      where: { id: requestBody.userId, isDeveloper: true }
    });

    if(!developer){
      throw new UnprocessableEntityError('Developer Account Does Not Exist');
    }


    await AdminService.adminCanEdit(req, currentAdminUser);

   
    await DeveloperService.confirmDeveloperAccount(developer)
    const resData = {
      status: true,
    }
    return resData;
  }

  @Post('/mortgageaccountverification/confirm-approved-account')
  public async handleConfirmApproveDeveloperAccount(@Request() req: any, 
  @Body() requestBody: { userId: number}): Promise<IServerResponse<void>>{
    
    const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)

    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const developer = await userRepo.findOne({
      where: { id: requestBody.userId, isDeveloper: true }
    });

    if(!developer){
      throw new UnprocessableEntityError('Developer Account Does Not Exist');
    }

    await AdminService.adminCanEdit(req, currentAdminUser);

   
    await DeveloperService.confirmAndApprovedDeveloperAccount(developer)
    const resData = {
      status: true,
    }
    return resData;
  }

  @Security("jwt")
  @Patch("/approveproject/:projectuuid")
  public async handleApproveProject(@Request() req: any,  
  @Path("projectuuid") projectuuid: string, 
      ): Promise<IServerResponse<void>> {
     const currentAdminUser: User = req.user
    await AdminService.isValidAdmin(currentAdminUser)
  
    await AdminService.adminCanEdit(req, currentAdminUser);

    const connection = await getFreshConnection();
    const projectRepo = connection.getRepository(Project);
  
    const join = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    };
  
    const project = await projectRepo.findOne({
      where: { uuid: projectuuid, isSoftDeleted: false},
      join
    })
  
    if(!project){
      throw new UnprocessableEntityError('Project Does not Exist')
    }
  
    await ProjectService.updateProjectSatatus(project, ProjectStatuses.ACTIVE )
  
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

   @Get('/mortgagecards')
   public async handleFetchMortgageCard(
     @Request() req: any,
     ): Promise<IServerResponse<MortgageCardDto[]>>{
    
     const currentAdminUser: User = req.user
     await AdminService.isValidAdmin(currentAdminUser)
     await AdminService.adminCanEdit(req, currentAdminUser);
 
    const cardPan = await MortgageCardService.fetchAllPan()
     const resData = {
       status: true,
       data: cardPan
     }
     return resData;
    
   }


}
