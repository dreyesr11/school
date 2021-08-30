import { Router } from 'express'
import { getRoles, insertRol } from '../controllers/roleController'

const rolRouter = Router()
rolRouter.route('/roles').get(getRoles).post(insertRol)

export default rolRouter
