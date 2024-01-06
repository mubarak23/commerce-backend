/* eslint-disable no-await-in-loop */
import { In } from "typeorm";
import * as _ from 'underscore';
import { getFreshConnection } from "../db";
import { AddInvestorToProjectRequestDto } from '../dto/AddInvestorToProjectRequestDto';
import { AddInvestorUserDto } from '../dto/AddInvestorUserDto';
import { NewProjectRequestDto } from "../dto/NewProjectRequestDto";
import NewProjectSubscriptionRequestDto from '../dto/NewProjectSubscriptionRequestDto';
import { NewUpdateProjectRequestDto } from '../dto/NewUpdateProjectRequestDto';
import { ProcessNewProjectSubscriptionDto } from '../dto/ProcessNewProjectSubscriptionDto';
import { ProcessProjectSubscriptionTransactionDto } from "../dto/ProcessProjectSubscriptionTransactionDto";
import { ProcessProjectSubscriptionTransactionResponseDto } from '../dto/ProcessProjectSubscriptionTransactionResponseDto';
import { ProjectsResponseDto } from "../dto/ProjectResponseDto";
import { ProjectSubscriptionResponseDto } from '../dto/ProjectSubscriptionResponseDto';
import { ProjectTransactionResponseDto } from "../dto/ProjectTransactionResponseDto";
import { UpdateProjectStageRequestDto } from '../dto/UpdateProjectStageRequestDto';
import { MortageUser } from '../entity/MortageUser';
import { Project } from "../entity/Project";
import { ProjectSubscription } from '../entity/ProjectSubscription';
import { ProjectSubscriptionTransaction } from '../entity/ProjectSubscriptionTransaction';
import { User } from '../entity/User';
import NotificationMessageTypes from "../enums/NotificationMessageTypes";
import { NotificationTransportMode, NotificationTransports } from "../enums/NotificationTransport";
import { PaymentTransactionStatus } from "../enums/PaymentTransaction";
import { ProjectPaymentPlan, ProjectStatuses } from "../enums/ProjectEnums";
import { ProjectSubscriptionPaymentVariant } from '../enums/ProjectSubscriptionPaymentVariant';
import { Roles } from '../enums/Roles';
import { NotificationMetadata } from "../interfaces/NotificationMetadata";
import * as Utils from '../utils/core';
import { UnprocessableEntityError } from "../utils/error-response-types";
import * as DeveloperService from './developerService';
import * as InvestorService from './investorService';
import * as MortgageCardService from './mortgageCardService';
import * as NotificationService from './notificationService';
import * as ProfileService from './profileService';
import * as WalletService from './walletService';

export const handleCreateProject = async (payload: NewProjectRequestDto, user: User, accountId: number): Promise<Project> => {
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project)

  await isUserADeveloper(user.id)

  await DeveloperService.isDeveloperAccountApprovedAndConfirm(user.id);
  
  // check for name 
  const pendingDeveloperProject = await projectRepo.findOne({
    where: { userId: user.id, name: payload.name, isSoftDeleted: false}
  })

  if(pendingDeveloperProject){
    throw new UnprocessableEntityError('Project with the Same Name has Been Created Before')
  }

  if(payload.initialInvestmentPercentage >= 100){
    throw new UnprocessableEntityError('Initial Project Investment Percentage Cannot Be More than 100')
  }

  // if(![ProjectPaymentPlan.DAILY, ProjectPaymentPlan.WEEKLY, ProjectPaymentPlan.MONTHLY, ProjectPaymentPlan.YEARLY].includes(payload.paymentPlan)){
  //   throw new UnprocessableEntityError(`Cannot Create Project with the following Payment Plan - ${payload.paymentPlan}`)
  // }


  const newProjectTrasnaction = await connection.transaction(
    
      async (transactionalEntityManager) => {
        const projectRepoT = transactionalEntityManager.getRepository(Project)
        const newDeveloperProject = new Project().initializeProjectByDeveloper(
          payload,
          user.id,
          accountId
        );
        await projectRepoT.save(newDeveloperProject);
        return newDeveloperProject;
      }
  )
  // dispatch mail that say project is waiting for approval
  // via in_app and email 
  const domain = Utils.serverDomain()
  // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
  const notificationMetadataProject: NotificationMetadata = {
    projectUuid: newProjectTrasnaction.uuid,
  }
  const notificationTransportsProject: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true,
  }
   await NotificationService.sendSingleNotificationToUserId(user.id, user.uuid,
    NotificationMessageTypes.ESTATE_PROJECT_APPROVAL_REQUEST,
    'New Project Approval Request', `Dear ${user.firstName}, A New Project Approval Request Has Been Send. Please note our Support team will Review and Approval your Project Shortly. Thanks, CinderBuild`,
    notificationTransportsProject,  notificationMetadataProject) 

  return newProjectTrasnaction
}

export const getProjectByUuid = async (projectUuid: string): Promise<Project> => {
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project)

  const project = await projectRepo.findOne({
    where: {
      uuid: projectUuid,
      isSoftDeleted: false
    },
    join: {
      alias: "project",
      leftJoinAndSelect: {
        user: "project.user",
      },
    },
  });
  return project!;
};

export const isUserADeveloper = async (userId: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const userRepo = connection.getRepository(User)
  const mortageUserRepo = connection.getRepository(MortageUser);

  const user = await userRepo.findOne({
    where: { id: userId}
  })

  if(!user){
    throw new UnprocessableEntityError('User Not Found')
  }

  const isMortageUser = await mortageUserRepo.findOne({
    where: { userId: user.id}
  })

  if(!isMortageUser){
    throw new UnprocessableEntityError('No Mortage  User Assign to the User')
  }

  if([Roles.DEVELOPER].includes(isMortageUser.type)){
   return true
}

throw new UnprocessableEntityError('Only Developer Can Create Mortage Project')

}

export const isUserAnInvestor = async (userId: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const userRepo = connection.getRepository(User)
  const mortageUserRepo = connection.getRepository(MortageUser);

  const user = await userRepo.findOne({
    where: { id: userId}
  })

  if(!user){
    throw new UnprocessableEntityError('User Not Found')
  }

  const isMortageUser = await mortageUserRepo.findOne({
    where: { userId: user.id}
  })

  if(!isMortageUser){
    throw new UnprocessableEntityError('No Mortage  User Assign to the User')
  }

  if([Roles.INVESTOR].includes(isMortageUser.type)){
   return true
}

throw new UnprocessableEntityError('Only An Investor Can Subscribe to a Project')

}

