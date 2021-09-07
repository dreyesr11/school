import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { getDocumentsWithAgreggations, insertDocument, updateDocument } from '../db/connection'
import { Test, TEST_COLLECTION as COLLECTION, TEST_AGGREGATION } from '../models/Test'

import CustomError from '../models/CustomError'
import { missingFields, genericAction } from '../helpers/errorDescriptions'
import { ObjectId } from 'mongodb'

const getTestsByStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { student_id } = req.body
        if (!student_id) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const activities = await getDocumentsWithAgreggations(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            TEST_AGGREGATION,
            { student_id: new ObjectId(student_id) }
        )
        res.send(activities)
    } catch (error) {
        next(error)
    }
}

const insertTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, course_id, academic_year_id, student_id, score, image } = req.body
        if (!name || !course_id || !academic_year_id || !student_id || !score)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const activity = new Test(
            name,
            new ObjectId(course_id),
            new ObjectId(academic_year_id),
            new ObjectId(student_id),
            score,
            image
        )
        const insertedTest = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            activity.getJson()
        )

        if (!insertedTest.insertedId) {
            const [errorCode, errorMessage] = genericAction('test', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.send(insertedTest)
    } catch (error) {
        next(error)
    }
}

const updateScore = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { test_id } = req
        const { score } = req.body
        if (!test_id || !score)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        console.log(score)
        const filter = { _id: new ObjectId(test_id) }
        const options = { upsert: false }
        const updatedData = { score }
        const updatedResult = await updateDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            { filter, options, updatedData }
        )

        console.log(req.body, { score: 50 }, updatedResult)
        if (!updatedResult.modifiedCount) {
            const [errorCode, errorMessage] = genericAction(`test: ${test_id}`, 'updated')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        return res.status(200).json({
            message: 'The test has been updated'
        })
    } catch (error) {
        next(error)
    }
}

export { getTestsByStudent, insertTest, updateScore }
