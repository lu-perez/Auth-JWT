import mongoose, { Schema } from 'mongoose'

export const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String
})

export default mongoose.model('User', UserSchema)
