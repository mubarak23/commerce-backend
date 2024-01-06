import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { IPublicProfile } from "../dto/IProfileResponse";
import { NewProductRequestDto } from "../dto/NewProductRequestDto";
import { ProductsResponseDto } from '../dto/ProductsResponseDto';
import { CountryToCurrency, CountryToCurrencySymbol, CurrencyToSymbol } from "../enums/Currency";
import TableColumns, { ProductsColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { OmitFields } from "../interfaces/OmitFields";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import * as Utils from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { PickupLocation } from "./PickupLocation";
import { User } from "./User";

export interface LocalGovernmentAreaPrice {
  uuid?: string,
  localGovernmentArea: string,
  price: number,
  currency: string,
}

@Entity({ name: Tables.PRODUCTS })
@Index(["userId"])
@Index(["userId", 'uuid'])
@Index(["userId", 'isSoftDeleted', 'isVariant'])
@Index(["parentProductId"])
@Index(["categoryId", "brandId", "locationState", "price"])
@Index(["categoryUuid", "brandUuid", "locationState", "price"])
@Index(["locationState"])
@Index(["uuid", "isSoftDeleted"])
@Index(["name"])
@Index(["name", "brandUuid", "price"])
@Index(["isVariant", "isSoftDeleted"])
@Index(["brandUuid", "isVariant", "isSoftDeleted"])
@Index(["categoryUuid", "isVariant", "isSoftDeleted"])
@Index(["parentProductId", "isVariant", "isSoftDeleted"])
export class Product extends DefualtEntity {
  @Column({ name: ProductsColumns.UUID, nullable: true })
  uuid: string;

  @Column({ name: ProductsColumns.USER_ID, nullable: true })
  userId: number;

  @Column({ name: ProductsColumns.PARENT_PRODUCT_ID, nullable: true })
  parentProductId?: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProductsColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({ name: ProductsColumns.CATEGORY_ID, nullable: true })
  categoryId: number;

  @Column({ name: ProductsColumns.CATEGORY_UUID })
  categoryUuid: string;

  @ManyToOne(() => Category, { primary: true, eager: true })
  @JoinColumn({
    name: ProductsColumns.CATEGORY_ID,
    referencedColumnName: TableColumns.ID,
  })
  category: Category;

  @Column({ name: ProductsColumns.BRAND_ID, nullable: true })
  brandId: number;

  @Column({ name: ProductsColumns.BRAND_UUID })
  brandUuid: string;

  @ManyToOne(() => Brand, { primary: true, eager: true })
  @JoinColumn({
    name: ProductsColumns.BRAND_ID,
    referencedColumnName: TableColumns.ID,
  })
  brand: Brand;

  @Column({ type: "text", name: ProductsColumns.NAME, nullable: true })
  name: string;

  @Column({ type: "numeric", name: ProductsColumns.PRICE, nullable: true, transformer: new ColumnNumericTransformer(), })
  price?: number;

  @Column({ type: "text", name: ProductsColumns.CURRENCY })
  currency: string;

  @Column({
    type: "text",
    name: ProductsColumns.LOCATION_STATE,
    nullable: true,
  })
  locationState: string;

  @Column({type: 'jsonb', name: ProductsColumns.LOCAL_GOVERNMENT_AREA_PRICES, nullable: true })
  localGovernmentAreaPrices?: {prices: LocalGovernmentAreaPrice[]};

  @Column({ type: "text", name: ProductsColumns.DESCRIPTION, default: "" })
  description: string;

  @Column({ type: "numeric", name: ProductsColumns.MAX_QTY })
  maxQty: number;

  @Column({ type: "numeric", name: ProductsColumns.MIN_QTY })
  minQty: number;

  @Column({type: 'jsonb', name: ProductsColumns.TAGS, nullable: true , default: {}})
  tags?: any;

  @Column({ type: "jsonb", name: ProductsColumns.IMAGES, nullable: true })
  images: SimpleImageJson[];

  @Column({
    type: "boolean",
    name: ProductsColumns.HAS_VARIANTS,
    nullable: false,
    default: false,
  })
  hasVariants: boolean;

  @Column({
    type: "boolean",
    name: ProductsColumns.IS_VARIANT,
    nullable: false,
    default: false,
  })
  isVariant: boolean;

  @Column({
    type: "boolean",
    name: ProductsColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  @Column({
    type: "boolean",
    name: ProductsColumns.IS_ACTIVE,
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "decimal",
    name: ProductsColumns.TOTAL_RATINGS_VALUE,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  totalRatingsValue: number;

  @Column({
    type: "bigint",
    name: ProductsColumns.TOTAL_NUMBER_OF_RATINGS,
    nullable: true,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  totalNumberOfRatings: number;

  // It is intentional that these field are not stored in the database table
  isOnProductLease: boolean;
  productLeaseUuid: string;

  @Column({ name: ProductsColumns.PICKUP_LOCATION_ID, nullable: true })
  pickupLocationId: number;

  @ManyToOne(() => PickupLocation, { primary: true })
  @JoinColumn({
    name: ProductsColumns.PICKUP_LOCATION_ID,
    referencedColumnName: TableColumns.ID,
  })
  pickupLocation: PickupLocation;

  @Column({ name: ProductsColumns.OLD_SELLER_ID, nullable: true })
  oldSellerId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProductsColumns.OLD_SELLER_ID,
    referencedColumnName: TableColumns.ID,
  })
  oldSeller: User;


  initialize(
    userId: number,
    newProductRequest: NewProductRequestDto,
    category: Category,
    brand: Brand,
    priceCurrency: string,
    tags?: any
  ) {
    this.uuid = uuidv4();
    this.name = newProductRequest.name;
    this.description = newProductRequest.description;
    this.userId = userId;

    if(category) {
      this.categoryId = category.id;
      this.categoryUuid = category.uuid;  
    }
    if(brand) {
      this.brandId = brand.id;
      this.brandUuid = brand.uuid;  
    }

    this.price = newProductRequest.price;
    this.currency = priceCurrency;
    this.locationState = newProductRequest.locationState;

    this.tags = tags;
    this.maxQty = newProductRequest.maxQty;
    this.minQty = newProductRequest.minQty;

    this.createdAt = Utils.utcNow();
    return this;
  }

  public getCurrency():string {
    const allowedCurrencies = Object.keys(CurrencyToSymbol)

    if(!allowedCurrencies.includes(this.currency)) {
      return CountryToCurrency.NIGERIA
    }
    return this.currency
  }

  toResponseDto(
    sellerPublicProfile: IPublicProfile,
    productResponseImages: {url: string, mimetype: string}[],
    sellerPickupLocationsDto: Omit<PickupLocation, OmitFields>[],
    unitPriceForBuyer: number,
    unitPromoPriceForBuyer?: number,
    isOnCart?: boolean, 
    oldSellerPublicProfile?: IPublicProfile,
  ): ProductsResponseDto {
    const CurrencyEnum: { [idx: string]: CurrencyToSymbol; } = <any>CurrencyToSymbol;
    let productPromoPrice = 0
    if(unitPromoPriceForBuyer){
      productPromoPrice = unitPromoPriceForBuyer
    }
    return {
      productUuid: this.uuid,
      productName: this.name,
      productDescription: this.description,
      minimumQuantity: this.minQty,
      maximumQuantity: this.maxQty,
      unitOfMeasurement: this.category?.unitOfMeasurement ?? "",
      isOnCart,
      brand: {
        uuid: this.brand.uuid,
        name: this.brand.name,
      },
      category: {
        uuid: this.category.uuid,
        name: this.category.name,
        settings: this.category.settings,
      },
      images: productResponseImages,
      sellerPublicProfile,
      sellerUserId: sellerPublicProfile.userId,
      oldSellerPublicProfile,
      price: this.price,
      unitPriceForBuyer,
      unitPromoPriceForBuyer: productPromoPrice, 
      currency: this.currency,
      currencySymbol: CurrencyEnum[this.getCurrency()] || CountryToCurrencySymbol.NIGERIA,

      locationState: this.locationState,
      totalNumberOfRatings: this.totalNumberOfRatings,
      totalRatingsValue: this.totalRatingsValue,
      hasVariants: this.hasVariants,
      isVariant: this.isVariant,
      tags: this.tags,

      sellerPickupLocations: sellerPickupLocationsDto,
      isActive: this.isActive,
      createdAt: this.createdAt
      // TODO: This must go.
      // pickupAddressDetails: _.omit(
      //   this.pickupLocation,
      //   "id",
      //   "user",
      //   "createdAt",
      //   "updatedAt"
      // ),
    }
  }
}
