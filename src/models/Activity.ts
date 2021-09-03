import { ObjectId } from 'mongodb'
import BaseModel from './BaseModel'

class Activity extends BaseModel {
    private name: string
    private audio?: any
    private question?: string
    private course_id: ObjectId
    private lesson: number
    private options?: string
    private help?: string
    private result?: string | number

    constructor(
        name: string,
        question: string,
        course_id: ObjectId,
        lesson: number,
        result = undefined,
        options = undefined,
        help = undefined,
        audio = undefined
    ) {
        super()
        this.name = name
        this.question = question
        this.course_id = course_id
        this.lesson = lesson
        this.result = result
        this.options = options
        this.help = help
        this.audio = audio
    }
}

const ACTIVITY_COLLECTION = 'Activities'

export { Activity, ACTIVITY_COLLECTION }