export const handleSubscribeToProject = async (payload: NewProjectSubscriptionRequestDto, user: User, 
  projectSubscriptionPaymentVariant: ProjectSubscriptionPaymentVariant): Promise<ProjectSubscriptionResponseDto> => {
  
  await isUserAnInvestor(user.id);

  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);

  const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
  
  const join = {
    alias: "project",
    leftJoinAndSelect: {
      user: "project.user",
    },
  };

  const project = await projectRepo.findOne({
    where: { uuid: payload.projectUuid, isSoftDeleted: false},
    join
  })
  if(!project){
    throw new UnprocessableEntityError('Project Does Not Exist')
  }

  if([ProjectStatuses.CLOSED, ProjectStatuses.DECLINED, ProjectStatuses.PENDING].includes(project.status)){
    throw new UnprocessableEntityError('Cannot Subscribe to a project in this Current Status')
 }

 if(project.numberOfSlots === 0){
  throw new UnprocessableEntityError('Project Does Not Have Available Slot')
 }

 // is available slot more than or equal to the payload.numberofslot
 if(project.numberOfSlots < payload.numberOfSlot){
  throw new UnprocessableEntityError('Cannot Subscribe to a project with less than the number of slot selected')
 }

 const exisitngProjectSubscription = await projectSubscriptionRepo.findOne({
  where: { projectId: project.id, investorUserId: user.id }
})

if(exisitngProjectSubscription){
  throw new UnprocessableEntityError('Subscription Already Exist')
}

await isProjectOpenForSubscription(project);
 const totalCostPayment = payload.totalCost;

 const totalCostPaymentMinor = totalCostPayment * 100;

 const userWallet = await WalletService.getCustomerWallet(user.id)
 if(userWallet.walletBalanceMinor < 0){
  throw new UnprocessableEntityError('Insufficient Balance to Process this Project Subscription')
 }


 if(userWallet.walletBalanceMinor < totalCostPaymentMinor){
  throw new UnprocessableEntityError('Insufficient Balance to Process this Project Subscription')
 }
 
 const totalSubscriptionAmount = parseFloat((payload.numberOfSlot * project.costPerSlot).toFixed(2))
 const intialPaymentAmount = await calculateIntialPaymentAmount(project, totalSubscriptionAmount);

 console.log('totalSubscriptionAmount', totalSubscriptionAmount)
 
 if(totalCostPayment > totalSubscriptionAmount){
  throw new UnprocessableEntityError(`Payment Amount Must be Greater Than or Eqaul to initial Percentage Amount - ${intialPaymentAmount}`)
 }

 console.log('intialPaymentAmount', intialPaymentAmount)
 if(totalCostPayment < intialPaymentAmount){
  throw new UnprocessableEntityError(`Payment Amount Must be Greater Than or Eqaul to initial Percentage Amount - ${intialPaymentAmount}`)
}

// old implementation
 // const remainingSubscriptionAmount = totalSubscriptionAmount - intialPaymentAmount

 const remainingSubscriptionAmount = totalSubscriptionAmount - totalCostPayment

 const amountPerpaymentPlan = await calculateAmountPerPaymentPlan(project, remainingSubscriptionAmount);

  const newInvestorProjectSubscription = await createProjectSubscription(payload, user, project, 
    totalSubscriptionAmount, totalCostPayment, remainingSubscriptionAmount,  amountPerpaymentPlan)
    const projectImages = project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))
  
    const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(project.user);
  
    const investorPublicProfile = await ProfileService.getPublicMortageUserProfile(user);
  
    const projectResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile,
      project,
      projectResponseImages
    )

 if(projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant.WALLET){
  
  // projectSubscriptionPaymentViaWallet

  const successChargeWallet =  await WalletService.projectSubscriptionPaymentViaWallet(project.id, newInvestorProjectSubscription.id, 
     project.userId, user.id, totalCostPayment, remainingSubscriptionAmount, newInvestorProjectSubscription, project);
  // update project susbscription
  
  await activateProjectSubscription(newInvestorProjectSubscription, user); 

  await updateProjectNumberOfSlot(project, payload.numberOfSlot)
 
  const join = {
    alias: "project_susbscription_transactions",
    leftJoinAndSelect: {
      projectSubscription: "project_susbscription_transactions.projectSubscription",
      project: "project_susbscription_transactions.project",
      developer: "project_susbscription_transactions.developer",
      investor: "project_susbscription_transactions.investor",
    },
  }

  const projectSubscription = await projectSubscriptionRepo.findOne({
    where: { id: newInvestorProjectSubscription.id}
  })

  await updateProjectSubscriptionDuration(projectSubscription!, user, projectSubscription!.duration)

  const projectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
    where: {  projectSubscriptionId: projectSubscription!.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID },
    join
  })

  const projectSubscriptionTransactionSoFar = await projectSubscriptionTransactionRepo.find({
    where: {  projectSubscriptionId: projectSubscription!.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID }
  })
const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;

const afterprojectSubscriptionPayment = await projectSubscriptionRepo.findOne({
  where: { id: newInvestorProjectSubscription.id, status: ProjectStatuses.ACTIVE}
})
 //  await spreadAmountPerPaymentPlanPerSubscription(projectSubscription!, user, project.user, project, projectSubscriptionTransaction!, new Date(), project.duration)
  // if(afterprojectSubscriptionPayment!.amountRemainingMinor !== 0){
  //   console.log('afterprojectSubscriptionPayment!.amountRemainingMinor', afterprojectSubscriptionPayment!.amountRemainingMinor)
  //   await nextPendingRecurrentPayment(projectSubscriptionTransaction!.projectSubscription, project, user, project.user, projectSubscriptionTransaction!, durationPaymentCovered)

  // }
  
  if(totalCostPayment !== totalSubscriptionAmount){
   
    await nextPendingRecurrentPayment(projectSubscriptionTransaction!.projectSubscription, project, user, project.user, projectSubscriptionTransaction!, durationPaymentCovered)

  }
  
  
  const projectSubscriptionResponse: ProjectSubscriptionResponseDto = newInvestorProjectSubscription.toResponseDto(
    projectSubscription!,
    project.uuid,
    projectResponse,
    investorPublicProfile,
    developerPublicProfile,
    undefined,
    projectSubscription!.initialAmountMinor
  )

  return projectSubscriptionResponse;
  
 } if(projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant.CARD){
  // call card payment provider 

  const projectSubscriptionResponse: ProjectSubscriptionResponseDto = newInvestorProjectSubscription.toResponseDto(
    newInvestorProjectSubscription!,
    project.uuid,
    projectResponse,
    investorPublicProfile,
    developerPublicProfile
  )

  return projectSubscriptionResponse
 }

 const projectSubscriptionResponse: ProjectSubscriptionResponseDto = newInvestorProjectSubscription.toResponseDto(
  newInvestorProjectSubscription!,
  project.uuid,
  projectResponse,
  investorPublicProfile,
  developerPublicProfile
)

 return projectSubscriptionResponse;

}

