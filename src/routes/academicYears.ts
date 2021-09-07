import { Router } from 'express'
import { getAcademicYears, insertAcademicYear } from '../controllers/academicYearController'
import AuthMiddleware from '../middlewares/auth'

const academicYearRouter = Router()
academicYearRouter
    .route('/academic-years')
    .get(getAcademicYears)
    .post([AuthMiddleware], insertAcademicYear)

export default academicYearRouter
