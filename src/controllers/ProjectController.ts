import { Body, Controller, Get, Patch, Path, Post, Put, Query, Request, Route, Security, Tags } from "tsoa";
import { In } from "typeorm";
import { isEmpty } from "underscore";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { NewProjectRequestDto } from "../dto/NewProjectRequestDto";
import NewProjectSubscriptionRequestDto from "../dto/NewProjectSubscriptionRequestDto";
import { NewUpdateProjectRequestDto } from "../dto/NewUpdateProjectRequestDto";
import { ProjectsResponseDto } from "../dto/ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from "../dto/ProjectSubscriptionResponseDto";
import { SearchProjectDto } from "../dto/SearchProjectsDto";
import { UpdateProjectStageRequestDto } from "../dto/UpdateProjectStageRequestDto";
import { Project } from "../entity/Project";
import { ProjectSubscription } from "../entity/ProjectSubscription";
import { User } from "../entity/User";
import { ProjectStatuses } from "../enums/ProjectEnums";
import { ProjectSubscriptionPaymentVariant } from "../enums/ProjectSubscriptionPaymentVariant";
import { SortOrder } from "../enums/SortOrder";
import { IServerResponse } from "../interfaces/IServerResponse";
import * as PaginationService from "../services/paginationService";
import * as ProjectService from "../services/projectService";
import { NotFoundError, UnprocessableEntityError } from "../utils/error-response-types";


@Route("api/project")
@Tags("Project")
export class ProjectController extends Controller {

  @Get("")
  public async handleGetProjects(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("status") projectStatus: ProjectStatuses,
   
  ): Promise<IServerResponse<IPaginatedList<ProjectsResponseDto>>> {

    const connection = await getFreshConnection();
    const projectRepo = connection.getRepository(Project);
    //--
    const query: any = {}
    
    if (projectStatus && projectStatus !== ProjectStatuses.ALL) {
      query.status = projectStatus
    }
  
    const join = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    }
    //--
    const pageSize = 10
    const totalCount = await projectRepo.count(query);

    const projectListsPages = await PaginationService.paginate(Project,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<Project>
      const projectLists: Project[] = projectListsPages.dataset;

      if(projectLists.length === 0) {
        throw new UnprocessableEntityError('Not Project at the moment')
      }  
      const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)

