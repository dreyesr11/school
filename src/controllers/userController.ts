import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { User, USER_COLLECTION as COLLECTION } from '../models/User'
import { insertDocument, getDocuments, deleteDocument } from '../db/connection'
import CustomError from '../models/CustomError'

import generateToken from '../helpers/auth'
import { encryptString, comparePassword } from '../helpers/crypt'

import {
    missingFields,
    genericAction,
    incorrectPassword,
    searchWithoutResults,
    typeNotFound
} from '../helpers/errorDescriptions'
import { ObjectId } from 'mongodb'
import { ROLE_COLLECTION } from '../models/Role'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { full_name, username, password, email, role_id, age = 0 } = req.body
        if (!full_name || !username || !password || !email || !role_id)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const encryptedPassword = await encryptString(password)
        const newUser = new User(full_name, username, encryptedPassword, email, age, {
            $ref: ROLE_COLLECTION,
            $id: new ObjectId(role_id),
            $db: DB
        })
        const insertedUser = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            newUser.getJson()
        )

        if (!insertedUser.insertedId) {
            const [errorCode, errorMessage] = genericAction('user', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        newUser.setId(insertedUser.insertedId)
        res.json({
            message: `The user was registered successfully`,
            insertedUser: newUser.getJson(false)
        })
    } catch (error) {
        next(error)
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        if (!username || !password)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const userData = await getDocuments(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            { username },
            true
        )

        if (!userData) throw new CustomError(403, `The user: ${username} doesn't exist`)

        const isValidPassword = await comparePassword(password, userData.password)
        if (!isValidPassword)
            throw new CustomError(+incorrectPassword[0], incorrectPassword[1].toString())

        const token = generateToken(userData.user)
        userData.token = token
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getDocuments(req.app.locals.dbclient, { DB, COLLECTION })
        return res.json(users)
    } catch (error) {
        next(error)
    }
}

const isThereAUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username } = req.body
        if (!email && !username)
            throw new CustomError(+missingFields[0], missingFields[1].toString())

        const searchParam: { [index: string]: string } = email ? { email } : { username }
        const userData = await getDocuments(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            searchParam,
            true
        )

        if (!userData) {
            const [errorCode, errorMessage] = searchWithoutResults('user', searchParam)
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        return res.status(200).json({
            exist: true
        })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { username } = req
        if (!username) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const userData = await getDocuments(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            { username },
            true
        )
        if (!userData) {
            const [errorCode, errorMessage] = typeNotFound('User')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        return res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { username } = req
        if (!username) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const filter = { username }
        const deleteResult = await deleteDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            filter
        )
        if (!deleteResult.deletedCount) {
            const [errorCode, errorMessage] = typeNotFound('User')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.status(200).json({
            message: 'Successfully deleted'
        })
    } catch (error) {
        next(error)
    }
}

export { getUsers, signUp, signIn, isThereAUser, getUser, deleteUser }
