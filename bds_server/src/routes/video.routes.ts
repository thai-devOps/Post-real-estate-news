import { Router } from 'express'
import videosControllers from '~/controllers/videos.controller'
import upload from '~/storage/storage'
import { wrapRequestHandler } from '~/utils/requestHandler'

const videoRoutes = Router()

/**
 * description: Create a new video
 * method: POST
 * path: /videos/create
 */
videoRoutes.post('/create', upload.single('video'), wrapRequestHandler(videosControllers.createVideo))
/**
 * description: Upload multiple videos
 * method: POST
 * path: /upload-video/multiple
 */
videoRoutes.post('/multiple', upload.array('videos'), wrapRequestHandler(videosControllers.uploadMutipleVideos))
export default videoRoutes
