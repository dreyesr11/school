import { ObjectId } from 'mongodb'

type updateDocument = {
    filter: { [index: string]: string | number | ObjectId }
    options: { [index: string]: string | boolean }
    updatedData: { [index: string]: string | number | boolean }
}

export default updateDocument
