import { Request, Response } from 'express'
import { REPORTS_INTERACTION_REQUEST_BODY } from '~/models/requests/reports_interaction.request'
import { ParamsDictionary } from 'express-serve-static-core'
import reportsInteractionService from '~/services/reports_interaction.service'
import { responseSuccess } from '~/utils/response'
import { REPORT_STATUS } from '~/enums/util.enum'
import { TokenPayload } from '~/type'
const creatReport = async (
  req: Request<ParamsDictionary, any, REPORTS_INTERACTION_REQUEST_BODY, any>,
  res: Response
) => {
  const payload = req.body
  const reporter_id = (req.decoded_access_token as TokenPayload).user_id
  console.log(payload)
  const result = await reportsInteractionService.createReport({
    ...payload,
    reporter_id: reporter_id
  })
  return responseSuccess(res, {
    message: 'Báo cáo thành công',
    data: result
  })
}
const updateReportStatus = async (
  req: Request<
    ParamsDictionary,
    any,
    {
      report_id: string
      status: REPORT_STATUS
    },
    any
  >,
  res: Response
) => {
  const { report_id, status } = req.body
  const result = await reportsInteractionService.updateReportStatus(report_id, status)
  return responseSuccess(res, {
    message: 'Xử lý báo cáo thành công',
    data: result
  })
}
const getReportById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { report_id } = req.params
  const result = await reportsInteractionService.getReportById(report_id)
  return responseSuccess(res, {
    message: 'Lấy thông tin báo cáo thành công',
    data: result
  })
}
const getReports = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await reportsInteractionService.getReports()
  return responseSuccess(res, {
    message: 'Lấy danh sách báo cáo thành công',
    data: result
  })
}
const deleteReport = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { report_id } = req.params
  const result = await reportsInteractionService.deleteReportById(report_id)
  return responseSuccess(res, {
    message: 'Xóa báo cáo thành công',
    data: result
  })
}
const getReportsByReporterId = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id: reporter_id } = req.decoded_access_token as TokenPayload
  const result = await reportsInteractionService.getReportsByReporterId(reporter_id)
  return responseSuccess(res, {
    message: 'Lấy danh sách báo cáo của người dùng thành công',
    data: result
  })
}
const getReportsByType = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { type } = req.query
  const result = await reportsInteractionService.getReportsByType(type)
  if (!result)
    return responseSuccess(res, {
      message: 'Không có báo cáo nào theo loại này',
      data: []
    })
  return responseSuccess(res, {
    message: 'Lấy danh sách báo cáo theo loại thành công',
    data: result
  })
}
const reportsInteractionControllers = {
  creatReport,
  updateReportStatus,
  getReportById,
  getReports,
  deleteReport,
  getReportsByReporterId,
  getReportsByType
}
export default reportsInteractionControllers
