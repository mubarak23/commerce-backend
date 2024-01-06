import { getFreshConnection } from "../db";
import { ApprovedMortgageAccountDocumentDto } from "../dto/ApprovedMortgageAccountDocumentDto";
import { MortgageAccountVerification } from "../entity/MortgageAccountVerification";
import { User } from "../entity/User";
import DeveloperAccountActivationType from "../enums/DeveloperAccountActivationType";
import { MortgageAccountVerificationFiles, UploadFileCategory } from "../enums/FileUpload";
import { Roles } from "../enums/Roles";
import { DeveloperMailInfo } from "../interfaces/DeveloperMailInfo";
import { UnprocessableEntityError } from "../utils/error-response-types";
import * as EmailService from './emailService';


export const approveDeveloperDocument  = async (developer: User,  payload: ApprovedMortgageAccountDocumentDto, fileCategory: MortgageAccountVerificationFiles): Promise<boolean> => {
  
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);
 

  if(![MortgageAccountVerificationFiles.BANK_STATEMENT, MortgageAccountVerificationFiles.GOVERNMENT_APPROVED_ID, MortgageAccountVerificationFiles.RECENT_UTILITY_BILL, MortgageAccountVerificationFiles.CAC_CERTIFICATE].includes(fileCategory)){
    throw new UnprocessableEntityError("Invalid File Type for Approval");
  }


  const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({
    where: { userId: developer.id, accountType: Roles.DEVELOPER}
  })


  if(!mortgageAccountVerification){
    throw new UnprocessableEntityError('No Mortgage Account Verification in Progress')
  }

  if(fileCategory === MortgageAccountVerificationFiles.BANK_STATEMENT){
    if(mortgageAccountVerification.bankStatement.documentType !== UploadFileCategory.BANK_STATEMENT){
      throw new UnprocessableEntityError("Invalid File Type for Approval");
    }

    if(mortgageAccountVerification.bankStatement.keyFromCloudProvider !== payload.fileKey){
      throw new UnprocessableEntityError("Invalid File Type for Approval");
    }

    mortgageAccountVerificationRepo
    .createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({ bankStatementApproved: true})
    .where({
      uuid: mortgageAccountVerification.uuid,
    })
    .execute();
  return true

  }

  if(fileCategory === MortgageAccountVerificationFiles.GOVERNMENT_APPROVED_ID){
    if(mortgageAccountVerification.governmentApprovedId.documentType !== UploadFileCategory.GOVERNMENT_APPROVED_ID){
      throw new UnprocessableEntityError("Invalid File Type for Approval");
    }

    if(mortgageAccountVerification.governmentApprovedId.keyFromCloudProvider !== payload.fileKey){
      throw new UnprocessableEntityError("Invalid File Type for Approval");
    }

    mortgageAccountVerificationRepo
    .createQueryBuilder()
    .update(MortgageAccountVerification)
    .set({ governmentApprovedIdApproved: true})
    .where({
      uuid: mortgageAccountVerification.uuid,
    })
    .execute();
  return true
  
} 

if(fileCategory === MortgageAccountVerificationFiles.RECENT_UTILITY_BILL){
  mortgageAccountVerificationRepo
  .createQueryBuilder()
  .update(MortgageAccountVerification)
  .set({ recentUtilityBillApproved: true})
  .where({
    uuid: mortgageAccountVerification.uuid,
  })
  .execute();
  return true

}

if(fileCategory === MortgageAccountVerificationFiles.CAC_CERTIFICATE){
  mortgageAccountVerificationRepo
  .createQueryBuilder()
  .update(MortgageAccountVerification)
  .set({ cacCertificateApproved: true})
  .where({
    uuid: mortgageAccountVerification.uuid,
  })
  .execute();
  return true

}

  throw new UnprocessableEntityError("Invalid File Type for Approval");

}

export const approveDeveloperAccount  = async (developer: User): Promise<boolean> => {
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);
 

  const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({
    where: { userId: developer.id, accountType: Roles.DEVELOPER}
  })


  if(!mortgageAccountVerification){
    throw new UnprocessableEntityError('No Mortgage Account Verification in Progress')
  }

  mortgageAccountVerificationRepo
  .createQueryBuilder()
  .update(MortgageAccountVerification)
  .set({ 
    bankStatementApproved: true,
    governmentApprovedIdApproved: true,
    recentUtilityBillApproved: true,
    isApproved: true,
    })
  .where({
    uuid: mortgageAccountVerification.uuid,
  })
  .execute();
return true

}

