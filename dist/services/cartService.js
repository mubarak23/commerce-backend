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
exports.removeProductFromCart = exports.addProductToCart = void 0;
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const typeorm_1 = require("typeorm");
const Cart_1 = require("../entity/Cart");
const QuoteRequest_1 = require("../entity/QuoteRequest");
const Statuses_1 = require("../enums/Statuses");
const error_response_types_1 = require("../utils/error-response-types");
const PromotionService = __importStar(require("../services/promotionService"));
const Utils = __importStar(require("../utils/core"));
const addProductToCart = (currentUser, product, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const quoteRequestRepo = (0, typeorm_1.getRepository)(QuoteRequest_1.QuoteRequest);
    const existingQuoteRequest = yield quoteRequestRepo.findOne({
        userId: currentUser.id,
        productId: product.id,
        status: Statuses_1.QuoteRequestStatuses.PROCESSED,
    });
    if (!product.price) {
        if (!existingQuoteRequest) {
            throw new error_response_types_1.UnprocessableEntityError('Sorry, the product does not have a price');
        }
        if (existingQuoteRequest) {
            const quantityMatches = existingQuoteRequest.sellerResponse.minimumQuantity <= quantity
                && existingQuoteRequest.sellerResponse.maximumQuantity >= quantity;
            if (!quantityMatches) { // Should not happen if frontend protected the user
                throw new error_response_types_1.UnprocessableEntityError('Seller has not provided a price quote for the product');
            }
        }
    }
    const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
    const cart = yield cartRepo.findOne({ userId: currentUser.id });
    if (!cart) {
        const newCart = new Cart_1.Cart().initialize(currentUser, product, quantity);
        yield cartRepo.save(newCart);
    }
    else {
        const { cartItems } = cart;
        const foundCartItem = cartItems.find((cartItem) => cartItem.productUuid === product.uuid);
        if (!foundCartItem) {
            const unitPriceForBuyer = Utils.getPriceForBuyer((_a = product.price) !== null && _a !== void 0 ? _a : 0, product);
            const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
            const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
            const newCartItem = {
                productId: product.id,
                productUuid: product.uuid,
                productName: product.name,
                quantity,
                unitPrice: (_b = (product.price)) !== null && _b !== void 0 ? _b : 0,
                images: product.images,
                unitPriceForBuyer,
                unitPromoPriceForBuyer,
                promotionId: productCategoryPromo === null || productCategoryPromo === void 0 ? void 0 : productCategoryPromo.id,
                productCategorySettings: (_c = product.category) === null || _c === void 0 ? void 0 : _c.settings,
            };
            if (existingQuoteRequest) {
                const unitPrice = existingQuoteRequest.sellerResponse.unitPrice;
                const unitPromoPriceForBuyerForQuoteRequest = Utils.calculateUnitPromoPriceForBuyer(unitPrice, productCategoryPromo);
                newCartItem.unitPrice = existingQuoteRequest.sellerResponse.unitPrice;
                newCartItem.unitPriceForBuyer = unitPrice;
                newCartItem.quoteRequest = {
                    uuid: existingQuoteRequest.uuid,
                    unitPrice: existingQuoteRequest.sellerResponse.unitPrice,
                    unitPriceForBuyer: existingQuoteRequest.sellerResponse.unitPriceForBuyer,
                    unitPromoPriceForBuyer: unitPromoPriceForBuyerForQuoteRequest,
                    deliveryFee: (_e = (_d = existingQuoteRequest.sellerResponse) === null || _d === void 0 ? void 0 : _d.deliveryFee) !== null && _e !== void 0 ? _e : 0,
                    calculatedTotalCostMajor: existingQuoteRequest.calculatedTotalCostMajor,
                };
            }
            yield cartRepo.createQueryBuilder()
                .update(Cart_1.Cart)
                .set({
                cartItems: [...cartItems, newCartItem]
            })
                .where({
                id: cart.id
            })
                .execute();
        }
        else {
            let unitPrice = 0;
            if (existingQuoteRequest) {
                unitPrice = existingQuoteRequest.sellerResponse.unitPrice;
            }
            else if (product.price) {
                unitPrice = product.price;
            }
            else {
                throw new error_response_types_1.UnprocessableEntityError('The product does not have a price');
            }
            const unitPriceForBuyer = Utils.getPriceForBuyer(unitPrice, product);
            const productCategoryPromo = yield PromotionService.activeCategoryPromotion(product.categoryId);
            const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo);
            foundCartItem.productName = product.name;
            foundCartItem.quantity = quantity;
            foundCartItem.unitPrice = unitPrice;
            foundCartItem.unitPriceForBuyer = unitPriceForBuyer;
            foundCartItem.unitPromoPriceForBuyer = unitPromoPriceForBuyer;
            foundCartItem.promotionId = productCategoryPromo === null || productCategoryPromo === void 0 ? void 0 : productCategoryPromo.id;
            if (existingQuoteRequest) {
                const qunitPriceForBuyer = existingQuoteRequest.sellerResponse.unitPrice;
                const unitPromoPriceForBuyerForQuoteRequest = Utils.calculateUnitPromoPriceForBuyer(qunitPriceForBuyer, productCategoryPromo);
                foundCartItem.quoteRequest = {
                    uuid: existingQuoteRequest.uuid,
                    unitPrice: existingQuoteRequest.sellerResponse.unitPrice,
                    unitPriceForBuyer: existingQuoteRequest.sellerResponse.unitPriceForBuyer,
                    unitPromoPriceForBuyer: unitPromoPriceForBuyerForQuoteRequest,
                    deliveryFee: (_g = (_f = existingQuoteRequest.sellerResponse) === null || _f === void 0 ? void 0 : _f.deliveryFee) !== null && _g !== void 0 ? _g : 0,
                    calculatedTotalCostMajor: existingQuoteRequest.calculatedTotalCostMajor,
                };
            }
            yield cartRepo.createQueryBuilder()
                .update(Cart_1.Cart)
                .set({
                cartItems,
            })
                .where({
                id: cart.id
            })
                .execute();
        }
    }
    return true;
});
exports.addProductToCart = addProductToCart;
const removeProductFromCart = (userCart, productUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCartItem = userCart.cartItems.find((cartItem) => cartItem.productUuid === productUuid);
    if (!foundCartItem) {
        return true;
    }
    const newCartItem = userCart.cartItems.filter((items) => items.productUuid !== productUuid);
    const cartRepo = (0, typeorm_1.getRepository)(Cart_1.Cart);
    yield cartRepo
        .createQueryBuilder()
        .update(Cart_1.Cart)
        .set({
        cartItems: newCartItem,
    })
        .where({
        id: userCart.id,
    })
        .execute();
    return true;
});
exports.removeProductFromCart = removeProductFromCart;
//# sourceMappingURL=cartService.js.map