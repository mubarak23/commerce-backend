// DO NOT EXPORT DEFAULT

import { Body, Controller, Get, Path, Post, Query, Request, Route, Security, Tags } from "tsoa";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { ProjectTransactionResponseDto } from "../dto/ProjectTransactionResponseDto";
import { RecurrentPaymentRequestDto } from "../dto/RecurrentPaymentRequestDto";
import { ProjectSubscription } from "../entity/ProjectSubscription";
import { ProjectSubscriptionTransaction } from "../entity/ProjectSubscriptionTransaction";
import { User } from "../entity/User";
import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import { ProjectStatuses } from "../enums/ProjectEnums";
import { ProjectSubscriptionPaymentVariant } from "../enums/ProjectSubscriptionPaymentVariant";
import { SortOrder } from "../enums/SortOrder";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as PaginationService from '../services/paginationService';
import * as ProjectService from "../services/projectService";
import { NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";

@Route("api/investor")
@Tags("Project Investor")

export class InvestorController extends Controller {

  @Get("portfolio")
  @Security("jwt")
  public async handleGetMyPortfolioProjectSubscription(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("status") projectStatus: ProjectStatuses,
   
  ): Promise<IServerResponse<IPaginatedList<ProjectSubscriptionResponseDto>>> {

    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);
    //--
    const query: any = {}
    
    if (projectStatus && projectStatus !== ProjectStatuses.ALL) {
      query.status = projectStatus
    }
  
    query.investorUserId = req.user.id;
    
    const join = {
      alias: "project_subscriptions",
      leftJoinAndSelect: {
        developer: "project_subscriptions.developer",
        investor: "project_subscriptions.investor",
        project: "project_subscriptions.project",
      },
    }
    //--
    const pageSize = 10
    const totalCount = await projectSubscriptionRepo.count(query);

    const projectSubscriptionListsPages = await PaginationService.paginate(ProjectSubscription,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<ProjectSubscription>
      const projectSubscriptionLists: ProjectSubscription[] = projectSubscriptionListsPages.dataset;

      if(projectSubscriptionLists.length === 0) {
        throw new UnprocessableEntityError('Not Project Subscription at the moment')
      }  
      const transformedProjectListsDataset = await ProjectService.transformProjectSubscriptions(projectSubscriptionLists)

      const resData = {
        status: true,
        data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
      };
      return resData
 
  }

  @Get("/portfolio/:subscriptionUuid")
  @Security("jwt")
  public async handleProjectSubscriptionFetchDetails(
    @Request() req: any,
    @Path("subscriptionUuid") subscriptionUuid: string
  ): Promise<IServerResponse<ProjectSubscriptionResponseDto>> {
    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);


    const join = {
      alias: "project_subscriptions",
      leftJoinAndSelect: {
        developer: "project_subscriptions.developer",
        investor: "project_subscriptions.investor",
        project: "project_subscriptions.project",
      },
    }
    

    const projectSubscription = await projectSubscriptionRepo.findOne({
      where: { uuid: subscriptionUuid, investorUserId: req.user.id, isSoftDeleted: false},
       join
    })
    
    if (!projectSubscription) {
      throw new NotFoundError("Specified Project Portfolio Does Not Exist");
    }

    const transformProjectDetails = await ProjectService.transformProjectSubscription(
      projectSubscription,
      req.user
    );

    this.setStatus(200);
    const resData: IServerResponse<ProjectSubscriptionResponseDto> = {
      status: true,
      data: transformProjectDetails,
    };
    return resData;
  }

  @Get("projecttransactions")
  @Security("jwt")
  public async handleGetMyProjectSubscriptionTransactions(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
   
  ): Promise<IServerResponse<IPaginatedList<ProjectTransactionResponseDto>>> {

    const connection = await getFreshConnection();
    const projectSubscriptionTransactionsRepo = connection.getRepository(ProjectSubscriptionTransaction);
    //--
    const query: any = {}
    
  
    query.investorUserId = req.user.id;
    query.isPaid = true;
    query.paidStatus = PaymentTransactionStatus.PAID;
    

    
    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }
    //--
    const pageSize = 10
    const totalCount = await projectSubscriptionTransactionsRepo.count(query);

    const projectSubscriptionTransactionListsPages = await PaginationService.paginate(ProjectSubscriptionTransaction,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<ProjectSubscriptionTransaction>
      const projectSubscriptionTransactionLists: ProjectSubscriptionTransaction[] = projectSubscriptionTransactionListsPages.dataset;

      if(projectSubscriptionTransactionLists.length === 0) {
        throw new UnprocessableEntityError('Not Project Subscription Transactions at the Moment')
      }  
      const transformedProjectListsDataset = await ProjectService.transformProjectSubscriptionTransactions(projectSubscriptionTransactionLists, req.user)

      const resData = {
        status: true,
        data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
      };
      return resData
 
  }

  @Get("/projecttransactions/pendingrecurrentpayment")
  @Security("jwt")
  public async handleGetPendingRecurrentProjectSubscriptionTransactions(
    @Request() req: any,
  ): Promise<IServerResponse<ProjectTransactionResponseDto[]>> {
    const connection = await getFreshConnection();
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction);
 
    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }
    
    const projectSubscriptionTransactions = await projectSubscriptionTransactionRepo.find({
      where: { investorUserId: req.user.id, isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID, isSoftDeleted: false},
       join
    })

    
    if (projectSubscriptionTransactions.length === 0) {
      throw new NotFoundError("No Recurrent Payment At the Moment");
    }

    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth() + 1;
    // const currentYear = currentDate.getFullYear();
    // // console.log('currentMonth', currentMonth)
    // const filteredTransactions = projectSubscriptionTransactions.filter(
    //   (transaction) => {
    //     const nextPaymentDate = new Date(transaction.nextPaymentDate);
    //     const transactionMonth = nextPaymentDate.getMonth(); 
    //     const transactionYear = nextPaymentDate.getFullYear();
    //    //  console.log('transactionMonth', transactionMonth)
    //     return transactionMonth === currentMonth && transactionYear === currentYear;
    //   }
    // );

    // if(filteredTransactions.length === 0){
    //   throw new NotFoundError("No Recurrent Payment For the Month At the Moment");
    // }
    console.log('projectSubscriptionTransactions - 0', projectSubscriptionTransactions[0])
    // console.log('projectSubscriptionTransactions - 1', projectSubscriptionTransactions[1])
    // console.log('projectSubscriptionTransactions - 2', projectSubscriptionTransactions[2])
    
    // const filteredTransactions = []
    // filteredTransactions.push(projectSubscriptionTransactions[0])
    // filteredTransactions.push(projectSubscriptionTransactions[1])
    // filteredTransactions.push(projectSubscriptionTransactions[2])
    
    const transformProjectSubscriptionTransactions = await ProjectService.transformProjectSubscriptionTransactions(
      projectSubscriptionTransactions,
      req.user
    );

    this.setStatus(200);
    const resData: IServerResponse<ProjectTransactionResponseDto[]> = {
      status: true,
      data: transformProjectSubscriptionTransactions,
    };
    
   return resData;
  }
  

  @Get("/projecttransactions/:transactionUuid")
  @Security("jwt")
  public async handleGetSingleProjectSubscriptionTransactions(
    @Request() req: any,
    @Path("transactionUuid") transactionUuid: string
  ): Promise<IServerResponse<ProjectTransactionResponseDto>> {
    const connection = await getFreshConnection();
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction);
 
    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }
    
    const projectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
      where: { uuid: transactionUuid, investorUserId: req.user.id, isSoftDeleted: false},
       join
    })
    
    if (!projectSubscriptionTransaction) {
      throw new NotFoundError("Specified Project Portfolio Does Not Exist");
    }

    const transformProjectSubscriptionTransaction = await ProjectService.transformProjectSubscriptionTransaction(
      projectSubscriptionTransaction,
      req.user
    );

    this.setStatus(200);
    const resData: IServerResponse<ProjectTransactionResponseDto> = {
      status: true,
      data: transformProjectSubscriptionTransaction,
    };
    return resData;
  }

  @Post("/projecttransactions/payment/:transactionUuid/:projectSubscriptionPaymentVariant")
  @Security("jwt")
  public async createProjectSubscription(
    @Request() req: any,
    @Body() requestBody: RecurrentPaymentRequestDto,
    @Path('projectSubscriptionPaymentVariant') projectSubscriptionPaymentVariant: ProjectSubscriptionPaymentVariant,
    @Path("transactionUuid") transactionUuid: string
  ): Promise<IServerResponse<boolean>> {
    const currentUser: User = req.user;
  
    await ProjectService.paymentForRecurrentSubscriptionTransansaction(requestBody.totalCost, transactionUuid, currentUser,projectSubscriptionPaymentVariant )
    this.setStatus(200);
  
    const resData: IServerResponse<any> = {
      status: true,
      data: true,
    };
    return resData;
  }

  

}