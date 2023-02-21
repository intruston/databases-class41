const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

async function PopulationByYear(client, country) {
    const collection = client.db("databaseWeek4").collection("world");
    
    const pipeline = [
      {
        $match: {
          Country: country
        }
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } }
        }
      },
      {
        $project: {
          _id: 1,
          countPopulation: 1
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ];
    
    const result = await collection.aggregate(pipeline).toArray();
    return console.log(JSON.stringify(result));
  }  

  async function ContinentPopulationByYearAndAge(client, year, age) {
    const collection = client.db("databaseWeek4").collection("world");
  
    const pipeline = [
      {
        $match: { Country: { $in: ["AFRICA", "ASIA", "EUROPE", "NORTHERN AMERICA", "LATIN AMERICA AND THE CARIBBEAN", "OCEANIA"] },
            Year: year, Age: age }
      },
      {
        $project: {
          Country: 1,
          Year: 1,
          Age: 1,
          M: 1,
          F: 1,
          TotalPopulation: { $add: ["$M", "$F"] }
        }
      }
    ];
  
    const result = await collection.aggregate(pipeline).toArray();
    return console.log(JSON.stringify(result));
  }
  

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
        await PopulationByYear(client, 'Netherlands');
        await ContinentPopulationByYearAndAge(client, 2000, '20-24');
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  }

  main();