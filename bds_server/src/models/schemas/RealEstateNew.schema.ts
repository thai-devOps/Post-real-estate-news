import { ObjectId } from 'mongodb'
import { BUYING_STATUS, DIRECTION, POST_STATUS, POST_TYPE, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes } from '~/type'

interface RealEstateNew {
  _id?: ObjectId
  title: string
  description: string
  //Thông tin giá trên m2
  // Thông tin địa chỉ
  address: AddressTypes
  // thông tin diện tích
  area: {
    value: number
    unit: UNIT
  }
  price: {
    value: number
    unit: string
    is_for_sell: boolean // true: bán, false: cho thuê
    is_negotiable: boolean // có thể thương lượng
    // thuê theo tháng hay năm
    rental_period: string
    deposit: number // tiền cọc
  }
  // Thông tin mặt tiền
  frontage?: number // Mặt tiền (m)
  // Thông tin đường vào
  entrance?: number // Đường vào (m)
  // Thông tin hướng
  direction: DIRECTION
  // thông tin liên hệ
  contact_info: {
    contact_name: string
    contact_phone: string
    contact_email: string
  }
  // Đánh giá
  rating?: number
  // hướng
  type: POST_TYPE // Loại tin đăng ví dụ: "sell" | "rent"
  // thông tin hình ảnh
  image: ImageTypes[]
  // thông tin mua bán
  buying_status?: BUYING_STATUS
  // thông tin người đăng
  posted_by: ObjectId // Người đăng
  // thông tin trạng thái
  status?: POST_STATUS
  // thông tin loại bất động sản
  property_type_id: ObjectId
  view?: number
  // thời gian tồn tại tin
  time_existed?: number //ví dụ: 30 ngày
  // tiện ích nội ngoại khu
  number_of_bedrooms: number // Số phòng ngủ
  number_of_toilets: number // Số phòng vệ sinh
  number_of_floors: number // Số tầng
  // thông tin pháp lý
  legal_info: string // Thông tin pháp lý (sổ đỏ, sổ hồng, giấy tờ hợp lệ)
  // thông tin nội thất
  furniture: string // Nội thất: "full" | "basic" | "none
  // tiện ích nội ngoại khu
  internal_amenities: string[]
  external_amenities: string[]
  // Ngày đăng tin
  published_at?: Date
  // Ngày hết hạn
  expired_at?: Date
  updated_at?: Date
}
export class REAL_ESTATE_NEW_SCHEMA {
  _id: ObjectId
  title: string
  description: string
  //Thông tin giá
  price: {
    value: number
    unit: string
    is_for_sell: boolean // true: bán, false: cho thuê
    is_negotiable: boolean // có thể thương lượng
    // thuê theo tháng hay năm
    rental_period: string // 'month' | 'year' | 'none'
    deposit: number // tiền cọc
  }
  // Thông tin địa chỉ
  address: AddressTypes
  // thông tin diện tích
  // thông tin về kích thước
  area: {
    value: number
    unit: UNIT
  }
  // Thông tin mặt tiền
  frontage: number // Mặt tiền (m)
  // Thông tin đường vào
  entrance: number // Đường vào (m)
  // Thông tin hướng
  direction: DIRECTION
  // thông tin liên hệ
  contact_info: {
    contact_name: string
    contact_phone: string
    contact_email: string
  }
  // Đánh giá
  rating: number
  // hướng
  type: POST_TYPE // Loại tin đăng ví dụ: "sell" | "rent"
  // thông tin hình ảnh
  image: ImageTypes[]
  // thông tin mua bán
  buying_status: BUYING_STATUS
  // thông tin người đăng
  posted_by: ObjectId // Người đăng
  // thông tin trạng thái
  status: POST_STATUS
  // thông tin loại bất động sản
  property_type_id: ObjectId
  view: number
  // thời gian tồn tại tin
  time_existed: number //ví dụ: 30 ngày
  // tiện ích nội ngoại khu
  number_of_bedrooms: number // Số phòng ngủ
  number_of_toilets: number // Số phòng vệ sinh
  number_of_floors: number // Số tầng
  // thông tin pháp lý
  legal_info: string // Thông tin pháp lý (sổ đỏ, sổ hồng, giấy tờ hợp lệ)
  // thông tin nội thất
  furniture: string // Nội thất: "full" | "basic" | "none
  // tiện ích nội ngoại khu
  internal_amenities: string[]
  external_amenities: string[]
  // Ngày đăng tin
  published_at: Date
  // Ngày hết hạn
  expired_at: Date
  updated_at: Date
  constructor(data: RealEstateNew) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.title = data.title
    this.description = data.description
    this.address = data.address
    this.price = data.price
    this.area = data.area
    this.frontage = data.frontage || 0
    this.entrance = data.entrance || 0
    this.direction = data.direction
    this.contact_info = data.contact_info
    this.rating = data.rating || 0
    this.type = data.type
    this.image = data.image
    this.buying_status = data.buying_status || BUYING_STATUS.OPEN
    this.posted_by = data.posted_by
    this.status = data.status || POST_STATUS.PENDING
    this.property_type_id = data.property_type_id
    this.view = data.view || 0
    this.time_existed = data.time_existed || 7
    this.number_of_bedrooms = data.number_of_bedrooms
    this.number_of_toilets = data.number_of_toilets
    this.number_of_floors = data.number_of_floors
    this.legal_info = data.legal_info
    this.furniture = data.furniture
    this.internal_amenities = data.internal_amenities
    this.external_amenities = data.external_amenities
    this.published_at = data.published_at || date
    this.expired_at = data.expired_at || new Date(date.setDate(date.getDate() + (data.time_existed || 7)))
    this.updated_at = data.updated_at || new Date()
  }
}
