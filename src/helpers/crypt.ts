import { hash, compare } from 'bcrypt'
import { BCRYPTSALTROUNDS } from '../config'

const encryptString = async (word: string) => {
    const encryptedWord = await hash(word, BCRYPTSALTROUNDS)
    return encryptedWord
}

const comparePassword = async (password: string, hash: string) => {
    const result = await compare(password, hash)
    return result ? true : false
}

export { encryptString, comparePassword }
