import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'

/**
 * name: string
  price: number
  duration: number // in days
  description: string
  status?: string // active, inactive
  postingLimit: number
  discount: {
    type: DISCOUNT_TYPE
    value: number
    status: boolean
  }
  topTrending: boolean
  commentRight: boolean
  newsExistTime: number
 */
const createVipPackageValidator = validateSchema(
  checkSchema({
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Tên gói vip không được để trống'
      },
      isString: {
        errorMessage: 'Tên gói vip phải là chuỗi'
      },
      isLength: {
        errorMessage: 'Tên gói vip phải có ít nhất 2 ký tự',
        options: { min: 2 }
      }
    },
    price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Giá gói vip không được để trống'
      },
      isNumeric: {
        errorMessage: 'Giá gói vip phải là số'
      }
    },
    duration: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Thời gian gói vip không được để trống'
      },
      isNumeric: {
        errorMessage: 'Thời gian gói vip phải là số'
      }
    },
    description: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Mô tả gói vip không được để trống'
      },
      isString: {
        errorMessage: 'Mô tả gói vip phải là chuỗi'
      }
    },
    status: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'Trạng thái gói vip phải là chuỗi'
      },
      isIn: {
        options: [['active', 'inactive']],
        errorMessage: 'Trạng thái gói vip không hợp lệ'
      }
    },
    postingLimit: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Giới hạn đăng bài không được để trống'
      },
      isNumeric: {
        errorMessage: 'Giới hạn đăng bài phải là số'
      }
    },
    discount: {
      in: ['body'],
      optional: true,
      isObject: {
        errorMessage: 'Giảm giá phải là object {type, value, status}'
      },
      custom: {
        options: (value) => {
          if (!value.type || !value.value || !value.status) {
            throw new Error('Giảm giá thiếu thông tin (loại, giá trị, trạng thái)')
          }
          return true
        }
      }
    },
    topTrending: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Top trending không được để trống'
      },
      isBoolean: {
        errorMessage: 'Top trending phải là boolean'
      }
    },
    commentRight: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Quyền bình luận không được để trống'
      },
      isBoolean: {
        errorMessage: 'Quyền bình luận phải là boolean'
      }
    },
    newsExistTime: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Thời gian tồn tại tin không được để trống'
      },
      isNumeric: {
        errorMessage: 'Thời gian tồn tại tin phải là số'
      }
    }
  })
)
const vipPackagesMiddlewares = {
  createVipPackageValidator
}
export default vipPackagesMiddlewares
