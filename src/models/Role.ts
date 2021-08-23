class Role {
    private _id?: number
    private name: string
    private description: string

    constructor(name: string, description: string, id = 0) {
        this._id = id
        this.name = name
        this.description = description
    }

    getJson() {
        const role = Object.assign({}, this)
        delete role?._id
        return role
    }
}

const ROLE_COLLECTION = 'Roles'

export { Role, ROLE_COLLECTION }
