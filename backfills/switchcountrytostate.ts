// import dotenv from 'dotenv'
// import * as _ from 'underscore'
const _ = require('underscore')
import path from "path";


import { ConnectionOptions, createConnection as createDatabasePool } from 'typeorm';

console.log(`process.env.NODE_ENV: `, process.env.NODE_ENV)

// require("dotenv").config({ path: path.resolve(__dirname, "../.env.test") });

if(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  // dotenv.config()
  const fs = require('fs')
  const envConfig = require("dotenv").config({ path: path.resolve(__dirname, "../.dev-env") }); //require("dotenv").parse(fs.readFileSync('./dev-env'))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
} else {
  const fs = require('fs')
  const envConfig = require("dotenv").parse(fs.readFileSync('prod.env'))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

import { getFreshConnection } from '../src/db';
import { DeliveryLocation } from "../src/entity/DeliveryLocation";

const beginSwitchCountrytoSate = async () => {
  const connection = await getFreshConnection()
  const switchDeliveryLocationStateSuccess = await connection.transaction(async (transactionalEntityManager) => {
    // const walletT = transactionalEntityManager.getRepository(Wallet)
    const deliveryRepoT = transactionalEntityManager.getRepository(DeliveryLocation)

    const deliveryLocations = await deliveryRepoT.find({
      where: {
        state: 'Nigeria'
      }
    })

   
    for(const location of deliveryLocations) {
      console.log(`Old state: ${location.state}`)

      console.log(`Old Country: ${location.country}`) 
  
       
        await deliveryRepoT.createQueryBuilder()
          .update(DeliveryLocation)
          .set({
            state: location.country,
            country: location.state
          })
          .where({
            id: location.id
          })
          .execute()
     // }
     
    }
  })
}

(async function () {
  const typeOrmConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      `${__dirname}/../src/entity/**/*{.ts,.js}`,
    ],
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.CACERT,
    },
  }

  await createDatabasePool(typeOrmConfig)

  await beginSwitchCountrytoSate()
})()
