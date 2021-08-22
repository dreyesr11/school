import { NextFunction, Request, Response } from 'express'
import CustomError from '../models/CustomError'

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message } = error
    res.status(statusCode).send({ message })
}

export default errorHandler