      const resData = {
        status: true,
        data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
      };
      return resData
 
  }



  @Get("myprojects")
  @Security("jwt")
  public async handleGetMyProjects(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("status") projectStatus: ProjectStatuses,
   
  ): Promise<IServerResponse<IPaginatedList<ProjectsResponseDto>>> {

    const connection = await getFreshConnection();
    const projectRepo = connection.getRepository(Project);
    //--
    const query: any = {}
    
    if (projectStatus && projectStatus !== ProjectStatuses.ALL) {
      query.status = projectStatus
    }
  
    query.userId = req.user;
    
    const join = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    }
    //--
    const pageSize = 10
    const totalCount = await projectRepo.count(query);

    const projectListsPages = await PaginationService.paginate(Project,
      query, pageSize, pageNumber, sortOrder, undefined, join) as IPaginatedList<Project>
      const projectLists: Project[] = projectListsPages.dataset;

      if(projectLists.length === 0) {
        throw new UnprocessableEntityError('Not Project at the moment')
      }  
      const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)

      const resData = {
        status: true,
        data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
      };
      return resData
 
  }

  @Get("subscriptions")
  @Security("jwt")
  public async handleGetMyProjectsSubscription(
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
  
    query.developerUserId = req.user.id;
    
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

  @Get("popularprojects")
  public async handleGetPopularProjectBaseOnSubscriptions(
    @Request() req: any,
  ): Promise<IServerResponse<ProjectsResponseDto[]>> {

    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);
    const projectRepo = connection.getRepository(Project)
    //--
    const join = {
      alias: "project_subscriptions",
      leftJoinAndSelect: {
        developer: "project_subscriptions.developer",
        investor: "project_subscriptions.investor",
        project: "project_subscriptions.project",
      },
    }
    const projectSubscriptionLists = await projectSubscriptionRepo.find({
      join
    })

    
    if(projectSubscriptionLists.length === 0) {
      throw new UnprocessableEntityError('Not Popular Project at the moment')
    } 
 
    const projectSubscriptionCounts: { [projectId: number]: number } = {};
    
    projectSubscriptionLists.forEach((subscription) => {
      const projectId = subscription.project.id;
      projectSubscriptionCounts[projectId] = (projectSubscriptionCounts[projectId] || 0) + 1;
    });


  const projectsWithMoreThan10Subscriptions = projectSubscriptionLists.filter(
    (subscription) => projectSubscriptionCounts[subscription.project.id] > 5
  );

   if(projectsWithMoreThan10Subscriptions.length === 0){
    throw new UnprocessableEntityError('Not Popular Project at the moment')
   }
    
  const projectIds = projectsWithMoreThan10Subscriptions.map((subscription) => subscription.project.id);


  const joinProject = {
    alias: "project",
    leftJoinAndSelect: {
      user: "project.user",
    },
  }
  //--
  const projects = await projectRepo.find({
    join: joinProject,
    where: {
      id: In(projectIds),
    }
  })

    if(projects.length === 0) {
      throw new UnprocessableEntityError('Not Popular Project at the moment')
    }  
    const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projects)

    const resData: IServerResponse<ProjectsResponseDto[]> = {
      status: true,
      data: transformedProjectListsDataset,
    };
    return resData;
 
  }


  @Get("unsubscriptionprojects")
  @Security("jwt")
  public async handleGetUserUnSubscriptionProjects(
    @Request() req: any,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
  ):  Promise<IServerResponse<IPaginatedList<ProjectsResponseDto>>> {

    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);
    const projectRepo = connection.getRepository(Project)
    //--

    const query: any = {}

    const join = {
      alias: "project_subscriptions",
      leftJoinAndSelect: {
        developer: "project_subscriptions.developer",
        investor: "project_subscriptions.investor",
        project: "project_subscriptions.project",
      },
    }

    const joinProject = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    }

    const projectSubscriptionLists = await projectSubscriptionRepo.find({
      where: { investorUserId: req.user.id},
      join
    })
    
    if(projectSubscriptionLists.length === 0) {
      
      //--
      query.status = ProjectStatuses.ACTIVE

      const pageSize = 10
      const totalCount = await projectSubscriptionRepo.count(query);
  
      const projectListsPages = await PaginationService.paginate(Project,
        query, pageSize, pageNumber, sortOrder, undefined, joinProject) as IPaginatedList<Project>
        const projectLists: Project[] = projectListsPages.dataset;

     
    
        if(projectLists.length === 0) {
          throw new UnprocessableEntityError('Not Popular Project at the moment')
        }  
    
        
        const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)


        const resData = {
          status: true,
          data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
        };
        return resData
     
    } 
 
   
    const projectIds = projectSubscriptionLists.map(subscription => subscription.projectId);
    
    query.status = ProjectStatuses.ACTIVE
    const pageSize = 10
    const totalCount = await projectSubscriptionRepo.count(query);

    const projectListsPages = await PaginationService.paginate(Project,
      query, pageSize, pageNumber, sortOrder, undefined, joinProject) as IPaginatedList<Project>
      const projectLists: Project[] = projectListsPages.dataset;
      
  
      if(projectLists.length === 0) {
        throw new UnprocessableEntityError('Not Popular Project at the moment')
      }  
  
      const filteredProjects = projectLists.filter((project) => {
        return !projectIds.includes(project.id);
      });

   
      const transformedProjectListsDataset = await ProjectService.transformPublicProjects(filteredProjects)


      const resData = {
        status: true,
        data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
      };
      return resData
 
  }



  @Get("toplocationprojects")
  public async handleGetTopLocationProjects(
    @Request() req: any,
  ): Promise<IServerResponse<ProjectsResponseDto[]>> {

    const connection = await getFreshConnection();
    const projectRepo = connection.getRepository(Project)

    const join = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    }

    const projects = await projectRepo.find({
      join,
    })

    if(projects.length === 0) {
      throw new UnprocessableEntityError('Not Top Location Project at the moment')
    } 

    const filteredProjects = projects.filter((project) => {
      const projectsWithSameLocation = projects.filter((p) => p.address === project.address);
      return projectsWithSameLocation.length > 3;
    });

    if(filteredProjects.length === 0) {
      throw new UnprocessableEntityError('Not Top Location Project at the moment')
    }  
    const transformedProjectListsDataset = await ProjectService.transformPublicProjects(filteredProjects)

    const resData: IServerResponse<ProjectsResponseDto[]> = {
      status: true,
      data: transformedProjectListsDataset,
    };
    return resData;
  
  }


  @Get("/myprojects/:projectUuid")
  @Security("jwt")
  public async handleMyProjectFetchDetails(
    @Request() req: any,
    @Path("projectUuid") projectUuid: string
  ): Promise<IServerResponse<ProjectsResponseDto>> {
    const projectDetails = await ProjectService.getProjectByUuid(projectUuid);
    if (!projectDetails) {
      throw new NotFoundError("Specified Project Does Not Exist");
    }

    const transformProjectDetails = await ProjectService.transformProject(
      projectDetails,
      req.user
    );

    this.setStatus(200);
    const resData: IServerResponse<ProjectsResponseDto> = {
      status: true,
      data: transformProjectDetails,
    };
    return resData;
  }

  @Get("/:projectUuid")
  public async handleProjectFetchDetails(
    @Request() req: any,
    @Path("projectUuid") projectUuid: string
  ): Promise<IServerResponse<ProjectsResponseDto>> {
    
    const projectDetails = await ProjectService.getProjectByUuid(projectUuid);
    if (!projectDetails) {
      throw new NotFoundError("Specified Project Does Not Exist");
    }

    const transformProjectDetails = await ProjectService.transformPublicProject(
      projectDetails
    );

    this.setStatus(200);
    const resData: IServerResponse<ProjectsResponseDto> = {
      status: true,
      data: transformProjectDetails,
    };
    return resData;
  }



  @Get("/subscriptions/:subscriptionUuid")
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
      where: { uuid: subscriptionUuid, developerUserId: req.user.id, isSoftDeleted: false},
       join
    })
    
    if (!projectSubscription) {
      throw new NotFoundError("Specified Project Subscription Does Not Exist");
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

  @Get("/subscriptions/:subscriptionUuid/:investorUuid")
  @Security("jwt")
  public async handleFetchInvestorProjectSubscriptionDetails(
    @Request() req: any,
    @Path("subscriptionUuid") subscriptionUuid: string,
    @Path("investorUuid") investorUuid: string
  ): Promise<IServerResponse<ProjectSubscriptionResponseDto>> {
    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);
    const userRepo = connection.getRepository(User);
    
    const investorUser  = await userRepo.findOne({
      where: { uuid: investorUuid, isInvestor: true}
    })
    
    if(!investorUser){
      throw new UnprocessableEntityError("Investor Does Not Exist")
    }
    

    const join = {
      alias: "project_subscriptions",
      leftJoinAndSelect: {
        developer: "project_subscriptions.developer",
        investor: "project_subscriptions.investor",
        project: "project_subscriptions.project",
      },
    }
    

    const projectSubscription = await projectSubscriptionRepo.findOne({
      where: { uuid: subscriptionUuid, developerUserId: req.user.id, investorUserId: investorUser.id, isSoftDeleted: false},
       join
    })
    
    if (!projectSubscription) {
      throw new NotFoundError("Specified Project Subscription Does Not Exist");
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

  @Get("subscriptions/investor/:investorUuid")
  @Security("jwt")
  public async handleGetInvestorSubscription(
    @Request() req: any,
    @Path("investorUuid") investorUuid: string,
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
   
  ): Promise<IServerResponse<IPaginatedList<ProjectSubscriptionResponseDto>>> {

    const connection = await getFreshConnection();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);
    const userRepo = connection.getRepository(User);
    
    const investorUser  = await userRepo.findOne({
      where: { uuid: investorUuid, isInvestor: true}
    })
    
    if(!investorUser){
      throw new UnprocessableEntityError("Investor Does Not Exist")
    }
    
    //--
    const query: any = {}
    
    query.status = ProjectStatuses.ACTIVE
    
    query.developerUserId = req.user;
    query.investorUserId = investorUser.id;
    
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


@Post("/filterproject")
public async filterProjects(
  @Request() req: any,
  @Body() requestBody: SearchProjectDto
): Promise<IServerResponse<ProjectsResponseDto[] | IPaginatedList<ProjectSubscriptionResponseDto>>>{

  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);
  //--
  
  if(requestBody.searchWord){
    const projectLists = await projectRepo
    .createQueryBuilder("projects")
    .where("LOWER(projects.name) LIKE :searchWord", {
      searchWord: `${requestBody.searchWord.toLowerCase()}%`,
    })
    .where('projects.status = :activeStatus',{ activeStatus: ProjectStatuses.ACTIVE })
    .leftJoinAndSelect("projects.user", "user")
    .limit(10)
    .getMany();

    if(projectLists.length === 0) {
      throw new UnprocessableEntityError('No Project Found at the moment')
    }  
  
  const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)

  const resData: IServerResponse<ProjectsResponseDto[]> = {
    status: true,
    data:transformedProjectListsDataset ,
  };
  return resData;

  }

  const query: any = {}
  query.status = ProjectStatuses.ACTIVE

  if(isEmpty(requestBody)){
    const join = {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    }
    //--
    
    const pageSize = 10
   
    const projectListsPages = await PaginationService.paginate(Project,
      query, pageSize, 1, SortOrder.ASCENDING, undefined, join) as IPaginatedList<Project>
      const projectLists: Project[] = projectListsPages.dataset;

      if(projectLists.length === 0) {
        throw new UnprocessableEntityError('No Project Found at the Momentt')
      }  
      const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)

      const resData: IServerResponse<ProjectsResponseDto[]> = {
        status: true,
        data: transformedProjectListsDataset  ,
      };
      
      return resData;
      
  }
  
  const queryBuilder = projectRepo.createQueryBuilder('project');
  queryBuilder.leftJoinAndSelect('project.user', 'user');

 if (requestBody.maxCostPerSlot) {
  queryBuilder.andWhere('project.costPerSlot <= :maxCostPerSlot', { maxCostPerSlot: requestBody.maxCostPerSlot });
}

