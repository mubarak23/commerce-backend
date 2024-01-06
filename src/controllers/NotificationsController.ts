import { Get, Request, Route, Tags, Security, Query, Put, Path, Controller } from "tsoa";

import { IServerResponse } from "../interfaces/IServerResponse";
import { SortOrder } from '../enums/SortOrder';
import { NotificationMessage } from '../entity/NotificationMessage';
import { paginate } from '../services/paginationService';
import { NotFoundError } from '../utils/error-response-types';
import { utcNow } from '../utils/core';
import { User } from "../entity/User";
import { getFreshConnection } from "../db";
import { IPaginatedList } from "../dto/IPaginatedList";
import { INotificationMessageResponseDto } from "../dto/INotificationMessageResponseDto";
import * as NotificationService from "../services/notificationService"

// DO NOT EXPORT DEFAULT

@Route("api/notifications")
@Tags('Notifications')
@Security("jwt")
export class NotificationsController extends Controller {

  @Get('')
  public async getCurrentUserNotificationMessages(@Request() req: any, 
      @Query('pageNumber') pageNumber: any, 
      @Query('sortOrder') sortOrder: SortOrder): Promise<IServerResponse<IPaginatedList<INotificationMessageResponseDto> & {totalUnread: number}>> {
    const currentUser: User = req.user

    const pageSize = 10
    const pageResult = await paginate(NotificationMessage, { userId: currentUser.id }, pageSize, pageNumber, sortOrder)

    const formattedDataSet: INotificationMessageResponseDto[] = pageResult.dataset.map(dataRecord => {
      const notificationMessage = dataRecord as NotificationMessage
      return notificationMessage.toResponseDto()
    })

    const connection = await getFreshConnection()
    const notificationMessageRepo = connection.getRepository(NotificationMessage)
    const totalUnreadMessagesNumber = await notificationMessageRepo.count({
      userId: currentUser.id,
      isRead: false
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet, totalUnread: totalUnreadMessagesNumber}
    }
    
    return resData
  }


  @Put('/:notificationMessageUuid/markAsRead')
  public async markAsRead(@Request() req: any, 
      @Path('notificationMessageUuid') notificationMessageUuid: string): Promise<IServerResponse<void>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()
    const notificationMessageRepo = connection.getRepository(NotificationMessage)
    const notificationMessage = await notificationMessageRepo.findOne({uuid: notificationMessageUuid})

    if(!notificationMessage) {
      throw new NotFoundError('Notification Message was not found')
    }
    if(notificationMessage.userId !== currentUser.id) {
      throw new NotFoundError('You cannot mark the specified notification message as read')
    }
    if(notificationMessage.isRead) {
      const resData: IServerResponse<void> = {
        status: true,
      }
      return resData
    }

    await notificationMessageRepo.createQueryBuilder()
      .update(NotificationMessage)
      .set({ isRead: true, readAt: utcNow()})
      .where({
        id: notificationMessage.id
      })
      .execute()

    notificationMessage.isRead = true

    await NotificationService.updateNotificationInFireStore(currentUser.uuid, notificationMessage)
    
    const resData: IServerResponse<void> = {
      status: true,
    }
    return resData
  }
}
