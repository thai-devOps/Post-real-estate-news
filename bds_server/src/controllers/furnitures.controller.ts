import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { FURNITURE_REQUEST_BODY } from '~/models/requests/furnitures.request'
import furnituresService from '~/services/furnitures.service'
import { responseSuccess } from '~/utils/response'
const createFurniture = async (req: Request<ParamsDictionary, any, FURNITURE_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const result = await furnituresService.create(payload)
  return responseSuccess(res, {
    message: 'Tạo loại nội thất thành công',
    data: result
  })
}
const getFurnitures = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await furnituresService.getAll()
  return responseSuccess(res, {
    message: 'Lấy danh sách loại nội thất thành công',
    data: result
  })
}
const getFurnitureByPropertyID = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await furnituresService.getByPropertyId(id)
  return responseSuccess(res, {
    message: 'Lấy danh sách loại nội thất theo property_id thành công',
    data: result
  })
}
const getFurnitureByID = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await furnituresService.getById(id)
  return responseSuccess(res, {
    message: 'Lấy loại nội thất theo id thành công',
    data: result
  })
}
const updateFurniture = async (req: Request<ParamsDictionary, any, FURNITURE_REQUEST_BODY, any>, res: Response) => {
  const { id } = req.params
  const payload = req.body
  const result = await furnituresService.update(id, payload)
  return responseSuccess(res, {
    message: 'Cập nhật loại nội thất thành công',
    data: result
  })
}
const deleteFurniture = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await furnituresService.deleteOne(id)
  if (!result) {
    return responseSuccess(res, {
      message: 'Loại nội thất không tồn tại',
      data: null
    })
  }
  return responseSuccess(res, {
    message: 'Xóa loại nội thất thành công',
    data: result
  })
}
const deleteManyFurnitures = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { ids } = req.body
  const result = await furnituresService.deleteMany(ids)
  return responseSuccess(res, {
    message: 'Xóa nhiều loại nội thất thành công',
    data: result
  })
}
const deleteAllFurnitures = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await furnituresService.deleteAll()
  return responseSuccess(res, {
    message: 'Xóa tất cả loại nội thất thành công',
    data: result
  })
}
const furnituresControllers = {
  createFurniture,
  getFurnitures,
  getFurnitureByPropertyID,
  getFurnitureByID,
  updateFurniture,
  deleteFurniture,
  deleteManyFurnitures,
  deleteAllFurnitures
}
export default furnituresControllers
