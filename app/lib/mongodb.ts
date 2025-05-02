// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
console.log('uri',uri)
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('请在 .env.local 文件中添加 MONGODB_URI');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;


