import { Router } from 'express'

import {
    getActivitiesByLesson,
    insertActivity,
    updateActivity,
    deleteActivity
} from '../controllers/activityController'
import activityParam from './activityParams'
import AuthMiddleware from '../middlewares/auth'

const testRouter = Router()
testRouter.param('activity_id', activityParam)

testRouter.post('/activities_by_lesson', getActivitiesByLesson)
testRouter.post('/activities', [AuthMiddleware], insertActivity)
testRouter
    .route('/activity/:activity_id')
    .patch([AuthMiddleware], updateActivity)
    .delete([AuthMiddleware], deleteActivity)

export default testRouter
