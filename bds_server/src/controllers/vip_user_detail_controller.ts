import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import vipUserDetailsService from '~/services/vip_user_detail.service'
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
const vipUserDetailsControllers = {
  createDetail,
  getDetailsByUserId,
  getAllUserVipDetails
}
export default vipUserDetailsControllers
