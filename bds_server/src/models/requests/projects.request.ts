import { BUYING_STATUS, UNIT } from '~/enums/util.enum'
import { AddressTypes, ImageTypes, PriceRange } from '~/type'

export interface PROJECT_REQUEST_BODY {
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
  property_id: string
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
}
