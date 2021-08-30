import { MongoClient } from 'mongodb'

import { MONGO_USER, MONGO_PASS, MONGO_PROJECT_CLUSTER } from '../config'
import Aggregation from '../types/Aggregation'
import updateDocument from '../types/UpdateDocument'

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

async function updateDocument(
    mclient: MongoClient,
    { DB, COLLECTION }: { [index: string]: string },
    { filter, options, updatedData }: updateDocument
) {
    const collection = mclient.db(DB).collection(COLLECTION)
    const updateDoc = {
        $set: updatedData
    }

    const result = await collection.updateOne(filter, updateDoc, options)
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

async function getDocumentsWithAgreggations(
    mclient: MongoClient,
    { DB, COLLECTION }: { [index: string]: string },
    aggregation: Aggregation,
    query: { [index: string]: string } = {},
    onlyOne = false
) {
    const collection = mclient.db(DB).collection(COLLECTION)
    let result: any = await collection.aggregate().lookup(aggregation).match(query).toArray()
    if (onlyOne) result = result.length ? result[0] : null

    return result
}

export {
    getClient,
    getDocuments,
    getDocumentsWithAgreggations,
    insertDocument,
    updateDocument,
    deleteDocument
}
