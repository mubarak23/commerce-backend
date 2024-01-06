import { Get, Route, Tags, Security, Request, Controller, Post, Body, Delete, Path } from "tsoa";
import * as _ from "underscore";

import { IServerResponse } from "../interfaces/IServerResponse";
import { User } from "../entity/User";
import { CartDetailsResponseDto, CartItem } from "../dto/CartDetailsResponseDto";
import * as ProductsService from "../services/productsService";
import { Cart } from "../entity/Cart";
import { getRepository, In } from "typeorm";
import { LocalGovernmentAreaPrice, Product } from "../entity/Product";
import { NotFoundError, UnprocessableEntityError } from '../utils/error-response-types';
import { ProductsResponseDto } from "../dto/ProductsResponseDto";
import NewCartItemRequestDto from "../dto/NewCartItemRequestDto";
import { getFreshConnection } from "../db";
import * as CartService from "../services/cartService"
import * as NotificationService from "../services/notificationService"
import NotificationMessageTypes from "../enums/NotificationMessageTypes";

// DO NOT EXPORT DEFAULT

@Route("api/cart")
@Tags("Cart")
@Security("jwt")
export class CartController extends Controller {

  @Post('/item')
  public async handleNewCartItem(@Request() req: any, @Body() reqBody: NewCartItemRequestDto): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()
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
        uuid: reqBody.productUuid,
        isSoftDeleted: false,
      },
      join
    });
    if (!product) {
      throw new NotFoundError('The specified product could not be found')
    }
    if (product.user.id === currentUser.id) {
      throw new UnprocessableEntityError('You cannot add your own product to your cart')
    }

    const allGood = await CartService.addProductToCart(currentUser, product, reqBody.quantity)
    
    const cartRepo = getRepository(Cart);
    const cart = await cartRepo.findOne({ userId: currentUser.id });

    await NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, 
      cart?.cartItems || [])
    
    const resData: IServerResponse<void> = {
      status: allGood,
    }

    return resData
  }

  @Delete("/product/:productUuid")
  @Security("jwt")
  public async handleProductRemovalFromCart(@Request() req: any, @Path("productUuid") productUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const cartRepo = getRepository(Cart);
    const cart = await cartRepo.findOne({ userId: currentUser.id });

    if (!cart) {
      throw new NotFoundError("Cart empty");
    }

    const {cartItems} = cart;
    if (!cartItems || !cartItems.length) {
      throw new NotFoundError("Cart empty");
    }

    await CartService.removeProductFromCart(cart, productUuid)

    const updatedCart = await cartRepo.findOne({ userId: currentUser.id });

    await NotificationService.sendCartUpdateNotificationToFirestore(currentUser.uuid, 
      updatedCart?.cartItems || [])

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Get("")
  @Security("jwt")
  public async handleCurrentCartContent(@Request() req: any): Promise<IServerResponse<CartDetailsResponseDto>> {
    const currentUser: User = req.user;

    const cartRepo = getRepository(Cart);
    const cart = await cartRepo.findOne({ userId: currentUser.id });
    if (!cart) {
      const newCart = new Cart().initializeEmpty(currentUser);
      await cartRepo.save(newCart)
      const resData: IServerResponse<CartDetailsResponseDto> = {
        status: true,
        data: {items: []},
      };
      return resData;
    }

    const { cartItems } = cart;
    if (!cartItems || !cartItems.length) {
      const resData: IServerResponse<CartDetailsResponseDto> = {
        status: true,
        data: {items: []},
      };
      return resData;
    }

    const cartItemsProductUuids = cartItems.map(cartItem => cartItem.productUuid);

    const productRepo = getRepository(Product);
    const join = {
      alias: "product",
      leftJoinAndSelect: {
        user: "product.user",
        category: "product.category",
        brand: "product.brand",
      },
    }

    const products = await productRepo.find({
      where: {
        uuid: In(cartItemsProductUuids),
        isSoftDeleted: false,
      },
      join,
    })

    const productsResponse: ProductsResponseDto[] = await ProductsService.transformProducts(products);

    const cartItemsForResponse: CartItem[] = []

    for(const product of products) {
      const cartItem = cartItems.find(c => c.productUuid === product.uuid)
      const formattedProduct = productsResponse.find(fP => fP.productUuid === product.uuid)

      const formattedCartItem: CartItem = Cart.toCartResponseItem(formattedProduct!, cartItem!)
      cartItemsForResponse.push(formattedCartItem)
    }
    
    const cartResponse: CartDetailsResponseDto = {
      items: cartItemsForResponse
    }

    const resData: IServerResponse<CartDetailsResponseDto> = {
      status: true,
      data: cartResponse,
    };
    return resData;
  }
}
