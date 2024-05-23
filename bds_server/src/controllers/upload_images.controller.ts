import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { v2 as cloudinary } from 'cloudinary'
import httpStatusCode from '~/constants/httpStatusCode'
import imagesService from '~/services/images.service'
import { ErrorWithMessage } from '~/utils/error'
import { responseSuccess } from '~/utils/response'
import env_config from '~/configs/env.config'

cloudinary.config({
  cloud_name: env_config.CLOUDINARY.CLOUD_NAME,
  api_key: env_config.CLOUDINARY.API_KEY,
  api_secret: env_config.CLOUDINARY.API_SECRET
})

// const uploadSingleImage = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
//   const img = fs.readFileSync(req.file?.path as string)
//   if (!img) {
//     throw new ErrorWithMessage({
//       message: 'No image provided',
//       status: httpStatusCode.BAD_REQUEST
//     })
//   }
//   const encodedImage = img.toString('base64')
//   const finalImage = {
//     contentType: req.file?.mimetype as string,
//     image: Buffer.from(encodedImage, 'base64')
//   }
//   const result = await imagesService.createImage(finalImage)
//   return responseSuccess(res, {
//     message: 'Image uploaded successfully',
//     data: result
//   })
// }
const uploadCloudinarySingleImage = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const sign_image = await cloudinary.uploader.upload(req.file?.path as string, {
    folder: 'dxmt-images'
  })
  const result = await imagesService.createImage({ public_id: sign_image.public_id, url: sign_image.secure_url })
  const img = await imagesService.getImageById(result.insertedId.toString())
  return responseSuccess(res, {
    message: 'Image uploaded successfully',
    data: img
  })
}
const uploadCloudinaryMultipleImages = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const files = req.files as Express.Multer.File[]
  if (!files || files.length === 0) {
    throw new ErrorWithMessage({
      message: 'No images provided',
      status: httpStatusCode.BAD_REQUEST
    })
  }
  const uploadPromises = files.map(async (file) => {
    const sign_image = await cloudinary.uploader.upload(file.path, {
      folder: 'dxmt-images'
    })
    return imagesService.createImage({ public_id: sign_image.public_id, url: sign_image.secure_url })
  })
  const results = await Promise.all(uploadPromises)
  const images = results.map(async (result) => {
    return await imagesService.getImageById(result.insertedId.toString())
  })
  return responseSuccess(res, {
    message: 'Images uploaded successfully',
    data: await Promise.all(images)
  })
}
// const getImageById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
//   const { id } = req.params
//   const image = await imagesService.getImageById(id)
//   if (!image) {
//     throw new ErrorWithMessage({
//       message: 'Image not found',
//       status: httpStatusCode.NOT_FOUND
//     })
//   }
//   res.setHeader('Content-Type', image.contentType)
//   res.send(image.image.buffer)
// }
// const uploadMultipleImages = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
//   const files = req.files as Express.Multer.File[]
//   if (!files || files.length === 0) {
//     throw new ErrorWithMessage({
//       message: 'No images provided',
//       status: httpStatusCode.BAD_REQUEST
//     })
//   }
//   const uploadPromises = files.map(async (file) => {
//     const img = fs.readFileSync(file.path)
//     const encodedImage = img.toString('base64')
//     const finalImage = {
//       contentType: file.mimetype,
//       image: Buffer.from(encodedImage, 'base64')
//     }
//     return imagesService.createImage(finalImage)
//   })
//   const results = await Promise.all(uploadPromises)
//   return responseSuccess(res, {
//     message: 'Images uploaded successfully',
//     data: results
//   })
// }
const getCloudinaryImageById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const image = await imagesService.getImageById(id)
  if (!image) {
    throw new ErrorWithMessage({
      message: 'Image not found',
      status: httpStatusCode.NOT_FOUND
    })
  }
  return responseSuccess(res, {
    message: 'Image found',
    data: image
  })
}
const uploadImageControllers = {
  getCloudinaryImageById,
  uploadCloudinarySingleImage,
  uploadCloudinaryMultipleImages
}
export default uploadImageControllers
