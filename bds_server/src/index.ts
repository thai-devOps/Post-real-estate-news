import express, { type Request, type Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import env_config from '~/configs/env.config'
import databaseService from './services/database.service'
import userRoutes from './routes/users.routes'
import { defaultErrorHandler } from './utils/requestHandler'
import propertiesRoutes from './routes/properties.routes'
import furnituresRoutes from './routes/furniture.routes'
const app = express()
app.use(
  cors({
    origin: env_config.CLIENT_PORTS
  })
)
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Connect to the database
databaseService.connect()

// Routes
app.use('/users', userRoutes)
app.use('/properties', propertiesRoutes)
app.use('/furnitures', furnituresRoutes)
// error handler
app.use(defaultErrorHandler)

app.listen(env_config.SERVER_PORT, () => {
  console.log('Server is running on port 5010')
})
