import { ObjectId } from 'mongodb'
import BaseModel from './BaseModel'
import { COURSE_COLLECTION } from './Course'

class Test extends BaseModel {
    private name: string
    private course_id: ObjectId
    private academic_year_id: ObjectId
    private student_id: ObjectId
    private score: number
    private image?: string
    private file?: any

    constructor(
        name: string,
        course_id: ObjectId,
        academic_year_id: ObjectId,
        student_id: ObjectId,
        score: number,
        image = undefined,
        file = undefined
    ) {
        super()
        this.name = name
        this.course_id = course_id
        this.academic_year_id = academic_year_id
        this.student_id = student_id
        this.score = score
        this.image = image
        this.file = file
    }
}

const TEST_AGGREGATION = {
    from: COURSE_COLLECTION,
    localField: 'course_id',
    foreignField: '_id',
    as: 'course'
}


const TEST_COLLECTION = 'Tests'

export { Test, TEST_COLLECTION }
