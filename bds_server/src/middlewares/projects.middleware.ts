import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'
/**
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
 */
const createProjectValidator = validateSchema(
  checkSchema({
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tên dự án không được để trống'
      }
    },
    location: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập địa chỉ hiển thị'
      }
    },
    address: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập địa chỉ'
      }
    },
    investor: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập thông tin nhà đầu tư'
      }
    },
    area: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập diện tích'
      }
    },
    scale: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập quy mô dự án'
      }
    },
    legal: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập pháp lý'
      }
    },
    progress: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập tiến độ dự án'
      }
    },
    status: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập trạng thái dự án'
      }
    },
    property_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập loại hình dự án'
      }
    },
    selling_prices: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập giá bán'
      }
    },
    rental_prices: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập giá thuê'
      }
    },
    images: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng chọn hình ảnh dự án'
      }
    },
    videos: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng chọn video dự án'
      }
    },
    internal_amenities: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập tiện ích nội khu'
      },
      isArray: {
        errorMessage: 'Tiện ích nội khu phải là một mảng'
      }
    },
    external_amenities: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập tiện ích xung quanh'
      },
      isArray: {
        errorMessage: 'Tiện ích xung quanh phải là một mảng'
      }
    }
  })
)
const projectsMiddlewares = {
  createProjectValidator
}
export default projectsMiddlewares
