import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, Tags } from "tsoa";
import * as _ from 'underscore';
import { getFreshConnection } from "../db";
import { DeliveryLocationRequestDto } from "../dto/DeliveryLocationRequestDto";
import { IUpdateDeliveryLocationDto } from "../dto/IUpdateDeliveryLocationDto";
import { DeliveryLocation } from "../entity/DeliveryLocation";
import { User } from "../entity/User";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OmitFields } from "../interfaces/OmitFields";
import * as Utils from "../utils/core";
import { BadRequestError, NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";

// DO NOT EXPORT DEFAULT

@Route("api/deliverylocations")
@Tags("Delivery Locations")

export class DeliveryLocationController extends Controller {

  @Security("jwt")
  @Get("")
  public async handleGetDeliveryLocations(@Request() req: any): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>[]>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const deliveryaddresses = await deliveryLocationRepo.find({
      userId: currentUser.id,
      isSoftDeleted: false,
    });

    const formattedDeliveryAddresses = _.map(deliveryaddresses, (loc) =>
      _.omit(loc, "id", "user", "createdAt", "updatedAt")
    );

    const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>[]> = {
      status: true,
      data: formattedDeliveryAddresses,
    };

    return resData;
  }

  @Get("/:userUuid")
  public async handleUserDeliveryLocations(@Request() req: any,
  @Path("userUuid") userUuid: string
  ): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>[]>> {
    
    const connection = await getFreshConnection();
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const userRepo = connection.getRepository(User);
    const user = await userRepo.findOne({ uuid: userUuid})
    if(!user){
      throw new NotFoundError('User does not exist')
    }

    const deliveryaddresses = await deliveryLocationRepo.find({
      userId: user.id,
      isSoftDeleted: false,
    });

    if(deliveryaddresses.length === 0){
        throw new UnprocessableEntityError('User does not have delivery locations')
    }

    const formattedDeliveryAddresses = _.map(deliveryaddresses, (loc) =>
      _.omit(loc, "id", "user", "createdAt", "updatedAt")
    );

    const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>[]> = {
      status: true,
      data: formattedDeliveryAddresses,
    };

    return resData;
  }

  // @Get("/warehouses")
  // public async handleGetWareHouses(@Request() req: any): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>[]>> {
  //   const currentUser: User = req.user;

  //   const connection = await getFreshConnection();

  //   const deliveryLocationRepo = connection.getRepository(DeliveryLocation);
  //   const warehouseRepo = connection.getRepository(WareHouse)
  //   const wareHouses = await warehouseRepo.find({
  //     userId: currentUser.id
  //   })
  //   const warehouseIds: number[] = []
  //   wareHouses.forEach((wareHouse) => {
  //     warehouseIds.push(wareHouse.id)
  //   })
  //   const deliveryWareHouseAddresses = await deliveryLocationRepo.find({
  //     userId: currentUser.id,
  //     wareHouseId: In(warehouseIds),
  //     isSoftDeleted: false,
  //   });

  //   const formattedWareHouseAddresses = _.map(deliveryWareHouseAddresses, (loc) =>
  //     _.omit(loc, "id", "user", "createdAt", "updatedAt")
  //   );

  //   const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>[]> = {
  //     status: true,
  //     data: formattedWareHouseAddresses,
  //   };

  //   return resData;
  // }

  @Security("jwt")
  @Get("/:locationUuid")
  public async handleGetGetDeliveryLocationDetails(
    @Request() req: any,
    @Path("locationUuid") locationUuid: string
  ): Promise<IServerResponse<Omit<DeliveryLocation, OmitFields>>> {
    const connection = await getFreshConnection();

    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);

    const location = await DeliveryLocationRepo.findOne({
      uuid: locationUuid,
      isSoftDeleted: false,
    });

    const resData: IServerResponse<Omit<DeliveryLocation, OmitFields>> = {
      status: true,
      data: _.omit(location, "id", "user", "createdAt", "updatedAt"),
    };

    return resData;
  }

  @Security("jwt")
  @Post("/")
  public async handleAddDeliveryLocation(
    @Request() req: any,
    @Body() requestBody: DeliveryLocationRequestDto
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const { address, contactFullName, contactPhoneNumber, country, state } = requestBody
    
    const connection = await getFreshConnection();
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const getDeliveryLocation = await DeliveryLocationRepo.findOne({
      userId: currentUser.id,
      address,
    });

    if (getDeliveryLocation) {
      throw new UnprocessableEntityError("Delivery Location Has Been Added On Your List");
    }
    const  deliveryLocation = new DeliveryLocation().initialize(currentUser.id, address, state, 'Nigeria', contactFullName, contactPhoneNumber);
    
      await DeliveryLocationRepo.save(deliveryLocation);
    const resData: IServerResponse<any> = {
      status: true,
      data: { uuid: deliveryLocation.uuid }
    };
    return resData;
  }
  
  @Security("jwt")
  @Put("/:locationUuid")
  public async updateUserDeliveryLocation(
    @Request() req: any,
    @Body() requestBody: IUpdateDeliveryLocationDto,
    @Path("locationUuid") locationUuid: string
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;
    const updateDeliveryLocation = requestBody
    
    const connection = await getFreshConnection();
    const deliveryLocationRepo = connection.getRepository(DeliveryLocation)

    const deliveryLocation = await deliveryLocationRepo.findOne({
      userId: currentUser.id,
      uuid: locationUuid,
    });

    if (!deliveryLocation) {
      throw new NotFoundError("Delivery Location was not found");
    }

    const updateQuery: Partial<DeliveryLocation> = updateDeliveryLocation;

    const deliveryLocationUpdateSuccess = false

    if(!Object.keys(updateQuery).length) {
      throw new BadRequestError("No parameters were specified to update the delivery location");
    }
    
    await connection.transaction(async (transactionalEntityManager) => {
      const deliveryLocationRepoT = transactionalEntityManager.getRepository(DeliveryLocation)

      if(!Utils.isNullOrUndefined(updateDeliveryLocation.isDefault)) {
        await deliveryLocationRepoT.createQueryBuilder()
          .update(DeliveryLocation)
          .set({isDefault: false})
          .where({ userId: currentUser.id })
          .execute();

        await deliveryLocationRepoT.createQueryBuilder()
          .update(DeliveryLocation)
          .set({isDefault: requestBody.isDefault})
          .where({ id: deliveryLocation.id })
          .execute();
        
        delete updateQuery.isDefault
      }
      if(Object.keys(updateQuery).length) {
        await deliveryLocationRepoT.createQueryBuilder()
          .update(DeliveryLocation)
          .set(updateQuery)
          .where({ id: deliveryLocation.id })
          .execute();
      }
  
      return true
    })

    const resData: IServerResponse<void> = {
      status: deliveryLocationUpdateSuccess,
    };
    return resData;
  }

  @Security("jwt")
  @Delete("/:locationUuid")
  public async deleteDeliveryLocation(
    @Request() req: any,
    @Path("locationUuid") locationUuid: string
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const DeliveryLocationRepo = connection.getRepository(DeliveryLocation);
    const getDeliveryLocation = await DeliveryLocationRepo.findOne({
      userId: currentUser.id,
      uuid: locationUuid,
    });

    if (!getDeliveryLocation) {
      throw new NotFoundError("Location was not found");
    }

    await DeliveryLocationRepo.createQueryBuilder()
      .update(DeliveryLocation)
      .set({ isSoftDeleted: true })
      .where({ id: getDeliveryLocation.id })
      .execute();
    
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }
}
