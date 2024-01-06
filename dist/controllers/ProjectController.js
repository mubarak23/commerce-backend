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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const tsoa_1 = require("tsoa");
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const db_1 = require("../db");
const Project_1 = require("../entity/Project");
const ProjectSubscription_1 = require("../entity/ProjectSubscription");
const User_1 = require("../entity/User");
const ProjectEnums_1 = require("../enums/ProjectEnums");
const ProjectSubscriptionPaymentVariant_1 = require("../enums/ProjectSubscriptionPaymentVariant");
const SortOrder_1 = require("../enums/SortOrder");
const PaginationService = __importStar(require("../services/paginationService"));
const ProjectService = __importStar(require("../services/projectService"));
const error_response_types_1 = require("../utils/error-response-types");
let ProjectController = class ProjectController extends tsoa_1.Controller {
    handleGetProjects(req, pageNumber, sortOrder, projectStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            //--
            const query = {};
            if (projectStatus && projectStatus !== ProjectEnums_1.ProjectStatuses.ALL) {
                query.status = projectStatus;
            }
            const join = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectRepo.count(query);
            const projectListsPages = yield PaginationService.paginate(Project_1.Project, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectLists = projectListsPages.dataset;
            if (projectLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetMyProjects(req, pageNumber, sortOrder, projectStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            //--
            const query = {};
            if (projectStatus && projectStatus !== ProjectEnums_1.ProjectStatuses.ALL) {
                query.status = projectStatus;
            }
            query.userId = req.user;
            const join = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectRepo.count(query);
            const projectListsPages = yield PaginationService.paginate(Project_1.Project, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectLists = projectListsPages.dataset;
            if (projectLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetMyProjectsSubscription(req, pageNumber, sortOrder, projectStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            //--
            const query = {};
            if (projectStatus && projectStatus !== ProjectEnums_1.ProjectStatuses.ALL) {
                query.status = projectStatus;
            }
            query.developerUserId = req.user.id;
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectSubscriptionRepo.count(query);
            const projectSubscriptionListsPages = yield PaginationService.paginate(ProjectSubscription_1.ProjectSubscription, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectSubscriptionLists = projectSubscriptionListsPages.dataset;
            if (projectSubscriptionLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project Subscription at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformProjectSubscriptions(projectSubscriptionLists);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetPopularProjectBaseOnSubscriptions(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            const projectRepo = connection.getRepository(Project_1.Project);
            //--
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            const projectSubscriptionLists = yield projectSubscriptionRepo.find({
                join
            });
            if (projectSubscriptionLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Popular Project at the moment');
            }
            const projectSubscriptionCounts = {};
            projectSubscriptionLists.forEach((subscription) => {
                const projectId = subscription.project.id;
                projectSubscriptionCounts[projectId] = (projectSubscriptionCounts[projectId] || 0) + 1;
            });
            const projectsWithMoreThan10Subscriptions = projectSubscriptionLists.filter((subscription) => projectSubscriptionCounts[subscription.project.id] > 5);
            if (projectsWithMoreThan10Subscriptions.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Popular Project at the moment');
            }
            const projectIds = projectsWithMoreThan10Subscriptions.map((subscription) => subscription.project.id);
            const joinProject = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            //--
            const projects = yield projectRepo.find({
                join: joinProject,
                where: {
                    id: (0, typeorm_1.In)(projectIds),
                }
            });
            if (projects.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Popular Project at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projects);
            const resData = {
                status: true,
                data: transformedProjectListsDataset,
            };
            return resData;
        });
    }
    handleGetUserUnSubscriptionProjects(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            const projectRepo = connection.getRepository(Project_1.Project);
            //--
            const query = {};
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            const joinProject = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            const projectSubscriptionLists = yield projectSubscriptionRepo.find({
                where: { investorUserId: req.user.id },
                join
            });
            if (projectSubscriptionLists.length === 0) {
                //--
                query.status = ProjectEnums_1.ProjectStatuses.ACTIVE;
                const pageSize = 10;
                const totalCount = yield projectSubscriptionRepo.count(query);
                const projectListsPages = yield PaginationService.paginate(Project_1.Project, query, pageSize, pageNumber, sortOrder, undefined, joinProject);
                const projectLists = projectListsPages.dataset;
                if (projectLists.length === 0) {
                    throw new error_response_types_1.UnprocessableEntityError('Not Popular Project at the moment');
                }
                const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
                const resData = {
                    status: true,
                    data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
                };
                return resData;
            }
            const projectIds = projectSubscriptionLists.map(subscription => subscription.projectId);
            query.status = ProjectEnums_1.ProjectStatuses.ACTIVE;
            const pageSize = 10;
            const totalCount = yield projectSubscriptionRepo.count(query);
            const projectListsPages = yield PaginationService.paginate(Project_1.Project, query, pageSize, pageNumber, sortOrder, undefined, joinProject);
            const projectLists = projectListsPages.dataset;
            if (projectLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Popular Project at the moment');
            }
            const filteredProjects = projectLists.filter((project) => {
                return !projectIds.includes(project.id);
            });
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(filteredProjects);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    handleGetTopLocationProjects(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            const join = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            const projects = yield projectRepo.find({
                join,
            });
            if (projects.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Top Location Project at the moment');
            }
            const filteredProjects = projects.filter((project) => {
                const projectsWithSameLocation = projects.filter((p) => p.address === project.address);
                return projectsWithSameLocation.length > 3;
            });
            if (filteredProjects.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Top Location Project at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(filteredProjects);
            const resData = {
                status: true,
                data: transformedProjectListsDataset,
            };
            return resData;
        });
    }
    handleMyProjectFetchDetails(req, projectUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectDetails = yield ProjectService.getProjectByUuid(projectUuid);
            if (!projectDetails) {
                throw new error_response_types_1.NotFoundError("Specified Project Does Not Exist");
            }
            const transformProjectDetails = yield ProjectService.transformProject(projectDetails, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    handleProjectFetchDetails(req, projectUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectDetails = yield ProjectService.getProjectByUuid(projectUuid);
            if (!projectDetails) {
                throw new error_response_types_1.NotFoundError("Specified Project Does Not Exist");
            }
            const transformProjectDetails = yield ProjectService.transformPublicProject(projectDetails);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    handleProjectSubscriptionFetchDetails(req, subscriptionUuid) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const projectSubscription = yield projectSubscriptionRepo.findOne({
                where: { uuid: subscriptionUuid, developerUserId: req.user.id, isSoftDeleted: false },
                join
            });
            if (!projectSubscription) {
                throw new error_response_types_1.NotFoundError("Specified Project Subscription Does Not Exist");
            }
            const transformProjectDetails = yield ProjectService.transformProjectSubscription(projectSubscription, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    handleFetchInvestorProjectSubscriptionDetails(req, subscriptionUuid, investorUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            const userRepo = connection.getRepository(User_1.User);
            const investorUser = yield userRepo.findOne({
                where: { uuid: investorUuid, isInvestor: true }
            });
            if (!investorUser) {
                throw new error_response_types_1.UnprocessableEntityError("Investor Does Not Exist");
            }
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            const projectSubscription = yield projectSubscriptionRepo.findOne({
                where: { uuid: subscriptionUuid, developerUserId: req.user.id, investorUserId: investorUser.id, isSoftDeleted: false },
                join
            });
            if (!projectSubscription) {
                throw new error_response_types_1.NotFoundError("Specified Project Subscription Does Not Exist");
            }
            const transformProjectDetails = yield ProjectService.transformProjectSubscription(projectSubscription, req.user);
            this.setStatus(200);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    handleGetInvestorSubscription(req, investorUuid, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectSubscriptionRepo = connection.getRepository(ProjectSubscription_1.ProjectSubscription);
            const userRepo = connection.getRepository(User_1.User);
            const investorUser = yield userRepo.findOne({
                where: { uuid: investorUuid, isInvestor: true }
            });
            if (!investorUser) {
                throw new error_response_types_1.UnprocessableEntityError("Investor Does Not Exist");
            }
            //--
            const query = {};
            query.status = ProjectEnums_1.ProjectStatuses.ACTIVE;
            query.developerUserId = req.user;
            query.investorUserId = investorUser.id;
            const join = {
                alias: "project_subscriptions",
                leftJoinAndSelect: {
                    developer: "project_subscriptions.developer",
                    investor: "project_subscriptions.investor",
                    project: "project_subscriptions.project",
                },
            };
            //--
            const pageSize = 10;
            const totalCount = yield projectSubscriptionRepo.count(query);
            const projectSubscriptionListsPages = yield PaginationService.paginate(ProjectSubscription_1.ProjectSubscription, query, pageSize, pageNumber, sortOrder, undefined, join);
            const projectSubscriptionLists = projectSubscriptionListsPages.dataset;
            if (projectSubscriptionLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('Not Project Subscription at the moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformProjectSubscriptions(projectSubscriptionLists);
            const resData = {
                status: true,
                data: { pageNumber, pageSize, dataset: transformedProjectListsDataset, total: totalCount }
            };
            return resData;
        });
    }
    filterProjects(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            //--
            if (requestBody.searchWord) {
                const projectLists = yield projectRepo
                    .createQueryBuilder("projects")
                    .where("LOWER(projects.name) LIKE :searchWord", {
                    searchWord: `${requestBody.searchWord.toLowerCase()}%`,
                })
                    .where('projects.status = :activeStatus', { activeStatus: ProjectEnums_1.ProjectStatuses.ACTIVE })
                    .leftJoinAndSelect("projects.user", "user")
                    .limit(10)
                    .getMany();
                if (projectLists.length === 0) {
                    throw new error_response_types_1.UnprocessableEntityError('No Project Found at the moment');
                }
                const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
                const resData = {
                    status: true,
                    data: transformedProjectListsDataset,
                };
                return resData;
            }
            const query = {};
            query.status = ProjectEnums_1.ProjectStatuses.ACTIVE;
            if ((0, underscore_1.isEmpty)(requestBody)) {
                const join = {
                    alias: "project",
                    leftJoinAndSelect: {
                        user: "project.user",
                    },
                };
                //--
                const pageSize = 10;
                const projectListsPages = yield PaginationService.paginate(Project_1.Project, query, pageSize, 1, SortOrder_1.SortOrder.ASCENDING, undefined, join);
                const projectLists = projectListsPages.dataset;
                if (projectLists.length === 0) {
                    throw new error_response_types_1.UnprocessableEntityError('No Project Found at the Momentt');
                }
                const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
                const resData = {
                    status: true,
                    data: transformedProjectListsDataset,
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
            const projectLists = yield queryBuilder.getMany();
            if (projectLists.length === 0) {
                throw new error_response_types_1.UnprocessableEntityError('No Project Found at the Moment');
            }
            const transformedProjectListsDataset = yield ProjectService.transformPublicProjects(projectLists);
            const resData = {
                status: true,
                data: transformedProjectListsDataset,
            };
            return resData;
        });
    }
    createProject(req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const createdProduct = yield ProjectService.handleCreateProject(requestBody, currentUser, currentUser.accountId);
            const transformProjectDetails = yield ProjectService.transformProject(createdProduct, currentUser);
            this.setStatus(201);
            const resData = {
                status: true,
                data: transformProjectDetails,
            };
            return resData;
        });
    }
    createProjectSubscription(req, projectSubscriptionPaymentVariant, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const projectSubscription = yield ProjectService.handleSubscribeToProject(requestBody, currentUser, projectSubscriptionPaymentVariant);
            this.setStatus(201);
            const resData = {
                status: true,
                data: projectSubscription,
            };
            return resData;
        });
    }
    handleProjectUpdate(req, projectUuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const updateProjectData = reqBody;
            yield ProjectService.updateProjectDetails(updateProjectData, currentUser.id, projectUuid);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleProjectUpdateStatus(req, projectUuid, newprojectstatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            yield ProjectService.isUserADeveloper(currentUser.id);
            const connection = yield (0, db_1.getFreshConnection)();
            const projectRepo = connection.getRepository(Project_1.Project);
            // call this at the controller level
            // await isUserADeveloper(user.id)
            const join = {
                alias: "project",
                leftJoinAndSelect: {
                    user: "project.user",
                },
            };
            const project = yield projectRepo.findOne({
                where: { uuid: projectUuid, userId: currentUser.id, isSoftDeleted: false },
                join
            });
            if (!project) {
                throw new error_response_types_1.UnprocessableEntityError('Project Does not Exist');
            }
            yield ProjectService.updateProjectSatatus(project, newprojectstatus);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
    handleUpdateProjectStage(req, projectUuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const updateProjectStage = reqBody;
            yield ProjectService.updateProjectStage(currentUser, updateProjectStage, projectUuid);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(""),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetProjects", null);
__decorate([
    (0, tsoa_1.Get)("myprojects"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetMyProjects", null);
__decorate([
    (0, tsoa_1.Get)("subscriptions"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __param(3, (0, tsoa_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetMyProjectsSubscription", null);
__decorate([
    (0, tsoa_1.Get)("popularprojects"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetPopularProjectBaseOnSubscriptions", null);
__decorate([
    (0, tsoa_1.Get)("unsubscriptionprojects"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)("pageNumber")),
    __param(2, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetUserUnSubscriptionProjects", null);
__decorate([
    (0, tsoa_1.Get)("toplocationprojects"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetTopLocationProjects", null);
__decorate([
    (0, tsoa_1.Get)("/myprojects/:projectUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("projectUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleMyProjectFetchDetails", null);
__decorate([
    (0, tsoa_1.Get)("/:projectUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("projectUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleProjectFetchDetails", null);
__decorate([
    (0, tsoa_1.Get)("/subscriptions/:subscriptionUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("subscriptionUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleProjectSubscriptionFetchDetails", null);
__decorate([
    (0, tsoa_1.Get)("/subscriptions/:subscriptionUuid/:investorUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("subscriptionUuid")),
    __param(2, (0, tsoa_1.Path)("investorUuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleFetchInvestorProjectSubscriptionDetails", null);
__decorate([
    (0, tsoa_1.Get)("subscriptions/investor/:investorUuid"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("investorUuid")),
    __param(2, (0, tsoa_1.Query)("pageNumber")),
    __param(3, (0, tsoa_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleGetInvestorSubscription", null);
__decorate([
    (0, tsoa_1.Post)("/filterproject"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "filterProjects", null);
__decorate([
    (0, tsoa_1.Post)("/create"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, tsoa_1.Post)("/subscription/:projectSubscriptionPaymentVariant"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProjectSubscription", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/:uuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleProjectUpdate", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Patch)("/updatestatus/:uuid/:newprojectstatus"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("uuid")),
    __param(2, (0, tsoa_1.Path)("newprojectstatus")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleProjectUpdateStatus", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Patch)("/updateprojectstage/:projectUuid"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("projectUuid")),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleUpdateProjectStage", null);
ProjectController = __decorate([
    (0, tsoa_1.Route)("api/project"),
    (0, tsoa_1.Tags)("Project")
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map