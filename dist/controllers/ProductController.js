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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ProductsController = void 0;
/* eslint-disable no-shadow */
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const _ = __importStar(require("underscore"));
const db_1 = require("../db");
const AvailableLocationState_1 = require("../entity/AvailableLocationState");
const Brand_1 = require("../entity/Brand");
const Category_1 = require("../entity/Category");
const Product_1 = require("../entity/Product");
const ProductReview_1 = require("../entity/ProductReview");
const User_1 = require("../entity/User");
const SortOrder_1 = require("../enums/SortOrder");
const FileUploadService = __importStar(require("../services/fileUploadService"));
const PaginationService = __importStar(require("../services/paginationService"));
const ProductService = __importStar(require("../services/productsService"));
const ProductsService = __importStar(require("../services/productsService"));
const ProfileService = __importStar(require("../services/profileService"));
const error_response_types_1 = require("../utils/error-response-types");
let ProductsController = class ProductsController extends tsoa_1.Controller {
    handleGetAllCategories(req, pageNumber, pageSize, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isSoftDeleted: false,
            };
            const join = {};
            const categorysPage = (yield PaginationService.paginate(Category_1.Category, query, pageSize, pageNumber, sortOrder, undefined, join));
            const categories = categorysPage.dataset;
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            const total = yield categoryRepo.count(query);
            const transformCategories = categories.map((category) => {
                var _a;
                return {
                    uuid: category.uuid,
                    name: category.name,
                    imageUrl: (_a = category.image) === null || _a === void 0 ? void 0 : _a.url,
                    bannerUrl: category.banner.url,
                    productsCount: category.productsCount,
                    brands: category.brands
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: _.shuffle(transformCategories) },
            };
            return resData;
        });
    }
    handleGetAllBrands(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isSoftDeleted: false,
            };
            const join = {};
            const pageSize = 10;
            const brandsPage = (yield PaginationService.paginate(Brand_1.Brand, query, pageSize, pageNumber, sortOrder, undefined, join));
            const brands = brandsPage.dataset;
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const total = yield brandRepo.count(query);
            const transformBrands = brands.map((brand) => {
                var _a;
                return {
                    uuid: brand.uuid,
                    name: brand.name,
                    imageUrl: (_a = brand.image) === null || _a === void 0 ? void 0 : _a.url,
                    productsCount: brand.productsCount,
                };
            });
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: _.shuffle(transformBrands) },
            };
            return resData;
        });
    }
    handleGetAvailableCategories(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_1.Category.find({ isAvailable: true });
            const resData = {
                status: true,
                data: categories.map((cat) => {
                    var _a;
                    return {
                        uuid: cat.uuid,
                        name: cat.name,
                        imageUrl: (_a = cat.image) === null || _a === void 0 ? void 0 : _a.url,
                        bannerUrl: cat.banner.url,
                        productsCount: cat.productsCount,
                        brands: cat.brands
                    };
                }),
            };
            return resData;
        });
    }
    handleGetAvailableBrands(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const brands = yield Brand_1.Brand.find({ isAvailable: true });
            const resData = {
                status: true,
                data: brands.map((brand) => {
                    var _a;
                    return {
                        uuid: brand.uuid,
                        name: brand.name,
                        imageUrl: (_a = brand.image) === null || _a === void 0 ? void 0 : _a.url,
                        productsCount: brand.productsCount,
                    };
                }),
            };
            return resData;
        });
    }
    handleGetBrandCategories(req, isAddProduct, categoryUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isAddProduct) {
                const availableCategoryBrands = yield Category_1.Category.findOne({
                    uuid: categoryUuid,
                });
                if (!availableCategoryBrands) {
                    throw new error_response_types_1.NotFoundError('Category was not found');
                }
                const resData = {
                    status: true,
                    data: availableCategoryBrands.brands
                };
                return resData;
            }
            const availableProductBrands = yield Product_1.Product.find({
                categoryUuid,
                isSoftDeleted: false,
                isVariant: false
            });
            const uniqueBrandsIds = availableProductBrands
                .map((item) => item.brandId)
                .filter((value, index, self) => self.indexOf(value) === index);
            const brandNames = yield Brand_1.Brand.find({
                id: (0, typeorm_1.In)(uniqueBrandsIds),
            });
            const transformBrands = brandNames.map((person) => ({
                uuid: person.uuid,
                name: person.name,
            }));
            const resData = {
                status: true,
                data: transformBrands || [],
            };
            return resData;
        });
    }
    handleGetCategoryLocationStates(req, categoryUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const availableLocationStates = yield Product_1.Product.find({
                categoryUuid,
            });
            const uniqueStates = availableLocationStates
                .map((item) => item.locationState)
                .filter((value, index, self) => self.indexOf(value) === index);
            const resData = {
                status: true,
                data: uniqueStates.map((locState) => {
                    return {
                        state: locState,
                    };
                }),
            };
            return resData;
        });
    }
    handleGetAvailableLocationStates(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const availableLocationStates = yield AvailableLocationState_1.AvailableLocationState.find({});
            const resData = {
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
        });
    }
    categoryProducts(pageNumber, sortOrder, categoryUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
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
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            const existingCategory = yield categoryRepo.findOne({
                uuid: categoryUuid,
            });
            if (!existingCategory) {
                throw new error_response_types_1.NotFoundError("Category does not exist");
            }
            const productsPage = (yield PaginationService.paginateProducts(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: productsResponse },
            };
            return resData;
        });
    }
    categoryInfo(categoryUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            const existingCategory = yield categoryRepo.findOne({
                uuid: categoryUuid,
            });
            if (!existingCategory) {
                this.setStatus(404);
                throw new error_response_types_1.NotFoundError("Category does not exist");
            }
            const categoryInfoDetails = {
                uuid: existingCategory.uuid,
                name: existingCategory.name,
                productsCount: existingCategory.productsCount,
                bannerUrl: existingCategory.banner.url,
                imageUrl: existingCategory.image.url,
            };
            this.setStatus(200);
            const resData = {
                status: true,
                data: categoryInfoDetails,
            };
            return resData;
        });
    }
    brandProducts(pageNumber, sortOrder, brandUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
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
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const existingBrand = yield brandRepo.findOne({
                uuid: brandUuid,
            });
            if (!existingBrand) {
                throw new error_response_types_1.NotFoundError("Brand does not exist");
            }
            const productsPage = (yield PaginationService.paginateProducts(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: productsResponse },
            };
            return resData;
        });
    }
    brandInfo(brandUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
            const existingBrand = yield brandRepo.findOne({
                uuid: brandUuid,
            });
            if (!existingBrand) {
                this.setStatus(404);
                throw new error_response_types_1.NotFoundError("Brand does not exist");
            }
            const brandInfoDetails = {
                uuid: existingBrand.uuid,
                name: existingBrand.name,
                productsCount: existingBrand.productsCount,
                imageUrl: existingBrand.image.url,
            };
            this.setStatus(200);
            const resData = {
                status: true,
                data: brandInfoDetails,
            };
            return resData;
        });
    }
    handleGetProductsCatalogueForGuest(req, pageNumber, sortOrder, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isSoftDeleted: false,
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
            const productsPage = (yield PaginationService.paginateProducts(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: _.shuffle(productsResponse) },
            };
            return resData;
        });
    }
    handleGetProductsCatalogueForLoggedIn(req, pageNumber, sortOrder, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (reqBody.forOnlyDefaultLinkedSeller) {
                if (!currentUser.defaultSellerUserId) {
                    const resData = {
                        status: true,
                        data: { pageNumber, total: 0, pageSize: 20, dataset: [] },
                    };
                    return resData;
                }
            }
            const query = yield ProductService.productsQueryForLoggedInUser(currentUser, reqBody);
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
            const productsPage = (yield PaginationService.paginateProducts(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: _.shuffle(productsResponse) },
            };
            return resData;
        });
    }
    handleGetSearchProducts(searchWord) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            if (searchWord.toLowerCase() === 'cem') {
                const products = yield ProductService.searchCementProducts(searchWord);
                const productsResponse = yield ProductsService.transformProducts(products);
                const resData = {
                    status: true,
                    data: productsResponse,
                };
                return resData;
            }
            if (searchWord.toLowerCase() === 'cement') {
                const products = yield ProductService.searchCementProducts(searchWord);
                const productsResponse = yield ProductsService.transformProducts(products);
                const resData = {
                    status: true,
                    data: productsResponse,
                };
                return resData;
            }
            const products = yield productRepo
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
            if (products.length === 0) {
                const products = yield productRepo
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
                const productsResponse = yield ProductsService.transformProducts(products);
                const resData = {
                    status: true,
                    data: productsResponse,
                };
                return resData;
            }
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: productsResponse,
            };
            return resData;
        });
    }
    handleProductVariantsFetch(productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDetails = yield ProductService.getProductByUuid(productUuid);
            if (!productDetails) {
                throw new error_response_types_1.NotFoundError("Specified product does not exist");
            }
            const query = {
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
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const products = yield productRepo.find({
                where: query,
                join,
            });
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: productsResponse,
            };
            return resData;
        });
    }
    handleFetchCurrentUserProducts(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const query = {
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
            const productsPage = (yield PaginationService.paginate(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: productsResponse },
            };
            return resData;
        });
    }
    handleFetchSellerProducts(req, pageNumber, sortOrder, userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const userRepo = (0, typeorm_1.getRepository)(User_1.User);
            const sellerPublicProfile = yield ProfileService.getPublicProfileFromUserUuid(userUuid);
            if (!sellerPublicProfile.businessProfile) {
                throw new error_response_types_1.UnprocessableEntityError("Selected user is not a seller");
            }
            const sellerUser = yield userRepo.findOne({
                uuid: userUuid,
            });
            if (!sellerUser) {
                throw new error_response_types_1.NotFoundError('Seller user was not found');
            }
            const query = {
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
            const productsPage = (yield PaginationService.paginate(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            if (productsPage.dataset.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Product for the Seller');
            }
            const products = productsPage.dataset;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformSellerProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: productsResponse },
            };
            return resData;
        });
    }
    getProductDetails(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productDetails = yield ProductService.getProductByUuid(productUuid);
            if (!productDetails) {
                throw new error_response_types_1.NotFoundError("Specified product does not exist");
            }
            const transformProductDetails = yield ProductService.transformProduct(productDetails, currentUser.id);
            const resData = {
                status: true,
                data: transformProductDetails,
            };
            return resData;
        });
    }
    getPublicProductDetails(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDetails = yield ProductService.getProductByUuid(productUuid);
            if (!productDetails) {
                throw new error_response_types_1.NotFoundError("Specified product does not exist");
            }
            const transformProductDetails = yield ProductService.transformProduct(productDetails);
            const resData = {
                status: true,
                data: transformProductDetails,
            };
            return resData;
        });
    }
    createProducts(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const createdProduct = yield ProductsService.processProductSave(currentUser, requestBody, false);
            const transformProductDetails = yield ProductService.transformProduct(createdProduct, currentUser.id);
            this.setStatus(201);
            const resData = {
                status: true,
                data: transformProductDetails,
            };
            return resData;
        });
    }
    createProductVariant(req, productUuid, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const parentProductDetails = yield ProductService.getProductByUuid(productUuid);
            if (!parentProductDetails) {
                throw new error_response_types_1.NotFoundError("Specified product does not exist");
            }
            if (parentProductDetails.isVariant) {
                throw new error_response_types_1.UnprocessableEntityError("You are not allowed to create a product variant from another product variant.");
            }
            const createdProduct = yield ProductsService.processProductSave(currentUser, requestBody, false, parentProductDetails);
            createdProduct.user = currentUser;
            const transformProductDetails = yield ProductService.transformProduct(createdProduct, currentUser.id);
            this.setStatus(201);
            const resData = {
                status: true,
                data: transformProductDetails,
            };
            return resData;
        });
    }
    handleProductUpdate(req, productUuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const updateProductData = reqBody;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
                userId: currentUser.id,
            });
            if (!existingProduct) {
                throw new error_response_types_1.UnauthorizedRequestError("You are not allowed to edit the product");
            }
            const updateQuery = updateProductData;
            const categoryRepo = (0, typeorm_1.getRepository)(Category_1.Category);
            if (updateProductData.categoryUuid) {
                const category = yield categoryRepo.findOne({
                    uuid: updateProductData.categoryUuid,
                });
                if (category) {
                    updateQuery.categoryId = category.id;
                }
            }
            if (updateProductData.brandUuid) {
                const brandRepo = (0, typeorm_1.getRepository)(Brand_1.Brand);
                const brand = yield brandRepo.findOne({
                    uuid: updateProductData.brandUuid,
                });
                if (brand) {
                    updateQuery.brandId = brand.id;
                }
            }
            updateQuery.tags = updateProductData.tags || {};
            productRepo
                .createQueryBuilder()
                .update(Product_1.Product)
                .set(updateQuery)
                .where({
                uuid: productUuid,
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleDeleteProduct(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
                userId: currentUser.id,
            });
            if (!existingProduct) {
                throw new error_response_types_1.NotFoundError('The Product Doest Not Exist');
            }
            yield productRepo
                .createQueryBuilder()
                .update(Product_1.Product)
                .set({ isSoftDeleted: true })
                .where({
                uuid: productUuid,
            })
                .execute();
            yield ProductService.reduceProductCounts(yield existingProduct);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleDeleteProductImage(req, productUuid, keyFromCloudProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
                userId: currentUser.id,
            });
            if (!existingProduct) {
                this.setStatus(404);
                const resData = {
                    status: true,
                    message: "The Product Does Not Exist",
                };
                return resData;
            }
            yield FileUploadService.processDeleteProductPhoto(keyFromCloudProvider, existingProduct);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    reviewProduct(req, reqBody, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const { reviewNote, rating } = reqBody;
            if (!reviewNote || reviewNote === null) {
                throw new error_response_types_1.BadRequestError(`Please type in a review.`);
            }
            if (reviewNote.length > 1000) {
                throw new error_response_types_1.UnprocessableEntityError("Review is quite long. Please make it less than 1000 characters.");
            }
            //--
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = connection.getRepository(Product_1.Product);
            const product = yield productRepo.findOne({ uuid: productUuid });
            if (!product) {
                throw new error_response_types_1.NotFoundError("Product was not found");
            }
            // --Check that customer has placed an order with the product in the past
            // const orderRepo = connection.getRepository(Order)
            // const order = await orderRepo.findOne({
            //   userId: currentUser.id,
            //   productId: product.id
            // })
            //--
            const productReview = yield ProductService.submitReview(currentUser, product, rating, reviewNote);
            const resData = {
                status: true,
                data: _.omit(productReview, "id", "userId"),
            };
            return resData;
        });
    }
    handleGetProductReviews(req, pageNumber, sortOrder, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const product = yield productRepo.findOne({
                uuid: productUuid,
                isSoftDeleted: false,
            });
            if (!product) {
                this.setStatus(404);
                const resData = {
                    status: true,
                    message: "Product not found",
                };
                return resData;
            }
            const pageSize = 10;
            const productReviewRepo = (0, typeorm_1.getRepository)(ProductReview_1.ProductReview);
            const query = {
                productId: product.id,
            };
            const productReviewsPage = (yield PaginationService.paginate(ProductReview_1.ProductReview, query, pageSize, pageNumber, sortOrder));
            const productReviews = productReviewsPage.dataset;
            const totalCount = yield productReviewRepo.count({
                productId: product.id,
            });
            const sellerUserIds = productReviews.map((productReview) => productReview.userId);
            const userPublicProfiles = yield ProfileService.getPublicProfileFromUserIds(sellerUserIds);
            const transformedProductReviewsDataset = productReviews.map((productReview) => {
                const { userUuid } = productReview;
                const publicProfile = userPublicProfiles.find((publicProfile) => publicProfile.userUuid === userUuid);
                return {
                    reviewUuid: productReview.uuid,
                    reviewerPublicProfile: publicProfile,
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
        });
    }
    handlePublicSellerProducts(req, sellerUuid, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const userRepo = connection.getRepository(User_1.User);
            const seller = yield userRepo.findOne({ uuid: sellerUuid, isSeller: true });
            if (!seller) {
                throw new error_response_types_1.UnprocessableEntityError('Seller Does not exist');
            }
            const query = {
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
            const productsPage = (yield PaginationService.paginate(Product_1.Product, query, pageSize, pageNumber, sortOrder, undefined, join));
            const products = productsPage.dataset;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const total = yield productRepo.count(query);
            const productsResponse = yield ProductsService.transformProducts(products);
            const resData = {
                status: true,
                data: { pageNumber, total, pageSize, dataset: productsResponse },
            };
            return resData;
        });
    }
    handleDeActivateProdict(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
                userId: currentUser.id,
            });
            if (!existingProduct) {
                throw new error_response_types_1.UnauthorizedRequestError("You are not allowed to edit the product");
            }
            if (existingProduct.isSoftDeleted === true) {
                throw new error_response_types_1.UnprocessableEntityError('Can Not Deactivate a Deleted Product');
            }
            productRepo
                .createQueryBuilder()
                .update(Product_1.Product)
                .set({ isActive: false })
                .where({
                uuid: productUuid,
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleActivateProdict(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
                userId: currentUser.id,
            });
            if (!existingProduct) {
                throw new error_response_types_1.UnauthorizedRequestError("You are not allowed to edit the product");
            }
            if (existingProduct.isSoftDeleted === true) {
                throw new error_response_types_1.UnprocessableEntityError('Can Not Activate a Deleted Product');
            }
            productRepo
                .createQueryBuilder()
                .update(Product_1.Product)
                .set({ isActive: true })
                .where({
                uuid: productUuid,
            })
                .execute();
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/categories/all"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)('pageSize')),
    __param(3, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetAllCategories", null);
__decorate([
    (0, tsoa_1.Get)("/brands/all"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetAllBrands", null);
__decorate([
    (0, tsoa_1.Get)("/categories/available"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetAvailableCategories", null);
__decorate([
    (0, tsoa_1.Get)("/brands/available"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetAvailableBrands", null);
__decorate([
    (0, tsoa_1.Get)("/brands/:categoryUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("isAddProduct")),
    __param(2, (0, tsoa_1.Path)("categoryUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetBrandCategories", null);
__decorate([
    (0, tsoa_1.Get)("/category/locationstates/:categoryUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("categoryUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetCategoryLocationStates", null);
__decorate([
    (0, tsoa_1.Get)("/available/locationstates"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetAvailableLocationStates", null);
__decorate([
    (0, tsoa_1.Get)("/category/:categoryUuid"),
    __param(0, (0, tsoa_1.Query)("pageNumber")),
    __param(1, (0, tsoa_1.Query)("sortOrder")),
    __param(2, (0, tsoa_1.Path)("categoryUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "categoryProducts", null);
__decorate([
    (0, tsoa_1.Get)("/categoryInfo/:categoryUuid"),
    __param(0, (0, tsoa_1.Path)("categoryUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "categoryInfo", null);
__decorate([
    (0, tsoa_1.Get)("/brand/:brandUuid"),
    __param(0, (0, tsoa_1.Query)("pageNumber")),
    __param(1, (0, tsoa_1.Query)("sortOrder")),
    __param(2, (0, tsoa_1.Path)("brandUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "brandProducts", null);
__decorate([
    (0, tsoa_1.Get)("/brandInfo/:brandUuid"),
    __param(0, (0, tsoa_1.Path)("brandUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "brandInfo", null);
__decorate([
    (0, tsoa_1.Post)("/catalogue/for/guest"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetProductsCatalogueForGuest", null);
__decorate([
    (0, tsoa_1.Post)("/catalogue/for/loggedin"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetProductsCatalogueForLoggedIn", null);
__decorate([
    (0, tsoa_1.Get)("/search"),
    __param(0, (0, tsoa_1.Query)("searchWord")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetSearchProducts", null);
__decorate([
    (0, tsoa_1.Get)("/variants/:productUuid"),
    __param(0, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleProductVariantsFetch", null);
__decorate([
    (0, tsoa_1.Get)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleFetchCurrentUserProducts", null);
__decorate([
    (0, tsoa_1.Get)("/seller/:userUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("userUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleFetchSellerProducts", null);
__decorate([
    (0, tsoa_1.Get)("/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductDetails", null);
__decorate([
    (0, tsoa_1.Get)("/guest/:productUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getPublicProductDetails", null);
__decorate([
    (0, tsoa_1.Post)("/create"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProducts", null);
__decorate([
    (0, tsoa_1.Post)("/create/variant/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("productUuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProductVariant", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/:uuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleProductUpdate", null);
__decorate([
    (0, tsoa_1.Delete)("/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProduct", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("productUuid")),
    __param(2, (0, tsoa_1.Query)("keyFromCloudProvider")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeleteProductImage", null);
__decorate([
    (0, tsoa_1.Post)("/:productUuid/review"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "reviewProduct", null);
__decorate([
    (0, tsoa_1.Get)("/:productUuid/reviews"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleGetProductReviews", null);
__decorate([
    (0, tsoa_1.Get)('catelogue/guest/:sellerUuid'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("sellerUuid")),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handlePublicSellerProducts", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/deactivate/:uuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleDeActivateProdict", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/activate/:uuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "handleActivateProdict", null);
ProductsController = __decorate([
    (0, tsoa_1.Route)("api/products"),
    (0, tsoa_1.Tags)("Products")
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=ProductController.js.map