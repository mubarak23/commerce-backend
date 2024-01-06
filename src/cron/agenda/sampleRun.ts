// import nodemailer from 'nodemailer';
import * as EmailService from '../../services/emailService';
import * as agenderConfig from './config';


async function testRunCron() {
  // Connect to MongoDB
  const db = await agenderConfig.connectToMongo();

  // Create a new Agenda instance and link it to the MongoDB connection
  const agenda = await agenderConfig.createAgenda(db);

  console.log('before we enter test-request-mail')
  // Define a job
  agenda.define('test-request-mail', async (job: any) => {

    console.log('inside test-request-mail')
   // sendTestMailForCronJob
    await EmailService.sendTestMailForCronJob()
    return true;
    
    // fetch all unpaid ptoject sussbcription transactions 
    // filter all transaction that are due to be paid today using today's date
    // for each of the unpaid transaction 
      // request payment link from 
      // call sendMonoPaymentApprovalLink to send mail to use to pay 
    // Email configuration
 
  });

  // Start the agenda scheduler
  await agenda.start();

  // Define and schedule a job to run every 10 minutes
  agenda.every('10 minutes', 'test-request-mail');

  // Close the MongoDB connection when the script exits
  process.on('SIGTERM', async () => {
    await agenda.stop();
    await db.client.close();
    process.exit(0);
  });
}

testRunCron();