// projectSubscription!, user, project.user, project, projectSubscriptionTransaction!, new Date(), project.duration

export const nextPendingRecurrentPayment = async (susbscription: ProjectSubscription, project: Project, investor: User, developer: User,  projectSubscriptionTransaction: ProjectSubscriptionTransaction, durationPaymentCovered: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
 //  susbscription.durationLeft 
  const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
  console.log('amountBeforeMinor', amountBeforeMinor)
  console.log('susbscription.amountPerPaymentPlanDurationMinor', susbscription.amountPerPaymentPlanDurationMinor)
  const amountRemainingMinor = Number((susbscription.amountRemainingMinor).toFixed(2));
  console.log('amountRemainingMinor', amountRemainingMinor)
  console.log('susbscription.durationLeft',susbscription.durationLeft)
  const amountPaidMinor = parseFloat((amountRemainingMinor / susbscription.durationLeft).toFixed(2))
  console.log('amountPaidMinor', amountPaidMinor)
  const amountAfterMinor =  parseFloat((amountBeforeMinor + susbscription.amountPerPaymentPlanDurationMinor).toFixed(2))
  console.log('amountAfterMinor', amountAfterMinor)
  console.log('projectSubscriptionTransaction.nextPaymentDate', projectSubscriptionTransaction.nextPaymentDate);
  const nextPaymentDate = Utils.nextPaymentDate30days(projectSubscriptionTransaction.nextPaymentDate);
  const projectSubscriptionPaymentTransaction: ProcessProjectSubscriptionTransactionDto = {
    investorUserId: investor.id,
    developerUserId: developer.id,
    projectId: project.id,
    projectSubscriptionId: susbscription.id,
    amountBeforeMinor,
    amountPaidMinor,
    amountAfterMinor,
    amountRemainingMinor,
    financialTransactionId: 0,
    description: `Project Subscription Payment for Month -  ${durationPaymentCovered}`,
    paymentPlanDurationNumber: durationPaymentCovered,
    nextPaymentDate,
  }
  
  const newProjectSubscriptionTransaction = new ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction)
 const saveProjectSubscriptionTransaction =  await projectSubscriptionTransactionRepo.save(newProjectSubscriptionTransaction);
  
  await projectSubscriptionTransactionRepo
  .createQueryBuilder()
  .update(ProjectSubscriptionTransaction)
  .set({ 
    isPaid: false,
    paidStatus: PaymentTransactionStatus.UNPAID,
    nextPaymentDate 
  })
  .where({ id: saveProjectSubscriptionTransaction.id })
  .execute();
  
  return true;
}



export const isProjectOpenForSubscription = async (project: Project): Promise<boolean> => {
  
const currentDateFormatted = Utils.currentDateFormatted();
const currentDate = new Date(currentDateFormatted);
currentDate.setHours(0, 0, 0, 0);
const projectStartDate = new Date(project.startDate); // Assuming project.startDate is also in 'YYYY-MM-DD' format
projectStartDate.setHours(0, 0, 0, 0);


if ( currentDate < projectStartDate) {
  throw new UnprocessableEntityError("Project start date must be greater than or equal to the current date.");
}
return true;
}

export const updateProjectNumberOfSlot = async (project: Project, numberOfSlots: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);

  await projectRepo
  .createQueryBuilder()
  .update(Project)
  .set({
    numberOfSlots: project.numberOfSlots - numberOfSlots
  })
  .where({ id: project.id })
  .execute(); 
  
  return true;
}

export const updatedNewInvesotProjectSubscriptionDuration = async (projectSubscription: ProjectSubscription, user: User, durationLeft: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);

  await projectSubscriptionRepo
  .createQueryBuilder()
  .update(ProjectSubscription)
  .set({
    durationLeft,
    durationCovered: projectSubscription.duration - durationLeft
  })
  .where({ id: projectSubscription.id, investorUserId: user.id })
  .execute(); 
  
  return true;
}

export const updateProjectSubscriptionDuration = async (projectSubscription: ProjectSubscription, user: User, durationLeft: number): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);

  console.log('durationLeft', durationLeft)
  console.log('durationCovered:', projectSubscription.duration - durationLeft)
  await projectSubscriptionRepo
  .createQueryBuilder()
  .update(ProjectSubscription)
  .set({
    durationLeft,
    durationCovered: projectSubscription.duration - durationLeft
  })
  .where({ id: projectSubscription.id, investorUserId: user.id })
  .execute(); 
  
  return true;
}

export const activateProjectSubscription = async (projectSubscription: ProjectSubscription, user: User): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);

  await projectSubscriptionRepo
  .createQueryBuilder()
  .update(ProjectSubscription)
  .set({
    status: ProjectStatuses.ACTIVE
  })
  .where({ id: projectSubscription.id, investorUserId: user.id })
  .execute(); 
  
  return true;
}

export const calculateAmountPerPaymentPlan = async (project: Project, remainingSubscriptionAmount: number, durationLeft?: number): Promise<number> => {
 
  if(durationLeft){
    const amountPerPaymentPlanMajor = remainingSubscriptionAmount / durationLeft
  const amountPerPaymentPlanFormatted =  parseFloat(amountPerPaymentPlanMajor.toFixed(2));
  return amountPerPaymentPlanFormatted;
  }
  
  const amountPerPaymentPlanMajor = remainingSubscriptionAmount / project.duration
  const amountPerPaymentPlanFormatted =  parseFloat(amountPerPaymentPlanMajor.toFixed(2));
  return amountPerPaymentPlanFormatted;
}


export const calculateIntialPaymentAmount = async (project: Project, totalSubscriptionAmount: number): Promise<number> => {
  const intialPaymentAmount  = totalSubscriptionAmount * (project.initialInvestmentPercentage / 100)
  const formattedintialPaymentAmount = parseFloat(intialPaymentAmount.toFixed(2));
  return formattedintialPaymentAmount;
}


