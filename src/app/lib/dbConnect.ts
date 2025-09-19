import {MongoClient, ServerApiVersion} from "mongodb";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default function dbConnect(collectionname:string) {
    const uri = process.env.MONGODB_URI;
      if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

return client.db(process.env.DB_NAME).collection(collectionname)
};