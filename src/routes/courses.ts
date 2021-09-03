import { Router } from 'express'
import { getCourses, insertCourse } from '../controllers/courseController'

const courseRouter = Router()
courseRouter.route('/courses').get(getCourses).post(insertCourse)

export default courseRouter
