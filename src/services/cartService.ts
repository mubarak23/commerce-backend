/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
import { Product } from '../entity/Product';
import { QuoteRequest } from "../entity/QuoteRequest";
import { User } from "../entity/User";
import { QuoteRequestStatuses } from "../enums/Statuses";
import { CartItemJson } from "../interfaces/CartItemJson";
import { UnprocessableEntityError } from "../utils/error-response-types";
import * as PromotionService from '../services/promotionService'
import * as Utils from "../utils/core"

export const addProductToCart = async (currentUser: User, product: Product, 
    quantity: number): Promise<boolean> => {
  const quoteRequestRepo = getRepository(QuoteRequest);
  const existingQuoteRequest = await quoteRequestRepo.findOne({
    userId: currentUser.id,
    productId: product.id,
    status: QuoteRequestStatuses.PROCESSED,
  });

  if (!product.price) {
    if (!existingQuoteRequest) {
      throw new UnprocessableEntityError('Sorry, the product does not have a price')
    }
    if(existingQuoteRequest) {
      const quantityMatches = existingQuoteRequest.sellerResponse.minimumQuantity <= quantity
      && existingQuoteRequest.sellerResponse.maximumQuantity >= quantity
    
      if (!quantityMatches) {// Should not happen if frontend protected the user
        throw new UnprocessableEntityError('Seller has not provided a price quote for the product')        
      }
    }
  }

  const cartRepo = getRepository(Cart);
  const cart = await cartRepo.findOne({ userId: currentUser.id });

  if (!cart) {
    const newCart = new Cart().initialize(currentUser, product, quantity);
    await cartRepo.save(newCart)
  } else {
    const { cartItems } = cart;
    const foundCartItem: CartItemJson | undefined = cartItems.find(
      (cartItem) => cartItem.productUuid === product.uuid
    );

    if (!foundCartItem) {
      const unitPriceForBuyer = Utils.getPriceForBuyer(product.price ?? 0, product)
      const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
      const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)
        
      const newCartItem: CartItemJson = {
        productId: product.id,
        productUuid: product.uuid,
        productName: product.name,
        quantity,
        unitPrice: (product.price) ?? 0,
        images: product.images,
        unitPriceForBuyer, 
        unitPromoPriceForBuyer,
        promotionId: productCategoryPromo?.id,
        productCategorySettings: product.category?.settings,
      }
      if (existingQuoteRequest) {
        const unitPrice = existingQuoteRequest.sellerResponse.unitPrice
        const unitPromoPriceForBuyerForQuoteRequest = Utils.calculateUnitPromoPriceForBuyer(unitPrice, productCategoryPromo)

        newCartItem.unitPrice = existingQuoteRequest.sellerResponse.unitPrice
        newCartItem.unitPriceForBuyer = unitPrice

        newCartItem.quoteRequest = {
          uuid: existingQuoteRequest.uuid,
          unitPrice: existingQuoteRequest.sellerResponse.unitPrice,
          unitPriceForBuyer: existingQuoteRequest.sellerResponse.unitPriceForBuyer,
          unitPromoPriceForBuyer: unitPromoPriceForBuyerForQuoteRequest,
          deliveryFee: existingQuoteRequest.sellerResponse?.deliveryFee ?? 0,
          calculatedTotalCostMajor: existingQuoteRequest.calculatedTotalCostMajor,
        }
      }
    
      await cartRepo.createQueryBuilder()
        .update(Cart)
        .set({
          cartItems: [...cartItems, newCartItem]
        })
        .where({
          id: cart.id
        })
        .execute()
    } else {
      let unitPrice = 0
      if (existingQuoteRequest) {
        unitPrice = existingQuoteRequest.sellerResponse.unitPrice
      } else if (product.price) {
        unitPrice = product.price
      } else {
        throw new UnprocessableEntityError('The product does not have a price')
      }
      const unitPriceForBuyer = Utils.getPriceForBuyer(unitPrice, product)

      const productCategoryPromo = await PromotionService.activeCategoryPromotion(product.categoryId)
      const unitPromoPriceForBuyer = Utils.calculateUnitPromoPriceForBuyer(unitPriceForBuyer, productCategoryPromo)

      foundCartItem.productName = product.name
      foundCartItem.quantity = quantity
      foundCartItem.unitPrice = unitPrice
      foundCartItem.unitPriceForBuyer = unitPriceForBuyer
      foundCartItem.unitPromoPriceForBuyer = unitPromoPriceForBuyer
      foundCartItem.promotionId = productCategoryPromo?.id
      if(existingQuoteRequest) {
        const qunitPriceForBuyer =  existingQuoteRequest.sellerResponse.unitPrice
        const unitPromoPriceForBuyerForQuoteRequest = Utils.calculateUnitPromoPriceForBuyer(qunitPriceForBuyer, productCategoryPromo)

        foundCartItem.quoteRequest = {
          uuid: existingQuoteRequest.uuid,
          unitPrice: existingQuoteRequest.sellerResponse.unitPrice,
          unitPriceForBuyer: existingQuoteRequest.sellerResponse.unitPriceForBuyer,
          unitPromoPriceForBuyer: unitPromoPriceForBuyerForQuoteRequest,
          deliveryFee: existingQuoteRequest.sellerResponse?.deliveryFee ?? 0,
          calculatedTotalCostMajor: existingQuoteRequest.calculatedTotalCostMajor,
        }
      }

      await cartRepo.createQueryBuilder()
        .update(Cart)
        .set({
          cartItems,
        })
        .where({
          id: cart.id
        })
        .execute()
    }
  }

  return true
}

export const removeProductFromCart = async (userCart: Cart, productUuid: string): Promise<boolean> =>{
  const foundCartItem = userCart.cartItems.find((cartItem) => cartItem.productUuid === productUuid)
  if (!foundCartItem) {
    return true
  }

  const newCartItem = userCart.cartItems.filter((items) => items.productUuid !== productUuid)

  const cartRepo = getRepository(Cart);
  await cartRepo
    .createQueryBuilder()
    .update(Cart)
    .set({
      cartItems: newCartItem,
    })
    .where({
      id: userCart.id,
    })
    .execute();
  
  return true
}
