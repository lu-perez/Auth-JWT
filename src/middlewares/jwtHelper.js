import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const authJWT = {
  verifyToken: (req, res, next) => {
    const [bearer, signedToken] = req.headers.authorization?.split(' ')
    if (bearer === 'Bearer' && signedToken.match(/\S+\.\S+\.\S+/) !== null) {
      try {
        const decodedToken = jwt.verify(signedToken, JWT_SECRET)
        req.decodedToken = decodedToken
        next()
      } catch (error) {
        res.status(401).json({ success: false, msg: 'Not authorized' })
      }
    } else {
      res.status(401).json({ success: false, msg: 'Not authorized' })
    }
  }
}
