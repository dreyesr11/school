import { MongoClient } from 'mongodb'

import { MONGO_USER, MONGO_PASS, MONGO_PROJECT_CLUSTER } from '../config'

const getURI = () => {
    const username = encodeURIComponent(MONGO_USER)
    const password = encodeURIComponent(MONGO_PASS)

    const uri = `mongodb+srv://${username}:${password}@${MONGO_PROJECT_CLUSTER}?retryWrites=true&w=majority`
    return uri
}

async function getClient() {
    const client = new MongoClient(getURI())
    await client.connect()
    return client
}

async function insertDocument(
    mclient: MongoClient,
    { DB, COLLECTION }: { [index: string]: string },
    data: any
) {
    const collection = mclient.db(DB).collection(COLLECTION)
    const result = await collection.insertOne(data)
    return result
}

async function deleteDocument(
    mclient: MongoClient,
    { DB, COLLECTION }: { [index: string]: string },
    query: { [index: string]: string }
) {
    const collection = mclient.db(DB).collection(COLLECTION)
    const result = await collection.deleteOne(query)
    return result
}

async function getDocuments(
    mclient: MongoClient,
    { DB, COLLECTION }: { [index: string]: string },
    query: { [index: string]: string } = {},
    onlyOne = false
) {
    const collection = mclient.db(DB).collection(COLLECTION)
    const result = onlyOne
        ? await collection.findOne(query)
        : await collection.find(query).toArray()

    return result
}

export { getClient, getDocuments, insertDocument, deleteDocument }
