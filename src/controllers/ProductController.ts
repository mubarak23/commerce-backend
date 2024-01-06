/* eslint-disable no-shadow */
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from "tsoa";
import { getRepository, In } from "typeorm";
import * as _ from "underscore";

import { getFreshConnection } from "../db";
import AvailableLocationStatesResponseDto from "../dto/AvailableLocationStatesResponseDto";
import BrandsResponseDto from "../dto/BrandsResponseDto";
import CategoriesResponseDto from "../dto/CategoriesResponseDto";
import CategoryBrandsDto from "../dto/CategoryBrandsDto";
import CategoryLocationStates from "../dto/CategoryLocationStatesDto";
import { IPaginatedList } from "../dto/IPaginatedList";
import { NewProductRequestDto } from "../dto/NewProductRequestDto";
import NewUpdateProductRequestDto from "../dto/NewUpdateProductRequestDto";
import ProductCatalogueFilterRequestDto from "../dto/ProductCatalogueFilterRequestDto";
import { ProductReviewRequestDto } from "../dto/ProductReviewRequestDto";
import { ProductReviewsResponseDto } from "../dto/ProductReviewResponseDto";
import { ProductsResponseDto } from "../dto/ProductsResponseDto";
import { AvailableLocationState } from "../entity/AvailableLocationState";
import { Brand } from "../entity/Brand";
import { Category } from "../entity/Category";
import { Product } from '../entity/Product';
import { ProductReview } from "../entity/ProductReview";
import { User } from "../entity/User";
import { ProductPriceSortOrder, SortOrder } from "../enums/SortOrder";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OmitFields } from "../interfaces/OmitFields";
import * as FileUploadService from "../services/fileUploadService";
import * as PaginationService from "../services/paginationService";
import * as ProductService from "../services/productsService";
import * as ProductsService from "../services/productsService";
import * as ProfileService from "../services/profileService";
import { BadRequestError, NotFoundError, UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";

@Route("api/products")
@Tags("Products")
export class ProductsController extends Controller {

  @Get("/categories/all")
  public async handleGetAllCategories(
    @Request() req: any,
    @Query("pageNumber") pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query("sortOrder") sortOrder: SortOrder,
  ): Promise <IServerResponse<IPaginatedList<CategoriesResponseDto[]>>> {
    const query: any = {
      isSoftDeleted: false,
    };
    const join = { };
    const categorysPage: IPaginatedList<Category> = (await PaginationService.paginate(
      Category,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    )) as IPaginatedList<Category> 
    const categories: Category[] = categorysPage.dataset;

    const categoryRepo = getRepository(Category);
    const total = await categoryRepo.count(query);

    const transformCategories = categories.map((category) => {
      return {
        uuid: category.uuid,
        name: category.name,
        imageUrl: category.image?.url,
        bannerUrl: category.banner.url,
        productsCount: category.productsCount,
        brands: category.brands
      };
    })

    const resData: IServerResponse<any> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: _.shuffle(transformCategories) },
    };

    return resData;
  }

  @Get("/brands/all")
  public async handleGetAllBrands(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
  ): Promise<IServerResponse<IPaginatedList<BrandsResponseDto[]>>> {
  
    const query: any = {
      isSoftDeleted: false,
    };
    const join = { };

    const pageSize = 10;

    const brandsPage: IPaginatedList<Brand> = (await PaginationService.paginate(
      Brand,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    )) as IPaginatedList<Brand>
    const brands: Brand[] = brandsPage.dataset;

    const brandRepo = getRepository(Brand);
    const total = await brandRepo.count(query);

    const transformBrands = brands.map((brand) => {
      return {
        uuid: brand.uuid,
        name: brand.name,
        imageUrl: brand.image?.url,
        productsCount: brand.productsCount,
      };
    })


    const resData: IServerResponse<any> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: _.shuffle(transformBrands) },
    };
    
    return resData;
  }

  @Get("/categories/available")
  public async handleGetAvailableCategories(
    @Request() req: any
  ): Promise<IServerResponse<CategoriesResponseDto[]>> {
    const categories = await Category.find({ isAvailable: true });

    const resData: IServerResponse<CategoriesResponseDto[]> = {
      status: true,
      data: categories.map((cat) => {
        return {
          uuid: cat.uuid,
          name: cat.name,
          imageUrl: cat.image?.url,
          bannerUrl: cat.banner.url,
          productsCount: cat.productsCount,
          brands: cat.brands
        };
      }),
    };

    return resData;
  }

  @Get("/brands/available")
  public async handleGetAvailableBrands(
    @Request() req: any
  ): Promise<IServerResponse<BrandsResponseDto[]>> {
    const brands = await Brand.find({ isAvailable: true });

    const resData: IServerResponse<BrandsResponseDto[]> = {
      status: true,
      data: brands.map((brand) => {
        return {
          uuid: brand.uuid,
          name: brand.name,
          imageUrl: brand.image?.url,
          productsCount: brand.productsCount,
        };
      }),
    };

    return resData;
  }

  @Get("/brands/:categoryUuid")
  public async handleGetBrandCategories(
    @Request() req: any,
    @Query("isAddProduct") isAddProduct: boolean,
    @Path("categoryUuid") categoryUuid: string
  ): Promise<IServerResponse<CategoryBrandsDto[]>> {
    if(isAddProduct){
      const availableCategoryBrands = await Category.findOne({
        uuid: categoryUuid,
      });
      if(!availableCategoryBrands) {
        throw new NotFoundError('Category was not found')
      }

      const resData: IServerResponse<CategoryBrandsDto[]> = {
        status: true,
        data: availableCategoryBrands.brands
      };
      return resData
    }

    const availableProductBrands = await Product.find({
      categoryUuid,
      isSoftDeleted: false,
      isVariant: false
    });
    const uniqueBrandsIds = availableProductBrands
      .map((item) => item.brandId)
      .filter((value, index, self) => self.indexOf(value) === index);
    
    const brandNames = await Brand.find({
      id: In(uniqueBrandsIds),
    });
    const transformBrands = brandNames.map((person) => ({
      uuid: person.uuid,
      name: person.name,
    }));
    const resData: IServerResponse<CategoryBrandsDto[]> = {
      status: true,
      data: transformBrands || [],
    };

    return resData;
  }

  @Get("/category/locationstates/:categoryUuid")
  public async handleGetCategoryLocationStates(
    @Request() req: any,
    @Path("categoryUuid") categoryUuid: string
  ): Promise<IServerResponse<CategoryLocationStates[]>> {
    const availableLocationStates = await Product.find({
      categoryUuid,
    });

    const uniqueStates = availableLocationStates
      .map((item) => item.locationState)
      .filter((value, index, self) => self.indexOf(value) === index);

    const resData: IServerResponse<CategoryLocationStates[]> = {
      status: true,
      data: uniqueStates.map((locState) => {
        return {
          state: locState,
        };
      }),
    };

    return resData;
  }

  @Get("/available/locationstates")
  public async handleGetAvailableLocationStates(
    @Request() req: any
  ): Promise<IServerResponse<AvailableLocationStatesResponseDto[]>> {
    const availableLocationStates = await AvailableLocationState.find({});

    const resData: IServerResponse<AvailableLocationStatesResponseDto[]> = {
      status: true,
      data: availableLocationStates.map((locState) => {
        return {
          state: locState.state,
          country: locState.country,
          countryIso2Code: locState.countryIso2Code,
          productsCount: locState.productsCount,
        };
      }),
    };

    return resData;
  }

  @Get("/category/:categoryUuid")
  public async categoryProducts(
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: ProductPriceSortOrder,
    @Path("categoryUuid") categoryUuid: string
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const query: any = {
      categoryUuid,
      isSoftDeleted: false,
      isVariant: false,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productRepo = getRepository(Product);
    const categoryRepo = getRepository(Category);
    const existingCategory = await categoryRepo.findOne({
      uuid: categoryUuid,
    });
    if (!existingCategory) {
      throw new NotFoundError("Category does not exist");
    }

    const productsPage: IPaginatedList<Product> = (await PaginationService.paginateProducts(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    ));
    const products: Product[] = productsPage.dataset;

    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<IPaginatedList<ProductsResponseDto>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };
    return resData;
  }

  @Get("/categoryInfo/:categoryUuid")
  public async categoryInfo(
    @Path("categoryUuid") categoryUuid: string
  ): Promise<IServerResponse<CategoriesResponseDto>> {
    const categoryRepo = getRepository(Category);
    const existingCategory = await categoryRepo.findOne({
      uuid: categoryUuid,
    });
    if (!existingCategory) {
      this.setStatus(404);
      throw new NotFoundError("Category does not exist");
    }
    const categoryInfoDetails = {
      uuid: existingCategory.uuid,
      name: existingCategory.name,
      productsCount: existingCategory.productsCount,
      bannerUrl: existingCategory.banner.url,
      imageUrl: existingCategory.image.url,
    };
    this.setStatus(200);
    const resData: IServerResponse<CategoriesResponseDto> = {
      status: true,
      data: categoryInfoDetails,
    };
    return resData;
  }

  @Get("/brand/:brandUuid")
  public async brandProducts(
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: ProductPriceSortOrder,
    @Path("brandUuid") brandUuid: string
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const query: any = {
      brandUuid,
      isSoftDeleted: false,
      isVariant: false,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productRepo = getRepository(Product);
    const brandRepo = getRepository(Brand);
    const existingBrand = await brandRepo.findOne({
      uuid: brandUuid,
    });
    if (!existingBrand) {
      throw new NotFoundError("Brand does not exist");
    }

    const productsPage: IPaginatedList<Product> = (await PaginationService.paginateProducts(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    ));
    const products: Product[] = productsPage.dataset;

    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<IPaginatedList<ProductsResponseDto>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };
    return resData;
  }

  @Get("/brandInfo/:brandUuid")
  public async brandInfo(
    @Path("brandUuid") brandUuid: string
  ): Promise<IServerResponse<BrandsResponseDto>> {
    const brandRepo = getRepository(Brand);
    const existingBrand = await brandRepo.findOne({
      uuid: brandUuid,
    });
    if (!existingBrand) {
      this.setStatus(404);
      throw new NotFoundError("Brand does not exist");
    }
    const brandInfoDetails = {
      uuid: existingBrand.uuid,
      name: existingBrand.name,
      productsCount: existingBrand.productsCount,
      imageUrl: existingBrand.image.url,
    };
    this.setStatus(200);
    const resData: IServerResponse<BrandsResponseDto> = {
      status: true,
      data: brandInfoDetails,
    };
    return resData;
  }

  @Post("/catalogue/for/guest")
  public async handleGetProductsCatalogueForGuest(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: ProductPriceSortOrder,
    @Body() reqBody: ProductCatalogueFilterRequestDto
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const query: any = {
      isSoftDeleted: false,
      isVariant: false,
    };
    if (reqBody.brandUuids && reqBody.brandUuids.length) {
      query.brandUuid = In(reqBody.brandUuids);
    }
    if (reqBody.categoryUuids && reqBody.categoryUuids.length) {
      query.categoryUuid = In(reqBody.categoryUuids);
    }
    if (reqBody.locationStates && reqBody.locationStates.length) {
      query.locationState = In(reqBody.locationStates);
    }
    if (reqBody.lga && reqBody.lga.length) {
      query.lga = In(reqBody.lga);
    }

    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productsPage: IPaginatedList<Product> = (await PaginationService.paginateProducts(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    ));
    const products: Product[] = productsPage.dataset;

    const productRepo = getRepository(Product);
    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<any> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: _.shuffle(productsResponse) },
    };
    return resData;
  }

  @Post("/catalogue/for/loggedin")
  @Security("jwt")
  public async handleGetProductsCatalogueForLoggedIn(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: ProductPriceSortOrder,
    @Body() reqBody: ProductCatalogueFilterRequestDto
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const currentUser = req.user;

    if(reqBody.forOnlyDefaultLinkedSeller) {
      if(!currentUser.defaultSellerUserId) {
        const resData: IServerResponse<any> = {
          status: true,
          data: { pageNumber, total:0, pageSize: 20, dataset: [] },
        };
        return resData;
      }
    }

    const query = await ProductService.productsQueryForLoggedInUser(
      currentUser,
      reqBody
    );

    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;
    const productsPage: IPaginatedList<Product> = (await PaginationService.paginateProducts(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    ));
    const products: Product[] = productsPage.dataset;

    const productRepo = getRepository(Product);
    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<any> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: _.shuffle(productsResponse) },
    };
    return resData;
  }

  @Get("/search")
  public async handleGetSearchProducts(
    @Query("searchWord") searchWord: string
  ): Promise<IServerResponse<ProductsResponseDto[]>> {
    const productRepo = getRepository(Product);
    if(searchWord.toLowerCase() === 'cem'){
      
      const products = await ProductService.searchCementProducts(searchWord)
      const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<ProductsResponseDto[]> = {
      status: true,
      data: productsResponse,
    };
    return resData;

  }
    if(searchWord.toLowerCase() === 'cement'){
  
      const products = await ProductService.searchCementProducts(searchWord)
      const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<ProductsResponseDto[]> = {
      status: true,
      data: productsResponse,
    };
    return resData;

  }
    
    const products = await productRepo
      .createQueryBuilder("product")
      .where("LOWER(product.name) LIKE :searchWord", {
        searchWord: `${searchWord.toLowerCase()}%`,
      })
      .leftJoinAndSelect("product.user", "user")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.pickupLocation", "pickupLocation")
      .limit(10)
      .getMany();

    if(products.length === 0){
      const products = await productRepo
      .createQueryBuilder("product")
      .where("LOWER(product.description) LIKE :searchWord", {
        searchWord: `${searchWord.toLowerCase()}%`,
      })
      .leftJoinAndSelect("product.user", "user")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.pickupLocation", "pickupLocation")
      .limit(10)
      .getMany();

      const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<any> = {
      status: true,
      data: productsResponse,
    };
    return resData;
    }
    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<any> = {
      status: true,
      data: productsResponse,
    };
    return resData;
  }

  @Get("/variants/:productUuid")
  public async handleProductVariantsFetch(
    @Path("productUuid") productUuid: string
  ): Promise<IServerResponse<ProductsResponseDto[]>> {
    const productDetails = await ProductService.getProductByUuid(productUuid);
    if (!productDetails) {
      throw new NotFoundError("Specified product does not exist");
    }

    const query: any = {
      parentProductId: productDetails.id,
      isSoftDeleted: false,
      isVariant: true,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
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

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<ProductsResponseDto[]> = {
      status: true,
      data: productsResponse,
    };
    return resData;
  }

  @Get("")
  @Security("jwt")
  public async handleFetchCurrentUserProducts(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const currentUser: User = req.user;

    const query: any = {
      userId: currentUser.id,
      isSoftDeleted: false,
      isVariant: false,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productsPage = (await PaginationService.paginate(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    )) as IPaginatedList<Product>;
    const products: Product[] = productsPage.dataset;

    const productRepo = getRepository(Product);
    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);

    const resData: IServerResponse<IPaginatedList<ProductsResponseDto>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };
    return resData;
  }

  @Get("/seller/:userUuid")
  @Security("jwt")
  public async handleFetchSellerProducts(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("userUuid") userUuid: string
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const currentUser: User = req.user;

    const userRepo = getRepository(User);

    const sellerPublicProfile =
      await ProfileService.getPublicProfileFromUserUuid(userUuid);
    if (!sellerPublicProfile.businessProfile) {
      throw new UnprocessableEntityError("Selected user is not a seller");
    }

    const sellerUser = await userRepo.findOne({
      uuid: userUuid,
    });
    if(!sellerUser) {
      throw new NotFoundError('Seller user was not found')
    }

    const query: any = {
      userId: sellerUser.id,
      isSoftDeleted: false,
      isVariant: false,
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productsPage = (await PaginationService.paginate(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    )) as IPaginatedList<Product>;

    if(productsPage.dataset.length === 0){
      throw new UnprocessableEntityError('No Product for the Seller')
    }
    const products: Product[] = productsPage.dataset;

    const productRepo = getRepository(Product);
    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformSellerProducts(products);

    const resData: IServerResponse<IPaginatedList<ProductsResponseDto>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };
    return resData;
  }

  @Get("/:productUuid")
  @Security("jwt")
  public async getProductDetails(
    @Request() req: any,
    @Query("productUuid") productUuid: string
  ): Promise<IServerResponse<ProductsResponseDto>> {
    const currentUser: User = req.user;
    const productDetails = await ProductService.getProductByUuid(productUuid);

    if (!productDetails) {
      throw new NotFoundError("Specified product does not exist");
    }

    const transformProductDetails = await ProductService.transformProduct(
      productDetails,
      currentUser.id
    );
    const resData: IServerResponse<ProductsResponseDto> = {
      status: true,
      data: transformProductDetails,
    };
    return resData;
  }

  @Get("/guest/:productUuid")
  public async getPublicProductDetails(
    @Request() req: any,
    @Query("productUuid") productUuid: string
  ): Promise<IServerResponse<ProductsResponseDto>> {
    const productDetails = await ProductService.getProductByUuid(productUuid);

    if (!productDetails) {
      throw new NotFoundError("Specified product does not exist");
    }

    const transformProductDetails = await ProductService.transformProduct(
      productDetails,
    );
    const resData: IServerResponse<ProductsResponseDto> = {
      status: true,
      data: transformProductDetails,
    };
    return resData;
  }

  @Post("/create")
  @Security("jwt")
  public async createProducts(
    @Request() req: any,
    @Body() requestBody: NewProductRequestDto
  ): Promise<IServerResponse<ProductsResponseDto>> {
    const currentUser: User = req.user;

    const createdProduct = await ProductsService.processProductSave(
      currentUser, requestBody, false,
    );
    
    const transformProductDetails = await ProductService.transformProduct(
      createdProduct,
      currentUser.id
    );

    this.setStatus(201);

    const resData: IServerResponse<ProductsResponseDto> = {
      status: true,
      data: transformProductDetails,
    };
    return resData;
  }

  @Post("/create/variant/:productUuid")
  @Security("jwt")
  public async createProductVariant(
    @Request() req: any,
    @Path("productUuid") productUuid: string,
    @Body() requestBody: NewProductRequestDto
  ): Promise<IServerResponse<ProductsResponseDto>> {
    const currentUser: User = req.user;

    const parentProductDetails = await ProductService.getProductByUuid(productUuid);
    if (!parentProductDetails) {
      throw new NotFoundError("Specified product does not exist");
    }

    if (parentProductDetails.isVariant) {
      throw new UnprocessableEntityError("You are not allowed to create a product variant from another product variant.");
    }

    const createdProduct = await ProductsService.processProductSave(
      currentUser, requestBody, false, parentProductDetails,
    );

    createdProduct.user = currentUser;

    const transformProductDetails = await ProductService.transformProduct(
      createdProduct,
      currentUser.id
    );

    this.setStatus(201);

    const resData: IServerResponse<ProductsResponseDto> = {
      status: true,
      data: transformProductDetails,
    };
    return resData;
  }

  @Security("jwt")
  @Put("/:uuid")
  public async handleProductUpdate(@Request() req: any,  @Path("uuid") productUuid: string, 
      @Body() reqBody: NewUpdateProductRequestDto): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const updateProductData = reqBody;
    const productRepo = getRepository(Product);

    const existingProduct = await productRepo.findOne({
      uuid: productUuid,
      userId: currentUser.id,
    });
    if (!existingProduct) {
      throw new UnauthorizedRequestError(
        "You are not allowed to edit the product"
      );
    }

    const updateQuery: any = updateProductData;

    const categoryRepo = getRepository(Category);
    if (updateProductData.categoryUuid) {
      const category = await categoryRepo.findOne({
        uuid: updateProductData.categoryUuid,
      });
      if (category) {
        updateQuery.categoryId = category.id;
      }
    }

    if (updateProductData.brandUuid) {
      const brandRepo = getRepository(Brand);
      const brand = await brandRepo.findOne({
        uuid: updateProductData.brandUuid,
      });
      if (brand) {
        updateQuery.brandId = brand.id;
      }
    }
    updateQuery.tags = updateProductData.tags || {};

    productRepo
      .createQueryBuilder()
      .update(Product)
      .set(updateQuery)
      .where({
        uuid: productUuid,
      })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Delete("/:productUuid")
  @Security("jwt")
  public async handleDeleteProduct(@Request() req: any, @Path("productUuid") productUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const productRepo = getRepository(Product);

    const existingProduct = await productRepo.findOne({
      uuid: productUuid,
      userId: currentUser.id,
    });

    if (!existingProduct) {
      throw new NotFoundError('The Product Doest Not Exist')
    }

    await productRepo
      .createQueryBuilder()
      .update(Product)
      .set({ isSoftDeleted: true })
      .where({
        uuid: productUuid,
      })
      .execute();
    
    await ProductService.reduceProductCounts(await existingProduct);

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Delete("/")
  @Security("jwt")
  public async handleDeleteProductImage(
    @Request() req: any,
    @Query("productUuid") productUuid: string,
    @Query("keyFromCloudProvider") keyFromCloudProvider: string
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const productRepo = getRepository(Product);

    const existingProduct = await productRepo.findOne({
      uuid: productUuid,
      userId: currentUser.id,
    });

    if (!existingProduct) {
      this.setStatus(404);
      const resData: IServerResponse<any> = {
        status: true,
        message: "The Product Does Not Exist",
      };
      return resData;
    }
    await FileUploadService.processDeleteProductPhoto(keyFromCloudProvider, existingProduct)

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Post("/:productUuid/review")
  public async reviewProduct(
    @Request() req: any,
    @Body() reqBody: ProductReviewRequestDto,
    @Path("productUuid") productUuid: string
  ): Promise<IServerResponse<Omit<ProductReview, OmitFields>>> {
    const currentUser: User = req.user;

    const { reviewNote, rating } = reqBody;

    if (!reviewNote || reviewNote === null) {
      throw new BadRequestError(`Please type in a review.`);
    }
    if (reviewNote.length > 1000) {
      throw new UnprocessableEntityError(
        "Review is quite long. Please make it less than 1000 characters."
      );
    }
    //--
    const connection = await getFreshConnection();
    const productRepo = connection.getRepository(Product);
    const product = await productRepo.findOne({ uuid: productUuid });

    if (!product) {
      throw new NotFoundError("Product was not found");
    }
    // --Check that customer has placed an order with the product in the past
    // const orderRepo = connection.getRepository(Order)
    // const order = await orderRepo.findOne({
    //   userId: currentUser.id,
    //   productId: product.id
    // })
    //--
    const productReview = await ProductService.submitReview(
      currentUser,
      product,
      rating,
      reviewNote
    );

    const resData: IServerResponse<Omit<ProductReview, OmitFields>> = {
      status: true,
      data: _.omit(productReview, "id", "userId"),
    };
    return resData;
  }

  @Get("/:productUuid/reviews")
  public async handleGetProductReviews(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Path("productUuid") productUuid: string
  ): Promise<IServerResponse<IPaginatedList<ProductReviewsResponseDto>>> {
    const currentUser: User = req.user;

    const productRepo = getRepository(Product);

    const product = await productRepo.findOne({
      uuid: productUuid,
      isSoftDeleted: false,
    });
    if (!product) {
      this.setStatus(404);
      const resData: IServerResponse<any> = {
        status: true,
        message: "Product not found",
      };
      return resData;
    }

    const pageSize = 10;

    const productReviewRepo = getRepository(ProductReview);
    const query = {
      productId: product.id,
    };
    const productReviewsPage = (await PaginationService.paginate(
      ProductReview,
      query,
      pageSize,
      pageNumber,
      sortOrder
    )) as IPaginatedList<ProductReview>;
    const productReviews: ProductReview[] = productReviewsPage.dataset;

    const totalCount = await productReviewRepo.count({
      productId: product.id,
    });

    const sellerUserIds = productReviews.map(
      (productReview) => productReview.userId
    );
    const userPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
      sellerUserIds
    );

    const transformedProductReviewsDataset: ProductReviewsResponseDto[] =
      productReviews.map((productReview) => {
        const { userUuid } = productReview;
        const publicProfile = userPublicProfiles.find(
          (publicProfile) => publicProfile.userUuid === userUuid
        );

        return {
          reviewUuid: productReview.uuid,
          reviewerPublicProfile: publicProfile!,
          rating: productReview.rating,
          reviewNote: productReview.reviewNote,
          reviewDateUtc: productReview.createdAt.toUTCString(),
        };
      });

    const resData = {
      status: true,
      data: {
        pageNumber,
        pageSize,
        dataset: transformedProductReviewsDataset,
        total: totalCount,
      },
    };
    return resData;
  }

  @Get('catelogue/guest/:sellerUuid')
  public async handlePublicSellerProducts(@Request() req: any, 
    @Path("sellerUuid") sellerUuid: string,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
  ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);

    const seller = await userRepo.findOne({ uuid: sellerUuid, isSeller: true })
    if(!seller){
      throw new UnprocessableEntityError('Seller Does not exist')
    }
    const query: any = {
      isSoftDeleted: false,
      isVariant: false,
      userId: seller.id
    };
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    };

    const pageSize = 20;

    const productsPage = (await PaginationService.paginate(
      Product,
      query,
      pageSize,
      pageNumber,
      sortOrder,
      undefined,
      join
    )) as IPaginatedList<Product>;
    const products: Product[] = productsPage.dataset;

    const productRepo = getRepository(Product);
    const total = await productRepo.count(query);

    const productsResponse: ProductsResponseDto[] =
      await ProductsService.transformProducts(products);
    
    const resData: IServerResponse<IPaginatedList<ProductsResponseDto>> = {
      status: true,
      data: { pageNumber, total, pageSize, dataset: productsResponse },
    };

    return resData;
  }


  @Security("jwt")
  @Put("/deactivate/:uuid")
  public async handleDeActivateProdict(@Request() req: any,  @Path("uuid") productUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const productRepo = getRepository(Product);

    const existingProduct = await productRepo.findOne({
      uuid: productUuid,
      userId: currentUser.id,
    });
    
    if (!existingProduct) {
      throw new UnauthorizedRequestError(
        "You are not allowed to edit the product"
      );
    }

    if(existingProduct.isSoftDeleted === true){
      throw new UnprocessableEntityError('Can Not Deactivate a Deleted Product')
    }


    productRepo
      .createQueryBuilder()
      .update(Product)
      .set({ isActive: false})
      .where({
        uuid: productUuid,
      })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }



  @Security("jwt")
  @Put("/activate/:uuid")
  public async handleActivateProdict(@Request() req: any,  @Path("uuid") productUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const productRepo = getRepository(Product);

    const existingProduct = await productRepo.findOne({
      uuid: productUuid,
      userId: currentUser.id,
    });
    
    if (!existingProduct) {
      throw new UnauthorizedRequestError(
        "You are not allowed to edit the product"
      );
    }

    if(existingProduct.isSoftDeleted === true){
      throw new UnprocessableEntityError('Can Not Activate a Deleted Product')
    }


    productRepo
      .createQueryBuilder()
      .update(Product)
      .set({ isActive: true})
      .where({
        uuid: productUuid,
      })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }






}
