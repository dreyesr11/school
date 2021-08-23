import { NextFunction, Request, Response } from 'express'

import { DB } from '../config'
import { getDocuments, insertDocument } from '../db/connection'
import { Role, ROLE_COLLECTION as COLLECTION } from '../models/Role'

import CustomError from '../models/CustomError'
import { missingFields, genericAction } from '../helpers/errorDescriptions'

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await getDocuments(req.app.locals.dbclient, { DB, COLLECTION })
        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const insertRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body
        if (!name) throw new CustomError(+missingFields[0], missingFields[1].toString())

        const role = new Role(name, description)
        const insertedRole = await insertDocument(
            req.app.locals.dbclient,
            { DB, COLLECTION },
            role.getJson()
        )

        if (!insertedRole.insertedId) {
            const [errorCode, errorMessage] = genericAction('rol', 'inserted')
            throw new CustomError(+errorCode, errorMessage.toString())
        }

        res.send(insertedRole)
    } catch (error) {
        next(error)
    }
}

export { getRoles, insertRol }