if (requestBody.minCostPerSlot) {
  queryBuilder.andWhere('project.costPerSlot >= :minCostPerSlot', { minCostPerSlot: requestBody.minCostPerSlot });
}

if (requestBody.projectName) {
  queryBuilder.andWhere('LOWER(project.name) = LOWER(:name)', { name: requestBody.projectName });
}
  
if (requestBody.type) {
  queryBuilder.andWhere('LOWER(project.type) = LOWER(:type)', { type: requestBody.type });
}
  

if (requestBody.state) {
  queryBuilder.andWhere('LOWER(project.state) = LOWER(:state)', { state: requestBody.state });
}


const projectLists = await queryBuilder.getMany();

      
  if(projectLists.length === 0) {
    throw new UnprocessableEntityError('No Project Found at the Moment')
  }  

  
  const transformedProjectListsDataset = await ProjectService.transformPublicProjects(projectLists)

  const resData: IServerResponse<ProjectsResponseDto[]> = {
    status: true,
    data:transformedProjectListsDataset ,
  };
  return resData;
}



@Post("/create")
@Security("jwt")
public async createProject(
  @Request() req: any,
  @Body() requestBody: NewProjectRequestDto
): Promise<IServerResponse<ProjectsResponseDto>> {
  const currentUser: User = req.user;

  const createdProduct = await ProjectService.handleCreateProject(requestBody, currentUser, currentUser.accountId);
  
  const transformProjectDetails = await ProjectService.transformProject(
    createdProduct,
    currentUser
  );

  this.setStatus(201);

  const resData: IServerResponse<ProjectsResponseDto> = {
    status: true,
    data: transformProjectDetails,
  };
  return resData;
}



