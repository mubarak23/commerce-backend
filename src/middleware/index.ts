import express from 'express'
// @ts-ignore
import helmet from 'helmet'

import runBodyParseMiddleware from './bodyParser'
import runCorsMiddleware from './cors'
import httpLogger from './http-logger'
import setupSwagger from './swagger'
import { ProductionEnv } from '../constants'

const iniitializeMiddlewares = (app: express.Application) => {
  app.use(helmet())
  
  runBodyParseMiddleware(app)
  runCorsMiddleware(app)

  if(process.env.NODE_ENV === ProductionEnv) {
    app.use(httpLogger)
  }

  // This is key to make swagger work
  app.use(express.static("public"))
  app.set('views', `${__dirname}/public`)

  setupSwagger(app)
}

export default iniitializeMiddlewares
