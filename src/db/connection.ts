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

export { getClient }
