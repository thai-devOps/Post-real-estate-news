import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { UserProfile } from '~/models/requests/users.request'
import userService from '~/services/users.service'
import { TokenPayload } from '~/type'
import { responseSuccess } from '~/utils/response'
const getProfile = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const result = await userService.getUserById(user_id)
  return responseSuccess(res, {
    message: 'Lấy thông tin người dùng thành công',
    data: result
  })
}
const updateProfile = async (req: Request<ParamsDictionary, any, UserProfile, any>, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const result = await userService.updateProfile(user_id, req.body)
  return responseSuccess(res, {
    message: 'Cập nhật thông tin người dùng thành công',
    data: result
  })
}
const lockPost = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const { post_id } = req.body
  const result = await userService.blockPost(user_id, post_id)
  return responseSuccess(res, {
    message: 'Chặn tin đăng thành công',
    data: result
  })
}
const unlockPost = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const { post_id } = req.params
  const result = await userService.unblockPost(user_id, post_id)
  return responseSuccess(res, {
    message: 'Bỏ chặn tin đăng thành công',
    data: result
  })
}
const getLockPosts = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const result = await userService.getLockPosts(user_id)
  return responseSuccess(res, {
    message: 'Lấy danh sách tin đăng bị chặn thành công',
    data: result
  })
}
const usersControllers = {
  getProfile,
  updateProfile,
  lockPost,
  unlockPost,
  getLockPosts
}
export default usersControllers
