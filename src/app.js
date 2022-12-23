import express, { urlencoded } from 'express'
import cors from 'cors'
import { connectDB } from './db/mongodb.js'
import { userRoutes } from './routes/user.routes.js'

const app = express()
const PORT = 4444

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
  connectDB()
})
