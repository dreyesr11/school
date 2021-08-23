import express from 'express'
import cors from 'cors'

import ErrorHandler from './middlewares/error'
import rolRouter from './routes/roles'
import userRoutes from './routes/user'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/api', rolRouter)
app.use('/api', userRoutes)
app.use(ErrorHandler)

export default app
