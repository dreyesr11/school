import { sign } from 'jsonwebtoken'

import { JWT_TOKEN_SECRET } from '../config'

const generateToken = (user: string) => {
    const token = sign({ payload: user }, JWT_TOKEN_SECRET, {
        expiresIn: 300
    })

    return token
}

export default generateToken
