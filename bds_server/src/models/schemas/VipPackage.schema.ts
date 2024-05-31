import { ObjectId } from 'mongodb'
import { DISCOUNT_TYPE } from '~/enums/util.enum'

interface VipPackageType {
  _id?: ObjectId
  name: string
  price: number
  duration: number // in days
  description: string
  status?: 'active' | 'inactive'
  postingLimit: number
  discount?: {
    type: DISCOUNT_TYPE
    value: number
    status: boolean
  }
  topTrending: boolean
  commentRight: boolean
  newsExistTime: number
  created_at?: Date
  updated_at?: Date
}
export class VIP_PACKAGE_SCHEMA {
  _id: ObjectId
  name: string
  price: number
  duration: number
  description: string
  status: 'active' | 'inactive'
  postingLimit: number
  discount: {
    type: DISCOUNT_TYPE
    value: number
    status: boolean
  }
  topTrending: boolean
  commentRight: boolean
  newsExistTime: number
  created_at: Date
  updated_at: Date
  constructor(data: VipPackageType) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.name = data.name
    this.price = data.price
    this.duration = data.duration
    this.description = data.description
    this.status = data.status || 'active'
    this.postingLimit = data.postingLimit
    this.discount = data.discount || { type: DISCOUNT_TYPE.PERCENT, value: 0, status: false }
    this.topTrending = data.topTrending
    this.commentRight = data.commentRight
    this.newsExistTime = data.newsExistTime
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
