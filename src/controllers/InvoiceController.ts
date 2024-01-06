
import { Route, Request, Tags, Get, Security, Path, Query, Body, Post } from "tsoa";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { User } from "../entity/User";
import * as PaginationService from "../services/paginationService"
import { SortOrder } from "../enums/SortOrder";
import * as CooperateService from '../services/cooperateService'
import { IServerResponse } from "../interfaces/IServerResponse";
import { UnprocessableEntityError } from "../utils/error-response-types";
import { ProcurementInvoice } from "../entity/ProcurementInvoice";
import { ProcurementInvoiceResponseDto } from "../dto/ProcurementInvoiceResponseDto";

@Route("api/invoice")
@Tags("Invoice")
@Security("jwt")
export class InvoiceController {

  @Get("")
  public async handleGetMyInvoices(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("startDate") startDate?: Date | null,
    @Query("endDate") endDate?: Date | null,
  ): Promise<IServerResponse<IPaginatedList<ProcurementInvoiceResponseDto>>>  {
    const currentUser: User = req.user;

    await CooperateService.isCooperateAccount(currentUser)
    
    const connection = await getFreshConnection();
    const procurementInvoiceRepo = connection.getRepository(ProcurementInvoice);
    //--
    let query: any = {}
    query = {  accountId: currentUser.accountId, isSoftDeleted: false }
    if(startDate){
      query = {createdAt: startDate }
    }
    if(endDate){
      query = {createdAt: endDate }
    }
    //--
    const pageSize = 10
    const totalCount = await procurementInvoiceRepo.count(query);

    const invoiceListsPages = await PaginationService.paginate(ProcurementInvoice,
      query, pageSize, pageNumber, sortOrder, undefined) as IPaginatedList<ProcurementInvoice>

    if(invoiceListsPages.dataset.length === 0){
        throw new UnprocessableEntityError('No Invoice Available')
    }  
    // @ts-ignore
    const transformedInvoiceDataset: ProcurementInvoiceResponseDto[] = invoiceListsPages.dataset.map(invoice => {
      return {
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
      };
    })
    const resData = {
      status: true,
      data: { pageNumber, pageSize, dataset: transformedInvoiceDataset, total: totalCount }
    };
    return resData
  }
}