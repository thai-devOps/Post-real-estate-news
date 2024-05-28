import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { omit } from 'lodash'
import { ObjectId } from 'mongodb'
import { POST_STATUS } from '~/enums/util.enum'
import { FURNITURE_DETAILS_REQUEST_BODY } from '~/models/requests/furniture_details.request'
import { REAL_ESTATE_NEW_QUERY, REAL_ESTATE_NEW_REQUEST_BODY } from '~/models/requests/real_estate_new.request'
import furnitureDetailsService from '~/services/furniture_details.service'
import realEstateNewsService from '~/services/real_estate_news.service'
import { TokenPayload } from '~/type'
import { responseSuccess } from '~/utils/response'
const createRealEstateNew = async (
  req: Request<ParamsDictionary, any, REAL_ESTATE_NEW_REQUEST_BODY, any>,
  res: Response
) => {
  const payload = req.body
  const { user_id } = req.decoded_access_token as TokenPayload
  const createNewResult = await realEstateNewsService.create(payload, user_id)
  return responseSuccess(res, {
    message: 'Tạo tin bất động sản thành công',
    data: createNewResult
  })
}
const getRealEstateNews = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { direction, price, province, district, ward, type, rating, property_type_id } = req.query as {
    direction: string
    price: string | number
    province: string
    district: string
    ward: string
    type: string
    rating: string | number
    property_type_id: string
  }
  let condition: any = {}
  if (direction && typeof direction === 'string') {
    condition = {
      ...condition,
      direction
    }
  }
  if (province && typeof province === 'string') {
    condition = {
      ...condition,
      'address.province': province
    }
  }
  if (district && typeof district === 'string') {
    condition = {
      ...condition,
      'address.district': district
    }
  }
  if (ward && typeof ward === 'string') {
    condition = {
      ...condition,
      'address.ward': ward
    }
  }
  if (type && typeof type === 'string') {
    condition = {
      ...condition,
      type
    }
  }
  if (property_type_id && typeof property_type_id === 'string') {
    condition = {
      ...condition,
      property_type_id: new ObjectId(property_type_id)
    }
  }
  if (price && typeof price === 'string') {
    const [minPrice, maxPrice] = price.split('-')
    condition = {
      ...condition,
      price: {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice)
      }
    }
  }
  if (rating && typeof rating === 'string') {
    condition = {
      ...condition,
      rating: parseInt(rating)
    }
  }
  const realEstateNews = await realEstateNewsService.getAll({
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 20,
    order_by: (req.query.order_by as string) || 'desc',
    sort_by: (req.query.sort_by as string) || 'view',
    condition
  })
  return responseSuccess(res, {
    message: 'Lấy danh sách tin bất động sản thành công',
    data: {
      items: realEstateNews.items,
      paginate: realEstateNews.paginate
    }
  })
}
const getRealEstateNewsById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const realEstateNew = await realEstateNewsService.getById(id)
  return responseSuccess(res, {
    message: 'Lấy tin bất động sản theo id thành công',
    data: realEstateNew
  })
}
const updateRealEstateNew = async (
  req: Request<ParamsDictionary, any, REAL_ESTATE_NEW_REQUEST_BODY, any>,
  res: Response
) => {
  const { id } = req.params
  const payload = req.body
  const result = await realEstateNewsService.update(id, payload)
  return responseSuccess(res, {
    message: 'Cập nhật tin bất động sản thành công',
    data: result
  })
}
const deleteRealEstateNew = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await realEstateNewsService.deleteOne(id)
  if (!result) {
    return responseSuccess(res, {
      message: 'Tin bất động sản không tồn tại',
      data: null
    })
  }
  return responseSuccess(res, {
    message: 'Xóa tin bất động sản thành công',
    data: result
  })
}
const deleteManyRealEstateNews = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { ids } = req.body
  const result = await realEstateNewsService.deleteMany(ids)
  return responseSuccess(res, {
    message: 'Xóa nhiều tin bất động sản thành công',
    data: result
  })
}
const getRealEstateNewsByUserId = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { user_id } = req.params
  const result = await realEstateNewsService.getRealEstateNewsByUserId(user_id)
  return responseSuccess(res, {
    message: 'Lấy danh sách tin bất động sản theo user_id thành công',
    data: result
  })
}
const updatePostStatus = async (req: Request<ParamsDictionary, any, { status: POST_STATUS }, any>, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const result = await realEstateNewsService.updateStatus(id, status)
  return responseSuccess(res, {
    message: 'Cập nhật trạng thái tin bất động sản thành công',
    data: result
  })
}
const deleteAllRealEstateNews = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await realEstateNewsService.deleteAll()
  return responseSuccess(res, {
    message: 'Xóa tất cả tin bất động sản thành công',
    data: result
  })
}
const realEstateNewsControllers = {
  createRealEstateNew,
  getRealEstateNews,
  getRealEstateNewsById,
  updateRealEstateNew,
  deleteRealEstateNew,
  deleteManyRealEstateNews,
  getRealEstateNewsByUserId,
  updatePostStatus,
  deleteAllRealEstateNews
}
export default realEstateNewsControllers
