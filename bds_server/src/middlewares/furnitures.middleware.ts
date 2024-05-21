import { checkSchema } from 'express-validator'
import messages from '~/constants/message'
import validateSchema from '~/utils/validation'

const createFurnitureValidator = validateSchema(
  checkSchema({
    name: {
      in: ['body'],
      isString: true,
      notEmpty: {
        errorMessage: messages.errors.furniture.name
      }
    },
    description: {
      in: ['body'],
      isString: true,
      notEmpty: {
        errorMessage: messages.errors.furniture.description
      }
    },
    property_id: {
      in: ['body'],
      isString: true,
      notEmpty: {
        errorMessage: messages.errors.furniture.property_id
      }
    }
  })
)
const furnituresMiddlewares = {
  createFurnitureValidator
}
export default furnituresMiddlewares
