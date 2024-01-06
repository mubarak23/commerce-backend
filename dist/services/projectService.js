"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectStage = exports.calculateInvestorRemainingBalance = exports.updateProjectSubscriptionDate = exports.processMonoWebhook = exports.paymentForRecurrentSubscriptionTransansaction = exports.addInvestorToProjectSubscription = exports.transformProjectSubscriptionTransaction = exports.transformProjectSubscriptionTransactions = exports.transformProjectSubscription = exports.transformProjectSubscriptions = exports.updateProjectSatatus = exports.transformPublicProject = exports.transformPublicProjects = exports.transformProjects = exports.transformProject = exports.updateProjectDetails = exports.createProjectSubscription = exports.calculateIntialPaymentAmount = exports.calculateAmountPerPaymentPlan = exports.activateProjectSubscription = exports.updateProjectSubscriptionDuration = exports.updatedNewInvesotProjectSubscriptionDuration = exports.updateProjectNumberOfSlot = exports.isProjectOpenForSubscription = exports.nextPendingRecurrentPayment = exports.handleSubscribeToProject = exports.isUserAnInvestor = exports.isUserADeveloper = exports.getProjectByUuid = exports.handleCreateProject = void 0;
/* eslint-disable no-await-in-loop */
const typeorm_1 = require("typeorm");
const _ = __importStar(require("underscore"));
const db_1 = require("../db");
const MortageUser_1 = require("../entity/MortageUser");
const Project_1 = require("../entity/Project");
const ProjectSubscription_1 = require("../entity/ProjectSubscription");
const ProjectSubscriptionTransaction_1 = require("../entity/ProjectSubscriptionTransaction");
const User_1 = require("../entity/User");
const NotificationMessageTypes_1 = __importDefault(require("../enums/NotificationMessageTypes"));
const NotificationTransport_1 = require("../enums/NotificationTransport");
const PaymentTransaction_1 = require("../enums/PaymentTransaction");
const ProjectEnums_1 = require("../enums/ProjectEnums");
const ProjectSubscriptionPaymentVariant_1 = require("../enums/ProjectSubscriptionPaymentVariant");
const Roles_1 = require("../enums/Roles");
const Utils = __importStar(require("../utils/core"));
const error_response_types_1 = require("../utils/error-response-types");
const DeveloperService = __importStar(require("./developerService"));
const InvestorService = __importStar(require("./investorService"));
const MortgageCardService = __importStar(require("./mortgageCardService"));
const NotificationService = __importStar(require("./notificationService"));
const ProfileService = __importStar(require("./profileService"));
const WalletService = __importStar(require("./walletService"));
const handleCreateProject = (payload, user, accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    yield (0, exports.isUserADeveloper)(user.id);
    yield DeveloperService.isDeveloperAccountApprovedAndConfirm(user.id);
    // check for name 
    const pendingDeveloperProject = yield projectRepo.findOne({
        where: { userId: user.id, name: payload.name, isSoftDeleted: false }
    });
    if (pendingDeveloperProject) {
        throw new error_response_types_1.UnprocessableEntityError('Project with the Same Name has Been Created Before');
    }
    if (payload.initialInvestmentPercentage >= 100) {
        throw new error_response_types_1.UnprocessableEntityError('Initial Project Investment Percentage Cannot Be More than 100');
    }
    // if(![ProjectPaymentPlan.DAILY, ProjectPaymentPlan.WEEKLY, ProjectPaymentPlan.MONTHLY, ProjectPaymentPlan.YEARLY].includes(payload.paymentPlan)){
    //   throw new UnprocessableEntityError(`Cannot Create Project with the following Payment Plan - ${payload.paymentPlan}`)
    // }
    const newProjectTrasnaction = yield connection.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const projectRepoT = transactionalEntityManager.getRepository(Project_1.Project);
        const newDeveloperProject = new Project_1.Project().initializeProjectByDeveloper(payload, user.id, accountId);
        yield projectRepoT.save(newDeveloperProject);
        return newDeveloperProject;
    }));
    // dispatch mail that say project is waiting for approval
    // via in_app and email 
    const domain = Utils.serverDomain();
    // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
    const notificationMetadataProject = {
        projectUuid: newProjectTrasnaction.uuid,
    };
    const notificationTransportsProject = {
        [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
        [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
    };
    yield NotificationService.sendSingleNotificationToUserId(user.id, user.uuid, NotificationMessageTypes_1.default.ESTATE_PROJECT_APPROVAL_REQUEST, 'New Project Approval Request', `Dear ${user.firstName}, A New Project Approval Request Has Been Send. Please note our Support team will Review and Approval your Project Shortly. Thanks, CinderBuild`, notificationTransportsProject, notificationMetadataProject);
    return newProjectTrasnaction;
});
exports.handleCreateProject = handleCreateProject;
const getProjectByUuid = (projectUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    const project = yield projectRepo.findOne({
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
    return project;
});
exports.getProjectByUuid = getProjectByUuid;
const isUserADeveloper = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const mortageUserRepo = connection.getRepository(MortageUser_1.MortageUser);
    const user = yield userRepo.findOne({
        where: { id: userId }
    });
    if (!user) {
        throw new error_response_types_1.UnprocessableEntityError('User Not Found');
    }
    const isMortageUser = yield mortageUserRepo.findOne({
        where: { userId: user.id }
    });
    if (!isMortageUser) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortage  User Assign to the User');
    }
    if ([Roles_1.Roles.DEVELOPER].includes(isMortageUser.type)) {
        return true;
    }
    throw new error_response_types_1.UnprocessableEntityError('Only Developer Can Create Mortage Project');
});
exports.isUserADeveloper = isUserADeveloper;
const isUserAnInvestor = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const userRepo = connection.getRepository(User_1.User);
    const mortageUserRepo = connection.getRepository(MortageUser_1.MortageUser);
    const user = yield userRepo.findOne({
        where: { id: userId }
    });
    if (!user) {
        throw new error_response_types_1.UnprocessableEntityError('User Not Found');
    }
    const isMortageUser = yield mortageUserRepo.findOne({
        where: { userId: user.id }
    });
    if (!isMortageUser) {
        throw new error_response_types_1.UnprocessableEntityError('No Mortage  User Assign to the User');
    }
    if ([Roles_1.Roles.INVESTOR].includes(isMortageUser.type)) {
        return true;
    }
    throw new error_response_types_1.UnprocessableEntityError('Only An Investor Can Subscribe to a Project');
});
exports.isUserAnInvestor = isUserAnInvestor;
const handleSubscribeToProject = (payload, user, projectSubscriptionPaymentVariant) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.isUserAnInvestor)(user.id);
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const join = {
        alias: "project",
        leftJoinAndSelect: {
            user: "project.user",
        },
    };
    const project = yield projectRepo.findOne({
        where: { uuid: payload.projectUuid, isSoftDeleted: false },
        join
    });
    if (!project) {
        throw new error_response_types_1.UnprocessableEntityError('Project Does Not Exist');
    }
    if ([ProjectEnums_1.ProjectStatuses.CLOSED, ProjectEnums_1.ProjectStatuses.DECLINED, ProjectEnums_1.ProjectStatuses.PENDING].includes(project.status)) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Subscribe to a project in this Current Status');
    }
    if (project.numberOfSlots === 0) {
        throw new error_response_types_1.UnprocessableEntityError('Project Does Not Have Available Slot');
    }
    // is available slot more than or equal to the payload.numberofslot
    if (project.numberOfSlots < payload.numberOfSlot) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Subscribe to a project with less than the number of slot selected');
    }
    const exisitngProjectSubscription = yield projectSubscriptionRepo.findOne({
        where: { projectId: project.id, investorUserId: user.id }
    });
    if (exisitngProjectSubscription) {
        throw new error_response_types_1.UnprocessableEntityError('Subscription Already Exist');
    }
    yield (0, exports.isProjectOpenForSubscription)(project);
    const totalCostPayment = payload.totalCost;
    const totalCostPaymentMinor = totalCostPayment * 100;
    const userWallet = yield WalletService.getCustomerWallet(user.id);
    if (userWallet.walletBalanceMinor < 0) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient Balance to Process this Project Subscription');
    }
    if (userWallet.walletBalanceMinor < totalCostPaymentMinor) {
        throw new error_response_types_1.UnprocessableEntityError('Insufficient Balance to Process this Project Subscription');
    }
    const totalSubscriptionAmount = parseFloat((payload.numberOfSlot * project.costPerSlot).toFixed(2));
    const intialPaymentAmount = yield (0, exports.calculateIntialPaymentAmount)(project, totalSubscriptionAmount);
    console.log('totalSubscriptionAmount', totalSubscriptionAmount);
    if (totalCostPayment > totalSubscriptionAmount) {
        throw new error_response_types_1.UnprocessableEntityError(`Payment Amount Must be Greater Than or Eqaul to initial Percentage Amount - ${intialPaymentAmount}`);
    }
    console.log('intialPaymentAmount', intialPaymentAmount);
    if (totalCostPayment < intialPaymentAmount) {
        throw new error_response_types_1.UnprocessableEntityError(`Payment Amount Must be Greater Than or Eqaul to initial Percentage Amount - ${intialPaymentAmount}`);
    }
    // old implementation
    // const remainingSubscriptionAmount = totalSubscriptionAmount - intialPaymentAmount
    const remainingSubscriptionAmount = totalSubscriptionAmount - totalCostPayment;
    const amountPerpaymentPlan = yield (0, exports.calculateAmountPerPaymentPlan)(project, remainingSubscriptionAmount);
    const newInvestorProjectSubscription = yield (0, exports.createProjectSubscription)(payload, user, project, totalSubscriptionAmount, totalCostPayment, remainingSubscriptionAmount, amountPerpaymentPlan);
    const projectImages = project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(project.user);
    const investorPublicProfile = yield ProfileService.getPublicMortageUserProfile(user);
    const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
    if (projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant_1.ProjectSubscriptionPaymentVariant.WALLET) {
        // projectSubscriptionPaymentViaWallet
        const successChargeWallet = yield WalletService.projectSubscriptionPaymentViaWallet(project.id, newInvestorProjectSubscription.id, project.userId, user.id, totalCostPayment, remainingSubscriptionAmount, newInvestorProjectSubscription, project);
        // update project susbscription
        yield (0, exports.activateProjectSubscription)(newInvestorProjectSubscription, user);
        yield (0, exports.updateProjectNumberOfSlot)(project, payload.numberOfSlot);
        const join = {
            alias: "project_susbscription_transactions",
            leftJoinAndSelect: {
                projectSubscription: "project_susbscription_transactions.projectSubscription",
                project: "project_susbscription_transactions.project",
                developer: "project_susbscription_transactions.developer",
                investor: "project_susbscription_transactions.investor",
            },
        };
        const projectSubscription = yield projectSubscriptionRepo.findOne({
            where: { id: newInvestorProjectSubscription.id }
        });
        yield (0, exports.updateProjectSubscriptionDuration)(projectSubscription, user, projectSubscription.duration);
        const projectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
            where: { projectSubscriptionId: projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
            join
        });
        const projectSubscriptionTransactionSoFar = yield projectSubscriptionTransactionRepo.find({
            where: { projectSubscriptionId: projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID }
        });
        const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;
        const afterprojectSubscriptionPayment = yield projectSubscriptionRepo.findOne({
            where: { id: newInvestorProjectSubscription.id, status: ProjectEnums_1.ProjectStatuses.ACTIVE }
        });
        //  await spreadAmountPerPaymentPlanPerSubscription(projectSubscription!, user, project.user, project, projectSubscriptionTransaction!, new Date(), project.duration)
        // if(afterprojectSubscriptionPayment!.amountRemainingMinor !== 0){
        //   console.log('afterprojectSubscriptionPayment!.amountRemainingMinor', afterprojectSubscriptionPayment!.amountRemainingMinor)
        //   await nextPendingRecurrentPayment(projectSubscriptionTransaction!.projectSubscription, project, user, project.user, projectSubscriptionTransaction!, durationPaymentCovered)
        // }
        if (totalCostPayment !== totalSubscriptionAmount) {
            yield (0, exports.nextPendingRecurrentPayment)(projectSubscriptionTransaction.projectSubscription, project, user, project.user, projectSubscriptionTransaction, durationPaymentCovered);
        }
        const projectSubscriptionResponse = newInvestorProjectSubscription.toResponseDto(projectSubscription, project.uuid, projectResponse, investorPublicProfile, developerPublicProfile, undefined, projectSubscription.initialAmountMinor);
        return projectSubscriptionResponse;
    }
    if (projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant_1.ProjectSubscriptionPaymentVariant.CARD) {
        // call card payment provider 
        const projectSubscriptionResponse = newInvestorProjectSubscription.toResponseDto(newInvestorProjectSubscription, project.uuid, projectResponse, investorPublicProfile, developerPublicProfile);
        return projectSubscriptionResponse;
    }
    const projectSubscriptionResponse = newInvestorProjectSubscription.toResponseDto(newInvestorProjectSubscription, project.uuid, projectResponse, investorPublicProfile, developerPublicProfile);
    return projectSubscriptionResponse;
});
exports.handleSubscribeToProject = handleSubscribeToProject;
// projectSubscription!, user, project.user, project, projectSubscriptionTransaction!, new Date(), project.duration
const nextPendingRecurrentPayment = (susbscription, project, investor, developer, projectSubscriptionTransaction, durationPaymentCovered) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    //  susbscription.durationLeft 
    const amountBeforeMinor = projectSubscriptionTransaction.amountAfterMinor;
    console.log('amountBeforeMinor', amountBeforeMinor);
    console.log('susbscription.amountPerPaymentPlanDurationMinor', susbscription.amountPerPaymentPlanDurationMinor);
    const amountRemainingMinor = Number((susbscription.amountRemainingMinor).toFixed(2));
    console.log('amountRemainingMinor', amountRemainingMinor);
    console.log('susbscription.durationLeft', susbscription.durationLeft);
    const amountPaidMinor = parseFloat((amountRemainingMinor / susbscription.durationLeft).toFixed(2));
    console.log('amountPaidMinor', amountPaidMinor);
    const amountAfterMinor = parseFloat((amountBeforeMinor + susbscription.amountPerPaymentPlanDurationMinor).toFixed(2));
    console.log('amountAfterMinor', amountAfterMinor);
    console.log('projectSubscriptionTransaction.nextPaymentDate', projectSubscriptionTransaction.nextPaymentDate);
    const nextPaymentDate = Utils.nextPaymentDate30days(projectSubscriptionTransaction.nextPaymentDate);
    const projectSubscriptionPaymentTransaction = {
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
    };
    const newProjectSubscriptionTransaction = new ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction);
    const saveProjectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.save(newProjectSubscriptionTransaction);
    yield projectSubscriptionTransactionRepo
        .createQueryBuilder()
        .update(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction)
        .set({
        isPaid: false,
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID,
        nextPaymentDate
    })
        .where({ id: saveProjectSubscriptionTransaction.id })
        .execute();
    return true;
});
exports.nextPendingRecurrentPayment = nextPendingRecurrentPayment;
const isProjectOpenForSubscription = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDateFormatted = Utils.currentDateFormatted();
    const currentDate = new Date(currentDateFormatted);
    currentDate.setHours(0, 0, 0, 0);
    const projectStartDate = new Date(project.startDate); // Assuming project.startDate is also in 'YYYY-MM-DD' format
    projectStartDate.setHours(0, 0, 0, 0);
    if (currentDate < projectStartDate) {
        throw new error_response_types_1.UnprocessableEntityError("Project start date must be greater than or equal to the current date.");
    }
    return true;
});
exports.isProjectOpenForSubscription = isProjectOpenForSubscription;
const updateProjectNumberOfSlot = (project, numberOfSlots) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    yield projectRepo
        .createQueryBuilder()
        .update(Project_1.Project)
        .set({
        numberOfSlots: project.numberOfSlots - numberOfSlots
    })
        .where({ id: project.id })
        .execute();
    return true;
});
exports.updateProjectNumberOfSlot = updateProjectNumberOfSlot;
const updatedNewInvesotProjectSubscriptionDuration = (projectSubscription, user, durationLeft) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    yield projectSubscriptionRepo
        .createQueryBuilder()
        .update(ProjectSubscription_1.ProjectSubscription)
        .set({
        durationLeft,
        durationCovered: projectSubscription.duration - durationLeft
    })
        .where({ id: projectSubscription.id, investorUserId: user.id })
        .execute();
    return true;
});
exports.updatedNewInvesotProjectSubscriptionDuration = updatedNewInvesotProjectSubscriptionDuration;
const updateProjectSubscriptionDuration = (projectSubscription, user, durationLeft) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    console.log('durationLeft', durationLeft);
    console.log('durationCovered:', projectSubscription.duration - durationLeft);
    yield projectSubscriptionRepo
        .createQueryBuilder()
        .update(ProjectSubscription_1.ProjectSubscription)
        .set({
        durationLeft,
        durationCovered: projectSubscription.duration - durationLeft
    })
        .where({ id: projectSubscription.id, investorUserId: user.id })
        .execute();
    return true;
});
exports.updateProjectSubscriptionDuration = updateProjectSubscriptionDuration;
const activateProjectSubscription = (projectSubscription, user) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    yield projectSubscriptionRepo
        .createQueryBuilder()
        .update(ProjectSubscription_1.ProjectSubscription)
        .set({
        status: ProjectEnums_1.ProjectStatuses.ACTIVE
    })
        .where({ id: projectSubscription.id, investorUserId: user.id })
        .execute();
    return true;
});
exports.activateProjectSubscription = activateProjectSubscription;
const calculateAmountPerPaymentPlan = (project, remainingSubscriptionAmount, durationLeft) => __awaiter(void 0, void 0, void 0, function* () {
    if (durationLeft) {
        const amountPerPaymentPlanMajor = remainingSubscriptionAmount / durationLeft;
        const amountPerPaymentPlanFormatted = parseFloat(amountPerPaymentPlanMajor.toFixed(2));
        return amountPerPaymentPlanFormatted;
    }
    const amountPerPaymentPlanMajor = remainingSubscriptionAmount / project.duration;
    const amountPerPaymentPlanFormatted = parseFloat(amountPerPaymentPlanMajor.toFixed(2));
    return amountPerPaymentPlanFormatted;
});
exports.calculateAmountPerPaymentPlan = calculateAmountPerPaymentPlan;
const calculateIntialPaymentAmount = (project, totalSubscriptionAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const intialPaymentAmount = totalSubscriptionAmount * (project.initialInvestmentPercentage / 100);
    const formattedintialPaymentAmount = parseFloat(intialPaymentAmount.toFixed(2));
    return formattedintialPaymentAmount;
});
exports.calculateIntialPaymentAmount = calculateIntialPaymentAmount;
const createProjectSubscription = (payload, investor, project, totalSubscriptionAmount, intialPaymentAmount, remainingSubscriptionAmount, amountPerpaymentPlan) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const projectSunscriptionPayload = {
        investorUserId: investor.id,
        developerUserId: project.userId,
        projectId: project.id,
        numberOfSlots: payload.numberOfSlot,
        totalAmountMinor: totalSubscriptionAmount * 100,
        initialAmountMinor: intialPaymentAmount * 100,
        amountRemainingMinor: remainingSubscriptionAmount * 100,
        amountPerPaymentPlanDurationMinor: amountPerpaymentPlan * 100,
        durationPerPaymentPlan: ProjectEnums_1.ProjectPaymentPlan.MONTHLY,
        duration: project.duration
    };
    const newInvestorProjectSubscription = new ProjectSubscription_1.ProjectSubscription().initializeInvestorProjectSubscription(projectSunscriptionPayload);
    yield projectRepo.save(newInvestorProjectSubscription);
    return newInvestorProjectSubscription;
});
exports.createProjectSubscription = createProjectSubscription;
const updateProjectDetails = (payload, userId, projectUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    const projectDetails = yield projectRepo.findOne({
        where: { uuid: projectUuid, userId }
    });
    if (!projectDetails) {
        throw new error_response_types_1.UnprocessableEntityError('Project Does not Exist');
    }
    if ([ProjectEnums_1.ProjectStatuses.ACTIVE, ProjectEnums_1.ProjectStatuses.DECLINED, ProjectEnums_1.ProjectStatuses.CLOSED].includes(projectDetails.status)) {
        throw new error_response_types_1.UnprocessableEntityError(`Cannot Update Project Details in ${projectDetails.status} Status`);
    }
    if (payload.paymentPlan) {
        if (![ProjectEnums_1.ProjectPaymentPlan.DAILY, ProjectEnums_1.ProjectPaymentPlan.WEEKLY, ProjectEnums_1.ProjectPaymentPlan.MONTHLY, ProjectEnums_1.ProjectPaymentPlan.YEARLY].includes(payload.paymentPlan)) {
            throw new error_response_types_1.UnprocessableEntityError(`Cannot Update Project Payment Plan with ${projectDetails.paymentPlan}`);
        }
    }
    const updateQuery = payload;
    updateQuery.paymentPlan = ProjectEnums_1.ProjectPaymentPlan.MONTHLY;
    projectRepo
        .createQueryBuilder()
        .update(Project_1.Project)
        .set(updateQuery)
        .where({
        uuid: projectDetails.uuid,
    })
        .execute();
    return true;
});
exports.updateProjectDetails = updateProjectDetails;
const transformProject = (project, user) => __awaiter(void 0, void 0, void 0, function* () {
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(user);
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const join = {
        alias: "project_subscriptions",
        leftJoinAndSelect: {
            developer: "project_subscriptions.developer",
            investor: "project_subscriptions.investor",
            project: "project_subscriptions.project",
        },
    };
    const projectSubscriptions = yield projectSubscriptionRepo.find({
        where: { projectId: project.id, isSoftDeleted: false },
        join
    });
    const projectImages = project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    let numberOfSlotSold = 0;
    if (projectSubscriptions.length !== 0) {
        numberOfSlotSold = projectSubscriptions.reduce((accumulator, subscription) => {
            // Add your logic to access the 'numberOfSlots' property
            const numberOfSlots = subscription.numberOfSlots || 0; // Replace 'numberOfSlots' with your actual property name
            return accumulator + numberOfSlots;
        }, 0);
        const transformProjectSubscriptionsResponse = yield (0, exports.transformProjectSubscriptions)(projectSubscriptions);
        const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages, transformProjectSubscriptionsResponse, numberOfSlotSold);
        return projectResponse;
    }
    const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
    return projectResponse;
});
exports.transformProject = transformProject;
const transformProjects = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    yield (0, exports.isUserADeveloper)(user.id);
    const join = {
        alias: "project",
        leftJoinAndSelect: {
            user: "project.user",
        },
    };
    const projects = yield projectRepo.find({
        where: { userId: user.id, isSoftDeleted: false },
        join
    });
    if (!projects.length) {
        return [];
    }
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(user);
    const projectsResponse = [];
    for (const project of projects) {
        const projectImages = project.images || [];
        const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const oneProjectsResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
        projectsResponse.push(oneProjectsResponse);
    }
    return projectsResponse;
});
exports.transformProjects = transformProjects;
const transformPublicProjects = (projects) => __awaiter(void 0, void 0, void 0, function* () {
    const developerUserIds = projects.map((project) => project.userId);
    const developerPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
    const projectsResponse = [];
    for (const project of projects) {
        const developerPublicProfile = developerPublicProfiles.find((publicProfile) => publicProfile.userUuid === project.user.uuid);
        const projectImages = project.images || [];
        const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const oneProjectsResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
        projectsResponse.push(oneProjectsResponse);
    }
    return projectsResponse;
});
exports.transformPublicProjects = transformPublicProjects;
const transformPublicProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const join = {
        alias: "project_subscriptions",
        leftJoinAndSelect: {
            developer: "project_subscriptions.developer",
            investor: "project_subscriptions.investor",
            project: "project_subscriptions.project",
        },
    };
    const projectSubscriptions = yield projectSubscriptionRepo.find({
        where: { projectId: project.id, isSoftDeleted: false },
        join
    });
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(project.user);
    const projectImages = project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    if (projectSubscriptions.length !== 0) {
        const transformProjectSubscriptionsResponse = yield (0, exports.transformProjectSubscriptions)(projectSubscriptions);
        const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages, transformProjectSubscriptionsResponse);
        return projectResponse;
    }
    const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
    return projectResponse;
});
exports.transformPublicProject = transformPublicProject;
const updateProjectSatatus = (project, status) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    if (project.status === status) {
        throw new error_response_types_1.UnprocessableEntityError('Cannot Update Project in it current status');
    }
    projectRepo
        .createQueryBuilder()
        .update(Project_1.Project)
        .set({ status })
        .where({
        uuid: project.uuid,
    })
        .execute();
    // diapatch mail if status == 'ACTIVE' for project approval;
    if (status === ProjectEnums_1.ProjectStatuses.DECLINED) {
        // dispatch mail that say project is waiting for approval
        // via in_app and email 
        const domain = Utils.serverDomain();
        // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
        const notificationMetadataProject = {
            projectUuid: project.uuid,
        };
        const notificationTransportsProject = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        };
        yield NotificationService.sendSingleNotificationToUserId(project.userId, project.user.uuid, NotificationMessageTypes_1.default.ESTATE_PROJECT_DECLINED, 'Project Approval Request Decline', `Dear ${project.user.firstName}, The Project with the Name ${project.name} has Been Decline. Thanks, CinderBuild`, notificationTransportsProject, notificationMetadataProject);
    }
    if (status === ProjectEnums_1.ProjectStatuses.ACTIVE) {
        // dispatch mail that say project is Approved
        // via in_app and email 
        const domain = Utils.serverDomain();
        // const orderTrackLink = `https://${domain}/seller/orders/${order.uuid}`
        const notificationMetadataProject = {
            projectUuid: project.uuid,
        };
        const notificationTransportsProject = {
            [NotificationTransport_1.NotificationTransportMode.IN_APP]: true,
            [NotificationTransport_1.NotificationTransportMode.EMAIL]: true,
        };
        yield NotificationService.sendSingleNotificationToUserId(project.userId, project.user.uuid, NotificationMessageTypes_1.default.ESTATE_PROJECT_APPROVED, 'Project Has Been Approved', `Dear ${project.user.firstName}, The Project with the Name ${project.name} has Been Approved. Thanks, CinderBuild`, notificationTransportsProject, notificationMetadataProject);
    }
    // diapatch mail if status == 'PENDING' for project decline;  
});
exports.updateProjectSatatus = updateProjectSatatus;
const transformProjectSubscriptions = (projectSubscriptions) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const subscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const developerUserIds = projectSubscriptions.map((subscription) => subscription.developerUserId);
    const investorUserIds = projectSubscriptions.map((subscription) => subscription.investorUserId);
    const developerPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
    const investorPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(investorUserIds);
    const projectSubscriptionsResponse = [];
    const projectSubscriptionIds = projectSubscriptions.map((subscription) => subscription.id);
    const projectSubscriptionPaymentTransactions = yield subscriptionTransactionRepo.find({
        where: { projectSubscriptionId: (0, typeorm_1.In)(projectSubscriptionIds) }
    });
    for (const subscription of projectSubscriptions) {
        const developerPublicProfile = developerPublicProfiles.find((publicProfile) => publicProfile.userUuid === subscription.developer.uuid);
        const investorPublicProfile = investorPublicProfiles.find((publicProfile) => publicProfile.userUuid === subscription.investor.uuid);
        const projectImages = subscription.project.images || [];
        const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const transactionSubscriptions = projectSubscriptionPaymentTransactions.filter((transaction) => transaction.projectSubscriptionId === subscription.id && transaction.isPaid === true);
        let totalSubscriptionAmountPaidMinor = 0;
        const amountPaidMinorArray = transactionSubscriptions.map(item => item.amountPaidMinor);
        totalSubscriptionAmountPaidMinor = amountPaidMinorArray.reduce((total, amountPaidMinor) => total + amountPaidMinor, 0);
        const projectRersponse = subscription.project.toResponseDto(developerPublicProfile, subscription.project, projectResponseImages);
        const oneProjectSubscriptionResponse = subscription.toResponseDto(subscription, subscription.project.uuid, projectRersponse, investorPublicProfile, developerPublicProfile, undefined, totalSubscriptionAmountPaidMinor);
        projectSubscriptionsResponse.push(oneProjectSubscriptionResponse);
    }
    return projectSubscriptionsResponse;
});
exports.transformProjectSubscriptions = transformProjectSubscriptions;
const transformProjectSubscription = (projectSubscription, developer) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const subscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(projectSubscription.developer);
    const investorPublicProfile = yield ProfileService.getPublicMortageUserProfile(projectSubscription.investor);
    const projectImages = projectSubscription.project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    const projectRersponse = projectSubscription.project.toResponseDto(developerPublicProfile, projectSubscription.project, projectResponseImages);
    const join = {
        alias: "project_susbscription_transactions",
        leftJoinAndSelect: {
            projectSubscription: "project_susbscription_transactions.projectSubscription",
            project: "project_susbscription_transactions.project",
        },
    };
    const transactionSubscriptions = yield subscriptionTransactionRepo.find({
        where: { projectSubscriptionId: projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID }, join
    });
    const unpaidTransactionSubscriptions = yield subscriptionTransactionRepo.find({
        where: { projectSubscriptionId: projectSubscription.id, isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID }, join
    });
    let nextPaymentDueDate;
    if (unpaidTransactionSubscriptions) {
        nextPaymentDueDate = new Date(unpaidTransactionSubscriptions[0].nextPaymentDate);
    }
    nextPaymentDueDate = new Date();
    if (transactionSubscriptions) {
        let totalSubscriptionAmountPaidMinor = 0;
        const amountPaidMinorArray = transactionSubscriptions.map(item => item.amountPaidMinor);
        totalSubscriptionAmountPaidMinor = amountPaidMinorArray.reduce((total, amountPaidMinor) => total + amountPaidMinor, 0);
        const susbscriptionTransactionsReponse = [];
        for (const transaction of transactionSubscriptions) {
            const oneTransactionResponse = transaction.toResponseDto(transaction);
            susbscriptionTransactionsReponse.push(oneTransactionResponse);
        }
        const projectResponse = projectSubscription.toResponseDto(projectSubscription, projectSubscription.project.uuid, projectRersponse, investorPublicProfile, developerPublicProfile, susbscriptionTransactionsReponse, totalSubscriptionAmountPaidMinor, nextPaymentDueDate);
        return projectResponse;
    }
    const projectResponse = projectSubscription.toResponseDto(projectSubscription, projectSubscription.project.uuid, projectRersponse, investorPublicProfile, developerPublicProfile);
    return projectResponse;
});
exports.transformProjectSubscription = transformProjectSubscription;
const transformProjectSubscriptionTransactions = (projectSubscriptionTransactions, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const developerUserIds = projectSubscriptionTransactions.map((transaction) => transaction.developerUserId);
    const developerPublicProfiles = yield ProfileService.getPublicMortageUserFromUserIds(developerUserIds);
    const investorPublicProfile = yield ProfileService.getPublicMortageUserProfile(currentUser);
    const projectSubscriptionTransactionsResponse = [];
    const projectSubscriptionIds = projectSubscriptionTransactions.map((subscription) => subscription.projectSubscriptionId);
    const projectSubscriptions = yield projectSubscriptionRepo.find({
        where: { id: (0, typeorm_1.In)(projectSubscriptionIds), investorUserId: currentUser.id }
    });
    for (const transaction of projectSubscriptionTransactions) {
        const oneSusbscription = projectSubscriptions.find((subscription) => subscription.id === transaction.projectSubscription.id);
        const developerPublicProfile = developerPublicProfiles.find((publicProfile) => publicProfile.userUuid === transaction.developer.uuid);
        const projectImages = transaction.project.images || [];
        const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
        const projectResponse = transaction.project.toResponseDto(developerPublicProfile, transaction.project, projectResponseImages);
        const projectSubscriptionResponse = oneSusbscription.toResponseDto(oneSusbscription, transaction.project.uuid, projectResponse, investorPublicProfile, developerPublicProfile);
        const oneProjectSubscriptionTransactionResponse = transaction.toProjectTransactionResponseDto(transaction, projectResponse, investorPublicProfile, projectSubscriptionResponse);
        projectSubscriptionTransactionsResponse.push(oneProjectSubscriptionTransactionResponse);
    }
    return projectSubscriptionTransactionsResponse;
});
exports.transformProjectSubscriptionTransactions = transformProjectSubscriptionTransactions;
const transformProjectSubscriptionTransaction = (projectSubscriptionTransaction, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(projectSubscriptionTransaction.developer);
    const investorPublicProfile = yield ProfileService.getPublicMortageUserProfile(currentUser);
    const projectImages = projectSubscriptionTransaction.project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    const projectResponse = projectSubscriptionTransaction.project.toResponseDto(developerPublicProfile, projectSubscriptionTransaction.project, projectResponseImages);
    const projectSubscriptionResponse = projectSubscriptionTransaction.projectSubscription.toResponseDto(projectSubscriptionTransaction.projectSubscription, projectSubscriptionTransaction.project.uuid, projectResponse, developerPublicProfile, investorPublicProfile);
    const oneProjectSubscriptionTransactionResponse = projectSubscriptionTransaction.toProjectTransactionResponseDto(projectSubscriptionTransaction, projectResponse, investorPublicProfile, projectSubscriptionResponse);
    return oneProjectSubscriptionTransactionResponse;
});
exports.transformProjectSubscriptionTransaction = transformProjectSubscriptionTransaction;
const addInvestorToProjectSubscription = (developer, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const join = {
        alias: "project",
        leftJoinAndSelect: {
            user: "project.user",
        },
    };
    const project = yield projectRepo.findOne({
        where: { uuid: payload.projectUuid, userId: developer.id, status: ProjectEnums_1.ProjectStatuses.ACTIVE, isSoftDeleted: false },
        join
    });
    if (!project) {
        throw new error_response_types_1.UnprocessableEntityError("Project Does Not Exist");
    }
    // addinvestor  InvestorService
    const newInvestorPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        emailAddress: payload.emailAddress,
        phoneNumber: payload.phoneNumber,
    };
    const newInvestorUser = yield InvestorService.addinvestor(newInvestorPayload);
    // calculate remaining balance 
    const investorRemainingBalance = yield (0, exports.calculateInvestorRemainingBalance)(payload, project);
    const amountPerpaymentPlan = yield (0, exports.calculateAmountPerPaymentPlan)(project, investorRemainingBalance, payload.durationLeft);
    const totalSubscriptionAmount = parseInt((project.costPerSlot * payload.numberOfSlots).toFixed(2));
    const newInvestorProjectSubscriptionPayload = {
        projectUuid: project.uuid,
        numberOfSlot: payload.numberOfSlots,
        totalCost: totalSubscriptionAmount
    };
    const newInvestorProjectSubscription = yield (0, exports.createProjectSubscription)(newInvestorProjectSubscriptionPayload, newInvestorUser, project, totalSubscriptionAmount, totalSubscriptionAmount, investorRemainingBalance, amountPerpaymentPlan);
    // create subscription project transaction payment 
    const projectSubscriptionPaymentTransaction = {
        investorUserId: newInvestorUser.id,
        developerUserId: developer.id,
        projectId: project.id,
        projectSubscriptionId: newInvestorProjectSubscription.id,
        amountBeforeMinor: 0,
        amountPaidMinor: payload.amountPaid * 100,
        amountAfterMinor: payload.amountPaid * 100,
        amountRemainingMinor: investorRemainingBalance * 100,
        financialTransactionId: 0,
        description: 'Existing Project Subscription Payment',
        paymentPlanDurationNumber: 0,
        nextPaymentDate: (new Date()).toISOString(),
    };
    const recordProjectSubscriptionTransaction = new ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction().initializeInvestorProjectSubscriptionTransaction(projectSubscriptionPaymentTransaction);
    const firstSaveProjectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.save(recordProjectSubscriptionTransaction);
    yield projectSubscriptionTransactionRepo
        .createQueryBuilder()
        .update(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction)
        .set({
        isPaid: true,
        paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID
    })
        .where({ id: recordProjectSubscriptionTransaction.id })
        .execute();
    const projectImages = project.images || [];
    const projectResponseImages = projectImages.map(pImage => _.omit(pImage, 'fileCloudProvider'));
    const developerPublicProfile = yield ProfileService.getPublicMortageUserProfile(project.user);
    const investorPublicProfile = yield ProfileService.getPublicMortageUserProfile(newInvestorUser);
    const projectResponse = project.toResponseDto(developerPublicProfile, project, projectResponseImages);
    yield (0, exports.activateProjectSubscription)(newInvestorProjectSubscription, newInvestorUser);
    yield (0, exports.updatedNewInvesotProjectSubscriptionDuration)(newInvestorProjectSubscription, newInvestorUser, payload.durationLeft);
    yield (0, exports.updateProjectSubscriptionDate)(newInvestorProjectSubscription, payload.susbscriptionDate, newInvestorUser);
    yield (0, exports.updateProjectNumberOfSlot)(project, payload.numberOfSlots);
    const projectSubscription = yield projectSubscriptionRepo.findOne({
        where: { id: newInvestorProjectSubscription.id, status: ProjectEnums_1.ProjectStatuses.ACTIVE }
    });
    // await spreadAmountPerPaymentPlanPerSubscription(projectSubscription!, newInvestorUser, developer, project, recordProjectSubscriptionTransaction, payload.susbscriptionDate, payload.durationLeft)
    const durationPaymentCovered = project.duration - payload.durationLeft;
    if (projectSubscription.amountRemainingMinor !== 0) {
        //  console.log('afterprojectSubscriptionPayment!.amountRemainingMinor', afterprojectSubscriptionPayment!.amountRemainingMinor)
        yield (0, exports.nextPendingRecurrentPayment)(projectSubscription, project, newInvestorUser, project.user, firstSaveProjectSubscriptionTransaction, durationPaymentCovered);
    }
    const projectSubscriptionResponse = newInvestorProjectSubscription.toResponseDto(projectSubscription, project.uuid, projectResponse, investorPublicProfile, developerPublicProfile, undefined, firstSaveProjectSubscriptionTransaction.amountPaidMinor);
    return projectSubscriptionResponse;
});
exports.addInvestorToProjectSubscription = addInvestorToProjectSubscription;
const paymentForRecurrentSubscriptionTransansaction = (totalCost, transactionUuid, investor, projectSubscriptionPaymentVariant) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction_1.ProjectSubscriptionTransaction);
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    const join = {
        alias: "project_susbscription_transactions",
        leftJoinAndSelect: {
            projectSubscription: "project_susbscription_transactions.projectSubscription",
            project: "project_susbscription_transactions.project",
            developer: "project_susbscription_transactions.developer",
            investor: "project_susbscription_transactions.investor",
        },
    };
    console.log('totalCost', totalCost);
    const totalCostPayment = parseFloat((totalCost).toFixed(2));
    console.log('totalCostPayment', totalCostPayment);
    const projectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
        where: { uuid: transactionUuid, investorUserId: investor.id, isPaid: false, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.UNPAID },
        join
    });
    if (!projectSubscriptionTransaction) {
        throw new error_response_types_1.UnprocessableEntityError('Pending Recurent Subscription Payment  Does Not Exist');
    }
    const amountPaidMajor = parseFloat((projectSubscriptionTransaction.amountPaidMinor / 100).toFixed(2));
    const remainingSubscriptionAmount = parseFloat((projectSubscriptionTransaction.projectSubscription.amountRemainingMinor / 100).toFixed(2));
    if (totalCostPayment <= 0) {
        throw new error_response_types_1.UnprocessableEntityError(`Recurrent Payment Amount Must be Greater or Equal to ${amountPaidMajor} `);
    }
    if (totalCostPayment > remainingSubscriptionAmount) {
        throw new error_response_types_1.UnprocessableEntityError(`Recurrent Payment Amount Cannot Be More Than Subscripton Remaining balance ${remainingSubscriptionAmount} `);
    }
    if (totalCostPayment < amountPaidMajor) {
        throw new error_response_types_1.UnprocessableEntityError(`Recurrent Payment Amount Must be Greater or Equal to ${amountPaidMajor} `);
    }
    if (projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant_1.ProjectSubscriptionPaymentVariant.WALLET) {
        yield WalletService.payRecurrentSubscriptionAmountViaWallet(projectSubscriptionTransaction, projectSubscriptionTransaction.projectSubscription, projectSubscriptionTransaction.developerUserId, investor.id, totalCostPayment, `Recurrent Payment For Subscription for date - ${projectSubscriptionTransaction.nextPaymentDate}`);
        const paidProjectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
            where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
            join
        });
        const durationLeft = paidProjectSubscriptionTransaction.projectSubscription.durationLeft - 1;
        console.log('durationLeft', durationLeft);
        yield (0, exports.updateProjectSubscriptionDuration)(paidProjectSubscriptionTransaction.projectSubscription, investor, durationLeft);
        const paidUpdatedProjectSubscriptionTransaction = yield projectSubscriptionTransactionRepo.findOne({
            where: { id: projectSubscriptionTransaction.id, projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
            join
        });
        const projectSubscriptionTransactionSoFar = yield projectSubscriptionTransactionRepo.find({
            where: { projectSubscriptionId: projectSubscriptionTransaction.projectSubscription.id, isPaid: true, paidStatus: PaymentTransaction_1.PaymentTransactionStatus.PAID },
            join
        });
        const projectSubscription = yield projectSubscriptionRepo.findOne({
            where: { id: paidUpdatedProjectSubscriptionTransaction.projectSubscriptionId, investorUserId: investor.id }
        });
        const durationPaymentCovered = projectSubscriptionTransactionSoFar.length - 1;
        const amountRemainingMajor = parseFloat((projectSubscriptionTransaction.projectSubscription.amountRemainingMinor / 100).toFixed(2));
        if (totalCostPayment !== amountRemainingMajor) {
            yield (0, exports.nextPendingRecurrentPayment)(projectSubscription, projectSubscriptionTransaction.project, investor, projectSubscriptionTransaction.developer, paidUpdatedProjectSubscriptionTransaction, durationPaymentCovered);
        }
        return true;
    }
    if (projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant_1.ProjectSubscriptionPaymentVariant.CARD) {
        throw new error_response_types_1.UnprocessableEntityError('Payment Method Does Not Exist');
    }
    if (projectSubscriptionPaymentVariant === ProjectSubscriptionPaymentVariant_1.ProjectSubscriptionPaymentVariant.MONO) {
        // processDirectPayRequestviaMono
        yield MortgageCardService.processDirectPayRequestviaMono(investor, projectSubscriptionTransaction, totalCost);
        return true;
    }
    throw new error_response_types_1.UnprocessableEntityError('No Payment Method Selected');
});
exports.paymentForRecurrentSubscriptionTransansaction = paymentForRecurrentSubscriptionTransansaction;
const processMonoWebhook = () => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.processMonoWebhook = processMonoWebhook;
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
const updateProjectSubscriptionDate = (susbscription, susbscriptionDate, investor) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
    projectSubscriptionRepo
        .createQueryBuilder()
        .update(ProjectSubscription_1.ProjectSubscription)
        .set({ susbscriptionDate })
        .where({
        id: susbscription.id,
        investorUserId: investor.id,
    })
        .execute();
    return true;
});
exports.updateProjectSubscriptionDate = updateProjectSubscriptionDate;
const calculateInvestorRemainingBalance = (payload, project) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSubscriptionAmount = parseInt((project.costPerSlot * payload.numberOfSlots).toFixed(2));
    const remainingAmount = parseInt((totalSubscriptionAmount - payload.amountPaid).toFixed(2));
    return remainingAmount;
});
exports.calculateInvestorRemainingBalance = calculateInvestorRemainingBalance;
const updateProjectStage = (developer, payload, projectUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getFreshConnection)();
    const projectRepo = connection.getRepository(Project_1.Project);
    yield (0, exports.isUserADeveloper)(developer.id);
    const project = yield projectRepo.findOne({
        where: {
            uuid: projectUuid,
            userId: developer.id,
            isSoftDeleted: false
        }
    });
    if (!project) {
        throw new error_response_types_1.UnprocessableEntityError("Developer Project Does Not Exist");
    }
    if (project.status === ProjectEnums_1.ProjectStatuses.CLOSED) {
        throw new error_response_types_1.UnprocessableEntityError("Can Update Close Project");
    }
    const stageExists = project.stages.some((stageObj) => stageObj.stage === payload.stage);
    if (stageExists) {
        throw new error_response_types_1.UnprocessableEntityError("Stage already exists in the project");
    }
    else {
        const now = Utils.utcNow();
        project.stages.push({
            stage: payload.stage,
            dateTimeInISO8601: now.toISOString()
        });
        yield projectRepo
            .createQueryBuilder()
            .update(Project_1.Project)
            .set({
            stages: project.stages
        })
            .where({ id: project.id })
            .execute();
        return true;
    }
});
exports.updateProjectStage = updateProjectStage;
//# sourceMappingURL=projectService.js.map