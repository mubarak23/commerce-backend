import { Request } from "express";
import * as jwt from "async-jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "./entity/User";
import { ErrorMessages } from "./enums/ErrorMessages";
import { UnauthorizedRequestError, DetailedError } from './utils/error-response-types';


export const expressAuthentication = async (request: Request, 
    securityName: string, scopes?: string[]): Promise<any> => {
  const token = request.headers["x-access-token"] as string;
  const jwtSecret = process.env.JWT_SECRET as string;

  if (!token) {
    throw new UnauthorizedRequestError("Unauthorized")
  }

  const [decoded, err] = await jwt.verify(token, jwtSecret)

  if (err) {
    if(err.name && err.name === 'TokenExpiredError') {
      const detailedError = new DetailedError(err.message, err.name)
      throw new UnauthorizedRequestError("Access token expired", [detailedError])
    }
    throw new UnauthorizedRequestError(err.message)
  } else {
    const userUuid = (decoded as any).uuid as string;

    const userRepo = getRepository(User);
    const currentUser = await userRepo.findOne({ uuid: userUuid });

    if (!currentUser) {
      throw new Error(ErrorMessages.USER_NON_EXISTENCE);
    }
    return currentUser;
  }
}
