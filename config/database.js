require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;


const database = async () => {
    // Use connect method to connect to the server
  try {
        await client.connect();
        console.log('Connected successfully to database server');
        const db = client.db(dbName);
        client.close()
        return db
      
  } catch (error) {
    console.log(' server could not connect to db');
    client.close()
  }
    
  
}
  


module.exports = database;