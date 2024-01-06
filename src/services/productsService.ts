/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { getRepository, In, Not } from "typeorm";
import * as _ from 'underscore';
import { CEMENT_CATEGORY_UUID } from '../constants';
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { NewProductRequestDto } from '../dto/NewProductRequestDto';
import ProductCatalogueFilterRequestDto from '../dto/ProductCatalogueFilterRequestDto';
import { ProductsResponseDto } from '../dto/ProductsResponseDto';
import { AvailableLocationState } from "../entity/AvailableLocationState";
import { Brand } from "../entity/Brand";
import { Cart } from '../entity/Cart';
import { Category } from "../entity/Category";
import { PickupLocation } from '../entity/PickupLocation';
import { Product } from "../entity/Product";
import { ProductReview } from "../entity/ProductReview";
import { SavedProduct } from "../entity/SavedProduct";
import { User } from "../entity/User";
import { CountryCodeToCurrency } from '../enums/Currency';
import { OmitFields } from '../interfaces/OmitFields';
import * as Utils from "../utils/core";
import { BadRequestError, UnprocessableEntityError } from '../utils/error-response-types';
import * as ProfileService from "./profileService";
import * as PromotionService from "./promotionService";


export const productsQueryForLoggedInUser = async (currentUser: User, reqBody: ProductCatalogueFilterRequestDto): Promise<any> => {
  const query: any = {
    isSoftDeleted: false,
    userId: Not(currentUser.id), // We don't want the user to see products that belong to him
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
  if(reqBody.forOnlyDefaultLinkedSeller) {
    if(currentUser.defaultSellerUserId) {
      query.userId = currentUser.defaultSellerUserId
    }
  }
  return query
}

export const transformProducts = async (products: Product[]): Promise<ProductsResponseDto[]> => {
  if(!products.length) {
    return []
  }
  const sellerUserIds = products.filter((product) => product.isActive === true).map((product) => product.userId);

  const sellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
    sellerUserIds
  );

  const pickupLocationRepo = getRepository(PickupLocation);
  const pickupLocations: PickupLocation[] = await pickupLocationRepo.find({
    userId: In(products.map(product => product.userId)),
    isSoftDeleted: false
  });

  const sellerPickupLocations = pickupLocations;
  const sellerPickupLocationsDto: Omit<PickupLocation, OmitFields>[] = sellerPickupLocations.map((location) =>
    _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted")
  );
  
  const productsResponse: ProductsResponseDto[] = []

  for(const product of products) {
    const sellerUserUuid = product.user.uuid;
    const sellerPublicProfile = sellerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === sellerUserUuid
    );

    const productImages = product.images || []
    const productResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
      productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

    const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product)

    const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

    const oneProductsResponse: ProductsResponseDto = product.toResponseDto(
      sellerPublicProfile!,
      productResponseImages,
      sellerPickupLocationsDto,
      unitPriceForBuyer,
      unitPromoPriceForBuyer,
    )
    productsResponse.push(oneProductsResponse)
  }

  return productsResponse;
};

export const transformSellerProducts = async (products: Product[]): Promise<ProductsResponseDto[]> => {
  if(!products.length) {
    return []
  }
  const sellerUserIds = products.map((product) => product.userId);

  const sellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
    sellerUserIds
  );

  const pickupLocationRepo = getRepository(PickupLocation);
  const pickupLocations: PickupLocation[] = await pickupLocationRepo.find({
    userId: In(products.map(product => product.userId)),
    isSoftDeleted: false
  });

  const sellerPickupLocations = pickupLocations;
  const sellerPickupLocationsDto: Omit<PickupLocation, OmitFields>[] = sellerPickupLocations.map((location) =>
    _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted")
  );
  
  const productsResponse: ProductsResponseDto[] = []

  for(const product of products) {
    const sellerUserUuid = product.user.uuid;
    const sellerPublicProfile = sellerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === sellerUserUuid
    );

    const productImages = product.images || []
    const productResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
      productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

    const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product)

    const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

    const oneProductsResponse: ProductsResponseDto = product.toResponseDto(
      sellerPublicProfile!,
      productResponseImages,
      sellerPickupLocationsDto,
      unitPriceForBuyer,
      unitPromoPriceForBuyer,
    )
    productsResponse.push(oneProductsResponse)
  }

  return productsResponse;
};



