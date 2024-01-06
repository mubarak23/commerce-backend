import express from 'express';
import { getFreshConnection } from '../db';
import { IAuditLogs } from '../dto/IAuditLogs';
import { AuditLogs } from '../entity/AuditLogs';
import { User } from '../entity/User';
export const saveAuditLogs = async (req: express.Request, currentUser: User): Promise<boolean> =>{

  const { method, path, body } = req;
  const connection = await getFreshConnection();
  const auditLogsRepo = connection.getRepository(AuditLogs);
    
  const newAuditLogs = new AuditLogs().initialize(currentUser!.id, method, path, body);
   await auditLogsRepo.save(newAuditLogs);

  return true

}

export const transformAuditLogs = async (logs: IAuditLogs[]): Promise<IAuditLogs[]> => {
  const auditLogsResponse: IAuditLogs[] = []

  for(const log of logs) {
    const oneTransformLog: IAuditLogs = {
      userId: log.userId,
      method: log.method,
      path: log.path,
      payload: log.payload,
      createdAt: log.createdAt
    }
    auditLogsResponse.push(oneTransformLog)
  }
  
return auditLogsResponse

}


