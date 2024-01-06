import "reflect-metadata";
import 'source-map-support/register'
import app from "./app";
import * as Cron from "./cron";
import runDatabaseMigrations from "./migrations";
import Logger from './logger'

(async () => {
  await runDatabaseMigrations();

  await Cron.start();

  const portAsString: string = (process.env.PORT as string);
  const port = parseInt(portAsString) || 3000
  app.listen(port);
  
  Logger.info(`Server started on port: ${port}`);
})();
