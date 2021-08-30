import { ObjectId } from 'mongodb'
import BaseModel from './BaseModel'
import { ROLE_COLLECTION } from './Role'

class User extends BaseModel {
    private full_name: string
    private username: string
    private password: string
    private email: string
    private age: number
    private role_id: ObjectId

    constructor(
        full_name: string,
        username: string,
        password: string,
        email: string,
        age: number,
        role_id: ObjectId
    ) {
        super()
        this.full_name = full_name
        this.username = username
        this.email = email
        this.age = age
        this.password = password
        this.role_id = role_id
    }
}

const USER_COLLECTION = 'User'
const USER_AGGREGATION = {
    from: ROLE_COLLECTION,
    localField: 'role_id',
    foreignField: '_id',
    as: 'role'
}

export { User, USER_COLLECTION, USER_AGGREGATION }
