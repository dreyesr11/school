import { Router } from 'express'
import { getRoles, insertRol } from '../controllers/roleController'

import AuthMiddleware from '../middlewares/auth'

const rolRouter = Router()
rolRouter.route('/roles').get([AuthMiddleware], getRoles).post([AuthMiddleware], insertRol)

export default rolRouter
