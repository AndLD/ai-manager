import { MongoClient, Db } from 'mongodb'

export let mongoClient: MongoClient
export let db: Db

async function init() {
    mongoClient = new MongoClient(process.env.MONGO_DB_URI || 'mongodb://localhost:27017')
    await mongoClient.connect()
    db = mongoClient.db('ai-manager')
}

export const dbService = {
    init,
}
