import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { getDocuments, insertDocument } from '../db/connection'
import { AcademicYear, ACADEMIC_YEAR_COLLECTION as COLLECTION } from '../models/AcademicYear'

import CustomError from '../models/CustomError'
import { missingFields, genericAction } from '../helpers/errorDescriptions'

const getAcademicYears = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const academicYears = await getDocuments(req.app.locals.dbclient, { DB, COLLECTION })
        res.send(academicYears)
    } catch (error) {
        next(error)
    }
}

const insertAcademicYear = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        if (!name) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const academicYear = new AcademicYear(name)
        const insertedAcademicYear = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            academicYear.getJson()
        )

        if (!insertedAcademicYear.insertedId) {
            const [errorCode, errorMessage] = genericAction('academic year', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.send(insertedAcademicYear)
    } catch (error) {
        next(error)
    }
}

export { getAcademicYears, insertAcademicYear }
