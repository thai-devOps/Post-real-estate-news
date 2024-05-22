import { IMAGE_SCHEMA } from '~/models/schemas/Image.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'

class ImagesService {
  async createImage(payload: { contentType: string; image: Buffer }) {
    return await databaseService.images.insertOne(
      new IMAGE_SCHEMA({
        ...payload
      })
    )
  }
  async getImageById(id: string) {
    return await databaseService.images.findOne({ _id: new ObjectId(id) })
  }
}
const imagesService = new ImagesService()
export default imagesService
