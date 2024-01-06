import jwt from 'jsonwebtoken'

import { getRepository } from 'typeorm'
import { Business } from '../entity/Business'
import { User } from '../entity/User'
import { WareHouse } from '../entity/WareHouse'
import { CooperateUserRole } from '../enums/CooperateUserRole'
import DeveloperAccountActivationType from '../enums/DeveloperAccountActivationType'
import Rest from '../enums/Rest'
import { IAccessTokenData } from '../interfaces/IAccessTokenData'
import { IJwtPayload } from '../interfaces/IJwtPayload'


export const getAccessToken = async (existingUser: User, warehouse?: WareHouse, isDeveloperAccountApprovedAndConfirm?: DeveloperAccountActivationType): Promise<IAccessTokenData> => {
  const signableUser: IJwtPayload = {
    uuid: existingUser.uuid,
    firstName: existingUser.firstName ?? '',
    lastName: existingUser.lastName ?? '',
    phoneNumber: existingUser.msisdn ?? '',
    email: existingUser.emailAddress ?? '',
    isSeller: existingUser.isSeller,
    accountId: existingUser.accountId,
    isCooperate: existingUser.isCooperate,
    isDeveloper: existingUser.isDeveloper,
    isInvestor: existingUser.isInvestor,
    isDeveloperAccountApprovedAndConfirm: isDeveloperAccountApprovedAndConfirm || DeveloperAccountActivationType.inactive,
    companyName: existingUser.companyName ?? null,
    warehouseUuid: warehouse ? warehouse.uuid : null,
    cooperateUserRole: warehouse ? CooperateUserRole.WARE_HOUSE_LEVEL : CooperateUserRole.ACCOUNT_LEVEL,
    photo: existingUser.photo,
    adminCanEdit: existingUser.adminCanEdit,
    adminCanView: existingUser.adminCanView,
    updateBusinessInfo: await isBusinessInfoUpdated(existingUser.id)
  };
  const jwtSecret: string = (process.env.JWT_SECRET as string)

  const generatedToken = jwt.sign(signableUser, jwtSecret, {
    expiresIn: Rest.JWT_TIMEOUT
  })
  const generatedRefreshToken = jwt.sign(signableUser, jwtSecret, {
    expiresIn: Rest.JWT_REFRESH_TIMEOUT
  })

  // if(existingUser.isDeveloper){
  //   await developerService.sendDeveloperAccountApprovalRequest(existingUser)
  // }
  return {
    token: generatedToken,
    refreshToken: generatedRefreshToken,
  }
}

const isBusinessInfoUpdated = async(userId: number): Promise<boolean> =>{
  const businessRepo = getRepository(Business);
  const businessInfo = await businessRepo.findOne({ where: { userId} })
  
  // eslint-disable-next-line no-unneeded-ternary
  return businessInfo == null ? true : false;
}
