import { Router } from 'express'

import AuthMiddleware from '../middlewares/auth'
import { getTestsByStudent, insertTest, updateScore } from '../controllers/testController'
import testParam from './testParams'

const testRouter = Router()
testRouter.param('test_id', testParam)

testRouter.post('/tests_by_student', [AuthMiddleware], getTestsByStudent)
testRouter.post('/tests', [AuthMiddleware], insertTest)
testRouter.route('/test/:test_id').patch([AuthMiddleware], updateScore)

export default testRouter
