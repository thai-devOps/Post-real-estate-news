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
import vipPackagesRoutes from './routes/vip_packages.routes'
import paymentsRoutes from './routes/payments.routes'
import paypalService from './paypal_api'
import videoRoutes from './routes/video.routes'
import vipUserDetailsRoutes from './routes/vip_user_details.routes'
import { POST_STATUS, VIP_STATUS } from './enums/util.enum'
import fetch from 'node-fetch'
import { responseSuccess } from './utils/response'
const app = express()
app.use(
  cors({
    origin: [(env_config.CLIENT_PORTS as string) || 'http://localhost:5173', 'http://127.0.0.1:5500'],
    credentials: true,
    optionsSuccessStatus: 200
  })
)
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.get('/upload-image-example', (req, res) => {
  res.render('uploadImage')
})
app.get('', (req, res) => {
  return res.render('upLoadVideo')
})
app.get('/api/province', async (req, res) => {
  const result = await fetch('https://vapi.vnappmob.com/api/province/')
  return responseSuccess(res, {
    message: 'Lấy province thành công',
    data: await result.json()
  })
})
app.get('/api/district/:id', async (req, res) => {
  const { id } = req.params
  const result = await fetch(`https://vapi.vnappmob.com/api/province/district/${id}`)
  return responseSuccess(res, {
    message: 'Lấy district thành công',
    data: await result.json()
  })
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
// Update trending posts every 5 minutes
cron.schedule('*/1 * * * *', async () => {
  try {
    const topTrending = await realEstateNewsService.getTopNews({})
    if (!topTrending) {
      return
    }
    // tìm tất cả tin đăng có vip.is_top = true  và ! pTrending._idto
    const topNews = await databaseService.real_estate_news
      .find({
        'vip.is_top': true,
        status: POST_STATUS.CONFIRMED,
        is_priority: false
      })
      .sort({ 'vip.trendPosition': 1 })
      .toArray()
    if (topNews.length === 0) {
      return
    }
    for (let i = 0; i < topNews.length; i++) {
      await databaseService.real_estate_news.findOneAndUpdate(
        {
          _id: topNews[i]._id
        },
        {
          $set: {
            is_priority: i === 0 ? true : false,
            'vip.trendPosition': i
          }
        }
      )
    }
    await databaseService.real_estate_news.findOneAndUpdate(
      {
        _id: topTrending._id
      },
      {
        $set: {
          is_priority: false,
          'vip.trendPosition': topNews.length
        }
      }
    )
    console.log('Cập nhật tin đăng xu hướng...')
  } catch {
    console.log('Failed to update trending posts')
  }
})
// Update post status if expired every day at 00:00 AM
cron.schedule('0 0 * * *', async () => {
  try {
    const posts = await realEstateNewsService.getAllNotPagination()
    for (const post of posts) {
      const now = new Date()
      if (now > post.expired_at) {
        await realEstateNewsService.updateStatus(post._id.toString(), POST_STATUS.EXPIRED)
      }
    }
    console.log('Cập nhật trạng thái tin đăng')
  } catch (error) {
    console.log(error)
  }
})
// Cập nhật trạng thái vip tự động sau 1 phút
cron.schedule('*/1 * * * *', async () => {
  try {
    const vipUsers = await databaseService.vip_user_details.find().toArray()
    for (const vipUser of vipUsers) {
      const now = new Date()
      if (now > vipUser.end_date) {
        await databaseService.vip_user_details.findOneAndUpdate(
          {
            _id: vipUser._id
          },
          {
            $set: {
              current_active: false,
              status: VIP_STATUS.EXPIRED
            }
          }
        )
      }
    }
    console.log('Cập nhật trạng thái vip')
  } catch (error) {
    console.log(error)
  }
})

// Routes
app.post('/api/orders', async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const payload = req.body as { id: string; name: string; price: number }
    const { jsonResponse, httpStatusCode } = await paypalService.createOrder(payload)
    res.status(httpStatusCode).json(jsonResponse)
  } catch (error) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Failed to create order.' })
  }
})
app.post('/api/orders/:orderID/capture', async (req, res) => {
  try {
    const { orderID } = req.params
    const { jsonResponse, httpStatusCode } = await paypalService.captureOrder(orderID)
    res.status(httpStatusCode).json(jsonResponse)
  } catch (error) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Failed to capture order.' })
  }
})
app.use('/users', userRoutes)
app.use('/upload', uploadImagesRoutes)
app.use('/upload-video', videoRoutes)
app.use('/properties', propertiesRoutes)
app.use('/furnitures', furnituresRoutes)
app.use('/comments', commentsRoutes)
app.use('/favorites', favoritesRoutes)
app.use('/reports-interaction', reportsInteractionRoutes)
app.use('/projects', projectRoutes)
app.use('/news', newsRoutes)
app.use('/vip-packages', vipPackagesRoutes)
app.use('/payments', paymentsRoutes)
app.use('/user-vips', vipUserDetailsRoutes)

app.use(defaultErrorHandler)
app.listen(env_config.SERVER_PORT, async () => {
  console.log('Server is running on port 5010')
})
