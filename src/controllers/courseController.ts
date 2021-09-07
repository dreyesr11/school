import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { getDocuments, insertDocument } from '../db/connection'
import { Course, COURSE_COLLECTION as COLLECTION } from '../models/Course'

import CustomError from '../models/CustomError'
import { missingFields, genericAction } from '../helpers/errorDescriptions'

const getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await getDocuments(req.app.locals.dbclient, { DB, COLLECTION })
        res.send(courses)
    } catch (error) {
        next(error)
    }
}

const insertCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        if (!name) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const course = new Course(name)
        const insertedCourse = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            course.getJson()
        )

        if (!insertedCourse.insertedId) {
            const [errorCode, errorMessage] = genericAction('course', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.send(insertedCourse)
    } catch (error) {
        next(error)
    }
}

export { getCourses, insertCourse }
