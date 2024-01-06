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
exports.SavedProductsController = void 0;
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const SavedProduct_1 = require("../entity/SavedProduct");
const SortOrder_1 = require("../enums/SortOrder");
const ProductService = __importStar(require("../services/productsService"));
const PaginationService = __importStar(require("../services/paginationService"));
const Product_1 = require("../entity/Product");
// SavedProduct
let SavedProductsController = class SavedProductsController extends tsoa_1.Controller {
    handleSavedProducts(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const pageSize = 10;
            const savedProductRepo = (0, typeorm_1.getRepository)(SavedProduct_1.SavedProduct);
            const query = {
                userId: currentUser.id,
            };
            const savedProductsPage = (yield PaginationService.paginate(SavedProduct_1.SavedProduct, query, pageSize, pageNumber, sortOrder));
            const totalCount = yield savedProductRepo.count({
                userId: currentUser.id,
            });
            const productsResponse = yield ProductService.transformSavedProducts(savedProductsPage);
            const resData = {
                status: true,
                data: {
                    pageNumber,
                    pageSize,
                    dataset: productsResponse,
                    total: totalCount,
                },
            };
            return resData;
        });
    }
    saveProduct(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
            });
            if (!existingProduct) {
                this.setStatus(404);
                const resData = {
                    status: true,
                    message: "Selected product does not exist",
                };
                return resData;
            }
            const saveProductRepo = (0, typeorm_1.getRepository)(SavedProduct_1.SavedProduct);
            const existingSavedProduct = yield saveProductRepo.findOne({
                userId: currentUser.id,
                productId: existingProduct.id
            });
            if (existingSavedProduct) {
                this.setStatus(400);
                const resData = {
                    status: false,
                    message: "The Product exist on your Saved Lists ",
                };
                return resData;
            }
            const savedProduct = new SavedProduct_1.SavedProduct().initialize(currentUser.id, existingProduct.id);
            yield savedProduct.save();
            this.setStatus(201);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    deleteSavedProduct(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const existingProduct = yield productRepo.findOne({
                uuid: productUuid,
            });
            if (!existingProduct) {
                this.setStatus(404);
                const resData = {
                    status: true,
                    message: "Product Does Not Exist ",
                };
                return resData;
            }
            const savedProductRepo = (0, typeorm_1.getRepository)(SavedProduct_1.SavedProduct);
            yield savedProductRepo.delete({
                userId: currentUser.id,
                productId: existingProduct.id,
            });
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], SavedProductsController.prototype, "handleSavedProducts", null);
__decorate([
    (0, tsoa_1.Post)("/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SavedProductsController.prototype, "saveProduct", null);
__decorate([
    (0, tsoa_1.Delete)("/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SavedProductsController.prototype, "deleteSavedProduct", null);
SavedProductsController = __decorate([
    (0, tsoa_1.Route)("api/savedproducts"),
    (0, tsoa_1.Tags)("SavedProducts")
], SavedProductsController);
exports.SavedProductsController = SavedProductsController;
//# sourceMappingURL=SavedProductController.js.map