/* eslint-disable no-unsafe-finally */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { getConnection, Connection } from "typeorm";
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import typeOrmConfig from './ormconfig'
import { createConnection } from 'typeorm'
import Logger from './logger'

export const getFreshConnection = async (): Promise<Connection> => {
  let connection: Connection;
  try {
    const connection = await createConnection(typeOrmConfig)
    return connection
  } catch (errorLevel1) {
    connection = getConnection()
    const driver = connection.driver as any

    for (const client of driver.master._clients) {
      try {
        await client.query('SELECT 1')
        return connection
      } catch (error) {
        Logger.info('Reconnecting ...')
        try {
          await getConnection().driver.disconnect()
          await getConnection().driver.connect()
        } catch (e) {
          await createConnection(typeOrmConfig)
        } finally {
          connection = getConnection()
        }
        return connection
      }
    }
  } finally {
    return getConnection()
  }
}
