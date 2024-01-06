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
import { Order } from '../src/entity/Order';
import { OrderPaymentStatuses, OrderStatuses } from "../src/enums/Statuses";
import * as Utils from '../src/utils/core';

const beginConfirmLeftOrders = async () => {
  const connection = await getFreshConnection()
  const updateOrderSuccess = await connection.transaction(async (transactionalEntityManager) => {
    // const walletT = transactionalEntityManager.getRepository(Wallet)
    const orderRepoT = transactionalEntityManager.getRepository(Order)

    const orderAvaialableForDelivery = await orderRepoT.find({
      where: {
        status: OrderStatuses.IN_PROGRESS,
        paymentStatus: OrderPaymentStatuses.BUYER_PAYMENT_IN_ESCROW
      }
    })

   
    for(const order of orderAvaialableForDelivery) {
      console.log(order.referenceNumber)

      console.log(order)

      // const userWallet = await walletT.findOne({ where: {
      //   userId: order.buyerUserId
      // }})
      // console.log(userWallet)
        const now = Utils.utcNow()
        const newStatusEntry = {
          status: OrderStatuses.CONFIRMED,
          dateTimeInISO8601: now.toISOString()
        }
        order.statusHistory = order.statusHistory || []
        
        const newPaymentStatusEntry = {
          status: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
          dateTimeInISO8601: now.toISOString()
        }
        order.paymentStatusHistory = order.paymentStatusHistory || []
  
       
        await orderRepoT.createQueryBuilder()
          .update(Order)
          .set({
            status: OrderStatuses.CONFIRMED,
            statusHistory: [...order.statusHistory, newStatusEntry] , 
            paymentStatus: OrderPaymentStatuses.ESCROW_FUNDS_MOVED_TO_SELLER,
            paymentStatusHistory: [...order.paymentStatusHistory, newPaymentStatusEntry]
          })
          .where({
            id: order.id
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

  await beginConfirmLeftOrders()
})()
