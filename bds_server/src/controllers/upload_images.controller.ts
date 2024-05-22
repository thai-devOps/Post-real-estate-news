import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import fs from 'fs'
import httpStatusCode from '~/constants/httpStatusCode'
import imagesService from '~/services/images.service'
import { ErrorWithMessage } from '~/utils/error'
import { responseSuccess } from '~/utils/response'
const uploadSingleImage = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const img = fs.readFileSync(req.file?.path as string)
  if (!img) {
    throw new ErrorWithMessage({
      message: 'No image provided',
      status: httpStatusCode.BAD_REQUEST
    })
  }
  const encodedImage = img.toString('base64')
  const finalImage = {
    contentType: req.file?.mimetype as string,
    image: Buffer.from(encodedImage, 'base64')
  }
  const result = await imagesService.createImage(finalImage)
  return responseSuccess(res, {
    message: 'Image uploaded successfully',
    data: result
  })
}
const getImageById = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const image = await imagesService.getImageById(id)
  if (!image) {
    throw new ErrorWithMessage({
      message: 'Image not found',
      status: httpStatusCode.NOT_FOUND
    })
  }
  res.setHeader('Content-Type', image.contentType)
  res.send(image.image.buffer)
}
const uploadMultipleImages = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const files = req.files as Express.Multer.File[]
  if (!files || files.length === 0) {
    throw new ErrorWithMessage({
      message: 'No images provided',
      status: httpStatusCode.BAD_REQUEST
    })
  }
  const uploadPromises = files.map(async (file) => {
    const img = fs.readFileSync(file.path)
    const encodedImage = img.toString('base64')
    const finalImage = {
      contentType: file.mimetype,
      image: Buffer.from(encodedImage, 'base64')
    }
    return imagesService.createImage(finalImage)
  })
  const results = await Promise.all(uploadPromises)
  return responseSuccess(res, {
    message: 'Images uploaded successfully',
    data: results
  })
}
const uploadImageControllers = {
  uploadSingleImage,
  getImageById,
  uploadMultipleImages
}

export default uploadImageControllers