export const transformOldSellerProducts = async (products: Product[]): Promise<ProductsResponseDto[]> => {
  if(!products.length) {
    return []
  }
  console.log(products)
  const currentSellerUserIds = products.map((product) => product.userId);

  const oldSellerUserIds = products.map((product) => product.oldSellerId);

  const curreltSellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
    currentSellerUserIds
  );

  const oldSellerPublicProfiles = await ProfileService.getPublicProfileFromUserIds(
    oldSellerUserIds
  );

  const pickupLocationRepo = getRepository(PickupLocation);
  const pickupLocations: PickupLocation[] = await pickupLocationRepo.find({
    userId: In(products.map(product => product.userId)),
    isSoftDeleted: false
  });

  const sellerPickupLocations = pickupLocations;
  const sellerPickupLocationsDto: Omit<PickupLocation, OmitFields>[] = sellerPickupLocations.map((location) =>
    _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted")
  );
  
  const productsResponse: ProductsResponseDto[] = []

  for(const product of products) {
    const sellerUserUuid = product.user.uuid;
    const oldSellerUserUuid = product.oldSeller.uuid;
    const currentSellerPublicProfile = curreltSellerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === sellerUserUuid
    );

    const oldSellerPublicProfile = oldSellerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === oldSellerUserUuid
    );

    const productImages = product.images || []
    const productResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
      productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

    const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product)

    const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

    const oneProductsResponse: ProductsResponseDto = product.toResponseDto(
      currentSellerPublicProfile!,
      productResponseImages,
      sellerPickupLocationsDto,
      unitPriceForBuyer,
      unitPromoPriceForBuyer,
      false,
      oldSellerPublicProfile,
    )
    productsResponse.push(oneProductsResponse)
  }

  return productsResponse;
};

export const transformSavedProducts = async (savedProductsPage: IPaginatedList<SavedProduct>): Promise<ProductsResponseDto[]> => {
  const productRepo = getRepository(Product);
  
  const productIds: number[] = savedProductsPage.dataset.map((dataRecord) => {
    const savedProduct = dataRecord as SavedProduct;
    return savedProduct.productId;
  });
  if(!productIds.length) {
    return []
  }

  const products = await productRepo.find({
    where: {
      id: In(productIds),
    },
    join: {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
      },
    },
  });

  const productsResponse: ProductsResponseDto[] = await transformProducts(products);

  return productsResponse;
};

export const transformProduct = async (product: Product, userId?: number): Promise<ProductsResponseDto> => {
  const sellerPublicProfile = await ProfileService.getPublicProfile(product.user);

  const productImages = product.images || []
  const productResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

  const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product)

  const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
  const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

  const pickupLocationRepo = getRepository(PickupLocation);
  const pickupLocations: PickupLocation[] = await pickupLocationRepo.find({
    userId: product.userId,
    isSoftDeleted: false
  });

  const sellerPickupLocations = pickupLocations || [];
  const sellerPickupLocationsDto: Omit<PickupLocation, OmitFields>[] = sellerPickupLocations.map((location) =>
    _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted")
  );

  let isOnCart = false
  if(userId) {
    const cartRepo = getRepository(Cart)
    const cart = await cartRepo.findOne({ userId });
    if(cart){
      const { cartItems } = cart;
      const foundCartItem = cartItems.find(
        (cartItem) => cartItem.productUuid === product.uuid
      );
      isOnCart = !!foundCartItem
    }
  }

  const productsResponse: ProductsResponseDto = product.toResponseDto(
    sellerPublicProfile,
    productResponseImages,
    sellerPickupLocationsDto,
    unitPriceForBuyer,
    unitPromoPriceForBuyer,
    isOnCart,
  )

  productsResponse!.variantsProducts = await transformVariantProducts(product.id)
  return productsResponse;
};


