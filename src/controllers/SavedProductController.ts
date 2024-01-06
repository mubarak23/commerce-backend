import { Controller, Get, Route, Request, Security, Tags, Query, Path, Post, Delete } from "tsoa";
import { getRepository } from "typeorm";
import { IPaginatedList } from "../dto/IPaginatedList";
import { ProductsResponseDto } from "../dto/ProductsResponseDto";
import { SavedProduct } from "../entity/SavedProduct";
import { User } from "../entity/User";
import { SortOrder } from "../enums/SortOrder";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as ProductService from "../services/productsService";
import * as PaginationService from "../services/paginationService";
import { Product } from "../entity/Product";

// SavedProduct
@Route("api/savedproducts")
@Tags("SavedProducts")
export class SavedProductsController extends Controller {
    @Get("/")
    @Security("jwt")
    public async handleSavedProducts(
      @Request() req: any,
      @Query("pageNumber") pageNumber: any,
      @Query("sortOrder") sortOrder: SortOrder
    ): Promise<IServerResponse<IPaginatedList<ProductsResponseDto>>> {
      const currentUser: User = req.user;
  
      const pageSize = 10;
  
      const savedProductRepo = getRepository(SavedProduct);
      const query = {
        userId: currentUser.id,
      };
      const savedProductsPage = (await PaginationService.paginate(
        SavedProduct,
        query,
        pageSize,
        pageNumber,
        sortOrder
      )) as IPaginatedList<SavedProduct>;
  
      const totalCount = await savedProductRepo.count({
        userId: currentUser.id,
      });
  
      const productsResponse = await ProductService.transformSavedProducts(
        savedProductsPage
      );
  
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
    }
  
    @Post("/:productUuid")
    @Security("jwt")
    public async saveProduct(
      @Request() req: any,
      @Path("productUuid") productUuid: string
    ): Promise<IServerResponse<void>> {
      const currentUser: User = req.user;
  
      const productRepo = getRepository(Product);
  
      const existingProduct = await productRepo.findOne({
        uuid: productUuid,
      });
      if (!existingProduct) {
        this.setStatus(404);
        const resData: IServerResponse<any> = {
          status: true,
          message: "Selected product does not exist",
        };
        return resData;
      }
      
      const saveProductRepo = getRepository(SavedProduct);
  
      const existingSavedProduct = await saveProductRepo.findOne({
        userId: currentUser.id,
        productId: existingProduct.id
      });
      if (existingSavedProduct) {
        this.setStatus(400);
        const resData: IServerResponse<any> = {
          status: false,
          message: "The Product exist on your Saved Lists ",
        };
        return resData;
      }

      const savedProduct = new SavedProduct().initialize(
        currentUser.id,
        existingProduct.id
      );
      await savedProduct.save();
  
      this.setStatus(201);
      const resData: IServerResponse<void> = {
        status: true,
      };
      return resData;
    }

    @Delete("/:productUuid")
    @Security("jwt")
    public async deleteSavedProduct(
      @Request() req: any,
      @Path("productUuid") productUuid: string
    ): Promise<IServerResponse<void>> {
      const currentUser: User = req.user;
  
      const productRepo = getRepository(Product);

  
      const existingProduct = await productRepo.findOne({
        uuid: productUuid,
      });
      if (!existingProduct) {
        this.setStatus(404);
        const resData: IServerResponse<any> = {
          status: true,
          message:
            "Product Does Not Exist ",
        };
        return resData;
      }
      const savedProductRepo = getRepository(SavedProduct) 
      await savedProductRepo.delete({
        userId: currentUser.id,
        productId: existingProduct.id,
      });
  
      const resData: IServerResponse<void> = {
        status: true,
      };
      return resData;
    }
    

}