import { Collection, Db, MongoClient } from 'mongodb'
import env_config from '~/configs/env.config'
import { COMMENT_SCHEMA } from '~/models/schemas/Comment.schema'
import { FAVORITE_SCHEMA } from '~/models/schemas/Favorite.schema'
import { FURNITURE_SCHEMA } from '~/models/schemas/Furniture.schema'
import { FURNITURE_DETAIL_SCHEMA } from '~/models/schemas/FurnitureDetail.schema'
import { IMAGE_SCHEMA } from '~/models/schemas/Image.schema'
import { NEWS_SCHEMA } from '~/models/schemas/News.schema'
import { PAYMENT_SCHEMA } from '~/models/schemas/Payment.schema'
import { PROJECT_SCHEMA } from '~/models/schemas/Project.schema'
import { PROPERTY_SCHEMA } from '~/models/schemas/Property.schema'
import { REAL_ESTATE_NEW_SCHEMA } from '~/models/schemas/RealEstateNew.schema'
import { REFRESH_TOKEN_SCHEMA } from '~/models/schemas/RefreshToken.schema'
import { REPORT_INTERACTION_SCHEMA } from '~/models/schemas/Report.schema'
import { USER_SCHEMA } from '~/models/schemas/User.schema'
import { VIP_PACKAGE_SCHEMA } from '~/models/schemas/VipPackage.schema'
import { VIP_USER_DETAIL_SCHEMA } from '~/models/schemas/VipUserDetail.schema'

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(env_config.DB_URI as string)
    this.db = this.client.db(env_config.DB_NAME as string)
  }
  // Connect to the database
  async connect() {
    try {
      await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log('Connected to the database')
    } catch (error) {
      console.error('Error connecting to the database', error)
    } finally {
      // await this.client.close()
    }
  }
  // Get the database collection
  get users(): Collection<USER_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.USERS as string)
  }
  get refresh_tokens(): Collection<REFRESH_TOKEN_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.REFRESH_TOKENS as string)
  }
  get properties(): Collection<PROPERTY_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.PROPERTIES as string)
  }
  get furnitures(): Collection<FURNITURE_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.FURNITURES as string)
  }
  get furniture_details(): Collection<FURNITURE_DETAIL_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.FURNITURE_DETAILS as string)
  }
  get real_estate_news(): Collection<REAL_ESTATE_NEW_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.REAL_ESTATE_NEWS as string)
  }
  get comments(): Collection<COMMENT_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.COMMENTS as string)
  }
  get images(): Collection<IMAGE_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.IMAGES as string)
  }
  get favorites(): Collection<FAVORITE_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.FAVORITES as string)
  }
  get reports_interaction(): Collection<REPORT_INTERACTION_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.REPORTS_INTERACTION as string)
  }
  get projects(): Collection<PROJECT_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.PROJECTS as string)
  }
  get news(): Collection<NEWS_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.NEWS as string)
  }
  get vip_packages(): Collection<VIP_PACKAGE_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.VIP_PACKAGES as string)
  }
  get payments(): Collection<PAYMENT_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.PAYMENTS as string)
  }
  get vip_user_details(): Collection<VIP_USER_DETAIL_SCHEMA> {
    return this.db.collection(env_config.DB_COLLECTION.VIP_USER_DETAILS as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
