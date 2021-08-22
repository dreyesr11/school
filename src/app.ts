import express from 'express'
import cors from 'cors'

import ErrorHandler from './middlewares/error'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.get('/', async (req, res) => {
    console.log('Welcome to the School API')
    const mclient: MongoClient = app.locals.dbclient

    const shipwrecksCollection = mclient.db('sample_geospatial').collection('shipwrecks')
    const query = { _id: new ObjectId('578f6fa2df35c7fbdbaed8c4') }
    const shipwreck = await shipwrecksCollection.findOne(query)

    console.log(shipwreck)
    res.send(shipwreck)
})
app.use(ErrorHandler)

export default app
