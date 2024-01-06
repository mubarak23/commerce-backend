import { Get, Route, Tags, Inject, Security, Request, Path, Post, Body, Controller } from "tsoa";
import * as _ from 'underscore'

// import countries from "../utils/countries";
import { SupportedCountry } from "../entity/SupportedCountry";
import { Findus } from "../entity/FindUs";
import { getFreshConnection } from "../db";
import SupportedCountriesResponseDto from "../dto/SupportedCountriesResponseDto";
import { IServerResponse } from "../interfaces/IServerResponse";
import StatesLocalGovernmentAreas from "../resources/nigeria-state-and-lgas.json";
import { ConflictError, NotFoundError } from "../utils/error-response-types";
import { getRepository } from "typeorm";

// DO NOT EXPORT DEFAULT

@Route("api/miscellaneous")
@Tags('Miscellaneous')
export class MiscController extends Controller {

  @Get('/supported-countries')
  public async getCountriesList(): Promise<IServerResponse<SupportedCountriesResponseDto[]>> {
    const connection = await getFreshConnection()
    const supportedCountriesRepo = connection.getRepository(SupportedCountry)
    const supportedCountries = await supportedCountriesRepo.find({})

    const resData: IServerResponse<SupportedCountriesResponseDto[]> = {
      status: true,
      data: supportedCountries.map((country) => {
        return {
          name: country.name,
          iso2: country.iso2,
          phoneCode: country.phoneCode,
          currency: country.currency,
          currencySymbol: country.currencySymbol,
          image: country.image,
        };
      }),
    };

    return resData
  }

  @Get('/nigerianstates/:state')
  public async getStates(@Path('state') state: string,): Promise<IServerResponse<string[]>> {
    const resData: IServerResponse<string[]> = {
      status: true,
      data: StatesLocalGovernmentAreas.map(stateObj => stateObj.state)
    };
    return resData
  }

  @Get('/state/:state/lgas')
  public async getStateLocalGovernmentAreas(@Path() state: string,): Promise<IServerResponse<string[]>> {
    const foundStateRecord = StatesLocalGovernmentAreas.find(
      (stateRecord) => stateRecord.state.toLocaleLowerCase() === state.toLowerCase()
    );

    if(!foundStateRecord) {
      throw new NotFoundError('Sorry, the specified state is not valid.')
    }

    const resData: IServerResponse<string[]> = {
      status: true,
      data: foundStateRecord.lgas as string[]
    };
    
    return resData
  }

  @Get("/findus/all")
  public async handleFindUsOptionsFetch(
    @Request() req: any,
  ): Promise<IServerResponse<any>> {
    

    const connection = await getFreshConnection();
    const findUsRepo = connection.getRepository(Findus);

    const AvaiableOptions = await findUsRepo.find({ is_available: true});
  
    const resData: IServerResponse<any> = {
      status: true,
      data: AvaiableOptions,
    };
    return resData;
  }



  @Post("/findus/create")
  public async createCategories(@Body() requestBody: {name: string}): Promise<IServerResponse<any>> {
    const { name } = requestBody
    const findusRepo = getRepository(Findus);
    const findusOption = await findusRepo.findOne({
      name: requestBody.name,
    });
    if (findusOption) {
      throw new ConflictError("How did you Find us option has already been created");
    }  
    const createNewOption = new Findus().initialize(name);
    await findusRepo.save(createNewOption);
    await findusRepo.createQueryBuilder()
    .update(Findus)
    .set({ is_available: true})
    .where({
      id: createNewOption.id
    })
    .execute()

    this.setStatus(201);
    const resData: IServerResponse<any> = {
      status: true,
    };
    return resData;
  }
}