@Post("/subscription/:projectSubscriptionPaymentVariant")
@Security("jwt")
public async createProjectSubscription(
  @Request() req: any,
  @Path() projectSubscriptionPaymentVariant: ProjectSubscriptionPaymentVariant,
  @Body() requestBody: NewProjectSubscriptionRequestDto
): Promise<IServerResponse<any>> {
  const currentUser: User = req.user;

  const projectSubscription = await ProjectService.handleSubscribeToProject(requestBody, currentUser, projectSubscriptionPaymentVariant )

  this.setStatus(201);

  const resData: IServerResponse<any> = {
    status: true,
    data: projectSubscription,
  };
  return resData;
}


@Security("jwt")
@Put("/:uuid")
public async handleProjectUpdate(@Request() req: any,  @Path("uuid") projectUuid: string, 
    @Body() reqBody: NewUpdateProjectRequestDto): Promise<IServerResponse<void>> {
  const currentUser: User = req.user;
  const updateProjectData = reqBody;
  await ProjectService.updateProjectDetails(updateProjectData, currentUser.id, projectUuid)

  const resData: IServerResponse<void> = {
    status: true,
  };
  return resData;
}

@Security("jwt")
@Patch("/updatestatus/:uuid/:newprojectstatus")
public async handleProjectUpdateStatus(@Request() req: any,  
@Path("uuid") projectUuid: string, 
@Path("newprojectstatus") newprojectstatus: ProjectStatuses 
    ): Promise<IServerResponse<void>> {
  const currentUser: User = req.user;
  
  await ProjectService.isUserADeveloper(currentUser.id)

  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);
  // call this at the controller level
  // await isUserADeveloper(user.id)

  const join = {
    alias: "project",
    leftJoinAndSelect: {
      user: "project.user",
    },
  };

  const project = await projectRepo.findOne({
    where: { uuid: projectUuid,  userId: currentUser.id, isSoftDeleted: false},
    join
  })

  if(!project){
    throw new UnprocessableEntityError('Project Does not Exist')
  }

  await ProjectService.updateProjectSatatus(project, newprojectstatus )

  const resData: IServerResponse<void> = {
    status: true,
  };
  return resData;
}


@Security("jwt")
@Patch("/updateprojectstage/:projectUuid")
public async handleUpdateProjectStage(@Request() req: any,  @Path("projectUuid") projectUuid: string, 
    @Body() reqBody: UpdateProjectStageRequestDto): Promise<IServerResponse<void>> {
  const currentUser: User = req.user;
  const updateProjectStage = reqBody;
  await ProjectService.updateProjectStage(currentUser, updateProjectStage, projectUuid)

  const resData: IServerResponse<void> = {
    status: true,
  };
  return resData;
}


}

