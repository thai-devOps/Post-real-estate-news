import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import vipUserDetailsService from '~/services/vip_user_detail.service'

const createDetail = async (req: Request, res: Response) => {}
const getDetailsByUserId = async (req: Request<ParamsDictionary>, res: Response) => {
  const id = req.params.id
  const result = await vipUserDetailsService.getById(id)
}
const vipUserDetailsControllers = {}
export default vipUserDetailsControllers
