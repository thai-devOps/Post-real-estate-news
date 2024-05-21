import { ObjectId } from 'mongodb'

interface FurnitureType {
  _id?: ObjectId
  name: string
  description: string
  property_id: ObjectId
  created_at?: Date
  updated_at?: Date
}
export class FURNITURE_SCHEMA {
  _id: ObjectId
  name: string
  description: string
  property_id: ObjectId
  created_at: Date
  updated_at: Date
  constructor(data: FurnitureType) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.name = data.name
    this.description = data.description
    this.property_id = data.property_id
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
