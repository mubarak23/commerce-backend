// DO NOT EXPORT DEFAULT

import { Body, Controller, Get, Post, Request, Route, Security, Tags } from "tsoa";
import { AddInvestorToProjectRequestDto } from "../dto/AddInvestorToProjectRequestDto";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { User } from "../entity/User";
import DeveloperAccountActivationType from "../enums/DeveloperAccountActivationType";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as DeveloperService from '../services/developerService';
import * as ProjectService from "../services/projectService";

@Route("api/estatedeveloper")
@Tags("Estate Developer")

export class EstateDeveloperController extends Controller {

  @Security("jwt")
  @Get("/isapproved")
  public async handleIsDeveloperAccountApprovedAndConfirmed(@Request() req: any): Promise<IServerResponse<DeveloperAccountActivationType>> {

  const isDeveloperAccountConfirm =   await DeveloperService.isDeveloperAccountApprovedAndConfirmRequest(req.user.id);

    const resData: IServerResponse<DeveloperAccountActivationType> = {
      status: true,
      data: isDeveloperAccountConfirm,
    };

    return resData;
  }

@Post("/addinvestor")
@Security("jwt")
public async addInvestorToProjectSubscription(
  @Request() req: any,
  @Body() requestBody: AddInvestorToProjectRequestDto
): Promise<IServerResponse<ProjectSubscriptionResponseDto>> {
  const currentUser: User = req.user;

  const addInvestorToExistingProjectSubscription = await ProjectService.addInvestorToProjectSubscription(currentUser, requestBody);

  this.setStatus(201);

  const resData: IServerResponse<ProjectSubscriptionResponseDto> = {
    status: true,
    data: addInvestorToExistingProjectSubscription,
  };
  return resData;
}




}