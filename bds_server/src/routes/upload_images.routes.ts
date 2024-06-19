import { Router } from 'express'
import uploadImageControllers from '~/controllers/upload_images.controller'
import commonMiddlewares from '~/middlewares/common.middleware'
import upload from '~/storage/storage'
import { wrapRequestHandler } from '~/utils/requestHandler'
const uploadImagesRoutes = Router()

/**
 * description: Upload images
 * method: POST
 * path: /upload/single-image
 * body: { images: Array<File> }
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * multipart/form-data : true
 */

uploadImagesRoutes.post(
  '/single-image',
  upload.single('image'),
  wrapRequestHandler(uploadImageControllers.uploadCloudinarySingleImage)
)
/**
 * description: Get image by id
 * method: GET
 * path: /upload/:id
 */
uploadImagesRoutes.get('/images/:id', wrapRequestHandler(uploadImageControllers.getCloudinaryImageById))
/**
 * description: Upload multiple images
 * method: POST
 * path: /upload/multiple-images
 * body: { images: Array<File> }
 * headers: {
 * Authorization: {
 * description: Bearer access_token
 * multipart/form-data : true
 * }
 */
uploadImagesRoutes.post(
  '/multiple-images',
  upload.array('images'),
  wrapRequestHandler(uploadImageControllers.uploadCloudinaryMultipleImages)
)
/**
 * description: Destroy images
 * path: /upload/destroy
 * method: PUT
 */
uploadImagesRoutes.put(
  '/destroy',
  commonMiddlewares.accessTokenValidator,
  wrapRequestHandler(uploadImageControllers.destroyImages)
)
export default uploadImagesRoutes
