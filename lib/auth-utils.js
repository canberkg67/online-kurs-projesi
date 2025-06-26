import bcrypt from 'bcryptjs'

export async function verifyPassword(password, hashed) {
    return await bcrypt.compare(password, hashed)
}
