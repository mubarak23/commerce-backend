import Logger from '../logger'
import express from 'express'

// @ts-ignore
function tryToParseJSON(item) {
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
}

const middlewareHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.on('finish', () => {
    const requestBody = tryToParseJSON(req.body)
    // @ts-ignore
    const responseBody = tryToParseJSON(res.body)

    Logger.info({
      endPoint: req.originalUrl,
      request: {
        headers: req.headers,
        body: requestBody,
      },
      response: {
        statusCode: res.statusCode,
        body: responseBody,
      },
    })
  })

  next()
}

export default middlewareHandler
