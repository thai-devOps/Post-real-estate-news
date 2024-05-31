import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { ParamsDictionary } from 'express-serve-static-core'
import env_config from '~/configs/env.config'
import videosService from '~/services/videos.service'
import { responseSuccess } from '~/utils/response'
import { ErrorWithMessage } from '~/utils/error'
import httpStatusCode from '~/constants/httpStatusCode'

cloudinary.config({
  cloud_name: env_config.CLOUDINARY.CLOUD_NAME,
  api_key: env_config.CLOUDINARY.API_KEY,
  api_secret: env_config.CLOUDINARY.API_SECRET
})
const createVideo = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const sign_video = await cloudinary.uploader.upload(req.file?.path as string, {
    resource_type: 'video',
    folder: 'dxmt-videos',
    format: 'mp4',
    transformation: [{ width: 1280, height: 720, crop: 'limit' }],
    // dung luong toi da cho phep la 100MB
    max_file_size: 100000000
  })
  const video = await videosService.create({ public_id: sign_video.public_id, video_url: sign_video.secure_url })
  return responseSuccess(res, {
    message: 'Video uploaded successfully',
    data: video
  })
}
const uploadMutipleVideos = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const files = req.files as Express.Multer.File[]
  if (!files || files.length === 0) {
    throw new ErrorWithMessage({
      message: 'No videos provided',
      status: httpStatusCode.BAD_REQUEST
    })
  }
  const uploadPromises = files.map(async (file) => {
    const sign_video = await cloudinary.uploader.upload(file.path, {
      folder: 'dxmt-images',
      resource_type: 'video',
      format: 'mp4',
      transformation: [{ width: 1280, height: 720, crop: 'limit' }],
      max_file_size: 100000000
    })
    return videosService.create({ public_id: sign_video.public_id, video_url: sign_video.secure_url })
  })
  const results = await Promise.all(uploadPromises)
  const videos = results.map(async (result) => {
    return await videosService.getByID(result.insertedId.toString())
  })
  return responseSuccess(res, {
    message: 'Videos uploaded successfully',
    data: await Promise.all(videos)
  })
}
const videosControllers = {
  createVideo,
  uploadMutipleVideos
}
export default videosControllers
