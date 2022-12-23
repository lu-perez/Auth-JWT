import { Router } from 'express'
import User from '../models/user.model.js'
import { genPassword, validPassword } from '../lib/utilsCrypto.js'
import { createJWT } from '../lib/utilsJWT.js'
import { authJWT } from '../middlewares/jwtHelper.js'

export const userRoutes = new Router()

userRoutes.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.password)
  const { salt, hash } = saltHash
  const newUser = new User({
    username: req.body.username,
    hash,
    salt
  })
  newUser.save()
    .then(user => {
      const { token, expiresIn } = createJWT(user)
      res.json({ success: true, user, token, expiresIn })
    })
    .catch(err => next(err))
})

userRoutes.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'User not found' })
      }
      const isValid = validPassword(req.body.password, user.hash, user.salt)
      if (isValid) {
        const { token, expiresIn } = createJWT(user)
        res.status(200).json({ success: true, user, token, expiresIn })
      } else {
        res.status(401).json({ success: false, msg: 'Wrong password' })
      }
    })
    .catch(err => {
      next(err)
    })
})

userRoutes.get('/protected', authJWT.verifyToken, (req, res, next) => {
  console.log(req.decodedToken)
  res.status(200).json({ success: true, msg: 'You are authorized!' })
})
