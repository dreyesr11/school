import BaseModel from './BaseModel'

class Role extends BaseModel {
    private name: string
    private description: string

    constructor(name: string, description: string) {
        super()
        this.name = name
        this.description = description
    }
}

const ROLE_COLLECTION = 'Roles'

export { Role, ROLE_COLLECTION }
