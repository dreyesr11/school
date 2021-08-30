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

userRoutes.use(AuthMiddleware)
userRoutes.get('/users', getUsers)
userRoutes.route('/users/:username').get(getUser).patch(updateUser).delete(deleteUser)

export default userRoutes
