import { NextFunction, Response } from 'express'

const testParam = (req: any, res: Response, next: NextFunction, test_id: string) => {
    req.test_id = test_id
    next()
}

export default testParam
