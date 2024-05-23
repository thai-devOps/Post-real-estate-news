import express, { type Request, type Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import env_config from '~/configs/env.config'
import databaseService from './services/database.service'
import userRoutes from './routes/users.routes'
import { defaultErrorHandler } from './utils/requestHandler'
import propertiesRoutes from './routes/properties.routes'
import furnituresRoutes from './routes/furniture.routes'
import realEstateNewsRoutes from './routes/real_estate_news.routes'
import commentsRoutes from './routes/comments.routes'
import uploadImagesRoutes from './routes/upload_images.routes'
import favoritesRoutes from './routes/favorites.routes'
const app = express()
app.use(
  cors({
    origin: env_config.CLIENT_PORTS
  })
)
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.get('', (req, res) => {
  res.render('uploadImage')
})
// Connect to the database
databaseService.connect()

// Routes
app.use('/users', userRoutes)
app.use('/upload', uploadImagesRoutes)
app.use('/properties', propertiesRoutes)
app.use('/furnitures', furnituresRoutes)
app.use('/real-estate-news', realEstateNewsRoutes)
app.use('/comments', commentsRoutes)
app.use('/favorites', favoritesRoutes)
// error handler
app.use(defaultErrorHandler)

app.listen(env_config.SERVER_PORT, () => {
  console.log('Server is running on port 5010')
})
