"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCementProducts = exports.processProductSave = exports.updateProductCounts = exports.reduceProductCounts = exports.getProductsByUuid = exports.getProductByUuid = exports.submitReview = exports.transformVariantProducts = exports.transformProduct = exports.transformSavedProducts = exports.transformOldSellerProducts = exports.transformSellerProducts = exports.transformProducts = exports.productsQueryForLoggedInUser = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
const typeorm_1 = require("typeorm");
const _ = __importStar(require("underscore"));
const constants_1 = require("../constants");
const db_1 = require("../db");
const AvailableLocationState_1 = require("../entity/AvailableLocationState");
const Brand_1 = require("../entity/Brand");
const Cart_1 = require("../entity/Cart");
const Category_1 = require("../entity/Category");
const PickupLocation_1 = require("../entity/PickupLocation");
const Product_1 = require("../entity/Product");
const ProductReview_1 = require("../entity/ProductReview");
const User_1 = require("../entity/User");
const Currency_1 = require("../enums/Currency");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const ProfileService = __importStar(require("./profileService"));
const PromotionService = __importStar(require("./promotionService"));
const productsQueryForLoggedInUser = (currentUser, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        isSoftDeleted: false,
        userId: (0, typeorm_1.Not)(currentUser.id),
        isVariant: false,
    };
    if (reqBody.brandUuids && reqBody.brandUuids.length) {
        query.brandUuid = (0, typeorm_1.In)(reqBody.brandUuids);
    }
    if (reqBody.categoryUuids && reqBody.categoryUuids.length) {
        query.categoryUuid = (0, typeorm_1.In)(reqBody.categoryUuids);
    }
    if (reqBody.locationStates && reqBody.locationStates.length) {
        query.locationState = (0, typeorm_1.In)(reqBody.locationStates);
    }
    if (reqBody.lga && reqBody.lga.length) {
        query.lga = (0, typeorm_1.In)(reqBody.lga);
    }
    if (reqBody.forOnlyDefaultLinkedSeller) {
        if (currentUser.defaultSellerUserId) {
            query.userId = currentUser.defaultSellerUserId;
        }
    }
    return query;
});
exports.productsQueryForLoggedInUser = productsQueryForLoggedInUser;
const transformProducts = (products) => __awaiter(void 0, void 0, void 0, function* () {
    if (!products.length) {
        return [];
    }
    const sellerUserIds = products.filter((product) => product.isActive === true).map((product) => product.userId);
    const sellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(sellerUserIds);
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const pickupLocations = yield pickupLocationRepo.find({
        userId: (0, typeorm_1.In)(products.map(product => product.userId)),
        isSoftDeleted: false
    });
    const sellerPickupLocations = pickupLocations;
    const sellerPickupLocationsDto = sellerPickupLocations.map((location) => _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted"));
    const productsResponse = [];
    for (const product of products) {
        const sellerUserUuid = product.user.uuid;
        const sellerPublicProfile = sellerPublicProfiles.find((publicProfile) => publicProfile.userUuid === sellerUserUuid);
        const productImages = product.images || [];
        const productResponseImages = productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product);
        const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
        const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
        const oneProductsResponse = product.toResponseDto(sellerPublicProfile, productResponseImages, sellerPickupLocationsDto, unitPriceForBuyer, unitPromoPriceForBuyer);
        productsResponse.push(oneProductsResponse);
    }
    return productsResponse;
});
exports.transformProducts = transformProducts;
const transformSellerProducts = (products) => __awaiter(void 0, void 0, void 0, function* () {
    if (!products.length) {
        return [];
    }
    const sellerUserIds = products.map((product) => product.userId);
    const sellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(sellerUserIds);
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const pickupLocations = yield pickupLocationRepo.find({
        userId: (0, typeorm_1.In)(products.map(product => product.userId)),
        isSoftDeleted: false
    });
    const sellerPickupLocations = pickupLocations;
    const sellerPickupLocationsDto = sellerPickupLocations.map((location) => _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted"));
    const productsResponse = [];
    for (const product of products) {
        const sellerUserUuid = product.user.uuid;
        const sellerPublicProfile = sellerPublicProfiles.find((publicProfile) => publicProfile.userUuid === sellerUserUuid);
        const productImages = product.images || [];
        const productResponseImages = productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product);
        const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
        const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
        const oneProductsResponse = product.toResponseDto(sellerPublicProfile, productResponseImages, sellerPickupLocationsDto, unitPriceForBuyer, unitPromoPriceForBuyer);
        productsResponse.push(oneProductsResponse);
    }
    return productsResponse;
});
exports.transformSellerProducts = transformSellerProducts;
const transformOldSellerProducts = (products) => __awaiter(void 0, void 0, void 0, function* () {
    if (!products.length) {
        return [];
    }
    console.log(products);
    const currentSellerUserIds = products.map((product) => product.userId);
    const oldSellerUserIds = products.map((product) => product.oldSellerId);
    const curreltSellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(currentSellerUserIds);
    const oldSellerPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(oldSellerUserIds);
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const pickupLocations = yield pickupLocationRepo.find({
        userId: (0, typeorm_1.In)(products.map(product => product.userId)),
        isSoftDeleted: false
    });
    const sellerPickupLocations = pickupLocations;
    const sellerPickupLocationsDto = sellerPickupLocations.map((location) => _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted"));
    const productsResponse = [];
    for (const product of products) {
        const sellerUserUuid = product.user.uuid;
        const oldSellerUserUuid = product.oldSeller.uuid;
        const currentSellerPublicProfile = curreltSellerPublicProfiles.find((publicProfile) => publicProfile.userUuid === sellerUserUuid);
        const oldSellerPublicProfile = oldSellerPublicProfiles.find((publicProfile) => publicProfile.userUuid === oldSellerUserUuid);
        const productImages = product.images || [];
        const productResponseImages = productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product);
        const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
        const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
        const oneProductsResponse = product.toResponseDto(currentSellerPublicProfile, productResponseImages, sellerPickupLocationsDto, unitPriceForBuyer, unitPromoPriceForBuyer, false, oldSellerPublicProfile);
        productsResponse.push(oneProductsResponse);
    }
    return productsResponse;
});
exports.transformOldSellerProducts = transformOldSellerProducts;
const transformSavedProducts = (savedProductsPage) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const productIds = savedProductsPage.dataset.map((dataRecord) => {
        const savedProduct = dataRecord;
        return savedProduct.productId;
    });
    if (!productIds.length) {
        return [];
    }
    const products = yield productRepo.find({
        where: {
            id: (0, typeorm_1.In)(productIds),
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
    const productsResponse = yield (0, exports.transformProducts)(products);
    return productsResponse;
});
exports.transformSavedProducts = transformSavedProducts;
const transformProduct = (product, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerPublicProfile = yield ProfileService.getPublicProfile(product.user);
    const productImages = product.images || [];
    const productResponseImages = productImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    const unitPriceForBuyer = Utils.getPriceForBuyer(product.price, product);
    const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
    const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
    const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
    const pickupLocations = yield pickupLocationRepo.find({
        userId: product.userId,
        isSoftDeleted: false
    });
    const sellerPickupLocations = pickupLocations || [];
    const sellerPickupLocationsDto = sellerPickupLocations.map((location) => _.omit(location, "userId", "createdAt", "updatedAt", "id", "isSoftDeleted"));
    let isOnCart = false;
    if (userId) {
        const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
        const cart = yield cartRepo.findOne({ userId });
        if (cart) {
            const { cartItems } = cart;
            const foundCartItem = cartItems.find((cartItem) => cartItem.productUuid === product.uuid);
            isOnCart = !!foundCartItem;
        }
    }
    const productsResponse = product.toResponseDto(sellerPublicProfile, productResponseImages, sellerPickupLocationsDto, unitPriceForBuyer, unitPromoPriceForBuyer, isOnCart);
    productsResponse.variantsProducts = yield (0, exports.transformVariantProducts)(product.id);
    return productsResponse;
});
exports.transformProduct = transformProduct;
const transformVariantProducts = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
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
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const products = yield productRepo.find({
        where: query,
        join,
    });
    if (!products) {
        return false;
    }
    const productsResponse = yield (0, exports.transformProducts)(products);
    return productsResponse;
});
exports.transformVariantProducts = transformVariantProducts;
const submitReview = (currentUser, product, rating, reviewNote) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRatingUpdateObject = {};
    const connection = yield (0, db_1.getFreshConnection)();
    return connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const productReviewRepoT = transactionalEntityManager.getRepository(ProductReview_1.ProductReview);
        const productRepoT = transactionalEntityManager.getRepository(Product_1.Product);
        let productReview = yield productReviewRepoT.findOne({
            userId: currentUser.id,
            productId: product.id,
        });
        if (!productReview) {
            productReview = new ProductReview_1.ProductReview().initialize(currentUser, product.id, rating, reviewNote);
            yield productReviewRepoT.save(productReview);
        }
        else {
            productReview.rating = rating;
            productReview.reviewNote = reviewNote;
            yield productReviewRepoT
                .createQueryBuilder()
                .update(ProductReview_1.ProductReview)
                .set(orderRatingUpdateObject)
                .where({
                id: productReview.id,
            })
                .execute();
        }
        yield productRepoT
            .createQueryBuilder()
            .update(Product_1.Product)
            .set({
            totalRatingsValue: () => `total_ratings_value + ${rating}`,
            totalNumberOfRatings: () => "total_number_of_ratings + 1",
        })
            .where({
            id: product.id,
        })
            .execute();
        return productReview;
    }));
});
exports.submitReview = submitReview;
const getProductByUuid = (productUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const product = yield productRepo.findOne({
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
    return product;
});
exports.getProductByUuid = getProductByUuid;
const getProductsByUuid = (productUuids) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const products = yield productRepo.find({
        where: {
            uuid: (0, typeorm_1.In)(productUuids),
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
});
exports.getProductsByUuid = getProductsByUuid;
const reduceProductCounts = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryProductCounts = yield Category_1.Category.findOne({ id: product.categoryId });
    categoryProductCounts.productsCount -= 1;
    yield categoryProductCounts.save();
    const brandProductCounts = yield Brand_1.Brand.findOne({ id: product.brandId });
    brandProductCounts.productsCount -= 1;
    yield brandProductCounts.save();
    const availableLocationRepo = (0, typeorm_1.getRepository)(AvailableLocationState_1.AvailableLocationState);
    const availableState = yield availableLocationRepo.findOne({
        state: product.locationState,
    });
    if (availableState) {
        availableState.productsCount -= 1;
        yield availableState.save();
    }
    return true;
});
exports.reduceProductCounts = reduceProductCounts;
const updateProductCounts = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryProductCounts = yield Category_1.Category.findOne({ id: product.categoryId });
    categoryProductCounts.productsCount += 1;
    yield categoryProductCounts.save();
    const brandProductCounts = yield Brand_1.Brand.findOne({ id: product.brandId });
    brandProductCounts.productsCount += 1;
    yield brandProductCounts.save();
    const userRepo = (0, typeorm_1.getRepository)(User_1.User);
    const user = yield userRepo.findOne({ id: product.userId });
    const availableLocationRepo = (0, typeorm_1.getRepository)(AvailableLocationState_1.AvailableLocationState);
    const availableState = yield availableLocationRepo.findOne({
        state: product.locationState,
    });
    if (!availableState) {
        const newProductLocation = new AvailableLocationState_1.AvailableLocationState().initialize(product.locationState, user.countryLongName, user.countryIso2);
        yield availableLocationRepo.save(newProductLocation);
        return true;
    }
    availableState.productsCount += 1;
    yield availableState.save();
    return true;
});
exports.updateProductCounts = updateProductCounts;
const processProductSave = (sellerUser, productRequest, forceEdit, parentProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
    const existingProduct = yield productRepo.findOne({
        userId: sellerUser.id,
        name: productRequest.name,
        isSoftDeleted: false,
    });
    if (!forceEdit && existingProduct) {
        throw new error_response_types_1.BadRequestError("You already have a product with the same name in your catalogue");
    }
    const CurrencyEnum = Currency_1.CountryCodeToCurrency;
    const sellerDefaultCurrency = CurrencyEnum[sellerUser.countryIso2];
    const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
    const category = yield categoryRepo.findOne({
        uuid: productRequest.categoryUuid,
    });
    const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
    const brand = yield brandRepo.findOne({ uuid: productRequest.brandUuid });
    const productPriceCurrency = sellerDefaultCurrency;
    // i will set up transaction to enable rollback if any fail between crate prosuct and updateProductCounts
    let createdProduct = new Product_1.Product().initialize(sellerUser.id, productRequest, category, brand, productPriceCurrency, productRequest.tags);
    if (parentProduct) { // Meaning we want to create a product variant 
        createdProduct.parentProductId = parentProduct.id;
        createdProduct.hasVariants = false;
        createdProduct.isVariant = true;
    }
    if (existingProduct && forceEdit) {
        createdProduct.id = existingProduct.id;
    }
    createdProduct = yield productRepo.save(createdProduct);
    if (parentProduct && !parentProduct.hasVariants) {
        parentProduct.hasVariants = true;
        yield parentProduct.save();
    }
    if (createdProduct) {
        const pickupLocationRepo = (0, typeorm_1.getRepository)(PickupLocation_1.PickupLocation);
        yield (0, exports.updateProductCounts)(createdProduct);
        if (productRequest.pickupAddressUuid) {
            const pickupLocation = yield pickupLocationRepo.findOne({
                uuid: productRequest.pickupAddressUuid,
            });
            if (pickupLocation) {
                yield productRepo
                    .createQueryBuilder()
                    .update(Product_1.Product)
                    .set({
                    pickupLocationId: pickupLocation.id,
                })
                    .where({
                    id: createdProduct.id,
                })
                    .execute();
            }
        }
        else if (!existingProduct && productRequest.newPickupAddress) {
            const { name, address, country, state, contactFullName, contactPhoneNumber } = productRequest.newPickupAddress;
            const newPickupLocation = new PickupLocation_1.PickupLocation().initialize(sellerUser.id, name !== null && name !== void 0 ? name : '', address, country, state, contactFullName !== null && contactFullName !== void 0 ? contactFullName : '', contactPhoneNumber !== null && contactPhoneNumber !== void 0 ? contactPhoneNumber : '');
            const pickupLocation = yield pickupLocationRepo.save(newPickupLocation);
            yield productRepo
                .createQueryBuilder()
                .update(Product_1.Product)
                .set({
                pickupLocationId: pickupLocation.id,
            })
                .where({
                id: createdProduct.id,
            })
                .execute();
        }
    }
    const fullProductDetails = yield (0, exports.getProductByUuid)(createdProduct.uuid);
    return fullProductDetails;
});
exports.processProductSave = processProductSave;
const searchCementProducts = (searchWord) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const productRepo = connection.getRepository(Product_1.Product);
    const products = yield productRepo
        .createQueryBuilder("product")
        .where("product.categoryUuid = :categoryUuid", {
        categoryUuid: constants_1.CEMENT_CATEGORY_UUID,
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
    if (products.length === 0) {
        throw new error_response_types_1.UnprocessableEntityError('No Product Founds');
    }
    return products;
});
exports.searchCementProducts = searchCementProducts;
//# sourceMappingURL=productsService.js.map