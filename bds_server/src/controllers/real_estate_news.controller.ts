import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { InsertOneResult, ObjectId } from 'mongodb'
import { POST_STATUS } from '~/enums/util.enum'
import { REAL_ESTATE_NEW_REQUEST_BODY } from '~/models/requests/real_estate_new.request'
import { REAL_ESTATE_NEW_SCHEMA } from '~/models/schemas/RealEstateNew.schema'
import realEstateNewsService from '~/services/real_estate_news.service'
import userService from '~/services/users.service'
import vipPackagesService from '~/services/vip_packages.service'
import vipUserDetailsService from '~/services/vip_user_detail.service'
import { TokenPayload } from '~/type'
import { responseSuccess } from '~/utils/response'
const createRealEstateNew = async (
  req: Request<ParamsDictionary, any, REAL_ESTATE_NEW_REQUEST_BODY, any>,
  res: Response
) => {
  const { user_id } = req.decoded_access_token as TokenPayload
  const user = await userService.findUserById(user_id)

  if (!user) {
    return responseSuccess(res, {
      message: 'Người dùng không tồn tại',
      data: null
    })
  }

  // admin có thể tạo tin
  if (user.role === 'admin') {
    const payload: REAL_ESTATE_NEW_REQUEST_BODY = {
      ...req.body,
      vip: {
        is_vip: false,
        vip_name: 'Tin thường',
        is_top: false,
        vip_score: 0,
        is_featured: false,
        trendPosition: 0
      },
      is_priority: false,
      time_existed: 1
    }
    const createNewResult = await realEstateNewsService.create(payload, user_id)
    return responseSuccess(res, {
      message: 'ADMIN tạo tin bất động sản thành công',
      data: createNewResult
    })
  } else {
    const vip_package_detail = await vipUserDetailsService.getVipUserByUserId(user_id)
    if (!vip_package_detail) {
      return responseSuccess(res, {
        message: 'Bạn cần mua gói vip để tạo tin bất động sản',
        data: null
      })
    }

    const package_vip = await vipPackagesService.getById(vip_package_detail.package_id.toString())
    if (!package_vip) {
      return responseSuccess(res, {
        message: 'Gói vip không tồn tại',
        data: null
      })
    }
    // Lấy số lượng tin VIP hiện tại
    const vipCount = await realEstateNewsService.countVipPosts()
    let posts_used = vip_package_detail.posting_used
    let trending_used = vip_package_detail.featured_posts_used
    if (package_vip.priviLeges.postingLimit.totalPost === 'unlimited') {
      posts_used = posts_used + 1
    } else {
      if (posts_used >= Number(package_vip.priviLeges.postingLimit.totalPost)) {
        return responseSuccess(res, {
          message: 'Bạn đã sử dụng hết số lần đăng tin',
          data: null
        })
      } else {
        posts_used = posts_used + 1
      }
    }
    if (package_vip.priviLeges.trendingPrivileges.canTrend) {
      if (package_vip.priviLeges.trendingPrivileges.trendingLimit === 'unlimited') {
        if (req.body.is_trend) {
          trending_used = trending_used + 1
        } else trending_used = trending_used + 0
      } else {
        if (trending_used >= Number(package_vip.priviLeges.trendingPrivileges.trendingLimit)) {
          if (req.body.is_trend)
            return responseSuccess(res, {
              message: 'Bạn đã sử dụng hết số lần đăng tin xu hướng',
              data: null
            })
          else trending_used = trending_used + 0
        } else {
          if (req.body.is_trend) trending_used = trending_used + 1
          else trending_used = trending_used + 0
        }
      }
    }
    let result: InsertOneResult<REAL_ESTATE_NEW_SCHEMA> = {
      insertedId: new ObjectId(),
      acknowledged: false
    }
    if (package_vip.priviLeges.trendingPrivileges.canTrend) {
      // Cập nhật lại tin xu hướng cũ có isPriority = true & trendPosition = 0
      const { is_trend } = req.body
      if (is_trend) {
        // const oldTrendPost = await realEstateNewsService.getTopNews({})
        // if (oldTrendPost) {
        //   await realEstateNewsService.updateUntrendOldTrendPost(oldTrendPost)
        // }
        const payload: Omit<REAL_ESTATE_NEW_REQUEST_BODY, 'is_trend'> = {
          ...req.body,
          vip: {
            is_vip: package_vip ? true : false,
            vip_name: package_vip ? package_vip.packageName : 'Tin thường',
            is_top: true,
            is_featured: package_vip.features.includes('Đánh dấu nổi bật') ? true : false,
            trendPosition: 0,
            vip_score: package_vip ? package_vip.vip_score : 0
          },
          time_existed: package_vip.priviLeges.postingLimit.durationPerPost,
          score: package_vip.vip_score,
          is_priority: false
        }
        result = await realEstateNewsService.create(payload, user_id)
      } else {
        const payload: Omit<REAL_ESTATE_NEW_REQUEST_BODY, 'is_trend'> = {
          ...req.body,
          vip: {
            is_vip: package_vip ? true : false,
            vip_name: package_vip ? package_vip.packageName : 'Tin thường',
            is_top: false,
            is_featured:
              package_vip.packageName === 'Gói Vip Năm' || package_vip.packageName === 'Gói Vip Tháng' ? true : false,
            trendPosition: vipCount,
            vip_score: package_vip ? package_vip.vip_score : 0
          },
          time_existed: package_vip.priviLeges.postingLimit.durationPerPost,
          score: package_vip.vip_score,
          is_priority: false
        }
        result = await realEstateNewsService.create(payload, user_id)
      }
    } else {
      const payload: REAL_ESTATE_NEW_REQUEST_BODY = {
        ...req.body,
        vip: {
          is_vip: package_vip ? true : false,
          vip_name: package_vip ? package_vip.packageName : 'Tin thường',
          is_top: false,
          is_featured:
            package_vip.packageName === 'Gói Vip Năm' || package_vip.packageName === 'Gói Vip Tháng' ? true : false,
          trendPosition: vipCount,
          vip_score: package_vip ? package_vip.vip_score : 0
        },
        time_existed: package_vip.priviLeges.postingLimit.durationPerPost,
        score: package_vip.vip_score,
        is_priority: false
      }
      result = await realEstateNewsService.create(payload, user_id)
    }
    await vipUserDetailsService.updateVipUserDetail(vip_package_detail._id.toString(), {
      user_id,
      package_id: vip_package_detail.package_id.toString(),
      start_date: vip_package_detail.start_date,
      end_date: vip_package_detail.end_date,
      posting_used: posts_used,
      featured_posts_used: trending_used
    })
    return responseSuccess(res, {
      message: 'Tạo tin bất động sản thành công',
      data: result
    })
  }
}

