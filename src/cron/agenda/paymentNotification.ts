// import nodemailer from 'nodemailer';
import { getFreshConnection } from '../../db';
import { ProjectSubscriptionTransaction } from '../../entity/ProjectSubscriptionTransaction';
import { PaymentTransactionStatus } from '../../enums/PaymentTransaction';
import * as MortgageCardService from '../../services/mortgageCardService';
import * as agenderConfig from './config';


async function recurrentPaymentNotificationRunCron() {
  // Connect to MongoDB
  const db = await agenderConfig.connectToMongo();

  // Create a new Agenda instance and link it to the MongoDB connection
  const agenda = await agenderConfig.createAgenda(db);

  console.log('Before we enter dispatch-recurrent-payment-request')
  // Define a job
  agenda.define('dispatch-recurrent-payment-request', async (job: any) => {

    console.log('Inside dispatch-recurrent-payment-request')
    const connection = await getFreshConnection()
    const projectSubscriptionTransactionRepo = connection.getRepository(ProjectSubscriptionTransaction)
    
    const join = {
      alias: "project_susbscription_transactions",
      leftJoinAndSelect: {
        projectSubscription: "project_susbscription_transactions.projectSubscription",
        project: "project_susbscription_transactions.project",
        developer: "project_susbscription_transactions.developer",
        investor: "project_susbscription_transactions.investor",
      },
    }

  
    const unpaidProjectSubscriptionTransactions = await projectSubscriptionTransactionRepo.find({
      where: { isPaid: false, paidStatus: PaymentTransactionStatus.UNPAID},
      join
    })

    if(unpaidProjectSubscriptionTransactions.length === 0){
      return false
    }
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    // console.log('currentMonth', currentMonth)
    const filteredTransactions = unpaidProjectSubscriptionTransactions.filter(
      (transaction) => {
        const nextPaymentDate = new Date(transaction.nextPaymentDate);
        const transactionMonth = nextPaymentDate.getMonth(); 
        const transactionYear = nextPaymentDate.getFullYear();
       //  console.log('transactionMonth', transactionMonth)
        return transactionMonth === currentMonth && transactionYear === currentYear;
      }
    );

    if(filteredTransactions.length === 0){
      return false
    }

    for(const transaction of filteredTransactions) {
      // eslint-disable-next-line no-await-in-loop
      await MortgageCardService.processDirectPayRequestviaMono(transaction.investor, transaction )
      return true;
    }

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

  // Define and schedule a job to run every 24 hours
  agenda.every('24 hours', 'dispatch-recurrent-payment-request');

  // Close the MongoDB connection when the script exits
  process.on('SIGTERM', async () => {
    await agenda.stop();
    await db.client.close();
    process.exit(0);
  });
}

recurrentPaymentNotificationRunCron();