export const createProjectSubscription = async (payload:NewProjectSubscriptionRequestDto, 
  investor: User, project: Project, totalSubscriptionAmount: number, intialPaymentAmount: number,
   remainingSubscriptionAmount: number, amountPerpaymentPlan: number ): Promise<ProjectSubscription> => {

    const connection = await getFreshConnection();
    const projectRepo = connection.getRepository(ProjectSubscription);
  

    const projectSunscriptionPayload: ProcessNewProjectSubscriptionDto = {
      investorUserId: investor.id,
      developerUserId: project.userId,
      projectId: project.id,
      numberOfSlots: payload.numberOfSlot,
      totalAmountMinor: totalSubscriptionAmount * 100,
      initialAmountMinor: intialPaymentAmount * 100,
      amountRemainingMinor: remainingSubscriptionAmount * 100,
      amountPerPaymentPlanDurationMinor:  amountPerpaymentPlan * 100,
      durationPerPaymentPlan: ProjectPaymentPlan.MONTHLY,
      duration: project.duration
    }

    const newInvestorProjectSubscription = new ProjectSubscription().initializeInvestorProjectSubscription(
      projectSunscriptionPayload
    );
   

    await projectRepo.save(newInvestorProjectSubscription);

    return newInvestorProjectSubscription

}

export const updateProjectDetails = async (payload: NewUpdateProjectRequestDto,userId: number, projectUuid: string, ): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);

  const projectDetails = await projectRepo.findOne({
    where: { uuid: projectUuid, userId }
  })
  if(!projectDetails){
    throw new UnprocessableEntityError('Project Does not Exist')
  }

  if([ProjectStatuses.ACTIVE, ProjectStatuses.DECLINED, ProjectStatuses.CLOSED].includes(projectDetails.status)){
    throw new UnprocessableEntityError(`Cannot Update Project Details in ${projectDetails.status} Status`)
  }
  
  if(payload.paymentPlan){
    if(![ProjectPaymentPlan.DAILY, ProjectPaymentPlan.WEEKLY, ProjectPaymentPlan.MONTHLY, ProjectPaymentPlan.YEARLY].includes(payload.paymentPlan)){
      throw new UnprocessableEntityError(`Cannot Update Project Payment Plan with ${projectDetails.paymentPlan}`)
    }
  }
  const updateQuery: any = payload;

  updateQuery.paymentPlan = ProjectPaymentPlan.MONTHLY; 

  projectRepo
  .createQueryBuilder()
  .update(Project)
  .set(updateQuery)
  .where({
    uuid: projectDetails.uuid,
  })
  .execute();

   return true;
}


export const transformProject = async (project: Project, user: User): Promise<ProjectsResponseDto> => {
  
  const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(user);
  
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

  const projectSubscriptions = await projectSubscriptionRepo.find({
    where: { projectId: project.id, isSoftDeleted: false},
    join
  })
  
  const projectImages = project.images || []
  const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
  projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

  let numberOfSlotSold = 0;
  if(projectSubscriptions.length !== 0){
    
    
     numberOfSlotSold = projectSubscriptions.reduce((accumulator, subscription) => {
      // Add your logic to access the 'numberOfSlots' property
      const numberOfSlots = subscription.numberOfSlots || 0; // Replace 'numberOfSlots' with your actual property name
      return accumulator + numberOfSlots;
    }, 0);

    const transformProjectSubscriptionsResponse = await transformProjectSubscriptions(projectSubscriptions)
    const projectResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile,
      project,
      projectResponseImages,
      transformProjectSubscriptionsResponse,
      numberOfSlotSold
    )
  
    return projectResponse;

  }
  const projectResponse: ProjectsResponseDto = project.toResponseDto(
    developerPublicProfile,
    project,
    projectResponseImages
  )

  return projectResponse;
};

export const transformProjects = async (user: User): Promise<ProjectsResponseDto[]> => {

  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);

  await isUserADeveloper(user.id)

  const join = {
    alias: "project",
    leftJoinAndSelect: {
      user: "project.user",
    },
  };

  const projects = await projectRepo.find({
    where: { userId: user.id, isSoftDeleted: false},
    join
  })
  if(!projects.length) {
    return []
  }

  const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(user);


  const projectsResponse: ProjectsResponseDto[] = []

  for(const project of projects) {
    
    const projectImages = project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))


    const oneProjectsResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile,
      project,
      projectResponseImages
    )
    projectsResponse.push(oneProjectsResponse)
  }

  return projectsResponse;
};

export const transformPublicProjects = async (projects: Project[]): Promise<ProjectsResponseDto[]> => {


  const developerUserIds = projects.map((project) => project.userId);


  const developerPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
  const projectsResponse: ProjectsResponseDto[] = []

  for(const project of projects) {
    
    const developerPublicProfile = developerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === project.user.uuid
    );

    const projectImages = project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))


    const oneProjectsResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile!,
      project,
      projectResponseImages
    )
    projectsResponse.push(oneProjectsResponse)
  }

  return projectsResponse;
};


export const transformPublicProject = async (project: Project): Promise<ProjectsResponseDto> => {
  
  
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

  const projectSubscriptions = await projectSubscriptionRepo.find({
    where: { projectId: project.id, isSoftDeleted: false},
    join
  })
  
  const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(project.user);


  const projectImages = project.images || []
  const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
  projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

   if(projectSubscriptions.length !== 0){

    const transformProjectSubscriptionsResponse = await transformProjectSubscriptions(projectSubscriptions)
    const projectResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile,
      project,
      projectResponseImages,
      transformProjectSubscriptionsResponse
    )
  
    return projectResponse;

  }

  const projectResponse: ProjectsResponseDto = project.toResponseDto(
    developerPublicProfile,
    project,
    projectResponseImages
  )

  return projectResponse;
};


