# cinderbuild-backend
[![Build Status](https://github.com/cinderbuild-engine/cinderbuild-backend/workflows/Server%20CI/badge.svg)](https://github.com/cinderbuild-engine/cinderbuild-backend/actions)

# How to run for local development
- Checkout to the `dev` branch

- In a terminal, run:
```npm install```

- Finally run:
```npm run localdev```

# Deploying to heroku from a specific branch
```
git push heroku-prod your-local-branch:main

git push heroku-dev your-local-branch:main
```


# Context


# VSCode with EsLint
https://thesoreon.com/blog/how-to-set-up-eslint-with-typescript-in-vs-code
https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/


# References

- For generating a typeorm migration file, run:
 ```
 npm run new-migration MigrationName
 ```

- For generating UUID v4 IDs for seed files
```
https://www.uuidgenerator.net/version4
```

- Postgres string array column
```
https://www.postgresqltutorial.com/postgresql-array/
```

- Add swagger
```
https://rsbh.dev/blog/rest-api-with-express-typescript
https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
https://itnext.io/express-js-backend-with-typescript-swagger-ui-and-docker-compose-f77143860bc8
```

- Json TypeORM
```
https://wanago.io/2020/12/28/nestjs-json-postgresql-typeorm/
```

- Install Docker Compose
```
sudo apt-get remove docker-compose
sudo rm /usr/local/bin/docker-compose
sudo apt install python3-pip
pip3 install setuptools-rust
pip3 install docker-compose
```

- How do I query an array in Typeorm
```
https://stackoverflow.com/questions/58475174/how-do-i-query-an-array-in-typeorm
```

- Postgres Array functions
```
https://www.postgresql.org/docs/9.1/functions-array.html
```

- Paystack Webhook
```
https://paystack.com/docs/payments/webhooks/
```

- Vacuuming
```
https://devcenter.heroku.com/articles/managing-vacuum-on-heroku-postgres
https://www.citusdata.com/blog/2016/11/04/autovacuum-not-the-enemy/
```

- Postgres Indexes
```
https://devcenter.heroku.com/articles/postgresql-indexes
```

- Add line break in SMS message
```
https://help.clicksend.com/article/l3lmuk9olw-how-do-i-add-a-line-break-in-my-sms-message
```

- Postgres - Don't do this
```
https://wiki.postgresql.org/wiki/Don't_Do_This
```

- Docker compose environment variables 
```
https://forums.docker.com/t/docker-compose-not-seeing-environment-variables-on-the-host/11837/6
```

- Transfers out of TradeGrid wallet using Paystack
```
https://paystack.com/docs/transfers/single-transfers
https://support.paystack.com/hc/en-us/articles/360009881580-How-do-I-make-transfers-on-Paystack-
```

- Json Web Token
```
https://medium.com/swlh/hacking-json-web-tokens-jwts-9122efe91e4a
```

- Postgres Database Timeout - Difficult to fix
```
https://github.com/knex/knex/issues/1040

https://www.gitmemory.com/issue/brianc/node-postgres/2262/656751203
https://cloud.google.com/sql/docs/postgres/samples/cloud-sql-postgres-knex-timeout
https://blog.crunchydata.com/blog/control-runaway-postgres-queries-with-statement-timeout
https://blog.crunchydata.com/blog/optimize-postgresql-server-performance
https://dba.stackexchange.com/questions/220933/query-for-all-the-postgres-configuration-parameters-current-values
https://findanyanswer.com/what-is-idle-connection-postgresql

https://blog.heroku.com/curious-case-table-locking-update-query
https://blog.pjam.me/posts/atomic-operations-in-sql/
https://www.postgresql.org/files/developer/concurrency.pdf
https://aws.amazon.com/blogs/database/performance-impact-of-idle-postgresql-connections/
```

- Postgres Insight commands on PgAdmin
```
show all;
table pg_settings;

select *
from pg_stat_activity
where datname = 'cinderbuild_db_dev';

SET SESSION idle_in_transaction_session_timeout = '5min';

```

- Is Firebase down
```
https://statusgator.com/services/firebase
```

- Firestore batched writes
```
https://firebase.google.com/docs/firestore/manage-data/transactions
```

```
https://www.moengage.com/blog/tagpush-notification-not-getting-delivered/
```

- Paystack
```
https://support.paystack.com/hc/en-us/articles/360009881760-What-are-Dedicated-NUBANs-
```

- Deleting a postgres Database
```
Whenever I try to drop database I get:

ERROR:  database "xxx" is being accessed by other users
DETAIL:  There is 1 other session using the database.
First You need to revoke

REVOKE CONNECT ON DATABASE TARGET_DB FROM public;
Then use:

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'TARGET_DB';
```

- Twilio Supported "To" Countries for SMS
```
https://support.twilio.com/hc/en-us/articles/223181108-How-International-SMS-Permissions-work
https://www.twilio.com/console/sms/settings/geo-permissions
```

- Unique index vs constraint
```
https://dba.stackexchange.com/questions/144/when-should-i-use-a-unique-constraint-instead-of-a-unique-index
```

- Heroku
```
heroku config:set NODE_MODULES_CACHE=true -a tradegrid-prod

heroku plugins:install heroku-builds
heroku builds:cache:purge -a tradegrid-prod
```

- Postgres Locks
```
https://pankajconnect.medium.com/master-postgresql-lock-in-10minutes-dffb278fcb46
```
