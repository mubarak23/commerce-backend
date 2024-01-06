import express from 'express'
import iniitializeMiddlewares from './middleware'
import { RegisterRoutes } from "./routes";
import * as GlobalErrorHandler from "./middleware/globalErrorHandler";
import setupSentry from './sentry';
import * as Sentry from "@sentry/node";

process.env.TZ = "UTC"

const app: express.Application = express()

// The Sentry request handler must be the first middleware on the app
setupSentry(app)

iniitializeMiddlewares(app)

RegisterRoutes(app)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

GlobalErrorHandler.handleErrors(app)

export default app
