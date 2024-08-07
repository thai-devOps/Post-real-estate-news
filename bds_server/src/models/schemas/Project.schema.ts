import { ObjectId } from 'mongodb'
import { BUYING_STATUS, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes, PriceRange, VideoType } from '~/type'

interface ProjectTypes {
  _id?: ObjectId
  // Tên dự án
  name: string
  location: AddressTypes
  // Địa chỉ hiển thị
  address: string
  investor: {
    avartar?: ImageTypes
    name: string
    // Số dự án
    number_of_projects: number // required
    // mô tả
    description?: string
  } // Thông tin nhà đầu tư
  area: {
    value: number
    unit: UNIT // m2
  } // Tổng diện tích
  scale: string // Quy mô dự án: 128 căn hộ, 2 tòa
  legal: string // Pháp lý
  // Tiến độ dự án
  progress: {
    start_time: string // Thời gian bắt đầu
    handover_time: string // Thời gian bàn giao 'Đã hoàn thành' | 'Đang thi công' | 'Đang hoàn thiện'
    end_time: string // Thời gian kết thúc
    description: string // Mô tả tiến độ
  }
  // Trạng thái dự án
  status: BUYING_STATUS // 'Đang mở bán' | 'Đang nhận đặt chỗ' | 'Đã bàn giao'
  // Tiện ích nội khu
  internal_amenities: string[]
  // Tiện ích ngoại khu
  external_amenities: string[]
  // Loại hình dự án
  property_id: ObjectId
  // Giá bán
  selling_prices: {
    value: number
    currency: string // e.g., 'USD', 'VND'
    effective_date: Date // The date when this price becomes effective
  }[]
  // Giá thuê
  rental_prices: {
    value: number
    currency: string // e.g., 'USD', 'VND'
    frequency: 'daily' | 'monthly' | 'yearly' | 'quarterly'
    effective_date: Date // The date when this price becomes effective
  }[]
  // Hình ảnh dự án
  images: ImageTypes[]
  videos?: VideoType[]
  created_at?: Date
  updated_at?: Date
}

export class PROJECT_SCHEMA {
  _id: ObjectId
  name: string
  location: AddressTypes
  address: string
  investor: {
    avartar?: ImageTypes
    name: string
    number_of_projects: number
    description?: string
  }
  area: {
    value: number
    unit: UNIT
  }
  scale: string
  legal: string
  progress: {
    start_time: string
    handover_time: string
    end_time: string
    description: string
  }
  status: BUYING_STATUS
  internal_amenities: string[]
  external_amenities: string[]
  property_id: ObjectId
  selling_prices: {
    value: number
    currency: string
    effective_date: Date
  }[]
  // Giá thuê
  rental_prices: {
    value: number
    currency: string
    frequency: 'daily' | 'monthly' | 'yearly' | 'quarterly'
    effective_date: Date
  }[]
  // Hình ảnh dự án
  images: ImageTypes[]
  videos: VideoType[]
  created_at?: Date
  updated_at?: Date
  constructor(data: ProjectTypes) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.name = data.name
    this.location = data.location
    this.address = data.address
    this.investor = data.investor
    this.scale = data.scale
    this.area = data.area
    this.selling_prices = data.selling_prices
    this.rental_prices = data.rental_prices
    this.internal_amenities = data.internal_amenities
    this.external_amenities = data.external_amenities
    this.legal = data.legal
    this.progress = data.progress
    this.status = data.status
    this.property_id = data.property_id
    this.images = data.images
    this.videos = data.videos || []
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
