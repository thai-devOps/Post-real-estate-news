import { ObjectId } from 'mongodb'
import { BUYING_STATUS, POST_STATUS, POST_TYPE } from '~/enums/util.enum'
import { AddressTypes, ImageTypes } from '~/type'

interface RealEstateNew {
  _id: ObjectId
  title: string
  description: string
  price: number
  address: AddressTypes
  area: number
  rating: number
  type: POST_TYPE // Loại tin đăng
  image: ImageTypes[]
  buying_status: BUYING_STATUS
  posted_by: ObjectId // Người đăng
  status: POST_STATUS
  property_type_id: ObjectId
  view: number
  internal_amenities: string[]
  external_amenities: string[]

  created_at: Date
  updated_at: Date
}
