import { BUYING_STATUS, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes, PriceRange, VideoType } from '~/type'

export interface PROJECT_REQUEST_BODY {
  // Tên dự án
  name: string
  location: AddressTypes
  // Địa chỉ hiển thị
  address: string
  investor: {
    avartar: ImageTypes
    name: string
    // Số dự án
    number_of_projects: number // required
    // mô tả
    description: string
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
  property_id: string
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
  videos: VideoType[]
}
