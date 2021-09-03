import { Router } from 'express'
import { getAcademicYears, insertAcademicYear } from '../controllers/academicYearController'

const academicYearRouter = Router()
academicYearRouter.route('/academic-years').get(getAcademicYears).post(insertAcademicYear)

export default academicYearRouter
