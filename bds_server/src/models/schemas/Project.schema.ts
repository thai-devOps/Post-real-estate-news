import { ObjectId } from 'mongodb'
import { BUYING_STATUS, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes, PriceRange } from '~/type'

interface ProjectTypes {
  _id?: ObjectId
  // Tên dự án
  name: string
  location: AddressTypes
  // Địa chỉ hiển thị
  address: string
  investor: {
    avartar: ImageTypes
    name: string
    establish_date: string // ISO string
    //số dự án
    number_of_projects: number
    // description
    description: string
    // một số dự án nổi bật
    projects: string
  } // thông tin nhà đầu tư
  total_area: {
    value: number
    unit: UNIT // m2
  } // tổng diện tích
  building_density: number // mật độ xây dựng (%)
  scale: string // quy mô dự : 128 căn hộ, 2 tòa
  legal: string // pháp lý
  // tiến độ dự án
  progress: {
    start_time: string // thời gian bắt đầu
    handover_time: string // thời gian bàn giao 'Đã hoàn thành' | 'Đang thi công'|'Đang hoàn thiện'
    end_time: string // thời gian kết thúc
    description: string // mô tả tiến độ
  }
  // trạng thái dự án
  status: BUYING_STATUS // 'Đang mở bán' | 'Đang nhận đặt chỗ' | 'Đã bàn giao'
  // tiện ích
  amentities: {
    description: string
    items: {
      name: string
      image: ImageTypes
    }
  }
  // Loai hinh du an
  property_id: ObjectId
  // Mặt bằng dự án
  design: {
    name: string
    images: ImageTypes
  }[]
  // Giá mua bán
  trading_price: {
    totalPrice: PriceRange
    pricePerSquareMeter: PriceRange
  }
  // Giá thuê
  rental_price: PriceRange
  // Hình ảnh dự án
  images: ImageTypes[]
  created_at?: Date
  updated_at?: Date
}
export class PROJECT_SCHEMA {
  _id: ObjectId
  name: string
  location: AddressTypes
  address: string
  investor: {
    avartar: ImageTypes
    name: string
    establish_date: string
    number_of_projects: number
    description: string
    projects: string
  }
  total_area: {
    value: number
    unit: UNIT
  }
  building_density: number
  scale: string
  legal: string
  progress: {
    start_time: string
    handover_time: string
    end_time: string
    description: string
  }
  status: BUYING_STATUS
  amentities: {
    description: string
    items: {
      name: string
      image: ImageTypes
    }
  }
  property_id: ObjectId
  design: {
    name: string
    images: ImageTypes
  }[]
  trading_price: {
    totalPrice: PriceRange
    pricePerSquareMeter: PriceRange
  }
  rental_price: PriceRange
  images: ImageTypes[]
  created_at: Date
  updated_at: Date
  constructor(data: ProjectTypes) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.name = data.name
    this.location = data.location
    this.address = data.address
    this.investor = data.investor
    this.total_area = data.total_area
    this.building_density = data.building_density
    this.scale = data.scale
    this.legal = data.legal
    this.progress = data.progress
    this.status = data.status
    this.amentities = data.amentities
    this.property_id = data.property_id
    this.design = data.design
    this.trading_price = data.trading_price
    this.rental_price = data.rental_price
    this.images = data.images
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
