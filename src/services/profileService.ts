/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { In } from "typeorm"
import { getFreshConnection } from '../db'
import IProfile, { IBusinessProfile, IPublicBusinessProfile, IPublicProfile, IPublicProfileForAdmin } from "../dto/IProfileResponse"
import { Business } from "../entity/Business"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"
import { ICloudFile } from '../interfaces/ICloudFile'
import * as Utils from "../utils/core"
import { NotFoundError, UnprocessableEntityError } from "../utils/error-response-types"


export const getPublicBusinessProfile = async (business: Business): Promise<IPublicBusinessProfile | undefined> => {
  if (!business) {
    return
  }

  return {
    businessName: business.name,
    businessAddress: business.address,
  }
}

export const getPublicProfile = async (theUser: User): Promise<IPublicProfile> => {
  const connection = await getFreshConnection()

  const businessRepo = connection.getRepository(Business)
  const business = await businessRepo.findOne({userId: theUser.id})

  const businessPublicProfile = await getPublicBusinessProfile(business!)

  const userPhoto: ICloudFile = theUser.photo || Utils.userDefaultAvatarCloudFile()

  const storeFrontBanner: ICloudFile = theUser.storeFrontBanner || Utils.defaultStoreFrontBanner()

  const profileData: IPublicProfile = {
    userUuid: theUser.uuid,

    firstName: theUser.firstName,
    lastName: theUser.lastName,
    photoUrl: userPhoto.url,
    storeFrontBannerImageUrl: storeFrontBanner.url,
    role: theUser.role,
    sellerUniqueCode: theUser.uniqueCode,

    accountRating: {
      totalRatingsValue: theUser.totalRatingsValue,
      totalNumberOfRatings: theUser.totalNumberOfRatings,
    },

    businessProfile: businessPublicProfile
  }

  return profileData
}


export const getPublicMortageUserProfile = async (theUser: User): Promise<IPublicProfile> => {

  const userPhoto: ICloudFile = theUser.photo || Utils.userDefaultAvatarCloudFile()

  const storeFrontBanner: ICloudFile = theUser.storeFrontBanner || Utils.defaultStoreFrontBanner()

  const profileData: IPublicProfile = {
    userUuid: theUser.uuid,

    firstName: theUser.firstName,
    lastName: theUser.lastName,
    photoUrl: userPhoto.url,
    storeFrontBannerImageUrl: storeFrontBanner.url,
    role: theUser.role,
    sellerUniqueCode: theUser.uniqueCode,

    accountRating: {
      totalRatingsValue: theUser.totalRatingsValue,
      totalNumberOfRatings: theUser.totalNumberOfRatings,
    },

  }

  return profileData
}

export const getPublicMortageUserFromUserIds = async (userIds: number[]): Promise<IPublicProfile[]> => {
  if (!userIds.length) {
    return []
  }

  const connection = await getFreshConnection()

  const userRepo = connection.getRepository(User)
  const users = await userRepo.find({
    id: In(userIds),
  })
  if (!users.length) {
    return []
  }
  
  const profilesData: IPublicProfile[] = []
  
  for(const user of users) {
    const userData = users.find(u => u.id === user.id)
    if(!userData) {
      continue
    }
    const userPhoto: ICloudFile = userData!.photo || Utils.userDefaultAvatarCloudFile()


    profilesData.push({
      userUuid: userData.uuid,
      userId: userData!.id,
      firstName: userData!.firstName,
      lastName: userData!.lastName,
      photoUrl: userPhoto.url,
      phoneNumber: userData!.msisdn,
      sellerUniqueCode: userData!.uniqueCode,
      role: userData.role,

      accountRating: {
        totalRatingsValue: user.totalRatingsValue,
        totalNumberOfRatings: user.totalNumberOfRatings,
      },
    })
  }

  return profilesData
}


export const activateCStoreUser = async (customerUser: User): Promise<boolean> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const isOnCStoreValue = !customerUser.settings?.isOnCStore;

  await userRepo
  .createQueryBuilder()
  .update(User)
  .set({
    settings: {
      ...customerUser?.settings,
      isOnCStore: isOnCStoreValue,
    },
  })
  .where({ id: customerUser.id! })
  .execute();
// send mail to user about his c-store activation
  return true;
}
export const getBusinessProfile = async (business: Business): Promise<IBusinessProfile | any> => {
  if (!business) {
    return {}
  }

  return {
    businessName: business.name,
    businessAddress: business.address,
    businessCACNumber: business.cacNumber,
  }
}

export const getBusinessProfileFromUser = async (theUser: User): Promise<IBusinessProfile | undefined> => {
  const connection = await getFreshConnection()

  const businessRepo = connection.getRepository(Business)
  const business = await businessRepo.findOne({
    userId: theUser.id
  })
  if (!business) {
    return
  }
  const businessProfileData = await getBusinessProfile(business)

  return businessProfileData
}

export const getSelfProfile = async (theUser: User): Promise<IProfile> => {
  const businessProfileData: IBusinessProfile | undefined = await getBusinessProfileFromUser(theUser)

  const userPhoto: ICloudFile = theUser.photo || Utils.userDefaultAvatarCloudFile()

  const profileData: IProfile = {
    userUuid: theUser.uuid,
    isOnProductLease: !!theUser.settings?.isOnProductLease,
    isOnDelayedProductLease: !!theUser.settings?.isOnDelayedProductLease,
    
    firstName: theUser.firstName,
    lastName: theUser.lastName,
    emailAddress: theUser.emailAddress,
    msisdn: theUser.msisdn,
    photoUrl: userPhoto.url,
    role: theUser.role,
    isCooperate: theUser.isCooperate,
    accountId: theUser.accountId,
    wareHouseid: theUser.wareHouseId,
    sellerUniqueCode: theUser.uniqueCode,

    accountRating: {
      totalRatingsValue: theUser.totalRatingsValue,
      totalNumberOfRatings: theUser.totalNumberOfRatings,
    },

    businessProfile: businessProfileData
  }

  return profileData
}

