import fetch from 'node-fetch'
import { Request, Response } from 'express'
import { responseSuccess } from '~/utils/response'

const getProvinces = async (req: Request, res: Response) => {
  const provinces = await fetch('https://vapi.vnappmob.com/api/province')
  const provincesJson = await provinces.json()
  return responseSuccess(res, {
    message: 'Get provinces successfully',
    data: provincesJson.results
  })
}
const getDistricts = async (req: Request, res: Response) => {
  const { province_id } = req.params
  const districts = await fetch(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
  const districtsJson = await districts.json()
  return responseSuccess(res, {
    message: 'Get districts successfully',
    data: districtsJson.results
  })
}
const getWards = async (req: Request, res: Response) => {
  const { district_id } = req.params
  const wards = await fetch(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)
  const wardsJson = await wards.json()
  return responseSuccess(res, {
    message: 'Get wards successfully',
    data: wardsJson.results
  })
}
const provinceControllers = {
  getProvinces,
  getDistricts,
  getWards
}
export default provinceControllers
