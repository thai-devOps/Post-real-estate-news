import { Router } from 'express'
import furnituresControllers from '~/controllers/furnitures.controller'
import commonMiddlewares from '~/middlewares/common.middleware'
import furnituresMiddlewares from '~/middlewares/furnitures.middleware'
import { wrapRequestHandler } from '~/utils/requestHandler'
const furnituresRoutes = Router()

/**
 * description: Create a new furniture
 * method: POST
 * path: /furnitures/create
 * body: PROPERTY_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 */
furnituresRoutes.post(
  '/create',
  commonMiddlewares.accessTokenValidator,
  furnituresMiddlewares.createFurnitureValidator,
  wrapRequestHandler(furnituresControllers.createFurniture)
)
/**
 * description: Get all furnitures
 * method: GET
 * path: /furnitures
 * query: FURNITURE_REQUEST_BODY
 */
furnituresRoutes.get('/', wrapRequestHandler(furnituresControllers.getFurnitures))

/**
 * description: Get furniture by property id
 * method: GET
 * path: /furnitures/:id
 *
 */
furnituresRoutes.get('/:id', wrapRequestHandler(furnituresControllers.getFurnitureByPropertyID))
/**
 * description: Edit a furniture
 * method: PUT
 * path: /furnitures/:id
 * body: FURNITURE_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
furnituresRoutes.put(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  furnituresMiddlewares.createFurnitureValidator,
  wrapRequestHandler(furnituresControllers.updateFurniture)
)
/**
 * description: Delete all funitures
 * method: DELETE
 * path: /furnitures/delete-all
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
furnituresRoutes.delete(
  '/delete-all',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(furnituresControllers.deleteAllFurnitures)
)
/**
 * description: Delete many furnitures
 * method: DELETE
 * path: /furnitures/delete-many
 * body: {
 * ids: [string]
 * }
 */
furnituresRoutes.delete(
  '/delete-many',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(furnituresControllers.deleteManyFurnitures)
)
/**
 * description: Delete a furniture by ID
 * method: DELETE
 * path: /furnitures/:id
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
furnituresRoutes.delete(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(furnituresControllers.deleteFurniture)
)
export default furnituresRoutes