export const updateProjectSatatus = async ( project: Project, status: ProjectStatuses) => {
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);

  if(project.status === status){
    throw new UnprocessableEntityError('Cannot Update Project in it current status') 
  }

  projectRepo
  .createQueryBuilder()
  .update(Project)
  .set({ status })
  .where({
    uuid: project.uuid,
  })
  .execute();

  // diapatch mail if status == 'ACTIVE' for project approval;

  if(status === ProjectStatuses.DECLINED){
     // dispatch mail that say project is waiting for approval
  // via in_app and email 
  const domain = Utils.serverDomain()
  // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
  const notificationMetadataProject: NotificationMetadata = {
    projectUuid: project.uuid,
  }
  const notificationTransportsProject: NotificationTransports = {
    [NotificationTransportMode.IN_APP]: true,
    [NotificationTransportMode.EMAIL]: true,
  }
   await NotificationService.sendSingleNotificationToUserId(project.userId, project.user.uuid,
    NotificationMessageTypes.ESTATE_PROJECT_DECLINED,
    'Project Approval Request Decline', `Dear ${project.user.firstName}, The Project with the Name ${project.name} has Been Decline. Thanks, CinderBuild`,
    notificationTransportsProject,  notificationMetadataProject) 
  }

  if(status === ProjectStatuses.ACTIVE){
    // dispatch mail that say project is Approved
 // via in_app and email 
 const domain = Utils.serverDomain()
 // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
 const notificationMetadataProject: NotificationMetadata = {
   projectUuid: project.uuid,
 }
 const notificationTransportsProject: NotificationTransports = {
   [NotificationTransportMode.IN_APP]: true,
   [NotificationTransportMode.EMAIL]: true,
 }
  await NotificationService.sendSingleNotificationToUserId(project.userId, project.user.uuid,
   NotificationMessageTypes.ESTATE_PROJECT_APPROVED,
   'Project Has Been Approved', `Dear ${project.user.firstName}, The Project with the Name ${project.name} has Been Approved. Thanks, CinderBuild`,
   notificationTransportsProject,  notificationMetadataProject) 
 }

  // diapatch mail if status == 'PENDING' for project decline;  

}

export const transformProjectSubscriptions = async (projectSubscriptions: ProjectSubscription[]): Promise<ProjectSubscriptionResponseDto[]> => {

  const connection = await getFreshConnection();
  const subscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction);

  const developerUserIds = projectSubscriptions.map((subscription) => subscription.developerUserId);

  const investorUserIds = projectSubscriptions.map((subscription) => subscription.investorUserId);


  const developerPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(developerUserIds);

  const investorPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(investorUserIds);

  const projectSubscriptionsResponse: ProjectSubscriptionResponseDto[] = []

  const projectSubscriptionIds = projectSubscriptions.map((subscription) => subscription.id);
  const projectSubscriptionPaymentTransactions = await subscriptionTransactionRepo.find({
    where: { projectSubscriptionId: In(projectSubscriptionIds)}
  })
  for(const subscription of projectSubscriptions) {
    const developerPublicProfile = developerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === subscription.developer.uuid
    );

    const investorPublicProfile = investorPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === subscription.investor.uuid
    );


    const projectImages = subscription.project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

    const transactionSubscriptions = projectSubscriptionPaymentTransactions.filter(
      (transaction) => transaction.projectSubscriptionId === subscription.id && transaction.isPaid === true
    )
    let totalSubscriptionAmountPaidMinor = 0;
    const amountPaidMinorArray =  transactionSubscriptions.map(item => item.amountPaidMinor)
    totalSubscriptionAmountPaidMinor =  amountPaidMinorArray.reduce((total: number, amountPaidMinor: number) => total + amountPaidMinor, 0);
  
    
    const projectRersponse: ProjectsResponseDto = subscription.project.toResponseDto(
      developerPublicProfile!,
      subscription.project,
      projectResponseImages,
    ) 
    const oneProjectSubscriptionResponse: ProjectSubscriptionResponseDto = subscription.toResponseDto(
      subscription,
      subscription.project.uuid,
      projectRersponse,
      investorPublicProfile!,
      developerPublicProfile!,
      undefined,
      totalSubscriptionAmountPaidMinor
    )
    projectSubscriptionsResponse.push(oneProjectSubscriptionResponse)
  }

  return projectSubscriptionsResponse;
};

export const transformProjectSubscription = async (projectSubscription: ProjectSubscription, developer: User): Promise<ProjectSubscriptionResponseDto> => {
  const connection = await getFreshConnection();

  const subscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction);
  
  const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(projectSubscription.developer);

  const investorPublicProfile = await ProfileService.getPublicMortageUserProfile(projectSubscription.investor);

  
  const projectImages = projectSubscription.project.images || []
  const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
  projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

  const projectRersponse: ProjectsResponseDto = projectSubscription.project.toResponseDto(
    developerPublicProfile!,
    projectSubscription.project,
    projectResponseImages,
  ) 

  const join = {
    alias: "project_susbscription_transactions",
    leftJoinAndSelect: {
      projectSubscription: "project_susbscription_transactions.projectSubscription",
      project: "project_susbscription_transactions.project",
    },
  }

  const transactionSubscriptions = await subscriptionTransactionRepo.find({
    where: { projectSubscriptionId: projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID }, join
  })
  const unpaidTransactionSubscriptions = await subscriptionTransactionRepo.find({
    where: { projectSubscriptionId: projectSubscription.id, isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID }, join
  })

  let nextPaymentDueDate
  if(unpaidTransactionSubscriptions){
    nextPaymentDueDate = new Date(unpaidTransactionSubscriptions[0].nextPaymentDate);
    
  }
  nextPaymentDueDate = new Date();
  

  if(transactionSubscriptions){
    let totalSubscriptionAmountPaidMinor = 0;
   const amountPaidMinorArray =  transactionSubscriptions.map(item => item.amountPaidMinor)
   totalSubscriptionAmountPaidMinor =  amountPaidMinorArray.reduce((total: number, amountPaidMinor: number) => total + amountPaidMinor, 0);
    
  
   const susbscriptionTransactionsReponse: ProcessProjectSubscriptionTransactionResponseDto[] = []
    for(const transaction of transactionSubscriptions) {
        const oneTransactionResponse = transaction.toResponseDto(transaction);
        susbscriptionTransactionsReponse.push(oneTransactionResponse)
    }
    
    const projectResponse: ProjectSubscriptionResponseDto = projectSubscription.toResponseDto(
        projectSubscription,
        projectSubscription.project.uuid,
        projectRersponse,
        investorPublicProfile!,
        developerPublicProfile!,
        susbscriptionTransactionsReponse,
        totalSubscriptionAmountPaidMinor,
        nextPaymentDueDate
    )
    return projectResponse;
  }
  const projectResponse: ProjectSubscriptionResponseDto = projectSubscription.toResponseDto(
    projectSubscription,
    projectSubscription.project.uuid,
      projectRersponse,
      investorPublicProfile!,
      developerPublicProfile!
  )

  return projectResponse;
};

