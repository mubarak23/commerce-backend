import * as jwt from "async-jsonwebtoken";
import express from 'express';
import { getFreshConnection } from "../db";
import { AuditLogs } from '../entity/AuditLogs';
import { User } from '../entity/User';
import { DetailedError, UnauthorizedRequestError } from '../utils/error-response-types';


const auditLogsHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Are We Here')
  try {
    const token = req.headers["x-access-token"] as string;
    const jwtSecret = process.env.JWT_SECRET as string;

    if (!token) {
      throw new UnauthorizedRequestError("Unauthorized");
    }

    const decoded = await jwt.verify(token, jwtSecret) as any;

    const userUuid = decoded.uuid as string;
    const { method, path, body } = req;
    
    const connection = await getFreshConnection();
    const userRepo = connection.getRepository(User);
    const auditLogsRepo = connection.getRepository(AuditLogs);

    const currentUser = await userRepo.findOne({ uuid: userUuid });

    const methodActions = ['POST', 'PUT', 'PATCH', 'DELETE'];

    if (!req.path.includes('admin') && !methodActions.includes(method)) {
      next()
    }
    console.log('Audit Logs Data:', req.path, req.method);

     console.log('Next Step in the iteration');

    next();
  } catch (err) {
    if (err.name && err.name === 'TokenExpiredError') {
      const detailedError = new DetailedError(err.message, err.name);
      console.log("Access token expired", [detailedError])
      next()
     //  throw new UnauthorizedRequestError("Access token expired", [detailedError]);
    }
    next()
  }
};

export default auditLogsHandler;
