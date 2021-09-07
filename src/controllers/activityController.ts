import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { getDocuments, insertDocument, updateDocument, deleteDocument } from '../db/connection'
import { Activity, ACTIVITY_COLLECTION as COLLECTION } from '../models/Activity'

import CustomError from '../models/CustomError'
import { missingFields, genericAction, typeNotFound } from '../helpers/errorDescriptions'
import { ObjectId } from 'mongodb'

const getActivitiesByLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { course_id, lesson } = req.body
        if (!course_id || !lesson)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const activities = await getDocuments(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            { course_id: new ObjectId(course_id), lesson: lesson }
        )
        res.send(activities)
    } catch (error) {
        next(error)
    }
}

const insertActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, course_id, lesson, question, options, help, audio, result } = req.body
        if (!name || !course_id || !lesson)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const activity = new Activity(
            name,
            question,
            new ObjectId(course_id),
            lesson,
            result,
            options,
            help,
            audio
        )
        const insertedActivity = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            activity.getJson()
        )

        if (!insertedActivity.insertedId) {
            const [errorCode, errorMessage] = genericAction('activity', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.send(insertedActivity)
    } catch (error) {
        next(error)
    }
}

const updateActivity = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { activity_id } = req
        if (!activity_id) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const filter = { _id: new ObjectId(activity_id) }
        const options = { upsert: false }
        const updatedData = req.body
        const updatedResult = await updateDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            { filter, options, updatedData }
        )

        if (!updatedResult.modifiedCount) {
            const [errorCode, errorMessage] = genericAction(`activity: ${activity_id}`, 'updated')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        return res.status(200).json({
            message: 'The activity has been updated'
        })
    } catch (error) {
        next(error)
    }
}

const deleteActivity = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { activity_id } = req
        if (!activity_id) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const filter = { _id: new ObjectId(activity_id) }
        const deleteResult = await deleteDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            filter
        )
        if (!deleteResult.deletedCount) {
            const [errorCode, errorMessage] = typeNotFound('Activity')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.status(200).json({
            message: 'Successfully deleted'
        })
    } catch (error) {
        next(error)
    }
}

export { getActivitiesByLesson, insertActivity, updateActivity, deleteActivity }
