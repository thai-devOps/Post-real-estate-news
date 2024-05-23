import { checkSchema } from 'express-validator'
import validateSchema from '~/utils/validation'

const reportsValidator = validateSchema(
  checkSchema({
    reporter_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Người báo cáo không được để trống'
      }
    },
    reported_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Người bị báo cáo không được để trống'
      }
    },
    report_items_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'ID báo cáo không được để trống'
      }
    },
    report_type: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Loại báo cáo không được để trống'
      }
    },
    content: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Nội dung báo cáo không được để trống'
      }
    }
  })
)
const reportsInteractionMiddlewares = {
  reportsValidator
}
export default reportsInteractionMiddlewares
