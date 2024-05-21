import { FURNITURE_DETAILS_REQUEST_BODY } from '~/models/requests/furniture_details.request'
import databaseService from './database.service'
import { FURNITURE_DETAIL_SCHEMA } from '~/models/schemas/FurnitureDetail.schema'
import { ObjectId } from 'mongodb'
import { FURNITURE_STATUS } from '~/enums/util.enum'

class FurnitureDetailsService {
  public async create(payload: {
    post_id: ObjectId
    furniture_id: ObjectId
    name: string
    status: FURNITURE_STATUS
    quantity: number
  }) {
    return await databaseService.furniture_details.insertOne(
      new FURNITURE_DETAIL_SCHEMA({
        ...payload
      })
    )
  }
  public getFurnitureDetailsByPostId(post_id: string) {
    return databaseService.furniture_details.find({ post_id: new ObjectId(post_id) }).toArray()
  }
  public async editFurnitureDetails(id: string, payload: FURNITURE_DETAILS_REQUEST_BODY) {
    return await databaseService.furniture_details.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          post_id: new ObjectId(payload.post_id),
          furniture_id: new ObjectId(payload.furniture_id)
        }
      },
      {
        returnDocument: 'after'
      }
    )
  }
  public async deleteFurnitureDetails(id: string) {
    return await databaseService.furniture_details.findOneAndDelete({ _id: new ObjectId(id) })
  }
  public async deleteFurnitureDetailsByPostId(post_id: string) {
    return await databaseService.furniture_details.deleteMany({ post_id: new ObjectId(post_id) })
  }
  public async deleteAllFurnitureDetails() {
    return await databaseService.furniture_details.deleteMany({})
  }
}
const furnitureDetailsService = new FurnitureDetailsService()
export default furnitureDetailsService
