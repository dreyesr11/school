import { Router } from 'express'

import AuthMiddleware from '../middlewares/auth'
import {
    getUsers,
    signIn,
    signUp,
    isThereAUser,
    getUser,
    deleteUser,
    updateUser
} from '../controllers/userController'
import usernameParam from './userParams'

const userRoutes = Router()
userRoutes.param('username', usernameParam)

userRoutes.post('/signup', signUp)
userRoutes.post('/signin', signIn)
userRoutes.get('/validations', isThereAUser)

userRoutes.get('/users', [AuthMiddleware], getUsers)
userRoutes
    .route('/users/:username')
    .get([AuthMiddleware], getUser)
    .patch([AuthMiddleware], updateUser)
    .delete([AuthMiddleware], deleteUser)

export default userRoutes
