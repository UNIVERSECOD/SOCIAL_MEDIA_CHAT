import bcrypt from "bcrypt"
import { configDotenv } from 'dotenv';

configDotenv()

export function hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND)
    const salt = bcrypt.genSaltSync(saltRounds);;
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword
} // hash eden funksiya

export function comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
} //  kohne shifreyle muqayise
