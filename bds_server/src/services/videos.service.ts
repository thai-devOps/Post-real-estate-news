import { VIDEO_SCHEMA } from '~/models/schemas/Video.schema'
import databaseService from './database.service'
import { ObjectId } from 'mongodb'

class VideosService {
  async create(payload: { public_id: string; video_url: string }) {
    return await databaseService.videos.insertOne(new VIDEO_SCHEMA(payload))
  }
  async getByID(id: string) {
    return await databaseService.videos.findOne({ _id: new ObjectId(id) })
  }
}
const videosService = new VideosService()
export default videosService
