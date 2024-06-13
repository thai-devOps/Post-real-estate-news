import { Router } from 'express'
import vipUserDetailsControllers from '~/controllers/vip_user_detail_controller'
import commonMiddlewares from '~/middlewares/common.middleware'
import { wrapRequestHandler } from '~/utils/requestHandler'

const vipUserDetailsRoutes = Router()

/**
 * description: Get vip user details by user id
 *
 */
vipUserDetailsRoutes.get(
  '/',
  commonMiddlewares.accessTokenValidator,
  commonMiddlewares.isAdmin,
  wrapRequestHandler(vipUserDetailsControllers.getAllUserVipDetails)
)
/**
 * description: Get vip user history by user id
 * path: /vip-user-details/:id
 */
vipUserDetailsRoutes.get(
  '/:id',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(vipUserDetailsControllers.getVipUserHistoryByUserId)
)
/**
 * description: Get current vip user by user id
 * path: /vip-user-details/current
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * }
 */
vipUserDetailsRoutes.get(
  '/current',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(vipUserDetailsControllers.getCurrentVip)
)

export default vipUserDetailsRoutes
