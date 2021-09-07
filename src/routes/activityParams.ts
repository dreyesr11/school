import { NextFunction, Response } from 'express'

const activityParam = (req: any, res: Response, next: NextFunction, activity_id: string) => {
    req.activity_id = activity_id
    next()
}

export default activityParam
