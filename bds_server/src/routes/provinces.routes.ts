import { Router } from 'express'
import provinceControllers from '~/controllers/provinces.controller'
import { wrapRequestHandler } from '~/utils/requestHandler'

const provincesRoutes = Router()

/**
 * description: Get all provinces
 * path: /api/province
 */
provincesRoutes.get('/', wrapRequestHandler(provinceControllers.getProvinces))
/**
 * description: Get all districts by province id
 * path: /api/province/district/:province_id
 */
provincesRoutes.get('/district/:province_id', wrapRequestHandler(provinceControllers.getDistricts))
/**
 * description: Get all wards by district id
 * path: /api/province/ward/:district_id
 */
provincesRoutes.get('/ward/:district_id', wrapRequestHandler(provinceControllers.getWards))
export default provincesRoutes
