const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const setup = require('./setup');
const transfer = require('./transfer');


async function main() {
    if (process.env.MONGODB_URL == null) {
      throw Error(
        `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
      );
    }
    const client = new MongoClient(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    try {
    const collection = client.db("databaseWeek4").collection("accounts");
      await setup(collection);
      await transfer(client, collection, 'NL101', 'NL102', 1000, 'Transfer from NL101 to NL102');
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  }

  main();