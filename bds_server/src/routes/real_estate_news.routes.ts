import { Router } from 'express'
import realEstateNewsControllers from '~/controllers/real_estate_news.controller'
import commonMiddlewares from '~/middlewares/common.middleware'
import realEstateNewsMiddlewares from '~/middlewares/real_estate_news.middleware'
import { wrapRequestHandler } from '~/utils/requestHandler'

const realEstateNewsRoutes = Router()

/**
 * description: Create a new real estate news
 * method: POST
 * path: /real-estate-news/create
 * body: REAL_ESTATE_NEW_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
realEstateNewsRoutes.post(
  '/create',
  commonMiddlewares.accessTokenValidator,
  realEstateNewsMiddlewares.createValidator,
  wrapRequestHandler(realEstateNewsControllers.createRealEstateNew)
)
/**
 * description: Get all real estate news
 * method: GET
 * path: /real-estate-news
 * query: REAL_ESTATE_NEW_QUERY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
realEstateNewsRoutes.get('/', wrapRequestHandler(realEstateNewsControllers.getRealEstateNews))
/**
 * description: Get all real estate news by status
 * method: GET
 * path: /real-estate-news/status/:status
 */
realEstateNewsRoutes.get(
  '/status/:status',
  commonMiddlewares.accessTokenValidator,
  commonMiddlewares.isAdmin,
  wrapRequestHandler(realEstateNewsControllers.getRealEstateNewsByStatus)
)
/**
 * description: Get all post for admin
 * method: GET
 * path: /real-estate-news/admin/all
 */
realEstateNewsRoutes.get(
  '/admin/all',
  commonMiddlewares.accessTokenValidator,
  commonMiddlewares.isAdmin,
  wrapRequestHandler(realEstateNewsControllers.getAllPosts)
)

/**
 * description: Get real estate news by id
 * method: GET
 * path: /real-estate-news/:id
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
realEstateNewsRoutes.get('/:id', wrapRequestHandler(realEstateNewsControllers.getRealEstateNewsById))
/**
 * description: Get all post by user id
 * method: GET
 * path: /real-estate-news/user/:user_id
 * headers: {
 * Authorization: {
 *  description: Bearer access_token
 * }
 *  }
 */
realEstateNewsRoutes.get(
  '/user/:user_id',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(realEstateNewsControllers.getRealEstateNewsByUserId)
)
/**
 * description: Update a real estate news
 * method: PUT
 * path: /real-estate-news/:id
 * body: REAL_ESTATE_NEW_REQUEST_BODY
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
/**
 * description: Approve a real estate news by id
 * method: PUT
 * path: /real-estate-news/update-status/:id
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 * body: {
 * status: string}
 */
realEstateNewsRoutes.put(
  '/update-status/:id',
  commonMiddlewares.accessTokenValidator,
  commonMiddlewares.isAdmin,
  wrapRequestHandler(realEstateNewsControllers.updatePostStatus)
)
realEstateNewsRoutes.put(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  realEstateNewsMiddlewares.createValidator,
  wrapRequestHandler(realEstateNewsControllers.updateRealEstateNew)
)

/**
 * description: Delete all real estate news
 * method: DELETE
 * path: /real-estate-news/delete-all
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
realEstateNewsRoutes.delete(
  '/delete-all',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(realEstateNewsControllers.deleteAllRealEstateNews)
)
/**
 * description: Delete many real estate news
 * method: DELETE
 * path: /real-estate-news/delete-many
 * body: {
 * ids: [string]
 * }
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 * }
 */
realEstateNewsRoutes.delete(
  '/delete-many',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(realEstateNewsControllers.deleteManyRealEstateNews)
)
/**
 * description: Delete a real estate news
 * method: DELETE
 * path: /real-estate-news/:id
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 */
realEstateNewsRoutes.delete(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(realEstateNewsControllers.deleteRealEstateNew)
)
export default realEstateNewsRoutes
