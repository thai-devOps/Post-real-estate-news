import { FURNITURE_DETAILS_REQUEST_BODY } from '~/models/requests/furniture_details.request'
import databaseService from './database.service'
import { FURNITURE_DETAIL_SCHEMA } from '~/models/schemas/FurnitureDetail.schema'
import { ObjectId } from 'mongodb'

class FurnitureDetailsService {
  public async create(payload: FURNITURE_DETAILS_REQUEST_BODY) {
    return await databaseService.furniture_details.insertOne(
      new FURNITURE_DETAIL_SCHEMA({
        ...payload,
        post_id: new ObjectId(payload.post_id),
        furniture_id: new ObjectId(payload.furniture_id)
      })
    )
  }
}
const furnitureDetailsService = new FurnitureDetailsService()
export default furnitureDetailsService
