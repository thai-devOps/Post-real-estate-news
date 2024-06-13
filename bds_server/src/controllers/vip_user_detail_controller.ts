import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import vipUserDetailsService from '~/services/vip_user_detail.service'
import { TokenPayload } from '~/type'
import { responseSuccess } from '~/utils/response'

const createDetail = async (req: Request, res: Response) => {}
const getDetailsByUserId = async (req: Request<ParamsDictionary>, res: Response) => {
  const id = req.params.id
  const result = await vipUserDetailsService.getById(id)
}
const getAllUserVipDetails = async (req: Request, res: Response) => {
  const result = await vipUserDetailsService.getUserVip()
  return responseSuccess(res, {
    message: 'Get all user vip details successfully',
    data: result
  })
}
const getVipUserHistoryByUserId = async (req: Request<ParamsDictionary>, res: Response) => {
  const id = req.params.id
  const result = await vipUserDetailsService.getVipUserHistoryByUserId(id)
  return responseSuccess(res, {
    message: 'Get vip user history successfully',
    data: result
  })
}
const getCurrentVip = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const result = await vipUserDetailsService.getCurrentVip(user_id)
  return responseSuccess(res, {
    message: 'Get current vip user successfully',
    data: result
  })
}
const vipUserDetailsControllers = {
  createDetail,
  getDetailsByUserId,
  getAllUserVipDetails,
  getVipUserHistoryByUserId,
  getCurrentVip
}
export default vipUserDetailsControllers