export const transformVariantProducts = async(productId: number): Promise<ProductsResponseDto[] | boolean> => {
  const query: any = {
    parentProductId: productId,
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

  if(!products){
    return false
  }
  const productsResponse: ProductsResponseDto[] =
    await transformProducts(products);
  return productsResponse  
}



export const submitReview = async (
  currentUser: User,
  product: Product,
  rating: number,
  reviewNote: string
): Promise<ProductReview> => {
  const orderRatingUpdateObject: any = {};

  const connection = await getFreshConnection();

  return connection.transaction(async (transactionalEntityManager) => {
    const productReviewRepoT =
      transactionalEntityManager.getRepository(ProductReview);
    const productRepoT = transactionalEntityManager.getRepository(Product);

    let productReview = await productReviewRepoT.findOne({
      userId: currentUser.id,
      productId: product.id,
    });

    if (!productReview) {
      productReview = new ProductReview().initialize(
        currentUser,
        product.id,
        rating,
        reviewNote
      );
      await productReviewRepoT.save(productReview);
    } else {
      productReview.rating = rating;
      productReview.reviewNote = reviewNote;
      await productReviewRepoT
        .createQueryBuilder()
        .update(ProductReview)
        .set(orderRatingUpdateObject)
        .where({
          id: productReview.id,
        })
        .execute();
    }

    await productRepoT
      .createQueryBuilder()
      .update(Product)
      .set({
        totalRatingsValue: () => `total_ratings_value + ${rating}`,
        totalNumberOfRatings: () => "total_number_of_ratings + 1",
      })
      .where({
        id: product.id,
      })
      .execute();

    return productReview;
  });
};

export const getProductByUuid = async (productUuid: string): Promise<Product> => {
  const productRepo = getRepository(Product);

  const product = await productRepo.findOne({
    where: {
      uuid: productUuid,
      isActive: true,
      isSoftDeleted: false
    },
    join: {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    },
  });
  return product!;
};

export const getProductsByUuid = async (productUuids: string[]): Promise<Product[]> => {
  const productRepo = getRepository(Product);

  const products = await productRepo.find({
    where: {
      uuid: In(productUuids),
      isActive: true,
      isSoftDeleted: false,
    },
    join: {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
        pickupLocation: "product.pickupLocation",
      },
    },
  });
  return products;
};

export const reduceProductCounts = async (product: Product): Promise<any> => {
  const categoryProductCounts = await Category.findOne({ id: product.categoryId });
  categoryProductCounts!.productsCount -= 1;
  await categoryProductCounts!.save();

  const brandProductCounts = await Brand.findOne({ id: product.brandId });
  brandProductCounts!.productsCount -= 1;
  await brandProductCounts!.save();

  const availableLocationRepo = getRepository(AvailableLocationState);
  const availableState = await availableLocationRepo.findOne({
    state: product.locationState,
  });
  if(availableState) {
    availableState.productsCount -= 1;
    await availableState.save();  
  }
  return true;
}

export const updateProductCounts = async (product: Product): Promise<any> => {
  const categoryProductCounts = await Category.findOne({ id: product.categoryId });
  categoryProductCounts!.productsCount += 1;
  await categoryProductCounts!.save();

  const brandProductCounts = await Brand.findOne({ id: product.brandId });
  brandProductCounts!.productsCount += 1;
  await brandProductCounts!.save();

  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ id: product.userId });

  const availableLocationRepo = getRepository(AvailableLocationState);
  const availableState = await availableLocationRepo.findOne({
    state: product.locationState,
  });
  if (!availableState) {
    const newProductLocation = new AvailableLocationState().initialize(
      product.locationState,
      user!.countryLongName,
      user!.countryIso2
    );
    await availableLocationRepo.save(newProductLocation);
    return true;
  }
  availableState.productsCount +=1
  await availableState.save()

  return true;
};

