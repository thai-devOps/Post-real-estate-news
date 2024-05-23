import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { FAVORITE_REQUEST_BODY } from '~/models/requests/favorites.schema'
import favoritesService from '~/services/favorites.service'
import { responseSuccess } from '~/utils/response'
const createFavorite = async (req: Request<ParamsDictionary, any, FAVORITE_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const result = await favoritesService.createFavorite(payload)
  return responseSuccess(res, {
    message: 'Favorite created successfully',
    data: result
  })
}
const unFavorite = async (req: Request<ParamsDictionary, any, FAVORITE_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const result = await favoritesService.deleteFavoriteByPostIdAndUserId(payload)
  if (!result) {
    return responseSuccess(res, {
      message: 'Favorite not found',
      data: result
    })
  }
  return responseSuccess(res, {
    message: 'Favorite deleted successfully',
    data: result
  })
}

const getFavoritesByUserIdAndPostId = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id, post_id } = req.query
  if (!user_id || !post_id) {
    return responseSuccess(res, {
      message: 'Required fields are missing',
      data: []
    })
  }
  const result = await favoritesService.getFavoritesByUserIdAndPostId(user_id as string, post_id as string)
  return responseSuccess(res, {
    message: 'Favorites retrieved successfully',
    data: result
  })
}
const favoritesControllers = {
  createFavorite,
  unFavorite,
  getFavoritesByUserIdAndPostId
}
export default favoritesControllers
