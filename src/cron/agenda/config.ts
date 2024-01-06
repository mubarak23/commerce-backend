import Agenda from 'agenda';
import { MongoClient } from 'mongodb';



export const connectToMongo = async (): Promise<any> => {
  const mongoClient = new MongoClient('mongodb+srv://adminsand:VKPJp8OjamVXDwj6@cluster0.7p8qtwg.mongodb.net/?retryWrites=true&w=majority');
  await mongoClient.connect();
  return mongoClient.db();
}

export const createAgenda = async (db: any): Promise<any> => {
  return new Agenda().mongo(db, 'jobs');
}



// mongodb+srv://mubarak23:<password>@cluster0.2h0xqsh.mongodb.net/
