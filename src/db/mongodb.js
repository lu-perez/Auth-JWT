import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const dbURI = process.env.MONGODB_URI
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.set('strictQuery', false)

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, dbOptions)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(`Error in MongoDB connection: ${error}`)
  }
}
