import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, Tags } from 'tsoa';
import * as _ from 'underscore';
import { getFreshConnection } from "../db";
import { PickupLocation } from "../entity/PickupLocation";
import { User } from "../entity/User";
import { ISellerPickLocation } from "../interfaces/iSellerPickUpLocation";
import { IServerResponse } from "../interfaces/IServerResponse";
import { OmitFields } from '../interfaces/OmitFields';
import { ConflictError, NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";

// DO NOT EXPORT DEFAULT

@Route("api/pickuplocations")
@Tags("Pickup Locations")
export class PickupLocationController extends Controller {

  @Post("")
  @Security("jwt")
  public async handleAddPickUpLocation(@Request() req: any, @Body() requestBody: ISellerPickLocation): Promise<IServerResponse<Omit<ISellerPickLocation, "id" | "user">>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const sellerRepo = connection.getRepository(User);
    const isloginSeller = await sellerRepo.findOne({
      id: currentUser.id,
      isSeller: true,
    });
    if (!isloginSeller) {
      throw new ConflictError("Only sellers can add a pickup location");
    }

    const pickupLocationRepo = connection.getRepository(PickupLocation);
    const existingPickupLocation = await pickupLocationRepo.findOne({
      userId: currentUser.id,
      name: requestBody.name,
    });
    if (existingPickupLocation) {
      throw new ConflictError(
        "Seller Pickup Location with the Name Provided Already Exist"
      );
    }
    const { name, address, country, state, contactFullName, contactPhoneNumber } = requestBody

    let pickupLocation = new PickupLocation().initialize(
      currentUser.id,
      name ?? '',
      address ?? '',
      country ?? 'NGN',
      state ?? '',
      contactFullName ?? '',
      contactPhoneNumber ?? '',
    );
    pickupLocation = await pickupLocation.save()

    const resData: IServerResponse<Omit<ISellerPickLocation, OmitFields>> = {
      status: true,
      data: _.omit(pickupLocation, "id", "createdAt", "updatedAt"),
    };

    return resData;
  }

  @Get("")
  @Security("jwt")
  public async getPickupLocations( @Request() req: any ): Promise<IServerResponse<Omit<PickupLocation, OmitFields>[]>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();

    const pickupLocationRepo = connection.getRepository(PickupLocation);
    const pickupLocations = await pickupLocationRepo.find({
      userId: currentUser.id,
      isSoftDeleted: false,
    });

    const formattedLocations = _.map(pickupLocations, (loc) =>
      _.omit(loc, "id", "user", "createdAt", "updatedAt")
    );

    const resData: IServerResponse<Omit<PickupLocation, OmitFields>[]> = {
      status: true,
      data: formattedLocations,
    };

    return resData;
  }

  @Get("/:userUuid")
  public async getUserPickupLocations( @Request() req: any, 
  @Path("userUuid") userUuid: string): Promise<IServerResponse<Omit<PickupLocation, OmitFields>[]>> {
    
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    const pickupLocationRepo = connection.getRepository(PickupLocation);
    const user = await userRepo.findOne({ uuid: userUuid})
    if(!user){
      throw new NotFoundError('User does not exist')
    }
    const pickupLocations = await pickupLocationRepo.find({
      userId: user.id,
      isSoftDeleted: false,
    });

    if(pickupLocations.length === 0){
      throw new UnprocessableEntityError('User does not have pickup locations')
    }

    const formattedLocations = _.map(pickupLocations, (loc) =>
      _.omit(loc, "id", "user", "createdAt", "updatedAt")
    );

    const resData: IServerResponse<Omit<PickupLocation, OmitFields>[]> = {
      status: true,
      data: formattedLocations,
    };

    return resData;
  }


  @Get("/:locationUuid")
  public async handleGetPickupLocationDetails(@Request() req: any,
      @Path("locationUuid") locationUuid: string): Promise<IServerResponse<Omit<PickupLocation, OmitFields>>> {
    const connection = await getFreshConnection();

    const pickupLocationRepo = connection.getRepository(PickupLocation);

    const location = await pickupLocationRepo.findOne({
      uuid: locationUuid,
      isSoftDeleted: false,
    });

    const resData: IServerResponse<Omit<PickupLocation, OmitFields>> = {
      status: true,
      data: _.omit(location, "id", "userId", "user", "createdAt", "updatedAt", "isSoftDeleted"),
    };

    return resData;
  }

  @Put("/:locationUuid")
  @Security("jwt")
  public async updateSellerPickUpLocation(
    @Request() req: any,
    @Body() requestBody: ISellerPickLocation,
    @Path("locationUuid") locationUuid: string
  ): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const pickupLocationRepo = connection.getRepository(PickupLocation);
    const pickupLocation = await pickupLocationRepo.findOne({
      userId: currentUser.id,
      uuid: locationUuid,
    });

    if (!pickupLocation) {
      throw new NotFoundError("Location was not found");
    }

    await pickupLocationRepo.createQueryBuilder()
      .update(PickupLocation)
      .set({
        name: requestBody?.name,
        address: requestBody?.address,
        country: requestBody?.country,
        contactFullName: requestBody?.contactFullName ?? '',
        contactPhoneNumber: requestBody?.contactPhoneNumber ?? '',
      })
      .where({ id: pickupLocation.id })
      .execute();
    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }

  @Delete("/:locationUuid")
  @Security("jwt")
  public async deletePickupLocation(@Request() req: any, @Path("locationUuid") locationUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection();
    const pickupLocationRepo = connection.getRepository(PickupLocation);
    const pickupLocation = await pickupLocationRepo.findOne({
      userId: currentUser.id,
      uuid: locationUuid,
    });

    if (!pickupLocation) {
      throw new NotFoundError("Location was not found");
    }

    await pickupLocationRepo
      .createQueryBuilder()
      .update(PickupLocation)
      .set({ isSoftDeleted: true })
      .where({ id: pickupLocation.id })
      .execute();

    const resData: IServerResponse<void> = {
      status: true,
    };
    return resData;
  }
}
