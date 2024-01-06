/* eslint-disable consistent-return */
import { ValidateError } from '@tsoa/runtime';
import express from 'express'
import { UnauthorizedRequestError } from '../utils/error-response-types';
import Logger from '../logger'


export const handleErrors = (app: express.Application) => {
  app.use(function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ValidateError) {
      return res.status(422).json({
        status: false,
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err.statusCode && !(err instanceof UnauthorizedRequestError)) { // substitude for instanceof BaseServiceException
      Logger.error(err.message)
      Logger.error(err.stack)

      return res.status(err.statusCode).json({
        status: false,
        error: err.message,
      });
    }
    if (err.statusCode && err instanceof UnauthorizedRequestError) {
      Logger.error(err.message)
      Logger.error(err.stack)

      if(err.detailedErrors && err.detailedErrors.length) {
        return res.status(err.statusCode).json({
          status: false,
          error: err.message,
          detailedError: err.detailedErrors[0],
          detailedErrors: err.detailedErrors,
        });
      } 
        return res.status(err.statusCode).json({
          status: false,
          error: err.message,
        });
      
    }
    if (err instanceof Error) {
      Logger.error(err.message)
      Logger.error(err.stack)

      return res.status(500).json({
        status: false,
        error: err.message,
      });
    }
    next();
  });
}
