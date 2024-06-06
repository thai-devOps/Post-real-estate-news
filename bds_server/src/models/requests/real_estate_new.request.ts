import { DIRECTION, POST_TYPE, BUYING_STATUS, POST_STATUS, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes, VideoType } from '~/type'
import { FURNITURE_DETAILS_REQUEST_BODY } from './furniture_details.request'
export type REAL_ESTATE_NEW_REQUEST_BODY = {
  title: string
  description: string
  //Thông tin giá
  price: {
    value: number
    unit: 'Triệu' | 'Tỷ' | 'Trăm nghìn' | 'Nghìn'
    is_for_sell: boolean // true: bán, false: cho thuê
    is_negotiable: boolean // có thể thương lượng
    rental_period: string
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
  type: POST_TYPE // Loại tin đăng ví dụ: "sell" | "rent"
  // thông tin hình ảnh
  images: ImageTypes[]
  videos: VideoType[]
  // thông tin mua bán
  buying_status?: BUYING_STATUS
  // thông tin người đăng
  posted_by?: string // Người đăng
  // thông tin trạng thái
  status: POST_STATUS
  // thông tin loại bất động sản
  property_type_id: string
  view: number
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
  furniture_details: FURNITURE_DETAILS_REQUEST_BODY[]
  // Ngày hết hạn
  created_at?: Date
  updated_at?: Date
}
// queries
export type REAL_ESTATE_NEW_QUERY = {
  title?: string
  price?: number
  address?: AddressTypes
  area?: number
  // hướng
  direction?: DIRECTION
  type?: POST_TYPE // Loại tin đăng
  image?: ImageTypes[]
  buying_status?: BUYING_STATUS
  property_type_id?: string
  rating?: number | string
  page?: number | string
  limit?: number | string
  sort_by?: 'title' | 'price' | 'area'
  order_by?: 'asc' | 'desc'
  // thời gian tồn tại tin
}
