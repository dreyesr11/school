import { Router } from 'express'
import { getCourses, insertCourse } from '../controllers/courseController'
import AuthMiddleware from '../middlewares/auth'

const courseRouter = Router()
courseRouter.route('/courses').get(getCourses).post([AuthMiddleware], insertCourse)

export default courseRouter
