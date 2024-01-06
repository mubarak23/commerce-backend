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
exports.CartController = void 0;
const tsoa_1 = require("tsoa");
const ProductsService = __importStar(require("../services/productsService"));
const Cart_1 = require("../entity/Cart");
const typeorm_1 = require("typeorm");
const Product_1 = require("../entity/Product");
const error_response_types_1 = require("../utils/error-response-types");
const db_1 = require("../db");
const CartService = __importStar(require("../services/cartService"));
const NotificationService = __importStar(require("../services/notificationService"));
// DO NOT EXPORT DEFAULT
let CartController = class CartController extends tsoa_1.Controller {
    handleNewCartItem(req, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const productRepo = connection.getRepository(Product_1.Product);
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                },
            };
            const product = yield productRepo.findOne({
                where: {
                    uuid: reqBody.productUuid,
                    isSoftDeleted: false,
                },
                join
            });
            if (!product) {
                throw new error_response_types_1.NotFoundError('The specified product could not be found');
            }
            if (product.user.id === currentUser.id) {
                throw new error_response_types_1.UnprocessableEntityError('You cannot add your own product to your cart');
            }
            const allGood = yield CartService.addProductToCart(currentUser, product, reqBody.quantity);
            const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
            const cart = yield cartRepo.findOne({ userId: currentUser.id });
            yield NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, (cart === null || cart === void 0 ? void 0 : cart.cartItems) || []);
            const resData = {
                status: allGood,
            };
            return resData;
        });
    }
    handleProductRemovalFromCart(req, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
            const cart = yield cartRepo.findOne({ userId: currentUser.id });
            if (!cart) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            const { cartItems } = cart;
            if (!cartItems || !cartItems.length) {
                throw new error_response_types_1.NotFoundError("Cart empty");
            }
            yield CartService.removeProductFromCart(cart, productUuid);
            const updatedCart = yield cartRepo.findOne({ userId: currentUser.id });
            yield NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, (updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.cartItems) || []);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleCurrentCartContent(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
            const cart = yield cartRepo.findOne({ userId: currentUser.id });
            if (!cart) {
                const newCart = new Cart_1.Cart().initializeEmpty(currentUser);
                yield cartRepo.save(newCart);
                const resData = {
                    status: true,
                    data: { items: [] },
                };
                return resData;
            }
            const { cartItems } = cart;
            if (!cartItems || !cartItems.length) {
                const resData = {
                    status: true,
                    data: { items: [] },
                };
                return resData;
            }
            const cartItemsProductUuids = cartItems.map(cartItem => cartItem.productUuid);
            const productRepo = (0, typeorm_1.getRepository)(Product_1.Product);
            const join = {
                alias: "product",
                leftJoinAndSelect: {
                    user: "product.user",
                    category: "product.category",
                    brand: "product.brand",
                },
            };
            const products = yield productRepo.find({
                where: {
                    uuid: (0, typeorm_1.In)(cartItemsProductUuids),
                    isSoftDeleted: false,
                },
                join,
            });
            const productsResponse = yield ProductsService.transformProducts(products);
            const cartItemsForResponse = [];
            for (const product of products) {
                const cartItem = cartItems.find(c => c.productUuid === product.uuid);
                const formattedProduct = productsResponse.find(fP => fP.productUuid === product.uuid);
                const formattedCartItem = Cart_1.Cart.toCartResponseItem(formattedProduct, cartItem);
                cartItemsForResponse.push(formattedCartItem);
            }
            const cartResponse = {
                items: cartItemsForResponse
            };
            const resData = {
                status: true,
                data: cartResponse,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/item'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleNewCartItem", null);
__decorate([
    (0, tsoa_1.Delete)("/product/:productUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("productUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleProductRemovalFromCart", null);
__decorate([
    (0, tsoa_1.Get)(""),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "handleCurrentCartContent", null);
CartController = __decorate([
    (0, tsoa_1.Route)("api/cart"),
    (0, tsoa_1.Tags)("Cart"),
    (0, tsoa_1.Security)("jwt")
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=CartController.js.map