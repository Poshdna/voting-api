require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);



const database = async () => {
    // Use connect method to connect to the server
    const dbName = process.env.DATABASE_NAME;
  try {
        await client.connect();
        console.log('Connected successfully to database server');
        const databaseCon = client.db(dbName);
      
        const userCollection = databaseCon.collection('users');
        return {
          userCollection
        }
  } catch (error) {

    console.log(' server could not connect to db');

  }
    
  
}
  


module.exports = database;