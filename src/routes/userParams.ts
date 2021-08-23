import { NextFunction, Response } from 'express'

const usernameParam = (req: any, res: Response, next: NextFunction, username: string) => {
    req.username = username
    next()
}

export default usernameParam
