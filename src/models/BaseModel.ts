import { ObjectId } from 'mongodb'

class BaseModel {
    private _id?: ObjectId

    public constructor(id = undefined) {
        this._id = id
    }

    getJson(removeID = true) {
        const objectClass = Object.assign({}, this)
        if (removeID) delete objectClass?._id
        return objectClass
    }

    setId(id: ObjectId) {
        this._id = id
    }
}

export default BaseModel