export const transformProjectSubscriptionTransactions = async (projectSubscriptionTransactions: ProjectSubscriptionTransaction[], currentUser: User): Promise<ProjectTransactionResponseDto[]> => {

  const connection = await getFreshConnection();
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription);

  const developerUserIds = projectSubscriptionTransactions.map((transaction) => transaction.developerUserId);

  const developerPublicProfiles = await ProfileService.getPublicMortageUserFromUserIds(developerUserIds);

  const investorPublicProfile = await ProfileService.getPublicMortageUserProfile(currentUser);

  const projectSubscriptionTransactionsResponse: ProjectTransactionResponseDto[] = []

  const projectSubscriptionIds = projectSubscriptionTransactions.map((subscription) => subscription.projectSubscriptionId);
  const projectSubscriptions = await projectSubscriptionRepo.find({
    where: { id: In(projectSubscriptionIds), investorUserId: currentUser.id}
  })
  for(const transaction of projectSubscriptionTransactions) {

    const oneSusbscription = projectSubscriptions.find(
      (subscription) =>subscription.id === transaction.projectSubscription.id
    );
    
    const developerPublicProfile = developerPublicProfiles.find(
      (publicProfile) => publicProfile.userUuid === transaction.developer.uuid
    );

    const projectImages = transaction.project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))
  
    const projectResponse: ProjectsResponseDto = transaction.project.toResponseDto(
      developerPublicProfile!,
      transaction.project,
      projectResponseImages
    )

    const projectSubscriptionResponse: ProjectSubscriptionResponseDto = oneSusbscription!.toResponseDto(
      oneSusbscription!,
      transaction.project.uuid,
      projectResponse,
      investorPublicProfile,
      developerPublicProfile!
    )

    const oneProjectSubscriptionTransactionResponse: ProjectTransactionResponseDto = transaction.toProjectTransactionResponseDto(
      transaction,
      projectResponse,
      investorPublicProfile,
      projectSubscriptionResponse
    )
    projectSubscriptionTransactionsResponse.push(oneProjectSubscriptionTransactionResponse)
  }

  return projectSubscriptionTransactionsResponse;
};

export const transformProjectSubscriptionTransaction = async (projectSubscriptionTransaction: ProjectSubscriptionTransaction, currentUser: User): Promise<ProjectTransactionResponseDto> => {
 

  const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(projectSubscriptionTransaction.developer);

  const investorPublicProfile = await ProfileService.getPublicMortageUserProfile(currentUser);

  
  const projectImages = projectSubscriptionTransaction.project.images || []
  const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
  projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))

 
  const projectResponse: ProjectsResponseDto = projectSubscriptionTransaction.project.toResponseDto(
    developerPublicProfile!,
    projectSubscriptionTransaction.project,
    projectResponseImages
  )


  const projectSubscriptionResponse: ProjectSubscriptionResponseDto = projectSubscriptionTransaction.projectSubscription.toResponseDto(
    projectSubscriptionTransaction.projectSubscription,
    projectSubscriptionTransaction.project.uuid,
    projectResponse,
    developerPublicProfile,
    investorPublicProfile
  )


  const oneProjectSubscriptionTransactionResponse: ProjectTransactionResponseDto = projectSubscriptionTransaction.toProjectTransactionResponseDto(
    projectSubscriptionTransaction,
    projectResponse,
    investorPublicProfile,
    projectSubscriptionResponse
  )

  return oneProjectSubscriptionTransactionResponse;
}



export const addInvestorToProjectSubscription = async (developer: User, payload: AddInvestorToProjectRequestDto): Promise<ProjectSubscriptionResponseDto> => {
 
  const connection = await getFreshConnection();
  const projectRepo = connection.getRepository(Project);
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription)
  const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
  
  const join = {
    alias: "project",
    leftJoinAndSelect: {
      user: "project.user",
    },
  };
  const project = await projectRepo.findOne({
    where: { uuid: payload.projectUuid, userId: developer.id, status: ProjectStatuses.ACTIVE, isSoftDeleted: false},
    join
  })

  if(!project){
    throw new UnprocessableEntityError("Project Does Not Exist");
  }
  // addinvestor  InvestorService
  const newInvestorPayload : AddInvestorUserDto = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    emailAddress: payload.emailAddress,
    phoneNumber: payload.phoneNumber,
  }

  const newInvestorUser: User = await InvestorService.addinvestor(newInvestorPayload);

  // calculate remaining balance 

  const investorRemainingBalance = await calculateInvestorRemainingBalance(payload, project)

  const amountPerpaymentPlan = await calculateAmountPerPaymentPlan(project, investorRemainingBalance, payload.durationLeft);

  const totalSubscriptionAmount: number = parseInt(( project.costPerSlot * payload.numberOfSlots).toFixed(2));
  const newInvestorProjectSubscriptionPayload: NewProjectSubscriptionRequestDto = {
    projectUuid: project.uuid,
    numberOfSlot: payload.numberOfSlots, 
    totalCost: totalSubscriptionAmount
  }
  const newInvestorProjectSubscription = await createProjectSubscription(newInvestorProjectSubscriptionPayload, newInvestorUser, project, 
    totalSubscriptionAmount, totalSubscriptionAmount, investorRemainingBalance,  amountPerpaymentPlan)
   // create subscription project transaction payment 
       const projectSubscriptionPaymentTransaction: ProcessProjectSubscriptionTransactionDto = {
        investorUserId: newInvestorUser.id,
        developerUserId: developer.id,
        projectId: project.id,
        projectSubscriptionId: newInvestorProjectSubscription.id,
        amountBeforeMinor: 0,
        amountPaidMinor: payload.amountPaid * 100,
        amountAfterMinor:   payload.amountPaid * 100,
        amountRemainingMinor: investorRemainingBalance * 100,
        financialTransactionId: 0,
        description: 'Existing Project Subscription Payment',
        paymentPlanDurationNumber: 0,
        nextPaymentDate:  (new Date()).toISOString(),
      }
      
      const recordProjectSubscriptionTransaction = new ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction)
      const firstSaveProjectSubscriptionTransaction = await projectSubscriptionTransactionRepo.save(recordProjectSubscriptionTransaction);
      
      await projectSubscriptionTransactionRepo
      .createQueryBuilder()
      .update(ProjectSubscriptionTransaction)
      .set({ 
        isPaid: true,
        paidStatus: PaymentTransactionStatus.PAID
      })
      .where({ id: recordProjectSubscriptionTransaction.id })
      .execute();

    const projectImages = project.images || []
    const projectResponseImages: {url: string, mimetype: string, keyFromCloudProvider: string }[] = 
    projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'))
  
    const developerPublicProfile = await ProfileService.getPublicMortageUserProfile(project.user);
  
    const investorPublicProfile = await ProfileService.getPublicMortageUserProfile(newInvestorUser);
  
    const projectResponse: ProjectsResponseDto = project.toResponseDto(
      developerPublicProfile,
      project,
      projectResponseImages
    )

  
  await activateProjectSubscription(newInvestorProjectSubscription, newInvestorUser); 

  await updatedNewInvesotProjectSubscriptionDuration(newInvestorProjectSubscription, newInvestorUser, payload.durationLeft)
  
  await updateProjectSubscriptionDate(newInvestorProjectSubscription, payload.susbscriptionDate, newInvestorUser);
  
  await updateProjectNumberOfSlot(project, payload.numberOfSlots)
 

  const projectSubscription = await projectSubscriptionRepo.findOne({
    where: { id: newInvestorProjectSubscription.id, status: ProjectStatuses.ACTIVE}
  })

  // await spreadAmountPerPaymentPlanPerSubscription(projectSubscription!, newInvestorUser, developer, project, recordProjectSubscriptionTransaction, payload.susbscriptionDate, payload.durationLeft)
  const durationPaymentCovered = project.duration - payload.durationLeft;
  
  if(projectSubscription!.amountRemainingMinor !== 0){
   //  console.log('afterprojectSubscriptionPayment!.amountRemainingMinor', afterprojectSubscriptionPayment!.amountRemainingMinor)
    await nextPendingRecurrentPayment(projectSubscription!, project, newInvestorUser, project.user, firstSaveProjectSubscriptionTransaction!, durationPaymentCovered)

  }
  const projectSubscriptionResponse: ProjectSubscriptionResponseDto = newInvestorProjectSubscription.toResponseDto(
    projectSubscription!,
    project.uuid,
    projectResponse,
    investorPublicProfile,
    developerPublicProfile,
    undefined,
    firstSaveProjectSubscriptionTransaction.amountPaidMinor
  )

  return projectSubscriptionResponse;

}

