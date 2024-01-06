// import dotenv from 'dotenv'
// import * as _ from 'underscore'
const _ = require('underscore')
import path from "path";


import { ConnectionOptions, createConnection as createDatabasePool, IsNull } from 'typeorm';

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
import { Account } from '../src/entity/Account';
import { Order } from '../src/entity/Order';
import { User } from '../src/entity/User';
import { Wallet } from '../src/entity/Wallet';
import { AccountType } from '../src/enums/AccountType';

const beginBackFill = async () => {
  const connection = await getFreshConnection()
  const newWareHouseSuccess = await connection.transaction(async (transactionalEntityManager) => {
    const userRepoT = transactionalEntityManager.getRepository(User)
    const walletRepoT = transactionalEntityManager.getRepository(Wallet)
    const acccountRepoT =  transactionalEntityManager.getRepository(Account)
    const orderRepoT = transactionalEntityManager.getRepository(Order)
    const allUsers = await userRepoT.find({
      accountId: IsNull(),
    })

    for(const user of allUsers) {
      console.log(user.id)

      const account = new Account().initialize(user.id, AccountType.CUSTOMER_ACCOUNT)
      
      const newAccount = await acccountRepoT.save(account)
      await userRepoT.createQueryBuilder()
        .update(User)
        .set({ accountId: newAccount.id })
        .where({
          id: user.id
        })
        .execute()
   
      await walletRepoT.createQueryBuilder()
        .update(Wallet)
        .set({ accountId: newAccount.id })
        .where({
          userId: user.id
        })
        .execute()

      await walletRepoT.createQueryBuilder()
        .update(Order)
        .set({ buyerAccountId: newAccount.id })
        .where({
          buyerUserId: user.id
        })
        .execute()
        await orderRepoT.createQueryBuilder()
        .update(Order)
        .set({ buyerAccountId: user.accountId })
        .where({
          buyerUserId: user.id
        })
        .execute()
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
  }

  await createDatabasePool(typeOrmConfig)

  await beginBackFill()
})()
