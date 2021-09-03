import express from 'express'
import cors from 'cors'

import ErrorHandler from './middlewares/error'
import rolRouter from './routes/roles'
import userRoutes from './routes/user'
import courseRoutes from './routes/courses'
import academicYearRoutes from './routes/academicYears'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/api', rolRouter)
app.use('/api', courseRoutes)
app.use('/api', academicYearRoutes)
app.use('/api', userRoutes)
app.use(ErrorHandler)

export default app
