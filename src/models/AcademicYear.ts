import BaseModel from './BaseModel'

class AcademicYear extends BaseModel {
    private name: string

    constructor(name: string) {
        super()
        this.name = name
    }
}

const ACADEMIC_YEAR_COLLECTION = 'AcademicYears'

export { AcademicYear, ACADEMIC_YEAR_COLLECTION }
