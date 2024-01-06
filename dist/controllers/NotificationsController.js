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
exports.NotificationsController = void 0;
const tsoa_1 = require("tsoa");
const SortOrder_1 = require("../enums/SortOrder");
const NotificationMessage_1 = require("../entity/NotificationMessage");
const paginationService_1 = require("../services/paginationService");
const error_response_types_1 = require("../utils/error-response-types");
const core_1 = require("../utils/core");
const db_1 = require("../db");
const NotificationService = __importStar(require("../services/notificationService"));
// DO NOT EXPORT DEFAULT
let NotificationsController = class NotificationsController extends tsoa_1.Controller {
    getCurrentUserNotificationMessages(req, pageNumber, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const pageSize = 10;
            const pageResult = yield (0, paginationService_1.paginate)(NotificationMessage_1.NotificationMessage, { userId: currentUser.id }, pageSize, pageNumber, sortOrder);
            const formattedDataSet = pageResult.dataset.map(dataRecord => {
                const notificationMessage = dataRecord;
                return notificationMessage.toResponseDto();
            });
            const connection = yield (0, db_1.getFreshConnection)();
            const notificationMessageRepo = connection.getRepository(NotificationMessage_1.NotificationMessage);
            const totalUnreadMessagesNumber = yield notificationMessageRepo.count({
                userId: currentUser.id,
                isRead: false
            });
            const resData = {
                status: true,
                data: Object.assign(Object.assign({}, pageResult), { dataset: formattedDataSet, totalUnread: totalUnreadMessagesNumber })
            };
            return resData;
        });
    }
    markAsRead(req, notificationMessageUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            const connection = yield (0, db_1.getFreshConnection)();
            const notificationMessageRepo = connection.getRepository(NotificationMessage_1.NotificationMessage);
            const notificationMessage = yield notificationMessageRepo.findOne({ uuid: notificationMessageUuid });
            if (!notificationMessage) {
                throw new error_response_types_1.NotFoundError('Notification Message was not found');
            }
            if (notificationMessage.userId !== currentUser.id) {
                throw new error_response_types_1.NotFoundError('You cannot mark the specified notification message as read');
            }
            if (notificationMessage.isRead) {
                const resData = {
                    status: true,
                };
                return resData;
            }
            yield notificationMessageRepo.createQueryBuilder()
                .update(NotificationMessage_1.NotificationMessage)
                .set({ isRead: true, readAt: (0, core_1.utcNow)() })
                .where({
                id: notificationMessage.id
            })
                .execute();
            notificationMessage.isRead = true;
            yield NotificationService.updateNotificationInFireStore(currentUser.uuid, notificationMessage);
            const resData = {
                status: true,
            };
            return resData;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(''),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)('pageNumber')),
    __param(2, (0, tsoa_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getCurrentUserNotificationMessages", null);
__decorate([
    (0, tsoa_1.Put)('/:notificationMessageUuid/markAsRead'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)('notificationMessageUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
NotificationsController = __decorate([
    (0, tsoa_1.Route)("api/notifications"),
    (0, tsoa_1.Tags)('Notifications'),
    (0, tsoa_1.Security)("jwt")
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=NotificationsController.js.map