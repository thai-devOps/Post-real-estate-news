import { FURNITURE_SCHEMA } from '~/models/schemas/Furniture.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'
import { FURNITURE_REQUEST_BODY } from '~/models/requests/furnitures.request'

class FurnituresService {
  async create(payload: FURNITURE_REQUEST_BODY) {
    return await databaseService.furnitures.insertOne(
      new FURNITURE_SCHEMA({
        ...payload,
        property_id: new ObjectId(payload.property_id)
      })
    )
  }
  async getAll(name?: string) {
    return name
      ? await databaseService.furnitures
          .find({
            name: {
              $regex: new RegExp(name, 'i'),
              $options: 'i'
            }
          })
          .toArray()
      : await databaseService.furnitures.find().toArray()
  }
  // async getAllPagination(){
  //   return await databaseService.furnitures.find().toArray()
  // }
  async getByPropertyId(property_id: string) {
    return await databaseService.furnitures.find({ property_id: new ObjectId(property_id) }).toArray()
  }
  async getById(id: string) {
    return await databaseService.furnitures.findOne({ _id: new ObjectId(id) })
  }
  async update(id: string, payload: FURNITURE_REQUEST_BODY) {
    return await databaseService.furnitures.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          property_id: new ObjectId(payload.property_id),
          updated_at: new Date()
        }
      },
      {
        returnDocument: 'after'
      }
    )
  }
  async deleteOne(id: string) {
    return await databaseService.furnitures.findOneAndDelete({ _id: new ObjectId(id) })
  }
  async deleteMany(ids: string[]) {
    return await databaseService.furnitures.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
  }
  async deleteAll() {
    return await databaseService.furnitures.deleteMany({})
  }
}
const furnituresService = new FurnituresService()
export default furnituresService