export const getPublicProfileFromUserId = async (userId: number): Promise<IPublicProfile> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const user = await userRepo.findOne({
    id: userId
  })
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const publicProfile = await getPublicProfile(user)
  return publicProfile
}

export const getPublicProfileFromUserUuid = async (userUuid: string): Promise<IPublicProfile> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const user = await userRepo.findOne({
    uuid: userUuid
  })
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const publicProfile = await getPublicProfile(user)
  return publicProfile
}





export const getBusinessProfileFromUserId = async (userId: number): Promise<IBusinessProfile | undefined> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const businessRepo = connection.getRepository(Business)

  const user = await userRepo.findOne({
    id: userId
  })
  const business = await businessRepo.findOne({
    userId,
  })
  if (!business) {
    return
  }

  const businessProfileData = await getBusinessProfile(business)
  return businessProfileData
}

export const getPublicProfileFromUserIds = async (userIds: number[]): Promise<IPublicProfile[]> => {
  if (!userIds.length) {
    return []
  }

  const connection = await getFreshConnection()

  const userRepo = connection.getRepository(User)
  const users = await userRepo.find({
    id: In(userIds),
  })
  if (!users.length) {
    return []
  }

  const businessRepo = connection.getRepository(Business)
  const businesses = await businessRepo.find({ userId: In(userIds) })
  
  const profilesData: IPublicProfile[] = []
  
  for(const user of users) {
    const userData = users.find(u => u.id === user.id)
    if(!userData) {
      continue
    }
    const userPhoto: ICloudFile = userData!.photo || Utils.userDefaultAvatarCloudFile()

    const businessData = businesses.find(biz => biz.userId === user.id)

    profilesData.push({
      userUuid: userData.uuid,
      userId: userData!.id,
      firstName: userData!.firstName,
      lastName: userData!.lastName,
      photoUrl: userPhoto.url,
      phoneNumber: userData!.msisdn,
      sellerUniqueCode: userData!.uniqueCode,
      role: userData.role,

      accountRating: {
        totalRatingsValue: user.totalRatingsValue,
        totalNumberOfRatings: user.totalNumberOfRatings,
      },

      businessProfile: businessData ? {
        businessName: businessData.name,
        businessAddress: businessData.address,
      } : null
    })
  }

  return profilesData
}




export const getPublicProfileFromUserIdsForAdmin = async (userIds: number[]): Promise<IPublicProfileForAdmin[]> => {
  if(!userIds.length) {
    return []
  }
  const connection = await getFreshConnection()

  const userRepo = connection.getRepository(User)
  const users = await userRepo.find({
    id: In(userIds),
  })

  const walletRepo = connection.getRepository(Wallet)
  const wallets = await walletRepo.find({ userId: In(userIds) })
    
  const profilesData: IPublicProfileForAdmin[] = []

  for (const user of users) {
    const userData = users.find(u => u.id === user.id)
    if (!userData || userData === null) {
      continue
    }

    const userPhoto: ICloudFile = userData?.photo ?? Utils.userDefaultAvatarCloudFile()
    const accountWalletData = wallets.find(wall => wall.userId === userData.id)

    const profileData = {
      id: userData!.uuid,
      userId: userData!.id,
      userUuid: userData!.uuid,
      isOnProductLease: !!userData?.settings?.isOnProductLease,
      isOnDelayedProductLease: !!userData?.settings?.isOnDelayedProductLease,

      firstName: userData!.firstName,
      lastName: userData!.lastName,
      photoUrl: userPhoto.url,
      role: userData.role,
      isSeller: userData.isSeller,
      isCooperate: userData.isCooperate,
      accountId: userData.accountId,
      sellerUniqueCode: userData!.uniqueCode,

      accountRating: {
        totalRatingsValue: userData!.totalRatingsValue,
        totalNumberOfRatings: userData!.totalNumberOfRatings,
      },

      businessProfile: null,
      msisdn: userData.msisdn,
      phoneNumber: userData.phoneNumber,
      walletBalanceMajor: accountWalletData ? accountWalletData?.walletBalanceMinor / 100 ?? 0 : 0,
      walletCurrency: accountWalletData ? accountWalletData.currency : "",
    }

    profilesData.push(profileData)
  }

  return profilesData
}

export const getUserBuyerFullDetails = async (userId: number): Promise<User> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)

  const user = await userRepo.findOne({
    where: { id: userId}
  })

  if(!user){
    throw new UnprocessableEntityError("Buyer User Not Found");
  }

  return user;
}

export const getUserSellerFullDetails = async (sellerUserId: number): Promise<User> => {
  const connection = await getFreshConnection()
  const userRepo = connection.getRepository(User)
  const businessRepo = connection.getRepository(Business)

  const sellerDetails = await userRepo.findOne({
    where: { id: sellerUserId, isSeller: true}
  })
  
  if(!sellerDetails){
    throw new UnprocessableEntityError("Seller Does Not Exist");
  }
  
  const sellerBusiness = await businessRepo.findOne({
    where: { userId: sellerDetails.id}
  })
  
  if(!sellerBusiness){
    throw new UnprocessableEntityError("Seller Must Update Business Information Before They Can Accept Order.")
  }

  

  return sellerDetails;
}