export const processProductSave = async (sellerUser: User,
    productRequest: NewProductRequestDto, forceEdit: boolean, parentProduct?: Product,
  ): Promise<Product> => {
  const productRepo = getRepository(Product);

  const existingProduct = await productRepo.findOne({
    userId: sellerUser.id,
    name: productRequest.name,
    isSoftDeleted: false,
  });
  if (!forceEdit && existingProduct) {
    throw new BadRequestError(
      "You already have a product with the same name in your catalogue"
    );
  }

  const CurrencyEnum: { [idx: string]: CountryCodeToCurrency; } = <any>CountryCodeToCurrency;
  const sellerDefaultCurrency = CurrencyEnum[sellerUser.countryIso2]

  const categoryRepo = getRepository(Category);
  const category = await categoryRepo.findOne({
    uuid: productRequest.categoryUuid,
  });

  const brandRepo = getRepository(Brand);
  const brand = await brandRepo.findOne({ uuid: productRequest.brandUuid });
  const productPriceCurrency = sellerDefaultCurrency;
  // i will set up transaction to enable rollback if any fail between crate prosuct and updateProductCounts

  let createdProduct = new Product().initialize(
    sellerUser.id,
    productRequest,
    category!,
    brand!,
    productPriceCurrency,
    productRequest.tags,
  );
  if(parentProduct) {// Meaning we want to create a product variant 
    createdProduct.parentProductId = parentProduct.id
    createdProduct.hasVariants = false
    createdProduct.isVariant = true
  }
  if (existingProduct && forceEdit) {
    createdProduct.id = existingProduct.id
  }
  createdProduct = await productRepo.save(createdProduct);

  if(parentProduct && !parentProduct.hasVariants) {
    parentProduct.hasVariants = true
    await parentProduct.save()
  }

  if (createdProduct) {
    const pickupLocationRepo = getRepository(PickupLocation); 
    await updateProductCounts(createdProduct);

    if (productRequest.pickupAddressUuid) {
      const pickupLocation = await pickupLocationRepo.findOne({
        uuid: productRequest.pickupAddressUuid,
      });
      if (pickupLocation) {
        await productRepo
          .createQueryBuilder()
          .update(Product)
          .set({
            pickupLocationId: pickupLocation.id,
          })
          .where({
            id: createdProduct.id,
          })
          .execute();
      }
    } else if (!existingProduct && productRequest.newPickupAddress) {
      const { name, address, country, state, contactFullName, contactPhoneNumber } =
        productRequest.newPickupAddress;

      const newPickupLocation = new PickupLocation().initialize(
        sellerUser.id,
        name ?? '',
        address,
        country,
        state,
        contactFullName ?? '',
        contactPhoneNumber ?? '',
      )

      const pickupLocation = await pickupLocationRepo.save(newPickupLocation);

      await productRepo
        .createQueryBuilder()
        .update(Product)
        .set({
          pickupLocationId: pickupLocation.id,
        })
        .where({
          id: createdProduct.id,
        })
        .execute();
    }
  }
  const fullProductDetails = await getProductByUuid(createdProduct.uuid);

  return fullProductDetails!
}


export const searchCementProducts = async(searchWord: string): Promise<Product[]> => {
  const connection = await getFreshConnection();
  const productRepo = connection.getRepository(Product);
  const products = await productRepo
      .createQueryBuilder("product")
      .where("product.categoryUuid = :categoryUuid", {
        categoryUuid: CEMENT_CATEGORY_UUID,
      })
       .andWhere("product.isSoftDeleted =:isSoftDeleted", {
        isSoftDeleted: false
      })
      .leftJoinAndSelect("product.user", "user")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.pickupLocation", "pickupLocation")
      .limit(20)
      .getMany();

   if(products.length === 0){
    throw new UnprocessableEntityError('No Product Founds')
   }   

 return products
}