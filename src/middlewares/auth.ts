import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { JWT_TOKEN_SECRET } from '../config'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        return res.status(403).send({ message: 'You are not authorized' })

    try {
        verify(req.headers.authorization, JWT_TOKEN_SECRET)
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).send({ message: 'Expired token' })
    }
}

export default isAuth
