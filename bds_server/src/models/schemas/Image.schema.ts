import { ObjectId } from 'mongodb'

interface ImageType {
  _id?: ObjectId
  contentType: string
  image: Buffer
  created_at?: Date
  updated_at?: Date
}
export class IMAGE_SCHEMA {
  _id?: ObjectId
  contentType: string
  image: Buffer
  created_at: Date
  updated_at: Date
  constructor(data: ImageType) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.contentType = data.contentType
    this.image = data.image
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
