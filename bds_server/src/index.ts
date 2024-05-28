import express, { type Request, type Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cron from 'node-cron'
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
import reportsInteractionRoutes from './routes/reports_interaction.routes'
import realEstateNewsService from './services/real_estate_news.service'
import { calculateRaw, normalize } from './utils/caculateRating'
import projectRoutes from './routes/projects.routes'
import newsRoutes from './routes/news.routes'
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
app.use('/real-estate-news', realEstateNewsRoutes)
// Update rating for all posts every day at 00:00 AM
cron.schedule('0 0 * * *', async () => {
  try {
    const posts = await realEstateNewsService.getAllNotPagination()
    const rawRating = posts.map((post) => calculateRaw(post.view, post.published_at))
    const maxRating = Math.max(...rawRating)
    const minRating = Math.min(...rawRating)
    for (const post of posts) {
      const rating = calculateRaw(post.view, post.published_at)
      const normalizedRating = normalize(rating, maxRating, minRating)
      await realEstateNewsService.updateRating(post._id.toString(), Math.round(normalizedRating * 10) / 10)
    }
    console.log('Update rating success')
  } catch (error) {
    console.log(error)
  }
})

// Routes
app.use('/users', userRoutes)
app.use('/upload', uploadImagesRoutes)
app.use('/properties', propertiesRoutes)
app.use('/furnitures', furnituresRoutes)
app.use('/comments', commentsRoutes)
app.use('/favorites', favoritesRoutes)
app.use('/reports-interaction', reportsInteractionRoutes)
app.use('/projects', projectRoutes)
app.use('/news', newsRoutes)
// error handler
app.use(defaultErrorHandler)

app.listen(env_config.SERVER_PORT, () => {
  console.log('Server is running on port 5010')
})
