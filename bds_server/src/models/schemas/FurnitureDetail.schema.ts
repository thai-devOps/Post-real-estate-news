import { ObjectId } from 'mongodb'
import { FURNITURE_STATUS } from '~/enums/util.enum'

interface FurnitureDetail {
  _id?: ObjectId
  name: string
  status: FURNITURE_STATUS
  quantity: number
  post_id: ObjectId
  furniture_id: ObjectId
  created_at?: Date
  updated_at?: Date
}
export class FURNITURE_DETAIL_SCHEMA {
  _id: ObjectId
  name: string
  status: FURNITURE_STATUS
  quantity: number
  post_id: ObjectId
  furniture_id: ObjectId
  created_at: Date
  updated_at: Date
  constructor(data: FurnitureDetail) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.name = data.name
    this.status = data.status
    this.quantity = data.quantity
    this.post_id = data.post_id
    this.furniture_id = data.furniture_id
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
