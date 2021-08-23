// GLOBALS
const missingFields = [404, 'Missing required fields']
const genericAction = (type: string, action: string) => [403, `The ${type} couldn't be ${action}`]
const searchWithoutResults = (type: string, searchParam: { [index: string]: string }) => [
    403,
    `The ${type} with the data: ${JSON.stringify(searchParam)} doesn't exist`
]
const typeNotFound = (type: string) => [404, `${type} not found`]

// USER ERRORS
const incorrectPassword = [403, 'The password isn`t correct']

export { missingFields, genericAction, incorrectPassword, typeNotFound, searchWithoutResults }
