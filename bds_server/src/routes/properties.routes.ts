import { Router } from 'express'
import propertiesControllers from '~/controllers/properties.controller'
import commonMiddlewares from '~/middlewares/common.middleware'
import propertiesMiddlewares from '~/middlewares/properties.middleware'
import { wrapRequestHandler } from '~/utils/requestHandler'
const propertiesRoutes = Router()

/**
 * description: Create a new property
 * method: POST
 * path: /properties/create
 * body: PROPERTY_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 */
propertiesRoutes.post(
  '/create',
  commonMiddlewares.accessTokenValidator,
  propertiesMiddlewares.createPropertyValidator,
  wrapRequestHandler(propertiesControllers.createProperty)
)
/**
 * description: Get all properties
 * method: GET
 * path: /properties
 * query: PROPERTY_REQUEST_QUERY
 */
propertiesRoutes.get('/', wrapRequestHandler(propertiesControllers.getProperties))
/**
 * description: Edit a property
 * method: PUT
 * path: /properties/:id
 * body: PROPERTY_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
propertiesRoutes.put(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  propertiesMiddlewares.createPropertyValidator,
  wrapRequestHandler(propertiesControllers.editProperty)
)
/**
 * description: Delete all properties
 * method: DELETE
 * path: /properties/delete
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
propertiesRoutes.delete('/delete-all', wrapRequestHandler(propertiesControllers.deleteAll))
/**
 * description: Delete many properties
 * method: DELETE
 * path: /properties/delete-properties
 * body: {
 * ids: [string]
 * }
 */
propertiesRoutes.delete(
  '/delete-many',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(propertiesControllers.deleteMany)
)
/**
 * description: Delete a property
 * method: DELETE
 * path: /properties/:id
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
propertiesRoutes.delete(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(propertiesControllers.deleteOne)
)
export default propertiesRoutes
