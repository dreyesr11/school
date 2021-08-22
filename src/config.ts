import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 9000
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_USER = process.env.MONGO_USER || 'admin'
const MONGO_PASS = process.env.MONGO_PASS || 'codeWKsqUKINSbDO'
const MONGO_PROJECT_CLUSTER = process.env.MONGO_PROJECT_CLUSTER || 'school.06bpp.mongodb.net'
const BCRYPTSALTROUNDS = 10
const JWT_TOKEN_SECRET = 'sabadada'

export {
    PORT,
    NODE_ENV,
    MONGO_USER,
    MONGO_PASS,
    MONGO_PROJECT_CLUSTER,
    BCRYPTSALTROUNDS,
    JWT_TOKEN_SECRET
}
