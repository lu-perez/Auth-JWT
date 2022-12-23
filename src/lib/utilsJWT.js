import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const createJWT = (user) => {
  const { _id } = user
  const expiresIn = '1d' // 1 day
  const payload = {
    sub: _id,
    iat: Date.now()
  }
  const signedToken = jwt.sign(payload, JWT_SECRET, { expiresIn })
  return {
    token: `Bearer ${signedToken}`,
    expiresIn
  }
}
