import { REAL_ESTATE_NEW_REQUEST_BODY } from '~/models/requests/real_estate_new.request'
import databaseService from './database.service'
import { REAL_ESTATE_NEW_SCHEMA } from '~/models/schemas/RealEstateNew.schema'
import { ObjectId } from 'mongodb'
import { POST_STATUS } from '~/enums/util.enum'

class RealEstateNewsService {
  async create(payload: REAL_ESTATE_NEW_REQUEST_BODY) {
    return await databaseService.real_estate_news.insertOne(
      new REAL_ESTATE_NEW_SCHEMA({
        ...payload,
        property_type_id: new ObjectId(payload.property_type_id),
        posted_by: new ObjectId(payload.posted_by),
        // convert string to date
      })
    )
  }
  public async getAll({
    page,
    limit,
    order_by,
    sort_by,
    condition
  }: {
    page?: number
    limit?: number
    sort_by?: string
    order_by?: string
    condition?: any
  }) {
    if (!page) page = 1
    if (!limit) limit = 10
    if (!sort_by) sort_by = 'rating'
    if (!order_by) order_by = 'desc'

    const result = await Promise.all([
      databaseService.real_estate_news
        .find(condition)
        .sort({ [sort_by]: order_by === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseService.real_estate_news.countDocuments(condition)
    ])
    return {
      items: result[0],
      paginate: {
        totalPage: Math.ceil(result[1] / limit),
        pageSize: result[1],
        page,
        limit
      }
    }
  }
  public async getById(id: string) {
    return await databaseService.real_estate_news.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { view: 1 } },
      { returnDocument: 'after' }
    )
  }
  public async update(id: string, payload: REAL_ESTATE_NEW_REQUEST_BODY) {
    return await databaseService.real_estate_news.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          property_type_id: new ObjectId(payload.property_type_id),
          posted_by: new ObjectId(payload.posted_by),
          // convert string to date
          updated_at: new Date()
        }
      }
    )
  }
  public async updateStatus(id: string, status: POST_STATUS) {
    return await databaseService.real_estate_news.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updated_at: new Date()
        }
      }
    )
  }
  public async deleteOne(id: string) {
    return await databaseService.real_estate_news.findOneAndDelete({ _id: new ObjectId(id) })
  }
  public async deleteMany(ids: string[]) {
    return await databaseService.real_estate_news.deleteMany({
      _id: {
        $in: ids.map((id) => new ObjectId(id))
      }
    })
  }
  public async deleteAll() {
    return await databaseService.real_estate_news.deleteMany({})
  }

  public async getRealEstateNewsByUserId(user_id: string) {
    return await databaseService.real_estate_news.find({ posted_by: new ObjectId(user_id) }).toArray()
  }
  public async getAllNotPagination() {
    return await databaseService.real_estate_news.find({}).toArray()
  }
  public async updateRating(id: string, rating: number) {
    return await databaseService.real_estate_news.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          rating,
          updated_at: new Date()
        }
      }
    )
  }
}
const realEstateNewsService = new RealEstateNewsService()
export default realEstateNewsService
