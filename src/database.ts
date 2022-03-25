import { MongoClient,Db } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb: Db = null;

export function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URI)
    .then(client => {
      cachedDb = client.db();
      return cachedDb;
    });
}
console.log(process.env.MONGO_URL);