export const confirmDeveloperAccount  = async (developer: User): Promise<boolean> => {
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);
 

  const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({
    where: { userId: developer.id, accountType: Roles.DEVELOPER}
  })


  if(!mortgageAccountVerification){
    throw new UnprocessableEntityError('No Mortgage Account Verification in Progress')
  }

  if(mortgageAccountVerification.isApproved === false){
    throw new UnprocessableEntityError('Cannot Confirm a Mortgage Account Whose Verification Has Not Been Approved')
  }

  mortgageAccountVerificationRepo
  .createQueryBuilder()
  .update(MortgageAccountVerification)
  .set({ 
    bankStatementApproved: true,
    governmentApprovedIdApproved: true,
    recentUtilityBillApproved: true,
    isApproved: true,
    accountConfirmed: true,
    })
  .where({
    uuid: mortgageAccountVerification.uuid,
  })
  .execute();

    // dispatch mail say account is approve
    const developerInfo:DeveloperMailInfo = {
      email: developer.emailAddress!,
      firstName: developer.firstName,
     }
    await EmailService.sendDeveloperAccountApprovalMail(developerInfo)
    
return true

}

export const sendDeveloperAccountApprovalRequest = async (developer: User): Promise <boolean> => {

  if(developer.isDeveloper !== true){
    return false;
  }
  
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);
   // if all file has been uploaded
  const hasFileBeenUploaded = await mortgageAccountVerificationRepo.findOne({
    where: { userId: developer.id}
  })

  if(hasFileBeenUploaded && hasFileBeenUploaded.bankStatement && hasFileBeenUploaded.cacCertificate && hasFileBeenUploaded.governmentApprovedId && hasFileBeenUploaded.recentUtilityBill){
      if(hasFileBeenUploaded.accountConfirmed !== true){
           // dispatch mail that say his account is waiting for approval
       const developerInfo:DeveloperMailInfo = {
        email: developer.emailAddress!,
        firstName: developer.firstName,
       }
       await EmailService.sendDeveloperAccountAwaitApprovalMail(developerInfo)
       return true
      }
      return false
  }
  return false
}

export const confirmAndApprovedDeveloperAccount  = async (developer: User): Promise<boolean> => {
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);
 

  const mortgageAccountVerification = await mortgageAccountVerificationRepo.findOne({
    where: { userId: developer.id, accountType: Roles.DEVELOPER}
  })


  if(!mortgageAccountVerification){
    throw new UnprocessableEntityError('No Mortgage Account Verification in Progress')
  }

  mortgageAccountVerificationRepo
  .createQueryBuilder()
  .update(MortgageAccountVerification)
  .set({ 
    bankStatementApproved: true,
    governmentApprovedIdApproved: true,
    recentUtilityBillApproved: true,
    isApproved: true,
    accountConfirmed: true,
    })
  .where({
    uuid: mortgageAccountVerification.uuid,
  })
  .execute();
  // dispatch mail say account is approve
  const developerInfo:DeveloperMailInfo = {
    email: developer.emailAddress!,
    firstName: developer.firstName,
   }
  await EmailService.sendDeveloperAccountApprovalMail(developerInfo)
  
return true

}


export const isDeveloperAccountApprovedAndConfirm  = async (userId: number): Promise<boolean> =>{
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);

  const isDeveloperConfirm = await mortgageAccountVerificationRepo.findOne({
    where: { userId, isApproved: true, accountConfirmed: true}
  })

  if(!isDeveloperConfirm){
    throw new UnprocessableEntityError('Developer Account Has Not Been Verified')
  }

  return true;
} 

export const isDeveloperAccountApprovedAndConfirmRequest  = async (userId: number): Promise<DeveloperAccountActivationType> =>{
  const connection = await getFreshConnection();
  const mortgageAccountVerificationRepo = connection.getRepository(MortgageAccountVerification);

  const isDeveloperConfirm = await mortgageAccountVerificationRepo.findOne({
    where: { userId, isApproved: true, accountConfirmed: true}
  })

  if(isDeveloperConfirm){
    return DeveloperAccountActivationType.active
  }

  const developerDocsSend = await mortgageAccountVerificationRepo.findOne({
    where: { userId }
  })
  
  if(!developerDocsSend){
    return DeveloperAccountActivationType.inactive;
  }
  if (
    developerDocsSend.bankStatement ||
    developerDocsSend.governmentApprovedId ||
    developerDocsSend.recentUtilityBill ||
    developerDocsSend.cacCertificate
  ) {
    return DeveloperAccountActivationType.pending;
  }

  return DeveloperAccountActivationType.inactive;
} 
