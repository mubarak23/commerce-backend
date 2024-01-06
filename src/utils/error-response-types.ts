import HttpStatus from 'http-status-codes'

export class DetailedError {
  message: string
  standardizedErrorCode: string

  constructor(message: string, standardErrorCode: string) {
    this.message = message
    this.standardizedErrorCode = standardErrorCode
  }
}

interface ServiceLayerError {
  error: string
  detailedErrors: DetailedError[] | undefined
  statusCode: number
}

export abstract class BaseServiceException extends Error implements ServiceLayerError {
  error: string
  statusCode: number
  detailedErrors: DetailedError[]
  constructor(error: string, detailedErrors: DetailedError[]) {
    super(error)
    this.error = error
    this.detailedErrors = detailedErrors
    if(!error && detailedErrors.length) {
      this.error = detailedErrors[0].message
    }
    this.message = this.error
    this.statusCode = HttpStatus.BAD_REQUEST
  }
}

export class BadRequestError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.BAD_REQUEST
  }
}

export class UnauthorizedRequestError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.UNAUTHORIZED
  }
}

export class ForbiddenRequestError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.FORBIDDEN
  }
}

export class NotFoundError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.NOT_FOUND
  }
}

export class UnprocessableEntityError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
  }
}

export class ConflictError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.CONFLICT
  }
}

export class ServerError extends BaseServiceException {
  constructor(error: string, detailedErrors: DetailedError[] = []) {
    super(error, detailedErrors);
    this.statusCode = HttpStatus.FORBIDDEN
  }
}
