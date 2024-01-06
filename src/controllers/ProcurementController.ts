// ProcurementInvoice

import { Route, Request, Tags, Get, Security, Path, Query } from "tsoa";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { User } from "../entity/User";
import * as PaginationService from "../services/paginationService"
import { SortOrder } from "../enums/SortOrder";
import { Between, In, LessThan, MoreThan, Not } from "typeorm"
import * as CooperateService from '../services/cooperateService'
import { IServerResponse } from "../interfaces/IServerResponse";
import { UnauthorizedRequestError, UnprocessableEntityError } from "../utils/error-response-types";
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { ProcurementInvoiceResponseDto } from "../dto/ProcurementInvoiceResponseDto";
import { ProcurementDto } from "../dto/ProcurementDto";
import { Procurements } from "../entity/Procurement";

export enum ProcurementsListFilter {
  ALL = 'ALL',
  PROCESS_PENDING = 'PROCESS_PENDING',
  IS_PROCESSED = 'IS_PROCESSED',
}

@Route("api/procurements")
@Tags("Procurement")
@Security("jwt")
export class ProcurementController {

  @Get("")
  public async handleGetMyProcurements(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("filter") filter: ProcurementsListFilter,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<IPaginatedList<ProcurementDto>>>  {
    const currentUser: User = req.user;

    await CooperateService.isCooperateAccount(currentUser)
    
    const connection = await getFreshConnection();
    const procurementRepo = connection.getRepository(Procurements);
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)
    //--
    let query: any = {}
    query = {
      accountId: currentUser.accountId, 
    }
    if(filter === ProcurementsListFilter.IS_PROCESSED) {
      query.isProcessed = true
    } else if(filter === ProcurementsListFilter.PROCESS_PENDING) {
      query.isProcessed = false
    }

    if(startDate){
      query = {createdAt: MoreThan(startDate) }
    }
    if(endDate){
      query = {createdAt: LessThan(endDate) }
    }
    if(startDate && endDate) {
      query = {createdAt: Between(startDate, endDate) }
    }
    //--
    const pageSize = 10
    const totalCount = await procurementRepo.count(query);

    const procurementListsPages = await PaginationService.paginate(Procurements,
      query, pageSize, pageNumber, sortOrder, undefined) as IPaginatedList<Procurements>

    if(procurementListsPages.dataset.length === 0){
        throw new UnprocessableEntityError('No Procurement Available')
    }  
    const procurementIds: number[] = procurementListsPages.dataset.map(procurement => procurement.id)
    
    const procurementInvoices = await procurementInvoiceRepo.find({ procurementId: In(procurementIds) })
    // @ts-ignore
    const transformedProcurmentDataset: ProcurementDto[] = procurementListsPages.dataset.map(proc => {
      const invoiceDetails = procurementInvoices.find( invoice => invoice.procurementId === proc.id)

      return {
          uuid: proc.uuid,
          accountId: proc.accountId,
          procurementInvoice: invoiceDetails?  invoiceDetails!.toResponseDto() : null,
          upload: proc.upload,
          isProcessed: proc.isProcessed,
          createdAt: proc.createdAt
      };
    })
    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedProcurmentDataset, total: totalCount }
    };
    return resData
  }

  @Get('/:procurementUuid')
  public async handleGetProcurementsDetails(@Request() req: any, 
      @Path('procurementUuid') procurementUuid: string): Promise<IServerResponse<ProcurementDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection()
    const procurementRepo = connection.getRepository(Procurements) 
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)  
   
    const procurement = await procurementRepo.findOne({
      uuid: procurementUuid,
    });
    if(!procurement) {
      throw new UnprocessableEntityError("Invoice Does Not Exist");
    }
    if(procurement.accountId !== currentUser.accountId) {
      throw new UnauthorizedRequestError("You do not have access to view the specified procurement");
    }

    const procurementInvoice = await procurementInvoiceRepo.findOne({
      procurementId: procurement.id,
    })
    
    const transformProcurmentDetails: ProcurementDto = {
      uuid: procurement.uuid,
      accountId: procurement.accountId,
      invoice: procurementInvoice?.toResponseDto(),
      upload: procurement.upload,
      isProcessed: procurement.isProcessed,
      createdAt: procurement.createdAt
    }

    const resData: IServerResponse<ProcurementDto> = {
      status: true,
      data: transformProcurmentDetails
    }
    return resData
  }

  @Get('/invoice/:uuid')
  public async handleGetInvoiceDetails(@Request() req: any, 
      @Path('uuid') uuid: string): Promise<IServerResponse<ProcurementInvoiceResponseDto>> {
    const currentUser: User = req.user;

    const connection = await getFreshConnection()
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice)  
   
    const invoice = await procurementInvoiceRepo.findOne({
      uuid,
    });
    if(!invoice) {
      throw new UnprocessableEntityError("Invoice Does Not Exist");
    }
    if(invoice.accountId !== currentUser.accountId) {
      throw new UnauthorizedRequestError("You do not have access to view the specified procurement invoice");
    }

    const transformInvoiceDetails: ProcurementInvoiceResponseDto = {
      uuid: invoice.uuid,
      accountId: invoice.accountId,
      referenceNumber: invoice.referenceNumber,
      calculatedTotalCostMajor: invoice.calculatedTotalCostMajor,
      invoiceItem: invoice.invoiceItem,
      status: invoice.status,
      statusHistory: invoice.statusHistory,
      orderCreated: invoice.orderCreated,
      orderCreatedAt: invoice.orderCreatedAt,
      createdAt: invoice.createdAt
    }

    const resData: IServerResponse<ProcurementInvoiceResponseDto> = {
      status: true,
      data: transformInvoiceDetails
    }
    return resData
  }
}