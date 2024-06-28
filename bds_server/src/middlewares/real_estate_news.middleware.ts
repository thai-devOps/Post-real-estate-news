import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'

const createValidator = validateSchema(
  checkSchema({
    title: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tiêu đề không được để trống'
      },
      isString: {
        errorMessage: 'Tiêu đề định dạng không hợp lệ'
      }
    },
    description: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Mô tả không được để trống'
      },
      isString: {
        errorMessage: 'Mô tả định dạng không hợp lệ'
      }
    },
    price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Giá không được để trống'
      },
      isObject: {
        errorMessage: 'Giá định dạng không hợp lệ'
      }
    },
    'price.value': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Giá trị không được để trống'
      },
      isNumeric: {
        errorMessage: 'Giá trị phải là số'
      }
    },
    'price.unit': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Đơn vị không được để trống'
      },
      isString: {
        errorMessage: 'Đơn vị định dạng không hợp lệ'
      }
    },
    'price.is_for_sell': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Loại không được để trống'
      },
      isBoolean: {
        errorMessage: 'Loại phải là boolean'
      }
    },
    'price.is_negotiable': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Có thể thương lượng không được để trống'
      },
      isBoolean: {
        errorMessage: 'Có thể thương lượng phải là boolean'
      }
    },
    'price.rental_period': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Kỳ hạn không được để trống'
      },
      isString: {
        errorMessage: 'Kỳ hạn định dạng không hợp lệ'
      }
    },
    'price.deposit': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tiền cọc không được để trống'
      },
      isNumeric: {
        errorMessage: 'Tiền cọc phải là số'
      }
    },
    address: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Địa chỉ không được để trống'
      }
    },
    'address.province': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Thành phố không được để trống'
      },
      isString: {
        errorMessage: 'Thành phố định dạng không hợp lệ'
      }
    },
    'address.district': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Quận không được để trống'
      },
      isString: {
        errorMessage: 'Quận định dạng không hợp lệ'
      }
    },
    'address.ward': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Phường không được để trống'
      },
      isString: {
        errorMessage: 'Phường định dạng không hợp lệ'
      }
    },
    'address.details': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Địa chỉ chi tiết không được để trống'
      },
      isString: {
        errorMessage: 'Địa chỉ chi tiết định dạng không hợp lệ'
      }
    },
    area: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Diện tích không được để trống'
      }
    },
    'area.value': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Giá trị không được để trống'
      },
      isNumeric: {
        errorMessage: 'Giá trị phải là số'
      }
    },
    'area.unit': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Đơn vị không được để trống'
      },
      isString: {
        errorMessage: 'Đơn vị định dạng không hợp lệ'
      }
    },
    frontage: {
      in: ['body'],
      optional: true,
      // notEmpty: {
      //   errorMessage: 'Mặt tiền không được để trống'
      // },
      isNumeric: {
        errorMessage: 'Mặt tiền phải là số'
      }
    },
    entrance: {
      in: ['body'],
      optional: true,
      // notEmpty: {
      //   errorMessage: 'Đường vào không được để trống'
      // },
      isNumeric: {
        errorMessage: 'Đường vào phải là số'
      }
    },
    direction: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Hướng không được để trống'
      },
      isString: {
        errorMessage: 'Hướng định dạng không hợp lệ'
      }
    },
    contact_info: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Thông tin liên hệ không được để trống'
      }
    },
    'contact_info.contact_name': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tên liên hệ không được để trống'
      },
      isString: {
        errorMessage: 'Tên liên hệ định dạng không hợp lệ'
      }
    },
    'contact_info.contact_phone': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Số điện thoại không được để trống'
      },
      isString: {
        errorMessage: 'Số điện thoại định dạng không hợp lệ'
      }
    },
    'contact_info.contact_email': {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Email không được để trống'
      },
      isEmail: {
        errorMessage: 'Email định dạng không hợp lệ'
      }
    },
    type: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Loại tin không được để trống'
      },
      isString: {
        errorMessage: 'Loại tin định dạng không hợp lệ'
      }
    },
    images: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Hình ảnh không được để trống'
      }
    },
    videos: {
      in: ['body'],
      optional: true
      // notEmpty: {
      //   errorMessage: 'Video không được để trống'
      // }
    },
    property_type_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Loại bất động sản không được để trống'
      },
      isString: {
        errorMessage: 'Loại bất động sản định dạng không hợp lệ'
      }
    },
    number_of_bedrooms: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Số phòng ngủ không được để trống'
      },
      isNumeric: {
        errorMessage: 'Số phòng ngủ phải là số'
      }
    },
    number_of_toilets: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Số phòng vệ sinh không được để trống'
      },
      isNumeric: {
        errorMessage: 'Số phòng vệ sinh phải là số'
      }
    },
    number_of_floors: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Số tầng không được để trống'
      },
      isNumeric: {
        errorMessage: 'Số tầng phải là số'
      }
    },
    legal_info: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Thông tin pháp lý không được để trống'
      },
      isString: {
        errorMessage: 'Thông tin pháp lý định dạng không hợp lệ'
      }
    },
    furniture: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Nội thất không được để trống'
      },
      isString: {
        errorMessage: 'Nội thất định dạng không hợp lệ'
      }
    },
    internal_amenities: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tiện ích nội không được để trống'
      }
    },
    external_amenities: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tiện ích ngoại không được để trống'
      }
    },
    furniture_details: {
      in: ['body'],
      optional: true,
      isArray: {
        errorMessage: 'Tiện ích nội thất phải là một mảng đối tượng gồm tên, số lượng'
      }
    }
  })
)
const realEstateNewsMiddlewares = {
  createValidator
}
export default realEstateNewsMiddlewares
