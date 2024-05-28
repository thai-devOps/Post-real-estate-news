import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PROJECT_REQUEST_BODY } from '~/models/requests/projects.request'
import projectsService from '~/services/projects.service'
import { responseSuccess } from '~/utils/response'
const createProject = async (req: Request<ParamsDictionary, any, PROJECT_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const result = await projectsService.createOne(payload)
  return responseSuccess(res, {
    message: 'Tạo dự án thành công',
    data: result
  })
}
const updateProject = async (req: Request<ParamsDictionary, any, PROJECT_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const id = req.params.id
  const result = await projectsService.updateById(id, payload)
  return responseSuccess(res, {
    message: 'Cập nhật dự án thành công',
    data: result
  })
}
const getProjects = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await projectsService.getAll()
  return responseSuccess(res, {
    message: 'Lấy danh sách dự án thành công',
    data: result
  })
}
const getProjectById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const id = req.params.id
  const result = await projectsService.getById(id)
  return responseSuccess(res, {
    message: 'Lấy dự án thành công',
    data: result
  })
}
const deleteProjectById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const id = req.params.id
  const result = await projectsService.deleteById(id)
  return responseSuccess(res, {
    message: 'Xóa dự án thành công',
    data: result
  })
}
const deleteManyProjects = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const ids = req.body.ids
  const result = await projectsService.deletManyIds(ids)
  return responseSuccess(res, {
    message: 'Xóa nhiều dự án thành công',
    data: result
  })
}
const deleteAllProjects = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await projectsService.deleteAll()
  return responseSuccess(res, {
    message: 'Xóa tất cả dự án thành công',
    data: result
  })
}
const projectsControllers = {
  createProject,
  updateProject,
  getProjects,
  getProjectById,
  deleteProjectById,
  deleteManyProjects,
  deleteAllProjects
}
export default projectsControllers