export const paymentForRecurrentSubscriptionTransansaction = async (totalCost: number, transactionUuid: string, investor: User, projectSubscriptionPaymentVariant: ProjectSubscriptionPaymentVariant): Promise<boolean> => {
  const connection = await getFreshConnection();
  const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription) 

  const join = {
    alias: "project_susbscription_transactions",
    leftJoinAndSelect: {
      projectSubscription: "project_susbscription_transactions.projectSubscription",
      project: "project_susbscription_transactions.project",
      developer: "project_susbscription_transactions.developer",
      investor: "project_susbscription_transactions.investor",
    },
  }
  console.log('totalCost', totalCost)
  const totalCostPayment = parseFloat((totalCost).toFixed(2))

  console.log('totalCostPayment', totalCostPayment)
  const projectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
    where: { uuid:transactionUuid, investorUserId: investor.id,  isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID },
    join
  })

  if(!projectSubscriptionTransaction){
    throw new UnprocessableEntityError('Pending Recurent Subscription Payment  Does Not Exist')
  }
  

  const amountPaidMajor = parseFloat((projectSubscriptionTransaction.amountPaidMinor / 100 ).toFixed(2))
  const remainingSubscriptionAmount = parseFloat((projectSubscriptionTransaction.projectSubscription.amountRemainingMinor / 100).toFixed(2))
  


  if(totalCostPayment <= 0 ){
    throw new UnprocessableEntityError(`Recurrent Payment Amount Must be Greater or Equal to ${amountPaidMajor} `)
  }
  
  if(totalCostPayment > remainingSubscriptionAmount ) {
    throw new UnprocessableEntityError(`Recurrent Payment Amount Cannot Be More Than Subscripton Remaining balance ${remainingSubscriptionAmount} `)
  }

  if(totalCostPayment < amountPaidMajor) {
    throw new UnprocessableEntityError(`Recurrent Payment Amount Must be Greater or Equal to ${amountPaidMajor} `)
  }

  if(projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant.WALLET){
    await WalletService.payRecurrentSubscriptionAmountViaWallet(
      projectSubscriptionTransaction,
      projectSubscriptionTransaction.projectSubscription,
      projectSubscriptionTransaction.developerUserId,
      investor.id,
      totalCostPayment,
      `Recurrent Payment For Subscription for date - ${projectSubscriptionTransaction.nextPaymentDate}`
    )  
    
    const paidProjectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
      where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID },
      join
    })

    const durationLeft = paidProjectSubscriptionTransaction!.projectSubscription.durationLeft - 1;
    console.log('durationLeft', durationLeft)

    await updateProjectSubscriptionDuration(paidProjectSubscriptionTransaction!.projectSubscription, investor,durationLeft )      
    
    const paidUpdatedProjectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
      where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID },
      join
    })
    const projectSubscriptionTransactionSoFar = await projectSubscriptionTransactionRepo.find({
      where: {  projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID },
      join
    })
    
  const projectSubscription = await projectSubscriptionRepo.findOne({

    where: { id:paidUpdatedProjectSubscriptionTransaction!.projectSubscriptionId, investorUserId: investor.id }
  }) 
 
  const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;
  
  const amountRemainingMajor = parseFloat((projectSubscriptionTransaction.projectSubscription.amountRemainingMinor /100 ).toFixed(2))

    if(totalCostPayment !== amountRemainingMajor){
    await nextPendingRecurrentPayment(projectSubscription!, projectSubscriptionTransaction.project, investor, projectSubscriptionTransaction.developer, paidUpdatedProjectSubscriptionTransaction!, durationPaymentCovered)
    }

    
    return true;
  }
  
  if(projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant.CARD){
    throw new UnprocessableEntityError('Payment Method Does Not Exist')
  }

  if(projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant.MONO){
     // processDirectPayRequestviaMono
    await MortgageCardService.processDirectPayRequestviaMono(investor, projectSubscriptionTransaction, totalCost)
    return true;
  }

  throw new UnprocessableEntityError('No Payment Method Selected')
 
}

