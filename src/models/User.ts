import { ObjectId } from 'mongodb'

class User {
    private _id?: ObjectId
    private full_name: string
    private username: string
    private password: string
    private email: string
    private age: number
    private role: { [index: string]: string | ObjectId }

    constructor(
        full_name: string,
        username: string,
        password: string,
        email: string,
        age: number,
        role: { [index: string]: string | ObjectId },
        id = undefined
    ) {
        this._id = id
        this.full_name = full_name
        this.username = username
        this.email = email
        this.age = age
        this.password = password
        this.role = role
    }

    getJson(removeID = true) {
        const user = Object.assign({}, this)
        if (removeID) delete user?._id
        return user
    }

    setId(id: ObjectId) {
        this._id = id
    }
}

const USER_COLLECTION = 'User'

export { User, USER_COLLECTION }
