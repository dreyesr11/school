import BaseModel from './BaseModel'

class Course extends BaseModel {
    private name: string

    constructor(name: string) {
        super()
        this.name = name
    }
}

const COURSE_COLLECTION = 'Courses'

export { Course, COURSE_COLLECTION }
