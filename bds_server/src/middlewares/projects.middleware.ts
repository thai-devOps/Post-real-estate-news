import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'

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
    total_area: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập diện tích'
      }
    },
    building_density: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập mật độ xây dựng'
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
    amentities: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập tiện ích'
      }
    },
    property_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập loại hình dự án'
      }
    },
    design: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập mặt bằng dự án'
      }
    },
    trading_price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập giá mua bán'
      }
    },
    rental_price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập giá thuê'
      }
    },
    images: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Vui lòng nhập hình ảnh dự án'
      }
    }
  })
)
const projectsMiddlewares = {
  createProjectValidator
}
export default projectsMiddlewares
