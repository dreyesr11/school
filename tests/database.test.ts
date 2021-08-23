import { ObjectId } from 'mongodb'
import { getClient } from '../src/db/connection'

const USER_DB = 'sample_geospatial'
const USER_COLL = 'shipwrecks'

describe('Check Database', () => {
    it('Get especific shipwreck', async () => {
        const client = await getClient()

        const collection = client.db(USER_DB).collection(USER_COLL)
        const query = { _id: new ObjectId('578f6fa2df35c7fbdbaed8c4') }
        const shipwreck = await collection.findOne(query)
        expect(shipwreck?.chart).toBe('US,U1,graph,DNC H1409860')

        client.close()
    })
})