export const processMonoWebhook =  async (): Promise<boolean> => {
//   const durationLeft = projectSubscriptionTransaction.projectSubscription.duration - 1;

//   const paidProjectSubscriptionTransaction = await projectSubscriptionTransactionRepo.findOne({
//     where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID }
//   })
  
//   const projectSubscriptionTransactionSoFar = await projectSubscriptionTransactionRepo.find({
//     where: {  projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransactionStatus.PAID }
//   })
// const durationPaymentCovered = projectSubscriptionTransactionSoFar.length;

// const amountRemainingMajor = parseFloat((projectSubscriptionTransaction.projectSubscription.amountRemainingMinor /100 ).toFixed(2))

//   if(totalCostPayment !== amountRemainingMajor){
//   await nextPendingRecurrentPayment(projectSubscriptionTransaction.projectSubscription, projectSubscriptionTransaction.project, investor, projectSubscriptionTransaction.developer, paidProjectSubscriptionTransaction!, durationPaymentCovered)
//   }

//   await updateProjectSubscriptionDuration(projectSubscriptionTransaction.projectSubscription, investor,durationLeft )      
  
return true;
}

// export const spreadAmountPerPaymentPlanPerSubscription = async (susbscription: ProjectSubscription, investor: User,
//    developer: User, project: Project, recordProjectSubscriptionTransaction: ProjectSubscriptionTransaction, subscriptionDate: Date,  durationLeft: number): Promise<boolean> => {
 
//   const connection = await getFreshConnection();
//   const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)

//   let exisitingProjectSubscriptionTransaction = recordProjectSubscriptionTransaction
 
  

//   let nextPaymentDate = Utils.nextPaymentDate30days(subscriptionDate as string);
//   console.log('Date before we enter the loop', nextPaymentDate);
//   console.log('susbscription.amountRemainingMinor', susbscription.amountRemainingMinor)
//   for (let i = 1; i<=durationLeft; i+= 1){
//         // create subscription project transaction payment 
//         console.log(`Payment transaction initialization : ${i}`)

//         console.log('Date before create inside the loop', nextPaymentDate);
        
//         const amountBeforeMinor = exisitingProjectSubscriptionTransaction.amountAfterMinor;
//         const amountAfterMinor = Number((exisitingProjectSubscriptionTransaction.amountAfterMinor + susbscription.amountPerPaymentPlanDurationMinor).toFixed(2));

//         const amountRemainingMinor = Number((exisitingProjectSubscriptionTransaction.amountRemainingMinor -  susbscription.amountPerPaymentPlanDurationMinor).toFixed(2));
//         console.log('amountRemainingMinor', amountRemainingMinor)
//         const projectSubscriptionPaymentTransaction: ProcessProjectSubscriptionTransactionDto = {
//           investorUserId: investor.id,
//           developerUserId: developer.id,
//           projectId: project.id,
//           projectSubscriptionId: susbscription.id,
//           amountBeforeMinor,
//           amountPaidMinor: susbscription.amountPerPaymentPlanDurationMinor ,
//           amountAfterMinor,
//           amountRemainingMinor,
//           financialTransactionId: 0,
//           description: `Project Subscription Payment for duration -  ${i}`,
//           paymentPlanDurationNumber: i,
//           // eslint-disable-next-line object-shorthand
//           nextPaymentDate: nextPaymentDate,
//         }
        
//         const projectSubscriptionTransaction = new ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction)
//        const saveProjectSubscriptionTransaction =  await projectSubscriptionTransactionRepo.save(projectSubscriptionTransaction);
        
//         await projectSubscriptionTransactionRepo
//         .createQueryBuilder()
//         .update(ProjectSubscriptionTransaction)
//         .set({ 
//           isPaid: false,
//           paidStatus: PaymentTransactionStatus.UNPAID,
//           nextPaymentDate 
//         })
//         .where({ id: saveProjectSubscriptionTransaction.id })
//         .execute();
//         exisitingProjectSubscriptionTransaction =  saveProjectSubscriptionTransaction
       
//         nextPaymentDate = Utils.nextPaymentDate30days(new Date(nextPaymentDate))
        
//         console.log('Date After create inside the loop', nextPaymentDate);
//         console.log('exisitingProjectSubscriptionTransaction - saveProjectSubscriptionTransaction', saveProjectSubscriptionTransaction)
    
//   }
//   return true; 
// }

export const updateProjectSubscriptionDate = async (susbscription: ProjectSubscription,  susbscriptionDate: Date, investor: User): Promise<boolean> => {
  const connection = await getFreshConnection();

  const projectSubscriptionRepo = connection.getRepository(ProjectSubscription)


  projectSubscriptionRepo
  .createQueryBuilder()
  .update(ProjectSubscription)
  .set({ susbscriptionDate })
  .where({
    id: susbscription.id,
    investorUserId: investor.id,
  })
  .execute();

  return true;
}

export const calculateInvestorRemainingBalance = async  (payload: AddInvestorToProjectRequestDto, project: Project): Promise<number> => {
  const totalSubscriptionAmount: number = parseInt(( project.costPerSlot * payload.numberOfSlots).toFixed(2));
  const remainingAmount: number =  parseInt((totalSubscriptionAmount -  payload.amountPaid).toFixed(2))
  return remainingAmount;
}

export const updateProjectStage = async (developer: User, payload: UpdateProjectStageRequestDto, projectUuid: string): Promise<boolean> => {
  const connection = await getFreshConnection();

  const projectRepo = connection.getRepository(Project)

  await isUserADeveloper(developer.id)

  const project = await projectRepo.findOne({
    where: {
      uuid: projectUuid,
      userId: developer.id,
      isSoftDeleted: false
    }
  })

  if(!project){
    throw new UnprocessableEntityError("Developer Project Does Not Exist")
  }

  if(project.status === ProjectStatuses.CLOSED){
    throw new UnprocessableEntityError("Can Update Close Project")
  }
  

  const stageExists = project.stages.some((stageObj) => stageObj.stage === payload.stage);

  if(stageExists){
    throw new UnprocessableEntityError("Stage already exists in the project");
  }else {
    const now = Utils.utcNow()

    project.stages.push({
        stage: payload.stage,
        dateTimeInISO8601: now.toISOString()
      })
  
    await projectRepo
    .createQueryBuilder()
    .update(Project)
    .set({ 
      stages: project.stages
    })
    .where({ id: project.id })
    .execute();
  
    return true;
  }


}

