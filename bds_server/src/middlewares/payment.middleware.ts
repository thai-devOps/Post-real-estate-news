import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'

const createPaymentValidator = validateSchema(
  checkSchema({
    package_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Package id không được để trống'
      },
      isString: {
        errorMessage: 'Package id phải là chuỗi'
      }
    },
    payment_method: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Phương thức thanh toán không được để trống'
      },
      isString: {
        errorMessage: 'Phương thức thanh toán phải là chuỗi'
      }
    },
    is_paid: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Trạng thái thanh toán không được để trống'
      },
      isBoolean: {
        errorMessage: 'Trạng thái thanh toán phải là boolean'
      }
    }
  })
)
const paymentsMiddlewares = {
  createPaymentValidator
}
export default paymentsMiddlewares