const getRealEstateNews = async (req: Request, res: Response) => {
  const {
    direction,
    price,
    province,
    district,
    ward,
    type,
    rating,
    property_type_id,
    featured,
    page = '1',
    limit = '20',
    order_by = 'desc',
    sort_by = 'view'
  } = req.query as Record<any, string>

  const queryParams = { direction, price, featured, province, district, ward, type, rating, property_type_id }

  let condition: any = {}

  // eslint-disable-next-line prefer-const
  for (const [key, value] of Object.entries(queryParams)) {
    if (value) {
      if (key === 'price') {
        const [minPrice, maxPrice] = value.split('-')
        condition = {
          ...condition,
          'price.value': {
            $gte: parseInt(minPrice),
            $lte: parseInt(maxPrice)
          }
        }
      } else if (key === 'featured') {
        condition = {
          ...condition,
          'vip.is_featured': value === 'true'
        }
      } else if (key === 'rating') {
        condition = {
          ...condition,
          rating: parseInt(value)
        }
      } else if (key === 'property_type_id') {
        condition.property_type_id = new ObjectId(value)
      } else if (key === 'province') {
        condition = {
          ...condition,
          'address.province': value
        }
      } else if (key === 'district') {
        condition = {
          ...condition,
          'address.district': value
        }
      } else if (key === 'ward') {
        condition = {
          ...condition,
          'address.ward': value
        }
      } else {
        condition[key] = value
      }
    }
  }
  console.log('Condition: ', condition)
  const [topTrending, vipNews, vipNewsUntrending] = await Promise.all([
    realEstateNewsService.getTopNews(condition),
    realEstateNewsService.getAll({
      page: 1,
      limit: 100,
      order_by: 'asc',
      sort_by: 'vip.trendPosition',
      condition: {
        ...condition,
        'vip.is_top': true,
        status: POST_STATUS.CONFIRMED,
        is_priority: false
      }
    }),
    realEstateNewsService.getAll({
      page: 1,
      limit: 100,
      order_by: 'asc',
      sort_by: 'vip.trendPosition',
      condition: {
        ...condition,
        'vip.is_vip': true,
        'vip.is_top': false,
        status: POST_STATUS.CONFIRMED,
        is_priority: false
      }
    })
  ])

  const nonVipNewsLimit = parseInt(limit) - (vipNews.items.length + 1)
  const nonVipNews = await realEstateNewsService.getAll({
    page: parseInt(page),
    limit: nonVipNewsLimit,
    order_by,
    sort_by,
    condition: {
      ...condition,
      'vip.is_vip': false,
      status: POST_STATUS.CONFIRMED
    }
  })

  const combinedNews = [
    ...(topTrending ? [topTrending] : []),
    ...vipNews.items,
    ...vipNewsUntrending.items,
    ...nonVipNews.items
  ]

  return res.json({
    message: 'Lấy danh sách tin bất động sản thành công',
    data: {
      items: combinedNews
    }
  })
}
const getRealEstateNewsById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const realEstateNew = await realEstateNewsService.getById(id)
  if (!realEstateNew) {
    return responseSuccess(res, {
      message: 'Tin bất động sản không tồn tại',
      data: null
    })
  }
  await realEstateNewsService.updateScore(id, realEstateNew.score + 0.5)
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
const getAllPosts = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const {
    direction,
    price,
    province,
    district,
    ward,
    type,
    rating,
    property_type_id,
    featured,
    page = '1',
    limit = '20',
    order_by = 'desc',
    sort_by = 'view'
  } = req.query as Record<any, string>

  const queryParams = { direction, price, featured, province, district, ward, type, rating, property_type_id }

  let condition: any = {}

  // eslint-disable-next-line prefer-const
  for (const [key, value] of Object.entries(queryParams)) {
    if (value) {
      if (key === 'price') {
        const [minPrice, maxPrice] = value.split('-')
        condition = {
          ...condition,
          'price.value': {
            $gte: parseInt(minPrice),
            $lte: parseInt(maxPrice)
          }
        }
      } else if (key === 'featured') {
        condition = {
          ...condition,
          'vip.is_featured': value === 'true'
        }
      } else if (key === 'rating') {
        condition = {
          ...condition,
          rating: parseInt(value)
        }
      } else if (key === 'property_type_id') {
        condition.property_type_id = new ObjectId(value)
      } else if (key === 'province') {
        condition = {
          ...condition,
          'address.province': value
        }
      } else if (key === 'district') {
        condition = {
          ...condition,
          'address.district': value
        }
      } else if (key === 'ward') {
        condition = {
          ...condition,
          'address.ward': value
        }
      } else {
        condition[key] = value
      }
    }
  }
  const result = await realEstateNewsService.getAll({
    page: parseInt(page),
    limit: parseInt(limit),
    order_by,
    sort_by,
    condition
  })
  return responseSuccess(res, {
    message: 'Lấy danh sách tin bất động sản thành công',
    data: result
  })
}
const getRealEstateNewsByStatus = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { status } = req.params
  const result = await realEstateNewsService.getRealEstateNewsByStatus(status as POST_STATUS)
  return responseSuccess(res, {
    message: 'Lấy danh sách tin bất động sản theo trạng thái thành công',
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
  deleteAllRealEstateNews,
  getRealEstateNewsByStatus,
  getAllPosts
}
export default realEstateNewsControllers
